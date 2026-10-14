// Reuse the approved scribble shapes, sequence, and draw/erase rhythm.
import './hero-scribbles.js';

const hero = document.querySelector('.curtain-hero');
const section = document.querySelector('.messy-section');
const pause = document.querySelector('[data-pause]');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const mobile = matchMedia('(max-width: 599px)');
const stage = hero.querySelector('.scribble-stage');
const svg = stage.querySelector('svg');
const line = stage.querySelector('.scribble-line');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#preview-navigation');
const header = hero.querySelector('.site-header');
let menuOpen = false;
document.body.classList.add('has-mobile-menu');
const revealItems = [...section.querySelectorAll('h2, .messy-copy p')];
for (const item of revealItems) item.classList.add('scroll-reveal');
let paused = false;
let queued = false;

function sync() {
  queued = false;
  const bottom = hero.getBoundingClientRect().bottom;
  const bounds = section.getBoundingClientRect();
  const revealed = bottom < innerHeight && bounds.bottom > 0 && bounds.top < innerHeight;
  document.body.classList.toggle('colors-running', revealed && !paused && !document.hidden && !reducedMotion.matches);
  document.body.classList.toggle('animations-paused', paused || document.hidden);
  for (const item of revealItems) {
    if (item.classList.contains('is-revealed')) continue;
    const itemBounds = item.getBoundingClientRect();
    // Sticky content intersects the viewport even while the hero covers it.
    // Start each entrance only when the curtain has actually uncovered it.
    const uncovered = bottom <= itemBounds.top + Math.min(44, itemBounds.height * .35);
    const inView = itemBounds.top < innerHeight - 24 && itemBounds.bottom > 0;
    if (reducedMotion.matches || (uncovered && inView && !paused && !document.hidden)) {
      item.classList.add('is-revealed');
    }
  }
  pause.setAttribute('aria-label', paused ? 'Resume all animations' : 'Pause all animations');
}

function queueSync() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(sync);
}

function scaleArtwork() {
  // Scale the wrapper while preserving the original Figma SVG dimensions.
  const bounds = stage.getBoundingClientRect();
  const scale = mobile.matches ? Math.max(bounds.width / 2021.4758, bounds.height / 1531.3885) : bounds.width / 2021.4758;
  hero.style.setProperty('--art-scale', String(scale));
  frameMobileScribble();
  sync();
}

function frameMobileScribble() {
  if (!mobile.matches) {
    svg.setAttribute('viewBox', '0 0 1000 757.56');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    return;
  }
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  if (!stage.classList.contains('is-animated')) return;
  const bounds = line.getBBox();
  if (bounds.height) svg.setAttribute('viewBox', `0 ${bounds.y - 12} 1000 ${bounds.height + 24}`);
}

function syncMenu() {
  menuToggle.hidden = !mobile.matches;
  navigation.hidden = mobile.matches && !menuOpen;
  menuToggle.setAttribute('aria-expanded', String(mobile.matches && menuOpen));
  menuToggle.setAttribute('aria-label', menuOpen ? 'Close navigation menu' : 'Open navigation menu');
}
function closeMenu(returnFocus = false) {
  menuOpen = false;
  syncMenu();
  if (returnFocus && mobile.matches) menuToggle.focus();
}
menuToggle.addEventListener('click', () => { menuOpen = !menuOpen; syncMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuOpen) closeMenu(true);
});
document.addEventListener('click', event => {
  if (menuOpen && !header.contains(event.target)) closeMenu();
});
mobile.addEventListener('change', () => { closeMenu(); scaleArtwork(); });
new ResizeObserver(scaleArtwork).observe(hero);
new MutationObserver(frameMobileScribble).observe(line, { attributes: true, attributeFilter: ['d'] });
new MutationObserver(frameMobileScribble).observe(stage, { attributes: true, attributeFilter: ['class'] });

pause.addEventListener('click', () => {
  paused = !paused;
  sync();
});
addEventListener('scroll', queueSync, { passive: true });
addEventListener('resize', scaleArtwork);
document.addEventListener('visibilitychange', sync);
reducedMotion.addEventListener('change', sync);
scaleArtwork();
syncMenu();
