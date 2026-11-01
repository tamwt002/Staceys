import { gsap } from '../lib/gsap.js';
import { reveal } from '../lib/reveal.js';

export function rulesAnimation() {
  const section = document.querySelector('.rules');
  if (!section) return;

  reveal(section.querySelectorAll('[data-reveal]'), { trigger: section.querySelector('.rules__head') });

  // The badge gets slapped on like a sticker, then the rules tick in one by one.
  const card = section.querySelector('.badge-card');
  gsap
    .timeline({ scrollTrigger: { trigger: card, start: 'top 80%', once: true } })
    .from(card, { y: 80, rotate: 8, scale: 0.85, autoAlpha: 0, duration: 1, ease: 'back.out(1.6)' })
    .from(card.querySelectorAll('.rules__list li'), { x: 40, autoAlpha: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 0.45);
}
