import { gsap, SplitText } from '../lib/gsap.js';
import { roomyMasks } from '../lib/reveal.js';

export function djAnimation({ isDesktop }) {
  const section = document.querySelector('.dj');
  if (!section) return;

  const vinyl = section.querySelector('.vinyl');
  const tonearm = section.querySelector('.tonearm');
  const glow = section.querySelector('.dj__glow');
  const cards = section.querySelectorAll('.dj-card');
  const head = section.querySelector('.dj__head');

  // Headline words rise in as the section arrives.
  const split = SplitText.create(head.querySelector('.dj__title'), { type: 'words', mask: 'words' });
  roomyMasks(split.masks);
  gsap
    .timeline({ scrollTrigger: { trigger: section, start: 'top 65%', once: true } })
    .from(split.words, { yPercent: 110, rotate: 4, duration: 1, ease: 'expo.out', stagger: 0.08 })
    .from(head.querySelectorAll('.eyebrow, .dj__lede'), { y: 24, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, 0.2);

  // The record's glow thumps at 120bpm while the section is on screen.
  gsap.fromTo(
    glow,
    { scale: 0.92, opacity: 0.45 },
    {
      scale: 1.08,
      opacity: 0.85,
      duration: 0.25,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' },
    },
  );

  if (isDesktop) {
    // Pinned sequence: tonearm drops onto the record, then Friday and
    // Saturday swing in like doors, while the record spins with scroll.
    gsap.set(tonearm, { rotate: -12 });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=190%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    tl.to(tonearm, { rotate: 22, duration: 0.5, ease: 'back.out(2)' }, 0);

    cards.forEach((card, i) => {
      const at = 0.35 + i * 0.85;
      tl.fromTo(
        card,
        {
          rotationY: i ? -75 : 75,
          xPercent: i ? 40 : 20,
          yPercent: 25,
          z: -200,
          autoAlpha: 0,
          transformPerspective: 1400,
          transformOrigin: i ? '100% 50%' : '0% 50%',
        },
        { rotationY: 0, xPercent: 0, yPercent: 0, z: 0, autoAlpha: 1, duration: 1 },
        at,
      ).from(
        card.querySelectorAll('.lineup li'),
        { x: 40, autoAlpha: 0, duration: 0.45, stagger: 0.12 },
        at + 0.5,
      );
    });

    tl.to({}, { duration: 0.5 }); // short hold before unpinning
    tl.fromTo(vinyl, { rotate: 0 }, { rotate: 1080, ease: 'none', duration: tl.duration() }, 0);
    return;
  }

  // Mobile: no pinning. Cards rise in as they enter, the record turns with scroll.
  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { y: 70, rotate: 3, autoAlpha: 0 },
      { y: 0, rotate: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } },
    );
  });

  gsap.fromTo(
    vinyl,
    { rotate: 0 },
    { rotate: 540, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } },
  );
}
