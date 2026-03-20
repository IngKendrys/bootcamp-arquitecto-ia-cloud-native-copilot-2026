# Lab 09 - Kubernetes 1.35 y Helm

## Objetivo
Desplegar backend y frontend en un cluster Kubernetes usando Helm, con imágenes en GHCR y validación funcional end-to-end.

## Prerrequisitos
- Cluster Kubernetes accesible (en este lab: `minikube`).
- Helm instalado.
- Imágenes en GHCR:
	- `ghcr.io/ingkendrys/backend:lab07`
	- `ghcr.io/ingkendrys/frontend-angular:lab07`
- PAT de GitHub con `read:packages` (y `repo` si aplica) para pull de imágenes privadas.

---

## Paso a paso

### 1) Revisar chart y values por ambiente

Chart utilizado:
- `infra/helm/app/Chart.yaml`
- `infra/helm/app/values.yaml`
- `infra/helm/app/templates/`

Validaciones clave del chart:
- Backend en `8080`.
- Frontend en `80`.
- Ingress con host `app.local`.

### 2) Actualizar referencias de imagen/tag

En `infra/helm/app/values.yaml`:

```yaml
backend:
	image: ghcr.io/ingkendrys/backend:lab07
	containerPort: 8080
frontend:
	image: ghcr.io/ingkendrys/frontend-angular:lab07
	containerPort: 80
imagePullSecrets:
	- name: ghcr-creds
service:
	port: 80
```

Además, se agregó `imagePullSecrets` en ambos deployments para que Kubernetes pueda autenticarse contra GHCR.

### 3) Crear secret GHCR en el namespace

```bash
kubectl create namespace app --dry-run=client -o yaml | kubectl apply -f -

kubectl -n app delete secret ghcr-creds --ignore-not-found
kubectl -n app create secret docker-registry ghcr-creds \
	--docker-server=ghcr.io \
	--docker-username=IngKendrys \
	--docker-password="$GHCR_PAT"
```

### 4) Ejecutar instalación o upgrade de Helm

```bash
helm upgrade --install app infra/helm/app -n app --create-namespace
kubectl rollout restart deployment/api-dotnet deployment/app-next -n app
kubectl rollout status deployment/api-dotnet -n app --timeout=180s
kubectl rollout status deployment/app-next -n app --timeout=180s
```

### 5) Verificar pods, services e ingress

```bash
kubectl get pods -n app -o wide
kubectl get svc -n app
kubectl get ingress -n app
```

Estado esperado:
- Pods backend y frontend en `Running`.
- Services `api-dotnet` y `app-next` expuestos en `ClusterIP`.
- Ingress `enrollmenthub` con host `app.local`.

### 6) Smoke test funcional

```bash
MINIKUBE_IP=$(minikube ip)

# Frontend
curl -i -H 'Host: app.local' "http://$MINIKUBE_IP/"

# Backend login
curl -i -H 'Host: app.local' "http://$MINIKUBE_IP/api/auth/login" \
	-H 'Content-Type: application/json' \
	-d '{"username":"admin","password":"Password123"}'
```

Resultado esperado:
- Frontend responde `HTTP 200` con HTML de Angular.
- Login backend responde `HTTP 200` con JWT.

## Extensión opcional - API Gateway con Kong + Konga

Objetivo opcional:
- Exponer servicios backend mediante Kong Ingress en Kubernetes.
- Administrar rutas/plugins desde interfaz visual (Konga/Kong Manager).

### 7) Instalar Kong

```bash
helm repo add kong https://charts.konghq.com
helm repo update
helm upgrade --install kong kong/kong -n kong --create-namespace
kubectl get pods -n kong
kubectl get svc -n kong
```

Servicios relevantes:
- `kong-kong-proxy` (NodePort) para tráfico de gateway.
- `kong-kong-manager` (NodePort) para administración de Kong.

### 8) Crear ruta del backend por Kong + plugin

Se agregaron manifests en:
- `infra/k8s/kong/backend-ingress-kong.yaml`

Contenido aplicado:
- `KongPlugin` de tipo `rate-limiting` (`minute: 30`).
- `Ingress` con `ingressClassName: kong`, host `kong.local`, path `/api` hacia servicio `api-dotnet`.

Aplicación:

```bash
kubectl apply -f infra/k8s/kong/backend-ingress-kong.yaml
kubectl get ingress -n app
kubectl get kongplugin -n app
```

### 9) Desplegar Konga

Se agregó manifest en:
- `infra/k8s/kong/konga.yaml`

Aplicación:

```bash
kubectl apply -f infra/k8s/kong/konga.yaml
kubectl rollout status deployment/konga -n kong --timeout=180s
kubectl get svc -n kong konga
```

Acceso:

```bash
MINIKUBE_IP=$(minikube ip)
echo "Konga: http://$MINIKUBE_IP:31337"
echo "Kong Manager: http://$MINIKUBE_IP:30681"
```

### 10) Validación por gateway (no servicio directo)

```bash
MINIKUBE_IP=$(minikube ip)

# Llamada al backend a través del gateway Kong
curl -i -H 'Host: kong.local' "http://$MINIKUBE_IP:30327/api/auth/login" \
	-H 'Content-Type: application/json' \
	-d '{"username":"admin","password":"Password123"}'

# Validar headers del plugin rate-limiting
curl -sS -D - -o /dev/null -H 'Host: kong.local' "http://$MINIKUBE_IP:30327/api/auth/login" \
	-H 'Content-Type: application/json' \
	-d '{"username":"admin","password":"Password123"}' | grep -i 'x-ratelimit'

# Verificar que el backend no está expuesto como NodePort/LoadBalancer
kubectl get svc -n app api-dotnet -o jsonpath='{.spec.type}{"\n"}'
```

Resultado esperado:
- Login responde `HTTP 200` con JWT por Kong.
- Headers `X-RateLimit-*` presentes (plugin activo).
- Servicio backend `api-dotnet` en `ClusterIP` (sin exposición directa externa).

---

## Validación
- Pods en estado `Running`.
- Endpoints accesibles por Ingress.
- Smoke test de frontend y login backend en `HTTP 200`.
- Ruta `/api` validada por Kong (`Host: kong.local`).
- Plugin de `rate-limiting` activo (headers `X-RateLimit-*`).

## Rúbrica
- 50% despliegue funcional.
- 30% configuración por entorno.
- 20% evidencia.

## Entregables
- Evidencia de comandos ejecutados.
- Estado del cluster (`pods`, `services`, `ingress`).
- Smoke test funcional exitoso.


