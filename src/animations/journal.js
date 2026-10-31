import { reveal } from '../lib/reveal.js';
import { dealCards } from '../lib/cards.js';

export function journalAnimation() {
  const section = document.querySelector('.journal');
  if (!section) return;

  reveal(section.querySelectorAll('[data-reveal]'), { trigger: section.querySelector('.journal__head') });
  dealCards(section.querySelectorAll('.post-card'));
}
