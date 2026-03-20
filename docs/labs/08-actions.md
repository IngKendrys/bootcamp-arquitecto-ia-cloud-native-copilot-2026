# Lab 08 - GitHub Actions CI/CD

## Objetivo
Automatizar build, pruebas y publicación de imágenes Docker en GHCR usando GitHub Actions.

## Prerrequisitos
- Lab 07 completado.
- Imágenes locales funcionando (`backend` y `frontend-angular`).
- Permisos para configurar ramas y Actions en GitHub.

## Implementación realizada

### 1) Workflow de CI (build + test)
Archivo: `.github/workflows/ci.yml`

Incluye:
- Trigger en `pull_request` a `main` y `push` a `main`.
- Job backend .NET 10: `restore`, `build`, `test`.
- Job frontend Angular 21: `npm ci`, `build`, `test` (si existen `*.spec.ts`/`*.test.ts` en `src`; si no, se omite con mensaje informativo).
- Job de smoke test Docker (build de imágenes sin push).

### 2) Workflow de release para GHCR
Archivo: `.github/workflows/release-ghcr.yml`

Incluye:
- Trigger en `push` a `main` (cuando cambian templates/workflow) y `workflow_dispatch`.
- Login a GHCR con `GITHUB_TOKEN`.
- Build + push de:
  - `ghcr.io/<owner>/backend`
  - `ghcr.io/<owner>/frontend-angular`
- Tags automáticos: `sha`, `branch`, `latest` (solo para `main`).

---

## Paso a paso de configuración en GitHub

### Paso 1: Verificar permisos de Actions
En el repositorio:
`Settings > Actions > General`

Configura:
- **Actions permissions**: Allow all actions and reusable workflows.
- **Workflow permissions**: Read and write permissions.
- Marca: **Allow GitHub Actions to create and approve pull requests** (opcional, recomendado).

### Paso 2: Definir Secrets
Ruta:
`Settings > Secrets and variables > Actions > Secrets`

Para este lab, no es obligatorio agregar secretos extra si usarás `GITHUB_TOKEN` para GHCR.

Opcional (si quieres token dedicado):
- `GHCR_PAT` con scopes:
  - `write:packages`
  - `read:packages`
  - `repo`

### Paso 3: Definir Variables de entorno (repo variables)
Ruta:
`Settings > Secrets and variables > Actions > Variables`

Opcionales para estandarizar nombres:
- `REGISTRY=ghcr.io`
- `BACKEND_IMAGE=backend`
- `FRONTEND_IMAGE=frontend-angular`

> Nota: el workflow actual ya define estos valores internamente en `env`.

### Paso 4: Agregar protección mínima de rama
Ruta:
`Settings > Branches > Add branch protection rule`

Regla para `main`:
- ✅ Require a pull request before merging
- ✅ Require approvals: 1
- ✅ Require status checks to pass before merging
  - checks requeridos:
    - `Backend build & test (.NET 10)`
    - `Frontend build & test (Angular 21)`
    - `Docker build smoke test`
- ✅ Require branches to be up to date before merging
- ✅ Do not allow force pushes
- ✅ Do not allow deletions

### Paso 5: Ejecutar pipeline en PR hacia main

```bash
# 1) Crear rama de trabajo
git checkout -b feat/lab08-actions

# 2) Commit de workflows
git add .github/workflows/ci.yml .github/workflows/release-ghcr.yml docs/labs/08-actions.md
git commit -m "ci/cd: add CI and GHCR release workflows for lab 08"

# 3) Push y PR
git push -u origin feat/lab08-actions
```

Luego crea PR: `feat/lab08-actions` -> `main`.

Resultado esperado en PR:
- CI en verde (3 checks).
- Sin publicación de imágenes (solo smoke build).

### Paso 6: Merge a main y release automático

Al hacer merge del PR en `main`:
- Se dispara `release-ghcr.yml`.
- Se publican imágenes en GHCR.

Verificar en:
- `https://github.com/<owner>/<repo>/actions`
- `https://github.com/<owner>/<repo>/pkgs/container/`

---

## Validación
- CI en verde en PR a `main`.
- Release en verde tras merge a `main`.
- Imágenes disponibles en GHCR:
  - `ghcr.io/<owner>/backend:latest`
  - `ghcr.io/<owner>/frontend-angular:latest`

## Rúbrica
- 40% pipeline CI.
- 40% pipeline release.
- 20% evidencia.

## Entregables
- `.github/workflows/ci.yml`
- `.github/workflows/release-ghcr.yml`
- `EVIDENCIAS.md` con links a ejecuciones de workflows y paquetes publicados.
