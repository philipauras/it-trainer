# Faktencheck s1f03 „Logikgatter“, Durchgang 1

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Folge nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-03-gatter.md` (`status: entwurf`)
Mitgeprüft: Glossar-Vorschläge `/workspace/tmp/glossar-neu/s1f03.md` (stehen inhaltsgleich schon in `content/glossar.md`),
Simulator `js/sim/schaltung.js` und `js/sim/tabelle.js` (Kopfkommentare und Auswertung), Regeln in `content/README.md`
(besonders „Bilder, Grafiken und Mitmachen“), Ton/Niveau von `folge-01-bit.md`, Bezüge zu `folge-02-transistor.md`.

## Geprüft und korrekt

### Geschichte
- **Boole:** geboren 1815 in Lincoln, Sohn eines Schuhmachers, Autodidakt, eigene Schule als junger Mann, 1849 Professor am
  Queen's College Cork ohne Studienabschluss – alles korrekt. „The Mathematical Analysis of Logic“ **1847** (Cambridge) und
  „An Investigation of the Laws of Thought“ **1854** (London) – korrekt. Project-Gutenberg-Nr. 15114 ist „The Laws of Thought“
  (Katalogwissen; die Seite war beim Prüfen wegen Wartung nicht erreichbar).
- **UND als Multiplikation:** Boole schrieb die Verknüpfung als Produkt xy (mit x² = x). Dass Boole mit 1/0 eigentlich zuerst
  „alles“/„nichts“ (Klassen) meinte und erst nebenbei wahr/falsch, ist eine vertretbare Vereinfachung.
- **Shannon:** Doppelstudium Elektrotechnik und Mathematik in Michigan (Abschlüsse 1936), dort Booles Logik kennengelernt,
  ab 1936 Forschungsassistent am Differential Analyzer von Vannevar Bush am MIT – korrekt. Masterarbeit **1937** geschrieben,
  **1938** gedruckt in Transactions of the AIEE 57, S. 713–723 – korrekt. „Elf Jahre später“ (1948, Bit) – korrekt und
  stimmig mit Folge 1.
- **„Wichtigste Masterarbeit“:** Die Formulierung „wird oft die vielleicht wichtigste Masterarbeit des 20. Jahrhunderts genannt“
  ist vorsichtig genug und trifft das bekannte Zitat von Howard Gardner („possibly the most important, and also the most famous,
  master's thesis of the century“). Kein Fehler (Zuschreibung siehe E2).
- **Relais hintereinander = und, nebeneinander = oder:** inhaltlich richtig. (Shannon rechnete formal mit „Hemmung“, also der
  dualen Schreibweise; für Einsteiger zu Recht weggelassen.)

### Prinzip
- Alle Wahrheitstabellen (UND, ODER, NICHT, XODER, NUND, NODER) nachgerechnet – korrekt; Simulator-Typen in `schaltung.js`
  rechnen genauso.
- **ODER aus drei NUND-Gattern:** NUND(NUND(A,A), NUND(B,B)) = NUND(¬A, ¬B) = A ∨ B (De Morgan). Mit dem Simulator ausgewertet:
  `Q = 0111` = ODER. Die Erklärung im Text („nur dann 0, wenn NA und NB beide 1 sind, also A und B beide 0“) ist richtig.
- NICHT und UND aus NUND – korrekt. „Dasselbe geht auch mit NODER allein“ – korrekt.
- **CMOS-Transistorzahlen:** NUND 4, UND 6 (= NUND + Inverter mit 2) – korrekt.
- **Apollo-Bordcomputer:** Block II nutzte rund **2 800** ICs, die meisten davon mit **zwei NODER-Gattern mit je drei
  Eingängen** (dazu wenige andere Typen, z. B. Leseverstärker; Block I: 4 100 ICs mit je einem NODER). „Rund 2 800 Chips, die
  meisten mit je zwei NODER-Gattern“ und „fast mit einem einzigen Gattertyp“ – korrekt (Quellenzuordnung siehe E6).
- Bezüge zu Folge 2 („hintereinander = UND, nebeneinander = ODER“, „Abkürzung an der Lampe vorbei“ = NICHT) stimmen mit
  `folge-02-transistor.md` überein.

### Im Bild (Prüfung jedes Alltagsbilds, auch elektrisch)
- **Bankschließfach = UND:** zwei Schlösser, beide müssen geöffnet sein – mechanisch zwei „Schalter“ in Reihe. Trifft den Mechanismus,
  Vorhersage (drei Schlösser = UND mit drei Eingängen) richtig.
- **Kühlschrank-Türtaster = NICHT:** Der Türschalter ist ein Öffner: gedrückt = Kontakt offen = Licht aus. Trifft genau die
  NICHT-Tabelle.
- **Wechselschaltung = XODER:** Zwei Wechselschalter, Lampe an, wenn die Stellungen „verschieden“ sind (bzw. bei anderer
  Verdrahtung „gleich“ = XNODER). Elektrisch korrekt, und die Folge sagt die Verdrahtungsabhängigkeit selbst. Sehr gut.
- **Treppenhaustaster = ODER:** siehe **F1**.

### Übungen (mit `lesen`/`tabelle`/`zielErfuellt` aus `schaltung.js` alle Belegungen durchprobiert)
- **u01** (XODER, Tabelle): Ergebnis 0110, Auflösung „0, 1, 1, 0“ richtig; Zeilenreihenfolge (A = unten vorne) passt.
- **u02** (Ziel 0111, Auswahl UND/ODER/XODER/NUND/NODER): einzige Lösung **ODER**; Gegenwerte in der Auflösung (0001, 0110,
  1110, 1000) richtig.
- **u03** (Alarm, Ziel 00000111, Standardauswahl UND/ODER/XODER): einzige Lösung **Offen = ODER, Alarm = UND**. Zeilen
  S F T von 000 bis 111, erster Eingang vorne – Zielmuster stimmt mit „scharf UND (Fenster ODER Tür)“ überein. Erklärung zu
  XODER richtig.
- **u04** (NUND, dahinter ?(N,N), Auswahl UND/ODER/NUND, Ziel 0001): einzige Lösung **NUND**; UND(N,N) und ODER(N,N) geben
  beide 1110. Erklärung richtig.
- Alle Simulator-Blöcke sind gültig lesbar (Gatternamen wie `Offen` erlaubt, Ausgang = letztes Gatter).

### Quiz und Karten
- q01–q07: je genau eine richtige Antwort, Erklärungen korrekt, `Nachlesen` passend. q07: Shannon 1948/1938, Leibniz 1703 – korrekt.
- k01–k08 inhaltlich korrekt.

### Beidir
- „Hunderte Millionen bis Milliarden“ Gatter je Prozessor – plausibel (Milliarden Transistoren, wenige je Gatter). Python in
  Staffel 3 – stimmt mit `config.json`. Gmail-`OR` – korrekt. Halbaddierer aus XODER + UND in Folge 4 – stimmt mit `config.json`.

## Befunde

### Fehler

**F1 – Fehler: Treppenhauslicht ist kein ODER-Gatter (Abschnitt `[werkstatt]`, „ODER: das Treppenhauslicht“, und „Im Bild“-Box).**
Die Taster liegen zwar parallel (das ist ein ODER), aber sie steuern in echten Treppenhäusern einen **Treppenlicht-Zeitschalter**
(das Licht brennt nach dem Loslassen noch Minuten weiter) oder einen **Stromstoßschalter** (erneutes Drücken schaltet das Licht
*aus*). Die Lampe folgt also nicht den Eingängen wie ein Gatter; sie hat ein Gedächtnis. Aus dem Bild ergibt sich die falsche
Vorhersage „Taster loslassen → Licht aus“ (Zeile 00 → 0), die jeder aus dem Alltag widerlegt – das widerspricht der README-Probe
„richtige Vorhersage“, und die Achtung-Box sagt dazu nichts. Gerade weil Folge 5 Speicher behandelt, sollte hier kein Speicher-
Verhalten als Gatter verkauft werden.
Korrekturvorschlag (eine der beiden Varianten):
- **Bild tauschen (empfohlen):** Klingel mit zwei Tastern, z. B. unten an der Haustür und oben an der Wohnungstür, beide parallel
  an derselben Klingel: „Die Klingel läutet, **solange** an irgendeiner Tür gedrückt wird – auch wenn beide gleichzeitig drücken.
  Lässt man los, ist sie still.“ Vorhersage und Tabelle stimmen dann exakt. „Im Bild“-Box und Vorhersage-Satz („fünf Stockwerke“)
  entsprechend anpassen (z. B. „Ein Haus mit fünf Klingeltastern für dieselbe Klingel …“).
- **Bild behalten und einschränken:** „Elektrisch liegen die Taster nebeneinander: Die Leitung meldet ‚gedrückt‘, sobald irgendeiner
  gedrückt ist – das ist das ODER. Dass das Licht danach noch eine Weile brennt, macht ein Zeitschalter dahinter; der ist kein
  Gatter mehr, sondern ein kleiner Speicher (Folge 5).“

### Empfehlungen

**E1 – Quellenangabe Masterarbeit (Kopf, Quelle 3).** Der MIT-DSpace-Eintrag 1721.1/11173 führt die Arbeit mit „Thesis (M.S.) …
1940“ (der Grad wurde erst 1940 verliehen). Vorschlag: „Masterarbeit, MIT (geschrieben 1937, Abschluss 1940; MIT DSpace)“.
Im Text bleibt „1937 schreibt er …“ richtig.

**E2 – „Wichtigste Masterarbeit“ zuschreiben (`[geschichte]`, letzter Satz Shannon).** Konkreter und nachprüfbar: „Der Psychologe
Howard Gardner nannte sie ‚vielleicht die wichtigste Masterarbeit des Jahrhunderts‘.“

**E3 – „erstmals berechnen“ (`[geschichte]`).** Ungefähr gleichzeitig kamen Akira Nakashima (Japan, ab 1934/35) und Viktor Schestakow
(Sowjetunion) zu ähnlichen Ergebnissen. Vorschlag: „erstmals“ → „systematisch“ oder Halbsatz „– etwa zur selben Zeit hatte auch
der Japaner Akira Nakashima diese Idee“.

**E4 – „Sie wird von Hunderten Relais gesteuert“ (`[geschichte]`).** Für den Differential Analyzer von 1931, an dem Shannon 1936
arbeitete, ließ sich keine Relaiszahl belegen; die Maschine rechnete mechanisch mit Wellen und Zahnrädern, Relais saßen in der
Steuerschaltung („several thousand relays“ gelten erst für den späteren Rockefeller-Analyzer). Vorschlag: „Die riesige Maschine
rechnet mit Wellen und Zahnrädern, gesteuert wird sie aber von einer verwickelten Schaltung aus Relais – genau den klickenden
Schaltern aus Folge 2.“

**E5 – Zeitabstand einheitlich (`[einstieg]` „fast hundert Jahre auseinander“ vs. `[geschichte]` „Achtzig Jahre später“).**
1847/1854 → 1937 sind 83–90 Jahre. Vorschlag: im Einstieg „gut achtzig Jahre auseinander“.

**E6 – Apollo: Quelle und Begründung (`[prinzip]`, Wusstest-du-Box, Kopf).** Shirriffs Artikel belegt die zwei NODER-Gatter je Chip,
nennt aber die Zahl 2 800 nicht. Vorschlag: Quelle ergänzen, z. B. Eldon C. Hall: Journey to the Moon. The History of the Apollo
Guidance Computer (AIAA 1996) oder Smithsonian NASM, Objekt A20170004000 (Dual-3-Input-NOR-IC). Die Begründung „für die Hersteller
einfacher, ein Bauteil in großer Zahl zu liefern“ ist nur locker belegt; belegt ist eher: „Ein einziger Chiptyp ließ sich viel
gründlicher prüfen und machte den Rechner zuverlässiger.“

**E7 – CMOS-Satz präzisieren (`[prinzip]`, „In echten Chips ist NUND sogar besonders günstig“).** NODER braucht ebenfalls vier
Transistoren; NUND wird bevorzugt, weil es bei gleicher Größe schneller schaltet. Vorschlag: „… braucht ein NUND vier Transistoren,
ein UND sechs – ein UND ist nämlich ein NUND mit einem NICHT dahinter.“ (also „besonders“ weglassen) oder Halbsatz zu NODER ergänzen.

**E8 – Achtung-Box im Bild (`[werkstatt]`).** „am Ende steht eine Lampe“ passt nicht zum Schließfach (dort eine Tür). Vorschlag:
„… und am Ende steht eine Lampe oder eine Tür.“ Der Hinkt-Satz selbst (Mensch schaltet vs. Gatter schalten Gatter) ist ein echter
Unterschied – gut.

**E9 – Ein Bild pro Folge (`[werkstatt]`).** Die README sieht ein Hauptbild pro Folge vor; hier sind es vier Mini-Bilder. Da jedes
Gatter sein eigenes Alltagsbeispiel braucht, ist das vertretbar. Die Überschrift „Logik im Hausflur“ passt aber nur zu zwei der vier
(Schließfach, Kühlschrank) – Vorschlag: „Logik im Alltag“ oder „Gatter im Haus“. Außerdem nach Freigabe die Tabelle „Bisher verwendete
Hauptbilder“ in `content/README.md` ergänzen (dort fehlt auch Folge 2, Wasserkreislauf).

**E10 – Auflösung Übung 3 vervollständigen (`[selbst]`, Auflösung).** Mit ODER statt UND ginge der Alarm nicht nur beim Lüften im
ausgeschalteten Zustand los, sondern auch bei scharfer Anlage mit allem geschlossen. Vorschlag: „… ginge der Alarm schon los, sobald
die Anlage scharf ist – und auch beim Lüften, wenn sie aus ist.“

**E11 – Karte k06 fragt zwei Dinge.** „Was ist NUND, und was ist besonders?“ Vorschlag: Vorne „Was ist an NUND-Gattern besonders?“,
Hinten „Aus NUND allein lässt sich jedes andere Gatter bauen (NUND = Gegenteil von UND).“

**E12 – Glossar: Transistor-Aussagen einschränken.** `und-gatter` und `oder-gatter` sagen „Aus Transistoren: zwei hintereinander
(nebeneinander) geschaltet“ – das gilt nur im einfachen Lampen-Modell aus Folge 2, nicht in echten Chips (die Folge selbst nennt 6
Transistoren für UND). Vorschlag: „Im einfachen Modell aus Folge 2: zwei Schalter hintereinander.“ Ebenso `logikgatter` „Kleine
Schaltung aus Transistoren“ → „heute meist aus Transistoren, früher aus Relais“ (passt zu Shannon).

**E13 – Wort „Schulmeister“ (`[einstieg]`, Überschrift `[geschichte]`).** Kein Handwerksbegriff und inhaltlich richtig, enthält aber
„Meister“ und wirkt altmodisch; falls künftig eine automatische Wortprüfung kommt, würde es anschlagen. Vorschlag: „Schullehrer“
bzw. Überschrift „Ein Lehrer rechnet mit Gedanken“.

## Zusammenfassung

Fakten (Boole 1847/1854, Shannon 1937/1938, Apollo ~2 800 Chips mit meist zwei NODER-Gattern, CMOS 4/6 Transistoren), alle
Wahrheitstabellen, die ODER-aus-drei-NUND-Schaltung und alle vier Übungen sind korrekt; jede ?-Übung hat genau eine Lösung.
Schließfach, Kühlschrank und Wechselschaltung stimmen auch elektrisch. Nicht bestanden wegen eines Fehlers: Das Treppenhauslicht
verhält sich wegen Zeit- bzw. Stromstoßschalter nicht wie ein ODER-Gatter (F1). 13 Empfehlungen.

Ergebnis: nicht bestanden
