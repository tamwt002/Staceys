import { gsap } from '../lib/gsap.js';
import { getLenis } from '../lib/smooth-scroll.js';

let played = false;

// Curtain intro: a record spins up while a counter runs to 100, then the
// panels split open onto the hero. Plays once per page load, even if
// matchMedia rebuilds the animations later.
export function introAnimation() {
  const loader = document.querySelector('.loader');
  if (!loader || played) {
    loader?.remove();
    return { delay: 0.1 };
  }
  played = true;

  const lenis = getLenis();
  lenis?.stop();

  const finish = () => {
    loader.remove();
    getLenis()?.start();
  };

  const count = loader.querySelector('.loader__count');
  const counter = { value: 0 };

  const tl = gsap.timeline({ onComplete: finish });
  tl.from(loader.querySelector('.loader__disc'), { scale: 0, rotate: -160, duration: 0.8, ease: 'back.out(1.8)' })
    .to(loader.querySelector('.loader__disc svg'), { rotate: 900, duration: 1.7, ease: 'power2.in' }, 0)
    .from(loader.querySelectorAll('.loader__count, .loader__note'), { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, 0.15)
    .to(
      counter,
      {
        value: 100,
        duration: 1.3,
        ease: 'power2.inOut',
        onUpdate: () => (count.textContent = String(Math.round(counter.value)).padStart(2, '0')),
      },
      0.15,
    )
    .to(loader.querySelector('.loader__center'), { scale: 0.7, autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, 1.55)
    .to(loader.querySelector('.loader__panel--top'), { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 1.7)
    .to(loader.querySelector('.loader__panel--bottom'), { yPercent: 100, duration: 0.9, ease: 'expo.inOut' }, 1.7);

  return {
    delay: 1.95, // the hero starts as the curtain opens
    cleanup: () => {
      // If the breakpoint flips mid-intro, don't leave the curtain stuck down.
      if (tl.progress() < 1) finish();
    },
  };
}
