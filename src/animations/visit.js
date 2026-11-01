import { gsap } from '../lib/gsap.js';
import { reveal, revealScribbles } from '../lib/reveal.js';

export function visitAnimation() {
  const section = document.querySelector('.visit');
  if (!section) return;

  reveal(section.querySelectorAll('[data-reveal]'), { trigger: section, start: 'top 70%', stagger: 0.08 });
  revealScribbles(section);

  // The map tips in like a postcard being dropped on the table.
  gsap.from(section.querySelector('.visit__map'), {
    y: 80,
    rotate: -6,
    autoAlpha: 0,
    duration: 1.1,
    ease: 'back.out(1.4)',
    scrollTrigger: { trigger: section.querySelector('.visit__map'), start: 'top 80%', once: true },
  });
}
