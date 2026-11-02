// Shared navigation for the homepage, contact page and retained previews.
const mobileMenu = matchMedia('(max-width:999px)');
const toggle = document.querySelector('.refresh-menu-toggle');
const navigation = document.querySelector('.refresh-navigation');
let menuOpen = false;
document.body.classList.add('refresh-menu-ready');
function syncMenu() {
  toggle.hidden = !mobileMenu.matches;
  navigation.hidden = mobileMenu.matches && !menuOpen;
  toggle.setAttribute('aria-expanded', String(mobileMenu.matches && menuOpen));
  toggle.textContent = menuOpen ? 'Close' : 'Menu';
}
toggle.addEventListener('click', () => { menuOpen = !menuOpen; syncMenu(); });
navigation.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  menuOpen = false;
  syncMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuOpen) {
    menuOpen = false;
    syncMenu();
    toggle.focus();
  }
});
mobileMenu.addEventListener('change', () => { menuOpen = false; syncMenu(); });
syncMenu();
