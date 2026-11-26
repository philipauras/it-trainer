---
id: s1f03
status: freigegeben
faktencheck: 26.11.2026 – Durchgang 1 nicht bestanden (1 Fehler behoben), Durchgang 2 bestanden; unabhängige Prüfung, Berichte in docs/faktencheck/
dauer: 18
quellen:
- George Boole: The Mathematical Analysis of Logic. Cambridge 1847
- George Boole: An Investigation of the Laws of Thought. London 1854 (Project Gutenberg) | https://www.gutenberg.org/ebooks/15114
- Claude E. Shannon: A Symbolic Analysis of Relay and Switching Circuits. Masterarbeit, MIT (geschrieben 1937, Abschluss 1940; MIT DSpace) | https://dspace.mit.edu/handle/1721.1/11173
- Claude E. Shannon: A Symbolic Analysis of Relay and Switching Circuits. Transactions of the American Institute of Electrical Engineers 57 (1938), S. 713–723
- Ken Shirriff: A computer built from NOR gates – inside the Apollo Guidance Computer (2019) | https://www.righto.com/2019/09/a-computer-built-from-nor-gates-inside.html
- Eldon C. Hall: Journey to the Moon. The History of the Apollo Guidance Computer. AIAA, 1996
- Howard Gardner: The Mind's New Science. A History of the Cognitive Revolution. Basic Books, 1985
- Charles Petzold: Code. The Hidden Language of Computer Hardware and Software. Microsoft Press, 2. Auflage 2022 (deutsch: Code – Wie Computer funktionieren, mitp)
- James Gleick: Die Information. Geschichte, Theorie, Flut. Redline, 2011
---

## [einstieg] Wie trifft ein Haufen Schalter eine Entscheidung?

Dein Handy entscheidet ständig: Soll der Bildschirm angehen? Ist das Passwort richtig? Ist die Zahl größer als die andere? Dabei kann es nur eines: Transistoren an- und ausschalten.

In Folge 2 hast du gesehen, dass zwei Transistoren schon etwas Erstaunliches können. Hintereinander geschaltet leuchtet die Lampe „nur, wenn beide“ an sind, nebeneinander „wenn mindestens einer“ an ist. Das sind keine Zufälle. Es sind die Grundwörter der Logik – **UND**, **ODER**, **NICHT** –, gebaut aus Strom.

In dieser Folge lernst du diese Bausteine kennen. Sie heißen **Logikgatter**, und aus ihnen ist jeder Prozessor der Welt zusammengesetzt. Und du erfährst, wie ein englischer Lehrer und ein junger Student aus Michigan sie gefunden haben, gut achtzig Jahre auseinander.

## [geschichte] Ein Lehrer rechnet mit Gedanken

### George Boole: Logik als Rechnung

**George Boole** wird 1815 im englischen Lincoln geboren, als Sohn eines Schuhmachers. Eine Universität kann die Familie nicht bezahlen. Boole bringt sich Mathematik und mehrere Sprachen selbst bei und eröffnet schon als junger Mann eine eigene Schule. Nebenbei schreibt er mathematische Aufsätze, die so gut sind, dass er 1849 Mathematikprofessor am Queen's College im irischen Cork wird – ohne je selbst studiert zu haben.

Boole hat eine kühne Idee: Man kann mit Gedanken *rechnen* wie mit Zahlen. Eine Aussage ist entweder wahr oder falsch – schreib dafür **1** und **0**. Dann wird aus „und“ eine Multiplikation: „Es regnet *und* es ist kalt“ ist nur wahr, wenn beides wahr ist – und tatsächlich ergibt 1 × 1 = 1, aber 1 × 0, 0 × 1 und 0 × 0 ergeben 0.

**1847** veröffentlicht er „The Mathematical Analysis of Logic“, **1854** sein Hauptwerk „An Investigation of the Laws of Thought“ („Eine Untersuchung der Gesetze des Denkens“). Man nennt diese Rechenart heute **boolesche Algebra**. Zu Booles Lebzeiten gilt sie als schöne, aber recht abgehobene Mathematik. Mit Maschinen hat sie nichts zu tun.

### Claude Shannon: Logik aus Relais

Gut achtzig Jahre später sitzt ein junger Mann am Massachusetts Institute of Technology (MIT) vor einer riesigen Rechenmaschine: dem „Differential Analyzer“ von Vannevar Bush. Die riesige Maschine rechnet mit Wellen und Zahnrädern, gesteuert wird sie aber von einer verwickelten Schaltung aus Relais – genau den klickenden Schaltern aus Folge 2. Der junge Mann heißt **Claude Shannon** – derselbe Shannon, der elf Jahre später bei den Bell Labs das Bit bekannt macht (Folge 1).

Shannon hatte an der Universität von Michigan nicht nur Elektrotechnik, sondern auch Mathematik studiert und dort Booles Logik kennengelernt. Jetzt fällt ihm auf: Relais, die hintereinander geschaltet sind, verhalten sich genau wie Booles „und“. Relais nebeneinander verhalten sich wie „oder“. Die Logik von Boole passt eins zu eins auf Schaltkreise.

**1937** schreibt er darüber seine Masterarbeit, **1938** erscheint sie gedruckt: „A Symbolic Analysis of Relay and Switching Circuits“ („Eine symbolische Untersuchung von Relais- und Schaltkreisen“). Damit können Ingenieure Schaltungen systematisch *berechnen* statt nur ausprobieren – und umgekehrt jede logische Aufgabe in eine Schaltung übersetzen. Etwa zur selben Zeit kam auch der Japaner Akira Nakashima auf ähnliche Ideen, aber Shannons Arbeit wurde weltweit bekannt. Der Psychologe Howard Gardner nannte sie später „vielleicht die wichtigste Masterarbeit des Jahrhunderts“.

> **Wusstest du?:** Booles Logik und Shannons Schaltkreise brauchen genau die zwei Werte, die du aus Folge 1 kennst: 0 und 1. Darum passt das Bit so perfekt zu Strom und Schaltern – wahr oder falsch, an oder aus.

## [prinzip] Drei Grundwörter und ihre Verwandten

Ein **Logikgatter** (kurz **Gatter**) ist eine kleine Schaltung mit einem oder mehreren Eingängen und einem Ausgang. Eingänge und Ausgang sind Bits: 0 oder 1. Was das Gatter tut, beschreibt eine **Wahrheitstabelle** – sie listet für jede Kombination der Eingänge den Ausgang auf. Bei zwei Eingängen sind das vier Zeilen: 00, 01, 10, 11.

### UND und ODER

- **UND**: Der Ausgang ist 1, **nur wenn alle Eingänge 1 sind**.
- **ODER**: Der Ausgang ist 1, **wenn mindestens ein Eingang 1 ist** – auch wenn beide 1 sind.

Probier es aus: Tippe auf die Schalter **A** und **B**. Die Leitungen mit einer 1 leuchten, und die beiden Lampen rechts zeigen die Ausgänge von UND und ODER.

:::sim schaltung
eingaenge: A, B
gatter: U=UND(A,B); O=ODER(A,B)
ausgaenge: U, O
namen: U=UND; O=ODER
:::

| A | B | A UND B | A ODER B |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 |

Kommt dir bekannt vor? Genau diese Tabellen hast du in Folge 2 mit Transistoren ausgefüllt: **hintereinander = UND, nebeneinander = ODER.**

> **Achtung:** Im Alltag meint „oder“ oft „entweder – oder“ („Kaffee oder Tee?“). Das ODER der Logik ist großzügiger: Beide gleichzeitig zählt auch.

### NICHT

**NICHT** hat nur einen Eingang und dreht ihn um: aus 0 wird 1, aus 1 wird 0. Das ist der Transistor mit der Abkürzung an der Lampe vorbei aus Folge 2.

:::sim schaltung
eingaenge: A
gatter: N=NICHT(A)
namen: N=NICHT A
:::

| A | NICHT A |
|---|---|
| 0 | 1 |
| 1 | 0 |

### Die Verwandten: XODER, NUND, NODER

Aus den drei Grundwörtern entstehen weitere nützliche Gatter:

- **XODER** (exklusives ODER, englisch XOR): 1, wenn **genau einer** der Eingänge 1 ist – also „entweder – oder“, wie bei „Kaffee oder Tee?“. Man kann auch sagen: 1, wenn die Eingänge *verschieden* sind.
- **NUND** (NICHT-UND, englisch NAND): das Gegenteil von UND. 0 nur, wenn beide Eingänge 1 sind.
- **NODER** (NICHT-ODER, englisch NOR): das Gegenteil von ODER. 1 nur, wenn beide Eingänge 0 sind.

:::sim schaltung
eingaenge: A, B
gatter: X=XODER(A,B); N=NUND(A,B); R=NODER(A,B)
ausgaenge: X, N, R
namen: X=XODER; N=NUND; R=NODER
:::

| A | B | XODER | NUND | NODER |
|---|---|---|---|---|
| 0 | 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 | 0 |
| 1 | 1 | 0 | 0 | 0 |

In englischen Büchern und Schaltplänen heißen die Gatter AND, OR, NOT, XOR, NAND und NOR – gemeint ist dasselbe.

### Ein Gatter für alles: NUND

Jetzt kommt etwas Verblüffendes: Mit **NUND allein** kannst du jedes andere Gatter bauen.

- **NICHT aus NUND:** Gib beiden Eingängen dasselbe Signal. NUND(A, A) ist 0, wenn A = 1 ist, und 1, wenn A = 0 ist – also NICHT A.
- **UND aus NUND:** Ein NUND und dahinter ein NICHT (das ja selbst ein NUND ist) heben sich zum UND auf.
- **ODER aus NUND:** Kehre erst beide Eingänge um und gib sie dann in ein NUND. Probier es aus – drei NUND-Gatter, und heraus kommt ODER:

:::sim schaltung
eingaenge: A, B
gatter: NA=NUND(A,A); NB=NUND(B,B); Q=NUND(NA,NB)
namen: Q=Ergebnis
:::

Warum funktioniert das? Der Ausgang ist nur dann 0, wenn NA und NB beide 1 sind – also wenn A und B beide 0 sind. In jedem anderen Fall ist er 1. Das ist genau die ODER-Tabelle.

In echten Chips ist NUND sogar günstiger als UND: Mit der heute üblichen Bauweise braucht ein NUND vier Transistoren, ein UND sechs – ein UND ist dort nämlich ein NUND mit einem NICHT dahinter. Dasselbe Kunststück geht übrigens auch mit NODER allein.

> **Wusstest du?:** Der Bordcomputer der Apollo-Mondflüge kam fast mit einem einzigen Gattertyp aus: Seine Rechenlogik bestand aus rund 2 800 Chips, die meisten mit je zwei NODER-Gattern. Ein einziger, einfacher Chiptyp war früher in großer Zahl lieferbar und ließ sich gründlicher prüfen – wichtig für einen Rechner, der auf dem Weg zum Mond nicht ausfallen durfte.

> **Merke:** UND = alle Eingänge 1 · ODER = mindestens einer 1 · NICHT = umdrehen · XODER = genau einer 1 · NUND und NODER = das Gegenteil von UND und ODER. Aus NUND allein lässt sich jedes Gatter bauen.

## [werkstatt] Logik im Alltag

Logikgatter sind keine Erfindung der Computerwelt – du benutzt sie jeden Tag, ohne es zu merken. Vier kleine Schaltungen aus dem Alltag, jede für ein Gatter.

### UND: das Bankschließfach

Ein klassisches Bankschließfach hat zwei Schlösser. Einen Schlüssel hast du, den anderen hat die Bank. Das Fach geht **nur auf, wenn beide Schlüssel stecken und gedreht sind**. Dein Schlüssel allein: zu. Der Bankschlüssel allein: zu. Beide: auf. Das ist die UND-Tabelle.

### ODER: die Klingel mit zwei Tastern

In vielen Mehrfamilienhäusern läutet dieselbe Wohnungsklingel über zwei Taster: einen unten an der Haustür und einen oben an der Wohnungstür. Die Klingel läutet, **solange an irgendeinem der beiden gedrückt wird** – und natürlich auch, wenn zwei Leute gleichzeitig drücken. Lässt man los, ist sie still. Elektrisch liegen die Taster nebeneinander (parallel): genau das ODER aus Folge 2.

### NICHT: das Kühlschranklicht

Im Kühlschrank sitzt ein kleiner Taster an der Tür. Ist die Tür zu, drückt sie den Taster hinein – und das Licht ist **aus**. Öffnest du die Tür, springt der Taster heraus, und das Licht geht **an**. Der Eingang „Tür drückt den Taster“ wird umgedreht: Das ist NICHT.

### XODER: die Wechselschaltung im Flur

In einem langen Flur hängt an jedem Ende ein Lichtschalter, beide steuern dieselbe Lampe. Das Besondere: **Jedes Umlegen eines Schalters ändert den Zustand der Lampe** – egal, wie der andere steht. Ist die Anlage so verdrahtet, dass das Licht aus ist, wenn beide Schalter unten sind, dann gilt: Licht an, wenn **genau einer** oben ist. Beide oben: wieder aus. Das ist XODER. (Bei anderer Verdrahtung ist es genau umgekehrt – dann verhält sich die Lampe wie das Gegenteil von XODER. Das Umschalt-Verhalten ist dasselbe.)

Das Bild erlaubt richtige Vorhersagen: Ein Schließfach mit drei Schlössern geht nur auf, wenn alle drei Schlüssel stecken – ein UND mit drei Eingängen. Hätte die Klingel fünf Taster, reichte ein einziger gedrückter – ein ODER mit fünf Eingängen.

> **Im Bild:** Bankschließfach mit zwei Schlüsseln = UND · Klingel mit zwei Tastern (Haustür und Wohnungstür) = ODER · Kühlschranktaster, den die geschlossene Tür drückt = NICHT · Wechselschaltung mit zwei Schaltern im Flur = XODER.

> **Achtung:** Im Alltag legt immer ein Mensch die Schalter um, und am Ende steht eine Lampe, eine Klingel oder eine Tür. Im Computer ist der Ausgang eines Gatters selbst wieder der Eingang des nächsten – Tausende Gatter schalten sich gegenseitig, ganz ohne Hand. Erst diese Verkettung macht aus einzelnen Entscheidungen eine Rechnung.

## [selbst] Bau deine eigene Logik

Jetzt kommen vier Übungen. Bei den Wahrheitstabellen gehst du vor wie in Folge 2: Tippe links auf eine Zeile, die Schalter springen auf diese Kombination, und dann trage den Ausgang ein (? → 0 → 1). Bei den Gatter-Übungen tippst du auf den Knopf mit dem Fragezeichen, um das Gatter zu wechseln, bis alle Zeilen der Ziel-Tabelle ein ✓ haben.

### Übung 1: die Wechselschaltung

Zwei Schalter im Flur, „unten“ (am Treppenabsatz) und „oben“ (am anderen Ende), steuern das Licht. Die Schaltung ist ein XODER. Fülle die Tabelle aus – zuerst im Kopf, dann prüfe mit den Schaltern.

:::sim schaltung
id: s1f03-u01
eingaenge: A, B
gatter: L=XODER(A,B)
namen: A=unten; B=oben; L=Licht
tabelle: ja
:::

### Übung 2: Welches Gatter ist das?

Die Ziel-Tabelle zeigt, was die Lampe tun soll: **0, 1, 1, 1** – aus nur bei 00. Wähle das passende Gatter.

:::sim schaltung
id: s1f03-u02
eingaenge: A, B
gatter: Y=?(A,B)
auswahl: UND, ODER, XODER, NUND, NODER
ziel: Y=0111
:::

### Übung 3: die Alarmanlage

Eine Alarmanlage soll losgehen, wenn sie **scharf** geschaltet ist **und** das **Fenster oder die Tür** offen ist. Ist sie nicht scharf, darfst du lüften, so viel du willst. Wähle für beide Gatter den richtigen Typ. Die Tabelle hat diesmal acht Zeilen, weil drei Schalter 2 × 2 × 2 = 8 Kombinationen haben (wie in Folge 1).

:::sim schaltung
id: s1f03-u03
eingaenge: S, F, T
gatter: Offen=?(F,T); Alarm=?(S,Offen)
namen: S=scharf; F=Fenster; T=Tür
ziel: Alarm=00000111
:::

### Übung 4: UND aus NUND

Das erste Gatter ist ein NUND. Welches Gatter musst du dahinter setzen, damit am Ende ein **UND** herauskommt (Ziel: 0, 0, 0, 1)? Beide Eingänge des zweiten Gatters bekommen dasselbe Signal.

:::sim schaltung
id: s1f03-u04
eingaenge: A, B
gatter: N=NUND(A,B); Y=?(N,N)
auswahl: UND, ODER, NUND
ziel: Y=0001
:::

### Auflösung

- **Übung 1:** Licht = 0, 1, 1, 0. Genau ein Schalter oben – Licht an; beide gleich – Licht aus.
- **Übung 2:** **ODER**. Es ist 1, sobald mindestens ein Eingang 1 ist. (UND wäre 0001, XODER 0110, NUND 1110, NODER 1000.)
- **Übung 3:** **Offen = ODER** (Fenster oder Tür, auch beide) und **Alarm = UND** (scharf und offen). Mit XODER statt ODER bliebe die Anlage stumm, wenn Fenster *und* Tür offen sind – ein gefährlicher Fehler. Mit ODER statt UND ginge der Alarm schon los, sobald die Anlage scharf ist – und auch beim Lüften, wenn sie aus ist.
- **Übung 4:** **NUND**. Beide Eingänge bekommen dasselbe Signal – so wird das NUND zum NICHT, und NICHT(NUND) ist UND.

In Übung 3 hast du gerade eine echte Entscheidungsregel in Hardware gegossen. Genau so entstehen alle Schaltungen in einem Prozessor: Man schreibt die Regel als Wahrheitstabelle auf und setzt Gatter zusammen, bis sie stimmt. In Folge 4 baust du so eine Schaltung, die **rechnen** kann – aus genau einem XODER und einem UND.

## [quiz] Teste dich

### s1f03-q01
Wann ist der Ausgang eines UND-Gatters mit zwei Eingängen 1?
- [ ] Wenn mindestens ein Eingang 1 ist
- [x] Nur wenn beide Eingänge 1 sind
- [ ] Wenn genau ein Eingang 1 ist
- [ ] Wenn beide Eingänge 0 sind
Erklärung: UND verlangt, dass alle Eingänge 1 sind. In jeder anderen Zeile der Wahrheitstabelle ist der Ausgang 0 – wie beim Schließfach, das nur mit beiden Schlüsseln aufgeht.
Nachlesen: prinzip

### s1f03-q02
Ein Gatter hat die Ausgaben 0, 1, 1, 0 für die Eingänge 00, 01, 10, 11. Welches ist es?
- [ ] ODER
- [ ] NUND
- [x] XODER
- [ ] NODER
Erklärung: Der Ausgang ist 1, wenn genau ein Eingang 1 ist, also wenn die Eingänge verschieden sind. Das ist das exklusive ODER. ODER wäre 0111, NUND 1110, NODER 1000.
Nachlesen: prinzip

### s1f03-q03
Was wollte Claude Shannon mit seiner Masterarbeit von 1937 zeigen?
- [ ] Dass Röhren schneller schalten als Relais
- [ ] Dass ein Bit die kleinste Einheit der Information ist
- [x] Dass sich Relaisschaltungen mit Booles Logik berechnen lassen
- [ ] Dass Computer im Zehnersystem rechnen sollten
Erklärung: Shannon erkannte, dass Relais hintereinander wie „und“ und nebeneinander wie „oder“ funktionieren. Damit konnte man Schaltungen mit boolescher Algebra planen. Das Bit machte er erst 1948 bekannt (Folge 1).
Nachlesen: geschichte

### s1f03-q04
Warum ist das NUND-Gatter so besonders?
- [ ] Es ist das einzige Gatter mit drei Eingängen
- [x] Aus NUND-Gattern allein lässt sich jedes andere Gatter bauen
- [ ] Es ist das einzige Gatter, das ganz ohne Strom auskommt
- [ ] Es kann als einziges Gatter Zahlen speichern
Erklärung: Gibt man beiden Eingängen dasselbe Signal, wird NUND zum NICHT. Damit lassen sich UND und ODER und alle anderen Gatter zusammensetzen. In echten Chips braucht NUND außerdem weniger Transistoren als UND.
Nachlesen: prinzip

### s1f03-q05
Eine Alarmanlage soll losgehen, wenn sie scharf ist und Fenster oder Tür offen sind. Welche Gatter brauchst du?
- [x] Ein ODER für Fenster und Tür, dahinter ein UND mit „scharf“
- [ ] Ein UND für Fenster und Tür, dahinter ein ODER mit „scharf“
- [ ] Ein XODER für Fenster und Tür, dahinter ein UND mit „scharf“
- [ ] Ein NICHT für „scharf“, dahinter ein ODER mit Fenster und Tür
Erklärung: Fenster oder Tür, auch beide gleichzeitig, ist ein ODER. Das Ergebnis muss zusammen mit „scharf“ zutreffen – das ist ein UND. Ein XODER würde schweigen, wenn Fenster und Tür beide offen sind.
Nachlesen: selbst

### s1f03-q06
Im Kühlschrank drückt die geschlossene Tür einen Taster, und das Licht ist aus. Welches Gatter steckt darin?
- [ ] UND
- [ ] ODER
- [x] NICHT
- [ ] XODER
Erklärung: Der Eingang „Taster gedrückt“ wird umgedreht: gedrückt (1) ergibt Licht aus (0), losgelassen (0) ergibt Licht an (1). Das ist NICHT.
Nachlesen: werkstatt

### s1f03-q07
Welches Werk veröffentlichte George Boole 1854?
- [ ] A Mathematical Theory of Communication
- [x] An Investigation of the Laws of Thought
- [ ] A Symbolic Analysis of Relay and Switching Circuits
- [ ] Explication de l'Arithmétique Binaire
Erklärung: In „An Investigation of the Laws of Thought“ beschrieb Boole, wie man mit wahren und falschen Aussagen rechnen kann. Die anderen Titel stammen von Shannon (1948 und 1938) und Leibniz (1703).
Nachlesen: geschichte

## [karten] Für deinen Karteikasten

### s1f03-k01
Vorne: Was ist ein Logikgatter?
Hinten: Eine kleine Schaltung mit einem oder mehreren Eingängen und einem Ausgang, alle sind Bits. Eine Wahrheitstabelle beschreibt, was sie tut.

### s1f03-k02
Vorne: Wann ist der Ausgang eines UND-Gatters 1?
Hinten: Nur wenn alle Eingänge 1 sind. In der Transistor-Schaltung entspricht das zwei Schaltern hintereinander.

### s1f03-k03
Vorne: Wann ist der Ausgang eines ODER-Gatters 1?
Hinten: Wenn mindestens ein Eingang 1 ist, auch wenn beide 1 sind. Das entspricht zwei Schaltern nebeneinander.

### s1f03-k04
Vorne: Was macht das NICHT-Gatter?
Hinten: Es hat einen Eingang und dreht ihn um: aus 0 wird 1, aus 1 wird 0.

### s1f03-k05
Vorne: Was unterscheidet XODER vom normalen ODER?
Hinten: XODER ist nur 1, wenn genau ein Eingang 1 ist. Sind beide 1, ist der Ausgang 0.

### s1f03-k06
Vorne: Was ist an NUND-Gattern besonders?
Hinten: Aus NUND allein lässt sich jedes andere Gatter bauen (NUND = Gegenteil von UND).

### s1f03-k07
Vorne: Wer entwickelte 1847 und 1854 die Logik, mit der man wie mit Zahlen rechnet (boolesche Algebra)?
Hinten: George Boole, ein englischer Lehrer und später Professor in Cork. Wahr und falsch schrieb er als 1 und 0.

### s1f03-k08
Vorne: Was zeigte Claude Shannon in seiner Masterarbeit von 1937/1938?
Hinten: Dass Booles Logik genau auf Relais-Schaltkreise passt: Relais hintereinander sind UND, nebeneinander ODER.

## [beidir] Wo steckt das bei dir?

**In jedem Prozessor.** Der Prozessor in deinem Pixel, in deinem Windows-PC und im Server deines VPS besteht im Kern aus Gattern – Hunderte Millionen bis Milliarden davon, jedes aus einer Handvoll Transistoren. Wenn dein PC zwei Zahlen addiert, laufen die Bits durch XODER- und UND-Gatter, genau wie du es in Folge 4 sehen wirst.

**In Programmen.** Dieselben drei Wörter tauchen in Software wieder auf. In der Programmiersprache Python, die du in Staffel 3 kennenlernst, heißen sie wörtlich `and`, `or` und `not`. Eine Bedingung wie „zeige die Warnung, wenn der Akku unter 20 Prozent ist **und** das Handy nicht am Ladegerät hängt“ ist ein UND mit einem NICHT – nur eben als Text geschrieben statt als Schaltung.

**Auf deinem VPS.** Auch Regeln für Server sind oft boolesche Logik. Ein Beispiel, wie so eine Regel aussehen könnte: „Lass eine Verbindung herein, wenn sie zur Webseite will **oder** von einem bekannten Absender kommt.“ Ich im Docker-Container prüfe ständig solche Bedingungen, etwa: Darf ich etwas live stellen? Nur wenn die Vorschau-Prüfung bestanden ist **und** der Stand derselbe ist wie in der Vorschau.

**Beim Suchen.** Viele Suchfelder verstehen solche Verknüpfungen. In Gmail etwa findest du mit `from:bank OR from:versicherung` die Mails beider Absender.

> **Wusstest du?:** Wenn du im Kopf sagst „Ich gehe raus, wenn es nicht regnet und ich Zeit habe“, hast du eine boolesche Formel aufgestellt: NICHT Regen UND Zeit. George Boole hätte seine Freude gehabt.
