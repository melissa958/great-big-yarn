// Entrances and footer framing for the homepage and retained preview.
const phone = matchMedia('(max-width:599px)');
const reduced = matchMedia('(prefers-reduced-motion:reduce)');

const stage = document.querySelector('.scribble-stage');
const svg = stage.querySelector('svg');
const line = stage.querySelector('.scribble-line');
const pause = document.querySelector('[data-pause]');
let paused = false;
pause.addEventListener('click', () => {
  paused = !paused;
  pause.setAttribute('aria-pressed', String(paused));
  pause.setAttribute('aria-label', `${paused ? 'Resume' : 'Pause'} footer animation`);
});
function frameArtwork() {
  stage.style.setProperty('--art-scale', String(stage.getBoundingClientRect().width / 2021.4758));
  if (!phone.matches) {
    svg.setAttribute('viewBox', '0 0 1000 757.56');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  } else {
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    if (!stage.classList.contains('is-animated')) return;
    const bounds = line.getBBox();
    if (bounds.height) svg.setAttribute('viewBox', `0 ${bounds.y - 12} 1000 ${bounds.height + 24}`);
  }
}
new ResizeObserver(frameArtwork).observe(stage);
new MutationObserver(frameArtwork).observe(line, { attributes:true, attributeFilter:['d'] });
new MutationObserver(frameArtwork).observe(stage, { attributes:true, attributeFilter:['class'] });
phone.addEventListener('change', frameArtwork);
frameArtwork();
createMobileScribble(stage, phone);

const items = [...document.querySelectorAll('.refresh-intro > *, .refresh-work > h2, .case-project, .services-section > .content-eyebrow, .services-section > h2, .service-card, .refresh-about > *, .testimonials-header > *, .refresh-quote, .closing-title, .closing-invitation, .refresh-footer-meta')];
items.forEach(item => item.classList.add('refresh-reveal'));
let frame = 0;
function syncReveals() {
  frame = 0;
  document.body.classList.toggle('refresh-hidden', document.hidden);
  const studioBottom = document.querySelector('#studio').getBoundingClientRect().bottom;
  for (const item of items) {
    if (item.classList.contains('is-revealed')) continue;
    const bounds = item.getBoundingClientRect();
    const covered = item.closest('#testimonials') && studioBottom > bounds.top + Math.min(44, bounds.height * .35);
    const inset = item.classList.contains('service-card') && innerWidth >= 1200 ? Math.min(180, innerHeight * .25) : 24;
    if (reduced.matches || (!document.hidden && !covered && bounds.top < innerHeight - inset && bounds.bottom > 0)) item.classList.add('is-revealed');
  }
}
function queueReveals() { if (!frame) frame = requestAnimationFrame(syncReveals); }
addEventListener('scroll', queueReveals, { passive:true });
addEventListener('resize', queueReveals, { passive:true });
document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('refresh-hidden', document.hidden);
  if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
  else if (!document.hidden) queueReveals();
});
reduced.addEventListener('change', queueReveals);
document.fonts.ready.then(queueReveals);
syncReveals();

// Each row fans into its overlapping slots once, pausing if it leaves view.
const serviceCards = [...document.querySelectorAll('.service-card')];
const servicePointer = matchMedia('(min-width:1200px) and (any-hover:hover) and (any-pointer:fine)');
let activeService = null;
let serviceFrame = 0;
let servicePoint = null;
let serviceBounds = null;
function resetServices() {
  if (!activeService && !serviceFrame) return;
  if (serviceFrame) cancelAnimationFrame(serviceFrame);
  serviceFrame = 0;
  activeService = servicePoint = serviceBounds = null;
  for (const card of serviceCards) {
    card.classList.remove('is-service-active');
    for (const key of ['x', 'y', 'turn']) card.style.removeProperty(`--service-hover-${key}`);
  }
}
function swayServices() {
  serviceFrame = 0;
  if (!activeService || !servicePoint || !serviceBounds) return;
  const x = Math.max(-1, Math.min(1, (servicePoint.x - serviceBounds.left) / serviceBounds.width * 2 - 1));
  const y = Math.max(-1, Math.min(1, (servicePoint.y - serviceBounds.top) / serviceBounds.height * 2 - 1));
  activeService.style.setProperty('--service-hover-x', `${x * 12}px`);
  activeService.style.setProperty('--service-hover-y', `${-22 + y * 6}px`);
  activeService.style.setProperty('--service-hover-turn', `${x * 3.5}deg`);
}
for (const [index, card] of serviceCards.entries()) {
  card.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch' || !servicePointer.matches || reduced.matches || document.hidden) return;
    resetServices();
    activeService = card;
    serviceBounds = card.getBoundingClientRect();
    card.classList.add('is-service-active');
    const rowStart = Math.floor(index / 3) * 3;
    for (let i = rowStart; i < rowStart + 3; i++) {
      if (i === index) continue;
      const direction = Math.sign(i - index);
      const distance = Math.abs(i - index);
      serviceCards[i].style.setProperty('--service-hover-x', `${direction * (distance === 1 ? 28 : 16)}px`);
      serviceCards[i].style.setProperty('--service-hover-turn', `${direction * 1.5}deg`);
    }
    servicePoint = { x:event.clientX, y:event.clientY };
    serviceFrame = requestAnimationFrame(swayServices);
  });
  card.addEventListener('pointermove', event => {
    if (activeService !== card || event.pointerType === 'touch') return;
    servicePoint = { x:event.clientX, y:event.clientY };
    if (!serviceFrame) serviceFrame = requestAnimationFrame(swayServices);
  });
  card.addEventListener('pointerleave', () => { if (activeService === card) resetServices(); });
  card.addEventListener('pointercancel', resetServices);
}
addEventListener('scroll', resetServices, { passive:true });
addEventListener('resize', resetServices, { passive:true });
addEventListener('blur', resetServices);
servicePointer.addEventListener('change', resetServices);
reduced.addEventListener('change', resetServices);
document.addEventListener('visibilitychange', () => { if (document.hidden) resetServices(); });
const serviceVisibility = new IntersectionObserver(entries => {
  for (const { target, isIntersecting } of entries) {
    target.classList.toggle('service-fan-offscreen', !isIntersecting);
    if (!isIntersecting && activeService === target) resetServices();
  }
});
serviceCards.forEach(card => serviceVisibility.observe(card));

// Click/tap notes share one controller, with only one open at a time.
const notes = [...document.querySelectorAll('.refresh-note-trigger')].map(trigger => ({
  trigger, note:document.getElementById(trigger.getAttribute('aria-controls'))
}));
let activeNote = null;
let noteFrame = 0;
const noteMotion = notes.flatMap(({ note }) => [...note.querySelectorAll('[data-note-motion-src]')].map(image => ({
  note, image, still:image.getAttribute('src')
})));
function syncNoteMotion() {
  for (const { note, image, still } of noteMotion) {
    const source = activeNote?.note === note && !document.hidden && !reduced.matches ? image.dataset.noteMotionSrc : still;
    if (image.getAttribute('src') !== source) image.setAttribute('src', source);
  }
}
function positionNote() {
  noteFrame = 0;
  if (!activeNote) return;
  const { trigger, note } = activeNote;
  const anchor = trigger.getBoundingClientRect();
  if (anchor.bottom < 0 || anchor.top > innerHeight) { closeNote(); return; }
  const bounds = note.getBoundingClientRect();
  const left = Math.max(24, Math.min(anchor.left + anchor.width / 2 - bounds.width / 2, innerWidth - bounds.width - 24));
  const top = anchor.bottom + 10 + bounds.height <= innerHeight - 24
    ? anchor.bottom + 10 : Math.max(24, anchor.top - bounds.height - 10);
  note.style.setProperty('--note-left', `${left}px`);
  note.style.setProperty('--note-top', `${top}px`);
}
function closeNote() {
  if (activeNote) {
    activeNote.note.hidden = true;
    activeNote.trigger.setAttribute('aria-expanded', 'false');
  }
  activeNote = null;
  syncNoteMotion();
  if (noteFrame) cancelAnimationFrame(noteFrame);
  noteFrame = 0;
}
for (const entry of notes) {
  const { trigger, note } = entry;
  trigger.previousElementSibling.hidden = true;
  trigger.hidden = false;
  trigger.addEventListener('click', () => {
    const wasOpen = activeNote === entry;
    closeNote();
    if (wasOpen) return;
    activeNote = entry;
    note.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    syncNoteMotion();
    positionNote();
  });
  new ResizeObserver(() => { if (activeNote === entry) queueNotePosition(); }).observe(note);
}
document.addEventListener('click', event => {
  if (activeNote && !activeNote.note.contains(event.target) && !activeNote.trigger.contains(event.target)) closeNote();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && activeNote) {
    const { trigger } = activeNote;
    closeNote();
    trigger.focus({ preventScroll:true });
  }
});
function queueNotePosition() { if (activeNote && !noteFrame) noteFrame = requestAnimationFrame(positionNote); }
addEventListener('scroll', queueNotePosition, { passive:true });
addEventListener('resize', queueNotePosition, { passive:true });
reduced.addEventListener('change', syncNoteMotion);
document.addEventListener('visibilitychange', syncNoteMotion);

// Approved bounded canvas rendering for phones, shared in behavior with the current hero.
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
