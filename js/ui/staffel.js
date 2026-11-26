// Staffelseite: Beschreibung, Stufe, alle Folgen der Staffel.
import { el } from '../kern/dom.js';
import { verfuegbar } from '../kern/fortschritt.js';
import { ansichtSetzen, zurueckLink } from './bausteine.js';
import { folgenZeile } from './start.js';

export function zeigeStaffel(ctx, [nr]) {
  const s = ctx.index.staffeln.find((x) => String(x.nr) === nr);
  if (!s) { location.hash = ''; return; }
  const stufe = ctx.config.stufen.find((x) => x.id === s.stufe);
  const schichten = s.schichten.map((id) => ctx.config.schichten.find((x) => x.id === id)?.titel).filter(Boolean);
  ansichtSetzen([
    zurueckLink('#', 'Start'),
    el('p', { class: 'kicker', text: `${s.symbol ? 'Sonderstaffel' : `Staffel ${s.nr}`} · ${stufe?.titel || ''}` }),
    el('h1', { class: 'titel', text: s.titel }),
    el('p', { class: 'einleitung', text: s.beschreibung }),
    el('p', { class: 'schichten-zeile', text: `Schichten: ${schichten.join(' · ')}` }),
    s.folgen.length
      ? el('ul', { class: 'folgen-liste' }, s.folgen.map((f) => folgenZeile(ctx, { ...f, staffel: s })))
      : el('p', { class: 'leer-hinweis', text: 'Diese Staffel ist geplant. Ihre Folgen entstehen nach Staffel 1.' }),
    s.folgen.length && s.folgen.some((f) => !verfuegbar(f)) ? el('p', { class: 'leer-hinweis', text: 'Folgen „in Arbeit“ erscheinen, sobald sie geprüft und freigegeben sind.' }) : null,
  ], { titel: s.titel });
}
