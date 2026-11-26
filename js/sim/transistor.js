// Simulator „transistor“: ein Stromkreis mit Batterie und Lampe, den ein kleiner Steuerstrom über einen Transistor
// (oder ein Relais) schaltet. Der fließende Strom wird als wandernde Striche gezeigt.
// Optionen:
//   art: transistor | relais          Bauteil (Standard transistor)
//   anordnung: einzeln | reihe | parallel | nicht
//        einzeln  = ein Steuerschalter A schaltet die Lampe
//        reihe    = zwei Transistoren hintereinander (Lampe nur, wenn A und B an)
//        parallel = zwei Transistoren nebeneinander (Lampe, wenn A oder B an)
//        nicht    = Transistor als Abkürzung an der Lampe vorbei (Lampe an, wenn A aus)
//   tabelle: ja                       Übung: Wahrheitstabelle ausfüllen
import { el, svg } from '../kern/dom.js';
import { tabelleAusfuellen } from './tabelle.js';

export const ANORDNUNGEN = {
  einzeln: { ein: ['A'], lampe: ([a]) => a },
  reihe: { ein: ['A', 'B'], lampe: ([a, b]) => a && b },
  parallel: { ein: ['A', 'B'], lampe: ([a, b]) => a || b },
  nicht: { ein: ['A'], lampe: ([a]) => !a },
};
export const lampeAn = (anordnung, werte) => (ANORDNUNGEN[anordnung].lampe(werte) ? 1 : 0);

const linie = (d, an, extra = '') => svg('path', { d, class: `draht${an ? ' draht-an' : ''}${extra}` });

function bauteil(x, y, an, art, name, steuerName = '') {
  const steuerText = steuerName ? svg('text', { x, y: y + (art === 'relais' ? 48 : 46), 'text-anchor': 'middle', class: `steuer-text${an ? ' steuer-text-an' : ''}`, text: `▲ Steuerung ${steuerName}` }) : null;
  // Transistor: Kasten mit Kanal, der sich schließt; Relais: Spule unten, Kontaktzunge oben
  if (art === 'relais') {
    return svg('g', { class: `bauteil${an ? ' bauteil-an' : ''}` }, [
      svg('circle', { cx: x - 22, cy: y, r: 4, class: 'kontakt' }), svg('circle', { cx: x + 22, cy: y, r: 4, class: 'kontakt' }),
      svg('line', { x1: x - 22, y1: y, x2: x + 22, y2: an ? y : y - 16, class: 'zunge' }),
      svg('rect', { x: x - 20, y: y + 14, width: 40, height: 16, rx: 4, class: 'spule' }),
      svg('path', { d: `M${x - 14} ${y + 22} q4 -8 8 0 q4 8 8 0 q4 -8 8 0`, class: 'spule-draht' }), steuerText,
      svg('text', { x, y: y - 22, 'text-anchor': 'middle', class: 'bauteil-text', text: name }),
    ]);
  }
  return svg('g', { class: `bauteil${an ? ' bauteil-an' : ''}` }, [
    svg('rect', { x: x - 24, y: y - 14, width: 48, height: 28, rx: 7, class: 'bauteil-kasten' }),
    svg('line', { x1: x - 24, y1: y, x2: x + 24, y2: y, class: `kanal${an ? ' kanal-an' : ''}` }),
    svg('line', { x1: x, y1: y + 14, x2: x, y2: y + 30, class: 'steuer' }), steuerText,
    svg('text', { x, y: y - 20, 'text-anchor': 'middle', class: 'bauteil-text', text: name }),
  ]);
}

export default function starte({ wurzel, optionen, fertig = () => {}, istFertig = false }) {
  const anordnung = ANORDNUNGEN[optionen.anordnung] ? optionen.anordnung : 'einzeln';
  const art = optionen.art === 'relais' ? 'relais' : 'transistor';
  const { ein } = ANORDNUNGEN[anordnung];
  const werte = ein.map(() => 0);
  const bild = el('div', { class: 'strom-bild' });
  const knoepfe = el('div', { class: 'schalt-eingaenge' });
  const info = el('div', { class: 'sim-info', 'aria-live': 'polite' });
  const wort = art === 'relais' ? 'Relais' : 'Transistor';

  const zeichnen = () => {
    const licht = lampeAn(anordnung, werte);
    const k = [];
    // Hauptkreis: Batterie links (x 40), oben zur Lampe (x 280), rechts runter, unten zurück
    const L = 40, R = 300, O = 40, U = 150;
    k.push(svg('rect', { x: L - 16, y: 80, width: 32, height: 44, rx: 5, class: 'batterie' }));
    k.push(svg('text', { x: L, y: 98, 'text-anchor': 'middle', class: 'bauteil-text', text: '+' }));
    k.push(svg('text', { x: L, y: 118, 'text-anchor': 'middle', class: 'bauteil-text', text: '−' }));
    if (anordnung === 'nicht') {
      const durchT = werte[0] === 1;
      k.push(linie(`M${L} 80 V${O} H120`, true), svg('rect', { x: 120, y: O - 9, width: 34, height: 18, rx: 3, class: 'widerstand' }),
        svg('text', { x: 137, y: O - 14, 'text-anchor': 'middle', class: 'bauteil-text', text: 'Widerstand' }));
      k.push(linie(`M154 ${O} H200`, true), linie(`M200 ${O} H${R} V75`, !durchT), linie(`M${R} 125 V${U} H200`, !durchT), linie(`M200 ${U} H${L} V124`, true));
      // Abzweig mit Transistor zwischen Knoten 200,O und 200,U
      k.push(linie(`M200 ${O} V75`, durchT), linie(`M200 125 V${U}`, durchT));
      k.push(svg('g', { transform: 'rotate(90 200 100)' }, [bauteil(200, 100, durchT, art, '')]));
      k.push(svg('text', { x: 168, y: 104, 'text-anchor': 'end', class: 'bauteil-text', text: wort }));
    } else {
      k.push(linie(`M${L} 80 V${O} H${R} V75`, licht), linie(`M${R} 125 V${U}`, licht));
      if (anordnung === 'einzeln') {
        k.push(linie(`M${R} ${U} H194`, licht), linie(`M146 ${U} H${L} V124`, licht), bauteil(170, U, werte[0], art, wort, 'A'));
      } else if (anordnung === 'reihe') {
        k.push(linie(`M${R} ${U} H244`, licht), linie(`M196 ${U} H144`, licht), linie(`M96 ${U} H${L} V124`, licht));
        k.push(bauteil(220, U, werte[1], art, `${wort} B`, 'B'), bauteil(120, U, werte[0], art, `${wort} A`, 'A'));
      } else {
        const a = werte[0], b = werte[1];
        k.push(linie(`M${R} ${U} H250`, licht), linie(`M90 ${U} H${L} V124`, licht));
        k.push(linie(`M250 ${U} V120 H194`, a), linie(`M146 120 H90 V${U}`, a), bauteil(170, 120, a, art, `${wort} A`, ''));
        k.push(linie(`M250 ${U} V180 H194`, b), linie(`M146 180 H90 V${U}`, b), bauteil(170, 180, b, art, `${wort} B`, ''));
      }
    }
    // Lampe rechts
    k.push(svg('g', { class: `strom-lampe${licht ? ' strom-lampe-an' : ''}` }, [
      licht ? svg('circle', { cx: R, cy: 100, r: 30, class: 'ausgang-schein' }) : null,
      svg('circle', { cx: R, cy: 100, r: 18, class: 'lampe-kreis' }),
      svg('path', { d: `M${R - 9} 91 L${R + 9} 109 M${R + 9} 91 L${R - 9} 109`, class: 'lampe-kreuz' }),
    ]));
    const hoehe = anordnung === 'parallel' ? 215 : 210;
    bild.replaceChildren(svg('svg', { viewBox: `0 0 340 ${hoehe}`, class: 'strom-svg', role: 'img', 'aria-label': `Stromkreis: Lampe ${licht ? 'leuchtet' : 'aus'}` }, k));
    knoepfe.replaceChildren(...ein.map((n, i) => el('button', {
      type: 'button', class: `schalt-knopf${werte[i] ? ' schalt-knopf-an' : ''}`, 'aria-pressed': String(!!werte[i]),
      'aria-label': `Steuerschalter ${n}: ${werte[i] ? 'an' : 'aus'}`, onclick: () => { werte[i] = werte[i] ? 0 : 1; zeichnen(); },
    }, [el('span', { class: 'schalt-name', text: `Steuerung ${n}` }), el('span', { class: 'schalt-wert', text: werte[i] ? 'an' : 'aus' })])));
    const steuer = ein.filter((_, i) => werte[i]).length;
    info.replaceChildren(el('p', {}, [
      'Lampe: ', el('strong', { text: licht ? 'leuchtet' : 'aus' }),
      ` · ${steuer ? `Steuersignal an bei ${ein.filter((_, i) => werte[i]).join(' und ')}` : 'kein Steuersignal'}`,
    ]));
  };
  let tab = null;
  if (optionen.tabelle) {
    tab = tabelleAusfuellen({
      eingaenge: ein, ausgaenge: ['Lampe'], istFertig, fertig,
      richtig: (z) => [lampeAn(anordnung, z)],
      waehle: (z) => { z.forEach((v, i) => { werte[i] = v; }); zeichnen(); },
    });
  }
  wurzel.append(...[knoepfe, bild, info, tab?.element].filter(Boolean));
  zeichnen();
  if (tab) wurzel._loesen = tab.loesen;
}

export function pruefe(optionen) {
  if (optionen.anordnung && !ANORDNUNGEN[optionen.anordnung]) throw new Error(`transistor: anordnung „${optionen.anordnung}“ unbekannt (einzeln, reihe, parallel, nicht)`);
  if (optionen.art && !['transistor', 'relais'].includes(optionen.art)) throw new Error('transistor: art ist transistor oder relais');
}
