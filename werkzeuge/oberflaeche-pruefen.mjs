#!/usr/bin/env node
// Automatische Prüfung der App im echten Browser (Chromium/Playwright) – lokal oder gegen eine veröffentlichte Adresse.
//
//   node werkzeuge/oberflaeche-pruefen.mjs [--bilder ORDNER]                       lokal (eigener Server mit den Regeln aus _headers)
//   node werkzeuge/oberflaeche-pruefen.mjs --url https://… --build abc1234 [--live] [--bilder ORDNER]   (deploy.sh)
//
// Prüft: 1. Dateien und Links (jede App-Datei da und kein HTML-Ersatz, fehlende Dateien → 404, interne Sprungziele gültig,
//        externe Links erreichbar – nur Warnung), 2. Handy-Format (Pixel-Maße, Touch): Start, Schichten-Karte, jede verfügbare
//        Folge komplett durchklicken (Übungen, Auf den Punkt, abschließen), Lernpool (Tagesrunde mit Nachlesen, Schicht, Prüfung), Glossar-Blatt, Einstellungen,
//        dunkles Thema, kein waagerechtes Scrollen bei 360/412 px, Bildschirmfotos; 3. PC-Format; 4. Export/Import per Code
//        und Datei in ein „zweites Gerät“; 5. offline nach dem ersten Besuch; 6. keine Fehler in der Konsole, keine fremden Adressen.
import { createRequire } from 'node:module';
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const { chromium, devices } = createRequire('/')('playwright');
const W = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (name) => { const i = process.argv.indexOf(name); return i >= 0 ? process.argv[i + 1] : null; };
const ziel = arg('--url');
const build = arg('--build');
const live = process.argv.includes('--live');
const bilder = arg('--bilder');
if (bilder) mkdirSync(bilder, { recursive: true });

// ---------------------------------------------------------------- lokaler Server (wie Cloudflare: 404 für Fehlendes)
const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };
let server;
let url = ziel ? `${ziel.replace(/\/$/, '')}/` : null;
if (!url) {
  const csp = /^ +Content-Security-Policy: (.*)/m.exec(readFileSync(join(W, '_headers'), 'utf8'))[1];
  server = http.createServer((q, a) => {
    const p = decodeURIComponent(q.url.split('?')[0]);
    const f = join(W, p === '/' ? 'index.html' : p);
    if (!f.startsWith(W) || !existsSync(f) || p.includes('/.')) { a.writeHead(404, { 'Content-Type': 'text/html' }).end(readFileSync(join(W, '404.html'))); return; }
    a.writeHead(200, { 'Content-Type': TYP[extname(f)] || 'text/plain', 'Content-Security-Policy': csp, 'Cache-Control': 'no-cache' });
    a.end(readFileSync(f));
  });
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  url = `http://127.0.0.1:${server.address().port}/`;
}
const herkunft = new URL(url).origin;

let schritt = '';
const los = (t) => { schritt = t; console.log(`  · ${t}`); };
const warnungen = [];

// ---------------------------------------------------------------- 1. Dateien und Links
async function holen(pfad, versuche = 2) {
  for (let i = 0; ; i++) {
    try { return await fetch(new URL(pfad, url), { cache: 'no-store', redirect: 'manual', signal: AbortSignal.timeout(20000) }); } catch (e) { if (i + 1 >= versuche) throw e; await new Promise((ok) => setTimeout(ok, 2000)); }
  }
}
async function dateienPruefen() {
  los('Dateien: Veröffentlichung ist da (Build-Kennung)');
  if (build) {
    // Nach dem Hochladen braucht die Adresse manchmal einige Sekunden
    // Neue Adressen bekommen ihr Zertifikat erst nach einigen Minuten – bis zu 15 Minuten geduldig warten
    let ok = false;
    for (let i = 0; i < 90 && !ok; i++) {
      try { ok = (await (await holen(`js/app.js?t=${Date.now()}`)).text()).includes(`const APP_BUILD = '${build}'`); } catch { /* noch nicht erreichbar */ }
      if (!ok) await new Promise((r) => setTimeout(r, 10_000));
    }
    assert.ok(ok, `Unter ${url} ist nicht Commit ${build} veröffentlicht`);
  }
  los('Dateien: jede App-Datei erreichbar, richtiger Typ');
  const sw = await (await holen('sw.js')).text();
  const liste = [.../const APP_DATEIEN = \[([\s\S]*?)\];/.exec(sw)[1].replace(/^\s*\/\/.*$/gm, '').matchAll(/'([^']+)'/g)].map((m) => m[1]);
  const index = await (await holen('inhalt/index.json')).json();
  assert.equal(index.live, live, live ? 'Live-Stand erwartet' : 'Vorschau-Stand erwartet');
  const folgen = index.staffeln.flatMap((s) => s.folgen).filter((f) => f.datei);
  for (const f of [...liste, ...folgen.map((x) => x.datei)]) {
    const a = await holen(f, 3);
    assert.equal(a.status, 200, `${f}: Status ${a.status}`);
    if (f !== './') assert.ok(!/text\/html/.test(a.headers.get('content-type') || ''), `${f}: HTML statt Datei`);
  }
  const fehlt = await holen('js/gibt-es-nicht.js');
  assert.equal(fehlt.status, 404, 'fehlende Dateien müssen 404 liefern (sonst gefährdet die Startseite den Update-Schutz)');
  if (ziel) assert.match((await holen('./')).headers.get('content-security-policy') || '', /default-src 'none'/, 'CSP aus _headers fehlt');
  if (live) for (const f of folgen) assert.equal(f.status, 'freigegeben', `${f.id} ist live, aber nicht freigegeben`);

  los('Links: interne Sprungziele und Quellen');
  const abschnitte = new Set((await (await holen('config.json')).json()).abschnitte.map((a) => a.id));
  const glossar = new Set((await (await holen('inhalt/glossar.json')).json()).begriffe.map((b) => b.id));
  const extern = new Set();
  for (const eintrag of folgen) {
    const f = await (await holen(eintrag.datei)).json();
    for (const q of f.quellen) if (q.url) extern.add(q.url);
    const texte = f.abschnitte.flatMap((a) => a.teile.filter((t) => t.art === 'md').map((t) => t.text));
    for (const t of [...texte, ...f.quiz.map((q) => q.erklaerung), ...f.karten.flatMap((k) => [k.vorne, k.hinten])]) {
      for (const [, l] of t.matchAll(/\]\((#[^)]*|https:\/\/[^)]+)\)/g)) {
        if (l.startsWith('https://')) { extern.add(l); continue; }
        const [name, a, b] = l.slice(1).split('/');
        const gueltig = (name === 'glossar' && (!a || glossar.has(a))) || (name === 'folge' && folgen.some((x) => x.id === a) && (!b || abschnitte.has(b)))
          || ['', 'karten', 'einstellungen', 'staffel'].includes(name);
        assert.ok(gueltig, `${f.id}: ungültiger Link ${l}`);
      }
    }
    for (const q of f.quiz) assert.ok(abschnitte.has(q.nachlesen), `${q.id}: Nachlesen-Ziel`);
  }
  for (const l of extern) {
    try {
      const a = await fetch(l, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'Mozilla/5.0 (Linkpruefung)' } });
      if (!a.ok) warnungen.push(`Link ${a.status}: ${l}`);
    } catch (e) { warnungen.push(`Link nicht erreichbar (${e.cause?.code || e.name}): ${l}`); }
  }
  return { folgen, index };
}

// ---------------------------------------------------------------- 2.–6. im Browser
const browser = await chromium.launch();
const fehler = [];
const horche = (s) => {
  s.on('pageerror', (e) => fehler.push(`Seitenfehler: ${e.message}`));
  s.on('console', (m) => { if (m.type() === 'error') fehler.push(`Konsole: ${m.text()}`); });
  s.on('request', (r) => { const u = r.url(); if (!u.startsWith(herkunft) && !/^(blob|data):/.test(u)) fehler.push(`fremde Adresse: ${u}`); });
};
const handy = () => browser.newContext({ ...devices['Pixel 7'], locale: 'de-DE', timezoneId: 'Europe/Berlin', acceptDownloads: true });
let s;
const bild = async (name, seite = s) => { if (bilder) { await seite.waitForTimeout(250); await seite.screenshot({ path: join(bilder, `${name}.png`), fullPage: name.endsWith('-ganz') }); } };
// Je Ansicht: kein waagerechtes Scrollen und keine Programmier-Reste („null“, „undefined“, „NaN“) im sichtbaren Text
const kein_ueberlauf = async (wo) => {
  assert.ok(await s.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${wo}: waagerechtes Scrollen`);
  const rest = await s.evaluate(() => /\b(null|undefined|NaN)\b|\[object /.exec(document.querySelector('#inhalt').innerText)?.[0]);
  assert.ok(!rest, `${wo}: „${rest}“ im sichtbaren Text`);
};
const zustand = (seite = s) => seite.evaluate(() => JSON.parse(JSON.stringify(window.__itTrainer.zustand)));

async function folgeDurchklicken(f, nr) {
  const p = `${String(nr).padStart(2, '0')}-${f.id}`;
  los(`Folge ${f.id}: Einstieg`);
  await s.goto(`${url}#folge/${f.id}`);
  await s.locator('.abschnitt-einstieg').waitFor();
  if (!live && f.status !== 'freigegeben') await s.locator('.entwurf-banner').waitFor();
  await kein_ueberlauf(`${f.id}/einstieg`); await bild(`${p}-a-einstieg`);
  const weiter = () => s.locator('.folgen-fuss .knopf').last().click();
  for (const [b, id] of [['b', 'geschichte'], ['c', 'prinzip'], ['d', 'werkstatt'], ['e', 'selbst']]) {
    los(`Folge ${f.id}: ${id}`);
    await weiter(); await s.locator(`.abschnitt-${id}`).waitFor();
    await s.locator('.sim .laden').first().waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
    await kein_ueberlauf(`${f.id}/${id}`); await bild(`${p}-${b}-${id}`);
    if (id === 'prinzip' && await s.locator('.schalter').count()) {
      await s.locator('.schalter').first().click(); await s.getByText(/Muster/).first().waitFor();
    }
  }
  los(`Folge ${f.id}: Übungen lösen`);
  for (const u of await s.locator('.sim-uebung').all()) {
    if (await u.locator('.zahlen-raster').count()) {
      for (let i = 0; i < 12 && !(await u.getByText(/^Gefunden/).count()); i++) await u.getByRole('button', { name: /^Ist sie größer als/ }).click();
      await u.getByText(/^Gefunden/).waitFor();
      assert.match(await u.innerText(), /6 Fragen/, 'Halbieren braucht 6 Fragen');
    } else {
      // Andere Simulatoren stellen einen unsichtbaren Haken „_loesen“ bereit (setzt die Lösung wie per Fingertipp)
      const hatHaken = await u.locator('.sim-flaeche').evaluate((e) => { if (typeof e._loesen !== 'function') return false; e._loesen(); return true; });
      assert.ok(hatHaken, 'Übung ohne Lösungs-Haken (_loesen) – Simulator ergänzen');
    }
    await u.locator('.uebung-fertig').waitFor({ timeout: 3000 });
  }
  await bild(`${p}-e-selbst-geloest`);
  assert.equal(await s.locator('.quiz, .lernkarte').count(), 0, 'Quiz/Karten gehören nicht mehr in die Folge');
  los(`Folge ${f.id}: Wo steckt das bei dir?`);
  await weiter(); await s.locator('.abschnitt-beidir').waitFor(); await kein_ueberlauf(`${f.id}/beidir`); await bild(`${p}-f-beidir`);
  if (await s.locator('.abschnitt .glossar-wort').count()) {
    await s.locator('.abschnitt .glossar-wort').first().click(); await s.locator('#dialog-glossar[open]').waitFor(); await bild(`${p}-f-glossar-blatt`);
    await s.locator('#dialog-glossar').getByRole('button', { name: 'Schließen' }).click();
  }
  los(`Folge ${f.id}: Auf den Punkt – abschließen`);
  await weiter(); await s.locator('.abschnitt-fazit').waitFor(); await kein_ueberlauf(`${f.id}/fazit`);
  const hinweis = await s.locator('.pool-hinweis').innerText();
  assert.match(hinweis, new RegExp(`${f.karten.length + f.fragen} neue Fragen zum Lernen`), 'Hinweis „X neue Fragen zum Lernen“');
  assert.equal(await s.locator('.pool-hinweis a[href="#lernen"]').count(), 1, 'Link zum Reiter Lernen');
  await bild(`${p}-g-fazit`);
  await s.getByRole('button', { name: 'Folge abschließen' }).click();
  await s.locator('.start-kopf').waitFor();
  const z = await zustand();
  assert.ok(z.folgen[f.id].fertig, `${f.id} nicht als fertig gespeichert`);
  for (const u of f.uebungen) assert.ok(z.uebungen[u], `Übung ${u} nicht gespeichert`);
  const pool = await s.evaluate((id) => window.__itTrainer.pool().filter((e) => e.folge === id).length, f.id);
  assert.equal(pool, f.karten.length + f.fragen, `${f.id}: nach dem Abschluss nicht übbar`);
}

/** Eine Lernrunde bis zum Ende spielen. Bei der ersten Frage: nachlesen und zurück (dieselbe Frage ist noch da). */
async function rundeSpielen(name, { nachlesen = false } = {}) {
  let erste = true;
  for (let i = 0; i < 80 && !(await s.locator('.runde-ende').count()); i++) {
    await s.locator('.lernkarte, .antworten').first().waitFor();
    if (await s.locator('.lernkarte').count()) {
      await s.getByRole('button', { name: 'Antwort zeigen' }).click();
      await s.getByRole('button', { name: i === 0 ? 'Noch nicht' : 'Wusste ich' }).click();
      continue;
    }
    await s.locator('.antwort').first().click();
    await s.locator('.rueckmeldung').waitFor();
    if (erste && nachlesen) {
      erste = false;
      await bild(`${name}-rueckmeldung`);
      const frageText = await s.locator('.quiz-frage').innerText();
      await s.locator('.nachlesen-link').click(); await s.locator('.nachlesen-leiste').waitFor();
      await kein_ueberlauf(`${name}/nachlesen`); await bild(`${name}-nachlesen`);
      await s.locator('.nachlesen-leiste a').click(); await s.locator('.rueckmeldung').waitFor();
      assert.equal(await s.locator('.quiz-frage').innerText(), frageText, 'nach dem Nachlesen dieselbe Frage');
    }
    await s.getByRole('button', { name: /^(Weiter|Ergebnis zeigen)$/ }).click();
  }
  await s.locator('.runde-ende').waitFor(); await kein_ueberlauf(`${name}/ende`); await bild(`${name}-ende`);
}

let gerät2;
try {
  const { folgen, index } = await dateienPruefen();
  let c = await handy(); s = await c.newPage(); horche(s);

  los('Handy: Startseite und Schichten-Karte');
  await s.goto(url);
  await s.locator('.start-kopf').waitFor();
  await s.evaluate(() => navigator.serviceWorker?.ready);
  assert.equal(await s.locator('.schicht').count(), 11);
  await s.locator('.schicht-hier .hier-marke').waitFor();
  await kein_ueberlauf('Start'); await bild('01-start'); await bild('01-start-ganz');
  if (!live) {
    const entwurf = index.staffeln.flatMap((x) => x.folgen).some((f) => ['entwurf', 'geprueft'].includes(f.status));
    if (entwurf) await s.locator('.vorschau-hinweis').waitFor();
  }
  los('Handy: Staffel 1 und eine geplante Staffel');
  await s.goto(`${url}#staffel/1`); await s.locator('.folgen-liste').waitFor(); await kein_ueberlauf('Staffel 1'); await bild('02-staffel-1');
  await s.goto(`${url}#staffel/2`); await s.locator('.leer-hinweis').first().waitFor();

  let nr = 3;
  for (const f of folgen) await folgeDurchklicken(f, nr++);

  los('Start: nur Doku-Reihe, drei Reiter, Zahnrad');
  await s.goto(url); await s.locator('.schichten').waitFor();
  assert.equal(await s.locator('.hauptnavi a').count(), 3, 'genau drei Reiter');
  assert.equal(await s.locator('.kasten-karte, .weiter-karte, .schicht-runde, .schicht-fest, .neu-karte, .navi-zahl').count(), 0, 'keine Lern-Elemente auf Start');
  await bild('20-start-ganz');
  if (folgen.length) {
    los('Lernen: Übersicht mit „X von Y sicher“');
    await s.locator('.hauptnavi a[data-navi="lernen"]').click(); await s.locator('.lern-staffel').first().waitFor();
    assert.match(await s.locator('.lern-staffel').first().innerText(), /\d+ von \d+ sicher/);
    await kein_ueberlauf('Lernen'); await bild('21-lernen-ganz');
    los('Lernen: Runde zu einer Folge mit Nachlesen und zurück');
    await s.locator('a.lern-folge').first().click(); await s.locator('.runde').waitFor();
    await rundeSpielen('22-folge', { nachlesen: true });
    const z = await zustand();
    assert.ok(Object.values(z.quiz).some((q) => q.fach && q.faellig), 'Fragen bekommen im Hintergrund ein Fach');
    los('Lernen: ganze Staffel üben');
    await s.goto(`${url}#lernen`); await s.locator('a[href^="#lernen/runde/staffel/"]').first().click(); await s.locator('.runde').waitFor();
    await rundeSpielen('23-staffel');
    los('Lernen: Prüfung der Staffel');
    await s.goto(`${url}#lernen`); await s.locator('.lern-stand-text').first().waitFor();
    assert.ok(Number(/^(\d+)/.exec(await s.locator('.lern-stand-text').first().innerText())[1]) > 0, 'nach dem Üben ist etwas sicher');
    if (await s.locator('a[href^="#lernen/runde/pruefung/"]').count()) {
      await s.locator('a[href^="#lernen/runde/pruefung/"]').first().click(); await s.locator('.runde').waitFor();
      await rundeSpielen('24-pruefung');
      await s.locator('.pruefung-auswertung').waitFor();
    }
  } else {
    await s.goto(`${url}#lernen`); await s.locator('.titel').waitFor(); await kein_ueberlauf('Lernen');
  }
  los('Zahnrad: Einstellungen und Neuigkeiten');
  await s.locator('.zahnrad').click(); await s.locator('#neu-titel').waitFor(); await kein_ueberlauf('Einstellungen');
  los('Handy: Glossar mit Suche');
  await s.goto(`${url}#glossar`); await s.locator('.glossar-eintrag').first().waitFor();
  await s.getByRole('searchbox').fill('bit'); await s.locator('.glossar-eintrag').first().click(); await kein_ueberlauf('Glossar'); await bild('21-glossar');
  await s.goto(`${url}#glossar/byte`); await s.locator('#g-byte[open]').waitFor();

  los('Export per Code und Datei → zweites Gerät');
  await s.goto(`${url}#einstellungen`); await s.getByRole('button', { name: 'Als Code anzeigen' }).click();
  await s.waitForFunction(() => document.querySelector('textarea[readonly]')?.value.length > 10); // Code wird asynchron gepackt
  const code = await s.locator('textarea[readonly]').inputValue();
  assert.match(code, /^IT1[ZJ]\./);
  const [download] = await Promise.all([s.waitForEvent('download'), s.getByRole('button', { name: 'Als Datei speichern' }).click()]);
  const dateiText = readFileSync(await download.path(), 'utf8');
  await kein_ueberlauf('Einstellungen'); await bild('22-einstellungen');
  const original = await zustand();
  gerät2 = await handy(); const s2 = await gerät2.newPage(); horche(s2);
  await s2.goto(`${url}#einstellungen`); await s2.locator('.code-feld').last().waitFor();
  await s2.getByRole('textbox', { name: 'Fortschritts-Code einfügen' }).fill(code);
  await s2.getByRole('button', { name: 'Code übernehmen' }).click();
  await s2.locator('#dialog-frage[open]').waitFor(); await s2.getByRole('button', { name: 'Zusammenführen' }).click();
  await s2.locator('#toast', { hasText: 'zusammengeführt' }).waitFor();
  for (const b of ['folgen', 'quiz', 'karten', 'uebungen']) assert.deepEqual((await zustand(s2))[b], original[b], `Code: ${b} nicht übertragen`);
  los('Kaputter Code ändert nichts');
  await s2.getByRole('textbox', { name: 'Fortschritts-Code einfügen' }).fill(code.slice(0, -3));
  await s2.getByRole('button', { name: 'Code übernehmen' }).click();
  await s2.locator('#toast', { hasText: 'nichts verändert' }).waitFor();
  los('Datei auf drittem Gerät: ersetzen');
  const c3 = await handy(); const s3 = await c3.newPage(); horche(s3);
  await s3.goto(`${url}#einstellungen`);
  await s3.locator('input[type=file]').setInputFiles({ name: 'f.json', mimeType: 'application/json', buffer: Buffer.from(dateiText) });
  await s3.getByRole('button', { name: 'Ersetzen' }).click(); await s3.getByRole('button', { name: 'Ersetzen' }).click();
  await s3.locator('#toast', { hasText: 'ersetzt' }).waitFor();
  for (const b of ['folgen', 'quiz', 'karten', 'uebungen']) assert.deepEqual((await zustand(s3))[b], original[b], `Datei: ${b} nicht übertragen`);
  await s3.reload(); await s3.locator('.titel').waitFor();
  assert.deepEqual((await zustand(s3)).karten, original.karten, 'nach Neuladen noch da');
  await c3.close();

  los('Dunkles Thema');
  await s.emulateMedia({ colorScheme: 'dark' }); await s.goto(url); await s.locator('.start-kopf').waitFor();
  assert.equal(await s.evaluate(() => document.documentElement.dataset.theme), 'dunkel'); await bild('23-dunkel-start');
  if (folgen[0]) { await s.goto(`${url}#folge/${folgen[0].id}/prinzip`); await s.locator('.sim .schalter, .sim-info').first().waitFor(); await bild('24-dunkel-prinzip'); }
  await s.emulateMedia({ colorScheme: 'light' });

  los('Schmale Bildschirme (360 px): kein waagerechtes Scrollen');
  for (const breite of [360, 412]) {
    await s.setViewportSize({ width: breite, height: 800 });
    const wege = ['', '#staffel/1', '#lernen', '#karten', '#glossar', '#einstellungen', ...folgen.flatMap((f) => ['einstieg', 'prinzip', 'selbst', 'beidir', 'fazit'].map((a) => `#folge/${f.id}/${a}`))];
    for (const h of wege) { await s.goto(url + h); await s.waitForTimeout(150); await kein_ueberlauf(`${breite}px ${h || 'Start'}`); }
  }
  await bild('25-schmal-360');

  los('Offline nach dem ersten Besuch');
  await c.setOffline(true);
  await s.goto(url); await s.locator('.start-kopf').waitFor({ timeout: 8000 });
  if (folgen[0]) { await s.goto(`${url}#folge/${folgen[0].id}/selbst`); await s.locator('.sim-flaeche :is(.zahlen-raster, .schalter-reihe)').first().waitFor({ timeout: 8000 }); }
  await c.setOffline(false);
  await c.close();

  los('PC-Format (1280 × 800)');
  const pc = await browser.newContext({ viewport: { width: 1280, height: 800 }, locale: 'de-DE' });
  s = await pc.newPage(); horche(s);
  await s.goto(url); await s.locator('.start-kopf').waitFor(); await kein_ueberlauf('PC Start'); await bild('30-pc-start');
  if (folgen[0]) { await s.goto(`${url}#folge/${folgen[0].id}/prinzip`); await s.locator('.abschnitt').waitFor(); await bild('31-pc-folge'); }
  await pc.close();

  // Abgebrochene Abrufe beim Offline-Test sind erwartet
  const echte = fehler.filter((f) => !/ERR_INTERNET_DISCONNECTED|Failed to fetch|net::ERR/.test(f));
  assert.deepEqual(echte, [], 'Fehler in der Konsole');
  for (const w of warnungen) console.log(`  ⚠ ${w}`);
  console.log(`✓ Oberfläche geprüft (${ziel || 'lokal'}${live ? ', live' : ''}): ${folgen.length} Folge(n) durchgeklickt${bilder ? `, Bilder in ${bilder}` : ''}`);
} catch (e) {
  console.error(`✗ bei „${schritt}“: ${e.message.slice(0, 1200)}`);
  if (fehler.length) console.error(`  Konsole: ${fehler.slice(0, 5).join(' | ')}`);
  if (bilder && s) await s.screenshot({ path: join(bilder, 'fehler.png') }).catch(() => {});
  process.exitCode = 1;
} finally {
  await browser.close();
  server?.closeAllConnections(); server?.close();
}
