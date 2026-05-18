#!/usr/bin/env bash
set -euo pipefail

info() {
  printf '\n▶ %s\n' "$1"
}

fail() {
  printf '\n❌ %s\n' "$1" >&2
  exit 1
}

warn() {
  printf '⚠️  %s\n' "$1"
}

info "Lint ausführen"
npm run lint || fail "Lint fehlgeschlagen. Bitte ESLint-Fehler beheben und erneut ausführen."

info "Production Build ausführen"
npm run build || fail "Build fehlgeschlagen. Bitte Build-/TypeScript-Fehler beheben und erneut ausführen."

info "Deployment-Dateien prüfen"
if [ -f ".env.local" ]; then
  warn ".env.local existiert lokal. Diese Datei darf nicht committed werden."
fi

if [ ! -f "CHANGELOG.md" ]; then
  warn "CHANGELOG.md fehlt. Bitte vor dem Deployment Änderungen dokumentieren."
fi

printf '\n✅ Pre-Deploy Check bestanden. Bereit für Deployment.\n'
