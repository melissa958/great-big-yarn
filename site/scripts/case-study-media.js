// Native video controls and an independently pausable inline brand animation.
const reduced = matchMedia('(prefers-reduced-motion:reduce)');
const visible = new Set();
const animations = [...document.querySelectorAll('[data-case-animation]')].map(figure => ({
  image:figure.querySelector('[data-case-animation-src]'),
  button:figure.querySelector('button'),
  choice:null,
  label:figure.querySelector('button').dataset.animationLabel || 'brand animation',
}));
const videos = [...document.querySelectorAll('video[data-case-video]')];
for (const item of animations) {
  item.still = item.image.getAttribute('src');
  item.button.hidden = false;
  item.button.addEventListener('click', () => {
    item.choice = !(item.choice ?? !reduced.matches);
    sync();
  });
}
function sync() {
  for (const item of animations) {
    const wantsMotion = item.choice ?? !reduced.matches;
    const active = wantsMotion && visible.has(item.image) && !document.hidden;
    const source = active ? item.image.dataset.caseAnimationSrc : item.still;
    if (item.image.getAttribute('src') !== source) item.image.setAttribute('src', source);
    item.button.textContent = wantsMotion ? 'Pause animation' : 'Play animation';
    item.button.setAttribute('aria-label', `${wantsMotion ? 'Pause' : 'Play'} ${item.label}`);
  }
  if (document.hidden) videos.forEach(video => video.pause());
}
const observer = new IntersectionObserver(entries => {
  for (const {target, isIntersecting} of entries) {
    if (isIntersecting) visible.add(target);
    else {
      visible.delete(target);
      if (target instanceof HTMLVideoElement) target.pause();
    }
  }
  sync();
});
animations.forEach(item => observer.observe(item.image));
videos.forEach(video => observer.observe(video));
document.addEventListener('visibilitychange', sync);
reduced.addEventListener('change', () => {
  animations.forEach(item => { item.choice = null; });
  if (reduced.matches) videos.forEach(video => video.pause());
  sync();
});
sync();
