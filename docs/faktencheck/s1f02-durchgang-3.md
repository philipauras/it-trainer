# Faktencheck s1f02 „Strom als Sprache – Vom Relais zum Transistor“, Durchgang 3 (Umstellung auf das neue Format)

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Inhalte nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-02-transistor.md` (status: entwurf), Vergleich mit dem letzten Commit
(`git diff HEAD`), dazu `content/README.md` (Abschnitte „Lernpool“, „Quiz“, „Karteikarten“, „Jede Folge steht für sich“,
„Bilder, Grafiken und Mitmachen“), Kopfkommentar `js/sim/transistor.js`, Bericht Durchgang 2.
Neue Glossar-Einträge: keine (`/workspace/tmp/glossar-neu/` existiert nicht).

## Was sich geändert hat

- Einstieg: Rückgriff „In Folge 1 hast du gelernt … wie ein Lichtschalter“ ersetzt durch Kurz-Erklärung des Bits mit Verweis.
- Z3: „Binärsystem aus Folge 1“ → „Binärsystem, das nur 0 und 1 kennt (mehr dazu in Folge 1)“.
- Bell Labs: Rückgriff auf Shannon/das Bit (Geschichte aus Folge 1) gestrichen.
- Prinzip: „Wie passt das zu Folge 1, wo …“ → „Wie passt das dazu, dass ein Bit nur 0 oder 1 ist … (Folge 1)?“
- `[beidir]` vor Quiz verschoben; Pixel-Absatz: „die rund eine Billion Bits aus Folge 1“ → eigene Rechnung mit Kurz-Erklärung.
- Neuer Abschnitt `[fazit] Auf den Punkt`.
- Quiz: q04 neu (statt „wo und wann“), q05-Erklärung, q07 ohne „Im Bild …“, alle `Nachlesen` mit Stelle.
- Karten: k06 neu (statt „wann und wo“), k07 mit Verweis, k09 ohne „Im Wasserkreislauf-Bild“.
- Build-Probe in einer Kopie des Projekts (`node werkzeuge/bauen.mjs`): fehlerfrei, alle sechs `Nachlesen`-Stellen gefunden.

## Prüfpunkt 8 – Folge steht für sich

Erfüllt. Kein Rückgriff mehr auf Bild (Parkhaus-Lämpchen) oder Geschichte (Laternen, Shannon) von Folge 1.
Das nötige Vorwissen „Bit“ wird im Einstieg in einem Satz neu erklärt (mit Verweis), „Binärsystem“ bei der Z3 ebenso, im
`[beidir]` noch einmal kurz. „Eine Spannung rastet nicht ein wie ein Lichtschalter“ ist ein allgemeiner Vergleich, kein
vorausgesetztes Bild. Verweise auf Folge 3 (UND/ODER/NICHT) und Folge 6 (Takt) sind Ausblicke; zum Verstehen nötig ist nichts davon.
„Wie beim M1-Chip aus der Geschichte“ meint die eigene Geschichte – zulässig. Hauptbild (druckgesteuertes Ventil) gehört nur zu dieser Folge.

## Prüfpunkt 9 – Auf den Punkt

Vier Kernsätze, alle fachlich korrekt:
1. Relais = Schalter, den ein Elektromagnet umlegt; schwacher Strom steuert zweiten, starken Kreis – korrekt.
2. MOSFET ohne bewegliche Teile, Spannung am Gate öffnet Kanal → schnell, sparsam, kein Verschleiß – korrekt im Rahmen der im Text
   genannten Vereinfachung (n-Kanal; die umgekehrte Bauart ist im Prinzip-Text erwähnt).
3. Bit aus Spannung durch zwei Bereiche mit Sicherheitslücke – korrekt (TTL 0,8 / 2,0 V).
4. Reihe = nur wenn beide, parallel = mindestens einer, Abkürzung kehrt um – korrekt, passt zu `ANORDNUNGEN` im Simulator
   (`a && b`, `a || b`, `!a`). Wortwahl siehe E1.

## Prüfpunkt 10 – Lernpool

- **q04** (neu): genau eine richtige Antwort, Fakten korrekt (16.12.1947 Bardeen/Brattain, Germanium-Kristall mit Goldkontakten,
  ohne Vakuum und Glühdraht). Fragt nach dem Neuen statt nach Ort/Jahr – deutlich verständnisorientierter als vorher. Siehe E2.
- **q05**: Erklärung korrekt, Verweis auf Folge 3 als Ausblick. `Nachlesen: selbst / Übung 1: hintereinander` passt.
- **q07** (neu formuliert): beschreibt das Ventil-Bild vollständig in der Frage, damit ohne Folge verständlich; Antwort korrekt.
- **k06** (neu): korrekt, eine Sache. **k09**: für sich verständlich, korrekt. Siehe E3.
- `Nachlesen`-Stellen: q01 Relais, q02 Spannung → Bit, q03 Transistor, q04 Weihnachten 1947, q06 Glühende Röhren – alle passend.

## Übrige Datei

Inhalte aus Durchgang 2 unverändert und weiter korrekt (Morse/Vail 1844, Henry um 1835, Z3 12.05.1941, ENIAC 17 468 Röhren,
Transistor 1947, MOSFET 1959/60, Kilby 1958, Noyce 1959, M1 16 Mrd., TTL-Pegel, 50 Hz/100 Richtungswechsel, USB 5 V, ATX 12/5/3,3 V).
Simulator-Einstellungen und Auflösungstabelle (0/0/0/1 bzw. 0/1/1/1, NICHT A) stimmen mit `js/sim/transistor.js` überein.
Neu im `[beidir]`: 128 GB ≈ eine Billion Bit (1,024 · 10¹²) – korrekt.

## Fehler

Keine.

## Empfehlungen

- **E1 (`[fazit]`, Satz 4):** „als Umweg kehrt einer das Signal um“ – im Text ist es eine *Abkürzung an der Lampe vorbei*; „Umweg“
  (eigentlich: längerer Weg) ist ohne die Überschrift der Übung schwer zu deuten. Vorschlag: „… in einer Abkürzung an der Lampe vorbei
  kehrt ein Transistor das Signal um (die Lampe zeigt das Gegenteil).“
- **E2 (q04, Ablenker):** „Er rechnete als erster Schalter im Zehnersystem“ ist kaum plausibel (ein Schalter rechnet nicht in einem
  Zahlensystem). Ein stärkerer Ablenker prüft echtes Verständnis, z. B. „Er hatte bewegliche Kontakte, die schneller klappten als beim Relais“.
- **E3 (k09/q07):** k09 wiederholt q07 fast wörtlich und fragt nach dem Bild. Laut README lieber nach dem Begriff fragen, z. B.
  „Warum braucht ein MOSFET zum Schalten am Gate praktisch keinen Strom?“ → „Das Gate ist durch eine dünne Isolierschicht getrennt;
  es genügt die Spannung, nur beim Umschalten fließt kurz ein winziger Strom.“
- **E4 (`[fazit]`):** Die Leitidee der Folge – „ein Schalter kann den nächsten schalten, so entstehen Ketten“ (Einstieg, Merke-Box) –
  steckt im Fazit nur indirekt. Ggf. an Satz 1 oder 2 anhängen: „… und weil sein Ausgang den nächsten Transistor steuern kann,
  lassen sich Schalter zu Ketten verbinden.“
- **E5 (Einstieg):** „Technisch ist ein Bit ein Schalter“ ist etwas absolut – im Prinzip-Teil ist ein Bit dann ein Spannungsbereich.
  Vorschlag: „Technisch steckt hinter einem Bit ein Schalter: aus oder an.“

Ergebnis: bestanden
