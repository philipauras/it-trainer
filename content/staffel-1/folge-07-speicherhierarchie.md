---
id: s1f07
status: freigegeben
faktencheck: 26.11.2026 – Durchgang 1 bestanden, Überarbeitung in Durchgang 2 bestanden; unabhängige Prüfung, Berichte in docs/faktencheck/; Umstellung auf eigenständige Folge + Lernpool (1.5.0): unabhängig geprüft und bestanden
dauer: 17
quellen:
- Computer History Museum, Storage Engine: 1956 – First commercial hard disk drive shipped (IBM 350 RAMAC) | https://www.computerhistory.org/storageengine/first-commercial-hard-disk-drive-shipped/
- Maurice V. Wilkes: Slave Memories and Dynamic Storage Allocation. IEEE Transactions on Electronic Computers EC-14 (2), 1965, S. 270–271 | https://www.cl.cam.ac.uk/teaching/2324/P56/files/wilkes1965cache.pdf
- J. S. Liptay: Structural Aspects of the System/360 Model 85, Part II: The Cache. IBM Systems Journal 7 (1), 1968, S. 15–21 | https://www.andrew.cmu.edu/course/15-440-sp15/assets/READINGS/liptay1968.pdf
- Kioxia (früher Toshiba Memory): Where is Memory Technology From, and Where is it Headed – Geschichte des Flash-Speichers | https://www.kioxia.com/en-jp/insights/history-of-our-memory-201910.html
- IEEE Spectrum, Chip Hall of Fame: Toshiba NAND Flash Memory (Masuoka, Name „flash“ wegen des schnellen Löschens) | https://spectrum.ieee.org/chip-hall-of-fame-toshiba-nand-flash-memory
- Peter J. Denning: The Locality Principle. Communications of the ACM 48 (7), 2005 | https://dl.acm.org/doi/10.1145/1070838.1070856
- John L. Hennessy, David A. Patterson: Computer Architecture – A Quantitative Approach, Kapitel „Memory Hierarchy Design“, Standardwerk, mehrere Auflagen
---

## [einstieg] Warum wartet der schnellste Teil des Computers ständig?

Ein Prozessor schafft Milliarden Takte pro Sekunde – so viele Rechenschritte im festen Rhythmus (mehr dazu in Folge 6). Aber bei fast jedem Befehl braucht er etwas aus dem Speicher – einen Befehl, eine Zahl. Und hier kommt die unbequeme Wahrheit: Der Arbeitsspeicher ist im Vergleich zum Prozessor quälend langsam. Bis eine Zahl von dort ankommt, könnte der Prozessor Hunderte Takte lang rechnen.

Würde er jedes Mal einfach warten, wäre dein Computer ein Bruchteil so schnell, wie er ist. Dass er es nicht ist, verdankt er einer cleveren Ordnung: einer Treppe aus Speichern, vom winzigen und blitzschnellen bis zum riesigen und gemächlichen. Diese Treppe heißt **Speicherhierarchie**, und in dieser Folge steigst du sie Stufe für Stufe hinab.

## [geschichte] Fünfzig Scheiben und ein Diener-Speicher

**Kalifornien, 1956.** IBM liefert etwas aus, das es noch nie gab: eine Festplatte. Entwickelt im IBM-Labor in San José, geht das erste Gerät im Juni an eine Papierfirma in San Francisco. Das Gerät heißt **IBM 350** und gehört zum Rechensystem **RAMAC**. Darin drehen sich **fünfzig Scheiben** mit je 61 Zentimetern Durchmesser, 1 200 Mal pro Minute. Ein Arm mit Leseköpfen fährt zur richtigen Scheibe und Spur. Fassungsvermögen: **5 Millionen Zeichen** – grob gerechnet etwa so viel wie ein oder zwei Handyfotos heute. Bis ein bestimmter Eintrag gefunden war, verging im Schnitt gut eine halbe Sekunde. Das klingt langsam, war aber revolutionär: Zum ersten Mal konnte ein Rechner in einem so großen Datenbestand direkt auf einen beliebigen Datensatz zugreifen, statt ein Magnetband von vorne bis hinten abzuspulen.

Schon damals war klar: Großer Speicher ist langsam, schneller Speicher ist teuer. **1965** schlug der britische Informatiker **Maurice Wilkes** aus Cambridge einen Ausweg vor. In einer nur zwei Seiten langen Arbeit beschrieb er einen kleinen, schnellen Zusatzspeicher, der automatisch Kopien der zuletzt benutzten Daten aus dem großen, langsamen Hauptspeicher bereithält. Er nannte ihn „slave memory“ – heute würde man sagen: einen Hilfsspeicher, der dem Hauptspeicher zuarbeitet.

Die Idee ging in Serie: IBM kündigte **1968** die **System/360 Model 85** an, den ersten kommerziellen Rechner mit einem solchen Zwischenspeicher – je nach Ausstattung 16 bis 32 Kilobyte groß. In einem Fachartikel über die Maschine bekam er 1968 den Namen, der sich durchsetzte: **Cache**, vom französischen *cacher*, „verstecken“. Denn der Cache arbeitet versteckt: Kein Programm muss sich um ihn kümmern.

> **Wusstest du?:** Den Speicher in deiner SSD und deinem Handy hat der Ingenieur **Fujio Masuoka** bei Toshiba erfunden. Seine Gruppe stellte den **Flash-Speicher** 1984 vor (zuerst in der Bauart NOR), 1987 folgte die Bauart NAND, die heute in fast jeder SSD steckt. Der Name – englisch *flash*, „Blitz“ – spielt darauf an, dass sich der Speicher blockweise blitzschnell löschen lässt.

## [prinzip] Die Treppe der Speicher

### Schnell, klein, teuer – oder langsam, groß, billig

Es gibt keinen Speicher, der zugleich riesig, blitzschnell, billig und dauerhaft ist. Jede Bauart hat ihren Preis:

- Am schnellsten sind die **Register**: eine Handvoll winziger Speicherplätze direkt im **Rechenwerk**, dem Teil des Prozessors, der rechnet (mehr dazu in Folge 6).
- Schneller Speicher braucht viele Transistoren pro Bit und sitzt möglichst nah am Rechenwerk – da ist der Platz knapp. Ein Bit im Cache besteht aus einer kleinen Flipflop-Schaltung mit meist sechs Transistoren – ein Flipflop ist eine Schaltung, die ein Bit festhält, solange Strom da ist (mehr dazu in Folge 5).
- Der Arbeitsspeicher kommt mit einem Transistor und einem winzigen Kondensator – einer Art Mini-Akku für Ladung – pro Bit aus. Das ist viel dichter und billiger – aber langsamer, und er sitzt auf eigenen Chips, ein paar Zentimeter vom Prozessor entfernt.
- Flash-Speicher und Festplatten fassen noch mehr für noch weniger Geld, sind aber noch einmal tausendfach langsamer.

Also stapelt man die Bauarten zu einer Treppe:

| Stufe | Wo? | Größe (grob) | Zugriff (grob) |
|---|---|---|---|
| **Register** | im Rechenwerk | einige Hundert Byte bis wenige KB | 1 Takt |
| **L1-Cache** | in jedem Kern | ca. 32–192 KB | ca. 1 ns |
| **L2-Cache** | meist je Kern | 0,5–3 MB | ca. 4 ns |
| **L3-Cache** | auf dem Chip, für alle Kerne | 8–64 MB | ca. 10–20 ns |
| **Arbeitsspeicher (RAM)** | eigene Chips | 4–64 GB | ca. 100 ns |
| **SSD** | Laufwerk | 250 GB – 4 TB | ca. 20–100 µs |
| **Festplatte** | Laufwerk | 1–20 TB | ca. 5–15 ms |

L1, L2, L3 heißen die Cache-Stufen nach ihrer Entfernung vom Rechenwerk (*Level* 1, 2, 3). Eine Nanosekunde (ns) ist eine Milliardstel Sekunde, eine Mikrosekunde (µs) eine Millionstel, eine Millisekunde (ms) eine Tausendstel. Die Zahlen sind grobe, typische Größenordnungen – je nach Gerät weichen sie ab.

Solche Zahlen sind für Menschen kaum greifbar. Darum rechnet der Simulator sie hoch: Bei etwa 3 GHz (3 Milliarden Takte pro Sekunde) dauert ein Takt eine Drittel-Nanosekunde – ein Griff in den Arbeitsspeicher kostet also rund 300 Takte. **Stell dir vor, ein Prozessortakt dauerte eine Sekunde.** Tippe die Stufen nacheinander an:

:::sim zugriffszeit
festplatte: ja
:::

Ein Griff in den Arbeitsspeicher wären etwa fünf Minuten, einer in die SSD fast zwei Tage – und einer in die Festplatte rund acht Monate. Darum gehört alles, womit der Prozessor gerade arbeitet, möglichst weit nach oben auf die Treppe.

> **Merke:** Je näher am Prozessor, desto **schneller, kleiner und teurer** ist der Speicher. Je weiter weg, desto **langsamer, größer und billiger**.

### Warum der Cache funktioniert: Lokalität

Ein Cache von wenigen Megabyte soll einen Arbeitsspeicher von vielen Gigabyte ersetzen? Das klappt nur, weil Programme sich sehr vorhersehbar verhalten. Man nennt das **Lokalität** – und es gibt sie in zwei Formen:

- **Zeitliche Lokalität:** Was eben gebraucht wurde, wird bald wieder gebraucht. Denk an eine Schleife, die dieselben Befehle immer wieder ausführt: Dieselben Befehle und derselbe Zähler werden immer wieder gelesen. Also behält der Cache, was zuletzt benutzt wurde.
- **Räumliche Lokalität:** Wird eine Speicherzelle gebraucht, werden bald auch ihre Nachbarn gebraucht. Befehle stehen hintereinander im Speicher, Buchstaben eines Textes ebenso. Darum holt der Cache nie nur ein einzelnes Byte, sondern gleich einen ganzen Block – bei heutigen Prozessoren meist 64 Byte am Stück.

Findet der Prozessor die gesuchten Daten im Cache, ist das ein **Treffer** – sie sind sofort da. Wenn nicht, muss er eine Stufe tiefer nachsehen, und der Block wandert auf dem Rückweg in den Cache. Bei typischen Programmen landet die große Mehrheit der Zugriffe einen Treffer. Dadurch fühlt sich der Arbeitsspeicher fast so schnell an wie der Cache, obwohl er tausendmal größer ist.

> **Beispiel:** Ein Programm addiert die Zahlen einer langen Liste. Beim ersten Element holt der Cache gleich den Block mit den nächsten Elementen mit (räumlich). Der Zwischenstand der Summe und die Befehle der Schleife werden bei jeder Runde wieder gebraucht und bleiben im Cache (zeitlich).

### Flüchtig oder dauerhaft

Die Treppe hat noch eine zweite Grenze, quer durch die Mitte: Register, Cache und Arbeitsspeicher sind **flüchtig**. Ohne Strom vergessen sie alles – das Flipflop kann sich nicht mehr festhalten (beim Einschalten steht es zufällig auf 0 oder 1), der Kondensator verliert seine Ladung. SSD und Festplatte sind **dauerhaft**: Flash-Speicher hält Ladungen in gut isolierten Speicherzellen gefangen, die Festplatte magnetisiert winzige Bereiche ihrer Scheiben. Beides bleibt ohne Strom erhalten, jahrelang.

Deshalb ist ein Text verloren, den du nicht gespeichert hast, wenn der Strom ausfällt: Er stand nur im Arbeitsspeicher. „Speichern“ heißt, ihn eine Stufe tiefer auf die SSD zu schreiben. Und deshalb dauert das Hochfahren: Programme und Daten müssen erst von der SSD in den Arbeitsspeicher geladen werden.

> **Achtung:** Vereinfacht: In Wirklichkeit gibt es noch mehr Stufen und Zwischenspeicher, etwa einen eigenen Cache in jeder SSD. Und welche Daten in welcher Cache-Stufe liegen, entscheidet die Hardware selbst nach festen Regeln – kein Programm muss sich darum kümmern.

## [werkstatt] Lernen am Schreibtisch

Stell dir vor, du schreibst eine Hausarbeit. Das Blatt, auf dem du gerade rechnest, hältst du **in der Hand** – schneller geht es nicht, aber mehr als ein, zwei Blätter passen nicht hinein. Auf dem **Schreibtisch** liegen die Bücher, die du gerade brauchst, aufgeschlagen: ein Griff, und du hast sie. Im **Regal** in deinem Zimmer stehen ein paar Hundert Bücher: Aufstehen, suchen, zurück – das dauert schon eine Weile. Was du nicht hast, holst du aus der **Bibliothek in der Stadt**: Das kostet einen halben Tag. Und hat die Bibliothek es nicht, bleibt die **Fernleihe**: Da wartet man Tage.

Klug lernen heißt: Was du gleich wieder brauchst, bleibt aufgeschlagen auf dem Tisch liegen (zeitliche Lokalität). Und wenn du etwas aus dem Regal holst, nimmst du nicht eine einzelne Seite, sondern das ganze Buch – die Nachbarseiten brauchst du bestimmt auch (räumliche Lokalität). Wird der Tisch voll, räumst du das Buch zurück ins Regal, das du am längsten nicht angefasst hast. Ganz ähnlich geht ein Cache vor.

> **Im Bild:** Blatt in der Hand = Register. Aufgeschlagene Bücher auf dem Schreibtisch = Cache. Regal im Zimmer = Arbeitsspeicher. Bibliothek in der Stadt = SSD. Fernleihe = Festplatte. Das ganze Buch statt einer Seite holen = einen ganzen Block in den Cache holen.

> **Achtung:** Am Schreibtisch bleibt alles liegen, wenn du schlafen gehst – im Computer sind Register, Cache und Arbeitsspeicher beim Ausschalten sofort leer, nur SSD und Festplatte behalten ihren Inhalt. Außerdem nimmst du ein Buch aus dem Regal *mit*, der Cache dagegen legt nur eine *Kopie* an: Das Original bleibt im Arbeitsspeicher. Und SSD und Festplatte sind keine Stufen, die nacheinander durchsucht werden wie Bibliothek und Fernleihe – auf ihnen liegen verschiedene Dateien, sie unterscheiden sich vor allem im Tempo.

## [selbst] Steig die Treppe selbst hinab

### Übung 1: Von schnell nach langsam

Bring die Speicher in die richtige Reihenfolge – den schnellsten nach oben, den langsamsten nach unten. Tipp: Denk an den Weg vom Rechenwerk nach außen.

:::sim sortieren
id: s1f07-u01
elemente: Register | L1-Cache | L2-Cache | L3-Cache | Arbeitsspeicher (RAM) | SSD | Festplatte
oben: am schnellsten
unten: am langsamsten
:::

**Auflösung:** Ganz oben die Register direkt im Rechenwerk, dann die Cache-Stufen L1, L2 und L3 auf dem Prozessorchip, danach der Arbeitsspeicher auf eigenen Chips. Unten die beiden dauerhaften Speicher: Die SSD hat keine beweglichen Teile, die Festplatte muss erst ihren Lesekopf bewegen und warten, bis die richtige Stelle vorbeidreht. Das kostet Millisekunden – bei 7 200 Umdrehungen pro Minute allein im Schnitt gut 4 Millisekunden Warten auf die halbe Umdrehung.

### Übung 2: Was bleibt, wenn der Strom weg ist?

Ordne jeden Speicher zu: Verliert er ohne Strom seinen Inhalt (flüchtig), oder behält er ihn (dauerhaft)?

:::sim zuordnen
id: s1f07-u02
gruppen: flüchtig | dauerhaft
paare: Register im Prozessor = flüchtig | L1-Cache = flüchtig | L3-Cache = flüchtig | Arbeitsspeicher (RAM) = flüchtig | SSD = dauerhaft | Festplatte = dauerhaft | USB-Stick = dauerhaft | Speicherkarte in einer Kamera = dauerhaft
:::

**Auflösung:** Alles bis einschließlich Arbeitsspeicher ist flüchtig – die Bits stecken in Flipflops und Kondensatoren, die ohne Strom ihren Zustand verlieren. USB-Stick und Speicherkarte bestehen aus Flash-Speicher wie eine SSD und sind deshalb dauerhaft. Die Grenze zwischen flüchtig und dauerhaft ist auch die Grenze zwischen „gerade in Arbeit“ und „gespeichert“.

### Übung 3: Zeitlich oder räumlich?

Jede Situation nutzt eine Form von Lokalität aus. Welche?

:::sim zuordnen
id: s1f07-u03
gruppen: zeitlich | räumlich
paare: Eine Schleife liest bei jeder Runde denselben Zähler = zeitlich | Ein Programm geht eine Liste Element für Element durch = räumlich | Die Befehle einer Schleife werden hundertmal hintereinander ausgeführt = zeitlich | Der Cache holt mit einem Byte gleich die 63 Nachbarbytes = räumlich | Du öffnest dieselbe Datei innerhalb einer Minute ein zweites Mal = zeitlich | Ein Text wird Buchstabe für Buchstabe angezeigt = räumlich
:::

**Auflösung:** **Zeitlich** heißt: *dasselbe* noch einmal, bald danach – der Zähler, die Schleifenbefehle, die Datei. **Räumlich** heißt: *das Nächste daneben* – das nächste Listenelement, der nächste Buchstabe, die Nachbarbytes im selben Block. Viele Programme nutzen beides gleichzeitig, wie das Summen-Beispiel im Prinzip zeigt.

## [beidir] Wo steckt das bei dir?

Die Treppe der Speicher findest du in jedem deiner Geräte – und du kannst sie dir sogar anzeigen lassen.

**Dein VPS.** Ich habe auf dem Server nachgesehen. Das Programm `lscpu` meldet dort einen L1-Cache von 64 KiB für Daten und noch einmal 64 KiB für Befehle, 512 KiB L2-Cache und 16 MiB L3-Cache. (Diese Werte legt die Virtualisierung fest – der echte Chip im Rechenzentrum ist anders aufgeteilt, aber die Treppe ist dieselbe.) Darunter liegen **3,8 GB Arbeitsspeicher** und ein Laufwerk mit rund 48 GB, auf dem alle Dateien dauerhaft liegen.

Spannend ist die Ausgabe von `free -h`: Dort stand bei mir unter *buff/cache* gut **1 GB**. Linux nutzt gerade nicht gebrauchten Arbeitsspeicher als Cache für das Laufwerk – Dateien, die eben gelesen wurden, bleiben im schnelleren Arbeitsspeicher, falls sie gleich wieder gebraucht werden. Dieselbe Idee wie der Prozessor-Cache, eine Stufe tiefer. Und umgekehrt: Wird der Arbeitsspeicher knapp, lagert Linux selten benutzte Teile auf das Laufwerk aus (*Swap*). Das geht, ist aber langsam – du weißt jetzt, warum.

**Dein Windows-PC.** Task-Manager öffnen (Strg + Umschalt + Esc), dann **Leistung → CPU**: Unten stehen L1-, L2- und L3-Cache deines Prozessors. Unter **Leistung → Arbeitsspeicher** siehst du, wie viel RAM eingebaut ist und wie viel gerade belegt ist. Dort steht auch **„Im Cache“** – das ist nicht der Prozessor-Cache, sondern wie bei Linux Arbeitsspeicher, den Windows als Zwischenspeicher für Dateien von der SSD nutzt. Das Wort „Cache“ bedeutet immer dasselbe: eine schnellere Stufe, die Kopien bereithält.

**Dein Pixel.** Auch dein Handy hat Register und Caches im Prozessor, dazu Arbeitsspeicher. Der große Speicher für Fotos und Apps (unter **Einstellungen → Speicher**) ist Flash-Speicher – dieselbe Erfindung von Fujio Masuoka, die in SSDs steckt. Darum sind deine Fotos noch da, wenn der Akku einmal leer war, offene Apps aber müssen danach neu starten.

**Ich im Docker-Container.** Was ich mir dauerhaft merken soll, schreibe ich in Dateien auf das Laufwerk – mein „Gedächtnis“. Woran ich gerade arbeite – offene Dateien, Zwischenstände –, liegt im Arbeitsspeicher des Servers und wäre bei einem Neustart weg. (Das Sprachmodell selbst, mit dem ich denke, rechnet nicht auf dem VPS, sondern auf Servern von Anthropic.) Wer dafür sorgt, dass sich viele Programme den knappen Arbeitsspeicher teilen, ohne sich in die Quere zu kommen, erfährst du in Folge 8: das Betriebssystem.

## [fazit] Auf den Punkt

- Schneller Speicher ist klein und teuer, großer Speicher langsam und billig – darum ordnet ein Computer seine Speicher als Treppe: Register, Cache, Arbeitsspeicher, SSD, Festplatte.
- Der Cache hält Kopien dessen, was der Prozessor gerade braucht. Das klappt wegen der Lokalität: Was eben gebraucht wurde, wird bald wieder gebraucht (zeitlich), und Nachbardaten werden bald mitgebraucht (räumlich).
- Register, Cache und Arbeitsspeicher sind flüchtig und vergessen ohne Strom alles; SSD und Festplatte sind dauerhaft.
- „Speichern“ heißt, Daten aus dem flüchtigen Arbeitsspeicher eine Stufe tiefer auf die dauerhafte SSD zu schreiben.

## [quiz] Teste dich

### s1f07-q01
Welcher Speicher eines Computers ist am schnellsten, und warum gibt es davon nur sehr wenige?
- [x] Die Register: Sie sitzen direkt im Rechenwerk, der Platz dort ist knapp
- [ ] Der Arbeitsspeicher: Er sitzt auf eigenen Chips und ist besonders dicht gepackt
- [ ] Die SSD: Sie hat keine beweglichen Teile und fasst viele Gigabyte
- [ ] Die Festplatte: Sie speichert Daten magnetisch und dauerhaft
Erklärung: Register sitzen direkt im Rechenwerk des Prozessors; ein Zugriff dauert etwa einen Takt. Dafür ist der Platz dort so knapp, dass es nur einige Hundert Byte bis wenige KB davon gibt.
Nachlesen: prinzip / Schnell, klein, teuer – oder langsam, groß, billig

### s1f07-q02
Warum baut man nicht den ganzen Arbeitsspeicher so schnell wie den Cache?
- [ ] Weil Programme dann nicht mehr funktionieren
- [x] Weil schneller Speicher teuer ist und viel Platz braucht
- [ ] Weil schneller Speicher seinen Inhalt dauerhaft behält
- [ ] Weil der Prozessor gar nicht schneller lesen kann
Erklärung: Ein Cache-Bit braucht meist sechs Transistoren und muss nah am Rechenwerk sitzen. Gigabytes davon wären riesig und unbezahlbar. Darum kombiniert man wenig schnellen mit viel langsamem Speicher.
Nachlesen: prinzip / Schnell, klein, teuer – oder langsam, groß, billig

### s1f07-q03
Ein Programm wiederholt eine Schleife und liest dabei bei jeder Runde denselben Zähler. Welche Eigenschaft von Programmen macht einen Cache dabei nützlich?
- [x] Zeitliche Lokalität
- [ ] Räumliche Lokalität
- [ ] Flüchtigkeit des Speichers
- [ ] Die Größe der Festplatte
Erklärung: Zeitliche Lokalität heißt: Was eben gebraucht wurde, wird bald wieder gebraucht. Darum behält der Cache die zuletzt benutzten Daten.
Nachlesen: prinzip / Warum der Cache funktioniert: Lokalität

### s1f07-q04
Warum holt der Cache nicht nur das eine Byte, das gerade gebraucht wird, sondern einen ganzen Block?
- [ ] Weil einzelne Bytes nicht gespeichert werden können
- [ ] Weil der Arbeitsspeicher sonst überläuft
- [x] Weil die Nachbardaten bald wahrscheinlich auch gebraucht werden
- [ ] Weil der Block dann dauerhaft gespeichert ist
Erklärung: Das ist räumliche Lokalität: Befehle, Listen und Texte liegen hintereinander im Speicher. Wer eine Zelle braucht, braucht bald auch die Nachbarn – die sind dann schon im Cache.
Nachlesen: prinzip / Warum der Cache funktioniert: Lokalität

### s1f07-q05
Der Strom fällt aus, dein Text war nicht gespeichert. Wo stand er?
- [ ] Auf der SSD
- [x] Im Arbeitsspeicher
- [ ] Auf der Festplatte
- [ ] Auf einem USB-Stick
Erklärung: Der Arbeitsspeicher ist flüchtig: Ohne Strom ist sein Inhalt weg. „Speichern“ schreibt den Text auf die SSD, die ihn dauerhaft behält.
Nachlesen: prinzip / Flüchtig oder dauerhaft

### s1f07-q06
Ein großer, langsamer Hauptspeicher wird um einen kleinen, schnellen Zusatzspeicher ergänzt (die Idee des Cache). Was soll dieser Zusatzspeicher tun?
- [ ] Die Daten dauerhaft sichern, damit sie ohne Strom erhalten bleiben
- [ ] Den Hauptspeicher entlasten, indem er selten benutzte Daten aufnimmt
- [x] Kopien der zuletzt benutzten Daten bereithalten, damit der Prozessor sie schnell findet
- [ ] Nur die Befehle des Betriebssystems aufbewahren
Erklärung: Der Cache ist ein kleiner, schneller Zwischenspeicher mit Kopien dessen, was zuletzt benutzt wurde. So muss der Prozessor seltener auf den langsamen Hauptspeicher warten. Die Idee beschrieb der Informatiker Maurice Wilkes 1965 als „slave memory“, den Namen Cache bekam sie 1968.
Nachlesen: geschichte

### s1f07-q07
Man rechnet die Zeiten eines Computers so um, dass ein Prozessortakt (ein Rechenschritt im festen Rhythmus) eine Sekunde dauert. Wie lange dauert dann ungefähr ein Zugriff auf den Arbeitsspeicher?
- [ ] Etwa eine Sekunde
- [x] Etwa fünf Minuten
- [ ] Etwa zwei Tage
- [ ] Etwa acht Monate
Erklärung: Ein Zugriff auf den Arbeitsspeicher dauert grob 300 Takte, hochgerechnet also etwa fünf Minuten. Zwei Tage wären ungefähr die SSD, acht Monate die Festplatte.
Nachlesen: prinzip / Schnell, klein, teuer – oder langsam, groß, billig

### s1f07-q08
Ein Vergleich: Beim Lernen hältst du ein Blatt in der Hand, auf dem Schreibtisch liegen aufgeschlagene Bücher, im Zimmerregal stehen mehr Bücher, in der Stadtbibliothek noch mehr. Welcher dieser Orte entspricht dem Cache eines Computers?
- [ ] Das Blatt in deiner Hand
- [x] Die aufgeschlagenen Bücher auf dem Tisch
- [ ] Das Regal in deinem Zimmer
- [ ] Die Bibliothek in der Stadt
Erklärung: Die Bücher auf dem Tisch sind mit einem Griff erreichbar, aber der Platz ist knapp – wie beim Cache. Das Blatt in der Hand ist das Register, das Regal der Arbeitsspeicher, die Bibliothek die SSD.
Nachlesen: werkstatt

## [karten] Für deinen Karteikasten

### s1f07-k01
Vorne: Was gilt für Speicher auf der Treppe: je näher am Prozessor, desto …?
Hinten: Desto schneller, kleiner und teurer. Je weiter weg, desto langsamer, größer und billiger.

### s1f07-k02
Vorne: Nenne die Speicherhierarchie von schnell nach langsam.
Hinten: Register, L1-, L2-, L3-Cache, Arbeitsspeicher (RAM), SSD, Festplatte.

### s1f07-k03
Vorne: Was ist ein Cache?
Hinten: Ein kleiner, schneller Zwischenspeicher, der Kopien oft benutzter Daten aus dem langsameren Speicher bereithält. Kein Programm muss sich um ihn kümmern.

### s1f07-k04
Vorne: Was bedeutet zeitliche Lokalität?
Hinten: Was eben gebraucht wurde, wird bald wieder gebraucht (z. B. der Zähler und die Befehle einer Schleife). Darum behält der Cache das zuletzt Benutzte.

### s1f07-k05
Vorne: Was bedeutet räumliche Lokalität, und was folgt daraus für den Cache?
Hinten: Wer eine Speicherzelle braucht, braucht bald auch ihre Nachbarn. Darum holt der Cache einen ganzen Block (meist 64 Byte) statt eines einzelnen Bytes.

### s1f07-k06
Vorne: Was heißt „flüchtig“, und welche Speicher sind es?
Hinten: Der Inhalt geht ohne Strom verloren. Flüchtig sind Register, Cache und Arbeitsspeicher; SSD und Festplatte sind dauerhaft.

### s1f07-k07
Vorne: Man rechnet so um, dass ein Prozessortakt eine Sekunde dauert. Wie lange dauern dann ein Zugriff auf RAM, SSD und Festplatte?
Hinten: RAM etwa fünf Minuten, SSD fast zwei Tage, Festplatte rund acht Monate.

### s1f07-k08
Vorne: Wie entstand die Idee des Cache?
Hinten: Maurice Wilkes beschrieb 1965 einen kleinen, schnellen Zusatzspeicher („slave memory“), der Kopien der zuletzt benutzten Daten aus dem großen, langsamen Hauptspeicher bereithält. Den Namen „Cache“ bekam die Idee 1968 (IBM System/360 Model 85).

### s1f07-k09
Vorne: Beim Lernen am Schreibtisch (Blatt in der Hand, Bücher auf dem Tisch, Regal, Bibliothek): Was entspricht dem Cache eines Computers?
Hinten: Die aufgeschlagenen Bücher auf dem Tisch – mit einem Griff erreichbar, aber der Platz ist knapp.
