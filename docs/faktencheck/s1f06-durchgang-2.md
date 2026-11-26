# Faktencheck s1f06 „Der Prozessor“ – Durchgang 2

- **Datum:** 26.11.2026
- **Geprüfte Datei:** `content/staffel-1/folge-06-prozessor.md` (status: entwurf)
- **Mitgeprüft:** Bericht Durchgang 1 (`docs/faktencheck/s1f06-durchgang-1.md`), Glossar `content/glossar.md` (alle Einträge mit `folge: s1f06`), Simulator `js/sim/cpu.js` (Kopfkommentar und Logik). Ein Glossar-Entwurf `/workspace/tmp/glossar-neu/s1f06.md` existiert nicht mehr.
- **Prüfer:** unabhängige Prüfung (Agent, nicht Autor der Folge)

## Fehler aus Durchgang 1

**F1 (VPS / Docker-Container: wo der Agent rechnet) – behoben.**
- VPS-Absatz: „Alles, was auf dem VPS läuft – auch das Programm, über das ich Dateien lese und Befehle ausführe –, geht also durch einen einzigen Befehlszyklus nach dem anderen. (Das Sprachmodell selbst, mit dem ich denke, rechnet übrigens nicht hier, sondern auf großen Servern von Anthropic.)“ – sachlich richtig: Auf dem VPS läuft nur das Programm (Claude Code), das Sprachmodell rechnet bei Anthropic. Bei 1 vCPU ist „ein Befehlszyklus nach dem anderen“ aus Sicht des VPS korrekt.
- Container-Absatz: „Auch mein Programm hier im Container ist für den Prozessor nur eine lange Folge von Befehlen im Arbeitsspeicher …“ – richtig. Dass das Programm in JavaScript geschrieben ist und erst zur Laufzeit in Maschinenbefehle übersetzt wird, verschweigt der Satz; als Vereinfachung auf diesem Niveau vertretbar.

## Umgesetzte Empfehlungen aus Durchgang 1 – geprüft

| Nr. | Umsetzung | Urteil |
|---|---|---|
| E1 | „Wenige Tage später, mit der Zahl 2¹⁸ = 262 144 … etwa 52 Minuten … rund 2,1 Millionen Befehle … 131 072“ | Richtig. Computer50 und Digital60 (beide abgerufen, beide laden): „The first program to run successfully, on June 21st 1948 …“ und „within days they had built up to trying the program on 2¹⁸ … 52 minutes, involving about 2.1 million instructions with about 3½ million store accesses.“ |
| E2 | „offiziell ‚Small-Scale Experimental Machine‘“ und „ein Programm, das in einem elektronischen, beschreibbaren Speicher steht – genau wie die Daten“ | Richtig. Manchester schreibt „Small Scale Experimental Machine“ (ohne Bindestriche); die Bindestrich-Schreibung ist im Deutschen korrekt und auch in der Literatur üblich. Die vorsichtigere Formulierung („beschreibbar“) ist unstrittig. |
| E3 | Backus 1977: „durch dieselbe enge Verbindung zwischen Prozessor und Speicher“; „Heute dauert ein Zugriff … viel länger als eine Rechnung“ | Richtig, zeitlich sauber getrennt. Arbeitsspeicherzugriff heute etwa 50–100 ns, eine Rechnung unter 1 ns. |
| E4 | „das Kärtchen … lesen – es bleibt dort liegen“ | Richtig, trifft das Kopieren beim Holen. |
| E5 | „Gib den Inhalt von Fach 6 in deine Rührschüssel“, „Gib den Inhalt von Fach 7 dazu“ | Passt jetzt zu LADE 6 / ADDIERE 7 und zur Zuordnung Rührschüssel = Register A. |
| E6 | „Achtung“-Box: „anders als Kärtchen und Mehl sehen Befehle und Daten im Speicher völlig gleich aus – erst das Lesezeichen macht eine Zahl zum Befehl“ | Richtig, echter Unterschied, passt zu q06. |
| E7 | Rechenwerk „ergänzt um Subtrahieren, Vergleichen und Logik (UND, ODER, NICHT aus Folge 3)“; ebenso Karte k05 | Richtig. |
| E8 | „Mit Sprüngen, Rechnen und Speichern kann der Prozessor im Prinzip alles berechnen … genug Zeit und Speicher“ | Richtig (Turing-Vollständigkeit mit der Einschränkung „im Prinzip“). |
| E9 | Turbo: „bei viel Arbeit dreht er kurz über die Basisgeschwindigkeit hinaus“ | Richtig; passt zum EPYC-Absatz (3,25 → 3,8 GHz). „Kurz“ ist vereinfacht (Boost kann bei guter Kühlung lange anhalten), aber nicht falsch. Task-Manager: „Basisgeschwindigkeit“ und „Geschwindigkeit“ sind die Bezeichnungen der deutschen Oberfläche. |
| E10 | q03 neuer Ablenker „Rechnen mit Lochkarten statt mit Röhren“ | Eindeutig falsch, keine Verwechslungsgefahr mit der richtigen Antwort. Genau eine richtige Antwort. |
| E11 | Quellen: Intel „Announcing a New Era of Integrated Electronics“, CHM-Klammer gekürzt, Computer50 „The Baby“ ergänzt | Intel-Seite lädt (HTTP 200, kein 404), Titel stimmt, nennt Busicom und 1971. Computer50-Seite lädt und belegt 2¹⁸/52 min/2,1 Mio. Befehle. CHM-Klammer passt jetzt. Kleine Lücke siehe E1 unten. |
| E12 | Glossar: `register` und `adresse` | Erledigt: beide stehen in `content/glossar.md` nur einmal mit `folge: s1f05`, keine Doppelung. |

## Ganze Datei erneut geprüft und bestätigt

- **Geschichte:** ENIAC (Philadelphia, Moore School, Eckert/Mauchly, rund 30 t, Umbau dauerte Tage, Programmiererinnen); First Draft 30.06.1945, nur von Neumanns Name, Ärger bei Eckert/Mauchly; Turing 1936; Baby 21.06.1948, Williams/Kilburn/Tootill, Williams-Röhre 32 × 32 Bit, sieben Befehle, kein direktes Addieren (nur Subtrahieren und negativ Laden); Intel 4004 November 1971, etwa 2 300 Transistoren, bis 740 kHz, Busicom, „gilt als erster frei käuflicher Mikroprozessor“; 1948 → 1971 = 23 Jahre. Alles stimmt (unverändert gegenüber Durchgang 1).
- **Prinzip/Zahlen:** `00010110` = 22; 740 000 Hz = 0,00074 GHz; 3 GHz → 1/3 ns → Licht etwa 10 cm. Stimmt.
- **Simulatoren** (Code `cpu.js` unverändert gegen Durchgang 1 nachvollzogen): Beispiel im Prinzip 12 Takte, Zelle 8 = 7; u01: 24 Befehle = 72 Takte, Zelle 10 = 9, Zelle 11 = 0, Schleife dreimal, 72 Takte bei 3 GHz = 24 ns; mit Zelle 11 = 5 → 15; u02: Z6 + 2·Z7, Start 5, Lösungen 6/2, 4/3, 0/5 → 10; u03 Reihenfolge eindeutig. Alles stimmt.
- **Quiz q01–q08:** jeweils genau eine richtige Antwort, Erklärungen korrekt (q03: „Transistoren gab es 1945 noch nicht“ – erster Transistor Dezember 1947, stimmt), `Nachlesen:` passend.
- **Karteikarten k01–k09:** alle korrekt, je eine Sache, passen zum Text (k05 jetzt mit Logik).
- **Wo steckt das bei dir?:** EPYC 9354P (32 Kerne, 3,25/3,8 GHz), 1 vCPU, Pixel acht oder neun Kerne, Task-Manager-Weg, Querverweise Folge 7 (Cache) und 8 (gleichzeitig) – stimmt.
- **Glossar (`folge: s1f06`):** Prozessor (CPU), Takt (Z3 1941 etwa 5 Takte pro Sekunde – genauer etwa 5,3 Hz, stimmt), Befehlszähler, Befehlsregister, Steuerwerk, Befehlszyklus, Gigahertz, Sprungbefehl, Schleife, Von-Neumann-Architektur, Mikroprozessor, Prozessorkern, Pipeline, vCPU, Rechenwerk (ALU). Alle korrekt und zum Text passend.
- **Format:** keine Handwerks-Wörter; Fachbegriffe beim ersten Auftreten erklärt; Bild mit „Im Bild“- und „Achtung“-Box.

## Fehler

Keine.

## Empfehlungen

**E1 – Quellen im Kopf, Intel-Eintrag: Klammer „(1971, 2 300 Transistoren)“.** Die Intel-Seite „Announcing a New Era of Integrated Electronics“ nennt nur 1971 und Busicom, aber weder November noch 2 300 Transistoren noch den Takt. Die Fakten selbst stimmen. Vorschlag: Klammer auf „(1971, Auftrag von Busicom)“ ändern und für Transistorzahl, Takt und November 1971 eine zweite Quelle ergänzen, z. B. Computer History Museum, „The Silicon Engine – 1971: Microprocessor Integrates CPU Function onto a Single Chip“ (https://www.computerhistory.org/siliconengine/microprocessor-integrates-cpu-function-onto-a-single-chip/).

**E2 – Im Bild, Holen und Entschlüsseln: zweimal „lesen“.** Holen heißt „das Kärtchen … lesen“, Entschlüsseln „den Schritt lesen und verstehen“. Die Grenze zwischen den Phasen verschwimmt etwas. Vorschlag für Holen: „das Kärtchen aus dem Fach, auf das das Lesezeichen zeigt, vor sich hinlegen – eine Abschrift, das Original bleibt liegen – und das Lesezeichen ein Fach weiterschieben (**Holen**). Dann den Schritt lesen und verstehen (**Entschlüsseln**).“ Rein stilistisch.

**E3 – Geschichte, Baby-Absatz: Bezug von „Wenige Tage später“.** Direkt davor steht „Kilburns Programm sucht den größten echten Teiler einer Zahl.“ ohne Hinweis, dass es am 21. Juni schon mit einer kleineren Zahl lief. Vorschlag: „Am ersten Tag rechnet es mit einer kleinen Zahl. Wenige Tage später, mit der Zahl 2¹⁸ …“

Ergebnis: bestanden
