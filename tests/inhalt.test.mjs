// Inhalte, erzeugte Dateien, stabile IDs und Service-Worker-Liste.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { baue, abweichungen, WURZEL } from '../werkzeuge/bauen.mjs';
import { alleIds } from '../werkzeuge/lib/ids.mjs';
import { SIMULATOREN } from '../js/sim/index.js';

const lies = (p) => readFileSync(join(WURZEL, p), 'utf8');
const gebaut = baue();

test('Inhalte sind gültig (Format, Quiz, Karten, Übungen, Glossar, Neuigkeiten)', () => {
  assert.deepEqual(gebaut.fehler, []);
  assert.ok(gebaut.folgen.size >= 1);
});

test('Erzeugte Dateien sind aktuell und nicht von Hand bearbeitet', () => {
  assert.deepEqual(abweichungen(gebaut.dateien), [], 'npm run bauen ausführen – inhalt/ und manifest.webmanifest nie von Hand ändern');
  for (const [p, text] of Object.entries(gebaut.dateien)) if (p.startsWith('inhalt/')) assert.match(text, /nicht von Hand bearbeiten/, p);
});

test('Stabile IDs: keine eingefrorene ID darf verschwinden, alle aktuellen IDs sind eingefroren', () => {
  const fest = JSON.parse(lies('tests/fixtures/ids.json')).ids;
  const jetzt = alleIds(gebaut.folgen, gebaut.glossar);
  for (const art of Object.keys(fest)) {
    const da = new Set(jetzt[art]);
    const fehlt = fest[art].filter((id) => !da.has(id));
    assert.deepEqual(fehlt, [], `${art}: diese IDs wurden entfernt oder umbenannt – Lernfortschritt ginge verloren`);
  }
  for (const art of Object.keys(jetzt)) {
    const bekannt = new Set(fest[art] || []);
    assert.deepEqual(jetzt[art].filter((id) => !bekannt.has(id)), [], `${art}: neue IDs – npm run ids-aufnehmen`);
  }
  // Auch geplante Folgen-IDs im Plan (config.json) sind reserviert und dürfen nicht doppelt vorkommen
  const plan = gebaut.config.staffeln.flatMap((s) => s.folgen.map((f) => f.id));
  assert.equal(new Set(plan).size, plan.length);
  for (const id of fest.folgen) assert.ok(plan.includes(id), `Folge ${id} fehlt im Plan`);
});

test('Speicher-Schlüssel und Code-Präfix bleiben gleich (sonst ist der Fortschritt weg)', () => {
  const { app } = gebaut.config;
  assert.equal(app.speicherSchluessel, 'ittrainer.v1');
  assert.equal(app.codePraefix, 'IT1');
  assert.equal(app.id, 'it-trainer');
});

test('Live-Stand enthält nur freigegebene Folgen, Vorschau alle', () => {
  const live = baue({ live: true });
  const index = JSON.parse(live.dateien['inhalt/index.json']);
  assert.equal(index.live, true);
  for (const f of gebaut.folgen.values()) {
    const imLive = !!live.dateien[`inhalt/folgen/${f.id}.json`];
    assert.equal(imLive, f.status === 'freigegeben', `${f.id} (${f.status})`);
    const eintrag = index.staffeln.flatMap((s) => s.folgen).find((x) => x.id === f.id);
    assert.equal(eintrag.status, f.status === 'freigegeben' ? 'freigegeben' : 'geplant');
    assert.ok(gebaut.dateien[`inhalt/folgen/${f.id}.json`], 'Vorschau enthält jede Folge');
  }
});

test('Service Worker kennt alle App-Dateien, und jede gelistete Datei existiert', () => {
  const sw = lies('sw.js');
  const liste = [.../const APP_DATEIEN = \[([\s\S]*?)\];/.exec(sw)[1].replace(/^\s*\/\/.*$/gm, '').matchAll(/'([^']+)'/g)].map((m) => m[1]);
  for (const f of liste) assert.ok(f === './' || existsSync(join(WURZEL, f)), `${f} fehlt`);
  const js = ['js', 'js/kern', 'js/ui', 'js/sim'].flatMap((d) => readdirSync(join(WURZEL, d)).filter((f) => f.endsWith('.js')).map((f) => `${d}/${f}`));
  for (const f of js) assert.ok(liste.includes(f), `${f} fehlt in sw.js (APP_DATEIEN)`);
  for (const d of ['fonts', 'icons']) for (const f of readdirSync(join(WURZEL, d))) assert.ok(liste.includes(`${d}/${f}`), `${d}/${f} fehlt in sw.js`);
  for (const f of ['config.json', 'manifest.webmanifest', 'inhalt/index.json', 'inhalt/glossar.json', 'css/app.css', 'css/thema.css']) assert.ok(liste.includes(f), f);
  for (const name of Object.keys(SIMULATOREN)) assert.ok(liste.includes(`js/sim/${name}.js`), `Simulator ${name}`);
});

test('deploy.sh veröffentlicht alles, was die App braucht – und keine internen Dateien', () => {
  const d = lies('deploy.sh');
  const liste = /APP_DATEIEN=\(([^)]*)\)/.exec(d)[1].split(/\s+/).filter(Boolean);
  for (const f of ['index.html', '404.html', 'sw.js', '_headers', 'config.json', 'css', 'js', 'fonts', 'icons', 'manifest.webmanifest']) assert.ok(liste.includes(f), f);
  for (const f of ['content', 'tests', 'werkzeuge', 'CLAUDE.md', 'docs', 'node_modules']) assert.ok(!liste.includes(f), `${f} darf nicht online`);
  assert.ok(!liste.includes('inhalt'), 'inhalt/ wird von deploy.sh je nach Modus neu gebaut, nicht aus Git kopiert');
});
