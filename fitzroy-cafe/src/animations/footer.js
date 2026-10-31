import { gsap, SplitText } from '../lib/gsap.js';
import { roomyMasks } from '../lib/reveal.js';

export function footerAnimation() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  SplitText.create(footer.querySelector('.footer__mark'), {
    type: 'chars',
    mask: 'chars',
    autoSplit: true,
    onSplit: (self) => {
      roomyMasks(self.masks);
      return gsap.from(self.chars, {
        yPercent: 110,
        rotate: () => gsap.utils.random(-25, 25),
        duration: 1.4,
        ease: 'elastic.out(1, 0.5)',
        stagger: { each: 0.04, from: 'center' },
        scrollTrigger: { trigger: footer, start: 'top 80%', once: true },
      });
    },
  });
}
