// Trägt in sw.js die SHA-256-Prüfsumme jeder App- und Inhaltsdatei ein (Aufruf durch deploy.sh auf der fertigen Kopie).
// Der Browser verwirft damit beim Update jede Datei, die nicht genau zu dieser Version gehört.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
const ordner = process.argv[2];
const sw = readFileSync(join(ordner, 'sw.js'), 'utf8');
const liste = /const APP_DATEIEN = \[([\s\S]*?)\];/.exec(sw)[1].replace(/^\s*\/\/.*$/gm, '');
const dateien = new Set([...liste.matchAll(/'([^']+)'/g)].map((m) => m[1]));
const folgen = join(ordner, 'inhalt/folgen');
if (existsSync(folgen)) for (const f of readdirSync(folgen)) if (f.endsWith('.json')) dateien.add(`inhalt/folgen/${f}`);
const summen = {};
for (const f of dateien) summen[f] = `sha256-${createHash('sha256').update(readFileSync(join(ordner, f === './' ? 'index.html' : f))).digest('base64')}`;
const neu = sw.replace(/const PRUEFSUMMEN = \{[^}]*\};/, `const PRUEFSUMMEN = ${JSON.stringify(summen)};`);
if (neu === sw || dateien.size < 30) { console.error('✗ Prüfsummen nicht eingetragen'); process.exit(1); }
writeFileSync(join(ordner, 'sw.js'), neu);
