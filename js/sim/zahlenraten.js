// Simulator „zahlenraten“: Die App denkt sich eine Zahl; du findest sie nur mit Ja/Nein-Fragen
// („Ist sie größer als …?“). Zeigt: Jede Antwort halbiert im besten Fall die Möglichkeiten – das ist ein Bit.
// Optionen: max (Zahlen 1 … max, Standard 64; am besten eine Zweierpotenz)
import { el } from '../kern/dom.js';

/** Wie viele Ja/Nein-Fragen reichen immer, wenn man geschickt halbiert? (aufgerundeter Zweierlogarithmus) */
export const noetigeFragen = (max) => Math.ceil(Math.log2(max));
/** Neuer Bereich nach der Antwort auf „Ist sie größer als grenze?“ */
export const eingrenzen = ({ von, bis }, grenze, ja) => (ja ? { von: Math.max(von, grenze + 1), bis } : { von, bis: Math.min(bis, grenze) });
/** Mitte eines Bereichs: die Grenze, die ihn möglichst genau halbiert. */
export const mitte = ({ von, bis }) => Math.floor((von + bis - 1) / 2);

export default function starte({ wurzel, optionen, fertig }) {
  const max = Math.max(4, Math.min(128, optionen.max || 64));
  const ziel = noetigeFragen(max);
  let geheim, bereich, grenze, fragen, verlauf, halbiert;
  const neu = () => {
    geheim = 1 + Math.floor(Math.random() * max);
    bereich = { von: 1, bis: max };
    grenze = mitte(bereich);
    fragen = 0;
    verlauf = [];
    halbiert = true;
    zeichnen();
  };
  const raster = el('div', { class: 'zahlen-raster', role: 'group', 'aria-label': `Zahlen 1 bis ${max}` });
  const kopf = el('div', { class: 'sim-info', 'aria-live': 'polite' });
  const steuerung = el('div', { class: 'sim-steuerung' });
  const liste = el('ol', { class: 'raten-verlauf' });
  const setzeGrenze = (g) => { grenze = Math.max(bereich.von, Math.min(bereich.bis - 1, g)); zeichnen(); };

  const zeichnen = () => {
    const gefunden = bereich.von === bereich.bis;
    raster.replaceChildren(...Array.from({ length: max }, (_, i) => {
      const z = i + 1;
      const drin = z >= bereich.von && z <= bereich.bis;
      return el('button', {
        type: 'button', tabindex: drin && !gefunden ? '0' : '-1', disabled: !drin || gefunden,
        class: `zahl${drin ? '' : ' zahl-raus'}${!gefunden && drin && z <= grenze ? ' zahl-links' : ''}${gefunden && z === geheim ? ' zahl-treffer' : ''}`,
        'aria-label': `${z}${drin ? '' : ' (ausgeschlossen)'}`, text: String(z),
        onclick: () => setzeGrenze(z),
      });
    }));
    const moeglich = bereich.bis - bereich.von + 1;
    if (gefunden) {
      const gut = fragen <= ziel;
      kopf.replaceChildren(
        el('p', { class: 'sim-gross', text: `Gefunden: ${geheim}!` }),
        el('p', {}, [`Du hast `, el('strong', { text: `${fragen} ${fragen === 1 ? 'Frage' : 'Fragen'}` }), ` gebraucht. `,
          fragen === ziel && halbiert ? `Perfekt – jede Frage hat die Möglichkeiten genau halbiert.` : gut ? `Da war auch etwas Glück dabei: Mit genauem Halbieren brauchst du bei ${max} Zahlen immer genau ${ziel} Fragen.` : `Mit genauem Halbieren reichen bei ${max} Zahlen immer ${ziel} Fragen.`]),
        el('p', { class: 'sim-zusatz', text: `Warum ${ziel}? Weil ${Array(ziel).fill(2).join(' × ')} = ${2 ** ziel}. Eine Frage, die die Möglichkeiten genau halbiert, liefert genau 1 Bit – ${max} Möglichkeiten brauchen ${ziel} Bit.` }),
      );
      steuerung.replaceChildren(el('button', { type: 'button', class: 'knopf', text: 'Noch einmal', onclick: neu }));
      fertig();
    } else {
      kopf.replaceChildren(
        el('p', {}, [`Ich denke mir eine Zahl von 1 bis ${max}. Noch `, el('strong', { text: `${moeglich} möglich` }), ` · ${fragen} ${fragen === 1 ? 'Frage' : 'Fragen'} gestellt.`]),
        el('p', { class: 'sim-zusatz', text: 'Tippe eine Zahl an (oder nutze − / +), um die Grenze zu wählen. Dann frag.' }),
      );
      steuerung.replaceChildren(
        el('button', { type: 'button', class: 'knopf knopf-zweit knopf-rund', text: '−', 'aria-label': 'Grenze kleiner', disabled: grenze <= bereich.von, onclick: () => setzeGrenze(grenze - 1) }),
        el('button', { type: 'button', class: 'knopf knopf-frage', onclick: () => {
          const ja = geheim > grenze;
          if (grenze !== mitte(bereich)) halbiert = false;
          fragen++;
          verlauf.push(`Größer als ${grenze}? ${ja ? 'Ja' : 'Nein'}`);
          bereich = eingrenzen(bereich, grenze, ja);
          grenze = mitte(bereich);
          zeichnen();
        } }, [`Ist sie größer als ${grenze}?`]),
        el('button', { type: 'button', class: 'knopf knopf-zweit knopf-rund', text: '+', 'aria-label': 'Grenze größer', disabled: grenze >= bereich.bis - 1, onclick: () => setzeGrenze(grenze + 1) }),
        el('button', { type: 'button', class: 'knopf knopf-zweit', text: 'Halbieren', onclick: () => setzeGrenze(mitte(bereich)) }),
      );
    }
    liste.replaceChildren(...verlauf.map((v) => el('li', { text: v })));
  };
  wurzel.append(kopf, raster, steuerung, liste);
  neu();
}
