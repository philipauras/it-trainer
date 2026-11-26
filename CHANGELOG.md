# Changelog

Entscheidungen und Änderungen (für Philip kurz erklärt). Neueste oben. Was Nutzer in der App sehen: `content/neuigkeiten.md`.

## 1.5.0 – 26.11.2026 (eigenständige Folgen + Lernpool, Philips Format-Entscheidung)
- **Jede Folge steht für sich:** keine Rückgriffe auf Bilder/Geschichten anderer Folgen; nötiges Fachwissen in 1–2 Sätzen neu
  erklärt mit Verweis. Prüfpunkt in Faktencheck und Auftragsvorlagen.
- **Lernpool statt Quiz/Karten in der Folge:** Folge = a–f + neuer Schritt g „Auf den Punkt“ (3–4 Kernsätze, Build prüft) mit
  Hinweis „X neue Karten im Lernpool“. `[quiz]`/`[karten]` bleiben in der Folgen-Datei (Autoren haben alles beieinander), erscheinen
  aber nur im Pool – freigeschaltet mit „Folge abschließen“. Tagesrunde (max. 15, davon bis 8 neue, frühere Fehler zuerst, Karten und
  Fragen abwechselnd), Festigkeit je Schicht (Fach/5, Fälliges zählt halb) mit ↻-Runde, Lernpool-Seite mit freiem Üben je Folge/Staffel
  und Prüfung je Staffel (20 Fragen, Auswertung je Folge). „Im Wissen nachlesen“ springt mit `Nachlesen: abschnitt / Zwischenüberschrift`
  an die Stelle, „Zurück zur Runde“ setzt die Runde fort. Freies Üben ändert den Leitner-Plan nur bei Fehlern.
- **Speicherformat bleibt Format 1, nichts geht verloren:** Fragen bekommen optional `fach`/`faellig` (Leitner). Ältere Stände ohne
  diese Felder werden beim Lesen eingeordnet, nicht umgeschrieben. Wer Quiz/Karten im alten Ablauf schon durchgearbeitet hatte, behält
  sie freigeschaltet. Test mit einem echten 1.4.0-Stand (Normalisieren, Zusammenführen, Export/Import).
- Fragen verständnisorientiert umgebaut (IDs unverändert), alle Folgen neu unabhängig geprüft (Durchgang 1: s1f01, 02, 04, 06 bestanden;
  03, 05, 07, 08, 09, s1g je 1–2 kleine Fehler → behoben → bestanden).
- Neues Kernmodul `js/kern/lernpool.js` (getestet), `js/ui/lernpool.js` ersetzt `quiz.js`/`karten.js`; Adresse `#karten` leitet auf `#lernen`.
- GitHub-Sicherung funktioniert (Repo hat die richtige SSH-Einstellung; frühere Fehlmeldungen kamen von meinem eigenen SSH-Befehl).

## 1.4.0 – 26.11.2026 (Phase 2, erster Teil)
- **Neu live:** die ganze Staffel 1 – Folgen 2–9 und das Abschlussprojekt (Addierer). Folge 5: Faktencheck 2× gescheitert (zuletzt 1 kleiner
  Fehler), Durchgang 3 bestanden, Freigabe nach Philips OK.
- **Regel nachgeschärft (Philip):** Nach zwei gescheiterten Faktenchecks nur noch fragen, wenn grundsätzliche fachliche Fehler oder
  Verständnisprobleme bleiben; bei kleinen Detailfehlern (Jahreszahlen, Namen, Formulierungen) korrigieren, weiterer Durchgang, bei
  Bestehen selbst freigeben. Vorschau-Prüfung fand „null“ im Text (deutsches Wort) → umformuliert.
- **Arbeitsweise:** fünf Autoren-Subagenten parallel (je 1–2 Folgen, gemeinsamer Auftrag mit Philips Format-Regeln), Karteikarten
  durch günstigeres Modell, je Folge unabhängiger Faktencheck (Berichte `docs/faktencheck/`). Korrekturen gingen an den jeweiligen
  Autor zurück. Ergebnisse Durchgang 1: s1f04 bestanden, alle anderen 1–3 Fehler; Durchgang 2 bestanden für s1f02, 03, 06, 08, 09, s1g.
  Typische Funde: schiefe Bilder (Treppenhauslicht ist kein ODER, Simultanschach-Zuordnung), „das Sprachmodell läuft auf dem VPS“
  (falsch – dort läuft nur das Programm, das Modell rechnet bei Anthropic), Einheiten/Zuordnungen (50 Hz, Blockgröße).
- **11 neue Simulatoren** (Transistor, Schaltung, Binär, Flipflop/RAM, Prozessor, Zugriffszeit, Zeitscheiben, Dateisystem, Addierer,
  Sortieren, Zuordnen); Simulatoren können `pruefe(optionen)` exportieren – der Build meldet unlösbare Übungen.
- **Glossar** +88 Begriffe (Doppelte beim Zusammenführen bereinigt); Suche zeigt genaue Treffer zuerst.
- **Veröffentlichen aus Worktree** `/workspace/tmp/it-deploy` (Branch `release`), damit parallel entstehende Entwürfe den Deploy
  nicht blockieren (deploy.sh verlangt einen sauberen Stand). Prüfskript: Zeitlimit für Abrufe (ein hängender Abruf blockierte 1.3.0).

## 1.3.0 – 26.11.2026 (Format nach Philips Feedback zu Folge 1)
- **Keine durchgehende Werkstatt-Analogie mehr**: pro Thema das treffendste Alltagsbild, hinkt es, lieber Grafik/Animation.
  Abschnitt d heißt in der App „Im Bild“ (interner Schlüssel bleibt `werkstatt`, weil der Fortschritt besuchte Abschnitte speichert),
  Hinweisbox „Werkstatt“ → „Im Bild“. Folge 1: Parkhaus-Lämpchen statt Werkzeugwand.
- **Stufen** Grundlagen/Aufbau/Vertiefung statt Lehrling/Geselle/Meister (IDs bleiben), Staffelende „Abschlussprojekt“ statt
  Gesellenstück (`art: abschlussprojekt`, Folgen-ID `s1g` bleibt). Werkstatt-Wörter auch aus Schichten-Texten und Glossar entfernt.
- **Mehr Mitmachen**: neue Übung s1f01-u02 (Buchstaben P mit acht Schaltern einstellen); Regel ab jetzt: je Folge ≥ 2 Übungen.
- Faktencheck der Überarbeitung: Durchgang 3 nicht bestanden (Hinkt-Satz schief), Durchgang 4 bestanden. Gezählt als erster
  Fehlschlag des neuen Textes (der Fehlschlag von Durchgang 1 war mit Durchgang 2 erledigt) – daher keine Rückfrage.
- Automatische Oberflächen-Prüfung löst neue Übungen über einen unsichtbaren Haken `_loesen` am Simulator.

## 1.2.0 – 26.11.2026
- **Icon „Rauchglas-Linse“** (Philips Wahl, Runde 8): nur Verläufe, keine Grafik; ersetzt den T-Rex. Android-Fassung: Kugel genau
  im sicheren Kreis (80 %), außen fast Schwarz; Favicon/Logo: Kugel mit durchsichtigen Ecken. Name bleibt „IT“.

## 1.1.0 – 26.11.2026
- **Name „IT“** (statt IT-Trainer) und **Icon T-Rex-Kopf** (8-Bit, 15×15, auf Schwarz, dunkelgrüne Kontur) – Philips Wahl nach
  den Runden 5–7 (feinere 32er-Fassung war ihm zu viel). Nur der angezeigte Name ändert sich: Adresse it-trainer.pages.dev,
  Speicher-Schlüssel, Code-Präfix, Ordner und Repo bleiben, damit kein Lernfortschritt verloren geht.
- Seitentitel nimmt den Namen jetzt aus config.json (vorher fest im Code).

## 1.0.1 – 26.11.2026
- **Neues App-Icon „Kratzspuren“** (Philips Wahl nach vier Entwurfsrunden: Schwert, Energie-Schwert, Schwert auf Arcade-Grund, IT-Motive):
  drei leuchtende Krallenhiebe, 8-Bit-Raster 15×15, auf Arcade-Sonnenuntergang. Entwürfe: `/workspace/entwuerfe/it-trainer-icon`.
  Dateinamen bleiben gleich (neue Cache-Version lädt sie neu); auf dem Handy App einmal neu zum Startbildschirm hinzufügen.

## 1.0.0 – 26.11.2026 (Phase 1: Grundgerüst + Folge 1)
- **Live seit 26.11.2026** (Commit c41673d). Faktencheck Folge 1: Durchgang 1 nicht bestanden (ASCII-Details, „jede Antwort = 1 Bit“
  im Zahlenraten, Laternen-Bild, Mbit/s vs. MB), alles behoben; Durchgang 2 bestanden, Empfehlungen umgesetzt.
- Betrieb: Neue Pages-Adressen bekommen ihr Zertifikat erst nach 1–2 Minuten → Prüfung wartet bis zu 15 Min.; einmal lieferte die
  Cloudflare-API beim Anlegen einen Fehler 500, der zweite Versuch klappte. Prüfskript wartet jetzt auf den asynchron erzeugten Code.
- **Gerüst** nach Vorbild bim-trainer, aber sauber getrennt: `config.json` (Thema), `content/` (Inhalte), `js/kern/` (neutraler Kern),
  `js/ui/` (je Ansicht ein Modul), `js/sim/` (Simulatoren). Aus dem bim-trainer übernommen und verallgemeinert: Service Worker
  mit Update-Schutz (Prüfsummen), `_headers`, `404.html`, Markdown-Renderer, Glossar-Logik, Quiz-Logik, Schrift Barlow, Testaufbau.
- **Eigenes Inhaltsformat** (Markdown mit acht festen Abschnitten a–h, Quiz/Karten/Übungen mit IDs) + Build-Skript, das Fehler mit
  Stelle meldet. Entscheidung: Inhalte werden zu JSON „gebaut“, damit die App nichts parsen muss und Live/Vorschau sich nur im Build unterscheiden.
- **Stabile IDs** von Anfang an eingefroren (`tests/fixtures/ids.json`).
- **Leitner-Karteikasten** (5 Fächer: täglich, 2, 4, 8, 16 Tage; vergessen → Fach 1). Fälligkeit als Kalendertag, damit „morgen“ immer morgen ist.
- **Fortschritt** im Browser (localStorage) + Export/Import als Datei oder kopierbarer Code (gepackt, mit Prüfziffer). Beim Übernehmen
  Wahl „Zusammenführen“ (je Eintrag gewinnt der neuere) oder „Ersetzen“. Kaputte Stände werden beiseitegelegt statt überschrieben.
- **Inhalte cache-first:** Code und Inhalte kommen immer aus derselben installierten Version; neue Inhalte über „Neue Version – Neu laden“.
- **Deploy ohne manuelles OK:** Vorschau → automatische Prüfung im echten Browser (Pixel-7-Format) → live nur der geprüfte Commit von main.
- **App-Icon:** drei gestapelte Schichten (Linien, schlicht – passend zu Philips Vorliebe für Motive ohne Kleinteile).
- **Farbe:** Petrol als Akzent (unterscheidet sich vom Lila des bim-trainers), Grün = richtig, Orange = falsch wie im bim-trainer.
- Folge 1 „Was ist Information? – Das Bit“ mit Simulatoren `bit-schalter` und `zahlenraten`; Karteikarten per günstigerem Modell aus dem
  fertigen Text erzeugt; unabhängiger Faktencheck (Bericht in `docs/faktencheck/`).
