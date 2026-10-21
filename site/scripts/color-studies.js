// Timed studies use CSS. Mouse mixing paints only after pointer movement, never on an idle loop.
const section = document.querySelector('.art-section');
const controls = document.querySelector('.art-controls');
const hero = document.querySelector('.curtain-hero');
const options = [...controls.querySelectorAll('[data-study]')];
const layers = [...section.querySelectorAll('[data-art-layer]')];
const pause = controls.querySelector('.art-pause');
const status = controls.querySelector('.art-status');
const hint = controls.querySelector('.art-hint');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(any-hover: hover) and (any-pointer: fine)');
const names = { dispersion: 'Dispersion +30%', 'dispersion-fast': 'Dispersion +60%', 'dispersion-mix': 'Mouse mix' };
let paused = false;
let frame = 0;
let mixEnabled = false;
let mixFrame = 0;
let previousPointer = null;
let pendingMix = null;
let mixBox = null;
const ribbons = [...section.querySelectorAll('.mixer-ribbon')].map(element => {
  const style = getComputedStyle(element);
  const center = (parseFloat(style.getPropertyValue('--ribbon-x')) + (parseFloat(style.getPropertyValue('--ribbon-width')) || 17) / 2) / 100;
  return { element, center: center * 1.16 - .08, x: 0, y: 0, skew: 0, spread: 0 };
});
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function stopMix() {
  cancelAnimationFrame(mixFrame);
  mixFrame = 0;
  previousPointer = null;
  pendingMix = null;
}
function resetMix() {
  stopMix();
  for (const ribbon of ribbons) {
    ribbon.x = ribbon.y = ribbon.skew = ribbon.spread = 0;
    ribbon.element.style.removeProperty('transform');
  }
}
function paintMix() {
  mixFrame = 0;
  if (!mixEnabled || !pendingMix) return;
  const { x, dx, dy } = pendingMix;
  pendingMix = null;
  const travel = Math.hypot(dx, dy);
  const reach = mixBox.width * .26;
  for (const ribbon of ribbons) {
    const distance = Math.abs(x - (mixBox.width * ribbon.center + ribbon.x));
    const influence = Math.max(0, 1 - distance / reach) ** 2;
    if (influence < .001) continue;
    ribbon.x = clamp(ribbon.x * .985 + dx * influence * .85, -mixBox.width * .09, mixBox.width * .09);
    ribbon.y = clamp(ribbon.y * .985 + dy * influence * .7, -mixBox.height * .1, mixBox.height * .1);
    ribbon.skew = clamp(ribbon.skew * .94 + dx * influence * .035, -5, 5);
    ribbon.spread = Math.min(.3, ribbon.spread * .99 + travel * influence / 1500);
    ribbon.element.style.transform = `translate(${ribbon.x.toFixed(2)}px, ${ribbon.y.toFixed(2)}px) skewX(${ribbon.skew.toFixed(2)}deg) scaleX(${(1 + ribbon.spread).toFixed(3)})`;
  }
}
section.addEventListener('pointermove', event => {
  if (!mixEnabled || !['mouse', 'pen'].includes(event.pointerType)) return;
  const current = { x: event.clientX, y: event.clientY };
  if (previousPointer) {
    // Bound jumps from fast pointer travel; coalesce writes into one event-driven frame.
    const dx = clamp(current.x - previousPointer.x, -64, 64);
    const dy = clamp(current.y - previousPointer.y, -64, 64);
    if (dx || dy) {
      pendingMix = { x: current.x - mixBox.left, dx: clamp((pendingMix?.dx || 0) + dx, -96, 96), dy: clamp((pendingMix?.dy || 0) + dy, -96, 96) };
      if (!mixFrame) mixFrame = requestAnimationFrame(paintMix);
    }
  }
  previousPointer = current;
}, { passive: true });
section.addEventListener('pointerleave', stopMix, { passive: true });
section.addEventListener('pointercancel', stopMix, { passive: true });

function sync() {
  frame = 0;
  const rect = section.getBoundingClientRect();
  const uncovered = hero.getBoundingClientRect().bottom < innerHeight - 1;
  const visible = uncovered && rect.bottom > 80 && rect.top < innerHeight - 80;
  const mixing = section.dataset.art === 'dispersion-mix';
  const running = visible && !paused && !reduced.matches && !document.hidden;
  mixBox = rect;
  mixEnabled = mixing && running && finePointer.matches;
  // Scrolling or a state change must never turn into a pointer stroke.
  stopMix();
  controls.hidden = !visible;
  document.body.classList.toggle('art-running', running);
  const staticOnly = reduced.matches || (mixing && !finePointer.matches);
  pause.disabled = staticOnly;
  pause.textContent = staticOnly ? 'Static' : paused ? 'Resume' : 'Pause';
  pause.setAttribute('aria-pressed', String(paused));
  pause.setAttribute('aria-label', staticOnly ? 'Static background: reduced motion or no hover pointer' : `${paused ? 'Resume' : 'Pause'} background animation`);
  hint.hidden = !mixing;
  hint.textContent = reduced.matches ? 'Static for reduced motion.' : !finePointer.matches ? 'Static on touch screens.' : 'Move your mouse to mix. Stops when you stop.';
}
function queue() { if (!frame) frame = requestAnimationFrame(sync); }
function select(key, updateURL = false) {
  if (!Object.hasOwn(names, key)) key = 'dispersion';
  section.dataset.art = key;
  for (const layer of layers) layer.hidden = layer.dataset.artLayer !== key;
  for (const button of options) button.setAttribute('aria-pressed', String(button.dataset.study === key));
  if (updateURL) {
    const url = new URL(location.href);
    url.searchParams.set('art', key);
    history.replaceState(null, '', url);
    status.textContent = `${names[key]} selected`;
  }
  sync();
}
for (const button of options) button.addEventListener('click', () => select(button.dataset.study, true));
pause.addEventListener('click', () => { paused = !paused; sync(); });
reduced.addEventListener('change', () => { resetMix(); sync(); });
finePointer.addEventListener('change', () => { resetMix(); sync(); });
addEventListener('scroll', queue, { passive: true });
addEventListener('resize', queue, { passive: true });
document.addEventListener('visibilitychange', sync);
new IntersectionObserver(queue).observe(section);

// Native sticky sections need their preceding curtain boundary for direct links.
function revealStudy() {
  if (location.hash !== '#color-study') return;
  scrollTo({ top: scrollY + hero.getBoundingClientRect().bottom, behavior: 'instant' });
  sync();
}
const requested = new URL(location.href).searchParams.get('art');
select(requested, requested !== null && !Object.hasOwn(names, requested));
addEventListener('hashchange', revealStudy);
addEventListener('load', () => document.fonts.ready.then(revealStudy));
if (document.readyState === 'complete') document.fonts.ready.then(revealStudy);
