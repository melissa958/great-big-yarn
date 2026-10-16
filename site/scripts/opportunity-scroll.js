// Section 3 tuning: desktop breakpoint and fade distances from screen center.
const OPPORTUNITY_SCROLL = { desktopWidth: 1000, holdRadius: .22, fadeRadius: .46 };
const wrapper = document.querySelector('.opportunity-reveal');
const story = wrapper?.querySelector('.opportunity-scroll');
if (story) {
  const points = [...story.querySelectorAll('.opportunity-card')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia(`(min-width: ${OPPORTUNITY_SCROLL.desktopWidth}px)`);
  const artwork = [...story.querySelectorAll('[data-section-motion]')];
  const curtain = document.querySelector('.curtain-pair');
  const visibleArtwork = new Set();
  let frame = 0;
  let visible = false;
  function syncArtwork() {
    for (const art of artwork) {
      const uncovered = visibleArtwork.has(art) && (!curtain || curtain.getBoundingClientRect().bottom <= art.getBoundingClientRect().top);
      art.classList.toggle(art.dataset.sectionMotion, uncovered && !document.hidden && !reduced.matches);
    }
  }
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
    syncArtwork();
  }
  function queue() {
    if (!frame && !document.hidden && visible) frame = requestAnimationFrame(update);
  }
  function measure() {
    wrapper.classList.add('opportunity-scroll-ready');
    // Integer layout heights can reserve an extra half-pixel below the logos.
    // Preserve fractional heights so the next section meets the story exactly.
    const overflow = story.getBoundingClientRect().height - wrapper.getBoundingClientRect().height;
    wrapper.style.setProperty('--opportunity-overflow', `${Math.max(0, overflow)}px`);
    syncArtwork();
    queue();
  }
  new ResizeObserver(measure).observe(story);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    queue();
  }).observe(story);
  const artworkObserver = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) visibleArtwork.add(target); else visibleArtwork.delete(target);
    }
    syncArtwork();
  });
  for (const art of artwork) artworkObserver.observe(art);
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', measure, { passive: true });
  document.addEventListener('visibilitychange', () => {
    syncArtwork();
    if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
    else queue();
  });
  reduced.addEventListener('change', measure);
  desktop.addEventListener('change', measure);
  document.fonts.ready.then(measure);
  measure();
}
