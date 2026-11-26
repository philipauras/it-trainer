// Simulator „schaltung“: Logikgatter aus Schaltern bauen und ausprobieren. Zeichnet die Schaltung selbst (Spalten nach Tiefe),
// Leitungen mit 1 leuchten. Drei Arten, ihn zu nutzen:
//   - frei ausprobieren (Schalter antippen)
//   - tabelle: ja           → Übung: Wahrheitstabelle ausfüllen
//   - Gatter „?“ + ziel     → Übung: das richtige Gatter wählen, bis die Schaltung die Ziel-Tabelle erfüllt
// Optionen (Inhalt, je eine Zeile):
//   eingaenge: A, B                     Namen der Schalter (1–4)
//   gatter: X=UND(A,B); Y=NICHT(X)       Gatter in Reihenfolge; Typen UND, ODER, NICHT, XODER, NUND, NODER oder ? (wählbar)
//   ausgaenge: Y                        Lampen (Standard: das letzte Gatter); Anzeige-Namen mit „namen: S=Summe; C=Übertrag“
//   auswahl: UND, ODER, XODER           Typen, die ein ?-Gatter annehmen kann (Standard: UND, ODER, XODER, NICHT nur bei 1 Eingang)
//   ziel: Y=0110                        Soll-Ausgabe je Tabellenzeile (Zeilen wie beim Binärzählen 00, 01, 10, 11)
//   start: A=1                          Startwerte der Schalter
//   zahl: ja                            Ausgänge zusätzlich als Binärzahl lesen (erster Ausgang = vordere Stelle)
import { el, svg } from '../kern/dom.js';
import { kombinationen, tabelleAusfuellen } from './tabelle.js';

export const TYPEN = {
  UND: (w) => w.every(Boolean),
  ODER: (w) => w.some(Boolean),
  NICHT: (w) => !w[0],
  XODER: (w) => w.filter(Boolean).length % 2 === 1,
  NUND: (w) => !w.every(Boolean),
  NODER: (w) => !w.some(Boolean),
};
const liste = (t) => String(t ?? '').split(/[,;]/).map((x) => x.trim()).filter(Boolean);
const paare = (t) => Object.fromEntries(String(t ?? '').split(';').map((x) => x.split('=').map((y) => y.trim())).filter((p) => p.length === 2 && p[0]));

/** Liest die Optionen zu einem Netz. Wirft bei Fehlern (der Build prüft das mit). */
export function lesen(optionen) {
  const eingaenge = liste(optionen.eingaenge);
  if (!eingaenge.length || eingaenge.length > 4) throw new Error('schaltung: 1–4 Eingänge nötig');
  const gatter = String(optionen.gatter || '').split(';').map((x) => x.trim()).filter(Boolean).map((g) => {
    const m = /^([A-Za-zÄÖÜäöü0-9]+)\s*=\s*(UND|ODER|NICHT|XODER|NUND|NODER|\?)\s*\(([^)]*)\)$/.exec(g);
    if (!m) throw new Error(`schaltung: Gatter „${g}“ nicht lesbar (Beispiel: X=UND(A,B))`);
    return { name: m[1], typ: m[2], ein: liste(m[3]) };
  });
  const bekannt = new Set(eingaenge);
  for (const g of gatter) {
    for (const e of g.ein) if (!bekannt.has(e)) throw new Error(`schaltung: „${e}“ ist vor Gatter ${g.name} nicht definiert`);
    if (g.typ === 'NICHT' && g.ein.length !== 1) throw new Error(`schaltung: NICHT (${g.name}) hat genau einen Eingang`);
    if (g.typ !== 'NICHT' && g.ein.length < 2 && g.typ !== '?') throw new Error(`schaltung: ${g.name} braucht zwei Eingänge`);
    bekannt.add(g.name);
  }
  const ausgaenge = optionen.ausgaenge ? liste(optionen.ausgaenge) : gatter.length ? [gatter.at(-1).name] : [];
  for (const a of ausgaenge) if (!bekannt.has(a)) throw new Error(`schaltung: Ausgang „${a}“ unbekannt`);
  const auswahl = optionen.auswahl ? liste(optionen.auswahl) : ['UND', 'ODER', 'XODER'];
  for (const t of auswahl) if (!TYPEN[t]) throw new Error(`schaltung: Auswahl-Typ „${t}“ unbekannt`);
  const ziel = paare(optionen.ziel);
  for (const [a, bits] of Object.entries(ziel)) {
    if (!ausgaenge.includes(a)) throw new Error(`schaltung: Ziel für unbekannten Ausgang „${a}“`);
    if (!new RegExp(`^[01]{${2 ** eingaenge.length}}$`).test(bits)) throw new Error(`schaltung: Ziel ${a} braucht ${2 ** eingaenge.length} Ziffern 0/1`);
  }
  return { eingaenge, gatter, ausgaenge, auswahl, ziel, namen: paare(optionen.namen) };
}

/** Wertet das Netz aus. werte: { A: 0/1 }, typen: { G: 'UND' } für ?-Gatter (fehlt → Ausgang 0). Rückgabe: alle Signale. */
export function auswerten(netz, werte, typen = {}) {
  const s = {};
  for (const e of netz.eingaenge) s[e] = werte[e] ? 1 : 0;
  for (const g of netz.gatter) {
    const typ = g.typ === '?' ? typen[g.name] : g.typ;
    s[g.name] = typ && TYPEN[typ] ? (TYPEN[typ](g.ein.map((e) => s[e])) ? 1 : 0) : 0;
  }
  return s;
}
/** Ausgabe-Tabelle je Ausgang als Zeichenkette, z. B. { Y: '0001' }. */
export function tabelle(netz, typen = {}) {
  const t = Object.fromEntries(netz.ausgaenge.map((a) => [a, '']));
  for (const z of kombinationen(netz.eingaenge.length)) {
    const s = auswerten(netz, Object.fromEntries(netz.eingaenge.map((e, i) => [e, z[i]])), typen);
    for (const a of netz.ausgaenge) t[a] += s[a];
  }
  return t;
}
export const zielErfuellt = (netz, typen) => {
  const t = tabelle(netz, typen);
  return Object.entries(netz.ziel).every(([a, bits]) => t[a] === bits);
};
/** Findet eine Belegung der ?-Gatter, die das Ziel erfüllt (für Tests und die automatische Prüfung). */
export function loesung(netz) {
  const offen = netz.gatter.filter((g) => g.typ === '?');
  const moegl = (g) => (g.ein.length === 1 ? ['NICHT'] : netz.auswahl.filter((t) => t !== 'NICHT'));
  const suche = (i, typen) => {
    if (i === offen.length) return zielErfuellt(netz, typen) ? typen : null;
    for (const t of moegl(offen[i])) { const r = suche(i + 1, { ...typen, [offen[i].name]: t }); if (r) return r; }
    return null;
  };
  return suche(0, {});
}

// ---------------------------------------------------------------- Zeichnen
const SPALTE = 124, ZEILE = 74, KASTEN_B = 74;
function anordnen(netz) {
  const tiefe = {}, pos = {};
  netz.eingaenge.forEach((e) => { tiefe[e] = 0; });
  for (const g of netz.gatter) tiefe[g.name] = 1 + Math.max(...g.ein.map((e) => tiefe[e]));
  const maxT = Math.max(0, ...netz.gatter.map((g) => tiefe[g.name]));
  netz.eingaenge.forEach((e, i) => { pos[e] = { x: 30, y: 40 + i * ZEILE }; });
  for (let t = 1; t <= maxT; t++) {
    const spalte = netz.gatter.filter((g) => tiefe[g.name] === t)
      .map((g) => ({ g, wunsch: g.ein.reduce((s, e) => s + pos[e].y, 0) / g.ein.length }))
      .sort((a, b) => a.wunsch - b.wunsch);
    let frei = 40;
    for (const { g, wunsch } of spalte) { const y = Math.max(wunsch, frei); pos[g.name] = { x: 30 + t * SPALTE, y }; frei = y + ZEILE; }
  }
  const ausX = 30 + (maxT + 1) * SPALTE - 20;
  const ausY = {};
  let frei = 40;
  for (const a of [...netz.ausgaenge].sort((x, y) => pos[x].y - pos[y].y)) { ausY[a] = Math.max(pos[a].y, frei); frei = ausY[a] + ZEILE; }
  const hoehe = Math.max(...Object.values(pos).map((p) => p.y)) + 50;
  return { tiefe, pos, ausX, ausY, breite: ausX + 60, hoehe: Math.max(hoehe, frei - ZEILE + 50) };
}
const kastenH = (n) => Math.max(44, 22 * n + 10);

export default function starte({ wurzel, optionen, fertig = () => {}, istFertig = false }) {
  const netz = lesen(optionen);
  const lage = anordnen(netz);
  const start = paare(optionen.start);
  const werte = Object.fromEntries(netz.eingaenge.map((e) => [e, start[e] === '1' ? 1 : 0]));
  const offen = netz.gatter.filter((g) => g.typ === '?');
  const typen = {};
  const hatZiel = Object.keys(netz.ziel).length > 0;
  let geschafft = istFertig;
  if (istFertig && hatZiel) Object.assign(typen, loesung(netz) || {});
  const name = (n) => netz.namen[n] || n;

  const bild = el('div', { class: 'schaltbild' });
  const schalter = el('div', { class: 'schalt-eingaenge' });
  const wahl = offen.length ? el('div', { class: 'schalt-wahl' }) : null;
  const info = el('div', { class: 'sim-info', 'aria-live': 'polite' });
  const zielBox = hatZiel ? el('div', { class: 'ziel-tabelle' }) : null;

  const zeichnen = () => {
    const s = auswerten(netz, werte, typen);
    const { pos, ausX, ausY, breite, hoehe } = lage;
    const kinder = [];
    // Leitungen zuerst (liegen unter den Bauteilen). Jede Quelle bekommt im Zwischenraum vor der Zielspalte eine eigene
    // senkrechte Spur; Leitungen derselben Quelle teilen sich die Spur (Abzweig mit Punkt).
    const rechts = (n) => pos[n].x + (netz.eingaenge.includes(n) ? 16 : KASTEN_B / 2);
    const ziele = []; // { quelle, tx, ty, spalteX }
    for (const g of netz.gatter) {
      const p = pos[g.name], h = kastenH(g.ein.length);
      g.ein.forEach((e, i) => ziele.push({ quelle: e, tx: p.x - KASTEN_B / 2, ty: p.y - h / 2 + ((i + 1) * h) / (g.ein.length + 1), spalteX: p.x }));
    }
    netz.ausgaenge.forEach((a) => ziele.push({ quelle: a, tx: ausX - 14, ty: ausY[a], spalteX: ausX + KASTEN_B / 2 - 14 }));
    const spuren = {};
    for (const z of ziele) { const l = (spuren[z.spalteX] ||= []); if (!l.includes(z.quelle)) l.push(z.quelle); }
    for (const l of Object.values(spuren)) l.sort((a, b) => pos[a].y - pos[b].y);
    const spurX = (z) => {
      const l = spuren[z.spalteX], k = l.indexOf(z.quelle);
      const von = Math.max(z.spalteX - SPALTE + KASTEN_B / 2 + 4, rechts(z.quelle) + 4), bis = z.tx - 6;
      return Math.round(von + ((k + 1) * (bis - von)) / (l.length + 1));
    };
    const zaehler = {};
    for (const z of ziele) { const key = `${z.spalteX}|${z.quelle}`; zaehler[key] = (zaehler[key] || 0) + 1; }
    for (const z of ziele) {
      const sx = rechts(z.quelle), sy = pos[z.quelle].y, mx = spurX(z), an = s[z.quelle];
      kinder.push(svg('path', { d: `M${sx} ${sy} H${mx} V${z.ty} H${z.tx}`, class: `leitung${an ? ' leitung-an' : ''}` }));
      if (zaehler[`${z.spalteX}|${z.quelle}`] > 1) kinder.push(svg('circle', { cx: mx, cy: z.ty === sy ? sy : z.ty, r: 3.5, class: `abzweig${an ? ' abzweig-an' : ''}` }));
    }
    for (const e of netz.eingaenge) {
      const p = pos[e];
      kinder.push(svg('g', { class: `knoten${s[e] ? ' knoten-an' : ''}` }, [
        svg('circle', { cx: p.x, cy: p.y, r: 16 }),
        svg('text', { x: p.x, y: p.y + 6, 'text-anchor': 'middle', class: 'knoten-text', text: e }),
      ]));
    }
    for (const g of netz.gatter) {
      const p = pos[g.name], h = kastenH(g.ein.length);
      const typ = g.typ === '?' ? typen[g.name] || '?' : g.typ;
      kinder.push(svg('g', { class: `gatter${g.typ === '?' ? ' gatter-wahl' : ''}${s[g.name] ? ' gatter-an' : ''}` }, [
        svg('rect', { x: p.x - KASTEN_B / 2, y: p.y - h / 2, width: KASTEN_B, height: h, rx: 9 }),
        svg('text', { x: p.x, y: p.y + 6, 'text-anchor': 'middle', class: 'gatter-text', text: typ }),
        g.typ === '?' && offen.length > 1 ? svg('text', { x: p.x - KASTEN_B / 2 + 2, y: p.y - h / 2 - 6, class: 'gatter-name', text: g.name }) : null,
      ]));
    }
    netz.ausgaenge.forEach((a) => {
      const y = ausY[a];
      kinder.push(svg('g', { class: `ausgang${s[a] ? ' ausgang-an' : ''}` }, [
        s[a] ? svg('circle', { cx: ausX, cy: y, r: 22, class: 'ausgang-schein' }) : null,
        svg('circle', { cx: ausX, cy: y, r: 14 }),
        svg('text', { x: ausX, y: y + 34, 'text-anchor': 'middle', class: 'ausgang-text', text: name(a) }),
      ]));
    });
    bild.replaceChildren(svg('svg', { viewBox: `0 0 ${breite} ${hoehe}`, class: 'schalt-svg', role: 'img', 'aria-label': `Schaltung: ${netz.gatter.map((g) => `${g.name} = ${g.typ === '?' ? typen[g.name] || 'unbekanntes Gatter' : g.typ} von ${g.ein.join(' und ')}`).join('; ')}` }, kinder));

    schalter.replaceChildren(...netz.eingaenge.map((e) => el('button', {
      type: 'button', class: `schalt-knopf${werte[e] ? ' schalt-knopf-an' : ''}`, 'aria-pressed': String(!!werte[e]),
      'aria-label': `Schalter ${name(e)}: ${werte[e] ? 'an (1)' : 'aus (0)'}`, onclick: () => { werte[e] = werte[e] ? 0 : 1; zeichnen(); },
    }, [el('span', { class: 'schalt-name', text: name(e) }), el('span', { class: 'schalt-wert', text: String(werte[e]) })])));

    if (wahl) wahl.replaceChildren(...offen.map((g) => el('button', {
      type: 'button', class: 'knopf knopf-zweit schalt-wahl-knopf', 'aria-label': `Gatter ${g.name}: ${typen[g.name] || 'noch keins'} – tippen zum Wechseln`,
      onclick: () => {
        const moegl = g.ein.length === 1 ? ['NICHT'] : netz.auswahl.filter((t) => t !== 'NICHT');
        typen[g.name] = moegl[(moegl.indexOf(typen[g.name]) + 1) % moegl.length];
        zeichnen();
      },
    }, [`${offen.length > 1 ? `${g.name}: ` : ''}${typen[g.name] || '?'}`, el('span', { class: 'wahl-hinweis', text: ' wechseln' })])));

    info.replaceChildren(...[
      el('p', {}, netz.ausgaenge.flatMap((a, i) => [i ? ' · ' : '', `${name(a)} = `, el('strong', { text: String(s[a]) }), s[a] ? '\u00a0(an)' : '\u00a0(aus)'])),
      optionen.zahl ? el('p', { class: 'sim-zusatz' }, ['Als Binärzahl: ', el('code', { text: netz.ausgaenge.map((a) => s[a]).join('') }), ` = ${parseInt(netz.ausgaenge.map((a) => s[a]).join(''), 2)}`]) : null,
    ].filter(Boolean));

    if (zielBox) {
      const ist = tabelle(netz, typen);
      const zeilen = kombinationen(netz.eingaenge.length);
      const zielA = Object.keys(netz.ziel);
      const ok = zielErfuellt(netz, typen) && offen.every((g) => typen[g.name]);
      if (ok && !geschafft) { geschafft = true; fertig(); }
      zielBox.replaceChildren(
        el('p', { class: 'sim-ziel', text: ok ? '✓ Geschafft: Die Schaltung macht genau, was sie soll.' : `Ziel: Wähle ${offen.length > 1 ? 'die Gatter' : 'das Gatter'} so, dass jede Zeile stimmt.` }),
        el('div', { class: 'tabelle-rahmen' }, [el('table', { class: 'wahrheit' }, [
          el('thead', {}, [el('tr', {}, [...netz.eingaenge.map((e) => el('th', { text: name(e) })), ...zielA.flatMap((a) => [el('th', { class: 'th-aus', text: `${name(a)} soll` }), el('th', { class: 'th-aus', text: 'ist' })])])]),
          el('tbody', {}, zeilen.map((z, r) => el('tr', {}, [
            ...z.map((v) => el('td', { text: String(v) })),
            ...zielA.flatMap((a) => {
              const passt = ist[a][r] === netz.ziel[a][r];
              return [el('td', { class: 'td-soll', text: netz.ziel[a][r] }), el('td', { class: passt ? 'td-ok' : 'td-nein', text: `${ist[a][r]} ${passt ? '✓' : '✗'}`, 'aria-label': `${ist[a][r]}, ${passt ? 'stimmt' : 'stimmt nicht'}` })];
            }),
          ]))),
        ])]),
      );
    }
  };

  let tab = null;
  if (optionen.tabelle) {
    tab = tabelleAusfuellen({
      eingaenge: netz.eingaenge.map(name), ausgaenge: netz.ausgaenge.map(name), istFertig, fertig,
      richtig: (z) => { const s = auswerten(netz, Object.fromEntries(netz.eingaenge.map((e, i) => [e, z[i]])), typen); return netz.ausgaenge.map((a) => s[a]); },
      waehle: (z) => { netz.eingaenge.forEach((e, i) => { werte[e] = z[i]; }); zeichnen(); bild.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' }); },
    });
  }
  wurzel.append(...[schalter, bild, wahl, info, zielBox, tab?.element].filter(Boolean));
  zeichnen();
  if (tab) wurzel._loesen = tab.loesen;
  else if (hatZiel) wurzel._loesen = () => { Object.assign(typen, loesung(netz)); zeichnen(); };
}

/** Für den Build: Optionen prüfen (wirft mit verständlicher Meldung). */
export function pruefe(optionen) {
  const netz = lesen(optionen);
  const offen = netz.gatter.some((g) => g.typ === '?');
  if (offen && !Object.keys(netz.ziel).length) throw new Error('schaltung: Gatter „?“ braucht ein „ziel:“');
  if (offen && !loesung(netz)) throw new Error('schaltung: Ziel ist mit der Auswahl nicht erreichbar');
  if (!offen && Object.keys(netz.ziel).length) throw new Error('schaltung: „ziel:“ nur zusammen mit einem Gatter „?“');
}
