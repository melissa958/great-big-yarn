// Figma supplies animated GIFs. Keep a first-frame fallback for reduced motion,
// no JavaScript, offscreen cards, and hidden tabs. Hero Pause is independent.
const marks = [...document.querySelectorAll('[data-motion-src]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const visible = new Set();
const stills = new Map(marks.map(mark => [mark, mark.getAttribute('src')]));
function syncMarks() {
  const paused = reduced.matches || document.hidden || document.body.classList.contains('animations-paused');
  for (const mark of marks) {
    const source = !paused && visible.has(mark) ? mark.dataset.motionSrc : stills.get(mark);
    if (mark.getAttribute('src') !== source) mark.setAttribute('src', source);
  }
}
const observer = new IntersectionObserver(entries => {
  for (const { target, isIntersecting } of entries) {
    if (isIntersecting) visible.add(target); else visible.delete(target);
  }
  syncMarks();
});
for (const mark of marks) observer.observe(mark);
new MutationObserver(syncMarks).observe(document.body, { attributes: true, attributeFilter: ['class'] });
reduced.addEventListener('change', syncMarks);
document.addEventListener('visibilitychange', syncMarks);
