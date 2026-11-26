// KERN (übernehmbar, siehe docs/kern.md) – Lernen: Quizfragen und Karteikarten abgeschlossener Folgen.
// Reine Logik ohne DOM; getestet in tests/lernpool.test.mjs.
//
// Sichtbar ist nur „X von Y sicher“. Im Hintergrund hat jeder Eintrag ein Fach (Leitner): richtig → ein Fach weiter,
// falsch → Fach 1. „Sicher“ = mindestens Fach 2 (zuletzt gewusst). In einer Runde kommen falsch Beantwortetes und
// Unsicheres zuerst. Fälligkeitstage werden weiter gespeichert (Speicherformat), aber nur zum Sortieren benutzt.
//
// Ein Eintrag ist { typ: 'karte' | 'frage', id, folge, schicht, staffel }. Sein Stand steht im Speicher unter
// zustand.karten[id] bzw. zustand.quiz[id]. Fragen aus Versionen vor 1.5.0 haben kein Fach: Sie werden hier eingeordnet,
// ohne sie zu ändern (zuletzt richtig → Fach 2, zuletzt falsch → Fach 1).
import { tag, plusTage, STANDARD_INTERVALLE } from './leitner.js';
import { alleFolgen, verfuegbar, poolFrei } from './fortschritt.js';
import { mischen } from './logik.js';

/** Alle Einträge abgeschlossener (bzw. im alten Ablauf schon geübter) Folgen, in Planreihenfolge. */
export function poolEintraege(index, zustand) {
  const liste = [];
  for (const f of alleFolgen(index)) {
    if (!verfuegbar(f)) continue;
    const basis = { folge: f.id, schicht: f.schicht, staffel: f.staffel.nr };
    if (poolFrei(zustand, f, 'quiz')) for (const id of f.quiz || []) liste.push({ typ: 'frage', id, ...basis });
    if (poolFrei(zustand, f, 'karten')) for (const id of f.karten || []) liste.push({ typ: 'karte', id, ...basis });
  }
  return liste;
}

/** Stand eines Eintrags: { neu, fach, faellig, fehler } (fehler = zuletzt falsch bzw. nicht gewusst). */
export function standVon(e, zustand) {
  const s = e.typ === 'karte' ? zustand.karten[e.id] : zustand.quiz[e.id];
  if (!s) return { neu: true, fach: 0, faellig: '', fehler: false };
  if (e.typ === 'karte') return { neu: false, fach: s.fach, faellig: s.faellig, fehler: s.fach === 1 && (s.gesehen || 0) > (s.gewusst || 0) };
  if (s.fach && s.faellig) return { neu: false, fach: s.fach, faellig: s.faellig, fehler: s.zuletzt === false };
  const zuletztTag = tag(s.ts || 0);
  return s.zuletzt ? { neu: false, fach: 2, faellig: plusTage(zuletztTag, 2), fehler: false } : { neu: false, fach: 1, faellig: zuletztTag, fehler: true };
}

/** Sitzt der Eintrag? Zuletzt gewusst = mindestens Fach 2. */
export const istSicher = (e, zustand) => standVon(e, zustand).fach >= 2;

/** Für die Anzeige: { sicher, gesamt }. */
export function sicherheit(eintraege, zustand) {
  return { sicher: eintraege.filter((e) => istSicher(e, zustand)).length, gesamt: eintraege.length };
}

/** Antwort bewerten und den neuen Stand in zustand schreiben. Richtig: ein Fach weiter. Falsch: zurück in Fach 1. */
export function bewerte(e, zustand, richtig, { heute = tag(), intervalle = STANDARD_INTERVALLE, jetzt = Date.now() } = {}) {
  const st = standVon(e, zustand);
  const alt = (e.typ === 'karte' ? zustand.karten[e.id] : zustand.quiz[e.id]) || {};
  const fach = richtig ? Math.min((st.neu ? 1 : st.fach) + 1, intervalle.length) : 1;
  const faellig = plusTage(heute, richtig ? intervalle[fach - 1] : 1);
  if (e.typ === 'karte') {
    zustand.karten[e.id] = { fach, faellig, gesehen: (alt.gesehen || 0) + 1, gewusst: (alt.gewusst || 0) + (richtig ? 1 : 0), ts: jetzt };
  } else {
    zustand.quiz[e.id] = {
      gesehen: (alt.gesehen || 0) + 1, richtig: (alt.richtig || 0) + (richtig ? 1 : 0), falsch: (alt.falsch || 0) + (richtig ? 0 : 1),
      zuletzt: richtig, ts: jetzt, fach, faellig,
    };
  }
}

/** Rang für die Reihenfolge: falsch beantwortet → noch nie geübt → unsicher → sicher (niedriges Fach, länger her zuerst). */
function rang(st) { return st.fehler ? 0 : st.neu ? 1 : st.fach < 2 ? 2 : 3; }

/**
 * Übungsrunde (eine Folge oder eine Staffel): falsch Beantwortetes und Unsicheres zuerst, Sicheres zum Auffüllen.
 * Innerhalb gleichen Rangs gemischt, damit Runden nicht gleich aussehen.
 */
export function uebungsrunde(eintraege, zustand, { max = 15, rnd = Math.random } = {}) {
  const mit = mischen(eintraege, rnd).map((e) => ({ e, st: standVon(e, zustand) }));
  mit.sort((a, b) => rang(a.st) - rang(b.st) || a.st.fach - b.st.fach || a.st.faellig.localeCompare(b.st.faellig));
  return mit.slice(0, max).map((x) => x.e);
}

/** Prüfung einer Staffel: nur Fragen, aus allen Folgen gemischt, höchstens max. */
export function pruefung(eintraege, { max = 20, rnd = Math.random } = {}) {
  return mischen(eintraege.filter((e) => e.typ === 'frage'), rnd).slice(0, max);
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
