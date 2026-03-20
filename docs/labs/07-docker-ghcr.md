# Lab 07 - Docker y publicaci�n en GHCR

## Objetivo
Empaquetar servicios en im�genes y publicarlas en GitHub Container Registry.

## Prerrequisitos
- Backend funcional del Lab 03 o 04 (.NET 10 API | FASTAPI).
- Frontend funcional del Lab 05 o 06 (Next.js 16 App | ANGULAR).

## Paso a paso
1. Revisa o crea Dockerfiles.
2. Construye imagen local de backend y frontend.
3. Prueba ejecucion local en contenedor.
4. Etiqueta im�genes con version.
5. Publica en GHCR.

## Comandos sugeridos
```bash
docker build -t ghcr.io/<org>/backend:lab07 templates/dotnet10-api
docker build -t ghcr.io/<org>/frontend:lab07 templates/next16-app
docker push ghcr.io/<org>/backend:lab07
docker push ghcr.io/<org>/frontend:lab07
```

## Validaci�n
- Im�genes publicadas y descargables.
- Contenedores levantan correctamente.

## R�brica
- 50% im�genes correctas.
- 30% versionado y trazabilidad.
- 20% evidencia.

## Entregables
- EVIDENCIAS.md con tags e im�genes publicadas.


