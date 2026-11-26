---
id: s1f08
status: freigegeben
faktencheck: 26.11.2026 – Durchgang 1 nicht bestanden (1 Fehler behoben), Durchgang 2 bestanden; unabhängige Prüfung, Berichte in docs/faktencheck/; Umstellung auf eigenständige Folge + Lernpool (1.5.0): unabhängig geprüft und bestanden
dauer: 18
quellen:
- Andrew S. Tanenbaum, Herbert Bos: Moderne Betriebssysteme. 4. Auflage, Pearson, 2016 (Standardwerk: Prozesse, Scheduling, Speicherverwaltung, Geschichte)
- Robert L. Patrick: General Motors/North American Monitor for the IBM 704 Computer. RAND Corporation (Erinnerungen eines Beteiligten)
- Fernando J. Corbató, Marjorie Merwin-Daggett, Robert C. Daley: An Experimental Time-Sharing System. Proceedings of the AFIPS Spring Joint Computer Conference, Mai 1962
- Tom Van Vleck: The IBM 7094 and CTSS | https://www.multicians.org/thvv/7094.html
- Dennis M. Ritchie: The Evolution of the Unix Time-sharing System (1979/1984) | https://www.nokia.com/bell-labs/about/dennis-m-ritchie/hist.html
- Dennis M. Ritchie, Ken Thompson: The UNIX Time-Sharing System. Communications of the ACM 17 (1974) | https://dl.acm.org/doi/10.1145/361011.361061
- Linus Torvalds: Ankündigung in comp.os.minix, 25. August 1991 | https://groups.google.com/g/comp.os.minix/c/dlNtH7RRrGA/m/SwRavCzVE7gJ
- Android Open Source Project: Kernel overview | https://source.android.com/docs/core/architecture/kernel
- Android Open Source Project: Application Sandbox | https://source.android.com/docs/security/app-sandbox
- Brian Kernighan: UNIX. A History and a Memoir. Kindle Direct Publishing, 2019
- Microsoft Learn: Benutzermodus und Kernelmodus | https://learn.microsoft.com/de-de/windows-hardware/drivers/gettingstarted/user-mode-and-kernel-mode
- Linux-Handbuchseite namespaces(7) | https://man7.org/linux/man-pages/man7/namespaces.7.html
- Docker Docs: What is a container? (Container teilen sich den Kernel des Rechners) | https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/
---

## [einstieg] Wie kann ein Prozessor drei Dinge gleichzeitig tun, wenn er nur eins kann?

Auf deinem Handy läuft Musik. Gleichzeitig scrollst du durch eine Webseite, und im Hintergrund lädt eine App ein Update herunter. Alles läuft, nichts ruckelt.

Dabei gilt: Ein Prozessorkern arbeitet **einen Befehl nach dem anderen** ab – holen, entschlüsseln, ausführen (mehr dazu in Folge 6). Er kann nicht gleichzeitig Musik abspielen und eine Webseite aufbauen. Wie also geht das?

Die Antwort ist ein Programm, das du fast nie bewusst siehst, obwohl es ständig arbeitet: das **Betriebssystem**. Es verteilt die Zeit des Prozessors, teilt den Speicher auf, spricht mit allen Geräten und bewacht deine Dateien. In dieser Folge schaust du ihm bei der Arbeit zu – und entdeckst einen Trick, der so schnell ist, dass er wie Gleichzeitigkeit aussieht.

## [geschichte] Vom Stapel Lochkarten zum Pinguin

**Anfang der 1950er-Jahre** war ein Computer ein Raum voller Schränke, und eine Stunde Rechenzeit kostete ein kleines Vermögen. Trotzdem stand die teure Maschine oft still. Wer rechnen wollte, brachte einen Stapel Lochkarten mit seinem Programm. Ein Bediener legte ihn ein, wartete auf das Ende, nahm das Ergebnis heraus, legte den nächsten Stapel ein – und in jeder dieser Pausen tat der Computer: nichts.

**1956** schrieben Programmierer von **General Motors** und **North American Aviation** für ihren Großrechner IBM 704 ein Hilfsprogramm, das diese Pausen abschaffte: **GM-NAA I/O**. Es arbeitete die Aufträge eines Stapels automatisch nacheinander ab und kümmerte sich um Ein- und Ausgabe. Diese **Stapelverarbeitung** gilt als eines der ersten Betriebssysteme überhaupt. Der Rechner war nun gut ausgelastet – aber wer einen Auftrag abgab, bekam das Ergebnis oft erst Stunden später. Ein Tippfehler im Programm, und der halbe Tag war weg.

Am **Massachusetts Institute of Technology (MIT)** fand eine Gruppe um **Fernando Corbató** das unerträglich. Ihre Idee: Viele Menschen sitzen gleichzeitig an eigenen Terminals, und der Computer wechselt so schnell zwischen ihnen hin und her, dass jeder glaubt, er habe die Maschine für sich allein. Im **November 1961** führten sie dieses **Time-Sharing** (übersetzt etwa „Zeit teilen“) zum ersten Mal vor – mit dem System **CTSS** auf einem IBM-Großrechner. Corbató erhielt dafür später den Turing Award, die höchste Auszeichnung der Informatik.

Danach wurde es ehrgeizig. MIT, General Electric und die **Bell Labs** – ein großes Forschungslabor in den USA – entwickelten ab Mitte der 1960er-Jahre **Multics**, ein Betriebssystem, das alles können sollte. Es wurde groß und kompliziert, und **1969** stiegen die Bell Labs aus dem Projekt aus.

Zwei ihrer Forscher, **Ken Thompson** und **Dennis Ritchie**, wollten trotzdem ein gutes System zum Arbeiten haben. Noch 1969 schrieb Thompson auf einem kaum genutzten Kleinrechner (einer PDP-7) die Grundlage eines viel einfacheren Systems: **Unix**. Seine Idee war Schlichtheit – kleine Werkzeuge, die je eine Sache gut können und sich kombinieren lassen. 1973 schrieben die beiden Unix in der Programmiersprache **C** neu, die Ritchie dafür entwickelt hatte. Damit ließ es sich auf andere Computer übertragen – ein Grund, warum seine Ideen bis heute überall stecken.

> **Wusstest du?:** Der Name ist ein Wortspiel auf Multics: Den Namen schlug 1970 ihr Kollege Brian Kernighan vor – zuerst wohl als „Unics“: „uni“ (eins) statt „multi“ (viele). Daraus wurde Unix. Thompson und Ritchie erhielten 1983 gemeinsam den Turing Award.

**25. August 1991, Helsinki.** Der 21-jährige Student **Linus Torvalds** schreibt in einer Internet-Diskussionsgruppe, er arbeite an einem freien Betriebssystem – „nur ein Hobby, wird nicht groß und professionell“. Er irrte sich gründlich. Sein **Linux** ist ein Betriebssystemkern, den jeder kostenlos benutzen und verändern darf, und zusammen mit vielen freien Werkzeugen wurde daraus ein vollständiges System. Heute läuft Linux auf dem Großteil der Server im Internet – und, in angepasster Form, in jedem Android-Handy.

Auch die andere große Familie hat einen gemeinsamen Kern: Seit **Windows XP** (2001) bauen alle Windows-Versionen für Heim-PCs auf dem Kern von **Windows NT** auf, das Microsoft 1993 zuerst für Firmenrechner herausgebracht hatte. Dein Windows 11 ist also, tief innen, ein Nachfahre von NT.

## [prinzip] Der Verwalter im Hintergrund

Ein **Betriebssystem** ist das Programm, das nach dem Einschalten als Erstes startet und dann den ganzen Rechner verwaltet: Es verteilt Prozessor und Speicher an die anderen Programme, spricht mit den Geräten und hält die Dateien in Ordnung. Ohne es müsste jedes Programm selbst wissen, wie man eine bestimmte SSD ausliest oder einen bestimmten Drucker ansteuert – und jedes Programm könnte jedem anderen in die Quere kommen.

### Kernel und Programme

Das Herz des Betriebssystems heißt **Kernel** (deutsch „Kern“; hier sage ich Kernel, damit du ihn nicht mit dem Prozessorkern verwechselst). Der Kernel hat volle Rechte: Er darf jede Speicherzelle lesen und jedes Gerät ansprechen. Alle anderen Programme – Browser, Musik-App, sogar die bunte Oberfläche mit Startmenü und Fenstern – laufen mit eingeschränkten Rechten.

Diesen Unterschied macht der Prozessor selbst: Er kennt mindestens zwei Betriebsarten, den **Kernelmodus** (alles erlaubt) und den **Benutzermodus** (nur das Nötigste erlaubt). Versucht ein Programm im Benutzermodus etwas Verbotenes, unterbricht der Prozessor das Programm und übergibt dem Kernel. (In Wirklichkeit gibt es bei manchen Prozessoren mehr als zwei Stufen, genutzt werden aber meist genau diese zwei.)

> **Merke:** Der Kernel hat alle Rechte und verwaltet die Hardware. Programme haben eingeschränkte Rechte und müssen den Kernel um alles bitten, was über ihren eigenen Bereich hinausgeht.

### Prozesse: Programme, die gerade laufen

Ein Programm ist zunächst nur eine Datei auf der SSD – eine Folge von Befehlen. Startest du es, lädt das Betriebssystem es in den Arbeitsspeicher und macht daraus einen **Prozess**: ein laufendes Programm mit eigenem Speicherbereich und eigenem Zustand. Zum Zustand gehört alles, was der Prozessor gerade „im Kopf“ hat – vor allem die Inhalte seiner Register (winzige Speicherplätze direkt im Prozessor) und der Befehlszähler, der sagt, welcher Befehl als Nächstes dran ist (mehr dazu in Folge 6).

Startest du dasselbe Programm zweimal, entstehen in der Regel zwei Prozesse, die nichts voneinander wissen. (Manche Programme öffnen stattdessen nur ein neues Fenster im schon laufenden Prozess, und Browser verteilen sich umgekehrt sogar auf viele Prozesse.)

### Zeitscheiben: der schnelle Wechsel

Jetzt zum Trick vom Anfang. Auf einem Prozessorkern läuft im Grundsatz **immer nur ein Prozess** (Sonderfall Hyper-Threading: siehe „Wo steckt das bei dir?“). Damit trotzdem alle vorankommen, gibt ein Teil des Kernels, der **Scheduler** („Planer“), jedem Prozess der Reihe nach eine kurze **Zeitscheibe** – typischerweise einige bis einige Dutzend Millisekunden, je nach System (Linux eher wenige, Windows eher einige Dutzend). Dann ist der Nächste dran.

Woher weiß der Kernel, dass die Zeit um ist? Ein eingebauter Zeitgeber meldet sich regelmäßig beim Prozessor – eine **Unterbrechung** (englisch *Interrupt*). Der Prozessor lässt dann das laufende Programm liegen und springt in den Kernel. Der Kernel tut nun Folgendes:

1. Er sichert den Zustand des bisherigen Prozesses (Registerinhalte, Befehlszähler) im Arbeitsspeicher.
2. Der Scheduler wählt, wer als Nächstes drankommt.
3. Der Kernel lädt den gesicherten Zustand dieses Prozesses zurück in die Register.
4. Der Prozessor macht genau dort weiter, wo dieser Prozess beim letzten Mal unterbrochen wurde.

Diesen Wechsel nennt man **Kontextwechsel**. Weil er hunderte Male pro Sekunde passiert, wirkt es für dich, als liefe alles gleichzeitig – so wie ein Film aus Einzelbildern als flüssige Bewegung erscheint.

Aber der Wechsel ist nicht gratis. Während der Kernel Zustände sichert und lädt, kommt keines der Programme voran. Ein Kontextwechsel dauert grob einige Mikrosekunden; dazu kommt, dass der neue Prozess seine Daten oft erst wieder in den Cache holen muss, den kleinen, schnellen Zwischenspeicher des Prozessors (mehr dazu in Folge 7). Probier aus, was die Länge der Zeitscheibe bewirkt:

:::sim scheduler
zeitscheibe: 4
:::

Jedes Kästchen ist ein Zeitschritt. Der Simulator nennt ihn „Takt“ – mit dem Prozessortakt (dem Rhythmus des Prozessors, nur Nanosekunden lang; Folge 6) hat er nichts zu tun. Die drei Farben sind drei Prozesse, die schraffierten Kästchen sind Umschalten. Mach die Zeitscheibe mit **−** ganz kurz: Die Musik kommt sehr oft dran – aber die Hälfte der Zeit geht fürs Umschalten verloren. Mach sie mit **+** lang: Fast keine Zeit geht verloren – aber die Musik muss lange warten, bis sie wieder dran ist.

> **Achtung:** Der Simulator übertreibt bewusst: Bei ihm kostet ein Umschalten so viel wie ein ganzer Arbeitsschritt. Im echten Rechner ist eine Zeitscheibe (Millisekunden) tausend- bis zehntausendmal länger als ein Kontextwechsel (Mikrosekunden). Das Prinzip – kürzere Scheiben, mehr Verlust – bleibt aber dasselbe.

Zwei Dinge macht der echte Scheduler klüger als der Simulator. Erstens wollen die meisten Prozesse gar nicht ständig rechnen: Ein Chat-Programm wartet fast immer auf deine nächste Eingabe. Solche wartenden Prozesse überspringt der Scheduler einfach, bis etwas für sie ankommt. Zweitens kann er Prioritäten vergeben – etwa Musik und alles, was du gerade bedienst, bevorzugen. Und hat ein Rechner mehrere Prozessorkerne, laufen tatsächlich mehrere Prozesse gleichzeitig: einer je Kern.

> **Merke:** Ein Prozessorkern führt im Grundsatz immer nur einen Prozess aus (Hyper-Threading bei PC-Prozessoren: höchstens zwei verschränkt). Der Scheduler wechselt so schnell zwischen den Prozessen, dass es gleichzeitig wirkt. Jeder Wechsel kostet etwas Zeit.

### Speicher: jedem sein eigener Bereich

Würden alle Programme denselben Arbeitsspeicher frei benutzen, könnte ein fehlerhaftes Spiel die Daten deines Browsers überschreiben. Darum gibt das Betriebssystem jedem Prozess einen **eigenen Speicherbereich**. Das Programm sieht nur „seine“ Adressen; ein Baustein im Prozessor übersetzt sie bei jedem Zugriff in echte Adressen im RAM – und schlägt Alarm, wenn ein Programm einen Bereich anfasst, der ihm nicht gehört. Dieser **Speicherschutz** sorgt dafür, dass bei einem Fehler nur das eine Programm abstürzt und nicht der ganze Rechner.

Wird der Arbeitsspeicher knapp, kann das Betriebssystem selten benutzte Teile vorübergehend auf die SSD auslagern. Das funktioniert, ist aber deutlich langsamer, denn die SSD ist um ein Vielfaches langsamer als der Arbeitsspeicher (mehr dazu in Folge 7).

### Geräte und Treiber

Es gibt Tausende verschiedener Drucker, Grafikkarten, Mäuse und SSDs. Damit nicht jedes Programm sie alle kennen muss, gibt es **Treiber**: Programmteile, die zwischen dem Kernel und einem bestimmten Gerät übersetzen. Für Drucker oder Grafikkarten kommen sie oft vom Hersteller, für Standardgeräte wie Maus oder SSD bringt das Betriebssystem sie selbst mit. Der Browser sagt nur „drucke diese Seite“; der Treiber weiß, welche Signale genau dieser Drucker dafür braucht. Viele Geräte melden sich ebenfalls mit einer Unterbrechung, wenn etwas passiert – zum Beispiel eine Taste gedrückt wurde.

Wichtig: Die meisten Treiber werden in den Kernel geladen und laufen mit seinen vollen Rechten – sie sind die große Ausnahme von den „eingeschränkten Programmen“. Darum kann ein fehlerhafter Treiber, anders als eine App, den ganzen Rechner abstürzen lassen. Bei Windows ist das der berühmte Bluescreen.

### Dateien und Rechte

Die SSD speichert nur nummerierte Blöcke voller Bytes. Dass es darauf „Dateien“ mit Namen in „Ordnern“ gibt, ist eine Ordnung, die das Betriebssystem darüberlegt. Es merkt sich auch, **wem** eine Datei gehört und wer sie lesen oder ändern darf. Wie das genau funktioniert, erfährst du in Folge 9.

### Systemaufrufe: der Schalter zum Kernel

Wenn ein Programm etwas außerhalb seines Bereichs braucht – eine Datei öffnen, mehr Speicher bekommen, Daten ins Internet schicken –, darf es das nicht selbst tun. Es bittet den Kernel mit einem **Systemaufruf** darum: Der Prozessor wechselt kontrolliert in den Kernelmodus, der Kernel prüft, ob das Programm das darf, erledigt die Arbeit und gibt das Ergebnis zurück. Linux kennt einige Hundert verschiedene Systemaufrufe, von „öffne Datei“ bis „beende mich“.

> **Merke:** Die vier großen Aufgaben des Betriebssystems: **Prozesse** (wer darf wann rechnen), **Speicher** (wer bekommt welchen Bereich), **Geräte** (über Treiber) und **Dateien** (samt Rechten). Programme erreichen all das nur über Systemaufrufe.

## [werkstatt] Der Großmeister beim Simultanschach

Beim **Simultanschach** spielt ein Großmeister gegen zwanzig Gegner auf einmal. Die Bretter stehen in einem großen Kreis, an jedem sitzt ein Gegner. Der Großmeister geht von Brett zu Brett: Er schaut kurz auf die Stellung, macht einen Zug und geht weiter zum nächsten. Wenn er nach einer Runde wieder am ersten Brett ankommt, hat dessen Gegner längst seinen Antwortzug gemacht.

Jeder einzelne Gegner hat das Gefühl, eine echte Partie gegen den Großmeister zu spielen. Dabei spielt dieser immer nur an **einem** Brett. Wie er das schafft? Er muss sich die Partien nicht merken – die Stellung steht ja auf dem Brett und wartet auf ihn. An jedem Brett braucht er einen Moment, um sich wieder hineinzudenken, bevor er zieht.

Daraus kannst du Vorhersagen ableiten, die genauso für den Prozessor gelten: Kommen mehr Bretter dazu, wartet jeder Gegner länger auf seinen nächsten Zug. Grübelt der Großmeister an einem Brett minutenlang, warten alle anderen. Und hetzt er so schnell weiter, dass er sich an jedem Brett kaum orientieren kann, geht ein großer Teil seiner Zeit fürs Hineindenken drauf – das ist der Zielkonflikt aus dem Simulator.

> **Im Bild:** Großmeister = Prozessorkern. Ein Brett = ein Prozess. Die Stellung auf dem Brett = der gesicherte Zustand des Prozesses. Ein Zug = eine Zeitscheibe. Weitergehen und sich am nächsten Brett neu hineindenken = Kontextwechsel. Die Reihenfolge der Bretter = der Scheduler. Der Gegner = du (oder ein Gerät), der dem Programm neue Eingaben liefert.

> **Achtung:** Hier hinkt das Bild: Die Gegner denken weiter, während der Großmeister weg ist – ein Prozess dagegen steht still, solange er nicht dran ist. Nur von außen kann in der Zeit etwas für ihn ankommen, etwa ein Tastendruck. Außerdem zeigt das Bild nur die Zeitverteilung: Speicherschutz, Treiber und Dateien kommen darin nicht vor.

## [selbst] Verteile die Zeit

### Übung 1: Die richtige Zeitscheibe

Drei Prozesse teilen sich einen Kern: Musik, Browser und ein Update. Die Musik ist empfindlich – wartet sie länger als 9 Takte, hörst du ein Knacksen. Gleichzeitig soll höchstens ein Drittel der Zeit fürs Umschalten draufgehen, sonst wird der ganze Rechner träge. Finde mit **−** und **+** eine Zeitscheibe, die beides erfüllt.

:::sim scheduler
id: s1f08-u01
zeitscheibe: 6
uebung: ja
:::

**Auflösung:** Es gibt genau zwei Lösungen: **2 oder 3 Takte**. Bei 1 Takt geht die Hälfte der Zeit fürs Umschalten verloren, ab 4 Takten wartet die Musik zu lange (bei 4 schon 11 Takte: zwei fremde Zeitscheiben plus drei Umschaltvorgänge).

Das ist ein echter **Zielkonflikt**: Kurze Zeitscheiben machen den Rechner reaktionsschnell, verschwenden aber Zeit. Lange Zeitscheiben nutzen den Prozessor gut aus, lassen aber Programme warten. Betriebssysteme suchen deshalb einen Mittelweg – und behandeln Programme unterschiedlich: Was du gerade bedienst oder hörst, kommt öfter dran; eine lange Rechnung im Hintergrund darf dafür am Stück länger rechnen.

### Übung 2: Wer ist zuständig?

Das Betriebssystem hat vier große Aufgaben. Ordne jede Situation der Aufgabe zu, um die es geht.

:::sim zuordnen
id: s1f08-u02
gruppen: Prozesse | Speicher | Geräte | Dateien
paare: Die Musik läuft weiter, während du im Browser liest = Prozesse | Ein Zeitgeber unterbricht das laufende Programm, damit das nächste drankommt = Prozesse | Ein fehlerhaftes Spiel kann den Arbeitsspeicher deines Browsers nicht überschreiben = Speicher | Der RAM ist voll, also wird ein selten benutzter Teil auf die SSD ausgelagert = Speicher | Ein Treiber übersetzt „drucke diese Seite“ für deinen Drucker = Geräte | Die Tastatur meldet dem Kernel, dass eine Taste gedrückt wurde = Geräte | Ein Foto wird unter einem Namen in einem Ordner abgelegt = Dateien | Nur dein Benutzerkonto darf deinen Ordner „Dokumente“ lesen = Dateien
:::

**Auflösung:** Alles, was mit *wer rechnet wann* zu tun hat, gehört zu den Prozessen. Wer welchen Arbeitsspeicher bekommt und behalten darf, ist Speicherverwaltung. Treiber und Meldungen von Tastatur, Maus oder Drucker sind Geräteverwaltung. Namen, Ordner und Zugriffsrechte gehören zum Dateisystem.

### Übung 3: Ein Kontextwechsel Schritt für Schritt

Die Musik hat ihre Zeitscheibe aufgebraucht, jetzt soll der Browser drankommen. Bring die Schritte in die richtige Reihenfolge.

:::sim sortieren
id: s1f08-u03
elemente: Der Zeitgeber meldet sich mit einer Unterbrechung | Der Prozessor springt vom Musik-Programm in den Kernel | Der Kernel sichert die Register der Musik im Arbeitsspeicher | Der Scheduler wählt den Browser als Nächsten | Der Kernel lädt die gesicherten Register des Browsers | Der Browser rechnet dort weiter, wo er aufgehört hatte
oben: zuerst
unten: zuletzt
:::

**Auflösung:** Erst die Unterbrechung, dann übernimmt der Kernel. Er muss den alten Zustand sichern, *bevor* er den neuen lädt – sonst würde er die Registerinhalte der Musik überschreiben, und sie könnte nie an der richtigen Stelle weitermachen. Alle Schritte zwischen dem ersten und dem letzten sind die Zeit, die beim Umschalten „verloren“ geht.

## [beidir] Wo steckt das bei dir?

Betriebssysteme arbeiten in jedem deiner Geräte – und du kannst ihnen bei der Arbeit zusehen.

**Dein VPS: ein Kern für alle.** Der gemietete Server, auf dem ich arbeite, hat genau **einen** virtuellen Prozessorkern (1 vCPU). Der Befehl `nproc` antwortet dort schlicht mit `1`. Genau genommen läuft von mir dort nur das Programm **Claude Code**, das Befehle ausführt und Dateien bearbeitet; das Sprachmodell selbst, das die Antworten formuliert, rechnet auf Servern von Anthropic. Alles, was auf dem VPS läuft – Claude Code, die Befehle, die es startet, die Datensicherung, der Webserver für Tests –, teilt sich also diesen einen Kern im Zeitscheiben-Verfahren, genau wie die drei Programme im Simulator. Der Befehl `top` zeigt live, welche Prozesse gerade wie viel Rechenzeit bekommen. Und auch der Kern selbst ist schon geteilt: „Virtuell“ heißt, dass der Anbieter einen echten Prozessor in seinem Rechenzentrum auf mehrere solcher Server aufteilt – wieder mit Zeitscheiben, nur eine Ebene tiefer.

**Ich im Docker-Container: kein eigener Kernel.** Auf dem VPS läuft Linux, und mein Docker-Container bringt **keinen eigenen Kernel** mit. Er benutzt den Linux-Kernel des VPS mit. Dass ich trotzdem wie in einem eigenen kleinen Rechner arbeite, macht der Kernel selbst möglich: Mit sogenannten **Namensräumen** gibt er dem Container eine eigene Sicht auf Prozesse, Dateien und Netzwerk. Lasse ich mir im Container alle Prozesse anzeigen (`ps -e`), sehe ich nur etwa zwanzig – die des Containers –, nicht die übrigen Prozesse des VPS. Zusätzlich kann der Kernel begrenzen, wie viel Prozessorzeit und Speicher ein Container verbrauchen darf. Fragst du im Container nach der Kernel-Version (`uname -r`), bekommst du die des VPS – zurzeit beginnt sie mit `6.8`.

> **Beispiel:** Ein Container ist darum viel leichter als ein vollständiger zweiter Rechner: Er startet in Sekunden, weil kein Betriebssystem hochfahren muss – der Kernel läuft ja schon.

**Dein Pixel: Linux in der Hosentasche.** Android baut auf dem Linux-Kernel auf, den Torvalds 1991 begonnen hat. Jede App läuft dort als eigener Prozess, und Android geht beim Abschotten noch weiter als ein normaler PC: Jede App bekommt sogar ein eigenes Benutzerkonto im Linux-Sinn und darf nur an ihre eigenen Dateien. Zusätzlich muss eine App dich fragen, bevor sie an deine Fotos oder dein Mikrofon darf.

**Dein Windows-PC: der Task-Manager.** Drück **Strg + Umschalt + Esc**. Der Task-Manager öffnet sich und zeigt unter „Prozesse“ alle laufenden Programme, jeweils mit ihrem Anteil an Prozessorzeit und Arbeitsspeicher. Du wirst staunen, wie viele es sind, obwohl du vielleicht nur zwei Fenster offen hast – die meisten warten still im Hintergrund und kosten fast keine Rechenzeit. Unter „Leistung“ siehst du, wie viele Prozessorkerne dein PC hat. Steht bei „Logische Prozessoren“ die doppelte Zahl, kann jeder Kern zwei Befehlsströme ineinander verschränkt abarbeiten (Hyper-Threading) – das Betriebssystem behandelt jeden davon wie einen eigenen Kern. Darunter arbeitet der Kernel aus der Windows-NT-Familie.

**bim-trainer und diese App.** Auch die Server von Cloudflare, die dir den bim-trainer und diese App schicken, laufen mit einem Betriebssystem, das Zeit, Speicher und Netzwerk an viele Kunden gleichzeitig verteilt. Und in deinem Browser ist diese App selbst ein Prozess (oft sogar mehrere), den Android oder Windows im Zeitscheiben-Takt mit allen anderen drankommen lässt.

Wie das Betriebssystem eine Datei findet und ein Programm startet, wenn du doppelklickst, erfährst du in der nächsten Folge – dem großen Rückblick auf die ganze Staffel.

## [fazit] Auf den Punkt

- Das Betriebssystem verwaltet den ganzen Rechner: Prozesse (wer rechnet wann), Speicher, Geräte (über Treiber) und Dateien. Sein Herz ist der Kernel mit allen Rechten; Programme haben eingeschränkte Rechte und bitten den Kernel per Systemaufruf um Hilfe.
- Ein Prozessorkern arbeitet im Grundsatz nur einen Prozess zur Zeit ab (mit Hyper-Threading bei PC-Prozessoren höchstens zwei verschränkt). Der Scheduler wechselt in kurzen Zeitscheiben so schnell zwischen den Prozessen, dass es gleichzeitig wirkt.
- Jeder Kontextwechsel kostet Zeit: Zu kurze Zeitscheiben verschwenden Rechenzeit, zu lange lassen Programme warten.
- Jeder Prozess hat einen eigenen Speicherbereich (Speicherschutz), sodass ein Fehler nur ein Programm abstürzen lässt – nur Fehler im Kernel, etwa in einem Treiber, können den ganzen Rechner lahmlegen.

## [quiz] Teste dich

### s1f08-q01
Ein Rechner hat einen einzigen Prozessorkern ohne Hyper-Threading. Wie viele Prozesse führt dieser Kern in einem bestimmten Augenblick aus?
- [x] Genau einen
- [ ] Alle gestarteten
- [ ] Immer genau zwei
- [ ] So viele, wie in den RAM passen
Erklärung: Ein Kern arbeitet im Grundsatz immer nur einen Befehlsstrom ab (Hyper-Threading verschränkt bei PC-Prozessoren höchstens zwei). Dass trotzdem mehrere Programme zu laufen scheinen, liegt am schnellen Wechsel der Zeitscheiben.
Nachlesen: prinzip / Zeitscheiben: der schnelle Wechsel

### s1f08-q02
Was passiert bei einem Kontextwechsel?
- [ ] Das Programm wird von der SSD neu geladen
- [x] Der Zustand des einen Prozesses wird gesichert, der des nächsten geladen
- [ ] Der Prozessor wird kurz ausgeschaltet und neu gestartet
- [ ] Alle Programme werden auf einmal angehalten und beendet
Erklärung: Der Kernel sichert Registerinhalte und Befehlszähler des bisherigen Prozesses im Arbeitsspeicher und lädt den gesicherten Zustand des nächsten. So kann jeder Prozess genau dort weitermachen, wo er unterbrochen wurde.
Nachlesen: prinzip / Zeitscheiben: der schnelle Wechsel

### s1f08-q03
Ein Betriebssystem lässt jedes Programm nur eine kurze Zeitscheibe am Stück rechnen. Warum macht man diese Zeitscheiben nicht einfach so kurz wie möglich?
- [ ] Weil der Prozessor sonst zu heiß wird
- [ ] Weil kurze Zeitscheiben mehr Arbeitsspeicher verbrauchen
- [x] Weil jedes Umschalten Zeit kostet, in der nichts vorankommt
- [ ] Weil Programme dann ihre Daten auf der SSD verlieren
Erklärung: Je kürzer die Zeitscheiben, desto öfter wird umgeschaltet – und desto größer wird der Anteil der Zeit, der nur fürs Sichern und Laden der Zustände draufgeht. Zu lange Zeitscheiben lassen dagegen Programme warten.
Nachlesen: prinzip / Zeitscheiben: der schnelle Wechsel

### s1f08-q04
Ein Spiel hat einen Fehler und versucht, in den Speicherbereich des Browsers zu schreiben. Was verhindert, dass der Browser beschädigt wird?
- [ ] Der Treiber der Grafikkarte
- [ ] Der Scheduler mit seinen Zeitscheiben
- [x] Der Speicherschutz des Betriebssystems
- [ ] Das Dateisystem auf der SSD
Erklärung: Jeder Prozess hat seinen eigenen Speicherbereich. Greift ein Programm auf einen fremden Bereich zu, schlägt der Prozessor Alarm, und das Betriebssystem beendet nur das fehlerhafte Programm.
Nachlesen: prinzip / Speicher: jedem sein eigener Bereich

### s1f08-q05
Ein Programm möchte eine Datei von der SSD lesen. Wie kommt es an die Daten?
- [ ] Es spricht die SSD direkt über deren Anschluss an
- [x] Es bittet den Kernel mit einem Systemaufruf darum
- [ ] Es kopiert sich selbst vorher auf die SSD
- [ ] Es wartet, bis der Scheduler die Datei liefert
Erklärung: Programme laufen im Benutzermodus und dürfen Geräte nicht selbst ansprechen. Über einen Systemaufruf bitten sie den Kernel, der prüft, ob sie das dürfen, und die Arbeit mit Hilfe des Treibers erledigt.
Nachlesen: prinzip / Systemaufrufe: der Schalter zum Kernel

### s1f08-q06
Unix entstand 1969, nachdem die Bell Labs aus dem großen, komplizierten Betriebssystem-Projekt Multics ausgestiegen waren. Welche Idee prägt Unix bis heute?
- [ ] Ein einziges großes Programm, das alle Aufgaben selbst erledigt
- [x] Schlichtheit: kleine Werkzeuge, die je eine Sache gut können und sich kombinieren lassen
- [ ] Jeder Benutzer bekommt einen eigenen Computer und muss nichts teilen
- [ ] Programme sprechen die Geräte direkt an, ganz ohne Kernel
Erklärung: Ken Thompson und Dennis Ritchie wollten nach Multics ein einfaches System zum Arbeiten. Ihre Idee war Schlichtheit: kleine Werkzeuge, die je eine Sache gut können und sich kombinieren lassen – das Gegenteil des großen, komplizierten Multics.
Nachlesen: geschichte

### s1f08-q07
Ein Docker-Container läuft auf einem Linux-Server (VPS). Was gilt für seinen Kernel?
- [ ] Er bringt einen eigenen Kernel mit, unabhängig vom Server
- [x] Er nutzt den Linux-Kernel des Servers mit, aber abgeschottet
- [ ] Er läuft auf einem eigenen, zusätzlichen Prozessor
- [ ] Er verwendet den Kernel des Computers, von dem aus man ihn bedient
Erklärung: Container haben keinen eigenen Kernel. Der Linux-Kernel des Servers gibt jedem Container eine eigene, abgeschottete Sicht auf Prozesse, Dateien und Netzwerk und begrenzt, wie viel er verbrauchen darf.
Nachlesen: beidir

## [karten] Für deinen Karteikasten

### s1f08-k01
Vorne: Was ist ein Betriebssystem?
Hinten: Das Programm, das nach dem Einschalten zuerst startet und den ganzen Rechner verwaltet: Es verteilt Prozessor und Speicher, spricht mit den Geräten und hält die Dateien in Ordnung.

### s1f08-k02
Vorne: Was ist der Kernel?
Hinten: Das Herz des Betriebssystems. Er hat volle Rechte und verwaltet die Hardware; alle anderen Programme laufen mit eingeschränkten Rechten.

### s1f08-k03
Vorne: Was ist ein Prozess?
Hinten: Ein laufendes Programm mit eigenem Speicherbereich und eigenem Zustand (Registerinhalte, Befehlszähler).

### s1f08-k04
Vorne: Was ist eine Zeitscheibe?
Hinten: Die kurze Zeit, die der Scheduler einem Prozess am Stück auf dem Prozessorkern gibt, bevor der Nächste drankommt.

### s1f08-k05
Vorne: Was passiert bei einem Kontextwechsel?
Hinten: Der Kernel sichert den Zustand des bisherigen Prozesses und lädt den gesicherten Zustand des nächsten. Das kostet Zeit, in der kein Programm vorankommt.

### s1f08-k06
Vorne: Wie bittet ein Programm den Kernel um etwas, das es selbst nicht darf (z. B. eine Datei öffnen)?
Hinten: Mit einem Systemaufruf: Der Prozessor wechselt kontrolliert in den Kernelmodus, der Kernel prüft die Erlaubnis und erledigt die Arbeit.

### s1f08-k07
Vorne: Was ist ein Treiber?
Hinten: Ein Programmteil, der zwischen dem Kernel und einem bestimmten Gerät übersetzt – oft vom Hersteller, für Standardgeräte vom Betriebssystem mitgebracht.

### s1f08-k08
Vorne: Was sind die vier großen Aufgaben des Betriebssystems?
Hinten: Prozesse (wer darf wann rechnen), Speicher (wer bekommt welchen Bereich), Geräte (über Treiber) und Dateien (samt Rechten).

### s1f08-k09
Vorne: Wodurch ließ sich Unix auf andere Computer übertragen?
Hinten: Ken Thompson und Dennis Ritchie schrieben es 1973 in der Programmiersprache C neu, die Ritchie dafür entwickelt hatte.
