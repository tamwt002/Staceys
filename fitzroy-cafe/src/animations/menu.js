import { gsap, ScrollTrigger } from '../lib/gsap.js';
import { reveal, revealScribbles } from '../lib/reveal.js';

export function menuAnimation({ isDesktop }) {
  const section = document.querySelector('.menu');
  if (!section) return;

  reveal(section.querySelectorAll('.menu__head [data-reveal]'), { trigger: section.querySelector('.menu__head') });
  reveal(section.querySelector('.board'), { y: 50 });
  revealScribbles(section);

  const cards = gsap.utils.toArray(section.querySelectorAll('.menu-card'));

  if (isDesktop) {
    // Dealt like playing cards: they fly in from a pile below, spinning,
    // and land in their staggered spots.
    gsap.fromTo(
      cards,
      {
        y: () => window.innerHeight * 0.6,
        x: (i) => (1.5 - i) * 180,
        rotate: () => gsap.utils.random(-35, 35),
        autoAlpha: 0,
      },
      {
        y: 0,
        x: 0,
        rotate: 0,
        autoAlpha: 1,
        duration: 1.2,
        ease: 'back.out(1.3)',
        stagger: 0.13,
        scrollTrigger: { trigger: section.querySelector('.menu__grid'), start: 'top 80%', once: true },
      },
    );
  } else {
    gsap.set(cards, { y: 70, autoAlpha: 0 });
    ScrollTrigger.batch(cards, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12, overwrite: 'auto' }),
    });
  }

  // Tilt toward the cursor, only on devices that can actually hover.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const removers = cards.map((card) => {
    const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' });
    const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' });

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotY(px * 12);
      rotX(-py * 12);
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
    };

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
    return () => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    };
  });

  return () => removers.forEach((remove) => remove());
}
