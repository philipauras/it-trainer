# it-trainer

**Zweck:** Lern-App, die Philip (IT-Einsteiger) IT und Programmieren von Grund auf beibringt – Staffeln mit Folgen
wie eine gute Doku, Schichten-Karte „Vom Sandkorn zur KI“. Live: https://it-trainer.pages.dev · Vorschau: https://vorschau.it-trainer.pages.dev
**Stack:** statische PWA ohne Backend/Framework/Build-Werkzeug (nur unser eigenes `werkzeuge/bauen.mjs`), offline per Service Worker, Cloudflare Pages.

## Aufbau
- `config.json` – alles Themenspezifische (Name, Farben, Stufen, Schichten, Staffelplan mit Folgen-IDs, Abschnitte, Regeln).
- `content/` – Inhalte (Markdown), Format für Nicht-Programmierer in `content/README.md`. **Inhalte und Code strikt getrennt.**
- `inhalt/` + `manifest.webmanifest` – ERZEUGT von `npm run bauen`. **Nie von Hand bearbeiten** (Test prüft).
- `js/kern/` – themenneutraler Kern (übernehmbar für bim-trainer, siehe `docs/kern.md`); `js/ui/` – Oberfläche, je Ansicht ein Modul;
  `js/sim/` – Simulatoren (lazy geladen, Schnittstelle `js/sim/README.md`); `js/app.js` – nur Start und Routing.
- `werkzeuge/lib/inhaltsformat.mjs` – Parser/Prüfer des Inhaltsformats.

## Regeln
- **Stabile IDs** (Folgen, Fragen, Karten, Übungen, Glossar): nie ändern/löschen – `tests/fixtures/ids.json`, neue mit `npm run ids-aufnehmen`.
  Speicherformat (`js/kern/speicher.js`, Schlüssel `ittrainer.v1`) nur mit Migration und **nach Rückfrage bei Philip**.
- Folgen-Status `entwurf → geprueft → freigegeben`. `geprueft` nur nach bestandenem **unabhängigem Faktencheck** (Subagent, der nicht
  geschrieben hat; Bericht in `docs/faktencheck/`). `freigegeben` erst bei bestandenem Check + grünen Tests. Live zeigt nur `freigegeben`.
- Scheitert ein Faktencheck **zweimal**: Philip fragen. Ebenso bei Kosten/neuen Diensten, Gefahr für den Lernfortschritt,
  grundlegenden Konzept-/Formatänderungen. Alles andere selbst entscheiden und in `CHANGELOG.md` notieren.
- Routinearbeit (Karteikarten aus fertigem Text u. Ä.) an günstigeres Modell (Subagent `sonnet`/`haiku`); Konzept, Didaktik, Faktencheck mit dem starken.
- Mobile first, Tippflächen ≥ 44 px, kleinste Schrift 15 px; Farben nur über CSS-Variablen.
- Neue JS-Datei → `sw.js` (`APP_DATEIEN`); Test prüft. Sichtbare Änderung → `app.version` in `config.json` + Eintrag in `content/neuigkeiten.md`.
- Keine persönlichen Daten in Code/Commits; neutraler Git-Absender ist im Repo eingestellt.

## Befehle
- `npm run bauen` · `npm run pruefen` · `npm test` · `npm run oberflaeche` (Browser-Durchlauf lokal, Bilder: `-- --bilder /workspace/tmp/x`)
- `npm start` → http://127.0.0.1:8080 (nur im Container)
- Icons: `RESVG_ORDNER=/workspace/werkzeuge/resvg node werkzeuge/icons-erzeugen.mjs`

## Veröffentlichen (ohne OK von Philip – Vereinbarung 26.11.2026)
1. Branch → committen → `./deploy.sh vorschau` (lädt hoch und prüft die Vorschau automatisch: Dateien/Links, Handy-Screenshots,
   Folgen durchklicken, Export/Import, offline). Bestanden → Merker `.git/vorschau-geprueft`.
2. `git switch main && git merge --ff-only <branch>` → `./deploy.sh live` (nur main, nur der geprüfte Commit) → `git push origin main`.
3. Push an Philip mit „Was ist neu“. Screenshots selbst ansehen (Automatik findet nicht alles).
- Ausnahme Phase 1 (Grundgerüst + Folge 1): nach dem Livegang auf Philips Feedback zum Format warten.
- GitHub: privates Repo `philipauras/it-trainer` per Deploy-Key `~/.claude/ssh/it-trainer_deploy` (Repo/Key legt Philip an), nur Sicherung.
- Zugangsdaten `~/.claude/secrets/cloudflare.env` – nie anzeigen, nie `source`n.
