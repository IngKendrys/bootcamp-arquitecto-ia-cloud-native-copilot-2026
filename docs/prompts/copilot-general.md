# Prompts generales de GitHub Copilot

Usa estas plantillas en VS Code Chat para acelerar cualquier laboratorio.

## Prompt 1 - Analisis de arquitectura de repo

```text
Actua como Arquitecto Cloud senior.
Analiza este repositorio y entrega en formato markdown:
1. Mapa de componentes (backend, frontend, mobile, data, infra, pipelines).
2. Diagrama textual de alto nivel (C4 simplificado).
3. Riesgos priorizados (seguridad, performance, disponibilidad, costo).
4. Mitigaciones concretas con orden recomendado.
5. Plan de implementacion en 10 pasos con Definition of Done por paso.
6. Tabla de metricas de exito (baseline, objetivo, como medir).

Condiciones:
- No inventes componentes que no existan.
- Si falta informacion, indicalo como gap con accion propuesta.
```

## Prompt 2 - Generacion de README tecnico

```text
Genera o mejora el README tecnico del proyecto con esta estructura:
1. Objetivo funcional y alcance.
2. Arquitectura y decisiones clave.
3. Requisitos y setup local.
4. Variables de entorno por servicio.
5. Ejecucion local con Docker Compose.
6. Pruebas, lint y comandos utiles.
7. CI/CD y estrategia de despliegue.
8. Seguridad (OIDC, JWT, secretos).
9. Observabilidad (metricas, logs, dashboards).
10. Troubleshooting de errores frecuentes.

Devuelve contenido listo para pegar en markdown.
```

## Prompt 3 - Plan de pruebas E2E

```text
Actua como QA lead.
Disena un plan de pruebas E2E para este proyecto con:
1. Matriz de escenarios criticos.
2. Casos positivos/negativos por rol.
3. Pruebas de API, UI y mobile.
4. Pruebas de mensajeria/eventos.
5. Pruebas de resiliencia (timeouts, retries, idempotencia).
6. Evidencias esperadas para aprobar release.

Incluye criterios de salida (go/no-go).
```

## Prompt 4 - Hardening previo a produccion

```text
Actua como Security reviewer.
Revisa este proyecto y propone un hardening previo a produccion:
1. Hallazgos por severidad (critical/high/medium/low).
2. Cambios de configuracion recomendados.
3. Riesgos de secretos, auth, CORS, headers, supply chain.
4. Checklist final de seguridad ejecutable.

Incluye ejemplos de codigo o YAML donde aplique.
```

