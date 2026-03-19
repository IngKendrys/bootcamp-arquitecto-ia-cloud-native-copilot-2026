# Lab 05 - Next 16 + React 19 (RSC + Server Actions)

UI funcional para listar y crear usuarios consumiendo backend.

## 0) Backend objetivo

Este frontend está conectado al backend .NET del Lab 03 (`/api/auth/register` y `/api/users`).

## 1) Levantar API .NET (Lab 03)

```bash
cd templates/dotnet10-api/src
dotnet run
```

Por defecto queda en `http://127.0.0.1:5000`.

### 1.1 Crear usuario inicial (si aún no existe)

```bash
curl -i -X POST http://127.0.0.1:5000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"username":"admin","password":"Password123"}'
```

### 1.2 Obtener JWT para listado de usuarios

```bash
curl -s -X POST http://127.0.0.1:5000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"username":"admin","password":"Password123"}'
```

Guarda el valor `token` en `BACKEND_API_TOKEN`.

## 2) Instalar dependencias frontend

```bash
cd templates/next16-app
npm install
```

## 3) Configurar variables de entorno

```bash
cp .env.example .env.local
```

Ajusta en `.env.local`:

- `API_BASE_URL`: URL base del backend (ej. API .NET del Lab 03).
- `BACKEND_API_TOKEN`: JWT backend para leer `GET /api/users`.
- `APP_AUTH_USER`, `APP_AUTH_PASSWORD` para proteger `/dashboard` con login local.

Ejemplo mínimo:

```env
API_BASE_URL=http://127.0.0.1:5000
BACKEND_API_TOKEN=<pega_aqui_tu_jwt>

APP_AUTH_USER=admin
APP_AUTH_PASSWORD=Password123
```

## 4) Protección de rutas (sin OIDC)

La ruta `/dashboard` se protege con `proxy.js` verificando cookie `lab05_session`.

Flujo:
- Si no hay cookie válida -> redirección a `/login`.
- En `/login`, el formulario valida `APP_AUTH_USER` y `APP_AUTH_PASSWORD`.
- Si credenciales correctas -> se crea cookie y redirige a `/dashboard`.

## 5) Ejecutar aplicación

```bash
npm run dev
```

Abrir: `http://localhost:3000`

## 6) Flujo funcional

1. Ir a `/login` e iniciar sesión local.
2. Ir a `/dashboard` (ruta protegida por proxy).
3. Ver listado de usuarios (RSC, server-side fetch).
4. Crear nuevo usuario con formulario (Server Action → `POST /api/auth/register`).
5. Ver feedback de carga/error y refresco de datos (`revalidatePath`).

## 7) Validación rápida

- `/dashboard` sin sesión redirige a `/login`.
- Con sesión, se muestra dashboard.
- Si falta `BACKEND_API_TOKEN`, se muestra error claro en listado.
- Alta de usuario muestra estado de éxito/error.

## 8) Capturas para evidencia (Lab 05)

Toma estas capturas:

1. Pantalla principal (`/`) con navegación.
2. Login local (`/login`) o redirección de ruta protegida.
3. Dashboard con listado de usuarios.
4. Alta de usuario exitosa (mensaje y listado actualizado).
5. Estado de error controlado (por ejemplo token inválido).
