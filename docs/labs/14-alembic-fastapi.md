# Lab 14 - Alembic para FastAPI

## Objetivo
Versionar cambios de base de datos en stack Python.

## Prerrequisitos
- Lab 04 completado.

## Paso a paso
1. Configura `alembic.ini` y `env.py`.
2. Crea revisión inicial.
3. Aplica upgrade.
4. Introduce un cambio de modelo.
5. Genera nueva revisión y valida datos.

## Comandos sugeridos
```bash
cd templates/fastapi
alembic revisión -m "init"
alembic upgrade head
alembic revisión --autogenerate -m "add_status"
alembic upgrade head
```

## Validación
- Versionado reproducible en diferentes entornos.

## Rúbrica
- 50% flujo de migraciones.
- 30% consistencia de esquema.
- 20% evidencia.

## Entregables
- EVIDENCIAS.md con revisiones y estado final.


