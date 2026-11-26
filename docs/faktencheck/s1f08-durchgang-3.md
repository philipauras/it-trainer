# Faktencheck s1f08 – Durchgang 3 (Umstellung auf das neue Format)

- Datum: 26.11.2026
- Geprüfte Datei: `content/staffel-1/folge-08-betriebssystem.md` (Arbeitsstand, verglichen mit `git diff HEAD`)
- Prüfer: unabhängige Prüfung (Subagent, hat die Folge nicht geschrieben)
- Schwerpunkt: Prüfpunkte 8–10 und alle geänderten Sätze, Quizfragen und Karten; besonders q06 (Unix), das Fazit
  („Ein Kern führt immer nur einen Prozess aus“ vs. Hyper-Threading). Die übrige Datei wurde erneut gelesen; die in Durchgang 1/2
  geprüften Fakten sind unverändert.

## Geprüft

| Punkt | Ergebnis |
|---|---|
| Einstieg: „holen, entschlüsseln, ausführen (mehr dazu in Folge 6)“ statt „weißt du aus Folge 6“ | eigenständig, korrekt |
| Bell Labs „ein großes Forschungslabor in den USA“ statt Rückgriff auf Shannon/Folge 1 | Rückgriff auf frühere Geschichte entfernt – gut |
| Register „(winzige Speicherplätze direkt im Prozessor)“, Befehlszähler erklärt | korrekt |
| Cache „den kleinen, schnellen Zwischenspeicher des Prozessors (mehr dazu in Folge 7)“ | korrekt |
| Prozessortakt „(Rhythmus des Prozessors, nur Nanosekunden lang; Folge 6)“ | korrekt (bei 1–5 GHz 0,2–1 ns) |
| Auslagern: „SSD um ein Vielfaches langsamer als der Arbeitsspeicher“ | korrekt (≈ 100 ns vs. 20–100 µs, Faktor mehrere Hundert) |
| Rückgriffe auf Bilder/Geschichten früherer Folgen | keine mehr; Folge 9 nur als Ausblick |
| Übung 1 nachgerechnet | Wartezeit Musik = 2·s + 3, Umschaltanteil = 1/(s+1) → nur s = 2 und 3 erfüllen ≤ 9 und ≤ ⅓; bei 4: 11 – Auflösung stimmt |
| q02–q05, q07: genau eine richtige Antwort, Erklärungen korrekt, ohne Folge verständlich | ja |
| q07 neu („Kernel des Computers, von dem aus man ihn bedient“ statt „Windows-Kernel deines PCs“) | eindeutig falsch, gut für den Lernpool |
| `Nachlesen:`-Stellen | alle vorhanden (`npm run pruefen` meldet keinen Formatfehler), q03 jetzt passend auf „Zeitscheiben“ statt `selbst` |
| Fazit Satz 1 und 3 | korrekt, treffen das Wichtigste |
| Format: keine Handwerks-Wörter (der „Großmeister“ im Schachbild ist ein Schachtitel, keine Stufenbezeichnung) | ok |

## Fehler

### F1 – q06 (Unix): Frage nach dem Motiv mit missverständlichem Ablenker und zeitlich verschobener „richtiger“ Antwort
Fundstelle: `[quiz]` s1f08-q06.

1. **Ablenker „Weil Unix auf möglichst vielen Computern laufen sollte, ohne neu geschrieben zu werden“** ist als *Motiv von 1969*
   zwar falsch (Thompson schrieb das erste Unix in Assembler für genau eine PDP-7; die Übertragbarkeit kam erst mit der C-Fassung 1973,
   der erste Port auf eine fremde Maschine 1977). Für den Lernenden ist er aber **nicht eindeutig falsch**: Die Folge betont selbst,
   dass sich Unix dank C „auf andere Computer übertragen“ ließ und dass das „ein Grund ist, warum seine Ideen bis heute überall
   stecken“, und Karte k09 fragt genau das ab. Wer gut gelernt hat, hält die Übertragbarkeit für eine Kerneigenschaft von Unix und
   kann den Unterschied „Entstehungsmotiv 1969“ vs. „Eigenschaft ab 1973“ nur über Jahreszahlen auflösen – das widerspricht
   Prüfpunkt 10 (keine Detail-/Jahreszahlfragen) und Prüfpunkt 5 (keine missverständlichen Ablenker).
2. **Die richtige Antwort ist als Entstehungsgrund leicht anachronistisch:** Die Idee „kleine, kombinierbare Werkzeuge“ wurde erst
   mit den Pipes (1972/73, angestoßen von Doug McIlroy) prägend und später als „Unix-Philosophie“ formuliert. 1969 wollten Thompson
   und Ritchie laut Ritchie (Quelle im Kopf: „The Evolution of the Unix Time-sharing System“) vor allem eine angenehme, einfache
   Arbeitsumgebung behalten, nachdem Multics weggefallen war. Der Folgentext („Seine Idee war Schlichtheit – kleine Werkzeuge …“)
   ist als Beschreibung *der Idee von Unix* vertretbar; die Quizfrage macht daraus aber den *Anlass* der Entstehung.

Vorschlag (Frage nach der Idee statt nach dem Anlass, Ablenker eindeutig falsch):

```
### s1f08-q06
Unix entstand 1969, nachdem die Bell Labs aus dem großen, komplizierten Betriebssystem-Projekt Multics ausgestiegen waren. Welche Idee prägt Unix bis heute?
- [ ] Ein einziges großes Programm, das alle Aufgaben selbst erledigt
- [x] Schlichtheit: kleine Werkzeuge, die je eine Sache gut können und sich kombinieren lassen
- [ ] Jeder Benutzer bekommt einen eigenen Computer und muss nichts teilen
- [ ] Programme sprechen die Geräte direkt an, ganz ohne Kernel
Erklärung: Ken Thompson und Dennis Ritchie wollten nach Multics ein einfaches, angenehmes System zum Arbeiten. Daraus wurde Schlichtheit als Prinzip: kleine Werkzeuge, die je eine Sache gut können und sich kombinieren lassen – das Gegenteil des großen, komplizierten Multics.
Nachlesen: geschichte
```

(Alternativ die bisherige Frage behalten, aber den Übertragbarkeits-Ablenker ersetzen, z. B. durch „Weil Unix nur auf den größten
Rechnern der Bell Labs laufen sollte“ – falsch, weil es auf einem kaum genutzten Kleinrechner entstand –, und die richtige Antwort
auf „Weil zwei Forscher ein einfaches System zum Arbeiten wollten“ kürzen.)

### F2 – „Ein Prozessorkern führt immer nur einen Prozess aus“ widerspricht dem Hyper-Threading-Satz derselben Folge
Fundstellen: `[fazit]` Punkt 2, Merke-Box in „Zeitscheiben“, Satz „Auf einem Prozessorkern läuft **immer nur ein Prozess**“ und
q01 (richtige Antwort „Genau einen“).

In `[beidir]` steht korrekt: Mit Hyper-Threading kann jeder Kern zwei Befehlsströme verschränkt abarbeiten, und das Betriebssystem
behandelt jeden wie einen eigenen Kern – diese zwei Befehlsströme können zu zwei verschiedenen Prozessen gehören. Damit ist das
absolute „immer nur einen“ auf den meisten heutigen PCs (wohl auch Philips Windows-PC) falsch. Bisher war das eine Empfehlung
(Durchgang 2, E1), weil die Aussage nur im Lauftext stand. Jetzt ist sie einer der vier **Kernsätze** in „Auf den Punkt“ (Prüfpunkt 9:
muss fachlich stimmen) und die Antwort einer Lernpool-Frage, die ohne den Folgentext erscheint. Bei q01 widerspricht die eigene
Erklärung („Hyper-Threading verschränkt höchstens zwei“) sogar der als richtig markierten Antwort „Genau einen“ für „einen
bestimmten Augenblick“.

Vorschlag (kleinste Änderung):
- Fazit: „Ein Prozessorkern arbeitet im Grundsatz nur einen Prozess zur Zeit ab (mit Hyper-Threading höchstens zwei verschränkt).
  Der Scheduler wechselt …“
- Merke-Box und Lauftext: „Ein Prozessorkern führt im Grundsatz immer nur einen Prozess aus (Sonderfall Hyper-Threading: siehe
  ‚Wo steckt das bei dir?‘).“
- q01-Fragetext: „Ein Rechner hat einen einzigen Prozessorkern ohne Hyper-Threading. …“ (Antworten und Erklärung können bleiben).

## Empfehlungen

### E1 – Fazit Satz 4: „nur fehlerhafte Treiber“ ist zu ausschließlich
Fundstelle: `[fazit]` Punkt 4. Auch ein Fehler im Kernel selbst lässt den ganzen Rechner abstürzen, nicht nur Treiber. Vorschlag:
„… – nur Fehler im Kernel, etwa in einem Treiber, können den ganzen Rechner lahmlegen.“

### E2 – k09 fragt zwei Dinge ab
Fundstelle: k09 „Was war die Grundidee von Unix, und wodurch ließ es sich auf andere Computer übertragen?“ – zwei Sachen auf einer
Karte (Prüfpunkt 6: eine Sache je Karte). Vorschlag: auf „Wodurch ließ sich Unix auf andere Computer übertragen?“ → „Thompson und
Ritchie schrieben es 1973 in der Programmiersprache C neu, statt in der Maschinensprache eines bestimmten Rechners.“ beschränken
(die Grundidee fragt dann q06 ab).

### E3 – offene Empfehlungen aus Durchgang 2
E2 („doppelte Zahl“ logischer Prozessoren bei Intel-Hybridprozessoren nicht immer), E3 (k02 „alle anderen Programme“ vs.
Treiber-Ausnahme), E4 (Glossar `linux` mit Philips Namen) und E5 (Überschrift „bim-trainer und diese App“) sind weiterhin offen
und weiterhin optional.

## Zusammenfassung

Die Umstellung auf „Folge steht für sich“ ist gelungen: Alle Rückgriffe (Folge 1/Shannon, „du erinnerst dich“, „weißt du aus
Folge 6“) sind durch kurze Neuerklärungen ersetzt, die Lernpool-Fragen sind meist gut verständnisorientiert. Zwei Fehler: q06 mit
missverständlichem Ablenker und Anlass/Idee-Verwechslung (F1), absolutes „immer nur ein Prozess“ im Fazit und in q01 trotz
Hyper-Threading (F2). Beides sind kleine Formulierungskorrekturen, keine grundsätzlichen fachlichen Probleme. 3 Empfehlungen.

Ergebnis: nicht bestanden
