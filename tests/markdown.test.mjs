// Markdown-Renderer (Kern). Herkunft der Fälle: bim-trainer tests/markdown.test.mjs, ergänzt um Boxen, Links, Codeblöcke.
import test from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown, inline } from '../js/kern/markdown.js';
import { baue } from '../werkzeuge/bauen.mjs';

const BOXEN = { Merke: 'merke', Achtung: 'achtung' };

test('Überschriften: erste „# …“ wird Titel, „## 1.2 …“ bekommt Anker', () => {
  const r = renderMarkdown('# Titel\n\n## 4.5.3 Abschnitt\nText\n\n## Ohne Nummer\n\n### Unterpunkt\n');
  assert.equal(r.titel, 'Titel');
  assert.deepEqual(r.ueberschriften.map((u) => u.id), ['lz-4-5-3', 'abschnitt-2']);
  assert.ok(r.html.includes('<h3>Unterpunkt</h3>'));
});

test('Hinweisboxen nur für konfigurierte Marken, sonst Zitat', () => {
  const r = renderMarkdown('> **Merke:** Jedes Bit **verdoppelt**.\n\n> **Unbekannt:** x\n\n> Nur ein Zitat\n> über zwei Zeilen', { boxen: BOXEN });
  assert.ok(r.html.includes('<aside class="box box-merke"><p class="box-marke">Merke</p><p>Jedes Bit <strong>verdoppelt</strong>.</p></aside>'));
  assert.ok(r.html.includes('<blockquote><p><strong>Unbekannt:</strong> x</p></blockquote>'));
  assert.ok(r.html.includes('<blockquote><p>Nur ein Zitat über zwei Zeilen</p></blockquote>'));
  assert.ok(renderMarkdown('> **Wusstest du?:** Ja', { boxen: { 'Wusstest du?': 'wusstest' } }).html.includes('box-wusstest'));
});

test('Tabellen, Listen, Codeblöcke', () => {
  const t = renderMarkdown('| Bits | Muster |\n|---|---|\n| 1 | 2 |\n\nDanach');
  assert.ok(t.html.startsWith('<div class="tabelle-rahmen" tabindex="0"><table class="spalten-2"><thead><tr><th>Bits</th><th>Muster</th></tr></thead>'));
  assert.equal(renderMarkdown('- eins\n  - unter\n- zwei\n\n1. a\n2. b').html, '<ul><li>eins<ul><li>unter</li></ul></li><li>zwei</li></ul>\n<ol><li>a</li><li>b</li></ol>');
  assert.equal(renderMarkdown('```\nprint("<hallo>")\n**kein fett**\n```\nText').html, '<pre class="code"><code>print(&quot;&lt;hallo&gt;&quot;)\n**kein fett**</code></pre>\n<p>Text</p>');
});

test('Zeileninhalt: fett, kursiv, Code, Links – HTML wird maskiert, nie ausgeführt', () => {
  assert.equal(inline('**fett** und *kursiv* und `01000001`'), '<strong>fett</strong> und <em>kursiv</em> und <code>01000001</code>');
  assert.equal(inline('2 * 3 * 4'), '2 * 3 * 4');
  assert.equal(inline('[Quelle](https://example.org/a?b=1&c=2)'), '<a href="https://example.org/a?b=1&amp;c=2" target="_blank" rel="noopener noreferrer">Quelle</a>');
  assert.equal(inline('[Glossar](#glossar/bit)'), '<a href="#glossar/bit">Glossar</a>');
  assert.equal(inline('[böse](javascript:alert(1))'), '[böse](javascript:alert(1))');
  const r = renderMarkdown('<script>alert(1)</script> & "x"\n\n| a |\n|---|\n| <b>x</b> |');
  assert.ok(!/<(script|b)\b/.test(r.html));
  assert.equal(renderMarkdown('| keine Tabelle').html, '<p>| keine Tabelle</p>');
});

test('Alle Inhalte rendern ohne Markdown-Reste', () => {
  const { folgen, config } = baue();
  for (const f of folgen.values()) for (const a of f.abschnitte) for (const t of a.teile) {
    if (t.art !== 'md') continue;
    const ohneCode = renderMarkdown(t.text, { boxen: config.boxen }).html.replace(/<(code|pre)[^>]*>[\s\S]*?<\/\1>/g, '');
    assert.ok(!/\*\*|^\s*[-*] |^#{1,3} |^> |^:::/m.test(ohneCode), `${f.id}/${a.id}: Markdown-Rest`);
  }
});
