const allowed = new Set(['framed', 'scattered']);
const requested = new URL(location.href).searchParams.get('arrangement');
document.body.dataset.arrangement = allowed.has(requested) ? requested : 'framed';
for (const link of document.querySelectorAll('[data-arrangement-link]')) {
  link.setAttribute('aria-current', String(link.dataset.arrangementLink === document.body.dataset.arrangement));
}
