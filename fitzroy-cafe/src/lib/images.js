// Every image lives in a .slot. If the file isn't in /public/images yet,
// the slot keeps its coloured, labelled placeholder instead of a broken icon.
export function initImageSlots(onLoad) {
  document.querySelectorAll('.slot img').forEach((img) => {
    const slot = img.closest('.slot');

    const missing = () => slot.classList.add('is-missing');
    const loaded = () => {
      slot.classList.remove('is-missing');
      onLoad?.();
    };

    if (img.complete) {
      img.naturalWidth ? loaded() : missing();
    }

    img.addEventListener('error', missing);
    img.addEventListener('load', loaded);
  });
}
