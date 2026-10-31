import { gsap, ScrollTrigger } from '../lib/gsap.js';

const BASE_SPEED = 3.2; // % of the track per second

export function marqueeAnimation() {
  const section = document.querySelector('.marquee');
  if (!section) return;

  const bands = [...section.querySelectorAll('[data-marquee]')].map(setupBand);
  let boost = 0;
  let scrollDir = 1;

  // Scroll velocity kicks the speed up; scrolling back up flips direction.
  const trigger = ScrollTrigger.create({
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate(self) {
      scrollDir = self.direction;
      boost = Math.max(boost, Math.min(Math.abs(self.getVelocity()) / 250, 8));
    },
  });

  const tick = (_time, deltaMs) => {
    const dt = deltaMs / 1000;
    boost += (0 - boost) * Math.min(dt * 2.5, 1); // ease back to cruising speed
    const speed = BASE_SPEED * (1 + boost);

    bands.forEach((band) => {
      band.x = band.wrap(band.x - speed * dt * band.direction * scrollDir);
      band.setX(band.x);
      band.setSkew(-boost * 2.2 * band.direction * scrollDir);
    });
  };

  gsap.ticker.add(tick);

  return () => {
    gsap.ticker.remove(tick);
    trigger.kill();
    bands.forEach((band) => gsap.set(band.track, { clearProps: 'transform' }));
  };
}

function setupBand(band) {
  const track = band.querySelector('.marquee__track');
  const group = track.querySelector('.marquee__group');

  // Fill one group wider than the viewport, then duplicate it so a -50% shift
  // loops seamlessly. Only done once, even if matchMedia re-runs.
  if (!track.dataset.ready) {
    const items = [...group.children];
    while (group.offsetWidth < window.innerWidth * 1.2 && group.offsetWidth > 0) {
      items.forEach((item) => group.append(item.cloneNode(true)));
    }
    track.append(group.cloneNode(true));
    track.dataset.ready = 'true';
  }

  return {
    track,
    x: 0,
    direction: Number(band.dataset.direction) || 1,
    wrap: gsap.utils.wrap(-50, 0),
    setX: gsap.quickSetter(track, 'xPercent'),
    setSkew: gsap.quickSetter(track, 'skewX', 'deg'),
  };
}
