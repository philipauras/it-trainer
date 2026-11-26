---
id: s1f05
status: entwurf
dauer: 18
quellen:
- William H. Eccles, Frank W. Jordan: Britisches Patent GB 148,582 „Improvements in ionic relays“ (angemeldet 1918, veröffentlicht 1920) | https://historyofinformation.com/detail.php?id=3606
- Computer History Museum: 1953 – Whirlwind computer debuts core memory | https://www.computerhistory.org/storageengine/whirlwind-computer-debuts-core-memory/
- Robert H. Dennard: US-Patent 3,387,286 „Field-effect transistor memory“ (angemeldet 1967, erteilt 4. Juni 1968) | https://patents.google.com/patent/US3387286A
- National Inventors Hall of Fame: Robert H. Dennard | https://www.invent.org/inductees/robert-h-dennard
- Computer History Museum: 1970 – MOS Dynamic RAM competes with magnetic core memory on price (Intel 1103) | https://www.computerhistory.org/siliconengine/mos-dynamic-ram-competes-with-magnetic-core-memory-on-price/
- Computer History Museum: Intel 1103 1024-bit (1K) DRAM („the first widely used semiconductor main memory device“) | https://www.computerhistory.org/revolution/memory-storage/8/368/1017
- JEDEC: JESD79-4, DDR4 SDRAM Standard (Auffrischen jeder Zeile innerhalb von 64 ms)
- Charles Petzold: Code. The Hidden Language of Computer Hardware and Software. 2. Auflage, Microsoft Press, 2022
---

## [einstieg] Wie merkt sich ein Schalter, dass du ihn gedrückt hast?

Du tippst auf deinem Handy einen Buchstaben. Dein Finger berührt das Glas vielleicht eine Zehntelsekunde lang, dann ist er wieder weg. Trotzdem steht der Buchstabe danach auf dem Bildschirm – und bleibt dort, bis du ihn löschst.

Mit allem, was du bisher kennst, geht das eigentlich nicht. Die Logikgatter aus Folge 3 und der Halbaddierer aus Folge 4 haben kein Gedächtnis: Ihr Ausgang hängt nur davon ab, was *gerade jetzt* an den Eingängen anliegt. Nimmst du den Finger vom Schalter, ist auch das Ergebnis weg.

Ein Computer, der rechnen, aber nichts behalten kann, wäre nutzlos. Er muss sich Zahlen merken, Zwischenergebnisse, Buchstaben, ganze Programme. In dieser Folge erfährst du, mit welchem verblüffend einfachen Trick eine Schaltung zu einem Gedächtnis kommt – und warum der Arbeitsspeicher deines Computers trotzdem ganz anders funktioniert.

## [geschichte] Röhren, Magnetringe und winzige Kondensatoren

**1918**, mitten im Ersten Weltkrieg, meldeten die beiden britischen Physiker **William Eccles** und **Frank Jordan** ein Patent an. Sie hatten zwei **Elektronenröhren** – die Vorläufer des Transistors (Folge 2) – so miteinander verschaltet, dass jede die andere steuerte. Die Schaltung hatte zwei stabile Zustände: Entweder leitete die erste Röhre und die zweite sperrte, oder umgekehrt. Ein kurzer Stromstoß ließ sie umkippen, und dann *blieb* sie im neuen Zustand. Später bekam die Schaltung den Namen, unter dem sie heute jeder kennt: **Flipflop**.

Zunächst fand die Schaltung nur wenige Anwendungen. Dann kamen die ersten elektronischen Rechenmaschinen der 1940er Jahre, und sie hielten ihre Zahlen in Röhren-Flipflops fest. Das war schnell, aber teuer: Für jedes einzelne Bit brauchte man ein Röhrenpaar, das Strom fraß, heiß wurde und irgendwann durchbrannte. Für einen großen Speicher war das undenkbar.

### Ringe, die sich erinnern

Die Lösung kam aus einer ganz anderen Richtung. Am Massachusetts Institute of Technology (MIT) baute ein Team um den Ingenieur **Jay Forrester** den Rechner **Whirlwind**. Sein Speicher war langsam und unzuverlässig, und Forrester suchte nach etwas Besserem. Er fand es in winzigen Ringen aus einem magnetisierbaren Material, kaum größer als ein Stecknadelkopf. Ein Ring kann in die eine oder in die andere Richtung magnetisiert sein – das ist ein Bit. Die Ringe wurden wie Perlen auf ein Gitter aus Drähten gefädelt, in Whirlwind jede Ebene mit 32 × 32 Ringen. Durch einen waagerechten und einen senkrechten Draht floss zugleich Strom, aber jeder führte nur halb so viel, wie zum Umpolen nötig ist. Nur am Ring an der Kreuzung kamen beide Hälften zusammen – so traf man genau einen Ring.

Im **August 1953** lief Whirlwind zum ersten Mal mit diesem **Kernspeicher**. Er war schneller und viel zuverlässiger als alles davor – und er vergaß nichts, selbst wenn man den Strom abschaltete. Bis in die 1970er Jahre war der Kernspeicher die häufigste Art von Arbeitsspeicher. Die Ringe wurden oft von Hand aufgefädelt.

> **Wusstest du?:** Wenn ein Programm unter Linux abstürzt, steht manchmal „core dumped“ da – „Kernspeicher ausgekippt“. Das Programm hat beim Absturz den Inhalt seines Speichers in eine Datei geschrieben, damit man den Fehler suchen kann. Die Magnetkerne sind seit Jahrzehnten verschwunden, das Wort ist geblieben.

### Ein Transistor und ein Kondensator

Mitte der 1960er Jahre konnte man bereits Flipflops aus Transistoren auf Chips unterbringen. Robert **Dennard**, Ingenieur bei **IBM**, sah das Problem: Eine solche Speicherzelle brauchte sechs Transistoren pro Bit. **1966** hatte er die Idee, es mit einem einzigen Transistor und einem winzigen **Kondensator** zu versuchen – einem Bauteil, das elektrische Ladung speichert wie ein Mini-Akku. Ist er geladen, ist das eine 1; ist er leer, eine 0. IBM meldete die Erfindung 1967 zum Patent an, erteilt wurde es **1968**.

Den Durchbruch auf dem Markt schaffte ab **1970** die junge Firma **Intel** mit dem Chip **1103**. Er speicherte 1024 Bit, kostete etwa einen US-Cent pro Bit und wurde der erste weit verbreitete Arbeitsspeicher aus Halbleiterchips. Seine Zellen brauchten noch drei Transistoren pro Bit; Dennards Ein-Transistor-Zelle setzte sich wenige Jahre später durch. Diese Art Speicher heißt **DRAM** – und Dennards Zelle steckt bis heute, enorm verkleinert und milliardenfach vervielfältigt, in jedem Computer, jedem Server und jedem Handy.

## [prinzip] Merken durch Rückkopplung

### Der Trick: den Ausgang zurückführen

Ein Logikgatter rechnet aus seinen Eingängen einen Ausgang aus – immer nur in eine Richtung, von links nach rechts. Was passiert, wenn man den Ausgang wieder zum Eingang zurückführt? Das nennt man **Rückkopplung**.

Ein einfaches Gedankenexperiment: Nimm ein ODER-Gatter und verbinde seinen Ausgang mit einem seiner beiden Eingänge. Am anderen Eingang sitzt ein Taster. Solange niemand drückt, ist alles 0. Drückst du den Taster einmal kurz, wird der Ausgang 1 – und diese 1 läuft zurück in den Eingang. Jetzt hält sich das Gatter selbst auf 1, auch wenn du den Taster längst losgelassen hast. Die Schaltung hat sich etwas gemerkt!

Leider merkt sie es sich für immer: Es gibt keinen Weg, die 1 wieder zu löschen. Man braucht eine zweite Steuerleitung zum Zurücksetzen.

### Das RS-Flipflop aus zwei NODER-Gattern

Die klassische Lösung besteht aus zwei **NODER**-Gattern. NODER heißt „nicht ODER“: Sein Ausgang ist genau dann 1, wenn *beide* Eingänge 0 sind – das Gegenteil von ODER, du kennst es aus Folge 3. Die beiden Gatter werden **über Kreuz** verbunden: Der Ausgang des oberen geht in einen Eingang des unteren und umgekehrt. Die zwei freien Eingänge heißen:

- **S** wie *setzen*: eine 1 speichern
- **R** wie *rücksetzen*: die gespeicherte 1 löschen, also eine 0 speichern

Der Ausgang des oberen Gatters heißt **Q** – das ist das gespeicherte Bit. Der untere Ausgang ist immer das Gegenteil davon („nicht Q“). Weil die Eingänge R und S heißen, sagt man **RS-Flipflop** (oft auch SR-Flipflop). Probier es aus: Schalte S ein und wieder aus. Dann R ein und wieder aus. Beobachte, was Q macht, wenn beide Schalter aus sind.

:::sim flipflop
art: sr
:::

Was passiert hier Schritt für Schritt?

1. **S an:** Das untere Gatter bekommt eine 1 und liefert deshalb 0 („nicht Q“ = 0). Das obere Gatter bekommt jetzt zweimal 0 (R ist aus, „nicht Q“ ist 0) und liefert 1. **Q = 1.**
2. **S wieder aus:** Das untere Gatter bekommt jetzt S = 0, aber über die Rückführung Q = 1 – und liefert weiter 0. Das obere bekommt weiter zweimal 0 und bleibt bei 1. **Q bleibt 1.** Die beiden Gatter halten sich gegenseitig fest.
3. **R an:** Das obere Gatter bekommt eine 1 und liefert 0. Damit bekommt das untere zweimal 0 und liefert 1. **Q = 0.**
4. **R wieder aus:** Das obere Gatter bekommt über die Rückführung „nicht Q“ = 1 und bleibt bei 0. **Q bleibt 0.**

Sind S und R beide aus, *hält* das Flipflop einfach seinen Zustand – egal, ob das eine 0 oder eine 1 ist. Das ist Speichern.

> **Achtung:** S und R gleichzeitig einzuschalten ist verboten. Dann sind beide Ausgänge 0 (auch „nicht Q“ ist dann nicht mehr das Gegenteil von Q), und lässt man beide im selben Augenblick los, ist nicht vorhersagbar, in welchem Zustand das Flipflop landet. Echte Schaltungen sind so gebaut, dass dieser Fall nicht vorkommt.

> **Merke:** Ein Flipflop speichert genau ein Bit. Der Trick heißt Rückkopplung: Die Ausgänge werden wieder zu Eingängen, und die Schaltung hält sich selbst in ihrem Zustand – solange Strom fließt.

### Mehrere Flipflops: das Register

Ein Flipflop merkt sich ein Bit. Stellt man acht nebeneinander, merken sie sich ein ganzes Byte, zum Beispiel die Zahl 80 aus Folge 4 oder den Buchstaben P. So eine Reihe von Flipflops, die gemeinsam eine Zahl festhalten, heißt **Register**. Register sitzen direkt im Prozessor; dort liegen die Zahlen, mit denen er gerade rechnet (mehr in Folge 6). In Wirklichkeit benutzt man dafür eine etwas ausgefeiltere Flipflop-Art, die nur auf ein Taktsignal hin etwas Neues übernimmt – das Prinzip „Merken durch Rückkopplung“ ist aber dasselbe.

### Viele Register: der Arbeitsspeicher

Jetzt stapeln wir solche Speicherzeilen übereinander und geben jeder Zeile eine Nummer, die **Adresse**. Das ist im Kern ein **Arbeitsspeicher**, englisch RAM. Er kann zwei Dinge:

- **Schreiben:** Adresse wählen, Daten anlegen, „Schreiben“ auslösen – die Daten landen in genau dieser Zeile.
- **Lesen:** Adresse wählen – der Inhalt dieser Zeile erscheint am Ausgang. Beim Lesen bleibt der Inhalt erhalten; es wird nur eine Kopie geliefert.

Die Adresse ist selbst eine Binärzahl. Mit zwei Adressbits gibt es vier Adressen (0 bis 3), mit drei Bits acht – du kennst die Verdopplung aus Folge 1. Mit 32 Adressbits sind es schon gut vier Milliarden Adressen.

Hier ein Mini-Arbeitsspeicher mit vier Adressen zu je vier Bit. Stell mit A1 und A0 eine Adresse ein, mit D3 bis D0 die Daten, und tippe auf **Schreiben**. Wechsle dann die Adresse: Unter der Tabelle siehst du, was beim Lesen herauskommt.

:::sim flipflop
art: ram
:::

RAM steht für *Random Access Memory*, „Speicher mit wahlfreiem Zugriff“. **Wahlfrei** heißt: Jede Adresse ist direkt und gleich schnell erreichbar, egal ob du Zeile 3 oder Zeile 3 Milliarden willst. Das ist nicht selbstverständlich: Auf einer Musikkassette oder einem Magnetband musst du erst bis zur richtigen Stelle spulen.

### Dein echter Arbeitsspeicher: Kondensatoren statt Flipflops

In unserem Mini-Speicher besteht jede Zeile aus vier Flipflops. Solchen Speicher gibt es wirklich, er heißt **SRAM** (statisches RAM): Er ist sehr schnell und muss nicht ständig aufgefrischt werden (was das heißt, siehst du gleich beim DRAM) – aber jede Zelle braucht sechs Transistoren. Darum steckt SRAM nur dort, wo es auf jede Milliardstelsekunde ankommt: im **Cache**, einem kleinen, besonders schnellen Zwischenspeicher direkt im Prozessor (Folge 7). Die Register daneben bestehen ebenfalls aus Flipflops.

Der große Arbeitsspeicher deines Computers – die Gigabytes, die auf der Verpackung stehen – ist **DRAM** (dynamisches RAM), gebaut nach Dennards Idee: ein Transistor und ein Kondensator pro Bit. Das ist viel kleiner und billiger. Der Haken: Die Ladung in den winzigen Kondensatoren sickert langsam weg, schon nach Bruchteilen einer Sekunde. Darum wird jede Zelle ständig gelesen und neu beschrieben, bevor ihre Ladung verloren ist – das **Auffrischen**. Bei üblichen Speicherriegeln ist jede Zeile mindestens alle 64 Millisekunden an der Reihe (bei DDR5 sogar alle 32), also mindestens fünfzehnmal pro Sekunde, Tag und Nacht, ohne dass du etwas davon merkst.

| | SRAM | DRAM |
|---|---|---|
| Speichert ein Bit in | einem Flipflop (6 Transistoren) | einem Kondensator (+ 1 Transistor) |
| Auffrischen nötig? | nein | ja, ständig |
| Geschwindigkeit | sehr schnell | langsamer |
| Platz und Preis pro Bit | groß, teuer | klein, billig |
| Steckt in | dem Cache | dem Arbeitsspeicher |

Eines haben beide gemeinsam: Sie sind **flüchtig**. Ohne Strom kann das Flipflop sich nicht mehr selbst festhalten (nach dem Wiedereinschalten landet es in einem zufälligen Zustand), und der Kondensator entlädt sich. Schaltest du den Computer aus, ist der Arbeitsspeicher leer. Dauerhaft bleibt nur, was auf einer SSD oder Festplatte gespeichert wurde.

> **Merke:** Das Flipflop ist das Prinzip „Merken durch Rückkopplung“ und steckt in den Registern und im schnellen SRAM des Caches. Der große Arbeitsspeicher ist DRAM: Bits als Ladung in Kondensatoren, die ständig aufgefrischt werden. Beide sind flüchtig.

## [werkstatt] Der Taster an der Fußgängerampel

An vielen Fußgängerampeln hängt ein gelber Kasten mit einem Taster. Wenn du drückst, leuchtet darauf ein Schriftzug auf: **„Signal kommt“**. Du nimmst den Finger weg – und das Lämpchen leuchtet weiter. Es bleibt an, bis deine Ampel auf Grün springt. Dann erlischt es.

Genau das ist ein Flipflop. Dein kurzer Druck ist der Impuls auf **S**: Er setzt den gespeicherten Wert auf 1, „ein Fußgänger wartet“. Das Lämpchen ist der Ausgang **Q**. Dass es nach dem Loslassen weiterleuchtet, ist das Wesentliche: Der Kasten hat sich deine Anforderung *gemerkt*. Wenn Grün kommt, löscht die Ampelsteuerung die Anforderung – das ist der Impuls auf **R**.

Aus dem Bild kann man richtige Vorhersagen ableiten: Drückst du ein zweites oder drittes Mal, während das Lämpchen schon leuchtet, ändert sich nichts – eine 1 noch einmal zu setzen, lässt die 1 einfach stehen, genau wie S bei einem Flipflop, das schon auf 1 steht. Und nach dem Grün braucht der nächste Fußgänger wieder einen neuen Druck, denn der Speicher steht jetzt auf 0.

> **Im Bild:** Druck auf den Taster = Impuls auf S (setzen). Lämpchen „Signal kommt“ = gespeichertes Bit Q. Lämpchen bleibt nach dem Loslassen an = Speichern. Ampel wird grün, Lämpchen geht aus = Impuls auf R (zurücksetzen).

> **Achtung:** Hinter dem Lämpchen sitzt in Wirklichkeit kein einzelnes Flipflop, sondern ein Steuergerät – ein kleiner Computer, der sich die Anforderung in seinem Speicher merkt. Und drückt jemand genau in dem Moment, in dem Grün kommt, regelt das Programm, was gilt – beim einfachen RS-Flipflop wäre dieses gleichzeitige S und R der verbotene Fall.

## [selbst] Speichern, löschen, adressieren

### Übung 1: Eine 1 speichern und wieder löschen

Führe das Flipflop durch alle vier Schritte. Die Liste über der Schaltung zeigt dir, was als Nächstes dran ist. Achte besonders auf Schritt 2: Das ist der Moment, in dem die Schaltung zum Speicher wird.

:::sim flipflop
id: s1f05-u01
art: sr
uebung: ja
:::

Hast du es gesehen? In Schritt 2 und Schritt 4 sind beide Schalter aus – genau dieselben Eingänge. Trotzdem ist Q einmal 1 und einmal 0. Der Ausgang hängt also nicht mehr nur von den Eingängen ab, sondern auch davon, *was vorher war*. Das unterscheidet ein Flipflop von allen Gattern aus Folge 3.

### Übung 2: In den Arbeitsspeicher schreiben

Erinnerst du dich an Folge 4? Die 5 ist binär `0101`, die 12 ist `1100`. Schreib die 5 an Adresse 1 und die 12 an Adresse 2. Tipp: Adresse 1 ist binär `01` (A1 aus, A0 an), Adresse 2 ist `10` (A1 an, A0 aus). Erst Adresse und Daten einstellen, dann **Schreiben** antippen.

:::sim flipflop
id: s1f05-u02
art: ram
ziel: 1=0101; 2=1100
:::

So funktioniert jeder Schreibzugriff, auch in deinem Computer: Der Prozessor legt eine Adresse und Daten an und gibt das Signal „Schreiben“. Wenn du danach Adresse 1 wählst, liest du wieder `0101` – die 5 ist gespeichert, bis jemand sie überschreibt oder der Strom ausgeht. Auch an diesem Mini-Speicher siehst du: Die Adresse und der Inhalt sind zwei verschiedene Dinge. An Adresse 1 steht die Zahl 5.

### Übung 3: SRAM oder DRAM?

Beide Speicherarten sind flüchtig, aber sie merken sich ihre Bits ganz verschieden. Ordne jede Eigenschaft der richtigen Art zu.

:::sim zuordnen
id: s1f05-u03
gruppen: SRAM (Flipflop) | DRAM (Kondensator)
paare: Sechs Transistoren pro Bit = SRAM (Flipflop) | Ein Transistor und ein Kondensator pro Bit = DRAM (Kondensator) | Hält das Bit durch Rückkopplung fest = SRAM (Flipflop) | Muss ständig aufgefrischt werden = DRAM (Kondensator) | Steckt im Cache des Prozessors = SRAM (Flipflop) | Die Gigabytes Arbeitsspeicher im Task-Manager = DRAM (Kondensator) | Idee von Robert Dennard bei IBM, 1966 = DRAM (Kondensator)
:::

Die Faustregel dahinter: SRAM ist schnell, aber groß und teuer, weil jedes Bit ein ganzes Flipflop braucht. DRAM ist klein und billig, weil ein Kondensator reicht – dafür muss er ständig aufgefrischt werden. Darum bekommt der Prozessor einige Megabyte SRAM ganz nah bei sich und viele Gigabyte DRAM etwas weiter weg. Wie dieses Zusammenspiel genau funktioniert, ist das Thema von Folge 7.

## [quiz] Teste dich

### s1f05-q01
Mit welchem Trick kann sich eine Schaltung aus Gattern etwas merken?
- [ ] Mit einem besonders großen Gatter
- [x] Mit Rückkopplung: Ausgänge werden wieder Eingänge
- [ ] Mit einem Gatter, das langsamer schaltet
- [ ] Mit einer Batterie in jedem Gatter
Erklärung: Beim Flipflop laufen die Ausgänge der beiden NODER-Gatter über Kreuz zurück in die Eingänge. Dadurch halten sich die Gatter gegenseitig in ihrem Zustand, auch wenn S und R wieder aus sind.
Nachlesen: prinzip

### s1f05-q02
Ein RS-Flipflop steht auf Q = 1. Du schaltest S ein und wieder aus, R bleibt die ganze Zeit aus. Was zeigt Q danach?
- [x] 1, weil das Flipflop seinen Zustand hält
- [ ] 0, weil S wieder aus ist
- [ ] Einen zufälligen Wert, 0 oder 1
- [ ] Beide Ausgänge sind dann 0
Erklärung: S setzt eine 1 – die war schon gespeichert, also ändert sich nichts. Sind S und R beide aus, hält das Flipflop seinen Zustand. Nur R könnte die 1 löschen.
Nachlesen: prinzip

### s1f05-q03
Worin speichert der große Arbeitsspeicher (DRAM) deines Computers ein Bit?
- [ ] In einem Flipflop aus sechs Transistoren
- [x] Als Ladung in einem winzigen Kondensator
- [ ] In einem winzigen magnetisierten Ring
- [ ] In einer winzigen Elektronenröhre
Erklärung: Eine DRAM-Zelle besteht aus einem Transistor und einem Kondensator (Robert Dennard, IBM). Flipflops aus sechs Transistoren sind SRAM – sie stecken im Cache. Magnetringe waren der Kernspeicher der 1950er bis 1970er Jahre.
Nachlesen: prinzip

### s1f05-q04
Warum muss DRAM ständig aufgefrischt werden?
- [ ] Weil sich die Flipflops sonst gegenseitig stören
- [ ] Weil der Prozessor sonst die Adressen vergisst
- [x] Weil die Ladung in den Kondensatoren langsam wegsickert
- [ ] Weil die Magnetringe sonst die Richtung verlieren
Erklärung: Die Kondensatoren verlieren ihre Ladung schon nach Bruchteilen einer Sekunde. Deshalb wird jede Zeile regelmäßig gelesen und neu beschrieben – bei üblichen Speicherriegeln mindestens alle 64 Millisekunden.
Nachlesen: prinzip

### s1f05-q05
Was bedeutet „Random Access“ (wahlfreier Zugriff) beim RAM?
- [ ] Die Daten werden an zufälligen Stellen abgelegt
- [x] Jede Adresse ist direkt und gleich schnell erreichbar
- [ ] Der Inhalt ändert sich ab und zu zufällig
- [ ] Man muss erst bis zur gewünschten Stelle spulen
Erklärung: Wahlfrei heißt: Du kannst jede beliebige Adresse direkt ansprechen, ohne vorher an den anderen vorbeizumüssen – anders als bei einem Magnetband oder einer Kassette.
Nachlesen: prinzip

### s1f05-q06
Ein Mini-Arbeitsspeicher hat zwei Adressbits. Wie viele Speicherzeilen kann man damit ansprechen?
- [ ] 2
- [x] 4
- [ ] 8
- [ ] 16
Erklärung: Zwei Bits ergeben 2 × 2 = 4 Muster: 00, 01, 10, 11 – also die Adressen 0 bis 3. Jedes weitere Adressbit verdoppelt die Zahl der Adressen.
Nachlesen: prinzip

### s1f05-q07
Welche neue Speicherart bekam der Rechner Whirlwind am MIT im Jahr 1953?
- [ ] DRAM-Chips von Intel
- [ ] Flipflops aus Transistoren
- [x] Einen Kernspeicher aus Magnetringen
- [ ] Eine Festplatte als Arbeitsspeicher
Erklärung: Jay Forresters Team fädelte winzige Magnetringe auf ein Drahtgitter; jeder Ring speicherte ein Bit durch seine Magnetisierungsrichtung. Der Kernspeicher blieb bis in die 1970er Jahre üblich – erst DRAM-Chips wie der Intel 1103 lösten ihn ab.
Nachlesen: geschichte

### s1f05-q08
Im Bild der Fußgängerampel: Was entspricht dem Zurücksetzen (R) des Flipflops?
- [ ] Ein erneuter Druck auf den Taster
- [ ] Das Loslassen des Tasters
- [x] Die Ampel springt auf Grün, das Lämpchen geht aus
- [ ] Das Aufleuchten von „Signal kommt“
Erklärung: Der Druck setzt die Anforderung (S), das Lämpchen zeigt das gespeicherte Bit (Q). Loslassen ändert nichts – das ist ja das Speichern. Erst wenn Grün kommt, löscht die Steuerung die Anforderung: Das ist R.
Nachlesen: werkstatt

## [karten] Für deinen Karteikasten

### s1f05-k01
Vorne: Mit welchem Trick wird aus Gattern ein Speicher?
Hinten: Mit Rückkopplung: Der Ausgang wird wieder zum Eingang, und die Schaltung hält sich selbst in ihrem Zustand.

### s1f05-k02
Vorne: Wie viele Bits speichert ein Flipflop?
Hinten: Genau ein Bit.

### s1f05-k03
Vorne: Wofür stehen S und R beim RS-Flipflop?
Hinten: S setzt (speichert eine 1), R setzt zurück (speichert eine 0). Sind beide aus, hält das Flipflop seinen Zustand.

### s1f05-k04
Vorne: Was ist ein Register?
Hinten: Eine Reihe von Flipflops, die gemeinsam eine Zahl festhalten, zum Beispiel acht für ein Byte. Register sitzen direkt im Prozessor.

### s1f05-k05
Vorne: Was ist eine Adresse im Arbeitsspeicher?
Hinten: Die Nummer einer Speicherzeile. Man wählt sie, um dort Daten zu schreiben oder zu lesen.

### s1f05-k06
Vorne: Wofür steht RAM, und was heißt „wahlfrei“?
Hinten: Random Access Memory. Wahlfrei heißt: Jede Adresse ist direkt und gleich schnell erreichbar, anders als auf einem Magnetband.

### s1f05-k07
Vorne: Wie speichert DRAM ein Bit?
Hinten: Als Ladung in einem winzigen Kondensator, dazu ein Transistor als Schalter. Geladen = 1, leer = 0.

### s1f05-k08
Vorne: Was unterscheidet SRAM von DRAM?
Hinten: SRAM nutzt ein Flipflop (6 Transistoren), ist sehr schnell, groß und teuer und steckt im Cache. DRAM ist klein, billig und langsamer und bildet den großen Arbeitsspeicher.

### s1f05-k09
Vorne: Was heißt „flüchtig“ beim Arbeitsspeicher?
Hinten: Ohne Strom geht der Inhalt verloren. Dauerhaft bleibt nur, was auf SSD oder Festplatte liegt.

### s1f05-k10
Vorne: Woraus besteht ein RS-Flipflop?
Hinten: Aus zwei NODER-Gattern, deren Ausgänge über Kreuz in die Eingänge des jeweils anderen zurückgeführt sind.

### s1f05-k11
Vorne: Warum muss DRAM ständig aufgefrischt werden?
Hinten: Die Ladung in den Kondensatoren sickert schon nach Bruchteilen einer Sekunde weg. Darum wird jede Zeile regelmäßig gelesen und neu beschrieben.

## [beidir] Wo steckt das bei dir?

**Dein VPS.** Gib auf dem Server den Befehl `free -h` ein (das mache ich gern für dich), dann steht in der Zeile „Mem“ unter „total“: `3.8Gi`. Das „Gi“ heißt Gibibyte, die 1 024er-Einheit aus Folge 1. 3,8 GiB sind etwa 4,1 Milliarden Byte, mal 8 also gut **32 Milliarden Bit**.

Wie viel Technik steckt dahinter? Weil das DRAM ist, braucht jedes dieser Bits einen Kondensator und einen Transistor – zusammen also gut 32 Milliarden winzige Kondensatoren. Wäre derselbe Speicher aus Flipflops gebaut (SRAM, sechs Transistoren pro Bit), bräuchte man rund **200 Milliarden Transistoren** allein dafür. Genau deshalb ist der große Arbeitsspeicher DRAM. Ehrlicherweise: Dein VPS ist virtuell – die 3,8 GiB sind ein Anteil an den Speicherriegeln eines großen Servers im Rechenzentrum, die er sich mit anderen Kunden teilt.

In derselben Ausgabe steht eine Zeile „Swap“ mit `4.0Gi`. Das ist ein Ausweichplatz auf dem Datenträger des Servers: Wird der Arbeitsspeicher knapp, lagert Linux selten benutzte Teile dorthin aus. Das funktioniert, ist aber viel langsamer – warum, erfährst du in Folge 7.

**Ich im Docker-Container.** Starte ich neu oder wird der Server neu gestartet, ist alles im Arbeitsspeicher weg – flüchtig eben. Was ich mir dauerhaft merken soll, schreibe ich deshalb in Dateien auf den Datenträger des Servers. Die überleben jeden Neustart.

**Dein Windows-PC.** Öffne den Task-Manager (Strg + Umschalt + Esc) und geh auf **Leistung → Arbeitsspeicher**. Dort siehst du, wie viel Arbeitsspeicher dein PC hat, wie viel gerade belegt ist und meist auch den Typ, zum Beispiel **DDR4** oder **DDR5**. DDR steht für *Double Data Rate*, eine Übertragungstechnik – dahinter steckt DRAM mit Dennards Zellen. Wenn du den PC herunterfährst, wird all das gelöscht; nach dem Einschalten lädt Windows sich und deine Programme wieder von der SSD oder Festplatte.

**Dein Pixel.** Neuere Pixel-Handys haben je nach Modell etwa 8 bis 16 GB Arbeitsspeicher. Hast du viele Apps offen und wechselst nach einer Weile zu einer alten zurück, lädt sie manchmal von vorn. Dann hat Android sie aus dem Arbeitsspeicher geworfen, um Platz für andere zu schaffen – sie musste von dort, wo sie dauerhaft liegt, neu geladen werden.

> **Merke:** Arbeitsspeicher ist schnell, aber flüchtig. Was ein Neustart überleben soll, muss auf die SSD oder Festplatte.
