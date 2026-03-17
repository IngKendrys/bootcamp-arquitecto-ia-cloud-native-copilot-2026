# Prompts para Proyecto Integrador E2E Obligatorio

## Prompt 1 - Arquitectura final del integrador
```text
Act as principal architect.
Design the final architecture for Enrollment Hub 360 including:
- .NET core API, FastAPI auxiliary service, web frontend, React Native, Android
- PostgreSQL, Redis, Azure Queue, Kafka
- OIDC/SSO, APIM
- CI/CD + Kubernetes + Helm + Argo CD
- Semantic Kernel and LangGraph agents

Return:
1. architecture diagram in text
2. service boundaries and contracts
3. critical risks and mitigations
4. phased implementation plan with DoD
```

## Prompt 2 - Checklist de cierre 100%
```text
Act as technical auditor.
Evaluate this repository against a full end-to-end Definition of Done.
Check:
- functional flows
- security and auth
- mobile channels
- async messaging and events
- APIM governance
- observability
- CI/CD and deployment health

Return:
1. pass/fail by capability
2. missing evidence list
3. exact actions to close gaps
```

## Prompt 3 - Script de demo final
```text
Create a 20-minute final demo script for this integrator.
Include:
- sequence of screens/endpoints
- what to show in pipelines and K8s
- what to show in APIM and dashboards
- fallback plan if a component fails live

Return a step-by-step script with expected evidence per step.
```
