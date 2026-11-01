import 'lenis/dist/lenis.css';
import './styles/main.css';

import { gsap, ScrollTrigger } from './lib/gsap.js';
import { MEDIA } from './lib/media.js';
import { createSmoothScroll } from './lib/smooth-scroll.js';
import { initImageSlots } from './lib/images.js';

import { introAnimation } from './animations/intro.js';
import { heroAnimation } from './animations/hero.js';
import { statementAnimation } from './animations/statement.js';
import { djAnimation } from './animations/dj-nights.js';
import { rulesAnimation } from './animations/rules.js';
import { menuAnimation } from './animations/menu.js';
import { journalAnimation } from './animations/journal.js';
import { visitAnimation } from './animations/visit.js';
import { footerAnimation } from './animations/footer.js';
import { pointerAnimation } from './animations/pointer.js';

// Always start at the top so the intro lands on the hero.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// Images arriving late can change layout slightly, so let ScrollTrigger re-measure.
const refresh = debounce(() => ScrollTrigger.refresh(), 200);
initImageSlots(refresh);

const mm = gsap.matchMedia();

mm.add(
  MEDIA,
  (context) => {
    const { reduceMotion } = context.conditions;

    // Reduced motion: no smooth scroll, no pins, no parallax. Content is
    // already fully visible thanks to the CSS defaults.
    if (reduceMotion) return;

    const smoothScroll = createSmoothScroll();
    const intro = introAnimation();

    const cleanups = [
      smoothScroll,
      intro.cleanup,
      heroAnimation({ ...context.conditions, delay: intro.delay }),
      statementAnimation(context.conditions),
      // Pinned sections must be created in page order so later triggers
      // account for the pin spacing of earlier ones.
      djAnimation(context.conditions),
      rulesAnimation(context.conditions),
      menuAnimation(context.conditions),
      journalAnimation(context.conditions),
      visitAnimation(context.conditions),
      footerAnimation(context.conditions),
      pointerAnimation(context.conditions),
    ].filter((fn) => typeof fn === 'function');

    return () => cleanups.forEach((fn) => fn());
  },
);

document.fonts?.ready.then(() => ScrollTrigger.refresh());

function debounce(fn, wait) {
  let id;
  return () => {
    clearTimeout(id);
    id = setTimeout(fn, wait);
  };
}
