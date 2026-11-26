// Simulator „scheduler“: drei Programme teilen sich einen Prozessorkern. Das Betriebssystem gibt jedem reihum eine
// Zeitscheibe; jedes Umschalten kostet einen Takt Verwaltung. Zeitleiste über 36 Takte.
// Optionen: zeitscheibe (Start, 1–8, Standard 6), uebung (ja: Zeitscheibe finden, bei der die Musik höchstens
//           9 Takte wartet UND höchstens ein Drittel der Zeit fürs Umschalten draufgeht)
import { el } from '../kern/dom.js';

export const PROGRAMME = [{ id: 'm', name: 'Musik' }, { id: 'b', name: 'Browser' }, { id: 'u', name: 'Update' }];
export const MAX_WARTEN = 9, MAX_VERWALTUNG = 1 / 3;
/** Zeitleiste: Liste aus 'm' | 'b' | 'u' | 'w' (Wechsel) für n Takte. */
export function zeitleiste(scheibe, n = 36) {
  const t = [];
  for (let p = 0; t.length < n; p = (p + 1) % 3) {
    for (let i = 0; i < scheibe && t.length < n; i++) t.push(PROGRAMME[p].id);
    if (t.length < n) t.push('w');
  }
  return t;
}
/** Kennzahlen: längste Wartezeit der Musik (Takte ohne Musik zwischen zwei Musik-Takten) und Anteil Verwaltung. */
export function kennzahlen(scheibe) {
  const t = zeitleiste(scheibe, 120);
  let warten = 0, lauf = 0, gesehen = false;
  for (const x of t) { if (x === 'm') { if (gesehen) warten = Math.max(warten, lauf); gesehen = true; lauf = 0; } else lauf++; }
  return { warten, verwaltung: 1 / (scheibe + 1) };
}
export const passt = (scheibe) => { const k = kennzahlen(scheibe); return k.warten <= MAX_WARTEN && k.verwaltung <= MAX_VERWALTUNG + 1e-9; };

export default function starte({ wurzel, optionen, fertig = () => {}, istFertig = false }) {
  let scheibe = Math.min(8, Math.max(1, optionen.zeitscheibe || 6));
  const uebung = !!optionen.uebung;
  let geschafft = istFertig;
  const zielZeile = uebung ? el('p', { class: 'sim-ziel' }) : null;
  const leiste = el('div', { class: 'zeitleiste', role: 'img' });
  const legende = el('div', { class: 'zeit-legende' }, [...PROGRAMME.map((p) => el('span', { class: `zl-${p.id}` }, [el('i'), p.name])), el('span', { class: 'zl-w' }, [el('i'), 'Umschalten'])]);
  const info = el('div', { class: 'sim-info', 'aria-live': 'polite' });
  const regler = el('div', { class: 'sim-steuerung' });
  const zeichnen = () => {
    const t = zeitleiste(scheibe);
    const k = kennzahlen(scheibe);
    if (uebung && !geschafft && passt(scheibe)) { geschafft = true; fertig(); }
    leiste.setAttribute('aria-label', `Zeitleiste über 36 Takte mit Zeitscheibe ${scheibe}`);
    leiste.replaceChildren(...t.map((x) => el('span', { class: `zl zl-${x}` })));
    const wOk = k.warten <= MAX_WARTEN, vOk = k.verwaltung <= MAX_VERWALTUNG + 1e-9;
    info.replaceChildren(
      el('p', {}, ['Musik wartet bis zu ', el('strong', { text: `${k.warten} Takte` }), uebung ? (wOk ? ' ✓' : ` ✗ (mehr als ${MAX_WARTEN} – der Ton ruckelt)`) : '']),
      el('p', {}, ['Umschalten kostet ', el('strong', { text: `${Math.round(k.verwaltung * 100)} %` }), ' der Zeit', uebung ? (vOk ? ' ✓' : ' ✗ (mehr als ein Drittel geht verloren)') : '']),
    );
    regler.replaceChildren(
      el('button', { type: 'button', class: 'knopf knopf-zweit knopf-rund', text: '−', 'aria-label': 'Zeitscheibe kürzer', disabled: scheibe <= 1, onclick: () => { scheibe--; zeichnen(); } }),
      el('span', { class: 'sim-anzahl', text: `Zeitscheibe: ${scheibe} Takt${scheibe > 1 ? 'e' : ''}` }),
      el('button', { type: 'button', class: 'knopf knopf-zweit knopf-rund', text: '+', 'aria-label': 'Zeitscheibe länger', disabled: scheibe >= 8, onclick: () => { scheibe++; zeichnen(); } }),
    );
    if (zielZeile) zielZeile.textContent = geschafft && passt(scheibe) ? '✓ Geschafft: Die Musik läuft flüssig, und wenig Zeit geht fürs Umschalten verloren.' : `Ziel: Finde eine Zeitscheibe, bei der die Musik höchstens ${MAX_WARTEN} Takte wartet und höchstens ein Drittel der Zeit fürs Umschalten draufgeht.`;
  };
  wurzel.append(...[zielZeile, regler, leiste, legende, info].filter(Boolean));
  zeichnen();
  if (uebung) wurzel._loesen = () => { scheibe = [1, 2, 3, 4, 5, 6, 7, 8].find(passt); zeichnen(); };
}

export function pruefe(optionen) {
  if (optionen.zeitscheibe != null && !(optionen.zeitscheibe >= 1 && optionen.zeitscheibe <= 8)) throw new Error('scheduler: zeitscheibe 1–8');
}
