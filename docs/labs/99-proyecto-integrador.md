# Lab 99 - Proyecto Integrador E2E Obligatorio: Enrollment Hub 360

## Estado del integrador en esta version del bootcamp
Este laboratorio es obligatorio para todos los equipos.

El entregable final debe integrar en un mismo sistema:
1. Core transaccional
2. Canales web y mobile
3. Seguridad federada
4. Mensajeria asincrona y event streaming
5. Agentes de IA conectados a datos reales
6. API Management
7. CI/CD, Kubernetes, GitOps y observabilidad

No se acepta un integrador parcial.

## Caso de uso oficial
Enrollment Hub 360 es una plataforma academica para:
1. Registro de estudiantes
2. Inscripcion a cursos
3. Confirmacion y seguimiento de estado
4. Notificaciones y procesos diferidos
5. Reporteria operacional asistida por agentes de IA

## Arquitectura objetivo obligatoria
1. Backend principal: .NET 10 API (dominio transaccional)
2. Backend complementario: FastAPI (servicios auxiliares y agente LangGraph)
3. Frontend web: Next 16/React 19 o Angular 21
4. Mobile cross-platform: React Native + Expo
5. Mobile nativo: Android Kotlin + Jetpack Compose (iOS SwiftUI opcional)
6. Datos: PostgreSQL como fuente principal
7. Cache y mensajes ligeros: Redis
8. Cola administrada: Azure Queue Storage
9. Event streaming: Apache Kafka
10. Seguridad: OIDC + JWT + roles
11. API Gateway/Management: Azure APIM (Kong opcional comparativo)
12. Entrega y runtime: Docker + GHCR/ACR + Kubernetes + Helm + Argo CD
13. Observabilidad: Prometheus + Grafana

## Requisitos funcionales minimos
1. Un estudiante se autentica por OIDC y crea/consulta su perfil.
2. El estudiante se inscribe en un curso desde web o mobile.
3. El backend valida reglas de negocio y persiste en PostgreSQL.
4. La inscripcion emite eventos de dominio.
5. Un consumidor procesa evento para notificaciones/procesos diferidos.
6. APIM publica endpoints con politicas de seguridad y cuota.
7. Agentes IA responden consultas con datos reales del sistema.

## Requisitos no funcionales minimos
1. CI/CD verde en cada servicio del integrador.
2. Despliegue reproducible con Helm y sincronizacion GitOps.
3. Endpoints protegidos con 401/403 correctos.
4. Dashboard operativo con latencia, errores y throughput.
5. Evidencia de idempotencia y retry en flujo asincrono.

## Fases de implementacion obligatorias

### Fase 1 - Diseno de arquitectura y contratos
1. Definir contexto, limites y componentes del sistema.
2. Definir contratos API y contratos de eventos.
3. Definir ADR minimos:
   - estilo arquitectonico
   - estrategia de autenticacion
   - estrategia de mensajeria
   - estrategia de despliegue

Validacion:
- Diagrama de arquitectura versionado
- ADR publicados y trazables
- OpenAPI inicial para servicios HTTP

### Fase 2 - Core transaccional .NET
1. Implementar Users, Courses, Enrollments y reglas de negocio.
2. Integrar EF Core + migraciones.
3. Implementar JwtBearer y politicas por rol.
4. Agregar pruebas unitarias e integracion.

Validacion:
- CRUD y reglas de negocio funcionando
- Migraciones aplicadas sin error
- Suite de pruebas backend en verde

### Fase 3 - Servicios Python y agente LangGraph
1. Implementar servicio FastAPI complementario.
2. Integrar agente LangGraph con herramientas reales.
3. Exponer endpoint de consulta de agente.

Validacion:
- Endpoint FastAPI operativo
- Agente ejecuta tool calling sobre datos reales

### Fase 4 - Canales web y mobile
1. Implementar flujo de inscripcion en web (Next o Angular).
2. Implementar flujo equivalente en React Native.
3. Implementar Android nativo con lista y detalle conectados al backend.

Validacion:
- Inscripcion funcional en web y mobile
- Manejo de errores y estados de carga
- Evidencia en emulador/dispositivo

### Fase 5 - Seguridad federada y SSO
1. Configurar OIDC (Keycloak o Entra).
2. Integrar login en web y mobile (PKCE cuando aplique).
3. Proteger endpoints por rol.

Validacion:
- Login exitoso en web y mobile
- Control de autorizacion por roles validado

### Fase 6 - Mensajeria y streaming
1. Publicar eventos de negocio desde backend.
2. Integrar Redis Streams para procesamiento ligero.
3. Integrar Azure Queue para tareas diferidas.
4. Integrar Kafka para eventos de auditoria/analitica.

Validacion:
- Flujo productor/consumidor funcionando
- Retry e idempotencia demostrables

### Fase 7 - Agentes de IA
1. Integrar agente Semantic Kernel en API .NET.
2. Integrar agente LangGraph en FastAPI.
3. Definir guardrails minimos de seguridad para prompts/tools.

Validacion:
- Ambos agentes responden con datos reales
- Logs muestran herramientas invocadas

### Fase 8 - API Management
1. Publicar APIs en Azure APIM.
2. Definir politicas: auth, cuota/rate limit, transformacion basica.
3. Versionar APIs.

Validacion:
- Consumo por APIM exitoso
- Politicas aplicadas y verificadas

### Fase 9 - CI/CD, Kubernetes y GitOps
1. Pipelines de build/test/lint/image/deploy.
2. Helm values por ambiente.
3. Argo CD Synced/Healthy.

Validacion:
- Deploy reproducible
- Workflows/pipelines verdes

### Fase 10 - Datos a escala y observabilidad
1. Cargar dataset y medir baseline.
2. Aplicar optimizaciones (indices/cache).
3. Exponer metricas y dashboards.

Validacion:
- Mejora cuantificable antes/despues
- Dashboard con metricas reales

## Entregables obligatorios finales
1. Codigo fuente integrado y versionado
2. README-PROYECTO.md con arquitectura final
3. ADRs minimos del sistema
4. EVIDENCIAS-INTEGRADOR.md con validaciones fase por fase
5. Evidencia de pipelines/workflows exitosos
6. Evidencia de deploy K8s y estado Argo CD
7. Evidencia de OIDC/SSO, APIM y mensajeria
8. Evidencia de agentes IA con tool calling real
9. Dashboard de observabilidad con capturas y metricas

## Checklist de validacion final (Definition of Done)
- [ ] Caso de uso completo ejecutable de extremo a extremo
- [ ] Web, React Native y Android consumen APIs reales
- [ ] .NET y FastAPI desplegados y saludables
- [ ] Seguridad OIDC/SSO y roles funcionando
- [ ] Redis, Azure Queue y Kafka en operacion
- [ ] APIM enrutando APIs con politicas activas
- [ ] Agente SK y agente LangGraph operativos
- [ ] CI/CD, Helm y Argo CD en estado verde
- [ ] Observabilidad con metricas y dashboard
- [ ] Evidencias completas, trazables y reproducibles

## Criterio de aprobacion
El integrador se aprueba solo si el sistema completo funciona de punta a punta.
Si una capacidad obligatoria falta, el cierre queda pendiente hasta completar el alcance.

## Evaluacion docente
La evaluacion formal del cierre se realiza con:
- `99-rubrica-evaluacion-instructor.md`

Uso recomendado:
1. Autoevaluacion del equipo antes de la demo final.
2. Evaluacion de instructor durante la presentacion.
3. Plan de cierre para gaps detectados.


