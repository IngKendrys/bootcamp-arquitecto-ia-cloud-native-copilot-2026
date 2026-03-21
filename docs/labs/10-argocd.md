# Lab 10 - GitOps con Argo CD

## Objetivo
Administrar despliegues declarativos sincronizados desde Git.

## Prerrequisitos
- Lab 09 completado.
- Argo CD disponible.
- `kubectl` configurado contra el cluster.
- Repositorio accesible desde Argo CD.

## Acceso a Argo CD (evitando puerto 8080)
Si el puerto local `8080` está ocupado, usa uno alterno para port-forward:

```bash
kubectl -n argocd port-forward svc/argocd-server 9090:80
```

Abre la UI en `http://localhost:9090`.

Si tu instalación requiere TLS en el servicio:

```bash
kubectl -n argocd port-forward svc/argocd-server 9443:443
```

Abre la UI en `https://localhost:9443`.

## Paso a paso
1. Crear recurso `Application` de Argo CD:
	```bash
	kubectl apply -f infra/gitops/argocd/app.yaml
	```
2. Verificar que apunta al repositorio/rama/path objetivo:
	```bash
	kubectl -n argocd get application enrollmenthub -o yaml | grep -E "repoURL|targetRevision|path"
	```
	Debe mostrar:
	- `repoURL: https://github.com/IngKendrys/bootcamp-arquitecto-ia-cloud-native-copilot-2026.git`
	- `targetRevision: lab-09`
	- `path: infra/helm/app`
3. Habilitar y validar `syncPolicy` según estrategia:
	- Estrategia usada en este lab: `automated + selfHeal + prune`.
	- Confirmación:
	```bash
	kubectl -n argocd get application enrollmenthub -o yaml | grep -A8 syncPolicy
	```
4. Verificar estado `Synced` y `Healthy`:
	```bash
	kubectl -n argocd get application enrollmenthub
	kubectl -n app get deploy,svc,pods
	```
	En Argo CD, la app debe aparecer en estado `Synced` y `Healthy`.
5. Probar cambio en Git y resincronización:
	- Edita una variable declarativa, por ejemplo `infra/helm/app/values.yaml` cambiando la imagen/tag:
	  - `frontend.image: ghcr.io/ingkendrys/frontend-angular:lab07` → otro tag válido.
	- Commit y push a la rama `lab-10`.
	- Observa sincronización automática:
	```bash
	kubectl -n argocd get application enrollmenthub -w
	```
	- Si deseas forzar resincronización manual:
	```bash
	kubectl -n argocd patch application enrollmenthub --type merge -p '{"operation":{"sync":{"prune":true}}}'
	```

## Validación
- Argo CD refleja estado real del cluster.
- Cambios en Git generan despliegue esperado.
- Si hay drift manual en cluster, `selfHeal` lo corrige al estado declarado en Git.

## Rúbrica
- 50% sincronización correcta.
- 30% control de cambios.
- 20% evidencia.

## Entregables
- EVIDENCIAS.md con:
  - captura de `Application` en `Synced/Healthy`,
  - commit de cambio declarativo,
  - evidencia de resincronización aplicada en cluster.

