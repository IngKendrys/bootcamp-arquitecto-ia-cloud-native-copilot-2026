# Módulo 16 - Track Azure DevOps (Repos, Pipelines, Boards y ACR)

## Objetivo
Implementar el flujo completo de entrega en Azure DevOps para la misma solución del bootcamp.

## Alcance del track
1. Azure Repos para control de código y PRs.
2. Azure Pipelines para CI/CD.
3. Azure Container Registry (ACR) para imágenes.
4. Azure Boards para trazabilidad.
5. Despliegue a Kubernetes con approvals por ambiente.

## Arquitectura de la plataforma
- Source Control: Azure Repos
- Work Tracking: Azure Boards
- Build/Release: Azure Pipelines
- Container Registry: ACR
- Secrets: Variable Groups + Azure Key Vault

## Flujo recomendado
1. Crear proyecto en Azure DevOps.
2. Importar repositorio del bootcamp.
3. Configurar políticas de rama y PR.
4. Crear pipeline CI (build y test).
5. Crear pipeline de imagen y push a ACR.
6. Crear pipeline CD para Kubernetes.
7. Configurar ambientes con aprobaciones.
8. Integrar Boards con commits/PRs/deploys.

## Buenas prácticas
- Un YAML por servicio o plantilla reusable central.
- Variables por ambiente y secretos fuera del repo.
- Validaciones de calidad antes de cualquier deploy.
- Trazabilidad de work items hasta release.

## Laboratorios de este track
- `docs/labs/azdo-01-repos-policies.md`
- `docs/labs/azdo-02-pipelines-ci.md`
- `docs/labs/azdo-03-acr-images.md`
- `docs/labs/azdo-04-cd-k8s-approvals.md`
- `docs/labs/azdo-05-boards-traceability.md`
