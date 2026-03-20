# Malla Comparativa: GitHub vs Azure DevOps

## Objetivo de este documento
Ayudar a decidir rápidamente entre dos opciones de evolución del bootcamp:
1. Un solo curso con dos tracks (GitHub y Azure DevOps).
2. Dos cursos separados (uno GitHub-first y otro Azure DevOps-first).

## Resumen ejecutivo
- La arquitectura técnica del producto no cambia: backend, frontend, datos, contenedores, Kubernetes, OIDC y observabilidad se mantienen.
- Lo que cambia es la capa de plataforma DevOps: repositorio, tableros, CI/CD, artefactos, aprobaciones, gobierno y seguridad operativa.
- Sí es viable añadir Azure DevOps al curso actual sin rehacer todo.

## Mapa de equivalencias de plataforma
| Dominio | Ecosistema GitHub | Ecosistema Azure DevOps |
|---|---|---|
| Repositorio Git | GitHub Repos | Azure Repos |
| Planificación | Issues / Projects | Azure Boards |
| Pull Requests | PRs en GitHub | PRs en Azure Repos |
| CI/CD | GitHub Actions | Azure Pipelines |
| Secrets y variables | GitHub Secrets/Vars | Library, Variable Groups, Key Vault |
| Registro de imágenes | GHCR | Azure Container Registry (ACR) |
| Ambientes y aprobaciones | Environments + protection rules | Stages + Approvals + Checks |
| Seguridad de código | CodeQL / Dependabot | Defender for DevOps + SAST/Dependencies en pipeline |
| Paquetes | GitHub Packages | Azure Artifacts |

## Comparativa módulo por módulo

### Módulos que se mantienen casi iguales
- 01 Copilot
- 03 Codespaces/Dev Containers (ajustable a Dev Box opcional)
- 04 .NET 10
- 05 FastAPI
- 06 Next/React
- 07 Angular
- 10 Kubernetes/Helm
- 11 GitOps Argo CD
- 12 OIDC
- 13 Datos
- 14 Identidad federada
- 16 Observabilidad

Cambio esperado: 10% a 20% (solo referencias de tooling y ejemplos de integración).

### Módulos que sí deben tener versión GitHub y versión Azure DevOps
- 02 Plataforma de colaboración
- 08 Contenedores y registry
- 09 CI/CD y gobernanza de entregas

Cambio esperado: 60% a 80% (porque la plataforma es diferente en operación y sintaxis).

## Malla recomendada para curso único con dos tracks

### Bloque común
1. Fundamentos de arquitectura y desarrollo asistido por IA.
2. Backend, frontend, datos, Kubernetes, OIDC, observabilidad.

### Bloque de plataforma (bifurcación)
- Track A: GitHub (Actions, GHCR, Projects, Environments).
- Track B: Azure DevOps (Pipelines, ACR, Boards, Releases/Checks).

### Integrador
- Un solo proyecto final técnico.
- Dos pipelines alternativos para la misma solución (uno por track).

## Ventajas y desventajas por estrategia

### Opción A: Un solo curso con dos tracks
Ventajas:
- Menor duplicación de contenido técnico.
- Mayor valor para arquitectos que comparan plataformas.
- Más fácil mantener contenidos de backend/frontend/k8s/oidc.

Desventajas:
- Mayor complejidad pedagógica para principiantes.
- Hay que cuidar muy bien señalización de track por cada práctica.

### Opción B: Dos cursos separados
Ventajas:
- Narrativa más simple para cada audiencia.
- Menos confusión durante laboratorios.

Desventajas:
- Duplicación alta de material.
- Mayor costo de mantenimiento y sincronización de cambios.

## Recomendación concreta
Recomiendo Opción A (curso único con dos tracks), con esta estructura:
1. 75% contenido común.
2. 25% contenido bifurcado por plataforma.
3. Etiquetado visible por track en módulos y labs.

## Diseño de navegación sugerido
- En módulos/labs: prefijos [COMUN], [GITHUB], [AZDO].
- En ejercicios: secciones paralelas en el mismo archivo cuando sea corto.
- En temas largos (CI/CD): dos labs separados.

## Laboratorios nuevos a crear para track Azure DevOps
1. Lab AZDO-01: Azure Repos + Policies + Branching.
2. Lab AZDO-02: Azure Pipelines CI (backend/frontend/tests).
3. Lab AZDO-03: Build y push de imágenes a ACR.
4. Lab AZDO-04: CD a Kubernetes con aprobaciones por ambiente.
5. Lab AZDO-05: Integración Boards + PR + evidencias de release.

## Esfuerzo estimado de implementación
- Ajuste de estructura e índices: 1 a 2 días.
- Nuevos labs de plataforma Azure DevOps: 3 a 5 días.
- QA docente y pruebas de extremo a extremo: 2 a 3 días.

Total estimado: 6 a 10 días de trabajo de contenido.

## Criterios para decisión final
Elige curso único con dos tracks si:
- Tu audiencia es mixta (GitHub y Azure DevOps).
- Quieres maximizar reutilización del material.
- Quieres formar arquitectos con visión comparativa.

Elige cursos separados si:
- Tu audiencia está totalmente segmentada por plataforma.
- Tu operación docente requiere rutas completamente aisladas.

## Decisión recomendada para este bootcamp
- Mantener el bootcamp actual como base común.
- Añadir track Azure DevOps en módulos/labs de plataforma.
- Mantener un solo integrador técnico con dos rutas de entrega.
