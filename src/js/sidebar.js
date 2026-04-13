const placeholder = document.getElementById('sidebar-placeholder');

if (placeholder) {
  const res = await fetch(new URL('../partials/_sidebar.html', import.meta.url));
  if (!res.ok) {
    throw new Error(`Impossible de charger la sidebar: ${res.status} ${res.statusText}`);
  }

  const html = await res.text();
  placeholder.innerHTML = html;
}

document.querySelectorAll('.st-components-sidebar__link').forEach(link => {
  if (link.href === location.href) {
    link.setAttribute('aria-current', 'page');
  }
});