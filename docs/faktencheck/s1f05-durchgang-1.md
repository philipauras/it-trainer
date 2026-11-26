# Faktencheck s1f05 „Speicher – Flipflop, SRAM, DRAM“, Durchgang 1

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Folge nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-05-speicher.md` (status: entwurf)
Mitgeprüft: Glossar-Vorschläge `/workspace/tmp/glossar-neu/s1f05.md`, Simulatoren `js/sim/flipflop.js` (art: sr, art: ram) und
`js/sim/zuordnen.js`, Regeln in `content/README.md` (Abschnitt „Bilder, Grafiken und Mitmachen“), Ton und Niveau von `folge-01-bit.md`.
Zeilenangaben beziehen sich auf die Folgen-Datei.

## 1. Fakten – geprüft und korrekt

| Aussage | Ergebnis |
|---|---|
| Eccles & Jordan, Patent 1918, GB 148,582 „Improvements in ionic relays“, zwei Röhren über Kreuz, zwei stabile Zustände (Z. 25) | korrekt (angemeldet 21.06.1918, veröffentlicht 1920). „trigger relay“ stammt aus ihrem Aufsatz von 1919 (siehe E9). |
| Röhren-Flipflops in den Rechnern der 1940er (ENIAC-Akkumulatoren u. a.), teuer, ein Röhrenpaar pro Bit (Z. 27) | korrekt |
| Whirlwind, MIT, Jay Forrester; vorher unzuverlässiger Speicher (elektrostatische Speicherröhren) (Z. 31) | korrekt (CHM: „troubled electrostatic CRT memory“) |
| Kernspeicher-Ebene 32 × 32 = 1024 Kerne (Z. 31) | korrekt (CHM: „a 32 by 32 array (called a plane) of 1024 cores“) |
| August 1953 erster Betrieb mit Kernspeicher; schneller, zuverlässiger, nichtflüchtig (Z. 33) | korrekt (CHM: „for the first time in August 1953“; „non-volatile storage“) |
| Kernspeicher häufigster Arbeitsspeicher bis in die 1970er, oft von Hand gefädelt; „core dumped“ (Z. 33–35) | korrekt |
| Dennard, IBM, Idee 1966, 6-Transistor-Zelle als Ausgangsproblem, Patent angemeldet 1967, erteilt 1968, US 3,387,286 „Field-effect transistor memory“ (Z. 39, Quellenkopf) | korrekt (angemeldet 14.07.1967, erteilt 04.06.1968) |
| Intel 1103: Oktober 1970, 1024 Bit, ca. 1 Cent/Bit, 3-Transistor-Zelle, bald meistverkaufter Speicherchip (Z. 41) | korrekt. 1 Cent/Bit und 1024 Bit laut CHM; 3T-Zelle (Regitz/Honeywell) und Oktober 1970 Fachliteratur-Konsens; „meistverkaufter Halbleiter-Speicherchip“ ab 1971/72 belegt. Datum und Verkaufsrang stehen nicht in der angegebenen CHM-Quelle (siehe E9). |
| 1T-Zelle setzt sich wenige Jahre später durch (Z. 41) | korrekt (4-Kbit-Generation ab ca. 1973) |
| 2 Adressbits → 4, 3 → 8, 32 → „gut vier Milliarden“ (Z. 90) | korrekt (2³² = 4 294 967 296) |
| SRAM-Zelle 6 Transistoren, DRAM 1 Transistor + 1 Kondensator, Tabelle Z. 106–112 | korrekt |
| SRAM nach dem Wiedereinschalten in zufälligem Zustand (Z. 114) | korrekt |
| Auffrischen spätestens alle 64 ms (JEDEC JESD79-4, DDR4) (Z. 104) | als Obergrenze korrekt; DDR5 verlangt 32 ms (siehe E1) |
| `free -h` auf dem VPS: Mem total `3.8Gi`, Swap `4.0Gi` (Z. 282, 286) | korrekt, heute nachgeprüft |
| 3,8 GiB = 3,8 × 1 073 741 824 ≈ 4,08 Mrd. Byte; × 8 ≈ 32,6 Mrd. Bit (Z. 282) | korrekt („etwa 4,1 Milliarden“, „gut 32 Milliarden“) |
| SRAM-Gedankenexperiment: 32,6 Mrd. × 6 ≈ 196 Mrd. ≈ „rund 200 Milliarden Transistoren“ (Z. 284) | korrekt |
| Pixel 8–16 GB RAM (Z. 292) | korrekt (Pixel 7/8: 8 GB, 8 Pro/9/10: 12 GB, 9 Pro/10 Pro: 16 GB; a-Modelle 8 GB) |
| Task-Manager Strg + Umschalt + Esc, Leistung → Arbeitsspeicher; DDR = Double Data Rate (Z. 290) | korrekt; Typanzeige je nach PC/Build, „meist“ ist passend vorsichtig |

## 2. Prinzip, Simulatoren, Übungen – nachgerechnet

- **ODER mit Rückführung (Z. 49–51):** richtig; hält die 1 für immer, Löschen unmöglich. Gute Hinführung.
- **RS-Flipflop (Z. 55–77):** Die Schrittfolge stimmt mit dem Simulator überein: `Q = NODER(R, nicht Q)`, `nicht Q = NODER(S, Q)`,
  im Bild sitzt R oben (Gatter mit Ausgang Q), S unten. Alle vier Schritte nachgerechnet: S an → nicht Q = 0, Q = 1; S aus → hält 1;
  R an → Q = 0, nicht Q = 1; R aus → hält 0. Fall S = R = 1: beide Ausgänge 0 – Text, Achtung-Box und Simulator-Hinweis stimmen überein.
- **Übung 1 (s1f05-u01):** lösbar, Schrittliste steht tatsächlich über der Schaltung (Reihenfolge im DOM: Ziel, Liste, Schalter, Bild).
  Die Folgerung „gleiche Eingänge, verschiedener Ausgang → Zustand hängt von der Vorgeschichte ab“ ist korrekt.
- **RAM-Simulator / Übung 2 (s1f05-u02):** Adresse = A1·2 + A0, Daten links D3 … rechts D0. 5 = `0101`, 12 = `1100`, Adresse 1 = `01`
  (A1 aus, A0 an), Adresse 2 = `10`. `ziel: 1=0101; 2=1100` ist gültig (pruefe-Regel). „Unter der Tabelle siehst du, was beim Lesen
  herauskommt“ stimmt (Info-Zeile „Lesen ergibt …“). Lösbar und eindeutig.
- **Flipflop/SRAM vs. DRAM:** Der Simulator beschriftet die Zeilen „Inhalt (4 Flipflops)“; der Text sagt in Z. 102 ausdrücklich „In unserem
  Mini-Speicher besteht jede Zeile aus vier Flipflops. Solchen Speicher gibt es wirklich, er heißt SRAM“ und grenzt danach DRAM sauber ab.
  Das passt zusammen; es entsteht nicht der Eindruck, der Arbeitsspeicher bestehe aus Flipflops. Feinheiten in E3/E4.
- **Übung 3 (s1f05-u03):** alle sieben Zuordnungen eindeutig und richtig.

## 3. Das Bild: Taster an der Fußgängerampel

- In Deutschland sehr verbreitet: gelbe Anforderungstaster (Fußgänger-Signalgeber) mit Leuchtfeld „Signal kommt“, das nach dem Drücken
  leuchtet und mit Beginn von Grün erlischt. Das Bild ist realistisch und allen vertraut. Noch nicht als Hauptbild verwendet.
- **Mechanismus getroffen:** Druck = S, Leuchtfeld = Q, bleibt nach Loslassen = Speichern, Grün = R. Die Vorhersage-Probe gelingt
  (mehrfaches Drücken ändert nichts; nach Grün ist neuer Druck nötig) – beides stimmt am echten Taster und am Flipflop.
- „Im Bild“-Box vorhanden und stimmig, q08 passt dazu.
- Hinkt-Satz: Der erste Teil (Steuergerät statt Flipflop) stimmt. Der zweite Teil ist schwach (siehe E2).

## 4. Quiz und Karteikarten

- q01–q06, q08: je genau eine richtige Antwort, Erklärungen korrekt, `Nachlesen` sinnvoll.
- q07: Lösung richtig, Frage aber missverständlich formuliert (siehe E5).
- Karten k01, k03–k06, k08, k09 korrekt; k02 und k07 fragen zwei Dinge (siehe E6).

## 5. Format und Verständlichkeit

Keine Handwerks-Wörter (nur der vorgeschriebene Abschnittsname `[werkstatt]`). Fachbegriffe (Rückkopplung, NODER, Register, Adresse,
Cache, Kondensator, Auffrischen, flüchtig) werden beim ersten Auftreten erklärt. Ton und Niveau passen zu Folge 1. Simulator im Prinzip
und drei Übungen vorhanden.

## Befunde

### Fehler

**F1 – Z. 102: falsches Wort „nachgeholt“.**
„Er ist sehr schnell und muss nicht nachgeholt werden“ ergibt keinen Sinn; gemeint ist „aufgefrischt“. Der Begriff kommt aber erst im
nächsten Absatz. Ein Einsteiger kann den Satz nicht verstehen.
Korrektur: „Er ist sehr schnell und muss nicht ständig aufgefrischt werden (was das heißt, siehst du gleich beim DRAM) – aber jede Zelle
braucht sechs Transistoren.“

**F2 – Z. 41: „milliardenfach verkleinert“ ist zahlenmäßig falsch.**
Wörtlich gelesen behauptet der Satz, die Zelle sei um den Faktor eine Milliarde kleiner geworden. Tatsächlich schrumpfte die Fläche einer
DRAM-Zelle von einigen hundert bis tausend µm² (frühe 1970er) auf etwa 0,002 µm² heute – rund eine Million mal, in der Länge etwa
tausendmal. Vermutlich ist „milliardenfach vorhanden“ gemeint.
Korrektur: „… und Dennards Zelle steckt bis heute, enorm verkleinert und milliardenfach vervielfältigt, in jedem Computer, jedem Server
und jedem Handy.“

### Empfehlungen

**E1 – Z. 104 (auch q04, k07, Glossar „Auffrischen“): 64 ms gilt für DDR4, DDR5 frischt alle 32 ms auf.**
„spätestens alle 64 Millisekunden“ bleibt als Obergrenze richtig, aber „also gut fünfzehnmal pro Sekunde“ klingt nach dem genauen Wert;
in „Wo steckt das bei dir?“ wird DDR5 als typisch genannt (dort 32 ms ≈ 31-mal pro Sekunde). Außerdem halten die meisten Zellen ihre
Ladung deutlich länger; 64 ms ist der garantierte Sicherheitsabstand für die schwächsten Zellen. Vorschlag: „Bei üblichen Speicherriegeln
ist jede Zeile mindestens alle 64 Millisekunden an der Reihe (bei DDR5 sogar alle 32), also mindestens fünfzehnmal pro Sekunde …“ und
„sickert langsam weg, schon nach Bruchteilen einer Sekunde“ statt „innerhalb von Millisekunden“ (Z. 104, 203, 270).

**E2 – Z. 128: zweiter Hinkt-Satz ist kein echter Unterschied.**
Auch beim Flipflop wird R von einer angeschlossenen Schaltung ausgelöst – genau wie hier von der Ampelsteuerung. Ein echter, lehrreicher
Unterschied wäre der verbotene Fall: Drückt man, während die Ampel gerade auf Grün schaltet, kämen S und R gleichzeitig; das Steuergerät
entscheidet dann nach festen Regeln (z. B. Anforderung fürs nächste Mal merken), ein einfaches RS-Flipflop dagegen landet in einem
unvorhersagbaren Zustand. Vorschlag für den zweiten Satz: „Und drückt jemand genau in dem Moment, in dem Grün kommt, regelt das Programm,
was gilt – beim einfachen RS-Flipflop wäre dieses gleichzeitige S und R der verbotene Fall.“

**E3 – Z. 102/108: 6-Transistor-Zelle ist eine besondere Flipflop-Bauart.**
Wer das NODER-Flipflop aus dem Simulator im Kopf hat, rechnet sonst nicht nach, warum es sechs Transistoren sind (zwei CMOS-NODER hätten
acht). Optionaler Halbsatz: „… jede Zelle braucht sechs Transistoren: ein besonders sparsames Flipflop aus zwei über Kreuz verbundenen
NICHT-Gattern plus zwei Transistoren als Tür zur Datenleitung.“

**E4 – Z. 102, Tabelle Z. 112, Merke Z. 116: Register sind meist Flipflops, nicht „SRAM“.**
Z. 81 sagt richtig, dass Register aus getakteten Flipflops bestehen; danach heißt es „SRAM steckt … in den Registern“. Fachlich nennt man
Register üblicherweise nicht SRAM (Registerdateien sind teils SRAM-ähnlich). Für Einsteiger vertretbar. Präziser: „Flipflops stecken in
den Registern, SRAM-Zellen im Cache“ bzw. Tabellenzeile „Steckt in: Cache (Register: Flipflops)“.

**E5 – q07 (Z. 225): Frage missverständlich.**
„Womit lief der Rechner Whirlwind … als erster Computer?“ lässt sich lesen als „Whirlwind war der erste Computer“. Vorschlag: „Welche
neue Speicherart setzte der Rechner Whirlwind am MIT 1953 als erster Computer ein?“

**E6 – Karten k02 und k07 (Z. 248, 268): je zwei Fragen.**
Regel „eine Sache je Karte“. k02 teilen in „Wie viele Bits speichert ein Flipflop?“ / „Woraus besteht ein RS-Flipflop?“; k07 teilen in
„Wie speichert DRAM ein Bit?“ / „Warum muss DRAM aufgefrischt werden?“.

**E7 – Glossar-Vorschläge: NODER und Elektronenröhre gibt es schon.**
Alle übrigen Vorschläge stehen bereits wortgleich in `content/glossar.md` und sind korrekt. `noder` (s1f03) und `elektronenroehre`
(s1f02) existieren schon; eine Übernahme ergäbe doppelte ids. Außerdem ist „nur dann 1, wenn beide Eingänge 0 sind“ enger als der
bestehende Eintrag („alle Eingänge“). Vorschlag: beide Einträge verwerfen, höchstens beim bestehenden NODER unter `mehr` ergänzen:
„Zwei über Kreuz verbundene NODER-Gatter ergeben ein RS-Flipflop.“ Kleinigkeit: Glossar „Adresse“ sagt „Speicherzelle“, die Folge
„Speicherzeile“ – vereinheitlichen.

**E8 – Z. 31: Koinzidenzprinzip einen Halbsatz genauer.**
„Ein Strom durch einen waagerechten und einen senkrechten Draht zugleich traf genau einen Ring“ – das Entscheidende ist, dass jeder
Draht nur den halben nötigen Strom führt; erst an der Kreuzung reicht es zum Ummagnetisieren. Vorschlag: „Jeder Draht führte nur halb so
viel Strom, wie zum Umpolen nötig ist; nur am Ring an der Kreuzung kamen beide Hälften zusammen.“

**E9 – Quellenkopf ergänzen.**
(a) Die Bezeichnung „trigger relay“ stammt aus dem Aufsatz W. H. Eccles, F. W. Jordan: „A trigger relay utilising three-electrode
thermionic vacuum tubes“, The Electrician 83, 1919 (bzw. Radio Review 1, 1919), nicht aus dem Patent – Quelle ergänzen.
(b) Oktober 1970 und „meistverkaufter Speicherchip“ stehen nicht auf der angegebenen CHM-Seite; eine Quelle dafür ergänzen (z. B. die CHM-Ausstellung
„Revolution“, Geschichte „MOS DRAMs Replace Magnetic Core Arrays“: https://www.computerhistory.org/revolution/story/368, oder Intels
Firmengeschichte – vor dem Eintragen prüfen, dass Datum und Verkaufsrang dort genannt sind).

**E10 – README pflegen.**
Die Ampel als Hauptbild von s1f05 in die Tabelle „Bisher verwendete Hauptbilder“ in `content/README.md` eintragen, damit sie nicht
wiederverwendet wird.

## Zusammenfassung

2 Fehler (F1 falsches Wort „nachgeholt“, F2 „milliardenfach verkleinert“), 10 Empfehlungen. Alle geforderten Schwerpunkte
(Eccles & Jordan, Whirlwind, Dennard, Intel 1103, 64 ms, Flipflop/SRAM/DRAM-Trennung, Ampelbild, Rechnungen, Pixel, RS-Übung)
sind inhaltlich korrekt bzw. nur mit den genannten Präzisierungen zu versehen.

Ergebnis: nicht bestanden
