# Faktencheck s1f03 „Logikgatter“, Durchgang 4 (zweiter Prüfdurchgang nach der Umstellung)

Datum: 26.11.2026
Prüfer: unabhängige Prüfung (Subagent, hat die Folge nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-03-gatter.md` (`status: entwurf`). Grundlage: Bericht Durchgang 3, `git diff HEAD`,
`npm run pruefen` (Inhalte gültig).

## Fehler aus Durchgang 3

- **F1 (Transistor „von einem kleinen Strom geschaltet“): behoben.** Zeile 22: „winziger elektrischer Schalter ohne bewegliche Teile,
  den eine kleine elektrische Spannung ein- und ausschaltet“ – richtig (MOSFET, spannungsgesteuert) und jetzt klar vom Relais
  (Zeile 38: „klickende Schalter mit beweglichen Teilen, die ein kleiner Strom umlegt“) unterschieden.

## Umgesetzte Empfehlungen – geprüft

- **E1 (NICHT elektrisch, Z. 77):** Widerstand gegen echten Kurzschluss ergänzt – richtig.
- **E2 (Bit erklärt, Z. 44):** „kleinste Einheit der Information“ – richtig.
- **E3 (q07):** richtige Antwort gekürzt, Ablenker verlängert; Längen jetzt ausgeglichen, genau eine richtige Antwort.
- **E4 (q03):** jetzt ohne Name/Jahr, verständnisorientiert („Was bedeutete es …“). Richtige Antwort eindeutig, Ablenker (Röhren,
  Bit-Definition, Zehnersystem) beantworten die Frage nicht. Erklärung und Nachlesen-Stelle passen.
- **E6 (Einstieg, Satzbau):** umgesetzt, inhaltlich richtig (Reihe = UND, parallel = ODER).
- Prüfpunkte 8–10 weiterhin erfüllt; Fazit unverändert und richtig.

## Neue Befunde

### Fehler
Keine.

### Empfehlungen
**E1 – Doppelung Z. 77:** „… den Strom *an der Lampe vorbei* ableitet …: Der Strom nimmt den bequemen Weg an der Lampe vorbei“ sagt
dasselbe zweimal. Vorschlag: „Elektrisch ist das ein Schalter neben der Lampe: Ist er eingeschaltet, nimmt der Strom den bequemen Weg
an ihr vorbei, die Lampe geht aus. (Ein Widerstand davor …)“

**E2 – Fazit Satz 4 (offen aus Durchgang 3, E5):** „darum bestehen Prozessoren aus Gattern“ verkürzt die Ursache. Weiter optional.

Ergebnis: bestanden
