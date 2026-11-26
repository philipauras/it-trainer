// KERN (übernehmbar, siehe docs/kern.md) – Lernpool: Quizfragen und Karteikarten gemeinsam, Leitner-System für beide.
// Reine Logik ohne DOM; getestet in tests/lernpool.test.mjs.
//
// Ein Eintrag ist { typ: 'karte' | 'frage', id, folge, schicht, staffel, fertig } – fertig = Zeitpunkt, an dem die Folge
// abgeschlossen wurde (für „kürzlich abgeschlossen“). Der Stand eines Eintrags steht im Speicher unter zustand.karten[id]
// bzw. zustand.quiz[id]. Fragen hatten früher kein Leitner-Fach: Solche Stände werden hier eingeordnet, ohne sie zu ändern
// (zuletzt richtig → Fach 2, fällig 2 Tage nach der letzten Antwort; zuletzt falsch → Fach 1, sofort fällig).
import { tag, plusTage, STANDARD_INTERVALLE } from './leitner.js';
import { alleFolgen, verfuegbar, poolFrei } from './fortschritt.js';
import { mischen } from './logik.js';

/** Alle freigeschalteten Einträge des Lernpools in Planreihenfolge. */
export function poolEintraege(index, zustand) {
  const liste = [];
  for (const f of alleFolgen(index)) {
    if (!verfuegbar(f)) continue;
    const basis = { folge: f.id, schicht: f.schicht, staffel: f.staffel.nr, fertig: zustand.folgen[f.id]?.fertig || 0 };
    if (poolFrei(zustand, f, 'quiz')) for (const id of f.quiz || []) liste.push({ typ: 'frage', id, ...basis });
    if (poolFrei(zustand, f, 'karten')) for (const id of f.karten || []) liste.push({ typ: 'karte', id, ...basis });
  }
  return liste;
}

/** Stand eines Eintrags: { neu, fach, faellig, fehler } (fehler = zuletzt falsch / nicht gewusst). */
export function standVon(e, zustand) {
  const s = e.typ === 'karte' ? zustand.karten[e.id] : zustand.quiz[e.id];
  if (!s) return { neu: true, fach: 0, faellig: null, fehler: false };
  if (e.typ === 'karte') return { neu: false, fach: s.fach, faellig: s.faellig, fehler: s.fach === 1 && (s.gesehen || 0) > (s.gewusst || 0) };
  if (s.fach && s.faellig) return { neu: false, fach: s.fach, faellig: s.faellig, fehler: s.zuletzt === false };
  const zuletztTag = tag(s.ts || 0);
  return s.zuletzt ? { neu: false, fach: 2, faellig: plusTage(zuletztTag, 2), fehler: false } : { neu: false, fach: 1, faellig: zuletztTag, fehler: true };
}

export const istDran = (st, heute) => st.neu || st.faellig <= heute;

/**
 * Bewertet eine Antwort und schreibt den neuen Stand in zustand. Gewusst/richtig: ein Fach weiter, fällig nach dessen
 * Abstand. Falsch: Fach 1, morgen wieder fällig. Beim freien Üben (Eintrag nicht dran) zählt nur ein Fehler:
 * Richtig ändert den Plan nicht – sonst würde Üben die Wiederholungsabstände verfälschen.
 */
export function bewerte(e, zustand, richtig, { heute = tag(), intervalle = STANDARD_INTERVALLE, jetzt = Date.now() } = {}) {
  const st = standVon(e, zustand);
  const dran = istDran(st, heute);
  const alt = (e.typ === 'karte' ? zustand.karten[e.id] : zustand.quiz[e.id]) || {};
  let fach = st.neu ? 1 : st.fach, faellig = st.faellig;
  if (!richtig) { fach = 1; faellig = plusTage(heute, 1); }
  else if (dran) { fach = Math.min(fach + 1, intervalle.length); faellig = plusTage(heute, intervalle[fach - 1]); }
  if (e.typ === 'karte') {
    zustand.karten[e.id] = { fach, faellig, gesehen: (alt.gesehen || 0) + 1, gewusst: (alt.gewusst || 0) + (richtig ? 1 : 0), ts: jetzt };
  } else {
    zustand.quiz[e.id] = {
      gesehen: (alt.gesehen || 0) + 1, richtig: (alt.richtig || 0) + (richtig ? 1 : 0), falsch: (alt.falsch || 0) + (richtig ? 0 : 1),
      zuletzt: richtig, ts: jetzt, fach, faellig,
    };
  }
  return { dran };
}

/** Mischt so, dass Karten und Fragen sich abwechseln, wo es geht (sonst folgt Karte auf Karte). */
function abwechseln(liste, rnd) {
  const karten = mischen(liste.filter((e) => e.typ === 'karte'), rnd);
  const fragen = mischen(liste.filter((e) => e.typ === 'frage'), rnd);
  const aus = [];
  while (karten.length || fragen.length) {
    const nimmFrage = fragen.length && (!karten.length || fragen.length >= karten.length);
    aus.push(nimmFrage ? fragen.shift() : karten.shift());
  }
  return aus;
}

/**
 * Tagesrunde („Heute wiederholen“): frühere Fehler zuerst, dann fällige Einträge (älteste zuerst), dann neue aus den
 * zuletzt abgeschlossenen Folgen – zusammen höchstens max, davon höchstens neuMax neue. Fehler kommen vorn, der Rest gemischt.
 */
export function tagesrunde(eintraege, zustand, { heute = tag(), max = 15, neuMax = 8, rnd = Math.random } = {}) {
  const mit = eintraege.map((e) => ({ e, st: standVon(e, zustand) }));
  const alt = mit.filter((x) => !x.st.neu && x.st.faellig <= heute)
    .sort((a, b) => (b.st.fehler - a.st.fehler) || a.st.faellig.localeCompare(b.st.faellig) || a.st.fach - b.st.fach);
  const neu = mit.filter((x) => x.st.neu).sort((a, b) => b.e.fertig - a.e.fertig);
  // Neue bekommen mindestens ein Drittel der Runde (sonst würde viel Fälliges Neues dauerhaft verdrängen), freier Platz füllt auf
  const neuZiel = Math.min(neu.length, neuMax);
  const altAnzahl = Math.min(alt.length, max - Math.min(neuZiel, Math.ceil(max / 3)));
  const neuAnzahl = Math.min(neuZiel, max - altAnzahl);
  const auswahl = [...alt.slice(0, altAnzahl), ...neu.slice(0, neuAnzahl)];
  const fehler = auswahl.filter((x) => x.st.fehler).map((x) => x.e);
  const rest = auswahl.filter((x) => !x.st.fehler).map((x) => x.e);
  return [...mischen(fehler, rnd), ...abwechseln(rest, rnd)];
}

/**
 * Gezielte Runde (eine Schicht, Folge oder Staffel): erst Fälliges und Neues, dann zum Auffüllen die schwächsten
 * Einträge (niedriges Fach, früh fällig) – so gibt es auch etwas zu üben, wenn gerade nichts fällig ist.
 */
export function gezielteRunde(eintraege, zustand, { heute = tag(), max = 15, rnd = Math.random } = {}) {
  const mit = eintraege.map((e) => ({ e, st: standVon(e, zustand) }));
  const dran = mit.filter((x) => istDran(x.st, heute));
  const sonst = mit.filter((x) => !istDran(x.st, heute)).sort((a, b) => a.st.fach - b.st.fach || a.st.faellig.localeCompare(b.st.faellig));
  return abwechseln([...dran, ...sonst].slice(0, max).map((x) => x.e), rnd);
}

/** Prüfung einer Staffel: nur Fragen, aus allen Folgen gemischt, höchstens max. */
export function pruefung(eintraege, { max = 20, rnd = Math.random } = {}) {
  return mischen(eintraege.filter((e) => e.typ === 'frage'), rnd).slice(0, max);
}

/**
 * Festigkeit (0…1): Mittelwert über die Einträge – neu = 0, sonst Fach/Fächerzahl; Fälliges zählt nur halb (das Wissen
 * „verblasst“). Rückgabe { wert, faellig, gesamt } oder null, wenn nichts freigeschaltet ist.
 */
export function festigkeit(eintraege, zustand, { heute = tag(), faecher = STANDARD_INTERVALLE.length } = {}) {
  if (!eintraege.length) return null;
  let summe = 0, faellig = 0;
  for (const e of eintraege) {
    const st = standVon(e, zustand);
    if (istDran(st, heute)) faellig++;
    if (st.neu) continue;
    summe += (st.fach / faecher) * (st.faellig <= heute ? 0.5 : 1);
  }
  return { wert: summe / eintraege.length, faellig, gesamt: eintraege.length };
}

/** Auswertung einer Prüfung je Folge: [{ folge, richtig, gesamt }] in Reihenfolge des ersten Auftretens. */
export function auswertung(antworten) {
  const je = new Map();
  for (const { eintrag, richtig } of antworten) {
    const a = je.get(eintrag.folge) || { folge: eintrag.folge, richtig: 0, gesamt: 0 };
    a.gesamt++; if (richtig) a.richtig++;
    je.set(eintrag.folge, a);
  }
  return [...je.values()];
}

/** Übersicht je Fach (Karten und Fragen zusammen) für die Anzeige. */
export function poolUebersicht(eintraege, zustand, { heute = tag(), faecher = STANDARD_INTERVALLE.length } = {}) {
  const je = Array(faecher).fill(0);
  let neu = 0, faellig = 0;
  for (const e of eintraege) {
    const st = standVon(e, zustand);
    if (st.neu) neu++; else je[Math.min(st.fach, faecher) - 1]++;
    if (istDran(st, heute)) faellig++;
  }
  return { faecher: je, neu, faellig, gesamt: eintraege.length };
}
