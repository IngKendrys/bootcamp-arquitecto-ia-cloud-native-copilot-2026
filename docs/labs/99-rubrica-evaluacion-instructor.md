# Lab 99B - Rubrica de Evaluacion Docente del Integrador

## Objetivo
Evaluar de forma consistente el proyecto integrador E2E con criterios tecnicos, operativos, de seguridad y demo final.

## Alcance
Esta rubrica aplica al cierre del Lab 99 y al entregable final del bootcamp.

## Modelo de evaluacion (100%)
1. Tecnica: 45%
2. Operativa: 25%
3. Seguridad: 20%
4. Demo final: 10%

## Reglas de aprobacion
1. Nota global minima: 80/100.
2. Minimo por bloque critico:
   - Tecnica >= 32/45
   - Seguridad >= 14/20
3. Criterios eliminatorios:
   - No existe flujo E2E funcional.
   - No hay evidencia de control de acceso (OIDC/JWT/roles).
   - No hay evidencia de CI/CD verde.
   - Falta evidencia de mensajeria y APIM en operacion.

## Escala de puntaje por criterio
- 0: no implementado
- 1: implementado parcial, sin evidencia reproducible
- 2: implementado funcional con evidencia minima
- 3: implementado robusto, reproducible y bien documentado

Formula sugerida por criterio:
- Puntaje criterio = (valor 0-3 / 3) x peso del criterio

## Bloque 1 - Tecnica (45%)

### 1.1 Dominio y reglas de negocio (10%)
- Criterios:
  - Entidades clave implementadas (users, courses, enrollments).
  - Reglas de negocio aplicadas y validadas.
- Evidencia:
  - Endpoints funcionales + pruebas.

### 1.2 Arquitectura y modularidad (8%)
- Criterios:
  - Separacion clara de responsabilidades.
  - Contratos API/eventos coherentes.
- Evidencia:
  - Diagrama de arquitectura + ADR.

### 1.3 Integracion multicanal (9%)
- Criterios:
  - Web funcional.
  - React Native funcional.
  - Android nativo funcional.
- Evidencia:
  - Capturas/video + logs de consumo API.

### 1.4 Agentes IA en produccion tecnica (8%)
- Criterios:
  - Semantic Kernel operativo en .NET.
  - LangGraph operativo en FastAPI.
  - Tool calling sobre datos reales.
- Evidencia:
  - Logs de invocacion de tools.

### 1.5 Calidad de codigo y pruebas (10%)
- Criterios:
  - Pruebas unitarias/integracion en servicios principales.
  - Cobertura razonable y pipeline en verde.
- Evidencia:
  - Reportes de test y coverage.

## Bloque 2 - Operativa (25%)

### 2.1 CI/CD y versionado de artefactos (10%)
- Criterios:
  - Pipelines build/test/lint.
  - Publicacion de imagenes versionadas.
- Evidencia:
  - Ejecuciones exitosas de workflows/pipelines.

### 2.2 Kubernetes + Helm + GitOps (8%)
- Criterios:
  - Deploy por Helm con values por ambiente.
  - Estado Synced/Healthy en Argo CD.
- Evidencia:
  - Capturas de cluster y Argo CD.

### 2.3 Mensajeria y streaming (7%)
- Criterios:
  - Redis Streams, Azure Queue y Kafka operativos.
  - Retry e idempotencia demostrables.
- Evidencia:
  - Logs productor/consumidor + trazabilidad de eventos.

## Bloque 3 - Seguridad (20%)

### 3.1 Identidad y autorizacion (10%)
- Criterios:
  - OIDC/SSO funcional.
  - Politicas por rol y respuestas 401/403 correctas.
- Evidencia:
  - Pruebas por rol + flujos de login.

### 3.2 API Management y politicas (6%)
- Criterios:
  - APIs publicadas en APIM.
  - Politicas de auth y rate limit activas.
- Evidencia:
  - Configuracion APIM + pruebas de politicas.

### 3.3 Seguridad operativa basica (4%)
- Criterios:
  - Sin secretos hardcodeados.
  - Buenas practicas de configuracion minima.
- Evidencia:
  - Revision de configuracion y checklist.

## Bloque 4 - Demo final (10%)

### 4.1 Narrativa tecnica y trazabilidad (4%)
- Criterios:
  - Presenta arquitectura y decisiones.
  - Relaciona requerimiento -> implementacion -> evidencia.

### 4.2 Demostracion E2E en vivo (4%)
- Criterios:
  - Flujo principal ejecutado sin ruptura.
  - Visibilidad de CI/CD, K8s y observabilidad.

### 4.3 Manejo de preguntas y riesgos (2%)
- Criterios:
  - Explica trade-offs.
  - Presenta backlog de mejoras realista.

## Checklist de evidencias obligatorias
- [ ] README-PROYECTO.md completo
- [ ] ADR y diagrama de arquitectura
- [ ] EVIDENCIAS-INTEGRADOR.md por fases
- [ ] Pruebas y pipelines en verde
- [ ] Evidencia web + mobile
- [ ] Evidencia OIDC/SSO + roles
- [ ] Evidencia Redis + Azure Queue + Kafka
- [ ] Evidencia APIM con politicas
- [ ] Evidencia agentes IA con tool calling
- [ ] Dashboard Prometheus/Grafana

## Formato de acta de evaluacion (sugerido)
1. Equipo:
2. Fecha:
3. Evaluadores:
4. Puntaje por bloque:
   - Tecnica:
   - Operativa:
   - Seguridad:
   - Demo final:
5. Nota total:
6. Estado: Aprobado / Pendiente
7. Hallazgos criticos:
8. Plan de cierre (si aplica):

## Uso recomendado con Copilot
Para preparar la evaluacion y autoevaluacion del equipo:
1. Usa prompts de `docs/prompts/proyecto-integrador-e2e.md`.
2. Ejecuta una autoevaluacion previa 24h antes de la demo final.
3. Corrige gaps antes de la presentacion oficial.
