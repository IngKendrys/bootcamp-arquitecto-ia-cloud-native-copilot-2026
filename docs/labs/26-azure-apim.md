# Lab 26 - API Management con Azure API Management

## Objetivo
Publicar una API existente (.NET/FastAPI/NestJS) en Azure API Management, aplicando
seguridad OAuth2/OIDC, rate limit y trazabilidad.

## Resultado esperado
- API expuesta a través de APIM con policies activas.
- Seguridad integrada con Entra ID o Keycloak.
- Control de consumo por rate limit o subscription key.

## Prerrequisitos
- API desplegada y accesible (AKS, App Service o endpoint público).
- Suscripción de Azure con recurso API Management.
- Lab 11 y 18 completados (OIDC).

## Paso a paso

### 1. Crear instancia APIM (si no existe)
```bash
az apim create \
  --name <apim-name> \
  --resource-group <rg-name> \
  --publisher-email admin@contoso.com \
  --publisher-name Contoso \
  --sku-name Developer
```

### 2. Importar API
Opciones:
- Desde OpenAPI (`swagger.json`).
- Desde App Service o Function.

```bash
az apim api import \
  --resource-group <rg-name> \
  --service-name <apim-name> \
  --path app-api \
  --api-id app-api \
  --specification-format OpenApi \
  --specification-path ./openapi.json
```

### 3. Aplicar policy de rate limit
Ejemplo policy XML:
```xml
<policies>
  <inbound>
    <base />
    <rate-limit calls="30" renewal-period="60" />
  </inbound>
  <backend><base /></backend>
  <outbound><base /></outbound>
  <on-error><base /></on-error>
</policies>
```

### 4. Configurar seguridad
- Opción A: `validate-jwt` contra Entra ID.
- Opción B: `validate-jwt` contra Keycloak.
- Mantener validación en backend también (defensa en profundidad).

### 5. Exponer producto y suscripciones
- Crear Product.
- Asociar API.
- Habilitar `subscription required` según escenario.

### 6. Trazabilidad
- Habilitar logs de APIM a Log Analytics.
- Propagar `x-correlation-id` al backend.

## Validación
- Llamadas válidas con token devuelven 200.
- Sin token o token inválido devuelven 401.
- Superar límite de rate produce 429.
- APIM registra métricas y logs de consumo.

## R�brica
- 40% publicación correcta de API y seguridad.
- 30% policies (rate limit + validación JWT) funcionando.
- 30% evidencia de observabilidad y pruebas 200/401/429.

## Entregables
- Rama `lab-26`.
- EVIDENCIAS.md con:
  - captura de API publicada en APIM,
  - pruebas 200/401/429,
  - captura de métricas/logs.
