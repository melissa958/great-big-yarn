// No autoplay: visitors control the pace. Static HTML remains swipeable without JS.
const carousel = document.querySelector('.case-studies');
if (carousel) {
  const viewport = carousel.querySelector('.case-viewport');
  const track = carousel.querySelector('.case-track');
  const slides = [...track.children];
  const status = carousel.querySelector('.case-status');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const count = slides.length;
  let index = 0;
  let position = 1;
  let step = 0;
  let inset = 0;
  let settling = false;
  let timer;
  let drag;
  let nearby = false;

  // Edge copies let both neighbors peek into view, including at the first slide.
  const clone = slide => {
    const copy = slide.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    copy.inert = true;
    copy.dataset.clone = '';
    return copy;
  };
  track.prepend(clone(slides[count - 1]));
  track.append(clone(slides[0]));
  const loadNeighbors = () => {
    if (!nearby) return;
    const wanted = new Set([index, (index + 1) % count, (index + count - 1) % count]);
    for (const i of wanted) slides[i].querySelector('img').loading = 'eager';
    // The visible edge copies share the same cached image requests.
    if (index === 0 || index === count - 1) {
      track.querySelectorAll('[data-clone] img').forEach(img => { img.loading = 'eager'; });
    }
  };
  const paint = (delta = 0) => {
    track.style.transform = `translate3d(${inset - position * step + delta}px, 0, 0)`;
  };
  const announce = () => {
    slides.forEach((slide, i) => {
      slide.inert = i !== index;
      slide.setAttribute('aria-hidden', String(i !== index));
    });
    status.textContent = `${index + 1} of ${count}: ${slides[index].querySelector('h2').textContent}`;
    loadNeighbors();
  };
  const reset = () => {
    clearTimeout(timer);
    carousel.classList.add('case-reset');
    position = index + 1;
    paint();
    // Commit the edge correction before enabling the next transition.
    track.getBoundingClientRect();
    carousel.classList.remove('case-reset');
    settling = false;
  };
  const move = target => {
    if (settling) return;
    const next = (target + count) % count;
    if (next === index) { paint(); return; }
    position = target === -1 ? 0 : target === count ? count + 1 : target + 1;
    index = next;
    settling = true;
    paint();
    announce();
    if (reduced.matches) reset();
    else timer = setTimeout(reset, 720);
  };
  const measure = () => {
    drag = null;
    carousel.classList.remove('case-dragging');
    const width = slides[0].getBoundingClientRect().width;
    step = width + parseFloat(getComputedStyle(track).gap);
    inset = (viewport.clientWidth - width) / 2;
    reset();
  };
  carousel.classList.add('case-ready');
  measure();
  announce();
  carousel.querySelector('.case-controls').hidden = false;
  carousel.querySelector('.case-previous').addEventListener('click', () => move(index - 1));
  carousel.querySelector('.case-next').addEventListener('click', () => move(index + 1));
  viewport.addEventListener('keydown', event => {
    const target = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: count - 1 }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    move(target);
  });
  viewport.addEventListener('pointerdown', event => {
    if (settling || !event.isPrimary || event.button !== 0 || event.target.closest('button, a')) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, active: false };
  });
  viewport.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.active) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
      if (Math.abs(dx) < 10) return;
      drag.active = true;
      viewport.setPointerCapture(event.pointerId);
      carousel.classList.add('case-dragging');
    }
    drag.dx = Math.max(-step * .8, Math.min(step * .8, dx));
    paint(drag.dx);
  });
  const release = event => {
    // Touch starts with implicit capture on the image. Ignore that child's
    // capture-loss event when horizontal dragging transfers capture here.
    if (event.type === 'lostpointercapture' && event.target !== viewport) return;
    if (!drag || event.pointerId !== drag.id) return;
    const { dx, active } = drag;
    drag = null;
    carousel.classList.remove('case-dragging');
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    if (event.type !== 'pointercancel' && active && Math.abs(dx) > 40) move(index + (dx < 0 ? 1 : -1));
    else paint();
  };
  viewport.addEventListener('pointerup', release);
  viewport.addEventListener('pointercancel', release);
  viewport.addEventListener('lostpointercapture', release);
  track.addEventListener('transitionend', event => {
    if (event.target === track && event.propertyName === 'transform' && settling) reset();
  });
  new ResizeObserver(measure).observe(viewport);
  new IntersectionObserver(entries => {
    nearby = entries[0].isIntersecting;
    loadNeighbors();
  }, { rootMargin: '400px 0px' }).observe(carousel);
  reduced.addEventListener('change', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { drag = null; carousel.classList.remove('case-dragging'); reset(); } });
}
