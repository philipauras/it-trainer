// Simulator „flipflop“: wie sich eine Schaltung etwas merkt.
//   art: sr   → RS-Flipflop aus zwei NODER-Gattern, deren Ausgänge über Kreuz zurückgeführt sind. Schalter S (setzen)
//               und R (zurücksetzen). Mit „uebung: ja“: 1 speichern, loslassen (bleibt!), löschen, loslassen.
//   art: ram  → kleiner Arbeitsspeicher: 4 Adressen × 4 Bit. Adresse wählen, Daten einstellen, „Schreiben“; die
//               gewählte Zeile wird gelesen. Mit „ziel: 1=0101; 2=0011“: diese Inhalte hineinschreiben.
import { el, svg } from '../kern/dom.js';

const noder = (a, b) => (a || b ? 0 : 1);
/** Stabiler Zustand des RS-Flipflops aus zwei NODER-Gattern (q = vorheriger Ausgang). */
export function rs(s, r, q) {
  let Q = q, Qn = q ? 0 : 1;
  for (let i = 0; i < 6; i++) { const nQ = noder(r, Qn), nQn = noder(s, Q); if (nQ === Q && nQn === Qn) break; Q = nQ; Qn = nQn; }
  return { Q, Qn };
}
/** Fortschritt der Speicher-Übung: Schritte 0→4 (setzen, halten, löschen, halten). */
export function rsSchritt(schritt, s, r, Q) {
  const ziele = [() => s && !r && Q, () => !s && !r && Q, () => r && !s && !Q, () => !s && !r && !Q];
  return schritt < 4 && ziele[schritt]() ? schritt + 1 : schritt;
}

function srStarten({ wurzel, optionen, fertig, istFertig }) {
  let s = 0, r = 0, Q = 0, Qn = 1;
  let schritt = istFertig ? 4 : 0;
  const uebung = !!optionen.uebung;
  const knoepfe = el('div', { class: 'schalt-eingaenge' });
  const bild = el('div', { class: 'schaltbild' });
  const info = el('div', { class: 'sim-info', 'aria-live': 'polite' });
  const liste = uebung ? el('ol', { class: 'schritt-liste' }) : null;
  const TEXTE = ['S einschalten: Q wird 1 (setzen)', 'S wieder aus – und Q bleibt trotzdem 1 (gemerkt!)', 'R einschalten: Q wird 0 (zurücksetzen)', 'R wieder aus – Q bleibt 0'];
  const zeichnen = () => {
    ({ Q, Qn } = rs(s, r, Q));
    if (uebung) { const vorher = schritt; schritt = rsSchritt(schritt, s, r, Q); if (schritt === 4 && vorher < 4) fertig(); }
    const L = (d, an) => svg('path', { d, class: `leitung${an ? ' leitung-an' : ''}` });
    const k = [
      L('M46 50 H120', r), L('M46 150 H120', s),
      L('M194 62 H240', Q), L('M194 138 H240', Qn),
      // Rückführungen über Kreuz: Q → unteres Gatter, Q̄ → oberes Gatter
      L('M214 62 V96 L106 112 V128 H120', Q), L('M214 138 V104 L106 88 V72 H120', Qn),
    ];
    for (const [y, an, n] of [[50, r, 'R'], [150, s, 'S']]) k.push(svg('g', { class: `knoten${an ? ' knoten-an' : ''}` }, [svg('circle', { cx: 30, cy: y, r: 16 }), svg('text', { x: 30, y: y + 6, 'text-anchor': 'middle', class: 'knoten-text', text: n })]));
    for (const [y, an] of [[61, Q], [139, Qn]]) k.push(svg('g', { class: `gatter${an ? ' gatter-an' : ''}` }, [svg('rect', { x: 120, y: y - 26, width: 74, height: 52, rx: 9 }), svg('text', { x: 157, y: y + 6, 'text-anchor': 'middle', class: 'gatter-text', text: 'NODER' })]));
    for (const [y, an, n] of [[62, Q, 'Q'], [138, Qn, 'nicht Q']]) k.push(svg('g', { class: `ausgang${an ? ' ausgang-an' : ''}` }, [an ? svg('circle', { cx: 256, cy: y, r: 22, class: 'ausgang-schein' }) : null, svg('circle', { cx: 256, cy: y, r: 14 }), svg('text', { x: 282, y: y + 6, class: 'ausgang-text', text: n })]));
    bild.replaceChildren(svg('svg', { viewBox: '0 0 340 190', class: 'schalt-svg', role: 'img', 'aria-label': `Flipflop: S ${s}, R ${r}, Q ${Q}` }, k));
    knoepfe.replaceChildren(...[['S', 'setzen', () => s, (v) => { s = v; }], ['R', 'zurücksetzen', () => r, (v) => { r = v; }]].map(([n, w, get, set]) => el('button', {
      type: 'button', class: `schalt-knopf${get() ? ' schalt-knopf-an' : ''}`, 'aria-pressed': String(!!get()), 'aria-label': `${n} (${w}): ${get() ? 'an' : 'aus'}`,
      onclick: () => { set(get() ? 0 : 1); zeichnen(); },
    }, [el('span', { class: 'schalt-name', text: `${n} · ${w}` }), el('span', { class: 'schalt-wert', text: String(get()) })])));
    info.replaceChildren(...[el('p', {}, ['Gespeichert: Q = ', el('strong', { text: String(Q) })]),
      s && r ? el('p', { class: 'sim-zusatz', text: 'S und R zugleich: Beide Ausgänge sind 0 – dieser Fall wird in echten Schaltungen vermieden.' }) : null].filter(Boolean));
    if (liste) liste.replaceChildren(...TEXTE.map((t, i) => el('li', { class: i < schritt ? 'schritt-ok' : i === schritt ? 'schritt-jetzt' : '', text: `${i < schritt ? '✓ ' : ''}${t}` })));
  };
  wurzel.append(...[uebung ? el('p', { class: 'sim-ziel', text: 'Ziel: Speichere eine 1 und lösche sie wieder – Schritt für Schritt.' }) : null, liste, knoepfe, bild, info].filter(Boolean));
  zeichnen();
  if (uebung) wurzel._loesen = () => { for (const [a, b] of [[1, 0], [0, 0], [0, 1], [0, 0]]) { s = a; r = b; zeichnen(); } };
}

/** Prüft die RAM-Übung: stimmen alle Ziel-Adressen? */
export const ramZielOk = (speicher, ziel) => Object.entries(ziel).every(([a, bits]) => speicher[Number(a)].join('') === bits);

function ramStarten({ wurzel, optionen, fertig, istFertig }) {
  const ziel = Object.fromEntries(String(optionen.ziel ?? '').split(';').map((x) => x.split('=').map((y) => y.trim())).filter((p) => p.length === 2 && /^[0-3]$/.test(p[0]) && /^[01]{4}$/.test(p[1])));
  const hatZiel = Object.keys(ziel).length > 0;
  const speicher = Array.from({ length: 4 }, () => [0, 0, 0, 0]);
  let adresse = [0, 0], daten = [0, 0, 0, 0], geschafft = istFertig, zuletzt = null;
  const zielZeile = hatZiel ? el('p', { class: 'sim-ziel' }) : null;
  const adrKnoepfe = el('div', { class: 'schalt-eingaenge' });
  const datKnoepfe = el('div', { class: 'schalt-eingaenge' });
  const tafel = el('div', { class: 'ram-tafel' });
  const info = el('div', { class: 'sim-info', 'aria-live': 'polite' });
  const nr = () => adresse[0] * 2 + adresse[1];
  const knopf = (name, bit, setzen) => el('button', { type: 'button', class: `schalt-knopf schalt-knopf-klein${bit ? ' schalt-knopf-an' : ''}`, 'aria-pressed': String(!!bit), 'aria-label': `${name}: ${bit}`, onclick: setzen }, [el('span', { class: 'schalt-name', text: name }), el('span', { class: 'schalt-wert', text: String(bit) })]);
  const zeichnen = () => {
    if (hatZiel && !geschafft && ramZielOk(speicher, ziel)) { geschafft = true; fertig(); }
    adrKnoepfe.replaceChildren(el('span', { class: 'gruppe-label', text: 'Adresse' }), ...adresse.map((b, i) => knopf(`A${1 - i}`, b, () => { adresse[i] = b ? 0 : 1; zeichnen(); })));
    datKnoepfe.replaceChildren(el('span', { class: 'gruppe-label', text: 'Daten' }), ...daten.map((b, i) => knopf(`D${3 - i}`, b, () => { daten[i] = b ? 0 : 1; zeichnen(); })));
    tafel.replaceChildren(el('table', { class: 'wahrheit ram' }, [
      el('thead', {}, [el('tr', {}, [el('th', { text: 'Adresse' }), el('th', { text: 'Inhalt (4 Flipflops)' })])]),
      el('tbody', {}, speicher.map((zeile, a) => el('tr', { class: `${a === nr() ? 'ram-gewaehlt' : ''}${a === zuletzt ? ' ram-neu' : ''}` }, [
        el('td', { text: `${a} (${a.toString(2).padStart(2, '0')})` }),
        el('td', { class: 'ram-bits', text: zeile.join(' ') + (hatZiel && ziel[a] ? (zeile.join('') === ziel[a] ? '  ✓' : `  (Ziel ${ziel[a]})`) : '') }),
      ]))),
    ]));
    info.replaceChildren(el('p', {}, [`Gewählt: Adresse ${nr()} · Lesen ergibt `, el('code', { class: 'bitmuster', text: speicher[nr()].join('') })]));
    if (zielZeile) zielZeile.textContent = geschafft ? '✓ Geschafft: Beide Inhalte stehen an ihren Adressen.' : `Ziel: Schreib ${Object.entries(ziel).map(([a, b]) => `${b} an Adresse ${a}`).join(' und ')}.`;
  };
  const schreiben = el('button', { type: 'button', class: 'knopf', text: 'Schreiben', onclick: () => { speicher[nr()] = daten.slice(); zuletzt = nr(); zeichnen(); } });
  wurzel.append(...[zielZeile, adrKnoepfe, datKnoepfe, el('div', { class: 'sim-steuerung' }, [schreiben]), tafel, info].filter(Boolean));
  zeichnen();
  if (hatZiel) wurzel._loesen = () => { for (const [a, b] of Object.entries(ziel)) { adresse = [Number(a) >> 1, Number(a) & 1]; daten = b.split('').map(Number); schreiben.click(); } };
}

export default function starte(p) {
  const q = { fertig: () => {}, istFertig: false, ...p };
  return q.optionen.art === 'ram' ? ramStarten(q) : srStarten(q);
}

export function pruefe(optionen) {
  if (optionen.art && !['sr', 'ram'].includes(optionen.art)) throw new Error('flipflop: art ist sr oder ram');
  if (optionen.ziel) for (const p of String(optionen.ziel).split(';')) if (!/^\s*[0-3]\s*=\s*[01]{4}\s*$/.test(p)) throw new Error(`flipflop: Ziel „${p.trim()}“ – erwartet z. B. 1=0101`);
}
