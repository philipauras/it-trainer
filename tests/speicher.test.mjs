import test from 'node:test';
import assert from 'node:assert/strict';
import { leer, normalisiere, zusammenfuehren, browserSpeicher, alsDateiText, ausDateiText, alsCode, ausCode, FORMAT } from '../js/kern/speicher.js';

const APP = 'it-trainer';
const beispiel = () => ({
  ...leer(APP),
  folgen: { s1f01: { schritt: 'quiz', besucht: ['einstieg', 'geschichte'], fertig: null, ts: 100 } },
  quiz: { 's1f01-q01': { gesehen: 2, richtig: 1, falsch: 1, zuletzt: true, ts: 100 } },
  karten: { 's1f01-k01': { fach: 2, faellig: '2026-11-28', gesehen: 1, gewusst: 1, ts: 100 } },
  uebungen: { 's1f01-u01': { fertig: 90, ts: 90 } },
  neuGesehen: '1.0.0',
});

test('Format 1: leerer Stand und Normalisierung verwerfen nur kaputte Einträge', () => {
  assert.equal(FORMAT, 1);
  const z = normalisiere({ ...beispiel(), karten: { 's1f01-k01': { fach: 0, faellig: 'gestern' }, 's1f01-k02': { fach: 1, faellig: '2026-11-26' } }, fremd: 1 }, APP);
  assert.deepEqual(Object.keys(z.karten), ['s1f01-k02']);
  assert.equal(z.fremd, undefined);
  assert.deepEqual(z.folgen.s1f01.besucht, ['einstieg', 'geschichte']);
  assert.throws(() => normalisiere({ format: 2, app: APP }, APP), /neueren Version/);
  assert.throws(() => normalisiere({ format: 1, app: 'bim-trainer' }, APP), /anderen App/);
  assert.throws(() => normalisiere([], APP), /kein gespeicherter Fortschritt/);
});

test('Zusammenführen: je Eintrag gewinnt der neuere, besuchte Abschnitte werden vereinigt, wiederholbar', () => {
  const handy = beispiel();
  const pc = {
    ...leer(APP),
    folgen: { s1f01: { schritt: 'prinzip', besucht: ['einstieg', 'prinzip'], fertig: 50, ts: 50 }, s1f02: { schritt: 'einstieg', besucht: ['einstieg'], fertig: null, ts: 60 } },
    quiz: { 's1f01-q01': { gesehen: 5, richtig: 5, falsch: 0, zuletzt: true, ts: 200 } },
    karten: { 's1f01-k01': { fach: 1, faellig: '2026-11-27', gesehen: 3, gewusst: 1, ts: 50 } },
    einstellungen: { thema: 'dunkel' },
    neuGesehen: '1.2.0',
  };
  const z = zusammenfuehren(handy, pc);
  assert.deepEqual(z.folgen.s1f01.besucht.sort(), ['einstieg', 'geschichte', 'prinzip']);
  assert.equal(z.folgen.s1f01.fertig, 50, 'fertig bleibt erhalten');
  assert.equal(z.folgen.s1f01.schritt, 'quiz', 'neuerer Stand (Handy) bestimmt den Schritt');
  assert.ok(z.folgen.s1f02);
  assert.equal(z.quiz['s1f01-q01'].gesehen, 5, 'PC neuer');
  assert.equal(z.karten['s1f01-k01'].fach, 2, 'Handy neuer');
  assert.equal(z.einstellungen.thema, 'auto', 'Einstellungen bleiben von hier');
  assert.equal(z.neuGesehen, '1.2.0');
  assert.deepEqual(zusammenfuehren(z, pc), z, 'zweimal zusammenführen ändert nichts');
  assert.deepEqual(handy, beispiel(), 'Eingaben unverändert');
});

test('Browser-Speicher: laden, speichern, kaputten Stand beiseitelegen statt überschreiben', () => {
  const daten = new Map();
  const speicher = { getItem: (k) => daten.get(k) ?? null, setItem: (k, v) => daten.set(k, v) };
  const s = browserSpeicher({ app: APP, schluessel: 'x.v1', speicher });
  assert.deepEqual(s.laden(), leer(APP));
  assert.ok(s.speichern(beispiel()));
  assert.deepEqual(s.laden().karten, beispiel().karten);
  daten.set('x.v1', '{kaputt');
  assert.deepEqual(s.laden(), leer(APP));
  assert.ok([...daten.keys()].some((k) => k.startsWith('x.v1.defekt-')), 'Sicherung des kaputten Stands');
  const voll = browserSpeicher({ app: APP, schluessel: 'y', speicher: { getItem: () => null, setItem: () => { throw new Error('voll'); } } });
  assert.equal(voll.speichern(beispiel()), false);
});

test('Export/Import: Datei und Code ergeben denselben Stand, Fehler werden verständlich gemeldet', async () => {
  const z = beispiel();
  assert.deepEqual(ausDateiText(alsDateiText(z), APP), normalisiere(z, APP));
  assert.throws(() => ausDateiText('{"format":1', APP), /beschädigt/);
  const code = await alsCode(z, 'IT1');
  assert.match(code, /^IT1Z\.[A-Za-z0-9_-]+\.[a-z0-9]{4}$/);
  assert.deepEqual(await ausCode(code, 'IT1', APP), normalisiere(z, APP));
  assert.deepEqual(await ausCode(` ${code.slice(0, 20)}\n${code.slice(20)} `, 'IT1', APP), normalisiere(z, APP), 'Leerzeichen/Umbrüche egal');
  await assert.rejects(ausCode(code.slice(0, -6) + code.slice(-5), 'IT1', APP), /unvollständig|kein Fortschritts-Code/);
  await assert.rejects(ausCode('BIM1Z.abc.0000', 'IT1', APP), /kein Fortschritts-Code/);
});
