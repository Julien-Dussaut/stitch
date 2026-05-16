const button = {
  button: {
    baseClass: 'st-btn',
    variants: ['primary', 'outline', 'ghost', 'success', 'danger', 'warning', 'info'],
    sizes: ['small', 'medium', 'large'],
    states: ['disabled', 'loading'],
    tag: (classes, disabled, inner) => `<button\n\ttype="button"\n\tclass="${classes}"${disabled}\n>\n\t${inner}\n</button>`,
    css: {
      base: `display: inline-flex;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: var(--st-radius-lg);\n\tborder: 1px solid transparent;\n\ttext-decoration: none;\n\ttransition: color var(--st-transition),\n\t\tbackground-color var(--st-transition),\n\t\tborder-color var(--st-transition);`,
      variants: {
        primary: `background-color: var(--st-color-primary);\n\tcolor: var(--st-color-text-inverse);`,
        outline: `background-color: transparent;\n\tcolor: var(--st-color-primary);\n\tborder-color: var(--st-color-primary);`,
        ghost: `background-color: transparent;\n\tcolor: var(--st-color-text-muted);\n\tborder-color: transparent;`,
        success: `background-color: var(--st-color-success-hl);\n\tcolor: var(--st-color-success);\n\tborder: 1px solid var(--st-color-success);`,
        danger: `background-color: var(--st-color-danger-hl);\n\tcolor: var(--st-color-danger);\n\tborder: 1px solid var(--st-color-danger);`,
        warning: `background-color: var(--st-color-warning-hl);\n\tcolor: var(--st-color-warning);\n\tborder: 1px solid var(--st-color-warning);`,
        info: `background-color: var(--st-color-info-hl);\n\tcolor: var(--st-color-info);\n\tborder: 1px solid var(--st-color-info);`,
      },
      sizes: {
        small: `padding: var(--st-space-1) var(--st-space-2);\n\tfont-size: var(--st-text-xs);`,
        medium: `padding: var(--st-space-2) var(--st-space-4);\n\tfont-size: var(--st-text-sm);`,
        large: `padding: var(--st-space-3) var(--st-space-6);\n\tfont-size: var(--st-text-base);`,
      },
      states: {
        disabled: {
          primary: `color: var(--st-text-muted);\n\tbackground-color: var(--st-color-primary-hl);\n\tcursor: not-allowed;`,
          outline: `color: var(--st-color-primary-hl);\n\tbackground-color: transparent;\n\tborder-color: var(--st-color-primary-hl);\n\tcursor: not-allowed;`,
          ghost: `color: var(--st-color-text-muted);\n\tbackground-color: transparent;\n\tcursor: not-allowed;`,
          success: `color: var(--st-color-text-muted);\n\tbackground-color: transparent;\n\tborder-color: var(--st-color-success-hl);\n\tcursor: not-allowed;`,
          danger: `color: var(--st-color-text-muted);\n\tbackground-color: transparent;\n\tborder-color: var(--st-color-danger-hl);\n\tcursor: not-allowed;`,
          warning: `color: var(--st-color-text-muted);\n\tbackground-color: transparent;\n\tborder-color: var(--st-color-warning-hl);\n\tcursor: not-allowed;`,
          info: `color: var(--st-color-text-muted);\n\tbackground-color: transparent;\n\tborder-color: var(--st-color-info-hl);\n\tcursor: not-allowed;`,
        },
        loading: `position: relative;\n\tpointer-events: none;`,
      },
    },
  },
}

export default button.button;