# Faktencheck s1g – Durchgang 3 (neues Format)

**Datum:** 26.11.2026
**Geprüfte Datei:** `content/staffel-1/abschluss-addierer.md` (Abschlussprojekt; Stand mit `git diff HEAD`: steht für sich, `[fazit]` „Auf den Punkt“, Quiz/Karten als Lernpool)
**Prüfung:** unabhängig (nicht Autor). Ganze Datei gelesen, Schwerpunkt auf den Prüfpunkten 8–10 und auf allen geänderten oder neuen Sätzen, Fragen und Antworten. Ein Abschlussprojekt darf Wissen aus der Staffel verbinden, aber keine Bilder oder Geschichten anderer Folgen voraussetzen.

## Erneut geprüft

- **Geänderte Sätze:** Einstieg (Schichten, Logikgatter in einem Satz erklärt), Relais als „elektrisch gesteuerte Schalter“, Model K als Halbaddierer „siehe unten im Bauplan“, XODER und UND beim Halbaddierer erklärt, Stellenwerte 1, 2, 4, 8, ALU als „das Teil, der … die Rechnungen ausführt“, Register und Flipflops, Tipp in Bauabschnitt 1 („Schau oben im Bauplan nach“). Alles fachlich richtig.
- **Nachgerechnet:** 5 + 6 = `1011`; Wahrheitstabelle des Volladdierers (`C=00010111`, `S=01101001`); 7 + 1 mit drei Überträgen; 3 + 4, 8 + 4 und 2 + 1 ohne Übertrag; 12 + 6 → `0010` = 2; 15 + 15 = `11110` → `1110` = 14; 200 + 100 → 44; 2³² − 1 = 4 294 967 295; 2⁶⁴ − 1 = 18 446 744 073 709 551 615 ≈ 1,8 × 10¹⁹ = 18 Trillionen. Alles stimmt.
- **Übertrags-Flag:** x86 (CF) und ARM (C-Flag) merken sich den Übertrag aus der obersten Stelle. Die Abgrenzung zum Overflow-Flag (Zahlen mit Vorzeichen) ist richtig. Auch das Rechnen in mehreren Schritten mit großen Zahlen stimmt (ADC auf x86, ADCS auf ARM).
- **Carry-Lookahead:** Die Beschreibung mit „erzeugt“ (A UND B) und „reicht weiter“ (A XODER B) stimmt, ebenso „heute meist noch schnellere Abwandlungen“ (Parallel-Prefix-Addierer).
- **Prüfpunkt 8 (steht für sich):** Kein Rückgriff mehr auf Bilder oder Geschichten anderer Folgen. Die früheren Formulierungen „aus Folge 2“, „in Folge 4 kennengelernt“ und „in Folge 6 kennengelernt“ sind ersetzt durch eine kurze Erklärung plus „mehr dazu in Folge …“. Das Bild (Dominoreihe) gehört nur hierher. Der Rückblick „Das hast du gebaut“ verbindet Staffelwissen, wie es für ein Abschlussprojekt erlaubt ist, und jeder Punkt wird kurz erklärt. Erfüllt.
- **Prüfpunkt 10 (Lernpool):** q01–q06 sind für sich verständlich, weil Halbaddierer, Volladdierer und Ripple-Carry jeweils in Klammern erklärt werden, und sie fragen nach Verständnis. Die `Nachlesen`-Stellen gibt es, und sie passen. Die neue q07 hat genau eine richtige Antwort, und die Erklärung stimmt (Model K, Nov. 1937, Relais, Halbaddierer; 4004 von 1971 als erster käuflicher Mikroprozessor). Die Karten k01–k09 sind richtig und für sich verständlich.

## Fehler

### F1 – Auf den Punkt, 4. Satz: Verallgemeinerung „Echte Prozessoren rechnen mit 64 Stellen …“
**Fundstelle:** `[fazit]`, letzter Punkt: „Echte Prozessoren rechnen mit 64 Stellen und berechnen die Überträge vorab (Carry-Lookahead), weil die Welle sonst zu langsam wäre.“
Als Kernsatz, den man sich merken soll, ist das in dieser absoluten Form falsch. Das Prinzip sagt richtig „Heutige Prozessoren rechnen **meist** mit 64 Stellen“. Viele echte Prozessoren rechnen mit 8, 16 oder 32 Bit, etwa die Mikrocontroller in Haushaltsgeräten, und die Datei selbst nennt den echten 4-Bit-Prozessor Intel 4004. Auch das Vorausberechnen der Überträge ist typisch für schnelle Prozessoren, aber nicht bei allen so. Im Fazit fallen „heutige/meist“ und „schnelle“ weg, und so prägt sich eine falsche Regel ein.
**Korrektur:** „Schnelle Prozessoren in PCs und Handys rechnen heute meist mit 64 Stellen und berechnen die Überträge vorab (Carry-Lookahead und schnellere Abwandlungen), weil die Welle sonst zu langsam wäre.“

## Empfehlungen

### E1 – Fazit, 3. Satz: „bei Zahlen ohne Vorzeichen“
Das Prinzip grenzt sauber ab: Das Übertrags-Flag zeigt einen Überlauf bei Zahlen **ohne** Vorzeichen an. Im Fazit fehlt das. Das ist nicht falsch, weil das Projekt nur Zahlen ohne Vorzeichen benutzt, aber genauer wäre: „… gibt es einen Überlauf; verbreitete Prozessoren merken sich den letzten Übertrag im Übertrags-Flag (bei Zahlen ohne Vorzeichen).“

### E2 – q07 verrät die Antwort im Fragetext
**Fundstelle:** s1g-q07. Der Fragetext beschreibt schon, dass das Gerät mit Relais binär addierte, und die richtige Antwort wiederholt das nur („Dass Relais binär rechnen können“). Die Ablenker (Röhren, Chip, gespeichertes Programm) sind leicht auszuschließen. Für den Lernpool wäre eine verständnisorientierte Frage ergiebiger, z. B.: „Ein Gerät aus zwei Relais addiert zwei einzelne Bits und zeigt Summe und Übertrag an. Welcher heutigen Schaltung entspricht es?“, mit den Antworten Halbaddierer (richtig), Volladdierer, Flipflop, Ripple-Carry-Addierer.

### E3 – „Rechenwerk“ wird für zwei Dinge benutzt
Die Datei nennt die Kette aus vier Volladdierern „Rechenwerk“ (Überschrift „Bau dein Rechenwerk“, Fazit Satz 2) und sagt später, das Addierwerk sei „das Herzstück des **Rechenwerks** (ALU)“. Vorschlag: Für die Kette durchgehend „Addierer“ oder „Addierwerk“ sagen und „Rechenwerk“ für die ALU reservieren, oder einmal erklären, dass das gebaute Rechenwerk nur addieren kann.

### E4 – Fazit, 1. Satz ist sehr lang
Er enthält zwei Gedanken (warum der Halbaddierer nicht reicht, woraus der Volladdierer besteht). Das ist kein Fehler, aber für einen Kernsatz knapp an der Grenze. Man könnte ihn auf zwei Sätze aufteilen; dann gibt es insgesamt 5 Punkte, also müsste man einen anderen zusammenfassen oder den ersten kürzen.

### E5 – Hinweis zum Bauen (nicht zum Inhalt)
`npm run pruefen` meldet: Die erzeugten Dateien in `inhalt/` sind nicht aktuell. Vor der Freigabe `npm run bauen` laufen lassen.

## Zusammenfassung

Die Umstellung ist gelungen: Das Projekt verbindet Staffelwissen, ohne Bilder oder Geschichten anderer Folgen vorauszusetzen. Alle Rechnungen stimmen, Quiz und Karten taugen für den Lernpool, und die neue q07 ist richtig. Es bleibt ein Fehler im Fazit, eine zu absolute Verallgemeinerung (64 Stellen und Carry-Lookahead für „echte Prozessoren“). Dazu kommen 5 Empfehlungen.

Ergebnis: nicht bestanden
