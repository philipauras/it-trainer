// Hilfsbaustein (kein eigener Simulator): Wahrheitstabelle zum Ausfüllen – genutzt von „schaltung“ und „transistor“.
// Zeilen = alle Kombinationen der Eingänge (wie beim Binärzählen: 00, 01, 10, 11), Ausgangszellen tippen: ? → 0 → 1 → ?
import { el } from '../kern/dom.js';

/** Alle Eingangskombinationen für n Eingänge, erster Eingang = vorderste Stelle. */
export function kombinationen(n) {
  return Array.from({ length: 2 ** n }, (_, z) => Array.from({ length: n }, (_, i) => (z >> (n - 1 - i)) & 1));
}

/**
 * eingaenge: Namen, ausgaenge: Namen, richtig(zeile) → [Werte der Ausgänge], waehle(zeile): Eingänge in der Schaltung setzen,
 * fertig(): alles richtig ausgefüllt. Rückgabe: { element, loesen() }
 */
export function tabelleAusfuellen({ eingaenge, ausgaenge, richtig, waehle = () => {}, fertig = () => {}, istFertig = false }) {
  const zeilen = kombinationen(eingaenge.length);
  const werte = zeilen.map((z) => (istFertig ? richtig(z).slice() : ausgaenge.map(() => null)));
  const meldung = el('p', { class: 'sim-zusatz', 'aria-live': 'polite' });
  const koerper = el('tbody');
  let geprueft = false;
  const zeichnen = () => {
    koerper.replaceChildren(...zeilen.map((z, r) => el('tr', {}, [
      ...z.map((v, i) => el('td', {}, [el('button', { type: 'button', class: 'tab-ein', text: String(v), 'aria-label': `Zeile ${r + 1}: ${eingaenge.join(', ')} = ${z.join(', ')} – in der Schaltung einstellen`, onclick: () => waehle(z) })])),
      ...ausgaenge.map((name, a) => {
        const w = werte[r][a];
        const falsch = geprueft && w !== null && w !== richtig(z)[a];
        return el('td', {}, [el('button', {
          type: 'button', class: `tab-aus${w === null ? ' tab-leer' : ''}${falsch ? ' tab-falsch' : ''}`, text: w === null ? '?' : String(w),
          'aria-label': `Zeile ${r + 1}, ${name}: ${w === null ? 'leer' : w}${falsch ? ' – falsch' : ''}. Tippen zum Ändern`,
          onclick: () => { werte[r][a] = w === null ? 0 : w === 0 ? 1 : null; geprueft = false; zeichnen(); },
        })]);
      }),
    ])));
  };
  const pruefen = () => {
    geprueft = true;
    const leer = werte.flat().filter((w) => w === null).length;
    const fehler = zeilen.reduce((n, z, r) => n + werte[r].filter((w, a) => w !== null && w !== richtig(z)[a]).length, 0);
    zeichnen();
    if (!leer && !fehler) { meldung.textContent = '✓ Alles richtig – genau so verhält sich die Schaltung.'; fertig(); }
    else meldung.textContent = fehler ? `${fehler} Feld${fehler > 1 ? 'er' : ''} stimmt noch nicht (orange). Stell die Zeile in der Schaltung ein und schau nach.` : `Noch ${leer} Feld${leer > 1 ? 'er' : ''} offen.`;
  };
  zeichnen();
  if (istFertig) meldung.textContent = '✓ Schon geschafft.';
  const element = el('div', { class: 'tabelle-uebung' }, [
    el('p', { class: 'sim-ziel', text: 'Fülle die Tabelle aus: Tippe links eine Zeile an, um sie in der Schaltung einzustellen, dann rechts das Ergebnis (? → 0 → 1).' }),
    el('div', { class: 'tabelle-rahmen' }, [el('table', { class: 'wahrheit' }, [
      el('thead', {}, [el('tr', {}, [...eingaenge, ...ausgaenge].map((n, i) => el('th', { class: i >= eingaenge.length ? 'th-aus' : '', text: n })))]),
      koerper,
    ])]),
    el('div', { class: 'sim-steuerung' }, [el('button', { type: 'button', class: 'knopf', text: 'Prüfen', onclick: pruefen })]),
    meldung,
  ]);
  return { element, loesen: () => { zeilen.forEach((z, r) => { werte[r] = richtig(z).slice(); }); pruefen(); } };
}
