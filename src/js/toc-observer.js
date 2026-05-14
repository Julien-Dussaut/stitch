const h2Elts = document.querySelectorAll('h2');
const linksToc = document.querySelectorAll('.st-components__toc-link');
const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--st-color-primary').trim();

let sectionVisible = '';

const options = {
  root: null,
  rootMargin: '0px 0px -30% 0px',
  threshold: 0
};

const setActiveLink = (id) => {
  linksToc.forEach(link => link.style.color = '');

  if (!id) return;

  const linkToc = document.querySelector('#toc-' + id);
  if (!linkToc) return;

  linkToc.style.color = primaryColor;
};

const callback = (entries) => {
  const visibleHeadings = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

  if (!visibleHeadings.length) return;

  sectionVisible = visibleHeadings[0].target.id;
  setActiveLink(sectionVisible);
};

const observer = new IntersectionObserver(callback, options);

h2Elts.forEach(h2 => {
  observer.observe(h2);
});