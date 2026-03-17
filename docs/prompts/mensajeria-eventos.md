# Prompts para Mensajeria Asincrona y Event Streaming

## Prompt principal
```text
Act as distributed systems engineer.
Design and implement async messaging for enrollment domain using:
- Redis Streams for lightweight async processing
- Azure Queue Storage for deferred tasks
- Kafka for business events and analytics

Include:
- producer and consumer code patterns
- retry strategy and dead-letter handling
- idempotency keys
- observability metrics per queue/topic

Return:
1. architecture flow
2. code snippets by component
3. failure scenarios and mitigations
4. validation checklist
```

## Prompt de pruebas de resiliencia
```text
Create a resilience test plan for this messaging stack:
- duplicate messages
- out-of-order events
- consumer crashes
- temporary network failures

Return expected behavior and pass/fail criteria.
```
