# Auftrag: Folgen der Staffel 1 für die Lern-App „IT“ schreiben

Du schreibst Folgen für die Lern-App „IT“ (Projekt `/workspace/it-trainer`). Zielperson: Philip, IT-Einsteiger, lernt Schritt
für Schritt, liest auf dem Pixel-Handy. Ton: wie eine gute Arte-Doku – erzählend, neugierig machend, präzise, Deutsch, Du-Form.
Ziel 15–20 Minuten je Folge.

## Zuerst lesen
1. `/workspace/it-trainer/content/README.md` – **das Format ist verbindlich** (8 Abschnitte, Quiz-/Karten-/Übungsformat,
   IDs, Glossar). Besonders: Abschnitt „Bilder, Grafiken und Mitmachen“ (neue Regeln von Philip!).
2. `/workspace/it-trainer/content/staffel-1/folge-01-bit.md` – fertige Beispielfolge (Länge, Ton, Aufbau, Boxen).
3. `/workspace/it-trainer/config.json` → `staffeln[0].folgen` – Titel/Untertitel deiner Folge (stehen NUR dort).
4. `/workspace/it-trainer/content/glossar.md` – vorhandene Begriffe (nicht doppelt anlegen).
5. Für jeden Simulator, den du benutzt, die Kopfzeilen-Kommentare in `/workspace/it-trainer/js/sim/<name>.js` (Optionen!).

## Philips Format-Regeln (26.11.2026) – unbedingt einhalten
- **Keine Werkstatt-Analogie** und keine Handwerks-Wörter (Lehrling, Geselle, Meister, Gesellenstück, Werkbank, Werkstattmeister).
- Abschnitt `[werkstatt]` (heißt in der App „Im Bild“): EIN Alltagsbild, das den **Mechanismus** trifft (Vorschlag unten, du darfst
  ein besseres wählen, aber keines, das schon verwendet wurde – Liste in README). Box `> **Im Bild:** …` mit „Bild-Teil = Computer-Teil“.
  Danach `> **Achtung:** …` – ehrlich, wo das Bild hinkt (ein bis zwei Sätze; ein ECHTER Unterschied, keine Scheinkritik).
  Hinkt ein Bild zu sehr: lieber Grafik/Simulator in diesem Abschnitt.
- **Mehr Mitmachen**: Philip mag die interaktiven Schalter und Übungen am meisten. Im `[prinzip]` mind. ein Simulator, im `[selbst]`
  **mindestens zwei Übungen** (Simulator mit `id: <folge>-u01`, `-u02` …), dazwischen kurze Anleitung und hinterher Auflösung/Erklärung.
- Box-Marken nur: `Merke`, `Im Bild`, `Achtung`, `Beispiel`, `Wusstest du?`.

## Jede Folge steht für sich (Philip, 26.11.2026)
- Bild und Geschichte gehören nur zu ihrer Folge – keine Rückgriffe auf Bilder/Geschichten früherer Folgen.
- Fachwissen von vorher in 1–2 Sätzen neu erklären, mit Verweis („mehr in Folge 3“). Ein früheres Bild nie voraussetzen.

## Ende der Folge und Lernpool
- `[fazit]` „Auf den Punkt“: 3–4 Kernsätze als Liste. Danach `[quiz]` und `[karten]` – sie erscheinen nicht in der Folge,
  sondern im Lernpool (README). Fragen verständnisorientiert, für sich allein verständlich, `Nachlesen:` mit Stelle wo sinnvoll.

## Fachliche Sorgfalt
- Jede Jahreszahl, Zahl, Person muss stimmen; lieber weglassen als raten. Ungefähre Zahlen als ungefähr kennzeichnen („etwa“).
- Quellen im Kopf (`quellen:`) – echte, prüfbare Quellen (Originalarbeiten, Museen, Hersteller, Standardwerke), mit https-Link wo möglich.
- Vereinfachen ja, Falsches nein. Wo vereinfacht wird, kurz sagen („in Wirklichkeit etwas komplizierter: …“).
- Ein unabhängiger Faktenprüfer prüft danach alles, auch ob die Bilder stimmen und die Übungen lösbar sind.
- Fachliche Rückbezüge (mit kurzer Neu-Erklärung) und Ausblicke sind erlaubt, Bilder/Geschichten anderer Folgen nicht.

## Technisches
- Datei: `content/staffel-1/folge-NN-stichwort.md`, Kopf mit `id`, `status: entwurf`, `dauer`, `quellen`. Kein `faktencheck:`.
- Quiz: mindestens 5 Fragen (`<folge>-q01` …), Antworten ähnlich lang, plausible Ablenker, Erklärung + `Nachlesen:`.
- **Karteikarten schreibst du NICHT** (macht danach ein anderes Modell). Schreib unter `## [karten] Für deinen Karteikasten` nur
  eine Zeile `KARTEN-FOLGEN`. `npm run bauen` meldet dann fehlende Karten – diese eine Meldung ignorieren, alle anderen beheben.
- **Glossar**: neue Fachbegriffe NICHT in `content/glossar.md` eintragen (andere schreiben parallel), sondern in eine eigene Datei
  `/workspace/tmp/glossar-neu/<folgen-id>.md (danach zusammenführen, Doppelte entfernen)` im Glossar-Format (README, Abschnitt Glossar; `folge:` = deine Folge). Nur Begriffe,
  die noch nicht in glossar.md stehen; ID Kleinbuchstaben/Bindestriche. Ein Begriff, der zu einer anderen Folge gehört (z. B.
  „Register“ → s1f06), trotzdem anlegen, wenn du ihn benutzt – Doppelte bereinige ich.
- Prüfen mit `cd /workspace/it-trainer && npm run bauen` (meldet Formatfehler mit Stelle). NICHT `npm run ids-aufnehmen`,
  nichts committen, keine anderen Dateien ändern (kein Code, kein config.json, keine Folgen anderer).
- Simulator-Optionen exakt wie im Kopfkommentar der Sim-Datei. Übungen müssen mit den gegebenen Optionen lösbar sein.
- Kein HTML, Links nur https.

## „Wo steckt das bei dir?“ – Philips Systeme
VPS (gemieteter Server, 1 vCPU, 3,8 GB RAM, Linux), darauf der Agent (Claude) in einem Docker-Container; bim-trainer und diese
App auf Cloudflare Pages; Windows-PC; Pixel-Handy (Android). Konkret mit Zahlen, wo es sicher stimmt; keine erfundenen Modell-Details.

## Am Ende
Antworte knapp: Datei(en), gewähltes Bild je Folge, Übungen (IDs + Simulator), offene Unsicherheiten, die der Faktenprüfer
besonders ansehen sollte.
