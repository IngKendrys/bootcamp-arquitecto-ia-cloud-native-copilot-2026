#!/usr/bin/env bash
set -euo pipefail

KC_BASE="${KC_BASE:-http://localhost:8080}"
ADMIN_USER="${KC_ADMIN_USER:-admin}"
ADMIN_PASS="${KC_ADMIN_PASS:-admin}"
REALM="${KC_REALM:-bootcamp}"
CLIENT_ID="${KC_CLIENT_ID:-bootcamp-web}"
REDIRECT_URI="${KC_REDIRECT_URI:-http://localhost:3000/*}"
WEB_ORIGIN="${KC_WEB_ORIGIN:-http://localhost:3000}"
PY="${PYTHON_BIN:-python3}"

json_get_access_token() {
  "$PY" -c 'import json,sys; raw=sys.stdin.read().strip(); print((json.loads(raw).get("access_token","") if raw else ""))'
}

json_first_id() {
  "$PY" -c 'import json,sys; raw=sys.stdin.read().strip(); arr=json.loads(raw) if raw else []; print(arr[0]["id"] if arr else "")'
}

json_get_secret() {
  "$PY" -c 'import json,sys; raw=sys.stdin.read().strip(); obj=json.loads(raw) if raw else {}; print(obj.get("value",""))'
}

get_admin_token() {
  curl -sS -X POST "$KC_BASE/realms/master/protocol/openid-connect/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "username=$ADMIN_USER" \
    -d "password=$ADMIN_PASS" \
    -d "grant_type=password" \
    -d "client_id=admin-cli" | json_get_access_token
}

ADMIN_TOKEN="$(get_admin_token)"
if [[ -z "$ADMIN_TOKEN" ]]; then
  echo "[lab15] No se pudo obtener token admin de Keycloak." >&2
  exit 1
fi

if ! curl -sf "$KC_BASE/realms/$REALM/.well-known/openid-configuration" >/dev/null; then
  curl -sS -X POST "$KC_BASE/admin/realms" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"realm\":\"$REALM\",\"enabled\":true}" >/dev/null
fi

create_or_ignore_role() {
  local role="$1"
  curl -sS -o /dev/null -w "%{http_code}" -X POST "$KC_BASE/admin/realms/$REALM/roles" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$role\"}" | grep -Eq '201|409'
}

create_or_ignore_role admin
create_or_ignore_role reader

CLIENT_JSON="$(curl -sS -H "Authorization: Bearer $ADMIN_TOKEN" "$KC_BASE/admin/realms/$REALM/clients?clientId=$CLIENT_ID")"
CLIENT_UUID="$(printf "%s" "$CLIENT_JSON" | json_first_id)"

if [[ -z "$CLIENT_UUID" ]]; then
  curl -sS -X POST "$KC_BASE/admin/realms/$REALM/clients" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"clientId\":\"$CLIENT_ID\",\"name\":\"$CLIENT_ID\",\"enabled\":true,\"protocol\":\"openid-connect\",\"publicClient\":false,\"standardFlowEnabled\":true,\"directAccessGrantsEnabled\":true,\"redirectUris\":[\"$REDIRECT_URI\"],\"webOrigins\":[\"$WEB_ORIGIN\"]}" >/dev/null
  CLIENT_JSON="$(curl -sS -H "Authorization: Bearer $ADMIN_TOKEN" "$KC_BASE/admin/realms/$REALM/clients?clientId=$CLIENT_ID")"
  CLIENT_UUID="$(printf "%s" "$CLIENT_JSON" | json_first_id)"
fi

if [[ -z "$CLIENT_UUID" ]]; then
  echo "[lab15] No se pudo resolver UUID del cliente $CLIENT_ID" >&2
  exit 1
fi

CLIENT_SECRET="$(curl -sS -H "Authorization: Bearer $ADMIN_TOKEN" "$KC_BASE/admin/realms/$REALM/clients/$CLIENT_UUID/client-secret" | json_get_secret)"

upsert_user() {
  local username="$1"
  local password="$2"
  local role="$3"
  local firstName="$4"
  local lastName="$5"
  local email="$6"

  local user_json user_id
  user_json="$(curl -sS -H "Authorization: Bearer $ADMIN_TOKEN" "$KC_BASE/admin/realms/$REALM/users?username=$username")"
  user_id="$(printf "%s" "$user_json" | json_first_id)"

  if [[ -z "$user_id" ]]; then
    curl -sS -X POST "$KC_BASE/admin/realms/$REALM/users" \
      -H "Authorization: Bearer $ADMIN_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"username\":\"$username\",\"enabled\":true,\"firstName\":\"$firstName\",\"lastName\":\"$lastName\",\"email\":\"$email\",\"emailVerified\":true,\"requiredActions\":[]}" >/dev/null
    user_json="$(curl -sS -H "Authorization: Bearer $ADMIN_TOKEN" "$KC_BASE/admin/realms/$REALM/users?username=$username")"
    user_id="$(printf "%s" "$user_json" | json_first_id)"
  else
    curl -sS -X PUT "$KC_BASE/admin/realms/$REALM/users/$user_id" \
      -H "Authorization: Bearer $ADMIN_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"id\":\"$user_id\",\"username\":\"$username\",\"enabled\":true,\"firstName\":\"$firstName\",\"lastName\":\"$lastName\",\"email\":\"$email\",\"emailVerified\":true,\"requiredActions\":[]}" >/dev/null
  fi

  curl -sS -X PUT "$KC_BASE/admin/realms/$REALM/users/$user_id/reset-password" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"type\":\"password\",\"value\":\"$password\",\"temporary\":false}" >/dev/null

  local role_rep
  role_rep="$(curl -sS -H "Authorization: Bearer $ADMIN_TOKEN" "$KC_BASE/admin/realms/$REALM/roles/$role")"
  curl -sS -X POST "$KC_BASE/admin/realms/$REALM/users/$user_id/role-mappings/realm" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "[$role_rep]" >/dev/null || true
}

upsert_user "alice-admin" "alice123" "admin" "Alice" "Admin" "alice-admin@bootcamp.local"
upsert_user "bob-reader" "bob123" "reader" "Bob" "Reader" "bob-reader@bootcamp.local"

echo "[lab15] realm=$REALM client=$CLIENT_ID configured"
echo "[lab15] KEYCLOAK_CLIENT_SECRET=$CLIENT_SECRET"
