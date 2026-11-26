import test from 'node:test';
import assert from 'node:assert/strict';
import { tag, plusTage, neueKarte, bewerteKarte, istFaellig, faelligeKarten, kastenUebersicht, STANDARD_INTERVALLE } from '../js/kern/leitner.js';

test('Kalendertage: Ortszeit, über Monats-/Jahresgrenzen und Zeitumstellung', () => {
  assert.equal(tag(new Date(2026, 10, 26, 23, 59)), '2026-11-26');
  assert.equal(plusTage('2026-11-30', 1), '2026-12-01');
  assert.equal(plusTage('2026-12-31', 1), '2027-01-01');
  assert.equal(plusTage('2027-03-27', 2), '2027-03-29'); // Sommerzeit-Beginn dazwischen
  assert.equal(plusTage('2028-02-28', 1), '2028-02-29'); // Schaltjahr
});

test('Leitner: gewusst → nächstes Fach mit dessen Abstand, nicht gewusst → Fach 1, morgen', () => {
  const heute = '2026-11-26';
  let k = bewerteKarte(null, true, { heute, jetzt: 1 });
  assert.deepEqual(k, { fach: 2, faellig: '2026-11-28', gesehen: 1, gewusst: 1, ts: 1 });
  k = bewerteKarte(k, true, { heute: '2026-11-28' });
  assert.equal(k.fach, 3); assert.equal(k.faellig, '2026-12-02');
  k = bewerteKarte(k, true, { heute: '2026-12-02' }); assert.equal(k.fach, 4); assert.equal(k.faellig, '2026-12-10');
  k = bewerteKarte(k, true, { heute: '2026-12-10' }); assert.equal(k.fach, 5); assert.equal(k.faellig, '2026-12-26');
  k = bewerteKarte(k, true, { heute: '2026-12-26' }); assert.equal(k.fach, 5, 'höchstens letztes Fach'); assert.equal(k.faellig, '2027-01-11');
  const vergessen = bewerteKarte(k, false, { heute: '2027-01-11' });
  assert.equal(vergessen.fach, 1); assert.equal(vergessen.faellig, '2027-01-12'); assert.equal(vergessen.gewusst, k.gewusst);
  assert.equal(k.fach, 5, 'alter Stand bleibt unverändert');
  assert.deepEqual(STANDARD_INTERVALLE, [1, 2, 4, 8, 16]);
});

test('Fälligkeit, Rundenauswahl und Übersicht', () => {
  const heute = '2026-11-26';
  assert.ok(istFaellig(undefined, heute));
  assert.ok(istFaellig(neueKarte(heute), heute));
  assert.ok(!istFaellig({ fach: 2, faellig: '2026-11-27' }, heute));
  const staende = {
    a: { fach: 3, faellig: '2026-11-20' }, b: { fach: 1, faellig: '2026-11-20' }, c: { fach: 2, faellig: '2026-11-25' },
    d: { fach: 4, faellig: '2026-12-01' },
  };
  const ids = ['a', 'b', 'c', 'd', 'n1', 'n2', 'n3'];
  assert.deepEqual(faelligeKarten(ids, staende, { heute, neuJeRunde: 2 }), ['b', 'a', 'c', 'n1', 'n2']);
  assert.deepEqual(faelligeKarten(ids, staende, { heute, max: 2 }), ['b', 'a']);
  assert.deepEqual(kastenUebersicht(ids, staende, { heute }), { faecher: [1, 1, 1, 1, 0], faellig: 3, neu: 3, gesamt: 7 });
});
