---
id: s1f01
status: entwurf
dauer: 15
quellen:
- Claude E. Shannon: A Mathematical Theory of Communication. Bell System Technical Journal 27 (1948), S. 379–423 und 623–656 | https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
- Gottfried Wilhelm Leibniz: Explication de l'Arithmétique Binaire (1703), Mémoires de l'Académie Royale des Sciences
- Paul Revere: Brief an Jeremy Belknap (um 1798) über die Laternen-Vereinbarung vom April 1775, Massachusetts Historical Society
- James Gleick: Die Information. Geschichte, Theorie, Flut. Redline, 2011
- ASCII-Tabelle: USAS X3.4-1968 / RFC 20 (1969) | https://www.rfc-editor.org/rfc/rfc20
- IEC 80000-13: Binärpräfixe (KiB, MiB, GiB) und Einheiten der Informationstechnik
---

## [einstieg] Wie viele Fragen brauchst du für eine von einer Million?

Stell dir vor, ich denke mir eine Zahl zwischen 1 und 1 000 000. Du darfst nur Fragen stellen, auf die ich mit **Ja** oder **Nein** antworte. Wie viele Fragen brauchst du höchstens, um die Zahl sicher zu finden?

Tausend? Hundert? Es sind **zwanzig**.

Hinter dieser verblüffend kleinen Zahl steckt die Idee, auf der jeder Computer aufgebaut ist: Alles – Texte, Fotos, Musik, diese App – lässt sich in lauter Ja-Nein-Antworten zerlegen. Eine einzelne solche Antwort heißt **Bit**. In dieser Folge lernst du, was ein Bit ist, warum es so mächtig ist, und warum zwanzig Fragen für eine Million reichen.

## [geschichte] Laternen, Nullen und ein Mann bei Bell Labs

**Boston, 18. April 1775.** Die britische Armee will in der Nacht ausrücken – aber auf welchem Weg? Über Land oder mit Booten über den Fluss? Der Silberschmied Paul Revere hat mit Freunden auf der anderen Flussseite etwas vereinbart: Im Turm der Old North Church wird eine Laterne aufgehängt, wenn die Soldaten über Land kommen, zwei, wenn sie übers Wasser kommen. In dieser Nacht leuchten zwei. Die Nachricht hatte nur zwei mögliche Inhalte – und genau so viel Information trug sie: eine Entscheidung zwischen zwei Möglichkeiten.

Die Idee, mit nur zwei Zeichen auszukommen, ist noch älter. **1703** veröffentlichte der Universalgelehrte **Gottfried Wilhelm Leibniz** ein Zahlensystem, das nur die Ziffern 0 und 1 kennt – das **Binärsystem**. Er sah darin vor allem eine schöne mathematische Idee – für das alltägliche Rechnen hielt er es für unpraktisch. Es sollte über 200 Jahre dauern, bis Maschinen kamen, für die es perfekt passte.

> **Wusstest du?:** Entworfen hatte Leibniz das Binärsystem schon 1679 – samt der Idee einer Rechenmaschine, in der Kugeln durch Löcher rollen: Loch offen = 1, Loch zu = 0. Gebaut hat er sie nie.

Den entscheidenden Schritt machte der Mathematiker und Ingenieur **Claude Shannon** bei den Bell Telephone Laboratories in den USA. Telefongesellschaften wollten wissen: Wie viel lässt sich durch eine Leitung schicken? Shannon fragte grundsätzlicher: Was *ist* eigentlich Information – und wie misst man sie? **1948** veröffentlichte er seine Antwort: „A Mathematical Theory of Communication“ (übersetzt: „Eine mathematische Theorie der Kommunikation“). Darin taucht zum ersten Mal gedruckt ein neues Wort auf: **Bit**, kurz für *binary digit*, „Binärziffer“. Geprägt hatte es sein Kollege John Tukey ein Jahr zuvor in einer internen Notiz – Shannon nennt ihn ausdrücklich.

Shannons Einsicht: Für seine Theorie spielt keine Rolle, was eine Nachricht bedeutet oder wie wichtig sie ist. Information ist das, was Ungewissheit beseitigt. Und die kleinste Portion davon ist die Antwort auf eine einzige Ja-Nein-Frage.

## [prinzip] Ja oder Nein: das Bit

**Information** beantwortet eine offene Frage. Bevor im Kirchturm Licht zu sehen war, gab es zwei Möglichkeiten; danach nur noch eine. Diese kleinste Menge an Information – eine Entscheidung zwischen genau zwei Möglichkeiten – heißt **Bit**. Man schreibt die beiden Möglichkeiten meist als **0** und **1**. Ob das „aus/an“, „nein/ja“ oder „Land/Wasser“ bedeutet, ist Vereinbarungssache.

Ein Lichtschalter ist das perfekte Bild für ein Bit: Er ist entweder aus oder an, nichts dazwischen. Probier es aus:

:::sim bit-schalter
schalter: 1
:::

Mit einem Schalter gibt es zwei Muster. Nimm einen zweiten dazu (Knopf **+**): Jetzt gibt es vier – aus/aus, aus/an, an/aus, an/an. Mit drei Schaltern sind es acht. Jeder weitere Schalter **verdoppelt** die Zahl der möglichen Muster, denn zu jedem bisherigen Muster kommt der neue Schalter einmal aus und einmal an dazu.

| Bits | mögliche Muster |
|---|---|
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |
| 8 | 256 |
| 10 | 1 024 |
| 20 | 1 048 576 |

Damit ist das Rätsel vom Anfang gelöst: 20 Bits ergeben gut eine Million Muster. Jede geschickte Ja-Nein-Frage halbiert die Möglichkeiten – nach 20 Fragen bleibt aus einer Million genau eine übrig.

> **Merke:** Mit *n* Bits gibt es 2 × 2 × … × 2 (*n*-mal) Muster. Jedes Bit mehr verdoppelt die Möglichkeiten.

### Acht Bits sind ein Byte

Weil einzelne Bits so winzig sind, fasst man sie zu Achtergruppen zusammen: **8 Bit = 1 Byte**. Ein Byte hat 2⁸ = 256 mögliche Muster – genug, um jedem Buchstaben des Alphabets, jeder Ziffer und jedem Satzzeichen ein eigenes Muster zu geben. Genau das macht der **ASCII**-Code, entstanden ab 1963 in den USA (seine heutige Form mit Kleinbuchstaben gibt es seit 1967). Er kommt sogar mit 7 Bit aus: 128 Muster, davon 95 für sichtbare Zeichen und der Rest für Steuerbefehle wie „neue Zeile“. Umlaute wie ä kennt ASCII nicht. Im Computer steht jedes Zeichen in einem ganzen Byte, das vorderste Bit ist dann 0. Das große A ist `01000001`, das B `01000010`. Stell es mit acht Schaltern ein:

:::sim bit-schalter
schalter: 8
veraenderbar: nein
buchstabe: ja
:::

Dass `01000001` ein „A“ ist, steht nirgends in den Bits selbst. Es ist eine **Kodierung** – eine Vereinbarung, die alle Beteiligten kennen müssen, genau wie die Laternen-Abmachung von 1775. Dieselben acht Bits könnten in einem Foto ein Stück Farbe sein und in einem Musikstück ein Stück Ton.

> **Wusstest du?:** Genau ein Bit Information liefert eine Antwort nur, wenn beide Möglichkeiten gleich wahrscheinlich sind. Fragst du „Schneit es morgen in Sevilla?“, bist du dir fast sicher, dass die Antwort Nein ist – sie verrät dir deshalb im Schnitt weniger als ein Bit. Darum sind die besten Fragen beim Zahlenraten die, die die Möglichkeiten genau halbieren.

Wie ein Computer Bits *speichert* und mit ihnen *rechnet* – mit Strom statt mit Laternen –, erfährst du in den nächsten Folgen.

## [werkstatt] Die Werkzeugwand

In dieser Serie ist der Computer eine **Werkstatt**. Nach und nach lernst du ihre Teile kennen: die Werkbank, an der gearbeitet wird (der Prozessor), die Ablage daneben (der Arbeitsspeicher) und das Lager (die SSD). Heute beginnen wir mit dem Kleinsten, was es dort gibt.

An der Wand hängt eine Werkzeugwand mit aufgemalten Umrissen: hier der Hammer, da die Zange, dort der Schraubendreher. Jeder Platz ist entweder **belegt oder leer**. Ein Blick genügt, und wer in der Werkstatt arbeitet, weiß, welches Werkzeug gerade unterwegs ist.

Jeder dieser Plätze ist ein Bit. Belegt = 1, leer = 0. Eine Reihe mit acht Plätzen ist ein Byte: Sie kann 256 verschiedene Belegungen zeigen. Und so wie die Werkzeugwand nur etwas sagt, wenn man weiß, welcher Umriss zu welchem Werkzeug gehört, sagen Bits nur etwas, wenn man die Kodierung kennt.

> **Werkstatt:** Bit = ein Platz an der Werkzeugwand, belegt oder leer. Byte = eine Reihe aus acht Plätzen.

> **Achtung:** Hier hinkt das Bild: Ein Werkzeug kann auch schief oder halb im Platz hängen. Ein Bit kennt kein „halb“ – es ist immer genau 0 oder 1. Genau diese Eindeutigkeit macht Computer so zuverlässig.

## [selbst] Finde die Zahl mit möglichst wenigen Fragen

Ich habe mir eine Zahl zwischen 1 und 64 ausgedacht. Finde sie nur mit der Frage „Ist sie größer als …?“. Versuch es zuerst nach Gefühl – und dann noch einmal mit der Strategie „immer genau halbieren“.

:::sim zahlenraten
id: s1f01-u01
max: 64
:::

Wie viele Fragen hast du gebraucht? Wer immer halbiert, braucht bei 64 Zahlen **genau 6 Fragen** – denn 2⁶ = 64. Eine Frage, die die Möglichkeiten genau halbiert, liefert genau ein Bit. Die gesuchte Zahl steckt also in 6 Bit, so wie ein Buchstabe im ASCII-Code in 7 bis 8 Bit steckt.

**Zum Weiterdenken:** Wie viele Fragen bräuchtest du für eine Zahl zwischen 1 und 1000? (Tipp: Schau in die Tabelle im Abschnitt „Das Prinzip“. Die Antwort ist 10, denn 2¹⁰ = 1 024 reicht gerade.)

## [quiz] Teste dich

### s1f01-q01
Wie viele verschiedene Zustände kann ein einzelnes Bit haben?
- [ ] Einen
- [x] Zwei
- [ ] Zehn
- [ ] Beliebig viele
Erklärung: Ein Bit ist eine Entscheidung zwischen genau zwei Möglichkeiten – aus/an, nein/ja, 0/1. Ein „halb“ gibt es nicht.
Nachlesen: prinzip

### s1f01-q02
Du hast drei Lichtschalter nebeneinander. Wie viele verschiedene Muster aus „aus“ und „an“ kannst du damit einstellen?
- [ ] 3
- [ ] 6
- [x] 8
- [ ] 9
Erklärung: Jeder Schalter verdoppelt die Möglichkeiten: 2 × 2 × 2 = 8. Drei Bits ergeben acht Muster.
Nachlesen: prinzip

### s1f01-q03
Jemand denkt sich eine Zahl von 1 bis 64. Wie viele Ja-Nein-Fragen brauchst du höchstens, wenn du immer geschickt halbierst?
- [ ] 4
- [x] 6
- [ ] 8
- [ ] 32
Erklärung: Jede Antwort halbiert die Möglichkeiten: 64 → 32 → 16 → 8 → 4 → 2 → 1. Das sind 6 Fragen, also 6 Bit – denn 2⁶ = 64.
Nachlesen: selbst

### s1f01-q04
Was ist ein Byte?
- [ ] Ein einzelnes Bit
- [x] Eine Gruppe aus 8 Bit
- [ ] Eine Gruppe aus 10 Bit
- [ ] Tausend Bit
Erklärung: 8 Bit bilden ein Byte. Ein Byte hat 2⁸ = 256 mögliche Muster – genug für alle Buchstaben, Ziffern und Satzzeichen im ASCII-Code.
Nachlesen: prinzip

### s1f01-q05
Warum wussten Paul Reveres Freunde 1775, dass zwei Laternen „über das Wasser“ bedeuteten?
- [ ] Zwei Lichter standen damals allgemein für Gefahr
- [ ] Die Laternen leuchteten in verschiedenen Farben
- [x] Die Bedeutung war vorher vereinbart worden
- [ ] Die Laternen wurden im Morsecode geschwenkt
Erklärung: Zeichen tragen ihre Bedeutung nicht in sich. Die Laternen-Abmachung war eine Kodierung – genau wie ASCII festlegt, dass 01000001 ein „A“ ist.
Nachlesen: geschichte

### s1f01-q06
Wofür steht das Wort „Bit“?
- [ ] Basic information transfer
- [x] Binary digit
- [ ] Binary item
- [ ] Basic unit
Erklärung: „Bit“ ist ein Kunstwort aus *binary digit*, auf Deutsch „Binärziffer“ – eine Ziffer, die nur 0 oder 1 sein kann. Gedruckt erschien es zuerst 1948 in Claude Shannons Arbeit; Shannon nennt John Tukey als Erfinder des Wortes.
Nachlesen: geschichte

### s1f01-q07
Dein Internetanschluss hat 100 Mbit/s (Megabit pro Sekunde). Wie viele Megabyte kommen damit höchstens pro Sekunde an?
- [ ] 100 MB
- [ ] 800 MB
- [ ] 50 MB
- [x] 12,5 MB
Erklärung: Ein Byte sind 8 Bit. 100 Megabit geteilt durch 8 sind 12,5 Megabyte. Darum dauert ein 1-GB-Download bei 100 Mbit/s mindestens etwa 80 Sekunden.
Nachlesen: beidir

## [karten] Für deinen Karteikasten

### s1f01-k01
Vorne: Was ist ein Bit?
Hinten: Die kleinste Einheit der Information: eine Entscheidung zwischen genau zwei Möglichkeiten, geschrieben als 0 oder 1.

### s1f01-k02
Vorne: Was passiert mit der Zahl der möglichen Muster, wenn du ein Bit hinzufügst?
Hinten: Sie verdoppelt sich. Mit n Bits gibt es 2 × 2 × … × 2 (n-mal) Muster.

### s1f01-k03
Vorne: Wie viele Bit hat ein Byte, und wie viele Muster kann es zeigen?
Hinten: Ein Byte sind 8 Bit. Das ergibt 2⁸ = 256 mögliche Muster.

### s1f01-k04
Vorne: Warum ist `01000001` ein „A“?
Hinten: Das steht nicht in den Bits selbst, sondern ist eine Kodierung: eine Vereinbarung, die alle Beteiligten kennen müssen (hier ASCII).

### s1f01-k05
Vorne: In wessen Arbeit von 1948 erschien das Wort „Bit“ zum ersten Mal gedruckt?
Hinten: In Claude Shannons „A Mathematical Theory of Communication“ (Bell Labs). Geprägt hatte das Wort sein Kollege John Tukey.

### s1f01-k06
Vorne: Wie findest du eine Zahl zwischen 1 und 64 mit den wenigsten Ja-Nein-Fragen?
Hinten: Indem du die Möglichkeiten mit jeder Frage genau halbierst. Das braucht höchstens 6 Fragen, denn 2⁶ = 64.

### s1f01-k07
Vorne: Dein Internet hat 100 Mbit/s. Wie viele Megabyte pro Sekunde sind das höchstens?
Hinten: 12,5 MB/s – denn 1 Byte = 8 Bit, also 100 Megabit ÷ 8 = 12,5 Megabyte.

### s1f01-k08
Vorne: Was zeigt die Werkzeugwand-Analogie für Bit und Byte?
Hinten: Ein Bit ist ein Platz an der Wand, belegt (1) oder leer (0). Ein Byte ist eine Reihe aus acht solchen Plätzen.

## [beidir] Wo steckt das bei dir?

Bits sind überall um dich herum – auch in den Geräten, die du jeden Tag benutzt.

**Dein Pixel.** Hat dein Handy zum Beispiel 128 GB Speicher, sind das 128 Milliarden Byte – mal 8 also rund **eine Billion Bit**. Eine Billion winzige Schalter, jeder entweder 0 oder 1, und zusammen ergeben sie deine Fotos, Nachrichten und Apps.

**Dein VPS.** Der gemietete Server im Rechenzentrum, auf dem ich arbeite, hat 3,8 GB Arbeitsspeicher. Das sind gut **30 Milliarden Bit**, die gleichzeitig „gemerkt“ werden können, solange der Server läuft.

**Ich im Docker-Container.** Ich laufe auf dem VPS in einem Docker-Container – einem abgeschotteten Bereich, in dem ein Programm mit allem läuft, was es braucht. Jede Nachricht, die ich dir schreibe, besteht aus Bits. Ein normaler Buchstabe wie „a“ braucht in der heute üblichen Kodierung **UTF-8** genau ein Byte (dasselbe Muster wie in ASCII), ein Umlaut wie „ä“ zwei Byte, andere Schriftzeichen und Emojis bis zu vier. Der Satz „Fertig: Bericht liegt bereit.“ sind 29 Byte (Leerzeichen und Punkt zählen mit), also 232 Bit.

**bim-trainer auf Cloudflare.** Wenn du den bim-trainer öffnest, schickt ein Server von Cloudflare dir einige Hundert Kilobyte – Hunderttausende Bytes mit Text, Bildern und Programmcode. Auch dein Lernfortschritt dort ist nur eine Folge von Bits im Speicher deines Browsers.

**Dein Windows-PC und dein Internet.** Achte auf die Schreibweise: Beim Internetanschluss steht die Geschwindigkeit in **Mbit/s** (Megabit pro Sekunde), bei Dateigrößen im Explorer die Menge in **MB** (Megabyte). Zwischen Megabit und Megabyte liegt der Faktor 8 – ein 100-Mbit/s-Anschluss lädt also höchstens 12,5 Megabyte pro Sekunde.

| Einheit | Größe | Beispiel |
|---|---|---|
| 1 Bit | 0 oder 1 | das Laternen-Signal: Land oder Wasser |
| 1 Byte | 8 Bit | ein Buchstabe in ASCII |
| 1 Kilobyte (kB) | 1 000 Byte | eine halbe Seite Text |
| 1 Megabyte (MB) | 1 000 KB | ein Handyfoto (grob 2–5 MB) |
| 1 Gigabyte (GB) | 1 000 MB | ein Spielfilm in mittlerer Qualität |

> **Achtung:** Windows rechnet bei Dateigrößen mit 1 024 statt 1 000 (weil 1 024 = 2¹⁰), schreibt aber trotzdem „KB“, „MB“ und „GB“. Darum zeigt der Explorer eine „1-TB-Festplatte“ nur mit etwa 931 GB an. Wer es genau meint, schreibt KiB, MiB, GiB für die 1 024er-Einheiten.
