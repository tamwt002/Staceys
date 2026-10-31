import { gsap, SplitText } from '../lib/gsap.js';
import { roomyMasks } from '../lib/reveal.js';

export function heroAnimation({ isDesktop, delay = 0 }) {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const title = hero.querySelector('.hero__title');
  const intro = hero.querySelectorAll('[data-intro]');
  const badge = hero.querySelector('.badge');
  const disc = hero.querySelector('.badge__disc');
  const bg = hero.querySelector('.hero__bg');
  const glows = gsap.utils.toArray(hero.querySelectorAll('.glow'));

  // Headline: characters flip up out of a per-word mask in 3D. autoSplit
  // re-splits after fonts load or on resize, carrying the tween across.
  SplitText.create(title, {
    type: 'words,chars',
    mask: 'words',
    autoSplit: true,
    onSplit(self) {
      roomyMasks(self.masks);
      gsap.set(title, { autoAlpha: 1 });
      return gsap.from(self.chars, {
        yPercent: 120,
        rotationX: -95,
        rotate: 6,
        transformPerspective: 700,
        transformOrigin: '50% 100%',
        duration: 1.3,
        ease: 'expo.out',
        stagger: { each: 0.03, from: 'start' },
        delay: delay + 0.05,
      });
    },
  });

  gsap.fromTo(
    intro,
    { y: 30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', stagger: 0.12, delay: delay + 0.6 },
  );

  // Background settles in from slightly zoomed as the curtain opens.
  gsap.from(bg, { scale: 1.25, duration: 2.4, ease: 'expo.out', delay: delay - 0.25 });

  // Badge drops in with a spin, then keeps turning like a record.
  gsap.fromTo(
    badge,
    { scale: 0, rotate: -200, autoAlpha: 0 },
    { scale: 1, rotate: 0, autoAlpha: 1, duration: 1.5, ease: 'elastic.out(1, 0.6)', delay: delay + 0.8 },
  );
  gsap.to(disc, { rotate: 360, duration: 10, ease: 'none', repeat: -1 });

  // Light leaks wander slowly, forever.
  glows.forEach((glow) => {
    gsap.to(glow, {
      xPercent: () => gsap.utils.random(-25, 25),
      yPercent: () => gsap.utils.random(-20, 20),
      scale: () => gsap.utils.random(0.85, 1.25),
      duration: () => gsap.utils.random(5, 9),
      ease: 'sine.inOut',
      repeat: -1,
      repeatRefresh: true,
      yoyo: true,
    });
  });

  if (!isDesktop) return;

  // Scroll away: headline lifts and fades, background parallaxes.
  const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  gsap.to(bg, { yPercent: 18, ease: 'none', scrollTrigger: scrub });
  gsap.to(hero.querySelector('.hero__inner'), { yPercent: -25, opacity: 0, ease: 'none', scrollTrigger: { ...scrub } });
  gsap.to(badge, { yPercent: -120, rotate: 90, ease: 'none', scrollTrigger: { ...scrub } });

  // Pointer parallax: layers drift by depth for a bit of 3D.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const layers = [
    { el: title, depth: 14 },
    { el: hero.querySelector('.hero__glows'), depth: -30 },
    ...glows.map((el) => ({ el, depth: -40 * parseFloat(el.dataset.depth) })),
  ].map(({ el, depth }) => ({
    depth,
    x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }),
    y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }),
  }));

  const onMove = (e) => {
    const px = e.clientX / window.innerWidth - 0.5;
    const py = e.clientY / window.innerHeight - 0.5;
    layers.forEach((layer) => {
      layer.x(px * layer.depth);
      layer.y(py * layer.depth);
    });
  };

  hero.addEventListener('pointermove', onMove);
  return () => hero.removeEventListener('pointermove', onMove);
}
