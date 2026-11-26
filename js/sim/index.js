// Verzeichnis aller Simulatoren. Name (wie im Inhalt „:::sim name“) → Lade-Funktion.
// Simulatoren werden erst geladen, wenn eine Folge sie zeigt. Neue Simulatoren hier eintragen und in sw.js
// (APP_DATEIEN) aufnehmen – der Test prüft beides. Schnittstelle: js/sim/README.md.
export const SIMULATOREN = {
  'bit-schalter': () => import('./bit-schalter.js'),
  zahlenraten: () => import('./zahlenraten.js'),
  // Platzhalter für Code-Übungen (Python ab Staffel 3, JavaScript ab Staffel 5) – siehe docs/code-uebungen.md
  code: () => import('./code.js'),
};
