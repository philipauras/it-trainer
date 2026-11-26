// Text aus den Inhalten anzeigen: Markdown → HTML, danach Glossarbegriffe antippbar machen.
import { renderMarkdown } from '../kern/markdown.js';
import { el, $ } from '../kern/dom.js';

// Hier werden keine Begriffe markiert (Links, Knöpfe, Code, Überschriften, Quizfragen und -antworten)
const AUSSER = 'a, button, code, pre, h1, h2, h3, .kein-glossar';

/**
 * Markiert in „wurzel“ jeden Glossarbegriff beim ersten Vorkommen als antippbares Wort.
 * gesehen: Set der schon markierten IDs (je Abschnitt eins, damit nicht jeder Satz voller Markierungen ist).
 */
export function markiereGlossar(ctx, wurzel, gesehen = new Set()) {
  const gang = document.createTreeWalker(wurzel, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement?.closest(AUSSER) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  const knoten = [];
  while (gang.nextNode()) knoten.push(gang.currentNode);
  for (const k of knoten) {
    const text = k.nodeValue;
    const teile = [];
    let pos = 0;
    for (const m of text.matchAll(ctx.muster.regex)) {
      const id = ctx.muster.idVon(m[0]);
      if (!id || gesehen.has(id)) continue;
      gesehen.add(id);
      if (m.index > pos) teile.push(text.slice(pos, m.index));
      teile.push(el('button', { type: 'button', class: 'glossar-wort', 'data-glossar': id, text: m[0], 'aria-label': `${m[0]} – im Glossar erklärt` }));
      pos = m.index + m[0].length;
    }
    if (!teile.length) continue;
    if (pos < text.length) teile.push(text.slice(pos));
    k.replaceWith(...teile);
  }
  return gesehen;
}

/** Markdown-Text als Block mit antippbaren Glossarbegriffen. */
export function textBlock(ctx, md, { gesehen = new Set(), klasse = 'text' } = {}) {
  const div = el('div', { class: klasse, html: renderMarkdown(md, { boxen: ctx.config.boxen }).html });
  markiereGlossar(ctx, div, gesehen);
  return div;
}

/** Kurzerklärung eines Begriffs als Blatt (Tipp auf ein markiertes Wort). */
export function zeigeBegriff(ctx, id) {
  const b = ctx.glossarNachId.get(id);
  if (!b) return;
  $('#glossar-blatt-titel').textContent = b.begriff;
  $('#glossar-blatt-text').textContent = b.kurz;
  $('#glossar-blatt-mehr').textContent = b.mehr || '';
  $('#glossar-blatt-mehr').hidden = !b.mehr;
  $('#glossar-blatt-link').href = `#glossar/${b.id}`;
  $('#dialog-glossar').showModal();
}
