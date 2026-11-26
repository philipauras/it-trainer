// KERN (übernehmbar, siehe docs/kern.md) – Fortschritt auswerten (reine Logik, getestet in tests/fortschritt.test.mjs).
// index = inhalt/index.json, zustand = Speicherstand (js/kern/speicher.js).

/** Alle Folgen in Planreihenfolge, je mit Staffel. */
export const alleFolgen = (index) => index.staffeln.flatMap((s) => s.folgen.map((f) => ({ ...f, staffel: s })));
export const verfuegbar = (f) => f.status !== 'geplant';
export const istFertig = (zustand, id) => !!zustand.folgen[id]?.fertig;

/** Anteil der besuchten Abschnitte einer Folge (0…1). abschnitte: IDs der sichtbaren Abschnitte (ältere Stände können
 *  noch „quiz“/„karten“ in „besucht“ haben – die zählen nicht mit). */
export function folgenAnteil(zustand, id, abschnitte) {
  const f = zustand.folgen[id];
  if (!f) return 0;
  if (f.fertig) return 1;
  return Math.min(1, f.besucht.filter((b) => abschnitte.includes(b)).length / abschnitte.length);
}

/** Die nächste Folge zum Weiterlernen: erste verfügbare, nicht fertige Folge (oder null). */
export function naechsteFolge(index, zustand) {
  return alleFolgen(index).find((f) => verfuegbar(f) && !istFertig(zustand, f.id)) || null;
}

/** Je Schicht: geplant (alle Folgen), verfügbar, fertig. */
export function schichtStaende(index, schichten, zustand) {
  const folgen = alleFolgen(index);
  return schichten.map((s) => {
    const hier = folgen.filter((f) => f.schicht === s.id);
    const staffeln = index.staffeln.filter((st) => st.schichten.includes(s.id));
    return {
      schicht: s, folgen: hier, staffeln,
      geplant: hier.length, verfuegbar: hier.filter(verfuegbar).length, fertig: hier.filter((f) => istFertig(zustand, f.id)).length,
    };
  });
}

/**
 * Wo stehe ich? Die Schicht der nächsten Folge. Sind alle verfügbaren Folgen fertig: die Schicht der zuletzt
 * fertigen Folge. Noch nichts angefangen: die erste Schicht der ersten Folge.
 */
export function aktuelleSchicht(index, zustand) {
  const n = naechsteFolge(index, zustand);
  if (n) return n.schicht;
  const fertig = alleFolgen(index).filter((f) => istFertig(zustand, f.id));
  return fertig.at(-1)?.schicht || alleFolgen(index)[0]?.schicht || null;
}

/**
 * Ist der Lernpool-Teil einer Folge freigeschaltet? Seit 1.5.0 mit „Folge abschließen“. Ältere Stände: Wer Quiz bzw.
 * Karteikarten einer Folge schon durchgearbeitet hat (alter Ablauf), behält sie – nichts geht verloren.
 */
export const poolFrei = (zustand, f, alt) => !!zustand.folgen[f.id]?.fertig || !!zustand.folgen[f.id]?.besucht.includes(alt);

/** Folge als fertig markieren, wenn alle Pflicht-Abschnitte (config regeln.folgeFertigAb) besucht sind. Gibt true zurück, wenn neu fertig. */
export function pruefeFertig(zustand, id, pflicht, jetzt = Date.now()) {
  const f = zustand.folgen[id];
  if (!f || f.fertig) return false;
  if (!pflicht.every((p) => f.besucht.includes(p))) return false;
  f.fertig = jetzt;
  f.ts = jetzt;
  return true;
}

/**
 * Abschnitt als aktuell vermerken und – wenn „zaehlt“ – als erledigt in „besucht“ eintragen (verändert zustand).
 * Quiz und Karteikarten zählen erst, wenn sie durchgearbeitet sind; Textabschnitte schon beim Öffnen.
 */
export function besuche(zustand, id, abschnitt, { zaehlt = true, jetzt = Date.now() } = {}) {
  const f = zustand.folgen[id] || { schritt: null, besucht: [], fertig: null, ts: 0 };
  f.schritt = abschnitt;
  if (zaehlt && !f.besucht.includes(abschnitt)) f.besucht.push(abschnitt);
  f.ts = jetzt;
  zustand.folgen[id] = f;
  return f;
}
