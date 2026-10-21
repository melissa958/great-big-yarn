// Draft-only, sparse color changes. The static SVG remains the no-JS/failure fallback.
const section = document.querySelector('.testimonial-grid-preview #testimonials');
const studio = section.closest('.studio-testimonial-pair').querySelector('.studio-section');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const portrait = matchMedia('(max-width: 599px)');
const layer = document.createElement('div');
layer.className = 'testimonial-grid-art';
layer.setAttribute('aria-hidden', 'true');
const control = document.createElement('button');
control.type = 'button';
control.className = 'testimonial-grid-pause';
control.hidden = true;
section.prepend(layer);
section.append(control);

const palette = ['#F73F12', '#FDAACF', '#FDCE08', '#0ABE72', '#00DED3', '#0A5FE6', '#DC8AE7'];
const rgb = hex => hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16));
const active = new Map();
let tiles = [];
let timer = 0;
let frame = 0;
let running = false;
let paused = false;
let loadId = 0;

function changeSquare() {
  timer = 0;
  if (!running) return;
  const choices = tiles.filter(tile => !active.has(tile));
  if (choices.length && active.size < 3) {
    const tile = choices[Math.floor(Math.random() * choices.length)];
    const base = tile.getAttribute('fill');
    const channels = rgb(base);
    // Related hues keep each square in its original color family.
    const related = palette.map(hex => ({ channels: rgb(hex) }))
      .sort((a, b) => distance(a.channels) - distance(b.channels)).slice(0, 2);
    function distance(color) { return color.reduce((sum, value, i) => sum + (value - channels[i]) ** 2, 0); }
    const color = related[Math.floor(Math.random() * related.length)].channels;
    const target = `rgb(${channels.map((value, i) => Math.round(value * .55 + color[i] * .45)).join(',')})`;
    const animation = tile.animate([{ fill: base }, { fill: target, offset: .5 }, { fill: base }], {
      duration: 7200 + Math.random() * 1600, easing: 'ease-in-out'
    });
    active.set(tile, animation);
    animation.onfinish = () => { active.delete(tile); animation.cancel(); };
  }
  timer = setTimeout(changeSquare, 2800 + Math.random() * 1200);
}

function sync() {
  frame = 0;
  const bounds = section.getBoundingClientRect();
  const studioBottom = studio.getBoundingClientRect().bottom;
  const visible = bounds.top < innerHeight - 80 && bounds.bottom > 80 && studioBottom < innerHeight - 80;
  const next = visible && !paused && !document.hidden && !reduced.matches && tiles.length > 0;
  control.hidden = !visible || studioBottom > 1 || reduced.matches || tiles.length === 0;
  control.textContent = paused ? 'Resume' : 'Pause';
  control.setAttribute('aria-label', `${paused ? 'Resume' : 'Pause'} background color changes`);
  control.setAttribute('aria-pressed', String(paused));
  if (reduced.matches) {
    active.forEach(animation => animation.cancel());
    active.clear();
  }
  if (next === running) return;
  running = next;
  clearTimeout(timer);
  timer = 0;
  active.forEach(animation => running ? animation.play() : animation.pause());
  if (running) timer = setTimeout(changeSquare, 1200);
}

async function loadArtwork() {
  const id = ++loadId;
  tiles = [];
  active.forEach(animation => animation.cancel());
  active.clear();
  layer.replaceChildren();
  sync();
  const name = portrait.matches ? 'portrait' : 'landscape';
  try {
    const response = await fetch(new URL(`../assets/images/testimonials/color-grid-${name}.svg?v=yellow-20261021`, import.meta.url));
    if (!response.ok) return;
    const art = new DOMParser().parseFromString(await response.text(), 'image/svg+xml').documentElement;
    if (id !== loadId || art.localName !== 'svg') return;
    art.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    art.setAttribute('focusable', 'false');
    layer.replaceChildren(document.importNode(art, true));
    tiles = [...layer.querySelectorAll('rect')];
    sync();
  } catch { /* Keep the existing static CSS background. */ }
}

function queue() { if (!frame) frame = requestAnimationFrame(sync); }
control.addEventListener('click', () => { paused = !paused; sync(); });
addEventListener('scroll', queue, { passive: true });
addEventListener('resize', queue, { passive: true });
document.addEventListener('visibilitychange', sync);
reduced.addEventListener('change', sync);
portrait.addEventListener('change', loadArtwork);
new IntersectionObserver(queue).observe(section);
loadArtwork();
