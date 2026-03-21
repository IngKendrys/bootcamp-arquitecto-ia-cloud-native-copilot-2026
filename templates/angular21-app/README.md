# Lab 06 - Angular 21 + Signals

Frontend Angular 21 (standalone) que consume los mismos endpoints usados por `next16-app`:

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/users`

Incluye:

- Servicios de acceso a API (`AuthApiService`, `UsersApiService`)
- Estado con Signals (`UsersStore`)
- Listado con paginación cliente
- Formulario de alta con validaciones
- Manejo uniforme de errores HTTP (interceptor)

## 1) Prerrequisitos

- API backend levantada (Lab 03 o 04), por ejemplo en `http://127.0.0.1:5000`.
- Usuario válido para login backend.

## 2) Configurar URL de API

Edita `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://127.0.0.1:5000',
};
```

## 3) Instalar dependencias

```bash
cd templates/angular21-app
npm install
```

## 4) Ejecutar app

```bash
npm start
```

Abre: `http://localhost:4200`

## 5) Flujo funcional (paso a paso)

1. **Obtener JWT**
   - Completa el formulario “Obtener JWT (Login backend)”.
   - La app llama `POST /api/auth/login`.
   - Si login es correcto, guarda el token en Signals (`UsersStore.token`).

2. **Listar usuarios**
   - Tras login exitoso, la app llama `GET /api/users` con `Authorization: Bearer <token>`.
   - El listado se paginará en cliente con Signals (`page`, `pageSize`, `pagedUsers`).

3. **Crear usuario**
   - Completa el formulario “Alta de usuario”.
   - Se valida: `username` mínimo 3 y `password` mínimo 6.
   - La app llama `POST /api/auth/register`.
   - Al éxito, recarga listado automáticamente.

4. **Manejo de errores uniforme**
   - Todos los errores HTTP pasan por `httpErrorInterceptor`.
   - Se normalizan a formato único (`ApiError`) con `status`, `code`, `message`.
   - Los componentes solo consumen mensajes desde Signals del store.

## 6) Build de verificación

```bash
npm run build
```

## 7) Arquitectura rápida

- `src/app/core/http/http-error.interceptor.ts`: normalización de errores HTTP.
- `src/app/core/services/auth-api.service.ts`: login backend.
- `src/app/core/services/users-api.service.ts`: registro y listado de usuarios.
- `src/app/features/users/users.store.ts`: estado y lógica con Signals.
- `src/app/features/users/users-dashboard.component.*`: UI (formularios + tabla + paginación).
