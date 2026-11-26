// KERN (übernehmbar, siehe docs/kern.md) – Lernfortschritt: Speicherformat, Laden/Speichern, Export/Import.
//
// ACHTUNG: Das Speicherformat ist der Lernfortschritt des Nutzers. Änderungen nur mit Migration in
// `normalisiere` (alte Stände müssen weiter lesbar sein) und nach Rückfrage (siehe CLAUDE.md).
//
// Format 1:
// {
//   format: 1, app: '<app-id>',
//   einstellungen: { thema: 'auto' | 'hell' | 'dunkel' },
//   folgen:   { <folgenId>: { schritt: '<abschnitt>', besucht: ['<abschnitt>', …], fertig: <ms> | null, ts } },
//   quiz:     { <frageId>:  { gesehen, richtig, falsch, zuletzt: bool, ts } },
//   karten:   { <kartenId>: { fach: 1…n, faellig: 'JJJJ-MM-TT', gesehen, gewusst, ts } },
//   uebungen: { <uebungId>: { fertig: <ms>, ts } },
//   neuGesehen: '<Version, deren „Was ist neu“ schon gezeigt wurde>',
//   geaendert: <ms>
// }
// Alle Einträge hängen an stabilen IDs aus den Inhalten (tests/fixtures/ids.json verhindert Änderungen).
// „ts“ = Zeitpunkt der letzten Änderung des Eintrags; beim Zusammenführen zweier Geräte gewinnt der neuere.

export const FORMAT = 1;
const BEREICHE = ['folgen', 'quiz', 'karten', 'uebungen'];
const TAG = /^\d{4}-\d{2}-\d{2}$/;
const istObjekt = (x) => x && typeof x === 'object' && !Array.isArray(x);
const zahl = (x, standard = 0) => (Number.isFinite(x) && x >= 0 ? x : standard);

export function leer(app) {
  return { format: FORMAT, app, einstellungen: { thema: 'auto' }, folgen: {}, quiz: {}, karten: {}, uebungen: {}, neuGesehen: null, geaendert: 0 };
}

const PRUEFER = {
  folgen: (e) => ({
    schritt: typeof e.schritt === 'string' ? e.schritt : null,
    besucht: Array.isArray(e.besucht) ? [...new Set(e.besucht.filter((x) => typeof x === 'string'))] : [],
    fertig: Number.isFinite(e.fertig) ? e.fertig : null,
    ts: zahl(e.ts),
  }),
  quiz: (e) => ({ gesehen: zahl(e.gesehen), richtig: zahl(e.richtig), falsch: zahl(e.falsch), zuletzt: e.zuletzt === true, ts: zahl(e.ts) }),
  karten: (e) => {
    if (!Number.isInteger(e.fach) || e.fach < 1 || !TAG.test(e.faellig)) return null;
    return { fach: e.fach, faellig: e.faellig, gesehen: zahl(e.gesehen), gewusst: zahl(e.gewusst), ts: zahl(e.ts) };
  },
  uebungen: (e) => (Number.isFinite(e.fertig) ? { fertig: e.fertig, ts: zahl(e.ts) } : null),
};

/**
 * Prüft einen gelesenen Stand und bringt ihn auf das aktuelle Format. Wirft einen Fehler mit verständlicher
 * Meldung, wenn er nicht passt (andere App, neueres Format, kein Fortschritt). Einzelne kaputte Einträge
 * werden verworfen, der Rest bleibt.
 */
export function normalisiere(roh, app) {
  if (!istObjekt(roh)) throw new Error('Das ist kein gespeicherter Fortschritt.');
  if (roh.app && roh.app !== app) throw new Error(`Dieser Fortschritt gehört zu einer anderen App („${roh.app}“).`);
  if (!Number.isInteger(roh.format) || roh.format < 1) throw new Error('Unbekanntes Speicherformat.');
  if (roh.format > FORMAT) throw new Error('Dieser Fortschritt stammt aus einer neueren Version der App – bitte erst die App aktualisieren.');
  // (Migrationen von älteren Formaten kämen hier hin: if (roh.format === 1) { … roh.format = 2 })
  const z = leer(app);
  if (istObjekt(roh.einstellungen) && ['auto', 'hell', 'dunkel'].includes(roh.einstellungen.thema)) z.einstellungen.thema = roh.einstellungen.thema;
  for (const b of BEREICHE) {
    if (!istObjekt(roh[b])) continue;
    for (const [id, e] of Object.entries(roh[b])) {
      if (!/^[a-z0-9][a-z0-9:-]*$/.test(id) || !istObjekt(e)) continue;
      const sauber = PRUEFER[b](e);
      if (sauber) z[b][id] = sauber;
    }
  }
  z.neuGesehen = typeof roh.neuGesehen === 'string' ? roh.neuGesehen : null;
  z.geaendert = zahl(roh.geaendert);
  return z;
}

const neuere = (a, b) => (!a ? b : !b ? a : (b.ts || 0) > (a.ts || 0) ? b : a);
const versionGroesser = (a, b) => {
  const x = String(a).split('.').map(Number), y = String(b).split('.').map(Number);
  for (let i = 0; i < 3; i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0);
  return false;
};

/**
 * Führt zwei Stände zusammen (z. B. Handy + PC). Je Eintrag gewinnt der zuletzt geänderte; bei Folgen werden
 * die besuchten Abschnitte vereinigt und „fertig“ bleibt erhalten. Einstellungen bleiben die von „hier“.
 * Wiederholtes Zusammenführen derselben Datei ändert nichts mehr.
 */
export function zusammenfuehren(hier, dort) {
  const z = { ...hier, einstellungen: { ...hier.einstellungen } };
  for (const b of BEREICHE) {
    z[b] = { ...hier[b] };
    for (const [id, e] of Object.entries(dort[b] || {})) {
      const sieger = neuere(hier[b][id], e);
      if (b === 'folgen' && hier[b][id]) {
        const a = hier[b][id];
        z[b][id] = { ...sieger, besucht: [...new Set([...a.besucht, ...e.besucht])], fertig: a.fertig ?? e.fertig ?? null };
        if (a.fertig && e.fertig) z[b][id].fertig = Math.min(a.fertig, e.fertig);
      } else z[b][id] = { ...sieger };
    }
  }
  if (dort.neuGesehen && (!hier.neuGesehen || versionGroesser(dort.neuGesehen, hier.neuGesehen))) z.neuGesehen = dort.neuGesehen;
  z.geaendert = Math.max(hier.geaendert || 0, dort.geaendert || 0);
  return z;
}

// ------------------------------------------------------------------ Laden und Speichern im Browser

/** Speicher im Browser (localStorage oder ein Ersatz mit getItem/setItem für Tests). */
export function browserSpeicher({ app, schluessel, speicher = globalThis.localStorage }) {
  return {
    laden() {
      try {
        const roh = speicher?.getItem(schluessel);
        return roh ? normalisiere(JSON.parse(roh), app) : leer(app);
      } catch (e) {
        // Kaputter Stand: nicht überschreiben, sondern beiseitelegen – so geht nichts verloren
        try { const roh = speicher?.getItem(schluessel); if (roh) speicher.setItem(`${schluessel}.defekt-${Date.now()}`, roh); } catch { /* egal */ }
        return leer(app);
      }
    },
    /** Gibt false zurück, wenn der Browser nicht speichern kann (privater Modus, Speicher voll). */
    speichern(zustand) {
      try { speicher.setItem(schluessel, JSON.stringify({ ...zustand, geaendert: Date.now() })); return true; } catch { return false; }
    },
  };
}

// ------------------------------------------------------------------ Export / Import

/** Fortschritt als Text für eine Datei (lesbares JSON). */
export function alsDateiText(zustand) {
  return JSON.stringify({ ...zustand, exportiert: new Date().toISOString() }, null, 1);
}

/** Datei-Text → geprüfter Stand (wirft bei Fehlern). */
export function ausDateiText(text, app) {
  let roh;
  try { roh = JSON.parse(text); } catch { throw new Error('Die Datei ist beschädigt oder keine Fortschritts-Datei.'); }
  return normalisiere(roh, app);
}

const b64 = {
  kodieren: (bytes) => { let s = ''; for (const b of bytes) s += String.fromCharCode(b); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); },
  dekodieren: (text) => { const s = atob(text.replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(s, (c) => c.charCodeAt(0)); },
};
async function strom(bytes, transform) {
  return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(transform)).arrayBuffer());
}
/** Kurze Prüfziffer (4 Zeichen) gegen Tippfehler und abgeschnittene Codes. */
function pruefziffer(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h.toString(36).slice(-4).padStart(4, '0');
}

/**
 * Fortschritt als kopierbarer Code: „<PRÄFIX>.<Daten>.<Prüfziffer>“ – Daten = JSON, gepackt (deflate) und
 * Base64-URL-kodiert. Zum Kopieren zwischen Handy und PC (z. B. per Messenger an sich selbst).
 */
export async function alsCode(zustand, praefix) {
  const json = new TextEncoder().encode(JSON.stringify(zustand));
  const gepackt = typeof CompressionStream === 'function';
  const daten = b64.kodieren(gepackt ? await strom(json, new CompressionStream('deflate-raw')) : json);
  const kopf = `${praefix}${gepackt ? 'Z' : 'J'}`;
  return `${kopf}.${daten}.${pruefziffer(daten)}`;
}

/** Code → geprüfter Stand (wirft bei Fehlern mit verständlicher Meldung). */
export async function ausCode(code, praefix, app) {
  const sauber = String(code).replace(/\s+/g, '');
  const m = /^([A-Za-z0-9]+)\.([A-Za-z0-9_-]+)\.([a-z0-9]{4})$/.exec(sauber);
  if (!m || !m[1].startsWith(praefix)) throw new Error('Das ist kein Fortschritts-Code dieser App.');
  if (pruefziffer(m[2]) !== m[3]) throw new Error('Der Code ist unvollständig oder verändert – bitte komplett kopieren.');
  const art = m[1].slice(praefix.length);
  let bytes = b64.dekodieren(m[2]);
  if (art === 'Z') bytes = await strom(bytes, new DecompressionStream('deflate-raw'));
  else if (art !== 'J') throw new Error('Unbekannte Code-Art.');
  return normalisiere(JSON.parse(new TextDecoder().decode(bytes)), app);
}
