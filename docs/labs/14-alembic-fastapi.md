# Lab 14 - Alembic para FastAPI

## Objetivo
Versionar cambios de base de datos en stack Python.

## Prerrequisitos
- Lab 04 completado.

## Paso a paso
1. Configura `alembic.ini` y `env.py`.
2. Crea revisi�n inicial.
3. Aplica upgrade.
4. Introduce un cambio de modelo.
5. Genera nueva revisi�n y valida datos.

## Comandos sugeridos
```bash
cd templates/fastapi

# usando el Python del entorno del workspace
/workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/.venv/bin/python -m alembic revision --autogenerate -m "init"
/workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/.venv/bin/python -m alembic upgrade head

# cambio de modelo (ej: agregar campo status en Item)
/workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/.venv/bin/python -m alembic revision --autogenerate -m "add_status"
/workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/.venv/bin/python -m alembic upgrade head

# validaci�n de historial y datos
/workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/.venv/bin/python - <<'PY'
import sqlite3
conn = sqlite3.connect('fastapi_lab.db')
cur = conn.cursor()
print('alembic_version=', [r[0] for r in cur.execute('SELECT version_num FROM alembic_version')])
print('items=', list(cur.execute('SELECT id,name,status FROM items ORDER BY id')))
conn.close()
PY
```

## Validaci�n
- Versionado reproducible en diferentes entornos.

## R�brica
- 50% flujo de migraciones.
- 30% consistencia de esquema.
- 20% evidencia.

## Entregables
- EVIDENCIAS.md con revisiones y estado final.
