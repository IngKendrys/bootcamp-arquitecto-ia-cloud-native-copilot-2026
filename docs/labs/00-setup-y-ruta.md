# Lab 00 - Guía Total de Inicio del Curso

## Para qué sirve esta guía
Esta guía te lleva desde cero hasta dejar el curso listo para ejecutar sin fricciones.

## Resultado esperado
- Cuenta de GitHub preparada
- Repositorio del curso creado y con contenido
- Entorno de desarrollo listo en VS Code
- Flujo de ramas y evidencias definido
- Validación técnica mínima completada

## Ruta recomendada de arranque
1. Preparar cuenta y acceso en GitHub.
2. Crear repositorio del curso.
3. Importar este contenido al repositorio.
4. Elegir entorno de trabajo:
   - Codespaces
   - Dev Container local con VS Code
5. Validar herramientas.
6. Ejecutar una prueba rápida del stack.
7. Configurar metodología de trabajo del curso.

## Paso 1 - Preparar GitHub
1. Verifica que tengas cuenta activa en GitHub.
2. Activa GitHub Copilot en tu cuenta.
3. Configura autenticación segura:
   - Recomendado: passkey o 2FA
4. Crea un Personal Access Token solo si vas a usar HTTPS con autenticación por token.

## Paso 1B - Preparar Azure DevOps (si usarás ese track)
1. Crea o confirma una organización en Azure DevOps.
2. Crea un proyecto nuevo para el bootcamp.
3. Verifica permisos para crear repos, pipelines y service connections.
4. (Recomendado) Crea un Azure Resource Group de laboratorio para ACR y Kubernetes.

## Paso 2 - Crear el repositorio del curso
1. En GitHub, crea un repo nuevo.
2. Nombre sugerido: `bootcamp-arquitecto-ia-cloud-native-copilot-2026`.
3. Visibilidad sugerida:
   - Privado para trabajo personal
   - Público si quieres compartir avances
4. Inicializa con README vacío solo si vas a subir archivos manualmente luego.

Si trabajarás en Azure DevOps:
1. Crea repo en Azure Repos.
2. Importa el código del bootcamp (desde local o desde GitHub).
3. Habilita branch policies en `main`.

## Paso 3 - Importar contenido del curso

### Opción A - Subir carpeta final actual
1. Clona el repo nuevo en tu equipo.
2. Copia el contenido de este curso final dentro del repo clonado.
3. Haz commit inicial y push.

### Opción B - Trabajar directamente desde esta carpeta
1. Inicializa git en la carpeta final si aún no está inicializado.
2. Conecta remote al repositorio GitHub.
3. Haz commit inicial y push.

## Paso 4 - Elegir entorno de desarrollo

### Opción A - Codespaces (recomendado para cero problemas locales)
1. Abre el repositorio en GitHub.
2. Crea un Codespace desde la rama principal.
3. Espera a que termine la preparación del entorno.
4. Valida que VS Code web abra el proyecto completo.

### Opción B - VS Code local con Dev Container
1. Instala VS Code.
2. Instala Docker Desktop.
3. Instala extensión Dev Containers en VS Code.
4. Abre el proyecto en VS Code.
5. Ejecuta Reopen in Container.
6. Espera instalación y validación de dependencias.

## Paso 5 - Requisitos por sistema operativo

### Windows 11
1. Instala Git for Windows.
2. Instala Docker Desktop (WSL2 habilitado).
3. Instala Node LTS.
4. Instala Python 3.11 o superior.
5. Instala .NET SDK compatible con el template.
6. Instala kubectl y Helm.

### macOS
1. Instala Xcode Command Line Tools.
2. Instala Homebrew.
3. Instala Git.
4. Instala Docker Desktop.
5. Instala Node LTS.
6. Instala Python 3.11 o superior.
7. Instala .NET SDK compatible con el template.
8. Instala kubectl y Helm.

## Paso 6 - Validación técnica mínima
Ejecuta estos comandos en terminal integrada de VS Code.

```bash
git --version
docker --version
kubectl version --client
helm version
node --version
python --version
dotnet --version
```

Si alguno falla, corrige instalación antes de continuar.

Para track Azure DevOps, valida además:

```bash
az --version
az account show
```

Y verifica en Azure DevOps:
- Existe al menos una service connection a Azure.
- El proyecto tiene permisos para ejecutar pipelines.

## Paso 7 - Estructura de ramas recomendada
1. `main` para versiones estables.
2. `develop` para integración.
3. `lab-XX` para cada laboratorio.

Flujo sugerido por laboratorio:
1. Crear rama `lab-XX`.
2. Implementar cambios.
3. Commit con mensaje claro.
4. Pull Request hacia `develop`.
5. Merge y evidencia.

## Paso 8 - Configurar Copilot para el curso
1. Inicia sesión en GitHub dentro de VS Code.
2. Habilita Copilot y Copilot Chat.
3. Crea una rutina de trabajo:
   - diseñar
   - generar
   - revisar
   - probar
   - documentar

## Paso 9 - Crear plantilla de evidencias
Crea un archivo `EVIDENCIAS.md` por laboratorio con esta estructura.

```md
# Evidencias Lab XX

## Objetivo

## Comandos ejecutados

## Resultado esperado

## Resultado obtenido

## Problemas y solución

## Capturas o logs
```

## Paso 10 - Prueba de arranque del curso
1. Abre la solución en VS Code.
2. Abre el laboratorio 01.
3. Ejecuta primer commit de trabajo.
4. Verifica que puedes avanzar al Lab 02.

## Checklist final del setup
- [Si] GitHub y Copilot listos
- [Si] Repo creado y contenido importado
- [Si] Entorno (Codespaces o Dev Container) operativo
- [Si] Herramientas validadas
- [Si] Flujo de ramas definido
- [Si] Evidencias listas

## Punto oficial de inicio del curso
Empieza en `01-copilot.md` y sigue el orden de `docs/labs/README.md`.


