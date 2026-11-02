// Shared navigation for the homepage, contact and project pages/previews.
const mobileMenu = matchMedia('(max-width:999px)');
const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
const toggle = document.querySelector('.refresh-menu-toggle');
const navigation = document.querySelector('.refresh-navigation');
const header = toggle.parentElement;
const panel = document.createElement('dialog');
panel.className = 'refresh-mobile-menu-panel';
panel.setAttribute('aria-label', 'Site menu');
document.body.append(panel);
toggle.replaceChildren(Object.assign(document.createElement('span'), { className:'refresh-menu-icon' }));
toggle.firstElementChild.setAttribute('aria-hidden', 'true');
let closing = false;
let closeTimer;
let openFrame;

document.body.classList.add('refresh-menu-ready');
function syncMenu() {
  toggle.hidden = !mobileMenu.matches;
  navigation.hidden = mobileMenu.matches && !panel.open;
  toggle.setAttribute('aria-expanded', String(panel.open));
  toggle.setAttribute('aria-label', panel.open ? 'Close menu' : 'Open menu');
  toggle.classList.toggle('is-menu-open', panel.open);
}
function finishClose(returnFocus) {
  clearTimeout(closeTimer);
  cancelAnimationFrame(openFrame);
  panel.classList.remove('is-open');
  panel.close();
  header.prepend(toggle, navigation);
  document.body.classList.remove('refresh-menu-open');
  closing = false;
  syncMenu();
  if (returnFocus && mobileMenu.matches) toggle.focus({ preventScroll:true });
}
function closeMenu({ animate = true, returnFocus = true } = {}) {
  if (!panel.open || closing) return;
  closing = true;
  cancelAnimationFrame(openFrame);
  panel.classList.remove('is-open');
  if (!animate || reducedMotion.matches) finishClose(returnFocus);
  else closeTimer = setTimeout(() => finishClose(returnFocus), 440);
}
function openMenu() {
  if (!mobileMenu.matches || panel.open) return;
  navigation.hidden = false;
  panel.append(toggle, navigation);
  document.body.classList.add('refresh-menu-open');
  panel.showModal();
  syncMenu();
  // Establish the right-hand starting position before the entrance transition.
  panel.getBoundingClientRect();
  openFrame = requestAnimationFrame(() => panel.classList.add('is-open'));
  toggle.focus({ preventScroll:true });
}
// Pointer-opened dialogs can inherit a browser focus ring after showModal().
// Suppress it only on this control until the next keyboard interaction.
document.addEventListener('pointerdown', () => toggle.classList.add('is-pointer-focus'), { passive:true });
document.addEventListener('keydown', () => toggle.classList.remove('is-pointer-focus'));
toggle.addEventListener('click', event => {
  if (event.detail === 0) toggle.classList.remove('is-pointer-focus');
  panel.open ? closeMenu() : openMenu();
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu({ animate:false, returnFocus:false });
});
panel.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const items = [...panel.querySelectorAll('button:not(:disabled), a[href]')];
  const index = items.indexOf(document.activeElement);
  event.preventDefault();
  items[(index + (event.shiftKey ? -1 : 1) + items.length) % items.length].focus();
});
panel.addEventListener('cancel', event => {
  event.preventDefault();
  closeMenu();
});
panel.addEventListener('transitionend', event => {
  if (closing && event.target === panel && event.propertyName === 'transform') finishClose(true);
});
mobileMenu.addEventListener('change', () => {
  if (panel.open) finishClose(false);
  syncMenu();
});
syncMenu();
