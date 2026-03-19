# FastAPI Lab 04

Servicio FastAPI con rutas `/health` y `/items`, CRUD básico, validaciones, manejo de errores, pruebas con `pytest/httpx`, Docker y publicación a GHCR.

## Stack
- FastAPI
- SQLAlchemy
- PostgreSQL 18
- pytest + httpx

## Variables de entorno
- `DATABASE_URL` (default: `postgresql+psycopg://postgres:postgres@localhost:5432/fastapi_lab`)

## Ejecutar local (sin Docker)
```bash
cd templates/fastapi
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --app-dir src --reload
```

OpenAPI:
- `http://127.0.0.1:8000/docs`
- `http://127.0.0.1:8000/openapi.json`

## Ejecutar con Docker + PostgreSQL
```bash
cd templates/fastapi
docker compose up --build
```

## Ejecutar pruebas
```bash
cd templates/fastapi
pytest -q
```

## Publicar imagen en GHCR
Ya está configurado el workflow:
- `.github/workflows/fastapi-ghcr.yml`

Imagen publicada como:
- `ghcr.io/<owner>/fastapi-lab:<tag>`
