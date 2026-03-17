# Lab AZDO-04 - CD a Kubernetes con aprobaciones

## Objetivo
Desplegar en Kubernetes desde Azure Pipelines con gates por ambiente.

## Prerrequisitos
- Lab AZDO-03 completado.
- Cluster Kubernetes accesible.
- Helm chart disponible en `infra/helm`.

## Paso a paso
1. Crea pipeline de release/deploy con stages:
   - dev
   - stage
   - prod
2. Configura approvals manuales para stage y prod.
3. Despliega con Helm usando tag de imagen del build.
4. Publica estado del release.

## Validación
- Deploy automático en dev.
- Deploy bloqueado en stage/prod hasta aprobación.
- Pods saludables post-deploy.

## Entregables
- Capturas de aprobaciones.
- Evidencia de rollout por ambiente.
