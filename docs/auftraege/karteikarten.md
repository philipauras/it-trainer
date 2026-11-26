# Auftrag: Karteikarten aus einer fertigen Folge erzeugen

Projekt /workspace/it-trainer (Lern-App „IT“, Deutsch, Zielperson IT-Einsteiger). Lies content/README.md, Abschnitt „Karteikarten“,
und als Beispiel die Karten in content/staffel-1/folge-01-bit.md.

In der angegebenen Folgen-Datei steht unter `## [karten] Für deinen Karteikasten` nur die Zeile `KARTEN-FOLGEN`. Ersetze diese
eine Zeile durch 7–9 Karten im Format:

### <folgen-id>-k01
Vorne: Frage
Hinten: kurze Antwort (ein bis zwei Sätze)

Regeln: nur Inhalte, die in der Folge stehen (nichts Neues erfinden); eine Sache je Karte; die wichtigsten Begriffe, Prinzipien,
ein bis zwei Zahlen/Jahre, eine Karte zum Alltagsbild der Folge („Im Bild“) nur, wenn sie nach dem Begriff fragt; IDs fortlaufend
k01, k02 …; zwischen Karten eine Leerzeile. Ändere sonst NICHTS an der Datei. Danach `cd /workspace/it-trainer && npm run bauen`
ausführen; Meldungen zu ANDEREN Folgen ignorieren. Antworte nur mit „fertig, N Karten“ oder dem Fehler.
