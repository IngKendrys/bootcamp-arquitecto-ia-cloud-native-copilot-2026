#!/usr/bin/env bash
set -euo pipefail

check_url() {
	local name="$1"
	local url="$2"
	local ok_regex="$3"
	local attempts="${4:-20}"
	local code="000"

	echo "== $name =="
	for _ in $(seq 1 "$attempts"); do
		code="$(curl -s -o /dev/null -w "%{http_code}" "$url" || true)"
		if [[ "$code" =~ $ok_regex ]]; then
			break
		fi
		sleep 1
	done
	echo "$code"
}

check_url "Keycloak" "http://localhost:8080/realms/bootcamp/.well-known/openid-configuration" '^(200)$' 20
check_url "Backend" "http://127.0.0.1:5000/swagger" '^(200|301|302)$' 30
check_url "Next" "http://localhost:3000/login" '^(200|301|302)$' 45

echo "== Puertos =="
(lsof -i :8080 -P -n | sed -n '1,2p' || ss -ltnp | grep ':8080' | head -1 || true)
(lsof -i :5000 -P -n | sed -n '1,2p' || ss -ltnp | grep ':5000' | head -1 || true)
(lsof -i :3000 -P -n | sed -n '1,2p' || ss -ltnp | grep ':3000' | head -1 || true)
