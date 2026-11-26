# Faktencheck s1f04 „Binär zählen und rechnen – Der Halbaddierer“, Durchgang 2 (Umstellung auf das neue Format)

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Folge nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-04-binaer.md` (`status: entwurf`), ganze Datei; Schwerpunkt auf den Änderungen
gegenüber dem freigegebenen Stand (`git diff HEAD`) und den Prüfpunkten 8–10 (Folge steht für sich, „Auf den Punkt“, Lernpool).
Mitgeprüft: `content/README.md`, Bericht Durchgang 1, `folge-03-gatter.md` (Verweisziel der Shannon-Box), Shannons Aufsatz
„A Symbolic Analysis of Relay and Switching Circuits“ (Trans. AIEE 57, 1938, Scan: https://www.cs.virginia.edu/~evans/greatworks/shannon38.pdf),
MIT-DSpace-Eintrag 1721.1/11173, `npm run pruefen` (Format und `Nachlesen`-Stellen fehlerfrei; gemeldet werden nur veraltete erzeugte
Dateien in `inhalt/`, das ist erwartet).

## Geprüft und in Ordnung

### „Wusstest du?“ zu Shannon (Zeile 41, neu formuliert)
„Fast zur gleichen Zeit, ebenfalls 1937, entwarf der Student Claude Shannon am MIT als Beispiel für seine Masterarbeit eine
Relaisschaltung, die im Zweiersystem addiert“ – **stimmt**:
- Der Aufsatz enthält im Beispielteil den Abschnitt **„Electric Adder to the Base Two“** („A circuit is to be designed that will
  automatically add two numbers, using only relays and switches … greatly simplified by using the scale of two“), samt Schaltbildern
  (Fig. 35/36). Bemerkenswert: Für die unterste Stelle steht dort s₀ = a₀ ⊕ b₀ und c₁ = a₀ · b₀ – genau der Halbaddierer dieser Folge.
- Die Arbeit entstand 1937 am MIT, Druck 1938; der Grad (S.M., Elektrotechnik) wurde laut DSpace 1940 verliehen – so auch korrekt im
  Quellenkopf. Shannon war 1937 Graduiertenstudent am MIT; „Student“ ist richtig.
- „Fast zur gleichen Zeit“ wie Stibitz' Model K (Ende 1937) – richtig.
- Prüfpunkt 8: Die Box erzählt die Shannon-Geschichte aus Folge 3 nicht nach und setzt sie nicht voraus; sie nennt eine eigenständige
  Tatsache mit Verweis und ist zum Verstehen nicht nötig. Zulässig (Verweisgenauigkeit siehe E3).

### Weitere geänderte Sätze
- **Einstieg:** Bit neu erklärt (Feinheit siehe E1), kein Rückgriff mehr auf „das P aus Folge 1“ (Rest-Formulierung siehe E2).
- **Leibniz** „ein deutscher Universalgelehrter“ statt „kennst du aus Folge 1“ – richtig.
- **Stibitz:** Bell-Labs-/Shannon-Einschub entfernt; Relais „Schalter, die von einem kleinen Strom umgelegt werden – mehr dazu in
  Folge 2“ – richtig.
- **Überlauf:** „jede zusätzliche Stelle verdoppelt die Zahl der Möglichkeiten“ – richtig, eigenständig.
- **Zahlenraten-Satz:** „Jede Stelle beantwortet … eine Ja-Nein-Frage, die die Möglichkeiten halbiert“ – richtig (das gierige Umrechnen
  entspricht der Halbierungssuche) und ohne Folge-1-Bild verständlich.
- **Halbaddierer:** Logikgatter in einem Satz neu erklärt, XODER und UND werden in den Aufzählungspunkten über ihr Verhalten definiert –
  ohne Folge 3 verständlich.
- **Übung 2:** ASCII kurz erklärt; 80 = `01010000` = 64 + 16, A = 65 = `01000001`, Großbuchstaben 65–90 beginnen mit `010` – richtig.
- **Beidir** (nur verschoben; „Byte (acht Bit)“ ergänzt) – richtig (IPv4: vier Bytes, je 0–255).
- Simulator-Einstellungen und Übungen unverändert (in Durchgang 1 nachgerechnet; u01, u02, u03 eindeutig lösbar, Auflösungen richtig).

### Prüfpunkt 8 – Folge steht für sich
Keine Bilder oder Geschichten anderer Folgen (kein „P aus Folge 1“, kein Parkhaus, kein Zahlenraten-Simulator als Voraussetzung).
Bit, Relais und Logikgatter werden je in einem Satz neu erklärt, mit Verweis. Das Hauptbild (Kilometerzähler) gehört nur zu s1f04.
Verbleibende „Folge N“-Stellen (Zeilen 17, 37, 41, 132) sind Verweise.

### Prüfpunkt 9 – Auf den Punkt
Vier Kernsätze: Stellenwerte; Umrechnen in beide Richtungen; 1 + 1 = `10` mit Übertrag und Überlauf; Halbaddierer = XODER + UND.
Trifft genau das Wichtigste, alles fachlich richtig.

### Prüfpunkt 10 – Lernpool
- **q01–q05, q08:** ohne Folge verständlich, verständnisorientiert bzw. Rechenaufgaben, je genau eine richtige Antwort. q04 erklärt
  „Halbaddierer“ jetzt in der Frage. q08-Erklärung mit Tacho-Vergleich ist selbsterklärend.
- **q06 (neu):** keine Abfrage des Namens „K“ mehr, sondern der Bedeutung – gut. Frage beschreibt das Gerät selbst, die richtige Antwort
  ist eindeutig, Ablenker klar falsch. Erklärung richtig (zwei Relais, zwei einstellige Binärzahlen). Längenhinweis siehe E4.
- **q07 (neu):** „Welche Aufgabe hat die Null?“ – verständnisorientiert, eindeutig, Erklärung richtig (Platzhalter; Indien → arabische
  Welt → Europa). `Nachlesen: geschichte` ohne Stelle ist hier passend, weil der Absatz vor der einzigen Zwischenüberschrift steht.
- **Nachlesen-Stellen** q01–q06, q08 zeigen auf die passenden Zwischenüberschriften („Umrechnen ohne Probieren“, „Binär zählen“ – dort
  stehen 8-Bit-Bereich und Überlauf –, „Schriftlich addieren …“, „Der Halbaddierer …“, „Der Küchentisch von George Stibitz“).
- **Karten k01–k09:** für sich verständlich, je eine Sache.

## Befunde

### Fehler

Keine.

### Empfehlungen

**E1 – Bit ist kein Schalter (Einstieg, Zeile 17).** „Ein Bit ist die kleinste Einheit der Information: ein Schalter mit zwei Stellungen“
setzt Information und Bauteil gleich. Vorschlag: „… eine Entscheidung zwischen zwei Möglichkeiten, 0 oder 1 – wie ein Schalter mit zwei
Stellungen (mehr dazu in Folge 1).“

**E2 – Rest der alten Folge-1-Brücke (Zeile 17 und Übung 2).** „Man könnte versuchen, mit acht solchen Schaltern ein Muster durch
Probieren einzustellen“ bleibt ohne Folge 1 etwas unmotiviert (welches Muster, wozu?), und „diesmal mit System“ in Übung 2 klingt nach
einem früheren Versuch. Vorschlag Einstieg: „Willst du mit acht solchen Schaltern ein bestimmtes Muster einstellen – etwa das für den
Buchstaben P –, kannst du probieren, bis es stimmt. Ein Computer probiert nicht.“ Übung 2: „… mit acht Stellen ein – mit System statt
durch Probieren.“

**E3 – Verweis der Shannon-Box (Zeile 41).** Folge 3 erzählt von Shannons Masterarbeit, aber nicht vom Addierer. Genauer: „(mehr zu
seiner Masterarbeit in Folge 3)“.

**E4 – q06: richtige Antwort ist die längste.** Richtig ≈ 78 Zeichen, Ablenker 50–58. Vorschlag: „Dass Rechnen nur Schalter mit an und
aus braucht“ oder Ablenker verlängern. Außerdem könnte „Telefon-Relais“ in der Frage kurz erklärt werden („Telefon-Relais, also
stromgesteuerte Schalter“), da die Frage im Lernpool ohne Folge erscheint.

**E5 – „Logikgatter“ im Einstieg (Zeile 21).** Das Wort fällt vor seiner Erklärung in Zeile 132. Optional: „… aus zwei Logikgattern
(kleinen Schaltungen, die Bits verknüpfen) eine Schaltung …“.

Ergebnis: bestanden
