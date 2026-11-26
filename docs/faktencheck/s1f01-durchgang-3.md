# Faktencheck s1f01 „Was ist Information? – Das Bit“, Durchgang 3

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Inhalte nicht geschrieben)
Grundlage: `content/staffel-1/folge-01-bit.md`, Regeln in `content/README.md` (Abschnitt „Bilder, Grafiken und Mitmachen“),
Simulator `js/sim/bit-schalter.js` (Option `ziel`), Staffelplan in `config.json`. Was nicht neu ist, steht in `s1f01-durchgang-2.md`.

## Geprüfte Teile

1. `## [werkstatt] Das Parkhaus mit den Lämpchen` (neues Hauptbild samt „Im Bild“- und „Achtung“-Box)
2. `## [selbst]`, Teil „Schreib einen Buchstaben“ (Übung `s1f01-u02`, Ziel P, Tipps)
3. Karteikarte `s1f01-k08`

## 1. Parkhaus mit den Lämpchen

### Geprüft und korrekt

- **Parkhaus-Leitsysteme:** Die Beschreibung ist realistisch. Einzelplatz-Erfassung mit einem Sensor an der Decke (meist Ultraschall)
  über jedem Stellplatz und einer Lampe mit Grün = frei und Rot = belegt ist in vielen neueren Parkhäusern üblich, etwa in
  Einkaufszentren und an Flughäfen. Andere Bauarten gibt es auch (Bodensensoren, Kameras für mehrere Plätze, teils Blau für
  Behindertenplätze). Das Wort „viele“ ist aber vorsichtig genug, also nichts erfunden. Auch Anzeigen an der Einfahrt mit freien Plätzen
  je Ebene („Ebene 2: 37 frei“) gibt es wirklich.
- **Mechanismus:** Lampe = zwei Zustände = Bit. Das trifft den Mechanismus. Die Vorhersage-Probe klappt: Aus dem Bild folgt richtig,
  dass 9 Plätze 512 Belegungen haben und jeder weitere Platz die Zahl verdoppelt.
- **Zahlen:** 8 Plätze → 2⁸ = 256 Belegungen. Korrekt.
- **Kodierung:** Grün = frei ist eine Abmachung, „Lampe aus = frei, an = belegt“ ginge genauso. Das ist richtig, und der Bezug
  zu den Laternen und zu ASCII ist stimmig.
- **„Im Bild“-Box:** Vorhanden. Sie ordnet jedem Bild-Teil einen Computer-Teil zu (Lämpchen = Bit, Reihe aus 8 = Byte,
  Farb-Abmachung = Kodierung). Das passt zum Text.
- **Format:** Das Hauptbild wird in Folge 1 zum ersten Mal verwendet und steht in der Bilder-Liste in `content/README.md`.
- **Verständlichkeit:** Das Bild kennt jeder aus dem Alltag. Es kommen keine neuen Fachbegriffe vor, und die Sprache ist kurz und klar.

### Befunde

**F1 – Fehler: Der Hinkt-Satz trifft nicht die echte Schwachstelle des Bildes.**
In der Achtung-Box steht: Ein Auto kann schräg über zwei Plätzen stehen, dann ist „frei oder belegt“ Ansichtssache, und „im Computer ist es
anders gebaut: Jedes Bit wird immer eindeutig als 0 oder 1 gelesen“. Laut „Im Bild“-Box ist das Bit aber das **Lämpchen**, nicht das
Auto. Auch bei einem schräg stehenden Auto zeigt das Lämpchen eindeutig Rot oder Grün: Der Sensor entscheidet über eine Schwelle.
Genau so arbeitet auch der Computer. Seine Spannung kann ebenfalls zwischen den Werten liegen, die Schaltung legt sie per Schwelle auf 0 oder 1 fest
(Thema von Folge 2 „Strom als Sprache“). Der Satz nennt also einen Unterschied, den es auf der Ebene Lämpchen ↔ Bit nicht gibt.
Außerdem kann er die falsche Vorstellung wecken, im Computer könne es physikalisch gar keine Zwischenwerte geben. Das stößt sich mit
Folge 2. Die Regel „klar sagen, wo es hinkt“ ist damit inhaltlich nicht erfüllt.
Vorschlag für eine Grenze, die wirklich besteht (ein Satz):
> **Achtung:** Hier hinkt das Bild: Die Lämpchen zeigen nur an, was draußen passiert, und springen um, sobald ein Auto kommt oder fährt. Ein Bit im Computer dagegen bleibt, wie es ist, bis der Computer es selbst umschaltet, und acht Bits werden immer gemeinsam als ein Byte gelesen, während die acht Parkplätze nur zufällig nebeneinander liegen.

Möglich ist auch, nur einen der beiden Punkte zu nennen. Wer den Gedanken „kein Halb“ behalten will, sollte ihn so formulieren, dass er
zum Bild passt: Auch das Lämpchen kennt kein „halb“. Der Unterschied liegt dann nicht beim Bit selbst.

**E1 – Empfehlung: Belegung (Muster) und Anzahl auseinanderhalten.**
„256 verschiedene Belegungen, von ‚alles frei‘ bis ‚alles voll‘“ und gleich danach die Zählanzeige „37 frei“ können Einsteiger dazu
bringen, an 9 Möglichkeiten (0 bis 8 Autos) zu denken statt an 256 Muster. Ein Halbsatz löst das, z. B.: „Es zählt, *welche* Plätze
belegt sind, nicht nur wie viele: Platz 1 und 3 belegt ist eine andere Belegung als Platz 2 und 4.“ Dann wird auch die Einfahrt-Anzeige
klarer: Sie fasst viele Bits zu einer Zahl zusammen, und dabei geht das genaue Muster verloren.

## 2. „Schreib einen Buchstaben“ (Übung s1f01-u02)

### Nachgerechnet und korrekt

- A = 65 = `01000001`, B = 66 = `01000010`. Korrekt.
- P ist der 16. Buchstabe (A B C D E F G H I J K L M N O **P**). Korrekt.
- P = 65 + 15 = 80 = `01010000`. Der Simulator erkennt dieses Muster als Ziel (`musterZu('P')` ergibt `01010000`).
- „Jeder Buchstabe ist im ASCII-Code genau eins weiter als der vorige“ gilt für A–Z (65–90) lückenlos. Das gilt auch für a–z.
  Umlaute fehlen in ASCII, das sagt der Text schon im Prinzip-Teil.
- „Die Anzeige unter den Schaltern verrät dir, wo du gerade bist“ stimmt: Bei `ziel` zeigt der Simulator für die Werte 33–126 das
  ASCII-Zeichen an, sonst einen Hinweis. Die Übung ist also durch Probieren lösbar.
- Verweis auf Folge 4: Laut `config.json` heißt s1f04 „Binär zählen und rechnen“. Der Verweis stimmt.
- Format: `[selbst]` hat jetzt zwei Übungen zum Anfassen (u01, u02), wie im README gefordert.

### Befunde

**E2 – Empfehlung: Abstand zum A nennen, nicht nur die Platznummer.**
„Das P ist der 16. Buchstabe“ ist richtig. Einsteiger rechnen aber leicht „A + 16“ und landen bei 81 = `01010001` = Q.
Besser: „Das P ist der 16. Buchstabe, liegt also 15 Plätze hinter dem A.“

**E3 – Empfehlung: Das Beispiel B allein kann ein falsches Muster nahelegen.**
Von A `01000001` zu B `01000010` sieht es so aus, als würde die 1 nach links „wandern“. Ein Einsteiger tippt dann für C auf `01000100`
(das ist D), richtig ist `01000011`. Hilfreich wäre ein drittes Beispiel („C ist `01000011`“) oder der Hinweis „Die ersten drei Schalter
bleiben bei allen Großbuchstaben `010`“. Das grenzt das Probieren sinnvoll ein, ohne Folge 4 vorwegzunehmen.

## 3. Karteikarte s1f01-k08

**Inhaltlich korrekt.** Sie stimmt mit dem Text und der „Im Bild“-Box überein: Lämpchen frei (0)/belegt (1) = Bit, Reihe aus acht
Plätzen = Byte.

**E4 – Empfehlung:** Die Karte fragt nach dem Bild („Was zeigt das Parkhaus-Bild …?“) statt nach dem Begriff, und sie fragt zwei Dinge auf
einmal (wie schon bei k03 angemerkt). Fürs Lernen besser wäre z. B. „Vorne: Warum ist ein Parkplatz-Lämpchen (frei/belegt) ein gutes Bild
für ein Bit? – Hinten: Es kennt genau zwei Zustände, frei (0) oder belegt (1), so wie ein Bit 0 oder 1.“ Die Byte-Hälfte deckt
k03 schon ab. Ändert sich der Hinkt-Satz (F1), muss k08 nicht angepasst werden.

## Zusammenfassung

| Nr. | Teil | Einstufung | Kurz |
|---|---|---|---|
| F1 | werkstatt, Achtung-Box | Fehler | Hinkt-Satz nennt keinen echten Unterschied (das Lämpchen ist auch eindeutig) und stößt sich mit Folge 2 (Schwellen) |
| E1 | werkstatt | Empfehlung | 256 Belegungen (Muster) von der Anzahl belegter Plätze abgrenzen |
| E2 | selbst, u02 | Empfehlung | „15 Plätze hinter dem A“ ergänzen (sonst kommt man leicht auf Q) |
| E3 | selbst, u02 | Empfehlung | C als drittes Beispiel oder „vorne immer 010“, damit nicht die Idee „die 1 wandert“ entsteht |
| E4 | k08 | Empfehlung | Nach dem Begriff fragen statt nach dem Bild, eine Sache pro Karte |

Ergebnis: nicht bestanden
