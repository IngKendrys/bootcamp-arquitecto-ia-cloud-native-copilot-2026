# Teoría básica - Lab 04 FastAPI

## ¿Qué es?
FastAPI es un framework moderno de Python para construir APIs rápidas con validación automática basada en tipos.

## Palabras clave
- FastAPI
- Pydantic
- OpenAPI
- Uvicorn
- Dependency injection

## Comandos clave
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 5000
pytest
```

## Buenas prácticas
- Definir modelos de request/response con Pydantic.
- Documentar endpoints (Swagger/OpenAPI).
- Centralizar manejo de errores.

## Links
- https://fastapi.tiangolo.com/
- https://docs.pydantic.dev/
