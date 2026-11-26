// „Mehr“: Darstellung, Fortschritt sichern und übertragen (Datei oder Code), Über die App.
import { el, toast, frage, dateiAnbieten } from '../kern/dom.js';
import { alsDateiText, ausDateiText, alsCode, ausCode, zusammenfuehren } from '../kern/speicher.js';
import { versionsText } from '../kern/logik.js';
import { wendeThemaAn } from '../kern/thema.js';
import { ansichtSetzen } from './bausteine.js';

export function zeigeEinstellungen(ctx) {
  const { config } = ctx;
  const app = config.app;
  const thema = el('div', { class: 'umschalter', role: 'radiogroup', 'aria-label': 'Darstellung' },
    [['auto', 'Automatisch'], ['hell', 'Hell'], ['dunkel', 'Dunkel']].map(([wert, text]) => el('button', {
      type: 'button', role: 'radio', class: 'umschalter-knopf', 'aria-checked': String(ctx.zustand.einstellungen.thema === wert), text,
      onclick: (ev) => {
        ctx.zustand.einstellungen.thema = wert; ctx.speichern(); wendeThemaAn(config.farben, wert);
        for (const k of ev.currentTarget.parentElement.children) k.setAttribute('aria-checked', String(k === ev.currentTarget));
      },
    })));

  const codeFeld = el('textarea', { class: 'code-feld', rows: 4, readonly: true, 'aria-label': 'Dein Fortschritts-Code', hidden: true });
  const kopieren = el('button', { type: 'button', class: 'knopf knopf-zweit', text: 'Code kopieren', hidden: true, onclick: async () => {
    try { await navigator.clipboard.writeText(codeFeld.value); toast('Code kopiert.'); } catch { codeFeld.select(); toast('Bitte markierten Code selbst kopieren.'); }
  } });
  const einfuegen = el('textarea', { class: 'code-feld', rows: 4, placeholder: 'Code hier einfügen …', 'aria-label': 'Fortschritts-Code einfügen' });
  const datei = el('input', { type: 'file', accept: '.json,application/json', class: 'datei-feld', 'aria-label': 'Fortschritts-Datei wählen' });

  const uebernehmen = async (holen) => {
    let fremd;
    try { fremd = await holen(); } catch (e) { toast(`${e.message} Es wurde nichts verändert.`, 6000); return; }
    const ersetzen = await frage('Fortschritt übernehmen', 'Zusammenführen behält alles von diesem Gerät und ergänzt den übernommenen Stand (je Eintrag gilt der neuere). Ersetzen löscht den Stand auf diesem Gerät.', { ja: 'Ersetzen', nein: 'Zusammenführen' });
    if (ersetzen) {
      if (!(await frage('Wirklich ersetzen?', 'Der Fortschritt auf diesem Gerät wird durch den übernommenen ersetzt.', { ja: 'Ersetzen', nein: 'Abbrechen' }))) return;
      ctx.ersetzeZustand({ ...fremd, einstellungen: ctx.zustand.einstellungen });
      toast('Fortschritt ersetzt.');
    } else {
      ctx.ersetzeZustand(zusammenfuehren(ctx.zustand, fremd));
      toast('Fortschritt zusammengeführt.');
    }
    einfuegen.value = '';
    datei.value = '';
  };
  datei.addEventListener('change', () => { const f = datei.files[0]; if (f) uebernehmen(async () => ausDateiText(await f.text(), app.id)); });

  const fertig = Object.values(ctx.zustand.folgen).filter((f) => f.fertig).length;
  const karten = Object.keys(ctx.zustand.karten).length;
  ansichtSetzen([
    el('p', { class: 'kicker', text: 'Mehr' }),
    el('h1', { class: 'titel', text: 'Einstellungen' }),
    el('section', { class: 'karte' }, [el('h2', { class: 'karte-titel', text: 'Darstellung' }), thema]),
    el('section', { class: 'karte', 'aria-labelledby': 'sichern-titel' }, [
      el('h2', { class: 'karte-titel', id: 'sichern-titel', text: 'Fortschritt sichern' }),
      el('p', { class: 'karte-text', text: `Dein Fortschritt (${fertig} Folgen fertig, ${karten} Karten im Kasten) liegt nur in diesem Browser. Sichere ihn als Datei oder übertrage ihn als Code auf ein anderes Gerät – z. B. vom Handy zum PC.` }),
      el('div', { class: 'knopfreihe' }, [
        el('button', { type: 'button', class: 'knopf', text: 'Als Datei speichern', onclick: () => dateiAnbieten(`it-trainer-fortschritt-${new Date().toISOString().slice(0, 10)}.json`, alsDateiText(ctx.zustand)) }),
        el('button', { type: 'button', class: 'knopf knopf-zweit', text: 'Als Code anzeigen', onclick: async () => {
          codeFeld.value = await alsCode(ctx.zustand, app.codePraefix); codeFeld.hidden = false; kopieren.hidden = false; codeFeld.select();
        } }),
      ]),
      codeFeld, kopieren,
    ]),
    el('section', { class: 'karte', 'aria-labelledby': 'uebernehmen-titel' }, [
      el('h2', { class: 'karte-titel', id: 'uebernehmen-titel', text: 'Fortschritt übernehmen' }),
      el('p', { class: 'karte-text', text: 'Code vom anderen Gerät einfügen oder eine gesicherte Datei wählen. Du entscheidest danach: zusammenführen oder ersetzen.' }),
      einfuegen,
      el('div', { class: 'knopfreihe' }, [
        el('button', { type: 'button', class: 'knopf', text: 'Code übernehmen', onclick: () => uebernehmen(() => ausCode(einfuegen.value, app.codePraefix, app.id)) }),
        el('label', { class: 'knopf knopf-zweit datei-knopf' }, ['Datei wählen', datei]),
      ]),
    ]),
    el('section', { class: 'karte' }, [
      el('h2', { class: 'karte-titel', text: 'Über die App' }),
      el('p', { class: 'karte-text', text: `${app.name} – ${app.beschreibung}` }),
      el('p', { class: 'karte-text', text: 'Jede Folge wird vor der Freigabe von einer unabhängigen Prüfung auf fachliche Richtigkeit und Verständlichkeit kontrolliert. Die Quellen stehen am Ende jeder Folge.' }),
      el('p', { class: 'version', id: 'version', text: versionsText(app.version, ctx.build) }),
    ]),
  ], { titel: 'Einstellungen' });
}
