# Faktencheck s1f07 – Durchgang 1

- Datum: 26.11.2026
- Geprüfte Datei: `content/staffel-1/folge-07-speicherhierarchie.md`
- Mitgeprüft: `/workspace/tmp/glossar-neu/s1f07.md` (neue Glossar-Einträge), Simulator `js/sim/zugriffszeit.js` (Werte, nicht geändert)
- Vergleich: `content/README.md` (Abschnitt „Bilder, Grafiken und Mitmachen“), `folge-01-bit.md`, `folge-05-speicher.md`, `folge-06-prozessor.md`, `content/glossar.md`

## Geprüft und bestätigt

| Aussage | Ergebnis |
|---|---|
| IBM 350 / RAMAC 1956: 50 Scheiben, 24 Zoll (61 cm), 1 200 U/min, 5 Mio. Zeichen | stimmt (CHM: „5 million, 6-bit characters … equivalent to 3.75 Megabytes“) |
| „ein oder zwei Handyfotos“ | vertretbar: 3,75 MB ≈ ein typisches Handyfoto (2–5 MB) |
| San José | entwickelt und gebaut im IBM-Labor San José; erste Auslieferung im Juni 1956 an Zellerbach Paper, San Francisco (CHM). Als Ortsangabe vertretbar |
| Zugriff „etwa eine halbe Sekunde“ | ungefähr richtig (üblich angegeben: rund 0,6 s; CHM: „under 1 second“), siehe E1 |
| Wilkes 1965, Cambridge, zwei Seiten | stimmt: IEEE Trans. Electronic Computers EC-14 (2), S. 270–271; Quell-PDF erreichbar |
| Wilkes-Idee: kleiner schneller Speicher mit Kopien zuletzt benutzter Daten, automatisch | stimmt |
| System/360 Model 85: Ankündigung 1968, erster kommerzieller Rechner mit Cache, 16–32 KB | stimmt (angekündigt Jan. 1968, ausgeliefert Dez. 1969; Puffer 16 KB, Ausbau bis 32 KB) |
| Wort „Cache“ 1968 in einem Fachartikel über die Maschine | stimmt (Liptay, IBM Systems Journal 7 (1), 1968, „Part II: The Cache“; das Wort ging auf den Redakteur der Zeitschrift zurück, IBM selbst sagte „high-speed buffer“). Quell-PDF erreichbar |
| Masuoka/Toshiba, Flash 1984, NAND 1987, Name von Shoji Ariizumi (Kamerablitz) | stimmt inhaltlich; Kioxia-Quelle deckt aber die Namensgeschichte nicht ab, siehe E3 |
| SRAM-Zelle meist sechs Transistoren, DRAM 1 Transistor + 1 Kondensator | stimmt, deckt sich mit Folge 5 |
| Cache-Block meist 64 Byte | stimmt (x86 und die meisten ARM-Kerne; Apple M-Serie 128 Byte – „meist“ passt) |
| 7 200 U/min → gut 4 ms Wartezeit | stimmt: 60 s / 7 200 = 8,33 ms je Umdrehung, halbe Umdrehung = 4,17 ms |
| lscpu im VPS: L1d 64 KiB, L1i 64 KiB, L2 512 KiB, L3 16 MiB; 3,8 GB RAM; ~48 GB Laufwerk; buff/cache gut 1 GB | am 26.11.2026 nachgeprüft: stimmt genau (L1d/L1i 64K, L2 512K, L3 16M, je 1 instance; `free -h`: 3,8Gi gesamt, buff/cache 1,2Gi; Laufwerk 48G) |
| „Diese Werte legt die Virtualisierung fest – der echte Chip ist anders aufgeteilt“ | stimmt: Der echte Prozessor (AMD EPYC 9354P, Zen 4) hat je Kern 32 KB L1d + 32 KB L1i und 1 MB L2, dazu 32 MB L3 je Chiplet. Die gemeldeten Werte (2-fach-assoziativ, 64K/512K/16M) sind die Standardwerte der Virtualisierungssoftware QEMU/KVM |
| Task-Manager: Leistung → CPU zeigt L1/L2/L3; Leistung → Arbeitsspeicher zeigt „Im Cache“ = Dateicache, nicht Prozessor-Cache | stimmt (deutsche Oberfläche: „Im Cache“) |
| Zugriffszeiten in Tabelle und Simulator | alle im Rahmen üblicher Größenordnungen (Register ~0,3 ns, L1 ~1 ns, L2 ~4 ns, L3 10–20 ns, RAM 80–100 ns, SSD 20–100 µs, HDD 5–10 ms), siehe E6 |

### Nachrechnung Simulator `zugriffszeit.js` (Annahme ~3 GHz, 1 Takt ≈ 0,33 ns)

| Stufe | Takte im Sim | ergibt bei 3 GHz | Angabe „echt“ | Ausgabe „1 Takt = 1 s“ | Text der Folge |
|---|---|---|---|---|---|
| Register | 1 | 0,33 ns | ca. 0,3 ns | 1 Sekunde | – |
| L1 | 4 | 1,3 ns | ca. 1 ns | 4 Sekunden | – |
| L2 | 12 | 4 ns | ca. 4 ns | 12 Sekunden | – |
| L3 | 40 | 13 ns | ca. 10–20 ns | 40 Sekunden | – |
| RAM | 300 | 100 ns | ca. 80–100 ns | 5 Minuten | „etwa fünf Minuten“ ✓ |
| SSD | 150 000 | 50 µs | ca. 20–100 µs | 1,7 Tage | „fast zwei Tage“ ✓ |
| HDD | 20 000 000 | 6,7 ms | ca. 5–10 ms | 7,6 Monate | „rund acht Monate“ ✓ |

Takte, Echtzeiten und Hochrechnung passen zueinander und zum Text, zu Quiz q07 und Karte k07. Die Funktion `alltag()`
liefert für alle sieben Stufen korrekte Einheiten. Kein Fehler im Simulator; nur die Größenangaben weichen von der Tabelle
der Folge ab (E4, E5).

Übungen 1–3 sind lösbar und eindeutig, die Auflösungen stimmen. Quiz q01–q08 haben je genau eine richtige Antwort,
`Nachlesen` passt. Karteikarten k01–k09 sind korrekt. Keine Werkstatt-/Handwerks-Wörter gefunden.

## Fehler

Keine.

## Empfehlungen

**E1 – RAMAC-Zugriffszeit genauer** (geschichte, „Bis ein bestimmter Eintrag gefunden war …“).
Üblich angegeben sind rund 600 ms, das CHM (Kopfquelle) sagt nur „under 1 second“. Vorschlag: „verging im Schnitt gut eine
halbe Sekunde“ oder „rund 0,6 Sekunden“. Optional für Genauigkeit: „In San José entwickelt, ging das erste Gerät im Juni
1956 an eine Papierfirma in San Francisco.“

**E2 – „Zum ersten Mal … direkt zugreifen“ ist überzogen** (geschichte).
Folge 5 erklärt den wahlfreien Zugriff am Kernspeicher (1953), auch Trommelspeicher erlaubten direkten Zugriff. Die
Lernenden könnten einen Widerspruch sehen. Vorschlag: „Zum ersten Mal konnte ein Rechner in einem so großen Datenbestand
direkt auf einen beliebigen Datensatz zugreifen, statt ein Magnetband von vorne bis hinten abzuspulen.“

**E3 – Quelle für die Flash-Namensgeschichte fehlt** (Wusstest-du-Box, Kopf `quellen`).
Die Kioxia-Seite nennt „NOR flash 1984“ und „NAND 1987“, erwähnt aber weder Shoji Ariizumi noch den Kamerablitz. Vorschlag:
eine Quelle ergänzen, die das belegt (z. B. Toshiba/Kioxia-Darstellung zur Namensgebung oder ein Masuoka-Interview, etwa in
IEEE Spectrum), und eventuell „1984 (zuerst in der Bauart NOR)“ schreiben.

**E4 – Größen in Tabelle und Simulator angleichen** (prinzip-Tabelle ↔ `zugriffszeit.js`).
Register: Tabelle „wenige Hundert Byte“, Simulator „einige Hundert Byte bis wenige KB“. L1: Tabelle „32–64 KB“, Simulator
„ca. 32–192 KB je Kern“. Beides steht auf derselben Bildschirmseite. Der Simulator ist näher an heutigen Prozessoren
(x86-64 mit AVX-512 hat allein 2 KB an Vektorregistern; Apple-Kerne haben bis 192 KB L1 für Befehle). Vorschlag: Tabelle
auf „einige Hundert Byte bis wenige KB“ und „ca. 32–192 KB“ anpassen (oder Simulator auf die Tabellenwerte – Hauptsache
einheitlich).

**E5 – L2 „in jedem Kern“, 0,5–2 MB** (Tabelle und Simulator).
Bei Intel-Effizienzkernen und Apple-Chips teilen sich mehrere Kerne einen L2; aktuelle Intel-Leistungskerne haben 2,5–3 MB
L2. Vorschlag: „meist je Kern“ und „0,5–3 MB“.

**E6 – Festplatte „ca. 5–10 ms“ ist eher optimistisch** (Tabelle, Simulator).
Eine typische 7 200er-Platte braucht im Schnitt 8–9 ms zum Kopf-Positionieren plus 4,2 ms Drehwartezeit, also rund 12 ms.
Die Auflösung von Übung 1 rechnet selbst schon „gut 4 ms allein“ für das Warten. 5–10 ms ist ein verbreiteter Lehrbuchwert
und als „grob“ vertretbar. Vorschlag: „ca. 5–15 ms“; die 20 Mio. Takte im Simulator (6,7 ms) können bleiben.

**E7 – Annahme „etwa 3 GHz“ im Text nennen** (prinzip, vor dem Simulator; Quiz q07).
Die „300 Takte“ tauchen erst in der Erklärung von q07 auf, die Taktfrequenz steht nur im Simulator-Quellcode. Vorschlag:
„Bei etwa 3 GHz (Folge 6) dauert ein Takt eine Drittel-Nanosekunde – ein Griff in den Arbeitsspeicher kostet also rund
300 Takte.“ Optional dieselbe Angabe im Hinweistext des Simulators.

**E8 – Kopfkommentar des Simulators verweist auf Quellen, die die Zahlen kaum belegen** (`zugriffszeit.js`, Zeile 3).
In der Folge belegt nur Hennessy/Patterson die Zugriffszeiten, und das ohne Seitenangabe. Vorschlag: eine konkrete Quelle
für Zugriffszeiten in den Folgenkopf aufnehmen (z. B. die Speicherhierarchie-Abbildung in Hennessy/Patterson mit Auflage
und Kapitel oder eine Messquelle mit Latenzen aktueller Prozessoren).

**E9 – Logik des Satzes „obwohl er fast so groß ist wie der Arbeitsspeicher“** (prinzip, Lokalität, letzter Absatz).
Der ganze Speicher *ist* so groß wie der Arbeitsspeicher. Vorschlag: „Dadurch fühlt sich der Arbeitsspeicher fast so schnell
an wie der Cache, obwohl er tausendmal größer ist.“

**E10 – Flipflop ohne Strom** (prinzip, „Flüchtig oder dauerhaft“).
„das Flipflop kippt in einen zufälligen Zustand“ – genauer, wie in Folge 5: Ohne Strom hält es nichts fest, *nach dem
Wiedereinschalten* landet es in einem zufälligen Zustand. Vorschlag: „das Flipflop kann sich nicht mehr festhalten (beim
Einschalten steht es zufällig auf 0 oder 1)“.

**E11 – Ganzes Buch holen: Text und Im-Bild-Box passen nicht zusammen** (werkstatt).
Im Text gehört das Beispiel zur Fahrt in die *Bibliothek* (= SSD → Arbeitsspeicher), die Im-Bild-Box ordnet es dem *Cache*
zu (= Regal → Schreibtisch). Vorschlag: „Und wenn du etwas aus dem Regal holst, nimmst du nicht eine einzelne Seite, sondern
das ganze Buch …“

**E12 – „Genau so geht ein Cache vor“** (werkstatt).
Echte Caches ersetzen nur ungefähr das am längsten Unbenutzte (vereinfachte Verfahren, und nur innerhalb kleiner Gruppen
von Plätzen). Vorschlag: „Ganz ähnlich geht ein Cache vor.“

**E13 – Fernleihe = Festplatte legt eine falsche Abfolge nahe** (werkstatt, Im Bild).
„Hat die Bibliothek es nicht, bleibt die Fernleihe“ deutet an: Der Computer sucht erst auf der SSD und dann auf der
Festplatte. In einem PC mit beiden Laufwerken liegen aber verschiedene Dateien auf den beiden, die SSD ist kein Cache der
Festplatte. Vorschlag: im Achtung-Kasten ergänzen: „SSD und Festplatte sind keine Stufen, die nacheinander durchsucht werden –
sie unterscheiden sich vor allem im Tempo.“ Oder die Fernleihe als „Außenmagazin, für Bücher, die selten gebraucht werden“
beschreiben.

**E14 – Hinkt-Satz: „wenn du nach Hause gehst“** (werkstatt, Achtung).
Der Schreibtisch steht laut Bild in deinem Zimmer, also zu Hause. Vorschlag: „Am Schreibtisch bleibt alles liegen, wenn du
schlafen gehst – …“. Der Unterschied selbst (flüchtig, Kopie statt Original) ist ein echter, gut gewählter Hinkt-Punkt.

**E15 – q06: Antwort und Erklärung angleichen.**
Die richtige Antwort sagt „Kopien oft benutzter Daten“, Erklärung und Geschichtsteil sagen (richtig nach Wilkes) „zuletzt
benutzter Daten“. Vorschlag: Antwort „Als kleinen, schnellen Speicher mit Kopien zuletzt benutzter Daten“.

**E16 – VPS: echte Werte nennen (optional)** (beidir).
Die Aussage stimmt; anschaulicher wäre: „Der echte Prozessor, ein AMD EPYC, hat je Kern 32 KB L1 für Daten, 32 KB für
Befehle und 1 MB L2.“ So sieht man, dass die gemeldeten Werte von der Virtualisierung stammen.

**E17 – „Was ich gerade denke … steht im Arbeitsspeicher“** (beidir, Ich im Docker-Container).
Das Sprachmodell selbst rechnet in Rechenzentren von Anthropic, nicht auf dem VPS mit 1 vCPU und 3,8 GB. Auf dem VPS läuft
das Programm, das die Unterhaltung führt und Dateien bearbeitet, und es schreibt den Verlauf auch auf das Laufwerk. Der
Absatz wiederholt außerdem fast wörtlich Folge 5. Vorschlag: „Woran ich gerade arbeite – offene Dateien, Zwischenstände –
liegt im Arbeitsspeicher des Servers und wäre bei einem Neustart weg.“ Am besten für die ganze Serie einheitlich klären.

**E18 – Glossar: zwei IDs gibt es schon** (`/workspace/tmp/glossar-neu/s1f07.md`).
`cache` und `fluechtig` stehen bereits in `content/glossar.md` (aus s1f05). Werden sie so übernommen, meldet die Prüfung
„id doppelt“. Vorschlag: keine neuen Einträge, sondern die vorhandenen ergänzen. Bei `cache`: `woerter` um L1-Cache,
L2-Cache, L3-Cache erweitern, `mehr` um „cacher“, `folge: s1f07`. Bei `fluechtig` genügt der vorhandene Eintrag. Außerdem
prüfen, ob `woerter: Flash` das englische „*flash*“ (Kamerablitz) in der Wusstest-du-Box unterstreicht. Falls ja, „Flash“
streichen oder auf „Flash-Speicher“ beschränken. Die übrigen sechs Einträge sind inhaltlich korrekt.

**E19 – Hauptbilder-Liste im README** (`content/README.md`).
Das Bild „Schreibtisch – Regal – Bibliothek“ in die Liste der verwendeten Hauptbilder eintragen, damit es später nicht wieder
als Hauptbild verwendet wird.

Ergebnis: bestanden
