// Reuse the approved scribble shapes, sequence, and draw/erase rhythm.
import './hero-scribbles.js';

const hero = document.querySelector('.curtain-hero');
const section = document.querySelector('.messy-section');
const pause = document.querySelector('[data-pause]');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let paused = false;
let queued = false;

function sync() {
  queued = false;
  const bottom = hero.getBoundingClientRect().bottom;
  const bounds = section.getBoundingClientRect();
  const revealed = bottom < innerHeight && bounds.bottom > 0 && bounds.top < innerHeight;
  document.body.classList.toggle('colors-running', revealed && !paused && !document.hidden && !reducedMotion.matches);
  pause.setAttribute('aria-label', paused ? 'Resume all animations' : 'Pause all animations');
}

function queueSync() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(sync);
}

function scaleArtwork() {
  // Scale the wrapper while preserving the original Figma SVG dimensions.
  const width = hero.querySelector('.scribble-stage').getBoundingClientRect().width;
  hero.style.setProperty('--art-scale', String(width / 2021.4758));
  sync();
}

pause.addEventListener('click', () => {
  paused = !paused;
  sync();
});
addEventListener('scroll', queueSync, { passive: true });
addEventListener('resize', scaleArtwork);
document.addEventListener('visibilitychange', sync);
reducedMotion.addEventListener('change', sync);
scaleArtwork();
