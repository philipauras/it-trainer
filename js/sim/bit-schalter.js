// Simulator „bit-schalter“: eine Reihe Lichtschalter mit Lampen. Zeigt das Muster aus Nullen und Einsen,
// wie viele verschiedene Muster es mit dieser Anzahl Schalter gibt (2 hoch n) und – bei 8 Schaltern – welchen
// Buchstaben das Muster im ASCII-Code bedeutet.
// Optionen: schalter (Startanzahl, 1–8, Standard 3), veraenderbar (ja/nein, Standard ja), buchstabe (ja/nein, Standard nein)
import { el, svg } from '../kern/dom.js';

export const muster = (an) => an.map((x) => (x ? '1' : '0')).join('');
export const anzahlMuster = (n) => 2 ** n;
/** Druckbares ASCII-Zeichen zu einem 8er-Muster, sonst null. */
export function asciiZeichen(an) {
  if (an.length !== 8) return null;
  const wert = parseInt(muster(an), 2);
  return wert >= 33 && wert <= 126 ? String.fromCharCode(wert) : null;
}

function lampe(an) {
  return svg('svg', { viewBox: '0 0 40 48', class: `lampe${an ? ' lampe-an' : ''}`, 'aria-hidden': 'true' }, [
    svg('circle', { cx: 20, cy: 18, r: 14, class: 'lampe-glas' }),
    svg('rect', { x: 13, y: 33, width: 14, height: 9, rx: 2, class: 'lampe-sockel' }),
    an ? svg('circle', { cx: 20, cy: 18, r: 19, class: 'lampe-schein' }) : null,
  ]);
}

export default function starte({ wurzel, optionen }) {
  const max = 8;
  let n = Math.min(max, Math.max(1, optionen.schalter || 3));
  let an = Array(max).fill(false);
  const veraenderbar = optionen.veraenderbar !== false;
  const reihe = el('div', { class: 'schalter-reihe' });
  const info = el('div', { class: 'sim-info', 'aria-live': 'polite' });
  const anzahl = el('div', { class: 'sim-steuerung' });

  const zeichnen = () => {
    const aktiv = an.slice(0, n);
    reihe.replaceChildren(...aktiv.map((x, i) => el('button', {
      type: 'button', class: `schalter${x ? ' schalter-an' : ''}`, 'aria-pressed': String(x), 'aria-label': `Schalter ${i + 1}: ${x ? 'an (1)' : 'aus (0)'}`,
      onclick: () => { an[i] = !an[i]; zeichnen(); },
    }, [lampe(x), el('span', { class: 'schalter-wippe', 'aria-hidden': 'true' }), el('span', { class: 'schalter-wert', text: x ? '1' : '0', 'aria-hidden': 'true' })])));
    const z = optionen.buchstabe && n === 8 ? asciiZeichen(aktiv) : null;
    const rechnung = Array(n).fill('2').join(' × ');
    reihe.style.setProperty('--n', String(n));
    info.replaceChildren(...[
      el('p', { class: 'sim-gross' }, [el('span', { class: 'sim-label', text: 'Muster ' }), el('code', { class: 'bitmuster', text: muster(aktiv) })]),
      el('p', {}, [`${n} Schalter → `, el('strong', { text: `${anzahlMuster(n)} mögliche Muster` }), n > 1 ? ` (${rechnung})` : ' (aus oder an)']),
      optionen.buchstabe ? el('p', { class: 'sim-zusatz', text: n === 8 ? (z ? `Als Buchstabe im ASCII-Code: „${z}“` : aktiv[0] ? 'Dieses Muster gehört nicht mehr zu ASCII – dort ist das vorderste Bit immer 0.' : 'Dieses Muster ist im ASCII-Code kein sichtbares Zeichen – probier z. B. 01000001.') : 'Mit 8 Schaltern (= 1 Byte) zeigt die Lampenreihe einen Buchstaben.' }) : null,
    ].filter(Boolean));
    anzahl.replaceChildren(...[
      ...(veraenderbar ? [el('button', { type: 'button', class: 'knopf knopf-zweit knopf-rund', text: '−', 'aria-label': 'Einen Schalter weniger', disabled: n <= 1, onclick: () => { n--; zeichnen(); } }),
      el('span', { class: 'sim-anzahl', text: `${n} Schalter` }),
      el('button', { type: 'button', class: 'knopf knopf-zweit knopf-rund', text: '+', 'aria-label': 'Einen Schalter mehr', disabled: n >= max, onclick: () => { n++; zeichnen(); } })] : []),
      el('button', { type: 'button', class: 'knopf knopf-zweit', text: 'Alle aus', onclick: () => { an = Array(max).fill(false); zeichnen(); } }),
    ]);
  };
  wurzel.append(reihe, info, anzahl);
  zeichnen();
}
