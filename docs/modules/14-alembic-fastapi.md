# Alembic con FastAPI - Versionamiento de esquema en Python

## ¿Qué es Alembic?

Alembic es la herramienta oficial de migraciones para SQLAlchemy. Permite versionar cambios de base de datos en proyectos Python/FastAPI de forma controlada y reproducible.

Con Alembic puedes:
- crear revisiones iniciales y evolutivas,
- aplicar cambios incrementalmente (`upgrade`),
- revertir cambios (`downgrade`),
- y mantener trazabilidad del estado mediante `alembic_version`.

### ¿Para qué sirve en el bootcamp?

- Evolucionar esquema de Lab 04 sin perder datos.
- Evitar cambios manuales no trazables en DB.
- Sincronizar modelo SQLAlchemy y estructura real.
- Preparar prácticas de CI/CD con migraciones.

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **Revision** | Archivo versionado con cambios de esquema |
| **Autogenerate** | Detección automática de diff entre modelos y DB |
| **upgrade head** | Aplica todas las migraciones pendientes |
| **downgrade** | Revierte una o más migraciones |
| **alembic_version** | Tabla que guarda la versión actual aplicada |
| **env.py** | Configuración del runtime de Alembic |
| **alembic.ini** | Configuración principal (URL, script_location, logging) |
| **target_metadata** | Metadatos SQLAlchemy usados para autogenerar |
| **script.py.mako** | Plantilla de archivos de revisión |

---

## Comandos clave

### Configuración y revisión inicial

```bash
cd templates/fastapi
/workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/.venv/bin/python -m alembic revision --autogenerate -m "init"
/workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/.venv/bin/python -m alembic upgrade head
```

### Cambio evolutivo de modelo

```bash
# Ejemplo: agregar campo status al modelo Item
/workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/.venv/bin/python -m alembic revision --autogenerate -m "add_status"
/workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/.venv/bin/python -m alembic upgrade head
```

### Validación de estado

```bash
/workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/.venv/bin/python - <<'PY'
import sqlite3
conn = sqlite3.connect('templates/fastapi/fastapi_lab.db')
cur = conn.cursor()
print([r[0] for r in cur.execute('SELECT version_num FROM alembic_version')])
print(list(cur.execute('SELECT id,name,status FROM items ORDER BY id')))
conn.close()
PY
```

---

## Buenas prácticas

### 1. Revisión por cambio lógico
- Una migración por feature/cambio puntual.

### 2. Revisar autogenerate antes de aplicar
- No ejecutar a ciegas; inspeccionar SQL/operaciones generadas.

### 3. Compatibilidad por motor
- SQLite tiene limitaciones para `ALTER TABLE` con `NOT NULL` sin default.

### 4. Mantener metadatos centralizados
- Definir modelos en módulo dedicado y referenciarlos desde `env.py`.

### 5. Probar con datos existentes
- Validar que upgrades no rompan ni borren registros previos.

### 6. Versionar solo fuente
- No commitear archivos runtime (`*.db`, `__pycache__`, binarios).

---

## Links útiles

- Alembic Docs: https://alembic.sqlalchemy.org/en/latest/
- SQLAlchemy Migrations: https://docs.sqlalchemy.org/
- FastAPI: https://fastapi.tiangolo.com/
- SQLite ALTER TABLE: https://www.sqlite.org/lang_altertable.html

---

## Casos de uso

### API CRUD en crecimiento
Agregar columnas y restricciones sin reinicializar la base.

### Entornos múltiples (dev/qa/prod)
Aplicar la misma secuencia de revisiones en cada entorno.

### Backward compatibility
Asegurar que datos ya cargados sigan válidos tras cambios de esquema.

---

## Laboratorio relacionado

- `docs/labs/14-alembic-fastapi.md`

