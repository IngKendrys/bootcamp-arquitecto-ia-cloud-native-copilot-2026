# Bootcamp Arquitecto IA Cloud Native con Copilot, GitHub y Azure DevOps (Marzo 2026)

## Objetivo del curso
Dominar un flujo profesional de arquitectura y entrega de software asistido por IA con:
- GitHub Copilot y GitHub.com
- Azure DevOps (Repos, Pipelines, Boards y ACR)
- Codespaces y Dev Containers
- .NET 10, FastAPI, Next 16/React 19, Angular 21
- NestJS 11 + Node.js 24 LTS
- Docker 29, GHCR, GitHub Actions
- Kubernetes 1.35, Helm, Argo CD
- OIDC (Keycloak/Entra), datos a escala y observabilidad
- Agentes de IA: Microsoft Semantic Kernel + Azure AI Foundry y LangGraph
- Mobile: React Native + Expo y Kotlin/Jetpack Compose + Swift/SwiftUI
- Arquitectura de sistemas cloud native y ADR
- Mensajería asíncrona: Redis, Azure Queue Storage y Apache Kafka
- API Management: Azure API Management y Kong + Konga

## Cobertura del programa
- Fundamentos de productividad con GitHub Copilot
- Desarrollo backend y frontend moderno (.NET, FastAPI, Next, Angular, NestJS)
- Contenedores, CI/CD y despliegue en Kubernetes
- Seguridad con OIDC y JWT
- Datos, rendimiento y observabilidad
- Agentes de IA con tool calling real sobre el sistema
- Apps mobile cross-platform (React Native) y nativas (Kotlin/Swift)
- Integraciones asíncronas con colas y event streaming
- Gobernanza de APIs con API Management

## Estructura oficial del curso
- `docs/modules/`: explicación conceptual por tema
- `docs/labs/`: ejecución paso a paso
- `docs/prompts/`: prompts reutilizables para Copilot
- `docs/datos/`: material de tecnologías de datos
- `templates/`: proyectos base para prácticas
- `infra/`: Kubernetes, Helm, GitOps
- `observabilidad/`: stack Prometheus + Grafana

## Orden recomendado de ejecución
1. Revisa el plan maestro en `docs/modules/00-plan-del-curso.md`.
2. Prepara entorno con `docs/labs/00-setup-y-ruta.md`.
3. Ejecuta laboratorios del 01 al 12.
4. Ejecuta laboratorios avanzados del 13 al 18.
5. Ejecuta los labs de nuevas tecnologías del 19 al 23 (NestJS, AI Agents, Mobile).
6. Ejecuta labs 24 al 26 (Mensajería asíncrona y API Management).
7. Ejecuta track de plataforma:
	- GitHub: `07-docker-ghcr.md`, `08-actions.md`, `17-reusables-environments.md`
	- Azure DevOps: `azdo-01-repos-policies.md` a `azdo-05-boards-traceability.md`
8. Cierra con `docs/labs/99-proyecto-integrador.md`.

Nota de cierre obligatorio:
- El Lab 99 consolida obligatoriamente las capacidades de los Labs 19 al 26.
- El objetivo final es un unico sistema E2E 100% funcional, no entregas aisladas.

## Plan de trabajo del estudiante
La estrategia recomendada es aprendizaje incremental:
1. Lee un módulo corto de teoría.
2. Ejecuta su laboratorio correspondiente inmediatamente.
3. Registra evidencia de resultado (comandos, salida, problemas y solución).
4. Continúa con el siguiente módulo.

No se recomienda leer toda la teoría primero y dejar toda la práctica para el final.

### Secuencia práctica sugerida
1. Inicio y entorno:
	- `docs/labs/00-setup-y-ruta.md`
	- `docs/labs/00-checklist-30min.md` (opcional)
2. Ruta común (todos):
	- `01-copilot.md` a `06-angular21.md`
	- `09-k8s-helm.md`, `10-argocd.md`, `11-oidc.md`, `12-data-at-scale.md`
	- `13-efcore-migrations.md` a `18-sso-oidc-entra-google-keycloak.md`
3. Nuevas tecnologías e integración enterprise:
	- `19-nestjs-api.md` a `23-mobile-native-kotlin-swift.md`
	- `24-mensajeria-redis-azure-queue.md` a `26-azure-apim.md`
4. Ruta de plataforma (elige una o ambas):
	- GitHub: `07-docker-ghcr.md`, `08-actions.md`, `17-reusables-environments.md`
	- Azure DevOps: `azdo-01-repos-policies.md` a `azdo-05-boards-traceability.md`
5. Cierre integrador:
	- `99-proyecto-integrador.md`

Para una planificación detallada por días, consulta `docs/labs/00-ruta-ejecucion-dia-a-dia.md`.

## Inicio rápido recomendado
Si vas a iniciar desde cero, sigue primero `docs/labs/00-setup-y-ruta.md`.
Incluye pasos detallados para:
- Windows 11 y macOS con VS Code
- creación de cuenta y repositorio en GitHub
- importación del contenido del curso
- elección de Codespaces o Dev Container
- validación de herramientas y flujo de ramas

Si quieres arrancar en modo express, usa `docs/labs/00-checklist-30min.md`.
Si quieres una planificación operativa completa, usa `docs/labs/00-ruta-ejecucion-dia-a-dia.md`.
Si quieres una guia ultra resumida de ejecucion semanal, usa `docs/labs/00-flujo-estudiante-1-pagina.md`.

## Troubleshooting de Dev Container (Windows)

### Caso: falla al iniciar el contenedor en este repo

**Síntoma**
- El contenedor no levanta al usar **Reopen in Container**.
- En los logs de Dev Containers aparece error de build con `exit code: 100`.
- Mensaje clave en logs:
	- `NO_PUBKEY 62D54FD4003F6525`
	- `The repository 'https://dl.yarnpkg.com/debian stable InRelease' is not signed`

**Causa raíz**
- No fue el nombre largo de la carpeta/proyecto.
- La imagen base `mcr.microsoft.com/devcontainers/universal:2` puede traer un repositorio de Yarn con clave GPG desactualizada.
- Al instalar features (en especial `docker-in-docker`), `apt-get update` falla por esa clave.

**Solución aplicada en el repo**
1. Se cambió el devcontainer de `image` a `build` en `.devcontainer/devcontainer.json`.
2. Se agregó `.devcontainer/Dockerfile` para remover `yarn.list` antes de instalar features.

**Cómo recuperarte si vuelve a pasar**
1. En VS Code ejecuta: **Dev Containers: Rebuild Without Cache and Reopen in Container**.
2. Si persiste, elimina contenedores/imágenes previas del proyecto y vuelve a reconstruir.
3. Revisa el log de la extensión Dev Containers y busca `NO_PUBKEY` o `docker-in-docker failed to install`.

**Validación rápida (opcional)**
- Construir base local:
	- `docker build -f .devcontainer/Dockerfile -t bootcamp-devcontainer-basefix:local .`
- Probar `apt update` dentro de la imagen:
	- `docker run --rm bootcamp-devcontainer-basefix:local bash -lc "apt-get update -y"`

## Laboratorios oficiales
- Fundacionales: `01-copilot.md` a `12-data-at-scale.md`
- Avanzados: `13-efcore-migrations.md` a `18-sso-oidc-entra-google-keycloak.md`
- NestJS + AI Agents + Mobile: `19-nestjs-api.md` a `23-mobile-native-kotlin-swift.md`
- Mensajería + API Management: `24-mensajeria-redis-azure-queue.md` a `26-azure-apim.md`
- Track Azure DevOps: `azdo-01-repos-policies.md` a `azdo-05-boards-traceability.md`
- Cierre: `99-proyecto-integrador.md`

Esta es la ruta oficial única del bootcamp.

## Solución del curso
- Archivo principal: `Bootcamp_Arquitecto_IA_Cloud_Native_Copilot_GitHub_AzureDevOps.sln`
- Uso: abrir la solución para trabajar el template .NET del curso desde Visual Studio/VS Code.

## Resultado esperado al terminar
- Entregas un sistema E2E con backend, frontend web, mobile y datos
- Automatizas build/test/publish/deploy con GitHub Actions o Azure Pipelines
- Despliegas en Kubernetes con Helm y GitOps
- Implementas autenticación OIDC y controles de acceso
- Integras SSO OIDC con Entra ID, Google y Keycloak
- Instrumentas observabilidad y documentas evidencias técnicas
- Construyes una API NestJS con TypeScript, TypeORM y JWT
- Creas agentes de IA funcionales con tool calling sobre datos reales del sistema
- Desarrollas apps mobile en React Native y Kotlin/Swift conectadas al ecosistema
- Tomas y documentas decisiones arquitectónicas con ADR sobre el sistema completo
- Implementas flujos asíncronos con Redis, Azure Queue y Kafka
- Publicas y gobiernas APIs con Azure APIM y patrón gateway (Kong)
- Integras esas capacidades en el proyecto final unico del Lab 99

## Siguiente lectura obligatoria
- `docs/modules/00-plan-del-curso.md`
- `docs/labs/README.md`
- `docs/prompts/00-guia-prompts-completa.md`
- `docs/labs/99-rubrica-evaluacion-instructor.md`

Propuesta academica para universidad:
- `docs/propuesta-universidad/README.md`

Para estudiantes:
- En `docs/prompts/00-guia-prompts-completa.md` revisa la tabla oficial `Lab -> Prompt -> Evidencia minima` antes de iniciar cada laboratorio.
