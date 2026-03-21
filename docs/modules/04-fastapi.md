# FastAPI - Teoría

## ¿Qué es FastAPI?

FastAPI es un framework moderno de Python para construir APIs rápidas, tipadas y bien documentadas de forma automática usando OpenAPI.

### ¿Para qué sirve en el bootcamp?

- Crear backend ligero y productivo en Python.
- Validar automáticamente requests/responses con tipos.
- Exponer documentación interactiva sin esfuerzo extra.
- Integrar servicios con frontend y otros microservicios.

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **FastAPI** | Framework ASGI para APIs de alto rendimiento |
| **Pydantic** | Validación y serialización de datos basada en tipos |
| **OpenAPI** | Estándar para describir APIs REST |
| **Uvicorn** | Servidor ASGI para ejecutar aplicaciones FastAPI |
| **Dependency Injection** | Inyección de dependencias para seguridad, DB, etc. |

---

## Comandos clave

### Ciclo de desarrollo

```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar API en desarrollo
uvicorn app.main:app --reload --port 5000

# Ejecutar pruebas
pytest
```

### Ver documentación automática

```text
Swagger UI:  http://localhost:5000/docs
Redoc:       http://localhost:5000/redoc
```

---

## Buenas prácticas

### 1. **Definir contratos con Pydantic**
- Modelar request/response con tipos explícitos.
- Validar datos de entrada antes de llegar a lógica de negocio.

### 2. **Separar routers, servicios y modelos**
- Mantener estructura modular para escalar.
- Evitar lógica pesada dentro de endpoints.

### 3. **Centralizar manejo de errores**
- Usar `HTTPException` y handlers globales.
- Devolver respuestas de error consistentes.

### 4. **Proteger endpoints sensibles**
- Implementar auth (JWT/OAuth2) cuando aplique.
- Validar permisos y scopes por operación.

---

## Links útiles

- https://fastapi.tiangolo.com/
- https://docs.pydantic.dev/
- https://www.uvicorn.org/

---

## Casos de uso

### APIs internas
Servicios para frontend web/móvil con alta productividad.

### Microservicios en Python
Endpoints rápidos para procesamiento y reglas de negocio.

### Prototipos productivos
MVPs robustos con documentación automática desde el día 1.

---


---

## Laboratorio

# Python 3.14.3 + FastAPI 0.115.11

## Novedades de FastAPI recientes (alto nivel)
- Rendimiento, tipado con Pydantic v2, *dependency injection* refinada.  
- Integración asíncrona y validación más estricta.

## Novedades clave
- Mejoras en validación con Pydantic v2.
- Modelo de dependencias más claro y mantenible.
- Mejoras de rendimiento para APIs de alta concurrencia.

## Paso a paso
1. Crear app con rutas `/health` y `/items`.  
2. Integrar PostgreSQL 18 o MongoDB 8.2.3.  
3. Agregar pruebas con `pytest`/`httpx`.  
4. Empaquetar con Docker y publicar en GHCR.  

**Ver lab04-fastapi.md**.
