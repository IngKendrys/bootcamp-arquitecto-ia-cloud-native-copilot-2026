# Módulo 22 - API Management (Azure API Management y Kong + Konga)

## Objetivo
Diseñar y operar una capa de gestión de APIs para exponer servicios de forma segura,
versionada, observable y gobernada.

## Resultado esperado
- Comprender el rol de API Gateway/API Management en arquitectura moderna.
- Implementar controles de seguridad, throttling y versionado.
- Evaluar Azure API Management vs Kong/Konga según contexto.

## Problema que resuelve API Management
Exponer APIs directamente desde cada microservicio escala mal en seguridad, monitoreo,
control de tráfico y gobernanza. Un API Manager centraliza estas capacidades.

## Capacidades clave
- Autenticación y autorización centralizadas.
- Rate limit y quotas por consumidor.
- Policies de transformación (headers, payload, CORS).
- Versionado y deprecación controlada.
- Analytics y trazabilidad.
- Portal para consumidores (según plataforma).

## Comparativa práctica

| Criterio | Azure API Management | Kong Gateway + Konga |
|---|---|---|
| Modelo | PaaS administrado | Self-hosted / híbrido |
| Integración Azure | Nativa | Requiere configuración |
| Time-to-market | Muy rápido | Medio |
| Control de infraestructura | Menor | Alto |
| Costo operativo | Menor operación, mayor costo servicio | Mayor operación, costo flexible |
| Escenario ideal | Organizaciones Azure-first | Equipos multi-cloud/K8s con control total |

## Patrones de diseño

### API Gateway pattern
Un punto de entrada único para clientes web/mobile/partners.

### Backend For Frontend (BFF)
Un gateway especializado por tipo de cliente para contratos optimizados.

### Zero Trust en APIs
Toda solicitud debe autenticar/autorización explícita, incluso en red interna.

## Buenas prácticas obligatorias
- Publicar versiones (`/v1`, `/v2`) con estrategia de retiro.
- Definir SLA y límites de consumo por API product.
- Aplicar políticas de seguridad homogéneas (JWT validate, CORS, headers).
- Nunca exponer APIs internas sin gateway.
- Trazar cada request con `x-correlation-id`.

## Integración con identidad
- Entra ID y Keycloak como proveedores OIDC/OAuth2 para proteger APIs.
- Validación de token en gateway y en backend (defensa en profundidad).

## Relación con el bootcamp
- APIM protege APIs .NET/FastAPI/NestJS expuestas a frontend y partners.
- Kong puede operar dentro de Kubernetes junto a Helm/Argo CD.
- OIDC del curso se reutiliza para seguridad en gateway.

## Labs asociados
- `docs/labs/26-azure-apim.md`
- `docs/labs/09-k8s-helm.md` (sección opcional Kong + Konga)
