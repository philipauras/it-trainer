# Faktencheck s1f03 „Logikgatter“, Durchgang 2

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Folge nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-03-gatter.md` (`status: entwurf`)
Mitgeprüft: Bericht Durchgang 1 (`docs/faktencheck/s1f03-durchgang-1.md`), Glossar-Einträge mit `folge: s1f03` in
`content/glossar.md` (und Vorschlagsdatei `/workspace/tmp/glossar-neu/s1f03.md`), Kopfkommentar `js/sim/schaltung.js`,
Tabelle „Bisher verwendete Hauptbilder“ in `content/README.md`, Quellenangaben anderer Folgen zum Vergleich.

## Nachprüfung Durchgang 1

**F1 (Treppenhauslicht ≠ ODER) – behoben.** Das Bild ist jetzt „ODER: die Klingel mit zwei Tastern“ (Haustür und Wohnungstür).
Klingeltaster sind Taster ohne Gedächtnis; der Etagentaster liegt in der klassischen Klingelanlage parallel zum Haustürtaster an
derselben Klingel. „Läutet, solange an irgendeinem gedrückt wird … Lässt man los, ist sie still“ trifft die ODER-Tabelle exakt
(00 → 0, sonst 1), auch „beide gleichzeitig“. Vorhersage-Satz („fünf Taster … ein ODER mit fünf Eingängen“), „Im Bild“-Box und
Achtung-Box („Lampe, eine Klingel oder eine Tür“) sind angepasst, die README-Tabelle der Hauptbilder ebenso. „In vielen
Mehrfamilienhäusern“ ist vorsichtig genug (moderne Bus-Sprechanlagen arbeiten anders, das muss hier nicht erwähnt werden).

**Umgesetzte Empfehlungen – geprüft:**
- **E1 Shannon-Quelle:** „geschrieben 1937, Abschluss 1940; MIT DSpace“ – korrekt. Shannon reichte die Arbeit 1937 ein, MIT
  DSpace 1721.1/11173 führt sie als „Thesis (M.S.) … 1940“ (Grad zusammen mit der Promotion 1940 verliehen). Druck 1938 in
  Transactions of the AIEE 57, S. 713–723 – korrekt.
- **E2 Gardner:** Howard Gardner, „The Mind's New Science“ (Basic Books 1985): „possibly the most important, and also the most famous,
  master's thesis of the century“. Übersetzung „vielleicht die wichtigste Masterarbeit des Jahrhunderts“ und „Der Psychologe“ –
  korrekt; Quelle steht im Kopf.
- **E3 Nakashima:** Akira Nakashima (NEC) veröffentlichte ab 1934–1936 Arbeiten zur Relais-Schaltungstheorie und kam unabhängig auf
  ähnliche Ergebnisse. „Etwa zur selben Zeit … aber Shannons Arbeit wurde weltweit bekannt“ – korrekt. „erstmals“ wurde zu
  „systematisch“ – gut.
- **E4 Differential Analyzer:** Bushs Analyzer (1931) rechnete mechanisch (Wellen, Zahnräder, Rad-Scheiben-Integratoren); Shannon
  beschrieb selbst, dass ihn die komplizierte Relais-Steuerschaltung zu seiner Arbeit brachte. Satz korrekt.
- **E5 Zeitabstand:** „gut achtzig Jahre“ (Einstieg und Geschichte) – 1847/1854 → 1937 = 83–90 Jahre, einheitlich und richtig.
- **E6 Apollo:** Quelle Eldon C. Hall, „Journey to the Moon. The History of the Apollo Guidance Computer“, AIAA 1996 – existiert und
  passt (Hall war Chefentwickler der Hardware). Block II: rund 2 800 ICs mit je zwei NODER-Gattern (3 Eingänge) für die Logik – korrekt.
  Begründung jetzt „gründlicher prüfen … nicht ausfallen“ – belegt (kleines Wort siehe E3 unten).
- **E7 CMOS:** „NUND vier Transistoren, UND sechs – NUND mit einem NICHT dahinter“ – korrekt, „besonders“ entfernt (Quiz siehe E1 unten).
- **E8–E13:** Achtung-Box, Überschrift „Logik im Alltag“, README-Tabelle, Auflösung Übung 3, Karte k06, Glossar (`und-gatter`,
  `oder-gatter` „Im einfachen Modell aus Folge 2“, `logikgatter` „heute meist aus Transistoren, früher aus Relais“), „Lehrer“ statt
  „Schulmeister“ – alle umgesetzt und korrekt.

## Erneute Gesamtprüfung

- **Geschichte:** Boole (1815 Lincoln, Schuhmachersohn, Autodidakt, eigene Schule, 1849 Professor in Cork ohne Studium, 1847/1854) –
  korrekt. Shannon (Michigan EE + Mathematik, MIT, 1937/1938, elf Jahre bis 1948) – korrekt.
- **Prinzip:** alle Wahrheitstabellen (UND, ODER, NICHT, XODER, NUND, NODER) erneut nachgerechnet – korrekt; ODER aus drei NUND
  (NUND(¬A,¬B) = A ∨ B) ergibt 0111 – korrekt; NICHT/UND aus NUND – korrekt.
- **Bild:** Schließfach (UND), Klingel (ODER), Kühlschrank-Öffner (NICHT), Wechselschaltung (XODER mit Hinweis auf die Verdrahtung) –
  alle treffen den Mechanismus. Der Hinkt-Satz (Mensch schaltet vs. Gatter schalten Gatter) ist ein echter Unterschied.
- **Übungen** (gegen `schaltung.js`: Zeilen wie Binärzählen, erster Eingang vorne, Standardauswahl UND/ODER/XODER):
  u01 → 0110; u02 einzige Lösung ODER (Gegenwerte 0001/0110/1110/1000 richtig); u03 einzige Lösung Offen = ODER, Alarm = UND
  (Ziel 00000111); mit ODER statt UND ergäbe sich 01111111 – die neue Auflösung („schon los, sobald scharf … und beim Lüften, wenn
  aus“) stimmt; u04 einzige Lösung NUND (UND/ODER(N,N) = 1110). Alle lösbar, Auflösungen korrekt.
- **Quiz q01–q07:** je genau eine richtige Antwort, Erklärungen korrekt, `Nachlesen` passend (Leibniz 1703 stimmt mit Folge 1).
- **Karten k01–k08:** korrekt, je eine Sache (k06 jetzt sauber).
- **Glossar** (wahrheitstabelle, logikgatter, boolesche-algebra, und-gatter, oder-gatter, nicht-gatter, xoder, nund, noder): korrekt.
  Neu in `noder`: „Zwei über Kreuz verbundene NODER-Gatter ergeben ein RS-Flipflop“ – korrekt (genau genommen ein RS-Latch, im
  Deutschen üblich „RS-Flipflop“).
- **Beidir:** unverändert plausibel (Milliarden Transistoren, Python `and/or/not`, Gmail `OR` in Großbuchstaben).
- **Format:** keine Werkstatt-/Handwerkswörter mehr (Suche nach Lehrling/Gesell/Meister/Werkbank ohne Treffer).

## Befunde

### Fehler

Keine.

### Empfehlungen

**E1 – Quiz q04, Erklärung: „besonders sparsam“.** Der Haupttext wurde nach E7 (Durchgang 1) korrigiert, die Quiz-Erklärung nicht:
NODER ist in CMOS genauso klein (4 Transistoren). Vorschlag: „In echten Chips ist NUND außerdem kleiner als UND (vier statt sechs
Transistoren).“

**E2 – Karte k02 (und k03): „In der Transistor-Schaltung“.** Wie beim Glossar (E12 aus Durchgang 1) gilt das nur im einfachen Modell
aus Folge 2. Vorschlag k02: „Im einfachen Modell aus Folge 2 entspricht das zwei Schaltern hintereinander.“ k03 entsprechend
„Im einfachen Modell aus Folge 2: zwei Schalter nebeneinander.“

**E3 – Apollo-Box: „war früher in großer Zahl lieferbar“.** „früher“ klingt nach „vorher“; gemeint ist „damals“. Vorschlag:
„Ein einziger, einfacher Chiptyp war damals in großer Zahl lieferbar und ließ sich gründlicher prüfen …“

**E4 – Übung 1: Schalternamen „unten“/„oben“ kollidieren mit Schalterstellungen.** Im Bild heißen die Stellungen „unten/oben“, in
Übung 1 heißen die Schalter selbst so; die Auflösung „Genau ein Schalter oben – Licht an“ ist dadurch doppeldeutig. Vorschlag:
`namen: A=Anfang; B=Ende; L=Licht` und im Text „Zwei Schalter, einer am Anfang und einer am Ende des Flurs …“, Auflösung „Genau ein
Schalter an (1) – Licht an; beide gleich – Licht aus.“

**E5 – Doppeltes „riesig“ (`[geschichte]`, Shannon-Absatz).** „vor einer riesigen Rechenmaschine … Die riesige Maschine rechnet …“.
Vorschlag: zweiter Satz „Sie rechnet mit Wellen und Zahnrädern …“.

**E6 – Quelle Petzold (Kopf).** „Code. Wie Computer funktionieren“ (deutscher Titel) erschien 2000 bei Microsoft Press; die deutsche
Übersetzung der 2. Auflage erschien bei **mitp** („Code – Wie Computer funktionieren. Die Sprache von Hardware und Software verstehen“,
ISBN 978-3-7475-0628-8), das englische Original 2022 bei Microsoft Press. „Microsoft Press, 2. Auflage 2022“ mit deutschem Titel
mischt beides. Vorschlag: „Charles Petzold: Code – Wie Computer funktionieren. 2. Auflage, mitp (ISBN 978-3-7475-0628-8)“ oder
einheitlich mit Folge 4/5 den englischen Titel „Code. The Hidden Language of Computer Hardware and Software. 2. Auflage, Microsoft
Press, 2022“. (Dieselbe Angabe steht in Folge 2.)

## Zusammenfassung

F1 aus Durchgang 1 ist behoben: Die Klingel mit zwei parallelen Tastern hat kein Gedächtnis und erfüllt die ODER-Tabelle samt
Vorhersage. Alle umgesetzten Empfehlungen (Nakashima, Gardner-Zitat, Shannon „geschrieben 1937, Abschluss 1940“, Apollo-Quelle
Eldon Hall 1996, Differential Analyzer, CMOS, Glossar, k06, Auflösung Übung 3) sind sachlich korrekt. Erneute Prüfung aller
Fakten, Tabellen, Übungen, Quizfragen, Karten und Glossar-Einträge ergab keinen Fehler; 6 kleine Empfehlungen.

Ergebnis: bestanden
