// Preview tuning: desktop breakpoint and the fade's distance from screen center.
const OPPORTUNITY_SCROLL = { desktopWidth: 1000, holdRadius: .22, fadeRadius: .46 };
const wrapper = document.querySelector('.opportunity-reveal');
const story = wrapper?.querySelector('.opportunity-scroll');
if (story) {
  const points = [...story.querySelectorAll('.opportunity-card')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia(`(min-width: ${OPPORTUNITY_SCROLL.desktopWidth}px)`);
  let frame = 0;
  let visible = false;
  function update() {
    frame = 0;
    if (document.hidden || !visible) return;
    for (const point of points) {
      if (reduced.matches || !desktop.matches) {
        point.style.removeProperty('--point-opacity');
        continue;
      }
      const rect = point.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - innerHeight / 2);
      const fadeDistance = innerHeight * (OPPORTUNITY_SCROLL.fadeRadius - OPPORTUNITY_SCROLL.holdRadius);
      const progress = 1 - Math.max(0, Math.min(1, (distance - innerHeight * OPPORTUNITY_SCROLL.holdRadius) / fadeDistance));
      // Smoothstep softens the start/end; adjacent points never overlap fades.
      point.style.setProperty('--point-opacity', String(progress * progress * (3 - 2 * progress)));
    }
  }
  function queue() {
    if (!frame && !document.hidden && visible) frame = requestAnimationFrame(update);
  }
  function measure() {
    wrapper.classList.add('opportunity-scroll-ready');
    wrapper.style.setProperty('--opportunity-overflow', `${Math.max(0, story.offsetHeight - wrapper.clientHeight)}px`);
    queue();
  }
  new ResizeObserver(measure).observe(story);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    queue();
  }).observe(story);
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', measure, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
    else queue();
  });
  reduced.addEventListener('change', measure);
  desktop.addEventListener('change', measure);
  document.fonts.ready.then(measure);
  measure();
}
