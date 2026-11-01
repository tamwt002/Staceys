# Waldos

A single-page site for an alternative cafe in Fitzroy with DJ nights every Friday and Saturday.
Vanilla HTML, hand-written CSS, GSAP (ScrollTrigger + SplitText) and Lenis, bundled with Vite.

## Setup

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

- `npm run build` writes a production build to `dist/`
- `npm run preview` serves that build locally

## Project structure

```
index.html              Homepage markup (sections 1 to 8, in order)
site.config.js          Cafe name, live URL, address: used by the blog and SEO tags
content/blog/           Blog posts, one Markdown file each
build/                  Vite plugin that turns the Markdown into static blog pages
public/images/          Drop your images here (see the table below)
src/main.js             Homepage entry: imports styles, sets up Lenis + gsap.matchMedia()
src/blog.js             Entry for the blog pages
src/lib/                gsap.js (plugin registration), smooth-scroll.js, images.js, reveal.js
src/animations/         One file per section: intro, hero, statement, dj-nights, rules,
                        menu, journal, visit, footer, blog, plus pointer.js (cursor bubble +
                        magnetic buttons)
src/styles/             tokens.css (palette, fonts), base.css, then one file per section
```

## Editing content

The DJ lineup, menu items and prices are placeholder copy in `index.html`. Edit them in place.

The map in the Visit section is a Google Maps embed centred on Fitzroy. To pin an exact spot
later, change the `q=` part of the iframe `src` in `index.html` to your street address.

## The blog (Journal)

Posts are Markdown files in `content/blog/`. At dev and build time, `build/blog-plugin.js` turns
them into real static HTML pages, so search engines get fully rendered content:

- `/blog/` lists every post, newest first
- `/blog/<filename>/` is each post (the filename becomes the URL, so keep it short and keyword-y)
- The two latest posts also appear in a "From the journal" strip on the homepage
- `sitemap.xml`, `feed.xml` (RSS) and `robots.txt` are generated into the build

**Writing a post:** copy an existing file in `content/blog/`, rename it, and edit the front matter:

```md
---
title: "Your headline"
description: "One or two sentences. This is what shows in Google results, so make it count."
date: 2026-11-14
author: "Theo"
imageAlt: "What the cover photo shows"
tags: [DJ nights, Fitzroy]
draft: true
---

Your post in Markdown...
```

- `draft: true` shows the post in `npm run dev` but leaves it out of the production build.
- The cover image is `public/images/blog/<filename>.jpg` (16:9, around 1600 × 900). Until it
  exists you'll see a placeholder. You can point elsewhere with `image: /images/whatever.jpg`.
- Writing `[CAFE NAME]` in a post is swapped for the name in `site.config.js` (currently Waldos),
  handy if the name ever changes.
- Save the file and the dev server reloads with the new page.

**Before you go live:** set `url` in `site.config.js` to your real domain. Canonical links, the
sitemap, RSS and social share tags are all built from it. Then submit
`https://yourdomain/sitemap.xml` in Google Search Console.

The `blog/` folder in the project root is generated and gitignored. It's rebuilt every time,
so never edit files in there; edit the Markdown instead.

**SEO included:** unique titles and meta descriptions, canonical URLs, Open Graph and Twitter
cards, `BlogPosting` + breadcrumb structured data on posts, `CafeOrCoffeeShop` local business
data on the homepage, internal links between posts, sitemap and RSS.

## Swapping in your images

1. Export each image with the filename below and drop it into `public/images/`, replacing the
   Unsplash stand-ins (see Photo credits).
2. Refresh. That's it. Until a file exists, its slot shows a warm gradient block with a small
   filename and ratio tag in the corner, so you can see where everything goes.
3. Update the matching `alt` text in `index.html` so it describes your actual photo.

JPGs around 80% quality are plenty. Below-the-fold images are lazy-loaded automatically.

| Filename          | Where it appears                                | Aspect ratio | Suggested size |
| ----------------- | ----------------------------------------------- | ------------ | -------------- |
| `hero.jpg`        | Full-screen hero background (parallax)          | 16:9         | 2400 × 1350    |
| `dj-friday.jpg`   | DJ Nights, Friday card                          | 16:10        | 1200 × 750     |
| `dj-saturday.jpg` | DJ Nights, Saturday card                        | 16:10        | 1200 × 750     |
| `menu-1.jpg`      | Menu card 1 (flat white)                        | 4:5          | 800 × 1000     |
| `menu-2.jpg`      | Menu card 2 (dirty chai)                        | 4:5          | 800 × 1000     |
| `menu-3.jpg`      | Menu card 3 (mushrooms on toast)                | 4:5          | 800 × 1000     |
| `menu-4.jpg`      | Menu card 4 (banana bread)                      | 4:5          | 800 × 1000     |
| `blog/<post>.jpg` | Blog post cover and card, one per post          | 16:9         | 1600 × 900     |

Images use `object-fit: cover`, so a slightly different ratio still works. It will just crop.
Collage and circle shapes crop to the centre, so keep the subject roughly centred there.

## Photo credits

The images in `public/images/` are free stock photos from [Unsplash](https://unsplash.com),
used under the [Unsplash License](https://unsplash.com/license) (free for commercial use, credit
appreciated but not required). They're stand-ins until you have your own photos: overwrite any
file with the same name to swap it.

| File | Photographer |
| ---- | ------------ |
| `hero.jpg` | [Colin redwood](https://unsplash.com/photos/string-lights-illuminate-an-outdoor-patio-with-tables-and-chairs-kzX1Vv6-Wgk) |
| `dj-friday.jpg` | [Vadim Morozov](https://unsplash.com/photos/person-in-gray-t-shirt-playing-dj-mixer-nNnY3T3rw00) |
| `dj-saturday.jpg` | [Andrea Cipriani](https://unsplash.com/photos/vinyl-record-spinning-on-turntable-GTIutdltrkA) |
| `menu-1.jpg` | [Polina Kuzovkova](https://unsplash.com/photos/a-cup-of-coffee-on-a-saucer-on-a-table-2tfFzduVohU) |
| `menu-2.jpg` | [Empreinte](https://unsplash.com/photos/iced-coffee-with-milk-pouring-02O1bXB_fgk) |
| `menu-3.jpg` | [Sadia Alam](https://unsplash.com/photos/sauteed-mushrooms-with-garlic-and-toast-bEgpca34KYk) |
| `menu-4.jpg` | [Diego Arenas de Rodrigo](https://unsplash.com/photos/slices-of-banana-bread-on-a-wooden-cutting-board-bWj_oZPjXS8) |
| `blog/coffee-for-the-soul-our-story.jpg` | [Queensland, Australia](https://unsplash.com/photos/people-laughing-at-breakfast-restaurant-table-QQNEOQxDwM8) |
| `blog/dj-nights-in-fitzroy-what-to-expect.jpg` | [Vadim Morozov](https://unsplash.com/photos/person-in-blue-denim-jeans-standing-in-front-of-dj-mixer-jFM-cGrQ2GY) |

## Motion notes

- All animations are created inside one `gsap.matchMedia()` block, so they clean up and rebuild
  when you cross the desktop/mobile breakpoint.
- **Everywhere (with motion on)**: curtain intro with a spinning record and counter, 3D headline
  flip, drifting light leaks in the hero, scroll-filled statement,
  beat-pulsing glow behind the DJ record, elastic footer wordmark.
- **Desktop** (≥ 900px wide and ≥ 600px tall): pinned DJ Nights (tonearm drops, cards swing in
  in 3D, record spins with scroll), menu cards dealt onto the table, hero parallax,
  pointer parallax,
  a cursor bubble that labels things ("spin", "play", "yum"), magnetic buttons and card tilt.
- To change the cursor labels, edit the `data-cursor` attributes in `index.html`.
- **Mobile**: no pinning or scroll parallax. DJ cards simply fade up.
- **prefers-reduced-motion**: no smooth scrolling and no GSAP animations at all. Everything is
  visible straight away and the film grain stops moving.
- Animations only touch `transform` and `opacity`.
