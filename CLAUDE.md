# Fitzroy cafe site

Vanilla Vite site: hand-written CSS (no Tailwind), GSAP (ScrollTrigger + SplitText) and Lenis.

- Homepage: `index.html` + `src/main.js`. Blog pages: generated from `content/blog/*.md` by `build/blog-plugin.js`, entry `src/blog.js`.
- `blog/` at the root is generated and gitignored. Edit the Markdown, never that folder.
- Animations: one file per section in `src/animations/`, all created inside `gsap.matchMedia()` (conditions in `src/lib/media.js`). Animate only transform and opacity. Reduced motion must get a fully visible, static page.
- Copy voice: warm, casual, a little playful. No em-dashes anywhere in copy.
- See README.md for setup, image filenames and the blog workflow.
