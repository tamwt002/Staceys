import { gsap } from '../lib/gsap.js';

// Desktop pointer extras: a follower dot that becomes a labelled bubble over
// [data-cursor] elements, and buttons that lean toward the pointer.
export function pointerAnimation({ isDesktop }) {
  if (!isDesktop || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="cursor__label"></span>';
  document.body.append(cursor);

  const label = cursor.querySelector('.cursor__label');
  gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });

  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3' });
  let visible = false;
  let activeEl = null;

  const onMove = (e) => {
    if (!visible) {
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
      gsap.to(cursor, { scale: 0.16, duration: 0.3 });
      visible = true;
    }
    xTo(e.clientX);
    yTo(e.clientY);

    const target = e.target.closest?.('[data-cursor]') ?? null;
    if (target === activeEl) return;
    activeEl = target;
    if (target) label.textContent = target.dataset.cursor;
    cursor.classList.toggle('is-active', Boolean(target));
    gsap.to(cursor, { scale: target ? 1 : 0.16, duration: 0.5, ease: 'expo.out', overwrite: 'auto' });
  };

  const onLeaveWindow = () => {
    visible = false;
    gsap.to(cursor, { scale: 0, duration: 0.3 });
  };

  window.addEventListener('pointermove', onMove);
  document.documentElement.addEventListener('pointerleave', onLeaveWindow);

  // Magnetic buttons
  const magnets = [...document.querySelectorAll('.btn, .nav__cta')].map((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.35);
      y((e.clientY - (r.top + r.height / 2)) * 0.45);
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' });
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  });

  return () => {
    window.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', onLeaveWindow);
    magnets.forEach((off) => off());
    cursor.remove();
  };
}
