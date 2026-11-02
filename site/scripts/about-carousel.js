// Add approved image/copy articles with data-about-slide; no automatic cycling.
for (const section of document.querySelectorAll('.refresh-about-carousel')) {
  const slides = [...section.querySelectorAll('[data-about-slide]')];
  const previous = section.querySelector('[data-about-previous]');
  const next = section.querySelector('[data-about-next]');
  const status = section.querySelector('.refresh-about-status');
  if (!slides.length || !previous || !next || !status) continue;
  let current = 0;
  function show(index, announce = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
      if (i === current) {
        // New slides must be readable even if their entrance began offscreen.
        slide.querySelectorAll('.refresh-reveal').forEach(item => item.classList.add('is-revealed'));
      }
    });
    previous.disabled = next.disabled = slides.length < 2;
    if (announce) status.textContent = `About me slide ${current + 1} of ${slides.length}`;
  }
  previous.addEventListener('click', () => show(current - 1, true));
  next.addEventListener('click', () => show(current + 1, true));
  section.querySelector('.refresh-about-controls').addEventListener('keydown', event => {
    if (slides.length < 2 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    show(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1), true);
  });
  // Keep the normal first-slide entrance; only later user changes reveal immediately.
  slides.forEach((slide, i) => { slide.hidden = i !== current; });
  previous.disabled = next.disabled = slides.length < 2;
}
