# Changelog

Entscheidungen und Änderungen (für Philip kurz erklärt). Neueste oben. Was Nutzer in der App sehen: `content/neuigkeiten.md`.

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
