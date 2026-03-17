# Checklist Express de 30 Minutos para Iniciar el Curso

Esta guía es la ruta más corta para empezar hoy mismo.
Si quieres explicaciones completas, usa la guía detallada en `00-setup-y-ruta.md`.

## Objetivo
En 30 minutos dejar listo:
- repositorio en GitHub
- entorno de trabajo en VS Code (Codespaces o Dev Container)
- validación técnica mínima
- primer avance hacia el Lab 01

## Minuto 0-3: pre-check rápido
- [Si] Tienes cuenta de GitHub activa
- [Si] Tienes GitHub Copilot habilitado en tu cuenta
- [-] Tienes organización/proyecto en Azure DevOps (si usarás ese track)
- [Si] Tienes VS Code instalado
- [Local] Elegiste modo de trabajo: Codespaces o local

## Minuto 3-10: repo listo en GitHub
1. Crea repo nuevo en GitHub.
2. Nombre sugerido: `bootcamp-arquitecto-ia-cloud-native-copilot-2026`.
3. Sube el contenido de esta carpeta final. 
4. Haz commit inicial y push.

Checklist:
- [Si] Repo creado
- [Si] Contenido del curso subido
- [Si] Rama principal visible en GitHub

Si vas por Azure DevOps:
- [ ] Repo creado en Azure Repos
- [ ] Código importado al proyecto Azure DevOps
- [ ] Branch policy activa en `main`

## Minuto 10-18: abrir entorno

### Ruta A (recomendada): Codespaces
1. En GitHub, abre el repo.
2. Crea Codespace en la rama principal.
3. Espera inicialización completa.

Checklist:
- [ ] Proyecto abre en VS Code web
- [ ] Terminal funcional

### Ruta B: VS Code local + Dev Container
1. Instala Docker Desktop.
2. Abre proyecto en VS Code.
3. Ejecuta Reopen in Container.

Checklist:
- [ ] Contenedor inicia
- [ ] Terminal corre dentro del contenedor

## Minuto 18-24: validación técnica mínima
Ejecuta en terminal integrada:

```bash
git --version
docker --version
kubectl version --client
helm version
node --version
python --version
dotnet --version
```

Opcional para track Azure DevOps:

```bash
az --version
az account show
```

Checklist:
- [ ] Todos los comandos responden sin error

## Minuto 24-27: flujo de trabajo del curso
- [ ] Crea rama `develop`
- [ ] Define convención de ramas `lab-XX`
- [ ] Crea archivo `EVIDENCIAS.md`

Plantilla mínima:

```md
# Evidencias Lab XX

## Objetivo
## Comandos ejecutados
## Resultado esperado
## Resultado obtenido
## Problemas y solución
## Capturas o logs
```

## Minuto 27-30: prueba de arranque
1. Abre `docs/labs/01-copilot.md`.
2. Crea rama `lab-01`.
3. Ejecuta tu primer commit de trabajo.

Checklist final:
- [ ] Entorno listo
- [ ] Ruta del curso clara
- [ ] Primer laboratorio iniciado

## Problemas comunes y solución rápida
1. Docker no levanta en Windows:
   - Verifica Docker Desktop abierto y WSL2 activo.
2. `kubectl` o `helm` no existen:
   - Instala herramientas y reinicia terminal de VS Code.
3. Error de autenticación GitHub al hacer push:
   - Reautentica GitHub en VS Code o usa token.
4. Copilot no aparece en VS Code:
   - Verifica sesión de GitHub e instalación de extensiones.

## Problemas de validación técnica (instalación desde terminal)
Si al ejecutar los comandos de validación técnica obtienes errores, usa los siguientes comandos según tu sistema operativo.

### Windows (PowerShell con Chocolatey)
```powershell
choco install git -y
choco install docker-desktop -y
choco install kubernetes-cli -y
choco install kubernetes-helm -y
choco install nodejs -y
choco install python -y
choco install dotnet-sdk -y
```
Ejecuta luego:
```powershell
git --version
docker --version
kubectl version --client
helm version
node --version
python --version
dotnet --version
```

### macOS (Terminal con Homebrew)
```bash
brew install git
brew install --cask docker
brew install kubectl
brew install helm
brew install node
brew install python
dotnet --list-sdks || brew install --cask dotnet-sdk
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install -y git curl apt-transport-https ca-certificates software-properties-common
sudo snap install docker --classic
sudo snap install kubectl --classic
curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs python3 python3-pip dotnet-sdk-7.0
```

Después de instalar, reinicia la terminal y vuelve a ejecutar la validación técnica.

## Siguiente paso
Si este checklist te funcionó, continúa con `01-copilot.md` y usa `README.md` de labs como ruta oficial.


