# Faktencheck s1f01 „Was ist Information? – Das Bit“, Durchgang 4

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Inhalte nicht geschrieben)
Grundlage: `content/staffel-1/folge-01-bit.md` (überarbeitete Fassung), Regeln in `content/README.md` (Abschnitt „Bilder, Grafiken
und Mitmachen“), Simulator `js/sim/bit-schalter.js`, Vorbericht `s1f01-durchgang-3.md` (F1, E1–E4).

## Geprüfte Teile

1. `## [werkstatt] Das Parkhaus mit den Lämpchen` (Text, „Im Bild“-Box, „Achtung“-Box)
2. `## [selbst]`, Teil „Schreib einen Buchstaben“ (Übung `s1f01-u02`)
3. Karteikarte `s1f01-k08`

## Stand der Befunde aus Durchgang 3

| Nr. | Stand | Kurz |
|---|---|---|
| F1 | **behoben** | Der neue Hinkt-Satz nennt echte Unterschiede auf der Ebene Lämpchen ↔ Bit (siehe 1.) |
| E1 | umgesetzt | „Platz 1 und 3 … anderes Muster als Platz 2 und 5 … 256 Muster und nicht nur 9“ |
| E2 | umgesetzt | „Das P ist der 16. Buchstabe – es liegt also 15 Plätze hinter dem A.“ |
| E3 | umgesetzt | C als drittes Beispiel und „Bei allen Großbuchstaben steht vorne `010`“ |
| E4 | teilweise | k08 fragt jetzt nur noch eine Sache (das Byte), aber weiter über das Bild (siehe 3.) |

## 1. Parkhaus mit den Lämpchen

### Geprüft und korrekt

- **Neuer Hinkt-Satz (F1):** Beide genannten Unterschiede bestehen wirklich und betreffen das, was laut „Im Bild“-Box das Bit ist,
  nämlich das Lämpchen:
  - Das Lämpchen folgt dem Geschehen draußen (Sensor → Lampe), ein **gespeichertes** Bit behält seinen Wert, bis es geschrieben wird.
    Das Wort „gespeichert“ grenzt sauber ab: Eingangssignale (Tastatur, Sensoren) wechseln auch im Computer von außen, das wird nicht bestritten.
  - Acht Stellplätze sind nur nebeneinander, der Computer liest ein Byte als Einheit. Das stimmt: Arbeitsspeicher wird byteweise
    adressiert, ein einzelnes Bit kann man nicht für sich allein abrufen.
  - Der Satz behauptet nicht mehr, im Computer gebe es physikalisch keine Zwischenwerte. Der Widerspruch zu Folge 2 (Schwellen) ist weg.
- **Muster statt Anzahl (E1):** „256 Muster und nicht nur 9“ ist richtig (2⁸ = 256; 0 bis 8 Autos = 9 Anzahlen). Das Beispiel
  „Platz 1 und 3“ gegen „Platz 2 und 5“ ist eindeutig: beides sind 2 Autos, aber verschiedene Muster.
- **Einfahrt-Anzeige:** „fasst viele einzelne Bits zu einer Auskunft zusammen“ ist korrekt und ehrlich formuliert (es wird nicht behauptet,
  dass die Anzeige das Muster bewahrt).
- **Bild stimmig:** Lämpchen = Bit, Reihe aus acht = Byte, Farb-Abmachung = Kodierung. Text, „Im Bild“-Box und Hinkt-Satz widersprechen
  sich nicht. Die Vorhersage-Probe aus Durchgang 3 gilt weiter (9 Plätze → 512 Muster).
- **Verständlichkeit:** Kurze Sätze, keine neuen Fachbegriffe, Beispiel aus dem Alltag.

### Befunde

**E5 – Empfehlung: Achtung-Box auf einen Satz kürzen und „behält seinen Wert“ leicht absichern.**
Die README verlangt, „in einem Satz“ zu sagen, wo das Bild hinkt. Die Box hat jetzt drei Sätze. Das ist inhaltlich kein Problem, aber
länger als vorgesehen. Außerdem gilt „behält seinen Wert, bis der Computer es gezielt umschaltet“ beim Arbeitsspeicher nur, solange Strom
da ist (der Abschnitt „Wo steckt das bei dir?“ sagt das selbst: „solange der Server läuft“). Für Einsteiger ist die Vereinfachung
vertretbar, also kein Fehler. Möglich wäre z. B.:
> **Achtung:** Hier hinkt das Bild: Die Lämpchen springen um, sobald ein Auto kommt oder fährt, ein gespeichertes Bit dagegen bleibt, bis der Computer es umschaltet – und acht Stellplätze liegen nur zufällig nebeneinander, während der Computer ein Byte immer als Einheit liest.

## 2. „Schreib einen Buchstaben“ (Übung s1f01-u02)

### Nachgerechnet und korrekt

- A = 65 = `01000001`, B = 66 = `01000010`, **C = 67 = `01000011`**. Korrekt.
- **„Bei allen Großbuchstaben steht vorne `010`“:** A–Z sind 65–90 = `01000001` bis `01011010`. Alle liegen im Bereich 64–95
  (`010xxxxx`). Korrekt, ohne Ausnahme.
- **„15 Plätze hinter dem A“:** P = 65 + 15 = 80 = `01010000`. Korrekt. Mit „vorne 010“ bleiben für P die letzten fünf Schalter `10000`.
- „genau eins weiter als der vorige“: gilt für A–Z lückenlos.
- Das C-Beispiel räumt die falsche Idee „die 1 wandert nach links“ aus. Das Probieren ist jetzt sinnvoll eingegrenzt, ohne Folge 4
  vorwegzunehmen.
- Simulator: Bei `ziel: P` sind es 8 Schalter, die Anzeige nennt das jeweilige ASCII-Zeichen, die Übung gilt bei `01010000` als geschafft.

### Befunde

**E6 – Empfehlung (klein): „vorne“ und „Plätze“ eindeutiger machen.**
„Vorne“ heißt hier „die ersten drei Schalter von links“. Das ist verständlich, „die ersten drei Schalter“ wäre aber noch klarer.
„15 Plätze hinter dem A“ kann direkt nach dem Parkhaus-Bild kurz an Stellplätze denken lassen. „15 Buchstaben hinter dem A“ wäre
eindeutig. Beides ist keine Falschaussage.

## 3. Karteikarte s1f01-k08

**Inhaltlich korrekt.** Reihe aus acht Stellplätzen = Byte = 8 Bit, 256 Belegungen. Passt zu Text und „Im Bild“-Box. Die Karte fragt jetzt
nur noch eine Sache.

**E4 (Rest) – Empfehlung:** Die Karte fragt weiter über das Bild statt über den Begriff und überschneidet sich mit k03 (8 Bit, 256 Muster).
Fürs Lernen nützlicher wäre eine Karte, die prüft, *warum* das Lämpchen ein gutes Bild für ein Bit ist (genau zwei Zustände). Kein Fehler.

## Nebenbei

Die Kopfzeile `faktencheck:` in der Folgen-Datei nennt nur Durchgang 1 und 2. Durchgang 3 und 4 sollten dort nachgetragen werden.

## Zusammenfassung

| Nr. | Teil | Einstufung | Kurz |
|---|---|---|---|
| F1 | werkstatt, Achtung-Box | behoben | Hinkt-Satz nennt jetzt echte Unterschiede (Lämpchen folgt draußen, Bit bleibt gespeichert; Byte als Einheit) |
| E5 | werkstatt, Achtung-Box | Empfehlung | auf einen Satz kürzen (README), „behält seinen Wert“ gilt nur mit Strom |
| E6 | selbst, u02 | Empfehlung | „die ersten drei Schalter“ und „15 Buchstaben“ statt „vorne“ und „Plätze“ |
| E4 | k08 | Empfehlung (Rest) | nach dem Begriff fragen statt nach dem Bild, Überschneidung mit k03 |

Keine Fehler gefunden. Alle neuen Aussagen (010 vorne, 15 hinter A, P = `01010000`, C = `01000011`, 256 statt 9 Muster) sind korrekt.

Ergebnis: bestanden
