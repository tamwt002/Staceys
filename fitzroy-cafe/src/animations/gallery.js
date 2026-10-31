import { gsap } from '../lib/gsap.js';

export function galleryAnimation({ isDesktop }) {
  const section = document.querySelector('.gallery');
  if (!section) return;

  // Mobile keeps the native swipe row from the CSS. Just fade items in.
  if (!isDesktop) {
    gsap.fromTo(
      section.querySelectorAll('.gallery__item'),
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%', once: true } },
    );
    return;
  }

  section.classList.add('is-pinned');

  const viewport = section.querySelector('.gallery__viewport');
  const track = section.querySelector('.gallery__track');
  const distance = () => track.scrollWidth - viewport.clientWidth;
  const figures = section.querySelectorAll('.gallery__item figure');
  const setProgress = gsap.quickSetter(section.querySelector('.gallery__progress span'), 'scaleX');

  // Photos lean into fast scrolling and spring back upright when you stop.
  const skew = { value: 0 };
  const setSkew = gsap.quickSetter(figures, 'skewX', 'deg');
  const clampSkew = gsap.utils.clamp(-12, 12);

  // Vertical scroll becomes horizontal travel while the section is pinned.
  const scroller = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate(self) {
        setProgress(self.progress);
        const next = clampSkew(self.getVelocity() / -250);
        if (Math.abs(next) > Math.abs(skew.value)) {
          skew.value = next;
          gsap.to(skew, {
            value: 0,
            duration: 0.9,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => setSkew(skew.value),
          });
        }
      },
    },
  });

  // Each photo slides gently inside its frame as it crosses the screen.
  section.querySelectorAll('.gallery__item').forEach((item) => {
    gsap.fromTo(
      item.querySelector('img'),
      { xPercent: -7 },
      {
        xPercent: 7,
        ease: 'none',
        scrollTrigger: { trigger: item, containerAnimation: scroller, start: 'left right', end: 'right left', scrub: true },
      },
    );
  });

  return () => section.classList.remove('is-pinned');
}
