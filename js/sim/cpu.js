// Simulator „cpu“: ein Spielzeug-Prozessor mit 16 Speicherzellen, einem Rechenregister A, dem Befehlszähler und dem
// Befehlsregister. Jeder Takt ist eine Phase: Holen → Entschlüsseln → Ausführen.
// Optionen:
//   programm: LADE 6; ADDIERE 7; SPEICHERE 8; STOPP; ; ; 3; 4     Zellen 0, 1, 2 … durch „;“ getrennt (leer = 0)
//   ziel: ende           Übung: Programm Takt für Takt bis STOPP ausführen
//   ziel: 8=10           Übung: am Ende soll Zelle 8 den Wert 10 haben …
//   aenderbar: 6, 7      … und diese Zellen (Zahlen) darf man vorher ändern
// Befehle: LADE x (Register A = Zelle x) · ADDIERE x (A = A + Zelle x) · SUBTRAHIERE x · SPEICHERE x (Zelle x = A)
//          SPRINGE x (weiter bei Zelle x) · SPRINGE_WENN_NULL x (nur wenn A = 0) · STOPP
import { el } from '../kern/dom.js';

export const BEFEHLE = {
  LADE: 'Lade die Zahl aus Zelle {x} ins Register A.',
  ADDIERE: 'Addiere die Zahl aus Zelle {x} zu A.',
  SUBTRAHIERE: 'Ziehe die Zahl aus Zelle {x} von A ab.',
  SPEICHERE: 'Schreibe A in Zelle {x}.',
  SPRINGE: 'Mach mit dem Befehl in Zelle {x} weiter.',
  SPRINGE_WENN_NULL: 'Wenn A gleich 0 ist: mach in Zelle {x} weiter, sonst normal.',
  STOPP: 'Halte an – das Programm ist fertig.',
};
/** Zelleninhalt lesen: Zahl oder Befehl { op, x }. */
export function zelle(text) {
  const t = String(text ?? '').trim();
  if (t === '') return 0;
  if (/^-?\d+$/.test(t)) return Number(t);
  const m = /^([A-Z_]+)(?:\s+(\d{1,2}))?$/.exec(t);
  if (!m || !BEFEHLE[m[1]] || (m[1] !== 'STOPP' && m[2] == null) || Number(m[2]) > 15) throw new Error(`cpu: Zelle „${t}“ nicht lesbar`);
  return { op: m[1], x: m[2] == null ? null : Number(m[2]) };
}
export const programmLesen = (text) => {
  const z = String(text ?? '').split(';').map(zelle);
  if (z.length > 16) throw new Error('cpu: höchstens 16 Zellen');
  while (z.length < 16) z.push(0);
  return z;
};
export const neuerZustand = (speicher) => ({ speicher: speicher.map((c) => (typeof c === 'object' ? { ...c } : c)), A: 0, PC: 0, IR: null, phase: 0, halt: false, takte: 0 });
const anzeigen = (c) => (typeof c === 'object' ? `${c.op}${c.x == null ? '' : ` ${c.x}`}` : String(c));

/** Ein Takt (eine Phase). Gibt einen Erklärtext zurück. Verändert z. */
export function takt(z) {
  if (z.halt) return 'Der Prozessor steht.';
  z.takte++;
  if (z.phase === 0) {
    z.IR = z.speicher[z.PC];
    const von = z.PC; z.PC = (z.PC + 1) % 16; z.phase = 1;
    return `Holen: Inhalt von Zelle ${von} („${anzeigen(z.IR)}“) ins Befehlsregister; Befehlszähler auf ${z.PC}.`;
  }
  if (z.phase === 1) {
    z.phase = 2;
    if (typeof z.IR !== 'object') return `Entschlüsseln: „${z.IR}“ ist eine Zahl, kein Befehl – der Prozessor hält an.`;
    return `Entschlüsseln: ${BEFEHLE[z.IR.op].replace('{x}', z.IR.x)}`;
  }
  z.phase = 0;
  const b = z.IR;
  if (typeof b !== 'object') { z.halt = true; return 'Ausführen: unbekannter Befehl – Halt.'; }
  const wert = b.x == null ? 0 : typeof z.speicher[b.x] === 'object' ? 0 : z.speicher[b.x];
  switch (b.op) {
    case 'LADE': z.A = wert; return `Ausführen: Register A ist jetzt ${z.A}.`;
    case 'ADDIERE': z.A += wert; return `Ausführen: A ist jetzt ${z.A}.`;
    case 'SUBTRAHIERE': z.A -= wert; return `Ausführen: A ist jetzt ${z.A}.`;
    case 'SPEICHERE': z.speicher[b.x] = z.A; return `Ausführen: Zelle ${b.x} enthält jetzt ${z.A}.`;
    case 'SPRINGE': z.PC = b.x; return `Ausführen: Befehlszähler auf ${b.x}.`;
    case 'SPRINGE_WENN_NULL': if (z.A === 0) { z.PC = b.x; return `Ausführen: A ist 0 – Befehlszähler auf ${b.x}.`; } return `Ausführen: A ist ${z.A}, nicht 0 – kein Sprung.`;
    default: z.halt = true; return 'Ausführen: STOPP – fertig.';
  }
}
/** Lässt das Programm bis STOPP laufen (höchstens grenze Takte). */
export function laufen(speicher, grenze = 600) {
  const z = neuerZustand(speicher);
  while (!z.halt && z.takte < grenze) takt(z);
  return z;
}

export default function starte({ wurzel, optionen, fertig = () => {}, istFertig = false }) {
  const urprogramm = programmLesen(optionen.programm);
  const zielText = String(optionen.ziel ?? '');
  const zielZelle = /^(\d{1,2})\s*=\s*(-?\d+)$/.exec(zielText);
  const aenderbar = String(optionen.aenderbar ?? '').split(/[,;\s]+/).filter(Boolean).map(Number);
  const uebung = zielText === 'ende' || !!zielZelle;
  let programm = urprogramm.map((c) => c);
  let z = neuerZustand(programm);
  let geschafft = istFertig;
  let text = 'Bereit. Tippe „Nächster Takt“.';
  const zielZeile = uebung ? el('p', { class: 'sim-ziel' }) : null;
  const regs = el('div', { class: 'cpu-register' });
  const phasen = el('ol', { class: 'cpu-phasen' });
  const erkl = el('p', { class: 'cpu-erklaerung', 'aria-live': 'polite' });
  const tafel = el('div', { class: 'cpu-speicher' });
  const PH = ['Holen', 'Entschlüsseln', 'Ausführen'];
  const zeichnen = () => {
    if (uebung && !geschafft && z.halt && (zielText === 'ende' || z.speicher[Number(zielZelle[1])] === Number(zielZelle[2]))) { geschafft = true; fertig(); }
    regs.replaceChildren(...[['Register A', z.A], ['Befehls\u00adzähler', z.PC], ['Befehls\u00adregister', z.IR == null ? '–' : anzeigen(z.IR)]].map(([l, w]) => el('div', { class: 'cpu-reg' }, [el('span', { class: 'cpu-reg-name', text: l }), el('span', { class: 'cpu-reg-wert', text: String(w) })])));
    phasen.replaceChildren(...PH.map((p, i) => el('li', { class: !z.halt && z.phase === i ? 'phase-jetzt' : '', text: p })));
    erkl.textContent = text;
    const vorTakt = z.takte === 0;
    tafel.replaceChildren(...z.speicher.map((c, i) => {
      const darf = vorTakt && aenderbar.includes(i) && typeof c === 'number';
      return el('div', { class: `cpu-zelle${i === z.PC && !z.halt ? ' cpu-zelle-bz' : ''}${zielZelle && Number(zielZelle[1]) === i ? ' cpu-zelle-ziel' : ''}` }, [
        el('span', { class: 'cpu-adr', text: String(i) }),
        el('span', { class: 'cpu-inhalt', text: typeof c === 'object' || c !== 0 || i < urprogramm.findLastIndex((x) => x !== 0) + 1 ? anzeigen(c) : '·' }),
        ...(darf ? [
          el('button', { type: 'button', class: 'knopf knopf-zweit cpu-plusminus', text: '−', 'aria-label': `Zelle ${i} um 1 verringern`, onclick: () => { programm[i]--; z = neuerZustand(programm); zeichnen(); } }),
          el('button', { type: 'button', class: 'knopf knopf-zweit cpu-plusminus', text: '+', 'aria-label': `Zelle ${i} um 1 erhöhen`, onclick: () => { programm[i]++; z = neuerZustand(programm); zeichnen(); } }),
        ] : []),
      ]);
    }));
    if (zielZeile) {
      zielZeile.textContent = geschafft ? '✓ Geschafft!' : zielText === 'ende' ? 'Ziel: Führe das Programm Takt für Takt aus, bis der Prozessor bei STOPP anhält.'
        : z.halt ? `Fertig gelaufen – Zelle ${zielZelle[1]} enthält ${z.speicher[Number(zielZelle[1])]}, Ziel ist ${zielZelle[2]}. „Von vorn“ und eine Zahl ändern.`
        : `Ziel: Am Ende soll in Zelle ${zielZelle[1]} die ${zielZelle[2]} stehen. Ändere vorher ${aenderbar.length > 1 ? 'die Zellen' : 'Zelle'} ${aenderbar.join(' und ')} (+/−), dann lass das Programm laufen.`;
    }
  };
  const knoepfe = el('div', { class: 'sim-steuerung' }, [
    el('button', { type: 'button', class: 'knopf', text: 'Nächster Takt', onclick: () => { text = takt(z); zeichnen(); } }),
    el('button', { type: 'button', class: 'knopf knopf-zweit', text: 'Ganzer Befehl', onclick: () => { do { text = takt(z); } while (z.phase !== 0 && !z.halt); zeichnen(); } }),
    el('button', { type: 'button', class: 'knopf knopf-zweit', text: 'Von vorn', onclick: () => { z = neuerZustand(programm); text = 'Bereit. Tippe „Nächster Takt“.'; zeichnen(); } }),
  ]);
  wurzel.append(...[zielZeile, regs, phasen, erkl, knoepfe, tafel].filter(Boolean));
  zeichnen();
  if (uebung) wurzel._loesen = () => {
    if (zielZelle) {
      // passende Werte für die änderbaren Zellen suchen (kleiner Suchraum)
      const suche = (i, p) => {
        if (i === aenderbar.length) return laufen(p).speicher[Number(zielZelle[1])] === Number(zielZelle[2]) ? p : null;
        for (let v = 0; v <= 30; v++) { const q = p.slice(); q[aenderbar[i]] = v; const r = suche(i + 1, q); if (r) return r; }
        return null;
      };
      programm = suche(0, programm) || programm; z = neuerZustand(programm);
    }
    while (!z.halt && z.takte < 600) text = takt(z);
    zeichnen();
  };
}

/** Für den Build: Programm lesbar, Übung lösbar. */
export function pruefe(optionen) {
  const p = programmLesen(optionen.programm);
  const ziel = String(optionen.ziel ?? '');
  const m = /^(\d{1,2})\s*=\s*(-?\d+)$/.exec(ziel);
  if (ziel && ziel !== 'ende' && !m) throw new Error('cpu: ziel ist „ende“ oder „Zelle=Wert“');
  if (ziel === 'ende' && !laufen(p).halt) throw new Error('cpu: Programm erreicht STOPP nicht');
  if (m) {
    const aend = String(optionen.aenderbar ?? '').split(/[,;\s]+/).filter(Boolean).map(Number);
    if (!aend.length) throw new Error('cpu: ziel Zelle=Wert braucht „aenderbar:“');
    const suche = (i, q) => (i === aend.length ? laufen(q).speicher[Number(m[1])] === Number(m[2]) : Array.from({ length: 31 }, (_, v) => v).some((v) => { const r = q.slice(); r[aend[i]] = v; return suche(i + 1, r); }));
    if (!suche(0, p)) throw new Error('cpu: Ziel mit Werten 0–30 in den änderbaren Zellen nicht erreichbar');
    if (laufen(p).speicher[Number(m[1])] === Number(m[2])) throw new Error('cpu: Ziel ist schon ohne Änderung erfüllt');
  }
}
