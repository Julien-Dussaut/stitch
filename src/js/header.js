import { createIcons, icons } from "lucide";

const placeholder = document.querySelector('#header-placeholder');

if (placeholder) {
  const res = await fetch(new URL('../partials/_header.html', import.meta.url));
  if (!res.ok) {
    throw new Error(`Impossible de charger le header: ${res.status} ${res.statusText}`);
  }

  const html = await res.text();
  placeholder.innerHTML = html;

  createIcons({ icons });

  const header = placeholder.querySelector('.st-header');
  const burger = header?.querySelector('.st-header__burger');
  const nav = header?.querySelector('.st-header__nav');

  if (!burger || !nav) {
    throw new Error('Le partial du header ne contient pas les éléments attendus.');
  }

  const setIcon = (name) => {
    const existing = burger.querySelector('i, svg');
    const newIcon = document.createElement('i');
    newIcon.setAttribute('data-lucide', name);
    existing.replaceWith(newIcon);
    createIcons({ icons });
  };

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('st-header__nav--open');
    burger.setAttribute('aria-expanded', isOpen);
    setIcon(isOpen ? 'x' : 'menu');
  });

  initHeaderTheme();
}

function initHeaderTheme() {
  const themeButtons = document.querySelectorAll('[data-theme-value]');
  const savedTheme = localStorage.getItem('stitch:theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  themeButtons.forEach(btn => {
    if (btn.dataset.themeValue === document.documentElement.getAttribute('data-theme')) {
      btn.classList.add('st-header__theme--active');
    }

    btn.addEventListener('click', () => {
      const themeValue = btn.dataset.themeValue;
      document.documentElement.setAttribute('data-theme', themeValue);
      localStorage.setItem('stitch:theme', themeValue);
      themeButtons.forEach(b => b.classList.remove('st-header__theme--active'));
      btn.classList.add('st-header__theme--active');
    });
  });
}