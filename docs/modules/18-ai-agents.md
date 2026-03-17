# Agentes de IA: Microsoft Semantic Kernel + LangGraph

## ¿Qué es un agente de IA?
Un agente es un sistema que percibe contexto, razona usando un modelo de lenguaje y actúa
ejecutando herramientas (APIs, bases de datos, servicios externos) para completar tareas
complejas de forma autónoma o semi-autónoma, en uno o varios pasos.

## ¿Solo sirven para chatbot?
No. El chatbot es el caso de uso más visible pero el de menor complejidad.
Los agentes en producción hacen mucho más:

| Caso de uso | Descripción |
|---|---|
| Automatización de flujos | Aprobaciones, clasificación, asignación automática de tickets |
| Tool calling contra sistemas reales | Consultar APIs internas, ejecutar queries SQL, llamar GitHub/JIRA |
| SRE copilots | Análisis de incidentes, runbooks automáticos, alertas contextuales |
| Dev automation | Revisión de PRs, generación de pruebas, actualización de documentación |
| Asistentes de producto | Consultas multi-step con memoria y contexto persistente |
| Pipelines de datos inteligentes | ETL orquestado por decisiones del modelo |

## Track A: Microsoft Semantic Kernel + Azure AI Foundry

### ¿Qué es?
- **Semantic Kernel**: SDK open source (Microsoft) para integrar LLMs con código .NET o Python.
- **Azure AI Foundry**: plataforma de orquestación y despliegue de agentes en Azure.

### Modelos disponibles
- Azure OpenAI: GPT-4o, GPT-4.1, o1.
- Microsoft: Phi-4 (modelo pequeño, alto rendimiento, ideal para inferencia local o edge).
- Terceros via Azure AI: Mistral, Cohere, Meta Llama.

### Ventajas en contexto del bootcamp
- Integración nativa con el stack .NET ya construido.
- Seguridad enterprise: Azure Key Vault, Managed Identity, RBAC.
- Sin necesidad de enviar datos fuera del tenant Azure.
- Trazabilidad en Azure Monitor y Application Insights.

### Conceptos clave
- **Plugin / Tool**: función de código expuesta al modelo para que la llame.
- **Planner**: componente que decide qué tools invocar y en qué orden.
- **Memory**: contexto persistente entre llamadas.
- **Kernel**: orquestador central que conecta modelo, tools y memoria.

## Track B: LangGraph

### ¿Qué es?
Framework open source de LangChain para construir agentes con flujo explícito basado en grafos de estados.

### ¿Por qué es el segundo stack más relevante?
- Alta tracción en equipos de producción a marzo 2026 (no solo demos).
- Agnóstico de proveedor: OpenAI, Azure OpenAI, Anthropic, Gemini, modelos locales.
- Control total del flujo: nodos, aristas condicionales, ciclos, memoria de corto y largo plazo.
- Muy buenas críticas para agentes multi-step y orquestación compleja.

### Ventajas en contexto del bootcamp
- Complementa Microsoft: se puede usar LangGraph sobre Azure OpenAI.
- Encaja con el stack Python FastAPI ya construido.
- Mucho más flexible para flujos con ramificaciones y ciclos que Semantic Kernel solo.

### Conceptos clave
- **StateGraph**: grafo donde cada nodo modifica el estado compartido del agente.
- **Node**: función que procesa el estado y devuelve uno nuevo.
- **Edge condicional**: decide el próximo nodo según el resultado del anterior.
- **ToolNode**: nodo especializado para ejecutar herramientas.
- **Checkpointer**: mecanismo de memoria y persistencia entre invocaciones.

## Comparativa Microsoft vs LangGraph

| Criterio | Semantic Kernel / Azure AI Foundry | LangGraph |
|---|---|---|
| Integración Azure | Nativa y profunda | Via adaptadores LangChain |
| Lenguajes principales | .NET, Python | Python, JS/TS |
| Control de flujo | Moderado (Planner automático) | Muy avanzado (grafos explícitos) |
| Multi-modelo / multi-proveedor | Sí | Sí (más agnóstico) |
| Curva de inicio | Baja (SDK guiado) | Media (requiere diseñar el grafo) |
| Transparencia del flujo | Media | Alta (el grafo es visible y debuggeable) |
| Uso en producción enterprise | Fuerte en entornos MS | Amplio, agnóstico de organización |

## Seguridad en agentes (OWASP LLM Top 10)
Los agentes con tool calling tienen riesgos específicos:
- **Prompt injection**: un input malicioso puede redirigir al agente a ejecutar tools no deseadas.
- **Excessive agency**: darle al agente permisos o tools más amplios de los necesarios.
- **Insecure tool execution**: tools que ejecutan comandos del sistema sin validación de entrada.

Buenas prácticas aplicadas en los labs:
- Principio de mínimo privilegio en tools.
- Validación de parámetros antes de ejecutar cualquier tool.
- Sin claves hardcodeadas: variables de entorno o Azure Key Vault.
- Logging de cada invocación de tool con input y output.

## Paso a paso general
1. Definir qué herramientas (tools/functions) necesita el agente.
2. Configurar el modelo base y sus credenciales por variable de entorno.
3. Diseñar el flujo: ¿lineal o con ramificaciones?
4. Implementar las tools con validación de entrada.
5. Conectar el agente como endpoint HTTP al resto del stack.
6. Probar con casos de uso reales del proyecto integrador.

**Ver lab20-ai-agents-microsoft.md y lab21-ai-agents-langgraph.md**.
