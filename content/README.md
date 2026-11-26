# Inhalte des IT-Trainers – so schreibst du eine Folge

Alle Inhalte stehen in diesem Ordner als einfache Textdateien (Markdown). Die App liest sie **nicht direkt**:
`npm run bauen` macht daraus die Dateien in `inhalt/` (die nie von Hand bearbeitet werden). Ein Fehler im
Format wird dabei mit Datei und Stelle gemeldet – du kannst also nichts kaputt machen, ohne es zu merken.

```
content/
  README.md                 diese Anleitung
  glossar.md                alle Fachbegriffe
  neuigkeiten.md            „Was ist neu“ je Version (erscheint in der App nach einem Update)
  staffel-1/
    folge-01-bit.md         eine Datei je Folge (Name frei, Reihenfolge kommt aus config.json)
```

## Ablauf für eine neue Folge

1. **Plan:** Die Folge steht schon in `config.json` unter `staffeln → folgen` mit `id`, `titel`, `untertitel`
   und `schicht`. Fehlt sie, dort eintragen (ID-Schema unten). Titel stehen **nur** dort, nicht in der Folgen-Datei.
2. **Datei anlegen:** `content/staffel-N/folge-NN-stichwort.md` – am einfachsten eine bestehende Folge kopieren.
3. **Schreiben** mit `status: entwurf`.
4. `npm run bauen` – meldet fehlende Teile. Dann `npm run ids-aufnehmen` (neue IDs werden „eingefroren“, siehe unten).
5. **Faktencheck** durch eine unabhängige Prüfung (nicht die Person/der Agent, die geschrieben hat). Bestanden →
   `status: geprueft` und Zeile `faktencheck:` ausfüllen. Nicht bestanden → überarbeiten, erneut prüfen.
6. Tests grün (`npm test`) → `status: freigegeben`. Neuigkeit in `neuigkeiten.md`, Version in `config.json` anheben.
7. Veröffentlichen: siehe `CLAUDE.md` (Vorschau mit automatischer Prüfung → live).

| Status | Bedeutung | Vorschau | Live |
|---|---|---|---|
| `entwurf` | geschrieben, noch nicht geprüft | sichtbar, gelb markiert „Entwurf“ | nicht sichtbar („in Arbeit“) |
| `geprueft` | Faktencheck bestanden | sichtbar, markiert „Geprüft“ | nicht sichtbar |
| `freigegeben` | geprüft und Tests grün | sichtbar | **sichtbar** |

## Aufbau einer Folgen-Datei

```markdown
---
id: s1f01
status: entwurf
dauer: 15
quellen:
- Claude E. Shannon: A Mathematical Theory of Communication (1948) | https://…
- Ein Buch ohne Link
faktencheck: 26.11.2026 – bestanden (unabhängige Prüfung): fachlich korrekt, verständlich, Bild stimmig
---

## [einstieg] Kann ein Lichtschalter sprechen?
Text …

## [geschichte] …
## [prinzip] …
## [werkstatt] …   (in der App „Im Bild“)
## [selbst] …
## [beidir] Wo steckt das bei dir?
## [fazit] Auf den Punkt
## [quiz] …          (Lernpool – erscheint nicht in der Folge)
## [karten] …        (Lernpool – erscheint nicht in der Folge)
```

**Kopf** (zwischen den beiden `---`):

| Feld | Pflicht | Inhalt |
|---|---|---|
| `id` | ja | ID aus `config.json`, z. B. `s1f01` |
| `status` | ja | `entwurf`, `geprueft` oder `freigegeben` |
| `dauer` | ja | ungefähre Minuten (Ziel: 15–20) |
| `quellen` | ja | Liste, je Zeile `- Text` oder `- Text \| https://link` |
| `faktencheck` | bei `freigegeben` | Datum, Ergebnis, wer geprüft hat |

**Abschnitte** – genau diese neun, genau in dieser Reihenfolge. Die ersten sieben bilden die Folge, `[quiz]` und
`[karten]` stehen nur in der Datei und kommen in den **Reiter Lernen** (siehe „Aufbau der App und Lernen“). Hinter `[schlüssel]` steht die
Überschrift, die in der App erscheint (frei wählbar, gern als Frage):

| Schlüssel | In der App | Wozu |
|---|---|---|
| `[einstieg]` | a · Einstieg | eine Frage, die neugierig macht – der erste Absatz erscheint groß |
| `[geschichte]` | b · Geschichte | wer, wann, warum – erzählt wie eine gute Doku |
| `[prinzip]` | c · Das Prinzip | das Konzept, mit interaktiver Grafik/Simulator |
| `[werkstatt]` | d · Im Bild | ein Alltagsbild, das das Prinzip trifft (siehe „Bilder“ unten) – und wo es hinkt. Der Schlüssel heißt aus Speichergründen weiter `werkstatt` |
| `[selbst]` | e · Selbst machen | mindestens eine **Übung** (Simulator mit `id:`) |
| `[beidir]` | f · Wo steckt das bei dir? | Bezug zu Philips echten Systemen (siehe unten) |
| `[fazit]` | g · Auf den Punkt | **3–4 Kernsätze** als Liste (`- …`). Die App ergänzt darunter „X neue Fragen zum Lernen“ (Link zum Reiter Lernen) und den Knopf „Folge abschließen“ |
| `[quiz]` | – (Lernpool) | Quizfragen (Format unten) – nach dem Abschluss der Folge im Reiter Lernen |
| `[karten]` | – (Lernpool) | Karteikarten (Format unten) – nach dem Abschluss der Folge im Reiter Lernen |

## Text schreiben (Markdown)

| So schreibst du | So sieht es aus |
|---|---|
| Leerzeile | neuer Absatz |
| `**fett**`, `*kursiv*` | **fett**, *kursiv* |
| `` `01000001` `` | Code/Bitmuster in fester Schrift |
| `- Punkt` / `1. Punkt` | Aufzählung / nummerierte Liste (zwei Leerzeichen davor = Unterpunkt) |
| `### Zwischenüberschrift` | kleinere Überschrift im Abschnitt |
| `\| a \| b \|` + Zeile `\|---\|---\|` | Tabelle |
| `[Text](https://…)` | Link (nur https) |
| ```` ``` ```` … ```` ``` ```` | Codeblock |
| `> **Merke:** Text` | Hinweisbox. Marken: `Merke`, `Im Bild`, `Achtung`, `Beispiel`, `Wusstest du?` (Liste in `config.json → boxen`) |
| `> Text` | normales Zitat |

HTML wird nicht ausgeführt, sondern als Text gezeigt.

**Fachbegriffe:** beim ersten Auftreten im Text kurz erklären **und** in `glossar.md` eintragen. Die App
unterstreicht jeden Glossarbegriff einmal je Abschnitt; antippen zeigt die Erklärung. In Quizfragen und
-antworten wird nichts markiert (wäre ein Lösungshinweis).

## Simulatoren und Übungen

```markdown
:::sim bit-schalter
schalter: 3
buchstabe: ja
:::
```

- Erste Zeile `:::sim <name>`, dann Einstellungen `name: wert` (Zahl, `ja`/`nein` oder Text), Ende `:::`.
- Mit `id: s1f01-u01` wird der Simulator zur **Übung**: Sie wird im Fortschritt gespeichert, sobald sie geschafft ist.
  Jede Folge braucht in `[selbst]` mindestens eine Übung.
- Vorhandene Simulatoren und ihre Einstellungen:

| Name | Einstellungen | Was er zeigt |
|---|---|---|
| `bit-schalter` | `schalter` (1–8, Start), `veraenderbar` (ja/nein), `buchstabe` (ja/nein: bei 8 Schaltern ASCII-Zeichen zeigen), `ziel` (ein Zeichen, z. B. `P` – Übung: dieses Zeichen einstellen) | Lichtschalter = Bits, Anzahl der Muster |
| `zahlenraten` | `max` (Standard 64) | Zahl mit Ja/Nein-Fragen finden; Übung geschafft, wenn gefunden |
| `code` | `sprache` (python/javascript), `start` | Platzhalter für Code-Übungen (ab Staffel 3) |
| `transistor` | `art` (transistor/relais), `anordnung` (einzeln/reihe/parallel/nicht), `tabelle` (ja = Übung: Wahrheitstabelle) | Stromkreis: Steuerstrom schaltet Lampe; Reihe = UND, parallel = ODER |
| `schaltung` | `eingaenge`, `gatter` (z. B. `S=XODER(A,B); C=UND(A,B)`, Typ `?` = wählbar), `ausgaenge`, `namen`, `start`, `zahl`, `tabelle` (Übung), `ziel` + `auswahl` (Übung: richtiges Gatter wählen) | Logikgatter-Schaltungen, zeichnet sich selbst |
| `binaer` | `stellen` (1–8), `zaehlen` (ja: Knopf +1), `ziel` (Zahlenliste – Übung) | Schalter mit Stellenwerten, Binär ↔ Dezimal |
| `flipflop` | `art` (sr/ram), `uebung` (ja, bei sr), `ziel` (bei ram, z. B. `1=0101; 2=0011`) | RS-Flipflop aus NODER; kleiner RAM 4 × 4 Bit |
| `cpu` | `programm` (Zellen mit `;`), `ziel` (`ende` oder `8=10`), `aenderbar` | Spielzeug-Prozessor: Holen, Entschlüsseln, Ausführen |
| `zugriffszeit` | `festplatte` (ja/nein) | Zugriffszeiten Register … Festplatte, hochgerechnet auf Alltagszeit |
| `scheduler` | `zeitscheibe` (1–8), `uebung` (ja) | drei Programme teilen sich einen Kern (Zeitscheiben) |
| `dateisystem` | `dateien` (`name = Stück\|Stück; …`), `ziel` (Dateiname – Übung) | Blöcke, Inhaltsverzeichnis, verkettete Blöcke |
| `addierer` | `stellen` (2–8), `ziel` (`3+4, 5+6, ueberlauf` – Übung) | Rechenwerk aus Volladdierern mit Übertragswelle |
| `sortieren` | `elemente` (richtige Reihenfolge, mit `\|` getrennt), `oben`, `unten` | Übung: in Reihenfolge bringen |
| `zuordnen` | `gruppen` (mit `\|`), `paare` (`Text = Gruppe \| …`) | Übung: Karten Gruppen zuordnen |

Jeder Simulator beschreibt seine Optionen genau im Kopfkommentar von `js/sim/<name>.js`. `npm run bauen` prüft die Einstellungen
und meldet z. B. eine unlösbare Übung. Übungen ohne Fingertipp-Weg für die automatische Prüfung brauchen einen Haken `_loesen` (siehe `js/sim/README.md`).

Neue Simulatoren programmiert der Agent (`js/sim/`, Anleitung in `js/sim/README.md`).

## Aufbau der App und Lernen (Philip, 26.11.2026)

Unten genau **drei Reiter** (am PC dieselben drei in der linken Leiste), dazu ein **Zahnrad oben rechts**:

1. **Start = die Doku-Reihe:** Schichten-Karte und Staffeln mit ihren Folgen – sonst nichts, keine Lern-Elemente.
   Am Ende jeder Folge steht „Auf den Punkt“ und als reiner Text „X neue Fragen zum Lernen“ mit Link zum Reiter Lernen.
2. **Lernen** – nur über diesen Reiter erreichbar, bewusst schlicht: Liste Staffel → ihre Folgen. Nur abgeschlossene Folgen
   („Folge abschließen“) sind übbar, die anderen ausgegraut. Antippen startet eine Übungsrunde zur Folge; je Staffel zusätzlich
   „Ganze Staffel üben“ und „Prüfung“ (nur Fragen, Auswertung je Folge). Fortschritt nur als Balken „X von Y sicher“ je Folge und
   Staffel – keine Tagesrunde, keine Festigkeit, keine Fächer, Fälligkeiten oder Termine, kein Zähler am Reiter.
   Im Hintergrund: In einer Runde kommen falsch Beantwortetes und Unsicheres zuerst (Leitner-Fächer, unsichtbar).
   „Im Wissen nachlesen“ springt an die Stelle in der Folge (`Nachlesen: abschnitt / Zwischenüberschrift`), „Zurück zur Runde“ führt zurück.
3. **Glossar** – alle Begriffe mit Suche.

**Zahnrad:** Neuigkeiten („Was ist neu“), Darstellung, Fortschritt sichern/übertragen, Über die App. Ein Punkt am Zahnrad zeigt ungelesene Neuigkeiten.

Quizfragen und Karteikarten (unten) sind das Material für den Reiter Lernen – beide zählen als „Fragen“.

## Quiz

```markdown
## [quiz] Teste dich

### s1f01-q01
Wie viele verschiedene Zustände kann ein einzelnes Bit haben?
- [ ] Einen
- [x] Zwei
- [ ] Zehn
- [ ] Beliebig viele
Erklärung: Ein Bit ist eine Entscheidung zwischen genau zwei Möglichkeiten – an/aus, ja/nein, 1/0.
Nachlesen: prinzip
```

- `### <id>` beginnt eine Frage. ID-Schema: `<folge>-q01`, `-q02`, …
- Danach der Fragetext, dann 2–4 Antworten: `- [x]` = richtig (genau eine), `- [ ]` = falsch. Die App mischt die Reihenfolge.
- `Mischen: nein` hält die Reihenfolge fest (z. B. bei „Alle genannten“).
- `Erklärung:` Pflicht – warum die richtige Antwort richtig ist (darf mehrere Zeilen haben).
- `Nachlesen:` Pflicht – Abschnitt, in den „Im Wissen nachlesen“ springt (`prinzip`, `geschichte`, …). Mit Stelle:
  `Nachlesen: prinzip / Acht Bits sind ein Byte` springt zur Zwischenüberschrift `### Acht Bits sind ein Byte` (der Build prüft, dass es sie gibt).
- **Verständnis statt Detailwissen:** Fragen eher „Was passiert, wenn …?“, „Warum …?“, „Woran erkennst du …?“ –
  nicht Jahreszahlen oder Namen abfragen. Die Frage muss **ohne die Folge vor Augen** verständlich sein (beim Üben einer ganzen Staffel erscheint sie gemischt mit anderen Folgen).
- Mindestens 4 Fragen je Folge. Antworten ähnlich lang halten, damit die Länge nichts verrät.

## Karteikarten

```markdown
## [karten] Für deinen Karteikasten

### s1f01-k01
Vorne: Was ist ein Bit?
Hinten: Die kleinste Einheit der Information: eine Entscheidung zwischen zwei Möglichkeiten (0 oder 1).
```

- ID-Schema `<folge>-k01`, … Mindestens 4 Karten je Folge.
- Eine Karte = eine Sache. Vorne eine Frage, hinten eine kurze Antwort (ein bis zwei Sätze).
- Auch Karten müssen für sich allein verständlich sein (beim Staffel-Üben gemischt). Lieber nach dem Begriff fragen als nach dem Bild.

## Stabile IDs – wichtig für den Lernfortschritt

Der Fortschritt im Browser hängt an den IDs von Folgen, Fragen, Karten und Übungen. Darum:

- **Eine einmal veröffentlichte ID nie ändern, nie löschen, nie für etwas anderes verwenden.**
- Eine Frage verbessern (Text, Antworten, Erklärung) ist erlaubt – die ID bleibt.
- Eine Frage soll weg? Erst nachfragen. Technisch: `tests/fixtures/ids.json` kennt alle IDs; fehlt eine, schlägt `npm test` fehl.
- Neue IDs nimmt `npm run ids-aufnehmen` in diese Liste auf.

| Was | Schema | Beispiel |
|---|---|---|
| Folge | `s<staffel>f<nr>`, Abschlussprojekt `s<staffel>g` | `s1f01`, `s1g`, Brücke zu BIM: `sbimf01` |
| Quizfrage | `<folge>-q<nr>` | `s1f01-q03` |
| Karteikarte | `<folge>-k<nr>` | `s1f01-k07` |
| Übung | `<folge>-u<nr>` | `s1f01-u01` |
| Glossarbegriff | Kleinbuchstaben, Bindestriche | `bit`, `utf-8` |

## Jede Folge steht für sich (Philip, 26.11.2026)

Philip will in **jede Folge springen können, ohne die vorigen zu kennen**.

- **Bild und Geschichte gehören nur zu ihrer Folge.** Keine Rückgriffe auf Bilder oder Geschichten aus früheren Folgen
  (nicht „wie die Laternen aus Folge 1“, keine Wiederkehr einer Geschichte in einer späteren Folge).
- **Fachwissen darf aufeinander aufbauen.** Braucht eine Folge einen Begriff oder ein Prinzip von vorher, wird es in
  **1–2 Sätzen neu erklärt**, mit Verweis („mehr dazu in Folge 3“). Ein Bild von vorher wird nie vorausgesetzt.
- Ausblicke auf spätere Folgen sind erlaubt, solange nichts davon zum Verstehen nötig ist.
- Prüfpunkt im Faktencheck: „Folge funktioniert ohne Vorwissen aus früheren Bildern/Geschichten.“

## Bilder, Grafiken und Mitmachen (gilt für alle Folgen – Philip, 26.11.2026)

**Kein durchgehendes Bild.** Es gibt keine Serien-Analogie (früher „Werkstatt“) mehr. Alles bleibt bildlich, aber
**pro Thema wird das Alltagsbild gewählt, das das Prinzip am besten trifft** – Bibliothek, Verkehr, Post, Küche,
Wasserleitung, Parkhaus … Abwechslungsreich, nicht erzwungen.

- Ein Bild pro Folge im Abschnitt d (`[werkstatt]`, in der App „Im Bild“); kleinere Vergleiche im übrigen Text sind erlaubt.
- Das Bild muss den **Mechanismus** treffen, nicht nur die Stimmung. Probe: Kann man aus dem Bild eine richtige Vorhersage ableiten?
- Kurze Zusammenfassung als Box `> **Im Bild:** …` (Bild-Teil = Computer-Teil).
- Jedes Bild hinkt irgendwo – sag kurz (ein bis zwei Sätze), wo (`> **Achtung:** …`).
- **Hinkt ein Bild zu sehr, lieber eine gute Grafik oder Animation** (Simulator) statt einer schiefen Analogie. Der Abschnitt d
  darf dann statt eines Alltagsbildes eine Grafik zeigen.
- Kein Bild aus einer früheren Folge erneut als Hauptbild verwenden (Liste unten pflegen).
- Der **Faktencheck prüft auch die Bilder**: Stimmt der Vergleich? Wird klar gesagt, wo er hinkt?

**Mitmachen (Philips Feedback zu Folge 1):** Interaktive Schalter und Übungen kommen am besten an – davon mehr.
Jede Folge hat mindestens **einen Simulator im Prinzip** und **mindestens zwei Übungen** in „Selbst machen“, möglichst
zum Anfassen (Schalter umlegen, Gatter wählen, Schritte ordnen) statt nur Lesen.

**Stufen und Staffelende:** keine Handwerks-Begriffe (Lehrling/Geselle/Meister, Gesellenstück). Stufen heißen
**Grundlagen / Aufbau / Vertiefung**, am Ende einer Staffel steht ein **Abschlussprojekt** (`art: abschlussprojekt`).

Bisher verwendete Hauptbilder:

| Folge | Bild |
|---|---|
| s1f01 Bit | Parkhaus-Lämpchen (frei/belegt) |
| s1f02 Transistor | Druckgesteuertes Ventil im Wasserkreislauf |
| s1f03 Gatter | Alltagsschaltungen: Schließfach (UND), Klingel mit zwei Tastern (ODER), Kühlschranklicht (NICHT), Wechselschaltung (XODER) |
| s1f04 Binär | Kilometerzähler mit Rollen, die nur 0 und 1 zeigen |
| s1f05 Speicher | Anforderungstaster an der Fußgängerampel („Signal kommt“) |
| s1f06 Prozessor | Köchin mit nummerierten Fächern (Rezeptkarten und Zutaten im selben Regal) |
| s1f07 Speicherhierarchie | Lernen am Schreibtisch: Hand, Tisch, Regal, Bibliothek, Fernleihe |
| s1f08 Betriebssystem | Simultanschach |
| s1f09 Doppelklick | Zeitschrift mit „Fortsetzung auf Seite …“ |
| s1g Addierer | Dominoreihe (Übertragswelle) |

## „Wo steckt das bei dir?“

Bezug zu Philips echten Systemen – konkret mit Zahlen, wo es passt:

- **VPS** (gemieteter Server): 1 virtueller Prozessorkern (vCPU), 3,8 GB Arbeitsspeicher, Linux
- **der Agent** (Claude) läuft dort in einem **Docker-Container**
- **bim-trainer** liegt bei **Cloudflare Pages** (wie diese App)
- **Windows-PC** und **Pixel-Handy** (Android)

## Glossar (`glossar.md`)

```markdown
## Bit
id: bit
woerter: Bit, Bits
kurz: Kleinste Einheit der Information – eine Entscheidung zwischen zwei Möglichkeiten, geschrieben als 0 oder 1.
mehr: Kunstwort aus „binary digit“ (Binärziffer). Acht Bit ergeben ein Byte.
folge: s1f01
```

| Feld | Pflicht | Inhalt |
|---|---|---|
| `id` | ja | stabil, Kleinbuchstaben/Bindestriche – nie ändern |
| `woerter` | nein | alle Schreibweisen, die im Text unterstrichen werden (sonst nur der Begriff selbst). Abkürzungen in Großbuchstaben werden nur genau so erkannt |
| `kurz` | ja | ein Satz, für Fachfremde |
| `mehr` | nein | ein bis zwei Sätze mehr |
| `folge` | nein | Folge, die den Begriff erklärt (Link im Glossar) |
| `markieren` | nein | `nein` = steht im Glossar, wird aber nicht im Text unterstrichen |

## Neuigkeiten (`neuigkeiten.md`)

```markdown
## 1.1.0 – 28.11.2026
- Neue Folge: Strom als Sprache – vom Relais zum Transistor
```

Der oberste Eintrag muss die Version aus `config.json → app.version` haben. Nach einem Update zeigt die App
alle Punkte, die der Nutzer noch nicht gesehen hat.

## config.json (Überblick)

| Bereich | Inhalt |
|---|---|
| `app` | Name, Untertitel, Version, Speicher-Schlüssel (nie ändern), Code-Präfix für den Fortschritts-Code |
| `farben` | Akzent- und Hintergrundfarbe für hell und dunkel |
| `stufen` | Grundlagen, Aufbau, Vertiefung (die IDs `lehrling`/`geselle`/`meister` sind historisch und bleiben) |
| `schichten` | die Schichten-Karte „Vom Sandkorn zur KI“ (von unten nach oben) |
| `staffeln` | Plan: Staffeln mit Stufe, Schichten und Folgen (ID, Titel, Untertitel, Schicht, ggf. `art: abschlussprojekt`) |
| `abschnitte` | die sieben sichtbaren Abschnitte einer Folge (Titel, Buchstabe, Symbol) |
| `lernpoolAbschnitte` | `quiz` und `karten` – stehen in der Datei, erscheinen im Reiter Lernen |
| `boxen` | erlaubte Hinweisboxen |
| `regeln` | Status-Stufen, Mindestzahlen für Quiz/Karten, Leitner-Fächer (unsichtbar), Rundengröße und Prüfung (`lernen`), Kernsätze im Fazit |
