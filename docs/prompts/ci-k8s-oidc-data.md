# Prompts CI/CD, K8s, OIDC y Datos

## 1) Pipeline reutilizable (GitHub Actions)

```text
Write a reusable GitHub Actions pipeline for a monorepo with:
- .NET 10 API, FastAPI service, Next 16 frontend
- cache strategy for dotnet, pip and npm
- test jobs with coverage upload
- docker buildx multi-arch and push to GHCR
- deploy job to Kubernetes via Helm
- environments: dev, stage, prod with required approvals

Return:
1. workflow YAML
2. required secrets and variables table
3. rollback steps
4. common failure troubleshooting
```

## 2) Kubernetes + Helm hardening

```text
Create production-ready Kubernetes manifests (or Helm templates) for API + Web + Worker.
Include:
- readiness/liveness/startup probes
- resource requests/limits
- HPA
- PodDisruptionBudget
- ingress with TLS
- config and secrets strategy

Return also:
1. validation checklist
2. canary or blue/green rollout suggestion
3. rollback playbook
```

## 3) OIDC end-to-end (web + backend)

```text
Provide end-to-end OIDC setup with:
- .NET 10 JwtBearer (issuer/audience/scopes)
- NextAuth OIDC config for Next.js 16 with PKCE
- role-based authorization policies (admin/teacher/student)
- secure token handling guidance

Add a concise threat model (STRIDE-lite) and mitigations.
```

## 4) Datos a escala en PostgreSQL

```text
Design PostgreSQL schema for users/courses/enrollments/events with:
- PK/FK constraints
- indexes for critical queries
- migration strategy
- seed scripts for at least 100k rows
- benchmark plan (baseline, target, method)

Return SQL snippets and expected performance indicators.
```
