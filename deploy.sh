#!/usr/bin/env bash
# Veröffentlicht den aktuellen Commit auf Cloudflare Pages (Direkt-Upload mit wrangler). Vorbild: bim-trainer/deploy.sh.
#
# Aufruf:  ./deploy.sh vorschau   → https://vorschau.it-trainer.pages.dev (alle Folgen, Entwürfe markiert),
#                                   danach AUTOMATISCHE PRÜFUNG (Dateien/Links, Handy-Darstellung per Screenshot,
#                                   Durchklicken von Folgen, keine Fehler). Bestanden → Merker .git/vorschau-geprueft
#          ./deploy.sh live       → https://it-trainer.pages.dev (nur Folgen mit Status „freigegeben“).
#                                   Nur vom Branch main und nur für genau den Commit, dessen Vorschau bestanden hat.
#
# Kein OK von Philip nötig (Vereinbarung vom 26.11.2026) – die automatische Prüfung ersetzt es.
# Zugangsdaten: ~/.claude/secrets/cloudflare.env (CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID), nie ausgegeben.
set -euo pipefail

PROJEKT="it-trainer"
PRODUKTIONSZWEIG="main"
VORSCHAUZWEIG="vorschau"
ENV_DATEI="${CLOUDFLARE_ENV_DATEI:-$HOME/.claude/secrets/cloudflare.env}"
# inhalt/ fehlt hier bewusst: wird je nach Modus frisch gebaut (live ohne Entwürfe)
APP_DATEIEN=(index.html 404.html manifest.webmanifest sw.js _headers config.json css js fonts icons)
BILDER="${PRUEF_BILDER:-/workspace/tmp/it-trainer-pruefung}"

MODUS="${1:-}"
case "$MODUS" in
  vorschau) ZWEIG="$VORSCHAUZWEIG" ;;
  live)     ZWEIG="$PRODUKTIONSZWEIG" ;;
  *) echo "Aufruf: ./deploy.sh vorschau | live" >&2; exit 2 ;;
esac
cd "$(dirname "$0")"

# ---- Zugangsdaten lesen (ohne source, ohne Ausgabe) ----
if [[ ! -r "$ENV_DATEI" ]]; then echo "✗ Zugangsdaten nicht gefunden: $ENV_DATEI" >&2; exit 1; fi
lies_wert() {
  local zeile
  zeile="$(grep -E "^[[:space:]]*(export[[:space:]]+)?$1=" "$ENV_DATEI" | tail -1 || true)"
  zeile="${zeile#*=}"; zeile="${zeile%$'\r'}"; zeile="${zeile#[\"\']}"; zeile="${zeile%[\"\']}"
  printf '%s' "$zeile"
}
CLOUDFLARE_API_TOKEN="$(lies_wert CLOUDFLARE_API_TOKEN)"
CLOUDFLARE_ACCOUNT_ID="$(lies_wert CLOUDFLARE_ACCOUNT_ID)"
[[ ${#CLOUDFLARE_API_TOKEN} -ge 40 ]] || { echo "✗ CLOUDFLARE_API_TOKEN fehlt oder ist zu kurz in $ENV_DATEI" >&2; exit 1; }
[[ "$CLOUDFLARE_ACCOUNT_ID" =~ ^[0-9a-f]{32}$ ]] || { echo "✗ CLOUDFLARE_ACCOUNT_ID ist keine 32-stellige Hex-ID in $ENV_DATEI" >&2; exit 1; }
export CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID
export WRANGLER_SEND_METRICS=false

# ---- Nur committete Stände ----
if [[ -n "$(git status --porcelain)" ]]; then
  echo "✗ Es gibt nicht committete Änderungen – bitte erst committen:" >&2; git status --short >&2; exit 1
fi
MERKER="$(git rev-parse --git-dir)/vorschau-geprueft"
if [[ "$MODUS" == live ]]; then
  [[ "$(git branch --show-current)" == "$PRODUKTIONSZWEIG" ]] || { echo "✗ live nur vom Branch $PRODUKTIONSZWEIG" >&2; exit 1; }
  if [[ "$(cat "$MERKER" 2>/dev/null || true)" != "$(git rev-parse HEAD)" ]]; then
    echo "✗ Dieser Commit hat die Vorschau-Prüfung nicht bestanden (oder lief nie als Vorschau). Erst ./deploy.sh vorschau." >&2; exit 1
  fi
fi
[[ -x node_modules/.bin/wrangler ]] || { echo "✗ wrangler fehlt – bitte einmal: npm ci" >&2; exit 1; }

echo "→ Prüfe Inhalte und Tests …"
node werkzeuge/bauen.mjs --pruefen >/dev/null || { echo "✗ Inhalte ungültig oder erzeugte Dateien veraltet (npm run pruefen)" >&2; exit 1; }
node --test 'tests/*.test.mjs' >/dev/null 2>&1 || { echo "✗ Tests schlagen fehl (npm test)" >&2; exit 1; }

# ---- Dateien zusammenstellen ----
COMMIT="$(git rev-parse --short HEAD)"
ARBEIT="$(mktemp -d)"
trap 'rm -rf "$ARBEIT"' EXIT
AUSGABE="$ARBEIT/app"; mkdir "$AUSGABE"
export WRANGLER_LOG_PATH="$ARBEIT/logs"   # Logs enthalten die Account-ID → nur temporär
git archive HEAD "${APP_DATEIEN[@]}" | tar -x -C "$AUSGABE"
if [[ "$MODUS" == live ]]; then node werkzeuge/bauen.mjs --live --ziel "$AUSGABE"; else node werkzeuge/bauen.mjs --ziel "$AUSGABE"; fi
sed -i "s/const CACHE_VERSION = '[^']*'/const CACHE_VERSION = 'ittrainer-${COMMIT}-${MODUS}'/" "$AUSGABE/sw.js"
grep -q "'ittrainer-${COMMIT}-${MODUS}'" "$AUSGABE/sw.js" || { echo "✗ CACHE_VERSION nicht gesetzt" >&2; exit 1; }
sed -i "s/const APP_BUILD = '[^']*'/const APP_BUILD = '${COMMIT}'/" "$AUSGABE/js/app.js"
grep -q "const APP_BUILD = '${COMMIT}'" "$AUSGABE/js/app.js" || { echo "✗ APP_BUILD nicht gesetzt" >&2; exit 1; }
node werkzeuge/pruefsummen.mjs "$AUSGABE"
grep -q 'PRUEFSUMMEN = {"' "$AUSGABE/sw.js" || { echo "✗ Prüfsummen fehlen" >&2; exit 1; }

# ---- Pages-Projekt prüfen bzw. anlegen (API; wrangler legt ab 4.15x „Pages in Workers“ an) ----
pages_projekt() {
  PROJEKT="$PROJEKT" ZWEIG="$PRODUKTIONSZWEIG" python3 -I - <<'PY'
import os, json, sys, urllib.request, urllib.error
basis = f"https://api.cloudflare.com/client/v4/accounts/{os.environ['CLOUDFLARE_ACCOUNT_ID']}/pages/projects"
kopf = {"Authorization": "Bearer " + os.environ["CLOUDFLARE_API_TOKEN"], "Content-Type": "application/json"}
name, zweig = os.environ["PROJEKT"], os.environ["ZWEIG"]
def anfrage(url, daten=None, methode="GET"):
    req = urllib.request.Request(url, data=json.dumps(daten).encode() if daten else None, headers=kopf, method=methode)
    try:
        return 200, json.load(urllib.request.urlopen(req, timeout=30))
    except urllib.error.HTTPError as e:
        return e.code, json.load(e)
code, d = anfrage(f"{basis}/{name}")
if code == 404:
    print(f"→ Lege Pages-Projekt „{name}“ an …", file=sys.stderr)
    code, d = anfrage(basis, {"name": name, "production_branch": zweig}, "POST")
if code != 200 or not d.get("success"):
    print("✗ Cloudflare-API:", code, [(e.get("code"), e.get("message")) for e in d.get("errors", [])], file=sys.stderr)
    sys.exit(1)
print(d["result"]["subdomain"])
PY
}
SUBDOMAIN="$(pages_projekt)"
echo "→ Pages-Projekt: ${PROJEKT} (${SUBDOMAIN})"

echo "→ Veröffentliche Commit ${COMMIT} als ${MODUS} (Branch ${ZWEIG}) …"
node_modules/.bin/wrangler pages deploy "$AUSGABE" \
  --project-name "$PROJEKT" --branch "$ZWEIG" \
  --commit-hash "$(git rev-parse HEAD)" --commit-message "$(git log -1 --pretty=%s)" --commit-dirty=false

if [[ "$MODUS" == vorschau ]]; then
  URL="https://${VORSCHAUZWEIG}.${SUBDOMAIN}"
  rm -f "$MERKER"
  echo "→ Automatische Prüfung der Vorschau ($URL) …"
  node werkzeuge/oberflaeche-pruefen.mjs --url "$URL" --build "$COMMIT" --bilder "$BILDER/$COMMIT-vorschau"
  git rev-parse HEAD > "$MERKER"
  echo "✓ Vorschau geprüft: $URL  (Commit ${COMMIT}, Bilder: $BILDER/$COMMIT-vorschau) – darf live"
else
  URL="https://${SUBDOMAIN}"
  echo "→ Prüfe Live-Stand ($URL) …"
  node werkzeuge/oberflaeche-pruefen.mjs --url "$URL" --build "$COMMIT" --live --bilder "$BILDER/$COMMIT-live"
  echo "✓ Live: $URL  (Commit ${COMMIT})"
fi
