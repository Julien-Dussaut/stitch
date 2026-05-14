const selectsGetYours = document.querySelectorAll('.st-components__select');
const previewGetYours = document.querySelector('#get-yours-render');
const codeGetYoursHtml = document.querySelector('#getYoursCodeHtml');
const codeGetYoursCss = document.querySelector('#getYoursCodeCss');

const BUTTON_STYLE_PROPERTIES = [
  ['background', 'backgroundColor'],
  ['color', 'color'],
  ['border', 'border'],
  ['padding', 'padding'],
  ['font-size', 'fontSize'],
  ['border-radius', 'borderRadius'],
  ['opacity', 'opacity'],
  ['cursor', 'cursor'],
];

const LOADING_INNER = `
  <span class="st-btn__dots">
    <span></span>
    <span></span>
    <span></span>
  </span>
  <span style="visibility: hidden;">Label</span>`;

function getState() {
  return document.querySelector('#state')?.value ?? 'default';
}

function getPreviewClasses() {
  const classes = ['st-btn'];

  selectsGetYours.forEach(select => {
    if (select.id === 'state' && select.value === 'disabled') {
      return;
    }

    classes.push(`st-btn--${select.value}`);
  });

  return classes;
}

function generatePreview() {
  previewGetYours.className = getPreviewClasses().join(' ');

  const state = getState();
  previewGetYours.toggleAttribute('disabled', state === 'disabled');
  previewGetYours.innerHTML = state === 'loading' ? LOADING_INNER : 'Label';
}

function formatCurrentCss() {
  const state = getState();
  const selector = `.${getPreviewClasses().join('.')}${state === 'disabled' ? ':disabled' : ''}`;
  const styles = getComputedStyle(previewGetYours);
  const declarations = BUTTON_STYLE_PROPERTIES
    .map(([cssProperty, styleProperty]) => {
      const value = styles[styleProperty].trim();

      if (cssProperty === 'opacity' && value === '1') {
        return null;
      }

      if (cssProperty === 'cursor' && (value === 'auto' || value === 'default')) {
        return null;
      }

      return `  ${cssProperty}: ${value};`;
    })
    .filter(Boolean);

  return `${selector} {\n${declarations.join('\n')}\n}`;
}

function generateClasses() {
  let classes = '';
  selectsGetYours.forEach(select => {
    const isStateDisabled = select.id === 'state' && select.value === 'disabled';
    if (!isStateDisabled) {
      classes += `st-btn--${select.value} `;
    }
  });

  const state = getState();
  const disabledAttr = state === 'disabled' ? ' disabled' : '';
  const inner = state === 'loading' ? LOADING_INNER.trim() : 'Label';

  codeGetYoursHtml.textContent = `<button\n\t type="button"\n\t class="st-btn ${classes.trim()}"${disabledAttr}\n>\n\t${inner}\n</button>`;
  Prism.highlightElement(codeGetYoursHtml);

  codeGetYoursCss.textContent = formatCurrentCss();
  Prism.highlightElement(codeGetYoursCss);
}

function updateGetYours() {
  generatePreview();
  generateClasses();
}

updateGetYours();

selectsGetYours.forEach(select => {
  select.addEventListener('change', () => {
    updateGetYours();
  });
});