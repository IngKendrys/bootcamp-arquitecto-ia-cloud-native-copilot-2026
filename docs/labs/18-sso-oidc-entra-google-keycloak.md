# Lab 18 - SSO con OIDC en Entra ID, Google y Keycloak

## Objetivo
Implementar SSO y autorización por roles en una misma aplicación, habilitando tres proveedores OIDC:
- Microsoft Entra ID
- Google Cloud Identity / Google Workspace
- Keycloak

## Resultado esperado
- Login funcional con cada proveedor
- Backend validando tokens correctamente
- Endpoint protegido por rol/política
- Evidencia de pruebas 401, 403 y 200

## Arquitectura de referencia
- Frontend: NextAuth (o cliente OIDC equivalente)
- Backend: .NET JwtBearer (o middleware equivalente)
- IdP: Entra ID, Google, Keycloak

## Prerrequisitos
- Labs 11 y 15 completados.
- Frontend y backend operativos.
- HTTPS local o URLs públicas controladas para callbacks.

## Variables de configuración recomendadas
Define configuración por proveedor:
- `OIDC_PROVIDER`
- `OIDC_AUTHORITY`
- `OIDC_CLIENT_ID`
- `OIDC_CLIENT_SECRET` (solo backend o servidor seguro)
- `OIDC_AUDIENCE`
- `OIDC_SCOPES`

## Track A - Microsoft Entra ID (Azure)

### A1. Configuración en Azure
1. Entra a Azure Portal.
2. Ve a Microsoft Entra ID.
3. App registrations -> New registration.
4. Configura redirect URI de web app (frontend).
5. Registra logout URI.

### A2. Configurar permisos y scopes
1. API permissions -> agrega OpenID Connect (`openid`, `profile`, `email`).
2. Si el backend expone API, usa Expose an API y crea scope.
3. Concede admin consent cuando aplique.

### A3. Configurar roles
1. En App registration, crea app roles (`admin`, `student`).
2. Asigna usuarios/grupos a roles.
3. Verifica que el token incluya claim de roles.

### A4. Integración en la app
1. Usa Authority de Entra (tenant específico).
2. Configura cliente OIDC en frontend.
3. Configura JwtBearer en backend:
   - issuer
   - audience
   - validación de firma
4. Mapea claim de roles para políticas.

### A5. Validación
- Login con Entra exitoso.
- Endpoint admin devuelve 200 con rol correcto.
- Sin rol devuelve 403.

## Track B - Google Cloud Identity / Workspace

### B1. Configuración en Google Cloud
1. Crea o selecciona proyecto en Google Cloud.
2. Configura OAuth consent screen.
3. Define usuarios de prueba o dominio permitido.
4. Crea OAuth Client ID de tipo Web Application.

### B2. Configurar URIs
1. Authorized redirect URIs: callback de frontend.
2. Authorized JavaScript origins: dominio de app.

### B3. Integración en la app
1. Configura provider Google OIDC en frontend.
2. Usa issuer oficial de Google.
3. En backend valida issuer/audience/exp.
4. Para autorización, usa estrategia por:
   - dominio (`hd`) para organizaciones
   - claim mapeado de aplicación

### B4. Validación
- Login Google exitoso.
- Token válido en backend.
- Política de acceso por dominio o rol aplicada.

## Track C - Keycloak (Self-hosted)

### C1. Instalación rápida local
Usa contenedor para laboratorio:

```bash
docker run -d --name keycloak -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:latest start-dev
```

### C2. Configuración en Keycloak
1. Crea realm `bootcamp`.
2. Crea client para frontend (public/client con PKCE).
3. Crea client para backend (confidential si aplica).
4. Configura redirect/logout URIs.
5. Crea roles (`admin`, `student`).
6. Crea usuarios de prueba y asigna roles.

### C3. Mappers y claims
1. Agrega mappers para incluir roles en token.
2. Verifica issuer y endpoints OpenID Configuration.

### C4. Integración en la app
1. Configura authority de realm Keycloak.
2. Configura frontend con OIDC + PKCE.
3. Configura backend JwtBearer con issuer y audience.
4. Mapea roles para políticas.

### C5. Validación
- Login Keycloak exitoso.
- Endpoint protegido responde según rol.

## Prueba cruzada de proveedores
1. Ejecuta login con Entra.
2. Ejecuta login con Google.
3. Ejecuta login con Keycloak.
4. Comprueba que backend aplica la misma política para los tres.

## Evidencias obligatorias
- Captura de configuración IdP por proveedor
- Captura de token/claims (enmascarando datos sensibles)
- Pruebas 401/403/200
- Registro de configuración por ambiente

## Rúbrica
- 35% autenticación OIDC multi-proveedor
- 35% autorización por roles/políticas
- 20% seguridad de configuración
- 10% evidencias y documentación

## Errores comunes
1. `invalid_redirect_uri`:
   - URI no coincide exactamente con la registrada.
2. `invalid_audience`:
   - `aud` del token no coincide con API esperada.
3. `invalid_issuer`:
   - authority/tenant/realm incorrectos.
4. No llegan roles en token:
   - revisar app roles, asignación o mappers.

## Entregable
`EVIDENCIAS.md` con resultados de los tres tracks.


