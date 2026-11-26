// Reiter „Lernen“: Staffel → ihre Folgen. Abgeschlossene Folgen sind übbar, die anderen ausgegraut. Fortschritt nur als
// „X von Y sicher“. Adressen:
//   #lernen                        Übersicht
//   #lernen/runde/folge/<id>       Übungsrunde zu einer Folge
//   #lernen/runde/staffel/<nr>     ganze Staffel üben
//   #lernen/runde/pruefung/<nr>    Prüfung (nur Fragen, mit Auswertung je Folge)
// Eine laufende Runde bleibt erhalten, solange die App offen ist: Nach „Im Wissen nachlesen“ geht es an derselben Stelle weiter.
import { el } from '../kern/dom.js';
import { tag } from '../kern/leitner.js';
import { bereiteFrageVor } from '../kern/logik.js';
import { istFertig, verfuegbar } from '../kern/fortschritt.js';
import { uebungsrunde, pruefung, bewerte, auswertung, sicherheit } from '../kern/lernpool.js';
import { ansichtSetzen, zurueckLink, balken } from './bausteine.js';
import { textBlock } from './text.js';

const runden = new Map(); // Schlüssel (z. B. „folge/s1f03“) → laufende Runde
const BUCHSTABEN = ['A', 'B', 'C', 'D'];
const kennung = (p) => (p.art === 'abschlussprojekt' ? 'Abschlussprojekt' : `Folge ${p.nr}`);

function auswahl(ctx, art, arg) {
  const eintraege = ctx.pool();
  const R = ctx.config.regeln;
  if (art === 'folge') return uebungsrunde(eintraege.filter((e) => e.folge === arg), ctx.zustand, { max: R.lernen.maxJeRunde });
  if (art === 'staffel') return uebungsrunde(eintraege.filter((e) => String(e.staffel) === arg), ctx.zustand, { max: R.lernen.maxJeRunde });
  if (art === 'pruefung') return pruefung(eintraege.filter((e) => String(e.staffel) === arg), { max: R.lernen.pruefungFragen });
  return [];
}

function rundenTitel(ctx, art, arg) {
  if (art === 'folge') return ctx.planEintrag(arg)?.titel || arg;
  if (art === 'staffel') return `Staffel ${arg} üben`;
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
const sicherText = (s) => `${s.sicher} von ${s.gesamt} sicher`;

function zeigeUebersicht(ctx) {
  const eintraege = ctx.pool();
  const R = ctx.config.regeln;
  const staffeln = ctx.index.staffeln.filter((s) => s.folgen.some(verfuegbar)).map((s) => {
    const hier = eintraege.filter((e) => e.staffel === s.nr);
    const fragen = hier.filter((e) => e.typ === 'frage').length;
    const st = sicherheit(hier, ctx.zustand);
    return el('section', { class: 'karte lern-staffel', 'aria-labelledby': `lern-staffel-${s.nr}` }, [
      el('p', { class: 'kicker', text: `Staffel ${s.symbol || s.nr}` }),
      el('h2', { class: 'karte-titel', id: `lern-staffel-${s.nr}`, text: s.titel }),
      hier.length ? el('div', { class: 'lern-stand' }, [balken(st.gesamt ? st.sicher / st.gesamt : 0, sicherText(st)), el('span', { class: 'lern-stand-text', text: sicherText(st) })]) : null,
      el('ul', { class: 'lern-folgen' }, s.folgen.filter(verfuegbar).map((f) => {
        const p = ctx.planEintrag(f.id);
        const titel = el('strong', { text: `${kennung(p)}: ${p.titel}` });
        if (!istFertig(ctx.zustand, f.id) && !hier.some((e) => e.folge === f.id)) {
          return el('li', {}, [el('div', { class: 'lern-folge lern-folge-gesperrt', 'aria-label': `${kennung(p)}: ${p.titel} – erst die Folge abschließen` }, [
            el('span', { class: 'folge-text' }, [titel, el('span', { class: 'folge-unter', text: 'Erst die Folge abschließen' })]),
          ])]);
        }
        const fs = sicherheit(hier.filter((e) => e.folge === f.id), ctx.zustand);
        return el('li', {}, [el('a', { class: 'lern-folge', href: `#lernen/runde/folge/${f.id}`, 'aria-label': `${kennung(p)}: ${p.titel} üben – ${sicherText(fs)}` }, [
          el('span', { class: 'folge-text' }, [titel, balken(fs.gesamt ? fs.sicher / fs.gesamt : 0, sicherText(fs)), el('span', { class: 'folge-unter', text: sicherText(fs) })]),
          el('span', { class: 'lern-ueben', text: 'Üben ›', 'aria-hidden': 'true' }),
        ])]);
      })),
      hier.length ? el('div', { class: 'knopfreihe' }, [
        el('a', { class: 'knopf knopf-zweit', href: `#lernen/runde/staffel/${s.nr}`, text: 'Ganze Staffel üben' }),
        fragen >= R.lernen.minFragenFuerPruefung ? el('a', { class: 'knopf knopf-zweit', href: `#lernen/runde/pruefung/${s.nr}`, text: 'Prüfung' }) : null,
      ]) : null,
    ]);
  });
  ansichtSetzen([
    el('h1', { class: 'titel', text: 'Lernen' }),
    el('p', { class: 'einleitung', text: eintraege.length
      ? 'Tippe eine abgeschlossene Folge an, um ihre Fragen zu üben. Was du noch nicht sicher weißt, kommt zuerst.'
      : 'Hier übst du die Fragen zu den Folgen. Schließe eine Folge ab („Auf den Punkt“ → „Folge abschließen“), dann kannst du sie hier üben.' }),
    ...staffeln], { titel: 'Lernen' });
}

// ------------------------------------------------------------ Runde
async function zeigeRunde(ctx, art, arg = '') {
  const schluessel = `${art}/${arg}`;
  const weiter = ctx.unterwegs.zurueckZurRunde === schluessel && runden.has(schluessel);
  delete ctx.unterwegs.zurueckZurRunde;
  let runde = weiter ? runden.get(schluessel) : null;
  if (!runde) {
    runde = { art, schluessel, titel: rundenTitel(ctx, art, arg), stapel: auswahl(ctx, art, arg).map((e) => ({ e, wiederholung: false })), i: 0, antworten: [], umgedreht: false, gewaehlt: null, vorbereitet: new Map() };
    runden.set(schluessel, runde);
  }
  const kopf = [zurueckLink('#lernen', 'Lernen'), el('p', { class: 'kicker', text: art === 'pruefung' ? 'Prüfung' : 'Üben' }), el('h1', { class: 'titel', text: runde.titel })];
  if (!runde.stapel.length) {
    ansichtSetzen([...kopf, el('p', { class: 'einleitung', text: 'Hier gibt es noch nichts zu üben – erst die Folge abschließen.' }), el('a', { class: 'knopf', href: '#lernen', text: 'Zu Lernen' })], { titel: runde.titel });
    return;
  }
  const box = el('div', { class: 'runde' }, [el('p', { class: 'laden', text: 'Wird geladen …' })]);
  ansichtSetzen([...kopf, box], { titel: runde.titel, klasse: 'ansicht-runde' });
  let daten;
  try { daten = await inhalte(ctx, runde.stapel.map((x) => x.e)); } catch (e) { console.error(e); box.replaceChildren(el('p', { class: 'fehler-text', text: 'Inhalte konnten nicht geladen werden. Bitte einmal mit Internet öffnen.' })); return; }
  const zeichnen = () => {
    if (runde.i >= runde.stapel.length) { box.replaceChildren(...ende(ctx, runde)); runden.delete(schluessel); return; }
    box.replaceChildren(...element(ctx, runde, daten, zeichnen));
  };
  zeichnen();
}

function antwortGeben(ctx, runde, richtig) {
  const x = runde.stapel[runde.i];
  if (x.wiederholung) return;
  bewerte(x.e, ctx.zustand, richtig, { heute: tag(), intervalle: ctx.config.regeln.leitner.intervalleTage });
  ctx.speichern();
  runde.antworten.push({ eintrag: x.e, richtig });
  // Nicht Gewusstes kommt am Ende der Runde noch einmal (nicht in der Prüfung) – gezählt wird nur das erste Mal
  if (!richtig && runde.art !== 'pruefung') runde.stapel.push({ e: x.e, wiederholung: true });
}

function element(ctx, runde, daten, zeichnen) {
  const x = runde.stapel[runde.i];
  const inhalt = daten.get(x.e.id);
  const zaehler = el('p', { class: 'quiz-zaehler', text: `${runde.i + 1} von ${runde.stapel.length} · ${kennung(ctx.planEintrag(x.e.folge))}${x.wiederholung ? ' · noch einmal' : ''}` });
  const naechstes = () => { runde.i++; runde.umgedreht = false; runde.gewaehlt = null; zeichnen(); scrollTo(0, 0); };
  if (!inhalt) return [zaehler, el('p', { text: 'Dieser Eintrag ist nicht mehr vorhanden.' }), el('button', { type: 'button', class: 'knopf', text: 'Weiter', onclick: naechstes })];
  if (x.e.typ === 'karte') {
    return [
      zaehler,
      el('div', { class: `lernkarte${runde.umgedreht ? ' lernkarte-offen' : ''}` }, [
        el('div', { class: 'karte-vorne' }, [el('p', { class: 'karte-seite', text: 'Frage' }), textBlock(ctx, inhalt.vorne, { klasse: 'text kein-glossar' })]),
        runde.umgedreht ? el('div', { class: 'karte-hinten' }, [el('p', { class: 'karte-seite', text: 'Antwort' }), textBlock(ctx, inhalt.hinten)]) : null,
      ]),
      runde.umgedreht
        ? el('div', { class: 'karten-knoepfe' }, [
          el('button', { type: 'button', class: 'knopf knopf-nein', text: 'Noch nicht', onclick: () => { antwortGeben(ctx, runde, false); naechstes(); } }),
          el('button', { type: 'button', class: 'knopf knopf-ja', text: 'Wusste ich', onclick: () => { antwortGeben(ctx, runde, true); naechstes(); } }),
        ])
        : el('button', { type: 'button', class: 'knopf knopf-breit', text: 'Antwort zeigen', onclick: () => { runde.umgedreht = true; zeichnen(); } }),
    ];
  }
  // Frage mit Antworten zur Auswahl
  if (!runde.vorbereitet.has(runde.i)) runde.vorbereitet.set(runde.i, bereiteFrageVor(inhalt));
  const v = runde.vorbereitet.get(runde.i);
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
  return el('a', {
    class: 'nachlesen-link', href: `#folge/${frage.folge}/${frage.nachlesen}`,
    onclick: () => { ctx.unterwegs.nachlesen = { folge: frage.folge, abschnitt: frage.nachlesen, stelle: frage.stelle || null, runde: runde.schluessel, nr: runde.i + 1 }; },
  }, [`→ Im Wissen nachlesen: ${frage.stelle || ziel?.titel || frage.nachlesen}`]);
}

function ende(ctx, runde) {
  const gesamt = runde.antworten.length, richtig = runde.antworten.filter((a) => a.richtig).length;
  const teile = [el('div', { class: 'quiz-ergebnis runde-ende' }, [
    el('p', { class: 'grosse-zahl', text: `${richtig}/${gesamt}` }),
    el('p', { class: 'quiz-lob', text: runde.art === 'pruefung' ? `${gesamt ? Math.round((richtig / gesamt) * 100) : 0} % richtig.` : richtig === gesamt ? 'Alles gewusst – stark!' : 'beim ersten Versuch gewusst. Was noch nicht saß, kommt beim nächsten Üben zuerst.' }),
  ])];
  if (runde.art === 'pruefung') {
    teile.push(el('h2', { class: 'abschnitt-titel', text: 'Auswertung je Folge' }), el('ul', { class: 'lern-folgen pruefung-auswertung' }, auswertung(runde.antworten).map((a) => {
      const p = ctx.planEintrag(a.folge);
      return el('li', {}, [el('a', { class: 'lern-folge', href: `#lernen/runde/folge/${a.folge}` }, [el('span', { class: 'folge-text' }, [
        el('strong', { text: `${kennung(p)}: ${p.titel}` }),
        balken(a.richtig / a.gesamt, `${a.richtig} von ${a.gesamt} richtig`),
        el('span', { class: 'folge-unter', text: `${a.richtig} von ${a.gesamt} richtig` }),
      ]), el('span', { class: 'lern-ueben', text: 'Üben ›', 'aria-hidden': 'true' })])]);
    })));
  }
  teile.push(el('div', { class: 'knopfreihe' }, [el('a', { class: 'knopf', href: '#lernen', text: 'Zurück zu Lernen' })]));
  return teile;
}
