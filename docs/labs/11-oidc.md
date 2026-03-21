# Lab 11 - OIDC base (Keycloak inicial) + autorización por roles

## Objetivo
Implementar autenticación federada con OIDC y autorización por roles en backend, integrando el login en frontend y validando escenarios `401`, `403` y `200`.

## Prerrequisitos
- Lab 09/Lab 10 completados (app funcional frontend + backend).
- Proveedor OIDC disponible (recomendado para base: Keycloak).
- Conocer URL del proveedor y tener permisos para crear cliente/roles/usuarios.

## Paso a paso

### 1) Configurar cliente OIDC en proveedor (Keycloak inicial)
1. Crear realm: `bootcamp`.
2. Crear cliente OIDC para frontend:
	 - `Client ID`: `bootcamp-web`
	 - Tipo: `Public`
	 - Redirect URI: `http://localhost:4200/*`
	 - Post logout redirect URI: `http://localhost:4200/*`
3. Configurar API audience/backend:
	 - `Audience` esperada: `bootcamp-api`.
4. Definir roles de ejemplo:
	 - `admin`
	 - `reader`
5. Crear usuarios de prueba y asignar roles:
	 - `alice-admin` -> `admin`
	 - `bob-reader` -> `reader`

### 2) Integrar login OIDC en frontend (Angular)
Se implementó en plantilla `templates/angular21-app`:
- Servicio OIDC: `src/app/core/services/oidc-auth.service.ts`
- Interceptor bearer: `src/app/core/http/auth-token.interceptor.ts`
- Registro de OAuth client/interceptors: `src/app/app.config.ts`
- Configuración de proveedor: `src/environments/environment.ts`
- Flujo UI en una sola página (login y luego formulario/listado):
	- `src/app/features/users/users-dashboard.component.html`
	- `src/app/features/users/users-dashboard.component.ts`
	- `src/app/features/users/users.store.ts`

Resultado funcional esperado en frontend:
- Usuario entra a la página.
- Ve botón de login OIDC.
- Al autenticarse y volver del proveedor, se habilita alta de usuario y listado paginado.

### 3) Configurar JwtBearer en backend
Se implementó en `templates/dotnet10-api/src/Program.cs`:
- Esquema dinámico de autenticación:
	- `LocalJwt` (token local de `/api/auth/login`)
	- `OidcJwt` (token federado del proveedor)
- Selector automático por `issuer` (`DynamicJwt`).
- Validación OIDC por `Authority` y `Audience`.
- Mapeo de claims de rol desde:
	- `roles`
	- `role`
	- `realm_access.roles` (Keycloak)

Configuración en `appsettings*.json`:
- `Oidc:Authority`
- `Oidc:Audience`
- `Oidc:ClientId`
- `Oidc:RequireHttpsMetadata`

### 4) Definir roles y políticas de autorización
Políticas implementadas:
- `CanReadUsers`: roles `admin` o `reader`
- `CanManageUsers`: solo `admin`

Aplicación de políticas:
- `UsersController` protegido por `CanReadUsers`.
- `PUT/DELETE` y endpoint `GET /api/users/admin/ping` protegidos por `CanManageUsers`.
- `POST /api/auth/register` protegido por `CanManageUsers`.

### 5) Pruebas de escenarios 401, 403 y 200

#### 5.1 Escenario 401 (sin token)
```bash
curl -i http://127.0.0.1:5000/api/users
```
Esperado: `401 Unauthorized`.

#### 5.2 Escenario 403 (token válido con rol insuficiente)
Autentica con usuario `reader` en frontend OIDC (o usa token reader) y prueba endpoint admin:
```bash
curl -i http://127.0.0.1:5000/api/users/admin/ping \
	-H "Authorization: Bearer <TOKEN_READER>"
```
Esperado: `403 Forbidden`.

#### 5.3 Escenario 200 (token válido con rol autorizado)
Con token `admin`:
```bash
curl -i http://127.0.0.1:5000/api/users/admin/ping \
	-H "Authorization: Bearer <TOKEN_ADMIN>"
```
Esperado: `200 OK`.

También para lectura con `reader` o `admin`:
```bash
curl -i http://127.0.0.1:5000/api/users \
	-H "Authorization: Bearer <TOKEN_READER_O_ADMIN>"
```
Esperado: `200 OK`.

## Validación
- Login federado OIDC funcionando.
- Redirección al flujo en la misma página (login -> alta/listado).
- Backend valida JWT federado.
- Políticas por rol aplicadas correctamente (`401`/`403`/`200`).

## Continuación recomendada
Para escenario empresarial multi-proveedor, continuar con:
- `docs/labs/15-nextauth-oidc.md`
- `docs/labs/18-sso-oidc-entra-google-keycloak.md`

## Rúbrica
- 40% autenticación OIDC.
- 40% autorización por roles y políticas.
- 20% evidencia de pruebas `401`, `403`, `200`.

## Entregables
- Evidencia de configuración del cliente OIDC.
- Capturas del flujo frontend autenticado.
- Evidencia de respuestas `401`, `403`, `200` en API.

