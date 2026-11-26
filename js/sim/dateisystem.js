// Simulator „dateisystem“: Eine SSD ist in nummerierte Blöcke geteilt. Das Inhaltsverzeichnis kennt nur den ersten Block
// einer Datei; jeder Block sagt, wo es weitergeht. Übung: eine Datei lesen, indem man ihre Blöcke in der richtigen
// Reihenfolge antippt.
// Optionen: dateien: gruss.txt = HAL|LO |WEL|T!; liste.txt = EI|ER        (Datei = Stücke, je Stück ein Block)
//           ziel: gruss.txt                                               (Übung: diese Datei lesen)
import { el } from '../kern/dom.js';

const BLOECKE = 16;
/** Verteilt die Dateien fest (immer gleich) auf die Blöcke. Rückgabe: { bloecke, verzeichnis } */
export function verteilen(dateien) {
  const frei = Array.from({ length: BLOECKE }, (_, i) => i);
  let s = 17;
  const zufall = () => { s = (s * 1103515245 + 12345) % 2147483648; return s; };
  const bloecke = Array(BLOECKE).fill(null), verzeichnis = [];
  for (const { name, stuecke } of dateien) {
    const nummern = stuecke.map(() => frei.splice(zufall() % frei.length, 1)[0]);
    nummern.forEach((b, i) => { bloecke[b] = { datei: name, text: stuecke[i], weiter: i + 1 < nummern.length ? nummern[i + 1] : null }; });
    verzeichnis.push({ name, start: nummern[0], kette: nummern });
  }
  return { bloecke, verzeichnis };
}
export function dateienLesen(t) {
  const d = String(t ?? '').split(';').map((x) => x.trim()).filter(Boolean).map((x) => {
    const i = x.indexOf('=');
    if (i < 0) throw new Error(`dateisystem: „${x}“ – erwartet „name = Stück|Stück“`);
    return { name: x.slice(0, i).trim(), stuecke: x.slice(i + 1).split('|').map((y) => y.replace(/^ /, '')) };
  });
  if (d.reduce((n, x) => n + x.stuecke.length, 0) > BLOECKE) throw new Error('dateisystem: mehr Stücke als Blöcke');
  return d;
}

export default function starte({ wurzel, optionen, fertig = () => {}, istFertig = false }) {
  const { bloecke, verzeichnis } = verteilen(dateienLesen(optionen.dateien));
  const ziel = verzeichnis.find((v) => v.name === String(optionen.ziel ?? '').trim()) || null;
  let gelesen = istFertig && ziel ? ziel.kette.slice() : [];
  let markiert = null, geschafft = istFertig;
  const zielZeile = ziel ? el('p', { class: 'sim-ziel' }) : null;
  const tabelle = el('div', { class: 'tabelle-rahmen' });
  const raster = el('div', { class: 'block-raster' });
  const ausgabe = el('p', { class: 'sim-info datei-ausgabe', 'aria-live': 'polite' });
  const zeichnen = () => {
    tabelle.replaceChildren(el('table', { class: 'wahrheit' }, [
      el('thead', {}, [el('tr', {}, [el('th', { text: 'Inhaltsverzeichnis: Datei' }), el('th', { text: 'erster Block' })])]),
      el('tbody', {}, verzeichnis.map((v) => el('tr', {}, [el('td', {}, [el('button', { type: 'button', class: 'tab-ein datei-name', text: v.name, 'aria-label': `${v.name}: Blöcke hervorheben`, onclick: () => { markiert = markiert === v.name ? null : v.name; zeichnen(); } })]), el('td', { text: String(v.start) })]))),
    ]));
    raster.replaceChildren(...bloecke.map((b, i) => {
      const nr = gelesen.indexOf(i);
      return el('button', {
        type: 'button', class: `block${b ? '' : ' block-frei'}${b && markiert === b.datei ? ' block-markiert' : ''}${nr >= 0 ? ' block-gelesen' : ''}`,
        'aria-label': b ? `Block ${i}: „${b.text}“, ${b.weiter == null ? 'Ende' : `weiter bei ${b.weiter}`}` : `Block ${i}: frei`,
        onclick: () => {
          if (!ziel || geschafft) return;
          const soll = ziel.kette[gelesen.length];
          if (i === soll) { gelesen.push(i); if (gelesen.length === ziel.kette.length) { geschafft = true; fertig(); } }
          else ausgabe.dataset.hinweis = gelesen.length === 0 ? `Block ${i} ist nicht der Anfang. Wo beginnt ${ziel.name} laut Inhaltsverzeichnis?` : `Block ${i} ist nicht dran. Der zuletzt gelesene Block sagt, wo es weitergeht.`;
          zeichnen();
        },
      }, [el('span', { class: 'block-nr', text: String(i) }), el('span', { class: 'block-text', text: b ? b.text.replace(/ /g, '␣') : 'frei' }), el('span', { class: 'block-weiter', text: b ? (b.weiter == null ? 'Ende' : `→ ${b.weiter}`) : '' })]);
    }));
    if (ziel) {
      const text = gelesen.map((g) => bloecke[g].text).join('');
      ausgabe.replaceChildren(el('span', { class: 'sim-label', text: 'Gelesen: ' }), el('code', { text: text ? `„${text}“` : '–' }), ausgabe.dataset.hinweis && !geschafft ? el('span', { class: 'sim-zusatz datei-hinweis', text: ` ${ausgabe.dataset.hinweis}` }) : '');
      delete ausgabe.dataset.hinweis;
      zielZeile.textContent = geschafft ? `✓ Geschafft: ${ziel.name} gelesen – über ${ziel.kette.length} verstreute Blöcke.` : `Ziel: Lies die Datei ${ziel.name}. Tippe ihre Blöcke in der richtigen Reihenfolge an.`;
    }
  };
  wurzel.append(...[zielZeile, tabelle, raster, ziel ? ausgabe : null].filter(Boolean));
  zeichnen();
  if (ziel) wurzel._loesen = () => { for (const b of ziel.kette.slice(gelesen.length)) raster.children[b].click(); };
}

export function pruefe(optionen) {
  const { verzeichnis } = verteilen(dateienLesen(optionen.dateien));
  if (optionen.ziel && !verzeichnis.some((v) => v.name === String(optionen.ziel).trim())) throw new Error(`dateisystem: Ziel „${optionen.ziel}“ ist keine der Dateien`);
}
