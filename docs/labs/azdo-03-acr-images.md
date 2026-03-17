# Lab AZDO-03 - Build y push de imágenes a ACR

## Objetivo
Publicar imágenes de backend y frontend en Azure Container Registry.

## Prerrequisitos
- Lab AZDO-02 completado.
- ACR creado en Azure.
- Service connection a Azure configurada en Azure DevOps.

## Paso a paso
1. Crea o reutiliza pipeline de build de imágenes.
2. Configura tareas Docker:
   - build backend
   - build frontend
   - push a ACR
3. Define naming de tags:
   - `latest`
   - `build-<BuildId>`
   - opcional semántico
4. Publica metadatos de build.

## Validación
- Imágenes visibles en ACR.
- Tags correctos por build.

## Entregables
- Evidencia de repositorios en ACR.
- Evidencia de pipeline con push exitoso.
