// Start der App: Inhalte laden, Farben anwenden, Adressen den Ansichten zuordnen, Service Worker anmelden.
// Alles Themenspezifische steht in config.json, alle Inhalte in inhalt/ (erzeugt aus content/).
import { $, $$, el } from './kern/dom.js';
import { starteRouter } from './kern/router.js';
import { wendeThemaAn, folgeSystem } from './kern/thema.js';
import { serviceWorkerEinrichten } from './kern/update.js';
import { ladeJson, erstelleKontext } from './ui/kontext.js';
import { zeigeBegriff } from './ui/text.js';
import { zeigeStart } from './ui/start.js';
import { zeigeStaffel } from './ui/staffel.js';
import { zeigeFolge } from './ui/folge.js';
import { zeigeLernen } from './ui/lernpool.js';
import { geheZu } from './kern/router.js';
import { zeigeGlossar } from './ui/glossar.js';
import { zeigeEinstellungen } from './ui/einstellungen.js';
import { setzeAppName } from './ui/bausteine.js';

// deploy.sh setzt hier beim Veröffentlichen den Commit ein, lokal bleibt „dev“
const APP_BUILD = 'dev';

async function init() {
  let ctx;
  try {
    const [config, index, glossar] = await Promise.all([ladeJson('config.json'), ladeJson('inhalt/index.json'), ladeJson('inhalt/glossar.json')]);
    ctx = erstelleKontext({ config, index, glossar, build: APP_BUILD });
    window.__itTrainer = ctx; // für die automatische Prüfung (werkzeuge/oberflaeche-pruefen.mjs)
  } catch (e) {
    console.error(e);
    $('#inhalt').replaceChildren(el('h1', { class: 'titel', text: 'Inhalte konnten nicht geladen werden' }),
      el('p', { text: 'Bitte einmal mit Internetverbindung öffnen. Danach funktioniert die App auch offline.' }));
    serviceWorkerEinrichten({ leiste: $('#update-leiste'), knopf: $('#knopf-neu-laden') });
    return;
  }
  setzeAppName(ctx.config.app.name);
  wendeThemaAn(ctx.config.farben, ctx.zustand.einstellungen.thema);
  folgeSystem(ctx.config.farben, () => ctx.zustand.einstellungen.thema);

  // Antippbare Glossarbegriffe überall in der App
  document.addEventListener('click', (ev) => {
    const wort = ev.target.closest('.glossar-wort');
    if (wort) { ev.preventDefault(); zeigeBegriff(ctx, wort.dataset.glossar); }
  });
  $('#glossar-blatt-link').addEventListener('click', () => $('#dialog-glossar').close());
  // Blätter schließen sich auch beim Tippen neben das Blatt
  for (const d of $$('dialog.blatt')) d.addEventListener('click', (ev) => { if (ev.target === d) d.close(); });

  const navi = { start: 'start', staffel: 'start', folge: 'start', lernen: 'lernen', glossar: 'glossar', einstellungen: 'einstellungen' };
  starteRouter({
    start: () => zeigeStart(ctx),
    staffel: (t) => zeigeStaffel(ctx, t),
    folge: (t) => zeigeFolge(ctx, t),
    lernen: (t) => zeigeLernen(ctx, t),
    karten: () => geheZu('lernen', { ersetzen: true }), // alte Adresse des Karteikastens
    glossar: (t) => zeigeGlossar(ctx, t),
    einstellungen: () => zeigeEinstellungen(ctx),
  }, {
    nachher: (name) => {
      for (const a of $$('.hauptnavi a')) { if (a.dataset.navi === (navi[name] || 'start')) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); }
      document.body.dataset.ansicht = name;
    },
  });
  ctx.naviAktualisieren();
  serviceWorkerEinrichten({ leiste: $('#update-leiste'), knopf: $('#knopf-neu-laden') });
}

init();
