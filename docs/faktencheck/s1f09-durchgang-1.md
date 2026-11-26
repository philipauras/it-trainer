# Faktencheck s1f09 – Durchgang 1

- **Datum:** 26.11.2026
- **Geprüfte Datei:** `content/staffel-1/folge-09-doppelklick.md` („Was passiert in der halben Sekunde nach dem Doppelklick?“)
- **Mitgeprüft:** `/workspace/tmp/glossar-neu/s1f09.md` (steht schon wortgleich in `content/glossar.md`), Simulatoren `js/sim/dateisystem.js`, `js/sim/sortieren.js`, `js/sim/zuordnen.js` (Kopfkommentare und Logik), `content/README.md`, Bezüge zu Folge 1, 6, 7 und 8
- **Prüfer:** unabhängige Prüfung (Agent, nicht Autor der Folge)

## Was geprüft und bestätigt wurde

- **Engelbart 1968:** 9. Dezember 1968, Fall Joint Computer Conference in San Francisco, rund 1 000 Zuschauer, etwa 90 Minuten, Projektion auf eine große Leinwand, Textbearbeitung am Bildschirm, Verweise (Hyperlinks), Videoverbindung zum SRI in Menlo Park (rund 30 Meilen, also etwa 50 km): stimmt. Holzgehäuse mit zwei rechtwinklig stehenden Rädern und Kabel, Idee von Engelbart, gebaut von Bill English, Name wegen des „Schwanzes“, Maus in der rechten Hand (links die Akkordtastatur), „Mother of All Demos“: stimmt. Die Quelle (Engelbart/English, AFIPS FJCC 1968) passt.
- **Xerox:** PARC griff die Ideen auf (Bill English wechselte 1971 dorthin). Alto 1973, Hochformat-Bildschirm mit einzeln gesteuerten Bildpunkten (Bitmap), Maus, Fenster, Schrift wie gedruckt (Bravo), nie im Handel verkauft: stimmt. Star 1981 (8010) mit Schreibtisch-Bild und Symbolen: stimmt.
- **Apple:** Besuch im PARC 1979 mit Steve Jobs; Lisa im Januar 1983 für 9 995 Dollar (also rund 10 000 Dollar), schlecht verkauft; Macintosh im Januar 1984 mit einer Maustaste, im Finder wird mit Doppelklick geöffnet: stimmt. Windows 1.0 im November 1985: stimmt.
- **Multics/Hierarchie:** Daley und Neumann, AFIPS FJCC 1965, Baum aus Verzeichnissen für Multics; Unix übernahm das: stimmt. Der Bezug „du kennst es aus Folge 8“ stimmt (Folge 8 erwähnt Multics).
- **MS-DOS 8.3:** stimmt.
- **ASCII:** „Hallo“ = 5 Byte, H = `01001000` (0x48): stimmt.
- **Dateianfänge:** PNG beginnt mit `89 50 4E 47 …`, also „PNG“ ab dem zweiten Byte; PDF beginnt laut ISO 32000 mit `%PDF-`: stimmt.
- **FAT, NTFS, ext4:** Kette in eigener Tabelle (FAT), Blockbereiche als Datenläufe (NTFS) bzw. Extents (ext4): stimmt. Ordner als besondere Dateien, Löschen entfernt nur den Eintrag, SSDs leeren freie Blöcke bald (TRIM): stimmt.
- **Windows-Doppelklickzeit:** Standard 500 ms (`GetDoubleClickTime`), dazu ein kleines Rechteck um den ersten Klick: „innerhalb einer halben Sekunde an derselben Stelle“ stimmt. Standard-App für `.jpg` unter Windows 10/11 ist „Fotos“: stimmt.
- **Schritte beim Doppelklick:** vereinfacht, aber nicht falsch. Die Reihenfolge „Programm starten, dann Datei per Systemaufruf öffnen“ stimmt. Die `Achtung`-Box nennt die wichtigsten Vereinfachungen (Explorer als eigenes Programm, Laden nach Bedarf, Grafikkarte und Treiber).
- **Explorer-Menüs:** Windows 11 „Anzeigen → Einblenden → Dateinamenerweiterungen“, Windows 10 Menüband „Ansicht“ mit Häkchen „Dateinamenerweiterungen“: stimmt (deutsche Oberfläche). „Öffnen mit“ mit „immer verwenden“, Eigenschaften mit „Größe“ und „Größe auf Datenträger“: stimmt. `rechnung.pdf.exe` als Tarnung: stimmt.
- **NTFS „0 Byte“:** Sehr kleine Dateien (bis einige hundert Byte) liegen „resident“ im Datensatz der Master File Table. Der Explorer zeigt dann „Größe auf Datenträger: 0 Byte“: stimmt (zur Wortwahl siehe E6).
- **VPS:** Selbst nachgeprüft: `/workspace` liegt auf `/dev/sda1`, Dateisystem ext4, Blockgröße 4 096 Byte (`stat -f`). Eine Datei mit „Hallo“ hat `Size: 5` und `Blocks: 8` (8 × 512 Byte = 4 096 Byte): stimmt. `/proc/cpuinfo` ist lesbar.
- **Übung 1 (s1f09-u01):** Mit dem Code des Simulators nachgerechnet (`verteilen()`): `brief.txt` hat die Kette 3 → 14 → 0 → 9 → 13 → 15 und ergibt „VOM BIT BIS ZUM DOPPELKLICK!“. Die Auflösung stimmt genau, die Übung ist lösbar.
- **Simulator im Prinzip:** `hallo.txt` liegt in 12 → 8 → 3 → 14 („HALLO WELT!“), dazwischen Blöcke von `einkauf.txt` und `foto.jpg`, frei sind 1, 5, 7, 11, 15. Der Text („über vier Blöcke verstreut, dazwischen Stücke anderer Dateien“) passt.
- **Übung 2 (s1f09-u02):** Die acht Schritte haben eine eindeutige Reihenfolge, jeder baut auf dem vorigen auf. Sie passt zur Liste im Prinzip. Auflösung richtig.
- **Übung 3 (s1f09-u03):** Alle Zuordnungen stimmen, die Auflösung erklärt den Grenzfall `.docx`.
- **Bild (Zeitschrift):** Es trifft den Mechanismus des Simulators (Inhaltsverzeichnis → erste Seite → Fortsetzungshinweise). Die Vorhersagen (herausgerissenes Inhaltsverzeichnis = gelöschter Eintrag, Daten noch da) stimmen. Beide „Achtung“-Sätze nennen echte Unterschiede. Das Bild ist in keiner anderen Folge vergeben. Nach dem Bestehen bitte in die Hauptbilder-Liste in `content/README.md` eintragen.
- **Quiz:** Jede der 7 Fragen hat genau eine richtige Antwort, die Erklärungen stimmen. q07 ist am VPS nachgeprüft.
- **Format:** 8 Abschnitte in der richtigen Reihenfolge, Simulator im Prinzip, 3 Übungen, 7 Quizfragen, 9 Karten. Keine verbotenen Handwerks-Wörter. Quellen im Kopf vorhanden und passend.

## Fehler

### F1 – „Block auf einer SSD = meist 4 KiB“ verwechselt Dateisystem-Block und SSD
**Fundstelle:** `[prinzip]` → „Das Dateisystem: Inhaltsverzeichnis und Blöcke“, 1. Satz; Karte s1f09-k03; Glossar `block` (`kurz`/`mehr`).
Die 4 KiB sind die Blockgröße, die das **Dateisystem** wählt (ext4-Block, NTFS-Cluster; das sagt die Folge in „Wo steckt das bei dir?“ selbst). Die SSD bietet nach außen nummerierte Sektoren an, meist 512 Byte (bei manchen 4 KiB). Intern heißt bei Flash-Speicher ein „Block“ sogar etwas ganz anderes: die Löscheinheit von einigen hundert KiB bis mehreren MiB (Folge 7 erwähnt das Löschen ganzer Blöcke). Karte k03 („Was ist ein Block auf einer SSD? … meist 4 KiB“) lehrt deshalb eine falsche Tatsache. Außerdem steht im Glossar „Dateien belegen **immer** ganze Blöcke“, die Folge zeigt mit NTFS (0 Byte) aber selbst eine Ausnahme.
**Korrektur:**
- Prinzip: „Eine SSD kennt keine Dateien. Sie kennt nur nummerierte Speicherplätze. Das **Dateisystem**, ein Teil des Betriebssystems, fasst sie zu **Blöcken** fester Größe zusammen, meist je 4 Kibibyte (4 096 Byte), und legt darüber seine Ordnung.“
- k03: „Vorne: Was ist ein Block im Dateisystem? Hinten: Ein nummerierter Abschnitt fester Größe, meist 4 KiB, in die das Dateisystem den Datenträger einteilt. Die SSD selbst kennt keine Dateien.“
- Glossar `block`: „kurz: Eines der Stücke fester Größe, in die das Dateisystem einen Datenträger einteilt – meist 4 KiB.“ / „mehr: Dateien belegen fast immer ganze Blöcke. Unter Windows heißen sie „Cluster“.“

### F2 – „Android schaut öfter auf die Anfangsbytes als Windows“ ist falsch
**Fundstelle:** `[prinzip]` → „Woher weiß der Rechner, welches Programm passt?“, letzter Satz.
Android bestimmt den Dateityp fast immer über die Endung: `MimeTypeMap.getMimeTypeFromExtension`, und MediaStore/MediaProvider leiten den MIME-Typ laut AOSP-Quellcode aus der Endung ab. Für Linux stimmt die Aussage nur teilweise (Desktops nutzen Endung **und** Anfangsbytes, der Befehl `file` nur die Bytes).
**Korrektur:** „Manche Programme schauen deshalb auf solche Merkmale statt auf den Namen – unter Linux etwa der Befehl `file`, der dir sagt, was wirklich in einer Datei steckt.“ (Android weglassen.)

## Empfehlungen

### E1 – Dauer
Rund 3 700 Wörter. Das ist so lang wie Folge 2, 5 und 8 (je 18 Minuten) mit drei Übungen. 19 Minuten sind realistisch, eher am oberen Rand (20 wären auch vertretbar). Wer kürzen will: den Absatz „Ich und deine Ablage“ und den Pixel-Absatz in „Wo steckt das bei dir?“ straffen. Den Rückblick auf die Staffel und die Doppelklick-Liste nicht kürzen, sie sind der Kern.

### E2 – „erstmals öffentlich die Maus“ (q06, k09)
Telefunken beschrieb und zeigte seine Rollkugel (RKS 100-86) schon am 2. Oktober 1968 in einer Firmenzeitschrift. Engelbarts Team hatte die Maus außerdem 1967 in einem Fachartikel veröffentlicht. „Erste öffentliche Vorführung“ ist bei Engelbart üblich und als Vorführung vertretbar. Sicherer wäre: „Wer führte am 9. Dezember 1968 in der berühmten ‚Mother of All Demos‘ die Maus vor?“

### E3 – „eine einzige lange Liste“
**Fundstelle:** `[geschichte]` letzter Absatz. CTSS, der Vorgänger von Multics, hatte schon je Benutzer eine eigene Liste (zwei Ebenen). Vorschlag: „Frühe Rechner legten die Dateien nebeneinander in eine Liste, höchstens eine pro Benutzer.“

### E4 – Herkunft der 8.3-Namen
**Fundstelle:** „Wusstest du?“ in `[geschichte]`. MS-DOS hat das 8.3-Schema von CP/M übernommen (ältere DEC-Systeme hatten ähnliche Regeln). „Daher stammen“ ist vertretbar, genauer: „MS-DOS übernahm das von noch älteren Systemen – daher …“.

### E5 – Verstreut lesen kostet „mehr blättern“
**Fundstelle:** `[werkstatt]` 3. Absatz. Für Festplatten mit Lesekopf stimmt die Vorhersage deutlich, bei SSDs kostet Verstreuung kaum Zeit. Ein Halbsatz verhindert eine falsche Vorstellung: „… bei alten Festplatten mit beweglichem Lesekopf kostete das spürbar Zeit, bei SSDs kaum.“

### E6 – NTFS: „in seinen Verzeichniseintrag“
**Fundstelle:** `[beidir]` „Dein Windows-PC“, letzter Satz. Genau genommen stehen die Daten im Datensatz der Datei in der Master File Table, nicht im Ordner. Im vereinfachten Modell der Folge vertretbar. Genauer: „Winzige Dateien legt NTFS direkt in ihren Eintrag in seiner Dateitabelle – dann steht dort sogar 0 Byte.“

### E7 – `stat` zählt in 512-Byte-Stücken
**Fundstelle:** `[beidir]` „Dein VPS“. Wer `stat` aufruft, sieht für die 5-Byte-Datei `Blocks: 8`, nicht 1, und wäre verwirrt. Vorschlag: „(`stat` zählt dabei in 512-Byte-Stücken: 8 × 512 = 4 096 Byte.)“

### E8 – `/dev/sda1` gibt es im Container nicht
**Fundstelle:** `[beidir]` „Dein VPS“. Auf dem VPS (Host) stimmt das. Im Container des Agenten ist `/dev/sda1` nicht als Datei sichtbar, man sieht den Namen nur über `df`. Vorschlag: „… heißt auf dem VPS `/dev/sda1` (der Befehl `df` zeigt das) und lässt sich dort wie eine Datei ansprechen.“

### E9 – „entschlüsseln“ für JPG
**Fundstelle:** Doppelklick-Schritt 7. „Entschlüsseln“ klingt nach Verschlüsselung (q02 nutzt „verschlüsseln“ als Ablenker). Vorschlag: „Das Programm wandelt (dekodiert) das JPG-Format in Millionen farbige Bildpunkte um …“.

### E10 – Quiz q05: Ablenker halb wahr
„Weil die SSD jeden Block nur einmal beschreiben kann“: Flash-Seiten lassen sich tatsächlich erst nach dem Löschen neu beschreiben, und die SSD verteilt Schreibvorgänge deshalb intern. Das kann aufmerksame Lernende verunsichern. Besser z. B. „Weil jede Datei genau einen Block pro Kilobyte braucht“.

### E11 – Quiz q04: „zuerst“
Streng genommen geschieht zuerst die Meldung der Maus. Vorschlag: „Was geschieht beim Doppelklick auf ein Foto zuerst: das Lesen der Datei oder der Start des Programms?“ (wie Karte k08).

### E12 – Glossar
- `multics` steht schon (wortgleich, `folge: s1f08`) in `glossar-neu/s1f08.md` und in `glossar.md`, also in s1f09.md streichen.
- `grafische-oberflaeche`: Unter `woerter` gehört „Benutzeroberfläche“ nicht dazu (auch eine Kommandozeile ist eine Benutzeroberfläche). `mehr` z. B.: „Erste Ideen bei Douglas Engelbart (1968), entwickelt am Xerox PARC (Alto, 1973), …“.
- `dateiendung`: „sie verraten, welche Art Inhalt die Datei haben soll“ statt „welches Programm zuständig ist“ (das legt erst die Zuordnungsliste fest).

### E13 – Kleinigkeiten
- `[geschichte]` Alto: „auf dem jeder einzelne Bildpunkt einzeln gesteuert“ – doppelt; „auf dem jeder Bildpunkt einzeln gesteuert …“.
- Schritt 1: Viele Mäuse melden einen Klick elektrisch als Wechsel von 1 auf 0. Als Bild vertretbar, evtl. „ein Bit wechselt“ ohne Richtung.

## Zusammenfassung

2 Fehler (F1 Blockgröße der SSD bzw. des Dateisystems, F2 Android und Anfangsbytes), 13 Empfehlungen. Alle ausdrücklich genannten Prüfpunkte (Engelbart, Alto, Star, Lisa, Macintosh-Doppelklick, 500 ms, NTFS 0 Byte, Explorer-Menüs, PNG/PDF, ext4 4 096 Byte, Doppelklick-Schritte, Übungen 1 und 2) stimmen. Die Übungen sind lösbar und richtig aufgelöst.

Ergebnis: nicht bestanden
