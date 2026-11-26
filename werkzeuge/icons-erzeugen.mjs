#!/usr/bin/env node
// Erzeugt die App-Icons: drei leuchtende Krallenhiebe („Kratzspuren“) als 8-Bit-Pixelgrafik auf einem Arcade-Sonnenuntergang
// (Wahl von Philip, 26.11.2026; Entwürfe in /workspace/entwuerfe/it-trainer-icon). Raster 15×15, keine Kontur.
// resvg ist keine Projektabhängigkeit; es liegt dauerhaft in /workspace/werkzeuge/resvg:
//   RESVG_ORDNER=/workspace/werkzeuge/resvg node werkzeuge/icons-erzeugen.mjs
// Dateien in icons/: icon.svg (abgerundet, Favicon), icon-192/-512.png (abgerundet), icon-maskable-512.png (vollflächig,
// Motiv kleiner für die Sicherheitszone von Android), icon-180.png (Apple, vollflächig), icon-32.png.
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ZIEL = join(dirname(fileURLToPath(import.meta.url)), '..', 'icons');
const RUNDUNG = 115;
// Hintergrund-Streifen von oben nach unten (Beginn in 21steln der Höhe)
const BAENDER = [[0, '#21104a'], [7, '#4a1670'], [10, '#8a1f78'], [13, '#d13f6c'], [16, '#f57b48'], [19, '#ffb547']];
const FARBEN = { W: '#ffffff', C: '#7ff6ff', R: '#ff4fd8' };   // Kern, Leuchtkante, Enden

/** Drei parallele Hiebe von oben rechts nach unten links: weißer Kern, cyan Kante, pinke Enden. */
function raster() {
  const r = Array.from({ length: 15 }, () => Array(15).fill('.'));
  for (const versatz of [-4, 0, 4]) for (let y = 1; y <= 13; y++) {
    const x = Math.round(10 + versatz - (y - 1) * 0.42);
    const ende = y <= 2 || y >= 12;
    if (x >= 0 && x < 15) r[y][x] = ende ? 'R' : 'W';
    if (!ende && x + 1 < 15) r[y][x + 1] = 'C';
  }
  return r;
}

function svgText({ rund = true, skala = 1 } = {}) {
  const n = 15, motiv = 380 * skala, z = motiv / n, start = (512 - motiv) / 2;
  let s = BAENDER.map(([ab, f], i) => {
    const y = (ab / 21) * 512, bis = ((BAENDER[i + 1]?.[0] ?? 21) / 21) * 512;
    return `<rect x="0" y="${y.toFixed(2)}" width="512" height="${(bis - y + 0.5).toFixed(2)}" fill="${f}"/>`;
  }).join('');
  raster().forEach((zeile, y) => zeile.forEach((c, x) => {
    if (FARBEN[c]) s += `<rect x="${(start + x * z).toFixed(2)}" y="${(start + y * z).toFixed(2)}" width="${(z + 0.6).toFixed(2)}" height="${(z + 0.6).toFixed(2)}" fill="${FARBEN[c]}"/>`;
  }));
  const clip = rund ? `<defs><clipPath id="r"><rect width="512" height="512" rx="${RUNDUNG}"/></clipPath></defs>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" shape-rendering="crispEdges">${clip}<g${rund ? ' clip-path="url(#r)"' : ''}>${s}</g></svg>\n`;
}

writeFileSync(join(ZIEL, 'icon.svg'), svgText());
const ordner = process.env.RESVG_ORDNER;
if (!ordner) { console.error('✗ RESVG_ORDNER fehlt (siehe Kopf dieser Datei) – nur icon.svg erzeugt'); process.exit(1); }
const { Resvg } = createRequire(join(ordner, 'package.json'))('@resvg/resvg-js');
const png = (svg, groesse, datei) => writeFileSync(join(ZIEL, datei), new Resvg(svg, { fitTo: { mode: 'width', value: groesse } }).render().asPng());
png(svgText(), 192, 'icon-192.png');
png(svgText(), 512, 'icon-512.png');
png(svgText({ rund: false, skala: 0.8 }), 512, 'icon-maskable-512.png');
png(svgText({ rund: false, skala: 0.92 }), 180, 'icon-180.png');
png(svgText(), 32, 'icon-32.png');
console.log('✓ Icons erzeugt in icons/');
