// KERN (übernehmbar, siehe docs/kern.md) – Karteikarten mit Spaced Repetition nach dem Leitner-System.
//
// Jede Karte liegt in einem Fach (1 … Anzahl Intervalle). Gewusst → ein Fach weiter, nicht gewusst → zurück in Fach 1.
// Jedes Fach hat einen Abstand in Tagen (config.json → regeln.leitner.intervalleTage, Standard 1, 2, 4, 8, 16):
// Die Karte ist wieder fällig, wenn so viele Tage vergangen sind. Fälligkeit wird als Kalendertag „JJJJ-MM-TT“
// in Ortszeit gespeichert – so ist eine Karte „morgen“ fällig, egal ob man sie um 8 oder um 23 Uhr gelernt hat.
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

/** Neue Karte: Fach 1, sofort fällig. */
export function neueKarte(heute = tag()) {
  return { fach: 1, faellig: heute, gesehen: 0, gewusst: 0 };
}

/**
 * Bewertet eine Karte. Gibt den neuen Kartenstand zurück (verändert den alten nicht).
 * Gewusst: Fach + 1 (höchstens letztes Fach), fällig nach dem Abstand des neuen Fachs.
 * Nicht gewusst: Fach 1, fällig morgen – heute kommt sie in der laufenden Runde ohnehin noch einmal dran.
 */
export function bewerteKarte(karte, gewusst, { heute = tag(), intervalle = STANDARD_INTERVALLE, jetzt = Date.now() } = {}) {
  const alt = karte || neueKarte(heute);
  const fach = gewusst ? Math.min(alt.fach + 1, intervalle.length) : 1;
  return {
    fach,
    faellig: plusTage(heute, gewusst ? intervalle[fach - 1] : 1),
    gesehen: (alt.gesehen || 0) + 1,
    gewusst: (alt.gewusst || 0) + (gewusst ? 1 : 0),
    ts: jetzt,
  };
}

/** Ist die Karte heute (oder früher) fällig? Karten ohne Stand sind neu und damit fällig. */
export const istFaellig = (karte, heute = tag()) => !karte || karte.faellig <= heute;

/**
 * Stellt eine Lernrunde zusammen: erst überfällige Karten (älteste zuerst, niedriges Fach zuerst), dann neue
 * Karten bis „neuJeRunde“. ids: alle freigeschalteten Karten-IDs; staende: { id: Kartenstand }.
 */
export function faelligeKarten(ids, staende, { heute = tag(), max = 20, neuJeRunde = 10 } = {}) {
  const alt = ids.filter((id) => staende[id] && istFaellig(staende[id], heute))
    .sort((a, b) => staende[a].faellig.localeCompare(staende[b].faellig) || staende[a].fach - staende[b].fach);
  const neu = ids.filter((id) => !staende[id]).slice(0, neuJeRunde);
  return [...alt, ...neu].slice(0, max);
}

/** Übersicht für die Anzeige: Anzahl je Fach, fällig heute, neu. */
export function kastenUebersicht(ids, staende, { heute = tag(), intervalle = STANDARD_INTERVALLE } = {}) {
  const faecher = intervalle.map(() => 0);
  let faellig = 0, neu = 0;
  for (const id of ids) {
    const k = staende[id];
    if (!k) { neu++; continue; }
    faecher[Math.min(k.fach, intervalle.length) - 1]++;
    if (istFaellig(k, heute)) faellig++;
  }
  return { faecher, faellig, neu, gesamt: ids.length };
}
