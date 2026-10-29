const row = document.querySelector('.studio-photo-row');
const dialog = document.querySelector('.studio-lightbox');
if (row && dialog && typeof dialog.showModal === 'function') {
  const originalList = row.querySelector('.studio-photo-list');
  const originals = [...originalList.querySelectorAll('[data-studio-photo]')];
  const openButton = row.querySelector('.studio-gallery-open');
  const closeButton = dialog.querySelector('[data-gallery-close]');
  const previous = dialog.querySelector('[data-gallery-previous]');
  const next = dialog.querySelector('[data-gallery-next]');
  const image = dialog.querySelector('.studio-lightbox-image');
  const caption = dialog.querySelector('figcaption');
  const status = dialog.querySelector('.studio-lightbox-status');
  let current = 0;
  let returnTarget = openButton;
  function render(index) {
    current = (index + originals.length) % originals.length;
    const link = originals[current];
    image.width = Number(link.dataset.fullWidth);
    image.height = Number(link.dataset.fullHeight);
    image.loading = 'eager';
    image.setAttribute('aria-busy', 'true');
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    caption.textContent = link.dataset.caption ?? '';
    caption.hidden = !caption.textContent;
    if (caption.hidden) dialog.removeAttribute('aria-describedby');
    else dialog.setAttribute('aria-describedby', caption.id);
    status.textContent = `Photo ${current + 1} of ${originals.length}`;
  }
  image.addEventListener('load', () => image.removeAttribute('aria-busy'));
  image.addEventListener('error', () => {
    image.removeAttribute('aria-busy');
    status.textContent = 'This photo could not load. Try the next photo.';
  });
  function open(link, origin) {
    const index = originals.findIndex(item => item.dataset.studioPhoto === link.dataset.studioPhoto);
    if (index < 0) return;
    returnTarget = origin?.closest('[aria-hidden="true"]') ? openButton : origin ?? openButton;
    render(index);
    row.classList.add('studio-gallery-active');
    document.documentElement.classList.add('studio-lightbox-open');
    if (!dialog.open) dialog.showModal();
    closeButton.focus();
  }
  // Moving links are pointer/AT targets. A stationary, focus-revealed button
  // gives keyboard users all ten images without chasing offscreen repetitions.
  row.querySelectorAll('[data-studio-photo]').forEach(link => {
    link.tabIndex = -1;
    link.setAttribute('aria-haspopup', 'dialog');
  });
  openButton.hidden = false;
  openButton.addEventListener('click', () => open(originals[0], openButton));
  row.addEventListener('mousedown', event => {
    if (event.target.closest('[aria-hidden="true"] [data-studio-photo]')) event.preventDefault();
  });
  row.addEventListener('click', event => {
    const link = event.target.closest('[data-studio-photo]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    open(link, link);
  });
  closeButton.addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => render(current - 1));
  next.addEventListener('click', () => render(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === 'Tab') {
      const controls = [closeButton, previous, next];
      const index = controls.indexOf(document.activeElement);
      event.preventDefault();
      controls[(index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length].focus();
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      render(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('studio-lightbox-open');
    row.classList.remove('studio-gallery-active');
    returnTarget?.focus({ preventScroll: true });
  });
}
