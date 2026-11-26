// KERN (übernehmbar, siehe docs/kern.md) – kleiner Markdown-Renderer ohne Bibliothek, ohne Build-Schritt.
// Herkunft: bim-trainer js/markdown.js, verallgemeinert: Hinweisboxen frei konfigurierbar („> **Merke:** …“),
// Links ([Text](https://…) und [Text](#adresse)), Codeblöcke (```).
// Unterstützt: Überschriften #/##/###, Absätze, Listen (- * 1., eine Ebene eingerückt), Tabellen, Zitatblöcke,
// **fett**, *kursiv*, `Code`. Alles andere erscheint als Text.
// Sicherheit: Der gesamte Text wird zuerst HTML-maskiert, erst danach entstehen die eigenen Tags –
// HTML aus einer Markdown-Datei wird also nie ausgeführt, sondern angezeigt.

const MASKE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const maskiere = (s) => String(s).replace(/[&<>"']/g, (z) => MASKE[z]);

/** Anker für ein Lernziel: "4.5.3" → "lz-4-5-3" (gleiche Regel in app.js für die Links aus den Fragen). */
export const lernzielAnker = (nr) => `lz-${String(nr).replace(/\./g, '-')}`;

/**
 * Zeileninhalt: `Code`, **fett**, *kursiv*, Links. Code-Abschnitte bleiben unverändert.
 * Links nur mit https:// (öffnen in neuem Tab) oder #adresse (innerhalb der App) – alles andere bleibt Text.
 */
export function inline(text) {
  return String(text).split(/(`[^`]+`)/).map((teil) => {
    if (teil.length > 2 && teil.startsWith('`') && teil.endsWith('`')) return `<code>${maskiere(teil.slice(1, -1))}</code>`;
    return maskiere(teil)
      .replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+|#[\w\-/]*)\)/g, (_, t, url) => url.startsWith('#')
        ? `<a href="${url}">${t}</a>`
        : `<a href="${url}" target="_blank" rel="noopener noreferrer">${t}</a>`)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*\w])\*(?!\s)([^*]+?)\*(?!\w)/g, '$1<em>$2</em>');
  }).join('');
}

const zellen = (zeile) => zeile.trim().replace(/^\||\|$/g, '').split('|').map((z) => z.trim());
const istTrenner = (zeile) => /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/.test(zeile.trim());
const LISTE = /^(\s*)([-*]|\d+\.)\s+(.*)$/;

function listeHtml(punkte) {
  // punkte: [{ ebene, typ: 'ul'|'ol', text }] → verschachtelte Listen (Unterliste hängt am vorherigen Punkt)
  let html = '';
  const offen = []; // Stapel der geöffneten Listen: { ebene, typ }
  for (const p of punkte) {
    while (offen.length && offen.at(-1).ebene > p.ebene) html += `</li></${offen.pop().typ}>`;
    if (offen.length && offen.at(-1).ebene === p.ebene && offen.at(-1).typ !== p.typ) html += `</li></${offen.pop().typ}>`;
    if (offen.length && offen.at(-1).ebene === p.ebene) html += '</li>';
    else { html += `<${p.typ}>`; offen.push({ ebene: p.ebene, typ: p.typ }); }
    html += `<li>${inline(p.text)}`;
  }
  while (offen.length) html += `</li></${offen.pop().typ}>`;
  return html;
}

/**
 * Wandelt Markdown in HTML um.
 * Gibt { html, titel, ueberschriften } zurück: titel = Text der ersten „# …“-Zeile (nicht im HTML enthalten,
 * die Ansicht zeigt ihn als Seitentitel); ueberschriften = alle „## …“ als { id, nr, titel } für das
 * Inhaltsverzeichnis. „## 4.5.3 Titel“ bekommt den Anker „lz-4-5-3“, „## Titel“ ohne Nummer „abschnitt-N“.
 */
/**
 * boxen: Marke → CSS-Klasse, z. B. { Merke: 'merke' } – „> **Merke:** Text“ wird dann zur Hinweisbox
 * <aside class="box box-merke">. Unbekannte Marken bleiben normale Zitate.
 */
export function renderMarkdown(text, { boxen = { 'Prüfung': 'pruefung' } } = {}) {
  const zeilen = String(text).replace(/\r\n?/g, '\n').split('\n');
  const aus = [];
  const ueberschriften = [];
  let titel = '';
  let i = 0;
  while (i < zeilen.length) {
    const z = zeilen[i];
    if (!z.trim()) { i++; continue; }

    const h = /^(#{1,3})\s+(.+?)\s*$/.exec(z);
    if (h) {
      i++;
      const inhalt = h[2];
      if (h[1].length === 1 && !titel) { titel = inhalt; continue; }
      if (h[1].length === 2) {
        const m = /^(\d+(?:\.\d+)+)\s+(.*)$/.exec(inhalt);
        const eintrag = m
          ? { id: lernzielAnker(m[1]), nr: m[1], titel: m[2] }
          : { id: `abschnitt-${ueberschriften.length + 1}`, nr: '', titel: inhalt };
        ueberschriften.push(eintrag);
        aus.push(`<h2 id="${eintrag.id}">${eintrag.nr ? `<span class="lz-nr">${maskiere(eintrag.nr)}</span> ` : ''}${inline(eintrag.titel)}</h2>`);
      } else {
        aus.push(`<h${h[1].length === 1 ? 2 : 3}>${inline(inhalt)}</h${h[1].length === 1 ? 2 : 3}>`);
      }
      continue;
    }

    if (/^```/.test(z)) { // Codeblock: unverändert, nur maskiert
      const code = [];
      i++;
      while (i < zeilen.length && !/^```/.test(zeilen[i])) code.push(zeilen[i++]);
      i++;
      aus.push(`<pre class="code"><code>${maskiere(code.join('\n'))}</code></pre>`);
      continue;
    }

    if (/^\s*>/.test(z)) { // Zitatblock; „> **Marke:** …“ wird zur Hinweisbox, wenn die Marke in „boxen“ steht
      const teile = [];
      while (i < zeilen.length && /^\s*>/.test(zeilen[i])) teile.push(zeilen[i++].replace(/^\s*>\s?/, ''));
      const inhalt = teile.join(' ').trim();
      const p = /^\*\*([^*:]+):\*\*\s*(.*)$/s.exec(inhalt);
      aus.push(p && Object.hasOwn(boxen, p[1])
        ? `<aside class="box box-${boxen[p[1]]}"><p class="box-marke">${maskiere(p[1])}</p><p>${inline(p[2])}</p></aside>`
        : `<blockquote><p>${inline(inhalt)}</p></blockquote>`);
      continue;
    }

    if (z.trim().startsWith('|') && i + 1 < zeilen.length && istTrenner(zeilen[i + 1])) { // Tabelle
      const kopf = zellen(z);
      i += 2;
      const reihen = [];
      while (i < zeilen.length && zeilen[i].trim().startsWith('|')) reihen.push(zellen(zeilen[i++]));
      // Klasse „spalten-N“: schmale Tabellen passen aufs Handy, breite lassen sich im Rahmen waagerecht schieben
      aus.push(`<div class="tabelle-rahmen" tabindex="0"><table class="spalten-${Math.min(kopf.length, 5)}"><thead><tr>` +
        kopf.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
        reihen.map((r) => `<tr>${kopf.map((_, n) => `<td>${inline(r[n] ?? '')}</td>`).join('')}</tr>`).join('') +
        '</tbody></table></div>');
      continue;
    }

    if (LISTE.test(z)) {
      const punkte = [];
      while (i < zeilen.length && zeilen[i].trim()) {
        const m = LISTE.exec(zeilen[i]);
        if (m) punkte.push({ ebene: m[1].length >= 2 ? 1 : 0, typ: /\d/.test(m[2]) ? 'ol' : 'ul', text: m[3] });
        else if (/^\s*(#{1,3}\s|>|\|)/.test(zeilen[i])) break;
        else punkte.at(-1).text += ` ${zeilen[i].trim()}`; // Fortsetzungszeile
        i++;
      }
      if (punkte[0].ebene > 0) for (const p of punkte) p.ebene = Math.max(0, p.ebene - 1);
      aus.push(listeHtml(punkte));
      continue;
    }

    const absatz = []; // Absatz bis zur Leerzeile oder zum nächsten Block
    while (i < zeilen.length && zeilen[i].trim() && !/^(#{1,3}\s|\s*>|\s*\||```)/.test(zeilen[i]) && !LISTE.test(zeilen[i])) absatz.push(zeilen[i++].trim());
    if (!absatz.length) absatz.push(zeilen[i++].trim()); // z. B. einzelne „|“-Zeile ohne Tabelle: als Text zeigen, nie hängen bleiben
    aus.push(`<p>${inline(absatz.join(' '))}</p>`);
  }
  return { html: aus.join('\n'), titel, ueberschriften };
}
