// Karteikarten mit Leitner-System: Runde (Karte ansehen → umdrehen → „wusste ich“/„noch nicht“) und Karteikasten.
import { el, toast } from '../kern/dom.js';
import { bewerteKarte, faelligeKarten, tag } from '../kern/leitner.js';
import { mischen } from '../kern/logik.js';
import { ansichtSetzen } from './bausteine.js';
import { textBlock } from './text.js';

const datumText = (t) => { const [j, m, d] = t.split('-'); return `${d}.${m}.${j}`; };
function wannText(faellig) {
  const heute = tag();
  if (faellig <= heute) return 'heute';
  const tage = Math.round((new Date(`${faellig}T12:00`) - new Date(`${heute}T12:00`)) / 864e5);
  return tage === 1 ? 'morgen' : tage < 7 ? `in ${tage} Tagen` : `am ${datumText(faellig)}`;
}

/**
 * Eine Runde mit den übergebenen Karten. Nicht gewusste Karten kommen am Ende der Runde noch einmal
 * (einmal je Karte), der Kartenstand wird aber nur beim ersten Mal bewertet.
 * einfuehrung: Karten einer Folge zum ersten Mal – Hinweis, dass sie in den Karteikasten wandern.
 */
export function kartenRunde(ctx, karten, { einfuehrung = false, beiFertig = () => {} } = {}) {
  const box = el('div', { class: 'karten-runde' });
  const R = ctx.config.regeln.leitner;
  let stapel = karten.slice();
  const nochmal = new Set();
  let i = 0, umgedreht = false, gewusst = 0;
  const bewertet = new Set();

  const zeichnen = () => {
    if (i >= stapel.length) {
      const naechste = karten.map((k) => ctx.zustand.karten[k.id]?.faellig).filter(Boolean).sort()[0];
      box.replaceChildren(
        el('div', { class: 'karten-ende' }, [
          el('p', { class: 'grosse-zahl', text: `${gewusst}/${bewertet.size}` }),
          el('p', { class: 'quiz-lob', text: `gewusst beim ersten Versuch.${naechste ? ` Nächste Wiederholung: ${wannText(naechste)}.` : ''}` }),
          einfuehrung ? el('p', { class: 'karte-text', text: 'Die Karten liegen jetzt in deinem Karteikasten (unten: „Karten“). Er erinnert dich, wenn sie wieder dran sind – gewusste Karten kommen in immer größeren Abständen.' }) : null,
        ]),
      );
      beiFertig();
      return;
    }
    const k = stapel[i];
    const stand = ctx.zustand.karten[k.id];
    const vorne = el('div', { class: 'karte-vorne' }, [el('p', { class: 'karte-seite', text: 'Frage' }), textBlock(ctx, k.vorne, { klasse: 'text kein-glossar' })]);
    const hinten = umgedreht ? el('div', { class: 'karte-hinten' }, [el('p', { class: 'karte-seite', text: 'Antwort' }), textBlock(ctx, k.hinten)]) : null;
    const karteEl = el('div', { class: `lernkarte${umgedreht ? ' lernkarte-offen' : ''}` }, [vorne, hinten]);
    const antworten = umgedreht
      ? el('div', { class: 'karten-knoepfe' }, [
        el('button', { type: 'button', class: 'knopf knopf-nein', text: 'Noch nicht', onclick: () => antwort(false) }),
        el('button', { type: 'button', class: 'knopf knopf-ja', text: 'Wusste ich', onclick: () => antwort(true) }),
      ])
      : el('button', { type: 'button', class: 'knopf knopf-breit', text: 'Umdrehen', onclick: () => { umgedreht = true; zeichnen(); } });
    box.replaceChildren(
      el('p', { class: 'quiz-zaehler', text: `Karte ${i + 1} von ${stapel.length}${stand ? ` · Fach ${stand.fach} von ${R.intervalleTage.length}` : ' · neu'}` }),
      karteEl, antworten,
    );
  };
  const antwort = (ja) => {
    const k = stapel[i];
    if (!bewertet.has(k.id)) {
      bewertet.add(k.id);
      if (ja) gewusst++;
      ctx.zustand.karten[k.id] = bewerteKarte(ctx.zustand.karten[k.id], ja, { intervalle: R.intervalleTage });
      ctx.speichern();
    }
    if (!ja && !nochmal.has(k.id)) { nochmal.add(k.id); stapel.push(k); }
    i++; umgedreht = false; zeichnen();
  };
  zeichnen();
  return box;
}

/** Karteikasten: Übersicht der Fächer und Runde mit den fälligen Karten. */
export async function zeigeKarteikasten(ctx) {
  const R = ctx.config.regeln.leitner;
  const k = ctx.kasten();
  const kopf = [el('p', { class: 'kicker', text: 'Wiederholen' }), el('h1', { class: 'titel', text: 'Karteikasten' })];
  if (!k.gesamt) {
    ansichtSetzen([...kopf, el('p', { class: 'einleitung', text: 'Noch leer. Jede Folge hat Karteikarten (Schritt g). Danach liegen sie hier und kommen wieder, wenn sie fällig sind.' }),
      el('a', { class: 'knopf', href: '#', text: 'Zur Startseite' })], { titel: 'Karteikasten' });
    return;
  }
  const faecher = el('ol', { class: 'faecher', 'aria-label': 'Karten je Fach' }, k.faecher.map((n, idx) => {
    const fach = el('li', { class: 'fach' }, [
      el('span', { class: 'fach-saeule' }, [el('span', { class: 'fach-fuellung' })]),
      el('span', { class: 'fach-zahl', text: String(n) }),
      el('span', { class: 'fach-name', text: `Fach ${idx + 1}` }),
      el('span', { class: 'fach-abstand', text: R.intervalleTage[idx] === 1 ? 'täglich' : `alle ${R.intervalleTage[idx]} Tage` }),
    ]);
    fach.querySelector('.fach-fuellung').style.height = `${k.gesamt ? Math.max(n ? 6 : 0, Math.round((n / k.gesamt) * 100)) : 0}%`;
    return fach;
  }));
  const ids = faelligeKarten(k.ids, ctx.zustand.karten, { max: R.maxJeRunde, neuJeRunde: R.neuJeRunde });
  const start = el('button', { type: 'button', class: 'knopf knopf-breit', disabled: !ids.length, text: ids.length ? `Jetzt wiederholen (${ids.length})` : 'Heute nichts fällig' });
  const runde = el('div');
  start.addEventListener('click', async () => {
    start.disabled = true;
    try {
      const alle = await alleKarten(ctx);
      const karten = mischen(ids.map((id) => alle.get(id)).filter(Boolean));
      runde.replaceChildren(kartenRunde(ctx, karten, { beiFertig: () => {} }));
      runde.scrollIntoView({ block: 'start' });
    } catch (e) { console.error(e); toast('Karten konnten nicht geladen werden.'); start.disabled = false; }
  });
  ansichtSetzen([...kopf,
    el('p', { class: 'einleitung', text: `${k.gesamt} Karten im Kasten · ${k.faellig} heute fällig${k.neu ? ` · ${k.neu} neu` : ''}. Gewusste Karten wandern ein Fach weiter und kommen seltener, vergessene zurück in Fach 1.` }),
    faecher, start, runde], { titel: 'Karteikasten' });
}

async function alleKarten(ctx) {
  const karten = new Map();
  const folgen = ctx.index.staffeln.flatMap((s) => s.folgen).filter((f) => f.datei && f.karten?.length);
  for (const f of await Promise.all(folgen.map((x) => ctx.folge(x.id)))) for (const k of f?.karten || []) karten.set(k.id, k);
  return karten;
}
