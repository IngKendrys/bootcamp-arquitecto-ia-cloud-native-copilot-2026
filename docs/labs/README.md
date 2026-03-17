# Laboratorios del Bootcamp Arquitecto IA Cloud Native

Este documento es la gu�a operacional oficial para ejecutar todo el curso de principio a fin.

## Antes de empezar
1. Completa `00-setup-y-ruta.md` (detallado) o `00-checklist-30min.md` (express).
2. Si quieres una planificaci�n completa por escenario, revisa `00-ruta-ejecucion-dia-a-dia.md`.
3. Si quieres una version ultra resumida para ejecucion diaria, usa `00-flujo-estudiante-1-pagina.md`.
3. Trabaja por ramas (`lab-01`, `lab-02`, etc.).
4. Registra evidencias por laboratorio en `EVIDENCIAS.md`.

## Ruta oficial detallada

Nota de ruta:
- Todos los estudiantes hacen los labs comunes.
- En plataforma DevOps, puedes elegir track GitHub, track Azure DevOps o ejecutar ambos.
- El Lab 99 es obligatorio y debe integrar capacidades de los Labs 19 al 26 en una sola solucion final.

Uso recomendado de Copilot:
- Consulta `docs/prompts/00-guia-prompts-completa.md` para prompts por laboratorio.
- Usa la tabla oficial `Lab -> Prompt -> Evidencia minima` de esa guia para ejecutar cada practica sin ambiguedad.

Evaluacion docente del cierre:
- Usa `99-rubrica-evaluacion-instructor.md` para calificar el integrador final con criterios y porcentajes.

### Lab 00 - Setup y flujo
Archivo: `00-setup-y-ruta.md`
- Objetivo: dejar entorno reproducible.
- Entregable: herramientas verificadas y flujo de ramas definido.

### Lab 00B - Checklist express
Archivo: `00-checklist-30min.md`
- Objetivo: iniciar en 30 minutos con m�nimos cr�ticos.
- Entregable: entorno operativo y Lab 01 iniciado.

### Lab 01 - Copilot
Archivo: `01-copilot.md`
- Objetivo: dominar prompts para dise�o, c�digo y pruebas.
- Pasos clave:
	1. Crear prompts base por tarea.
	2. Generar un componente o endpoint con Copilot.
	3. Solicitar refactor y test sugeridos por IA.
- Salida: evidencia de productividad y calidad asistida.

### Lab 02 - Codespaces
Archivo: `02-codespaces.md`
- Objetivo: trabajar en entorno cloud reproducible.
- Pasos clave:
	1. Abrir el proyecto en Codespaces.
	2. Verificar herramientas del stack.
	3. Ejecutar proyecto base.
- Salida: entorno funcional sin dependencias locales.

### Lab 03 - .NET 10 API
Archivo: `03-dotnet10-api.md`
- Objetivo: construir API con CRUD y seguridad base.
- Pasos clave:
	1. Crear o completar endpoints de Users.
	2. Integrar EF Core con PostgreSQL.
	3. Agregar autenticaci�n JWT.
	4. Crear pruebas unitarias.
- Salida: API funcional con persistencia y auth.

### Lab 04 - FastAPI
Archivo: `04-fastapi.md`
- Objetivo: construir servicio Python equivalente o complementario.
- Pasos clave:
	1. Crear modelos y endpoints.
	2. Integrar acceso a datos.
	3. Documentar OpenAPI.
	4. Agregar pruebas b�sicas.
- Salida: servicio FastAPI ejecutable y probado.

### Lab 05 - Next 16
Archivo: `05-next16.md`
- Objetivo: crear frontend con consumo de API.
- Pasos clave:
	1. Construir vistas de listado y alta.
	2. Conectar con backend.
	3. Manejar errores y estados de carga.
- Salida: UI web funcional conectada a backend.

### Lab 06 - Angular 21
Archivo: `06-angular21.md`
- Objetivo: construir frontend alternativo y compararlo con Next.
- Pasos clave:
	1. Crear componentes y servicios.
	2. Consumir endpoints backend.
	3. Estandarizar validaciones y errores.
- Salida: SPA Angular funcional y desacoplada.

### Lab 07 - Docker y GHCR
Archivo: `07-docker-ghcr.md`
- Objetivo: contenerizar aplicaciones y publicar im�genes.
- Pasos clave:
	1. Crear o ajustar Dockerfile.
	2. Build local y pruebas en contenedor.
	3. Push de imagen a GHCR.
- Salida: imagen versionada y disponible en registry.

### Lab 08 - GitHub Actions
Archivo: `08-actions.md`
- Objetivo: automatizar build, test y publicaci�n.
- Pasos clave:
	1. Definir workflow de CI.
	2. Definir workflow de release.
	3. Configurar secrets y variables.
- Salida: pipelines verdes con trazabilidad.

### Lab 09 - Kubernetes y Helm
Archivo: `09-k8s-helm.md`
- Objetivo: desplegar la app en cluster con Helm.
- Pasos clave:
	1. Preparar values por entorno.
	2. Ejecutar helm install/upgrade.
	3. Verificar pods, svc e ingress.
- Salida: despliegue Kubernetes estable.

### Lab 10 - Argo CD
Archivo: `10-argocd.md`
- Objetivo: gestionar despliegue declarativo por GitOps.
- Pasos clave:
	1. Crear Application de Argo CD.
	2. Sincronizar repositorio.
	3. Validar estado Healthy/Synced.
- Salida: entrega declarativa controlada por Git.

### Lab 11 - OIDC
Archivo: `11-oidc.md`
- Objetivo: habilitar SSO y control de acceso.
- Pasos clave:
	1. Configurar proveedor OIDC.
	2. Integrar login en frontend.
	3. Validar JwtBearer en backend.
- Salida: autenticaci�n y autorizaci�n por roles.

### Lab 12 - Datos a escala
Archivo: `12-data-at-scale.md`
- Objetivo: Eval�ar comportamiento con mayor volumen.
- Pasos clave:
	1. Cargar dataset de prueba.
	2. Medir tiempos de endpoints cr�ticos.
	3. Aplicar mejoras (�ndices/cache).
- Salida: reporte de mejoras medibles.

### Lab 13 - EF Core migrations
Archivo: `13-efcore-migrations.md`
- Objetivo: controlar evoluci�n de esquema en .NET.
- Pasos clave:
	1. Crear primera migraci�n.
	2. Aplicar update a base.
	3. Ejecutar seed inicial.
- Salida: versionamiento de base funcional.

### Lab 14 - Alembic
Archivo: `14-alembic-fastapi.md`
- Objetivo: controlar migraciones en stack Python.
- Pasos clave:
	1. Configurar `alembic.ini` y `env.py`.
	2. Crear revisi�n.
	3. Aplicar upgrade.
- Salida: migraciones Python reproducibles.

### Lab 15 - NextAuth + OIDC
Archivo: `15-nextauth-oidc.md`
- Objetivo: consolidar login federado en frontend Next.
- Pasos clave:
	1. Configurar provider OIDC.
	2. Manejar sesi�n y claims.
	3. Proteger rutas UI.
- Salida: frontend con acceso seguro por sesi�n.

### Lab 16 - Observabilidad
Archivo: `16-observabilidad.md`
- Objetivo: habilitar monitoreo operativo.
- Pasos clave:
	1. Desplegar Prometheus y Grafana.
	2. Exponer m�tricas de aplicaci�n.
	3. Crear dashboard inicial.
- Salida: visibilidad t�cnica para operaci�n.

### Lab 17 - Reusables y environments
Archivo: `17-reusables-environments.md`
- Objetivo: estandarizar pipelines multi-entorno.
- Pasos clave:
	1. Aplicar workflows reutilizables.
	2. Definir environments dev/stage/prod.
	3. Configurar reglas de aprobaci�n.
- Salida: pipeline empresarial reutilizable.

### Lab 18 - SSO OIDC multi-proveedor
Archivo: `18-sso-oidc-entra-google-keycloak.md`
- Objetivo: implementar SSO con OIDC en Entra ID, Google y Keycloak.
- Pasos clave:
	1. Configurar cada proveedor como IdP.
	2. Integrar frontend con OIDC + PKCE.
	3. Validar backend con JwtBearer y pol�ticas por rol.
- Salida: autenticaci�n federada lista para entornos reales.

### Lab 19 - NestJS API
Archivo: `19-nestjs-api.md`
- Objetivo: construir API RESTful con NestJS, TypeORM, JWT y pruebas automatizadas.
- Pasos clave:
	1. Crear proyecto con CLI de NestJS.
	2. Generar recurso users con CRUD.
	3. Integrar TypeORM con PostgreSQL.
	4. Agregar JWT con Passport.
	5. Ejecutar pruebas unitarias y e2e.
	6. Contenerizar y publicar.
- Salida: API NestJS funcional, probada y contenerizada.

### Lab 20 - Agentes con Semantic Kernel
Archivo: `20-ai-agents-microsoft.md`
- Objetivo: construir agente con Semantic Kernel (.NET) y Azure AI Foundry.
- Pasos clave:
	1. Instalar SDK de Semantic Kernel.
	2. Definir tools/plugins del dominio.
	3. Ejecutar agente con tool calling autom�tico.
	4. Exponer como endpoint HTTP en la API .NET existente.
- Salida: agente funcional integrado en la API del proyecto.

### Lab 21 - Agentes con LangGraph
Archivo: `21-ai-agents-langgraph.md`
- Objetivo: construir agente orquestado con LangGraph y exponer como FastAPI.
- Pasos clave:
	1. Definir herramientas del sistema.
	2. Construir StateGraph con nodos y aristas condicionales.
	3. Exponer el agente como endpoint FastAPI.
- Salida: agente con grafo de estados funcional y endpoint operativo.

### Lab 22 - Mobile con React Native
Archivo: `22-mobile-reactnative.md`
- Objetivo: construir app mobile cross-platform con Expo y OIDC.
- Pasos clave:
	1. Crear proyecto Expo con TypeScript.
	2. Crear pantallas de lista y detalle.
	3. Consumir APIs del bootcamp.
	4. Integrar autenticaci�n OIDC con PKCE.
- Salida: app funcional en emulador Android conectada al backend.

### Lab 23 - Mobile Nativo Kotlin/Swift
Archivo: `23-mobile-native-kotlin-swift.md`
- Objetivo: construir app Android nativa con Jetpack Compose (iOS con SwiftUI opcional).
- Pasos clave:
	1. Crear proyecto Android Studio con Compose.
	2. Configurar Retrofit y ViewModel con StateFlow.
	3. Crear pantalla de lista y detalle con LazyColumn.
- Salida: app Android nativa con datos reales del backend.

### Lab 24 - Mensajer�a as�ncrona con Redis y Azure Queue
Archivo: `24-mensajeria-redis-azure-queue.md`
- Objetivo: implementar flujos productor/consumidor con Redis Streams y Azure Queue Storage.
- Pasos clave:
	1. Publicar tareas en Redis Streams desde API.
	2. Consumir y confirmar mensajes con worker.
	3. Implementar flujo equivalente en Azure Queue.
	4. Comparar latencia, complejidad y operaci�n.
- Salida: pipeline as�ncrono funcional con retries e idempotencia b�sica.

### Lab 25 - Event Streaming con Kafka
Archivo: `25-kafka-event-streaming.md`
- Objetivo: implementar streaming de eventos con topics, particiones y consumer groups.
- Pasos clave:
	1. Levantar Kafka local con Docker.
	2. Crear topic y publicar eventos desde API.
	3. Consumir en grupo y validar reparto por particiones.
- Salida: flujo de eventos enterprise con trazabilidad.

### Lab 26 - API Management con Azure APIM
Archivo: `26-azure-apim.md`
- Objetivo: publicar API en Azure APIM con policies de seguridad y rate limit.
- Pasos clave:
	1. Importar OpenAPI en APIM.
	2. Configurar validate-jwt con Entra ID o Keycloak.
	3. Aplicar rate limit y observabilidad.
- Salida: API gobernada con pol�ticas y monitoreo de consumo.

### Lab AZDO-01 - Azure Repos y pol�ticas
Archivo: `azdo-01-repos-policies.md`
- Objetivo: habilitar flujo de ramas y PR con governance en Azure Repos.

### Lab AZDO-02 - Azure Pipelines CI
Archivo: `azdo-02-pipelines-ci.md`
- Objetivo: implementar CI para backend y frontend en Azure Pipelines.

### Lab AZDO-03 - ACR im�genes
Archivo: `azdo-03-acr-images.md`
- Objetivo: construir y publicar im�genes en Azure Container Registry.

### Lab AZDO-04 - CD Kubernetes y approvals
Archivo: `azdo-04-cd-k8s-approvals.md`
- Objetivo: desplegar en Kubernetes con aprobaciones por ambiente.

### Lab AZDO-05 - Boards y trazabilidad
Archivo: `azdo-05-boards-traceability.md`
- Objetivo: completar trazabilidad Work Item -> PR -> Build -> Deploy.

### Lab 99 - Integrador final
Archivo: `99-proyecto-integrador.md`
- Objetivo: integrar todo el curso en una solucion E2E completa y obligatoria.
- Salida: entrega final con arquitectura, despliegue, seguridad, mensajeria, APIM, agentes IA, mobile y evidencias.

Rubrica asociada de evaluacion:
- `99-rubrica-evaluacion-instructor.md`

## Formato m�nimo de evidencia por laboratorio
- Objetivo completado
- Comandos ejecutados
- Resultado esperado y obtenido
- Problemas y soluci�n
- Capturas o logs

## Criterio de salida por laboratorio
- Build correcto
- Pruebas b�sicas correctas
- Servicio o despliegue operativo
- Evidencia versionada

## Recomendaci�n de tiempo
- Labs 00-06: 10 a 14 horas
- Labs 07-12: 10 a 14 horas
- Labs 13-18: 10 a 12 horas
- Track Azure DevOps: 8 a 12 horas
- Labs 19-23 (NestJS + AI Agents + Mobile): 10 a 14 horas
- Labs 24-26 (Mensajer�a + API Management): 8 a 12 horas
- Lab 99: 10 a 14 horas


