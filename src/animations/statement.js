import { gsap, SplitText } from '../lib/gsap.js';

export function statementAnimation() {
  const section = document.querySelector('.statement');
  if (!section) return;

  const text = section.querySelector('.statement__text');

  // Each word brightens from faint to full ink as it scrolls past, like
  // reading along. Icons pop in with a spin when their turn comes.
  const split = SplitText.create(text, { type: 'words' });

  gsap.fromTo(
    split.words,
    { opacity: 0.12 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: { trigger: text, start: 'top 80%', end: 'bottom 50%', scrub: true },
    },
  );

  section.querySelectorAll('.statement__icon').forEach((icon) => {
    gsap.fromTo(
      icon,
      { scale: 0, rotate: -120 },
      {
        scale: 1,
        rotate: 0,
        ease: 'back.out(2.5)',
        scrollTrigger: { trigger: icon, start: 'top 82%', end: 'top 62%', scrub: 0.5 },
      },
    );
  });
}
