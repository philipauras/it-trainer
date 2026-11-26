# Faktencheck s1f08 „Betriebssystem“, Durchgang 4 (zweiter Prüfdurchgang nach der Umstellung)

Datum: 26.11.2026
Prüfer: unabhängige Prüfung (Subagent, hat die Folge nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-08-betriebssystem.md`. Grundlage: Bericht Durchgang 3, `git diff HEAD`,
`npm run pruefen` (Inhalte gültig).

## Fehler aus Durchgang 3

- **F1 (q06 Unix): behoben.** Frage zielt jetzt auf die prägende Idee statt auf den Entstehungsanlass. Richtige Antwort (Schlichtheit,
  kleine kombinierbare Werkzeuge) stimmt mit dem Text (Z. 40) überein; Ablenker (ein großes Programm, je Benutzer ein Computer,
  Programme ohne Kernel) eindeutig falsch, der missverständliche Übertragbarkeits-Ablenker ist weg. Erklärung richtig.
- **F2 („immer nur ein Prozess“ vs. Hyper-Threading): behoben.** Lauftext Z. 68 („im Grundsatz … Sonderfall Hyper-Threading“),
  Merke-Box Z. 91, Fazit Satz 2 („höchstens zwei verschränkt“) und q01 („einziger Prozessorkern ohne Hyper-Threading“) sind jetzt
  widerspruchsfrei zum Hyper-Threading-Absatz in `[beidir]`. q01: genau eine richtige Antwort; der Ablenker „Immer genau zwei“ ist
  durch „ohne Hyper-Threading“ eindeutig falsch.

## Umgesetzte Empfehlungen – geprüft

- **E1 (Fazit Satz 4):** „nur Fehler im Kernel, etwa in einem Treiber“ – richtig.
- **E2 (k09):** fragt nur noch nach der Übertragbarkeit (C-Neufassung 1973) – eine Sache, richtig.
- Prüfpunkte 8–10 erfüllt.

## Neue Befunde

### Fehler
Keine.

### Empfehlungen
**E1 – „höchstens zwei“:** gilt für Intel/AMD-PCs; einige Server-Prozessoren (z. B. IBM POWER) verschränken 4 oder 8 Befehlsströme.
Für die Zielgruppe vertretbar; optional „bei PC-Prozessoren höchstens zwei“.

**E2 – offen aus Durchgang 2/3:** „doppelte Zahl“ logischer Prozessoren bei Hybridprozessoren, k02 „alle anderen Programme“,
Glossar `linux`, Überschrift „bim-trainer und diese App“ – weiter optional.

Ergebnis: bestanden
