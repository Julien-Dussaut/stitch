import "../scss/main.scss";
import { 
  createIcons,
  CircleQuestionMark,
  Check,
  ListFilter,
  LayoutGrid,
  CircleCheck,
  ArrowUp,
  ChartNoAxesCombined,
  WandSparkles,
  Clock,
  CircleAlert } from "lucide";
  
  createIcons({
    icons: {
      CircleQuestionMark,
      Check,
      ListFilter,
      LayoutGrid,
      CircleCheck,
      ArrowUp,
      ChartNoAxesCombined,
      WandSparkles,
      Clock,
      CircleAlert
    }
  });
import "./switch-theme";
// import { getContrastRatio } from "./accessibility-calculator";

// console.log("Contrast ratio between primary and background:", getContrastRatio("#5aaab5", "#f7f6f2").toFixed(2));

import { getContrastRatio, getWCAGLevel } from "./accessibility";

document.querySelectorAll('.st-theme').forEach(card => {
  const styles  = getComputedStyle(card);
  const primary = styles.getPropertyValue('--st-color-primary').trim();
  const bg      = styles.getPropertyValue('--st-color-bg').trim();
  const text    = styles.getPropertyValue('--st-color-text').trim();

  const textContrast  = getContrastRatio(text, bg);
  const focusContrast = getContrastRatio(primary, bg);
  // const lh            = checkLineHeight(card);
  // const touch         = checkTouchTarget(card);

  // console.log(card.dataset.theme, { textContrast, focusContrast, lh, touch });
  // console.log(card.dataset.theme, { textContrast, focusContrast });
  // → ensuite tu injectes ces valeurs dans tes badges
});

