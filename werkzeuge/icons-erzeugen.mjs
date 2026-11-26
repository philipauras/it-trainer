#!/usr/bin/env node
// Erzeugt die App-Icons: eine einzige Glaslinse aus Rauchglas – nur Verläufe, keine Linien, kein Motiv.
// Wahl von Philip, 26.11.2026 (Entwurf „S · Rauchglas“, Runde 8; alle Entwürfe in /workspace/entwuerfe/it-trainer-icon).
// Vier Verlaufs-Schichten: Grundkörper (Licht von oben links) · Lichtschein unten rechts (gebündeltes Licht) ·
// dunkler werdender Rand (Wölbung) · weicher Glanzfleck (Spiegelung).
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
const GLAS = { hell: '#9aa3b2', mitte: '#2a2f3a', tief: '#030305', schein: '#7f8ea6' };
const UMGEBUNG = '#08080b';   // Fläche um die Kugel (Android, iPhone)
const SICHER = 0.8;           // sichtbarer Kreis bei Android-„maskable“-Icons: 80 % Durchmesser

function svgText({ radius = 256, grund = null } = {}) {
  const k = radius / 256;     // Glanzfleck mit der Kugel skalieren
  const c = `cx="256" cy="256" r="${radius}"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs>
<radialGradient id="koerper" cx="0.36" cy="0.32" r="0.95"><stop offset="0" stop-color="${GLAS.hell}"/><stop offset="0.45" stop-color="${GLAS.mitte}"/><stop offset="1" stop-color="${GLAS.tief}"/></radialGradient>
<radialGradient id="schein" cx="0.68" cy="0.76" r="0.34"><stop offset="0" stop-color="${GLAS.schein}" stop-opacity="0.85"/><stop offset="1" stop-color="${GLAS.schein}" stop-opacity="0"/></radialGradient>
<radialGradient id="rand" cx="0.5" cy="0.5" r="0.5"><stop offset="0.72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.45"/></radialGradient>
<radialGradient id="glanz" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff" stop-opacity="0.95"/><stop offset="0.55" stop-color="#fff" stop-opacity="0.35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs>${grund ? `<rect width="512" height="512" fill="${grund}"/>` : ''}
<circle ${c} fill="url(#koerper)"/><circle ${c} fill="url(#schein)"/><circle ${c} fill="url(#rand)"/>
<ellipse cx="${256 - 66 * k}" cy="${256 - 96 * k}" rx="${120 * k}" ry="${78 * k}" transform="rotate(-28 ${256 - 66 * k} ${256 - 96 * k})" fill="url(#glanz)"/>
</svg>
`;
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
