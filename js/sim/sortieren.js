// Simulator „sortieren“ (Übung): Elemente in die richtige Reihenfolge bringen – mit ▲/▼ (ohne Ziehen, auch per Tastatur).
// Optionen: elemente: Erstes | Zweites | Drittes   (in RICHTIGER Reihenfolge; angezeigt wird gemischt)
//           oben: schnell   unten: langsam         (Beschriftung der Enden, optional)
import { el } from '../kern/dom.js';

export const lesenListe = (t) => String(t ?? '').split('|').map((x) => x.trim()).filter(Boolean);
/** Feste, nie schon sortierte Mischung (gleich bei jedem Öffnen, damit Screenshots vergleichbar sind). */
export function mischen(n) {
  const idx = Array.from({ length: n }, (_, i) => i);
  let s = n * 7 + 3;
  for (let i = n - 1; i > 0; i--) { s = (s * 1103515245 + 12345) % 2147483648; const j = s % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  if (idx.every((v, i) => v === i)) idx.reverse();
  return idx;
}

export default function starte({ wurzel, optionen, fertig = () => {}, istFertig = false }) {
  const richtig = lesenListe(optionen.elemente);
  let ordnung = istFertig ? richtig.map((_, i) => i) : mischen(richtig.length);
  let geprueft = false, geschafft = istFertig;
  const liste = el('ol', { class: 'sortier-liste' });
  const meldung = el('p', { class: 'sim-zusatz', 'aria-live': 'polite' });
  const tauschen = (i, j) => { [ordnung[i], ordnung[j]] = [ordnung[j], ordnung[i]]; geprueft = false; meldung.textContent = ''; zeichnen(); liste.children[j]?.querySelector(j < i ? '.sortier-hoch' : '.sortier-runter')?.focus(); };
  const zeichnen = () => {
    liste.replaceChildren(...ordnung.map((k, i) => el('li', { class: `sortier-element${geprueft ? (k === i ? ' sortier-ok' : ' sortier-nein') : ''}` }, [
      el('span', { class: 'sortier-text', text: richtig[k] }),
      el('button', { type: 'button', class: 'knopf knopf-zweit knopf-rund sortier-hoch', text: '▲', 'aria-label': `„${richtig[k]}“ nach oben`, disabled: i === 0, onclick: () => tauschen(i, i - 1) }),
      el('button', { type: 'button', class: 'knopf knopf-zweit knopf-rund sortier-runter', text: '▼', 'aria-label': `„${richtig[k]}“ nach unten`, disabled: i === ordnung.length - 1, onclick: () => tauschen(i, i + 1) }),
    ])));
  };
  const pruefen = () => {
    geprueft = true; zeichnen();
    const falsch = ordnung.filter((k, i) => k !== i).length;
    if (!falsch) { meldung.textContent = '✓ Richtig sortiert!'; if (!geschafft) { geschafft = true; fertig(); } }
    else meldung.textContent = `${falsch} ${falsch === 1 ? 'Eintrag steht' : 'Einträge stehen'} noch nicht am richtigen Platz (orange).`;
  };
  wurzel.append(...[
    optionen.oben ? el('p', { class: 'sortier-ende', text: `▲ ${optionen.oben}` }) : null, liste,
    optionen.unten ? el('p', { class: 'sortier-ende', text: `▼ ${optionen.unten}` }) : null,
    el('div', { class: 'sim-steuerung' }, [el('button', { type: 'button', class: 'knopf', text: 'Prüfen', onclick: pruefen })]), meldung,
  ].filter(Boolean));
  zeichnen();
  if (istFertig) meldung.textContent = '✓ Schon geschafft.';
  wurzel._loesen = () => { ordnung = richtig.map((_, i) => i); pruefen(); };
}

export function pruefe(optionen) {
  if (lesenListe(optionen.elemente).length < 3) throw new Error('sortieren: mindestens drei Elemente, getrennt mit |');
}
