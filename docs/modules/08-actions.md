# GitHub Actions CI/CD - Teoría

## ¿Qué es GitHub Actions?

GitHub Actions es una plataforma de automatización CI/CD integrada en GitHub que permite ejecutar workflows para compilar, probar, validar y desplegar aplicaciones.

### ¿Para qué sirve en el bootcamp?

- Ejecutar calidad técnica en cada Pull Request.
- Automatizar build y pruebas en backend/frontend.
- Publicar imágenes a GHCR sin pasos manuales repetitivos.
- Trazar cambios desde commit hasta despliegue.

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **Workflow** | Archivo YAML que define automatizaciones |
| **Job** | Conjunto de pasos que corre en un runner |
| **Step** | Acción o comando individual dentro de un job |
| **Runner** | Máquina donde se ejecuta el workflow |
| **Trigger** | Evento que dispara ejecución (`push`, `pull_request`, etc.) |
| **Artifact** | Resultado generado por pipeline (binarios, reportes) |
| **GHCR** | GitHub Container Registry para imágenes Docker |
| **GITHUB_TOKEN** | Token automático de GitHub Actions con permisos controlados |

---

## Comandos clave

### Flujo Git para disparar CI

```bash
# Crear rama
git checkout -b feat/lab08-actions

# Subir cambios
git add .
git commit -m "ci/cd: add workflows"
git push -u origin feat/lab08-actions
```

### Crear PR por CLI

```bash
gh pr create --base main --head feat/lab08-actions --title "Lab 08" --body "CI/CD workflows"
```

### Consultar estado de checks

```bash
gh pr checks <numero-pr> --watch
gh run list
gh run view <run-id>
```

---

## Buenas prácticas

### 1. **Separar CI y Release**
- Un workflow para validar calidad en PR.
- Otro workflow para publicación/despliegue en `main`.

### 2. **Bloquear merge con checks cuando sea posible**
- Requerir build/test exitoso para proteger `main`.
- En contingencia (billing), documentar excepción temporal.

### 3. **Usar versionado de imágenes consistente**
- Publicar tags `sha`, `branch` y `latest` (solo en `main`).
- Evitar despliegues con imágenes ambiguas.

### 4. **Mantener pipelines resilientes**
- Si no hay tests frontend aún, omitir test con condición explícita y mensaje claro.
- Evitar falsos negativos por estado inicial del proyecto.

---

## Links útiles

- https://docs.github.com/en/actions
- https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
- https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches

---

## Casos de uso

### CI de Pull Request
Validar automáticamente backend/frontend antes de mergear cambios.

### Publicación de imágenes
Construir y publicar imágenes Docker en GHCR desde `main`.

### Base para GitOps
Entregar imágenes versionadas para Helm/Argo CD en Labs 09 y 10.

---


---

## Laboratorio

# GitHub Actions - CI/CD + Environments

- Matrices, cache, artefactos, **environments (dev/stage/prod)** con approvals.  
- Reutilización de workflows.

**Ver lab08-actions.md**.
