# Angular 21 - Teoría

## ¿Qué es Angular 21?

Angular es un framework frontend para construir aplicaciones SPA robustas. En Angular 21, `Signals` simplifica el manejo de estado reactivo con una API clara y moderna.

### ¿Para qué sirve en el bootcamp?

- Construir interfaces escalables para consumir APIs.
- Aplicar arquitectura por features, servicios y estado.
- Implementar formularios, validaciones y manejo de errores HTTP.
- Practicar integración real con backend .NET/FastAPI.

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **Angular** | Framework frontend TypeScript para SPAs |
| **Signals** | Primitiva reactiva para manejo de estado |
| **Standalone Components** | Componentes sin necesidad de `NgModule` |
| **HttpClient** | Cliente HTTP nativo de Angular |
| **Interceptor** | Middleware para requests/responses HTTP |
| **Reactive Forms** | Modelo robusto para formularios y validación |

---

## Comandos clave

### Ciclo de desarrollo

```bash
# Instalar dependencias
npm install

# Levantar entorno local
npm start

# Build de producción
npm run build
```

### Utilidad adicional

```bash
# Ejecutar tests (si están configurados)
npm test

# Lint (si está configurado)
npm run lint
```

---

## Buenas prácticas

### 1. **Separar UI, estado y acceso a datos**
- Componentes para presentación.
- Servicios para llamadas HTTP.
- Store/Signals para estado de la feature.

### 2. **Centralizar errores HTTP**
- Usar interceptores para normalizar errores.
- Evitar duplicar manejo de errores en cada componente.

### 3. **Diseñar formularios robustos**
- Validaciones reactivas y mensajes claros.
- Evitar enviar datos inválidos al backend.

### 4. **Mantener estructura por features**
- Organizar por dominio funcional (auth, users, etc.).
- Facilitar escalabilidad y mantenibilidad.

---

## Links útiles

- https://angular.dev/
- https://angular.dev/guide/signals
- https://angular.dev/guide/http
- https://angular.dev/guide/forms/reactive-forms

---

## Casos de uso

### Dashboards administrativos
Gestión de usuarios, roles, reportes y operaciones CRUD.

### Frontends conectados a APIs
Aplicaciones empresariales con autenticación JWT y consumo REST.

### SPAs escalables
Arquitecturas por módulos/features con estado reactivo moderno.

---


---

## Laboratorio

# Angular 21

## Novedades
- Signals consolidado, standalone por defecto, tooling y SSR mejorados.

## Novedades clave
- Signals como base de reactividad moderna.
- Arquitectura standalone consolidada para menor complejidad.
- Mejoras en CLI, SSR y rendimiento de builds.

## Paso a paso
1. Componente con Signals + tabla (paginación/orden) + formulario reactivo.  
2. Integración con backend y guard de ruta.  

**Ver lab06-angular21.md**.
