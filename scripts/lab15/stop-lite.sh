#!/usr/bin/env bash
set -euo pipefail

pkill -f "dotnet run" || true
pkill -f "next dev -p 3000" || true
pkill -f "next start -p 3000" || true

if docker ps -a --format '{{.Names}}' | grep -qx keycloak-lite; then
  docker rm -f keycloak-lite >/dev/null 2>&1 || true
fi

rm -rf /workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/templates/next16-app/.next

echo "[lab15] Procesos detenidos (backend/frontend/keycloak-lite)."
