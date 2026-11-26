# Faktencheck s1f05 „Speicher – Flipflop, SRAM, DRAM“, Durchgang 3

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Folge nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-05-speicher.md` (status: entwurf)
Mitgeprüft: Berichte Durchgang 1 und 2, alle Glossar-Einträge mit `folge: s1f05` in `content/glossar.md` (ram, flipflop,
rueckkopplung, register, adresse, wahlfreier-zugriff, sram, dram, kondensator, auffrischen, fluechtig, kernspeicher),
Simulator-Kopf `js/sim/flipflop.js`, Tabelle „Bisher verwendete Hauptbilder“ in `content/README.md`, `npm run pruefen`.
Zeilenangaben beziehen sich auf die Folgen-Datei im heutigen Stand.

## 1. F1 aus Durchgang 2 – Stand der Umsetzung

| Stelle | Heute | Ergebnis |
|---|---|---|
| q07 (Z. 225–232) | „Welche neue Speicherart bekam der Rechner Whirlwind am MIT im Jahr 1953?“ – Antworten „DRAM-Chips von Intel“, „Flipflops aus Transistoren“, **„Einen Kernspeicher aus Magnetringen“**, „Eine Festplatte als Arbeitsspeicher“ | **behoben.** Keine Behauptung „als erster Computer“ mehr; die Antworten passen grammatisch zu „bekam“; genau eine richtige Antwort; Erklärung korrekt. |
| Glossar `kernspeicher`, `mehr` | „Entwickelt am MIT (Jay Forrester), 1953 im Rechner Whirlwind eingebaut; bis in die 1970er üblich. Behielt seinen Inhalt auch ohne Strom.“ | **behoben.** „Zuerst“ ist entfallen; „1953 in Whirlwind eingebaut“ stimmt (August 1953, nach dem Memory Test Computer). Feinheit zu „Entwickelt am MIT“ siehe E7. |

Der Fließtext Z. 34 („lief Whirlwind zum ersten Mal mit diesem Kernspeicher“) war schon in Durchgang 2 korrekt und ist unverändert.

## 2. Erneute vollständige Prüfung

- **Quellenkopf:** Eccles/Jordan GB 148,582 (1918/1920), CHM Whirlwind, Dennard US 3,387,286 (1967/4. Juni 1968), NIHF Dennard,
  CHM Silicon Engine 1970 und CHM-Objektseite Intel 1103, JESD79-4, Petzold „Code“ 2. Aufl. 2022 – passend zu den Aussagen im Text.
  DDR5-Wert weiterhin ohne eigene Quelle (E1).
- **Geschichte (Z. 26–42):** Eccles & Jordan 1918, zwei stabile Zustände, Name „Flipflop“ später; Röhren-Flipflops der 1940er,
  ein Röhrenpaar pro Bit; Whirlwind/Forrester, vorher unzuverlässiger Speicher, Ebenen 32 × 32, Halbstrom-Koinzidenzprinzip korrekt
  beschrieben; August 1953; nichtflüchtig; bis in die 1970er häufigster Arbeitsspeicher, oft von Hand gefädelt; „core dumped“;
  Dennard IBM, 6-Transistor-Zelle als Ausgangsproblem, Idee 1966, Anmeldung 1967, Erteilung 1968; Intel 1103 ab 1970, 1024 Bit,
  ca. 1 Cent/Bit, erster weit verbreiteter Halbleiter-Arbeitsspeicher, 3-Transistor-Zelle; 1T-Zelle wenige Jahre später;
  „enorm verkleinert und milliardenfach vervielfältigt“ – alles korrekt. Kleinigkeit Z. 34 siehe E6.
- **Prinzip (Z. 46–117):** ODER mit Rückführung (merkt sich die 1 für immer) korrekt. RS-Flipflop: vier Schritte erneut
  nachgerechnet mit `rs()` (`Q = NODER(R, nicht Q)`, `nicht Q = NODER(S, Q)`, R oben, S unten) – stimmen. Verbotener Fall
  S = R = 1 (beide Ausgänge 0, Loslassen unvorhersagbar) korrekt. Register (8 Flipflops, 80 = „P“, getaktete Flipflops) korrekt.
  Adressen 2 Bit → 4, 3 → 8, 32 → gut 4 Milliarden (2³² = 4 294 967 296) korrekt. Wahlfreier Zugriff vertretbar vereinfacht.
  SRAM 6 Transistoren / Cache, Register aus Flipflops, DRAM 1T1C, Auffrischen ≤ 64 ms (DDR5 32 ms), 1000/64 ≈ 15,6 →
  „mindestens fünfzehnmal pro Sekunde“ korrekt. Tabelle und Flüchtigkeit (SRAM zufälliger Zustand nach Einschalten) korrekt.
- **Bild (Z. 119–129):** Anforderungstaster „Signal kommt“ – Mechanismus getroffen (S = Druck, Q = Lämpchen, R = Grün),
  Vorhersagen (mehrfach drücken ändert nichts; nach Grün neuer Druck nötig) stimmen, „Im Bild“-Box stimmig, Hinkt-Satz
  (Steuergerät; gleichzeitiges S und R als verbotener Fall) ist ein echter Unterschied. In der README-Tabelle eingetragen.
- **Übungen:** u01 lösbar, Text = `rsSchritt`-Schritte, Folgerung (gleiche Eingänge, verschiedener Ausgang) korrekt.
  u02: 5 = `0101`, 12 = `1100`, Adresse 1 = `01`, 2 = `10`, `ziel: 1=0101; 2=1100` passt zum Simulator-Format. u03: alle sieben
  Zuordnungen eindeutig und richtig.
- **Quiz q01–q08:** je genau eine richtige Antwort, Erklärungen korrekt, `Nachlesen:` passend, keine missverständlichen Ablenker.
- **Karten k01–k11:** alle korrekt; je eine Sache (k06 Abkürzung + Bedeutung eines Begriffs – vertretbar; k08 ein Vergleich).
- **Bei dir (Z. 291–303):** `free -h` heute erneut: Mem total `3.8Gi`, Swap `4.0Gi` – stimmt. 3,8 GiB ≈ 4,08 Mrd. Byte,
  ≈ 32,6 Mrd. Bit, × 6 ≈ 196 Mrd. ≈ „rund 200 Milliarden Transistoren“ korrekt. Task-Manager (Strg + Umschalt + Esc,
  Leistung → Arbeitsspeicher), DDR = Double Data Rate, Pixel 8–16 GB korrekt.
- **Glossar (`folge: s1f05`):** alle zwölf Einträge inhaltlich korrekt; offene Kleinigkeiten E2, E3, E7.
- **Format/Verständlichkeit:** keine Handwerks-Wörter (nur der vorgeschriebene Abschnittsname `[werkstatt]`), Fachbegriffe beim
  ersten Auftreten erklärt, Ton und Niveau wie Folge 1. `npm run pruefen`: „Inhalte gültig (10 Folgen), erzeugte Dateien aktuell“.

## Befunde

### Fehler

Keine.

### Empfehlungen

**E1 – Quellenkopf: DDR5-Wert belegen** (aus D2-E1, offen). Ergänzen: „JEDEC: JESD79-5, DDR5 SDRAM Standard
(Auffrischfenster 32 ms)“.

**E2 – Glossar `kondensator`, `mehr`** (aus D2-E2, offen): „schon nach Millisekunden wegsickert“ → „schon nach Bruchteilen einer
Sekunde wegsickert“ (wie Z. 105, q04, k11). Optional auch `kurz` allgemeiner halten („Geladen = 1, leer = 0“ gilt nur in der
DRAM-Zelle), z. B. „In einer DRAM-Zelle: geladen = 1, leer = 0.“

**E3 – Glossar `adresse`, `kurz`/`mehr`** (aus D2-E3, offen): „Speicherzelle“/„Zellen“ → „Speicherzeile“/„Zeilen“ wie in Folge und k05.

**E4 – Z. 167 „einige Megabyte SRAM“** (aus D2-E4, offen): heutige Desktop-Prozessoren haben oft 16–36 MB L3-Cache, manche über
90 MB. Vorschlag: „einige bis einige Dutzend Megabyte SRAM“.

**E5 – Z. 103: 6-Transistor-Zelle** (aus D1-E3/D2-E5, offen): optionaler Halbsatz, dass die SRAM-Zelle ein besonders sparsames
Flipflop aus zwei über Kreuz verbundenen NICHT-Gattern plus zwei „Tür“-Transistoren ist.

**E6 – Z. 34 „schneller und viel zuverlässiger als alles davor“ (neu):** Röhren-Flipflops (Z. 28: „Das war schnell“) waren
schneller als Kernspeicher; gemeint ist der bisherige Hauptspeicher von Whirlwind (Speicherröhren). Vorschlag: „Er war schneller
und viel zuverlässiger als der alte Speicher – und er vergaß nichts …“.

**E7 – Glossar `kernspeicher` „Entwickelt am MIT (Jay Forrester)“ (neu, Feinheit):** Ringkern-Speicherideen gab es parallel auch
anderswo (u. a. An Wang, Jan Rajchman); vom MIT stammt der Koinzidenzstrom-Kernspeicher, der sich durchsetzte. Für Einsteiger
vertretbar; präziser wäre „Am MIT unter Jay Forrester zur Reife gebracht, 1953 im Rechner Whirlwind eingebaut …“.

## Zusammenfassung

F1 aus Durchgang 2 (q07 „als erster Computer“, Glossar „Kernspeicher“) ist behoben. Die vollständige erneute Prüfung von Text,
Simulatoren, Übungen, Quiz, Karteikarten und Glossar-Einträgen ergab keine Fehler. 7 Empfehlungen (5 aus früheren Durchgängen
noch offen, 2 neu), alle optional.

Ergebnis: bestanden
