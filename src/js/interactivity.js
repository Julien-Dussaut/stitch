const checkboxes = document.querySelectorAll('.st-components__checkbox');
const interactiveElements = document.querySelectorAll('.interactive-elt');
console.log({interactiveElements});
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    interactiveElements.forEach(element => {
      element.classList.toggle(`st-btn--no-${checkbox.name}`, !checkbox.checked);
    });
  });
});