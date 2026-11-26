// Lernen: Freischaltung, alte Stände, „sicher“, Bewertung, Reihenfolge der Runde (Unsicheres zuerst), Prüfung
import test from 'node:test';
import assert from 'node:assert/strict';
import { leer } from '../js/kern/speicher.js';
import { poolEintraege, standVon, istSicher, sicherheit, bewerte, uebungsrunde, pruefung, auswertung } from '../js/kern/lernpool.js';

const index = { staffeln: [{ nr: 1, schichten: ['strom', 'logik'], folgen: [
  { id: 'a', schicht: 'strom', status: 'freigegeben', karten: ['a-k01', 'a-k02'], quiz: ['a-q01', 'a-q02'] },
  { id: 'b', schicht: 'logik', status: 'freigegeben', karten: ['b-k01'], quiz: ['b-q01', 'b-q02', 'b-q03'] },
  { id: 'c', schicht: 'logik', status: 'geplant' },
] }] };
const HEUTE = '2026-11-26';
const fest = () => 0.42; // feste „Zufallszahl“ für wiederholbare Tests

test('Nur abgeschlossene Folgen sind übbar', () => {
  const z = leer('t');
  assert.deepEqual(poolEintraege(index, z), []);
  z.folgen.a = { besucht: [], fertig: 10, ts: 10 };
  assert.deepEqual(poolEintraege(index, z).map((e) => `${e.typ}:${e.id}`), ['frage:a-q01', 'frage:a-q02', 'karte:a-k01', 'karte:a-k02']);
});

test('Vorhandener Lernstand wird übernommen: Karten mit Fach, alte Fragen ohne Fach', () => {
  const z = leer('t');
  z.karten['a-k01'] = { fach: 3, faellig: '2026-11-30', gesehen: 2, gewusst: 2, ts: 1 };
  z.karten['a-k02'] = { fach: 1, faellig: '2026-11-27', gesehen: 1, gewusst: 0, ts: 1 };
  z.quiz['a-q01'] = { gesehen: 1, richtig: 1, falsch: 0, zuletzt: true, ts: new Date('2026-11-25T10:00').getTime() };
  z.quiz['a-q02'] = { gesehen: 1, richtig: 0, falsch: 1, zuletzt: false, ts: 1 };
  const e = (typ, id) => ({ typ, id });
  assert.deepEqual([istSicher(e('karte', 'a-k01'), z), istSicher(e('karte', 'a-k02'), z), istSicher(e('frage', 'a-q01'), z), istSicher(e('frage', 'a-q02'), z), istSicher(e('frage', 'neu'), z)],
    [true, false, true, false, false]);
  assert.equal(standVon(e('karte', 'a-k02'), z).fehler, true);
  assert.deepEqual(sicherheit([e('karte', 'a-k01'), e('karte', 'a-k02'), e('frage', 'a-q01')], z), { sicher: 2, gesamt: 3 });
});

test('Bewerten: richtig = ein Fach weiter (dann sicher), falsch = zurück auf unsicher', () => {
  const z = leer('t');
  const q = { typ: 'frage', id: 'a-q01' }, k = { typ: 'karte', id: 'a-k01' };
  bewerte(q, z, true, { heute: HEUTE, jetzt: 1 });
  assert.deepEqual(z.quiz['a-q01'], { gesehen: 1, richtig: 1, falsch: 0, zuletzt: true, ts: 1, fach: 2, faellig: '2026-11-28' });
  assert.ok(istSicher(q, z));
  bewerte(q, z, false, { heute: HEUTE, jetzt: 2 });
  assert.deepEqual([z.quiz['a-q01'].fach, z.quiz['a-q01'].zuletzt, istSicher(q, z)], [1, false, false]);
  for (let i = 0; i < 9; i++) bewerte(k, z, true, { heute: HEUTE, jetzt: 3 + i });
  assert.deepEqual([z.karten['a-k01'].fach, z.karten['a-k01'].gesehen, z.karten['a-k01'].gewusst], [5, 9, 9], 'nie über das letzte Fach');
});

test('Übungsrunde: falsch Beantwortetes, dann Neues, dann Unsicheres, Sicheres zuletzt – begrenzt', () => {
  const z = leer('t');
  const e = ['s1', 's2', 'neu1', 'unsicher', 'falsch', 'neu2'].map((id) => ({ typ: 'karte', id }));
  z.karten.s1 = { fach: 4, faellig: '2026-12-10', gesehen: 3, gewusst: 3, ts: 1 };
  z.karten.s2 = { fach: 2, faellig: '2026-11-28', gesehen: 1, gewusst: 1, ts: 1 };
  z.karten.unsicher = { fach: 1, faellig: '2026-11-27', gesehen: 1, gewusst: 1, ts: 1 };
  z.karten.falsch = { fach: 1, faellig: '2026-11-27', gesehen: 2, gewusst: 1, ts: 1 };
  const r = uebungsrunde(e, z, { max: 10, rnd: fest }).map((x) => x.id);
  assert.equal(r[0], 'falsch');
  assert.deepEqual(new Set(r.slice(1, 3)), new Set(['neu1', 'neu2']));
  assert.equal(r[3], 'unsicher');
  assert.deepEqual(r.slice(4), ['s2', 's1']);
  assert.equal(uebungsrunde(e, z, { max: 3, rnd: fest }).length, 3);
});

test('Prüfung nur Fragen; Auswertung je Folge', () => {
  const z = leer('t');
  z.folgen.a = { besucht: [], fertig: 1, ts: 1 }; z.folgen.b = { besucht: [], fertig: 2, ts: 2 };
  const pr = pruefung(poolEintraege(index, z), { max: 4, rnd: fest });
  assert.equal(pr.length, 4); assert.ok(pr.every((e) => e.typ === 'frage'));
  assert.deepEqual(auswertung([{ eintrag: { folge: 'a' }, richtig: true }, { eintrag: { folge: 'b' }, richtig: false }, { eintrag: { folge: 'a' }, richtig: false }]),
    [{ folge: 'a', richtig: 1, gesamt: 2 }, { folge: 'b', richtig: 0, gesamt: 1 }]);
});
