import { gsap } from '../lib/gsap.js';
import { reveal, revealScribbles } from '../lib/reveal.js';

export function aboutAnimation({ isDesktop }) {
  const section = document.querySelector('.about');
  if (!section) return;

  reveal(section.querySelectorAll('[data-reveal]'), {
    trigger: section.querySelector('.about__copy'),
    start: 'top 75%',
  });
  revealScribbles(section);

  const items = section.querySelectorAll('.collage__item');

  // Pop the collage in, a bit scattered.
  gsap.fromTo(
    items,
    { scale: 0.85, autoAlpha: 0 },
    {
      scale: 1,
      autoAlpha: 1,
      duration: 1.1,
      ease: 'back.out(1.4)',
      stagger: { each: 0.12, from: 'random' },
      scrollTrigger: { trigger: section.querySelector('.about__collage'), start: 'top 75%', once: true },
    },
  );

  // Desktop only: each photo drifts at its own speed for a layered feel.
  if (!isDesktop) return;

  items.forEach((item) => {
    const speed = parseFloat(item.dataset.speed) || 1;
    gsap.fromTo(
      item,
      { y: 90 * speed },
      {
        y: -90 * speed,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    );
  });

  gsap.fromTo(
    section.querySelector('.about__blob'),
    { rotate: -20, yPercent: 10 },
    {
      rotate: 25,
      yPercent: -10,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  );
}
