# Prompts para Agentes con LangGraph (Python)

## Prompt principal
```text
Act as a Python AI engineer.
Build a LangGraph agent integrated into FastAPI for enrollment operations.
Requirements:
- explicit state graph
- tool node calling real backend endpoints
- conditional routing and loop control
- endpoint /agent/query
- structured logging and error handling
- secure model configuration via env vars

Return:
1. graph design
2. Python files and code
3. run and test commands
4. security checklist
```

## Prompt de depuracion
```text
Analyze this LangGraph execution trace and identify:
- wrong transitions
- tool call failures
- infinite loop risks
- latency hotspots

Return fixes with minimal file changes and validation steps.
```
