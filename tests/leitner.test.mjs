import test from 'node:test';
import assert from 'node:assert/strict';
import { tag, plusTage, STANDARD_INTERVALLE } from '../js/kern/leitner.js';

test('Kalendertage: Ortszeit, über Monats-/Jahresgrenzen und Zeitumstellung', () => {
  assert.equal(tag(new Date(2026, 10, 26, 23, 59)), '2026-11-26');
  assert.equal(plusTage('2026-11-30', 1), '2026-12-01');
  assert.equal(plusTage('2026-12-31', 1), '2027-01-01');
  assert.equal(plusTage('2027-03-27', 2), '2027-03-29'); // Sommerzeit-Beginn dazwischen
  assert.equal(plusTage('2028-02-28', 1), '2028-02-29'); // Schaltjahr
});

test('Standard-Abstände der Fächer', () => {
  assert.deepEqual(STANDARD_INTERVALLE, [1, 2, 4, 8, 16]);
});
