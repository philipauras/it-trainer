#!/usr/bin/env node
// Erzeugt die App-Icons: eine abstrakte Kugel aus flachen, übereinanderliegenden Ellipsen – keine Verläufe, keine Linien.
// Nachfolger der Rauchglas-Linse (Philip, 26.11.2026); Umstellung auf Schichten: Philip, 27.11.2026
// (Entwürfe in /workspace/entwuerfe/it-trainer-icon/ellipsen, gewählt: „A2“).
// Aufbau: dunkler Grundkreis · helle Sichel unten rechts (zurückgeworfenes Licht) · SCHICHTEN Ellipsen, die
// Schritt für Schritt kleiner, heller und zum Licht (oben links) verschoben werden – die Stufen ersetzen den Verlauf.
// resvg ist keine Projektabhängigkeit; es liegt dauerhaft in /workspace/werkzeuge/resvg:
//   RESVG_ORDNER=/workspace/werkzeuge/resvg node werkzeuge/icons-erzeugen.mjs
// Dateien in icons/:
//   icon.svg, icon-192/-512.png, icon-32.png   Kugel füllt die Fläche, Ecken durchsichtig (Favicon, Logo in der App)
//   icon-maskable-512.png                       Android: Kugel genau im sicheren Kreis (80 % Durchmesser), außen fast Schwarz
//   icon-180.png                                iPhone: wie Android, deckend (iOS färbt Durchsichtiges schwarz)
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ZIEL = join(dirname(fileURLToPath(import.meta.url)), '..', 'icons');
const FARBE = { tief: '#171a22', hell: '#c3cad6', sichel: '#2b3140' };
const SCHICHTEN = 6;          // Anzahl Farbstufen inkl. Grundton
const SCHRUMPF = 0.82;        // oberste Schicht hat 18 % des Kugelradius
const LICHT = [-70, -100];    // Verschiebung der obersten Schicht (Richtung oben links), bei Radius 256
const UMGEBUNG = '#08080b';   // Fläche um die Kugel (Android, iPhone)
const SICHER = 0.8;           // sichtbarer Kreis bei Android-„maskable“-Icons: 80 % Durchmesser

const z = (v) => +v.toFixed(1);
const mischen = (a, b, t) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - t)
  + parseInt(b.slice(i, i + 2), 16) * t).toString(16).padStart(2, '0')).join('');

function svgText({ radius = 256, grund = null } = {}) {
  const k = radius / 256;     // alles mit der Kugel skalieren, Mittelpunkt bleibt 256/256
  const p = (dx, dy) => [z(256 + dx * k), z(256 + dy * k)];
  const [sx, sy] = p(74, 84);
  const [kx, ky] = p(-20, -30);
  let s = `<circle cx="256" cy="256" r="${z(radius)}" fill="${FARBE.tief}"/>`
    + `<ellipse cx="${sx}" cy="${sy}" rx="${z(190 * k)}" ry="${z(170 * k)}" transform="rotate(-35 ${sx} ${sy})" fill="${FARBE.sichel}"/>`
    + `<ellipse cx="${kx}" cy="${ky}" rx="${z(234 * k)}" ry="${z(228 * k)}" fill="${FARBE.tief}"/>`;
  for (let i = 1; i < SCHICHTEN; i++) {
    const t = i / (SCHICHTEN - 1);
    const r = 256 * (1 - SCHRUMPF * t) * k;
    const [cx, cy] = p(LICHT[0] * t, LICHT[1] * t);
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${z(r)}" ry="${z(r * (1 - 0.14 * t))}" transform="rotate(${z(-28 * t)} ${cx} ${cy})"`
      + ` fill="${mischen(FARBE.tief, FARBE.hell, t ** 1.6)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><clipPath id="kugel"><circle cx="256" cy="256" r="${z(radius)}"/></clipPath></defs>`
    + `${grund ? `<rect width="512" height="512" fill="${grund}"/>` : ''}\n<g clip-path="url(#kugel)">${s}</g>\n</svg>\n`;
}

writeFileSync(join(ZIEL, 'icon.svg'), svgText());
const ordner = process.env.RESVG_ORDNER;
if (!ordner) { console.error('✗ RESVG_ORDNER fehlt (siehe Kopf dieser Datei) – nur icon.svg erzeugt'); process.exit(1); }
const { Resvg } = createRequire(join(ordner, 'package.json'))('@resvg/resvg-js');
const png = (svg, groesse, datei) => writeFileSync(join(ZIEL, datei), new Resvg(svg, { fitTo: { mode: 'width', value: groesse } }).render().asPng());
png(svgText(), 192, 'icon-192.png');
png(svgText(), 512, 'icon-512.png');
png(svgText(), 32, 'icon-32.png');
png(svgText({ radius: 256 * SICHER, grund: UMGEBUNG }), 512, 'icon-maskable-512.png');
png(svgText({ radius: 256 * 0.86, grund: UMGEBUNG }), 180, 'icon-180.png');
console.log('✓ Icons erzeugt in icons/');
