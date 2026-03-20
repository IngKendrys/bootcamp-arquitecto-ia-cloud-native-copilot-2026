# Kubernetes + Helm + API Gateway (Kong) - Teoría

## ¿Qué es Kubernetes?

Kubernetes es una plataforma de orquestación de contenedores que permite desplegar, escalar y operar aplicaciones cloud-native de forma declarativa.

### ¿Para qué sirve en el bootcamp?

- Ejecutar backend y frontend en un entorno cercano a producción.
- Gestionar despliegues resilientes con `Deployments` y `Services`.
- Exponer aplicaciones con `Ingress`.
- Preparar base para GitOps con Argo CD.

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **Pod** | Unidad mínima de ejecución en Kubernetes |
| **Deployment** | Recurso declarativo para gestionar réplicas y rollouts |
| **Service** | Exposición de pods dentro del cluster |
| **Ingress** | Entrada HTTP/HTTPS al cluster por host/path |
| **Namespace** | Aislamiento lógico de recursos |
| **Helm Chart** | Paquete versionado de manifests Kubernetes |
| **Values** | Configuración parametrizable de un chart Helm |
| **imagePullSecret** | Credencial para descargar imágenes privadas |
| **Kong** | API Gateway para enrutar, proteger y observar APIs |
| **Konga** | UI para administración visual de Kong |
| **KongPlugin** | Política/plugin aplicado a rutas o servicios en Kong |

---

## Comandos clave

### Cluster y contexto

```bash
minikube start --driver=docker
kubectl config current-context
kubectl get ns
```

### Helm deployment

```bash
helm upgrade --install app infra/helm/app -n app --create-namespace
kubectl rollout status deployment/api-dotnet -n app --timeout=180s
kubectl rollout status deployment/app-next -n app --timeout=180s
```

### Secret para GHCR privado

```bash
kubectl -n app create secret docker-registry ghcr-creds \
  --docker-server=ghcr.io \
  --docker-username=<usuario> \
  --docker-password="$GHCR_PAT"
```

### Verificación de recursos

```bash
kubectl get pods -n app -o wide
kubectl get svc -n app
kubectl get ingress -n app
```

### Kong + Konga

```bash
helm repo add kong https://charts.konghq.com
helm repo update
helm upgrade --install kong kong/kong -n kong --create-namespace
kubectl apply -f infra/k8s/kong/backend-ingress-kong.yaml
kubectl apply -f infra/k8s/kong/konga.yaml
```

---

## Buenas prácticas

### 1. **Separar red interna y exposición externa**
- Mantener backend en `ClusterIP`.
- Exponer tráfico desde `Ingress`/API Gateway.

### 2. **Usar imágenes versionadas e inmutables**
- Preferir tags de release (`lab07`, `sha`) sobre `latest`.
- Facilitar rollback y trazabilidad.

### 3. **Gestionar credenciales con secrets**
- Usar `imagePullSecrets` para registros privados.
- No hardcodear tokens en manifests versionados.

### 4. **Aplicar políticas de gateway**
- Activar plugins como `rate-limiting`, `cors`, `key-auth`.
- Validar headers/políticas en respuestas reales.

### 5. **Documentar smoke tests end-to-end**
- Verificar frontend y backend por la ruta final de ingreso.
- Comprobar `HTTP 200` y comportamiento esperado.

---

## Links útiles

- https://kubernetes.io/docs/home/
- https://helm.sh/docs/
- https://minikube.sigs.k8s.io/docs/
- https://developer.konghq.com/kubernetes-ingress-controller/
- https://docs.konghq.com/kubernetes-ingress-controller/latest/plugins/

---

## Casos de uso

### Despliegue estándar en cluster
Backend y frontend publicados con Helm y balanceados por Kubernetes.

### API Gateway empresarial
Kong centraliza rutas, seguridad y políticas de tráfico.

### Base para GitOps
Helm + manifests listos para sincronización declarativa con Argo CD.

---

**Teoría completada:** Lab 09 - Kubernetes 1.35 + Helm + Kong/Konga  
**Nivel:** Fundamentos de orquestación y gateway cloud-native
