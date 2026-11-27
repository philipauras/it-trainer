// Startseite = die Doku-Reihe: Schichten-Karte „Vom Sandkorn zur KI“ und Staffeln mit ihren Folgen – sonst nichts (Lernen hat einen eigenen Reiter).
import { el } from '../kern/dom.js';
import { schichtStaende, aktuelleSchicht, istFertig, verfuegbar, folgenAnteil } from '../kern/fortschritt.js';
import { ansichtSetzen, statusMarke, balken } from './bausteine.js';
import { schriftAuf } from '../kern/thema.js';

export function zeigeStart(ctx) {
  const { config, index, zustand } = ctx;
  // Kein Logo und kein App-Name auf der Startseite – die gehören nur zum App-Icon (Philip, 27.11.2026).
  const kinder = [];
  if (index.live === false && index.staffeln.some((s) => s.folgen.some((f) => f.status === 'entwurf' || f.status === 'geprueft'))) {
    kinder.push(el('p', { class: 'vorschau-hinweis', text: 'Vorschau: Hier erscheinen auch Folgen, die noch nicht freigegeben sind (markiert als Entwurf bzw. Geprüft).' }));
  }
  kinder.push(schichtenKarte(ctx));
  kinder.push(staffelListe(ctx));
  ansichtSetzen(kinder, { titel: config.app.name });
}

function schichtenKarte(ctx) {
  const { config, index, zustand } = ctx;
  const staende = schichtStaende(index, config.schichten, zustand);
  const hier = aktuelleSchicht(index, zustand);
  // Von unten (Strom) nach oben (KI) – wie ein Gebäude, das auf seinem Fundament steht
  const zeilen = [...staende].reverse().map((st, i) => {
    const offen = st.schicht.id === hier;
    const nr = config.schichten.length - i;
    const fortschrittText = st.geplant ? `${st.fertig} von ${st.geplant} Folgen` : `Staffel ${st.staffeln.map((s) => s.symbol || s.nr).join(', ')} · folgt`;
    const details = el('details', { class: `schicht${offen ? ' schicht-hier' : ''}${st.fertig && st.fertig === st.geplant ? ' schicht-fertig' : ''}`, open: offen });
    details.style.setProperty('--s-farbe', st.schicht.farbe);
    details.style.setProperty('--s-schrift', schriftAuf(st.schicht.farbe));
    details.append(
      el('summary', { class: 'schicht-kopf' }, [
        el('span', { class: 'schicht-nr', text: String(nr), 'aria-hidden': 'true' }),
        el('span', { class: 'schicht-name' }, [el('strong', { text: st.schicht.titel }), el('span', { class: 'schicht-kurz', text: st.schicht.kurz })]),
        offen ? el('span', { class: 'hier-marke', text: 'Du bist hier' }) : el('span', { class: 'schicht-stand', text: st.geplant ? `${st.fertig}/${st.geplant}` : '' }),
      ]),
      el('div', { class: 'schicht-inhalt' }, [
        st.geplant ? balken(st.geplant ? st.fertig / st.geplant : 0, fortschrittText) : el('p', { class: 'schicht-folgt', text: fortschrittText }),
        st.folgen.length ? el('ul', { class: 'schicht-folgen' }, st.folgen.map((f) => folgenZeile(ctx, f, { klein: true }))) : null,
      ]),
    );
    return details;
  });
  return el('section', { class: 'schichten', 'aria-labelledby': 'schichten-titel' }, [
    el('h2', { class: 'abschnitt-titel', id: 'schichten-titel', text: 'Vom Sandkorn zur KI' }),
    el('p', { class: 'abschnitt-text', text: 'Jede Schicht baut auf der darunter auf: Ganz unten fließt Strom, ganz oben antwortet eine KI. Tippe eine Schicht an, um ihre Folgen zu sehen.' }),
    el('div', { class: 'schichten-stapel' }, zeilen),
  ]);
}

/** Eine Folge als Listenzeile (auch auf der Staffelseite benutzt). */
export function folgenZeile(ctx, f, { klein = false } = {}) {
  const fertig = istFertig(ctx.zustand, f.id);
  const da = verfuegbar(f);
  const anteil = folgenAnteil(ctx.zustand, f.id, ctx.config.abschnitte.map((a) => a.id));
  const kennung = f.art === 'abschlussprojekt' ? '★' : String(f.nr);
  const inhalt = [
    el('span', { class: `folge-nr${fertig ? ' folge-nr-fertig' : ''}`, text: fertig ? '✓' : kennung, 'aria-hidden': 'true' }),
    el('span', { class: 'folge-text' }, [
      el('strong', { text: f.titel }),
      el('span', { class: 'folge-unter', text: [f.untertitel, da && f.dauer ? `${f.dauer} Min.` : (!da ? 'in Arbeit' : '')].filter(Boolean).join(' · ') }),
      !klein && da && anteil > 0 && !fertig ? balken(anteil, `${Math.round(anteil * 100)} %`) : null,
    ]),
    statusMarke(f.status),
  ];
  const label = `${f.art === 'abschlussprojekt' ? 'Abschlussprojekt' : `Folge ${f.nr}`}: ${f.titel}${fertig ? ' (fertig)' : ''}${da ? '' : ' (in Arbeit)'}`;
  return el('li', {}, [da
    ? el('a', { class: 'folge-zeile', href: `#folge/${f.id}`, 'aria-label': label }, inhalt)
    : el('div', { class: 'folge-zeile folge-geplant', 'aria-label': label }, inhalt)]);
}

function staffelListe(ctx) {
  const { config, index, zustand } = ctx;
  return el('section', { class: 'staffeln', 'aria-labelledby': 'staffeln-titel' }, [
    el('h2', { class: 'abschnitt-titel', id: 'staffeln-titel', text: 'Staffeln' }),
    ...config.stufen.map((stufe) => el('div', { class: 'stufe' }, [
      el('h3', { class: 'stufe-titel' }, [el('span', { text: stufe.titel }), el('span', { class: 'stufe-text', text: stufe.beschreibung })]),
      el('ul', { class: 'staffel-liste' }, index.staffeln.filter((s) => s.stufe === stufe.id).map((s) => {
        const da = s.folgen.filter(verfuegbar).length;
        const fertig = s.folgen.filter((f) => istFertig(zustand, f.id)).length;
        return el('li', {}, [el('a', { class: 'staffel-zeile', href: `#staffel/${s.nr}` }, [
          el('span', { class: 'staffel-nr', text: s.symbol || String(s.nr), 'aria-hidden': 'true' }),
          el('span', { class: 'folge-text' }, [
            el('strong', { text: s.titel }),
            el('span', { class: 'folge-unter', text: s.folgen.length ? `${fertig} von ${s.folgen.length} fertig${da < s.folgen.length ? ` · ${s.folgen.length - da} in Arbeit` : ''}` : 'folgt' }),
            s.folgen.length ? balken(fertig / s.folgen.length, `${fertig} von ${s.folgen.length}`) : null,
          ]),
        ])]);
      })),
    ])),
  ]);
}
