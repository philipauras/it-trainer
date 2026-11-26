#!/usr/bin/env node
// Nimmt neue IDs (Folgen, Fragen, Karten, Übungen, Glossar) in tests/fixtures/ids.json auf.
// Bestehende IDs werden nie entfernt: Fehlt eine, schlägt `npm test` fehl – der Lernfortschritt hängt daran.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { baue, WURZEL } from './bauen.mjs';
import { alleIds } from './lib/ids.mjs';

const datei = join(WURZEL, 'tests/fixtures/ids.json');
const { fehler, folgen, glossar } = baue();
if (fehler.length) { console.error('✗ Erst die Inhalte reparieren (npm run bauen)'); process.exit(1); }
const alt = existsSync(datei) ? JSON.parse(readFileSync(datei, 'utf8')) : { hinweis: '', ids: {} };
const neu = alleIds(folgen, glossar);
const ergebnis = { hinweis: 'Eingefrorene IDs – nie entfernen oder ändern (Lernfortschritt!). Neue mit: npm run ids-aufnehmen', ids: {} };
let dazu = 0;
for (const art of Object.keys(neu)) {
  const menge = new Set(alt.ids[art] || []);
  for (const id of neu[art]) if (!menge.has(id)) { menge.add(id); dazu++; }
  ergebnis.ids[art] = [...menge].sort();
}
writeFileSync(datei, `${JSON.stringify(ergebnis, null, 1)}\n`);
console.log(`✓ ${dazu} neue IDs aufgenommen (${Object.entries(ergebnis.ids).map(([a, l]) => `${a}: ${l.length}`).join(', ')})`);
