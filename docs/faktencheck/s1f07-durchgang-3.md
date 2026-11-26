# Faktencheck s1f07 – Durchgang 3 (Umstellung auf das neue Format)

- Datum: 26.11.2026
- Geprüfte Datei: `content/staffel-1/folge-07-speicherhierarchie.md` (Arbeitsstand, verglichen mit `git diff HEAD`)
- Prüfer: unabhängige Prüfung (Subagent, hat die Folge nicht geschrieben)
- Schwerpunkt: Prüfpunkte 8–10 (Folge steht für sich, „Auf den Punkt“, Lernpool-Tauglichkeit) und alle geänderten Sätze,
  Quizfragen und Karten. Die übrige Datei wurde erneut gelesen; Fakten aus Durchgang 1/2 sind unverändert und weiter korrekt.

## Geprüft

| Punkt | Ergebnis |
|---|---|
| Einstieg neu: „Takte … Rechenschritte im festen Rhythmus (mehr dazu in Folge 6)“ | korrekt, Takt jetzt eigenständig erklärt |
| Flipflop neu erklärt („hält ein Bit fest, solange Strom da ist“, Verweis Folge 5) | korrekt, passt zu „flüchtig“ |
| „3 GHz (3 Milliarden Takte pro Sekunde)“, ⅓ ns je Takt, RAM ≈ 300 Takte ≈ 5 min | nachgerechnet, stimmt; SSD 50 µs ≈ 150 000 Takte ≈ 42 h („fast zwei Tage“), HDD ≈ 7 ms ≈ 2,1·10⁷ s ≈ 8 Monate |
| Schleifen-Beispiel ohne Rückgriff auf Folge 6 | eigenständig, korrekt |
| Reihenfolge `[beidir]` vor `[fazit]`, Quiz/Karten am Ende | entspricht README |
| Rückgriffe auf Bilder/Geschichten früherer Folgen | keine; „Folge 8“ am Ende ist ein erlaubter Ausblick |
| `[fazit]`: 4 Kernsätze (Treppe, Cache + Lokalität, flüchtig/dauerhaft, „weiter weg = langsamer“) | fachlich korrekt, trifft das Wichtigste |
| Quiz q01–q08: genau eine richtige Antwort, Erklärungen korrekt | ja (Details siehe unten) |
| q06 (Cache-Idee, neu verständnisorientiert) | richtige Antwort eindeutig, Ablenker eindeutig falsch, Erklärung korrekt (Wilkes 1965, Name 1968 im Liptay-Artikel) |
| q08 / k09 erklären das Schreibtisch-Bild selbst | für den Lernpool ohne Folge verständlich |
| `Nachlesen:`-Stellen | alle Zwischenüberschriften existieren (`npm run pruefen` meldet keinen Formatfehler, nur veraltete erzeugte Dateien – vor dem Veröffentlichen `npm run bauen`) und passen inhaltlich |
| Karten k07, k08, k09 neu formuliert | korrekt, für sich verständlich |
| Format: keine Werkstatt-/Handwerks-Wörter im Text | ja |

## Fehler

### F1 – „Register“ und „Rechenwerk“ werden nicht erklärt (Prüfpunkt 8 / 7)
Fundstelle: `[prinzip]`, Abschnitt „Schnell, klein, teuer …“ (erste Liste und Tabelle, „Register | im Rechenwerk“).
Beide Begriffe stammen aus Folge 6 und werden hier vorausgesetzt. Das Register ist aber die oberste Stufe der Treppe und kommt
in Tabelle, Übung 1 und 2, „Im Bild“, Fazit, q01 und k02 vor. Wer direkt in Folge 7 springt, weiß nicht, was ein Register ist.
Die Folge erklärt Takt und Flipflop jetzt sauber neu – Register und Rechenwerk fehlen noch (in s1f08 wird „Register“ dagegen schon
neu erklärt). Der Glossar-Tooltip ersetzt laut README die Erklärung im Text nicht.
Vorschlag (im ersten Listenpunkt, vor „Ein Bit im Cache …“): „Am schnellsten sind die **Register**: eine Handvoll winziger
Speicherplätze direkt im **Rechenwerk**, dem Teil des Prozessors, der rechnet (mehr dazu in Folge 6).“

## Empfehlungen

### E1 – q06: ein Ablenker ist durch den Fragetext schon ausgeschlossen
Fundstelle: q06, „Den Hauptspeicher ganz ersetzen, weil er schneller ist“. Der Fragetext sagt bereits, der Hauptspeicher werde
„ergänzt“ – die Antwort fällt dadurch sofort weg. Vorschlag: „Den Hauptspeicher entlasten, indem er selten benutzte Daten aufnimmt“
oder „Alle Daten des Hauptspeichers spiegeln, falls dieser ausfällt“.

### E2 – Fazit Satz 4 wiederholt weitgehend Satz 1
Fundstelle: `[fazit]`, 4. Punkt. „Weiter weg = langsamer“ steckt schon im ersten Satz. Wahlweise ersetzen durch die praktische Folge
aus dem Text: „‚Speichern‘ heißt, Daten aus dem flüchtigen Arbeitsspeicher eine Stufe tiefer auf die dauerhafte SSD zu schreiben.“
Oder Satz 3 und 4 zusammenführen. Fachlich ist der Satz korrekt.

### E3 – „Kondensator“ kurz erklären
Fundstelle: `[prinzip]`, zweiter Listenpunkt („einem winzigen Kondensator pro Bit“). Für Einsteiger unbekannt; nicht zwingend nötig
fürs Verständnis, aber ein Halbsatz hilft: „… einem winzigen Kondensator – einer Art Mini-Akku für Ladung – pro Bit“.

### E4 – offene Empfehlungen aus Durchgang 2
E2 (L2 „meist je Kern“ auch im Simulator), E4 (Glossar `cache` zu eng: „im Prozessor“, obwohl `[beidir]` Linux/Windows-Datei-Cache
meint) und E5 (Quelle für Zugriffszeiten präzisieren) sind weiterhin offen und weiterhin optional. Der Hinkt-Satz (E1 aus
Durchgang 2) ist umgesetzt, Tabelle „0,5–3 MB“ und „5–15 ms“ ebenfalls.

## Zusammenfassung

Die Umstellung ist fachlich sauber: Takt und Flipflop werden neu erklärt, alle Quizfragen und Karten sind ohne die Folge verständlich
und eindeutig, das Fazit stimmt. Ein Fehler bei der Eigenständigkeit (F1: Register/Rechenwerk unerklärt), 4 Empfehlungen.

Ergebnis: nicht bestanden
