---
id: s1f06
status: freigegeben
faktencheck: 26.11.2026 – Durchgang 1 nicht bestanden (1 Fehler behoben), Durchgang 2 bestanden; unabhängige Prüfung, Berichte in docs/faktencheck/; Umstellung auf eigenständige Folge + Lernpool (1.5.0): unabhängig geprüft und bestanden
dauer: 18
quellen:
- John von Neumann: First Draft of a Report on the EDVAC. Moore School of Electrical Engineering, University of Pennsylvania, 30. Juni 1945 | https://web.mit.edu/STS.035/www/PDFs/edvac.pdf
- Computer History Museum: Revolution – Birth of the Computer (ENIAC, Programmierung per Kabel, Programmiererinnen) | https://www.computerhistory.org/revolution/birth-of-the-computer/4/78
- University of Manchester, Digital 60: „The Baby“ (erstes gespeichertes Programm, 21. Juni 1948) | https://curation.cs.manchester.ac.uk/digital60/www.digital60.org/birth/thebaby/index.html
- University of Manchester, Computer50: The Manchester Mark 1 Story – The Baby (Lauf mit 2¹⁸, 52 Minuten) | https://www.curation.cs.manchester.ac.uk/computer50/www.computer50.org/mark1/new.baby.html
- Intel: Announcing a New Era of Integrated Electronics – The Intel 4004 (1971, 2 300 Transistoren) | https://www.intel.com/content/www/us/en/history/virtual-vault/articles/the-intel-4004.html
- John Backus: Can Programming Be Liberated from the von Neumann Style? Communications of the ACM 21 (8), 1978 (Turing-Award-Vortrag 1977) | https://dl.acm.org/doi/10.1145/359576.359579
- David A. Patterson, John L. Hennessy: Computer Organization and Design (Rechner-Organisation und -Entwurf), Standardwerk, mehrere Auflagen
- Charles Petzold: Code – The Hidden Language of Computer Hardware and Software. 2. Auflage, Microsoft Press, 2022
- AMD: Produktseite EPYC 9354P (Grundtakt 3,25 GHz, bis 3,8 GHz) | https://www.amd.com/en/products/processors/server/epyc/4th-generation-9004-and-8004-series/amd-epyc-9354p.html
---

## [einstieg] Woher weiß ein Haufen Schalter, was er als Nächstes tun soll?

Ein Computer besteht aus Bauteilen, die jedes für sich etwas Einfaches können: Transistoren sind winzige elektrische Schalter (mehr dazu in Folge 2). Aus ihnen entstehen Gatter, die aus Bits (0 oder 1) nach festen Regeln ein Ergebnis bilden, etwa UND, ODER und NICHT (Folge 3), und daraus ein Addierer, der Bits zusammenzählt (Folge 4) – größere Addierer rechnen mit Binärzahlen, also Zahlen, die nur mit 0 und 1 geschrieben werden. Ein Speicher merkt sich Bits (Folge 5). Aber all das sitzt für sich nur da und wartet. Niemand sagt dem Addierer, *wann* er *welche* Zahlen addieren soll.

Genau das ist die Aufgabe des **Prozessors**. Er liest Befehle, einen nach dem anderen, und lässt die Bauteile danach arbeiten – Milliarden Mal pro Sekunde. Und das Verblüffende: Die Befehle, denen er gehorcht, sind selbst nur Zahlen, die im selben Speicher liegen wie die Daten. In dieser Folge baust du dir im Kopf einen Prozessor zusammen und lässt ihn Takt für Takt rechnen.

## [geschichte] Kabel stecken war gestern

**Philadelphia, 1945.** An der Moore School der University of Pennsylvania steht ENIAC, eine der ersten elektronischen Rechenmaschinen der Welt: rund 30 Tonnen schwer, voller Elektronenröhren. Gebaut haben sie die Ingenieure **J. Presper Eckert** und **John Mauchly** mit ihrem Team. ENIAC rechnet für damalige Verhältnisse rasend schnell. Aber wer ihr eine neue Aufgabe geben will, muss sie umbauen: Kabel umstecken, Schalter umlegen. Das konnte Tage dauern. Die Arbeit erledigten vor allem Frauen – die ersten Programmiererinnen, die das Programm buchstäblich verdrahteten.

Schon während ENIAC entsteht, planen Eckert und Mauchly einen Nachfolger, die EDVAC. Zu den Gesprächen kommt der Mathematiker **John von Neumann** hinzu, damals einer der bekanntesten Wissenschaftler der USA. Er schreibt die Ideen der Gruppe auf: **„First Draft of a Report on the EDVAC“**, datiert auf den **30. Juni 1945**. Der entscheidende Gedanke darin: Das Programm wird nicht mehr verkabelt, sondern als Zahlen **im selben Speicher** abgelegt wie die Daten, mit denen gerechnet wird. Ein neues Programm heißt dann: neue Zahlen in den Speicher schreiben. Kein Kabel muss sich bewegen.

> **Wusstest du?:** Der Bericht war ein Entwurf, und auf dem Deckblatt stand nur von Neumanns Name. Als er verteilt wurde, ärgerten sich Eckert und Mauchly: Viele Ideen stammten auch von ihnen. Trotzdem heißt der Bauplan bis heute **Von-Neumann-Architektur**. Der Gedanke einer Maschine, die ihr eigenes Programm aus dem Speicher liest, steckte übrigens schon 1936 in Alan Turings Arbeit über die „universelle Maschine“ – allerdings als reines Gedankenexperiment.

Wer zuerst eine solche Maschine zum Laufen brachte, waren nicht die Amerikaner. **Manchester, 21. Juni 1948:** Frederic Williams, Tom Kilburn und Geoff Tootill starten an der Universität Manchester einen Versuchsrechner, offiziell „Small-Scale Experimental Machine“, mit dem Spitznamen **„Baby“**. Sein Speicher ist eine Bildröhre, auf der Bits als Leuchtpunkte stehen – 32 Zeilen zu je 32 Bit. Kilburns Programm sucht den größten echten Teiler einer Zahl. Wenige Tage später, mit der Zahl 2¹⁸ = 262 144, arbeitet die Maschine etwa 52 Minuten und führt rund 2,1 Millionen Befehle aus, bis sie die Antwort zeigt: 131 072. Zum ersten Mal läuft ein Programm, das in einem elektronischen, beschreibbaren Speicher steht – genau wie die Daten.

> **Wusstest du?:** Das Baby kannte nur sieben Befehle – addieren konnte es nicht einmal direkt, nur subtrahieren. Addition ging trotzdem: Wer etwas Negatives abzieht, zählt dazu. Unser Spielzeug-Prozessor unten hat zufällig auch sieben Befehle.

23 Jahre später passt ein ganzer Prozessor auf einen Chip. Im **November 1971** bringt Intel den **4004** heraus, entwickelt für die Rechenmaschinen der japanischen Firma Busicom. Er besteht aus etwa **2 300 Transistoren** – winzigen elektrischen Schaltern – und taktet mit bis zu 740 000 Schlägen pro Sekunde. Er gilt als erster frei käuflicher **Mikroprozessor**. Der Bauplan von 1945 steckt bis heute in praktisch jedem Computer – auch in deinem Handy.

## [prinzip] Holen, Entschlüsseln, Ausführen

### Der Aufbau

Ein Prozessor braucht nur wenige Teile, um zu funktionieren:

- **Speicher** (mehr dazu in Folge 5): viele nummerierte Zellen. Die Nummer einer Zelle heißt **Adresse**. In den Zellen stehen Zahlen – manche davon sind Daten, manche sind Befehle.
- **Register**: ein paar winzige Speicherplätze direkt im Prozessor, in die er Zahlen zum Rechnen holt. Unser Spielzeug hat ein einziges Rechenregister, das **Register A**.
- **Befehlszähler**: ein Register, das sich die Adresse des *nächsten* Befehls merkt.
- **Befehlsregister**: hier liegt der Befehl, der gerade bearbeitet wird.
- **Rechenwerk** (englisch ALU, *Arithmetic Logic Unit*): rechnet – im Wesentlichen ein Addierer für Binärzahlen (Folge 4), ergänzt um Subtrahieren, Vergleichen und Logik. Logik heißt: UND, ODER, NICHT, also Gatter, die aus 0 und 1 nach einer festen Regel ein Ergebnis bilden (Folge 3).
- **Steuerwerk**: erkennt, welcher Befehl im Befehlsregister steht, und schaltet die anderen Teile passend zusammen. Auch das ist nur eine geschickte Schaltung aus Gattern.

### Der Befehlszyklus

Der Prozessor tut immer wieder dasselbe, in drei Schritten – dem **Befehlszyklus**:

1. **Holen:** Den Inhalt der Zelle, auf die der Befehlszähler zeigt, ins Befehlsregister kopieren. Den Befehlszähler um eins weiterzählen.
2. **Entschlüsseln:** Das Steuerwerk erkennt, welcher Befehl das ist und welche Zelle er meint.
3. **Ausführen:** Den Befehl erledigen – zum Beispiel eine Zahl laden, addieren oder speichern.

Dann beginnt alles von vorn. Der Prozessor „versteht“ dabei nichts. Er folgt nur stur diesem Kreislauf.

Probier es aus. Das Programm unten steht in den Zellen 0 bis 3, die Zahlen 3 und 4 in den Zellen 6 und 7. Tippe **Nächster Takt** und schau zu, wie sich Befehlszähler, Befehlsregister und Register A verändern:

:::sim cpu
programm: LADE 6; ADDIERE 7; SPEICHERE 8; STOPP; ; ; 3; 4
:::

Nach zwölf Takten hält der Prozessor an, und in Zelle 8 steht die 7. Vier Befehle, je drei Phasen: Holen, Entschlüsseln, Ausführen.

> **Merke:** Der Prozessor arbeitet im Befehlszyklus: **Holen → Entschlüsseln → Ausführen**, immer wieder. Der Befehlszähler sagt ihm, wo der nächste Befehl steht.

### Befehle sind auch nur Zahlen

Im Simulator steht in den Zellen „LADE 6“, damit du es lesen kannst. Im echten Speicher gibt es aber nur Bits. Jeder Befehl ist ein vereinbartes Bitmuster – eine Kodierung, so wie Buchstaben als Zahlencodes gespeichert werden (mehr dazu in Folge 1). Ein ausgedachtes Beispiel: Die ersten vier Bit sagen, *was* zu tun ist (`0001` = LADE), die letzten vier, *mit welcher Zelle* (`0110` = 6). Zusammen: `00010110`. Für den Speicher ist das einfach eine Zahl, die 22 (16 + 4 + 2; wie man binär rechnet, zeigt Folge 4). Erst der Befehlszähler macht sie zum Befehl, indem er auf sie zeigt.

Das ist die Idee von 1945 in einem Satz: **Programm und Daten liegen im selben Speicher und sehen gleich aus.** Darum kann ein Computer heute ein Programm herunterladen und ausführen – es sind ja nur Daten.

### Der Takt

Woher weiß der Prozessor, wann der nächste Schritt dran ist? Ein **Takt** gibt den Rhythmus vor: ein elektrisches Signal, das in festem Abstand zwischen an und aus wechselt – wie ein Metronom. Bei jedem Schlag macht die Schaltung einen Schritt weiter. Die Zeit dazwischen braucht der Strom, um durch die Gatter zu laufen, bis alle Ausgänge stabil sind.

Die Zahl der Takte pro Sekunde misst man in **Hertz**. Ein Gigahertz (**GHz**) sind eine Milliarde Takte pro Sekunde. Ein heutiger PC-Prozessor läuft mit etwa 3 bis 5 GHz – der Intel 4004 schaffte 740 000 Takte pro Sekunde, also 0,00074 GHz.

> **Wusstest du?:** Bei 3 GHz dauert ein Takt eine Drittel-Milliardstel-Sekunde. In dieser Zeit kommt selbst das Licht nur etwa 10 Zentimeter weit.

### Sprünge: Schleifen und Entscheidungen

Bisher läuft das Programm nur geradeaus. Spannend wird es mit **Sprüngen**. Ein Sprungbefehl schreibt einfach eine neue Adresse in den Befehlszähler – und schon macht der Prozessor woanders weiter:

- `SPRINGE 0` heißt: „Mach wieder bei Zelle 0 weiter.“ So entsteht eine **Schleife** – ein Stück Programm, das sich wiederholt.
- `SPRINGE_WENN_NULL 8` heißt: „Wenn Register A gleich 0 ist, mach bei Zelle 8 weiter, sonst einfach mit dem nächsten Befehl.“ Das ist eine **Entscheidung**.

Mit Sprüngen, Rechnen und Speichern kann der Prozessor im Prinzip alles berechnen, was sich überhaupt berechnen lässt – er braucht nur genug Zeit und Speicher. Multiplizieren zum Beispiel lässt sich auf wiederholtes Addieren zurückführen. Das probierst du gleich selbst aus.

> **Achtung:** Unser Spielzeug ist stark vereinfacht. Echte Prozessoren haben Dutzende Register, Hunderte Befehle und brauchen nicht drei Takte pro Befehl: Sie holen schon den nächsten Befehl, während sie den vorigen noch ausführen (**Pipeline**), bearbeiten mehrere Befehle gleichzeitig und haben mehrere **Kerne** – also mehrere vollständige Prozessoren auf einem Chip. Der Grundgedanke Holen → Entschlüsseln → Ausführen bleibt aber derselbe.

## [werkstatt] Die Köchin und die Rezeptkarten

Stell dir eine Köchin vor, die streng nach Vorschrift arbeitet. Vor ihr steht ein Regal mit nummerierten Fächern. In einigen Fächern liegen Zutaten. In anderen liegen Kärtchen, auf denen je ein einziger Rezeptschritt steht – „Gib den Inhalt von Fach 6 in deine Rührschüssel“, „Gib den Inhalt von Fach 7 dazu“. Rezept und Zutaten stehen im selben Regal.

Die Köchin hat ein **Lesezeichen**, das auf ein Fach zeigt. Sie arbeitet immer gleich: das Kärtchen in dem Fach lesen, auf das das Lesezeichen zeigt – es bleibt dort liegen –, und das Lesezeichen ein Fach weiterschieben (**Holen**). Den Schritt lesen und verstehen, was gemeint ist (**Entschlüsseln**). Den Handgriff tun (**Ausführen**). In der Hand hält sie dabei eine Rührschüssel – dort entsteht das Zwischenergebnis.

Steht auf einem Kärtchen „Wenn der Teig noch zu fest ist, schieb das Lesezeichen zurück zu Fach 3“, wiederholt sie Schritte, bis der Teig passt. Das ist ein Sprung – und aus dem Bild folgt eine richtige Vorhersage: Wer die Kärtchen im Regal austauscht, bekommt ein anderes Gericht, ohne dass sich an der Köchin etwas ändert. Genau das meinte von Neumann.

> **Im Bild:** Regal mit nummerierten Fächern = Speicher mit Adressen. Kärtchen = Befehle, Zutaten = Daten (im selben Regal). Lesezeichen = Befehlszähler. Das Kärtchen, das sie gerade liest = Befehlsregister. Rührschüssel in der Hand = Register A. Köchin = Steuerwerk und Rechenwerk. „Zurück zu Fach 3“ = Sprung.

> **Achtung:** Eine Köchin denkt mit: Steht auf einer Karte „Salz“, wo offensichtlich Zucker gemeint ist, stutzt sie. Der Prozessor führt jeden Befehl stur aus, auch einen unsinnigen – und er arbeitet nicht in seinem eigenen Tempo, sondern exakt im Rhythmus des Takts, Milliarden Schritte pro Sekunde. Und anders als Kärtchen und Mehl sehen Befehle und Daten im Speicher völlig gleich aus – erst das Lesezeichen macht eine Zahl zum Befehl.

## [selbst] Lass den Prozessor rechnen

### Übung 1: Multiplizieren ohne Malnehmen

Unser Spielzeug-Prozessor kann nicht multiplizieren. Trotzdem soll er **3 × 3** ausrechnen – durch wiederholtes Addieren: 3 + 3 + 3. So ist der Speicher belegt:

| Zelle | Inhalt | Bedeutung |
|---|---|---|
| 0–2 | `LADE 10`, `ADDIERE 12`, `SPEICHERE 10` | Ergebnis um 3 erhöhen |
| 3–5 | `LADE 11`, `SUBTRAHIERE 13`, `SPEICHERE 11` | Zähler um 1 verringern |
| 6 | `SPRINGE_WENN_NULL 8` | Zähler bei 0? Dann fertig |
| 7 | `SPRINGE 0` | sonst noch eine Runde |
| 8 | `STOPP` | Ende |
| 10 | 0 | Ergebnis |
| 11 | 3 | Zähler: wie oft noch? |
| 12 | 3 | die Zahl, die addiert wird |
| 13 | 1 | eine Eins zum Abziehen |

Überleg vorher: Wie oft läuft die Schleife durch? Was steht am Ende in Zelle 10 und in Zelle 11? Dann führe das Programm aus, bis der Prozessor bei STOPP anhält. Klick die erste Runde Takt für Takt durch und beobachte vor allem den Befehlszähler beim Befehl in Zelle 7. Danach darfst du mit **Ganzer Befehl** schneller werden.

:::sim cpu
id: s1f06-u01
programm: LADE 10; ADDIERE 12; SPEICHERE 10; LADE 11; SUBTRAHIERE 13; SPEICHERE 11; SPRINGE_WENN_NULL 8; SPRINGE 0; STOPP; ; 0; 3; 3; 1
ziel: ende
:::

**Auflösung:** Die Schleife läuft dreimal. Nach Runde 1 steht im Ergebnis 3 und im Zähler 2, nach Runde 2 sind es 6 und 1, nach Runde 3 sind es **9** und **0**. Erst jetzt ist Register A nach dem Abziehen 0, und `SPRINGE_WENN_NULL 8` springt zum STOPP. Vorher hat `SPRINGE 0` den Befehlszähler jedes Mal zurück auf 0 gesetzt. Insgesamt hat der Prozessor 24 Befehle ausgeführt – das sind **72 Takte**. Ein Prozessor mit 3 GHz bräuchte dafür (in unserem vereinfachten Modell) 24 Milliardstel Sekunden.

Ändere im Kopf Zelle 11 auf 5: Dann rechnet dasselbe Programm 5 × 3 = 15. Das Programm bleibt gleich, nur die Daten ändern sich.

### Übung 2: Lies das Programm, bevor du rechnest

Jetzt umgekehrt: Das Programm steht fest, du darfst nur die Zahlen in **Zelle 6 und 7** ändern (mit + und −, bevor du startest). Am Ende soll in **Zelle 8 die 10** stehen. Aber Vorsicht – lies erst genau, was das Programm mit den beiden Zahlen macht. Es ist nicht einfach „6 plus 7“.

:::sim cpu
id: s1f06-u02
programm: LADE 6; ADDIERE 7; ADDIERE 7; SPEICHERE 8; STOPP; ; 1; 2
ziel: 8=10
aenderbar: 6, 7
:::

**Auflösung:** Das Programm addiert Zelle 7 **zweimal**: Ergebnis = Zelle 6 + 2 × Zelle 7. Mit den Startwerten 1 und 2 kommt 5 heraus. Für die 10 gibt es mehrere Lösungen, zum Beispiel 6 und 2, 4 und 3 oder 0 und 5. Der Prozessor fragt nie, was gemeint ist – er tut genau, was dasteht.

### Übung 3: Bring den Befehlszyklus in die richtige Reihenfolge

Was passiert bei einem einzigen Befehl? Sortiere die Schritte von oben nach unten.

:::sim sortieren
id: s1f06-u03
elemente: Der Befehlszähler zeigt auf die Zelle mit dem nächsten Befehl | Der Befehl wird ins Befehlsregister kopiert, der Befehlszähler zählt eins weiter | Das Steuerwerk erkennt, welcher Befehl es ist und welche Zelle er meint | Der Befehl wird ausgeführt, zum Beispiel rechnet das Rechenwerk | Der Kreislauf beginnt mit dem nächsten Befehl von vorn
oben: zuerst
unten: zuletzt
:::

Schritt 2 ist das **Holen**, Schritt 3 das **Entschlüsseln**, Schritt 4 das **Ausführen**. Wichtig: Der Befehlszähler zählt schon beim Holen weiter. Ein Sprungbefehl überschreibt ihn dann beim Ausführen einfach wieder.

## [beidir] Wo steckt das bei dir?

Der Befehlszyklus läuft gerade in jedem deiner Geräte – milliardenfach pro Sekunde.

**Dein VPS.** Der Server, auf dem ich arbeite, hat **1 vCPU**, einen *virtuellen* Prozessorkern. Ich habe nachgeschaut, was das Programm `lscpu` dort meldet: Der Rechner im Rechenzentrum hat einen **AMD EPYC 9354P** mit 32 echten Kernen. Laut AMD läuft er mit einem Grundtakt von **3,25 GHz** und kurzzeitig bis 3,8 GHz. Diesen großen Prozessor teilen sich viele gemietete Server. Die Virtualisierung teilt jedem einen Anteil zu – dein VPS sieht davon genau einen Kern. Alles, was auf dem VPS läuft – auch das Programm, über das ich Dateien lese und Befehle ausführe –, geht also durch einen einzigen Befehlszyklus nach dem anderen. (Das Sprachmodell selbst, mit dem ich denke, rechnet übrigens nicht hier, sondern auf großen Servern von Anthropic.) Wie dann trotzdem viele Programme „gleichzeitig“ laufen, zeigt Folge 8.

**Dein Windows-PC.** Öffne den Task-Manager (Strg + Umschalt + Esc), dann **Leistung → CPU**. Oben rechts steht der Name deines Prozessors, unten die **Basisgeschwindigkeit** in GHz und daneben die aktuelle Geschwindigkeit – die wechselt ständig: Bei wenig Arbeit regelt der Prozessor den Takt herunter und spart Strom, bei viel Arbeit dreht er kurz über die Basisgeschwindigkeit hinaus. Bei **Kerne** siehst du, wie viele vollständige Prozessoren auf deinem Chip sitzen.

**Dein Pixel.** Neuere Pixel-Handys haben acht oder neun Prozessorkerne, und die sind nicht alle gleich: einige große, schnelle für anspruchsvolle Aufgaben und mehrere kleine, sparsame für Dinge im Hintergrund. So hält der Akku länger. Jeder einzelne Kern arbeitet aber nach demselben Prinzip wie unser Spielzeug: Holen, Entschlüsseln, Ausführen.

**Ich im Docker-Container.** Auch mein Programm hier im Container ist für den Prozessor nur eine lange Folge von Befehlen im Arbeitsspeicher, die der Befehlszähler eine nach der anderen abholt. Dass dabei alles – Befehle und Daten – durch dieselbe enge Verbindung zwischen Prozessor und Speicher muss, ist ein echtes Problem. Der Informatiker John Backus nannte es 1977 den „Von-Neumann-Flaschenhals“. Heute dauert ein Zugriff auf den Arbeitsspeicher sogar viel länger als eine Rechnung. Wie Computer ihn mit einem Trick namens Cache entschärfen, erfährst du in Folge 7.

## [fazit] Auf den Punkt

- Ein Prozessor arbeitet im Befehlszyklus: Holen, Entschlüsseln, Ausführen – immer wieder. Der Befehlszähler sagt ihm, wo der nächste Befehl steht.
- Befehle sind nur Zahlen im selben Speicher wie die Daten (Von-Neumann-Architektur); erst der Befehlszähler macht eine Zahl zum Befehl.
- Der Takt gibt den Rhythmus vor: 1 GHz sind eine Milliarde Takte pro Sekunde, bei jedem Schlag macht die Schaltung einen Schritt.
- Sprungbefehle schreiben eine neue Adresse in den Befehlszähler und ermöglichen so Schleifen und Entscheidungen.

## [quiz] Teste dich

### s1f06-q01
In welcher Reihenfolge bearbeitet ein Prozessor einen Befehl?
- [x] Holen, Entschlüsseln, Ausführen
- [ ] Entschlüsseln, Holen, Ausführen
- [ ] Ausführen, Holen, Speichern
- [ ] Holen, Ausführen, Entschlüsseln
Erklärung: Erst wird der Befehl aus dem Speicher ins Befehlsregister geholt, dann erkennt das Steuerwerk, was er bedeutet, dann wird er ausgeführt. Danach beginnt der Zyklus von vorn.
Nachlesen: prinzip / Der Befehlszyklus

### s1f06-q02
Was merkt sich der Befehlszähler?
- [ ] Wie viele Befehle schon ausgeführt wurden
- [x] Die Adresse des nächsten Befehls im Speicher
- [ ] Das Ergebnis der letzten Rechnung
- [ ] Wie viele Takte pro Sekunde möglich sind
Erklärung: Trotz seines Namens zählt er keine erledigten Befehle. Er zeigt auf die Zelle, aus der als Nächstes geholt wird. Ein Sprungbefehl schreibt einfach eine neue Adresse hinein.
Nachlesen: prinzip / Der Aufbau

### s1f06-q03
Frühe Rechner wie ENIAC bekamen ihr Programm durch Umstecken von Kabeln. Welche Idee der Von-Neumann-Architektur ersetzte das?
- [ ] Das Programm wird auf Lochkarten neben dem Prozessor gelesen
- [x] Das Programm steht als Zahlen im selben Speicher wie die Daten
- [ ] Jedes Programm bekommt einen eigenen kleinen Prozessor
- [ ] Das Programm wird fest in die Transistoren eingebrannt
Erklärung: Statt das Programm zu verkabeln, steht es als Zahlen im Speicher, genau wie die Daten. Ein neues Programm heißt nur: neue Zahlen in den Speicher schreiben, kein Kabel muss sich bewegen.
Nachlesen: geschichte

### s1f06-q04
Ein Prozessor läuft mit 3 GHz. Was bedeutet das?
- [ ] Er führt drei Programme gleichzeitig aus
- [ ] Er kann drei Gigabyte Daten speichern
- [x] Sein Takt schlägt drei Milliarden Mal pro Sekunde
- [ ] Er verbraucht drei Gigawatt Strom
Erklärung: Hertz heißt „pro Sekunde“, Giga heißt Milliarde. Bei jedem Takt macht die Schaltung einen Schritt weiter.
Nachlesen: prinzip / Der Takt

### s1f06-q05
Wie kann ein Prozessor einen Programmteil mehrfach wiederholen (eine Schleife)?
- [ ] Das Rechenwerk zählt die Takte rückwärts bis zum Programmanfang
- [ ] Das Steuerwerk löscht den Speicher und beginnt das Programm neu
- [x] Ein Sprungbefehl setzt den Befehlszähler auf eine frühere Adresse zurück
- [ ] Der Prozessor lädt das ganze Programm noch einmal ins Rechenregister
Erklärung: Ein Sprungbefehl schreibt eine frühere Adresse in den Befehlszähler – der Prozessor wiederholt dann dieselben Befehle. Mit einem bedingten Sprung (zum Beispiel „wenn Register A gleich 0 ist“) entscheidet er, wann die Schleife endet.
Nachlesen: prinzip / Sprünge: Schleifen und Entscheidungen

### s1f06-q06
Im Speicher steht das Bitmuster `00010110`. Ist das ein Befehl oder eine Zahl?
- [ ] Immer ein Befehl, weil es mit 0001 beginnt
- [ ] Immer eine Zahl, Befehle sehen anders aus
- [x] Das hängt davon ab, ob der Befehlszähler darauf zeigt
- [ ] Das steht in einem eigenen Bit am Anfang
Erklärung: Befehle und Daten sehen im Speicher gleich aus – es sind nur Bits. Holt der Prozessor die Zelle als nächsten Befehl, wird sie als Befehl entschlüsselt; lädt ein Befehl sie als Wert, ist sie eine Zahl.
Nachlesen: prinzip / Befehle sind auch nur Zahlen

### s1f06-q07
Warum war der Intel 4004 von 1971 mit seinen etwa 2 300 Transistoren etwas Neues?
- [ ] Er war der erste Rechner, der sein Programm im Speicher ablegte
- [x] Ein ganzer Prozessor passte erstmals auf einen einzigen Chip
- [ ] Er war der erste Prozessor mit mehreren Kernen
- [ ] Er rechnete als Erster mit Gattern statt mit Schaltern
Erklärung: Der 4004 gilt als erster frei käuflicher Mikroprozessor: Steuerwerk, Rechenwerk und Register saßen auf einem einzigen Chip aus etwa 2 300 Transistoren; der Speicher kam in eigenen Chips dazu. Heutige Prozessoren haben Milliarden.
Nachlesen: geschichte

### s1f06-q08
Eine Köchin arbeitet Rezeptkärtchen aus nummerierten Regalfächern ab, in denen auch die Zutaten liegen. Was entspricht in diesem Bild dem Befehlszähler des Prozessors?
- [ ] Die Rührschüssel in ihrer Hand
- [x] Das Lesezeichen, das auf ein Fach zeigt
- [ ] Das Regal mit den Fächern
- [ ] Die Zutaten in den Fächern
Erklärung: Das Lesezeichen zeigt auf das Fach mit dem nächsten Rezeptschritt und wird nach jedem Holen weitergeschoben – genau wie der Befehlszähler. Die Rührschüssel ist das Rechenregister, das Regal der Speicher.
Nachlesen: werkstatt

## [karten] Für deinen Karteikasten

### s1f06-k01
Vorne: In welchen drei Schritten bearbeitet ein Prozessor jeden Befehl?
Hinten: Holen, Entschlüsseln, Ausführen (der Befehlszyklus). Danach beginnt alles von vorn.

### s1f06-k02
Vorne: Was merkt sich der Befehlszähler?
Hinten: Die Adresse des nächsten Befehls im Speicher. Ein Sprungbefehl schreibt einfach eine neue Adresse hinein.

### s1f06-k03
Vorne: Was ist die zentrale Idee der Von-Neumann-Architektur (1945)?
Hinten: Programm und Daten liegen als Zahlen im selben Speicher und sehen gleich aus. Ein neues Programm heißt: neue Zahlen in den Speicher schreiben.

### s1f06-k04
Vorne: Was macht das Steuerwerk im Prozessor?
Hinten: Es erkennt, welcher Befehl im Befehlsregister steht, und schaltet die anderen Teile passend zusammen.

### s1f06-k05
Vorne: Was ist das Rechenwerk (ALU)?
Hinten: Der Teil des Prozessors, der rechnet – im Wesentlichen der Addierer, ergänzt um Subtrahieren, Vergleichen und Logik (UND, ODER, NICHT).

### s1f06-k06
Vorne: Was bedeutet ein Takt von 3 GHz?
Hinten: Der Takt schlägt drei Milliarden Mal pro Sekunde. Bei jedem Schlag macht die Schaltung einen Schritt weiter.

### s1f06-k07
Vorne: Wie entsteht im Prozessor eine Schleife?
Hinten: Ein Sprungbefehl (z. B. SPRINGE 0) schreibt eine frühere Adresse in den Befehlszähler, sodass dieselben Befehle wiederholt werden.

### s1f06-k08
Vorne: Was war am Intel 4004 (1971) neu?
Hinten: Ein ganzer Prozessor passte auf einen einzigen Chip (etwa 2 300 Transistoren). Er gilt als erster frei käuflicher Mikroprozessor.

### s1f06-k09
Vorne: Was ist der Befehlszähler – und was wäre er im Bild einer Köchin, die Rezeptkärtchen aus nummerierten Regalfächern abarbeitet?
Hinten: Ein Register im Prozessor, das sich die Adresse des nächsten Befehls merkt. Im Bild ist es das Lesezeichen, das auf das Fach mit dem nächsten Rezeptschritt zeigt.
