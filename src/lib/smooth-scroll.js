import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap.js';

let current = null;

// The live Lenis instance (null when smooth scroll is off), e.g. for pausing during the intro.
export const getLenis = () => current;

// Lenis drives the scroll, GSAP's ticker drives Lenis, and ScrollTrigger
// updates on every Lenis scroll so pins and scrubs stay perfectly in sync.
export function createSmoothScroll() {
  const lenis = new Lenis({
    autoRaf: false,
    anchors: true,
    lerp: 0.1,
  });

  current = lenis;
  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
    current = null;
  };
}
