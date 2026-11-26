# Faktencheck s1f05 „Speicher – Flipflop, SRAM, DRAM“, Durchgang 2

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Folge nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-05-speicher.md` (status: entwurf)
Mitgeprüft: Bericht Durchgang 1 (`docs/faktencheck/s1f05-durchgang-1.md`), Glossar-Einträge mit `folge: s1f05` in
`content/glossar.md`, Simulator-Kopf `js/sim/flipflop.js`, Tabelle „Bisher verwendete Hauptbilder“ in `content/README.md`.
Zeilenangaben beziehen sich auf die Folgen-Datei im heutigen Stand.

## 1. Befunde aus Durchgang 1 – Stand der Umsetzung

| Befund D1 | Umsetzung | Ergebnis |
|---|---|---|
| F1 „nachgeholt“ (Z. 103) | „muss nicht ständig aufgefrischt werden (was das heißt, siehst du gleich beim DRAM)“ | **behoben**, korrekt |
| F2 „milliardenfach verkleinert“ (Z. 42) | „enorm verkleinert und milliardenfach vervielfältigt“ | **behoben**, korrekt |
| E1 64/32 ms (Z. 105, q04, k11, Glossar „Auffrischen“) | „mindestens alle 64 Millisekunden an der Reihe (bei DDR5 sogar alle 32), also mindestens fünfzehnmal pro Sekunde“; „schon nach Bruchteilen einer Sekunde“ | korrekt (1000/64 ≈ 15,6; DDR5 tREFW = 32 ms nach JESD79-5). Quelle für DDR5 fehlt im Kopf (E1 unten). Glossar „Kondensator“ noch mit „Millisekunden“ (E2). |
| E2 Hinkt-Satz Ampel (Z. 129) | „drückt jemand genau in dem Moment, in dem Grün kommt, regelt das Programm, was gilt – beim einfachen RS-Flipflop wäre dieses gleichzeitige S und R der verbotene Fall.“ | korrekt, jetzt ein echter Unterschied; passt zur Achtung-Box Z. 76 |
| E3 6T-Zelle als besondere Flipflop-Bauart | nicht umgesetzt | optional, bleibt Empfehlung (E5) |
| E4 Register ≠ SRAM (Z. 103, 113, 117, Glossar SRAM) | „SRAM nur … im Cache … Die Register daneben bestehen ebenfalls aus Flipflops“; Tabelle „dem Cache“; Merke „in den Registern und im schnellen SRAM des Caches“; Glossar SRAM „Steckt in den Caches“ | korrekt umgesetzt |
| E5 q07 umformuliert | „Welche neue Speicherart setzte der Rechner Whirlwind am MIT 1953 als erster Computer ein?“ | **neuer Fehler**, siehe F1; außerdem passen die Antworten grammatisch nicht mehr zur Frage |
| E6 k02/k07 geteilt, neu k10/k11 | k02 „Wie viele Bits …“, k07 „Wie speichert DRAM ein Bit?“, k10 „Woraus besteht ein RS-Flipflop?“, k11 „Warum muss DRAM … aufgefrischt werden?“ | korrekt, je eine Sache |
| E7 Glossar-Dubletten NODER/Elektronenröhre | im Glossar keine doppelten ids mit `folge: s1f05`; „Adresse“ sagt weiter „Speicherzelle“ (Folge: „Speicherzeile“) | weitgehend umgesetzt, Kleinigkeit bleibt (E3) |
| E8 Halbstrom-Prinzip (Z. 32) | „jeder führte nur halb so viel, wie zum Umpolen nötig ist. Nur am Ring an der Kreuzung kamen beide Hälften zusammen“ | korrekt (Koinzidenzstrom-Verfahren) |
| E9 Quellen: Intel 1103 | Text jetzt „ab 1970“ (statt „Oktober 1970“), „erster weit verbreiteter Arbeitsspeicher aus Halbleiterchips“; neue Quelle CHM-Objektseite | korrekt: Die Objektseite sagt wörtlich „the first widely used semiconductor main memory device“ und „1¢ per bit“ (nennt als Objektdatum 1971, das 1970 belegt die Silicon-Engine-Seite). „meistverkauft“ ist entfallen – damit keine unbelegte Aussage mehr. „trigger relay“ steht nicht mehr im Text, Quelle dafür nicht nötig. |
| E10 README | „s1f05 Speicher | Anforderungstaster an der Fußgängerampel“ eingetragen | umgesetzt |

## 2. Erneute Prüfung der ganzen Datei

- **Geschichte (Z. 26–42):** Eccles & Jordan 1918, Röhren-Flipflops der 1940er, Whirlwind/Forrester, 32 × 32, August 1953,
  nichtflüchtig, „core dumped“, Dennard 1966/1967/1968, Intel 1103 (1024 Bit, ~1 Cent/Bit, 3-Transistor-Zelle), 1T-Zelle setzt sich
  wenige Jahre später durch – alles korrekt. Z. 34 „lief Whirlwind zum ersten Mal mit diesem Kernspeicher“ ist richtig (zum ersten
  Mal *für Whirlwind*); siehe aber F1 zum Quiz.
- **Prinzip (Z. 46–117):** ODER mit Rückführung, RS-Flipflop (vier Schritte erneut nachgerechnet, stimmen mit `rs()` im Simulator:
  `Q = NODER(R, nicht Q)`, `nicht Q = NODER(S, Q)`), verbotener Fall, Register (80 = P passt zu Folge 4), Adressen (2/3/32 Bit),
  wahlfreier Zugriff, SRAM/DRAM-Tabelle, Flüchtigkeit – korrekt. Verweise Folge 6 (Prozessor) und Folge 7 (Speicherhierarchie)
  passen zum Staffelplan in `config.json`.
- **Bild (Z. 119–129):** Mechanismus getroffen, „Im Bild“-Box stimmig, Hinkt-Satz jetzt ein echter Unterschied.
- **Übungen:** u01 lösbar (Schrittliste `rsSchritt` = Text), u02 `ziel: 1=0101; 2=1100` richtig (5 = 0101, 12 = 1100, Adressen
  01/10), u03 alle sieben Zuordnungen eindeutig.
- **Quiz:** q01–q06 und q08 je genau eine richtige Antwort, Erklärungen korrekt. q07 siehe F1.
- **Karten k01–k11:** inhaltlich korrekt, je eine Sache (k06 fragt Abkürzung + Bedeutung von „wahlfrei“ – das ist ein Begriff, vertretbar).
- **Bei dir (Z. 291–303):** `free -h` heute erneut: Mem total `3.8Gi`, Swap `4.0Gi` – stimmt. Rechnungen (≈ 4,1 Mrd. Byte,
  ≈ 32,6 Mrd. Bit, ≈ 196 Mrd. ≈ „rund 200 Milliarden“ Transistoren) korrekt. Task-Manager, DDR, Pixel 8–16 GB korrekt.
- **Format/Verständlichkeit:** keine Handwerks-Wörter, Fachbegriffe beim ersten Auftreten erklärt, Ton wie Folge 1.
- **Glossar (`folge: s1f05`):** Arbeitsspeicher, Flipflop, Rückkopplung, Register, Adresse, Wahlfreier Zugriff, SRAM, DRAM,
  Kondensator, Auffrischen, Flüchtig, Kernspeicher – korrekt bis auf „Kernspeicher“ (F1) und Kleinigkeiten (E2, E3).
- Hinweis am Rande (nicht Teil dieser Folge): `npm run pruefen` meldet heute veraltete erzeugte Dateien (`inhalt/index.json`,
  `inhalt/folgen/s1f04.json`) – vor dem Veröffentlichen `npm run bauen`.

## Befunde

### Fehler

**F1 – q07 (Z. 226) und Glossar „Kernspeicher“: Whirlwind war nicht der erste Computer mit Kernspeicher.**
Der Kernspeicher wurde am MIT zuerst im eigens dafür gebauten **Memory Test Computer (MTC)** erprobt (lief ab März 1953, Kernspeicher
ab Ende Mai 1953 in Betrieb) und erst danach, im August 1953, in Whirlwind eingebaut. Wikipedia „Whirlwind I“: „the second to use
magnetic-core memory after it had been proven to work for some months of use on the Memory Test Computer (MTC)“; ebenso
https://gunkies.org/wiki/MTC. Die CHM-Quelle im Kopf sagt nur „debuts“ bzw. „demonstrated its advantages for the first time in August
1953“, nicht „erster Computer“. Die neue Frage behauptet ausdrücklich „als erster Computer“ – eine falsche Aussage im Quiz. (Die
Formulierung stammt aus dem Vorschlag E5 von Durchgang 1; der Fehler liegt also auch beim damaligen Prüfer.)
Zusätzlich passen die Antworten („Mit DRAM-Chips von Intel“ …) grammatisch nicht mehr zur Frage „Welche … Speicherart …?“.
Korrektur q07:
„Welche neue Speicherart bekam der Rechner Whirlwind am MIT im Jahr 1953?“
- [ ] DRAM-Chips von Intel
- [ ] Flipflops aus Transistoren
- [x] Einen Kernspeicher aus Magnetringen
- [ ] Eine Festplatte als Arbeitsspeicher
Erklärung unverändert lassen (sie ist korrekt).
Korrektur Glossar „Kernspeicher“, `mehr`: „1953 am MIT im Rechner Whirlwind eingeführt (Jay Forrester); bis in die 1970er üblich.
Behielt seinen Inhalt auch ohne Strom.“ (statt „Zuerst 1953 im Rechner Whirlwind“).

### Empfehlungen

**E1 – Quellenkopf: DDR5-Wert belegen.** Der Text nennt jetzt 32 ms für DDR5, der Kopf nur JESD79-4 (DDR4). Ergänzen:
„JEDEC: JESD79-5, DDR5 SDRAM Standard (Auffrischfenster 32 ms)“.

**E2 – Glossar „Kondensator“, `mehr`: „schon nach Millisekunden wegsickert“** an die Folge angleichen: „… dass die Ladung schon nach
Bruchteilen einer Sekunde wegsickert.“

**E3 – Glossar „Adresse“, `kurz`: „Speicherzelle“** → „Speicherzeile“ (wie in Folge und k05), oder in der Folge einmal erklären, dass
eine Zeile aus mehreren Zellen besteht.

**E4 – Z. 167 „einige Megabyte SRAM“:** Heutige Desktop-Prozessoren haben oft 16–36 MB L3-Cache, manche über 90 MB. Vorschlag:
„einige bis einige Dutzend Megabyte SRAM“.

**E5 – (aus D1-E3, weiterhin offen) Z. 103: 6-Transistor-Zelle.** Optionaler Halbsatz, dass die SRAM-Zelle ein besonders sparsames
Flipflop aus zwei über Kreuz verbundenen NICHT-Gattern plus zwei „Tür“-Transistoren ist – sonst wundert sich, wer zwei NODER-Gatter
im Kopf hat, über die Zahl sechs.

## Zusammenfassung

F1 und F2 aus Durchgang 1 sind behoben, die übrigen umgesetzten Empfehlungen (64/32 ms, Ampel-Achtung-Satz, Intel 1103 „ab 1970“ mit
CHM-Objektseite, SRAM nur im Cache / Register aus Flipflops, Halbstrom-Prinzip, Karten k10/k11, README) sind korrekt. Neu: 1 Fehler
(q07 „als erster Computer“ und Glossar „Kernspeicher“ – der Memory Test Computer lief vorher mit Kernspeicher), 5 Empfehlungen.

Ergebnis: nicht bestanden
