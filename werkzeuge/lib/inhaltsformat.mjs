// KERN (übernehmbar, siehe docs/kern.md) – liest die Inhaltsdateien (content/*.md) und prüft sie.
// Das Format ist in content/README.md für Autorinnen und Autoren ohne Codekenntnis beschrieben.
// Wird nur beim Bauen und in den Tests benutzt (Node), nicht im Browser.

export const ID_MUSTER = {
  folge: /^s[a-z0-9]+(f\d{2}|g)$/,
  frage: /^s[a-z0-9]+(f\d{2}|g)-q\d{2}$/,
  karte: /^s[a-z0-9]+(f\d{2}|g)-k\d{2}$/,
  uebung: /^s[a-z0-9]+(f\d{2}|g)-u\d{2}$/,
  glossar: /^[a-z0-9]+(-[a-z0-9]+)*$/,
};

/** Kopfbereich zwischen „---“-Zeilen: „schluessel: wert“ und Listen („- eintrag“ unter „schluessel:“). */
export function leseKopf(text) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(text.replace(/\r\n?/g, '\n'));
  if (!m) return { kopf: {}, rumpf: text.replace(/\r\n?/g, '\n'), fehler: ['Kopfbereich („---“ … „---“) fehlt'] };
  const kopf = {}, fehler = [];
  let liste = null;
  for (const zeile of m[1].split('\n')) {
    if (!zeile.trim() || zeile.trim().startsWith('#')) continue;
    const li = /^\s*-\s+(.*)$/.exec(zeile);
    if (li) { if (liste) kopf[liste].push(li[1].trim()); else fehler.push(`Listeneintrag ohne Schlüssel: „${zeile.trim()}“`); continue; }
    const kv = /^([a-zäöü]+):\s*(.*)$/i.exec(zeile);
    if (!kv) { fehler.push(`Zeile nicht verstanden: „${zeile.trim()}“`); continue; }
    if (kv[2] === '') { kopf[kv[1]] = []; liste = kv[1]; } else { kopf[kv[1]] = kv[2].trim(); liste = null; }
  }
  return { kopf, rumpf: text.replace(/\r\n?/g, '\n').slice(m[0].length), fehler };
}

/** „Text | https://…“ → { text, url } */
const quelle = (q) => { const [text, url] = q.split(/\s+\|\s+/); return url ? { text: text.trim(), url: url.trim() } : { text: q.trim() }; };

/** Zerlegt einen Abschnitt in Markdown-Teile und Simulator-Blöcke („:::sim name“ … „:::“). */
export function zerlegeTeile(text, fehler, wo) {
  const teile = [];
  const zeilen = text.split('\n');
  let md = [];
  const mdAbschliessen = () => { const t = md.join('\n').trim(); if (t) teile.push({ art: 'md', text: t }); md = []; };
  for (let i = 0; i < zeilen.length; i++) {
    const start = /^:::sim\s+([a-z0-9-]+)\s*$/.exec(zeilen[i]);
    if (!start) { if (/^:::/.test(zeilen[i])) fehler.push(`${wo}: „${zeilen[i]}“ – erwartet „:::sim name“`); else md.push(zeilen[i]); continue; }
    mdAbschliessen();
    const optionen = {};
    let id = null;
    i++;
    for (; i < zeilen.length && zeilen[i].trim() !== ':::'; i++) {
      const kv = /^\s*([a-zA-Z]+):\s*(.*)$/.exec(zeilen[i]);
      if (!kv) { if (zeilen[i].trim()) fehler.push(`${wo}: Zeile im Simulator „${start[1]}“ nicht verstanden: „${zeilen[i].trim()}“`); continue; }
      const roh = kv[2].trim();
      const wert = /^-?\d+(\.\d+)?$/.test(roh) ? Number(roh) : roh === 'ja' ? true : roh === 'nein' ? false : roh;
      if (kv[1] === 'id') id = roh; else optionen[kv[1]] = wert;
    }
    if (i >= zeilen.length) fehler.push(`${wo}: Simulator „${start[1]}“ ohne abschließendes „:::“`);
    teile.push({ art: 'sim', name: start[1], ...(id ? { id } : {}), optionen });
  }
  mdAbschliessen();
  return teile;
}

/** „### <id>“-Blöcke eines Abschnitts (Quiz, Karten). Text davor ist eine Einleitung. */
function bloecke(text) {
  const teile = text.split(/^###\s+/m);
  return { einleitung: teile.shift().trim(), bloecke: teile.map((b) => { const [kopf, ...rest] = b.split('\n'); return { id: kopf.trim(), zeilen: rest }; }) };
}

function leseFrage({ id, zeilen }, fehler) {
  const f = { id, frage: '', antworten: [], richtig: -1, erklaerung: '', nachlesen: null };
  const frage = [];
  let feld = null;
  for (const z of zeilen) {
    const a = /^\s*-\s+\[( |x|X)\]\s+(.*)$/.exec(z);
    const kv = /^(Erklärung|Nachlesen|Mischen):\s*(.*)$/.exec(z);
    if (a) { if (a[1] !== ' ') { if (f.richtig >= 0) fehler.push(`${id}: mehr als eine richtige Antwort`); f.richtig = f.antworten.length; } f.antworten.push(a[2].trim()); feld = null; }
    else if (kv) { feld = kv[1]; if (feld === 'Erklärung') f.erklaerung = kv[2].trim(); else if (feld === 'Nachlesen') f.nachlesen = kv[2].trim() || null; else f.mischen = kv[2].trim() !== 'nein'; }
    else if (feld === 'Erklärung' && z.trim()) f.erklaerung += ` ${z.trim()}`;
    else if (!f.antworten.length && z.trim()) frage.push(z.trim());
    else if (z.trim()) fehler.push(`${id}: Zeile nicht verstanden: „${z.trim()}“`);
  }
  f.frage = frage.join(' ');
  if (f.mischen === undefined) delete f.mischen;
  return f;
}

function leseKarte({ id, zeilen }, fehler) {
  const k = { id, vorne: '', hinten: '' };
  let feld = null;
  for (const z of zeilen) {
    const kv = /^(Vorne|Hinten):\s*(.*)$/.exec(z);
    if (kv) { feld = kv[1] === 'Vorne' ? 'vorne' : 'hinten'; k[feld] = kv[2].trim(); }
    else if (feld && z.trim()) k[feld] += ` ${z.trim()}`;
    else if (z.trim()) fehler.push(`${id}: Zeile nicht verstanden: „${z.trim()}“`);
  }
  return k;
}

/**
 * Liest eine Folgen-Datei. Gibt { folge, fehler } zurück; folge enthält Kopf, Abschnitte, Quiz, Karten.
 * planEintrag: der Eintrag aus config.json (Titel, Schicht …), staffel: die Staffel aus config.json.
 */
export function leseFolge(text, { datei = '?', config }) {
  const fehler = [];
  const { kopf, rumpf, fehler: kf } = leseKopf(text);
  fehler.push(...kf.map((f) => `${datei}: ${f}`));
  const id = kopf.id;
  const wo = id || datei;
  const plan = config.staffeln.flatMap((s) => s.folgen.map((f, i) => ({ ...f, staffel: s, nr: i + 1 }))).find((f) => f.id === id);
  if (!id) fehler.push(`${datei}: „id“ fehlt im Kopf`);
  else if (!plan) fehler.push(`${datei}: id „${id}“ steht nicht im Plan (config.json → staffeln → folgen)`);
  const status = kopf.status;
  if (!config.regeln.status.includes(status)) fehler.push(`${wo}: status muss ${config.regeln.status.join(' / ')} sein, ist „${status}“`);
  const dauer = Number(kopf.dauer);
  if (!Number.isInteger(dauer) || dauer < 1) fehler.push(`${wo}: „dauer“ (Minuten) fehlt`);
  const quellen = Array.isArray(kopf.quellen) ? kopf.quellen.map(quelle) : [];
  if (!quellen.length) fehler.push(`${wo}: mindestens eine Quelle nötig („quellen:“ mit „- …“)`);
  if (status === 'freigegeben' && !kopf.faktencheck) fehler.push(`${wo}: freigegeben ohne Eintrag „faktencheck:“`);

  // Abschnitte: „## [schluessel] Titel“
  const erwartet = config.abschnitte.map((a) => a.id);
  const roh = rumpf.split(/^##\s+/m);
  if (roh.shift().trim()) fehler.push(`${wo}: Text vor dem ersten Abschnitt („## [einstieg] …“)`);
  const abschnitte = [];
  let quiz = [], karten = [];
  for (const r of roh) {
    const [kopfzeile, ...rest] = r.split('\n');
    const m = /^\[([a-z]+)\]\s*(.*)$/.exec(kopfzeile.trim());
    if (!m) { fehler.push(`${wo}: Abschnitt „## ${kopfzeile}“ – erwartet „## [schluessel] Titel“`); continue; }
    const [, schluessel, titel] = m;
    const inhalt = rest.join('\n');
    const vorlage = config.abschnitte.find((a) => a.id === schluessel);
    const a = { id: schluessel, titel: titel.trim() || vorlage?.titel || schluessel };
    if (schluessel === 'quiz') {
      const b = bloecke(inhalt);
      quiz = b.bloecke.map((x) => leseFrage(x, fehler));
      a.teile = b.einleitung ? zerlegeTeile(b.einleitung, fehler, `${wo}/quiz`) : [];
    } else if (schluessel === 'karten') {
      const b = bloecke(inhalt);
      karten = b.bloecke.map((x) => leseKarte(x, fehler));
      a.teile = b.einleitung ? zerlegeTeile(b.einleitung, fehler, `${wo}/karten`) : [];
    } else {
      a.teile = zerlegeTeile(inhalt, fehler, `${wo}/${schluessel}`);
      if (!a.teile.length) fehler.push(`${wo}/${schluessel}: Abschnitt ist leer`);
    }
    abschnitte.push(a);
  }
  const ist = abschnitte.map((a) => a.id);
  if (ist.join() !== erwartet.join()) fehler.push(`${wo}: Abschnitte müssen genau ${erwartet.map((e) => `[${e}]`).join(' ')} in dieser Reihenfolge sein, sind ${ist.map((e) => `[${e}]`).join(' ')}`);

  const folge = {
    id, status, dauer, quellen,
    ...(kopf.faktencheck ? { faktencheck: kopf.faktencheck } : {}),
    staffel: plan?.staffel.nr, nr: plan?.nr, titel: plan?.titel, untertitel: plan?.untertitel || '', schicht: plan?.schicht,
    stufe: plan?.staffel.stufe, art: plan?.art || 'folge',
    abschnitte, quiz, karten,
  };
  return { folge, fehler };
}

/** Glossar: „## Begriff“ und darunter „schluessel: wert“ (id, woerter, kurz, mehr, folge, markieren). */
export function leseGlossar(text) {
  const fehler = [];
  const begriffe = [];
  const teile = text.replace(/\r\n?/g, '\n').split(/^##\s+/m);
  teile.shift();
  for (const t of teile) {
    const [kopf, ...zeilen] = t.split('\n');
    const b = { begriff: kopf.trim() };
    let feld = null;
    for (const z of zeilen) {
      const kv = /^(id|woerter|kurz|mehr|folge|markieren):\s*(.*)$/.exec(z);
      if (kv) { feld = kv[1]; b[feld] = kv[2].trim(); }
      else if (feld && z.trim()) b[feld] += ` ${z.trim()}`;
      else if (z.trim()) fehler.push(`Glossar „${b.begriff}“: Zeile nicht verstanden: „${z.trim()}“`);
    }
    if (b.woerter) b.woerter = b.woerter.split(',').map((w) => w.trim()).filter(Boolean);
    if (b.markieren !== undefined) b.markieren = b.markieren !== 'nein';
    if (!b.id || !ID_MUSTER.glossar.test(b.id)) fehler.push(`Glossar „${b.begriff}“: id fehlt oder ungültig (nur a–z, 0–9, Bindestrich)`);
    if (!b.kurz) fehler.push(`Glossar „${b.begriff}“: „kurz“ fehlt`);
    begriffe.push(b);
  }
  const ids = new Set();
  for (const b of begriffe) { if (ids.has(b.id)) fehler.push(`Glossar: id „${b.id}“ doppelt`); ids.add(b.id); }
  return { begriffe, fehler };
}

/** Neuigkeiten: „## 1.0.0 – 26.11.2026“ und darunter eine Liste. */
export function leseNeuigkeiten(text) {
  const fehler = [];
  const eintraege = text.replace(/\r\n?/g, '\n').split(/^##\s+/m).slice(1).map((t) => {
    const [kopf, ...zeilen] = t.split('\n');
    const m = /^(\d+\.\d+\.\d+)\s+[–-]\s+(\d{2}\.\d{2}\.\d{4})\s*$/.exec(kopf.trim());
    if (!m) fehler.push(`Neuigkeiten: Überschrift „## ${kopf}“ – erwartet „## 1.2.3 – TT.MM.JJJJ“`);
    const punkte = zeilen.map((z) => /^\s*-\s+(.*)$/.exec(z)?.[1]).filter(Boolean);
    if (!punkte.length) fehler.push(`Neuigkeiten ${kopf}: keine Punkte („- …“)`);
    return { version: m?.[1], datum: m?.[2], punkte };
  });
  return { eintraege, fehler };
}
