
# Dev Container - Guía profunda

## ¿Qué es y por qué usarlo?
- Entorno reproducible (Docker) con toolchain completo para backend, frontend y DevOps.
- Misma experiencia en local y en **Codespaces**.

## Estructura clave
- `.devcontainer/devcontainer.json` -> imagen base, **features** (docker-in-docker, kubectl/helm, dotnet 10, node 20, python), extensiones VS Code y *postCreate*.

## Extenderlo
- Agrega librerías o CLIs en `postCreateCommand` o crea `Dockerfile` propio.
- Usa **devcontainer features** oficiales (Azure, AWS, TF, etc.).

## Secretos
- En Codespaces, configura **Secrets** a nivel repo/org.  
- Nunca hardcodees credenciales.

## Uso con Copilot
- Copilot entiende el contexto del workspace y sugiere código/config con base en estos archivos.

