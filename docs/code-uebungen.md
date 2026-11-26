# Code-Übungen (ab Staffel 3) – vorbereitete Architektur

**Stand:** Platzhalter-Simulator `js/sim/code.js` (zeigt nur Code). Das Inhaltsformat ist schon fertig:

```markdown
:::sim code
id: s3f01-u01
sprache: python
start: name = "Philip"\nprint("Hallo", name)
pruefe: Hallo Philip
:::
```

**Plan Python (Staffel 3):** Pyodide (Python, nach WebAssembly übersetzt) läuft komplett im Browser.
- Laden **nur bei Bedarf**: `js/sim/code.js` importiert erst beim Öffnen einer Code-Übung einen Lader (`js/sim/python.js`), der Pyodide holt.
- Ausführen in einem **Web Worker**, damit eine Endlosschleife die App nicht einfriert (Abbrechen-Knopf beendet den Worker).
- Übung geschafft, wenn die Ausgabe `pruefe` entspricht (später auch eigene Prüffunktionen).
- **Offen (entscheide ich vor Staffel 3, ggf. Rückfrage):** Pyodide selbst hosten (~10–15 MB im Pages-Projekt, offline nutzbar, CSP bleibt
  „nur eigene Adresse“, kostenlos) oder vom CDN laden (kleineres Projekt, braucht Internet und eine CSP-Ausnahme in `_headers`).
  Tendenz: selbst hosten, aber **nicht** in den Offline-Vorabcache, sondern beim ersten Öffnen einer Code-Folge nachladen.

**Plan JavaScript (Staffel 5):** läuft ohne Zusatz in einem Worker bzw. einem abgeschotteten `<iframe sandbox>` (CSP beachten).
