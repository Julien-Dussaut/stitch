const tabs = document.querySelectorAll('.st-components__tab-title');
const panels = document.querySelectorAll('.st-components__preview-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tabs.forEach(t => t.setAttribute('tabindex', '-1'));
    tabs.forEach(t => t.classList.replace('st-btn--primary', 'st-btn--outline'));
    
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.classList.replace('st-btn--outline', 'st-btn--primary');
    for (const panel of panels) {
      panel.hidden = panel.dataset.tab !== tab.dataset.tab;
    };
  });
 });
