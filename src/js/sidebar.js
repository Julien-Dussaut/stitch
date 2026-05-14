const placeholder = document.getElementById('sidebar-placeholder');

if (placeholder) {
  const res = await fetch(new URL('../partials/_sidebar.html', import.meta.url));
  if (!res.ok) {
    throw new Error(`Impossible de charger la sidebar: ${res.status} ${res.statusText}`);
  }

  const html = await res.text();
  placeholder.innerHTML = html;

  document.querySelectorAll('.st-components-sidebar__link').forEach(link => {
    if (link.href === location.href) {
      link.setAttribute('aria-current', 'page');
    }
  });

  initSidebarDrawer();
}

function initSidebarDrawer() {
  const toggle = document.querySelector('.st-components__sidebar-toggle');
  const overlay = document.querySelector('.st-components__sidebar-overlay');
  const sidebar = document.querySelector('.st-components-sidebar');

  if (!toggle || !overlay || !sidebar) return;

  const openSidebar = () => {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const toggleSidebar = () => {
    const isOpen = sidebar.classList.contains('is-open');
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  toggle.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', closeSidebar);

  sidebar.querySelectorAll('.st-components-sidebar__link').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeSidebar();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      closeSidebar();
    }
  });
}