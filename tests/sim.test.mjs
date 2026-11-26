// Rechenlogik der Simulatoren
import test from 'node:test';
import assert from 'node:assert/strict';
import { muster, anzahlMuster, asciiZeichen } from '../js/sim/bit-schalter.js';
import { noetigeFragen, eingrenzen, mitte } from '../js/sim/zahlenraten.js';

test('bit-schalter: Muster, 2 hoch n, ASCII', () => {
  assert.equal(muster([true, false, true]), '101');
  assert.deepEqual([1, 2, 3, 8].map(anzahlMuster), [2, 4, 8, 256]);
  assert.equal(asciiZeichen([0, 1, 0, 0, 0, 0, 0, 1].map(Boolean)), 'A');
  assert.equal(asciiZeichen([0, 1, 0, 0, 0, 0, 1, 0].map(Boolean)), 'B');
  assert.equal(asciiZeichen(Array(8).fill(false)), null);
  assert.equal(asciiZeichen([true]), null);
});

test('zahlenraten: Halbieren findet jede Zahl in log2(max) Fragen', () => {
  assert.deepEqual([64, 100, 1000, 1_000_000].map(noetigeFragen), [6, 7, 10, 20]);
  for (const max of [64, 100]) for (let geheim = 1; geheim <= max; geheim++) {
    let b = { von: 1, bis: max }, n = 0;
    while (b.von < b.bis) { const g = mitte(b); b = eingrenzen(b, g, geheim > g); n++; }
    assert.equal(b.von, geheim); assert.ok(n <= noetigeFragen(max), `${geheim}: ${n}`);
  }
});
