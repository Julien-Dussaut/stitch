const titles = document.querySelectorAll('h2');
const placeholder = document.getElementById('toc-placeholder');

if (placeholder) {
  const tocTitle = document.createElement('h3');
  tocTitle.classList.add('st-components__toc-title');
  tocTitle.textContent = 'On this page';
  placeholder.appendChild(tocTitle);

  titles.forEach(title => {
    const link = document.createElement('a');
    link.classList.add('st-components__toc-link');
    link.href = `#${title.id}`;
    link.textContent = title.textContent;
    placeholder.appendChild(link);
  });
}


