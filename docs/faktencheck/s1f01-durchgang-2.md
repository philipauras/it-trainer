Ergebnis: BESTANDEN

# Faktencheck s1f01 „Was ist Information? – Das Bit“ – Durchgang 2

Geprüft am 26.11.2026. Die Prüfung ist unabhängig und nicht vom Autor.
Gegenstand: `content/staffel-1/folge-01-bit.md`, Glossareinträge mit `folge: s1f01` sowie VPS, Docker-Container
und Cloudflare Pages in `content/glossar.md`, angezeigte Texte in `js/sim/bit-schalter.js` und `js/sim/zahlenraten.js`.
`npm run pruefen` läuft grün.

Alle vier Fehler aus Durchgang 1 sind richtig behoben. Fast alle Empfehlungen sind sinnvoll umgesetzt.
Neue fachliche Fehler, mehrdeutige Quizfragen oder schiefe Analogien gibt es nicht. Übrig bleiben
nur Kleinigkeiten. Eine davon ist durch die Überarbeitung neu entstanden: die Schreibweise „KB“ in der Einheiten-Tabelle (V1).
Sie sollte vor der Freigabe noch angeglichen werden.

## Behebung der Fehler aus Durchgang 1

| Fehler | Behoben? | Bemerkung |
|---|---|---|
| F1 ASCII 1963 / 128 Zeichen | ja | Text: „entstanden ab 1963 in den USA (seine heutige Form mit Kleinbuchstaben gibt es seit 1967)“, „128 Muster, davon 95 für sichtbare Zeichen und der Rest für Steuerbefehle wie ‚neue Zeile‘“, „Umlaute wie ä kennt ASCII nicht“. Glossar `ascii` entsprechend. Historisch und rechnerisch korrekt (ASA X3.4-1963 ohne Kleinbuchstaben, Kleinbuchstaben 1967; 33 Steuerzeichen 0–31 und 127). Kleine Ungenauigkeit „sichtbar“ statt „druckbar“, siehe V2. |
| F2 Zahlenraten „genau 1 Bit“ / „Perfekt“ | ja | Zusatztext: „Eine Frage, die die Möglichkeiten genau halbiert, liefert genau 1 Bit“. „Perfekt …“ erscheint nur noch bei `fragen === ziel && halbiert`. `halbiert` wird bei jeder Grenze ungleich `mitte(bereich)` falsch. Die Mitte `floor((von+bis-1)/2)` halbiert bei 64 Zahlen in jedem Schritt exakt (32/32, 16/16 …). Weniger Fragen ergeben „Da war auch etwas Glück dabei …“. `[selbst]` ist entsprechend angepasst. Der Feinschliff steht in V3. |
| F3 „eine Laterne: Land oder Wasser“ | ja | Tabelle: „das Laternen-Signal: Land oder Wasser“. `[prinzip]`: „Bevor im Kirchturm Licht zu sehen war …“. Beides passt jetzt zur Geschichte mit einer oder zwei Laternen. |
| F4 Mbit/s vs. MB, „Faktor 8“ | ja | k07 fragt jetzt nur eine Sache: 100 Mbit/s → 12,5 MB/s, „Megabit ÷ 8 = Megabyte“. `[beidir]`: „Zwischen Megabit und Megabyte liegt der Faktor 8“. Korrekt. |

Empfehlungen aus Durchgang 1:
1. Leibniz „veröffentlichte“ + „Wusstest du?“ 1679: umgesetzt. Inhalt korrekt (siehe unten).
2. Shannon/Tukey + Übersetzung des Titels kenntlich gemacht: umgesetzt.
3. „Meister“ → „wer in der Werkstatt arbeitet“: umgesetzt.
4. „im Schnitt weniger als ein Bit“: umgesetzt.
5. kB: im Glossar umgesetzt, in der Tabelle nur halb (siehe V1).
6. UTF-8 „Kodierung“ und „bis zu vier“ Byte: umgesetzt.
7. Docker-Container im Text erklärt: umgesetzt.
8. „eine halbe Seite Text“: umgesetzt.
9. q06 Antworten angeglichen: umgesetzt (12/11/10 Zeichen, nur „Basic information transfer“ ist länger, und das ist ein Ablenker).
10. k05 nur noch eine Frage: umgesetzt. Der Tukey-Satz hinten ist eine Zusatzinfo und keine zweite Frage.
11. VPS „zugeteilten Anteil“: umgesetzt.
12. Glossar Binärsystem „Veröffentlicht 1703“: umgesetzt.
13. bit-schalter: „Dieses Muster gehört nicht mehr zu ASCII – dort ist das vorderste Bit immer 0.“ Umgesetzt. Den doppelten Ternär-Ausdruck gibt es nicht mehr.
14. Quelle „USAS X3.4-1968“: umgesetzt.

## Fehler (müssen behoben werden)

Keine.

## Verbesserungen (empfohlen)

1. **Einheiten-Tabelle `[beidir]`, Zeile Megabyte (neu durch die Überarbeitung):** „1 Megabyte (MB) | 1 000 KB“. Die Zeile darüber
   heißt jetzt „1 Kilobyte (kB)“, und die Achtung-Box darunter erklärt „KB“ als Windows-Schreibweise für 1 024.
   Nach der eigenen Festlegung des Textes müsste es also „1 000 kB“ heißen. So steht es auch im Glossar
   `kilo-mega-giga`. Mit einem Zeichen behoben. Das sollte vor der Freigabe noch passieren, weil die Folge genau
   diesen Unterschied erklärt. Es ist aber kein Sachfehler: In der verbreiteten Schreibweise ist „KB“ gängig.
2. **„95 sichtbare Zeichen“ (Text `[prinzip]` und Glossar `ascii`):** Unter den 95 „druckbaren“ Zeichen (32–126)
   ist auch das Leerzeichen, und das ist nicht sichtbar. Der Simulator zählt es folgerichtig nicht mit (er zeigt 33–126
   als Buchstaben; bei `00100000` heißt es „kein sichtbares Zeichen“). Genauer: „95 für Buchstaben, Ziffern, Satzzeichen und das
   Leerzeichen“ oder „95 druckbare Zeichen (samt Leerzeichen)“.
3. **Simulator `zahlenraten`, Text nach dem Finden:**
   (a) Wer ohne Halbieren *genau* 6 Fragen braucht, liest „Da war auch etwas Glück dabei“. Das stimmt zwar (es hätten mehr
   werden können), wirkt aber seltsam, weil 6 genau die Halbier-Zahl ist. Vorschlag für `fragen === ziel && !halbiert`:
   „6 Fragen – so viele braucht auch die Halbier-Strategie, nur dass sie es *immer* schafft.“
   (b) „Mit genauem Halbieren brauchst du bei … Zahlen immer genau … Fragen“ stimmt nur bei Zweierpotenzen. Bei `max: 100`
   reichen beim Halbieren manchmal 6 statt 7. In dieser Folge steht `max: 64`, also ist das hier korrekt. Für spätere Folgen
   wäre „höchstens“ statt „immer genau“ sicher, oder ein Hinweis in `js/sim/README.md`, nur Zweierpotenzen zu verwenden.
4. **„kleinste Menge/Portion an Information“ (`[geschichte]`, `[prinzip]`):** Das reibt sich leicht mit der „Wusstest du?“-Box,
   in der eine Antwort weniger als ein Bit liefert. Die Formulierung ist didaktisch üblich (Bit als kleinste *Einheit*). Wer es
   glätten will: „die Grundeinheit der Information“ oder in der Box „… weniger als ein Bit, also nur einen Bruchteil der Grundeinheit“.
5. **„jedem Buchstaben des Alphabets“ (`[prinzip]`):** Zwei Sätze später wird klar, dass Umlaute fehlen, also ist das kein
   Fehler. „des englischen Alphabets“ wäre aber auf Anhieb genau.
6. **Glossar `utf-8` (kurz):** „Normale Buchstaben brauchen 1 Byte, Umlaute 2“. Den Text hast du um „andere Schriftzeichen und
   Emojis bis zu vier“ ergänzt. Das Glossar könnte gleichziehen: „…, Umlaute 2, andere Zeichen bis zu 4“.
7. **Karte k03** fragt zwei eng verbundene Dinge (Bit je Byte und Zahl der Muster). Das ist vertretbar. Streng nach „eine Karte = eine Sache“
   würde aber „Wie viele Muster kann ein Byte zeigen?“ genügen (8 Bit fragt q04 ab).

## Geprüft und korrekt

- **Zahlen:** 2²⁰ = 1 048 576 ≥ 10⁶ > 2¹⁹, also 20 Fragen, und nach 20 Halbierungen bleibt genau eine übrig. Tabelle 1/2/3/4/8/10/20 Bit
  → 2/4/8/16/256/1 024/1 048 576. 64 → 6 Fragen, 1 000 → 10 Fragen. 3 Schalter → 8. 2⁸ = 256. A = 65 = `01000001`,
  B = 66 = `01000010`. „Fertig: Bericht liegt bereit.“ = 29 Byte = 232 Bit (nachgezählt). 128 GB × 8 ≈ 1,02 Billionen Bit.
  3,8 GB × 8 = 30,4 Mrd. Bit. 100 Mbit/s ÷ 8 = 12,5 MB/s. 1 GB in ≥ 80 s. 1 TB = 931,3 GiB.
- **ASCII:** 7 Bit, 128 Muster, 95 druckbare + 33 Steuerzeichen. 1963 erste Fassung (ohne Kleinbuchstaben), 1967 heutige Form.
  Im Byte ist das vorderste Bit 0. Keine Umlaute. Die Folgerung „Muster ab 128 gehören nicht zu ASCII“ im Simulator ist richtig.
- **UTF-8:** a = 1 Byte (gleich ASCII), ä = 2 Byte (C3 A4), maximal 4 Byte je Zeichen. Die ersten 128 Zeichen sind identisch mit ASCII.
- **Geschichte:** Revere, Silberschmied, 18. April 1775, Old North Church, eine Laterne = Land, zwei = Wasser, es hingen zwei
  (Brief an Belknap, ca. 1798). Leibniz veröffentlichte 1703 „Explication de l'Arithmétique Binaire“ und hielt Binär für
  das Alltagsrechnen für unpraktisch. Entwurf 1679 in *De progressione dyadica* mit einer Kugelmaschine: offenes Loch = 1,
  geschlossenes = 0, Kugeln fallen durch. Nicht gebaut. „Über 200 Jahre“ bis zu binären Rechenmaschinen (Zuse, Atanasoff,
  späte 1930er) stimmt. Shannon, Bell Labs, 1948, „A Mathematical Theory of Communication“, erste gedruckte Verwendung von
  „bit“, Hinweis auf Tukey. Tukeys interne Bell-Labs-Notiz stammt vom Januar 1947, „ein Jahr zuvor“ stimmt also. Shannon klammert die
  Bedeutung einer Nachricht ausdrücklich aus.
- **„Wusstest du?“ Sevilla:** Genau 1 Bit gibt es nur bei gleich wahrscheinlichen Antworten, die erwartete Information ist sonst
  kleiner. Korrekt.
- **Analogien:** Lichtschalter = Bit, Laternen = Kodierung (jetzt stimmig). Werkzeugwand: Platz belegt/leer = Bit, Reihe aus 8 = Byte,
  256 Belegungen. Die Achtung-Box nennt die Grenze des Bildes. Werkbank/Ablage/Lager = CPU/RAM/SSD passt zum Glossar. Die Rolle
  „Meister“ wird nicht mehr vorweggenommen.
- **Quiz q01–q07:** Jede Frage hat genau eine vertretbare Antwort, und die Ablenker sind eindeutig falsch. Die Antwortlängen
  verraten nichts (q05: 42 Zeichen bei der richtigen Antwort gegenüber 43–48 bei den Ablenkern; q06 siehe oben). Die Erklärungen sind korrekt. „Nachlesen“ stimmt:
  q01, q02 und q04 → prinzip, q03 → selbst, q05 und q06 → geschichte, q07 → beidir.
- **Karten k01–k08:** Alle inhaltlich korrekt. k05 und k07 fragen jetzt je eine Sache. Zu k03 siehe V7.
- **Glossar:** Bit, Byte, Binärsystem, Information, Kodierung, ASCII, UTF-8, Kilo/Mega/Giga, Mbit/s, VPS, Docker-Container
  und Cloudflare Pages sind korrekt und laientauglich. Die Anmerkungen stehen in V2 und V6.
- **Simulator `bit-schalter`:** 2ⁿ Muster samt Rechnung, ASCII-Anzeige 33–126, die Texte für 0–32/127 und für 128–255 sind korrekt. Der Knopf „+“ ist
  bei `schalter: 1` vorhanden.
- **Simulator `zahlenraten`:** Die Grenze wird auf [von, bis−1] begrenzt, also ist jede Frage sinnvoll. Mitte und Halbier-Erkennung
  stimmen. Alle Ausgabetexte sind bei `max: 64` korrekt.
- **Verständlichkeit:** Fachbegriffe werden beim ersten Auftreten erklärt (Bit, Binärsystem, Byte, Kodierung, ASCII, UTF-8,
  Docker-Container, Mbit/s). Der Aufbau ist für Fachfremde gut nachvollziehbar.
