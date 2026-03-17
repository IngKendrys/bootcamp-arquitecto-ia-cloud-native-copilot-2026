# Módulo 20 - Arquitectura de Sistemas Cloud Native

## Propósito de este módulo
A lo largo del bootcamp construiste piezas concretas: APIs, frontends, pipelines, agentes y apps mobile.
Este módulo te da el marco para unirlo todo con criterio profesional: cómo se toman las decisiones de
arquitectura, cómo se documentan y cómo se evalúan frente a requisitos reales.

Es lectura previa obligatoria al **Lab 99 - Proyecto Integrador**.

---

## 1. Del código al sistema: pensamiento arquitectónico

Un arquitecto no solo elige tecnologías — toma decisiones bajo restricciones y las documenta para que otros
las entiendan y cuestionen en el futuro.

Las restricciones más comunes son:
- Equipo y habilidades disponibles.
- Costo de infraestructura y operación.
- Requisitos de disponibilidad y latencia.
- Velocidad de entrega vs. deuda técnica aceptable.
- Regulaciones de seguridad y privacidad de datos.

> **Principio clave**: la arquitectura correcta es la más simple que cumple los requisitos actuales y puede
> evolucionar hacia los previsibles. No la más sofisticada.

---

## 2. Estilos arquitectónicos y cuándo aplican

### Monolito modular
- Todo en un proceso, organizado en módulos bien delimitados.
- Adecuado para: equipos pequeños, dominio en exploración, early startup.
- Riesgo: acoplamiento silencioso entre módulos si no se mantiene disciplina.
- Ejemplo en el bootcamp: la API .NET 10 con módulos `Users`, `Auth`, `Orders`.

### Microservicios
- Servicios pequeños, independientemente desplegables, con base de datos propia.
- Adecuado para: equipos autónomos por dominio, requisitos de escala diferenciada por servicio.
- Costo: complejidad operativa, trazabilidad distribuida, eventual consistency.
- Ejemplo en el bootcamp: .NET + FastAPI + NestJS como servicios separados.

### Arquitectura basada en eventos (EDA)
- Servicios se comunican a través de eventos (Kafka, RabbitMQ, Azure Service Bus).
- Adecuado cuando el acoplamiento temporal entre servicios es un problema.
- El bootcamp no cubre EDA en profundidad, pero los agentes de IA son un caso de uso natural.

### Cuándo NO usar microservicios
| Condición | Señal |
|---|---|
| Equipo menor a 5 personas | Overhead supera el beneficio |
| Dominio no estabilizado | Los límites cambiarán y dividir es prematuro |
| Sin observabilidad madura | No sabrás qué falla en producción |
| Sin CI/CD automatizado | Desplegar 8 servicios a mano es inviable |

---

## 3. Decisiones de diseño del stack del bootcamp

### ¿Qué servicio para qué caso?

| Caso de uso | Tecnología recomendada | Razón |
|---|---|---|
| API corporativa con EF Core + migraciones | .NET 10 | Ecosistema maduro, tipado fuerte, EF Core |
| Servicio de análisis de datos o ML | FastAPI (Python) | Ecosistema científico, librerias de IA |
| API de producto con TypeScript full-stack | NestJS | Mismo lenguaje que frontend, DI nativa |
| Agente de IA con tools sobre .NET | Semantic Kernel | Integración nativa con el ecosistema .NET |
| Agente de IA con grafo de estados complejo | LangGraph | Control explícito del flujo, multi-modelo |
| App mobile que comparte lógica con web | React Native + Expo | Reutilización con React ecosystem |
| App Android con máximo rendimiento nativo | Kotlin + Jetpack Compose | Acceso nativo, UI declarativa moderna |

### BFF (Backend For Frontend)
Cuando Next.js o Angular consumen APIs distintas según el contexto (móvil vs web, autenticado vs anónimo),
puede convenir un BFF que:
- Agrega llamadas a múltiples servicios en una sola respuesta.
- Adapta el contrato a lo que el frontend necesita exactamente.
- Gestiona el token OIDC sin exponerlo al cliente.

El NestJS del bootcamp puede servir como BFF para el frontend Angular.

---

## 4. Patrones de resiliencia

Los sistemas distribuidos fallan. La pregunta no es si fallarán sino cuándo.

### Circuit Breaker
Evita llamadas en cascada a un servicio degradado.
```
Estado: Cerrado → (umbral de errores) → Abierto → (tiempo de espera) → Semi-abierto → Cerrado
```
En .NET: `Microsoft.Extensions.Http.Resilience` (Polly v8 integrado en .NET 8+).

### Retry con backoff exponencial
```csharp
services.AddHttpClient("ExternalApi")
    .AddStandardResilienceHandler(); // Polly: retry + circuit breaker + timeout
```

### Timeout
Todo cliente HTTP debe tener timeout explícito. Sin timeout, un servicio lento bloquea threads
indefinidamente.

### Bulkhead
Aislar recursos (threads, conexiones) por tipo de operación para que un servicio lento no
afecte a los demás.

---

## 5. Comunicación entre servicios

### Sincrónica (REST / gRPC)
- REST: universal, observable, fácil de probar. Usar cuando latencia < 200ms es aceptable.
- gRPC: binario, tipado con Protobuf, eficiente. Usar para comunicación interna de alto volumen.

### Asincrónica (mensajería)
- Desacopla productores y consumidores en tiempo.
- Permite reintentos naturales y procesamiento en lotes.
- Costo: eventual consistency, más difícil de depurar.

### Seguridad interna (service-to-service)
- En Kubernetes: mTLS con service mesh (Istio, Linkerd) o validación de JWT entre servicios.
- En el bootcamp: el backend valida el JWT emitido por Keycloak/Entra en cada solicitud,
  independientemente de si viene del frontend o de otro servicio.

---

## 6. Diagrama de referencia del sistema del bootcamp

```
                        ┌─────────────────────────────────────────┐
                        │            Usuarios                      │
                        └───────────┬─────────────┬───────────────┘
                                    │             │
                              Web (Next/Angular)  Mobile (RN / Kotlin)
                                    │             │
                        ┌───────────▼─────────────▼───────────────┐
                        │     OIDC (Keycloak / Entra ID)           │
                        │     Emite JWT con roles y claims          │
                        └───────────────────┬─────────────────────┘
                                            │ JWT validado por cada servicio
                ┌───────────────────────────┼────────────────────────────┐
                │                           │                            │
        ┌───────▼──────┐          ┌─────────▼──────┐          ┌─────────▼──────┐
        │   .NET 10 API │          │  FastAPI (Py)  │          │  NestJS 11     │
        │  (EF Core +  │          │  (ML / datos)  │          │  (BFF / TS)    │
        │   PostgreSQL)│          │                │          │                │
        └───────┬──────┘          └────────┬───────┘          └────────┬───────┘
                │                          │                           │
                └──────────────────────────┼───────────────────────────┘
                                           │
                              ┌────────────▼───────────┐
                              │  PostgreSQL  │  Redis   │
                              │  (primario)  │  (cache) │
                              └────────────────────────┘
                                           │
                              ┌────────────▼───────────┐
                              │  Semantic Kernel Agent  │
                              │  (tool calling sobre    │
                              │  datos reales del sys)  │
                              └────────────────────────┘

Infraestructura transversal:
  Kubernetes 1.35 + Helm    — orquestación y despliegue declarativo
  Argo CD                   — GitOps, estado deseado en Git
  GitHub Actions / AzDO     — CI/CD, build, test, push, deploy
  Prometheus + Grafana      — métricas, alertas y dashboards
```

---

## 7. ADR — Architecture Decision Records

Un ADR documenta una decisión arquitectónica importante: qué se decidió, por qué y cuáles
alternativas se descartaron. Es el artefacto más valioso de la documentación técnica porque
captura el razonamiento, no solo el resultado.

### Estructura mínima de un ADR
```markdown
# ADR-001: [Título corto de la decisión]

## Estado
Aceptado / Propuesto / Obsoleto

## Contexto
¿Qué situación o problema motivó esta decisión?

## Decisión
¿Qué se decidió hacer?

## Alternativas consideradas
- Opción A: [descripción] — descartada porque [razón]
- Opción B: [descripción] — descartada porque [razón]

## Consecuencias
¿Qué facilita esta decisión? ¿Qué restringe o complica?
```

### Ejemplo aplicado al bootcamp
```markdown
# ADR-001: NestJS como servicio BFF para Angular

## Estado
Aceptado

## Contexto
Angular y la app mobile necesitan un contrato API adaptado a sus pantallas,
distinto al contrato general de la API .NET.

## Decisión
NestJS actúa como BFF: agrega respuestas de .NET y FastAPI, adapta el contrato
y gestiona el token OIDC sin exponerlo al cliente.

## Alternativas consideradas
- Consumo directo desde Angular a .NET: descartado por acoplamiento de contrato.
- GraphQL federation: descartado por complejidad excesiva para el equipo actual.

## Consecuencias
+ Frontend desacoplado del contrato interno de servicios.
+ Un punto de gestión de auth para clientes web y mobile.
- NestJS se convierte en un posible punto de fallo único para los frontends.
```

---

## 8. Checklist de arquitectura antes de ir a producción

Usa esta lista al revisar el proyecto integrador:

### Disponibilidad y resiliencia
- [ ] Todos los servicios tienen `readinessProbe` y `livenessProbe` en Kubernetes.
- [ ] Los clientes HTTP tienen timeout y retry con circuit breaker.
- [ ] Hay al menos 2 réplicas por servicio crítico.

### Seguridad
- [ ] JWT validado en cada servicio, no solo en el API Gateway.
- [ ] Secretos en Kubernetes Secrets o Vault, no en variables de entorno en el código.
- [ ] Sin credenciales en repositorio (verificar con `git log -S password`).
- [ ] HTTPS en todos los endpoints públicos.

### Observabilidad
- [ ] Logs estructurados (JSON) en todos los servicios.
- [ ] Métricas expuestas en `/metrics` y recogidas por Prometheus.
- [ ] Trazabilidad distribuida habilitada (correlation ID en headers HTTP).
- [ ] Dashboard básico en Grafana operativo.

### Datos
- [ ] Migraciones versionadas y reproducibles (EF Core / Alembic).
- [ ] Backups configurados para PostgreSQL.
- [ ] Índices en columnas de búsqueda frecuente.

### Entrega
- [ ] Pipeline CI falla el build si fallan los tests.
- [ ] Despliegue en Kubernetes controlado por Argo CD (GitOps).
- [ ] Al menos un environment de staging antes de producción.

---

## Lectura siguiente obligatoria
- `docs/labs/99-proyecto-integrador.md` — aplica estos principios en la entrega final.
