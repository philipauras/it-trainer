# Faktencheck s1f07 „Speicherhierarchie“, Durchgang 4 (zweiter Prüfdurchgang nach der Umstellung)

Datum: 26.11.2026
Prüfer: unabhängige Prüfung (Subagent, hat die Folge nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-07-speicherhierarchie.md`. Grundlage: Bericht Durchgang 3, `git diff HEAD`,
`npm run pruefen` (Inhalte gültig).

## Fehler aus Durchgang 3

- **F1 (Register/Rechenwerk unerklärt): behoben.** Z. 38: „Am schnellsten sind die **Register**: eine Handvoll winziger Speicherplätze
  direkt im **Rechenwerk**, dem Teil des Prozessors, der rechnet (mehr dazu in Folge 6).“ – richtig, steht vor der ersten Verwendung
  in der Tabelle.

## Umgesetzte Empfehlungen – geprüft

- **E1 (q06):** neuer Ablenker „Den Hauptspeicher entlasten, indem er selten benutzte Daten aufnimmt“ – eindeutig falsch (der Cache
  hält gerade die zuletzt benutzten Daten), nicht durch den Fragetext ausgeschlossen. Genau eine richtige Antwort.
- **E2 (Fazit Satz 4):** „‚Speichern‘ heißt, Daten aus dem flüchtigen Arbeitsspeicher eine Stufe tiefer auf die dauerhafte SSD zu
  schreiben“ – stimmt mit Z. 82 überein, richtig.
- **E3 (Kondensator):** „einer Art Mini-Akku für Ladung“ – vertretbare Vereinfachung.
- q01 (Register: „der Platz dort ist knapp“) passt zur neuen Erklärung. Prüfpunkte 8–10 erfüllt.

## Neue Befunde

### Fehler
Keine.

### Empfehlungen
**E1 – Einleitungszeile im Fazit:** „Das Wichtigste in vier Sätzen:“ vor der Liste steht sonst nur in s1f08; die App ergänzt das Fazit
ohnehin. Einheitlich weglassen oder überall setzen.

**E2 – offen aus Durchgang 2/3:** L2 „meist je Kern“ im Simulator, Glossar `cache`, Quelle der Zugriffszeiten – weiter optional.

Ergebnis: bestanden
