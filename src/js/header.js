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
}