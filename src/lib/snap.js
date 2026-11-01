import Snap from 'lenis/snap';

// Soft section snapping: scrolling stays free, but when you stop close to the
// top of a section it glides into place and fills the screen. Sections taller
// than the screen still scroll normally because nothing snaps mid-section.
export function createSectionSnap(lenis, selectors) {
  if (!lenis) return;

  const snap = new Snap(lenis, {
    type: 'proximity',
    distanceThreshold: '25%',
    duration: 0.9,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    debounce: 350,
  });

  const removers = selectors
    .map((selector) => document.querySelector(selector))
    .filter(Boolean)
    .map((section) => {
      // Pinned sections are wrapped by ScrollTrigger; snap to the wrapper so
      // the target doesn't move while the section is pinned.
      const target = section.parentElement?.classList.contains('pin-spacer') ? section.parentElement : section;
      return snap.addElement(target, { align: ['start'] });
    });

  return () => {
    removers.forEach((remove) => remove());
    snap.destroy();
  };
}
