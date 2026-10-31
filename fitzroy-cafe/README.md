# [CAFE NAME] landing page

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
index.html              All page markup (sections 1 to 8, in order)
public/images/          Drop your images here (see the table below)
src/main.js             Entry: imports styles, sets up Lenis + gsap.matchMedia()
src/lib/                gsap.js (plugin registration), smooth-scroll.js, images.js, reveal.js
src/animations/         One file per section: intro, hero, marquee, statement, about, dj-nights, menu,
                        gallery, visit, footer, plus pointer.js (cursor bubble + magnetic buttons)
src/styles/             tokens.css (palette, fonts), base.css, then one file per section
```

## Filling in the placeholders

Search the project for these and replace them:

| Placeholder   | Where                                              |
| ------------- | -------------------------------------------------- |
| `[CAFE NAME]` | Page title, nav logo, footer wordmark, this README |
| `[ADDRESS]`   | Visit section                                      |
| `[HOURS]`     | Visit section                                      |
| `[HANDLE]`    | Visit section (Instagram link and label)           |

The DJ lineup, menu items and prices are placeholder copy in `index.html`. Edit them in place.

To use a real map, replace the contents of `.visit__map` in `index.html` with a Google Maps
`<iframe>` (there's a comment showing exactly where). The CSS already sizes an iframe to fill it.

## Swapping in your images

1. Export each image with the filename below and drop it into `public/images/`.
2. Refresh. That's it. Until a file exists, its slot shows a warm gradient block with a small
   filename and ratio tag in the corner, so you can see where everything goes.
3. Update the matching `alt` text in `index.html` so it describes your actual photo.

JPGs around 80% quality are plenty. Below-the-fold images are lazy-loaded automatically.

| Filename          | Where it appears                                | Aspect ratio | Suggested size |
| ----------------- | ----------------------------------------------- | ------------ | -------------- |
| `hero.jpg`        | Full-screen hero background (parallax)          | 16:9         | 2400 × 1350    |
| `about-1.jpg`     | About collage, large arch-shaped photo (left)   | 4:5          | 800 × 1000     |
| `about-2.jpg`     | About collage, blob-shaped photo (top right)    | 1:1          | 800 × 800      |
| `about-3.jpg`     | About collage, centre photo (front)             | 3:4          | 750 × 1000     |
| `about-4.jpg`     | About collage, small circle (bottom right)      | 1:1          | 600 × 600      |
| `dj-friday.jpg`   | DJ Nights, Friday card                          | 16:10        | 1200 × 750     |
| `dj-saturday.jpg` | DJ Nights, Saturday card                        | 16:10        | 1200 × 750     |
| `menu-1.jpg`      | Menu card 1 (flat white)                        | 4:5          | 800 × 1000     |
| `menu-2.jpg`      | Menu card 2 (dirty chai)                        | 4:5          | 800 × 1000     |
| `menu-3.jpg`      | Menu card 3 (mushrooms on toast)                | 4:5          | 800 × 1000     |
| `menu-4.jpg`      | Menu card 4 (banana bread)                      | 4:5          | 800 × 1000     |
| `gallery-1.jpg`   | Horizontal gallery, photo 1                     | 4:5          | 800 × 1000     |
| `gallery-2.jpg`   | Horizontal gallery, photo 2                     | 3:2          | 1200 × 800     |
| `gallery-3.jpg`   | Horizontal gallery, photo 3                     | 3:4          | 750 × 1000     |
| `gallery-4.jpg`   | Horizontal gallery, photo 4                     | 1:1          | 1000 × 1000    |
| `gallery-5.jpg`   | Horizontal gallery, photo 5                     | 4:5          | 800 × 1000     |
| `gallery-6.jpg`   | Horizontal gallery, photo 6                     | 3:2          | 1200 × 800     |

Images use `object-fit: cover`, so a slightly different ratio still works. It will just crop.
Collage and circle shapes crop to the centre, so keep the subject roughly centred there.

## Motion notes

- All animations are created inside one `gsap.matchMedia()` block, so they clean up and rebuild
  when you cross the desktop/mobile breakpoint.
- **Everywhere (with motion on)**: curtain intro with a spinning record and counter, 3D headline
  flip, drifting light leaks in the hero, scroll-filled statement, velocity-reactive marquee,
  beat-pulsing glow behind the DJ record, elastic footer wordmark.
- **Desktop** (≥ 900px wide and ≥ 600px tall): pinned DJ Nights (tonearm drops, cards swing in
  in 3D, record spins with scroll), menu cards dealt onto the table, pinned horizontal gallery
  that skews with scroll speed plus a progress bar, hero and collage parallax, pointer parallax,
  a cursor bubble that labels things ("spin", "play", "yum"), magnetic buttons and card tilt.
- To change the cursor labels, edit the `data-cursor` attributes in `index.html`.
- **Mobile**: no pinning or scroll parallax. The gallery becomes a native swipe row, and DJ cards
  simply fade up.
- **prefers-reduced-motion**: no smooth scrolling and no GSAP animations at all. Everything is
  visible straight away and the film grain stops moving.
- Animations only touch `transform` and `opacity`.
