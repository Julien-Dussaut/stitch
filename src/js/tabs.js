const tabs = document.querySelectorAll('.st-components__tab-title');
const panels = document.querySelectorAll('.st-components__preview-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-current', 'false'));
    tabs.forEach(t => t.classList.replace('st-btn--primary', 'st-btn--outline'));
    
    tab.setAttribute('aria-current', 'true');
    tab.classList.replace('st-btn--outline', 'st-btn--primary');
    for (const panel of panels) {
      panel.hidden = panel.dataset.tab !== tab.dataset.tab;
    };
  });
 });
