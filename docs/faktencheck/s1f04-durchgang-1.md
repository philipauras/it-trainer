# Faktencheck s1f04 „Binär zählen und rechnen – Der Halbaddierer“, Durchgang 1

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Folge nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-04-binaer.md` (status: entwurf, dauer: 18)
Mitgeprüft: Glossar-Vorschläge `/workspace/tmp/glossar-neu/s1f04.md`, Simulatoren `js/sim/binaer.js` und `js/sim/schaltung.js`
(Kopfkommentare und Code), Regeln in `content/README.md`, Vergleich mit `folge-01-bit.md`, Querbezüge zu Folge 1, 2, 3, 6 und
`abschluss-addierer.md`.

## Geprüft und korrekt

### Geschichte
- **Leibniz 1703**, „Explication de l'Arithmétique Binaire“, Mémoires de l'Académie Royale des Sciences: richtig. Er rechnet darin
  Addition, Subtraktion, Multiplikation und Division vor und weist auf die regelmäßigen (periodischen) Spalten beim Zählen hin.
  „Über 230 Jahre später“ (1703 → 1937 = 234 Jahre): richtig.
- **Babylonier**: Stellenwertsystem zur Grundzahl 60 seit etwa 2000 v. Chr. („vor rund 4000 Jahren“), Spuren in 60 min/60 s: richtig.
- **Brahmagupta 628** (Brahmasphutasiddhanta): Rechenregeln für die Null, u. a. „Zahl plus null = Zahl“: richtig.
- **al-Chwarizmi um 825** in Bagdad, Schrift über das Rechnen mit den indischen Ziffern; „Algorithmus“ aus der latinisierten
  Namensform „Algoritmi“: richtig.
- **Fibonacci, Liber Abaci 1202**: richtig. „Arabische Ziffern“ trotz indischer Herkunft: richtig.
- **Stibitz / Model K**: Bell Telephone Laboratories, Mathematiker, ausgemusterte Relais, Taschenlampenbirnchen, Blechstreifen aus
  einer Dose, Addition zweier einstelliger Binärzahlen, „K“ für *kitchen*: deckt sich mit dem Computer History Museum (CHM).
  **Jahr 1937**: so in der CHM-Zeitleiste (Quelle 3) und in der meisten Literatur (November 1937); die CHM-Objektseite (Quelle 2)
  nennt allerdings 1936 (siehe E2). **Nachbau 1980 von Stibitz selbst**: von der CHM-Objektseite bestätigt. CHM liegt in
  Mountain View, Kalifornien: richtig.
- **Complex Number Calculator**: Bau ab 1939, in Betrieb Januar 1940; Vorführung am 11. September 1940 bei der Tagung der American
  Mathematical Society am Dartmouth College, Fernschreibverbindung nach New York (rund 350–400 km): richtig (Formulierung siehe E3).
- **Shannon**: Masterarbeit am MIT, 1937 fertiggestellt, 1938 in den Transactions of the AIEE 57 veröffentlicht. Sie beschreibt
  Relaisschaltungen mit boolescher Algebra und enthält im Kapitel mit Beispielen „An Electric Adder to the Base Two“, also einen
  binären Addierer: **die Behauptung stimmt**. (MIT DSpace führt als Datum 1940, das Jahr der Gradverleihung, siehe E14.)
  Shannon kam erst 1941 zu den Bell Labs („später“): richtig.

### Prinzip und Rechnungen (alle nachgerechnet)
- 345 = 3·100 + 4·10 + 5·1; `1010` = 8 + 2 = 10; Zähltabelle 0–8; `1101` = 13; Umrechnungsbeispiel 13 → `1101`: richtig.
- Zählmuster (rechte Stelle jeden Schritt, zweite jeden zweiten …): richtig. 4 Bit = 16 Werte (0–15), 8 Bit = 256 (0–255): richtig.
- Überlauf `1111` + 1 → `0000`: richtig, so verhält sich auch der Simulator (`% 2 ** stellen`).
- Additionstabelle der vier Fälle, 1 + 1 + 1 = `11`: richtig.
- Schriftliche Addition 5 + 3: Übertragszeile `111` steht korrekt über den Stellen 2–4 (von rechts), alle Teilschritte und das Ergebnis
  `1000` = 8 stimmen.
- Halbaddierer: S = XODER, C = UND; Wahrheitstabelle richtig. Volladdierer = zwei Halbaddierer + ODER: richtig.
- „Bruchteil einer Milliardstelsekunde“ für eine Addition (ein Takt bei 3–4 GHz ≈ 0,25–0,33 ns): richtig.
- Querbezüge: Relais in Folge 2, XODER mit Wahrheitstabelle in Folge 3, Zahlenraten in Folge 1, Rechenwerk/Addierer in Folge 6,
  Abschlussprojekt Addierer: alle vorhanden.

### Simulatoren und Übungen
- Prinzip, `binaer` (stellen 4, zaehlen ja): Stellenwerte über den Schaltern, Rechnung darunter, Knopf „+1 zählen“ – passt zum Text.
- Prinzip, `schaltung` Halbaddierer: `zahl: ja` liest den ersten Ausgang (C) als vordere Stelle – passt zu „Übertrag vorne, Summe hinten“.
- **Übung 1** (`s1f04-u01`, Ziele 5, 9, 12, 15): alle < 16, lösbar; Auflösungen `0101`, `1001`, `1100`, `1111` richtig. „Die nächste
  Zahl erscheint, sobald die vorige stimmt“ entspricht dem Code.
- **Übung 2** (`s1f04-u02`, Ziel 80, 8 Stellen): ASCII „P“ = 80 = `01010000` = 64 + 16, identisch mit dem Muster aus Folge 1;
  A = 65 = `01000001`; Großbuchstaben 65–90 = 64 + (1…26), also immer mit `010` vorne: richtig.
- **Übung 3** (`s1f04-u03`): Ziel C=`0001`, S=`0110` in der Zeilenfolge 00, 01, 10, 11 ist richtig. Mit der Standardauswahl
  (UND, ODER, XODER) eindeutig lösbar (S nur mit XODER, C nur mit UND). Die Knopfbeschriftung „S: ? wechseln“ / „C: ? wechseln“
  entspricht dem Code (`<Name>: ?` + „ wechseln“, weil zwei Gatter offen sind). Auflösung richtig.
- „Zum Weiterdenken“ (256 Zahlen, 0–255): richtig.

### Bild (`[werkstatt]`, Kilometerzähler)
- Mechanismus getroffen: Rolle springt von höchster Ziffer auf 0 und nimmt die linke Nachbarrolle mit = Übertrag; mehrere Rollen
  springen gleichzeitig (0999 → 1000, `0111` → `1000`); alle auf 0 = Überlauf. Vorhersage-Probe funktioniert (z. B. `1011` + 1 km →
  `1100`).
- „Eine Rolle beim Weiterzählen = Halbaddierer (eigenes Bit + ankommender Übertrag)“: fachlich richtig, ein Zähler ist eine Kette
  aus Halbaddierern.
- Hinkt-Satz nennt einen echten Unterschied (nur +1 vs. zwei beliebige Zahlen gleichzeitig, Überträge wandern weiter). Bild bisher
  nicht als Hauptbild verwendet (README-Liste: nur Parkhaus; keine andere Folge nutzt den Kilometerzähler).

### Quiz und Karten
- q01–q08: je genau eine richtige Antwort, Erklärungen fachlich richtig, `Nachlesen` sinnvoll (Formulierungen siehe E7, E8).
- k01–k09: korrekt; Karten fragen je eine Sache (k08 mit kleinem Zusatz zum Volladdierer, vertretbar).

### Wo steckt das bei dir?
- Windows-Rechner, Ansicht „Programmierer“, Zeilen HEX/DEC/OCT/BIN; 80 erscheint unter BIN in Vierergruppen als `0101 0000`: richtig.
- 8 Bit je Farbkanal, 24 Bit pro Bildpunkt, 256³ = 16 777 216 ≈ „gut 16,7 Millionen“: richtig („meist“ ist angemessen, HDR-Fotos
  nutzen teils 10 Bit).
- chmod 755: jede Ziffer drei Bits mit 4/2/1 = lesen/schreiben/ausführen, 7 = `111`, 5 = `101`: richtig (Ergänzung siehe E10).
- VPS-Prozessor: `uname -m` meldet `x86_64`, also 64-Bit; 64-Bit-Addition in einem Schritt: richtig (siehe E13).
- IPv4-Adresse aus vier Bytes, Maske `255.255.255.0`, 255 = `11111111`: richtig.

### Format
- Acht Abschnitte in richtiger Reihenfolge, Simulator im Prinzip, drei Übungen, 8 Fragen, 9 Karten. Keine verbotenen Werkstatt-/
  Handwerks-Wörter im Text. Fachbegriffe beim ersten Auftreten erklärt (Stellenwertsystem, Übertrag, Überlauf, Halbaddierer,
  Volladdierer, Relais mit Verweis).

## Fehler

Keine.

## Empfehlungen

**E1 – Dauer (Kopf `dauer: 18`).** Die Folge hat rund 3 840 Wörter, davon etwa 2 880 Lesetext (Einstieg bis Selbst machen und
„Bei dir“), allein das Prinzip 1 180 Wörter (Folge 1: 510). Bei einem Lesetempo von 180–200 Wörtern pro Minute für neuen Stoff sind
das schon 14–16 Minuten, dazu drei Übungen und zwei freie Simulatoren (≈ 5 Min.), 8 Quizfragen und 9 Karten (≈ 5 Min.). Realistisch
sind **22–25 Minuten**. Zum Vergleich: Folge 1 hat 2 670 Wörter bei 15 Minuten; im gleichen Verhältnis wären es ≈ 21 Minuten.
Vorschlag: `dauer: 23` angeben (README-Ziel 15–20 wird dann überschritten) **oder** kürzen, z. B. den Abschnitt zu al-Chwarizmi/
Fibonacci auf einen Satz verdichten, den Absatz „Warum nur halb?“ kürzen (das Thema kommt im Abschlussprojekt ausführlich) und in
„Bei dir“ den Absatz zum 64-Bit-Prozessor streichen.

**E2 – Model K: 1936 oder 1937 (Geschichte, Quellen).** Die zitierte CHM-Objektseite (Quelle 2) nennt für das Original 1936, die
CHM-Zeitleiste (Quelle 3) und die meisten Darstellungen nennen 1937 (November). Der Text (1937) ist vertretbar. Vorschlag: Quelle 2
um „(Objektseite nennt 1936, die meisten Quellen November 1937)“ ergänzen oder im Text „Ende 1937“ schreiben – damit bleibt die
Angabe einheitlich mit `abschluss-addierer.md` („November 1937“).

**E3 – Dartmouth-Vorführung (Geschichte, letzter Satz vor dem „Wusstest du?“).** „bedient über eine Fernschreibleitung aus dem
Hunderte Kilometer entfernten New York“ lässt sich so lesen, als sei die Maschine von New York aus bedient worden. Tatsächlich stand
sie in New York und wurde von Dartmouth aus bedient. Vorschlag: „Die Maschine selbst blieb in New York – die Tagungsgäste tippten
ihre Aufgaben in Dartmouth in einen Fernschreiber, Hunderte Kilometer entfernt, und bekamen die Ergebnisse über die Leitung zurück.“

**E4 – Römische Zahlen (Geschichte, 1. Absatz).** „ein Zeichen bedeutet immer dasselbe, egal wo es steht“ – das Beispiel CCXIV
enthält selbst IV, wo die Stellung (I vor V) sehr wohl zählt (abziehen). Kernaussage stimmt (kein Stellenwert), aber Einsteiger,
die IV/VI kennen, stolpern. Vorschlag: „Ein C ist immer hundert, egal ob vorne oder hinten – es gibt keine Hunderter-, Zehner- oder
Einerstelle. (Nur bei IV oder IX bedeutet ein kleines Zeichen vor einem großen: abziehen.)“

**E5 – Null und Babylonier (Geschichte, 2./3. Absatz).** Die Babylonier hatten fast 1 500 Jahre lang keine Null; erst spät nutzten
sie ein Lückenzeichen. Das würde den Satz „Ohne sie könnte man 305 und 35 nicht unterscheiden“ schön belegen. Vorschlag: „Den
Babyloniern fehlte lange genau dieses Zeichen – ob eine Zahl 1 oder 60 bedeutete, musste man aus dem Zusammenhang erraten.“

**E6 – „dieselbe Schaltung … zusammengelötet“ (Übung 3, Auflösung).** Das Model K löste dieselbe Aufgabe (zwei Bits addieren, Summe
und Übertrag), war aber eine Relaisschaltung, keine Anordnung aus XODER- und UND-Gattern; ob gelötet wurde, ist nicht belegt.
Vorschlag: „Damit hast du die gleiche Rechenaufgabe gelöst, die George Stibitz 1937 mit zwei Relais auf seinem Küchentisch
zusammengebaut hat.“

**E7 – Quiz q06, richtige Antwort.** „Für den Küchentisch, englisch kitchen“ – *kitchen* heißt Küche, nicht Küchentisch. Vorschlag:
„Für die Küche (englisch kitchen), an deren Tisch er es baute“ – oder kürzer „Für kitchen, englisch Küche“. Längen der Antworten
dabei angleichen.

**E8 – Quiz q03, Ablenker „2, denn das Ergebnis ist zwei“.** Der Wert ist tatsächlich zwei; falsch ist nur die *Schreibweise*.
Vorschlag: „Die Ziffer 2 hinschreiben, kein Übertrag“ – dann ist der Ablenker eindeutig falsch und die Erklärung („Eine Ziffer 2 gibt
es im Binärsystem nicht“) passt genau.

**E9 – „Dein Pixel.“ (Bei dir).** Zwischentitel meint wohl das Pixel-Handy, der Absatz handelt aber von Bildpunkten (Pixeln) allgemein
– Doppeldeutigkeit kann verwirren. Vorschlag: „**Deine Fotos auf dem Pixel.** Jeder Bildpunkt eines Fotos …“

**E10 – chmod 755 (Bei dir).** „alle Dateien haben Zugriffsrechte wie 755“ – normale Dateien haben meist 644, 755 ist typisch für
Ordner und Programme. Außerdem fehlt, wofür die drei Ziffern stehen. Vorschlag: „… haben Zugriffsrechte, zum Beispiel `755` für ein
Programm. Die drei Ziffern gelten für den Besitzer, seine Gruppe und alle anderen. Hinter jeder Ziffer …“

**E11 – Glossar-Vorschläge.** Sieben der neun Einträge (Stellenwertsystem bis Addierwerk) stehen bereits wortgleich in
`content/glossar.md`. **Relais** (`id: relais`, Folge s1f02) und **XODER** (`id: xoder`, Folge s1f03) gibt es dort schon – diese
beiden nicht noch einmal eintragen (doppelte ID, und der bestehende XODER-Eintrag ist mit „XOR“ in `woerter` vollständiger).
Inhaltlich sind alle Vorschläge korrekt. Nebenbefund: `npm run pruefen` meldet, dass `inhalt/glossar.json` nicht aktuell ist
(`npm run bauen` nötig).

**E12 – Doppelung mit dem Abschlussprojekt.** Die Stibitz-Geschichte (Relais, Birnchen, Blechstreifen, „K wie kitchen“) steht fast
gleich in `abschluss-addierer.md` (Geschichte, Quiz, Karte). Vorschlag: dort auf Folge 4 zurückverweisen und die Geschichte von
Model K zum Complex Number Calculator weitererzählen, statt sie zu wiederholen.

**E13 – 64-Bit-Addierer (Bei dir).** „mit einem Addierwerk aus genau solchen Bausteinen … nur 64 Stellen breit“ – echte Prozessoren
nutzen schnellere Übertragsverfahren als die einfache Kette (das Abschlussprojekt erklärt Carry-Lookahead). Vorschlag: „aus
denselben Grundbausteinen – Gattern wie XODER und UND –, nur 64 Stellen breit und mit Tricks, damit der Übertrag nicht so lange
wandern muss.“

**E14 – Shannon-Quelle (Kopf).** MIT DSpace führt die Arbeit mit Datum 1940 (Gradverleihung). Vorschlag: „Masterarbeit, MIT
(fertiggestellt 1937, Grad 1940)“, damit der Link nicht im Widerspruch zur Jahreszahl im Text zu stehen scheint.

## Zusammenfassung

Alle geprüften Jahreszahlen, Personen und Rechnungen stimmen; alle drei Übungen sind lösbar und richtig aufgelöst; das Bild
(Kilometerzähler) trifft den Mechanismus von Übertrag und Überlauf, und der Hinkt-Satz nennt einen echten Unterschied. Es gibt
keine Fehler, aber 14 Empfehlungen – die wichtigste ist die Dauer (E1): realistisch sind 22–25 Minuten statt 18.

Ergebnis: bestanden
