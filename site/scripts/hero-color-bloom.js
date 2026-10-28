// Approved Color bloom handoff. Native scrolling owns the entire page.
const hero = document.querySelector('.hero-color-bloom .curtain-hero');
const section = document.querySelector('.hero-color-bloom .messy-section');
const title = section.querySelector('h2');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const stage = section.querySelector('.art-stage').cloneNode(true);
stage.classList.add('hero-bloom-stage');
hero.prepend(stage);
let frame = 0;
function smooth(start, end, value) {
  const t = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}
function sync() {
  frame = 0;
  const bounds = hero.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, -bounds.top / bounds.height));
  const bloom = smooth(.02, .62, progress);
  document.body.classList.toggle('bloom-ready', !reduced.matches);
  hero.style.setProperty('--bloom-feather', `${Math.min(innerHeight * .38, 340) * smooth(0, .28, progress)}px`);
  hero.style.setProperty('--bloom-color', bloom.toFixed(4));
  hero.style.setProperty('--bloom-scribble', (1 - smooth(.02, .68, progress)).toFixed(4));
  hero.style.setProperty('--bloom-glass', `${32 * (1 - bloom)}%`);
  hero.style.setProperty('--bloom-radius', `${18 * (1 - bloom)}px`);
  section.style.setProperty('--bloom-copy', reduced.matches ? '1' : smooth(-110, 110, title.getBoundingClientRect().top - bounds.bottom).toFixed(4));
  hero.classList.toggle('hero-bloom-running', bloom > .001 && bounds.bottom > 0 && bounds.top < innerHeight && !document.hidden && !reduced.matches);
}
function queue() { if (!frame && !document.hidden) frame = requestAnimationFrame(sync); }
addEventListener('scroll', queue, { passive: true });
addEventListener('resize', queue, { passive: true });
addEventListener('pageshow', queue);
document.addEventListener('visibilitychange', () => {
  if (frame) { cancelAnimationFrame(frame); frame = 0; }
  sync();
});
reduced.addEventListener('change', sync);
new ResizeObserver(queue).observe(hero);
document.fonts.ready.then(queue);
sync();
