// Homepage Yarn color fields: CSS draws the approved +60% loop; JS only gates its visibility.
const section = document.querySelector('.yarn-color-fields-home .art-section');
const hero = document.querySelector('.curtain-hero');
const pause = section.querySelector('.yarn-color-fields-pause');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let paused = false;
let frame = 0;

function sync() {
  frame = 0;
  const bounds = section.getBoundingClientRect();
  const heroBottom = hero.getBoundingClientRect().bottom;
  const uncovered = heroBottom < innerHeight - 1;
  // Ignore tiny residual strips at fractional sticky boundaries, matching the approved preview.
  const visible = uncovered && bounds.bottom > 80 && bounds.top < innerHeight - 80;
  document.body.classList.toggle('art-running', visible && !paused && !reduced.matches && !document.hidden);
  // The homepage has no Section 2 control; retained previews may still opt in.
  if (pause) {
    pause.hidden = !visible || reduced.matches || heroBottom > 1;
    pause.textContent = paused ? 'Resume' : 'Pause';
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', `${paused ? 'Resume' : 'Pause'} background animation`);
  }
}
function queue() { if (!frame) frame = requestAnimationFrame(sync); }
pause?.addEventListener('click', () => { paused = !paused; sync(); });
addEventListener('scroll', queue, { passive: true });
addEventListener('resize', queue, { passive: true });
document.addEventListener('visibilitychange', sync);
reduced.addEventListener('change', sync);
new IntersectionObserver(queue).observe(section);

// A direct Section 2 link must uncover it from behind the hero curtain.
function revealSection() {
  if (location.hash !== '#color-study') return;
  scrollTo({ top: scrollY + hero.getBoundingClientRect().bottom, behavior: 'instant' });
  section.focus({ preventScroll: true });
  sync();
}
addEventListener('hashchange', revealSection);
addEventListener('load', () => document.fonts.ready.then(revealSection));
if (document.readyState === 'complete') document.fonts.ready.then(revealSection);
document.fonts.ready.then(queue);
sync();
