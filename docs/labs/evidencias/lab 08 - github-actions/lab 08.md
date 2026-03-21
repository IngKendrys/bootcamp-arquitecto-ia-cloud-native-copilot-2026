# Evidencias Lab 08

## Objetivo

Automatizar build, pruebas y publicación de imágenes Docker en GHCR usando GitHub Actions, con validación en PR hacia `main`.

---

## Implementación realizada

### 1) Workflow de CI

Archivo: `.github/workflows/ci.yml`

Incluye:
- Trigger en `pull_request` y `push` hacia `main`.
- Job backend `.NET 10`: `restore`, `build`, `test`.
- Job frontend `Angular 21`: `npm ci`, `npm run build`, test condicional (solo si existen `*.spec.ts`/`*.test.ts` en `src`).
- Job smoke test Docker: build de imágenes sin publicar.

### 2) Workflow de release GHCR

Archivo: `.github/workflows/release-ghcr.yml`

Incluye:
- Trigger en `push` a `main` y `workflow_dispatch`.
- Login a GHCR con `GITHUB_TOKEN`.
- Build/push de:
	- `ghcr.io/<owner>/backend`
	- `ghcr.io/<owner>/frontend-angular`
- Tags automáticos: `sha`, `branch`, `latest`.

---

## Comandos ejecutados (validación local equivalente)

### Backend

```bash
cd templates/dotnet10-api/src
dotnet restore Api.csproj
dotnet build Api.csproj -c Release --no-restore
dotnet test Api.csproj -c Release --no-build --verbosity minimal
```

Resultado: **OK**.

### Frontend

```bash
cd templates/angular21-app
npm ci
npm run build
```

Resultado: **OK**.

### Test frontend condicional (sin specs actuales)

```bash
cd templates/angular21-app
if find src -type f \( -name "*.spec.ts" -o -name "*.test.ts" \) | grep -q .; then
	npm test -- --watch=false
else
	echo "No Angular tests found (*.spec.ts/*.test.ts). Skipping test step."
fi
```

Resultado: **OK** (paso omitido de forma controlada por no existir tests en `src`).

### Smoke build Docker

```bash
docker build -t local/backend-ci:pr templates/dotnet10-api
docker build -t local/frontend-angular-ci:pr templates/angular21-app
```

Resultado: **OK**.

---

## Evidencia en GitHub

- PR creado: `lab-08` -> `main`
- URL PR: `https://github.com/IngKendrys/bootcamp-arquitecto-ia-cloud-native-copilot-2026/pull/11`

### Resultado del pipeline en PR

El workflow se disparó, pero los jobs no iniciaron por bloqueo externo de cuenta:

`The job was not started because your account is locked due to a billing issue.`

Esto fue confirmado en anotaciones del check-run de GitHub Actions.

---

## Problema encontrado y solución aplicada

### Problema

Bloqueo de facturación en GitHub Actions impide ejecutar jobs remotos.

### Solución aplicada (contingencia)

1. Mantener workflows implementados y versionados.
2. Validar localmente todos los pasos equivalentes a CI.
3. Documentar evidencia del fallo por billing.
4. Continuar con Labs 09/10 usando imágenes publicadas manualmente en GHCR.

### Solución definitiva pendiente

Desbloqueo de billing en cuenta GitHub para habilitar ejecución real de Actions.

---

## Resultado obtenido

- ✅ Workflows `ci.yml` y `release-ghcr.yml` implementados.
- ✅ Configuración de branch protection y guía de secrets/variables documentada.
- ✅ Validaciones locales equivalentes al pipeline ejecutadas correctamente.
- ⚠️ Ejecución remota de Actions bloqueada por billing (externo al código).

---

## Estado del Lab 08

**Completado con contingencia operativa**.

El laboratorio queda técnicamente implementado y verificable. Solo queda pendiente la ejecución remota en GitHub Actions cuando el billing sea restablecido.
