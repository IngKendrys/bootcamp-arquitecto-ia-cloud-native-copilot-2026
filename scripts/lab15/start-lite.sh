#!/usr/bin/env bash
set -euo pipefail

ROOT="/workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026"

bash "$ROOT/scripts/lab15/stop-lite.sh" || true

if docker ps -a --format '{{.Names}}' | grep -qx keycloak-lite; then
  docker rm -f keycloak-lite >/dev/null 2>&1 || true
fi

docker run -d --name keycloak-lite \
  -p 8080:8080 \
  --memory=700m --cpus=1 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  -e JAVA_OPTS="-Xms128m -Xmx384m" \
  quay.io/keycloak/keycloak:26.1.0 start-dev >/dev/null

echo "[lab15] esperando Keycloak..."
for i in {1..60}; do
  if curl -sf http://localhost:8080/realms/master/.well-known/openid-configuration >/dev/null; then
    break
  fi
  sleep 2
done

SECRET_LINE="$(bash "$ROOT/scripts/lab15/provision-keycloak.sh" | grep 'KEYCLOAK_CLIENT_SECRET=' | tail -1 || true)"
if [[ -z "$SECRET_LINE" ]]; then
  echo "[lab15] no se pudo provisionar Keycloak" >&2
  exit 1
fi
SECRET="${SECRET_LINE#*=}"

ENV_FILE="$ROOT/templates/next16-app/.env.local"
if [[ ! -f "$ENV_FILE" ]]; then
  cp "$ROOT/templates/next16-app/.env.example" "$ENV_FILE" 2>/dev/null || true
fi

# actualiza/inyecta variables
sed -i '/^KEYCLOAK_CLIENT_SECRET=/d' "$ENV_FILE"
sed -i '/^KEYCLOAK_ISSUER=/d' "$ENV_FILE"
sed -i '/^KEYCLOAK_CLIENT_ID=/d' "$ENV_FILE"
sed -i '/^AUTH_URL=/d' "$ENV_FILE"
{
  echo "KEYCLOAK_ISSUER=http://localhost:8080/realms/bootcamp"
  echo "KEYCLOAK_CLIENT_ID=bootcamp-web"
  echo "KEYCLOAK_CLIENT_SECRET=$SECRET"
  echo "AUTH_URL=http://localhost:3000"
} >> "$ENV_FILE"

# backend (sqlite)
(
  cd "$ROOT/templates/dotnet10-api/src"
  ASPNETCORE_URLS=http://127.0.0.1:5000 ASPNETCORE_ENVIRONMENT=Development dotnet run > /tmp/lab15-backend.log 2>&1
) &

# frontend next (lite)
(
  cd "$ROOT/templates/next16-app"
  rm -rf .next
  NODE_OPTIONS=--max-old-space-size=512 npm run dev > /tmp/lab15-next.log 2>&1
) &

echo "[lab15] esperando backend..."
for i in {1..45}; do
  backend_code="$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5000/swagger || true)"
  if [[ "$backend_code" =~ ^(200|301|302)$ ]]; then
    break
  fi
  sleep 2
done

echo "[lab15] esperando frontend..."
for i in {1..60}; do
  next_code="$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/login || true)"
  if [[ "$next_code" =~ ^(200|301|302)$ ]]; then
    break
  fi
  sleep 2
done

echo "[lab15] iniciado en modo lite"
echo "[lab15] keycloak: http://localhost:8080"
echo "[lab15] backend : http://127.0.0.1:5000"
echo "[lab15] frontend: http://localhost:3000"
echo "[lab15] logs -> /tmp/lab15-backend.log y /tmp/lab15-next.log"
