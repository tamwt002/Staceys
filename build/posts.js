import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import site from '../site.config.js';

const WORDS_PER_MINUTE = 220;

// Reads every content/blog/*.md file into a post object, newest first.
// Posts with `draft: true` show up in dev but are left out of production builds.
export function loadPosts(dir, { includeDrafts = true } = {}) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => toPost(path.join(dir, file)))
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.date - a.date);
}

function toPost(file) {
  const slug = path.basename(file, '.md');
  // [CAFE NAME] in a post is swapped for the configured name, so renaming
  // the cafe in site.config.js updates every post too.
  const raw = fs.readFileSync(file, 'utf8').replaceAll('[CAFE NAME]', site.name);
  const { data, body } = parseFrontmatter(raw);

  if (!data.title || !data.date) {
    throw new Error(`content/blog/${slug}.md needs at least a title and a date in its front matter.`);
  }

  const words = body.split(/\s+/).filter(Boolean).length;
  const html = marked.parse(body).replaceAll('<img ', '<img loading="lazy" decoding="async" ');

  return {
    slug,
    url: `/blog/${slug}/`,
    title: data.title,
    description: data.description ?? '',
    // Midday UTC keeps the calendar date the same in UTC and in Melbourne.
    date: new Date(`${data.date}T12:00:00Z`),
    updated: data.updated ? new Date(`${data.updated}T12:00:00Z`) : null,
    author: data.author ?? site.name,
    image: data.image ?? `/images/blog/${slug}.jpg`,
    imageAlt: data.imageAlt ?? '',
    tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
    draft: data.draft === 'true',
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    html,
  };
}

// Minimal front matter: `key: value` lines, optional quotes, and [a, b] lists.
function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: source };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;

    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();

    if (/^\[.*\]$/.test(value)) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((item) => unquote(item.trim()))
        .filter(Boolean);
    } else {
      value = unquote(value);
    }
    data[key] = value;
  }

  return { data, body: source.slice(match[0].length) };
}

const unquote = (value) => value.replace(/^(["'])(.*)\1$/, '$2');
