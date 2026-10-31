import 'lenis/dist/lenis.css';
import './styles/blog-main.css';

import { gsap, ScrollTrigger } from './lib/gsap.js';
import { MEDIA } from './lib/media.js';
import { createSmoothScroll } from './lib/smooth-scroll.js';
import { initImageSlots } from './lib/images.js';

import { blogAnimation } from './animations/blog.js';
import { footerAnimation } from './animations/footer.js';
import { pointerAnimation } from './animations/pointer.js';

// Entry for the generated /blog/ pages. Same motion rules as the homepage:
// everything lives in matchMedia and reduced motion gets a static page.
initImageSlots(() => ScrollTrigger.refresh());

gsap.matchMedia().add(MEDIA, (context) => {
  if (context.conditions.reduceMotion) return;

  const cleanups = [
    createSmoothScroll(),
    blogAnimation(context.conditions),
    footerAnimation(context.conditions),
    pointerAnimation(context.conditions),
  ].filter((fn) => typeof fn === 'function');

  return () => cleanups.forEach((fn) => fn());
});

document.fonts?.ready.then(() => ScrollTrigger.refresh());
