# GitHub Codespaces - Teoría

## ¿Qué es GitHub Codespaces?

GitHub Codespaces es un entorno de desarrollo en la nube basado en contenedores, listo para programar sin configurar localmente herramientas complejas.

### ¿Para qué sirve en el bootcamp?

- Estandarizar el entorno para todos los estudiantes.
- Reducir problemas de “en mi máquina sí funciona”.
- Arrancar rápido con herramientas preinstaladas.
- Facilitar desarrollo remoto desde navegador o VS Code.

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **Dev Container** | Definición del entorno (imagen, extensiones, herramientas) |
| **Remote Development** | Desarrollo sobre una máquina remota desde editor local/web |
| **Port Forwarding** | Publicación segura de puertos internos del contenedor |
| **Dotfiles** | Scripts/configs personales para personalizar el entorno |
| **Prebuilds** | Entornos preconstruidos para iniciar más rápido |

---

## Comandos/acciones clave

### Flujo base

```text
1) Crear Codespace desde el repositorio.
2) Esperar inicialización del dev container.
3) Ejecutar instalación y build del proyecto.
4) Levantar servicios y publicar puertos.
```

### Comandos comunes

```bash
# Node/Frontend
npm install
npm run dev

# .NET
dotnet restore
dotnet run

# Python/FastAPI
pip install -r requirements.txt
uvicorn app.main:app --reload --port 5000
```

---

## Buenas prácticas

### 1. **Definir bien el devcontainer**
- Incluir runtimes requeridos (.NET, Node, Python, Docker CLI).
- Versionar configuración en el repositorio.

### 2. **Usar puertos consistentes**
- Mantener puertos estándar por servicio (ej: 5000, 4200, 8080).
- Documentar puertos publicados por laboratorio.

### 3. **Controlar costos y recursos**
- Detener o eliminar Codespaces inactivos.
- Configurar auto-stop para evitar consumo innecesario.

### 4. **Reproducibilidad primero**
- Evitar dependencias “manuales” fuera de `devcontainer.json`.
- Automatizar setup en scripts cuando sea posible.

---

## Links útiles

- https://docs.github.com/en/codespaces
- https://containers.dev/
- https://code.visualstudio.com/docs/devcontainers/containers

---

## Casos de uso

### Bootcamp y formación
Entorno homogéneo para todos, sin bloqueos por configuración local.

### Equipos distribuidos
Onboarding en minutos para nuevos integrantes.

### Talleres rápidos
Laboratorios listos para ejecutar desde navegador.

---

**Teoría completada:** Lab 02 - Codespaces  
**Nivel:** Fundamentos y operación práctica de entornos cloud
