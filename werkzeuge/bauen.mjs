#!/usr/bin/env node
// Erzeugt aus den Inhalten (content/) und config.json die Dateien, die die App liest:
//   inhalt/index.json          Plan aller Staffeln und Folgen mit Status, Neuigkeiten
//   inhalt/folgen/<id>.json    je Folge: Abschnitte, Quiz, Karteikarten
//   inhalt/glossar.json        Glossar
//   manifest.webmanifest       App-Name und Farben aus config.json
// Diese Dateien NIE von Hand bearbeiten – Test und `npm run pruefen` merken es.
//
// Aufruf:  node werkzeuge/bauen.mjs                 alles erzeugen (Vorschau-Stand: alle Folgen, Entwürfe markiert)
//          node werkzeuge/bauen.mjs --pruefen       nur prüfen: Inhalte gültig und erzeugte Dateien aktuell?
//          node werkzeuge/bauen.mjs --live --ziel D Live-Stand nach D (nur Folgen mit Status „freigegeben“; deploy.sh)
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { leseFolge, leseGlossar, leseNeuigkeiten, ID_MUSTER } from './lib/inhaltsformat.mjs';
import { SIMULATOREN } from '../js/sim/index.js';

export const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const HINWEIS = 'ERZEUGT von werkzeuge/bauen.mjs aus content/ und config.json – nicht von Hand bearbeiten (npm run bauen).';
const lies = (p) => readFileSync(join(WURZEL, p), 'utf8');

// Alle Folgen-Dateien: content/staffel-N/…md
export function folgenDateien() {
  const c = join(WURZEL, 'content');
  return readdirSync(c).filter((d) => /^staffel-/.test(d)).sort()
    .flatMap((d) => readdirSync(join(c, d)).filter((f) => f.endsWith('.md')).sort().map((f) => `content/${d}/${f}`));
}

/** Baut alles im Speicher. Rückgabe: { dateien: { pfad: text }, fehler: [], folgen, glossar }. */
export function baue({ live = false } = {}) {
  const fehler = [];
  const config = JSON.parse(lies('config.json'));
  const R = config.regeln;
  // ---- Plan aus config.json prüfen
  const schichten = new Set(config.schichten.map((s) => s.id));
  const stufen = new Set(config.stufen.map((s) => s.id));
  const planIds = new Set();
  for (const s of config.staffeln) {
    if (!stufen.has(s.stufe)) fehler.push(`config: Staffel ${s.nr}: unbekannte Stufe „${s.stufe}“`);
    for (const sch of s.schichten) if (!schichten.has(sch)) fehler.push(`config: Staffel ${s.nr}: unbekannte Schicht „${sch}“`);
    for (const f of s.folgen) {
      if (!ID_MUSTER.folge.test(f.id) || !f.id.startsWith(s.id)) fehler.push(`config: Folgen-id „${f.id}“ passt nicht zu Staffel „${s.id}“`);
      if (planIds.has(f.id)) fehler.push(`config: Folgen-id „${f.id}“ doppelt`);
      planIds.add(f.id);
      if (!schichten.has(f.schicht)) fehler.push(`config: ${f.id}: unbekannte Schicht „${f.schicht}“`);
    }
  }
  // ---- Folgen lesen
  const folgen = new Map();
  const alleIds = new Map(); // id → wo, für globale Eindeutigkeit
  const merke = (id, wo) => { if (alleIds.has(id)) fehler.push(`id „${id}“ doppelt (${alleIds.get(id)} und ${wo})`); alleIds.set(id, wo); };
  for (const datei of folgenDateien()) {
    const { folge, fehler: f } = leseFolge(lies(datei), { datei, config });
    fehler.push(...f);
    if (!folge.id) continue;
    if (folgen.has(folge.id)) { fehler.push(`${datei}: Folge „${folge.id}“ gibt es schon`); continue; }
    folge.datei = datei;
    folgen.set(folge.id, folge);
    const abschnittIds = new Set(folge.abschnitte.map((a) => a.id));
    // Quiz
    if (folge.quiz.length < R.quiz.minFragen) fehler.push(`${folge.id}: mindestens ${R.quiz.minFragen} Quizfragen nötig (${folge.quiz.length})`);
    for (const q of folge.quiz) {
      merke(q.id, folge.id);
      if (!ID_MUSTER.frage.test(q.id) || !q.id.startsWith(`${folge.id}-`)) fehler.push(`${q.id}: Fragen-id muss „${folge.id}-q01“ … heißen`);
      if (!q.frage) fehler.push(`${q.id}: Fragetext fehlt`);
      if (q.antworten.length < R.quiz.minAntworten || q.antworten.length > R.quiz.maxAntworten) fehler.push(`${q.id}: ${R.quiz.minAntworten}–${R.quiz.maxAntworten} Antworten nötig`);
      if (new Set(q.antworten).size !== q.antworten.length) fehler.push(`${q.id}: Antworten nicht eindeutig`);
      if (q.richtig < 0) fehler.push(`${q.id}: keine richtige Antwort („- [x] …“)`);
      if (!q.erklaerung) fehler.push(`${q.id}: „Erklärung:“ fehlt`);
      if (!q.nachlesen) fehler.push(`${q.id}: „Nachlesen:“ fehlt (Abschnitt, z. B. prinzip)`);
      else if (!abschnittIds.has(q.nachlesen) || ['quiz', 'karten'].includes(q.nachlesen)) fehler.push(`${q.id}: „Nachlesen: ${q.nachlesen}“ ist kein Inhaltsabschnitt dieser Folge`);
    }
    // Karten
    if (folge.karten.length < R.karten.minKarten) fehler.push(`${folge.id}: mindestens ${R.karten.minKarten} Karteikarten nötig (${folge.karten.length})`);
    for (const k of folge.karten) {
      merke(k.id, folge.id);
      if (!ID_MUSTER.karte.test(k.id) || !k.id.startsWith(`${folge.id}-`)) fehler.push(`${k.id}: Karten-id muss „${folge.id}-k01“ … heißen`);
      if (!k.vorne || !k.hinten) fehler.push(`${k.id}: „Vorne:“ und „Hinten:“ nötig`);
    }
    // Simulatoren und Übungen
    for (const a of folge.abschnitte) for (const t of a.teile) {
      if (t.art !== 'sim') continue;
      if (!Object.hasOwn(SIMULATOREN, t.name)) fehler.push(`${folge.id}/${a.id}: unbekannter Simulator „${t.name}“ (vorhanden: ${Object.keys(SIMULATOREN).join(', ')})`);
      if (t.id) {
        merke(t.id, folge.id);
        if (!ID_MUSTER.uebung.test(t.id) || !t.id.startsWith(`${folge.id}-`)) fehler.push(`${t.id}: Übungs-id muss „${folge.id}-u01“ … heißen`);
      }
    }
    if (!folge.abschnitte.find((a) => a.id === 'selbst')?.teile.some((t) => t.art === 'sim' && t.id)) fehler.push(`${folge.id}: [selbst] braucht eine Übung (Simulator mit „id: ${folge.id}-u01“)`);
  }
  // ---- Glossar, Neuigkeiten
  const glossar = leseGlossar(lies('content/glossar.md'));
  fehler.push(...glossar.fehler);
  for (const b of glossar.begriffe) if (b.folge && !planIds.has(b.folge)) fehler.push(`Glossar „${b.begriff}“: Folge „${b.folge}“ gibt es nicht`);
  const neu = leseNeuigkeiten(lies('content/neuigkeiten.md'));
  fehler.push(...neu.fehler);
  if (neu.eintraege[0]?.version !== config.app.version) fehler.push(`Neuigkeiten: oberster Eintrag (${neu.eintraege[0]?.version}) muss die App-Version aus config.json sein (${config.app.version})`);

  // ---- Dateien erzeugen
  const sichtbar = (f) => f && (!live || f.status === R.liveStatus);
  const dateien = {};
  const json = (x) => `${JSON.stringify(x, null, 1)}\n`;
  const index = {
    _hinweis: HINWEIS,
    version: config.app.version,
    live,
    staffeln: config.staffeln.map((s) => ({
      ...s,
      folgen: s.folgen.map((p, i) => {
        const f = folgen.get(p.id);
        const basis = { id: p.id, nr: i + 1, titel: p.titel, untertitel: p.untertitel || '', schicht: p.schicht, art: p.art || 'folge' };
        if (!sichtbar(f)) return { ...basis, status: 'geplant' };
        return { ...basis, status: f.status, dauer: f.dauer, datei: `inhalt/folgen/${f.id}.json`, karten: f.karten.map((k) => k.id), fragen: f.quiz.length,
          uebungen: f.abschnitte.flatMap((a) => a.teile.filter((t) => t.id).map((t) => t.id)) };
      }),
    })),
    neuigkeiten: neu.eintraege.slice(0, 10),
  };
  dateien['inhalt/index.json'] = json(index);
  for (const f of folgen.values()) if (sichtbar(f)) { const { datei, ...rest } = f; dateien[`inhalt/folgen/${f.id}.json`] = json({ _hinweis: HINWEIS, quelle: datei, ...rest }); }
  dateien['inhalt/glossar.json'] = json({ _hinweis: HINWEIS, begriffe: glossar.begriffe });
  dateien['manifest.webmanifest'] = json({
    name: `${config.app.name} – ${config.app.untertitel}`, short_name: config.app.kurzname, description: config.app.beschreibung,
    lang: 'de', dir: 'ltr', id: './', start_url: './', scope: './', display: 'standalone',
    background_color: config.farben.hell.hintergrund, theme_color: config.farben.hell.hintergrund, categories: ['education'],
    icons: [
      { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  });
  return { dateien, fehler, folgen, glossar: glossar.begriffe, config };
}

/** Erzeugte Dateien im Repo, die es laut Build nicht (mehr) gibt oder die abweichen. */
export function abweichungen(dateien, ziel = WURZEL) {
  const abw = [];
  for (const [p, text] of Object.entries(dateien)) {
    const f = join(ziel, p);
    if (!existsSync(f)) abw.push(`${p} fehlt`); else if (readFileSync(f, 'utf8') !== text) abw.push(`${p} weicht ab`);
  }
  const ordner = join(ziel, 'inhalt/folgen');
  if (existsSync(ordner)) for (const f of readdirSync(ordner)) if (!dateien[`inhalt/folgen/${f}`]) abw.push(`inhalt/folgen/${f} ist überzählig`);
  return abw;
}

function schreibe(dateien, ziel) {
  const ordner = join(ziel, 'inhalt/folgen');
  if (existsSync(ordner)) rmSync(ordner, { recursive: true }); // nur erzeugte Dateien; alte Folgen sollen verschwinden
  for (const [p, text] of Object.entries(dateien)) { mkdirSync(dirname(join(ziel, p)), { recursive: true }); writeFileSync(join(ziel, p), text); }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const arg = process.argv.slice(2);
  const live = arg.includes('--live');
  const zielIdx = arg.indexOf('--ziel');
  const ziel = zielIdx >= 0 ? arg[zielIdx + 1] : WURZEL;
  const { dateien, fehler, folgen } = baue({ live });
  if (fehler.length) { console.error(`✗ ${fehler.length} Fehler in den Inhalten:\n  - ${fehler.join('\n  - ')}`); process.exit(1); }
  if (arg.includes('--pruefen')) {
    const abw = abweichungen(dateien);
    if (abw.length) { console.error(`✗ Erzeugte Dateien sind nicht aktuell (oder wurden von Hand geändert) – npm run bauen:\n  - ${abw.join('\n  - ')}`); process.exit(1); }
    console.log(`✓ Inhalte gültig (${folgen.size} Folgen), erzeugte Dateien aktuell`);
  } else {
    if (!ziel) { console.error('✗ --ziel ohne Ordner'); process.exit(2); }
    schreibe(dateien, ziel);
    const status = [...folgen.values()].map((f) => `${f.id}: ${f.status}`).join(', ');
    console.log(`✓ ${Object.keys(dateien).length} Dateien erzeugt${live ? ' (live: nur freigegeben)' : ''} → ${relative(process.cwd(), ziel) || '.'}  [${status}]`);
  }
}
