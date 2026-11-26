# Faktencheck s1f09 – Durchgang 2

- **Datum:** 26.11.2026
- **Geprüfte Datei:** `content/staffel-1/folge-09-doppelklick.md` („Was passiert in der halben Sekunde nach dem Doppelklick?“), Stand 26.11.2026 16:01 (einschließlich der während der Prüfung ergänzten Klarstellung zu Claude Code im Absatz „Ich und deine Ablage“)
- **Mitgeprüft:** Glossar-Einträge mit `folge: s1f09` in `content/glossar.md` (datei, metadaten, dateisystem, block, verzeichnis, dateiendung, grafische-oberflaeche, maus), Simulator `js/sim/dateisystem.js` (Übung 1 neu nachgerechnet), Bezug zu Folge 6 (Befehlszyklus), Bericht von Durchgang 1
- **Prüfer:** unabhängige Prüfung (Agent, nicht Autor der Folge)

## Fehler aus Durchgang 1

- **F1 (Blockgröße SSD/Dateisystem): behoben.** Das Prinzip sagt jetzt: Die SSD kennt nur nummerierte Speicherplätze, das Dateisystem fasst sie zu Blöcken von meist 4 KiB zusammen. Karte k03 fragt nach dem „Block im Dateisystem“. Glossar `block` sagt „in die das Dateisystem einen Datenträger einteilt“ und „fast immer ganze Blöcke“. Alles fachlich richtig. Zu einer übrig gebliebenen Formulierung in q02 siehe E1.
- **F2 (Android und Anfangsbytes): behoben.** Android ist gestrichen. Der Satz nennt jetzt den Linux-Befehl `file`. Das stimmt.

## Umgesetzte Empfehlungen aus Durchgang 1 (geprüft)

- E2 (q06, k09 „Mother of All Demos … vorgeführt“), E3 („höchstens eine pro Benutzer“), E4 („MS-DOS übernahm diese Regel von noch älteren Systemen“), E5 (Lesekopf/SSD), E6 (NTFS „in ihren Eintrag in seiner Dateitabelle“), E7 (`stat`: `Blocks: 8`, 8 × 512 = 4 096), E8 (`/dev/sda1` „auf dem VPS“, „der Befehl `df` zeigt das“), E9 („wandelt (dekodiert)“), E10 (q05, neuer Ablenker eindeutig falsch), E11 (q04 wie k08), E12 (Glossar: `multics` nur noch mit `s1f08`, „Benutzeroberfläche“ aus `woerter` entfernt, Engelbart in `mehr`, `dateiendung` „welche Art Inhalt“), E13 (Alto-Satz, „ein Bit wechselt“): alle korrekt umgesetzt, keine neuen Fehler entstanden.
- „Entschlüsseln“ in Schritt 5 passt zur Wortwahl von Folge 6 (Holen → Entschlüsseln → Ausführen). Es ist dort eingeführt und deshalb kein Widerspruch zu E9.
- **Neue Klarstellung zu Claude Code** („schreibt das Programm Claude Code auf dem VPS Bytes in eine neue Datei (das Sprachmodell dahinter rechnet bei Anthropic …)“): stimmt. Auf dem VPS läuft nur das Programm Claude Code, das Sprachmodell rechnet bei Anthropic. Die Datei entsteht auf dem VPS. An keiner Stelle behauptet die Folge, das Modell rechne auf dem VPS. Auch „in dem ich arbeite“ und „Das habe ich ausprobiert“ sind richtig, denn die Befehle laufen tatsächlich dort.

## Erneute Prüfung der ganzen Datei

- **Geschichte:** Engelbart 1968, English, Alto 1973, Star 1981, Apple-Besuch 1979, Lisa 1983, Macintosh 1984, Windows 1985, Daley/Neumann 1965, MS-DOS 8.3: unverändert richtig.
- **Prinzip:** Datei = Bytes + Name + Metadaten, ASCII-H `01001000`, PDF `%PDF`, PNG ab dem zweiten Byte, FAT/NTFS/ext4 in der Achtung-Box, Löschen und TRIM, Doppelklick-Schritte 1–7 mit Achtung-Box: richtig.
- **Übung 1:** Mit `verteilen()` neu nachgerechnet: notiz.txt 6 → 4, foto.jpg 10 → 2 → 12 → 8, brief.txt 3 → 14 → 0 → 9 → 13 → 15. Die Auflösung stimmt, die Übung ist lösbar.
- **Übungen 2 und 3:** Die Reihenfolge ist eindeutig, die Zuordnungen stimmen.
- **Quiz q01–q07:** Jede Frage hat genau eine richtige Antwort, die Erklärungen stimmen. q07 am VPS erneut nachgeprüft: Datei mit „Hallo“ hat 5 Byte und 8 × 512 = 4 096 Byte belegt, die Blockgröße ist 4 096.
- **Karten k01–k09:** inhaltlich richtig (zu k03 siehe E2).
- **Glossar (s1f09):** alle acht Einträge richtig.
- **Format:** Abschnitte vollständig, keine verbotenen Handwerks-Wörter. Rund 3 800 Wörter, die angegebenen 19 Minuten sind vertretbar.

## Fehler

Keine.

## Empfehlungen

### E1 – q02-Erklärung: „Die SSD kennt nur nummerierte Blöcke“
**Fundstelle:** `[quiz]` s1f09-q02, Erklärung. Das ist nicht falsch: Datenträger werden über „logische Blocknummern“ angesprochen, ohne Größenangabe. Seit der Korrektur von F1 sagt das Prinzip aber „nummerierte Speicherplätze“ und nennt nur die Stücke des Dateisystems „Blöcke“. Damit es einheitlich bleibt: „Die SSD kennt nur nummerierte Speicherplätze. Das Verzeichnis ordnet jedem Namen den Ort seiner Daten zu …“.

### E2 – Karte k03: Grammatik und eine Sache je Karte
**Fundstelle:** `[karten]` s1f09-k03, Rückseite. „Ein nummerierter Abschnitt …, in die das Dateisystem …“ passt grammatisch nicht zusammen. Vorschlag: „Eines der nummerierten Stücke fester Größe (meist 4 KiB), in die das Dateisystem den Datenträger einteilt.“ Den Zusatz „Die SSD selbst kennt keine Dateien“ weglassen oder als eigene Karte anlegen.

### E3 – Werkstatt-Achtung: „werden sofort neu vergeben“
**Fundstelle:** `[werkstatt]`, Achtung-Box. „Sofort neu vergeben“ passt nicht ganz zum Prinzip: Dort bleiben gelöschte Bytes liegen, bis neue Daten sie überschreiben, und Rettung ist manchmal möglich. Vorschlag: „… und frei gewordene Blöcke können sofort neu vergeben werden.“

### E4 – Veraltete Datei `/workspace/tmp/glossar-neu/s1f09.md`
Sie enthält noch den alten Stand (Block „immer ganze Blöcke“, Dateiendung „welches Programm zuständig ist“, `Benutzeroberfläche`, `multics`). Maßgeblich ist `content/glossar.md`, und das ist richtig. Damit der alte Text nicht versehentlich wieder übernommen wird, die Datei löschen oder angleichen.

### E5 – Hauptbilder-Liste in `content/README.md`
Nach dem Bestehen „s1f09 Doppelklick | Zeitschrift mit ‚Fortsetzung auf Seite …‘“ eintragen. Auffällig: Die Liste endet bei s1f03 und s1g, die Bilder von s1f04 bis s1f08 fehlen dort ebenfalls.

### E6 – Kopfkommentar des Simulators
**Fundstelle:** `js/sim/dateisystem.js`, Zeile 1: „Eine SSD ist in nummerierte Blöcke geteilt“. Den Kommentar sehen Lernende nicht, deshalb ist das kein Fehler. Passend zu F1 wäre: „Ein Datenträger ist (vom Dateisystem) in nummerierte Blöcke geteilt“.

## Zusammenfassung

F1 und F2 sind korrekt behoben, die umgesetzten Empfehlungen aus Durchgang 1 stimmen, und die neue Klarstellung zu Claude Code und Anthropic ist richtig. Es gibt keine neuen Fehler, dazu 6 Empfehlungen.

Ergebnis: bestanden
