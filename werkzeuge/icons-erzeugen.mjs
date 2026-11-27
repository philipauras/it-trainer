#!/usr/bin/env node
// Erzeugt die App-Icons: eine abstrakte Kugel aus flachen, übereinanderliegenden Ellipsen – keine Verläufe, keine Linien.
// Vier Schichten, innen hell und gelb, außen dunkel und lila (Philip, 27.11.2026: Entwurf „1 · vier Streifen“,
// /workspace/entwuerfe/it-trainer-icon/gelb-lila). Gelb, Orange, Rot = Schicht-Farben Strom, Transistor, Logik aus
// config.json (nach dem alten Apple-Regenbogen); das dunkle Lila außen steht nur hier.
// Verlauf: Rauchglas-Linse (26.11.) → graue Ellipsen (…/ellipsen) → bunte Schichten (…/farbig) → gelb-lila (1.7.0).
// Aufbau: Lila als volle, quadratische Hintergrundfläche (ohne Sichel/Leuchten, Philip 27.11.2026: 1.7.1) · darauf
// Rot, Orange, Gelb als Ellipsen, Schritt für Schritt kleiner und zum Licht (oben links) verschoben – ergibt die Kugelform.
// resvg ist keine Projektabhängigkeit; es liegt dauerhaft in /workspace/werkzeuge/resvg:
//   RESVG_ORDNER=/workspace/werkzeuge/resvg node werkzeuge/icons-erzeugen.mjs
// Dateien in icons/:
//   icon.svg, icon-192/-512.png, icon-32.png, icon-180.png   volle lila Fläche, Ellipsen auf 90 % (Favicon, iPhone)
//   icon-maskable-512.png                                     Android: Ellipsen im sicheren Kreis (80 % Durchmesser)
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ZIEL = join(dirname(fileURLToPath(import.meta.url)), '..', 'icons');
const config = JSON.parse(readFileSync(join(ZIEL, '..', 'config.json'), 'utf8'));
const schicht = (id) => config.schichten.find((s) => s.id === id).farbe;
const AUSSEN = '#6e2a78';    // dunkles Lila
const FARBEN = [AUSSEN, schicht('logik'), schicht('transistor'), schicht('strom')];   // außen → innen
const SCHRUMPF = 0.8;         // innerste Schicht hat 20 % des Kugelradius
const LICHT = [-70, -100];    // Verschiebung der obersten Schicht (Richtung oben links), bei Radius 256
const SICHER = 0.8;           // sichtbarer Kreis bei Android-„maskable“-Icons: 80 % Durchmesser
const GROESSE = 0.9;          // Ellipsen auf 90 % – mit Luft zum Rand (iPhone, Favicon)

const z = (v) => +v.toFixed(1);

// radius: Größe der gedachten Kugel, in der die Ellipsen liegen (256 = ganze Fläche, Standard 90 %). Hintergrund ist immer die volle Fläche.
function svgText({ radius = 256 * GROESSE } = {}) {
  const k = radius / 256;     // Ellipsen mit der Kugel skalieren, Mittelpunkt bleibt 256/256
  let s = `<rect width="512" height="512" fill="${FARBEN[0]}"/>`;
  for (let i = 1; i < FARBEN.length; i++) {
    const t = i / (FARBEN.length - 1);
    const r = 256 * (1 - SCHRUMPF * t) * k;
    const cx = z(256 + LICHT[0] * t * k), cy = z(256 + LICHT[1] * t * k);
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${z(r)}" ry="${z(r * (1 - 0.14 * t))}" transform="rotate(${z(-28 * t)} ${cx} ${cy})"`
      + ` fill="${FARBEN[i]}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\n${s}\n</svg>\n`;
}

writeFileSync(join(ZIEL, 'icon.svg'), svgText());
const ordner = process.env.RESVG_ORDNER;
if (!ordner) { console.error('✗ RESVG_ORDNER fehlt (siehe Kopf dieser Datei) – nur icon.svg erzeugt'); process.exit(1); }
const { Resvg } = createRequire(join(ordner, 'package.json'))('@resvg/resvg-js');
const png = (svg, groesse, datei) => writeFileSync(join(ZIEL, datei), new Resvg(svg, { fitTo: { mode: 'width', value: groesse } }).render().asPng());
png(svgText(), 192, 'icon-192.png');
png(svgText(), 512, 'icon-512.png');
png(svgText(), 32, 'icon-32.png');
png(svgText({ radius: 256 * SICHER }), 512, 'icon-maskable-512.png');
png(svgText(), 180, 'icon-180.png');
console.log('✓ Icons erzeugt in icons/');
