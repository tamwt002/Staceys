import { gsap } from '../lib/gsap.js';
import { reveal, revealScribbles } from '../lib/reveal.js';

export function visitAnimation() {
  const section = document.querySelector('.visit');
  if (!section) return;

  reveal(section.querySelectorAll('[data-reveal]'), { trigger: section, start: 'top 70%', stagger: 0.08 });
  revealScribbles(section);

  // The map pin drops in and bounces.
  gsap.from(section.querySelector('.map__pin'), {
    y: -140,
    autoAlpha: 0,
    duration: 1.2,
    ease: 'bounce.out',
    scrollTrigger: { trigger: section.querySelector('.visit__map'), start: 'top 70%', once: true },
  });
}
