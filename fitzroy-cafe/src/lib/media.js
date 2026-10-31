// gsap.matchMedia() conditions shared by the homepage and blog entries.
export const MEDIA = {
  // "Desktop" needs enough height too, otherwise pinned sections get cramped.
  isDesktop: '(min-width: 900px) and (min-height: 600px)',
  isMobile: '(max-width: 899.98px), (max-height: 599.98px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
};
