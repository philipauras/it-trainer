# Faktencheck s1g – Durchgang 2

- **Datum:** 26.11.2026
- **Geprüfte Datei:** `content/staffel-1/abschluss-addierer.md` (Abschlussprojekt „Ein Rechner aus Gattern“), Stand 26.11.2026, 15:57
- **Mitgeprüft:** `content/glossar.md` (Einträge mit `folge: s1g` – `ueberlauf`, `ripple-carry-addierer`, `uebertrags-flag`, `carry-lookahead`, `64-bit-prozessor` – sowie `relais`, `uebertrag`, `halbaddierer`, `volladdierer`, `xoder`), Kopfkommentare von `js/sim/schaltung.js` und `js/sim/addierer.js` (seit Durchgang 1 unverändert), Bezüge zu `folge-02-transistor.md`, `folge-04-binaer.md`, `folge-05-speicher.md`, `folge-06-prozessor.md`, `config.json`
- **Grundlage:** Bericht `docs/faktencheck/s1g-durchgang-1.md`
- **Prüfer:** unabhängige Prüfung (Agent, nicht Autor der Folge)

## Fehler aus Durchgang 1

### F1 – Übertrag über der falschen Spalte: **behoben**
Im Codeblock (Zeilen 44–48) steht die Übertrags-1 jetzt an Zeichenposition 11, genau über der vordersten Ziffer (8er-Stelle). Die Ziffern stehen an den Positionen 11/13/15/17. Nachgezählt habe ich in Unicode-Zeichen; „Ü“ ist ein einzelnes Zeichen, die Spalten stimmen also auch in Festbreitenschrift. Grafik und Text („Vierte Stelle: 0 + 0 + 1 vom Übertrag“) passen jetzt zusammen.

### F2 – Glossar „Relais“: **behoben**
Der Eintrag `relais` in `content/glossar.md` enthält die falsche Aussage „Die ersten Rechenmaschinen rechneten mit Relais“ nicht mehr. Neu steht dort: „Um 1835 von Joseph Henry vorgeführt, zuerst für Telegrafenleitungen genutzt. Konrad Zuses Z3 (1941) rechnete mit rund 2 000 Relais.“ Das ist vertretbar: Henrys Relais von 1835 ist die übliche Angabe, und die Z3 mit rund 2 000 Relais steht so auch in Folge 2 (siehe E3 zur Zahl). Die gleiche falsche Aussage aus `glossar-neu/s1f04.md` findet sich nirgends mehr im Glossar.

## Umgesetzte Empfehlungen aus Durchgang 1 – geprüft

- **E1/E2 Quellen:** IEEE Spectrum „Chip Hall of Fame“, die Intel-Seite „Announcing a New Era …“, Rojas (IEEE Annals 19 (2), 1997, S. 5–16) und Zuse „Der Computer – Mein Lebenswerk“ (Springer, 5. Aufl. 2010) sind korrekt angegeben. Die Startseiten-Quelle des Deutschen Museums ist entfallen. In Ordnung.
- **E3:** „ein kompletter Prozessor – samt Rechenwerk“ und „gilt als erster Mikroprozessor, den man kaufen konnte“: richtig, passt zu Folge 6.
- **E4:** „Verbreitete Prozessoren wie die in PCs (x86) und Handys (ARM)“ sowie der Hinweis auf das Overflow-Flag für Zahlen mit Vorzeichen: fachlich richtig (x86 CF/OF, ARM C/V). Ebenso Karte k06, die Erklärung in Bauabschnitt 3 und der Glossar-Eintrag `uebertrags-flag`.
- **E5:** k04 und Glossar `ripple-carry-addierer`: „wie eine Welle (englisch *ripple*)“, richtig.
- **E6:** „würde die (Zwischen-)Summe ein zweites Mal ausrechnen“: richtig.
- **E7:** „heute stecken meist noch schnellere Abwandlungen davon in den Chips“: richtig. Auch im Glossar `carry-lookahead` (erzeugen = beide Bits 1, weiterreichen = genau ein Bit 1) stimmt es.
- **E8:** „aus dem Arbeitsspeicher, legt die Zahlen in seinen Registern bereit (dort stecken Flipflops, Folge 5)“: richtig, die DRAM-Ungenauigkeit ist beseitigt.
- **E10:** Neuer Ablenker in q01 („Weil er bei 1 + 1 die falsche Summe liefert“): eindeutig falsch (der Halbaddierer liefert für 1 + 1 korrekt `10`). Es gibt weiterhin genau eine richtige Antwort.
- **E11:** Die Erklärung „ARM-Architektur – einer Prozessorfamilie, die besonders stromsparend ist …“ ist richtig und für Einsteiger verständlich.
- **E12:** k09 ist jetzt auf eine Frage gekürzt. k07 und k08 sind unverändert, sie fragen aber im Kern jeweils nach einer Sache. In Ordnung.
- **E13:** Die Z3 wird jetzt in s1g wie in Folge 2 eingeordnet („gilt vielen als erster funktionsfähiger, frei programmierbarer Rechner“). Damit ist die Serie einheitlich. Die Formulierung ist mit „gilt vielen als“ vertretbar.
- **E9 (Glossar zusammenführen):** Im Glossar gibt es keine doppelten IDs mehr. `ueberlauf` und `ripple-carry-addierer` haben `folge: s1g`. `volladdierer` steht bei `s1f04`. Das ist vertretbar, weil Folge 4 (Zeile 153) den Volladdierer schon einführt. Die `woerter` sind nicht vollständig zusammengelegt (siehe E1 unten).

## Erneute Durchsicht der ganzen Datei

Nochmals geprüft und bestätigt: alle Jahreszahlen und Personen (Stibitz 1937, Zuse Z1 1938/Z3 1941/Zerstörung 1943/Nachbau im Deutschen Museum, Intel 4004 1971, Busicom, rund 2 300 Transistoren, 4 Bit; „dreißig Jahre später“ = 1941 → 1971). Alle Rechenbeispiele stimmen: 5 + 6, 3 + 4, 7 + 1, 15 + 1, 15 + 15 → 14, 12 + 6 → 2, 200 + 100 → 44, 2⁶⁴ − 1, 2³² − 1. Die Wahrheitstabelle des Volladdierers passt zu den Simulator-Zeilen `C=00010111; S=01101001`. Übung u01 ist eindeutig lösbar (nur UND/UND), die Ziele in u02/u03 entsprechen dem Format von `addierer.js`. Das Dominobild und der „Achtung“-Satz stimmen. Im Quiz hat jede Frage genau eine richtige Antwort. Die Karten stimmen. Die Bezüge auf Folgen stimmen mit `config.json` überein (Folge 5 Flipflops, Folge 6 Prozessor/ALU, Folgen 8 und 9 Betriebssystem, Staffel 2 „Wie Computer reden“). Keine verbotenen Handwerks-Wörter im Folgentext.

Neue Fehler habe ich nicht gefunden.

## Empfehlungen

### E1 – Glossar `ueberlauf`: Wortformen aus dem Folgentext fehlen
**Fundstelle:** `content/glossar.md`, `ueberlauf`, Feld `woerter` („Überlauf, überläuft, Überläufe“).
Im Folgentext stehen „läuft über“ (Bauabschnitt 3, q05), „übergelaufen“ (Prinzip, k06) und „überlaufen“ (Beispiel 200 + 100). Diese Formen werden nicht verlinkt.
**Vorschlag:** `woerter: Überlauf, überläuft, Überläufe, überlaufen, übergelaufen` (die getrennte Form „läuft über“ nur, wenn der Parser Wortgruppen erkennt).

### E2 – Quiz q06: richtige Antwort sprachlich holprig
**Fundstelle:** s1g-q06, dritte Antwort „Weil der Übertrag sonst durch alle Stellen warten müsste“.
Der Inhalt ist richtig, aber man „wartet“ nicht „durch“ Stellen.
**Vorschlag:** „Weil der Übertrag sonst durch alle 64 Stellen laufen müsste“ oder „Weil jede Stelle sonst auf den Übertrag von rechts warten müsste“.

### E3 – Glossar `relais` / Folge 2: Zahl der Z3-Relais
**Fundstelle:** `content/glossar.md`, `relais` („rund 2 000 Relais“), ebenso `folge-02-transistor.md` Zeile 45.
„Rund 2 000“ ist die häufige Angabe (etwa 600 Relais im Rechenwerk und 1 400 im Speicher). Manche Quellen zählen das Steuerwerk mit und nennen rund 2 600. Das ist kein Fehler.
**Vorschlag (optional):** „mit über 2 000 Relais“, das deckt beide Zählweisen ab.

### E4 – Bauabschnitt 3: „kleinste Lösung“
**Fundstelle:** `[selbst]` Bauabschnitt 3, Erklärung: „Die kleinste Lösung ist zum Beispiel 15 + 1 oder 8 + 8“.
Gemeint ist die kleinste überlaufende *Summe* (16).
**Vorschlag:** „Die kleinste überlaufende Summe ist 16, zum Beispiel 15 + 1 oder 8 + 8; die größte ist 15 + 15 = 30 …“.

## Hinweis (kein Befund zur Folge)
`npm run pruefen` meldet aktuell „inhalt/glossar.json weicht ab“. Nach den Glossar-Änderungen muss noch `npm run bauen` laufen. Das Bild „Dominoreihe“ nach dem Bestehen in die Hauptbilder-Liste in `content/README.md` eintragen (wie in Durchgang 1 angemerkt).

## Zusammenfassung

F1 und F2 sind behoben, die umgesetzten Empfehlungen sind fachlich korrekt, neue Fehler gibt es nicht. 4 optionale Empfehlungen.

Ergebnis: bestanden
