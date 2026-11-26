// Rechenlogik der Simulatoren aus Phase 2 (Staffel 1, Folgen 2–9 und Abschlussprojekt)
import test from 'node:test';
import assert from 'node:assert/strict';
import { lesen, auswerten, tabelle, loesung, zielErfuellt } from '../js/sim/schaltung.js';
import { kombinationen } from '../js/sim/tabelle.js';
import { lampeAn } from '../js/sim/transistor.js';
import { wert, bitsVon } from '../js/sim/binaer.js';
import { rs, rsSchritt, ramZielOk } from '../js/sim/flipflop.js';
import { programmLesen, laufen, neuerZustand, takt } from '../js/sim/cpu.js';
import { mischen, lesenListe } from '../js/sim/sortieren.js';
import { paareLesen } from '../js/sim/zuordnen.js';
import { zeitleiste, kennzahlen, passt } from '../js/sim/scheduler.js';
import { verteilen, dateienLesen } from '../js/sim/dateisystem.js';
import { alltag, STUFEN } from '../js/sim/zugriffszeit.js';
import { volladdierer, addieren, zieleLesen } from '../js/sim/addierer.js';

test('tabelle: Kombinationen wie beim Binärzählen', () => {
  assert.deepEqual(kombinationen(2), [[0, 0], [0, 1], [1, 0], [1, 1]]);
  assert.equal(kombinationen(3).length, 8);
});

test('schaltung: Grundgatter und Halbaddierer', () => {
  const t = (typ) => tabelle(lesen({ eingaenge: 'A, B', gatter: `Y=${typ}(A,B)` })).Y;
  assert.deepEqual(['UND', 'ODER', 'XODER', 'NUND', 'NODER'].map(t), ['0001', '0111', '0110', '1110', '1000']);
  assert.equal(tabelle(lesen({ eingaenge: 'A', gatter: 'Y=NICHT(A)' })).Y, '10');
  const ha = lesen({ eingaenge: 'A, B', gatter: 'S=XODER(A,B); C=UND(A,B)', ausgaenge: 'C, S' });
  assert.deepEqual(tabelle(ha), { C: '0001', S: '0110' });
  assert.deepEqual(auswerten(ha, { A: 1, B: 1 }), { A: 1, B: 1, S: 0, C: 1 });
});

test('schaltung: ?-Gatter werden gefunden, Volladdierer stimmt', () => {
  const netz = lesen({ eingaenge: 'A, B', gatter: 'S=?(A,B); C=?(A,B)', ausgaenge: 'C, S', ziel: 'C=0001; S=0110' });
  assert.deepEqual(loesung(netz), { S: 'XODER', C: 'UND' });
  assert.ok(!zielErfuellt(netz, { S: 'ODER', C: 'UND' }));
  const va = lesen({ eingaenge: 'A, B, Cein', gatter: 'X=XODER(A,B); S=XODER(X,Cein); C1=UND(A,B); C2=UND(X,Cein); C=?(C1,C2)', ausgaenge: 'C, S', ziel: 'C=00010111; S=01101001' });
  assert.deepEqual(loesung(va), { C: 'ODER' });
});

test('schaltung: Fehler im Inhalt werden gemeldet', () => {
  assert.throws(() => lesen({ eingaenge: 'A', gatter: 'Y=UND(A,Z)' }), /nicht definiert/);
  assert.throws(() => lesen({ eingaenge: 'A, B', gatter: 'Y=VIELLEICHT(A,B)' }), /nicht lesbar/);
  assert.throws(() => lesen({ eingaenge: 'A, B', gatter: 'Y=UND(A,B)', ziel: 'Y=01' }), /4 Ziffern/);
});

test('transistor: einzeln, Reihe = UND, parallel = ODER, nicht', () => {
  const t = (a) => kombinationen(a === 'einzeln' || a === 'nicht' ? 1 : 2).map((z) => lampeAn(a, z)).join('');
  assert.deepEqual(['einzeln', 'reihe', 'parallel', 'nicht'].map(t), ['01', '0001', '0111', '10']);
});

test('binaer: Stellenwerte', () => {
  assert.equal(wert([1, 0, 1, 0]), 10);
  assert.deepEqual(bitsVon(13, 4), [1, 1, 0, 1]);
  for (let z = 0; z < 256; z++) assert.equal(wert(bitsVon(z, 8)), z);
});

test('flipflop: setzen, halten, zurücksetzen; RAM-Ziel', () => {
  let q = 0;
  q = rs(1, 0, q).Q; assert.equal(q, 1);
  q = rs(0, 0, q).Q; assert.equal(q, 1, 'merkt sich die 1');
  q = rs(0, 1, q).Q; assert.equal(q, 0);
  q = rs(0, 0, q).Q; assert.equal(q, 0, 'merkt sich die 0');
  assert.deepEqual(rs(1, 1, 0), { Q: 0, Qn: 0 });
  let s = 0; q = 0;
  for (const [a, b] of [[1, 0], [0, 0], [0, 1], [0, 0]]) { q = rs(a, b, q).Q; s = rsSchritt(s, a, b, q); }
  assert.equal(s, 4);
  assert.ok(ramZielOk([[0, 0, 0, 0], [0, 1, 0, 1], [0, 0, 1, 1], [0, 0, 0, 0]], { 1: '0101', 2: '0011' }));
});

test('cpu: Programm addiert, Schleife zählt herunter, Phasen', () => {
  assert.equal(laufen(programmLesen('LADE 6; ADDIERE 7; SPEICHERE 8; STOPP; ; ; 3; 4')).speicher[8], 7);
  // 3 + 3 + 3 per Schleife: Zelle 13 = Ergebnis, 14 = Zähler, 15 = 1
  const p = programmLesen('LADE 13; ADDIERE 12; SPEICHERE 13; LADE 14; SUBTRAHIERE 15; SPEICHERE 14; SPRINGE_WENN_NULL 8; SPRINGE 0; STOPP; ; ; ; 3; 0; 3; 1');
  const z = laufen(p);
  assert.ok(z.halt); assert.equal(z.speicher[13], 9);
  const y = neuerZustand(programmLesen('LADE 2; STOPP; 5'));
  assert.match(takt(y), /^Holen/); assert.match(takt(y), /^Entschlüsseln/); assert.match(takt(y), /^Ausführen: Register A ist jetzt 5/);
  assert.throws(() => programmLesen('MACHWAS 3'), /nicht lesbar/);
});

test('sortieren/zuordnen: Mischung nie sortiert, Paare gelesen', () => {
  for (let n = 2; n < 10; n++) { const m = mischen(n); assert.ok(m.some((v, i) => v !== i)); assert.deepEqual([...m].sort((a, b) => a - b), [...Array(n).keys()]); }
  assert.deepEqual(lesenListe('a | b|c'), ['a', 'b', 'c']);
  assert.deepEqual(paareLesen('x = G1 | y=G2', ['G1', 'G2']), [{ text: 'x', gruppe: 'G1' }, { text: 'y', gruppe: 'G2' }]);
  assert.throws(() => paareLesen('x = G3', ['G1']), /Gruppe/);
});

test('scheduler: Wartezeit 2s+3, Verwaltung 1/(s+1), Lösung 2 oder 3', () => {
  assert.deepEqual(zeitleiste(2, 9), ['m', 'm', 'w', 'b', 'b', 'w', 'u', 'u', 'w']);
  for (let s = 1; s <= 8; s++) assert.equal(kennzahlen(s).warten, 2 * s + 3);
  assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8].filter(passt), [2, 3]);
});

test('dateisystem: Kette verbindet alle Stücke in Reihenfolge', () => {
  const d = dateienLesen('gruss.txt = HAL|LO |WEL|T!; liste.txt = EI|ER');
  const { bloecke, verzeichnis } = verteilen(d);
  for (const v of verzeichnis) {
    let b = v.start, text = '';
    while (b != null) { text += bloecke[b].text; b = bloecke[b].weiter; }
    assert.equal(text, d.find((x) => x.name === v.name).stuecke.join(''));
  }
  assert.equal(new Set(verzeichnis.flatMap((v) => v.kette)).size, 6);
});

test('zugriffszeit: Hochrechnung in Alltagszeit', () => {
  assert.equal(alltag(4), '4 Sekunden');
  assert.equal(alltag(300), '5 Minuten');
  assert.match(alltag(STUFEN.find((s) => s.id === 'ssd').takte), /Tage/);
  assert.match(alltag(STUFEN.find((s) => s.id === 'hdd').takte), /Monate/);
});

test('addierer: Volladdierer und Ripple-Carry für alle 4-Bit-Paare', () => {
  for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let c = 0; c < 2; c++) {
    const r = volladdierer(a, b, c); assert.equal(r.s + 2 * r.c, a + b + c);
  }
  for (let a = 0; a < 16; a++) for (let b = 0; b < 16; b++) {
    const r = addieren(bitsVon(a, 4), bitsVon(b, 4));
    assert.equal(wert(r.s) + 16 * r.aus, a + b);
  }
  assert.deepEqual(zieleLesen('3+4, ueberlauf', 4), [{ art: 'summe', a: 3, b: 4 }, { art: 'ueberlauf' }]);
  assert.throws(() => zieleLesen('20+1', 4), /zu groß/);
});
