# Prompts para Observabilidad

## Prompt principal
```text
Act as SRE lead.
Create an observability plan for this platform with:
- golden signals (latency, traffic, errors, saturation)
- app metrics for API, workers, queues and agents
- Prometheus scrape config guidelines
- Grafana dashboards (service, business, async)
- alerting thresholds and runbooks

Return:
1. metric catalog
2. dashboard blueprint
3. alert rules
4. incident response checklist
```

## Prompt de investigacion de incidente
```text
Given these logs and metrics, perform incident triage:
- probable root causes
- impact scope
- immediate mitigations
- permanent corrective actions

Return a postmortem template with action owners.
```
