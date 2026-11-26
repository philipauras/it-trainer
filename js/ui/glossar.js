// Glossar: Suche, A–Z, aufklappbare Einträge. Adresse #glossar/<id> öffnet einen Eintrag direkt.
import { el } from '../kern/dom.js';
import { suche, buchstabe } from '../kern/glossar.js';
import { ansichtSetzen } from './bausteine.js';
import { markiereGlossar } from './text.js';

export function zeigeGlossar(ctx, [offenId]) {
  const liste = el('div', { class: 'glossar-liste' });
  const feld = el('input', { type: 'search', class: 'suchfeld', placeholder: 'Begriff suchen …', 'aria-label': 'Glossar durchsuchen', autocomplete: 'off' });
  const zeichnen = () => {
    const treffer = suche(ctx.glossar, feld.value);
    if (!treffer.length) { liste.replaceChildren(el('p', { class: 'leer-hinweis', text: 'Kein Begriff gefunden.' })); return; }
    let letzter = '';
    const kinder = [];
    for (const b of treffer) {
      const z = buchstabe(b.begriff);
      if (z !== letzter && !feld.value) { kinder.push(el('h2', { class: 'glossar-buchstabe', text: z })); letzter = z; }
      const folge = b.folge ? ctx.planEintrag(b.folge) : null;
      const text = el('div', { class: 'glossar-text' }, [el('p', { text: b.kurz }), b.mehr ? el('p', { text: b.mehr }) : null]);
      markiereGlossar(ctx, text, new Set([b.id]));
      kinder.push(el('details', { class: 'glossar-eintrag', id: `g-${b.id}`, open: b.id === offenId }, [
        el('summary', {}, [el('strong', { text: b.begriff }), el('span', { class: 'glossar-vorschau', text: b.kurz })]),
        text,
        folge?.datei ? el('a', { class: 'nachlesen-link', href: `#folge/${folge.id}` }, [`→ Erklärt in: ${folge.titel}`]) : null,
      ]));
    }
    liste.replaceChildren(...kinder);
  };
  feld.addEventListener('input', zeichnen);
  zeichnen();
  ansichtSetzen([
    el('p', { class: 'kicker', text: 'Nachschlagen' }),
    el('h1', { class: 'titel', text: 'Glossar' }),
    el('p', { class: 'einleitung', text: `${ctx.glossar.length} Fachbegriffe, einfach erklärt. In den Folgen sind sie unterstrichen – antippen genügt.` }),
    feld, liste,
  ], { titel: 'Glossar' });
  if (offenId) document.getElementById(`g-${offenId}`)?.scrollIntoView({ block: 'center' });
}
