// Simulator „binaer“: Schalter mit Stellenwerten (… 8, 4, 2, 1). Zeigt die Binärzahl, ihren Wert im Zehnersystem und die
// Rechnung dazu (8 + 2 = 10). Mit „ziel“ wird er zur Übung: die Zahlen der Reihe nach einstellen.
// Optionen: stellen (1–8, Standard 4), ziel (Liste, z. B. „5, 9, 15“), zaehlen (ja: Knopf „+1“ zum Hochzählen)
import { el } from '../kern/dom.js';

export const wert = (bits) => bits.reduce((s, b) => s * 2 + (b ? 1 : 0), 0);
export const bitsVon = (zahl, stellen) => Array.from({ length: stellen }, (_, i) => (zahl >> (stellen - 1 - i)) & 1);

export default function starte({ wurzel, optionen, fertig = () => {}, istFertig = false }) {
  const stellen = Math.min(8, Math.max(1, optionen.stellen || 4));
  const ziele = String(optionen.ziel ?? '').split(/[,;\s]+/).filter(Boolean).map(Number).filter((z) => Number.isInteger(z) && z >= 0 && z < 2 ** stellen);
  let bits = Array(stellen).fill(0);
  let schritt = istFertig ? ziele.length : 0;
  const reihe = el('div', { class: 'schalter-reihe binaer-reihe' });
  reihe.style.setProperty('--n', String(stellen));
  const info = el('div', { class: 'sim-info', 'aria-live': 'polite' });
  const zielZeile = ziele.length ? el('p', { class: 'sim-ziel' }) : null;
  const steuerung = el('div', { class: 'sim-steuerung' });

  const zeichnen = () => {
    const w = wert(bits);
    if (ziele.length && schritt < ziele.length && w === ziele[schritt]) { schritt++; if (schritt === ziele.length) fertig(); }
    reihe.replaceChildren(...bits.map((b, i) => {
      const sw = 2 ** (stellen - 1 - i);
      return el('button', {
        type: 'button', class: `schalter${b ? ' schalter-an' : ''}`, 'aria-pressed': String(!!b), 'aria-label': `Stelle ${sw}: ${b ? '1' : '0'}`,
        onclick: () => { bits[i] = b ? 0 : 1; zeichnen(); },
      }, [el('span', { class: 'stellenwert', text: String(sw), 'aria-hidden': 'true' }), el('span', { class: 'schalter-wippe', 'aria-hidden': 'true' }), el('span', { class: 'schalter-wert', text: String(b), 'aria-hidden': 'true' })]);
    }));
    const teile = bits.map((b, i) => (b ? 2 ** (stellen - 1 - i) : 0)).filter(Boolean);
    info.replaceChildren(
      el('p', { class: 'sim-gross' }, [el('code', { class: 'bitmuster', text: bits.join('') }), ' = ', el('span', { text: String(w) })]),
      el('p', { class: 'sim-zusatz', text: teile.length > 1 ? `${teile.join(' + ')} = ${w}` : teile.length ? `nur die Stelle ${teile[0]}` : 'alle Stellen 0' }),
    );
    if (zielZeile) zielZeile.textContent = schritt >= ziele.length ? `✓ Geschafft: ${ziele.join(', ')} – alle eingestellt.` : `Ziel ${schritt + 1} von ${ziele.length}: Stell die Zahl ${ziele[schritt]} ein.`;
  };
  steuerung.append(
    ...(optionen.zaehlen ? [el('button', { type: 'button', class: 'knopf', text: '+1 zählen', onclick: () => { bits = bitsVon((wert(bits) + 1) % 2 ** stellen, stellen); zeichnen(); } })] : []),
    el('button', { type: 'button', class: 'knopf knopf-zweit', text: 'Alle 0', onclick: () => { bits = Array(stellen).fill(0); zeichnen(); } }),
  );
  wurzel.append(...[zielZeile, reihe, info, steuerung].filter(Boolean));
  zeichnen();
  if (ziele.length) wurzel._loesen = () => { while (schritt < ziele.length) { bits = bitsVon(ziele[schritt], stellen); zeichnen(); } };
}

export function pruefe(optionen) {
  const st = Math.min(8, Math.max(1, optionen.stellen || 4));
  for (const z of String(optionen.ziel ?? '').split(/[,;\s]+/).filter(Boolean)) if (!/^\d+$/.test(z) || Number(z) >= 2 ** st) throw new Error(`binaer: Ziel ${z} passt nicht in ${st} Stellen`);
}
