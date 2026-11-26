// KERN (übernehmbar, siehe docs/kern.md) – Service Worker anmelden und Updates anbieten.
// Neue Version liegt fertig geladen bereit → Leiste „Neue Version verfügbar – Neu laden“. Erst nach dem Tippen
// übernimmt sie (Nachricht „aktivieren“ an sw.js), damit keine laufende Übung unterbrochen wird.
// Herkunft: bim-trainer js/app.js (serviceWorkerEinrichten).

export async function serviceWorkerEinrichten({ leiste, knopf }) {
  if (!('serviceWorker' in navigator)) return;
  let reg;
  try { reg = await navigator.serviceWorker.register('sw.js'); } catch (e) { console.warn('Service Worker:', e); return; }
  if (!reg) return;
  let neuLadenAngefordert = false;
  // Ohne bisherigen Controller ist es die Erstinstallation, kein Update
  const melden = (sw) => { if (sw && navigator.serviceWorker.controller) leiste.hidden = false; };
  if (reg.waiting) melden(reg.waiting);
  reg.addEventListener('updatefound', () => {
    const neu = reg.installing;
    neu?.addEventListener('statechange', () => { if (neu.state === 'installed') melden(neu); });
  });
  knopf.addEventListener('click', () => {
    neuLadenAngefordert = true;
    knopf.disabled = true;
    if (reg.waiting) reg.waiting.postMessage({ typ: 'aktivieren' });
    else location.reload();
  });
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (neuLadenAngefordert) location.reload(); });
  const pruefen = () => reg.update().catch(() => {});
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') pruefen(); });
  setInterval(pruefen, 60 * 60 * 1000);
}
