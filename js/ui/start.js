// Startseite: Weiterlernen, Karteikasten, Schichten-Karte „Vom Sandkorn zur KI“, Staffeln nach Stufen.
import { el } from '../kern/dom.js';
import { naechsteFolge, schichtStaende, aktuelleSchicht, istFertig, verfuegbar, folgenAnteil } from '../kern/fortschritt.js';
import { versionVergleich } from '../kern/logik.js';
import { ansichtSetzen, statusMarke, balken } from './bausteine.js';

export function zeigeStart(ctx) {
  const { config, index, zustand } = ctx;
  const kinder = [
    el('header', { class: 'start-kopf' }, [
      el('img', { class: 'start-logo', src: 'icons/icon.svg', alt: '', width: 44, height: 44 }),
      el('div', {}, [el('h1', { class: 'start-titel', text: config.app.name }), el('p', { class: 'start-untertitel', text: config.app.untertitel })]),
    ]),
  ];
  const neu = neuigkeitenKarte(ctx);
  if (neu) kinder.push(neu);
  if (index.live === false && index.staffeln.some((s) => s.folgen.some((f) => f.status === 'entwurf' || f.status === 'geprueft'))) {
    kinder.push(el('p', { class: 'vorschau-hinweis', text: 'Vorschau: Hier erscheinen auch Folgen, die noch nicht freigegeben sind (markiert als Entwurf bzw. Geprüft).' }));
  }
  kinder.push(el('div', { class: 'start-raster' }, [weiterKarte(ctx), kastenKarte(ctx)]));
  kinder.push(schichtenKarte(ctx));
  kinder.push(staffelListe(ctx));
  ansichtSetzen(kinder, { titel: config.app.name });
}

function neuigkeitenKarte(ctx) {
  const { zustand, index } = ctx;
  const neueste = index.neuigkeiten[0];
  if (!neueste) return null;
  // Allererster Besuch: nichts ist „neu“ – nur merken
  if (!zustand.neuGesehen) { zustand.neuGesehen = neueste.version; ctx.speichern(); return null; }
  const offen = index.neuigkeiten.filter((n) => versionVergleich(n.version, zustand.neuGesehen) > 0);
  if (!offen.length) return null;
  const karte = el('section', { class: 'karte neu-karte', 'aria-labelledby': 'neu-titel' }, [
    el('p', { class: 'kicker', text: `Was ist neu · Version ${neueste.version}` }),
    el('h2', { class: 'karte-titel', id: 'neu-titel', text: 'Neu in der App' }),
    el('ul', { class: 'neu-liste' }, offen.flatMap((n) => n.punkte).slice(0, 8).map((p) => el('li', { text: p }))),
    el('button', { class: 'knopf knopf-zweit', type: 'button', text: 'Verstanden', onclick: () => { zustand.neuGesehen = neueste.version; ctx.speichern(); karte.remove(); } }),
  ]);
  return karte;
}

function weiterKarte(ctx) {
  const n = naechsteFolge(ctx.index, ctx.zustand);
  if (!n) {
    return el('section', { class: 'karte weiter-karte' }, [
      el('p', { class: 'kicker', text: 'Weiterlernen' }),
      el('h2', { class: 'karte-titel', text: 'Alle verfügbaren Folgen geschafft' }),
      el('p', { class: 'karte-text', text: 'Neue Folgen erscheinen hier, sobald sie fertig sind. Bis dahin: Karteikarten wiederholen.' }),
    ]);
  }
  const angefangen = ctx.zustand.folgen[n.id];
  const anteil = folgenAnteil(ctx.zustand, n.id, ctx.config.abschnitte.length);
  return el('a', { class: 'karte weiter-karte karte-link', href: `#folge/${n.id}` }, [
    el('p', { class: 'kicker', text: angefangen ? 'Weitermachen' : 'Als Nächstes' }),
    el('h2', { class: 'karte-titel', text: n.titel }),
    el('p', { class: 'karte-text', text: `Staffel ${n.staffel.nr} · ${n.art === 'gesellenstueck' ? 'Gesellenstück' : `Folge ${n.nr}`} · ${n.untertitel}` }),
    angefangen ? balken(anteil, `${Math.round(anteil * 100)} % der Folge`) : null,
    el('span', { class: 'knopf weiter-knopf', text: angefangen ? 'Weiter' : 'Folge starten' }),
    statusMarke(n.status),
  ]);
}

function kastenKarte(ctx) {
  const k = ctx.kasten();
  const text = !k.gesamt ? 'Nach jeder Folge kommen ihre Karteikarten hierher. Fällige Karten wiederholst du in kurzen Runden.'
    : k.faellig ? `${k.faellig} ${k.faellig === 1 ? 'Karte ist' : 'Karten sind'} heute dran.` : 'Heute ist nichts fällig. Gut gemacht!';
  return el('a', { class: 'karte kasten-karte karte-link', href: '#karten' }, [
    el('p', { class: 'kicker', text: 'Karteikasten' }),
    el('h2', { class: 'karte-titel' }, [el('span', { class: 'grosse-zahl', text: String(k.faellig) }), ' fällig']),
    el('p', { class: 'karte-text', text }),
  ]);
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
  const anteil = folgenAnteil(ctx.zustand, f.id, ctx.config.abschnitte.length);
  const kennung = f.art === 'gesellenstueck' ? '★' : String(f.nr);
  const inhalt = [
    el('span', { class: `folge-nr${fertig ? ' folge-nr-fertig' : ''}`, text: fertig ? '✓' : kennung, 'aria-hidden': 'true' }),
    el('span', { class: 'folge-text' }, [
      el('strong', { text: f.titel }),
      el('span', { class: 'folge-unter', text: [f.untertitel, da && f.dauer ? `${f.dauer} Min.` : (!da ? 'in Arbeit' : '')].filter(Boolean).join(' · ') }),
      !klein && da && anteil > 0 && !fertig ? balken(anteil, `${Math.round(anteil * 100)} %`) : null,
    ]),
    statusMarke(f.status),
  ];
  const label = `${f.art === 'gesellenstueck' ? 'Gesellenstück' : `Folge ${f.nr}`}: ${f.titel}${fertig ? ' (fertig)' : ''}${da ? '' : ' (in Arbeit)'}`;
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
