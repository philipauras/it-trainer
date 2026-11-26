# Faktencheck s1f02 „Strom als Sprache – Vom Relais zum Transistor“, Durchgang 2

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Inhalte nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-02-transistor.md` (status: entwurf), dazu `content/glossar.md` (Einträge mit `folge: s1f02`),
Simulator `js/sim/transistor.js` (Kopfkommentar und Code, CSS `.kanal`/`.draht-an` in `css/app.css`), `content/README.md`,
Bericht Durchgang 1 (`docs/faktencheck/s1f02-durchgang-1.md`).

## Fehler aus Durchgang 1

| Nr. | Befund | Stand |
|---|---|---|
| F1 | Wechselspannung 50- statt 100-mal Richtungswechsel | **behoben** – `[beidir]`: „pendelt 50-mal pro Sekunde hin und her (50 Hertz), die Richtung wechselt also 100-mal pro Sekunde“; Glossar `gleichspannung` gleichlautend. Richtig. |
| F2 | „Der Kanal schließt sich“ | **behoben** – „Die Linie wird durchgehend – der Kanal ist offen für den Strom, er leitet“. Passt zum Simulator (`.kanal` gestrichelt, `.kanal-an` durchgehend). |
| F3 | „In jeder Übung zwei Transistoren“ | **behoben** – „In den ersten beiden Übungen … zwei Transistoren A und B …, in der dritten nur einen.“ |

## Umgesetzte Empfehlungen aus Durchgang 1 – geprüft

- **E1 Z3:** „rund 2 000 Relais (je nach Zählung bis 2 600)“ – korrekt (600 Rechenwerk + 1 400 Speicher = 2 000; englische Wikipedia 2 600, Zuse-Museum Hünfeld ca. 2 200). „Umstritten ist der Titel, weil sie noch keine ‚Wenn–dann‘-Befehle kannte“ – korrekt: Die Z3 hatte keinen bedingten Sprung; dass sie theoretisch dennoch universell ist, zeigte Raúl Rojas erst 1998. Der Satz nennt den Hauptgrund des Streits, das genügt für Einsteiger.
- **E2 Source/Drain:** jetzt „Strom fließt zwischen Source und Drain“ – neutral und richtig.
- **E3:** „Wie passt das zu Folge 1, wo ein Bit nur 0 oder 1 ist und nichts dazwischen?“ und „Eine Spannung rastet nicht ein wie ein Lichtschalter“ – umgesetzt, korrekt.
- **E4 Simulator `nicht`:** Code jetzt `M154 O H200` immer an, `M200 O H R V75` und `M R 125 V U H200` nur bei `!durchT`, `M200 U H L V124` immer an, Abzweig nur bei `durchT` – Stromanimation stimmt nun mit der Physik überein (bei leitendem Transistor fließt Strom durch Widerstand und Abkürzung, nicht durch die Lampe).
- **E5 Karten:** k07 nur noch „hintereinander“ (nur wenn beide → UND), neue **k10** „nebeneinander“ (wenn mindestens einer → ODER) – beide korrekt, je eine Sache, ID k07 erhalten.
- **E6 Takt:** kein zweiter Glossar-Eintrag; der Satz „Zuses Z3 (1941) schaffte etwa 5 Takte pro Sekunde“ steht im bestehenden Eintrag `takt` (Folge 6) – korrekt (Rojas: ≈ 5,3 Hz).
- **E7:** Hauptbild in `content/README.md` eingetragen (`| s1f02 Transistor | Druckgesteuertes Ventil im Wasserkreislauf |`).
- **E8 ENIAC:** „Bei Tausenden Röhren fiel regelmäßig eine aus – anfangs mehrere am Tag“ und q06 „regelmäßig fiel eine aus“ – korrekt (anfangs fielen fast täglich mehrere Röhren aus, später etwa eine alle zwei Tage). Neue Quelle Penn Engineering: Seite erreichbar (HTTP 200); sie nennt „18,000 vacuum tubes“ und „weighed 30 tons“ – passt zur Klammer „gerundet 18 000 Röhren“. Zur Goldstine-Angabe siehe E1 unten.

## Simulator und Text

- `art: relais` – Zunge liegt aus schräg nach oben (y − 16) und klappt beim Einschalten herunter, Text „Die Zunge oben klappt herunter“ passt.
- `art: transistor` (einzeln) – Knopf „Steuerung A“, Beschriftung „▲ Steuerung A“ am Transistor, Kanal gestrichelt → durchgehend; Text passt.
- `anordnung: nicht` – nur ein Knopf „Steuerung A“, Transistor im Abzweig ohne eigene Steuer-Beschriftung, Bauteil-Text „Transistor“. Infozeile „Steuersignal an bei A“ bzw. „kein Steuersignal“. Lampe = NICHT A. Der Übungstext („Der Transistor sitzt in einer Abkürzung an der Lampe vorbei … Widerstand vorn im Kreis“) und die Auflösung („Die Lampe zeigt das Gegenteil von A“) passen genau dazu; der Widerstand sitzt im Simulator tatsächlich vorn (oben links, vor dem Abzweig).
- Achtung-Box „Der Simulator schreibt neutral ‚Steuersignal‘“ – passt zur Infozeile in allen Anordnungen.
- `reihe`/`parallel`: Logik `a && b` bzw. `a || b`, Auflösungstabelle stimmt (nachgerechnet: 0/0/0/1 bzw. 0/1/1/1).

## Ganze Datei erneut geprüft

- **Geschichte:** Morse/Vail 24.05.1844, Henry um 1835 (Princeton), Davy, „Relais“-Wortherkunft, Z3 (12.05.1941, Filmstreifen, ca. 5 Takte/s, Multiplikation ≈ 3 s, 1943 zerstört, Nachbau im Deutschen Museum), Röhre, ENIAC (17 468 Röhren, rund 27 t = 30 US-Tonnen, ≈ 150 kW, ≈ 5 000 Additionen/s, Februar 1946, Zehnersystem), Transistor (16./23.12.1947, Pierce, 1948, Nobelpreis 1956), MOSFET (Atalla/Kahng 1959/1960), Kilby 09/1958, Noyce 1959, Nobelpreis 2000, M1 16 Mrd. – unverändert korrekt.
- **Prinzip:** Spannung/Strom/Stromkreis, TTL-Pegel (0,8/2,0 V Eingang, 0,4/2,4 V Ausgang, Störabstand 0,4 V), Auffrischen, Takt (Verweis Folge 6), Relais, MOSFET mit benannter Vereinfachung – korrekt.
- **Bild (Ventil):** unverändert stimmig, Hinkt-Satz nennt einen echten Unterschied.
- **Übungen:** alle drei lösbar, Anleitung jetzt eindeutig.
- **Quiz q01–q07:** je genau eine richtige Antwort, Erklärungen korrekt, `Nachlesen` passend.
- **Karten k01–k10:** korrekt, je eine Sache.
- **Wo steckt das bei dir?:** 230 V/50 Hz, USB 5 V/9 V, ATX 12/5/3,3 V, Prozessor ≈ 1 V, Flash mit mehreren Bits je Zelle, VPS – korrekt.
- **Format:** keine verbotenen Werkstatt-/Handwerkswörter; Fachbegriffe beim ersten Auftreten erklärt.
- **Glossar (`folge: s1f02`):** spannung, strom, stromkreis, relais, elektronenroehre, transistor, mosfet, gate, halbleiter, silizium, chip, gleichspannung – alle korrekt. Relais-Eintrag „rund 2 000 Relais“ passt zum Text.

## Befunde

Keine Fehler.

**E1 – Empfehlung: Goldstine als Beleg für „17 468“ prüfen oder ersetzen.**
Fundstelle: Kopf, Quelle „Penn Engineering: ENIAC (gerundet 18 000 Röhren; genaue Zahl 17 468 nach Goldstine, The Computer from Pascal to von Neumann, 1972)“.
Das Buch existiert (Princeton University Press, 1972) und behandelt den ENIAC ausführlich, aber dass genau die Zahl 17 468 darin steht, ließ sich
online nicht bestätigen. Die Zahl selbst ist weit verbreitet und vertretbar (u. a. Britannica nennt „about 18,000“; 17 468 ist die übliche genaue Angabe für 1946,
gegen Ende der Laufzeit waren es rund 18 000). Vorschlag: Goldstine nur nennen, wenn die Seitenzahl bekannt ist; sonst die Klammer kürzen zu
„(nennt gerundet 18 000 Röhren und 30 US-Tonnen)“ – die genaue Zahl 17 468 ist durch die gängige Literatur gedeckt, oder im Text „rund 17 500 Röhren“ schreiben.

**E2 – Empfehlung (außerhalb dieser Folge): `npm run pruefen` meldet veraltete erzeugte Dateien.**
`inhalt/index.json` und `inhalt/folgen/s1f04.json` weichen ab – betrifft Folge 4, nicht s1f02. Vor dem nächsten Deploy `npm run bauen` ausführen.
Hinweis: Die IDs von s1f02 (q01–q07, k01–k10, u01–u03) stehen noch nicht in `tests/fixtures/ids.json`; bei Freigabe `npm run ids-aufnehmen`.

## Zusammenfassung

F1–F3 aus Durchgang 1 sind behoben, alle acht Empfehlungen wurden korrekt umgesetzt (Z3-Relaiszahl und „Wenn–dann“, ENIAC-Ausfälle,
Penn-Engineering-Quelle, Karte k10, Simulator-Animation, Glossar). Text und korrigierter Simulator passen zusammen. 0 Fehler, 2 Empfehlungen.

Ergebnis: bestanden
