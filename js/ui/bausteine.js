// Kleine Bausteine, die mehrere Ansichten nutzen.
import { el, $ } from '../kern/dom.js';

/** Ansicht ersetzen, Seitentitel setzen, nach oben springen und den Fokus für Screenreader setzen. */
export function ansichtSetzen(kinder, { titel, klasse = '' } = {}) {
  const main = $('#inhalt');
  main.className = `ansicht ${klasse}`.trim();
  main.replaceChildren(...kinder.filter(Boolean));
  document.title = titel ? `${titel} · IT-Trainer` : 'IT-Trainer';
  scrollTo(0, 0);
  main.focus({ preventScroll: true });
}

/** Marke für Entwürfe in der Vorschau (freigegebene und geplante Folgen bekommen keine). */
export function statusMarke(status) {
  if (status === 'entwurf') return el('span', { class: 'status-marke status-entwurf', text: 'Entwurf' });
  if (status === 'geprueft') return el('span', { class: 'status-marke status-geprueft', text: 'Geprüft' });
  return null;
}

/** Fortschrittsbalken 0…1 mit Text für Screenreader. */
export function balken(anteil, text) {
  const b = el('span', { class: 'balken', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': Math.round(anteil * 100), 'aria-label': text }, [el('span', { class: 'balken-fuellung' })]);
  b.firstChild.style.width = `${Math.round(anteil * 100)}%`;
  return b;
}

export const zurueckLink = (href, text) => el('a', { class: 'zurueck-link', href }, [el('span', { 'aria-hidden': 'true', text: '‹ ' }), text]);
