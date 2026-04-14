const selectsGetYours = document.querySelectorAll('.st-components__select');
const previewGetYours = document.querySelector('#get-yours-render');
const codeGetYours = document.querySelector('#getYoursCode');

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

function generatePreview() {
  selectsGetYours.forEach(select => {
    const isStateDisabled = select.id === 'state' && select.value === 'disabled';
    if (!isStateDisabled) {
      previewGetYours.classList.add(`st-btn--${select.value}`);
    }
    select.dataset.previous = select.value;
  });

  const state = getState();
  previewGetYours.toggleAttribute('disabled', state === 'disabled');
  previewGetYours.innerHTML = state === 'loading' ? LOADING_INNER : 'Label';
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

  codeGetYours.textContent = `<button\n \tclass="st-btn ${classes.trim()}"${disabledAttr}\n>\n\t${inner}\n</button>`;
Prism.highlightElement(codeGetYours);
}

generatePreview();
generateClasses();

selectsGetYours.forEach(select => {
  select.addEventListener('change', (event) => {
    const previousValue = select.dataset.previous;
    const newValue = event.target.value;
    previewGetYours.classList.remove(`st-btn--${previousValue}`);
    generateClasses();
    previewGetYours.classList.add(`st-btn--${newValue}`);
    event.target.dataset.previous = newValue;
    generatePreview();
  });
});