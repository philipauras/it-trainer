# Faktencheck s1f05 „Wie sich ein Computer etwas merkt“, Durchgang 5 (zweiter Prüfdurchgang nach der Umstellung)

Datum: 26.11.2026
Prüfer: unabhängige Prüfung (Subagent, hat die Folge nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-05-speicher.md` (`status: entwurf`). Grundlage: Bericht Durchgang 4, `git diff HEAD`,
`npm run pruefen` (Inhalte gültig).

## Fehler aus Durchgang 4

- **F1 (Verweis auf Folge 1 statt Folge 4 in Übung 2): behoben.** Z. 148 verweist jetzt auf Folge 4 und erklärt das Prinzip selbst
  (Stellenwerte 8, 4, 2, 1; 5 = 4 + 1 = `0101`). Nachgerechnet: 12 = 8 + 4 = `1100` – stimmt.

## Umgesetzte Empfehlungen – geprüft

- **E1/E2 (Fazit Satz 3 und 4):** „Mehrere Flipflops … (zum Beispiel acht für ein Byte) bilden ein Register“ und „Der große
  Arbeitsspeicher ist DRAM (ein Kondensator plus Transistor je Bit): platzsparend und billig, muss aber ständig aufgefrischt werden.
  Beide sind flüchtig.“ – fachlich richtig, trifft jetzt die Kernaussage.
- **E3 (q08):** Fragetext verrät die Antwort nicht mehr. Genau eine richtige Antwort (Grün = R); Ablenker (erneuter Druck = S ohne
  Wirkung, Loslassen = Halten, Aufleuchten = Q) eindeutig falsch, Erklärung richtig. Nachlesen `werkstatt` passt.
- **E4 (Addierer „der Bits zusammenzählt“):** umgesetzt, richtig.
- Prüfpunkte 8–10 weiterhin erfüllt.

## Neue Befunde

### Fehler
Keine.

### Empfehlungen
**E1 – Doppelung Übung 2 (Z. 148):** „Die 5 ist `0101`“ steht zweimal kurz hintereinander. Vorschlag: „Im Speicher stehen Zahlen
binär: Jede Stelle zählt doppelt so viel wie die rechts daneben (8, 4, 2, 1). Die 5 ist 4 + 1, also `0101`, die 12 ist 8 + 4, also
`1100` – mehr dazu in Folge 4.“

**E2 – offen aus Durchgang 4 (E5):** „die Zahl 80 oder den Buchstaben P“ ohne Hinweis auf ASCII. Weiter optional.

Ergebnis: bestanden
