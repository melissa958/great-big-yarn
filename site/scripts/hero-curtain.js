// Reuse the approved scribble shapes, sequence, and draw/erase rhythm.
import './hero-scribbles.js';

const hero = document.querySelector('.curtain-hero');
const section = document.querySelector('.messy-section');
const pause = document.querySelector('[data-pause]');
const heroOnly = pause.dataset.pauseScope === 'hero';
const controls = pause.closest('.animation-controls');
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
const revealGroups = [
  { cover: hero, items: [...section.querySelectorAll('h2, .messy-copy p, .section-eyebrow')] },
  ...[...document.querySelectorAll('.homepage-section')].map(root => ({
    cover: root.classList.contains('opportunity-section') ? hero.closest('.curtain-pair') : null,
    items: [...root.querySelectorAll('.content-eyebrow, h2, article')]
  }))
];
for (const { items } of revealGroups) for (const item of items) item.classList.add('scroll-reveal');
let paused = false;
let queued = false;

// A sticky layer can sit at viewport top while its preceding curtain covers it.
// Link to its normal-flow boundary so the destination is completely uncovered.
const scrollForth = document.querySelector('.section-scroll-prompt a');
const opportunity = document.querySelector('#opportunity');
function revealOpportunity(behavior) {
  const curtain = hero.closest('.curtain-pair');
  if (!curtain || !opportunity) return;
  const top = scrollY + curtain.getBoundingClientRect().bottom;
  opportunity.focus({ preventScroll: true });
  scrollTo({ top, behavior });
}
scrollForth?.addEventListener('click', event => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (location.hash !== scrollForth.hash) history.pushState(null, '', scrollForth.hash);
  revealOpportunity(reducedMotion.matches ? 'instant' : 'smooth');
});
addEventListener('hashchange', () => {
  if (opportunity && location.hash === '#opportunity') revealOpportunity('instant');
});
addEventListener('load', () => {
  if (opportunity && location.hash === '#opportunity') revealOpportunity('instant');
});

function sync() {
  queued = false;
  const heroBounds = hero.getBoundingClientRect();
  const bottom = heroBounds.bottom;
  const bounds = section.getBoundingClientRect();
  const revealed = bottom < innerHeight && bounds.bottom > 0 && bounds.top < innerHeight;
  const globallyPaused = paused && !heroOnly;
  document.body.classList.toggle('colors-running', revealed && !globallyPaused && !document.hidden && !reducedMotion.matches);
  document.body.classList.toggle('animations-paused', globallyPaused || document.hidden);
  hero.classList.toggle('hero-paused', heroOnly && paused);
  if (heroOnly) {
    controls.hidden = reducedMotion.matches || bottom <= 0 || heroBounds.top >= innerHeight;
    pause.setAttribute('aria-pressed', String(paused));
  }
  for (const { cover, items } of revealGroups) {
    const coverBottom = cover?.getBoundingClientRect().bottom ?? -Infinity;
    for (const item of items) {
      if (item.classList.contains('is-revealed')) continue;
      const itemBounds = item.getBoundingClientRect();
      // Sticky content intersects the viewport while the previous section covers it.
      // Reveal only after that curtain has uncovered the actual element.
      const uncovered = coverBottom <= itemBounds.top + Math.min(44, itemBounds.height * .35);
      const inView = itemBounds.top < innerHeight - 24 && itemBounds.bottom > 0;
      if (reducedMotion.matches || (uncovered && inView && !globallyPaused && !document.hidden)) {
        item.classList.add('is-revealed');
      }
    }
  }
  const scope = heroOnly ? 'hero animations' : 'all animations';
  pause.setAttribute('aria-label', `${paused ? 'Resume' : 'Pause'} ${scope}`);
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
createMobileScribble(stage, mobile);
document.fonts.ready.then(queueSync);

// Keep the approved SVG path/dash animation as the source of truth. On phones,
// paint it into a bounded canvas with cached grain instead of an SVG filter.
function createMobileScribble(stage, mobile) {
  const svg = stage.querySelector('svg');
  const line = svg.querySelector('.scribble-line');
  const canvas = document.createElement('canvas');
  canvas.className = 'mobile-textured-scribble';
  canvas.setAttribute('aria-hidden', 'true');
  stage.append(canvas);
  const context = canvas.getContext('2d');
  const grain = new Image();
  const paints = new Map();
  let loading = false;
  let ready = false;
  let previousPath = '';
  let previousFrame = '';
  let path;

  function paintFor(color, scale) {
    if (!paints.has(color)) {
      const tile = document.createElement('canvas');
      tile.width = tile.height = 128;
      const tileContext = tile.getContext('2d');
      tileContext.drawImage(grain, 0, 0);
      tileContext.globalCompositeOperation = 'source-in';
      tileContext.fillStyle = color;
      tileContext.fillRect(0, 0, 128, 128);
      paints.set(color, context.createPattern(tile, 'repeat'));
    }
    const paint = paints.get(color);
    // Grain remains the same screen size while the path scales to the hero.
    paint.setTransform(new DOMMatrix().scale(1 / scale));
    return paint;
  }

  function render() {
    if (mobile.matches && !loading) {
      loading = true;
      grain.src = new URL('../assets/images/hero-tests/pencil-grain.png', import.meta.url).href;
    }
    const active = Boolean(context && ready && mobile.matches && stage.classList.contains('is-animated'));
    if (stage.classList.contains('is-canvas') !== active) stage.classList.toggle('is-canvas', active);
    if (!active) return;

    const bounds = stage.getBoundingClientRect();
    const density = Math.min(devicePixelRatio || 1, 1.5);
    const width = Math.ceil(bounds.width * density);
    const height = Math.ceil(bounds.height * density);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      previousFrame = '';
    }
    const box = svg.viewBox.baseVal;
    if (!box.width || !box.height) return;
    const d = line.getAttribute('d');
    const color = line.getAttribute('stroke');
    const signature = [d, color, line.style.cssText, box.x, box.y, box.width, box.height, stage.dataset.gesture, bounds.width, bounds.height].join('|');
    if (signature === previousFrame) return;
    previousFrame = signature;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, width, height);
    if (line.style.visibility === 'hidden') return;

    const scale = Math.max(bounds.width / box.width, bounds.height / box.height);
    const x = (bounds.width - box.width * scale) / 2 - box.x * scale;
    const y = (bounds.height - box.height * scale) / 2 - box.y * scale + (stage.dataset.gesture === '1' ? 75 : 0);
    if (d !== previousPath) {
      previousPath = d;
      path = new Path2D(d);
    }
    if (!path) return;
    context.setTransform(density * scale, 0, 0, density * scale, density * x, density * y);
    context.strokeStyle = paintFor(color, scale);
    context.lineWidth = 24;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.setLineDash(line.style.strokeDasharray.split(/[ ,]+/).map(value => parseFloat(value)));
    // WebKit serializes the SVG offset with a px suffix, including "0px".
    context.lineDashOffset = parseFloat(line.style.strokeDashoffset) || 0;
    context.stroke(path);
  }

  grain.addEventListener('load', () => { ready = true; render(); });
  new MutationObserver(render).observe(line, { attributes: true, attributeFilter: ['d', 'stroke', 'style'] });
  new MutationObserver(render).observe(svg, { attributes: true, attributeFilter: ['viewBox'] });
  new MutationObserver(render).observe(stage, { attributes: true, attributeFilter: ['class'] });
  mobile.addEventListener('change', render);
  new ResizeObserver(render).observe(stage);
  render();
}
