// KERN (übernehmbar, siehe docs/kern.md) – Quiz-Logik ohne DOM. Herkunft: bim-trainer js/logik.js (Auszug).

/** Fisher-Yates, gibt eine neue Liste zurück. */
export function mischen(liste, rnd = Math.random) {
  const a = liste.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Bereitet eine Frage zur Anzeige vor (gemischte Antworten).
 * Fragen mit `mischen: false` (z. B. „Alle genannten“) behalten ihre Reihenfolge.
 */
export function bereiteFrageVor(frage, { mischenAn = true, rnd = Math.random } = {}) {
  const idx = frage.antworten.map((_, i) => i);
  const reihenfolge = mischenAn && frage.mischen !== false ? mischen(idx, rnd) : idx;
  return { frage, reihenfolge, richtigePosition: reihenfolge.indexOf(frage.richtig) };
}

/** Versionstext für die Anzeige, z. B. „Version 1.1.0 · a1b2c3d“ (lokal: „Version 1.1.0 · lokal“). */
export function versionsText(version, build) {
  return `Version ${version} · ${!build || build === 'dev' ? 'lokal' : build}`;
}

/** Vergleicht Versionsnummern „1.10.0“ > „1.9.2“. Ergebnis < 0, 0, > 0. */
export function versionVergleich(a, b) {
  const x = String(a).split('.').map(Number), y = String(b).split('.').map(Number);
  for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) - (y[i] || 0);
  return 0;
}
