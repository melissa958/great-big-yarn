// Tuning: duration, item width and gap are together in client-logos.css.
const strip = document.querySelector('.client-strip');
if (strip) {
  const track = strip.querySelector('.client-track');
  const list = strip.querySelector('.client-list');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const cover = document.querySelector('.curtain-pair');
  let copy;
  let visible = false;
  let pending = false;
  const update = () => {
    pending = false;
    // Intersection alone also sees the sticky section while the curtain covers it.
    const uncovered = visible && (!cover || cover.getBoundingClientRect().bottom <= strip.getBoundingClientRect().top + 1);
    strip.classList.toggle('client-running', visible && uncovered && !document.hidden && !reduced.matches);
  };
  const queue = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  };
  const configure = () => {
    if (reduced.matches) {
      copy?.remove();
      copy = null;
      strip.classList.remove('client-motion', 'client-running');
    } else {
      if (!copy) {
        copy = list.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');
        copy.inert = true;
        copy.querySelectorAll('img').forEach(img => { img.alt = ''; });
        track.append(copy);
      }
      strip.classList.add('client-motion');
      update();
    }
  };
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) strip.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
    update();
  }).observe(strip);
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue, { passive: true });
  document.addEventListener('visibilitychange', update);
  reduced.addEventListener('change', configure);
  configure();
}
