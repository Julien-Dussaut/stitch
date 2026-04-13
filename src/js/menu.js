import { createIcons, icons } from "lucide";

const burger = document.querySelector('.st-header__burger');
const nav = document.querySelector('.st-header__nav');

const setIcon = (name) => {
  const existing = burger.querySelector('i, svg');
  const newIcon = document.createElement('i');
  newIcon.setAttribute('data-lucide', name);
  existing.replaceWith(newIcon);
  createIcons({ icons: icons });
};

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('st-header__nav--open');
  burger.setAttribute('aria-expanded', isOpen);
  setIcon(isOpen ? 'X' : 'Menu');
});
