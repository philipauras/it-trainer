# Faktencheck s1f08 „Betriebssystem“, Durchgang 1

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Inhalte nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-08-betriebssystem.md` (status: entwurf)
Mitgeprüft: Glossar-Vorschläge `/workspace/tmp/glossar-neu/s1f08.md`, Simulatoren `js/sim/scheduler.js`, `js/sim/zuordnen.js`,
`js/sim/sortieren.js` (Kopfkommentare und Logik), Regeln in `content/README.md` („Bilder, Grafiken und Mitmachen“),
Vergleich mit `folge-01-bit.md` (Bell Labs/Shannon) und `folge-06-prozessor.md` (Begriff „Takt“).

## Geprüft und korrekt

### Geschichte

| Aussage | Befund |
|---|---|
| GM-NAA I/O, 1956, General Motors + North American Aviation, IBM 704, Stapelverarbeitung, „eines der ersten Betriebssysteme“ | korrekt (Robert L. Patrick, GM, und Owen Mock, NAA). „Eines der ersten“ ist richtig vorsichtig formuliert (GM hatte 1955 schon ein Vorläufer-System für die IBM 701). |
| CTSS, Gruppe um Corbató am MIT, erste Vorführung November 1961 auf einem IBM-Großrechner | korrekt (IBM 709, später 7090/7094; bestätigt durch Van Vleck, multicians.org). Turing Award für Corbató (1990) korrekt. |
| Multics: MIT, General Electric, Bell Labs, ab Mitte der 1960er; Ausstieg der Bell Labs 1969 | korrekt |
| Bell Labs = Labore von Shannon (Folge 1) | korrekt und stimmig mit Folge 1 |
| Unix 1969, Thompson (mit Ritchie), „kaum genutzte PDP-7“ | korrekt; Ritchie selbst schreibt „a little-used PDP-7“ |
| 1973 Neufassung in C, C von Ritchie | korrekt (Ritchie: „during 1973, when the operating system kernel was rewritten in C“) |
| Kernighan als Namensgeber, Wortspiel auf Multics | im Kern korrekt, Details siehe E4 |
| Turing Award Thompson und Ritchie 1983 | korrekt |
| Linux: 25. August 1991, Helsinki, 21 Jahre, „nur ein Hobby, wird nicht groß und professionell“ | korrekt (Torvalds geb. 28.12.1969; Originalzitat „just a hobby, won't be big and professional like gnu“). Der Google-Groups-Link funktioniert (HTTP 200) und zeigt den Thread „What would you like to see most in minix?“ mit dem Text. Google Groups zeigt wegen Zeitzonen-Umrechnung teils 26. August an; das Original-Datum im Kopf der Nachricht ist der 25. August 1991, 20:57 GMT. |
| Linux auf dem Großteil der Server im Internet | vertretbar; gängige Messungen (z. B. W3Techs, Cloud-Anbieter) sehen Linux bei Web- und Cloud-Servern klar vorn |
| Linux in angepasster Form in jedem Android-Handy | korrekt (AOSP „Kernel overview“: Android Common Kernel) |
| Windows XP (2001) erste Heim-Version auf NT-Basis; NT 1993 zuerst für Firmen | korrekt. Windows 2000 war auch NT-basiert, aber als Firmenversion vermarktet; die Heimlinie lief bis Windows ME (2000) auf 9x. „Seit XP alle Heim-Versionen“ stimmt. |

### Prinzip

- Kernelmodus/Benutzermodus, „mindestens zwei“, „bei manchen Prozessoren mehr Stufen, genutzt meist zwei“: korrekt (x86: Ring 0–3, genutzt 0 und 3). Vereinfachung ist ausgewiesen.
- Prozess = Programm im Speicher mit eigenem Zustand (Register, Befehlszähler): korrekt.
- Zeitscheibe „wenige Millisekunden“: für Linux korrekt, für Windows eher knapp (siehe E6). Kontextwechsel „grob einige Mikrosekunden“, dazu Cache-Folgekosten: korrekt. Verhältnis „etwa tausendmal“: als Größenordnung vertretbar.
- Zeitgeber-Unterbrechung, Ablauf Sichern → Auswählen → Laden → Weitermachen: korrekt (Vereinfachung: Wechsel des Adressraums fehlt, für Einsteiger vertretbar).
- „hunderte Male pro Sekunde“: korrekt (eher untere Grenze).
- Wartende Prozesse werden übersprungen, Prioritäten, mehrere Kerne = echte Gleichzeitigkeit: korrekt.
- Speicherschutz über einen Baustein im Prozessor (MMU), Auslagern auf die SSD: korrekt.
- Unterbrechungen durch Geräte: korrekt.
- SSD speichert nummerierte Blöcke, Dateisystem legt die Ordnung darüber: korrekt. Verweis auf Folge 9 passt (dort Systemaufruf, Rechteprüfung, Blöcke).
- „Linux kennt einige Hundert Systemaufrufe“: korrekt (x86-64 derzeit gut 450 Nummern).
- Vier Hauptaufgaben (Prozesse, Speicher, Geräte, Dateien): entspricht Tanenbaum.

### Wo steckt das bei dir?

- VPS mit 1 vCPU: `nproc` liefert im Container tatsächlich `1` (geprüft). `uname -r` liefert `6.8.0-149-generic` (geprüft) – „beginnt mit 6.8“ stimmt.
- Docker: Container ohne eigenen Kernel, Namensräume (Prozesse, Dateien über Mount-Namensraum, Netzwerk), Begrenzung von Prozessorzeit und Speicher (cgroups, im Text ohne Namen): **fachlich korrekt formuliert**. „Startet in Sekunden, weil kein Betriebssystem hochfahren muss“: korrekt. Docker-Dokumentation bestätigt wörtlich, dass Container den Kernel des Rechners teilen (Link allerdings veraltet, siehe E2).
- Android: jede App bekommt eine eigene Linux-Benutzerkennung (UID): **korrekt** (AOSP „Application Sandbox“: „assigns a unique user ID (UID) to each Android app“). Die genannte Quelle (Kernel overview) belegt das aber nicht, siehe E3.
- Task-Manager mit Strg + Umschalt + Esc, Reiter „Prozesse“ und „Leistung“: korrekt.
- vCPU vom Anbieter per Zeitscheiben auf echte Kerne verteilt: als Vereinfachung korrekt.

### Quellen im Kopf

| Quelle | Erreichbar | Passt |
|---|---|---|
| Tanenbaum/Bos, Moderne Betriebssysteme, 4. Aufl., Pearson 2016 | – | ja |
| Patrick, GM/North American Monitor for the IBM 704, RAND | – | ja (RAND-Papier P-7316, 1987; Nummer könnte ergänzt werden) |
| Corbató/Merwin-Daggett/Daley, AFIPS SJCC Mai 1962 | – | ja |
| Van Vleck, multicians.org/thvv/7094.html | ja (200) | ja (CTSS, IBM 709/7094) |
| Ritchie, bell-labs.com/usr/dmr/www/hist.html | **nein (HTTP 410 Gone)** | Inhalt passt, Link tot – siehe E1 |
| Ritchie/Thompson, CACM 1974, DOI 10.1145/361011.361061 | ACM sperrt automatische Abrufe (403); DOI ist korrekt | ja |
| Torvalds, Google Groups | ja (200) | ja |
| AOSP Kernel overview | ja (200) | ja für „Android nutzt Linux-Kernel“, nicht für die UID-Aussage (E3) |
| Microsoft Learn Benutzer-/Kernelmodus | ja (200) | ja; die Seite sagt zusätzlich „viele Treiber arbeiten im Kernelmodus“ (siehe E5) |
| man7 namespaces(7) | ja (200) | ja |
| Docker Docs overview | **nein (HTTP 404)** | siehe E2 |

### Übungen und Simulator

- **Scheduler-Simulator nachgerechnet** (`zeitleiste`/`kennzahlen`): Zwischen zwei Musik-Abschnitten liegen 2 fremde Zeitscheiben + 3 Umschalt-Takte, also Wartezeit = 2·s + 3; Verwaltungsanteil = 1/(s + 1).

  | Zeitscheibe s | Musik wartet | Umschalten | erfüllt? |
  |---|---|---|---|
  | 1 | 5 | 50 % | nein (Umschalten) |
  | 2 | 7 | 33 % | ja (genau ein Drittel, Simulator lässt ≤ 1/3 zu) |
  | 3 | 9 | 25 % | ja (genau 9, Simulator lässt ≤ 9 zu) |
  | 4 | 11 | 20 % | nein (Musik) |
  | 5–8 | 13–19 | 17–11 % | nein (Musik) |

  Die Auflösung „genau zwei Lösungen: 2 oder 3 Takte“, „bei 1 Takt die Hälfte“, „bei 4 schon 11 Takte: zwei fremde Zeitscheiben plus drei Umschaltvorgänge“ ist **richtig**. Startwert 6 liegt im erlaubten Bereich 1–8 und ist keine Lösung – gut. Text und Simulator-Grenzen (9 Takte, ein Drittel) stimmen überein.
- Erster Simulator (Zeitscheibe 4): Aussagen „ganz kurz → Hälfte geht fürs Umschalten verloren“ und „lang → Musik wartet lange“ stimmen mit dem Simulator überein.
- Übung 2 (zuordnen): alle acht Zuordnungen fachlich richtig; zur Eindeutigkeit siehe E10.
- Übung 3 (sortieren): Reihenfolge richtig, Auflösung korrekt (Sichern vor Laden).

### Quiz und Karten

- q01–q07: jeweils genau eine richtige Antwort, Erklärungen korrekt, `Nachlesen` sinnvoll. q07 (Docker) ist fachlich sauber.
- k01–k09: korrekt, je eine Sache (k09 fragt zwei Daten zu Unix, ist aber ein zusammenhängender Fakt – vertretbar).

### Glossar-Vorschläge

Alle 16 Einträge fachlich korrekt und für Einsteiger verständlich (Betriebssystem, Kernel, Prozessorkern, Prozess, Scheduler,
Zeitscheibe, Kontextwechsel, Interrupt, Speicherschutz, Treiber, Systemaufruf, Stapelverarbeitung, Time-Sharing, Unix, Linux,
Namensraum). Sie stimmen mit dem Folgentext überein. Hinweise aus E5/E6 gelten sinngemäß auch für „Kernel“, „Treiber“ und „Zeitscheibe“.

### Format

Keine Handwerks-Wörter. Bild (Simultanschach) wurde noch nicht als Hauptbild verwendet. Mindestens ein Simulator im Prinzip und drei Übungen: erfüllt.

## Fehler

### F1 – Bild: Zuordnung „Brett mit Gegner = Prozess“ lässt eine falsche Vorhersage zu

Fundstelle: `[werkstatt]`, zweiter/erster Absatz („hat dessen Gegner längst geantwortet“) und `> **Im Bild:**` („Ein Brett mit Gegner = ein Prozess“).

Die Probe aus dem README („Kann man aus dem Bild eine richtige Vorhersage ableiten?“) scheitert an einer Stelle, die den Kern der Folge
betrifft: Im Bild denken alle zwanzig Gegner **gleichzeitig** weiter, während der Großmeister woanders ist – und weil der Gegner laut
„Im Bild“-Box zum Prozess gehört, kommt der Prozess also voran, obwohl er gerade nicht „dran“ ist. Ein Einsteiger leitet daraus ab:
„Mein Programm rechnet weiter, während ein anderes den Kern hat.“ Genau das Gegenteil lehrt das Prinzip („Auf einem Prozessorkern läuft
immer nur ein Prozess“, „kommt keines der Programme voran“). Der Hinkt-Satz nennt diesen Unterschied nicht.

Das Bild selbst ist gut und lässt sich mit einer kleinen Umdeutung retten – sie passt sogar besser zur Geschichte (Time-Sharing mit Menschen an Terminals):

**Korrekturvorschlag:**
- „Im Bild“-Box: „Großmeister = Prozessorkern. Ein Brett = ein Prozess. Die Stellung auf dem Brett = der gesicherte Zustand des Prozesses.
  Ein Zug = eine Zeitscheibe. Weitergehen und sich am nächsten Brett neu hineindenken = Kontextwechsel. Die Reihenfolge der Bretter = der Scheduler.
  Der Gegner = du (oder ein Gerät), der dem Programm neue Eingaben liefert.“
- Zusätzlich in den Hinkt-Satz (oder als Satz im Text): „Und die Gegner denken nach, während der Großmeister weg ist – ein Prozess dagegen
  steht still, solange er nicht dran ist. Nur von außen kann in der Zeit etwas für ihn ankommen, etwa ein Tastendruck.“

## Empfehlungen

### E1 – Ritchie-Link ist tot (dringend)
Fundstelle: Quellen, Zeile „Dennis M. Ritchie: The Evolution of the Unix Time-sharing System“. `https://www.bell-labs.com/usr/dmr/www/hist.html`
antwortet mit HTTP 410 (Gone). Neuer Ort (geprüft, Inhalt identisch): `https://www.nokia.com/bell-labs/about/dennis-m-ritchie/hist.html`.

### E2 – Docker-Link ist tot (dringend)
Fundstelle: Quellen, „Docker Docs: Docker overview“. `https://docs.docker.com/get-started/docker-overview/` antwortet mit HTTP 404.
Ersatz (geprüft, sagt ausdrücklich „shares that machine's kernel. There is no operating system to boot“ – passt sogar zur Beispiel-Box):
„Docker Docs: What is a container? | https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/“.

### E3 – Quelle für „jede App eigenes Linux-Benutzerkonto“ ergänzen
Fundstelle: `[beidir]`, „Dein Pixel“. Aussage stimmt, wird aber von der Kernel-Seite nicht belegt. Ergänzen:
„Android Open Source Project: Application Sandbox | https://source.android.com/docs/security/app-sandbox“.

### E4 – „Unics“ und Kernighan genauer belegen
Fundstelle: `> **Wusstest du?:**`. Die zitierte Ritchie-Quelle sagt: „not until well into 1970 that Brian Kernighan suggested the name
‚Unix', in a somewhat treacherous pun on ‚Multics'“. Die Schreibweise „Unics“ als erster Name stammt aus späteren Erinnerungen
(u. a. Kernighan selbst; manche nennen auch Peter Neumann). Vorschlag: „Den Namen schlug 1970 ihr Kollege Brian Kernighan vor – zuerst
wohl als ‚Unics': ‚uni' (eins) statt ‚multi' (viele). Daraus wurde Unix.“ Optional Quelle: Brian Kernighan: UNIX. A History and a Memoir, 2019.

### E5 – Treiber laufen meist im Kernelmodus
Fundstelle: `[prinzip]`, „Kernel und Programme“ („Alle anderen Programme … laufen mit eingeschränkten Rechten“) und „Geräte und Treiber“.
Die eigene Quelle (Microsoft Learn) sagt: „Obwohl viele Treiber im Kernelmodus arbeiten, können einige im Benutzermodus funktionieren.“
Ein Einsteiger hält Treiber nach dem jetzigen Text für eingeschränkte Programme. Vorschlag für „Geräte und Treiber“: „Die meisten Treiber
werden in den Kernel geladen und laufen mit seinen vollen Rechten – darum kann ein fehlerhafter Treiber, anders als eine App, den ganzen
Rechner abstürzen lassen (bei Windows der berühmte Bluescreen).“ Das ist zugleich ein schönes Alltagsbeispiel.

### E6 – Zeitscheiben unter Windows länger als „wenige Millisekunden“
Fundstelle: `[prinzip]`, „Zeitscheiben“, und Glossar „Zeitscheibe“. Linux: wenige Millisekunden – stimmt. Windows (Desktop) arbeitet mit
Zeitscheiben von rund 20 bis 60 ms, Server-Versionen noch länger. Da Philip Windows nutzt: „typischerweise einige bis einige Dutzend
Millisekunden, je nach System“. Die „Achtung“-Box („etwa tausendmal“) dann „tausend- bis zehntausendmal“ – oder einfach „viel länger“.

### E7 – „Takt“ im Simulator ist nicht der Prozessortakt aus Folge 6
Fundstelle: `[prinzip]` unter dem ersten Simulator („Jedes Kästchen ist ein Takt“) und Übung 1. In Folge 6 ist ein Takt ein
Schaltschritt im Nanosekundenbereich; hier steht er für eine Zeiteinheit, in die eine ganze Zeitscheibe passt. Die Achtung-Box sagt
„Arbeitsschritt“. Vorschlag: einen Halbsatz ergänzen: „Jedes Kästchen ist ein Zeitschritt (der Simulator nennt ihn Takt – mit dem
Prozessortakt aus Folge 6 hat er nichts zu tun).“

### E8 – Hyper-Threading / „Logische Prozessoren“ kurz erwähnen
Fundstelle: `[prinzip]` „Auf einem Prozessorkern läuft immer nur ein Prozess“, q01, und `[beidir]` Task-Manager „Leistung“. Viele
Prozessoren (Intel Hyper-Threading, AMD SMT) lassen einen Kern zwei Befehlsströme verschränkt abarbeiten; der Task-Manager zeigt darum
„Kerne“ und „Logische Prozessoren“ (oft doppelt so viele). Philip wird das beim Nachschauen sehen. Vorschlag im Task-Manager-Absatz:
„Steht bei ‚Logische Prozessoren' die doppelte Zahl, kann jeder Kern zwei Befehlsströme ineinander verschränkt abarbeiten (Hyper-Threading) –
das Betriebssystem behandelt jeden davon wie einen eigenen Kern.“ Die Vereinfachung in Prinzip und Quiz kann dann bleiben.

### E9 – „Dasselbe Programm zweimal = zwei Prozesse“ abschwächen
Fundstelle: `[prinzip]`, „Prozesse“. Viele Programme (Browser, Office, Spotify) öffnen beim zweiten Start nur ein neues Fenster im
bestehenden Prozess; Browser starten umgekehrt viele Prozesse. Vorschlag: „Startest du dasselbe Programm zweimal, entstehen in der Regel
zwei Prozesse, die nichts voneinander wissen.“ (Glossar „Prozess“ ebenso.)

### E10 – Übung 2: eine Karte eindeutiger formulieren
Fundstelle: `s1f08-u02`, Karte „Ein abgestürztes Spiel kann die Daten deines Browsers nicht überschreiben = Speicher“. „Daten deines
Browsers“ kann man auch als gespeicherte Dateien (Lesezeichen, Verlauf) lesen → Gruppe „Dateien“; und ein schon abgestürztes Spiel schreibt
nichts mehr. Vorschlag: „Ein fehlerhaftes Spiel kann den Arbeitsspeicher deines Browsers nicht überschreiben = Speicher“.

### E11 – „hält der Prozessor an“ missverständlich
Fundstelle: `[prinzip]`, „Kernel und Programme“. Klingt, als bleibe der Prozessor stehen. Vorschlag: „…unterbricht der Prozessor das
Programm und übergibt dem Kernel.“

### E12 – „Treiber meist vom Hersteller“
Fundstelle: `[prinzip]` „Geräte und Treiber“, Karte k07, Glossar „Treiber“. Für Drucker und Grafikkarten richtig; Mäuse, Tastaturen und
SSDs (beide im Beispiel genannt) nutzen fast immer Standardtreiber, die das Betriebssystem mitbringt. Vorschlag: „oft vom Hersteller,
für Standardgeräte wie Maus oder SSD bringt das Betriebssystem sie selbst mit“.

### E13 – Prozesszahl im Container
Fundstelle: `[beidir]`, „sehe ich nur ein paar Dutzend“. Am 26.11.2026 zeigte `ps -e` im Container 21 Prozesse. Vorschlag: „nur etwa zwanzig“
(oder „nur eine Handvoll bis ein paar Dutzend“, da die Zahl schwankt).

### E14 – Bilder-Tabelle im README nachtragen
Fundstelle: `content/README.md`, „Bisher verwendete Hauptbilder“. Eintrag „s1f08 Betriebssystem | Simultanschach (Großmeister an vielen Brettern)“ ergänzen, damit das Bild nicht erneut verwendet wird.

## Zusammenfassung

1 Fehler (F1: Bild-Zuordnung „Brett mit Gegner = Prozess“ widerspricht dem Kern der Folge), 14 Empfehlungen (davon E1 und E2 tote
Quellen-Links, dringend). Alle Jahreszahlen, Personen und die geforderten Prüfpunkte (GM-NAA I/O 1956, CTSS 1961, Unix 1969, Linux 1991,
Windows XP, Größenordnungen, Systemaufrufe, Android-UID, Docker/Namensräume, Scheduler-Übung 2 oder 3) sind korrekt.

Ergebnis: nicht bestanden
