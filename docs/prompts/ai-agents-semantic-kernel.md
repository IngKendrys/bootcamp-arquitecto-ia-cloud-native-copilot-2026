# Prompts para Agentes con Semantic Kernel (.NET)

## Prompt principal
```text
Act as an AI engineer specialized in Semantic Kernel.
Integrate a Semantic Kernel agent into an existing .NET 10 API.
Requirements:
- kernel with Azure OpenAI chat completion
- plugins/tools for real data access (users, enrollments, metrics)
- auto tool calling
- endpoint POST /agent/report
- prompt input validation and tool invocation logging
- secure env var configuration

Return:
1. architecture summary
2. code by file
3. security checks
4. test and curl commands
```

## Prompt de guardrails
```text
Create guardrails for this Semantic Kernel agent:
- prompt injection mitigation
- tool scope restrictions
- output redaction for sensitive data
- abuse limits and audit logging

Return code and policy checklist.
```
