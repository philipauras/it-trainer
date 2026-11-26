# Faktencheck s1g – Durchgang 1

- **Datum:** 26.11.2026
- **Geprüfte Datei:** `content/staffel-1/abschluss-addierer.md` (Abschlussprojekt „Ein Rechner aus Gattern“)
- **Mitgeprüft:** `/workspace/tmp/glossar-neu/s1g.md`, Simulatoren `js/sim/schaltung.js` und `js/sim/addierer.js` (Kopfkommentare und Logik), Bezüge zu `folge-02-transistor.md`, `folge-04-binaer.md`, `folge-06-prozessor.md`, `config.json`
- **Prüfer:** unabhängige Prüfung (Agent, nicht Autor der Folge)

## Was geprüft und bestätigt wurde

- **Stibitz „Model K“:** 1937, Bell Labs, ausgemusterte Relais, Taschenlampenbirnchen, Blechstreifen als Eingabe, Küchentisch, K = *kitchen*, Addition zweier einstelliger Binärzahlen. Das stimmt mit dem CHM-Eintrag zu 1937 überein („Bell Laboratories scientist George Stibitz uses relays for a demonstration adder“, auf dem Küchentisch gebaut, führte 1939 zum Model I Complex Calculator). Der Monat November 1937 steht nicht beim CHM, ist aber durch Stibitz' eigene Berichte üblich belegt. Dass das Gerät im Ergebnis einem Halbaddierer entspricht, ist vertretbar und passt zu Folge 4. „Daraus wurde bald ein richtiger Relais-Rechner“ (Complex Number Calculator, 1939/40) stimmt.
- **Zuse:** Z1 1936–1938 gebaut, mechanisch, aus gesägten Blechen, binär (Gleitkomma), unzuverlässig: stimmt. Z3 1941 (Vorführung am 12. 5. 1941), Telefonrelais, Original bei einem Luftangriff auf Berlin Ende 1943 zerstört, Nachbau von Zuse selbst (1960er-Jahre) im Deutschen Museum München: stimmt, auch laut CHM-Eintrag zu 1941. „Gilt als erster funktionsfähiger programmgesteuerter Digitalrechner“ ist die übliche Formulierung (auch Deutsches Museum und Zuse-Literatur). Durch das „gilt als“ ist die Einordnung vertretbar (umstritten ist eher „Universalrechner“, das behauptet der Text nicht).
- **Intel 4004:** 1971 (angekündigt am 15. 11. 1971), für den Busicom-Tischrechner 141-PF (Busicom bzw. Mutterfirma Nippon Calculating Machine Corp., Japan), etwa 2 300 Transistoren, 4-Bit-Datenbreite, gilt als erster käuflicher Mikroprozessor: stimmt (Intel, IEEE Spectrum „Chip Hall of Fame“, Guinness). „4 Bit reichen für eine Dezimalziffer“ (BCD, 6 Muster übrig) stimmt.
- **Rechenbeispiele:** 5 + 6 = `1011` = 11; 3 + 4 = `0111` ohne Übertrag; 7 + 1 = `1000` mit drei Überträgen hintereinander; 12 + 6 = 18 = `10010` → `0010` = 2; 15 + 15 = 30 = `11110` → `1110` = 14; 200 + 100 = 300 → 44; 2⁶⁴ − 1 = 18 446 744 073 709 551 615 (≈ 1,8 × 10¹⁹, also rund 18 Trillionen); 2³² − 1 = 4 294 967 295. Alles nachgerechnet und richtig.
- **Volladdierer:** Wahrheitstabelle (C = `00010111`, S = `01101001`) nachgerechnet, sie passt zur Simulator-Schaltung. Die Aussage, dass C1 und C2 nie gleichzeitig 1 sind und darum auch ein XODER ginge, stimmt.
- **Übung s1g-u01:** Ich habe alle 9 Kombinationen der Auswahl (UND/ODER/XODER) durchgerechnet. Einzige Lösung ist C1 = UND, C2 = UND, also lösbar und eindeutig. Auch das Gegenbeispiel stimmt: Ein ODER bei C1 ergibt für A=1, B=0, Cein=0 die Ausgabe `11` = 3.
- **Übung s1g-u02:** Die Ziele `3+4, 7+1, 5+6` sind im Simulator einstellbar (Stellenwerte 8/4/2/1 stehen oben). Die Auflösungen sind rechnerisch richtig („Übertrag in der dritten Stelle, 4 + 4 = 8“ stimmt).
- **Übung s1g-u03:** Ziel `ueberlauf` wird bei jedem Endübertrag erreicht. Die Erklärung (ab 16, kleinste Summe 16, größte 30) stimmt.
- **Ripple-Carry, Carry-Lookahead** (erzeugen = beide 1, weiterreichen = genau eins 1), **ALU in Folge 6**: stimmen fachlich (vgl. Harris & Harris, Kap. 5.2).
- **„Wo steckt das bei dir?“:** Pixel mit 64-Bit-ARM: stimmt. Der VPS meldet `x86_64` und hat 1 vCPU (geprüft mit `uname -m` und `nproc`). Windows 11 gibt es nur als 64-Bit-Version (x64/ARM64): stimmt. Das Übertrags-Flag gibt es bei x86 (CF) und ARM (C-Flag in NZCV): stimmt. Große Zahlen werden mit mehreren Additionen und weitergereichtem Übertrag gerechnet (x86 `ADC`, ARM `ADC`/`ADCS`, z. B. für RSA in Krypto-Bibliotheken): stimmt.
- **Bild (Dominoreihe):** Es trifft den Mechanismus. Die Vorhersage „64 Stellen brauchen im schlimmsten Fall etwa 16-mal so lange“ ist richtig, weil die Verzögerung linear wächst. Der „Achtung“-Satz nennt einen echten Unterschied: Bei beiden Bits 0 wird die Welle gestoppt, bei beiden Bits 1 startet eine neue Welle. Das Bild ist laut Hauptbilder-Liste nicht schon vergeben. Bitte nach dem Bestehen in die Liste in `content/README.md` eintragen.
- **Quiz:** Jede der 7 Fragen hat genau eine richtige Antwort, die Erklärungen stimmen. q04: 8 + 4 und 2 + 1 haben tatsächlich keinen Übertrag.
- **Format:** Alle 8 Abschnitte in der richtigen Reihenfolge, Simulator im Prinzip, 3 Übungen, 7 Quizfragen, 9 Karten. Keine verbotenen Handwerks-Wörter. `art: abschlussprojekt` steht in `config.json`.

## Fehler

### F1 – Übertrag im Rechenbeispiel steht über der falschen Spalte
**Fundstelle:** `[prinzip]` → „Was der Halbaddierer nicht kann“, Codeblock 5 + 6.
Im Codeblock steht die Übertrags-1 an Zeichenposition 15, also über der **2er-Spalte** (dritte Ziffer von links). Der Übertrag entsteht aber in der 4er-Spalte und gehört über die **8er-Spalte** (erste Ziffer von links, Position 11). Der Text darunter sagt das richtig („Vierte Stelle: 0 + 0 + 1 vom Übertrag“). Die Grafik widerspricht ihm also und lehrt Einsteigern eine falsche Lage des Übertrags.
**Korrektur:** Die Übertrags-1 über die vorderste Ziffer setzen, z. B.:
```
Übertrag:  1
           0 1 0 1    (5)
         + 0 1 1 0    (6)
         ---------
           1 0 1 1    (11)
```
(Die Übertrags-1 steht hier an Position 11, genau über der ersten Ziffer.)

### F2 – Glossar „Relais“: „Die ersten Rechenmaschinen rechneten mit Relais“ ist falsch
**Fundstelle:** `/workspace/tmp/glossar-neu/s1g.md`, Eintrag `relais`, Feld `mehr`.
Rechenmaschinen gibt es seit dem 17. Jahrhundert (Schickard, Pascal, Leibniz), und sie waren mechanisch. Auch Zuses Z1 (1938) war rein mechanisch. Relais nutzten erst frühe **elektrische** bzw. programmgesteuerte Rechner.
**Korrektur:** „Frühe elektrische Rechner wie Stibitz' Model K (1937) und Zuses Z3 (1941) rechneten mit Relais; später ersetzten Röhren und Transistoren sie.“
*Hinweis:* Dieselbe falsche Aussage steht auch in `glossar-neu/s1f04.md` („Die ersten Rechenmaschinen um 1940 …“). Das gehört nicht zu dieser Prüfung, sollte aber gleich mitkorrigiert werden.

## Empfehlungen

### E1 – Intel-Quelle: Link prüfen bzw. ersetzen
**Fundstelle:** Kopf, `quellen`, Intel „The Story of the Intel 4004“.
Beim Abruf am 26.11.2026 leitete die URL auf Intels 404-Weiterleitung um. Möglicherweise sperrt Intel nur automatische Abrufe, die Seite sollte aber im Browser geprüft werden. Belastbare Ersatz- oder Zusatzquelle für 15. 11. 1971, Busicom, 2 300 Transistoren und 4 Bit: IEEE Spectrum, „Chip Hall of Fame: Intel 4004 Microprocessor“ | https://spectrum.ieee.org/chip-hall-of-fame-intel-4004-microprocessor. Daneben die Intel-Seite „Announcing a New Era of Integrated Electronics“ | https://www.intel.com/content/www/us/en/history/virtual-vault/articles/the-intel-4004.html (bestätigt Busicom und 1971, nennt aber keine Transistorzahl).

### E2 – Deutsches Museum: Quelle verweist nur auf die Startseite
**Fundstelle:** Kopf, `quellen`, „Deutsches Museum: Konrad Zuse und die Z3“.
Eine eigene Objektseite zum Z3-Nachbau habe ich auf deutsches-museum.de nicht gefunden. Vorschläge:
- **Fachquelle (empfohlen):** Raúl Rojas: „Konrad Zuse's Legacy: The Architecture of the Z1 and Z3“, *IEEE Annals of the History of Computing* 19 (2), 1997, S. 5–16. Sie belegt Z1/Z3, Binärrechnung, Relais und die Einordnung.
- **Erinnerungen Zuses:** Konrad Zuse: *Der Computer – Mein Lebenswerk*, Springer (mehrere Auflagen, z. B. 5. Aufl. 2010).
- Den Nachbau im Deutschen Museum belegt bereits die vorhandene CHM-Quelle zu 1941 („reconstruction … Deutsches Museum in Munich“). Die Startseiten-Quelle kann also entfallen oder durch „Deutsches Museum, Ausstellung Informatik (Z3-Nachbau von K. Zuse, 1960er-Jahre)“ ohne Link ersetzt werden.

### E3 – 4004: „ein komplettes Rechenwerk“ untertreibt
**Fundstelle:** `[geschichte]`, 3. Absatz.
Der 4004 war ein kompletter **Prozessor** (Rechenwerk, Steuerwerk, Register). „Rechenwerk“ wird später in der Folge als ALU definiert, und das ist nur ein Teil davon.
**Vorschlag:** „… passte ein kompletter Prozessor – samt Rechenwerk – auf ein Stück Silizium …“. Optional: „gilt als erster käuflicher Mikroprozessor“ (es gab zeitgleiche Konkurrenten wie TI TMS1802).

### E4 – Übertrags-Flag: verallgemeinert, und vorzeichenlos vs. mit Vorzeichen fehlt
**Fundstelle:** `[prinzip]` „Wenn die Stellen nicht reichen“; Glossar `uebertrags-flag`.
„Echte Prozessoren … merken sich den letzten Übertrag“ gilt für x86 und ARM, aber z. B. RISC-V hat kein Flag-Register. Außerdem zeigt das Carry-Flag nur bei Zahlen **ohne Vorzeichen** einen Überlauf an. Für Zahlen mit Vorzeichen gibt es ein eigenes Overflow-Flag. Das kann später verwirren.
**Vorschlag:** „Verbreitete Prozessoren wie x86 und ARM merken sich …“ und ein Satz: „(Für Zahlen mit Vorzeichen gibt es dafür ein eigenes Flag, das Overflow-Flag – das ist eine andere Geschichte.)“

### E5 – „ripple“ ist nicht „rieseln“
**Fundstelle:** `[prinzip]`, Karte s1g-k04, Glossar `ripple-carry-addierer`.
Im Prinzip-Text steht richtig „ripple = sich kräuseln“, Karte k04 legt aber nahe, dass *ripple* „rieseln“ heißt. Gemeint ist eine Welle, die sich fortpflanzt.
**Vorschlag:** In k04 und im Glossar „der Übertrag läuft wie eine Welle (englisch *ripple*) von Stelle zu Stelle nach links“. Das passt auch besser zur Dominowelle.

### E6 – Auflösung u01: XODER rechnet nicht überall „die Summe“
**Fundstelle:** `[selbst]` Bauabschnitt 1, Auflösung, letzter Satz.
Ein XODER bei C1 liefert die Zwischensumme X, erst bei C2 kommt genau die Summe S heraus.
**Vorschlag:** „Ein XODER an diesen Stellen würde dagegen die (Zwischen-)Summe ein zweites Mal ausrechnen statt des Übertrags.“

### E7 – Carry-Lookahead als Stellvertreter
**Fundstelle:** `[prinzip]` „Und in echten Prozessoren?“
Heutige Prozessoren nutzen meist Weiterentwicklungen (Parallel-Präfix-Addierer wie Kogge-Stone). Das Prinzip „Überträge vorab ausrechnen“ ist dasselbe, also keine falsche Vorstellung.
**Vorschlag:** „Dieses Verfahren heißt Carry-Lookahead … (heute meist in noch schnelleren Abwandlungen)“.

### E8 – „Befehle aus dem Speicher (Flipflops, Folge 5)“
**Fundstelle:** `[selbst]` „Das hast du gebaut“, letzter Absatz.
Der Arbeitsspeicher besteht heute aus DRAM (Kondensatoren), nicht aus Flipflops. Flipflops stecken in Registern und Caches. Als Vereinfachung im Rückblick vertretbar.
**Vorschlag:** „(Speicher und Register, Folge 5)“.

### E9 – Glossar: doppelte IDs in mehreren `glossar-neu`-Dateien
**Fundstelle:** `glossar-neu/s1g.md` gegenüber `s1f02.md`/`s1f04.md`.
`relais`, `halbaddierer`, `uebertrag`, `volladdierer`, `ueberlauf` und `xoder` sind mehrfach angelegt, mit unterschiedlichem Text, unterschiedlichen `woerter` (z. B. `ueberlauf`: „überläuft, Überläufe“ gegenüber „überlaufen, läuft über“) und teils anderem `folge` (`volladdierer`/`ueberlauf`: s1f04 gegenüber s1g). Beim Übernehmen in `glossar.md` je ID einen Eintrag zusammenführen. Für `volladdierer`, `ueberlauf` und `ripple-carry-addierer` ist `folge: s1g` sinnvoller, weil sie erst hier ausführlich erklärt werden. `woerter` zusammenlegen.

### E10 – Quiz q01: Ablenker „nur Zahlen bis 1“ ist halb wahr
**Fundstelle:** s1g-q01, erste Antwort.
Auch der Volladdierer verarbeitet je Eingang nur ein Bit (0 oder 1). Der Ablenker ist nicht falsch, er ist nur nicht der Grund, und das kann aufmerksame Lernende verunsichern.
**Vorschlag:** z. B. „Weil er bei 1 + 1 die falsche Summe liefert“.

### E11 – „ARM-Architektur“ nicht erklärt
**Fundstelle:** `[beidir]` „Dein Pixel“.
**Vorschlag:** „… mit ARM-Architektur (einer Prozessorfamilie, die besonders stromsparend ist und deshalb in fast allen Handys steckt) …“.

### E12 – Karten mit zwei Fragen
**Fundstelle:** s1g-k07 (wie + wozu), s1g-k08 (wann + was), s1g-k09 (was + wie breit).
Die Regel ist „eine Sache je Karte“. Die Karten sind kurz und gut lernbar, deshalb nur eine Empfehlung: aufteilen oder auf eine Frage kürzen (z. B. k09: „Wie breit rechnete der Intel 4004 (1971), der erste käufliche Mikroprozessor?“ → „4 Bit“).

### E13 – Z3-Einordnung mit Folge 2 angleichen
**Fundstelle:** `[geschichte]` 2. Absatz gegenüber `folge-02-transistor.md` („gilt vielen als erster funktionsfähiger, frei programmierbarer Rechner“).
Beide Formulierungen sind vertretbar, die Serie sollte aber dieselbe Einordnung verwenden. Empfehlung: in beiden Folgen „gilt als erster funktionsfähiger programmgesteuerter Digitalrechner“.

## Zusammenfassung

2 Fehler (F1 Grafik zum Übertrag, F2 Glossar Relais), 13 Empfehlungen. Inhaltlich ist die Folge sonst sehr solide: Alle Jahreszahlen und Zahlen stimmen, die Übungen sind lösbar und richtig aufgelöst, das Bild trifft den Mechanismus.

Ergebnis: nicht bestanden
