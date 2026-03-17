# Ruta de Ejecución Día por Día

## Objetivo
Definir una ruta operacional clara para ejecutar el bootcamp según tu escenario:
1. Solo GitHub
2. Solo Azure DevOps
3. Ambos ecosistemas

Objetivo ampliado de esta version:
- Llegar al Lab 99 con un integrador obligatorio completo y funcionando de extremo a extremo.

## Cómo usar esta guía
1. Elige un escenario.
2. Sigue el plan diario en orden.
3. Cierra cada día con evidencias.
4. Usa el integrador final para validar extremo a extremo.

## Evidencia mínima diaria
- Build o pipeline exitoso
- Resultado funcional visible (API/UI/deploy)
- Registro de comandos ejecutados
- Incidentes y solución aplicada
- Uso de prompts Copilot aplicados (guardar prompts relevantes por dia)

---

## Ruta A - Solo GitHub

### Día 1 - Fundamentos y entorno
- Labs:
  - `00-setup-y-ruta.md`
  - `01-copilot.md`
  - `02-codespaces.md`
- Resultado esperado:
  - Entorno estable y flujo de trabajo activo
  - Evidencia de prompts y productividad

### Día 2 - Backend y frontend base
- Labs:
  - `03-dotnet10-api.md`
  - `04-fastapi.md`
  - `05-next16.md`
- Resultado esperado:
  - APIs funcionales
  - Frontend consumiendo backend

### Día 3 - Frontend alterno y contenedores
- Labs:
  - `06-angular21.md`
  - `07-docker-ghcr.md`
- Resultado esperado:
  - Frontend Angular activo
  - Imágenes publicadas en GHCR

### Día 4 - CI/CD en GitHub
- Labs:
  - `08-actions.md`
  - `17-reusables-environments.md`
- Resultado esperado:
  - Pipelines verdes
  - Flujo dev/stage/prod con reglas

### Día 5 - Plataforma cloud
- Labs:
  - `09-k8s-helm.md`
  - `10-argocd.md`
- Resultado esperado:
  - Deploy en Kubernetes
  - Sincronización GitOps

### Día 6 - Seguridad y datos
- Labs:
  - `11-oidc.md`
  - `12-data-at-scale.md`
  - `13-efcore-migrations.md`
- Resultado esperado:
  - OIDC operativo
  - Pruebas de rendimiento y migraciones

### Día 7 - Avanzado y cierre
- Labs:
  - `14-alembic-fastapi.md`
  - `15-nextauth-oidc.md`
  - `16-observabilidad.md`
  - `18-sso-oidc-entra-google-keycloak.md`
  - Inicio `99-proyecto-integrador.md` (fases 1 a 4)
- Resultado esperado:
  - SSO multi-proveedor validado
  - Integrador en ejecucion con core, web y seguridad

### Día 8 - Capacidades avanzadas obligatorias del integrador
- Labs:
  - `19-nestjs-api.md`
  - `20-ai-agents-microsoft.md`
  - `21-ai-agents-langgraph.md`
  - `22-mobile-reactnative.md`
  - `23-mobile-native-kotlin-swift.md`
- Resultado esperado:
  - Agentes IA funcionando con datos reales
  - Web y mobile conectados al mismo backend

### Día 9 - Integracion enterprise y cierre total
- Labs:
  - `24-mensajeria-redis-azure-queue.md`
  - `25-kafka-event-streaming.md`
  - `26-azure-apim.md`
  - `99-proyecto-integrador.md` (fases 5 a cierre)
- Resultado esperado:
  - Mensajeria + APIM operativos
  - Integrador final 100% completo

---

## Ruta B - Solo Azure DevOps

### Día 1 - Fundamentos y entorno
- Labs:
  - `00-setup-y-ruta.md`
  - `01-copilot.md`
  - `02-codespaces.md`
- Resultado esperado:
  - Entorno listo
  - Organización/proyecto Azure DevOps preparado

### Día 2 - Construcción técnica base
- Labs:
  - `03-dotnet10-api.md`
  - `04-fastapi.md`
  - `05-next16.md`
- Resultado esperado:
  - Solución funcional para alimentar pipelines

### Día 3 - Frontend alterno y base de contenedores
- Labs:
  - `06-angular21.md`
  - `09-k8s-helm.md`
- Resultado esperado:
  - Servicios listos para despliegue

### Día 4 - Azure Repos y gobernanza
- Labs:
  - `azdo-01-repos-policies.md`
- Resultado esperado:
  - Policies y PR flow activos

### Día 5 - Azure Pipelines CI
- Labs:
  - `azdo-02-pipelines-ci.md`
- Resultado esperado:
  - Build/test continuo operativo

### Día 6 - ACR y CD a Kubernetes
- Labs:
  - `azdo-03-acr-images.md`
  - `azdo-04-cd-k8s-approvals.md`
- Resultado esperado:
  - Imágenes en ACR
  - Deploy con aprobaciones por ambiente

### Día 7 - Trazabilidad, seguridad e inicio de integrador
- Labs:
  - `azdo-05-boards-traceability.md`
  - `11-oidc.md`
  - `18-sso-oidc-entra-google-keycloak.md`
  - `16-observabilidad.md`
  - Inicio `99-proyecto-integrador.md` (fases 1 a 4)
- Resultado esperado:
  - Work item a release trazable
  - Integrador base operativo en track Azure DevOps

### Día 8 - Capacidades avanzadas obligatorias
- Labs:
  - `19-nestjs-api.md`
  - `20-ai-agents-microsoft.md`
  - `21-ai-agents-langgraph.md`
  - `22-mobile-reactnative.md`
  - `23-mobile-native-kotlin-swift.md`
- Resultado esperado:
  - Agentes IA y mobile integrados

### Día 9 - Integracion enterprise y cierre total
- Labs:
  - `24-mensajeria-redis-azure-queue.md`
  - `25-kafka-event-streaming.md`
  - `26-azure-apim.md`
  - `99-proyecto-integrador.md` (fases 5 a cierre)
- Resultado esperado:
  - Integrador final 100% completo en track Azure DevOps

---

## Ruta C - Ambos ecosistemas (comparativa)

### Día 1
- `00-setup-y-ruta.md`, `01-copilot.md`, `02-codespaces.md`
- Salida: baseline común

### Día 2
- `03-dotnet10-api.md`, `04-fastapi.md`, `05-next16.md`, `06-angular21.md`
- Salida: producto común funcional

### Día 3
- `07-docker-ghcr.md`, `09-k8s-helm.md`, `10-argocd.md`
- Salida: arquitectura cloud base desplegable

### Día 4
- Track GitHub: `08-actions.md`, `17-reusables-environments.md`
- Salida: pipeline GitHub completo

### Día 5
- Track Azure DevOps: `azdo-01-repos-policies.md`, `azdo-02-pipelines-ci.md`
- Salida: pipeline Azure DevOps CI completo

### Día 6
- Track Azure DevOps: `azdo-03-acr-images.md`, `azdo-04-cd-k8s-approvals.md`, `azdo-05-boards-traceability.md`
- Salida: release Azure DevOps completo

### Día 7
- `11-oidc.md`, `15-nextauth-oidc.md`, `18-sso-oidc-entra-google-keycloak.md`, `12-data-at-scale.md`, `16-observabilidad.md`
- Salida: seguridad, datos y operación cerrados

### Día 8
- `19-nestjs-api.md`, `20-ai-agents-microsoft.md`, `21-ai-agents-langgraph.md`
- Salida: capacidades IA y backend complementario integradas

### Día 9
- `22-mobile-reactnative.md`, `23-mobile-native-kotlin-swift.md`
- Salida: canales mobile conectados y validados

### Día 10
- `24-mensajeria-redis-azure-queue.md`, `25-kafka-event-streaming.md`, `26-azure-apim.md`
- Salida: capa enterprise operativa

### Día 11
- `99-proyecto-integrador.md`
- Salida: comparacion final GitHub vs Azure DevOps sobre el mismo integrador completo

---

## Definition of Done por día
- [ ] Objetivos diarios completados
- [ ] Evidencias registradas en markdown
- [ ] Estado funcional verificable
- [ ] Cambios versionados
- [ ] Prompt Copilot usado y ajustado para la tarea del dia

## Recomendación final
Si tu tiempo es limitado:
1. Ejecuta primero Ruta A o Ruta B.
2. Completa luego la otra ruta solo en módulos de plataforma.
3. No omitas labs 19 a 26: son parte del integrador obligatorio.
4. Cierra siempre con el integrador final completo del Lab 99.

## Cierre oficial del curso (inicio a fin)
El curso se considera completado solo cuando se cumple este orden de cierre:
1. Setup y bases tecnicas
2. Core de producto (backend/frontend)
3. Entrega cloud (docker, CI/CD, K8s, GitOps)
4. Seguridad y operacion
5. Capacidades avanzadas (agentes, mobile, mensajeria, APIM)
6. Integrador E2E obligatorio con evidencia completa
