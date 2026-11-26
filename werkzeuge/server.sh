#!/usr/bin/env bash
# Startet die App lokal – nur auf 127.0.0.1, also NICHT aus dem Netz erreichbar.
# Ansehen per Playwright-Screenshot (werkzeuge/oberflaeche-pruefen.mjs) oder über die Vorschau.
set -euo pipefail
PORT="${1:-8080}"
cd "$(dirname "$0")/.."
echo "IT-Trainer läuft auf http://127.0.0.1:${PORT}/  (Strg+C beendet)"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
