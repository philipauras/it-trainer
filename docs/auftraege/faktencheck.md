# Auftrag: unabhängiger Faktencheck einer Folge der Lern-App „IT“

Du bist unabhängiger Faktenprüfer. Du hast die Folge NICHT geschrieben. Projekt: /workspace/it-trainer. Zielperson: IT-Einsteiger.

Lies: content/README.md (Format, besonders „Bilder, Grafiken und Mitmachen“), die zu prüfende Folgen-Datei, die Kopfkommentare
der darin benutzten Simulatoren (js/sim/<name>.js) und zum Vergleich Ton/Niveau von content/staffel-1/folge-01-bit.md.
Neue Glossar-Einträge der Folge liegen in /workspace/tmp/glossar-neu/<folgen-id>.md (falls vorhanden) – mitprüfen.

Prüfe streng:
1. **Fakten**: jede Jahreszahl, Person, Zahl, technische Aussage. Recherchiere bei Zweifel im Netz (Originalquellen, Museen,
   Hersteller, Fachliteratur). Quellenangaben im Kopf: gibt es sie, passen sie?
2. **Vereinfachungen**: vertretbar oder erzeugen sie falsche Vorstellungen? Wird gesagt, wo vereinfacht wird?
3. **Das Bild** (Abschnitt `[werkstatt]`, „Im Bild“): Trifft es den Mechanismus? Ist der „Hinkt“-Satz ein echter Unterschied?
4. **Übungen und Simulatoren**: Passen Text und Simulator-Einstellungen zusammen? Sind Übungen lösbar, Anleitungen eindeutig,
   Auflösungen richtig? Rechne Beispiele nach (Binärzahlen, Wahrheitstabellen, Programme im cpu-Simulator Schritt für Schritt).
5. **Quiz**: genau eine richtige Antwort, Erklärungen korrekt, keine missverständlichen Ablenker, `Nachlesen:` sinnvoll.
6. **Karteikarten** (falls vorhanden): korrekt, eine Sache je Karte.
8. **Folge steht für sich:** Funktioniert die Folge ohne Vorwissen aus früheren Bildern/Geschichten? Kein Rückgriff auf
   Bilder oder Geschichten anderer Folgen; nötiges Fachwissen von vorher in 1–2 Sätzen neu erklärt (mit Verweis). Verstoß = Fehler.
9. **Auf den Punkt** (`[fazit]`): 3–4 Kernsätze, die genau das Wichtigste der Folge treffen und fachlich stimmen.
10. **Lernpool-Tauglichkeit:** Fragen und Karten verstehen sich ohne die Folge vor Augen; Fragen eher verständnisorientiert
   („Was passiert, wenn …?“) statt Jahreszahlen/Namen; `Nachlesen: abschnitt / Stelle` zeigt auf die passende Stelle.
7. **Verständlichkeit** für Einsteiger; Fachbegriffe beim ersten Auftreten erklärt; Format-Regeln (keine Werkstatt-/Handwerks-Wörter
   wie Lehrling, Geselle, Meister, Gesellenstück, Werkbank).

Einstufung je Befund: **Fehler** (falsche Aussage, irreführendes Bild, nicht lösbare/falsch erklärte Übung, falsche Quizantwort –
muss behoben werden) oder **Empfehlung** (optional). Sei streng bei Fehlern, aber stufe Stilfragen nicht als Fehler ein.

Bericht nach /workspace/it-trainer/docs/faktencheck/<folgen-id>-durchgang-<n>.md (Datum 26.11.2026, geprüfte Datei, Befunde
nummeriert F1…/E1… mit Fundstelle und konkretem Korrekturvorschlag, letzte Zeile genau `Ergebnis: bestanden` oder
`Ergebnis: nicht bestanden`). Bestanden = keine Fehler. Ändere die Folgen-Datei NICHT. Antworte am Ende knapp: Ergebnis,
Liste der Fehler (je eine Zeile), Zahl der Empfehlungen.
