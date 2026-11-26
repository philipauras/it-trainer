import test from 'node:test';
import assert from 'node:assert/strict';
import { leer } from '../js/kern/speicher.js';
import { naechsteFolge, schichtStaende, aktuelleSchicht, freigeschalteteKarten, pruefeFertig, besuche, folgenAnteil } from '../js/kern/fortschritt.js';

const index = { staffeln: [
  { nr: 1, schichten: ['strom', 'logik'], folgen: [
    { id: 's1f01', schicht: 'strom', status: 'freigegeben', karten: ['s1f01-k01', 's1f01-k02'] },
    { id: 's1f02', schicht: 'logik', status: 'entwurf', karten: ['s1f02-k01'] },
    { id: 's1f03', schicht: 'logik', status: 'geplant' },
  ] },
  { nr: 2, schichten: ['netz'], folgen: [] },
] };
const schichten = [{ id: 'strom' }, { id: 'logik' }, { id: 'netz' }];

test('Weiterlernen, Schichten und „Du bist hier“', () => {
  const z = leer('t');
  assert.equal(naechsteFolge(index, z).id, 's1f01');
  assert.equal(aktuelleSchicht(index, z), 'strom');
  z.folgen.s1f01 = { besucht: [], fertig: 1, ts: 1 };
  assert.equal(naechsteFolge(index, z).id, 's1f02');
  assert.equal(aktuelleSchicht(index, z), 'logik');
  z.folgen.s1f02 = { besucht: [], fertig: 2, ts: 2 };
  assert.equal(naechsteFolge(index, z), null, 'geplante Folgen zählen nicht');
  assert.equal(aktuelleSchicht(index, z), 'logik');
  const st = schichtStaende(index, schichten, z);
  assert.deepEqual(st.map((s) => [s.geplant, s.verfuegbar, s.fertig]), [[1, 1, 1], [2, 1, 1], [0, 0, 0]]);
  assert.equal(st[2].staffeln[0].nr, 2);
});

test('Besuche, Fertig-Regel und freigeschaltete Karten', () => {
  const z = leer('t');
  besuche(z, 's1f01', 'einstieg', { jetzt: 5 });
  besuche(z, 's1f01', 'quiz', { zaehlt: false, jetzt: 6 });
  assert.deepEqual(z.folgen.s1f01, { schritt: 'quiz', besucht: ['einstieg'], fertig: null, ts: 6 });
  assert.equal(folgenAnteil(z, 's1f01', ['einstieg', 'geschichte', 'prinzip', 'werkstatt']), 1 / 4);
  assert.equal(folgenAnteil({ folgen: { x: { besucht: ['einstieg', 'quiz', 'karten'] } } }, 'x', ['einstieg', 'fazit']), 1 / 2, 'alte Abschnitte zählen nicht');
  assert.deepEqual(freigeschalteteKarten(index, z), []);
  assert.equal(pruefeFertig(z, 's1f01', ['quiz', 'karten'], 7), false);
  besuche(z, 's1f01', 'quiz'); besuche(z, 's1f01', 'karten');
  assert.deepEqual(freigeschalteteKarten(index, z), ['s1f01-k01', 's1f01-k02']);
  assert.equal(pruefeFertig(z, 's1f01', ['quiz', 'karten'], 9), true);
  assert.equal(z.folgen.s1f01.fertig, 9);
  assert.equal(pruefeFertig(z, 's1f01', ['quiz', 'karten'], 10), false, 'nur einmal');
  assert.equal(folgenAnteil(z, 's1f01', ['einstieg']), 1);
});

test('Lernpool-Freischaltung: mit Abschluss der Folge – alte Stände (Karten schon durchgearbeitet) behalten ihre Karten', async () => {
  const { freigeschalteteFragen } = await import('../js/kern/fortschritt.js');
  const idx = { staffeln: [{ nr: 1, schichten: ['strom'], folgen: [
    { id: 'a', schicht: 'strom', status: 'freigegeben', karten: ['a-k01'], quiz: ['a-q01'] },
    { id: 'b', schicht: 'strom', status: 'freigegeben', karten: ['b-k01'], quiz: ['b-q01'] },
  ] }] };
  const z = leer('t');
  assert.deepEqual([freigeschalteteKarten(idx, z), freigeschalteteFragen(idx, z)], [[], []]);
  z.folgen.a = { besucht: ['einstieg'], fertig: 5, ts: 5 };
  assert.deepEqual([freigeschalteteKarten(idx, z), freigeschalteteFragen(idx, z)], [['a-k01'], ['a-q01']]);
  z.folgen.b = { besucht: ['karten'], fertig: null, ts: 1 }; // alter Ablauf: Karten gesehen, Quiz nicht
  assert.deepEqual([freigeschalteteKarten(idx, z), freigeschalteteFragen(idx, z)], [['a-k01', 'b-k01'], ['a-q01']]);
});
