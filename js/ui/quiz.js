// Quiz einer Folge: eine Frage nach der anderen, sofort mit Erklärung und Sprung „Im Wissen nachlesen“.
// Der Lauf bleibt im Speicher, solange die App offen ist – nach dem Nachlesen geht es an derselben Stelle weiter.
import { el } from '../kern/dom.js';
import { bereiteFrageVor, bewerteFrage, quizErgebnis, mischen } from '../kern/logik.js';
import { textBlock } from './text.js';

const laeufe = new Map(); // folgenId → { fragen: [vorbereitet], index, antworten: [{ id, richtig }], gewaehlt }
const BUCHSTABEN = ['A', 'B', 'C', 'D'];

function neuerLauf(fragen) {
  return { fragen: fragen.map((f) => bereiteFrageVor(f)), index: 0, antworten: [], gewaehlt: null };
}

export function quizAnzeigen(ctx, folge, { beiFertig }) {
  const box = el('div', { class: 'quiz' });
  if (!laeufe.has(folge.id)) laeufe.set(folge.id, neuerLauf(folge.quiz));
  const zeichnen = () => {
    const lauf = laeufe.get(folge.id);
    if (lauf.index >= lauf.fragen.length) { box.replaceChildren(...ergebnis(ctx, folge, lauf, zeichnen)); return; }
    box.replaceChildren(...frageAnsicht(ctx, folge, lauf, () => {
      lauf.index++;
      lauf.gewaehlt = null;
      if (lauf.index >= lauf.fragen.length) beiFertig();
      zeichnen();
      box.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, zeichnen));
  };
  zeichnen();
  return box;
}

function frageAnsicht(ctx, folge, lauf, weiter, neuZeichnen) {
  const v = lauf.fragen[lauf.index];
  const f = v.frage;
  const beantwortet = lauf.gewaehlt !== null;
  const knoepfe = v.reihenfolge.map((orig, pos) => {
    let zustand = '';
    if (beantwortet) {
      if (pos === v.richtigePosition) zustand = ' antwort-richtig';
      else if (pos === lauf.gewaehlt) zustand = ' antwort-falsch';
    }
    return el('button', {
      type: 'button', class: `antwort kein-glossar${zustand}`, disabled: beantwortet,
      'aria-label': `${BUCHSTABEN[pos]}: ${f.antworten[orig]}${zustand === ' antwort-richtig' ? ' – richtig' : zustand === ' antwort-falsch' ? ' – deine Antwort, falsch' : ''}`,
      onclick: () => {
        lauf.gewaehlt = pos;
        const richtig = pos === v.richtigePosition;
        lauf.antworten.push({ id: f.id, richtig });
        ctx.zustand.quiz[f.id] = bewerteFrage(ctx.zustand.quiz[f.id], richtig);
        ctx.speichern();
        neuZeichnen();
      },
    }, [el('span', { class: 'antwort-buchstabe', text: BUCHSTABEN[pos], 'aria-hidden': 'true' }), el('span', { text: f.antworten[orig] })]);
  });
  const teile = [
    el('p', { class: 'quiz-zaehler', text: `Frage ${lauf.index + 1} von ${lauf.fragen.length}` }),
    el('p', { class: 'quiz-frage kein-glossar', text: f.frage }),
    el('div', { class: 'antworten', role: 'group', 'aria-label': 'Antworten' }, knoepfe),
  ];
  if (beantwortet) {
    const richtig = lauf.gewaehlt === v.richtigePosition;
    const ziel = ctx.config.abschnitte.find((a) => a.id === f.nachlesen);
    teile.push(el('div', { class: `rueckmeldung ${richtig ? 'rueckmeldung-richtig' : 'rueckmeldung-falsch'}`, role: 'status' }, [
      el('p', { class: 'rueckmeldung-titel', text: richtig ? 'Richtig!' : 'Nicht ganz.' }),
      textBlock(ctx, f.erklaerung, { klasse: 'text rueckmeldung-text' }),
      el('a', {
        class: 'nachlesen-link', href: `#folge/${folge.id}/${f.nachlesen}`,
        onclick: () => { ctx.unterwegs.nachlesen = { folge: folge.id, frage: lauf.index + 1 }; },
      }, [`→ Im Wissen nachlesen: ${ziel?.titel || f.nachlesen}`]),
    ]));
    teile.push(el('button', { type: 'button', class: 'knopf knopf-breit', text: lauf.index + 1 < lauf.fragen.length ? 'Nächste Frage' : 'Ergebnis zeigen', onclick: weiter }));
  }
  return teile;
}

function ergebnis(ctx, folge, lauf, neuZeichnen) {
  const e = quizErgebnis(lauf.antworten);
  const falsche = lauf.antworten.filter((a) => !a.richtig).map((a) => a.id);
  const lob = e.prozent === 100 ? 'Alles richtig – stark!' : e.prozent >= 70 ? 'Gut gemacht!' : 'Ein guter Anfang. Wiederhole die falschen Fragen.';
  return [
    el('div', { class: 'quiz-ergebnis' }, [
      el('p', { class: 'grosse-zahl', text: `${e.richtig}/${e.gesamt}` }),
      el('p', { class: 'quiz-lob', text: lob }),
    ]),
    el('div', { class: 'knopfreihe' }, [
      falsche.length ? el('button', { type: 'button', class: 'knopf knopf-zweit', text: `Falsche wiederholen (${falsche.length})`, onclick: () => {
        laeufe.set(folge.id, neuerLauf(mischen(folge.quiz.filter((f) => falsche.includes(f.id)))));
        neuZeichnen();
      } }) : null,
      el('button', { type: 'button', class: 'knopf knopf-zweit', text: 'Ganzes Quiz neu', onclick: () => { laeufe.set(folge.id, neuerLauf(mischen(folge.quiz))); neuZeichnen(); } }),
    ]),
  ];
}
