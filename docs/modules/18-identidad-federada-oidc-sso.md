# Módulo 18 - Identidad Federada, SSO y OIDC (Entra ID, Google y Keycloak)

## Objetivo
Diseñar e implementar autenticación y autorización empresarial con SSO, usando OIDC contra tres proveedores:
- Microsoft Entra ID
- Google Cloud Identity / Google Workspace
- Keycloak

## Resultado esperado
- Login único (SSO) en frontend
- Validación JWT en backend
- Autorización por roles y políticas
- Configuración replicable por proveedor

## Conceptos clave
1. Proveedor de identidad (IdP): emite identidad y tokens.
2. Cliente OIDC: aplicación que solicita autenticación.
3. Token ID: identidad del usuario autenticado.
4. Access Token: token para invocar APIs.
5. Claims: datos de identidad/autorización dentro del token.
6. Scopes: permisos solicitados por la app.

## Flujo recomendado
1. Frontend usa Authorization Code + PKCE.
2. IdP autentica al usuario.
3. Frontend recibe tokens de sesión.
4. Frontend llama backend con access token.
5. Backend valida issuer, audience, expiración y firmas.
6. Backend aplica autorización por rol/política.

## Diferencias prácticas por proveedor
### Entra ID
- Integración nativa con ecosistema Microsoft.
- Gestión de App Registrations, scopes y app roles.
- Excelente para escenarios corporativos en Azure.

### Google Cloud Identity / Workspace
- Muy útil para dominios Google.
- OAuth consent + credenciales por proyecto de Google Cloud.
- Para autorización avanzada por grupos, se requiere estrategia adicional.

### Keycloak
- IdP self-hosted y altamente configurable.
- Ideal para laboratorios, entornos híbridos y control total.
- Permite realms, clientes, mappers, roles y federación.

## Buenas prácticas obligatorias
1. Usar PKCE en frontend.
2. Nunca guardar secretos en frontend.
3. Validar issuer y audience en backend.
4. Definir roles mínimos por principio de menor privilegio.
5. Separar configuración por ambiente (dev/stage/prod).
6. Auditar accesos y errores de autenticación.

## Checklist de arquitectura segura
- [ ] Redirect URIs exactas por ambiente
- [ ] Logout URL configurada
- [ ] Scopes mínimos necesarios
- [ ] Rotación de secretos/certificados
- [ ] Manejo correcto de expiración y refresh
- [ ] Logs de seguridad habilitados

## Laboratorio asociado
Ejecuta `docs/labs/18-sso-oidc-entra-google-keycloak.md`.


