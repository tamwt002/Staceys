import { gsap } from './gsap.js';

// Fade and lift elements in once when they scroll into view.
export function reveal(targets, { trigger, start = 'top 82%', y = 40, stagger = 0.1 } = {}) {
  const elements = gsap.utils.toArray(targets);
  if (!elements.length) return;

  gsap.fromTo(
    elements,
    { y, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger,
      scrollTrigger: { trigger: trigger ?? elements[0], start, once: true },
    },
  );
}

// "Draw" the hand-drawn underlines left to right using only transforms:
// the clipping wrapper slides right while its contents slide back left.
export function revealScribbles(scope) {
  scope.querySelectorAll('.scribble').forEach((scribble) => {
    const line = scribble.querySelector('.scribble__line');
    const inner = scribble.querySelector('.scribble__inner');

    gsap
      .timeline({ scrollTrigger: { trigger: scribble, start: 'top 85%', once: true } })
      .fromTo(line, { xPercent: -101 }, { xPercent: 0, duration: 0.9, ease: 'power2.inOut' }, 0.35)
      .fromTo(inner, { xPercent: 101 }, { xPercent: 0, duration: 0.9, ease: 'power2.inOut' }, 0.35);
  });
}

// SplitText masks clip at the line box, which chops descenders on tight
// display line-heights. Give each mask a little room without moving the text.
export function roomyMasks(masks, room = '0.14em') {
  gsap.set(masks, { paddingBottom: room, marginBottom: `-${room}` });
}
