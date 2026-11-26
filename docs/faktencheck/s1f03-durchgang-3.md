# Faktencheck s1f03 „Logikgatter“, Durchgang 3 (Umstellung auf das neue Format)

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Folge nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-03-gatter.md` (`status: entwurf`), ganze Datei; Schwerpunkt auf den Änderungen
gegenüber dem freigegebenen Stand (`git diff HEAD`) und den Prüfpunkten 8–10 (Folge steht für sich, „Auf den Punkt“, Lernpool).
Mitgeprüft: `content/README.md` (Format, „Jede Folge steht für sich“, „Bilder“), Berichte Durchgang 1 und 2, `folge-02-transistor.md`
und Glossar-Eintrag `transistor` (Abgleich der neu eingefügten Kurz-Erklärungen), `npm run pruefen` (Format und `Nachlesen`-Stellen
fehlerfrei; gemeldet werden nur veraltete erzeugte Dateien in `inhalt/`, das ist erwartet). Keine Glossar-Vorschlagsdatei für diese Runde.

## Geprüft und in Ordnung

### Geänderte und neue Sätze
- **Einstieg** ohne Rückgriff auf Folge 2: Transistor wird neu erklärt, Reihen-/Parallelschaltung = „nur, wenn beide“ / „mindestens
  einer“ – inhaltlich richtig (zur Formulierung „kleiner Strom“ siehe F1).
- **Relais** „klickende Schalter, die ein kleiner Strom umlegt (mehr dazu in Folge 2)“ – richtig (Relais sind stromgesteuert).
- **Shannon** „elf Jahre später macht er bei den Bell Labs auch das Bit bekannt (mehr dazu in Folge 1)“ – 1937 → 1948, richtig; reiner
  Verweis, zum Verstehen nicht nötig.
- **Wusstest du? (Bit)** – richtig, setzt Folge 1 nicht voraus (siehe E2 zur knappen Bit-Erklärung).
- **„Das passt zu den Schaltern aus der Einleitung …“** – bezieht sich jetzt auf die eigene Folge, richtig.
- **NICHT, elektrisch:** Schalter, der den Strom an der Lampe vorbei ableitet → Lampe aus; Wahrheitstabelle 0 → 1, 1 → 0 – richtig
  (Ergänzung siehe E1).
- **Klingel:** „Es genügt, dass einer den Strom durchlässt“ – richtig, Parallelschaltung = ODER.
- **Selbst machen, Einleitung:** Bedienanleitung jetzt ohne „wie in Folge 2“ und deckt sich mit `schaltung.js` (Zeile antippen, Ausgang
  ? → 0 → 1; Gatter-Knopf mit Fragezeichen).
- **Übung 3:** „jeder Schalter verdoppelt die Möglichkeiten“, 2 × 2 × 2 = 8 – richtig, ohne Folge-1-Rückgriff.
- **Beidir** (nur verschoben, Satz zu Folge 4 umformuliert): unverändert korrekt; Ausblick auf Folge 4 ist zum Verstehen nicht nötig.
- Simulator-Einstellungen und Übungen sind gegenüber Durchgang 2 unverändert (dort nachgerechnet: u01 0110, u02 ODER, u03 ODER/UND,
  u04 NUND – alle eindeutig lösbar).

### Prüfpunkt 8 – Folge steht für sich
- Keine Bilder oder Geschichten anderer Folgen mehr (Parkhaus, Ventil usw. kommen nicht vor; die frühere „Abkürzung an der Lampe vorbei
  aus Folge 2“ und „Tabellen, die du in Folge 2 ausgefüllt hast“ sind ersetzt).
- Nötiges Vorwissen (Transistor, Relais, Bit) wird jeweils in einem Satz neu erklärt und mit Verweis versehen.
- Alle verbleibenden „Folge N“-Stellen sind Verweise oder Ausblicke (Zeilen 22, 38, 44, 71, 221, 225), keine Voraussetzung.
- Das Hauptbild (Alltagsschaltungen) ist eigenständig und in der README-Tabelle nur für s1f03 eingetragen.

### Prüfpunkt 9 – Auf den Punkt
Vier Kernsätze: Gatter + Wahrheitstabelle; UND/ODER/NICHT/XODER; NUND/NODER + NUND universell; Boole/Shannon. Das trifft genau das
Wichtigste der Folge, alle vier Sätze sind fachlich richtig (kleine Feinheit siehe E5).

### Prüfpunkt 10 – Lernpool
- **q01** (UND), **q02** (Tabelle → XODER), **q04** (NUND), **q05** (Alarmanlage), **q06** (Kühlschrank): ohne Folge verständlich,
  verständnisorientiert, je genau eine richtige Antwort. Der Schließfach-Vergleich in der q01-Erklärung ist jetzt selbsterklärend
  („Schließfach mit zwei Schlössern“).
- **q03** erklärt „Relais“ jetzt in der Frage selbst; richtige Antwort eindeutig; „Das Bit machte er erst 1948 bekannt“ richtig.
- **q07 (neu):** Frage „Wie machte Boole aus ‚und‘ eine Rechnung?“ ist verständnisorientiert statt Titelabfrage – gute Änderung.
  Richtige Antwort (1/0 für wahr/falsch, „und“ = Multiplikation) stimmt mit Booles Algebra überein (Konjunktion als Produkt xy; in den
  „Laws of Thought“ stehen 1 und 0 für wahr/falsch bei Aussagen). Ablenker eindeutig falsch: Addition mit 1 + 1 = 2 ist gerade nicht
  „und“ (bei Boole steht + für ein ausschließendes „oder“); „Abstand auf dem Zahlenstrahl“ und „Zahl von 1 bis 10“ haben keinen Bezug.
  Erklärung richtig: Unter den Produkten aus 0 und 1 ergibt nur 1 × 1 wieder 1. Längenhinweis siehe E3.
- **Nachlesen-Stellen** aller sieben Fragen zeigen auf die passende Zwischenüberschrift (vom Build geprüft und von mir abgeglichen).
- **Karten k01–k08:** für sich verständlich, je eine Sache; k02/k03 ohne Bezug auf die Transistor-Schaltung aus Folge 2, k07 fragt jetzt
  nach dem Begriff statt nach der Person – gut; k08 erklärt „Relais“ selbst.

## Befunde

### Fehler

**F1 – Transistor als „von einem kleinen Strom geschaltet“ (Einstieg, Zeile 22, neuer Satz).**
„Ein **Transistor** ist ein winziger elektrischer Schalter, den ein kleiner Strom ein- und ausschaltet“ widerspricht Folge 2, auf die
verwiesen wird: Dort heißt es ausdrücklich „Der große Unterschied zum Relais: Durchs Gate fließt praktisch kein Strom … Es genügt die
Spannung“ (folge-02-transistor.md, Zeile 127), und das Glossar sagt „Ein Steuersignal entscheidet“. Für die Transistoren in Prozessoren
(MOSFET), um die es in dieser Folge geht („jeder Prozessor der Welt“), ist die Aussage falsch; zwei Absätze später werden Relais fast
wortgleich beschrieben („Schaltern, die ein kleiner Strom umlegt“), sodass Transistor und Relais für Einsteiger ununterscheidbar werden.
Korrekturvorschlag: „Ein **Transistor** ist ein winziger elektrischer Schalter ohne bewegliche Teile, den eine kleine elektrische
Spannung ein- und ausschaltet (mehr dazu in Folge 2).“ (Alternativ „den ein elektrisches Steuersignal …“.)

### Empfehlungen

**E1 – NICHT elektrisch (Prinzip, Zeile 77).** „Er schließt den Strom kurz, die Lampe geht aus“ ist als „die Lampe wird überbrückt“
richtig, klingt für Einsteiger aber nach einem Kurzschluss der Batterie. Folge 2 nennt dafür den Widerstand vorn im Kreis. Vorschlag:
„… sobald er eingeschaltet ist: Der Strom nimmt den bequemen Weg an der Lampe vorbei, die Lampe geht aus. (Ein Widerstand davor sorgt
dafür, dass dabei kein echter Kurzschluss entsteht.)“

**E2 – Bit kurz erklären (Geschichte, Zeile 38/44).** „Bit“ fällt in Zeile 38 ohne Erklärung, die Wusstest-du-Box sagt nur „die beiden
Zustände eines Bits“. Vorschlag in der Box: „… die beiden Zustände eines **Bits**, der kleinsten Einheit der Information (mehr dazu in
Folge 1).“

**E3 – q07: richtige Antwort ist die längste.** Richtig ≈ 73 Zeichen, Ablenker 42–58. Vorschlag: richtige Antwort kürzen, z. B.
„Wahr wird 1, falsch wird 0, „und“ wird zum Malnehmen“, oder Ablenker etwas verlängern (z. B. „Jede Aussage bekommt je nach Wichtigkeit
eine Zahl von 1 bis 10“).

**E4 – q03 nennt Person und Jahr.** Die Frage zielt auf Verständnis, beginnt aber mit Name und Jahreszahl. Optional neutraler: „Welche
Entdeckung über Relaisschaltungen (Schalter, die ein kleiner Strom umlegt) machte Claude Shannon 1937?“ – oder ganz ohne Namen:
„Was bedeutete es, als man erkannte, dass Relais hintereinander wie ‚und‘ und nebeneinander wie ‚oder‘ wirken?“

**E5 – Fazit, 4. Satz.** „… darum bestehen Prozessoren aus Gattern“ verkürzt die Ursache (Gatter gibt es wegen der Schaltbarkeit von
Strom; Shannons Beitrag war die Methode). Vorschlag: „… Shannon zeigte, dass sie genau auf Schaltungen passt – seitdem kann man jede
logische Regel als Schaltung aus Gattern bauen.“

**E6 – Einstieg, Satzbau (Zeile 22).** „Hintereinander geschaltet, fließt der Strom „nur, wenn beide“ an sind“ liest sich holprig.
Vorschlag: „Hintereinander geschaltet lassen sie den Strom nur durch, wenn beide an sind; nebeneinander, wenn mindestens einer an ist.“

Ergebnis: nicht bestanden
