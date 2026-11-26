#!/usr/bin/env node
// Erzeugt die App-Icons: drei gestapelte Schichten (weiße Linien auf der Akzentfarbe aus config.json).
// Motiv = „Vom Sandkorn zur KI“: Schichten, die aufeinander aufbauen. Nur Linien, keine Kleinteile.
// resvg ist keine Projektabhängigkeit; es liegt dauerhaft in /workspace/werkzeuge/resvg:
//   RESVG_ORDNER=/workspace/werkzeuge/resvg node werkzeuge/icons-erzeugen.mjs
import { createRequire } from 'node:module';
import { writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const W = join(dirname(fileURLToPath(import.meta.url)), '..');
const ZIEL = join(W, 'icons');
const HINTERGRUND = JSON.parse(readFileSync(join(W, 'config.json'), 'utf8')).farben.hell.akzent;
const RUNDUNG = 115;
// Schichten von unten nach oben: [Breite, y-Mitte]; Höhe je Schicht 62, Ecken 18
const SCHICHTEN = [[312, 344], [248, 256], [184, 168]];
const HOEHE = 62;

function motiv({ strich, skala = 1 }) {
  const teile = SCHICHTEN.map(([b, y]) => `<rect x="${256 - b / 2}" y="${y - HOEHE / 2}" width="${b}" height="${HOEHE}" rx="18"/>`).join('');
  return `<g transform="translate(256 256) scale(${skala}) translate(-256 -256)" fill="none" stroke="#FFFFFF" stroke-width="${strich}" stroke-linejoin="round">${teile}</g>`;
}
const svgText = ({ rund = true, strich = 22, skala = 1 } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\n<rect width="512" height="512"${rund ? ` rx="${RUNDUNG}"` : ''} fill="${HINTERGRUND}"/>\n${motiv({ strich, skala })}\n</svg>\n`;

writeFileSync(join(ZIEL, 'icon.svg'), svgText());
const ordner = process.env.RESVG_ORDNER;
if (!ordner) { console.error('✗ RESVG_ORDNER fehlt (siehe Kopf dieser Datei) – nur icon.svg erzeugt'); process.exit(1); }
const { Resvg } = createRequire(join(ordner, 'package.json'))('@resvg/resvg-js');
const png = (svg, groesse, datei) => writeFileSync(join(ZIEL, datei), new Resvg(svg, { fitTo: { mode: 'width', value: groesse } }).render().asPng());
png(svgText(), 192, 'icon-192.png');
png(svgText(), 512, 'icon-512.png');
png(svgText({ rund: false, skala: 0.78 }), 512, 'icon-maskable-512.png');
png(svgText({ rund: false, skala: 0.9 }), 180, 'icon-180.png');
png(svgText({ strich: 34 }), 32, 'icon-32.png');
console.log('✓ Icons erzeugt in icons/');
