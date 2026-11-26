// KERN (übernehmbar, siehe docs/kern.md) – Glossar-Logik ohne DOM: Suche, Sortierung, Begriffe im Text erkennen.
// Herkunft: bim-trainer js/glossar.js, verallgemeinert: Ein Begriff ist { id, begriff, woerter?, markieren? }.
//   woerter    alle Schreibweisen, die im Text erkannt werden (Standard: Teile von „A / B“ aus „begriff“)
//   markieren  false = steht im Glossar, wird aber nicht automatisch im Text markiert
// Durchsucht werden „begriff“ und alle Textfelder aus FELDER.

/** Kleinbuchstaben ohne Akzente/Umlaut-Punkte, für Suche und Sortierung („Übergabe“ → „ubergabe“). */
export function normal(text) {
  return String(text).toLowerCase().replace(/ß/g, 'ss').normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
}

/** Begriffe A–Z (deutsche Sortierung, Groß-/Kleinschreibung egal). */
export function sortiert(begriffe) {
  return [...begriffe].sort((a, b) => a.begriff.localeCompare(b.begriff, 'de', { sensitivity: 'base' }));
}

/** Anfangsbuchstabe für die A–Z-Leiste (Ziffern → „#“). */
export function buchstabe(begriff) {
  const z = normal(begriff).charAt(0).toUpperCase();
  return /[A-Z]/.test(z) ? z : '#';
}

const FELDER = ['kurz', 'mehr', 'beschreibung', 'definition', 'funktion', 'systematik'];

/**
 * Suche über alle Spalten. Jedes Suchwort muss vorkommen. Treffer im Begriff selbst stehen vorn,
 * danach Treffer in der Beschreibung, danach im übrigen Text – innerhalb A–Z.
 */
export function suche(begriffe, anfrage) {
  const woerter = normal(anfrage).split(/\s+/).filter(Boolean);
  const liste = sortiert(begriffe);
  if (!woerter.length) return liste;
  const rang = (b) => {
    const kopf = normal(b.begriff);
    const alles = normal([b.begriff, ...(b.woerter || []), ...FELDER.map((f) => b[f] || '')].join(' '));
    if (!woerter.every((w) => alles.includes(w))) return null;
    if (woerter.every((w) => kopf.includes(w))) return 0;
    if (woerter.every((w) => normal(`${b.begriff} ${b.kurz || b.beschreibung || ''}`).includes(w))) return 1;
    return 2;
  };
  return liste.map((b) => ({ b, r: rang(b) })).filter((x) => x.r !== null).sort((x, y) => x.r - y.r).map((x) => x.b);
}

// ------------------------------------------------------------ Begriffe im Text erkennen
// Aus „RAM / Arbeitsspeicher“ werden die Suchwörter „RAM“ und „Arbeitsspeicher“. Erkannt wird nur das ganze Wort.
// Abkürzungen in Großbuchstaben (CPU, RAM) nur genau so geschrieben; andere Begriffe auch mit
// kleinem bzw. großem Anfangsbuchstaben („bit“ ↔ „Bit“). Längere Wörter gewinnen („Bitmuster“ vor „Bit“).

/** Schreibweisen eines Begriffs, die im Text markiert werden (mind. 2 Zeichen). */
export function suchwoerter(b) {
  if (b.markieren === false) return [];
  const teile = b.woerter?.length ? b.woerter : b.begriff.split(/\s+\/\s+/);
  return teile.map((t) => t.trim()).filter((t) => t.length >= 2);
}

const maske = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const BUCHSTABE = 'A-Za-zÄÖÜäöüß0-9';

/** Muster für alle Glossarbegriffe: { regex, idVon(treffer) }. */
export function glossarMuster(begriffe) {
  const zuId = new Map();
  for (const b of begriffe) for (const w of suchwoerter(b)) if (!zuId.has(w)) zuId.set(w, b.id);
  const alternativen = [...zuId.keys()].sort((a, b) => b.length - a.length).map((w) => {
    const rest = maske(w.slice(1));
    const erster = w[0];
    const istAbkuerzung = w === w.toUpperCase();
    const anfang = !istAbkuerzung && erster.toLowerCase() !== erster.toUpperCase()
      ? `[${erster.toLowerCase()}${erster.toUpperCase()}]` : maske(erster);
    // Mehrwortbegriffe auch mit Bindestrich („BIM BVB“ ↔ „BIM-BVB“)
    return (anfang + rest).replace(/\\? /g, '[ -]');
  });
  // ganzes Wort: davor/danach kein Buchstabe und keine Ziffer; ein Bindestrich danach ist erlaubt
  // („IFC-Modell“ → IFC, „ISO 19650-2“ → ISO 19650)
  const regex = alternativen.length
    ? new RegExp(`(?<![${BUCHSTABE}])(?:${alternativen.join('|')})(?![${BUCHSTABE}])`, 'g')
    : /(?!)/g; // leeres Glossar: nie ein Treffer
  const schluessel = (w) => w.toLowerCase().replace(/[ -]/g, ' ');
  const klein = new Map([...zuId].map(([w, id]) => [schluessel(w), id]));
  return { regex, idVon: (treffer) => zuId.get(treffer) ?? klein.get(schluessel(treffer)) ?? null };
}

/**
 * Zerlegt einen Text in Stücke: { text } oder { text, id } für einen Glossarbegriff.
 * „gesehen“ (Set von IDs) sorgt dafür, dass jeder Begriff je Abschnitt nur einmal markiert wird;
 * „ohne“ = ID, die nicht markiert wird (z. B. der Eintrag selbst).
 */
export function zerlege(text, muster, gesehen = new Set(), ohne = null) {
  const stuecke = [];
  let pos = 0;
  for (const m of text.matchAll(muster.regex)) {
    const id = muster.idVon(m[0]);
    if (!id || id === ohne || gesehen.has(id)) continue;
    gesehen.add(id);
    if (m.index > pos) stuecke.push({ text: text.slice(pos, m.index) });
    stuecke.push({ text: m[0], id });
    pos = m.index + m[0].length;
  }
  if (pos < text.length) stuecke.push({ text: text.slice(pos) });
  return stuecke;
}
