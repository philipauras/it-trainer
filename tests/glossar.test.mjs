// Glossar: Logik (Kern) und Daten aus content/glossar.md
import test from 'node:test';
import assert from 'node:assert/strict';
import { normal, sortiert, buchstabe, suche, glossarMuster, zerlege, suchwoerter } from '../js/kern/glossar.js';
import { baue } from '../werkzeuge/bauen.mjs';

const { glossar } = baue();
const muster = glossarMuster(glossar);
const markiert = (text) => zerlege(text, muster).filter((s) => s.id).map((s) => `${s.text}→${s.id}`);

test('Glossar: eindeutige IDs, Kurzerklärung für jeden Begriff', () => {
  assert.ok(glossar.length >= 10);
  assert.equal(new Set(glossar.map((b) => b.id)).size, glossar.length);
  for (const b of glossar) assert.ok(b.kurz.length > 20, b.id);
});

test('Sortierung, Anfangsbuchstaben, Normalisierung, Suche', () => {
  assert.equal(normal('Übergabe Größe'), 'ubergabe grosse');
  assert.deepEqual(sortiert([{ begriff: 'RAM' }, { begriff: 'bit' }, { begriff: 'ASCII' }]).map((b) => b.begriff), ['ASCII', 'bit', 'RAM']);
  assert.equal(buchstabe('3D'), '#');
  assert.equal(suche(glossar, 'bit')[0].id, 'bit');
  assert.ok(suche(glossar, 'befehle').some((b) => b.id === 'cpu'), 'Suche auch in der Erklärung');
});

test('Begriffe im Text: ganze Wörter, Abkürzungen nur groß, längere gewinnen, je Abschnitt einmal', () => {
  assert.deepEqual(markiert('Ein Bit, viele Bits, ein Byte.'), ['Bit→bit', 'Byte→byte']);
  assert.deepEqual(markiert('Mbit/s ist nicht Bit'), ['Mbit/s→mbit-s', 'Bit→bit']);
  assert.deepEqual(markiert('die ram ist klein, der RAM groß'), ['RAM→ram']);
  assert.deepEqual(markiert('Ein Docker-Container läuft'), ['Docker-Container→docker-container']);
  assert.deepEqual(markiert('Ein Bitmuster'), [], 'kein Teilwort');
  assert.deepEqual(suchwoerter({ begriff: 'A / B', markieren: false }), []);
  assert.deepEqual(zerlege('Text', glossarMuster([])), [{ text: 'Text' }], 'leeres Glossar');
});
