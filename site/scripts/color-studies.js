// Preview-only controls. Motion is CSS-driven; this controller has no frame loop.
const section = document.querySelector('.art-section');
const controls = document.querySelector('.art-controls');
const hero = document.querySelector('.curtain-hero');
const options = [...controls.querySelectorAll('[data-study]')];
const layers = [...section.querySelectorAll('[data-art-layer]')];
const pause = controls.querySelector('.art-pause');
const status = controls.querySelector('.art-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const names = { fields: 'Color fields', squares: 'Nested color', planes: 'Moving planes', stains: 'Stained color' };
let paused = false;
let frame = 0;

function sync() {
  frame = 0;
  const rect = section.getBoundingClientRect();
  const uncovered = hero.getBoundingClientRect().bottom < innerHeight - 1;
  const visible = uncovered && rect.bottom > 80 && rect.top < innerHeight - 80;
  controls.hidden = !visible;
  document.body.classList.toggle('art-running', visible && !paused && !reduced.matches && !document.hidden);
  pause.disabled = reduced.matches;
  pause.textContent = reduced.matches ? 'Static' : paused ? 'Resume' : 'Pause';
  pause.setAttribute('aria-pressed', String(paused));
  pause.setAttribute('aria-label', reduced.matches ? 'Motion disabled by reduced-motion preference' : `${paused ? 'Resume' : 'Pause'} background animation`);
}
function queue() { if (!frame) frame = requestAnimationFrame(sync); }
function select(key, updateURL = false) {
  if (!Object.hasOwn(names, key)) key = 'fields';
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
reduced.addEventListener('change', sync);
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
select(new URL(location.href).searchParams.get('art'));
addEventListener('hashchange', revealStudy);
addEventListener('load', () => document.fonts.ready.then(revealStudy));
if (document.readyState === 'complete') document.fonts.ready.then(revealStudy);
