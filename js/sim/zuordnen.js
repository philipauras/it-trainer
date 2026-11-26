// Simulator „zuordnen“ (Übung): jede Karte der passenden Gruppe zuordnen.
// Optionen: gruppen: Prozesse | Speicher | Geräte
//           paare: Musik und Browser laufen gleichzeitig = Prozesse | Ein Programm darf nicht in fremden Speicher = Speicher
import { el } from '../kern/dom.js';
import { lesenListe, mischen } from './sortieren.js';

export function paareLesen(t, gruppen) {
  return lesenListe(t).map((p) => {
    const i = p.lastIndexOf('=');
    const text = p.slice(0, i).trim(), gruppe = p.slice(i + 1).trim();
    if (i < 0 || !text || !gruppen.includes(gruppe)) throw new Error(`zuordnen: „${p}“ – erwartet „Text = Gruppe“ mit bekannter Gruppe`);
    return { text, gruppe };
  });
}

export default function starte({ wurzel, optionen, fertig = () => {}, istFertig = false }) {
  const gruppen = lesenListe(optionen.gruppen);
  const paare = paareLesen(optionen.paare, gruppen);
  const reihenfolge = mischen(paare.length);
  const wahl = paare.map((p) => (istFertig ? p.gruppe : null));
  let geprueft = false, geschafft = istFertig;
  const liste = el('div', { class: 'zuordnen-liste' });
  const meldung = el('p', { class: 'sim-zusatz', 'aria-live': 'polite' });
  const zeichnen = () => {
    liste.replaceChildren(...reihenfolge.map((k) => {
      const p = paare[k];
      const zustand = geprueft && wahl[k] ? (wahl[k] === p.gruppe ? ' zuordnen-ok' : ' zuordnen-nein') : '';
      return el('div', { class: `zuordnen-karte${zustand}`, role: 'group', 'aria-label': p.text }, [
        el('p', { class: 'zuordnen-text', text: p.text }),
        el('div', { class: 'zuordnen-gruppen' }, gruppen.map((g) => el('button', {
          type: 'button', class: `zuordnen-knopf${wahl[k] === g ? ' zuordnen-gewaehlt' : ''}`, 'aria-pressed': String(wahl[k] === g), text: g,
          onclick: () => { wahl[k] = g; geprueft = false; meldung.textContent = ''; zeichnen(); },
        }))),
      ]);
    }));
  };
  const pruefen = () => {
    geprueft = true; zeichnen();
    const offen = wahl.filter((w) => !w).length, falsch = paare.filter((p, k) => wahl[k] && wahl[k] !== p.gruppe).length;
    if (!offen && !falsch) { meldung.textContent = '✓ Alles richtig zugeordnet!'; if (!geschafft) { geschafft = true; fertig(); } }
    else meldung.textContent = falsch ? `${falsch} ${falsch === 1 ? 'Karte passt' : 'Karten passen'} noch nicht (orange).` : `Noch ${offen} offen.`;
  };
  wurzel.append(liste, el('div', { class: 'sim-steuerung' }, [el('button', { type: 'button', class: 'knopf', text: 'Prüfen', onclick: pruefen })]), meldung);
  zeichnen();
  if (istFertig) meldung.textContent = '✓ Schon geschafft.';
  wurzel._loesen = () => { paare.forEach((p, k) => { wahl[k] = p.gruppe; }); pruefen(); };
}

export function pruefe(optionen) {
  const g = lesenListe(optionen.gruppen);
  if (g.length < 2) throw new Error('zuordnen: mindestens zwei Gruppen');
  if (paareLesen(optionen.paare, g).length < 3) throw new Error('zuordnen: mindestens drei Karten');
}
