# Lab 02 - Codespaces y devcontainer reproducible

## Objetivo
Configurar un entorno cloud reproducible para desarrollar sin dependencias locales.

## Prerrequisitos
- Lab 00 completado.
- Repositorio en GitHub.

## Paso a paso
1. Crea un Codespace desde el repositorio.
2. Verifica herramientas base (git, node, python, dotnet, docker cli).
3. Ejecuta una app de plantilla para validar runtime. Usa una de las plantillas en:
   - `templates/dotnet10-api` (ASP.NET Core)
   - `templates/fastapi` (Python FastAPI)
   - `templates/next16-app` (Next.js React)
   - `templates/angular21-app` (Angular)
4. Ajusta el devcontainer si falta una dependencia.
5. Documenta cambios del entorno.

## Cómo ejecutar cada plantilla (validar runtime)
### dotnet10-api
1. `cd templates/dotnet10-api/src`
2. `dotnet restore`
3. `dotnet run`
4. Abre URL de `Ports` o `http://localhost:<puerto>` (ej. 5000/5200)

### fastapi
1. `cd templates/fastapi`
2. `pip install -r requirements.txt` (o `pip install fastapi uvicorn`)
3. `uvicorn app:app --reload --host 0.0.0.0 --port 8000`
4. Abre `http://localhost:8000/docs` o `Ports`

### next16-app
1. `cd templates/next16-app`
2. `npm install` (o `pnpm install` / `yarn`)
3. `npm run dev`
4. Abre `http://localhost:3000` o `Ports`

### angular21-app
1. `cd templates/angular21-app`
2. `npm install` (o `pnpm install` / `yarn`)
3. `npm run start`
4. Abre `http://localhost:4200` o `Ports`

## Comandos sugeridos
```bash
git --version
node --version
python --version
dotnet --version
docker cli --version
```

## Validaci�n
- El entorno inicia sin errores.
- Las herramientas requeridas estan disponibles.

## R�brica
- 50% entorno funcional.
- 30% reproducibilidad documentada.
- 20% evidencia t�cnica.

## Entregables
- EVIDENCIAS.md con verificacion de herramientas.

