// Lernpool: Quizfragen und Karteikarten aller abgeschlossenen Folgen – Tagesrunde, Runde je Schicht/Folge/Staffel,
// Prüfung je Staffel. Adressen:
//   #lernen                       Übersicht (Heute wiederholen, Fächer, gezielt üben, Prüfungen)
//   #lernen/runde/heute           Tagesrunde
//   #lernen/runde/schicht/<id>    nur eine Schicht      #lernen/runde/folge/<id>   nur eine Folge
//   #lernen/runde/staffel/<nr>    eine Staffel          #lernen/runde/pruefung/<nr> Prüfung (nur Fragen, mit Auswertung)
// Eine laufende Runde bleibt erhalten, solange die App offen ist: Nach „Im Wissen nachlesen“ geht es an derselben Stelle weiter.
import { el, toast } from '../kern/dom.js';
import { tag } from '../kern/leitner.js';
import { bereiteFrageVor } from '../kern/logik.js';
import { tagesrunde, gezielteRunde, pruefung, standVon, bewerte, auswertung, poolUebersicht, festigkeit } from '../kern/lernpool.js';
import { ansichtSetzen, zurueckLink, balken } from './bausteine.js';
import { textBlock } from './text.js';

const runden = new Map(); // Schlüssel (z. B. „schicht/strom“) → laufende Runde
const BUCHSTABEN = ['A', 'B', 'C', 'D'];

/** Einträge für eine Rundenart auswählen. */
function auswahl(ctx, art, arg) {
  const { eintraege } = ctx.pool();
  const R = ctx.config.regeln;
  const opt = { heute: tag(), max: R.leitner.maxJeRunde };
  if (art === 'heute') return tagesrunde(eintraege, ctx.zustand, { ...opt, neuMax: R.leitner.neuJeRunde });
  if (art === 'schicht') return gezielteRunde(eintraege.filter((e) => e.schicht === arg), ctx.zustand, opt);
  if (art === 'folge') return gezielteRunde(eintraege.filter((e) => e.folge === arg), ctx.zustand, opt);
  if (art === 'staffel') return gezielteRunde(eintraege.filter((e) => String(e.staffel) === arg), ctx.zustand, opt);
  if (art === 'pruefung') return pruefung(eintraege.filter((e) => String(e.staffel) === arg), { max: R.lernpool.pruefungFragen });
  return [];
}

function rundenTitel(ctx, art, arg) {
  if (art === 'heute') return 'Heute wiederholen';
  if (art === 'schicht') return `Schicht ${ctx.config.schichten.find((s) => s.id === arg)?.titel || arg}`;
  if (art === 'folge') return ctx.planEintrag(arg)?.titel || arg;
  if (art === 'staffel') return `Staffel ${arg}`;
  return `Prüfung Staffel ${arg}`;
}

/** Inhalte (Fragen, Karten) der beteiligten Folgen laden. */
async function inhalte(ctx, eintraege) {
  const m = new Map();
  for (const f of await Promise.all([...new Set(eintraege.map((e) => e.folge))].map((id) => ctx.folge(id)))) {
    for (const q of f?.quiz || []) m.set(q.id, { ...q, folge: f.id });
    for (const k of f?.karten || []) m.set(k.id, { ...k, folge: f.id });
  }
  return m;
}

export async function zeigeLernen(ctx, teile) {
  if (teile[0] === 'runde') return zeigeRunde(ctx, teile[1], teile[2]);
  return zeigeUebersicht(ctx);
}

// ------------------------------------------------------------ Übersicht
function zeigeUebersicht(ctx) {
  const { eintraege, heute } = ctx.pool();
  const R = ctx.config.regeln;
  const kopf = [el('p', { class: 'kicker', text: 'Wiederholen und üben' }), el('h1', { class: 'titel', text: 'Lernpool' })];
  if (!eintraege.length) {
    ansichtSetzen([...kopf,
      el('p', { class: 'einleitung', text: 'Noch leer. Schließe eine Folge ab („Auf den Punkt“ → „Folge abschließen“) – dann kommen ihre Quizfragen und Karteikarten hierher und melden sich, wenn sie wieder dran sind.' }),
      el('a', { class: 'knopf', href: '#', text: 'Zur Startseite' })], { titel: 'Lernpool' });
    return;
  }
  const u = poolUebersicht(eintraege, ctx.zustand, { faecher: R.leitner.intervalleTage.length });
  const faecher = el('ol', { class: 'faecher', 'aria-label': 'Karten und Fragen je Fach' }, [
    fachSaeule('neu', u.neu, u.gesamt, 'noch nie geübt'),
    ...u.faecher.map((n, i) => fachSaeule(`Fach ${i + 1}`, n, u.gesamt, R.leitner.intervalleTage[i] === 1 ? 'täglich' : `alle ${R.leitner.intervalleTage[i]} Tage`)),
  ]);
  const staffeln = ctx.index.staffeln.map((s) => {
    const hier = eintraege.filter((e) => e.staffel === s.nr);
    if (!hier.length) return null;
    const fragen = hier.filter((e) => e.typ === 'frage').length;
    const folgen = [...new Set(hier.map((e) => e.folge))];
    return el('section', { class: 'karte pool-staffel' }, [
      el('p', { class: 'kicker', text: `Staffel ${s.symbol || s.nr}` }),
      el('h2', { class: 'karte-titel', text: s.titel }),
      el('div', { class: 'knopfreihe' }, [
        el('a', { class: 'knopf knopf-zweit', href: `#lernen/runde/staffel/${s.nr}`, text: `Alles üben (${hier.length})` }),
        fragen >= R.lernpool.minFragenFuerPruefung ? el('a', { class: 'knopf knopf-zweit', href: `#lernen/runde/pruefung/${s.nr}`, text: `Prüfung (${Math.min(fragen, R.lernpool.pruefungFragen)} Fragen)` }) : null,
      ]),
      el('ul', { class: 'pool-folgen' }, folgen.map((id) => {
        const p = ctx.planEintrag(id);
        const fest = festigkeit(hier.filter((e) => e.folge === id), ctx.zustand, { faecher: R.leitner.intervalleTage.length });
        return el('li', {}, [el('a', { class: 'pool-folge', href: `#lernen/runde/folge/${id}` }, [
          el('span', { class: 'folge-text' }, [
            el('strong', { text: `${p.art === 'abschlussprojekt' ? 'Abschlussprojekt' : `Folge ${p.nr}`}: ${p.titel}` }),
            balken(fest.wert, `Festigkeit ${Math.round(fest.wert * 100)} %`),
            el('span', { class: 'folge-unter', text: `Festigkeit ${Math.round(fest.wert * 100)} %${fest.faellig ? ` · ${fest.faellig} dran` : ''}` }),
          ]),
          el('span', { class: 'pool-ueben', text: 'Üben ›' }),
        ])]);
      })),
    ]);
  });
  ansichtSetzen([...kopf,
    el('p', { class: 'einleitung', text: `${u.gesamt} Fragen und Karten aus abgeschlossenen Folgen. Gewusstes wandert ein Fach weiter und kommt seltener, Vergessenes zurück in Fach 1.` }),
    heute ? el('a', { class: 'knopf knopf-breit', href: '#lernen/runde/heute', text: `Heute wiederholen (${heute})` }) : el('p', { class: 'pool-fertig', text: 'Heute ist nichts mehr dran – gut gemacht! Üben kannst du trotzdem.' }),
    faecher, ...staffeln], { titel: 'Lernpool' });
}

function fachSaeule(name, n, gesamt, abstand) {
  const fach = el('li', { class: 'fach' }, [
    el('span', { class: 'fach-saeule' }, [el('span', { class: 'fach-fuellung' })]),
    el('span', { class: 'fach-zahl', text: String(n) }),
    el('span', { class: 'fach-name', text: name }),
    el('span', { class: 'fach-abstand', text: abstand }),
  ]);
  fach.querySelector('.fach-fuellung').style.height = `${gesamt ? Math.max(n ? 6 : 0, Math.round((n / gesamt) * 100)) : 0}%`;
  return fach;
}

// ------------------------------------------------------------ Runde
async function zeigeRunde(ctx, art, arg = '') {
  const schluessel = arg ? `${art}/${arg}` : art;
  const weiter = ctx.unterwegs.zurueckZurRunde === schluessel && runden.has(schluessel);
  delete ctx.unterwegs.zurueckZurRunde;
  let runde = weiter ? runden.get(schluessel) : null;
  if (!runde) {
    const liste = auswahl(ctx, art, arg);
    runde = { art, schluessel, titel: rundenTitel(ctx, art, arg), stapel: liste.map((e) => ({ e, wiederholung: false })), i: 0, antworten: [], umgedreht: false, gewaehlt: null, vorbereitet: new Map() };
    runden.set(schluessel, runde);
  }
  const kopf = [zurueckLink('#lernen', 'Lernpool'), el('p', { class: 'kicker', text: art === 'pruefung' ? 'Prüfung' : 'Lernrunde' }), el('h1', { class: 'titel', text: runde.titel })];
  if (!runde.stapel.length) {
    ansichtSetzen([...kopf, el('p', { class: 'einleitung', text: art === 'heute' ? 'Heute ist nichts dran. Schließe eine neue Folge ab oder übe gezielt im Lernpool.' : 'Hier gibt es noch nichts zu üben – erst die Folgen abschließen.' }),
      el('a', { class: 'knopf', href: '#lernen', text: 'Zum Lernpool' })], { titel: runde.titel });
    return;
  }
  const box = el('div', { class: 'runde' }, [el('p', { class: 'laden', text: 'Wird geladen …' })]);
  ansichtSetzen([...kopf, box], { titel: runde.titel, klasse: 'ansicht-runde' });
  let daten;
  try { daten = await inhalte(ctx, runde.stapel.map((x) => x.e)); } catch (e) { console.error(e); box.replaceChildren(el('p', { class: 'fehler-text', text: 'Inhalte konnten nicht geladen werden. Bitte einmal mit Internet öffnen.' })); return; }
  const zeichnen = () => {
    if (runde.i >= runde.stapel.length) { box.replaceChildren(...ende(ctx, runde)); runden.delete(schluessel); ctx.naviAktualisieren(); return; }
    box.replaceChildren(...element(ctx, runde, daten, zeichnen));
  };
  zeichnen();
}

function antwortGeben(ctx, runde, richtig) {
  const x = runde.stapel[runde.i];
  if (!x.wiederholung) {
    bewerte(x.e, ctx.zustand, richtig, { heute: tag(), intervalle: ctx.config.regeln.leitner.intervalleTage });
    ctx.speichern();
    runde.antworten.push({ eintrag: x.e, richtig });
    // Nicht Gewusstes kommt am Ende der Runde noch einmal (nicht bei der Prüfung) – bewertet wird nur das erste Mal
    if (!richtig && runde.art !== 'pruefung') runde.stapel.push({ e: x.e, wiederholung: true });
  }
}

function element(ctx, runde, daten, zeichnen) {
  const x = runde.stapel[runde.i];
  const inhalt = daten.get(x.e.id);
  const plan = ctx.planEintrag(x.e.folge);
  const zaehler = el('p', { class: 'quiz-zaehler' }, [
    `${runde.i + 1} von ${runde.stapel.length} · `,
    el('span', { class: `pool-art pool-art-${x.e.typ}`, text: x.e.typ === 'karte' ? 'Karte' : 'Frage' }),
    ` · ${plan.art === 'abschlussprojekt' ? 'Abschlussprojekt' : `Folge ${plan.nr}`}${x.wiederholung ? ' · noch einmal' : ''}`,
  ]);
  const naechstes = () => { runde.i++; runde.umgedreht = false; runde.gewaehlt = null; zeichnen(); scrollTo(0, 0); };
  if (!inhalt) return [zaehler, el('p', { text: 'Dieser Eintrag ist nicht mehr vorhanden.' }), el('button', { type: 'button', class: 'knopf', text: 'Weiter', onclick: naechstes })];
  if (x.e.typ === 'karte') {
    const st = standVon(x.e, ctx.zustand);
    return [
      zaehler,
      el('div', { class: `lernkarte${runde.umgedreht ? ' lernkarte-offen' : ''}` }, [
        el('div', { class: 'karte-vorne' }, [el('p', { class: 'karte-seite', text: st.neu ? 'Frage · neu' : `Frage · Fach ${st.fach}` }), textBlock(ctx, inhalt.vorne, { klasse: 'text kein-glossar' })]),
        runde.umgedreht ? el('div', { class: 'karte-hinten' }, [el('p', { class: 'karte-seite', text: 'Antwort' }), textBlock(ctx, inhalt.hinten)]) : null,
      ]),
      runde.umgedreht
        ? el('div', { class: 'karten-knoepfe' }, [
          el('button', { type: 'button', class: 'knopf knopf-nein', text: 'Noch nicht', onclick: () => { antwortGeben(ctx, runde, false); naechstes(); } }),
          el('button', { type: 'button', class: 'knopf knopf-ja', text: 'Wusste ich', onclick: () => { antwortGeben(ctx, runde, true); naechstes(); } }),
        ])
        : el('button', { type: 'button', class: 'knopf knopf-breit', text: 'Umdrehen', onclick: () => { runde.umgedreht = true; zeichnen(); } }),
    ];
  }
  // Frage
  const key = `${runde.i}`;
  if (!runde.vorbereitet.has(key)) runde.vorbereitet.set(key, bereiteFrageVor(inhalt));
  const v = runde.vorbereitet.get(key);
  const beantwortet = runde.gewaehlt !== null;
  const knoepfe = v.reihenfolge.map((orig, pos) => {
    const zustand = beantwortet ? (pos === v.richtigePosition ? ' antwort-richtig' : pos === runde.gewaehlt ? ' antwort-falsch' : '') : '';
    return el('button', {
      type: 'button', class: `antwort kein-glossar${zustand}`, disabled: beantwortet,
      'aria-label': `${BUCHSTABEN[pos]}: ${inhalt.antworten[orig]}${zustand === ' antwort-richtig' ? ' – richtig' : zustand === ' antwort-falsch' ? ' – deine Antwort, falsch' : ''}`,
      onclick: () => { runde.gewaehlt = pos; antwortGeben(ctx, runde, pos === v.richtigePosition); zeichnen(); },
    }, [el('span', { class: 'antwort-buchstabe', text: BUCHSTABEN[pos], 'aria-hidden': 'true' }), el('span', { text: inhalt.antworten[orig] })]);
  });
  const teile = [zaehler, el('p', { class: 'quiz-frage kein-glossar', text: inhalt.frage }), el('div', { class: 'antworten', role: 'group', 'aria-label': 'Antworten' }, knoepfe)];
  if (beantwortet) {
    const richtig = runde.gewaehlt === v.richtigePosition;
    teile.push(el('div', { class: `rueckmeldung ${richtig ? 'rueckmeldung-richtig' : 'rueckmeldung-falsch'}`, role: 'status' }, [
      el('p', { class: 'rueckmeldung-titel', text: richtig ? 'Richtig!' : 'Nicht ganz.' }),
      textBlock(ctx, inhalt.erklaerung, { klasse: 'text rueckmeldung-text' }),
      nachlesenLink(ctx, inhalt, runde),
    ]));
    teile.push(el('button', { type: 'button', class: 'knopf knopf-breit', text: runde.i + 1 < runde.stapel.length ? 'Weiter' : 'Ergebnis zeigen', onclick: naechstes }));
  }
  return teile;
}

function nachlesenLink(ctx, frage, runde) {
  const ziel = ctx.config.abschnitte.find((a) => a.id === frage.nachlesen);
  const plan = ctx.planEintrag(frage.folge);
  return el('a', {
    class: 'nachlesen-link', href: `#folge/${frage.folge}/${frage.nachlesen}`,
    onclick: () => { ctx.unterwegs.nachlesen = { folge: frage.folge, abschnitt: frage.nachlesen, stelle: frage.stelle || null, runde: runde?.schluessel || null, nr: runde ? runde.i + 1 : null }; },
  }, [`→ Im Wissen nachlesen: ${plan?.titel || frage.folge} · ${frage.stelle || ziel?.titel || frage.nachlesen}`]);
}

function ende(ctx, runde) {
  const gesamt = runde.antworten.length, richtig = runde.antworten.filter((a) => a.richtig).length;
  const prozent = gesamt ? Math.round((richtig / gesamt) * 100) : 0;
  const teile = [el('div', { class: 'quiz-ergebnis karten-ende' }, [
    el('p', { class: 'grosse-zahl', text: `${richtig}/${gesamt}` }),
    el('p', { class: 'quiz-lob', text: runde.art === 'pruefung' ? `${prozent} % richtig.` : prozent === 100 ? 'Alles gewusst – stark!' : 'Gewusst beim ersten Versuch. Was noch nicht saß, kommt bald wieder.' }),
  ])];
  if (runde.art === 'pruefung') {
    teile.push(el('h2', { class: 'abschnitt-titel', text: 'Auswertung je Folge' }), el('ul', { class: 'pool-folgen pruefung-auswertung' }, auswertung(runde.antworten).map((a) => {
      const p = ctx.planEintrag(a.folge);
      return el('li', {}, [el('a', { class: 'pool-folge', href: `#folge/${a.folge}` }, [el('span', { class: 'folge-text' }, [
        el('strong', { text: `${p.art === 'abschlussprojekt' ? 'Abschlussprojekt' : `Folge ${p.nr}`}: ${p.titel}` }),
        balken(a.richtig / a.gesamt, `${a.richtig} von ${a.gesamt} richtig`),
        el('span', { class: 'folge-unter', text: `${a.richtig} von ${a.gesamt} richtig${a.richtig < a.gesamt ? ' – nachlesen lohnt sich' : ''}` }),
      ])])]);
    })));
  }
  teile.push(el('div', { class: 'knopfreihe' }, [el('a', { class: 'knopf', href: '#', text: 'Zur Startseite' }), el('a', { class: 'knopf knopf-zweit', href: '#lernen', text: 'Lernpool' })]));
  if (runde.art !== 'pruefung') toast('Runde geschafft!');
  return teile;
}
