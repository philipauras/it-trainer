---
id: s1f09
status: freigegeben
faktencheck: 26.11.2026 – Durchgang 1 nicht bestanden (2 Fehler behoben), Durchgang 2 bestanden; unabhängige Prüfung, Berichte in docs/faktencheck/
dauer: 19
quellen:
- Douglas C. Engelbart, William K. English: A Research Center for Augmenting Human Intellect. AFIPS Fall Joint Computer Conference 1968 (die Vorführung vom 9. Dezember 1968)
- Stanford University: MouseSite – The Demo (Videos und Dokumente zur Vorführung von 1968) | https://web.stanford.edu/dept/SUL/library/extra4/sloan/MouseSite/1968Demo.html
- Computer History Museum, Ausstellung „Revolution“: Xerox Alto, Xerox Star, Apple Lisa und Macintosh | https://www.computerhistory.org/revolution/
- R. C. Daley, P. G. Neumann: A General-Purpose File System for Secondary Storage. AFIPS Fall Joint Computer Conference 1965 | https://www.multicians.org/fjcc4.html
- Dennis M. Ritchie, Ken Thompson: The UNIX Time-Sharing System. Communications of the ACM 17 (1974) | https://dl.acm.org/doi/10.1145/361011.361061
- Andrew S. Tanenbaum, Herbert Bos: Moderne Betriebssysteme. 4. Auflage, Pearson, 2016 (Kapitel Dateisysteme, Prozesse)
- The Linux Kernel Documentation: ext4 Data Structures and Algorithms | https://www.kernel.org/doc/html/latest/filesystems/ext4/index.html
- Microsoft Support: Allgemeine Dateinamenerweiterungen in Windows (Hilfeartikel)
---

## [einstieg] Was passiert in der halben Sekunde nach dem Doppelklick?

Auf deinem Bildschirm liegt eine Datei: `urlaub.jpg`. Du klickst zweimal schnell hintereinander – und einen Augenblick später strahlt dich das Meer an.

Eine Kleinigkeit, die du hundertmal am Tag tust. Aber in dieser halben Sekunde arbeitet **alles**, was du in dieser Staffel kennengelernt hast: Bits, die als Strom durch Transistoren fließen. Gatter, die rechnen. Flipflops, die sich etwas merken. Ein Prozessor, der Befehle holt und ausführt. Speicher in vielen Stufen. Und ein Betriebssystem, das alles zusammenhält.

Diese Folge ist eine Reise durch all diese Schichten – im Zeitraffer eines einzigen Doppelklicks. Und unterwegs klären wir eine Frage, die wir bisher umgangen haben: Was ist eigentlich eine **Datei**?

## [geschichte] Eine Maus aus Holz und ein Schreibtisch auf dem Bildschirm

**San Francisco, 9. Dezember 1968.** Vor rund tausend Fachleuten sitzt **Douglas Engelbart** vom Stanford Research Institute an einer Konsole. Neunzig Minuten lang zeigt er auf einer riesigen Leinwand Dinge, die es so noch nie gegeben hat: Text, den man am Bildschirm bearbeitet, Verweise, die per Klick zu anderen Dokumenten springen, eine Videoverbindung zu Kollegen 50 Kilometer entfernt. Und in seiner rechten Hand liegt ein kleines Holzkästchen mit zwei Rädern an der Unterseite und einem Kabel am Ende – die **Maus**. Engelbart hatte sie Jahre zuvor erdacht, sein Ingenieur **Bill English** hatte sie gebaut. Den Namen bekam sie wegen des Kabels, das wie ein Schwanz aussah. Später nannte man diese Vorführung die „Mother of All Demos“ – die Mutter aller Vorführungen.

Einige Jahre danach griff das Forschungszentrum von **Xerox** in Palo Alto (PARC) diese Ideen auf. **1973** lief dort der **Alto**, ein Rechner mit einem hochkant stehenden Bildschirm, auf dem jeder Bildpunkt einzeln gesteuert werden konnte – mit Maus, Fenstern und Schrift, die aussah wie gedruckt. Verkauft wurde der Alto nie im Handel, aber er wurde zum Vorbild. 1981 brachte Xerox mit dem **Star** einen Bürorechner heraus, der den Bildschirm wie einen Schreibtisch zeigte: Dokumente und Ordner als kleine Bildchen, sogenannte **Symbole**.

**1979** besuchte eine Gruppe von Apple, darunter **Steve Jobs**, das PARC. Was sie dort sahen, floss in zwei Rechner ein: die **Lisa** (Januar 1983, rund 10 000 Dollar teuer und kaum verkauft) und den **Macintosh** (Januar 1984), der die **grafische Oberfläche** mit Maus, Fenstern und Symbolen für viele Menschen erschwinglich machte. Seine Maus hatte nur eine Taste – geöffnet wurde eine Datei mit einem **Doppelklick** auf ihr Symbol. Microsoft folgte 1985 mit dem ersten Windows.

Die Ordner auf diesen Schreibtischen haben eine ältere Geschichte. Frühe Rechner legten die Dateien nebeneinander in eine Liste – höchstens eine pro Benutzer. **1965** beschrieben **Robert Daley** und **Peter Neumann** für das Betriebssystem **Multics** (du kennst es aus Folge 8) ein Dateisystem, in dem Verzeichnisse wieder Verzeichnisse enthalten dürfen – eine Baumstruktur, eine **Hierarchie**. Unix übernahm die Idee, und heute arbeitet jedes Betriebssystem so: Ordner in Ordnern in Ordnern.

> **Wusstest du?:** Unter MS-DOS, dem Vorgänger von Windows, durfte ein Dateiname höchstens acht Zeichen haben, dazu eine Endung aus drei Zeichen – etwa `URLAUB.JPG`. MS-DOS übernahm diese Regel von noch älteren Systemen – daher stammen die vielen dreibuchstabigen Endungen, die es bis heute gibt.

## [prinzip] Vom Klick zum Bild

### Was ist eine Datei?

Eine **Datei** ist eine Folge von Bytes, die unter einem Namen gespeichert ist. Mehr nicht. Eine Textdatei mit dem Inhalt „Hallo“ besteht aus genau fünf Bytes – im ASCII-Code aus Folge 1 beginnt sie mit `01001000` für das H. Ein Foto besteht aus ein paar Millionen Bytes, ein Programm ebenfalls.

Zu jeder Datei merkt sich das Betriebssystem außerdem **Metadaten** – „Daten über die Daten“: wie groß sie ist, wann sie zuletzt geändert wurde, wem sie gehört, wer sie lesen darf und wo auf der SSD ihre Bytes liegen.

Was die Bytes *bedeuten*, steht nicht in ihnen selbst. Dieselben Bytes können Buchstaben, Farben oder Befehle für den Prozessor sein – es ist wieder eine Frage der **Kodierung**, wie bei den Laternen in Folge 1. Ein Bildprogramm liest die Bytes als Bildpunkte, ein Texteditor als Buchstaben. Öffnest du ein Foto versehentlich mit einem Texteditor, siehst du darum nur Zeichensalat.

### Das Dateisystem: Inhaltsverzeichnis und Blöcke

Eine SSD kennt keine Dateien. Sie kennt nur nummerierte Speicherplätze. Das **Dateisystem**, ein Teil des Betriebssystems, fasst sie zu **Blöcken** fester Größe zusammen, meist je 4 Kibibyte (4 096 Byte), und legt darüber seine Ordnung. Es führt ein **Verzeichnis**: eine Liste, die zu jedem Dateinamen sagt, wo die Datei beginnt.

Eine Datei, die größer als ein Block ist, braucht mehrere Blöcke. Und die liegen oft **nicht nebeneinander**: Dateien wachsen, werden gelöscht, neue füllen die Lücken. Das Dateisystem muss sich darum merken, welcher Block auf welchen folgt. Probier es aus: Tippe auf einen Dateinamen im Inhaltsverzeichnis, dann leuchten ihre Blöcke auf. Jeder Block zeigt unten, wo es weitergeht (`→`), oder `Ende`.

:::sim dateisystem
dateien: einkauf.txt = EI|ER |UND |MEHL; hallo.txt = HAL|LO |WEL|T!; foto.jpg = ▒▒▒|▒▒▒|▒▒▒
:::

Du siehst: `hallo.txt` ist über vier Blöcke verstreut, und dazwischen liegen Stücke anderer Dateien. Freie Blöcke stehen für neue Daten bereit.

> **Achtung:** Hier ist der Simulator vereinfacht. Dass jeder Block selbst auf den nächsten zeigt, gab es so ähnlich bei älteren Dateisystemen (FAT – dort steht die Kette allerdings in einer eigenen Tabelle). Heutige Dateisysteme wie NTFS (Windows) oder ext4 (Linux) speichern zu jeder Datei lieber eine Liste ganzer Blockbereiche: „Blöcke 812 bis 830, dann 1 200 bis 1 250“. Das Prinzip bleibt: Das Verzeichnis führt zur Datei, und die Datei kann verstreut liegen.

Übrigens sind **Ordner** selbst nichts anderes als besondere Dateien: Ihr Inhalt ist die Liste „Name → wo liegt das“. Und wer eine Datei löscht, entfernt meist nur den Eintrag im Verzeichnis und markiert die Blöcke als frei – die Bytes selbst bleiben liegen, bis neue Daten sie überschreiben. Deshalb können Rettungsprogramme manchmal versehentlich gelöschte Dateien zurückholen. (Bei SSDs klappt das seltener, weil sie freie Blöcke oft bald selbst leeren.)

### Woher weiß der Rechner, welches Programm passt?

Am **Dateinamen**. Unter Windows entscheidet vor allem die **Dateiendung** – die Buchstaben nach dem letzten Punkt: `.jpg` und `.png` für Bilder, `.txt` für Text, `.mp3` für Musik, `.exe` für Programme. Das Betriebssystem führt eine Liste, welches Programm für welche Endung zuständig ist.

Die Endung ist dabei nur ein Teil des Namens, keine Eigenschaft des Inhalts. Benennst du `urlaub.jpg` in `urlaub.txt` um, wird aus dem Foto kein Text – Windows öffnet die Datei nur mit dem falschen Programm. Viele Dateiformate verraten sich zusätzlich durch ihre ersten Bytes: Jede PDF-Datei beginnt mit den Zeichen `%PDF`, jedes PNG-Bild mit den Buchstaben `PNG` gleich nach dem ersten Byte. Manche Programme schauen deshalb auf solche Merkmale statt auf den Namen – unter Linux etwa der Befehl `file`, der dir sagt, was wirklich in einer Datei steckt.

### Der Doppelklick in Zeitlupe

Jetzt hast du alles beisammen. Verfolgen wir den Doppelklick auf `urlaub.jpg` durch alle Schichten:

1. **Die Maus meldet sich.** Unter der Taste schließt sich ein Kontakt, Strom fließt oder stoppt – ein Bit wechselt (Folge 1 und 2). Die Elektronik der Maus schickt eine kurze Nachricht über Kabel oder Funk an den Rechner. Der Maustreiber im Betriebssystem nimmt sie entgegen (Folge 8).
2. **Das Betriebssystem erkennt den Doppelklick.** Zwei Klicks kurz nacheinander an derselben Stelle – unter Windows standardmäßig innerhalb einer halben Sekunde – gelten als Doppelklick. Die Oberfläche prüft, welches Symbol unter dem Mauszeiger liegt: `urlaub.jpg`.
3. **Es sucht das passende Programm.** Endung `.jpg` – laut Zuordnungsliste ist die Fotos-App zuständig.
4. **Es lädt das Programm und legt einen Prozess an.** Das Dateisystem findet über das Verzeichnis die Blöcke der Programmdatei und liest sie von der SSD in den Arbeitsspeicher (Folge 7). Das Betriebssystem richtet einen eigenen Speicherbereich ein und meldet den neuen Prozess beim Scheduler an (Folge 8).
5. **Der Prozessor beginnt.** Der Befehlszähler wird auf den ersten Befehl des Programms gesetzt. Nun läuft Takt für Takt: holen, entschlüsseln, ausführen (Folge 6) – ausgeführt von Rechenwerken aus Gattern (Folge 3 und 4), die aus Transistoren bestehen (Folge 2).
6. **Das Programm öffnet die Datei.** Die Fotos-App darf die SSD nicht selbst anfassen. Sie bittet den Kernel mit einem Systemaufruf: „Öffne `urlaub.jpg`.“ Der Kernel prüft die Rechte, sucht im Verzeichnis die Blöcke und lässt sie von der SSD in den Arbeitsspeicher lesen. Von dort wandern die Bytes beim Bearbeiten durch den Cache bis in die Register (Folge 5 und 7).
7. **Aus Bytes wird ein Bild.** Das Programm wandelt (dekodiert) das JPG-Format in Millionen farbiger Bildpunkte um und übergibt sie dem Betriebssystem, das sie an die Grafik weiterreicht – und auf dem Bildschirm erscheint das Meer.

> **Achtung:** Das ist vereinfacht. In Wirklichkeit ist schon die Oberfläche (unter Windows der Explorer) selbst ein Programm, das den Kernel per Systemaufruf bittet, die Fotos-App zu starten. Die Programmdatei wird meist auch nicht auf einmal geladen, sondern Stück für Stück, sobald ein Teil gebraucht wird. Und zwischen Programm und Bildschirm arbeiten noch Grafikkarte und eigene Treiber. Die Reihenfolge der großen Schritte stimmt aber.

> **Merke:** Eine Datei ist eine Folge von Bytes mit Namen und Metadaten. Das Dateisystem findet über das Verzeichnis ihre – oft verstreuten – Blöcke. Beim Doppelklick wählt das Betriebssystem anhand des Dateityps ein Programm, lädt es als Prozess, und das Programm lässt sich die Datei per Systemaufruf vom Kernel geben.

## [werkstatt] Die Zeitschrift mit „Fortsetzung auf Seite 47“

Schlag eine dicke Zeitschrift auf. Vorne steht das **Inhaltsverzeichnis**: „Die Rückkehr der Wölfe … Seite 12“. Du blätterst zu Seite 12 und liest. Nach zwei Seiten steht unten: *„Fortsetzung auf Seite 47“*. Dazwischen liegen andere Artikel und Anzeigen. Auf Seite 47 geht der Wolf-Artikel weiter, und dort steht vielleicht wieder: *„Fortsetzung auf Seite 80“*. Am Ende des Artikels steht kein Hinweis mehr – fertig.

Warum macht die Redaktion das? Weil die Artikel unterschiedlich lang sind und die Seiten möglichst gut gefüllt werden sollen. Ein langer Artikel bekommt die Lücken, die übrig sind – genau wie eine große Datei die freien Blöcke, wo immer sie gerade liegen.

Das Bild trägt auch Vorhersagen: Um einen verstreuten Artikel zu lesen, musst du mehr blättern als bei einem, der am Stück steht – bei alten Festplatten mit beweglichem Lesekopf kostete das spürbar Zeit, bei SSDs kaum. Und reißt jemand das Inhaltsverzeichnis heraus, sind alle Artikel noch da – aber du findest sie kaum noch. Genau so ergeht es einer Datei, deren Eintrag im Verzeichnis gelöscht wurde: Ihre Bytes liegen noch auf der SSD, nur der Weg zu ihnen ist weg.

> **Im Bild:** Zeitschrift = Datenträger (SSD). Seite = Block. Seitenzahl = Blocknummer. Inhaltsverzeichnis = Verzeichnis des Dateisystems. Ein Artikel = eine Datei. „Fortsetzung auf Seite 47“ = Verweis auf den nächsten Block. Andere Artikel und Anzeigen dazwischen = andere Dateien.

> **Achtung:** Hier hinkt das Bild: Eine gedruckte Zeitschrift ändert sich nie mehr. Ein Dateisystem verändert sich ständig – Dateien wachsen, schrumpfen, werden gelöscht, und frei gewordene Blöcke können sofort neu vergeben werden. Außerdem stehen die Fortsetzungs-Hinweise heute meist nicht am Ende jedes Blocks, sondern gesammelt beim Dateieintrag (siehe Prinzip).

## [selbst] Lies, ordne, zuordne

### Übung 1: Eine verstreute Datei lesen

Jetzt bist du das Dateisystem. Auf dieser kleinen SSD liegen drei Dateien. Lies die Datei `brief.txt`: Schau im Inhaltsverzeichnis nach, in welchem Block sie beginnt, tippe diesen Block an, und folge dann den Pfeilen von Block zu Block bis zum `Ende`.

:::sim dateisystem
id: s1f09-u01
dateien: notiz.txt = MILCH|, BROT; foto.jpg = ▒▒▒|▒▒▒|▒▒▒|▒▒▒; brief.txt = VOM |BIT |BIS |ZUM |DOPPEL|KLICK!
ziel: brief.txt
:::

**Auflösung:** `brief.txt` beginnt in Block 3 und springt dann quer über die SSD: 3 → 14 → 0 → 9 → 13 → 15. Zusammen ergeben die sechs Stücke „VOM BIT BIS ZUM DOPPELKLICK!“ – das Motto dieser Staffel. Ohne das Inhaltsverzeichnis hättest du nicht gewusst, wo du anfangen musst; ohne die Verweise nicht, wie es weitergeht. Genau diese Arbeit erledigt das Dateisystem bei jedem Öffnen einer Datei, nur mit Tausenden von Blöcken und in Bruchteilen einer Sekunde.

### Übung 2: Der Doppelklick in der richtigen Reihenfolge

Bring die Schritte beim Doppelklick auf `urlaub.jpg` in die richtige Reihenfolge.

:::sim sortieren
id: s1f09-u02
elemente: Die Maus meldet zwei Klicks an den Rechner | Das Betriebssystem erkennt einen Doppelklick auf das Symbol | Es schaut nach, welches Programm zur Endung .jpg gehört | Es lädt die Programmdatei in den RAM und legt einen Prozess an | Der Prozessor beginnt mit dem ersten Befehl des Programms | Das Programm bittet den Kernel per Systemaufruf, die Datei zu öffnen | Die Bytes des Fotos kommen von der SSD über den RAM zum Programm | Das Programm wandelt die Bytes in Bildpunkte, das Foto erscheint
oben: zuerst
unten: zuletzt
:::

**Auflösung:** Der wichtigste Gedanke: Erst muss das **Programm** laufen, dann kann es die **Datei** öffnen. Die Fotos-App wird zuerst als Prozess gestartet – und erst sie selbst bittet den Kernel um `urlaub.jpg`. Das Betriebssystem hat das Foto also bis zu diesem Moment gar nicht gelesen; es kannte nur seinen Namen und damit seine Endung.

### Übung 3: Welche Endung, welche Art?

Ordne jede Datei der Art von Inhalt zu, die ihre Endung verspricht.

:::sim zuordnen
id: s1f09-u03
gruppen: Bild | Text | Musik | Programm
paare: urlaub.jpg = Bild | logo.png = Bild | notiz.txt = Text | bewerbung.docx = Text | lieblingslied.mp3 = Musik | setup.exe = Programm | spiel.apk = Programm
:::

**Auflösung:** `.jpg` und `.png` sind Bildformate, `.txt` reiner Text und `.docx` ein Word-Dokument. `.mp3` ist Musik. `.exe` ist unter Windows ein startbares Programm, `.apk` das Paketformat für Android-Apps. Denk daran: Die Endung ist nur ein Versprechen im Namen. Ob der Inhalt wirklich passt, zeigen erst die Bytes.

## [quiz] Teste dich

### s1f09-q01
Was ist eine Datei, technisch gesehen?
- [ ] Ein fester Bereich des Prozessors mit eigenem Namen
- [x] Eine Folge von Bytes mit Namen und Metadaten
- [ ] Ein Programm, das Bilder oder Texte anzeigt
- [ ] Ein Ordner, der genau einen Block auf der SSD belegt
Erklärung: Eine Datei ist eine Folge von Bytes, gespeichert unter einem Namen. Dazu merkt sich das Betriebssystem Metadaten wie Größe, Datum, Besitzer, Rechte und wo die Bytes liegen.
Nachlesen: prinzip

### s1f09-q02
Wozu braucht das Dateisystem ein Verzeichnis?
- [ ] Um die Bytes einer Datei zu verschlüsseln
- [ ] Um die Datei schneller durch den Prozessor zu schicken
- [x] Um zu jedem Dateinamen zu wissen, wo die Daten liegen
- [ ] Um festzulegen, welche Programme gerade laufen dürfen
Erklärung: Die SSD kennt nur nummerierte Speicherplätze. Das Verzeichnis ordnet jedem Namen den Ort seiner Daten zu – ohne es wären die Bytes zwar da, aber nicht mehr zu finden.
Nachlesen: prinzip

### s1f09-q03
Du benennst `urlaub.jpg` in `urlaub.txt` um. Was passiert?
- [ ] Windows wandelt das Foto in einen Text um
- [x] Die Bytes bleiben gleich, aber Windows wählt ein anderes Programm
- [ ] Die Datei wird sofort beschädigt und ist verloren
- [ ] Die Datei wird automatisch in einen anderen Ordner verschoben
Erklärung: Die Endung ist nur ein Teil des Namens. Am Inhalt ändert das Umbenennen nichts – Windows öffnet die Datei nur mit dem Programm, das für .txt zuständig ist, und zeigt dann Zeichensalat.
Nachlesen: prinzip

### s1f09-q04
Was geschieht beim Doppelklick auf ein Foto zuerst: das Lesen der Datei oder der Start des Programms?
- [ ] Die Fotos-App liest die Datei und startet danach
- [ ] Der Prozessor lädt das Foto direkt in seine Register
- [ ] Die SSD schickt das Foto von selbst an den Bildschirm
- [x] Die Fotos-App wird gestartet und öffnet dann die Datei
Erklärung: Zuerst ermittelt das Betriebssystem anhand der Endung das passende Programm und startet es als Prozess. Erst das laufende Programm bittet dann per Systemaufruf darum, die Datei zu öffnen.
Nachlesen: prinzip

### s1f09-q05
Warum liegen die Blöcke einer Datei oft verstreut auf dem Datenträger?
- [x] Weil Dateien wachsen und gelöscht werden und Lücken entstehen
- [ ] Weil verstreute Blöcke vor Viren schützen
- [ ] Weil jede Datei genau einen Block pro Kilobyte braucht
- [ ] Weil das Betriebssystem die Reihenfolge absichtlich mischt
Erklärung: Mit der Zeit werden Dateien angelegt, vergrößert und gelöscht. Eine neue oder wachsende Datei bekommt die freien Blöcke, wo immer sie gerade liegen – das Dateisystem merkt sich, in welcher Reihenfolge sie zusammengehören.
Nachlesen: prinzip

### s1f09-q06
Wer führte am 9. Dezember 1968 in San Francisco in der berühmten „Mother of All Demos“ die Computermaus vor?
- [ ] Steve Jobs
- [x] Douglas Engelbart
- [ ] Linus Torvalds
- [ ] Ken Thompson
Erklärung: Douglas Engelbart führte die Maus in seiner 90-minütigen Vorführung vor, die später „Mother of All Demos“ genannt wurde. Gebaut hatte sie sein Ingenieur Bill English.
Nachlesen: geschichte

### s1f09-q07
Auf dem VPS ist eine Textdatei nur 5 Byte groß. Wie viel Platz belegt sie dort trotzdem auf dem Datenträger?
- [ ] Genau 5 Byte
- [ ] 8 Bit, also 1 Byte
- [x] Einen ganzen Block von 4 KiB
- [ ] Ein ganzes Gigabyte
Erklärung: Das Dateisystem vergibt Platz nur in ganzen Blöcken. Auf dem VPS ist ein Block 4 KiB (4 096 Byte) groß – auch eine winzige Datei belegt also mindestens einen davon.
Nachlesen: beidir

## [karten] Für deinen Karteikasten

### s1f09-k01
Vorne: Was ist eine Datei, technisch gesehen?
Hinten: Eine Folge von Bytes, die unter einem Namen gespeichert ist. Dazu merkt sich das Betriebssystem Metadaten.

### s1f09-k02
Vorne: Was sind Metadaten einer Datei?
Hinten: „Daten über die Daten“: Größe, Datum der letzten Änderung, Besitzer, Zugriffsrechte und wo auf der SSD die Bytes liegen.

### s1f09-k03
Vorne: Was ist ein Block im Dateisystem?
Hinten: Ein nummerierter Abschnitt fester Größe (meist 4 KiB) – in solche Abschnitte teilt das Dateisystem den Datenträger ein.

### s1f09-k04
Vorne: Wozu dient das Verzeichnis eines Dateisystems?
Hinten: Es ordnet jedem Dateinamen den Ort seiner Daten zu. Ohne Verzeichnis wären die Bytes noch da, aber kaum zu finden.

### s1f09-k05
Vorne: Warum liegen die Blöcke einer Datei oft verstreut?
Hinten: Dateien wachsen und werden gelöscht, und neue Dateien füllen die entstehenden Lücken. Das Dateisystem merkt sich, welche Blöcke zusammengehören.

### s1f09-k06
Vorne: Was geschieht meist, wenn man eine Datei löscht?
Hinten: Nur der Eintrag im Verzeichnis wird entfernt und die Blöcke gelten als frei. Die Bytes bleiben liegen, bis neue Daten sie überschreiben.

### s1f09-k07
Vorne: Woran erkennt Windows, mit welchem Programm es eine Datei öffnet?
Hinten: Vor allem an der Dateiendung (Buchstaben nach dem letzten Punkt). Eine Liste legt fest, welches Programm für welche Endung zuständig ist.

### s1f09-k08
Vorne: Was passiert beim Doppelklick auf ein Foto zuerst: Wird die Datei gelesen oder das Programm gestartet?
Hinten: Zuerst wird das passende Programm als Prozess gestartet. Erst dieses bittet per Systemaufruf den Kernel, die Datei zu öffnen.

### s1f09-k09
Vorne: Wer führte am 9. Dezember 1968 in der berühmten Vorführung in San Francisco die Maus vor?
Hinten: Douglas Engelbart, in der „Mother of All Demos“. Gebaut hatte die Maus sein Ingenieur Bill English.

## [beidir] Wo steckt das bei dir?

Dateien, Endungen und Dateisysteme begegnen dir auf jedem deiner Geräte – nur sieht jedes ein bisschen anders aus.

**Dein Windows-PC: Endungen sichtbar machen.** Windows versteckt die Dateiendungen standardmäßig. Im Explorer kannst du sie einblenden: unter Windows 11 über **Anzeigen → Einblenden → Dateinamenerweiterungen**, unter Windows 10 im Menüband **Ansicht** mit dem Häkchen bei **Dateinamenerweiterungen**. Plötzlich heißt dein Foto `urlaub.jpg` statt nur `urlaub`. Das ist auch ein Schutz: Eine Datei namens `rechnung.pdf.exe` gibt sich als PDF aus, ist aber ein Programm – mit sichtbaren Endungen fällt das auf.

Mit einem **Rechtsklick → Öffnen mit** wählst du ein anderes Programm für eine Datei – und kannst dort auch festlegen, dass es künftig immer für diese Endung zuständig sein soll. Das ist genau die Zuordnungsliste aus dem Prinzip. Und unter **Rechtsklick → Eigenschaften** stehen zwei Größen: „Größe“ (die echten Bytes) und „Größe auf Datenträger“ – die ist meist etwas größer, weil das Dateisystem NTFS in ganzen Blöcken rechnet. (Winzige Dateien legt NTFS übrigens direkt in ihren Eintrag in seiner Dateitabelle – dann steht dort sogar 0 Byte.)

**Dein Pixel: Apps statt Programmdateien.** Auf Android tippst du einmal statt doppelt – aber dahinter steckt dasselbe: Tippst du in der Dateien-App auf ein Foto, sucht Android eine App, die mit diesem Dateityp umgehen kann. Gibt es mehrere, fragt es dich, womit du öffnen willst. Die Apps selbst werden als `.apk`-Pakete geliefert, und jede gestartete App ist ein eigener Prozess auf dem Linux-Kernel (Folge 8).

**Dein VPS: Unter Linux ist (fast) alles eine Datei.** Unix hat eine schlichte Idee berühmt gemacht: Nicht nur Dokumente, auch Geräte erscheinen als Dateien. Der Bereich der Festplatte, auf dem meine Arbeitsdateien liegen, heißt auf dem VPS `/dev/sda1` (der Befehl `df` zeigt das) und lässt sich dort ansprechen wie eine Datei, und Angaben über den Prozessor lassen sich wie ein Text aus `/proc/cpuinfo` lesen. Der Ordner `/workspace`, in dem ich arbeite und in dem auch diese App liegt, steckt auf einem Dateisystem namens **ext4** mit Blöcken von 4 KiB. Das habe ich ausprobiert: Eine Textdatei mit dem Inhalt „Hallo“ ist 5 Byte groß, belegt aber einen ganzen Block mit 4 096 Byte. Der Befehl `stat` zeigt zu jeder Datei die Metadaten: Größe, belegter Platz, Besitzer, Rechte und Zeitpunkte. (`stat` zählt den Platz in 512-Byte-Stücken: Bei der Hallo-Datei steht dort `Blocks: 8`, und 8 × 512 = 4 096 Byte.)

**Ich und deine Ablage.** Wenn ich dir ein Ergebnis in den Ordner `von_agent` lege, schreibt das Programm Claude Code auf dem VPS Bytes in eine neue Datei (das Sprachmodell dahinter rechnet bei Anthropic, die Datei entsteht aber auf deinem VPS). Von dort wird sie mit deinem Google Drive abgeglichen und landet dort in einem ganz anderen Speichersystem. Der Name und die Bytes bleiben gleich – nur die Blöcke, in denen sie liegen, sind andere.

**Dein Rückblick auf die Staffel.** Mit dieser Folge hast du den Weg einmal ganz hinaufgeschafft: vom einzelnen **Bit** über **Transistoren** und **Gatter**, die rechnen und sich etwas merken, zum **Prozessor**, durch die Stufen des **Speichers** bis zum **Betriebssystem**, das bei einem Doppelklick all das zusammenspielen lässt. Im Abschlussprojekt baust du selbst ein Stück davon nach: einen Rechner aus Gattern, der zwei Zahlen addiert.
