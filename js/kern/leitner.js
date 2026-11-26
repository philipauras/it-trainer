// KERN (übernehmbar, siehe docs/kern.md) – Grundlagen für das Leitner-System: Kalendertage und Fach-Abstände.
// Die Fächer selbst (richtig → ein Fach weiter, falsch → Fach 1) stehen in js/kern/lernpool.js. Fälligkeit wird als
// Kalendertag „JJJJ-MM-TT“ in Ortszeit gespeichert (Speicherformat) und nur noch zum Sortieren benutzt.
// Reine Logik ohne DOM und ohne Speicher; getestet in tests/leitner.test.mjs.

export const STANDARD_INTERVALLE = [1, 2, 4, 8, 16];

/** Kalendertag in Ortszeit, z. B. „2026-11-26“. */
export function tag(datum = new Date()) {
  const d = datum instanceof Date ? datum : new Date(datum);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Tag + n Tage (über Monats- und Jahresgrenzen, auch bei Zeitumstellung). */
export function plusTage(tagText, n) {
  const [j, m, t] = tagText.split('-').map(Number);
  return tag(new Date(j, m - 1, t + n, 12)); // 12 Uhr: Zeitumstellung verschiebt nie den Tag
}
