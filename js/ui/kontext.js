// Gemeinsamer Zustand aller Ansichten: Konfiguration, Inhalte, Fortschritt. Wird einmal in app.js angelegt.
import { browserSpeicher } from '../kern/speicher.js';
import { glossarMuster } from '../kern/glossar.js';
import { tag } from '../kern/leitner.js';
import { poolEintraege, tagesrunde } from '../kern/lernpool.js';
import { $, toast } from '../kern/dom.js';

export async function ladeJson(url) {
  const antwort = await fetch(url);
  if (!antwort.ok) throw new Error(`${url}: ${antwort.status}`);
  return antwort.json();
}

export function erstelleKontext({ config, index, glossar, build }) {
  const speicher = browserSpeicher({ app: config.app.id, schluessel: config.app.speicherSchluessel });
  let gewarnt = false;
  const folgen = new Map();
  const ctx = {
    config, index, build,
    glossar: glossar.begriffe,
    glossarNachId: new Map(glossar.begriffe.map((b) => [b.id, b])),
    muster: glossarMuster(glossar.begriffe),
    zustand: speicher.laden(),
    /** Merkt sich Übergänge zwischen Ansichten, z. B. „aus dem Quiz zum Nachlesen“. */
    unterwegs: {},
    speichern() {
      if (!speicher.speichern(ctx.zustand) && !gewarnt) { gewarnt = true; toast('Fortschritt kann auf diesem Gerät nicht gespeichert werden (privates Fenster?).', 6000); }
      ctx.naviAktualisieren();
    },
    ersetzeZustand(neu) { ctx.zustand = neu; ctx.speichern(); },
    /** Folge mit Inhalt laden (aus dem Speicher, sonst vom Server bzw. Service Worker). */
    async folge(id) {
      if (folgen.has(id)) return folgen.get(id);
      const eintrag = ctx.planEintrag(id);
      if (!eintrag?.datei) return null;
      const f = await ladeJson(eintrag.datei);
      folgen.set(id, f);
      return f;
    },
    planEintrag(id) {
      for (const s of index.staffeln) { const f = s.folgen.find((x) => x.id === id); if (f) return { ...f, staffel: s }; }
      return null;
    },
    /** Lernpool: freigeschaltete Einträge und Größe der heutigen Runde. */
    pool() {
      const eintraege = poolEintraege(index, ctx.zustand);
      const L = config.regeln.leitner;
      return { eintraege, heute: tagesrunde(eintraege, ctx.zustand, { heute: tag(), max: L.maxJeRunde, neuMax: L.neuJeRunde }).length };
    },
    naviAktualisieren() {
      const z = $('#navi-faellig');
      if (!z) return;
      const { heute } = ctx.pool();
      z.hidden = !heute;
      z.textContent = String(heute);
      z.setAttribute('aria-label', `${heute} heute zu wiederholen`);
    },
  };
  return ctx;
}
