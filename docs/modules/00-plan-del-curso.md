
# Plan Maestro del Curso

## Perfil de salida
Al finalizar, podrás diseñar, construir, asegurar y operar una solución cloud moderna con apoyo de Copilot y una cadena completa de entrega continua.

Perfil de salida esperado (versión 2026):
1. Sistema E2E productivo con web, mobile, APIs, mensajería, seguridad y observabilidad.
2. Integrador único obligatorio con capacidades completas (no parcial).
3. Uso intensivo de GitHub Copilot durante diseño, implementación, pruebas y operación.

## Duración sugerida
- Ruta intensiva: 5 a 7 días
- Ruta estándar: 3 semanas (6 a 9 horas por semana)
- Ruta extendida: 6 semanas (4 a 6 horas por semana)

## Prerrequisitos
- Git y GitHub básicos
- Docker básico
- Programación intermedia (C#, Python o TypeScript)
- Conocimientos introductorios de APIs HTTP

## Competencias del curso
- Productividad con IA: prompting técnico, refactor guiado, generación de tests
- Backend moderno: APIs en .NET y FastAPI con persistencia
- Frontend moderno: Next/React y Angular
- Plataforma cloud native: contenedores, Kubernetes, Helm y GitOps
- Seguridad y acceso: OIDC, JWT, roles y secretos
- Operación: observabilidad y diagnóstico inicial
- Integración enterprise: mensajería asíncrona, event streaming y API Management
- IA aplicada: agentes con Semantic Kernel y LangGraph sobre datos reales
- Experiencia omnicanal: web + React Native + mobile nativo

## Ruta pedagógica oficial

### Bloque 1. Fundamentos y productividad con IA
1. Módulo Copilot
2. Módulo GitHub.com
3. Módulo Codespaces y Dev Containers

Resultado:
- Entorno reproducible y flujo de trabajo asistido por IA
- Flujo de colaboración y revisión
- Prompts base por tarea

### Bloque 2. Backend (todas las tecnologías de API juntas)
4. Módulo .NET 10
5. Módulo FastAPI
6. Módulo NestJS 11 + Node.js 24 LTS

Resultado:
- Tres stacks backend operativos (.NET, Python y TypeScript)
- Diseño de APIs, persistencia y capas de aplicación
- Pruebas mínimas por servicio

### Bloque 3. Frontend y Mobile (todas las tecnologías de cliente juntas)
7. Módulo Next 16 + React 19
8. Módulo Angular 21
9. Módulo Mobile (React Native + Kotlin/Jetpack Compose + Swift/SwiftUI)

Resultado:
- Frontends web de referencia en React y Angular
- Apps mobile cross-platform y nativas conectadas a APIs
- Experiencia omnicanal consistente

### Bloque 4. Plataforma cloud native y entrega continua
10. Módulo Docker 29 + GHCR
11. Módulo GitHub Actions + Environments
12. Módulo Kubernetes 1.35 + Helm
13. Módulo GitOps con Argo CD
14. Módulo Track Azure DevOps (Repos, Pipelines, Boards y ACR)

Resultado:
- Imágenes versionadas
- Pipelines de CI/CD en GitHub o Azure DevOps
- Deploy declarativo y repetible

### Bloque 5. Seguridad, identidad, datos y operación
15. Módulo OIDC (Keycloak/Entra)
16. Módulo Data at Scale
17. Módulo Identidad federada y SSO OIDC (Entra/Google/Keycloak)
18. Módulo Observabilidad y operación

Resultado:
- SSO operativo y multi-proveedor con políticas consistentes
- Prácticas de persistencia y rendimiento
- Métricas, logs y paneles base

### Bloque 6. IA aplicada con agentes
19. Módulo Agentes de IA (Semantic Kernel + LangGraph)

Resultado:
- Diseño e implementación de agentes sobre datos reales
- Tool calling real sobre APIs y servicios del sistema
- Integración de agentes en flujos productivos del integrador

### Bloque 7. Arquitectura e integración enterprise
20. Módulo Arquitectura de Sistemas Cloud Native
21. Módulo Mensajería asíncrona (Redis, Azure Queue Storage y Kafka)
22. Módulo API Management (Azure API Management y Kong + Konga)

Resultado:
- Criterios arquitectónicos y ADR del proyecto
- Integraciones desacopladas por eventos y colas
- Gobernanza de APIs con seguridad, políticas y observabilidad

### Bloque 8. Proyecto integrador obligatorio
23. Implementación E2E y evidencia técnica final

Resultado:
- Solución completa backend + frontend + mobile + datos + CI/CD + K8s + OIDC + observabilidad + mensajería + APIM + agentes IA

Nota de diseño curricular:
Estos módulos no deben tratarse como exploración opcional.
Sus capacidades deben incorporarse al integrador final obligatorio del Lab 99.

## Laboratorios y secuencia obligatoria

Regla general de precedencia:
1. Fase base y avanzada son prerrequisito técnico del integrador.
2. Labs 19 al 26 aportan capacidades que deben converger en el Lab 99.
3. Track GitHub o Azure DevOps puede variar por equipo, pero debe existir al menos un flujo CI/CD completo operativo.

Mapa por dominio (para visualizar el orden por tecnología):
1. Backend: 03 (.NET 10), 04 (FastAPI), 19 (NestJS).
2. Frontend y mobile: 05 (Next), 06 (Angular), 22 (React Native), 23 (Kotlin/Swift).
3. Agentes de IA: 20 (Microsoft/Semantic Kernel), 21 (LangGraph).
4. Plataforma y operación: 07, 08, 09, 10, 11, 16, 17, 18.
5. Integración enterprise: 24 (mensajería), 25 (event streaming), 26 (APIM).

### Fase base
1. `docs/labs/01-copilot.md`
2. `docs/labs/02-codespaces.md`
3. `docs/labs/03-dotnet10-api.md`
4. `docs/labs/04-fastapi.md`
5. `docs/labs/05-next16.md`
6. `docs/labs/06-angular21.md`
7. `docs/labs/07-docker-ghcr.md`
8. `docs/labs/08-actions.md`
9. `docs/labs/09-k8s-helm.md`
10. `docs/labs/10-argocd.md`
11. `docs/labs/11-oidc.md`
12. `docs/labs/12-data-at-scale.md`

### Fase avanzada
13. `docs/labs/13-efcore-migrations.md`
14. `docs/labs/14-alembic-fastapi.md`
15. `docs/labs/15-nextauth-oidc.md`
16. `docs/labs/16-observabilidad.md`
17. `docs/labs/17-reusables-environments.md`
18. `docs/labs/18-sso-oidc-entra-google-keycloak.md`

### Fase Bloque 6 - Nuevas tecnologías
19. `docs/labs/19-nestjs-api.md`
20. `docs/labs/20-ai-agents-microsoft.md`
21. `docs/labs/21-ai-agents-langgraph.md`
22. `docs/labs/22-mobile-reactnative.md`
23. `docs/labs/23-mobile-native-kotlin-swift.md`

### Fase Bloque 8 - Integración enterprise
24. `docs/labs/24-mensajeria-redis-azure-queue.md`
25. `docs/labs/25-kafka-event-streaming.md`
26. `docs/labs/26-azure-apim.md`

### Track Azure DevOps
19. `docs/labs/azdo-01-repos-policies.md`
20. `docs/labs/azdo-02-pipelines-ci.md`
21. `docs/labs/azdo-03-acr-images.md`
22. `docs/labs/azdo-04-cd-k8s-approvals.md`
23. `docs/labs/azdo-05-boards-traceability.md`

### Cierre
27. `docs/labs/99-proyecto-integrador.md`

Alcance obligatorio del cierre:
1. Core .NET + servicio FastAPI
2. Frontend web + React Native + Android nativo
3. OIDC/SSO con roles
4. Redis + Azure Queue + Kafka
5. Semantic Kernel + LangGraph
6. APIM
7. CI/CD + Kubernetes + Helm + Argo CD
8. Observabilidad y evidencia técnica completa

## Criterios de aprobación sugeridos
- Cada laboratorio con evidencia de ejecución
- Proyecto final funcional y desplegable con capacidades completas del programa
- Documento de arquitectura con decisiones técnicas
- Checklist de seguridad y operación mínima

## Evidencias mínimas por estudiante o equipo
- Capturas de pipelines exitosos
- Capturas de despliegue en Kubernetes
- Registro de pruebas ejecutadas
- Evidencia de login OIDC y autorización por roles
- Dashboard básico de observabilidad
- Evidencia de integración mobile (React Native y Android)
- Evidencia de mensajería (Redis/Azure Queue/Kafka)
- Evidencia de APIM con políticas activas
- Evidencia de agentes IA en operación con datos reales

## Uso obligatorio de GitHub Copilot en todo el recorrido
Copilot se usa de inicio a fin para:
1. Análisis de requerimientos y arquitectura
2. Generación de código y refactor
3. Pruebas, seguridad y hardening
4. Infraestructura (Docker, CI/CD, Helm, K8s)
5. Documentación y evidencias del integrador

La recomendación oficial es mantener prompts versionados en `docs/prompts` y usarlos como plantillas por laboratorio.


