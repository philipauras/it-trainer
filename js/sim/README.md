# Simulatoren

Ein Simulator ist ein ES-Modul in diesem Ordner mit einer Standard-Funktion:

```js
export default function starte({ wurzel, optionen, fertig, istFertig }) {
  // wurzel:    leeres <div>, in das gezeichnet wird (Vanilla JS/SVG, keine Bibliothek)
  // optionen:  Werte aus dem Inhalt, z. B. { schalter: 4 } aus „schalter: 4“ (Zahlen, ja/nein, Text)
  // fertig():  bei Übungen aufrufen, sobald sie geschafft ist (wird im Fortschritt gespeichert)
  // istFertig: true, wenn die Übung schon früher geschafft wurde
  return () => { /* optional: aufräumen (Timer stoppen …) */ };
}
```

Regeln
- In `index.js` eintragen und in `sw.js` (`APP_DATEIEN`) aufnehmen – `npm test` prüft beides.
- Bedienbar per Touch und Tastatur: echte `<button>`-Elemente, Tippflächen mind. 44 px, Zustand auch als Text (Screenreader).
- Farben nur über CSS-Variablen aus `css/thema.css`, keine festen Farbwerte im Code (hell/dunkel).
- Keine Netzwerkzugriffe (CSP erlaubt nur die eigene Adresse); schwere Bibliotheken nur per dynamischem Import.
- Reine Rechenlogik als eigene, exportierte Funktion schreiben und in `tests/` testen.
