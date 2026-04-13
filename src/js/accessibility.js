// color-utils.js

// Convertit hex → luminance relative (WCAG)
function getLuminance(hex) {
  const rgb = hex.match(/\w\w/g).map(x => parseInt(x, 16) / 255);
  const [r, g, b] = rgb.map(c =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Retourne le ratio (1–21)
export function getContrastRatio(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Retourne "AAA", "AA", "AA Large" ou "Fail"
export function getWCAGLevel(ratio, fontSize = 16, bold = false) {
  const isLarge = fontSize >= 24 || (fontSize >= 18.67 && bold);
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3 && isLarge) return 'AA Large';
  return 'Fail';
}

export function checkLineHeight(el) {
  const styles = getComputedStyle(el);
  const lh = parseFloat(styles.lineHeight);
  const fs = parseFloat(styles.fontSize);
  return { value: (lh / fs).toFixed(1), pass: lh / fs >= 1.5 };
}

export function checkTouchTarget(el) {
  const { width, height } = el.getBoundingClientRect();
  return { width, height, pass: width >= 44 && height >= 44 };
}