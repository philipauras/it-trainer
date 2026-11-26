// Service Worker: macht die App offline nutzbar. Herkunft: bim-trainer sw.js (mit Update-Schutz).
// CACHE_VERSION: deploy.sh ersetzt den Wert beim Veröffentlichen durch den Commit-Hash, damit Geräte jede neue
// Version laden. Lokal bleibt „dev“.
//
// Updates: Eine neue Version wird im Hintergrund geladen und wartet dann. Die App zeigt
// „Neue Version verfügbar – Neu laden“; erst nach dem Tippen übernimmt sie (Nachricht „aktivieren“).
const CACHE_VERSION = 'ittrainer-dev';

// „./“ statt „index.html“: Cloudflare Pages leitet /index.html auf / um, und ein umgeleiteter Response darf
// nicht als Antwort auf einen Seitenaufruf dienen. Neue Dateien hier eintragen – der Test prüft das.
const APP_DATEIEN = [
  './',
  'config.json',
  'manifest.webmanifest',
  'css/thema.css',
  'css/app.css',
  'js/app.js',
  'js/kern/dom.js',
  'js/kern/fortschritt.js',
  'js/kern/glossar.js',
  'js/kern/leitner.js',
  'js/kern/logik.js',
  'js/kern/markdown.js',
  'js/kern/router.js',
  'js/kern/speicher.js',
  'js/kern/thema.js',
  'js/kern/update.js',
  'js/ui/bausteine.js',
  'js/ui/einstellungen.js',
  'js/ui/folge.js',
  'js/ui/glossar.js',
  'js/ui/karten.js',
  'js/ui/kontext.js',
  'js/ui/quiz.js',
  'js/ui/sim-rahmen.js',
  'js/ui/staffel.js',
  'js/ui/start.js',
  'js/ui/text.js',
  'js/sim/index.js',
  'js/sim/bit-schalter.js',
  'js/sim/code.js',
  'js/sim/zahlenraten.js',
  'fonts/barlow-latin-400-normal.woff2',
  'fonts/barlow-latin-500-normal.woff2',
  'fonts/barlow-latin-600-normal.woff2',
  'fonts/barlow-latin-700-normal.woff2',
  'icons/icon.svg',
  'icons/icon-32.png',
  'icons/icon-180.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'inhalt/index.json',
  'inhalt/glossar.json',
];

// Update-Schutz: deploy.sh trägt hier je Datei die Prüfsumme ein (werkzeuge/pruefsummen.mjs). Kommt während einer
// Veröffentlichung eine falsche Datei an (alter Stand, Fehlerseite), scheitert die Installation – die bisherige
// Version läuft weiter, der Browser versucht es später erneut. Lokal leer = keine Prüfung.
const PRUEFSUMMEN = {};
const anfrage = (u) => new Request(u, { cache: 'reload', ...(PRUEFSUMMEN[u] ? { integrity: PRUEFSUMMEN[u] } : {}) });

self.addEventListener('install', (ev) => {
  ev.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    try { await allesLaden(cache); } catch (e) { await caches.delete(CACHE_VERSION); throw e; }
  })());
});

async function allesLaden(cache) {
  await cache.addAll(APP_DATEIEN.map(anfrage));
  // Alle Folgen gleich mit vorhalten (veröffentlicht: geprüft; lokal: aus dem Index)
  const folgen = Object.keys(PRUEFSUMMEN).filter((u) => u.startsWith('inhalt/folgen/'));
  if (folgen.length) { await cache.addAll(folgen.map(anfrage)); return; }
  try {
    const idx = await (await fetch('inhalt/index.json', { cache: 'no-store' })).json();
    const dateien = idx.staffeln.flatMap((s) => s.folgen).map((f) => f.datei).filter(Boolean);
    await cache.addAll(dateien.map((d) => new Request(d, { cache: 'reload' })));
  } catch (e) { /* wird beim ersten Abruf nachgeholt */ }
}

/** Nur echte Dateien in den Cache – nie eine Webseite, die statt einer Datei ausgeliefert wurde. */
const speicherbar = (req, antwort) => antwort.ok && (new URL(req.url).pathname.endsWith('/') || !/text\/html/.test(antwort.headers.get('content-type') || ''));

self.addEventListener('message', (ev) => {
  if (ev.data && ev.data.typ === 'aktivieren') self.skipWaiting();
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil((async () => {
    for (const name of await caches.keys()) if (name !== CACHE_VERSION) await caches.delete(name);
    await self.clients.claim();
  })());
});

async function cacheZuerst(req) {
  const cache = await caches.open(CACHE_VERSION);
  const treffer = await cache.match(req, { ignoreSearch: true });
  if (treffer) return treffer;
  const antwort = await fetch(req);
  if (speicherbar(req, antwort)) cache.put(req, antwort.clone());
  return antwort;
}

self.addEventListener('fetch', (ev) => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Seitenaufrufe: immer die App-Hülle liefern
  if (req.mode === 'navigate') { ev.respondWith(cacheZuerst(new Request('./'))); return; }
  // Alles andere (auch Inhalte) aus dem Cache der installierten Version: Inhalte und Code passen so immer
  // zusammen. Neue Inhalte kommen mit der nächsten Version (Leiste „Neu laden“).
  ev.respondWith(cacheZuerst(req));
});
