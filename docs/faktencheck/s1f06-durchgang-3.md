# Faktencheck s1f06 „Der Prozessor“ – Durchgang 3 (Umstellung auf das neue Format)

- **Datum:** 26.11.2026
- **Geprüfte Datei:** `content/staffel-1/folge-06-prozessor.md` (status: entwurf)
- **Anlass:** Umstellung auf das neue Format (Folge steht für sich, Abschnitt `[fazit]` „Auf den Punkt“, Quiz/Karten im Lernpool). Die Folge hatte Durchgang 2 bestanden.
- **Vergleich:** `git diff HEAD -- content/staffel-1/folge-06-prozessor.md` – geändert: Einstieg (Bauteile neu erklärt), 4004-Satz (Transistor neu erklärt), Aufbau-Liste (Speicher, Rechenwerk, Steuerwerk), Kodierungs-Satz, `[beidir]` vor das Quiz verschoben (Text unverändert), `[fazit]` neu, alle `Nachlesen:` mit Stelle, q03/q05/q07 neu, q08 Fragetext und Erklärung, k08/k09 neu.
- **Mitgeprüft:** Kopfkommentar und Logik `js/sim/cpu.js` (unverändert), `js/sim/sortieren`, Querverweise gegen `folge-01-bit.md`. Glossar-Entwurf `/workspace/tmp/glossar-neu/s1f06.md` existiert nicht.
- **Prüfer:** unabhängige Prüfung (Agent, nicht Autor der Folge)

## Schwerpunkt 1: Folge steht für sich (Prüfpunkt 8)

- Einstieg: Transistor, Gatter, Addierer, Speicher je in einem Halbsatz neu erklärt, mit Verweisen. Gut.
- Aufbau: Speicher/Adresse, Register, Rechenwerk (Logik = UND, ODER, NICHT neu erklärt), Steuerwerk – ohne Vorwissen verständlich.
- Kodierung: „so wie Buchstaben als Zahlencodes gespeichert werden (mehr dazu in Folge 1)“ – Verweis stimmt (ASCII steht in Folge 1). Der frühere Rückgriff „Kodierung wie ASCII in Folge 1“ ist ersetzt.
- ENIAC, Baby, Köchin, Spielzeug-Prozessor gehören nur zu dieser Folge; kein Rückgriff auf Bilder/Geschichten anderer Folgen.
- Kleine Lücke: „Binärzahl“ wird nicht erklärt; der Satz „`00010110` … die 22“ ist ohne Folge 4 nicht nachvollziehbar (zum Verstehen der Kernaussage aber nicht nötig). Siehe E1.

## Schwerpunkt 2: Auf den Punkt (Prüfpunkt 9)

Vier Kernsätze, treffen das Wichtigste und stimmen fachlich:
- Befehlszyklus Holen/Entschlüsseln/Ausführen, Befehlszähler zeigt auf den nächsten Befehl – richtig.
- Befehle sind Zahlen im selben Speicher wie Daten (Von-Neumann-Architektur), erst der Befehlszähler macht eine Zahl zum Befehl – richtig (im Rahmen des Modells; passt zur „Achtung“-Box im Bild).
- Takt, 1 GHz = eine Milliarde Takte pro Sekunde – richtig.
- Sprünge schreiben eine neue Adresse in den Befehlszähler → Schleifen und Entscheidungen – richtig.

## Schwerpunkt 3: Lernpool-Tauglichkeit (Prüfpunkt 10) und geänderte Fragen

- **q03 (neu):** Kontext ENIAC/Kabel im Fragetext, verständnisorientiert. Richtig: „Programm steht als Zahlen im selben Speicher wie die Daten“. Ablenker eindeutig keine Idee der Von-Neumann-Architektur: Lochkarten neben dem Prozessor (externes Programm, gab es z. B. als Lochstreifen bei Harvard Mark I/Zuse – gerade das Gegenteil), eigener Prozessor je Programm, in Transistoren eingebrannt. Genau eine richtige Antwort; Erklärung korrekt. Nachlesen `geschichte` passt (keine Unterüberschrift vorhanden).
- **q05 (neu):** „Wie kann ein Prozessor einen Programmteil mehrfach wiederholen?“ – Verständnisfrage, richtig „Ein Sprungbefehl setzt den Befehlszähler auf eine frühere Adresse zurück“; Ablenker eindeutig falsch. Erklärung (bedingter Sprung) korrekt. Nachlesen-Stelle passt. Die richtige Antwort ist die längste, siehe E3.
- **q07 (neu, 4004):** Richtige Antwort „Ein ganzer Prozessor passte erstmals auf einen einzigen Chip“ entspricht der verbreiteten Einordnung (Intel, Computer History Museum: erster kommerzieller Ein-Chip-Mikroprozessor, November 1971). Konkurrierende Ansprüche (Four-Phase AL1 1969 als Teil einer Mehrchip-CPU, Garrett CADC 1970 als Chipsatz, TI TMS1802NC ab September 1971 als Taschenrechner-Chip) ändern an der Antwort im Quiz nichts; die Erklärung sagt korrekt „gilt als“. Ablenker eindeutig falsch:
  - „erster Rechner, der sein Programm im Speicher ablegte“ – falsch, das war 1948 das Baby (in der Folge erzählt).
  - „erster Prozessor mit mehreren Kernen“ – falsch (Mehrkern-Prozessoren erst ab etwa 2001).
  - „rechnete als Erster mit Gattern statt mit Schaltern“ – falsch; Gatter gab es schon in Röhren- und Relaisrechnern, und Gatter bestehen selbst aus Schaltern.
  Genau eine richtige Antwort. Kleine Unschärfe in der Erklärung siehe E2. Nachlesen `geschichte` passt.
- **q08 (Köchin, Kontext im Fragetext):** ohne Folge verständlich, die Antwort wird nicht vorweggenommen, genau eine richtige Antwort; Erklärung („Rechenregister“) korrekt.
- **q01, q02, q04, q06:** unverändert bis auf `Nachlesen:`; alle Stellen existieren (Befehlszyklus, Aufbau, Takt, Befehle sind auch nur Zahlen) und passen.
- **k08 (neu):** „Was war am Intel 4004 (1971) neu?“ – korrekt, eine Sache.
- **k09 (neu):** ohne Folge verständlich, korrekt; kleiner Grammatikfehler siehe E4.
- Übrige Karten unverändert, korrekt.

## Übrige Datei (unverändert gegen Durchgang 2) – Stichproben bestätigt

- First Draft 30.06.1945, Baby 21.06.1948 (2¹⁸, 52 Minuten, 131 072), 4004 November 1971, etwa 2 300 Transistoren, bis 740 kHz; 1948 → 1971 = 23 Jahre.
- Simulator `cpu.js`: Prinzip-Beispiel 4 Befehle × 3 Phasen = 12 Takte, Zelle 8 = 7; u01: 3 Runden × 8 Befehle = 24 Befehle = 72 Takte, Zelle 10 = 9, Zelle 11 = 0, 72 Takte / 3 GHz = 24 ns; u02: Zelle 6 + 2 × Zelle 7, Start 5, Lösungen 6/2, 4/3, 0/5; u03 eindeutig. Sieben Befehle im Simulator ↔ „hat zufällig auch sieben Befehle“. Alles stimmt.
- `[beidir]` wortgleich mit dem geprüften Stand, nur verschoben.
- Format: keine Handwerks-Wörter, „Im Bild“- und „Achtung“-Box vorhanden.

## Befunde

### Fehler

Keine.

### Empfehlungen

**E1 – Binärzahlen kurz erklären (Prüfpunkt 8):** Im Einstieg „Addierer, der zwei Binärzahlen zusammenzählt (Folge 4)“ ergänzen: „… Binärzahlen – Zahlen, die nur mit 0 und 1 geschrieben werden – …“. Im Abschnitt „Befehle sind auch nur Zahlen“ optional: „Für den Speicher ist das einfach eine Zahl, die 22 (16 + 4 + 2; wie man binär rechnet, zeigt Folge 4).“ Außerdem baut Folge 4 nur den Halbaddierer für einzelne Bits; besser „ein Addierer, der Bits zusammenzählt (Folge 4)“.

**E2 – q07 Erklärung:** „Alle Teile eines Prozessors saßen auf einem Chip“ – weil die Aufbau-Liste der Folge den Speicher als Teil aufzählt, kann man meinen, auch der Speicher sei auf dem 4004 gewesen. Der 4004 brauchte aber eigene Chips für Programm- und Datenspeicher (4001 ROM, 4002 RAM). Vorschlag: „Steuerwerk, Rechenwerk und Register saßen auf einem einzigen Chip aus etwa 2 300 Transistoren; der Speicher kam in eigenen Chips dazu.“ Ähnlich in der Aufbau-Liste: „Ein Prozessor arbeitet mit wenigen Teilen zusammen“ oder Speicher als „außerhalb des Prozessors“ kennzeichnen.

**E3 – q05:** Die richtige Antwort ist deutlich länger als die Ablenker (README: Antworten ähnlich lang). Vorschlag: Ablenker verlängern, z. B. „Das Rechenwerk zählt die Takte rückwärts bis zum Programmanfang“.

**E4 – k09 Hinten:** „das die Adresse des nächsten Befehls merkt“ → „das sich die Adresse des nächsten Befehls merkt“.

Ergebnis: bestanden
