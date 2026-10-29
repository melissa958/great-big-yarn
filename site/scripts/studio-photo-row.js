// A transform-only photo loop; JavaScript only configures and pauses it.
const row = document.querySelector('.studio-photo-row');
if (row) {
  const track = row.querySelector('.studio-photo-track');
  const list = row.querySelector('.studio-photo-list');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const cover = document.querySelector('.curtain-sequence');
  let copies = [];
  let visible = false;
  let frame = 0;
  function sync() {
    frame = 0;
    const uncovered = !cover || cover.getBoundingClientRect().bottom <= row.getBoundingClientRect().top + 1;
    row.classList.toggle('studio-photos-running', visible && uncovered && !document.hidden && !reduced.matches);
  }
  function queue() { if (!frame && !document.hidden) frame = requestAnimationFrame(sync); }
  function configure() {
    if (reduced.matches) {
      copies.forEach(copy => copy.remove());
      copies = [];
      row.classList.remove('studio-photo-motion', 'studio-photos-running');
      return;
    }
    row.classList.add('studio-photo-motion');
    const scale = Number(getComputedStyle(row).getPropertyValue('--studio-photo-scale'));
    const period = list.getBoundingClientRect().width;
    // Include the initial clipped offset and enough complete periods for wide displays.
    const needed = Math.max(2, Math.ceil((row.clientWidth + 421 * scale) / period) + 1);
    while (copies.length > needed - 1) copies.pop().remove();
    while (copies.length < needed - 1) {
      const copy = list.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      // Repeats remain clickable; the gallery keeps them out of keyboard navigation.
      copy.querySelectorAll('a').forEach(link => { link.tabIndex = -1; });
      copy.querySelectorAll('img').forEach(img => { img.alt = ''; });
      track.append(copy);
      copies.push(copy);
    }
    row.style.setProperty('--studio-photo-duration', `${period / (innerWidth < 600 ? 22 : 28)}s`);
    if (visible) row.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
    sync();
  }
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) row.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
    sync();
  }).observe(row);
  new ResizeObserver(configure).observe(row);
  addEventListener('scroll', queue, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (frame) { cancelAnimationFrame(frame); frame = 0; }
    sync();
  });
  reduced.addEventListener('change', configure);
  configure();
}
