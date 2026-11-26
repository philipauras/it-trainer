#!/usr/bin/env node
// Erzeugt die App-Icons: brüllender T-Rex-Kopf als 8-Bit-Pixelgrafik (Raster 15×15) auf Schwarz, mit dunkelgrüner Kontur.
// Wahl von Philip, 26.11.2026 (Entwurf „A“, Runde 5/7; alle Entwürfe in /workspace/entwuerfe/it-trainer-icon).
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
const HINTERGRUND = '#08080b';
const KONTUR = '#0d3316';
// G Haut · H Schatten · W Zähne · E Augenlicht · K Pupille/Nasenloch · M Maul
const FARBEN = { G: '#63d461', H: '#2f9a48', W: '#fff6dc', E: '#ffffff', K: '#0d3316', M: '#c2304a' };
const KOPF = [
  '...............',
  '...............',
  '....GGGGGG.....',
  '...GGGGGGGGGG..',
  '..GGGEKGGGGGGG.',
  '..GGGKKGGGGGGKG',
  '..GGGGGGGGGGGGG',
  '..GGGGGGGWMWMWM',
  '..GGGGGGMMMMMM.',
  '..GGGGGGMMMMM..',
  '..GGGGGGGWMWMW.',
  '..GGGGGGGGGGGG.',
  '...GGGGGGGGGG..',
  '...GGGHHHHH....',
  '...GGH.........'];

function svgText({ rund = true, skala = 1 } = {}) {
  const n = 15, motiv = 380 * skala, z = motiv / n, start = (512 - motiv) / 2;
  const belegt = (x, y) => y >= 0 && y < n && x >= 0 && x < n && KOPF[y][x] !== '.';
  const rect = (x, y, f) => `<rect x="${(start + x * z).toFixed(2)}" y="${(start + y * z).toFixed(2)}" width="${(z + 0.6).toFixed(2)}" height="${(z + 0.6).toFixed(2)}" fill="${f}"/>`;
  let s = `<rect width="512" height="512" fill="${HINTERGRUND}"/>`;
  // Kontur: jedes freie Feld direkt neben dem Kopf (auch schräg)
  for (let y = -1; y <= n; y++) for (let x = -1; x <= n; x++) {
    if (belegt(x, y)) continue;
    let nah = false;
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) if (belegt(x + dx, y + dy)) nah = true;
    if (nah) s += rect(x, y, KONTUR);
  }
  KOPF.forEach((zeile, y) => [...zeile].forEach((c, x) => { if (FARBEN[c]) s += rect(x, y, FARBEN[c]); }));
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
