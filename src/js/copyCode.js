import { createIcons, icons } from "lucide";

const copyButtons = document.querySelectorAll('[id^="copy"]');

copyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetToCopy = document.querySelector(`#${button.id.replace('copy', 'getYoursCode')}`);
    if (targetToCopy) {
      navigator.clipboard.writeText(targetToCopy.textContent.trim())
        .then(() => {
          const svgIcon = button.querySelector('#' + button.id + 'Icon');
          const newIcon = document.createElement('i');
          newIcon.setAttribute('data-lucide', 'Check');
          newIcon.setAttribute('id', button.id + 'Icon');
          svgIcon.replaceWith(newIcon);
          createIcons({ icons });
          setTimeout(() => {
            const svgIcon = button.querySelector('#' + button.id + 'Icon');
            const newIcon = document.createElement('i');
            newIcon.setAttribute('data-lucide', 'Copy');
            newIcon.setAttribute('id', button.id + 'Icon');
            svgIcon.replaceWith(newIcon);
            createIcons({ icons });
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  });
});


