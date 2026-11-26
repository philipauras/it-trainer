// KERN (übernehmbar, siehe docs/kern.md) – kleine DOM-Helfer ohne Framework.

export const $ = (sel, wurzel = document) => wurzel.querySelector(sel);
export const $$ = (sel, wurzel = document) => [...wurzel.querySelectorAll(sel)];

/**
 * Element bauen: el('button', { class: 'knopf', text: 'Los', onclick: fn, 'aria-label': '…' }, [kinder]).
 * „text“ setzt textContent (sicher), „html“ setzt innerHTML – nur für selbst erzeugtes, maskiertes HTML
 * (z. B. aus dem Markdown-Renderer). Attribute mit Wert false/null/undefined werden weggelassen.
 */
export function el(tag, attrs = {}, kinder = []) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (k === 'text') e.textContent = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else if (k === 'dataset') Object.assign(e.dataset, v);
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const k of [].concat(kinder)) if (k != null && k !== false) e.append(k instanceof Node ? k : String(k));
  return e;
}

/** SVG-Element bauen (gleiche Regeln wie el, ohne „html“). */
export function svg(tag, attrs = {}, kinder = []) {
  const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (k === 'text') e.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  for (const k of [].concat(kinder)) if (k) e.append(k);
  return e;
}

let toastTimer;
/** Kurze Meldung unten am Bildschirm. */
export function toast(text, ms = 3200) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = text;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, ms);
}

/** Rückfrage als Blatt: await frage('Titel', 'Text', { ja: 'Ersetzen' }) → true/false. */
export function frage(titel, text, { ja = 'OK', nein = 'Abbrechen' } = {}) {
  const d = $('#dialog-frage');
  $('#frage-blatt-titel').textContent = titel;
  $('#frage-blatt-text').textContent = text;
  $('#frage-blatt-ja').textContent = ja;
  $('#frage-blatt-nein').textContent = nein;
  d.returnValue = '';
  d.showModal();
  return new Promise((ok) => d.addEventListener('close', () => ok(d.returnValue === 'ja'), { once: true }));
}

/** Datei zum Speichern anbieten. */
export function dateiAnbieten(name, text, typ = 'application/json') {
  const url = URL.createObjectURL(new Blob([text], { type: typ }));
  const a = el('a', { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
