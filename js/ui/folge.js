// Eine Folge Schritt für Schritt: a Einstieg · b Geschichte · c Prinzip · d Im Bild · e Selbst machen ·
// f Wo steckt das bei dir? · g Auf den Punkt (Reihenfolge und Titel aus config.json → abschnitte).
// Quizfragen und Karteikarten erscheinen nicht hier, sondern im Lernpool (js/ui/lernpool.js) – freigeschaltet mit „Folge abschließen“.
import { el, $$, toast } from '../kern/dom.js';
import { besuche, pruefeFertig } from '../kern/fortschritt.js';
import { ansichtSetzen, statusMarke, zurueckLink } from './bausteine.js';
import { textBlock } from './text.js';
import { simBlock } from './sim-rahmen.js';
import { geheZu } from '../kern/router.js';

const STATUS_TEXT = {
  entwurf: 'Entwurf – noch nicht fachlich geprüft. Nur in der Vorschau sichtbar.',
  geprueft: 'Geprüft – Faktencheck bestanden, aber noch nicht freigegeben. Nur in der Vorschau sichtbar.',
};

export async function zeigeFolge(ctx, [id, abschnittId]) {
  const plan = ctx.planEintrag(id);
  let folge;
  try { folge = await ctx.folge(id); } catch (e) { console.error(e); }
  if (!plan || !folge) {
    ansichtSetzen([zurueckLink('#', 'Start'), el('h1', { class: 'titel', text: 'Folge nicht verfügbar' }),
      el('p', { text: 'Diese Folge ist noch in Arbeit – oder sie konnte ohne Internet nicht geladen werden.' })], { titel: 'Folge' });
    return;
  }
  const { config, zustand } = ctx;
  const reihenfolge = config.abschnitte.map((a) => a.id);
  // Ohne Abschnitt in der Adresse: dort weitermachen, wo man aufgehört hat
  if (!abschnittId || !reihenfolge.includes(abschnittId)) {
    geheZu(`folge/${id}/${zustand.folgen[id]?.schritt || reihenfolge[0]}`, { ersetzen: true });
    return;
  }
  const pos = reihenfolge.indexOf(abschnittId);
  const abschnitt = folge.abschnitte.find((a) => a.id === abschnittId);
  const vorlage = config.abschnitte[pos];
  const pflicht = config.regeln.folgeFertigAb;

  besuche(zustand, id, abschnittId, { zaehlt: !pflicht.includes(abschnittId) });
  ctx.speichern();

  const erledigt = new Set(zustand.folgen[id].besucht);
  const schritte = el('nav', { class: 'schritte', 'aria-label': 'Abschnitte der Folge' }, config.abschnitte.map((a, i) => el('a', {
    class: `schritt${i === pos ? ' schritt-aktiv' : ''}${erledigt.has(a.id) ? ' schritt-erledigt' : ''}`,
    href: `#folge/${id}/${a.id}`,
    'aria-current': i === pos ? 'step' : false,
    'aria-label': `${a.buchstabe}: ${a.titel}${erledigt.has(a.id) ? ' (erledigt)' : ''}`,
  }, [el('span', { class: 'schritt-buchstabe', text: erledigt.has(a.id) && i !== pos ? '✓' : a.buchstabe }), el('span', { class: 'schritt-titel', text: a.titel })])));

  const zurueckZu = ctx.unterwegs.nachlesen?.folge === id ? ctx.unterwegs.nachlesen : null;
  const kennung = folge.art === 'abschlussprojekt' ? 'Abschlussprojekt' : `Folge ${folge.nr}`;
  const kopf = el('header', { class: 'folgen-kopf' }, [
    zurueckLink(`#staffel/${folge.staffel}`, `Staffel ${folge.staffel}`),
    el('p', { class: 'kicker', text: `${kennung} · ${folge.dauer} Min.` }),
    el('h1', { class: 'titel folgen-titel', text: folge.titel }),
    folge.untertitel ? el('p', { class: 'folgen-untertitel', text: folge.untertitel }) : null,
    STATUS_TEXT[folge.status] ? el('p', { class: 'entwurf-banner' }, [statusMarke(folge.status), ` ${STATUS_TEXT[folge.status]}`]) : null,
  ]);

  const inhalt = el('section', { class: `abschnitt abschnitt-${abschnittId}`, 'aria-labelledby': 'abschnitt-titel' }, [
    el('p', { class: 'abschnitt-kicker' }, [el('span', { class: 'abschnitt-symbol', text: vorlage.symbol, 'aria-hidden': 'true' }), ` ${vorlage.buchstabe} · ${vorlage.titel}`]),
    el('h2', { class: 'abschnitt-ueberschrift', id: 'abschnitt-titel', text: abschnitt.titel }),
  ]);
  const gesehen = new Set();
  for (const t of abschnitt.teile) inhalt.append(t.art === 'md' ? textBlock(ctx, t.text, { gesehen }) : simBlock(ctx, t));

  const weiterZiel = reihenfolge[pos + 1];
  const fuss = el('nav', { class: 'folgen-fuss', 'aria-label': 'Blättern' }, [
    pos > 0 ? el('a', { class: 'knopf knopf-zweit', href: `#folge/${id}/${reihenfolge[pos - 1]}` }, ['‹ ', config.abschnitte[pos - 1].titel]) : el('span'),
    weiterZiel
      ? el('a', { class: 'knopf', href: `#folge/${id}/${weiterZiel}` }, [`Weiter: ${config.abschnitte[pos + 1].titel} ›`])
      : el('button', { class: 'knopf', type: 'button', text: 'Folge abschließen', onclick: () => abschliessen(ctx, folge) }),
  ]);

  if (abschnittId === 'beidir') inhalt.append(quellenBlock(folge));
  if (abschnittId === 'fazit') inhalt.append(poolHinweis(ctx, folge));

  // Aus einer Lernrunde zum Nachlesen gekommen: Leiste zurück zur Runde
  const nachlesenLeiste = zurueckZu?.runde
    ? el('div', { class: 'nachlesen-leiste' }, [el('a', {
      class: 'knopf', href: `#lernen/runde/${zurueckZu.runde}`, onclick: () => { ctx.unterwegs.zurueckZurRunde = zurueckZu.runde; delete ctx.unterwegs.nachlesen; },
    }, [`↩ Zurück zur Runde${zurueckZu.nr ? ` (Nr. ${zurueckZu.nr})` : ''}`])])
    : null;

  ansichtSetzen([kopf, schritte, nachlesenLeiste, inhalt, fuss], { titel: `${folge.titel} – ${vorlage.titel}`, klasse: 'ansicht-folge' });
  // Aktiven Schritt in der waagerechten Leiste sichtbar machen (Handy)
  $$('.schritt-aktiv')[0]?.scrollIntoView({ block: 'nearest', inline: 'center' });
  // „Im Wissen nachlesen“ mit Stelle: zur Zwischenüberschrift springen und sie kurz hervorheben (nur einmal)
  if (zurueckZu?.stelle && zurueckZu.abschnitt === abschnittId) {
    const ziel = [...inhalt.querySelectorAll('h3')].find((h) => h.textContent.trim() === zurueckZu.stelle);
    if (ziel) { ziel.classList.add('stelle-markiert'); ziel.scrollIntoView({ block: 'start' }); scrollBy(0, -80); }
    zurueckZu.stelle = null;
  }
}

/** Am Ende der Folge: wie viele Fragen und Karten in den Lernpool kommen (bzw. schon dort sind). */
function poolHinweis(ctx, folge) {
  const n = folge.quiz.length + folge.karten.length;
  const fertig = !!ctx.zustand.folgen[folge.id]?.fertig;
  return el('div', { class: 'pool-hinweis' }, [
    el('p', { class: 'pool-hinweis-zahl' }, [el('strong', { text: `${n} neue Karten im Lernpool` }), ` (${folge.quiz.length} Fragen, ${folge.karten.length} Karteikarten)`]),
    el('p', { class: 'pool-hinweis-text', text: fertig
      ? 'Diese Folge ist abgeschlossen – ihre Fragen und Karten sind schon in deinem Lernpool und melden sich, wenn sie dran sind.'
      : 'Mit „Folge abschließen“ kommen sie in deinen Lernpool. Er erinnert dich, wenn sie dran sind – auf der Startseite unter „Heute wiederholen“.' }),
  ]);
}

function markiereErledigt(schritte, abschnittId) {
  const a = schritte.querySelector(`a[href$="/${abschnittId}"]`);
  a?.classList.add('schritt-erledigt');
}

function quellenBlock(folge) {
  return el('details', { class: 'quellen' }, [
    el('summary', { text: `Quellen dieser Folge (${folge.quellen.length})` }),
    el('ul', {}, folge.quellen.map((q) => el('li', {}, [q.url ? el('a', { href: q.url, target: '_blank', rel: 'noopener noreferrer', text: q.text }) : q.text]))),
    folge.faktencheck ? el('p', { class: 'quellen-check', text: `Faktencheck: ${folge.faktencheck}` }) : null,
  ]);
}

function abschliessen(ctx, folge) {
  const neu = pruefeFertig(ctx.zustand, folge.id, ctx.config.regeln.folgeFertigAb);
  ctx.speichern();
  geheZu('');
  const n = folge.quiz.length + folge.karten.length;
  if (neu) setTimeout(() => toast(`Folge abgeschlossen – ${n} neue Karten im Lernpool.`), 50);
}
