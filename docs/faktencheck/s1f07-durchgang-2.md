# Faktencheck s1f07 – Durchgang 2 (Nachprüfung der Überarbeitung)

- Datum: 26.11.2026
- Geprüfte Datei: `content/staffel-1/folge-07-speicherhierarchie.md` (ganze Datei inkl. Quiz und Karteikarten)
- Mitgeprüft: `content/glossar.md` (Einträge `cache`, `flash-speicher`, `nanosekunde`), `js/sim/zugriffszeit.js`, `content/README.md` (Hauptbilder-Liste)
- Grundlage: Bericht `docs/faktencheck/s1f07-durchgang-1.md` (bestanden, 19 Empfehlungen)
- `/workspace/tmp/glossar-neu/s1f07.md` gibt es nicht mehr – die Einträge stehen jetzt direkt in `content/glossar.md`.

## Geänderte und neue Stellen

| Stelle | Ergebnis |
|---|---|
| RAMAC „verging im Schnitt gut eine halbe Sekunde“ | stimmt: üblich angegeben rund 0,6 s (IBM 305 RAMAC), CHM (Kopfquelle) „average access time of under 1 second“ – passt dazu |
| „Entwickelt im IBM-Labor in San José, geht das erste Gerät im Juni an eine Papierfirma in San Francisco“ | stimmt wörtlich mit CHM überein: Team von Reynold Johnson im IBM-Labor San Jose (seit 1954); „shipped … to Zellerbach Paper, San Francisco in June 1956“ (am 26.11.2026 nachgelesen) |
| „Ein Arm mit Leseköpfen fährt zur richtigen Scheibe und Spur“ | stimmt (CHM: „An actuator moved the arm from disk to disk“) |
| 50 Scheiben, 61 cm, 1 200 U/min, 5 Mio. Zeichen | stimmt (CHM: „fifty 24-inch diameter disks … 1200 rpm … 5 million, 6-bit characters“) |
| „Zum ersten Mal … in einem so großen Datenbestand direkt …“ (E2) | umgesetzt, jetzt richtig |
| Flash „1984 (zuerst in der Bauart NOR)“, NAND 1987 | stimmt: Masuoka stellte den Entwurf 1984 auf dem IEEE IEDM in San Francisco vor (IEEE Spectrum); Kioxia nennt „NOR flash 1984“, NAND 1987 (IEDM 1987; Marktstart des ersten NAND-Chips 1989 – im Text nicht behauptet) |
| Name *flash* = blitzschnelles Löschen ganzer Blöcke, Quelle IEEE Spectrum Chip Hall of Fame | Quelle existiert und belegt es: „they settled on ‚flash‘ because of the chip's ultrafast erasing capability“ (am 26.11.2026 nachgelesen). „blockweise“ steht dort nicht wörtlich, ist aber technisch richtig (Flash löscht ganze Blöcke auf einmal statt Byte für Byte). Kopfquelle passt |
| Bild: „Und wenn du etwas aus dem Regal holst, … das ganze Buch“ (E11) | umgesetzt, Text und Im-Bild-Box passen jetzt zusammen (Regal → Tisch = Arbeitsspeicher → Cache) |
| Bild: „Ganz ähnlich geht ein Cache vor“ (E12) | umgesetzt |
| Hinkt: „wenn du schlafen gehst“ (E14) | umgesetzt, Unterschied (flüchtig) ist echt |
| Hinkt: „SSD und Festplatte sind keine Stufen, die nacheinander durchsucht werden …“ (E13) | umgesetzt, richtig |
| Tabelle Register „einige Hundert Byte bis wenige KB“, 1 Takt | stimmt (allein 32 AVX-512-Register = 2 KB); deckt sich jetzt mit dem Simulator |
| Tabelle L1 „ca. 32–192 KB“ | vertretbar als „grob“: 32 KB (viele x86-Kerne, je Daten bzw. Befehle) bis 192 KB (Befehls-L1 der Apple-Leistungskerne); deckt sich mit dem Simulator |
| Tabelle L2 „meist je Kern“, 0,5–2 MB | „meist je Kern“ stimmt; Obergrenze etwas knapp (siehe E2) |
| Text „Bei etwa 3 GHz (Folge 6) … rund 300 Takte“ (E7) | stimmt: 100 ns / 0,33 ns = 300; Folge 6 nennt 3 GHz und eine Drittel-Milliardstel-Sekunde |
| „obwohl er tausendmal größer ist“ (E9) | vertretbar (wenige MB Cache gegen viele GB Arbeitsspeicher: Faktor tausend und mehr) |
| Flipflop „kann sich nicht mehr festhalten (beim Einschalten steht es zufällig auf 0 oder 1)“ (E10) | umgesetzt, richtig |
| q06 „Kopien zuletzt benutzter Daten“ (E15) | umgesetzt, Antwort und Erklärung passen |
| VPS-Absatz: Woran ich arbeite, liegt im Arbeitsspeicher des Servers; Sprachmodell rechnet auf Servern von Anthropic (E17) | stimmt sinngemäß: Das Modell läuft nicht auf dem VPS, sondern wird über das Netz bei Anthropic abgefragt; einheitlich mit Folge 6 formuliert. Kleine Unschärfe: Anthropic nutzt auch Rechenzentren großer Cloud-Anbieter – für Einsteiger als „Server von Anthropic“ vertretbar |
| VPS: lscpu-Werte, 3,8 GB, 48 GB, buff/cache gut 1 GB | am 26.11.2026 erneut geprüft: stimmt (`free -h`: 3,8Gi, buff/cache 1,2Gi) |
| VPS: Swap-Satz | stimmt, der VPS hat tatsächlich eine Auslagerungsdatei (4 GB `/swapfile`, gerade rund 0,9 GB belegt) |
| Glossar `cache`: Herkunft „cacher“, `woerter` mit L1/L2/L3-Cache, `folge: s1f07` (E18) | umgesetzt, Herkunft richtig, keine doppelte ID mehr. Kurztext siehe E4 |
| Glossar `flash-speicher`: nur `Flash-Speicher` als Wort, „vorgestellt 1984“ | stimmt; das englische *flash* in der Wusstest-du-Box wird nicht mehr unterstrichen |
| Hauptbilder-Liste im README (E19) | umgesetzt (s1f07: Lernen am Schreibtisch) |

## Ganze Datei erneut durchgesehen

- Geschichte (Wilkes 1965, Model 85 1968 mit 16–32 KB, Liptay 1968 „Cache“, *cacher*): unverändert richtig.
- Prinzip, Lokalität, Beispiel, Flüchtig/dauerhaft, Achtung-Kasten: richtig.
- Simulator `zugriffszeit.js` (unverändert): Takte und Hochrechnung passen weiter zu Text, q07 und k07 (RAM 5 Minuten, SSD 1,7 Tage, Festplatte 7,6 Monate).
- Übungen 1–3: lösbar, eindeutig, Auflösungen richtig (7 200 U/min → 4,17 ms für die halbe Umdrehung).
- Quiz q01–q08: je genau eine richtige Antwort, Erklärungen richtig, `Nachlesen` passt.
- Karteikarten k01–k09: richtig, je eine Sache. k03 („Kopien oft benutzter Daten“) ist als heutige Beschreibung richtig und widerspricht q06 nicht.
- Windows-Task-Manager und Pixel („Einstellungen → Speicher“): richtig.
- Keine Werkstatt-/Handwerks-Wörter.
- Hinweis am Rande: `npm run pruefen` meldet zurzeit veraltete erzeugte Dateien (`inhalt/index.json`, `s1f04.json`, `s1f09.json`) – betrifft nicht diese Folge, vor dem Veröffentlichen `npm run bauen`.

## Fehler

Keine.

## Empfehlungen

**E1 – Hinkt-Satz: „Buch aus der Bibliothek“ passt nicht mehr zur Zuordnung** (werkstatt, Achtung-Kasten).
Seit der Überarbeitung holt man das ganze Buch aus dem *Regal* (= Arbeitsspeicher → Cache). Der Kopie-Satz vergleicht aber
mit der *Bibliothek* (= SSD) und sagt dann „das Original bleibt im Arbeitsspeicher“ – zwei verschiedene Stufen in einem Satz.
Vorschlag: „Außerdem nimmst du ein Buch aus dem Regal heraus, der Cache dagegen legt nur eine *Kopie* an: Das Original bleibt
im Arbeitsspeicher.“

**E2 – L2-Obergrenze** (Tabelle und Simulator).
Aktuelle Intel-Leistungskerne haben 2–3 MB L2 je Kern. Vorschlag (wie Durchgang 1, E5): „0,5–3 MB“. Außerdem schreibt der
Simulator noch „je Kern“, die Tabelle „meist je Kern“ – im Simulator ebenfalls „meist je Kern“.

**E3 – Festplatte „ca. 5–10 ms“** (Tabelle, Simulator) – aus Durchgang 1 (E6) noch offen, weiterhin optional: „ca. 5–15 ms“.

**E4 – Glossar `cache`, Kurztext zu eng** (`content/glossar.md`).
„… Zwischenspeicher im Prozessor …“ – das Wort „Cache“ wird aber auch im beidir-Teil unterstrichen, wo es ausdrücklich *nicht*
der Prozessor-Cache ist (Linux *buff/cache*, Windows „Im Cache“). Vorschlag: „Kleiner, schneller Zwischenspeicher, der Kopien
häufig gebrauchter Daten aus einer langsameren Stufe bereithält – meist ist der Cache im Prozessor gemeint.“

**E5 – Quelle für die Zugriffszeiten** (Kopf `quellen`) – aus Durchgang 1 (E8) noch offen: Hennessy/Patterson mit Auflage
nennen, und für die RAMAC-Zugriffszeit von rund 0,6 s ggf. eine IBM-Quelle ergänzen (das CHM sagt nur „under 1 second“).

Ergebnis: bestanden
