# Kern für den bim-trainer – was eine Übernahme bräuchte

Der Kern (`js/kern/`, `werkzeuge/lib/`, `werkzeuge/pruefsummen.mjs`, `sw.js`-Muster) ist themenneutral: Nichts darin kennt IT, Staffeln
oder Farben – das kommt aus `config.json` und den Inhalten. Markiert ist jede Kern-Datei mit „KERN (übernehmbar …)“ im Kopf.

| Kern-Modul | Aufgabe | Stand im bim-trainer |
|---|---|---|
| `markdown.js` | Markdown → HTML, Boxen konfigurierbar, Links, Codeblöcke | Vorläufer `js/markdown.js` – Ersatz 1:1 möglich, `> **Prüfung:**` per `boxen: { 'Prüfung': 'pruefung' }` (CSS-Klasse heißt dann `box-pruefung` statt `pruefung-box`) |
| `glossar.js` | Suche, Sortierung, Begriffe im Text | Vorläufer `js/glossar.js`. BIM-Sonderfälle (Data Drops, `NICHT_MARKIEREN`) wandern in die Daten: Feld `woerter` bzw. `markieren: false` je Begriff in `glossar.json` |
| `logik.js` | mischen, Frage vorbereiten/bewerten, Version | Auszug aus `js/logik.js`; Prüfungssimulation und Modulauswahl bleiben BIM-spezifisch im bim-trainer |
| `leitner.js` | Karteikarten (Spaced Repetition) | neu – im bim-trainer z. B. für Glossarbegriffe nutzbar |
| `speicher.js` | Speicherformat, Normalisierung, Zusammenführen, Export/Import (Datei + Code) | neu – bim-trainer hat nur localStorage ohne Export |
| `fortschritt.js` | Weiterlernen, Fertig-Regel | IT-trainer-spezifischer als der Rest (Folgen/Abschnitte); für bim-trainer nur `besuche`-Muster interessant |
| `router.js`, `dom.js`, `thema.js`, `update.js` | Hash-Adressen, DOM-Helfer, Farben aus Konfiguration, Update-Leiste | Gegenstücke stecken heute in der großen `js/app.js` |

## Schritte für eine Übernahme (Vorschlag, nicht beauftragt)
1. **Speicher zuerst klären – kritisch:** Der bim-trainer speichert unter `bimtrainer.v1` ein anderes Format (`fortschritt`, `fehler`,
   `einstellungen`). Übernahme nur mit einer Migration in `normalisiere` (Format „bim-0“ → 1), die alte Stände verlustfrei liest; Schlüssel
   bleibt `bimtrainer.v1`. Vorher Export-Funktion einbauen, damit Philip ein Backup ziehen kann. → braucht Philips OK.
2. `js/kern/` als Kopie übernehmen (kein gemeinsames Paket – beide Projekte sollen unabhängig deploybar bleiben). Unterschiede per
   `diff -r` sichtbar halten; Änderungen am Kern in beiden Projekten nachziehen und in beiden CHANGELOGs vermerken.
3. `markdown.js`/`glossar.js` ersetzen, CSS-Klassen der Hinweisbox anpassen, Glossar-Sonderfälle in die Daten verschieben, Tests übernehmen.
4. `app.js` (1 359 Zeilen) schrittweise in `js/ui/`-Module zerlegen: zuerst Glossar, dann Wissen, dann Prüfen/Simulation.
5. Rollen, Module, Farben aus `app.js` in eine `config.json` des bim-trainers ziehen.
6. Später optional: Fragen ebenfalls aus Markdown bauen (heute Python-Importer aus PDF-Quellen – kann bleiben).

Aufwand grob: Schritte 2–3 ein halber Tag, Schritt 4–5 ein bis zwei Tage, Schritt 1 klein, aber mit Rückfrage.
