import fs from 'node:fs';
import path from 'node:path';
import { loadPosts } from './posts.js';
import {
  renderFeed,
  renderHomeSeo,
  renderIndex,
  renderLatest,
  renderPost,
  renderRobots,
  renderSitemap,
} from './templates.js';

const CONTENT_DIR = 'content/blog';
// Generated HTML lands here so Vite treats every post as a real page.
// The folder is wiped and rebuilt each time, so never edit files in it.
const OUT_DIR = 'blog';

// Markdown blog: content/blog/*.md becomes static, crawlable HTML pages at
// /blog/ and /blog/<slug>/, plus sitemap.xml, feed.xml and robots.txt.
export function blogPlugin() {
  let root;
  let includeDrafts = true;
  let posts = [];

  const generate = () => {
    posts = loadPosts(path.join(root, CONTENT_DIR), { includeDrafts });

    const out = path.join(root, OUT_DIR);
    fs.rmSync(out, { recursive: true, force: true });
    write(path.join(out, 'index.html'), renderIndex(posts));
    posts.forEach((post) => write(path.join(out, post.slug, 'index.html'), renderPost(post, posts)));
  };

  const extraFiles = () => ({
    'sitemap.xml': renderSitemap(posts),
    'feed.xml': renderFeed(posts),
    'robots.txt': renderRobots(),
  });

  return {
    name: 'markdown-blog',

    config(userConfig, { command }) {
      root = path.resolve(userConfig.root ?? process.cwd());
      includeDrafts = command === 'serve';
      generate();

      const input = {
        main: path.join(root, 'index.html'),
        blog: path.join(root, OUT_DIR, 'index.html'),
      };
      posts.forEach((post) => {
        input[`post-${post.slug}`] = path.join(root, OUT_DIR, post.slug, 'index.html');
      });

      return { build: { rollupOptions: { input } } };
    },

    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html
          .replace('<!-- blog:seo -->', renderHomeSeo())
          .replace('<!-- blog:latest -->', renderLatest(posts.slice(0, 2))),
    },

    configureServer(server) {
      const contentDir = path.join(root, CONTENT_DIR);
      server.watcher.add(contentDir);

      const onChange = (file) => {
        if (!file.startsWith(contentDir)) return;
        generate();
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', onChange).on('change', onChange).on('unlink', onChange);

      // Serve the feeds in dev too, so they can be checked before deploying.
      server.middlewares.use((req, res, next) => {
        const file = extraFiles()[req.url?.slice(1)];
        if (!file) return next();
        res.setHeader('Content-Type', req.url.endsWith('.txt') ? 'text/plain' : 'application/xml');
        res.end(file);
      });
    },

    generateBundle() {
      Object.entries(extraFiles()).forEach(([fileName, source]) => {
        this.emitFile({ type: 'asset', fileName, source });
      });
    },
  };
}

function write(file, contents) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}
