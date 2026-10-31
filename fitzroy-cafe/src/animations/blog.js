import { gsap, SplitText } from '../lib/gsap.js';
import { reveal, roomyMasks } from '../lib/reveal.js';
import { dealCards } from '../lib/cards.js';

// Blog index and post pages: headline flip, cover reveal, paragraphs easing
// in as you read, and a reading progress bar on posts.
export function blogAnimation({ isDesktop }) {
  const title = document.querySelector('[data-split]');
  if (title) {
    SplitText.create(title, {
      type: 'words,chars',
      mask: 'words',
      autoSplit: true,
      onSplit(self) {
        roomyMasks(self.masks);
        gsap.set(title, { autoAlpha: 1 });
        return gsap.from(self.chars, {
          yPercent: 120,
          rotationX: -90,
          transformPerspective: 700,
          transformOrigin: '50% 100%',
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.015,
          delay: 0.1,
        });
      },
    });
  }

  reveal(document.querySelectorAll('[data-reveal]'), { start: 'top 95%', stagger: 0.12 });
  dealCards(document.querySelectorAll('.post-card'));

  const cover = document.querySelector('.post__cover');
  if (!cover) return;

  gsap.from(cover, { yPercent: 10, scale: 0.94, autoAlpha: 0, duration: 1.4, ease: 'expo.out', delay: 0.35 });

  if (isDesktop) {
    gsap.fromTo(
      cover.querySelector('img'),
      { yPercent: -6, scale: 1.14 },
      { yPercent: 6, scale: 1.14, ease: 'none', scrollTrigger: { trigger: cover, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  }

  // Each block of the article eases in as it reaches the reader.
  gsap.utils.toArray('.prose > *').forEach((block) => {
    const isQuote = block.tagName === 'BLOCKQUOTE';
    gsap.from(block, {
      y: isQuote ? 60 : 28,
      rotate: isQuote ? -6 : 0,
      scale: isQuote ? 0.92 : 1,
      autoAlpha: 0,
      duration: isQuote ? 1.1 : 0.8,
      ease: isQuote ? 'back.out(1.6)' : 'power3.out',
      scrollTrigger: { trigger: block, start: 'top 90%', once: true },
    });
  });

  const progress = document.querySelector('.read-progress span');
  if (progress) {
    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.prose', start: 'top 60%', end: 'bottom 60%', scrub: true },
    });
  }
}
