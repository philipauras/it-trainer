// Lernpool: Freischaltung, alte Stände, Leitner für Karten und Fragen, Runden, Festigkeit, Prüfung
import test from 'node:test';
import assert from 'node:assert/strict';
import { leer } from '../js/kern/speicher.js';
import { poolEintraege, standVon, bewerte, tagesrunde, gezielteRunde, pruefung, festigkeit, auswertung, poolUebersicht, istDran } from '../js/kern/lernpool.js';

const index = { staffeln: [{ nr: 1, schichten: ['strom', 'logik'], folgen: [
  { id: 'a', schicht: 'strom', status: 'freigegeben', karten: ['a-k01', 'a-k02'], quiz: ['a-q01', 'a-q02'] },
  { id: 'b', schicht: 'logik', status: 'freigegeben', karten: ['b-k01'], quiz: ['b-q01', 'b-q02', 'b-q03'] },
  { id: 'c', schicht: 'logik', status: 'geplant' },
] }] };
const HEUTE = '2026-11-26';
const fest = () => 0.42; // feste „Zufallszahl“ für wiederholbare Tests

test('Pool: nur abgeschlossene Folgen, mit Schicht und Staffel', () => {
  const z = leer('t');
  assert.deepEqual(poolEintraege(index, z), []);
  z.folgen.a = { besucht: [], fertig: 10, ts: 10 };
  const p = poolEintraege(index, z);
  assert.deepEqual(p.map((e) => `${e.typ}:${e.id}`), ['frage:a-q01', 'frage:a-q02', 'karte:a-k01', 'karte:a-k02']);
  assert.deepEqual([p[0].schicht, p[0].staffel, p[0].fertig], ['strom', 1, 10]);
});

test('Stand: neue Einträge, Karten, alte Fragen ohne Fach werden eingeordnet', () => {
  const z = leer('t');
  z.karten['a-k01'] = { fach: 3, faellig: '2026-11-30', gesehen: 2, gewusst: 2, ts: 1 };
  z.quiz['a-q01'] = { gesehen: 1, richtig: 1, falsch: 0, zuletzt: true, ts: new Date('2026-11-25T10:00').getTime() };
  z.quiz['a-q02'] = { gesehen: 1, richtig: 0, falsch: 1, zuletzt: false, ts: new Date('2026-11-20T10:00').getTime() };
  assert.deepEqual(standVon({ typ: 'karte', id: 'a-k02' }, z), { neu: true, fach: 0, faellig: null, fehler: false });
  assert.deepEqual(standVon({ typ: 'karte', id: 'a-k01' }, z), { neu: false, fach: 3, faellig: '2026-11-30', fehler: false });
  assert.deepEqual(standVon({ typ: 'frage', id: 'a-q01' }, z), { neu: false, fach: 2, faellig: '2026-11-27', fehler: false });
  assert.deepEqual(standVon({ typ: 'frage', id: 'a-q02' }, z), { neu: false, fach: 1, faellig: '2026-11-20', fehler: true });
  assert.ok(istDran(standVon({ typ: 'frage', id: 'a-q02' }, z), HEUTE));
});

test('Bewerten: Leitner für Fragen wie für Karten; freies Üben ändert den Plan nur bei Fehlern', () => {
  const z = leer('t');
  const q = { typ: 'frage', id: 'a-q01' }, k = { typ: 'karte', id: 'a-k01' };
  bewerte(q, z, true, { heute: HEUTE, jetzt: 1 });
  assert.deepEqual(z.quiz['a-q01'], { gesehen: 1, richtig: 1, falsch: 0, zuletzt: true, ts: 1, fach: 2, faellig: '2026-11-28' });
  bewerte(q, z, true, { heute: HEUTE, jetzt: 2 }); // nicht dran: Üben
  assert.deepEqual([z.quiz['a-q01'].fach, z.quiz['a-q01'].faellig, z.quiz['a-q01'].richtig], [2, '2026-11-28', 2]);
  bewerte(q, z, false, { heute: HEUTE, jetzt: 3 });
  assert.deepEqual([z.quiz['a-q01'].fach, z.quiz['a-q01'].faellig, z.quiz['a-q01'].zuletzt], [1, '2026-11-27', false]);
  bewerte(k, z, true, { heute: HEUTE, jetzt: 4 });
  assert.deepEqual(z.karten['a-k01'], { fach: 2, faellig: '2026-11-28', gesehen: 1, gewusst: 1, ts: 4 });
  for (let i = 0; i < 9; i++) { const st = standVon(k, z); bewerte(k, z, true, { heute: st.faellig, jetzt: 5 + i }); }
  assert.equal(z.karten['a-k01'].fach, 5, 'nie über das letzte Fach');
});

test('Tagesrunde: Fehler zuerst, dann Fälliges, Neues aus kürzlich abgeschlossenen Folgen, begrenzt und gemischt', () => {
  const z = leer('t');
  z.folgen.a = { besucht: [], fertig: 10, ts: 10 };
  z.folgen.b = { besucht: [], fertig: 20, ts: 20 };
  z.quiz['a-q02'] = { gesehen: 1, richtig: 0, falsch: 1, zuletzt: false, ts: 1, fach: 1, faellig: '2026-11-25' };
  z.karten['a-k01'] = { fach: 2, faellig: '2026-11-26', gesehen: 1, gewusst: 1, ts: 1 };
  z.karten['a-k02'] = { fach: 4, faellig: '2026-12-20', gesehen: 3, gewusst: 3, ts: 1 }; // nicht fällig
  const p = poolEintraege(index, z);
  const r = tagesrunde(p, z, { heute: HEUTE, max: 5, neuMax: 3, rnd: fest });
  assert.equal(r.length, 5);
  assert.equal(r[0].id, 'a-q02', 'früherer Fehler zuerst');
  assert.ok(r.some((e) => e.id === 'a-k01'), 'Fälliges dabei');
  assert.ok(!r.some((e) => e.id === 'a-k02'), 'nicht Fälliges nicht');
  assert.equal(r.filter((e) => e.folge === 'b').length, 3, 'Neues aus der zuletzt abgeschlossenen Folge zuerst');
  // Viel Fälliges verdrängt Neues nicht ganz
  const viel = Array.from({ length: 30 }, (_, i) => ({ typ: 'karte', id: `x-k${i}`, folge: 'x', fertig: 1 }));
  for (const e of viel) z.karten[e.id] = { fach: 1, faellig: '2026-11-01', gesehen: 1, gewusst: 1, ts: 1 };
  const r2 = tagesrunde([...viel, ...p], z, { heute: HEUTE, max: 15, neuMax: 8, rnd: fest });
  assert.equal(r2.length, 15);
  assert.ok(r2.filter((e) => standVon(e, z).neu).length >= 4);
  assert.deepEqual(tagesrunde([], z, { heute: HEUTE }), []);
});

test('Gezielte Runde füllt mit schwachen Einträgen auf; Prüfung nur Fragen; Auswertung je Folge', () => {
  const z = leer('t');
  z.folgen.a = { besucht: [], fertig: 10, ts: 10 };
  for (const id of ['a-k01', 'a-k02']) z.karten[id] = { fach: 4, faellig: '2026-12-20', gesehen: 3, gewusst: 3, ts: 1 };
  for (const id of ['a-q01', 'a-q02']) z.quiz[id] = { gesehen: 3, richtig: 3, falsch: 0, zuletzt: true, ts: 1, fach: 3, faellig: '2026-12-01' };
  const p = poolEintraege(index, z);
  assert.equal(gezielteRunde(p, z, { heute: HEUTE, max: 10, rnd: fest }).length, 4, 'auch ohne Fälliges gibt es etwas zu üben');
  z.folgen.b = { besucht: [], fertig: 20, ts: 20 };
  const alle = poolEintraege(index, z);
  const pr = pruefung(alle, { max: 4, rnd: fest });
  assert.equal(pr.length, 4); assert.ok(pr.every((e) => e.typ === 'frage'));
  assert.deepEqual(auswertung([{ eintrag: { folge: 'a' }, richtig: true }, { eintrag: { folge: 'b' }, richtig: false }, { eintrag: { folge: 'a' }, richtig: false }]),
    [{ folge: 'a', richtig: 1, gesamt: 2 }, { folge: 'b', richtig: 0, gesamt: 1 }]);
});

test('Festigkeit: neu = 0, Fach zählt, Fälliges verblasst', () => {
  const z = leer('t');
  const e = [{ typ: 'karte', id: 'k1' }, { typ: 'karte', id: 'k2' }];
  assert.equal(festigkeit([], z), null);
  assert.deepEqual(festigkeit(e, z, { heute: HEUTE }), { wert: 0, faellig: 2, gesamt: 2 });
  z.karten.k1 = { fach: 5, faellig: '2026-12-20', gesehen: 5, gewusst: 5, ts: 1 };
  z.karten.k2 = { fach: 5, faellig: '2026-12-20', gesehen: 5, gewusst: 5, ts: 1 };
  assert.equal(festigkeit(e, z, { heute: HEUTE }).wert, 1);
  assert.equal(festigkeit(e, z, { heute: '2026-12-20' }).wert, 0.5, 'fällig → verblasst auf die Hälfte');
  assert.deepEqual(poolUebersicht(e, z, { heute: HEUTE }), { faecher: [0, 0, 0, 0, 2], neu: 0, faellig: 0, gesamt: 2 });
});
