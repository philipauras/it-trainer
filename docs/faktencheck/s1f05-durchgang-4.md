# Faktencheck s1f05 „Wie sich ein Computer etwas merkt“ – Durchgang 4 (Umstellung auf das neue Format)

- **Datum:** 26.11.2026
- **Geprüfte Datei:** `content/staffel-1/folge-05-speicher.md` (status: entwurf)
- **Anlass:** Umstellung auf das neue Format (Folge steht für sich, Abschnitt `[fazit]` „Auf den Punkt“, Quiz/Karten im Lernpool). Die Folge hatte Durchgang 3 bestanden.
- **Vergleich:** `git diff HEAD -- content/staffel-1/folge-05-speicher.md` – geändert: Einstieg (Gatter/Addierer neu erklärt), Geschichte (Transistor neu erklärt), NODER-Satz, Register-Satz (Byte), Adressbits-Satz, Übung 1 Schlusssatz, Übung 2 Einleitung, `[beidir]` vor das Quiz verschoben (Gibibyte-Satz neu), `[fazit]` neu, q01 Fragetext, alle `Nachlesen:` mit Stelle, q07 neu, q08 Fragetext neu.
- **Mitgeprüft:** Kopfkommentare `js/sim/flipflop.js` und `js/sim/zuordnen` (unverändert), Querverweise gegen `folge-01-bit.md` und `folge-04-binaer.md`. Glossar-Entwurf `/workspace/tmp/glossar-neu/s1f05.md` existiert nicht.
- **Prüfer:** unabhängige Prüfung (Agent, nicht Autor der Folge)

## Schwerpunkt 1: Folge steht für sich (Prüfpunkt 8)

- Einstieg: Logikgatter („kleine Schaltungen, die aus an/aus-Signalen … nach einer festen Regel ein Ergebnis bilden“) und Addierer werden in je einem Satz neu erklärt, mit Verweis. Gut.
- Geschichte: Transistor als „heutiger winziger elektrischer Schalter (mehr dazu in Folge 2)“. Gut.
- NODER wird vollständig erklärt („genau dann 1, wenn beide Eingänge 0 sind“). Byte („acht Bit“) erklärt. Verdopplung je Adressbit erklärt (Verweis Folge 1 stimmt, dort steht die Verdopplung). Gibibyte erklärt (Verweis Folge 1 stimmt, dort stehen KiB/MiB/GiB). Cache in einem Satz erklärt (Ausblick Folge 7).
- Kein Rückgriff auf Bilder oder Geschichten anderer Folgen mehr (früher „die Zahl 80 aus Folge 4“, „Erinnerst du dich an Folge 4?“ – entfernt). Ampel-Bild gehört nur zu dieser Folge.
- **Aber:** Verweis in Übung 2 zeigt auf die falsche Folge, siehe F1.

## Schwerpunkt 2: Auf den Punkt (Prüfpunkt 9)

Vier Kernsätze – Zahl stimmt, sie treffen das Wichtigste (Rückkopplung, RS-Flipflop, Register/RAM, SRAM/DRAM, flüchtig).
- Satz 1 (Rückkopplung, „solange Strom fließt“): richtig.
- Satz 2 (S speichert 1, R löscht, beide aus = halten, beide an verboten): richtig.
- Satz 3 „Acht Flipflops bilden ein Register im Prozessor“: als Beispiel richtig, als Definition zu eng (echte Register haben heute meist 64 Bit; im Text steht korrekt „zum Beispiel“). Siehe E1.
- Satz 4 „SRAM … steckt im Cache; DRAM (ein Kondensator je Bit) ist klein und billig …“: SRAM im Cache richtig (6T-Zelle, Standard; eDRAM-Caches einzelner Prozessoren sind Ausnahmen, Vereinfachung vertretbar). DRAM: Auffrischen und flüchtig richtig. Es fehlt aber gerade die Kernaussage der Folge, dass DRAM **der große Arbeitsspeicher** ist; und „DRAM ist klein“ kann neben „großer Arbeitsspeicher“ verwirren (gemeint: wenig Platz pro Bit). Siehe E2. Kein Fehler, da nichts Falsches gesagt wird.

## Schwerpunkt 3: Lernpool-Tauglichkeit (Prüfpunkt 10) und geänderte Fragen

- **q01** (Logikgatter statt Gatter): verständlich ohne Folge, Nachlesen-Stelle „Der Trick: den Ausgang zurückführen“ passt.
- **q02–q06:** unverändert bis auf `Nachlesen:`; alle Stellen existieren und passen (q02 → RS-Flipflop, q03/q04 → „Dein echter Arbeitsspeicher …“, q05/q06 → „Viele Register: der Arbeitsspeicher“, dort stehen Wahlfreiheit und Adressbits). Verständnisorientiert.
- **q07 (neu, Magnetring):** jetzt Verständnis statt Jahreszahl – gut. Richtige Antwort „Durch die Richtung seiner Magnetisierung“ stimmt (CHM: Kernspeicher, zwei Magnetisierungsrichtungen). Ablenker eindeutig falsch: Kondensator (DRAM), zwei gekoppelte Röhren (Röhren-Flipflop), Lämpchen. Die Frage verrät die Antwort nicht (das Wort „magnetisch“ fehlt im Fragetext). Erklärung: Halbstrom-Prinzip vereinfacht („Strom in einem waagerechten und einem senkrechten Draht traf genau einen Ring“ – im Text der Folge korrekt mit „halb so viel“ ausgeführt), „behielt seinen Inhalt auch ohne Strom“ richtig (nichtflüchtig), „bis in die 1970er üblich; erst DRAM-Chips lösten ihn ab“ richtig. Whirlwind mit Kernspeicher August 1953 stimmt. Nachlesen „geschichte / Ringe, die sich erinnern“ passt. Genau eine richtige Antwort.
- **q08 (Ampel, neu mit Kontext):** ohne Folge verständlich, genau eine richtige Antwort. Der Fragetext nennt allerdings schon „bleibt an, bis die Ampel auf Grün springt“ – damit ist die richtige Antwort fast vorgesagt. Siehe E3.
- **Karten k01–k11:** unverändert, korrekt, je eine Sache, ohne Folge verständlich.

## Übrige Datei (unverändert gegen Durchgang 3) – Stichproben bestätigt

- Eccles/Jordan 1918 (Patent GB 148,582), Whirlwind/Forrester, 32 × 32 Ringe je Ebene, Dennard 1966/1967/1968, Intel 1103 ab 1970 (1024 Bit, 3-Transistor-Zelle, etwa 1 Cent/Bit), DDR4 64 ms / DDR5 32 ms, 1000/64 ≈ 15,6 → „mindestens fünfzehnmal“: stimmt.
- Flipflop-Schrittfolge im Text stimmt mit `rs()` in `flipflop.js` überein (NODER über Kreuz, Q oben). Übung 1 (vier Schritte), Übung 2 (5 = `0101`, 12 = `1100`, Adresse 1 = `01`, 2 = `10`), Übung 3 (Zuordnung eindeutig): lösbar und richtig.
- VPS: 3,8 GiB ≈ 4,08 Mrd. Byte ≈ 32,6 Mrd. Bit; × 6 ≈ 196 Mrd. Transistoren → „rund 200 Milliarden“: stimmt.
- Format: keine Handwerks-Wörter, „Im Bild“- und „Achtung“-Box vorhanden.

## Befunde

### Fehler

**F1 – Übung 2, Einleitung: Verweis auf die falsche Folge.**
„Im Speicher stehen Zahlen als Folge von Bits, also binär: Die 5 ist `0101`, die 12 ist `1100` (mehr zum Binären in Folge 1).“
Das Umrechnen von Zahlen ins Binäre (Stellenwerte, 5 = `0101`, 12 = `1100`) steht in **Folge 4** („Binär zählen und rechnen“, dort wörtlich die Tabelle mit 5 = `0101` und die Übung mit 12 = `1100`). Folge 1 erwähnt das Binärsystem nur geschichtlich (Leibniz) und behandelt Bitmuster/ASCII, aber nicht das Zählen. Wer ohne Vorwissen einsteigt, wird also an die falsche Stelle geschickt – das untergräbt genau den Zweck des Verweises (Prüfpunkt 8). Vor der Umstellung stand hier richtig Folge 4.
Korrektur: „… die 12 ist `1100` (wie man Zahlen binär schreibt, erklärt Folge 4).“ Optional ein halber Satz zum Prinzip: „Jede Stelle zählt doppelt so viel wie die rechts daneben: 8, 4, 2, 1 – die 5 ist 4 + 1, also `0101`.“

### Empfehlungen

**E1 – Fazit, Satz 3:** „Acht Flipflops bilden ein Register im Prozessor“ klingt nach Definition. Vorschlag: „Mehrere Flipflops nebeneinander (zum Beispiel acht für ein Byte) bilden ein Register im Prozessor; viele Zeilen mit Adressen bilden den Arbeitsspeicher (RAM), in dem jede Adresse direkt erreichbar ist.“

**E2 – Fazit, Satz 4:** Die Kernaussage „DRAM ist der große Arbeitsspeicher“ fehlt, und „klein“ ist doppeldeutig. Vorschlag: „SRAM (ein Flipflop je Bit) ist schnell, braucht aber viel Platz und steckt im Cache; der große Arbeitsspeicher ist DRAM (ein Kondensator plus Transistor je Bit): platzsparend und billig, muss aber ständig aufgefrischt werden. Beide sind flüchtig.“

**E3 – q08:** Der Fragetext nimmt die richtige Antwort vorweg („bleibt an, bis die Ampel auf Grün springt“ ↔ „Die Ampel springt auf Grün“). Vorschlag: „An einer Fußgängerampel leuchtet nach einem kurzen Tastendruck ‚Signal kommt‘ und bleibt an, auch wenn du loslässt – ein Bild für ein Flipflop, das sich eine Anforderung merkt. Was entspricht dabei dem Zurücksetzen (R)?“

**E4 – Einstieg:** „Auch ein Addierer, der zwei Binärzahlen zusammenzählt (Folge 4)“ – Folge 4 baut den Halbaddierer, der zwei einzelne Bits addiert; das Addierwerk für ganze Zahlen kommt erst im Abschlussprojekt. Vorschlag: „Auch ein Addierer, der Bits zusammenzählt (Folge 4), …“ (gleicher Befund in s1f06).

**E5 – Register-Absatz:** „zum Beispiel die Zahl 80 oder den Buchstaben P“ – ohne Folge 4 bleibt unklar, warum gerade diese beiden. Vorschlag: „… zum Beispiel die Zahl 80 – im ASCII-Code ist das zugleich der Buchstabe P.“

Ergebnis: nicht bestanden
