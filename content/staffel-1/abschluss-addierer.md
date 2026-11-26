---
id: s1g
status: freigegeben
faktencheck: 26.11.2026 – Durchgang 1 nicht bestanden (2 Fehler behoben), Durchgang 2 bestanden; unabhängige Prüfung, Berichte in docs/faktencheck/; Umstellung auf eigenständige Folge + Lernpool (1.5.0): unabhängig geprüft und bestanden
dauer: 20
quellen:
- Computer History Museum: Timeline of Computer History, 1937 – George Stibitz' „Model K“ | https://www.computerhistory.org/timeline/1937/
- Computer History Museum: Timeline of Computer History, 1941 – Konrad Zuses Z3 | https://www.computerhistory.org/timeline/1941/
- Raúl Rojas: Konrad Zuse's Legacy: The Architecture of the Z1 and Z3. IEEE Annals of the History of Computing 19 (2), 1997, S. 5–16
- Konrad Zuse: Der Computer – Mein Lebenswerk. Springer, 5. Aufl. 2010
- IEEE Spectrum: Chip Hall of Fame – Intel 4004 Microprocessor | https://spectrum.ieee.org/chip-hall-of-fame-intel-4004-microprocessor
- Intel: Announcing a New Era of Integrated Electronics (Intel 4004) | https://www.intel.com/content/www/us/en/history/virtual-vault/articles/the-intel-4004.html
- Charles Petzold: Code. Wie Computer funktionieren. Microsoft Press, 2000 (Kapitel „Eine binäre Addiermaschine“)
- David Money Harris, Sarah L. Harris: Digital Design and Computer Architecture. Morgan Kaufmann, 2. Aufl. 2012 (Kapitel 5.2: Addierer, Ripple-Carry und Carry-Lookahead)
- Intel 64 and IA-32 Architectures Software Developer's Manual, Band 1 (Datentypen, Übertrags-Flag CF) | https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html
---

## [einstieg] Kannst du aus ein paar Gattern einen Rechner bauen?

Ein Computer besteht aus Schichten: Bits (0 oder 1) als Strom, der fließt oder nicht, Transistoren als Schalter, die ihn steuern, und darüber **Logikgatter** – kleine Schaltungen, die aus Ja/Nein-Eingaben ein Ja/Nein berechnen (mehr dazu in Folge 3). Jetzt kommt die Probe aufs Exempel: Du nimmst ein paar der einfachsten Gatter – UND, ODER, XODER – und baust daraus etwas, das wirklich **rechnet**.

Das Ziel: ein **4-Bit-Addierer**. Zwei Zahlen von 0 bis 15 rein, ihre Summe raus. Klingt bescheiden? Genau so ein Baustein steckt – nur breiter und schneller – in jedem Prozessor der Welt, auch in deinem Handy. Jede Rechnung, jedes Pixel, jede Zeile dieser App läuft am Ende auch über Schaltungen wie die, die du gleich zusammensetzt.

Dieses Abschlussprojekt ist ein Mitmach-Projekt. Erst schauen wir kurz, wer so etwas zuerst gebaut hat, dann klären wir den Bauplan – und dann baust du selbst, in drei Bauabschnitten.

## [geschichte] Vom Küchentisch auf den Chip

**November 1937.** George Stibitz, Mathematiker bei den Bell Telephone Laboratories, nimmt ein paar ausgemusterte **Relais** mit nach Hause – die elektrisch gesteuerten Schalter (mehr dazu in Folge 2). Am Küchentisch verdrahtet er sie mit zwei Taschenlampen-Birnchen und Blechstreifen. Drückt er die Blechstreifen, gibt er zwei einstellige Binärzahlen ein; die Birnchen zeigen das Ergebnis, ebenfalls binär. Später bekam das Gerät den Spitznamen „Model K“ – K wie *kitchen*, Küche. Es war nicht mehr als ein **Halbaddierer** (siehe unten im Bauplan). Aber es bewies: Relais können binär rechnen. Daraus wurde bei Bell Labs bald ein richtiger Relais-Rechner.

Fast zur gleichen Zeit, ohne voneinander zu wissen, tüftelte in Berlin der Bauingenieur **Konrad Zuse**. Statische Berechnungen kosteten ihn endlose Stunden – das wollte er einer Maschine überlassen. Seine **Z1** war 1938 fertig: ganz mechanisch, aus Blechen gesägt, und sie rechnete schon im Binärsystem. Sie war allerdings unzuverlässig. Die **Z3**, die Zuse **1941** vorführte, arbeitete mit Telefonrelais und gilt vielen als erster funktionsfähiger, frei programmierbarer Rechner. Das Original verbrannte 1943 bei einem Luftangriff; einen Nachbau kannst du im Deutschen Museum in München sehen.

Dreißig Jahre später passte ein kompletter Prozessor – samt Rechenwerk – auf ein Stück Silizium so groß wie ein Fingernagel. **1971** brachte Intel den **4004** heraus, der als erster Mikroprozessor gilt, den man kaufen konnte – gebaut für einen Tischrechner der japanischen Firma Busicom. Er hatte etwa 2 300 Transistoren und verarbeitete Zahlen in Häppchen von **4 Bit**. Also genau die Breite, die du heute baust.

> **Wusstest du?:** 4 Bit reichen für eine Dezimalziffer von 0 bis 9 (und es bleiben sogar Muster übrig). Für einen Taschenrechner, der Ziffer für Ziffer rechnet, war ein 4-Bit-Rechenwerk deshalb eine naheliegende Wahl.

## [prinzip] Der Bauplan: vom Halbaddierer zum Addierwerk

### Was der Halbaddierer nicht kann

Der **Halbaddierer** (mehr dazu in Folge 4) addiert zwei Bits A und B. XODER liefert 1, wenn genau eines der beiden Bits 1 ist; UND liefert 1, wenn beide 1 sind. Die **Summe** ist A XODER B, der **Übertrag** ist A UND B. Für 1 + 1 heißt das: Summe 0, Übertrag 1 – binär `10`, also zwei.

Für die allerletzte Stelle rechts reicht das. Aber schau, was beim schriftlichen Addieren ab der zweiten Stelle passiert. Hier 5 + 6, binär `0101` + `0110` (die vier Stellen zählen von rechts 1, 2, 4 und 8):

```
Übertrag:  1
           0 1 0 1    (5)
         + 0 1 1 0    (6)
         ---------
           1 0 1 1    (11)
```

Rechts: 1 + 0 = 1. Zweite Stelle: 0 + 1 = 1. Dritte Stelle: 1 + 1 = 0, Übertrag 1 in die nächste Stelle. Vierte Stelle: 0 + 0 **+ 1 vom Übertrag** = 1. Ergebnis `1011` = 8 + 2 + 1 = 11.

Ab der zweiten Stelle muss jede Stelle also **drei** Bits zusammenzählen: A, B und den Übertrag, der von rechts hereinkommt. Dafür braucht man eine Schaltung mit drei Eingängen.

### Der Volladdierer

Der **Volladdierer** löst das mit einem einfachen Trick: Er besteht aus **zwei Halbaddierern und einem ODER-Gatter**.

1. Der erste Halbaddierer addiert A und B. Heraus kommen eine Zwischensumme X (= A XODER B) und ein erster Übertrag C1 (= A UND B).
2. Der zweite Halbaddierer addiert die Zwischensumme X und den hereinkommenden Übertrag Cein. Heraus kommen die endgültige Summe S (= X XODER Cein) und ein zweiter Übertrag C2 (= X UND Cein).
3. Ein ODER-Gatter fasst die beiden Überträge zusammen: Wenn einer der beiden Halbaddierer einen Übertrag erzeugt hat, geht ein Übertrag C nach links weiter.

Probier ihn aus. Die drei Schalter sind A, B und der Übertrag von rechts (Cein). Unten liest du C und S zusammen als zweistellige Binärzahl – das ist genau die Anzahl der Einsen, die du eingeschaltet hast:

:::sim schaltung
eingaenge: A, B, Cein
gatter: X=XODER(A,B); S=XODER(X,Cein); C1=UND(A,B); C2=UND(X,Cein); C=ODER(C1,C2)
ausgaenge: C, S
namen: C=Übertrag; S=Summe
zahl: ja
:::

Stell alle drei auf 1: 1 + 1 + 1 = 3, binär `11` – Übertrag 1, Summe 1. Die vollständige Wahrheitstabelle:

| A | B | Cein | C (Übertrag) | S (Summe) | als Zahl |
|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 1 | 0 | 2 |
| 1 | 0 | 0 | 0 | 1 | 1 |
| 1 | 0 | 1 | 1 | 0 | 2 |
| 1 | 1 | 0 | 1 | 0 | 2 |
| 1 | 1 | 1 | 1 | 1 | 3 |

> **Merke:** Ein Volladdierer zählt drei Bits zusammen: A, B und den Übertrag von rechts. Er besteht aus zwei Halbaddierern und einem ODER-Gatter. Heraus kommen eine Summe für diese Stelle und ein Übertrag für die nächste.

> **Wusstest du?:** Die beiden Überträge C1 und C2 sind nie gleichzeitig 1: Wenn A und B beide 1 sind, ist die Zwischensumme X = 0 – dann kann der zweite Halbaddierer keinen Übertrag mehr erzeugen. Deshalb würde statt des ODER auch ein XODER funktionieren. Üblich ist das ODER.

### Volladdierer hintereinander: das Addierwerk

Für eine 4-stellige Zahl stellst du vier Volladdierer nebeneinander – einen je Stelle. Der Übertrag-Ausgang jeder Stelle wird mit dem Übertrag-Eingang ihres linken Nachbarn verbunden. Ganz rechts kommt kein Übertrag herein, dort ist Cein einfach immer 0.

Weil der Übertrag wie eine Welle von Stelle zu Stelle nach links läuft, heißt diese Bauart **Ripple-Carry-Addierer** (englisch *ripple* = sich kräuseln, *carry* = Übertrag). Und hier steckt ein Haken: Jede Stelle kann ihr endgültiges Ergebnis erst liefern, wenn der Übertrag von rechts angekommen ist. Die Gatter brauchen zum Umschalten zwar nur winzige Bruchteile einer Sekunde, aber bei langen Ketten summiert sich das.

Beobachte die **Übertragswelle**. Stell zum Beispiel A = 7 (`0111`) und B = 1 (`0001`) ein und sieh zu, wie der Übertrag Stelle für Stelle nach links wandert:

:::sim addierer
stellen: 4
:::

### Wenn die Stellen nicht reichen: der Überlauf

Mit 4 Bit ist 15 (`1111`) die größte Zahl. Was ist 15 + 1? Rechnerisch 16, binär `10000` – das braucht **fünf** Stellen. Der Übertrag aus der vordersten Stelle hat keinen Platz mehr. Das heißt **Überlauf**: Das Ergebnis passt nicht mehr in die vorhandenen Stellen. Wirft man den letzten Übertrag einfach weg, bleibt `0000` übrig – und 15 + 1 wäre plötzlich 0.

Verbreitete Prozessoren wie die in PCs (x86) und Handys (ARM) werfen ihn nicht kommentarlos weg: Sie merken sich den letzten Übertrag in einem eigenen Bit, dem **Übertrags-Flag** (englisch *carry flag*). Ein Programm kann danach nachsehen, ob die Rechnung übergelaufen ist. Das gilt für Zahlen ohne Vorzeichen, wie in diesem Projekt; für Zahlen mit Vorzeichen (also auch negative) gibt es ein eigenes Flag, das Overflow-Flag – das ist eine andere Geschichte.

### Und in echten Prozessoren?

Der Bauplan ist derselbe, nur größer: Heutige Prozessoren rechnen meist mit **64 Stellen**. Ein Ripple-Carry-Addierer mit 64 Volladdierern wäre aber zu langsam, weil der Übertrag im schlimmsten Fall durch alle 64 Stellen laufen muss. Darum rechnen echte Rechenwerke die Überträge mit zusätzlichen Gattern **vorab** aus: Man sieht jeder Stelle schon an, ob sie selbst einen Übertrag erzeugt (A und B beide 1) oder einen ankommenden nur weiterreicht (genau eins von beiden ist 1). Dieses Verfahren heißt **Carry-Lookahead** („Übertrag vorausschauen“); heute stecken meist noch schnellere Abwandlungen davon in den Chips. Es kostet mehr Gatter, spart aber viel Zeit. Am Prinzip – Bits addieren, Überträge weitergeben – ändert sich nichts.

Ein solches Addierwerk ist das Herzstück des **Rechenwerks** eines Prozessors (englisch *ALU*, Arithmetic Logic Unit), der Teil, der in einem Prozessor die Rechnungen ausführt (mehr zum Prozessor in Folge 6). Es kann noch mehr, etwa subtrahieren oder Bits vergleichen – aber Addieren ist seine Grundaufgabe.

## [werkstatt] Die Dominoreihe

Stell dir eine lange Reihe Dominosteine vor. Ein Stein fällt erst, wenn sein Nachbar ihn anstößt. Stößt du den ersten an, läuft eine Welle durch die Reihe – und der letzte Stein fällt erst, wenn alle vor ihm gefallen sind. Je länger die Reihe, desto länger dauert es, bis die Welle am Ende ankommt.

Genau so wandert der Übertrag durch einen Ripple-Carry-Addierer. Rechnest du 7 + 1, also `0111` + `0001`, dann stößt die rechte Stelle einen Übertrag an, der die zweite Stelle umwirft, die wieder einen Übertrag an die dritte weitergibt, und so weiter bis zur vierten. Erst dann steht das Ergebnis `1000` fest. Aus dem Bild folgt eine richtige Vorhersage: Ein Addierer mit 64 Stellen braucht im schlimmsten Fall viel länger als einer mit 4 – die Reihe ist sechzehnmal so lang.

Auch der schnelle Trick aus dem Prinzip passt ins Bild: Carry-Lookahead ist, als würde jemand vorher ausrechnen, welche Steine fallen werden, und sie alle gleichzeitig anstoßen, statt auf die Welle zu warten.

> **Im Bild:** Dominostein = eine Stelle (ein Volladdierer). Ein Stein stößt den nächsten an = der Übertrag geht an die linke Nachbarstelle. Die Zeit, bis der letzte Stein fällt = die Zeit, bis das Ergebnis feststeht.

> **Achtung:** Hier hinkt das Bild: In einer Dominoreihe fällt jeder Stein, sobald der Nachbar fällt. Im Addierer gibt eine Stelle den Übertrag nur weiter, wenn genau eines ihrer beiden Bits 1 ist; sind beide 0, bleibt die Welle dort stehen, und sind beide 1, startet dort von selbst eine neue Welle – wie eine Reihe mit Lücken und Steinen, die ohne Anstoß umfallen.

## [selbst] Bau dein Addierwerk – in drei Bauabschnitten

### Bauabschnitt 1: Der Volladdierer

Zuerst der Grundbaustein. Unten siehst du einen Volladdierer, bei dem zwei Gatter noch fehlen: die beiden, die den Übertrag erzeugen (C1 und C2). Die Summe (X und S) und das ODER am Ende sind schon fertig verdrahtet.

Deine Aufgabe: Wähle für C1 und C2 das richtige Gatter, sodass die Schaltung für alle acht Kombinationen den richtigen Übertrag liefert. Die Ziel-Tabelle zeigt dir, was herauskommen muss.

Tipp: C1 gehört zum ersten Halbaddierer (A und B), C2 zum zweiten (X und Cein). Schau oben im Bauplan nach: Wie wird der Übertrag eines Halbaddierers gebildet?

:::sim schaltung
id: s1g-u01
eingaenge: A, B, Cein
gatter: X=XODER(A,B); S=XODER(X,Cein); C1=?(A,B); C2=?(X,Cein); C=ODER(C1,C2)
ausgaenge: C, S
namen: C=Übertrag; S=Summe
auswahl: UND, ODER, XODER
ziel: C=00010111; S=01101001
zahl: ja
:::

**Auflösung:** Beide fehlenden Gatter sind **UND**-Gatter. Ein Halbaddierer erzeugt einen Übertrag nur, wenn beide Eingänge 1 sind – genau das tut UND. Hättest du für C1 ein ODER gewählt, käme schon bei 1 + 0 ein Übertrag heraus, und der Rechner würde 1 + 0 = 3 behaupten. Ein XODER an diesen Stellen würde dagegen die (Zwischen-)Summe ein zweites Mal ausrechnen statt des Übertrags.

### Bauabschnitt 2: Vier Volladdierer in Reihe

Jetzt setzt du vier deiner Volladdierer nebeneinander – das Addierwerk ist fertig. Rechne damit drei Aufgaben. Stell jeweils A und B mit den Schaltern ein (die Stellenwerte 8, 4, 2, 1 stehen oben) und beobachte die Übertragswelle.

:::sim addierer
id: s1g-u02
stellen: 4
ziel: 3+4, 7+1, 5+6
:::

**Was ist passiert?**

- **3 + 4** (`0011` + `0100`): Kein einziger Übertrag. Jede Stelle hat höchstens eine 1, die Summe `0111` = 7 steht sofort da.
- **7 + 1** (`0111` + `0001`): Der längste Weg in dieser Aufgabe. Rechts gibt 1 + 1 einen Übertrag, der die zweite Stelle zu 1 + 1 macht, das gibt den nächsten Übertrag und so weiter – drei Überträge hintereinander, bis die vorderste Stelle zu 1 wird. Ergebnis `1000` = 8. Genau die Dominowelle.
- **5 + 6** (`0101` + `0110`): Ein Übertrag entsteht in der dritten Stelle (4 + 4 = 8) und landet in der vierten. Ergebnis `1011` = 11 – wie oben beim schriftlichen Addieren.

### Bauabschnitt 3: Die Grenze finden

Dein Addierwerk hat vier Stellen. Finde zwei Zahlen, deren Summe nicht mehr hineinpasst – der Übertrag ganz links muss aufleuchten.

:::sim addierer
id: s1g-u03
stellen: 4
ziel: ueberlauf
:::

**Erklärung:** Jede Summe ab **16** läuft über, denn mit 4 Bit ist 15 die größte Zahl. Die kleinste überlaufende Summe ist 16, zum Beispiel 15 + 1 oder 8 + 8, die größte 15 + 15 = 30 (binär `11110`). In den vier Stellen bleibt bei 15 + 15 nur `1110` = 14 übrig; der fünfte, vorderste Einser steckt im Übertrag, der keinen Platz mehr hat. Ein Rechner, der diesen Übertrag ignoriert, rechnet still und leise falsch – darum merken sich verbreitete Prozessoren ihn im Übertrags-Flag.

> **Beispiel:** Mit 8 Stellen (1 Byte) wäre die größte Zahl 255. 200 + 100 = 300 würde überlaufen: übrig blieben 300 − 256 = 44.

### Das hast du gebaut

Schau einmal zurück, durch wie viele Schichten dein kleiner Rechner reicht:

1. **Bit** (Folge 1): Eine Zahl ist nur ein Muster aus Nullen und Einsen.
2. **Transistor** (Folge 2): Jede 0 und 1 ist ein Strom, der fließt oder nicht – und Transistoren schalten ihn.
3. **Gatter** (Folge 3): Aus Transistoren entstehen UND, ODER, XODER.
4. **Halbaddierer** (Folge 4): Zwei Gatter addieren zwei Bits.
5. **Volladdierer und Addierwerk** (heute): Zwei Halbaddierer und ein ODER ergeben eine Stelle, vier Stellen ergeben einen Rechner für 0 bis 15.

Von hier ist es nicht mehr weit zu einem Prozessor (Folge 6): Er holt Befehle und Zahlen aus dem Arbeitsspeicher, legt die Zahlen in seinen Registern bereit (winzige Speicherplätze aus Flipflops, Schaltungen, die sich ein Bit merken – Folge 5), schickt sie durch so ein Rechenwerk und schreibt das Ergebnis zurück – Milliarden Mal pro Sekunde. Und das Betriebssystem (Folgen 8 und 9) sorgt dafür, dass viele Programme sich diese Rechenwerke teilen.

Damit hast du das Abschlussprojekt der ersten Staffel geschafft: Du weißt jetzt, was im Inneren eines Computers passiert. In **Staffel 2 „Wie Computer reden“** geht es nach draußen – wie Computer über Netzwerke und das Internet Bits austauschen, wie eine Webseite zu dir kommt und wie Verschlüsselung dafür sorgt, dass niemand mitliest.

## [beidir] Wo steckt das bei dir?

Dein Rechner aus Gattern hat 4 Stellen. Die Geräte, mit denen du jeden Tag arbeitest, rechnen mit **64**.

**Dein Pixel.** Im Pixel steckt ein **64-Bit-Prozessor** mit ARM-Architektur – einer Prozessorfamilie, die besonders stromsparend ist und deshalb in praktisch allen heutigen Handys steckt. Seine Rechenwerke addieren 64-stellige Binärzahlen – im Prinzip genau wie deins, nur mit schnellerer Übertragsberechnung und viel kleineren Transistoren.

**Dein VPS.** Auf dem Server, auf dem ich arbeite, meldet Linux die Architektur `x86_64` – also die 64-Bit-Variante der Prozessorfamilie, die Intel und AMD bauen. Dein VPS hat genau **einen** virtuellen Kern (vCPU), aber auch der addiert 64-Bit-Zahlen, Milliarden Mal pro Sekunde. Wenn ich dir eine Datei schreibe, zähle ich dabei ständig Zahlen zusammen – Stellen in einer Datei, Zeichen in einer Zeile, Bytes im Speicher.

**Dein Windows-PC.** Auch hier sitzt mit allergrößter Wahrscheinlichkeit ein 64-Bit-Prozessor von Intel oder AMD. Windows 11 gibt es überhaupt nur noch als 64-Bit-Version.

### Was heißt „64 Bit“?

64 Bit bedeutet: Der Prozessor verarbeitet Zahlen in Häppchen von 64 Stellen auf einmal. Die größte Zahl, die in 64 Bit passt (ohne Vorzeichen), ist 2⁶⁴ − 1 = **18 446 744 073 709 551 615** – rund 1,8 × 10¹⁹, also etwa 18 Trillionen.

| Stellen | größte Zahl | Beispiel |
|---|---|---|
| 4 Bit | 15 | dein Rechner aus Gattern, Intel 4004 |
| 8 Bit | 255 | ein Byte |
| 32 Bit | 4 294 967 295 | rund 4,3 Milliarden |
| 64 Bit | 18 446 744 073 709 551 615 | rund 18 Trillionen |

Ein Überlauf ist damit sehr viel seltener als bei deinen 4 Stellen – aber nicht unmöglich. Darum gibt es das Übertrags-Flag auch in deinem PC und deinem Handy: Programme, die mit noch größeren Zahlen rechnen müssen (etwa bei der Verschlüsselung in Staffel 2), setzen mehrere 64-Bit-Additionen hintereinander und reichen den Übertrag von einer zur nächsten weiter. Genau wie deine Volladdierer – nur eine Ebene höher.

> **Merke:** Dein 4-Bit-Addierer und das Rechenwerk in deinem Handy folgen demselben Bauplan: Volladdierer je Stelle, Übertrag nach links. Der Unterschied ist die Breite (64 statt 4 Stellen) und ein schnelleres Verfahren für die Überträge.

## [fazit] Auf den Punkt

- Ein Halbaddierer zählt nur zwei Bits zusammen; ab der zweiten Stelle muss auch der Übertrag von rechts mitgezählt werden – das kann der Volladdierer aus zwei Halbaddierern und einem ODER-Gatter.
- Mehrere Volladdierer nebeneinander ergeben ein Addierwerk (Ripple-Carry): Der Übertrag läuft wie eine Welle von Stelle zu Stelle nach links.
- Passt eine Summe nicht in die vorhandenen Stellen, gibt es einen Überlauf; verbreitete Prozessoren merken sich den letzten Übertrag im Übertrags-Flag (bei Zahlen ohne Vorzeichen).
- Schnelle Prozessoren in PCs und Handys rechnen heute meist mit 64 Stellen und berechnen die Überträge vorab (Carry-Lookahead und schnellere Abwandlungen), weil die Welle sonst zu langsam wäre.

## [quiz] Teste dich

### s1g-q01
Beim schriftlichen Addieren in Binärzahlen: Warum reicht ein Halbaddierer (er addiert nur zwei Bits) ab der zweiten Stelle nicht mehr aus?
- [ ] Weil er bei 1 + 1 die falsche Summe liefert
- [x] Weil dort auch der Übertrag von rechts mitzählt
- [ ] Weil ihm ein NICHT-Gatter für die Summe fehlt
- [ ] Weil er für große Zahlen zu langsam schaltet
Erklärung: Ab der zweiten Stelle müssen drei Bits addiert werden: A, B und der Übertrag aus der Stelle rechts daneben. Ein Halbaddierer hat aber nur zwei Eingänge – dafür braucht man den Volladdierer.
Nachlesen: prinzip / Was der Halbaddierer nicht kann

### s1g-q02
Woraus besteht ein Volladdierer (die Schaltung, die A, B und einen Übertrag von rechts addiert)?
- [ ] Aus drei UND-Gattern und einem NICHT-Gatter
- [ ] Aus einem Halbaddierer und einem Flipflop
- [x] Aus zwei Halbaddierern und einem ODER-Gatter
- [ ] Aus vier XODER-Gattern hintereinander
Erklärung: Der erste Halbaddierer addiert A und B, der zweite addiert die Zwischensumme und den Übertrag von rechts. Ein ODER-Gatter fasst die beiden möglichen Überträge zu einem zusammen.
Nachlesen: prinzip / Der Volladdierer

### s1g-q03
Ein Volladdierer bekommt A = 1, B = 1 und einen Übertrag von rechts = 1. Was liefert er?
- [ ] Summe 0, Übertrag 1
- [ ] Summe 1, Übertrag 0
- [ ] Summe 0, Übertrag 0
- [x] Summe 1, Übertrag 1
Erklärung: 1 + 1 + 1 = 3, binär `11`. Die Summe für diese Stelle ist 1, und eine 1 wandert als Übertrag nach links.
Nachlesen: prinzip / Der Volladdierer

### s1g-q04
In einem Addierer mit vier Stellen, in dem der Übertrag Stelle für Stelle nach links wandert (Ripple-Carry): Bei welcher Aufgabe legt der Übertrag den weitesten Weg zurück?
- [ ] 3 + 4
- [x] 7 + 1
- [ ] 8 + 4
- [ ] 2 + 1
Erklärung: Bei 7 + 1 (`0111` + `0001`) erzeugt die rechte Stelle einen Übertrag, der durch drei Stellen nach links weitergereicht wird. Bei 3 + 4, 8 + 4 und 2 + 1 entsteht überhaupt kein Übertrag.
Nachlesen: selbst / Bauabschnitt 2: Vier Volladdierer in Reihe

### s1g-q05
Ein Addierwerk mit 4 Bit (größte Zahl: 15) rechnet 12 + 6. Was passiert?
- [ ] Es zeigt 18 an, weil 4 Bit bis 31 reichen
- [x] Es läuft über, in den 4 Stellen bleibt 2 übrig
- [ ] Es läuft über, in den 4 Stellen bleibt 0 übrig
- [ ] Es zeigt 15 an, die größte mögliche Zahl
Erklärung: Mit 4 Bit ist 15 die größte Zahl. 18 ist binär `10010` und braucht fünf Stellen. Der vorderste Einser landet im Übertrag ganz links, in den vier Stellen bleibt `0010` = 2 (18 − 16).
Nachlesen: prinzip / Wenn die Stellen nicht reichen: der Überlauf

### s1g-q06
Warum benutzen echte Prozessoren nicht einfach 64 Volladdierer in einer Kette, in der jede Stelle den Übertrag an die nächste weiterreicht (Ripple-Carry)?
- [ ] Weil Volladdierer keine Zahlen über 15 schaffen
- [ ] Weil der Übertrag dort von links nach rechts läuft
- [x] Weil jede Stelle auf den Übertrag von rechts warten müsste
- [ ] Weil 64 Volladdierer nicht auf einen Chip passen
Erklärung: In einer Ripple-Carry-Kette wartet jede Stelle auf den Übertrag ihres rechten Nachbarn – bei 64 Stellen dauert das zu lange. Verfahren wie Carry-Lookahead rechnen die Überträge mit zusätzlichen Gattern vorab aus.
Nachlesen: prinzip / Und in echten Prozessoren?

### s1g-q07
Ein Gerät aus Relais (elektrisch gesteuerten Schaltern) addiert zwei einzelne Bits und zeigt Summe und Übertrag an. Welcher Schaltung aus dem Bauplan eines Addierers entspricht es?
- [x] Einem Halbaddierer
- [ ] Einem Volladdierer
- [ ] Einem Flipflop
- [ ] Einem Ripple-Carry-Addierer
Erklärung: Zwei Bits ohne Übertrag von rechts zu addieren ist die Aufgabe eines Halbaddierers. Genau das tat das „Model K“, das George Stibitz 1937 am Küchentisch aus Relais, Blechstreifen und Birnchen baute. Es zeigte, dass Relais binär rechnen können.
Nachlesen: geschichte

## [karten] Für deinen Karteikasten

### s1g-k01
Vorne: Was kann ein Halbaddierer (addiert zwei Bits) nicht, was ein Volladdierer kann?
Hinten: Er hat nur zwei Eingänge (A und B). Der Volladdierer zählt drei Bits zusammen: A, B und den Übertrag von rechts.

### s1g-k02
Vorne: Woraus besteht ein Volladdierer?
Hinten: Aus zwei Halbaddierern und einem ODER-Gatter, das die beiden Überträge zusammenfasst.

### s1g-k03
Vorne: Was liefert ein Volladdierer bei A = 1, B = 1 und Übertrag von rechts = 1?
Hinten: 1 + 1 + 1 = 3, binär `11`: Summe 1 und Übertrag 1.

### s1g-k04
Vorne: Wie heißt ein Addierwerk aus hintereinandergeschalteten Volladdierern, und warum?
Hinten: Ripple-Carry-Addierer: Der Übertrag läuft wie eine Welle (englisch *ripple*) von Stelle zu Stelle nach links.

### s1g-k05
Vorne: Was bedeutet Überlauf?
Hinten: Das Ergebnis passt nicht mehr in die vorhandenen Stellen. Mit 4 Bit ergibt 15 + 1 zum Beispiel nur `0000`, weil der fünfte Einser keinen Platz hat.

### s1g-k06
Vorne: Wo merken sich verbreitete Prozessoren (x86, ARM) den letzten Übertrag?
Hinten: Im Übertrags-Flag (englisch *carry flag*). Ein Programm kann danach nachsehen, ob die Rechnung übergelaufen ist.

### s1g-k07
Vorne: Was macht Carry-Lookahead anders als ein Ripple-Carry-Addierer?
Hinten: Es rechnet die Überträge mit zusätzlichen Gattern vorab aus, statt auf die Übertragswelle zu warten – mehr Gatter, aber viel schneller.

### s1g-k08
Vorne: Was zeigte George Stibitz' „Model K“ von 1937, ein Küchentisch-Gerät aus Relais, Blechstreifen und Birnchen?
Hinten: Dass Relais binär rechnen können: Es addierte zwei einstellige Binärzahlen – im Grunde ein Halbaddierer.

### s1g-k09
Vorne: Wie breit rechnete der Intel 4004 (1971), der als erster käuflicher Mikroprozessor gilt?
Hinten: 4 Bit – er verarbeitete Zahlen in Häppchen von vier Stellen, genau die Breite des 4-Bit-Addierers aus dem Abschlussprojekt.
