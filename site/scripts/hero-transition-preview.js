const hero = document.querySelector('.curtain-hero');
const section = document.querySelector('.messy-section');
const title = section.querySelector('h2');
const body = document.body;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const modes = new Set(['feather', 'bloom', 'dissolve']);
const links = [...document.querySelectorAll('[data-transition-mode]')];
const replay = document.querySelector('[data-transition-replay]');
const colorStage = section.querySelector('.art-stage').cloneNode(true);
colorStage.classList.add('transition-color-stage');
hero.prepend(colorStage);
let mode = new URL(location.href).searchParams.get('transition');
if (!modes.has(mode)) mode = 'bloom';
let frame = 0;
const clamp = value => Math.min(1, Math.max(0, value));
function smooth(start, end, value) {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
}
function sync() {
  frame = 0;
  const bounds = hero.getBoundingClientRect();
  const progress = clamp(-bounds.top / bounds.height);
  const bloom = smooth(.02, .62, progress);
  const copy = mode === 'dissolve'
    ? smooth(.56, .94, progress)
    : smooth(-110, 110, title.getBoundingClientRect().top - bounds.bottom);
  body.classList.toggle('transition-ready', !reduced.matches);
  hero.style.setProperty('--transition-feather', `${Math.min(innerHeight * .38, 340) * smooth(0, .28, progress)}px`);
  hero.style.setProperty('--transition-bloom', bloom.toFixed(4));
  hero.style.setProperty('--transition-scribble', (1 - smooth(.02, .68, progress)).toFixed(4));
  hero.style.setProperty('--transition-hero', (1 - smooth(.22, .82, progress)).toFixed(4));
  hero.style.setProperty('--transition-glass', `${32 * (1 - bloom)}%`);
  hero.style.setProperty('--transition-radius', `${18 * (1 - bloom)}px`);
  section.style.setProperty('--transition-copy', reduced.matches ? '1' : copy.toFixed(4));
  hero.classList.toggle('art-running', mode === 'bloom' && bloom > .001 && bounds.bottom > 0 && bounds.top < innerHeight && !document.hidden && !reduced.matches);
}
function queue() { if (!frame) frame = requestAnimationFrame(sync); }
function choose(next, updateURL = false) {
  mode = next;
  body.dataset.transition = mode;
  for (const link of links) link.setAttribute('aria-current', String(link.dataset.transitionMode === mode));
  if (updateURL) {
    const url = new URL(location.href);
    url.searchParams.set('transition', mode);
    url.hash = '';
    history.replaceState(null, '', url);
  }
  sync();
}
for (const link of links) link.addEventListener('click', event => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  choose(link.dataset.transitionMode, true);
  scrollTo({ top: 0, behavior: 'instant' });
});
replay.addEventListener('click', () => scrollTo({ top: 0, behavior: 'instant' }));
addEventListener('scroll', queue, { passive: true });
addEventListener('resize', queue, { passive: true });
document.addEventListener('visibilitychange', queue);
reduced.addEventListener('change', queue);
addEventListener('pageshow', queue);
new ResizeObserver(queue).observe(hero);
document.fonts.ready.then(queue);
choose(mode);
