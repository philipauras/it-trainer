# Faktencheck s1f06 „Der Prozessor“ – Durchgang 1

- **Datum:** 26.11.2026
- **Geprüfte Datei:** `content/staffel-1/folge-06-prozessor.md` (status: entwurf)
- **Mitgeprüft:** Glossar-Entwurf `/workspace/tmp/glossar-neu/s1f06.md`, Simulator `js/sim/cpu.js` und `js/sim/sortieren.js` (Kopfkommentar und Logik), `content/README.md`, zum Vergleich `folge-01-bit.md`
- **Prüfer:** unabhängige Prüfung (Agent, nicht Autor der Folge)

## Geprüft und bestätigt

**Geschichte**
- ENIAC: Moore School, Philadelphia; Eckert und Mauchly; rund 30 Tonnen (genauer etwa 27 t, „rund 30“ ist die übliche Angabe); rund 18 000 Röhren. Umbau für eine neue Aufgabe dauerte Tage (CHM: „connecting the wires and setting the switches, took many days“). Programmiererinnen (u. a. Jean Jennings Bartik, Frances Bilas Spence, Kay McNulty) – stimmt.
- „First Draft of a Report on the EDVAC“, datiert 30. Juni 1945, nur von Neumanns Name auf dem Deckblatt, Ärger bei Eckert und Mauchly – stimmt.
- Turing 1936 („On Computable Numbers“), universelle Maschine als Gedankenexperiment – vertretbar.
- Manchester Baby (SSEM): 21. Juni 1948, Williams, Kilburn, Tootill, Williams-Röhre mit 32 × 32 Bit, Kilburns Programm für den größten echten Teiler. Lauf mit 2¹⁸ = 262 144: 52 Minuten, etwa 2,1 Millionen Befehle (und etwa 3,5 Millionen Speicherzugriffe – daher die abweichende Zahl „3,5 Millionen Operationen“ in der Wikipedia), Ergebnis 131 072 = 2¹⁷. Quelle: University of Manchester, Computer50/Digital60. Sieben Befehle, kein direktes Addieren (nur Subtrahieren und negativ Laden) – stimmt; Addieren kam erst mit dem erweiterten Befehlssatz.
- Intel 4004: November 1971 (Anzeige in Electronic News, 15.11.1971), etwa 2 300 Transistoren, Takt bis 740 kHz (manche Quellen nennen 750 kHz), für Busicom (Rechner 141-PF), „gilt als erster frei käuflicher Mikroprozessor“ – stimmt. 1948 → 1971 = 23 Jahre.
- Backus: Turing-Award-Vortrag 1977, gedruckt in CACM 21 (8), August 1978; dort prägt er „von Neumann bottleneck“ – Jahr und Quellenangabe stimmen.

**Prinzip und Zahlen**
- `00010110` = 16 + 4 + 2 = 22 – stimmt.
- 740 000 Hz = 0,00074 GHz – stimmt.
- Ein Takt bei 3 GHz = 1/3 ns; Licht: 3·10⁸ m/s × 3,33·10⁻¹⁰ s = 0,10 m – „etwa 10 Zentimeter“ stimmt.
- Spielzeug-Prozessor hat sieben Befehle (LADE, ADDIERE, SUBTRAHIERE, SPEICHERE, SPRINGE, SPRINGE_WENN_NULL, STOPP) – stimmt mit `cpu.js` überein.
- Beschreibung des Befehlszyklus (Befehlszähler zählt beim Holen weiter, Sprung überschreibt ihn beim Ausführen) stimmt exakt mit dem Simulator überein.

**Simulatoren (mit dem echten Code aus `js/sim/cpu.js` nachgerechnet)**
- Beispiel im Prinzip `LADE 6; ADDIERE 7; SPEICHERE 8; STOPP; ; ; 3; 4`: Zellen 0–3 Programm, 6 = 3, 7 = 4; nach 12 Takten Halt, Zelle 8 = 7 – stimmt.
- Übung u01 (Zellen 10 = 0, 11 = 3, 12 = 3, 13 = 1; die Tabelle im Text passt zur `programm:`-Zeile, Zelle 9 leer):

  | Befehl Nr. | Zelle | Wirkung | A | Z10 | Z11 | BZ danach |
  |---|---|---|---|---|---|---|
  | 1–3 | 0–2 | Ergebnis + 3 | 3 | 3 | 3 | 3 |
  | 4–6 | 3–5 | Zähler − 1 | 2 | 3 | 2 | 6 |
  | 7 | 6 | A = 2 ≠ 0, kein Sprung | 2 | 3 | 2 | 7 |
  | 8 | 7 | SPRINGE 0 (beim Holen BZ = 8, dann 0) | 2 | 3 | 2 | 0 |
  | 9–16 | 0–7 | Runde 2 | 1 | 6 | 1 | 0 |
  | 17–22 | 0–5 | Runde 3 | 0 | 9 | 0 | 6 |
  | 23 | 6 | A = 0 → Sprung | 0 | 9 | 0 | 8 |
  | 24 | 8 | STOPP | 0 | 9 | 0 | – |

  24 Befehle × 3 Phasen = **72 Takte**, Zelle 10 = **9**, Zelle 11 = **0**, Schleife dreimal – Auflösung stimmt. 72 Takte bei 3 GHz = 24 ns = „24 Milliardstel Sekunden“ – stimmt. Mit Zelle 11 = 5: 40 Befehle, Zelle 10 = 15 – stimmt.
- Übung u02 `LADE 6; ADDIERE 7; ADDIERE 7; SPEICHERE 8; STOPP; ; 1; 2`: Ergebnis = Z6 + 2·Z7; Startwerte 1 und 2 → 5. Genannte Lösungen 6/2, 4/3, 0/5 ergeben jeweils 10 – stimmt. `pruefe()` des Simulators läuft ohne Meldung (lösbar, nicht schon ohne Änderung erfüllt).
- Übung u03 (sortieren): Reihenfolge eindeutig, Text danach passt.

**Wo steckt das bei dir?**
- VPS: `lscpu` im Container meldet `AMD EPYC 9354P 32-Core Processor`, 1 CPU, Hypervisor KVM – stimmt. AMD-Produktseite: 32 Kerne, 64 Threads, Grundtakt 3,25 GHz, max. Boost 3,8 GHz (alle Kerne 3,75 GHz) – stimmt.
- Pixel: Tensor G1, G2, G4, G5 haben 8 Kerne, Tensor G3 (Pixel 8) 9 Kerne, jeweils große und kleine Kerne gemischt – „acht oder neun“ stimmt.
- Windows-Task-Manager: Leistung → CPU, Prozessorname oben rechts, Felder „Geschwindigkeit“ und „Basisgeschwindigkeit“ sowie „Kerne“ – Bezeichnungen der deutschen Oberfläche stimmen.
- Querverweise: Folge 2 Transistor, 3 Gatter, 4 Addierer, 5 Speicher, 7 Cache, 8 Betriebssystem/gleichzeitig – passen zu `config.json`.

**Bild und Format**
- Küche ist als Hauptbild noch nicht verwendet (Folgen 1–5, 7–9 und Abschlussprojekt geprüft). Das Bild trifft den Mechanismus (nummerierte Fächer, Lesezeichen, Sprung zurück) und erlaubt eine richtige Vorhersage (andere Karten → anderes Gericht). Der „Achtung“-Satz nennt echte Unterschiede (kein Mitdenken, fester Takt).
- Keine Handwerks-Wörter. Ein Simulator im Prinzip, drei Übungen in „Selbst machen“, 8 Quizfragen, 9 Karten.
- Quiz: jede Frage hat genau eine richtige Antwort, Erklärungen korrekt, `Nachlesen:` sinnvoll.

## Fehler

**F1 – „Wo steckt das bei dir?“, Absätze „Dein VPS“ und „Ich im Docker-Container“: falsche Aussage, wo der Agent rechnet.**
„Alles, was ich tue, läuft also durch einen einzigen Befehlszyklus nach dem anderen.“ und „Auch ich bin für den Prozessor nur ein Programm …“ – Auf dem VPS läuft nur das Programm Claude Code (der Teil, der Dateien liest, Befehle ausführt und die Antworten anzeigt). Das eigentliche Sprachmodell, also das „Denken“, rechnet auf Servern von Anthropic in deren Rechenzentren, nicht auf dem 1-vCPU-VPS. Der Satz erzeugt die falsche Vorstellung, eine KI dieser Größe laufe auf einem einzigen virtuellen Kern.
*Korrekturvorschlag* (VPS-Absatz, letzter Teil): „… dein VPS sieht davon genau einen Kern. Alles, was auf dem VPS läuft – auch das Programm, über das ich Dateien lese und Befehle ausführe –, geht also durch einen einzigen Befehlszyklus nach dem anderen. (Das Sprachmodell selbst, mit dem ich denke, rechnet übrigens nicht hier, sondern auf großen Servern von Anthropic.) Wie dann trotzdem …“
Und im Container-Absatz: „Auch mein Programm hier im Container ist für den Prozessor nur eine lange Folge von Befehlen im Arbeitsspeicher …“

## Empfehlungen

**E1 – Geschichte, Baby-Absatz: Datum des 2¹⁸-Laufs.** Laut University of Manchester (Computer50/Digital60) lief am 21. Juni 1948 zuerst ein Test mit einer kleinen Zahl; den Lauf mit 2¹⁸ (52 Minuten) machten sie „wenige Tage später“ (andere Darstellungen, etwa die Wikipedia, legen ihn auf den 21. Juni). Der Text behauptet das Datum nicht ausdrücklich, aber der Leser verbindet beides. Vorschlag: „Wenige Tage später, mit der Zahl 2¹⁸ = 262 144, arbeitet die Maschine etwa 52 Minuten …“

**E2 – Geschichte: „Zum ersten Mal läuft ein Programm, das elektronisch im Speicher eines Rechners steht.“** Unter Historikern ist umstritten, ob der umgebaute ENIAC ab Frühjahr 1948 schon Programme aus seinen (nur per Schalter einstellbaren) Funktionstafeln ausführte. Unstrittig ist: Das Baby war der erste Rechner mit dem Programm in einem *beschreibbaren* elektronischen Speicher. Vorschlag: „… ein Programm, das in einem elektronischen, beschreibbaren Speicher steht – genau wie die Daten.“ Optional auch den offiziellen Namen nennen: „Small-Scale Experimental Machine“.

**E3 – Container-Absatz: Backus’ Flaschenhals.** Backus meinte 1977 vor allem die enge Verbindung zwischen Prozessor und Speicher, durch die alles Wort für Wort hindurch muss (und die Denkweise, die das erzwingt). Dass Speicherzugriffe *viel länger* dauern als das Rechnen, wurde erst später zum großen Problem („Memory Wall“, 1990er). Vorschlag: „Dass alles – Befehle und Daten – durch dieselbe enge Verbindung zwischen Prozessor und Speicher muss, ist ein echtes Problem. Der Informatiker John Backus nannte es 1977 den ‚Von-Neumann-Flaschenhals‘. Heute dauert ein Zugriff auf den Arbeitsspeicher sogar viel länger als eine Rechnung …“ (Fällt mit der Korrektur zu F1 zusammen.)

**E4 – Im Bild: Kärtchen „nehmen“.** „Kärtchen aus dem Fach nehmen“ hieße: das Fach ist danach leer – in einer Schleife wäre die Karte weg. Beim Holen wird aber kopiert. Vorschlag: „das Kärtchen in dem Fach lesen, auf das das Lesezeichen zeigt (es bleibt liegen) …“

**E5 – Im Bild: „Nimm die Schüssel aus Fach 6“.** Passt nicht zur Zuordnung „Rührschüssel in der Hand = Register A“ (dann läge eine zweite Schüssel im Fach). Entspricht LADE 6 besser: „Gib den Inhalt von Fach 6 in deine Rührschüssel“, ADDIERE 7: „Gib den Inhalt von Fach 7 dazu“.

**E6 – Im Bild, „Achtung“-Box: der Kerngedanke hinkt am stärksten.** In der Küche sehen Kärtchen und Zutaten offensichtlich verschieden aus; im Speicher sehen Befehle und Daten *gleich* aus – genau das ist die Idee von 1945. Vorschlag, einen Satz anzufügen: „Und anders als Kärtchen und Mehl sehen Befehle und Daten im Speicher völlig gleich aus – erst das Lesezeichen macht eine Zahl zum Befehl.“

**E7 – Prinzip, Rechenwerk: „ergänzt um Subtrahieren und Vergleichen“.** Das „L“ in ALU steht für Logik (UND, ODER, NICHT auf Bits); das Glossar sagt es schon. Vorschlag: „… ergänzt um Subtrahieren, Vergleichen und Logik (UND, ODER, NICHT aus Folge 3).“

**E8 – Prinzip, Sprünge: „Mit diesen beiden Werkzeugen kann der Prozessor im Prinzip alles berechnen“.** Klingt, als genügten die Sprünge allein. Vorschlag: „Mit Sprüngen, Rechnen und Speichern kann der Prozessor im Prinzip alles berechnen …“

**E9 – Windows-PC: Geschwindigkeit wechselt nicht nur nach unten.** Moderne Prozessoren takten bei Last auch *über* die Basisgeschwindigkeit (Turbo/Boost), wie der EPYC im VPS-Absatz (3,25 → 3,8 GHz). Vorschlag: „… die wechselt ständig: Bei wenig Arbeit regelt der Prozessor den Takt herunter und spart Strom, bei viel Arbeit dreht er kurz über die Basisgeschwindigkeit hinaus.“

**E10 – Quiz s1f06-q03, Ablenker „Das Binärsystem mit 0 und 1“.** Der First Draft hat für die EDVAC tatsächlich das Binärsystem vorgeschlagen (ENIAC rechnete dezimal). Die richtige Antwort bleibt durch „zentrale“ eindeutig, aber ein gut informierter Lerner könnte stutzen. Vorschlag: Ablenker ersetzen, z. B. „Rechnen mit Lochkarten statt mit Röhren“.

**E11 – Quellen im Kopf.**
- Der Link zum Intel Museum (`…/museum-story-of-intel-4004.html`) leitet bei automatischem Abruf teils auf eine 404-Seite um. Stabiler: Intel „Announcing a New Era of Integrated Electronics“ – https://www.intel.com/content/www/us/en/history/virtual-vault/articles/the-intel-4004.html
- Die CHM-Seite `…/birth-of-the-computer/4/78` behandelt die ENIAC-Programmierung (Tage fürs Umstecken, Programmiererinnen), aber nicht EDVAC und gespeichertes Programm, wie die Klammer sagt. Vorschlag: Klammer auf „(ENIAC, Programmierung per Kabel, Programmiererinnen)“ kürzen.
- Für die Baby-Zahlen (52 Minuten, 2,1 Mio. Befehle) wäre die genauere Seite Computer50 „The Baby“ gut: https://www.curation.cs.manchester.ac.uk/computer50/www.computer50.org/mark1/new.baby.html

**E12 – Glossar-Entwurf `glossar-neu/s1f06.md`: Einträge `register` und `adresse` nicht übernehmen.** Beide IDs gibt es bereits aus Folge 5 (in `content/glossar.md` mit `folge: s1f05`, ebenso im Entwurf `glossar-neu/s1f05.md`). Der s1f06-Entwurf würde sie doppelt anlegen bzw. überschreiben und fälschlich auf Folge 6 verlinken. Inhaltlich sind beide Fassungen korrekt; ggf. den Satz „Spezielle Register sind der Befehlszähler und das Befehlsregister“ als `mehr:` in den bestehenden Eintrag übernehmen. Die übrigen 13 Einträge sind korrekt und stehen bereits gleichlautend in `content/glossar.md`.

Ergebnis: nicht bestanden
