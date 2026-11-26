# Auftrag: Folgen auf das neue Format umstellen (eigenständige Folgen + Lernpool)

Projekt /workspace/it-trainer (Lern-App „IT“, Deutsch, Zielperson IT-Einsteiger). Lies zuerst `content/README.md` ganz,
besonders „Jede Folge steht für sich“, „Lernpool“, „Quiz“, „Karteikarten“ und „Bilder, Grafiken und Mitmachen“.

Die Abschnitte der Folgen sind schon umsortiert: `[einstieg] [geschichte] [prinzip] [werkstatt] [selbst] [beidir] [fazit]`,
danach `[quiz]` und `[karten]` (Lernpool). In `[fazit]` steht der Platzhalter `FAZIT-FOLGT`.

Für jede dir zugeteilte Folge:

1. **Eigenständigkeit:** Lies die ganze Folge. Suche jeden Rückgriff auf **Bilder oder Geschichten anderer Folgen**
   (z. B. „wie die Laternen aus Folge 1“, „erinnerst du dich an das Parkhaus“, eine Geschichte, die schon in einer früheren
   Folge erzählt wurde und hier wieder auftaucht). Entferne ihn oder ersetze ihn durch etwas, das nur in dieser Folge steht.
   Wo die Folge **Fachwissen** von vorher braucht (Bit, Transistor, Gatter …), erkläre es in **1–2 Sätzen neu**, mit Verweis
   („mehr dazu in Folge 3“). Prüfe: Versteht jemand die Folge, der keine andere Folge kennt? Auch in „Wo steckt das bei dir?“,
   Quiz und Karten. Liste im Bericht jede Änderung kurz auf.
2. **Auf den Punkt:** Ersetze `FAZIT-FOLGT` durch **3–4 Kernsätze** als Liste (`- …`): das Wichtigste der Folge, verständlich,
   ohne neue Fakten (nur, was in der Folge steht). Optional ein kurzer Satz davor; kein Fazit-Bild.
3. **Quiz für den Lernpool:** Fragen erscheinen später gemischt mit anderen Folgen. Jede Frage muss **ohne die Folge vor Augen**
   verständlich sein (nicht „im Bild dieser Folge …“ ohne Erklärung, nicht „wie oben“). Fragen, die nur **Jahreszahlen oder
   Namen** abfragen, in **Verständnisfragen** umbauen („Was passiert, wenn …?“, „Warum …?“) – **die ID bleibt**, das Thema
   möglichst nah am Original. Insgesamt sollen höchstens ein Viertel der Fragen Detailwissen sein. Setze bei `Nachlesen:` wo
   sinnvoll die Stelle: `Nachlesen: prinzip / <exakter Text einer ### Zwischenüberschrift in diesem Abschnitt>`.
   Antworten ähnlich lang, genau eine richtig, Erklärung passend.
4. **Karten:** ebenso für sich allein verständlich (Bild-Karten nach dem Begriff fragen lassen). IDs bleiben, keine löschen.
5. Keine neuen Fakten erfinden. Was du änderst, muss stimmen – ein unabhängiger Faktencheck prüft danach alles.
6. `cd /workspace/it-trainer && npm run bauen` muss für deine Folgen fehlerfrei sein (Meldungen zu anderen Folgen ignorieren).
   Nicht committen, keine anderen Dateien ändern (Glossar nur, wenn ein Eintrag auf ein fremdes Bild Bezug nimmt – dann
   in `content/glossar.md` nur diesen Eintrag korrigieren).

Antworte knapp je Folge: Eigenständigkeits-Änderungen (Liste), Fazit (die Sätze), umgebaute Fragen (IDs, alt → neu in einem Halbsatz),
geänderte Karten, Unsicherheiten für den Faktencheck.
