// Visual prototype: replace aria-disabled photo buttons with real project links
// when their case-study pages are ready. No placeholder destinations are used.
const section = document.querySelector('.case-studies');
if (section) {
  const photos = [...section.querySelectorAll('.case-photo')];
  const fine = matchMedia('(any-hover: hover) and (any-pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const OFFSET = 18;
  const EDGE = 12;
  let active = null;
  let point;
  let bounds;
  let badge;
  let size;
  let dirty = true;
  let frame = 0;

  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    if (active) {
      // Keep the last transform during fade-out instead of jumping to the
      // static touch position as the pointer leaves the photo.
      active.classList.remove('is-hovering');
    }
    active = null;
  };
  const paint = () => {
    frame = 0;
    if (!active || !point || document.hidden || reduced.matches) return;
    // Cache geometry between pointer events; refresh only on entry/scroll/resize.
    if (dirty) {
      bounds = active.getBoundingClientRect();
      size = { width: badge.offsetWidth, height: badge.offsetHeight };
      dirty = false;
    }
    if (point.x < bounds.left || point.x > bounds.right || point.y < bounds.top || point.y > bounds.bottom) { stop(); return; }
    const minX = Math.max(EDGE, EDGE - bounds.left);
    const minY = Math.max(EDGE, EDGE - bounds.top);
    const maxX = Math.min(bounds.width, innerWidth - bounds.left) - size.width - EDGE;
    const maxY = Math.min(bounds.height, innerHeight - bounds.top) - size.height - EDGE;
    if (maxX < minX || maxY < minY) { badge.style.visibility = 'hidden'; return; }
    badge.style.visibility = '';
    let x = point.x - bounds.left + OFFSET;
    let y = point.y - bounds.top + OFFSET;
    if (x > maxX) x = point.x - bounds.left - size.width - OFFSET;
    if (y > maxY) y = point.y - bounds.top - size.height - OFFSET;
    active.style.setProperty('--hover-x', `${Math.max(minX, Math.min(maxX, x))}px`);
    active.style.setProperty('--hover-y', `${Math.max(minY, Math.min(maxY, y))}px`);
  };
  const queue = () => { if (!frame) frame = requestAnimationFrame(paint); };
  const enter = (photo, event) => {
    if (event.pointerType === 'touch' || !fine.matches) return;
    if (active !== photo) {
      stop();
      photos.forEach(p => p.classList.remove('is-touch-photo'));
      active = photo;
      badge = photo.querySelector('.case-hover-label');
      badge.style.visibility = '';
      dirty = true;
    }
    point = { x: event.clientX, y: event.clientY };
    active.classList.add('is-hovering');
    active.classList.toggle('is-following', !reduced.matches);
    if (!reduced.matches) queue();
  };
  photos.forEach(photo => {
    photo.addEventListener('pointerenter', event => enter(photo, event));
    photo.addEventListener('pointermove', event => enter(photo, event));
    photo.addEventListener('pointerleave', () => { if (active === photo) stop(); });
    photo.addEventListener('pointercancel', stop);
    photo.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') return;
      stop();
      photos.forEach(p => p.classList.toggle('is-touch-photo', p === photo));
    }, { passive: true });
  });
  const geometryChanged = () => { dirty = true; if (active) queue(); };
  new ResizeObserver(geometryChanged).observe(section);
  addEventListener('scroll', geometryChanged, { passive: true });
  addEventListener('resize', geometryChanged, { passive: true });
  addEventListener('blur', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  const configure = () => {
    stop();
    photos.forEach(photo => {
      photo.classList.remove('is-following');
      photo.querySelector('.case-hover-label').style.visibility = '';
    });
    section.classList.toggle('photo-cursor-ready', fine.matches);
  };
  fine.addEventListener('change', configure);
  reduced.addEventListener('change', configure);
  document.fonts.ready.then(geometryChanged);
  configure();
}
