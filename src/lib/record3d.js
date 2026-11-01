import { gsap } from './gsap.js';

// Leans a 3D record toward the pointer while it moves over `area`, and swings
// the light across it so the gloss shifts like real vinyl. Returns a cleanup.
export function tiltRecord(record, area, { maxX = 12, maxY = 16 } = {}) {
  if (!record || !area || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const tilt = record.querySelector('.record3d__tilt');
  const sheen = record.querySelector('.record3d__sheen');
  const ease = { duration: 0.8, ease: 'power3' };
  const rotX = gsap.quickTo(tilt, 'rotationX', ease);
  const rotY = gsap.quickTo(tilt, 'rotationY', ease);
  const light = sheen && gsap.quickTo(sheen, 'rotation', ease);

  const onMove = (e) => {
    const rect = record.getBoundingClientRect();
    const px = gsap.utils.clamp(-1, 1, (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2));
    const py = gsap.utils.clamp(-1, 1, (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2));
    rotY(px * maxY);
    rotX(-py * maxX);
    light?.(px * -50);
  };
  const onLeave = () => {
    rotX(0);
    rotY(0);
    light?.(0);
  };

  area.addEventListener('pointermove', onMove);
  area.addEventListener('pointerleave', onLeave);
  return () => {
    area.removeEventListener('pointermove', onMove);
    area.removeEventListener('pointerleave', onLeave);
  };
}
