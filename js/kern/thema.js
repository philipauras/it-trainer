// KERN (übernehmbar, siehe docs/kern.md) – Farben aus config.json anwenden, hell/dunkel/automatisch.
// css/thema.css enthält die neutralen Farben; die Akzentfarbe der App kommt aus config.json → farben.

const dunkelMedia = matchMedia('(prefers-color-scheme: dark)');

export function wendeThemaAn(farben, wahl = 'auto') {
  const dunkel = wahl === 'dunkel' || (wahl === 'auto' && dunkelMedia.matches);
  const f = farben[dunkel ? 'dunkel' : 'hell'];
  const root = document.documentElement;
  root.dataset.theme = dunkel ? 'dunkel' : 'hell';
  root.style.setProperty('--c-akzent', f.akzent);
  root.style.setProperty('--c-akzent-hover', f.akzentHover);
  root.style.setProperty('--c-akzent-weich', f.akzentWeich);
  root.style.setProperty('--c-bg', f.hintergrund);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', f.hintergrund);
}

/** Bei „automatisch“ dem System folgen, wenn es umschaltet. */
export function folgeSystem(farben, wahlAbfragen) {
  dunkelMedia.addEventListener('change', () => wendeThemaAn(farben, wahlAbfragen()));
}

// Lesbare Schriftfarbe auf einer Hintergrundfarbe (z. B. Schicht-Farbe): dunkel auf hellen, weiß auf dunklen Farben.
// Wählt, was nach WCAG den höheren Kontrast ergibt.
export function schriftAuf(hex) {
  const kanal = (i) => { const c = parseInt(hex.slice(i, i + 2), 16) / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const l = 0.2126 * kanal(1) + 0.7152 * kanal(3) + 0.0722 * kanal(5);
  const DUNKEL = 0.0137;  // Luminanz von #1a1d24
  return (1.05 / (l + 0.05)) >= ((l + 0.05) / (DUNKEL + 0.05)) ? '#fff' : '#1a1d24';
}
