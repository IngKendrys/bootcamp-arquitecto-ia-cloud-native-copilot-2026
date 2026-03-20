# Módulo 10 - GitOps con Argo CD

## ¿Qué es GitOps?
GitOps es una práctica de operación donde Git se convierte en la fuente única de verdad para infraestructura y despliegues. Los cambios se realizan por commit/pull request y un reconciliador (Argo CD) aplica ese estado al clúster.

## ¿Por qué Argo CD?
- Proyecto CNCF ampliamente adoptado para modelo pull-based.
- UI clara para observar estado `Synced`, `OutOfSync`, `Healthy` y `Degraded`.
- Soporta auto-sync, self-heal, prune, historial y rollback.
- Permite estandarizar promoción por ramas o entornos declarativos.

## Conceptos clave
- `Application`: recurso principal que define repo, rama/tag, ruta y destino en Kubernetes.
- `Sync`: comparación entre estado deseado (Git) y estado real (cluster).
- `Health`: salud funcional de los recursos desplegados.
- `Self-heal`: corrige drift cuando alguien cambia recursos manualmente en el clúster.
- `Prune`: elimina recursos que ya no existen en Git.

## Flujo recomendado en este bootcamp
1. Definir manifiestos/Helm chart en el repositorio.
2. Crear `Application` de Argo CD apuntando a repo, rama y path.
3. Seleccionar estrategia de sync:
	- Manual (entornos sensibles), o
	- Automated + selfHeal + prune (entornos de integración/lab).
4. Verificar estado `Synced/Healthy`.
5. Realizar cambio en Git y validar resincronización automática.

## Buenas prácticas
- Evitar cambios manuales directos en cluster (fuera de Git).
- Versionar cambios con mensajes de commit claros y trazables.
- Definir convenciones por entorno (dev/stage/prod) y protección de ramas.
- Usar evidencias de sincronización como parte de criterios de aceptación.

## Integración con GitHub y Copilot
- GitHub: repositorio central de manifiestos y revisiones.
- Copilot: acelera creación/refactor de YAML/Helm, validación de comandos y documentación.
- Argo CD: ejecuta reconciliación continua y auditable contra el estado declarado.

## Resultado esperado del módulo
- Capacidad de operar despliegues declarativos de forma repetible.
- Visibilidad de drift y convergencia en tiempo real.
- Evidencia completa de que cambios en Git se reflejan correctamente en Kubernetes.

Ver laboratorio: `docs/labs/10-argocd.md`.

