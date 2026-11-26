// Simulator „zugriffszeit“: Wie lange dauert es, Daten aus Register, Cache, Arbeitsspeicher, SSD oder Festplatte zu holen?
// Zeigt die echten Größenordnungen und dieselben Zeiten hochgerechnet: „Wenn ein Prozessortakt eine Sekunde dauern würde …“
// Werte: grobe, typische Größenordnungen für einen Prozessor mit etwa 3 GHz (Quellen in der Folge s1f07).
// Optionen: festplatte (ja/nein, Standard ja)
import { el } from '../kern/dom.js';

export const STUFEN = [
  { id: 'register', name: 'Register', echt: 'ca. 0,3 ns', takte: 1, groesse: 'einige Hundert Byte bis wenige KB' },
  { id: 'l1', name: 'L1-Cache', echt: 'ca. 1 ns', takte: 4, groesse: 'ca. 32–192 KB je Kern' },
  { id: 'l2', name: 'L2-Cache', echt: 'ca. 4 ns', takte: 12, groesse: 'ca. 0,5–3 MB, meist je Kern' },
  { id: 'l3', name: 'L3-Cache', echt: 'ca. 10–20 ns', takte: 40, groesse: 'ca. 8–64 MB' },
  { id: 'ram', name: 'Arbeitsspeicher', echt: 'ca. 80–100 ns', takte: 300, groesse: 'ca. 4–64 GB' },
  { id: 'ssd', name: 'SSD', echt: 'ca. 20–100 µs', takte: 150_000, groesse: 'ca. 250 GB – 4 TB' },
  { id: 'hdd', name: 'Festplatte', echt: 'ca. 5–15 ms', takte: 20_000_000, groesse: 'ca. 1–20 TB' },
];
/** Sekunden in eine Alltagsangabe („4 Sekunden“, „5 Minuten“, „knapp 2 Tage“, „etwa 8 Monate“). */
export function alltag(sek) {
  const r = (x) => (x < 10 ? Math.round(x * 10) / 10 : Math.round(x)).toLocaleString('de-DE');
  if (sek < 60) return `${r(sek)} Sekunde${sek === 1 ? '' : 'n'}`;
  if (sek < 3600) return `${r(sek / 60)} Minuten`;
  if (sek < 86400) return `${r(sek / 3600)} Stunden`;
  if (sek < 86400 * 60) return `${r(sek / 86400)} Tage`;
  return `${r(sek / (86400 * 30.4))} Monate`;
}
/** Animationsdauer: logarithmisch, damit die Festplatte spürbar länger braucht, aber nicht ewig (0,3–6 s). */
export const animDauer = (takte) => 0.3 + (Math.log10(takte) / Math.log10(20_000_000)) * 5.7;

export default function starte({ wurzel, optionen }) {
  const stufen = STUFEN.filter((s) => optionen.festplatte !== false || s.id !== 'hdd');
  const ruhig = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const timer = new Set();
  const liste = el('div', { class: 'zugriff-liste' });
  for (const s of stufen) {
    const balken = el('span', { class: 'zugriff-balken' });
    const ergebnis = el('span', { class: 'zugriff-ergebnis', 'aria-live': 'polite' });
    const knopf = el('button', {
      type: 'button', class: 'knopf knopf-zweit zugriff-knopf', text: `Holen aus: ${s.name}`,
      onclick: () => {
        const d = ruhig ? 0 : animDauer(s.takte);
        balken.style.transition = 'none'; balken.style.width = '0%'; ergebnis.textContent = '';
        void balken.offsetWidth;
        balken.style.transition = `width ${d}s linear`; balken.style.width = '100%';
        knopf.disabled = true;
        const t = setTimeout(() => { timer.delete(t); knopf.disabled = false; ergebnis.textContent = `Da! Wenn ein Takt 1 Sekunde wäre: ${alltag(s.takte)}.`; }, d * 1000);
        timer.add(t);
      },
    });
    liste.append(el('div', { class: 'zugriff-stufe' }, [
      knopf,
      el('p', { class: 'zugriff-daten', text: `echt ${s.echt} · Größe ${s.groesse}` }),
      el('span', { class: 'zugriff-spur' }, [balken]), ergebnis,
    ]));
  }
  wurzel.append(el('p', { class: 'sim-zusatz', text: 'Tippe eine Stufe an. Der Balken ist nicht maßstabsgetreu (sonst würdest du bei der Festplatte Monate warten) – die hochgerechnete Zeit schon.' }), liste);
  return () => timer.forEach(clearTimeout);
}
