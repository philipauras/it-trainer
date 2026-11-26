// KERN (übernehmbar, siehe docs/kern.md) – Adressen nach dem „#“ (Hash-Routing, funktioniert offline und
// auf statischem Hosting ohne Server-Regeln). „#folge/s1f01/prinzip“ → { name: 'folge', teile: ['s1f01', 'prinzip'] }.

export function leseAdresse(hash = location.hash) {
  const [name = '', ...teile] = decodeURIComponent(hash.replace(/^#\/?/, '')).split('/').filter(Boolean);
  return { name: name || 'start', teile };
}

/** Startet den Router: ansichten = { name: (teile) => void }. Unbekannte Adressen → Start. */
export function starteRouter(ansichten, { nachher } = {}) {
  const zeige = () => {
    const { name, teile } = leseAdresse();
    (ansichten[name] || ansichten.start)(teile);
    nachher?.(name);
  };
  addEventListener('hashchange', zeige);
  zeige();
  return zeige;
}

/** Zu einer Adresse wechseln; ersetzen = ohne neuen Verlaufseintrag (Zurück-Taste überspringt ihn). */
export function geheZu(hash, { ersetzen = false } = {}) {
  const ziel = `#${hash.replace(/^#/, '')}`;
  if (location.hash === ziel || (ziel === '#' && !location.hash)) { dispatchEvent(new HashChangeEvent('hashchange')); return; }
  if (ersetzen) { history.replaceState(history.state, '', ziel); dispatchEvent(new HashChangeEvent('hashchange')); }
  else location.hash = ziel;
}
