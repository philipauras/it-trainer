# Faktencheck s1f08 „Betriebssystem“, Durchgang 2

Datum: 26.11.2026
Prüfer: unabhängiger Subagent (hat die Inhalte nicht geschrieben)
Geprüfte Datei: `content/staffel-1/folge-08-betriebssystem.md` (status: entwurf)
Mitgeprüft: Bericht Durchgang 1 (`docs/faktencheck/s1f08-durchgang-1.md`), Glossar `content/glossar.md` (17 Einträge mit
`folge: s1f08`), Kopfkommentar und Logik `js/sim/scheduler.js`, Bilder-Tabelle in `content/README.md`.
(`/workspace/tmp/glossar-neu/s1f08.md` gibt es nicht mehr – die Einträge stehen jetzt im Glossar.)

## Nachprüfung Durchgang 1

### F1 (Simultanschach-Zuordnung) – behoben

Die „Im Bild“-Box ordnet jetzt zu: Brett = Prozess, Stellung = gesicherter Zustand, Zug = Zeitscheibe, Weitergehen/Hineindenken =
Kontextwechsel, Reihenfolge = Scheduler, **Gegner = du (oder ein Gerät), der neue Eingaben liefert**. Der Hinkt-Satz nennt ausdrücklich,
dass die Gegner weiterdenken, ein Prozess aber stillsteht und nur von außen etwas für ihn ankommen kann (Tastendruck). Damit ist die
falsche Vorhersage „mein Programm rechnet weiter, während es nicht dran ist“ ausgeschlossen. Der Satz „hat dessen Gegner längst seinen
Antwortzug gemacht“ passt jetzt sauber (Eingabe ist inzwischen eingetroffen). Die drei Vorhersagen im dritten Absatz (mehr Bretter →
längeres Warten, Grübeln → alle warten, Hetzen → Zeit geht fürs Hineindenken drauf) gelten auch für den Prozessor. Probe bestanden.

### Umgesetzte Empfehlungen

| Punkt aus Durchgang 1 | Befund |
|---|---|
| E1 Ritchie-Link nokia.com | HTTP 200; Text identisch, enthält „not until well into 1970 that Brian Kernighan suggested the name ‚Unix'“ – korrekt |
| E2 Docker „What is a container?“ | HTTP 200; Seite sagt „every container on a machine shares that machine's kernel. There is no operating system to boot“ – passt zu Text, q07 und Beispiel-Box |
| E3 AOSP Application Sandbox | HTTP 200; „Android assigns a unique user ID (UID) to each Android app and runs it in its own process“ – belegt den Pixel-Absatz |
| E4 Kernighan 1970 / „Unics“ | korrekt und vorsichtig formuliert („zuerst wohl als ‚Unics'“), deckt sich mit Ritchie (1970) und Kernighans Memoir (Quelle ergänzt) |
| E5 Treiber im Kernel / Bluescreen | korrekt; Microsoft Learn (eigene Quelle): „Obwohl viele Treiber im Kernelmodus arbeiten …“ und „Wenn ein Kernelmodustreiber abstürzt, stürzt das gesamte Betriebssystem ab.“ „Die meisten“ ist vertretbar (Druckertreiber laufen unter Windows heute zwar meist im Benutzermodus, der Satz sagt aber nur „die meisten“). |
| E6 Zeitscheiben Linux vs. Windows | korrekt: Linux (CFS/EEVDF) wenige ms, Windows-Client 2 Zeitgeber-Takte ≈ 30 ms, für das Vordergrundprogramm bis ≈ 90 ms → „einige Dutzend“ stimmt. „Tausend- bis zehntausendmal“ (ms gegen µs) als Größenordnung richtig. Glossar „Zeitscheibe“ angepasst. |
| E7 „Takt“ ≠ Prozessortakt | umgesetzt, klar |
| E8 Hyper-Threading / logische Prozessoren | im Kern korrekt (Task-Manager „Leistung“ zeigt „Kerne“ und „Logische Prozessoren“); kleine Spannung zu q01 und neuen Intel-Prozessoren, siehe E1/E2 unten |
| E9 „in der Regel zwei Prozesse“ | umgesetzt, auch im Glossar „Prozess“ |
| E10 Übung 2 „Arbeitsspeicher deines Browsers“ | umgesetzt, Zuordnung jetzt eindeutig |
| E11 „unterbricht … übergibt dem Kernel“ | umgesetzt |
| E12 Treiber oft vom Hersteller, Standardgeräte vom BS | umgesetzt in Text, k07 und Glossar |
| E13 Prozesszahl „etwa zwanzig“ | korrekt: `ps -e` liefert heute 21 |
| E14 Bilder-Tabelle README | eingetragen (Zeile 226) |
| Claude Code auf dem VPS, Modell bei Anthropic | korrekt und eine gute Präzisierung: Auf dem VPS läuft nur das Programm Claude Code (und was es startet); die Antworten berechnet das Sprachmodell auf Servern von Anthropic. Datensicherung läuft tatsächlich auf dem Host, also auf demselben VPS-Kern. `nproc` = 1 und `/proc/cpuinfo` zeigt 1 Prozessor (geprüft), `uname -r` = `6.8.0-149-generic`. |

## Erneute Prüfung der ganzen Datei

- **Geschichte:** alle Daten wie in Durchgang 1 bestätigt (GM-NAA I/O 1956, CTSS Nov. 1961, Multics/Ausstieg 1969, Unix 1969 auf PDP-7,
  C-Neufassung 1973, Turing Awards 1983 bzw. Corbató, Linux 25.08.1991, NT 1993, XP 2001). Unverändert korrekt.
- **Prinzip:** Kernel-/Benutzermodus, Prozess, Zeitscheiben, Interrupt-Ablauf, Kontextwechsel (µs + Cache), Speicherschutz/MMU,
  Auslagern, Treiber, Dateien, Systemaufrufe (Linux gut 450 Nummern), vier Aufgaben: korrekt.
- **Simulator / Übung 1:** `scheduler.js` unverändert in der Logik: Wartezeit der Musik = 2·s + 3, Verwaltung = 1/(s+1). Lösungen genau
  s = 2 (7 Takte, 33 %) und s = 3 (9 Takte, 25 %); s = 1 → 50 %; s = 4 → 11 Takte. Auflösung richtig, Startwert 6 keine Lösung.
- **Übung 2:** alle acht Zuordnungen eindeutig und richtig. **Übung 3:** Reihenfolge und Auflösung richtig.
- **Quiz q01–q07:** je genau eine richtige Antwort, Erklärungen korrekt, `Nachlesen` passend (zu q01 siehe E1).
- **Karteikarten k01–k09:** korrekt, je eine Sache (zu k02 siehe E3).
- **Wo steckt das bei dir:** VPS, Docker/Namensräume, Android-UID, Task-Manager (Strg + Umschalt + Esc), Cloudflare: korrekt.
- **Glossar (17 Einträge s1f08):** fachlich korrekt und stimmig mit dem Text, inkl. neuem Eintrag „Multics“ (MIT/GE/Bell Labs; hierarchisches
  Dateisystem „Ordner in Ordnern“ gilt als Multics-Neuerung – korrekt). Zu „Linux“ siehe E4.
- **Format:** keine Handwerks-Wörter; Bild ist in der README-Tabelle eingetragen.

## Fehler

Keine.

## Empfehlungen

### E1 – q01-Erklärung und Hyper-Threading-Satz abstimmen
Fundstelle: q01 „Erklärung: Ein Kern arbeitet immer nur einen Befehlsstrom ab“ und `[beidir]` Task-Manager „kann jeder Kern zwei
Befehlsströme ineinander verschränkt abarbeiten“. Beides steht jetzt wörtlich gegeneinander. Vorschlag für die q01-Erklärung: „Ein Kern
arbeitet immer nur einen Befehlsstrom ab (von Hyper-Threading abgesehen, siehe ‚Wo steckt das bei dir?'). …“ – oder im Prinzip-Merke
„(Sonderfall Hyper-Threading: siehe unten)“.

### E2 – „doppelte Zahl“ bei neueren Intel-Prozessoren
Fundstelle: `[beidir]` Task-Manager. Neuere Intel-Prozessoren mischen Leistungskerne (mit Hyper-Threading) und Effizienzkerne (ohne);
dann ist die Zahl der logischen Prozessoren größer, aber nicht doppelt so groß (z. B. 14 Kerne, 20 logische Prozessoren). Vorschlag:
„Steht bei ‚Logische Prozessoren' eine größere Zahl (oft die doppelte), können Kerne zwei Befehlsströme … (Hyper-Threading).“

### E3 – k02 um die Treiber-Ausnahme ergänzen
Fundstelle: k02 „alle anderen Programme laufen mit eingeschränkten Rechten“. Der Text nennt Treiber jetzt ausdrücklich als Ausnahme.
Vorschlag: „…die normalen Programme laufen mit eingeschränkten Rechten.“ (Glossar „Kernel“ sagt schon „Programme“ – unkritisch.)

### E4 – Glossar „Linux“: Namen weglassen
Fundstelle: `content/glossar.md`, Eintrag `linux`, „Auch Philips VPS läuft mit Linux.“ Einzige Stelle im Inhalt mit Philips Namen,
sonst überall „dein VPS“. Vorschlag: „Auch dein VPS läuft mit Linux.“

### E5 – Absatz „bim-trainer und diese App“
Fundstelle: `[beidir]`, letzter Absatz. Die Überschrift nennt bim-trainer, der Absatz aber nicht. Vorschlag: „Deine Apps im Browser.“
oder einen Halbsatz „– auch bim-trainer und diese App“ ergänzen. Rein stilistisch.

## Zusammenfassung

F1 aus Durchgang 1 ist behoben, alle 14 Empfehlungen aus Durchgang 1 sind korrekt umgesetzt, die neuen Quellen-Links funktionieren und
belegen die Aussagen. Keine Fehler, 5 Empfehlungen (E1–E5).

Ergebnis: bestanden
