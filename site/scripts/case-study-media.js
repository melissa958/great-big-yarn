// Automatic case-study media, gated by visibility and motion preference.
const reduced = matchMedia('(prefers-reduced-motion:reduce)');
const visible = new Set();
const animations = [...document.querySelectorAll('[data-case-animation-src]')].map(image => ({
  image,
  still:image.getAttribute('src'),
}));
const videos = [...document.querySelectorAll('video[data-case-video]')];
function sync() {
  const motionAllowed = !reduced.matches && !document.hidden;
  for (const item of animations) {
    const source = motionAllowed && visible.has(item.image) ? item.image.dataset.caseAnimationSrc : item.still;
    if (item.image.getAttribute('src') !== source) item.image.setAttribute('src', source);
  }
  for (const video of videos) {
    const shouldPlay = motionAllowed && visible.has(video);
    video.autoplay = shouldPlay;
    if (shouldPlay) {
      video.muted = true;
      if (video.paused) video.play().catch(() => { /* Keep the poster if autoplay is unavailable. */ });
    } else {
      video.pause();
      if (reduced.matches && video.readyState > 0 && video.currentTime !== 0) video.currentTime = 0;
    }
  }
}
const observer = new IntersectionObserver(entries => {
  for (const {target, isIntersecting} of entries) {
    if (isIntersecting) visible.add(target);
    else visible.delete(target);
  }
  sync();
});
animations.forEach(item => observer.observe(item.image));
videos.forEach(video => observer.observe(video));
document.addEventListener('visibilitychange', sync);
reduced.addEventListener('change', sync);
sync();
