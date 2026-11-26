Ergebnis: NICHT BESTANDEN

# Faktencheck s1f01 „Was ist Information? – Das Bit“ – Durchgang 1

Geprüft am 26.11.2026 (unabhängige Prüfung, nicht vom Autor).
Gegenstand: `content/staffel-1/folge-01-bit.md`, Glossareinträge mit `folge: s1f01` sowie VPS, Docker-Container
und Cloudflare Pages in `content/glossar.md`, angezeigte Texte in `js/sim/bit-schalter.js` und `js/sim/zahlenraten.js`.

Die Folge ist insgesamt sehr gut: fast alle Zahlen und historischen Angaben stimmen, und der Aufbau ist
für Fachfremde verständlich. Es bleiben vier Punkte, die fachlich falsch oder schief sind und vor
`geprueft` behoben werden müssen. Jeder davon lässt sich mit einem Satz beheben.

## Fehler (müssen behoben werden)

### F1 – ASCII „von 1963“ mit 128 Zeichen und allen Buchstaben
- **Stelle:** `[prinzip]` → „Acht Bits sind ein Byte“; Glossar `ascii` (kurz).
- **Zitat:** „… genug, um jedem Buchstaben, jeder Ziffer und jedem Satzzeichen ein eigenes Muster zu geben. Genau das macht der **ASCII**-Code von 1963.“ – Glossar: „Kodierung für Text von 1963: 128 Zeichen (Buchstaben, Ziffern, Satzzeichen), jedes als Muster aus 7 Bit.“
- **Problem:** (a) Die Fassung von 1963 (ASA X3.4-1963) hatte **keine Kleinbuchstaben** und ließ mehrere Plätze frei. Die heute bekannte Tabelle mit Klein- und Großbuchstaben gibt es erst seit der Überarbeitung von 1967 (USAS X3.4-1967/1968). Die in den Quellen genannte Norm ist auch die von 1968. (b) Von den 128 Mustern sind nur 95 druckbare Zeichen (Buchstaben, Ziffern, Satzzeichen, Leerzeichen). 33 sind Steuerzeichen (z. B. Zeilenumbruch). „128 Zeichen (Buchstaben, Ziffern, Satzzeichen)“ ist deshalb falsch. (c) „Jedem Buchstaben“ stimmt nur fürs englische Alphabet. Das ä taucht im gleichen Text später mit 2 Byte auf, das kann verwirren.
- **Korrekturvorschlag:** Text: „… jedem Buchstaben des englischen Alphabets, jeder Ziffer und jedem Satzzeichen ein eigenes Muster zu geben. Genau das macht der **ASCII**-Code (erstmals 1963, in der heutigen Form seit 1967).“ Glossar: „Kodierung für Text (erstmals 1963, heutige Form 1967): 128 Muster aus 7 Bit – Buchstaben (ohne Umlaute), Ziffern, Satzzeichen und einige Steuerzeichen wie ‚neue Zeile‘.“
- **Beleg:** ASCII-Geschichte: ASA X3.4-1963 ohne Kleinbuchstaben, ergänzt 1967 (z. B. https://en.wikipedia.org/wiki/ASCII, Abschnitt History; https://www.britannica.com/topic/ASCII). Codetabelle in RFC 20: 0–31 und 127 sind Steuerzeichen.

### F2 – Simulator `zahlenraten`: „genau 1 Bit“ und „Perfekt – jede Antwort hat halbiert“
- **Stelle:** `js/sim/zahlenraten.js`, Text nach dem Finden (Übung s1f01-u01). Ähnlich in `[selbst]`: „Jede Antwort ist ein Bit.“
- **Zitat:** „Jede Ja/Nein-Antwort liefert genau 1 Bit – 64 Möglichkeiten brauchen 6 Bit.“ und (bei `fragen <= ziel`) „Perfekt – jede Antwort hat die Möglichkeiten halbiert.“
- **Problem:** (a) Das widerspricht der eigenen „Wusstest du?“-Box in `[prinzip]`: Genau 1 Bit gibt es nur, wenn die Frage die Möglichkeiten genau halbiert. Der Text erscheint aber auch nach Fragen „nach Gefühl“ (Grenze frei wählbar), und die Folge fordert ausdrücklich dazu auf. (b) Wer mit schiefen Fragen Glück hat (z. B. „Größer als 1?“ → Nein → gefunden nach 1 Frage), bekommt „Perfekt – jede Antwort hat die Möglichkeiten halbiert“. Das ist dann falsch und lehrt das Gegenteil der Übung.
- **Korrekturvorschlag:** (a) „Eine Ja/Nein-Antwort liefert höchstens 1 Bit – genau 1 Bit, wenn sie die Möglichkeiten halbiert. 64 Möglichkeiten brauchen 6 Bit.“ In `[selbst]`: „Jede halbierende Antwort ist genau ein Bit.“ (b) Bei `fragen < ziel`: „Glück gehabt! Sicher sind es mit Halbieren immer 6 Fragen.“ „Perfekt …“ nur bei `fragen === ziel` zeigen, oder besser nur, wenn wirklich jede Grenze die Mitte war.
- **Beleg:** Shannon 1948, Teil I, Abschnitt 6 (Entropie einer Ja/Nein-Wahl ist maximal 1 Bit, und zwar bei p = ½), Quelle 1 der Folge.

### F3 – Einheiten-Tabelle: „eine Laterne: Land oder Wasser“
- **Stelle:** `[beidir]`, Tabelle, Zeile „1 Bit“.
- **Zitat:** „1 Bit | 0 oder 1 | eine Laterne: Land oder Wasser“
- **Problem:** Das widerspricht `[geschichte]`: Land oder Wasser wurde nicht mit *einer* Laterne angezeigt (an/aus), sondern mit *einer oder zwei* Laternen. Das Bit ist das ganze Signal, nicht eine Laterne. Gerade die Laterne ist das Bild für Kodierung, und hier wird das Bild schief. Ähnlich in `[prinzip]`: „Bevor die Laterne leuchtete …“ (es leuchteten zwei).
- **Korrekturvorschlag:** „das Laternen-Signal: Land (eine) oder Wasser (zwei)“. In `[prinzip]`: „Bevor die Laternen leuchteten …“.
- **Beleg:** Paul Revere an Jeremy Belknap (ca. 1798): „if the British went out by Water, we would shew two Lanthorns in the North Church Steeple; & if by Land, one“ – Massachusetts Historical Society, https://www.masshist.org/database/99

### F4 – Karte k07 (und `[beidir]`): Mbit/s und MB mit „Faktor 8“ gleichgesetzt
- **Stelle:** Karte `s1f01-k07`; ebenso `[beidir]` „Dein Windows-PC und dein Internet“.
- **Zitat:** „Was ist der Unterschied zwischen Mbit/s und MB, und welcher Faktor liegt dazwischen?“ / „… Der Unterschied ist der Faktor 8.“
- **Problem:** Mbit/s ist eine Geschwindigkeit (Menge pro Zeit), MB eine Menge. Zwischen beiden liegt kein Faktor. Der Faktor 8 liegt zwischen **Megabit und Megabyte** (also auch zwischen Mbit/s und MB/s). Gerade weil die Folge Bit und Byte sauber trennen will, sollte die Karte das Einsteiger-Missverständnis „Mbit/s ÷ 8 = MB“ nicht festigen. Außerdem fragt die Karte zwei Dinge (README: „Eine Karte = eine Sache“).
- **Korrekturvorschlag:** Vorne: „Wie viele Megabyte pro Sekunde schafft ein Anschluss mit 100 Mbit/s höchstens?“ Hinten: „12,5 MB/s – denn 1 Byte = 8 Bit, also Megabit ÷ 8 = Megabyte.“ In `[beidir]`: „Zwischen Megabit und Megabyte liegt der Faktor 8 – ein 100-Mbit/s-Anschluss lädt höchstens 12,5 MB pro Sekunde.“
- **Beleg:** Definition Byte = 8 Bit (IEC 80000-13). Rechnung 100 / 8 = 12,5 nachgerechnet.

## Verbesserungen (empfohlen)

1. **`[geschichte]` Leibniz:** „1703 beschrieb …“ besser „1703 veröffentlichte …“. Leibniz hatte das Binärsystem schon 1679 im Manuskript *De progressione dyadica* entworfen, samt Idee einer binären Rechenmaschine mit Kugeln. Das wäre ein schönes „Wusstest du?“ und relativiert „über 200 Jahre bis Maschinen kamen“. Die Aussage „für das alltägliche Rechnen hielt er es für unpraktisch“ ist belegt („je ne recommande point cette manière de compter, pour la faire introduire à la place de la pratique ordinaire par dix“). Hinweis: Den Mémoires-Band für 1703 druckte die Akademie erst 1705.
2. **`[geschichte]` Shannon:** „Darin taucht zum ersten Mal gedruckt … auf“ stimmt nach heutigem Stand (OED: 1948). Tukey benutzte „bit“ aber schon in einem internen Bell-Labs-Memo vom 9.1.1947. Vorschlag: „… zum ersten Mal gedruckt …; John Tukey hatte es ein Jahr zuvor in einer internen Notiz geprägt.“ Den Titel „Eine mathematische Theorie der Kommunikation“ als Übersetzung kennzeichnen (Original: „A Mathematical Theory of Communication“).
3. **`[werkstatt]` Meister:** Der „Meister“ ist laut README die feste Rolle des Betriebssystems. Hier liest er die Werkzeugwand. Das passt noch (der Werkstattmeister verwaltet Werkzeuge). Damit es in Folge 8 nicht kollidiert, „der Meister“ entweder bewusst als Vorgriff lassen oder neutral „wer in der Werkstatt arbeitet“ schreiben.
4. **`[prinzip]` „Wusstest du?“:** „sie verrät dir deshalb weniger als ein Bit“ gilt für die erwartete Antwort „Nein“ bzw. im Durchschnitt. Ein überraschendes „Ja“ verrät viel mehr. Vorschlag: „… verrät dir im Schnitt weniger als ein Bit“.
5. **Byte-Einheiten:** Nach SI/IEC 80000-13 ist das Zeichen für 1 000 Byte **kB** (kleines k). „KB“ ist gerade die Windows-Schreibweise für 1 024. Tabelle in `[beidir]` und Glossar `kilo-mega-giga`: „1 Kilobyte (kB)“. Das macht die Achtung-Box zu Windows sogar klarer.
6. **`[beidir]` UTF-8:** „im heute üblichen Textformat UTF-8“ → „in der heute üblichen Kodierung UTF-8“. Der Begriff Kodierung wurde gerade eingeführt, und „Textformat“ klingt nach Dateiformat. Ergänzen lässt sich: „andere Schriftzeichen und Emojis bis zu 4 Byte“.
7. **`[beidir]` Docker-Container:** Im Text nicht erklärt (nur im Glossar). README verlangt eine Kurzerklärung beim ersten Auftreten, z. B. „… im Docker-Container (einem abgeschotteten Bereich auf dem Server)“.
8. **Tabelle `[beidir]`:** „1 KB – eine kurze E-Mail, nur Text“: Mit Kopfzeilen sind selbst kurze E-Mails meist mehrere KB groß. Treffender: „eine halbe Seite Text“.
9. **Quiz q06:** Die richtige Antwort ist die einzige mit deutscher Übersetzung („…, also Binärziffer“) und damit die ausführlichste. „Byte Item“ ist als Ablenker zu schwach. Vorschlag: richtige Antwort nur „Binary digit“ (Übersetzung in die Erklärung), Ablenker z. B. „Binary item“ oder „Basic unit“.
10. **Karte k05:** fragt zwei Dinge (wer + wofür, dazu Tukey). Aufteilen in „Wofür steht ‚Bit‘?“ (gibt es schon im Glossar) und „Wer prägte das Wort, wer machte es bekannt?“.
11. **Glossar `vps` (mehr):** „einen festen Anteil an Prozessor und Arbeitsspeicher“: Beim Arbeitsspeicher stimmt das. Prozessorkerne (vCPU) teilen sich bei günstigen VPS oft mit anderen. Besser „einen zugeteilten Anteil“.
12. **Glossar `binaersystem`:** „Beschrieben 1703“ → „Veröffentlicht 1703“ (siehe 1).
13. **Simulator `bit-schalter`:** Bei Mustern ab `1…….` (128–255) heißt es „im ASCII-Code kein sichtbares Zeichen“. Genauer wäre: „gehört nicht mehr zu ASCII (das vorderste Bit ist bei ASCII immer 0)“. Das würde den Text „das vorderste Bit ist dann 0“ schön aufgreifen. Unkritisch: In `${n === 1 ? 'Schalter' : 'Schalter'}` sind beide Zweige gleich.
14. **Quelle ASCII:** Die Norm hieß 1968 „USAS X3.4-1968“. „ANSI“ ist der spätere Name, gängig, aber anachronistisch.

## Geprüft und korrekt

- 2²⁰ = 1 048 576 ≥ 1 000 000 > 2¹⁹ = 524 288 → 20 Fragen genügen und sind nötig. Die Tabelle 1/2/3/4/8/10/20 Bit → 2/4/8/16/256/1 024/1 048 576 stimmt.
- 64 Zahlen → 6 Fragen (2⁶ = 64). 1 000 Zahlen → 10 Fragen (2⁹ = 512 < 1 000 ≤ 1 024).
- Drei Schalter → 8 Muster (q02). Ablenker 3, 6, 9 sind eindeutig falsch.
- 8 Bit = 1 Byte, 256 Muster. ASCII 7 Bit = 128 Muster. A = 65 = `01000001`, B = 66 = `01000010`.
- UTF-8: „a“ = 1 Byte, „ä“ = 2 Byte (C3 A4). Die ersten 128 Zeichen sind identisch mit ASCII. Fast alle Webseiten nutzen UTF-8.
- „Fertig: Bericht liegt bereit.“ = 29 Zeichen = 29 Byte (nur ASCII) = 232 Bit. Nachgezählt.
- 128 GB × 8 = 1,024 × 10¹² Bit ≈ eine Billion. Stimmt.
- 3,8 GB × 8 = 30,4 Mrd. Bit (bei GiB 32,6 Mrd.) → „gut 30 Milliarden“ stimmt in beiden Lesarten.
- 100 Mbit/s ÷ 8 = 12,5 MB/s. 1 GB ÷ 12,5 MB/s = 80 s.
- 1 TB = 10¹² Byte = 931,3 GiB → „etwa 931 GB“ im Explorer. 1 024 = 2¹⁰. KiB/MiB/GiB nach IEC 80000-13.
- bim-trainer: ausgelieferte Dateien zusammen ca. 0,8 MB unkomprimiert, also „einige Hundert Kilobyte“ plausibel. Der Fortschritt liegt im `localStorage` des Browsers.
- Paul Revere, Silberschmied. 18. April 1775. Vereinbarung mit Freunden in Charlestown (Col. Conant): eine Laterne = Land, zwei = Wasser, im Turm der Old North Church. In der Nacht hingen zwei. Brief an Jeremy Belknap, ca. 1798 (Belknap datierte ihn auf 1.1.1798), Massachusetts Historical Society.
- Leibniz, „Explication de l'Arithmétique Binaire“, Mémoires de l'Académie Royale des Sciences, Jahrgang 1703. Er empfahl Binär ausdrücklich nicht für das alltägliche Rechnen.
- Shannon, „A Mathematical Theory of Communication“, Bell System Technical Journal 27 (1948), S. 379–423 und 623–656. Wörtlich: „binary digits, or more briefly bits, a word suggested by J. W. Tukey.“ Laut OED die erste gedruckte Verwendung.
- Gleick, „Die Information. Geschichte, Theorie, Flut“, Redline 2011 (ISBN 978-3-86881-312-8). Existiert so.
- Glossar: Bit, Byte, Information, Kodierung, Mbit/s, UTF-8, Docker-Container und Cloudflare Pages sind korrekt und laientauglich. Die Verweise „Folge 4“ (Binär zählen und rechnen) und „Staffel 7 Server & Betrieb“ passen zu `config.json`.
- Werkstatt-Analogie: Bit = Platz an der Werkzeugwand (belegt/leer) stimmt mit der README-Tabelle überein. Werkbank = Prozessor, Ablage = RAM und Lager = SSD sind konsistent. Die „Achtung“-Box nennt, wo das Bild hinkt.
- Lichtschalter = Bit stimmig. Laternen = Kodierung stimmig (bis auf F3).
- Quiz q01–q05 und q07: je genau eine richtige Antwort, Erklärungen korrekt, „Nachlesen“ zeigt auf den richtigen Abschnitt (q03 → selbst, q05/q06 → geschichte, q07 → beidir).
- Simulator `bit-schalter`: Anzahl Muster 2ⁿ und die ASCII-Anzeige (33–126) sind korrekt. Der Knopf „+“ ist bei `schalter: 1` vorhanden, wie es der Text verlangt.
- Simulator `zahlenraten`: „Mit genauem Halbieren reichen bei 64 Zahlen immer 6 Fragen“ und die Halbierungs-Grenze (32, dann 16 …) sind korrekt.

## Links

| Quelle | erreichbar | passt |
|---|---|---|
| Shannon 1948 – https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf | ja (HTTP 200, PDF) | ja (Nachdruck „with corrections“ der BSTJ-Fassung, enthält die Tukey-Stelle) |
| ASCII / RFC 20 – https://www.rfc-editor.org/rfc/rfc20 | ja (HTTP 200) | ja (RFC 20, Okt. 1969, 7-Bit-ASCII nach USAS X3.4-1968, mit Codetabelle) |
| Leibniz 1703 (ohne Link) | – | Angabe korrekt. Möglicher Link: https://hal.science/ads-00104781 (Transkription; für automatische Abrufe gesperrt, im Browser lesbar) |
| Revere an Belknap (ohne Link) | – | Angabe korrekt. Möglicher Link: https://www.masshist.org/database/99 |
| Gleick, Die Information (ohne Link) | – | Angabe korrekt |
| IEC 80000-13 (ohne Link) | – | Angabe korrekt (Norm kostenpflichtig, kein freier Link nötig) |
