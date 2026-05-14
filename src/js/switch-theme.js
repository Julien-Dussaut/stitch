// theme-switcher.js
import { getContrastRatio, getWCAGLevel, checkLineHeight, checkTouchTarget } from "./accessibility";
import { createIcons, icons } from "lucide";

const resolveColorToHex = (cssColor) => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = cssColor;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
};

const setBadge = (spanEl, pass) => {
  const badge = spanEl.closest('.st-badge');
  badge.className = `st-badge st-badge--${pass ? 'success' : 'warning'}`;

  const icon = badge.querySelector('i, svg');
  const newIcon = document.createElement('i');
  newIcon.setAttribute('data-lucide', pass ? 'CircleCheck' : 'CircleAlert');
  icon.replaceWith(newIcon);
};

const runAccessibilityAudit = (button) => {
  const style   = getComputedStyle(button);
  const primary = resolveColorToHex(style.getPropertyValue('--st-color-primary').trim());
  const bg      = resolveColorToHex(style.getPropertyValue('--st-color-bg').trim());
  const text    = resolveColorToHex(style.getPropertyValue('--st-color-text').trim());

  const textContrast  = getContrastRatio(text, bg);
  const focusContrast = getContrastRatio(primary, bg);
  const lineHeight    = checkLineHeight(button);
  const touchTarget   = checkTouchTarget(button);


  const themeTitle = document.getElementById('theme-name');
  const contrastSpan    = document.getElementById('contrast-score');
  const focusSpan       = document.getElementById('focus-score');
  const lineHeightSpan  = document.getElementById('line-height-score');
  const touchTargetSpan = document.getElementById('touch-target-score');

  contrastSpan.textContent    = `${textContrast.toFixed(1)}:1`;
  document.getElementById('wcag-score').textContent = `(${getWCAGLevel(textContrast)})`;
  focusSpan.textContent       = `${focusContrast.toFixed(1)}:1`;
  lineHeightSpan.textContent  = lineHeight.value;
  touchTargetSpan.textContent = Math.min(touchTarget.width, touchTarget.height).toFixed(0);
  themeTitle.textContent = button.dataset.themeValue.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  
  setBadge(contrastSpan,    getWCAGLevel(textContrast) !== 'Fail');
  setBadge(focusSpan,       focusContrast >= 3);
  setBadge(lineHeightSpan,  lineHeight.pass);
  setBadge(touchTargetSpan, touchTarget.pass);

  createIcons({ icons: icons });
};

const init = () => {
  const themeButtons = document.querySelectorAll('.st-theme');

  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const themeValue = button.getAttribute('data-theme-value');
      document.documentElement.setAttribute('data-theme', themeValue);

      themeButtons.forEach(btn => btn.classList.remove('st-theme--active'));
      button.classList.add('st-theme--active');
      document.getElementById('theme-name').textContent = themeValue.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      runAccessibilityAudit(button);
    });
  });

  const activeTheme  = document.documentElement.getAttribute('data-theme');
  const activeButton = [...themeButtons].find(
    btn => btn.getAttribute('data-theme-value') === activeTheme
  );
  if (activeButton) runAccessibilityAudit(activeButton);
};

init();