# Faktencheck s1f01 „Bit“, Durchgang 5 (Umstellung auf das neue Format)

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Inhalte nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-01-bit.md` (status: entwurf), Vergleich mit dem letzten Commit
(`git diff HEAD`), dazu `content/README.md` (Abschnitte „Lernpool“, „Quiz“, „Karteikarten“, „Jede Folge steht für sich“,
„Bilder, Grafiken und Mitmachen“), Simulator-Einstellungen (`bit-schalter`, `zahlenraten`), Bericht Durchgang 4.
Neue Glossar-Einträge: keine (`/workspace/tmp/glossar-neu/` existiert nicht).

## Was sich geändert hat

- Reihenfolge der Abschnitte: `[beidir]` steht jetzt vor `[quiz]`/`[karten]`; neuer Abschnitt `[fazit] Auf den Punkt`.
- `[beidir]` inhaltlich unverändert (nur verschoben).
- Quiz q04, q05, q06 neu formuliert (verständnisorientiert, ohne Namen/Jahreszahlen), q04 mit Stelle im `Nachlesen`.
- Karten k04 (leicht umformuliert), k05 (Information/Shannon statt „wer, wann“), k08 (ohne Parkhaus-Bild) neu.
- Status `freigegeben` → `entwurf`.
- Build-Probe in einer Kopie des Projekts (`node werkzeuge/bauen.mjs`): fehlerfrei, alle `Nachlesen`-Stellen gefunden.

## Prüfpunkt 8 – Folge steht für sich

Erfüllt. s1f01 ist die erste Folge und setzt nichts voraus. Alle Rückgriffe (Laternen in `[prinzip]`, `[werkstatt]`, `[beidir]`-Tabelle)
beziehen sich auf die eigene Geschichte. Verweise auf spätere Folgen („in den nächsten Folgen“, „in Folge 4“) sind reine Ausblicke,
zum Verstehen nicht nötig. Kein Bild einer anderen Folge.

## Prüfpunkt 9 – Auf den Punkt

Vier Kernsätze, alle fachlich korrekt und genau das Wichtigste der Folge:
1. Bit = kleinste Einheit der Information, zwei Möglichkeiten, 0/1 – stimmt mit `[prinzip]` überein (die Einschränkung
   „gleich wahrscheinlich“ steht im Text; für einen Merksatz vertretbar weggelassen).
2. Jedes Bit verdoppelt die Muster, 8 Bit = Byte mit 256 Mustern – korrekt.
3. Kodierung legt die Bedeutung fest, ASCII `01000001` = „A“ – korrekt (0x41 = 65 = „A“).
4. Halbieren → 20 Fragen für 1 bis 1 000 000 – korrekt (2²⁰ = 1 048 576 ≥ 1 000 000, 2¹⁹ = 524 288 reicht nicht).

## Prüfpunkt 10 – Lernpool

- q01–q03, q07 unverändert, für sich verständlich.
- **q04** (neu): verständnisorientiert („Warum reicht das …?“), genau eine richtige Antwort (2⁸ = 256), Ablenker klar falsch,
  Erklärung korrekt (95 druckbare ASCII-Zeichen inkl. Leerzeichen, 7 Bit). `Nachlesen: prinzip / Acht Bits sind ein Byte` passt genau.
- **q05** (neu): Laternen-Abmachung vollständig in der Frage beschrieben, ohne Folge verständlich, Antwort richtig. Siehe E1.
- **q06** (neu): korrekt, eine richtige Antwort. Siehe E2.
- **k04, k05, k08**: korrekt und für sich verständlich; k05 nennt Shannon nur als Beleg, fragt aber nach dem Begriff – gut.
  k08 fragt nach Begriff und Zahl statt nach dem Parkhaus-Bild – entspricht der Regel „lieber nach dem Begriff fragen als nach dem Bild“.

## Übrige Datei (Stichprobe der unveränderten Teile)

Fakten aus Durchgang 1–4 unverändert (Revere 18.04.1775, Leibniz 1679/1703, Shannon 1948, Tukey, ASCII 1963/1967, 95 + 33 Zeichen,
UTF-8 1–4 Byte, „Fertig: Bericht liegt bereit.“ = 29 Zeichen = 29 Byte = 232 Bit, 128 GB ≈ 1,02 Billionen Bit, 3,8 GB ≈ 30,4 Mrd. Bit,
100 Mbit/s = 12,5 MB/s, 1 TB ≈ 931 GiB). Übungen u01 (6 Fragen bei 64) und u02 (P = `01010000`) stimmen.

## Fehler

Keine.

## Empfehlungen

- **E1 (q05, Lernpool):** Die Frage verrät die Lösung schon im ersten Satz („Zwei Menschen *vereinbaren* …“) – sie prüft dadurch
  kaum Verständnis. Vorschlag: „Eine Laterne im Kirchturm bedeutet ‚über Land‘, zwei bedeuten ‚übers Wasser‘. Woher weiß ein Beobachter,
  was zwei Laternen heißen?“ (ohne „vereinbaren“). Außerdem steht der Begriff **Kodierung** in `[prinzip]`; `Nachlesen: prinzip / Acht Bits
  sind ein Byte` (dort: „Es ist eine Kodierung … genau wie die Laternen-Abmachung“) träfe den gefragten Gedanken besser als `geschichte`.
- **E2 (q06, Nachlesen):** Das Wort *binary digit* / „Binärziffer“ wird nur in `[geschichte]` erklärt (Absatz zu Shannon/Tukey), nicht in
  `[prinzip]`. `Nachlesen: geschichte` wäre passender. Zudem überschneidet sich q06 inhaltlich fast ganz mit q01 („zwei Zustände“);
  Alternative: q06 nach der Bedeutung von „binär“ im Binärsystem fragen oder einen anderen Gedanken prüfen (z. B. „Warum liefert die Frage
  ‚Schneit es morgen in Sevilla?‘ weniger als ein Bit?“ – `Nachlesen: prinzip`).
- **E3 (k03/k08, Karteikarten):** k08 deckt dasselbe ab wie k03 (8 Bit = Byte, 256 Muster) und fragt zwei Dinge auf einmal (Zahl und Name).
  Vorschlag für k08: nur „Wie viele Muster zeigt eine Reihe aus acht Lämpchen (je an/aus)?“ → „2⁸ = 256“, oder k08 einem anderen Gedanken
  widmen (z. B. „Warum sind es bei acht Lämpchen 256 Zustände und nicht nur 9?“ → „Es zählt, *welche* an sind, nicht nur wie viele“).

Ergebnis: bestanden
