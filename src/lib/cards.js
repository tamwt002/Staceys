import { gsap, ScrollTrigger } from './gsap.js';

// Post cards tumble up into place as they scroll in, a few at a time.
export function dealCards(cards) {
  const items = gsap.utils.toArray(cards);
  if (!items.length) return;

  gsap.set(items, { y: 90, rotate: () => gsap.utils.random(-8, 8), autoAlpha: 0 });
  ScrollTrigger.batch(items, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { y: 0, rotate: 0, autoAlpha: 1, duration: 1.1, ease: 'back.out(1.4)', stagger: 0.14, overwrite: 'auto' }),
  });
}
