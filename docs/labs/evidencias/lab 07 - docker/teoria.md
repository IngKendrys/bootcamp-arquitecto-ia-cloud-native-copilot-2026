# Docker y GitHub Container Registry - Teoría

## ¿Qué es Docker?

Docker es una plataforma de **containerización** que permite empaquetar aplicaciones con todas sus dependencias (código, runtime, librerías, configuración) en una unidad aislada llamada **contenedor**.

Un contenedor es como una "máquina virtual ligera" que:
- Contiene todo lo necesario para ejecutar la app
- Es portátil (funciona igual en dev, staging, producción)
- Es reproducible (siempre hace lo mismo)
- Es seguro (aislado del sistema host)
- Usa menos recursos que VMs tradicionales

### Conceptos clave

- **Imagen:** Plantilla inmutable con todos los archivos de la aplicación (binario reusable)
- **Contenedor:** Instancia en ejecución de una imagen (proceso aislado)
- **Dockerfile:** Archivo de especificación que describe cómo construir una imagen
- **Registro:** Repositorio centralizado de imágenes (Docker Hub, GHCR, ACR, etc.)
- **Volumen:** Almacenamiento persistente que permanece después de que el contenedor se detiene

### Ciclo de vida

```
Código fuente → Dockerfile → docker build → Imagen → docker run → Contenedor en ejecución
                                                                          ↓
                                                            docker push → Registro (GHCR)
                                                                          ↓
                                                            docker pull → Otro entorno
```

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **Dockerfile** | Script que define pasos para construir imagen |
| **Image** | Plantilla aislada con app completa |
| **Container** | Instancia ejecutándose de una imagen |
| **Registry** | Almacén centralizado (GHCR, Docker Hub) |
| **Layer** | Capa en la construcción (cada `RUN`, `COPY` es una layer) |
| **Multi-stage** | Dockerfile con múltiples stages (build, runtime) |
| **Alpine** | Imagen base ultra-ligera (5MB vs 100MB+) |
| **Nginx** | Servidor web eficiente, común para servir apps frontend |
| **PAT** | Personal Access Token (credencial GitHub) |
| **GHCR** | GitHub Container Registry |

---

## Comandos clave

### Build

```bash
# Construir imagen desde Dockerfile
docker build -t nombre:tag ruta/

# Ejemplo
docker build -t mi-app:1.0 ./app

# Multi-stage (especificar target)
docker build --target runtime -t mi-app:1.0 ./app
```

### Run

```bash
# Ejecutar contenedor
docker run -d --name nombre -p puerto_host:puerto_container imagen:tag

# Ejemplo
docker run -d --name mi-servidor -p 8080:80 mi-app:1.0

# Con volumen persistente
docker run -d -v /ruta/local:/ruta/container imagen:tag

# Con variables de entorno
docker run -d -e VARIABLE=valor imagen:tag
```

### Gestión

```bash
# Listar imágenes
docker images

# Listar contenedores
docker ps        # Running
docker ps -a     # Todos

# Ver logs
docker logs nombre-contenedor

# Detener/Remover
docker stop nombre-contenedor
docker rm nombre-contenedor

# Tag (para registry)
docker tag imagen:tag registry/usuario/imagen:tag

# Push a registry
docker push registry/usuario/imagen:tag

# Pull desde registry
docker pull registry/usuario/imagen:tag
```

### Login en GHCR

```bash
# Con Personal Access Token
echo "tu_pat_aqui" | docker login ghcr.io -u tu_usuario --password-stdin

# Verificar
docker info | grep "Username"
```

---

## Buenas prácticas

### 1. **Usar imágenes base alpine**
```dockerfile
# ❌ Pesado (100MB+)
FROM node:20

# ✅ Ligero (50MB)
FROM node:20-alpine
```

### 2. **Multi-stage builds**
```dockerfile
# ❌ Una sola stage (imagen grande con herramientas de build)
FROM node:20
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000

# ✅ Multi-stage (solo runtime en imagen final)
FROM node:20-alpine AS builder
COPY . .
RUN npm install && npm run build

FROM node:20-alpine
COPY --from=builder /app/dist ./dist
EXPOSE 3000
```

### 3. **Optimizar capas (cacheable)**
```dockerfile
# ❌ Invalida caché completo si hay cambios en código
COPY . .
RUN npm install

# ✅ Instala dependencias primero (rara vez cambia)
COPY package*.json ./
RUN npm install
COPY . .
```

### 4. **Usar .dockerignore**
```
node_modules
.git
.env
dist
logs
*.log
```

### 5. **Usuario nonroot por seguridad**
```dockerfile
# ❌ Inseguro
FROM alpine
COPY . .
CMD ["myapp"]

# ✅ Seguro
FROM alpine
RUN addgroup -g 1001 appgroup && adduser -D -u 1001 -G appgroup appuser
COPY --chown=1001:1001 . .
USER 1001
CMD ["myapp"]
```

### 6. **Etiquetar versiones en registry**
```bash
# ✅ Versionado
docker tag myapp:latest ghcr.io/user/myapp:1.0
docker tag myapp:latest ghcr.io/user/myapp:stable

# ❌ Evitar
docker tag myapp:latest ghcr.io/user/myapp:LATEST  # Evita mayúsculas
```

### 7. **Usar health checks**
```dockerfile
FROM nginx:alpine
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1
```

---

## GitHub Container Registry (GHCR)

### ¿Por qué GHCR?

- **Integrado** con GitHub (mismo login, token PAT)
- **Privado/Público** según repositorio
- **Incluido** en GitHub (sin costo adicional para público)
- **Seguro** con attestations y scanning de vulnerabilidades

### Formato de URL

```
ghcr.io/usuario/nombre-imagen:tag

Ejemplo:
ghcr.io/IngKendrys/backend:lab07
```

### Flujo de publicación

```bash
# 1. Crear PAT en https://github.com/settings/tokens
#    Scopes: write:packages, read:packages, repo

# 2. Login
echo "$PAT" | docker login ghcr.io -u usuario --password-stdin

# 3. Tag
docker tag mi-app:local ghcr.io/usuario/mi-app:1.0

# 4. Push
docker push ghcr.io/usuario/mi-app:1.0

# 5. Usar (pull desde otro lugar)
docker pull ghcr.io/usuario/mi-app:1.0
docker run ghcr.io/usuario/mi-app:1.0
```

---

## Links útiles

- [Docker Documentation](https://docs.docker.com/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker Hub Alpine Official Image](https://hub.docker.com/_/alpine)
- [Nginx Official Image](https://hub.docker.com/_/nginx)
- [.NET Official Docker Images](https://hub.docker.com/_/microsoft-dotnet)

---

## Casos de uso

### Microservicios
Cada servicio en su contenedor, fácil de escalar y desplegar independientemente.

### CI/CD
Construir y pushear imágenes en pipelines automáticos (GitHub Actions, Azure Pipelines).

### Entornos consistentes
Dev, staging y producción usan exactamente la misma imagen.

### Kubernetes
Orquestación de contenedores a escala (tema Lab 09).
