# Faktencheck s1f02 „Strom als Sprache – Vom Relais zum Transistor“, Durchgang 1

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Inhalte nicht geschrieben)
Grundlage: `content/staffel-1/folge-02-transistor.md` (status: entwurf), Glossar-Vorschläge `/workspace/tmp/glossar-neu/s1f02.md`,
Regeln in `content/README.md` (besonders „Bilder, Grafiken und Mitmachen“), Simulator `js/sim/transistor.js` (Kopfkommentar und Code),
Vergleich mit `content/staffel-1/folge-01-bit.md`.

## Geprüft und korrekt

### Geschichte
- **Morse/Vail, 24. Mai 1844**, Washington–Baltimore, „What hath God wrought“: korrekt (Library of Congress). Strecke rund 40 Meilen ≈ 64 km, „rund 60 Kilometer“ vertretbar.
- **Joseph Henry, um 1835, Princeton (College of New Jersey), Relais**: korrekt. Das Smithsonian-Archiv datiert den Eintrag „Joseph Henry Demonstrates Primitive ‚Relay‘ Telegraph“ auf 1835 (schwacher Elektromagnet schaltet einen stärkeren Kreis). Edward Davy als Parallel-Erfinder: korrekt.
- **„Relais“ = Pferdewechselstation**: korrekt.
- **Z3**: Vorführung 12. Mai 1941, binär, Programm auf gelochtem Kinofilm, Original 1943 bei Luftangriff zerstört, Nachbau (Zuse KG, 1961) im Deutschen Museum München – alles korrekt.
  - *Relaisanzahl „rund 2 000“*: vertretbar. Gängigste Aufteilung 600 Relais im Rechenwerk + 1 400 im Speicher = 2 000 (so auch Zuse-Institut und Deutsches Museum). Andere Quellen (englische Wikipedia) nennen 2 600, das Zuse-Museum Hünfeld etwa 2 200 – je nach Zählung von Steuerwerk und Speicherlogik (siehe E1).
  - *Takt etwa 5 Schritte pro Sekunde*: korrekt (Rojas: 16 Zyklen pro Multiplikation in ca. 3 s → ≈ 5,3 Hz).
  - *Multiplikation rund 3 s*: korrekt (Rojas).
  - *„gilt vielen als erster funktionsfähiger, frei programmierbarer Rechner“*: durch „gilt vielen“ ausreichend abgesichert (siehe E1 zum fehlenden bedingten Sprung).
- **Röhre**: Glühdraht, Gitter, keine bewegten Teile, etwa tausendfach schneller als ein Relais – korrekt.
- **ENIAC**: 17 468 Röhren, rund 27 t, ca. 150 kW, etwa 5 000 Additionen/s, öffentlich vorgestellt im Februar 1946 (14./15.02.), Zehnersystem, für die US-Armee – alles korrekt. (Das Computer History Museum nennt gerundet „18,000 tubes“, „30 tons“, „5,000 operations per second“ – passt.)
- **Transistor**: Bell Labs, Gruppe um Shockley, 16.12.1947 Bardeen und Brattain, zwei Goldkontakte auf Germanium, Vorführung 23.12., Name von John Pierce, öffentlich 1948, Nobelpreis 1956 – alles korrekt. „Ein Jahr später Shannon“ (1948) passt zu Folge 1.
- **MOSFET**: Atalla und Kahng, Bell Labs, 1959 gebaut, 1960 vorgestellt – korrekt (CHM: „In 1959 … achieved the first successful insulated-gate field-effect transistor“; Meilenstein „1960 … demonstrated“).
- **Kilby September 1958 (Germanium), Noyce 1959 (Verbindungen auf der Scheibe), Nobelpreis 2000, Noyce † 1990**: korrekt.
- **Apple M1, 16 Milliarden Transistoren**: korrekt (Apple Newsroom 10.11.2020). Chipfläche ca. 120 mm² – „kleiner als eine Briefmarke“ stimmt.

### Prinzip
- **Spannung/Strom/Stromkreis**: einfache, richtige Erklärung; Handy-Akku knapp 4 V (3,7–3,9 V nominal), Steckdose 230 V – korrekt.
- **TTL-Pegel**: Eingang 0–0,8 V = 0, 2,0–5 V = 1; Ausgang höchstens 0,4 V bzw. mindestens 2,4 V; Störabstand 0,4 V – korrekt
  (TI SZZA036: „A device with an input VIH = 2 V and a VIL = 0.8 V has a TTL-compatible input“; VOL 0,4 V/VOH 2,4 V sind die Standard-TTL-Werte).
- **Warum ein Bit eindeutig gelesen wird** (Abstand, Auffrischen, Warten auf den Takt): fachlich richtig und gut erklärt. Das ist die korrekte
  Ergänzung zu Folge 1, wo der Lichtschalter „nichts dazwischen“ kennt – auf Bit-Ebene bleibt das wahr, Folge 2 zeigt, wie die Physik es herstellt.
  Kein Widerspruch zu Folge 1 (deren Hinkt-Satz behauptet seit Durchgang 4 nicht mehr, dass es physikalisch keine Zwischenwerte gibt). Verweis auf Takt in Folge 6 passt zu `config.json` (s1f06 „Takt, Holen, …“). Kleine Formulierungsfrage siehe E3.
- **Relais** (Steuerkreis, Spule, Zunge, Feder, Hauptkreis): korrekt. Simulator `art: relais`: Zunge liegt oben über der Spule und klappt beim Einschalten herunter – Text passt.
- **MOSFET**: Silizium, Source/Drain/Gate, Isolierschicht „im Grunde Glas“ (SiO₂), Kanal durch Gate-Spannung, Hinweis auf Dotierung und die umgekehrte Bauart (p-Kanal) – vertretbare, offen benannte Vereinfachung. „Durchs Gate fließt praktisch kein Strom, nur beim Umschalten kurz“ – korrekt.
- **Achtung-Box „Steuersignal“**: passt zum Simulator (Infozeile „Steuersignal an bei A“).

### Im Bild (druckgesteuertes Ventil im Wasserkreislauf)
- Trifft den Mechanismus: dünne Leitung mit Druck ohne Durchfluss ↔ isoliertes Gate mit Spannung ohne Strom; kleiner Druck steuert großen Durchfluss.
- Vorhersage-Probe bestanden: Reihe → nur wenn beide; parallel → wenn mindestens eins; Kette durch Abzweig; „Pumpe unter Druck, nichts fließt“ ↔ Spannung ohne Strom.
- „Im Bild“-Box vollständig und konsistent. Hinkt-Satz nennt einen echten Unterschied (bewegte Teile/Verschleiß/Geschwindigkeit) und sagt ehrlich, dass das Ventil eher zum Relais passt.
- Kein Hauptbild aus früherer Folge (Folge 1: Parkhaus).

### Übungen
- `s1f02-u01` reihe: Lampe = A UND B; `s1f02-u02` parallel: A ODER B; `s1f02-u03` nicht: Lampe = NICHT A. Simulator-Logik (`ANORDNUNGEN`) und Auflösungstabelle stimmen überein, alle drei sind lösbar (`_loesen` vorhanden).
- Physik der Übung 3 richtig: leitender Transistor überbrückt die Lampe, Vorwiderstand verhindert den Kurzschluss. Hinweis, dass echte Chips das anders bauen (CMOS ohne Dauerstrom), ist da.

### Quiz (q01–q07)
Je genau eine richtige Antwort, Erklärungen korrekt, Ablenker eindeutig falsch, `Nachlesen` passend. q04 (Jahreszahlen) und q06 (Röhren) stimmen mit dem Text überein.

### Karteikarten (k01–k09)
Inhaltlich korrekt (zu k07 siehe E5).

### Wo steckt das bei dir?
- USB 5 V, Schnellladen z. B. 9 V (USB PD/Quick Charge) – korrekt.
- PC-Netzteil 12 V, 5 V, 3,3 V (ATX-Norm) – korrekt; Prozessor rund 1 V über Spannungswandler auf der Hauptplatine – korrekt (typisch 0,7–1,4 V).
- Flash-Speicherzellen sind besondere Transistoren und speichern heute meist mehrere Bits (TLC/QLC) – korrekt. „Rund eine Billion Bit bei 128 GB“ passt zu Folge 1.
- VPS 1 vCPU, Cloudflare Pages – passt zu den Angaben in der README.

### Glossar-Vorschläge
Spannung, Strom, Stromkreis, Relais, Elektronenröhre, Transistor, MOSFET, Gate, Halbleiter, Silizium, Chip: inhaltlich korrekt; sie stehen bereits wortgleich in `content/glossar.md`. Zu Gleichspannung siehe F1, zu Takt siehe E6.

### Quellen-Links
| Quelle | Abruf vom VPS | Bewertung |
|---|---|---|
| CHM Point-Contact Transistor, CHM MOS 1960, Nobelpreis 1956, Nobelpreis Kilby, CHM 14. Februar, TI SZZA036, Apple Newsroom M1 | 200 | erreichbar, Inhalt passt |
| Zuse-Institut `https://zuse.zib.de/z3` | 429 (zu viele Anfragen) | Seite existiert (in Suchmaschinen gelistet), Sperre ist eine Abruf-Drosselung, kein toter Link. Plausibel |
| Library of Congress (Morse Papers, Invention of the Telegraph) | 403 | Seite existiert unter genau dieser Adresse (Suchindex), loc.gov sperrt automatische Abrufe. Plausibel; Alternative mit dem Datum: `https://www.loc.gov/item/today-in-history/may-24/` |
| Smithsonian Archives `siris_sic_12484` | 403 | Seite existiert, Titel stimmt wörtlich, datiert 1835, Inhalt passt zur Aussage. Plausibel |
| Project Gutenberg | – | steht nicht (mehr) in der Quellenliste der Folge, daher nichts zu prüfen |

Außerhalb dieser Folge, auf Wunsch mitgeprüft: **Gmail-OR** steht in Folge 3 (`folge-03-gatter.md`, Zeile 327). `from:bank OR from:versicherung` ist korrekte Gmail-Suchsyntax (OR in Großbuchstaben) und findet Mails beider Absender – richtig.

## Befunde

**F1 – Fehler: Wechselspannung wechselt nicht 50-mal, sondern 100-mal pro Sekunde die Richtung.**
Fundstelle: `[beidir]`, Absatz „Laden per USB“ („die Richtung wechselt 50-mal pro Sekunde“) und Glossar `gleichspannung`, Feld `kurz`
(„wechselt die Richtung ständig, in Europa 50-mal pro Sekunde“; steht so auch schon in `content/glossar.md`).
50 Hertz heißt 50 volle Schwingungen pro Sekunde; jede Schwingung enthält zwei Richtungswechsel (hin und zurück), also 100 Wechsel.
Korrektur: „die Spannung pendelt 50-mal pro Sekunde hin und her (50 Hertz)“ – oder „die Richtung wechselt 100-mal pro Sekunde“. Im Glossar gleich anpassen.

**F2 – Fehler: „Der Kanal schließt sich“ widerspricht „Spannung am Gate öffnet den Kanal“.**
Fundstelle: `[prinzip]`, Satz unter dem zweiten Simulator: „Tippe auf **Steuerung A**: Der Kanal schließt sich, die Lampe leuchtet.“
Zwei Absätze davor, in der Merke-Logik, in Quiz q03 und Karte k04 heißt es durchgehend „öffnet den Kanal“. Für Einsteiger klingt „schließt sich“
nach „sperrt“ – das Gegenteil dessen, was passiert. (Im Simulator wird die gestrichelte Linie durchgehend und farbig.)
Korrektur: „Tippe auf **Steuerung A**: Die gestrichelte Linie wird durchgehend – der Kanal ist offen, Strom fließt, die Lampe leuchtet.“

**F3 – Fehler: Anleitung sagt „in jeder Übung zwei Transistoren A und B“, Übung 3 hat nur einen.**
Fundstelle: `[selbst]`, erster Absatz: „In jeder Übung steuerst du zwei Transistoren A und B mit je einem Schalter.“
Übung 3 (`anordnung: nicht`) hat nur Transistor A und eine zweispaltige Tabelle (A, Lampe).
Korrektur: „In den ersten beiden Übungen steuerst du zwei Transistoren A und B mit je einem Schalter, in der dritten nur einen.“

**E1 – Empfehlung: Z3-Relaiszahl und „frei programmierbar“ etwas absichern.**
Fundstelle: `[geschichte]`, „Ein Rechner, der klappert“. „Rund 2 000“ ist gut belegt (600 + 1 400), andere Quellen zählen bis 2 600. Möglich:
„aus rund 2 000 Relais (je nach Zählung bis 2 600)“ – oder so lassen. Zusätzlich könnte ein Halbsatz sagen, dass die Z3 keine bedingten Sprünge
kannte („allerdings noch ohne ‚Wenn–dann‘-Befehle“), denn genau darum ist der Titel „erster Computer“ umstritten.

**E2 – Empfehlung: „Strom fließt von Source nach Drain“ neutral formulieren.**
Fundstelle: `[prinzip]`, Liste unter „Der Transistor“. Beim üblichen n-Kanal-MOSFET wandern die Elektronen von Source nach Drain, der Strom in
der technischen Richtung (die der Text oben selbst einführt: „vom Pluspol … zum Minuspol“) fließt aber von Drain nach Source.
Vorschlag: „… und Strom fließt zwischen Source und Drain – Schalter an.“

**E3 – Empfehlung: Bezug auf Folge 1 genauer formulieren; „Strom“ → „Spannung“.**
Fundstelle: `[prinzip]`, „Aus Spannung wird ein Bit“. Folge 1 sagt nicht wörtlich, dass ein Bit „immer eindeutig gelesen wird“, sondern dass ein Bit
nur 0 oder 1 ist, „nichts dazwischen“. Vorschlag: „Wie passt das zu Folge 1, wo ein Bit nur 0 oder 1 ist und nichts dazwischen?“
Außerdem geht es im Satz „Strom ist kein Lichtschalter mit Einrasten“ um Spannungswerte: besser „Eine Spannung rastet nicht ein wie ein Lichtschalter.“

**E4 – Empfehlung (Simulator, nicht Text): Stromanimation in Übung 3 korrigieren.**
Fundstelle: `js/sim/transistor.js`, Zweig `anordnung === 'nicht'`. Leitet der Transistor, wird das Drahtstück vom Widerstand bis zum Abzweig
(x 154 → 200) dunkel gezeichnet, obwohl der Strom dort weiter fließt; dafür bleibt der untere Rückweg rechts vom Abzweig (x 300 → 200) „an“, obwohl
durch die Lampe nichts fließt. Vorschlag: oberes Stück `M154 O H200` immer an, `M200 O H R V75` und `M R 125 V U H200` nur bei `!durchT`, `M200 U H L V124` immer an.

**E5 – Empfehlung: Karte k07 fragt zwei Dinge.**
Fundstelle: `[karten]`, `s1f02-k07` (hintereinander *und* nebeneinander). Die README verlangt eine Sache je Karte. Vorschlag: k07 auf „hintereinander“
beschränken und eine neue Karte `s1f02-k10` für „nebeneinander“ anlegen (ID k07 bleibt erhalten).

**E6 – Empfehlung: Glossar-Vorschlag `takt` nicht übernehmen.**
Fundstelle: `/workspace/tmp/glossar-neu/s1f02.md`, letzter Eintrag. `content/glossar.md` hat bereits einen Eintrag `id: takt` (Folge 6); ein zweiter
mit derselben ID wäre eine Dublette. Inhaltlich ist der Vorschlag richtig; wer will, ergänzt im bestehenden Eintrag bei `mehr` den Satz „Zuses Z3 (1941) schaffte etwa 5 Takte pro Sekunde.“

**E7 – Empfehlung: Hauptbild in die README-Liste eintragen.**
Fundstelle: `content/README.md`, Tabelle „Bisher verwendete Hauptbilder“. Zeile ergänzen: `| s1f02 Transistor | Druckgesteuertes Ventil im Wasserkreislauf |`.

**E8 – Empfehlung: ENIAC-Ausfälle etwas vorsichtiger und mit Quelle für 17 468.**
Fundstelle: `[geschichte]`, „Glühende Röhren“ („Bei Tausenden Röhren war ständig eine kaputt“) und q06-Erklärung („ständig fiel eine aus“). Am Anfang
fielen mehrere Röhren pro Tag aus, nach Verbesserungen etwa alle zwei Tage eine – „fiel regelmäßig eine aus“ trifft es genauer. Die Quelle im Kopf (CHM)
nennt nur gerundet 18 000 Röhren und 30 (amerikanische) Tonnen; für 17 468 / 27 t könnte eine Quelle der University of Pennsylvania (Penn Engineering, ENIAC) ergänzt werden.

## Zusammenfassung

3 Fehler (F1 Wechselspannung 50- statt 100-mal Richtungswechsel, F2 „Kanal schließt sich“, F3 Übungs-Anleitung „zwei Transistoren“), 8 Empfehlungen.
Die Kernfakten (Z3, ENIAC, Henry, Transistor, MOSFET, IC, TTL-Pegel, M1, Spannungen) sind korrekt, das Bild ist stimmig, Übungen und Quiz sind richtig.

Ergebnis: nicht bestanden
