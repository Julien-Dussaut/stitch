import components from './index-components.js';

const selectsGetYours = document.querySelectorAll('.st-components__select');
const previewGetYours = document.querySelector('#get-yours-render');
const codeGetYoursHtml = document.querySelector('#getYoursCodeHtml');
const codeGetYoursCss = document.querySelector('#getYoursCodeCss');
const codeGetYoursCssTokens = document.querySelector('#getYoursCodeCssTokens');
const currentComponent = document.querySelector('[data-component]')?.dataset.component;
const component = components[currentComponent];
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
  const { baseClass } = component;
  const classes = [baseClass];

  selectsGetYours.forEach(select => {
    if (select.id === 'state') return;
    classes.push(`${baseClass}--${select.value}`);
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
  const classes = getPreviewClasses();
  const css = component.css;

  let rulesMultiLines = `\n.${classes[0]} {\n\t${css.base}\n}`;

  for (let i = 1; i < classes.length; i++) {
    const className = classes[i].replace(`${component.baseClass}--`, '');
    const variantRule = css.variants[className];
    const sizeRule = css.sizes[className];
    const stateRule = state === 'disabled' ? css.states.disabled[className] : null;
    const loadingRule = state === 'loading' ? css.states.loading : null;

    if (variantRule) {
      rulesMultiLines += `\n\n.${classes[i]} {\n\t${variantRule}\n}`;
    }
    if (sizeRule) {
      rulesMultiLines += `\n\n.${classes[i]} {\n\t${sizeRule}\n}`;
    }
    if (stateRule) {
      rulesMultiLines += `\n\n.${classes[i]}:disabled {\n\t${stateRule}\n}`;
    }
    if (loadingRule) {
      rulesMultiLines += `\n\n.st-btn--loading {\n\t${loadingRule}\n}`;
    }
  }

  return rulesMultiLines;
}

function generateClasses() {
  const classes = getPreviewClasses().join(' ');
  const state = getState();
  const disabledAttr = state === 'disabled' ? ' disabled' : '';
  const inner = state === 'loading' ? LOADING_INNER.trim() : 'Label';

  codeGetYoursHtml.textContent = component.tag(classes, disabledAttr, inner);
  Prism.highlightElement(codeGetYoursHtml);

  codeGetYoursCss.textContent = formatCurrentCss();
  Prism.highlightElement(codeGetYoursCss);

  codeGetYoursCssTokens.textContent = getTokensValues(formatCurrentCss());
  Prism.highlightElement(codeGetYoursCssTokens);
}

function getTokensValues(css) {
  const regex = /var\(--(st-[\w-]+)\)/g;
  const tokens = new Set();
  let match;

  while ((match = regex.exec(css)) !== null) {
    tokens.add(match[1]);
  }

  const tokenValues = {};
  tokens.forEach(token => {
    tokenValues[token] = getComputedStyle(document.documentElement).getPropertyValue(`--${token}`).trim();
  });

  let tokenContent = ':root {\n';
  tokenContent += Object.entries(tokenValues).map(([token, value]) => `  --${token}: ${value};`).join('\n');
  tokenContent += '\n}';
  return tokenContent;
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