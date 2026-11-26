// Simulator „addierer“: ein Rechenwerk aus Volladdierern (Ripple-Carry-Addierer). Zwei Binärzahlen A und B per Schalter,
// je Stelle ein Volladdierer; der Übertrag wandert Stelle für Stelle nach links (Animation wie eine Dominoreihe).
// Optionen: stellen (2–8, Standard 4)
//           ziel: 3+4, 5+6, ueberlauf     Übung: Aufgaben der Reihe nach einstellen; „ueberlauf“ = eine Summe finden,
//                                         die nicht mehr in die Stellen passt (Übertrag ganz links = 1)
import { el } from '../kern/dom.js';
import { bitsVon, wert } from './binaer.js';

/** Volladdierer: Summe und Übertrag aus a, b und Übertrag c. */
export const volladdierer = (a, b, c) => ({ s: a ^ b ^ c, c: (a & b) | (a & c) | (b & c) });
/** Addiert zwei Bitlisten (vorderste Stelle zuerst). Rückgabe: Summenbits, Überträge je Stelle (in die Stelle hinein), Endübertrag. */
export function addieren(a, b) {
  const n = a.length, s = Array(n).fill(0), ueber = Array(n + 1).fill(0);
  for (let i = n - 1; i >= 0; i--) { const r = volladdierer(a[i], b[i], ueber[i + 1]); s[i] = r.s; ueber[i] = r.c; }
  return { s, ueber, aus: ueber[0] };
}
export function zieleLesen(t, stellen) {
  return String(t ?? '').split(/[,;]/).map((x) => x.trim()).filter(Boolean).map((x) => {
    if (x === 'ueberlauf') return { art: 'ueberlauf' };
    const m = /^(\d+)\s*\+\s*(\d+)$/.exec(x);
    if (!m || Number(m[1]) >= 2 ** stellen || Number(m[2]) >= 2 ** stellen) throw new Error(`addierer: Ziel „${x}“ nicht lesbar oder zu groß`);
    return { art: 'summe', a: Number(m[1]), b: Number(m[2]) };
  });
}

export default function starte({ wurzel, optionen, fertig = () => {}, istFertig = false }) {
  const n = Math.min(8, Math.max(2, optionen.stellen || 4));
  const ziele = zieleLesen(optionen.ziel, n);
  let A = Array(n).fill(0), B = Array(n).fill(0);
  let schritt = istFertig ? ziele.length : 0;
  let welle = n; // wie weit die Übertragswelle schon gelaufen ist (Animation); n = fertig
  let timer = null;
  const ruhig = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const zielZeile = ziele.length ? el('p', { class: 'sim-ziel' }) : null;
  const gitter = el('div', { class: 'addierer' });
  gitter.style.setProperty('--n', String(n + 1));
  const info = el('div', { class: 'sim-info', 'aria-live': 'polite' });
  const zielText = (z) => (z.art === 'summe' ? `Rechne ${z.a} + ${z.b}: Stell A = ${z.a} und B = ${z.b} ein.` : 'Finde zwei Zahlen, deren Summe nicht mehr hineinpasst (Übertrag ganz links leuchtet).');
  const pruefeZiel = (r) => {
    if (schritt >= ziele.length) return;
    const z = ziele[schritt];
    if ((z.art === 'summe' && wert(A) === z.a && wert(B) === z.b) || (z.art === 'ueberlauf' && r.aus)) { schritt++; if (schritt === ziele.length) fertig(); }
  };
  const zeichnen = () => {
    const r = addieren(A, B);
    pruefeZiel(r);
    const sichtbar = (i) => n - 1 - i < welle; // Stelle i (0 = vorne) schon von der Welle erreicht?
    const zelle = (inhalt, cls = '') => el('div', { class: `add-zelle ${cls}` }, inhalt);
    const zeile = (titel, bits, setzen) => [
      zelle([titel], 'add-titel'),
      ...bits.map((b, i) => zelle([el('button', {
        type: 'button', class: `schalt-knopf schalt-knopf-klein${b ? ' schalt-knopf-an' : ''}`, 'aria-pressed': String(!!b), 'aria-label': `${titel}, Stelle ${2 ** (n - 1 - i)}: ${b}`,
        onclick: () => { setzen(i); starteWelle(); },
      }, [el('span', { class: 'schalt-wert', text: String(b) })])])),
    ];
    gitter.replaceChildren(
      zelle(['Stelle'], 'add-titel'), ...A.map((_, i) => zelle([String(2 ** (n - 1 - i))], 'add-stellenwert')),
      ...zeile('A', A, (i) => { A[i] ^= 1; }),
      ...zeile('B', B, (i) => { B[i] ^= 1; }),
      zelle(['Übertrag'], 'add-titel'), ...r.ueber.slice(1).map((c, i) => zelle([el('span', { class: `add-uebertrag${c && sichtbar(i) ? ' an' : ''}`, text: sichtbar(i) ? `${c} ↰` : '…' })])),
      zelle(['Summe'], 'add-titel add-summe-titel'), ...r.s.map((b, i) => zelle([el('span', { class: `add-bit${b && sichtbar(i) ? ' an' : ''}`, text: sichtbar(i) ? String(b) : '…' })], 'add-summe')),
    );
    const fertigGerechnet = welle >= n;
    info.replaceChildren(...[
      el('p', { class: 'sim-gross' }, [`${wert(A)} + ${wert(B)} = `, el('span', { text: fertigGerechnet ? String(wert(r.s) + (r.aus ? 2 ** n : 0)) : '…' })]),
      fertigGerechnet && r.aus ? el('p', { class: 'sim-zusatz', text: `Übertrag ganz links = 1: Das Ergebnis braucht ${n + 1} Stellen. In ${n} Stellen bliebe nur ${wert(r.s)} übrig – ein Überlauf.` }) : null,
    ].filter(Boolean));
    if (zielZeile) zielZeile.textContent = schritt >= ziele.length ? '✓ Geschafft: Dein Rechner aus Gattern rechnet richtig.' : `Aufgabe ${schritt + 1} von ${ziele.length}: ${zielText(ziele[schritt])}`;
  };
  const starteWelle = () => {
    clearInterval(timer);
    if (ruhig) { welle = n; zeichnen(); return; }
    welle = 0; zeichnen();
    timer = setInterval(() => { welle++; zeichnen(); if (welle >= n) clearInterval(timer); }, 260);
  };
  wurzel.append(...[zielZeile, gitter, info].filter(Boolean));
  zeichnen();
  if (ziele.length) wurzel._loesen = () => {
    clearInterval(timer); welle = n;
    while (schritt < ziele.length) {
      const z = ziele[schritt];
      if (z.art === 'summe') { A = bitsVon(z.a, n); B = bitsVon(z.b, n); } else { A = bitsVon(2 ** n - 1, n); B = bitsVon(1, n); }
      zeichnen();
    }
  };
  return () => clearInterval(timer);
}

export const pruefe = (optionen) => { zieleLesen(optionen.ziel, Math.min(8, Math.max(2, optionen.stellen || 4))); };
