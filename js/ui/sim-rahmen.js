// Bindet einen Simulator (js/sim/…) in einen Abschnitt ein. Simulatoren werden erst geladen, wenn sie
// gebraucht werden (dynamischer Import) – so bleibt der Start schnell, auch wenn später z. B. Python dazukommt.
//
// Schnittstelle eines Simulators (siehe js/sim/README.md):
//   export default function starte({ wurzel, optionen, fertig, istFertig }) { …; return () => aufräumen; }
//   wurzel     leeres Element, in das der Simulator zeichnet
//   optionen   Werte aus dem Inhalt („:::sim name“ … „schalter: 4“)
//   fertig()   aufrufen, wenn eine Übung geschafft ist (nur bei Blöcken mit „id:“) – wird gespeichert
//   istFertig  true, wenn die Übung schon früher geschafft wurde
import { el, toast } from '../kern/dom.js';
import { SIMULATOREN } from '../sim/index.js';

export function simBlock(ctx, teil) {
  const uebung = !!teil.id;
  const istFertig = uebung && !!ctx.zustand.uebungen[teil.id];
  const wurzel = el('div', { class: 'sim-flaeche' }, [el('p', { class: 'laden', text: 'Wird geladen …' })]);
  const marke = uebung ? el('p', { class: `uebung-marke${istFertig ? ' uebung-fertig' : ''}`, text: istFertig ? '✓ Übung geschafft' : 'Übung' }) : null;
  const rahmen = el('figure', { class: `sim${uebung ? ' sim-uebung' : ''}` }, [marke, wurzel]);
  (async () => {
    try {
      const modul = await SIMULATOREN[teil.name]();
      wurzel.replaceChildren();
      rahmen.aufraeumen = modul.default({
        wurzel,
        optionen: teil.optionen || {},
        istFertig,
        fertig: () => {
          if (!uebung || ctx.zustand.uebungen[teil.id]) return;
          ctx.zustand.uebungen[teil.id] = { fertig: Date.now(), ts: Date.now() };
          ctx.speichern();
          marke.textContent = '✓ Übung geschafft';
          marke.classList.add('uebung-fertig');
          toast('Übung geschafft!');
        },
      });
    } catch (e) {
      console.error(e);
      wurzel.replaceChildren(el('p', { class: 'fehler-text', text: 'Dieser Simulator konnte nicht geladen werden. Bitte einmal mit Internet öffnen.' }));
    }
  })();
  return rahmen;
}
