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
