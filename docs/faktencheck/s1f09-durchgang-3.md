# Faktencheck s1f09 – Durchgang 3 (neues Format)

**Datum:** 26.11.2026
**Geprüfte Datei:** `content/staffel-1/folge-09-doppelklick.md` (Stand mit `git diff HEAD`: Folge steht für sich, `[fazit]` „Auf den Punkt“, Quiz/Karten als Lernpool)
**Prüfung:** unabhängig (nicht Autor). Ganze Datei gelesen, Schwerpunkt auf den Prüfpunkten 8–10 und auf allen geänderten oder neuen Sätzen, Fragen und Antworten.

## Erneut geprüft

- **Geänderte Sätze im Text:** Einstieg (Bits, Transistoren, Gatter, Flipflops in Klammern erklärt), Multics-Erklärung, „Ein Byte sind acht Bits“, ASCII-Erklärung, Kodierung ohne den Rückgriff auf die Laternen aus Folge 1, SSD-Erklärung, Vorab-Erklärung von Kernel, Prozess, Scheduler und Systemaufruf, Befehlszähler, Cache, Register. Alles fachlich richtig. Der Kernel als der Teil, „der als Einziger den Speicher und die Geräte verwaltet“, ist eine vertretbare Vereinfachung.
- **Unverändert gegenüber Durchgang 2:** Geschichte (abgesehen von Multics), Bild „Zeitschrift“, Übungen 1–3 mit Auflösungen und „Wo steckt das bei dir?“. Das wurde in Durchgang 2 nachgerechnet, und es ist nichts dazugekommen.
- **Prüfpunkt 8 (steht für sich):** Kein Rückgriff mehr auf Bilder oder Geschichten anderer Folgen (die Laternen sind entfernt). Begriffe von früher werden in 1–2 Sätzen neu erklärt, mit Verweis auf die Folge. Das eigene Bild (Zeitschrift) gehört nur zu dieser Folge. Erfüllt; Kleinigkeiten in E3 und E4.
- **Prüfpunkt 9 (Auf den Punkt):** Vier Kernsätze: Datei = Bytes + Name + Metadaten, Bedeutung nicht in den Bytes; Blöcke und Verzeichnis, oft verstreut; Windows wählt nach Endung, die Endung ändert den Inhalt nicht; erst das Programm als Prozess, dann der Systemaufruf. Sie treffen das Wichtigste und stimmen fachlich. Erfüllt.
- **Prüfpunkt 10 (Lernpool):** q01–q05 und q07 verstehen sich ohne die Folge, fragen nach Verständnis, und die `Nachlesen`-Stellen gibt es als Zwischenüberschriften. q07 ist jetzt eine „Warum“-Frage statt einer Frage zum VPS. Die neue q06 hat einen fachlichen Mangel (F1). Die Karten k01–k09 sind für sich verständlich, und k03 ist jetzt grammatisch sauber.

## Fehler

### F1 – q06: Ablenker „Windows-Fenster“ trifft teilweise zu, Erklärung ist irreführend
**Fundstelle:** `[quiz]` s1f09-q06, Ablenker „Sie zeigte erstmals einen Rechner mit Windows-Fenstern“ und letzter Satz der Erklärung.
In der Vorführung von 1968 waren **Fenster schon zu sehen**: Das NLS teilte den Bildschirm in mehrere Fenster. Gängige Darstellungen zählen „windows“ ausdrücklich zu den Neuheiten der Vorführung (z. B. Wikipedia „The Mother of All Demos“, historyofinformation.com: „Hypertext, Text Editing, Windows, Email and a Mouse“). Wer das weiß, findet den Ablenker halb richtig. Der Zusatz „Windows-“ macht ihn nur durch das Wortspiel mit Microsoft falsch. Die Erklärung „fertige Rechner mit Fenstern, Symbolen und Maus folgten erst später“ erweckt außerdem den Eindruck, Engelbart habe keine Fenster gezeigt.
**Korrektur:**
- Den Ablenker durch einen klar falschen ersetzen, z. B. „Sie zeigte erstmals einen Rechner, den man im Laden kaufen konnte“.
- Den Schluss der Erklärung ändern: „… und die Maus, mit der man das bediente. Auch mehrere Fenster auf dem Bildschirm waren schon zu sehen. Die Baumstruktur der Ordner wurde dagegen schon 1965 für Multics beschrieben, und käufliche Rechner mit Fenstern, Symbolen und Maus kamen erst später (Xerox Star 1981, Macintosh 1984).“

## Empfehlungen

### E1 – q06-Frage: „erstmals öffentlich“
**Fundstelle:** s1f09-q06, Fragetext „in der die Computermaus erstmals zu sehen war“. Die Maus gab es im Labor am SRI schon seit 1964, und Engelbart und English hatten sie 1967 in einem Bericht beschrieben. Genauer ist: „in der die Computermaus erstmals öffentlich vorgeführt wurde“.

### E2 – q07: Der Kerngedanke fehlt an der Nachlesen-Stelle
**Fundstelle:** s1f09-q07, `Nachlesen: prinzip / Das Dateisystem: Inhaltsverzeichnis und Blöcke`. Dass das Dateisystem **nur ganze Blöcke** vergibt und auch eine winzige Datei einen ganzen Block belegt, steht nur in `[beidir]` (Windows „Größe auf Datenträger“, Hallo-Datei auf dem VPS), nicht im Prinzip. Vorschlag: Im Prinzip-Abschnitt einen Satz ergänzen, z. B. nach „… braucht mehrere Blöcke.“: „Umgekehrt belegt auch eine winzige Datei mindestens einen ganzen Block – das Dateisystem vergibt Platz nur in ganzen Blöcken.“

### E3 – Übung 2 benutzt „RAM“, der Text sagt „Arbeitsspeicher“
**Fundstelle:** `[selbst]` Übung 2 („in den RAM“, „über den RAM“). „RAM“ wird in dieser Folge nirgends erklärt. Vorschlag: In Schritt 4 des Prinzips „in den Arbeitsspeicher (RAM)“ schreiben.

### E4 – Einstieg: „die wir bisher umgangen haben“
**Fundstelle:** `[einstieg]`, letzter Satz. „Bisher“ setzt voraus, dass man die vorigen Folgen gesehen hat. Vorschlag: „… eine Frage, die kaum jemand stellt: Was ist eigentlich eine Datei?“ Auch „Mit dieser Folge hast du den Weg einmal ganz hinaufgeschafft“ im Rückblick in `[beidir]` setzt die Staffel voraus. Das ist in Ordnung, weil man es zum Verstehen nicht braucht, man könnte es aber vorsichtiger formulieren („Wenn du die ganze Staffel gesehen hast, …“).

### E5 – Geschichte: Fenster bei Engelbart erwähnen
**Fundstelle:** `[geschichte]`, erster Absatz. Passend zu F1 könnte die Aufzählung lauten: „… Text, den man am Bildschirm bearbeitet, **mehrere Fenster nebeneinander**, Verweise, die per Klick …“. Dann zeigt das „Nachlesen“ von q06 auf eine Stelle, die die korrigierte Erklärung stützt.

### E6 – q07-Frage: „bei ext4 unter Linux 4 096 Byte“
ext4 kann auch mit 1 KiB oder 2 KiB großen Blöcken angelegt werden, und mit der Option `inline_data` liegen winzige Dateien sogar im Dateieintrag. Vorschlag: „(bei ext4 unter Linux meist 4 096 Byte)“.

### E7 – Hinweis zum Bauen (nicht zum Inhalt)
`npm run pruefen` meldet: Die erzeugten Dateien in `inhalt/` (alle Folgen und `index.json`) sind nicht aktuell. Vor der Freigabe `npm run bauen` laufen lassen.

## Zusammenfassung

Die Umstellung ist gelungen: Die Folge steht für sich, „Auf den Punkt“ ist knapp und richtig, und Quiz und Karten taugen für den Lernpool. Es bleibt ein Fehler in der neuen q06: Ein Ablenker trifft teilweise zu, und die Erklärung leugnet indirekt, dass Engelbart 1968 Fenster gezeigt hat. Dazu kommen 7 Empfehlungen.

Ergebnis: nicht bestanden
