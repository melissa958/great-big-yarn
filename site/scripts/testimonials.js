// Four editable figures live in index.html. Selection is visitor-controlled.
const section = document.querySelector('.testimonials-section');
if (section) {
  const pair = section.closest('.studio-testimonial-pair');
  const content = section.querySelector('.testimonials-content');
  const studio = pair.querySelector('.studio-section');
  const controls = [...section.querySelectorAll('.testimonial-control')];
  const slides = [...section.querySelectorAll('.testimonial-slide')];
  const navigation = section.querySelector('.testimonial-controls');
  const status = section.querySelector('.testimonial-status');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const activeLine = new URL('../assets/images/testimonials/line-active.svg', import.meta.url).href;
  const inactiveLine = new URL('../assets/images/testimonials/line-inactive.svg', import.meta.url).href;
  let current = 0;
  let frame = 0;
  navigation.hidden = false;

  function measure() {
    frame = 0;
    const style = getComputedStyle(section);
    const required = content.getBoundingClientRect().height + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    // Tall cards scroll in ordinary flow so small screens never lose content.
    pair.classList.toggle('testimonials-curtain-ready', !reduced.matches && required <= innerHeight + .05);
  }
  function queueMeasure() {
    if (!frame) frame = requestAnimationFrame(measure);
  }
  function uncover(behavior = 'instant') {
    const top = scrollY + pair.getBoundingClientRect().top + studio.getBoundingClientRect().height;
    scrollTo({ top, behavior });
  }
  function revealHash() {
    if (location.hash !== '#testimonials') return;
    measure();
    section.focus({ preventScroll: true });
    uncover();
  }
  function select(index, focus = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.remove('is-entering');
      slide.hidden = i !== current;
    });
    controls.forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === current));
      button.querySelector('img').src = i === current ? activeLine : inactiveLine;
    });
    if (!reduced.matches && !document.hidden) slides[current].classList.add('is-entering');
    status.textContent = `Testimonial ${current + 1} of ${slides.length}`;
    if (focus) controls[current].focus({ preventScroll: true });
    queueMeasure();
  }
  controls.forEach((button, index) => button.addEventListener('click', () => select(index)));
  navigation.addEventListener('focusin', () => {
    // Keyboard focus must not stay behind the studio curtain.
    if (pair.classList.contains('testimonials-curtain-ready') && studio.getBoundingClientRect().bottom > navigation.getBoundingClientRect().top) uncover();
  });
  navigation.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = current + 1;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = current - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = slides.length - 1;
    else return;
    event.preventDefault();
    select(next, true);
  });
  document.addEventListener('visibilitychange', () => {
    section.classList.toggle('testimonials-hidden', document.hidden);
    if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
    else if (!document.hidden) queueMeasure();
  });
  new ResizeObserver(queueMeasure).observe(content);
  addEventListener('resize', queueMeasure, { passive: true });
  reduced.addEventListener('change', queueMeasure);
  addEventListener('hashchange', revealHash);
  addEventListener('load', () => document.fonts.ready.then(revealHash));
  document.fonts.ready.then(queueMeasure);
  measure();
}
