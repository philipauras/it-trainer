// Platzhalter für Code-Übungen (Python ab Staffel 3 über Pyodide, JavaScript ab Staffel 5).
// Plan und Schnittstelle: docs/code-uebungen.md. Bis dahin zeigt der Block nur seinen Code an.
// Optionen: sprache (python | javascript), start (Startcode, \n = neue Zeile)
import { el } from '../kern/dom.js';

export default function starte({ wurzel, optionen }) {
  wurzel.append(
    el('pre', { class: 'code' }, [el('code', { text: String(optionen.start || '').replace(/\\n/g, '\n') })]),
    el('p', { class: 'sim-zusatz', text: `Ausführen von ${optionen.sprache === 'javascript' ? 'JavaScript (ab Staffel 5)' : 'Python (ab Staffel 3)'} folgt.` }),
  );
}
