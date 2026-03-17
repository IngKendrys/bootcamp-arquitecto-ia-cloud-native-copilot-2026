# Lab 21 - Agentes con LangGraph (Python + FastAPI)

## Objetivo
Construir un agente orquestado con LangGraph que gestione estados explícitos, decida
qué herramientas ejecutar y exponga el resultado como endpoint FastAPI.

## Prerrequisitos
- Lab 04 (FastAPI) completado.
- Python 3.12+ instalado.
- Acceso a Azure OpenAI, OpenAI o modelo local compatible con la API de OpenAI.
- Variables de entorno configuradas.

## Arquitectura del agente LangGraph

```
HTTP POST /agent/query
    │
    ▼
AgentRouter (FastAPI)
    │
    ▼
StateGraph (LangGraph)
  ┌─────────────────────────┐
  │  call_llm               │◄─── Entrada del usuario
  │      │                  │
  │      ▼ (si tool_calls)  │
  │  run_tools              │
  │      │                  │
  │      ▼ (loop/fin)       │
  │  Eval�ate_result        │
  └─────────────────────────┘
    │
    ▼
Respuesta final al usuario
```

## Paso a paso

### 1. Instalar dependencias
```bash
cd templates/fastapi
pip install langgraph langchain langchain-openai langchain-community
pip install python-dotenv
```

### 2. Definir las herramientas del agente
Crear `src/agent/tools.py`:
```python
from langchain_core.tools import tool
import httpx

@tool
def get_active_users() -> str:
    """Returns a list of active users from the system API."""
    response = httpx.get("http://localhost:5000/users?active=true")
    response.raise_for_status()
    return response.text

@tool
def get_user_count() -> str:
    """Returns the total count of registered users."""
    response = httpx.get("http://localhost:5000/users/count")
    response.raise_for_status()
    return response.text
```

### 3. Construir el grafo de estados
Crear `src/agent/graph.py`:
```python
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langchain_openai import AzureChatOpenAI
from .tools import get_active_users, get_user_count
from typing import TypedDict, Annotated
import operator

class AgentState(TypedDict):
    messages: Annotated[list, operator.add]

tools = [get_active_users, get_user_count]
llm = AzureChatOpenAI(
    azure_deployment=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    api_version="2025-01-01-preview"
).bind_tools(tools)

def call_llm(state: AgentState):
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

def should_continue(state: AgentState):
    last = state["messages"][-1]
    return "run_tools" if last.tool_calls else END

tool_node = ToolNode(tools)

graph = StateGraph(AgentState)
graph.add_node("call_llm", call_llm)
graph.add_node("run_tools", tool_node)
graph.set_entry_point("call_llm")
graph.add_conditional_edges("call_llm", should_continue)
graph.add_edge("run_tools", "call_llm")

agent = graph.compile()
```

### 4. Exponer el agente como endpoint FastAPI
Agregar en `src/main.py` (o un router dedicado):
```python
from fastapi import APIRouter
from .agent.graph import agent
from langchain_core.messages import HumanMessage

router = APIRouter(prefix="/agent", tags=["agent"])

@router.post("/query")
async def query_agent(prompt: str):
    result = await agent.ainvoke({"messages": [HumanMessage(content=prompt)]})
    return {"response": result["messages"][-1].content}
```

### 5. Ejecutar y probar
```bash
uvicorn src.main:app --reload --port 8000

# Probar el agente:
curl -X POST "http://localhost:8000/agent/query?prompt=How%20many%20active%20users%20are%20there%3F"
```

### 6. Verificar el grafo visualmente (opcional)
```python
from IPython.display import Image
Image(agent.get_graph().draw_mermaid_png())
```

## Variables de entorno requeridas
```env
AZURE_OPENAI_ENDPOINT=https://tu-recurso.openai.azure.com/
AZURE_OPENAI_KEY=tu-clave-aqui
AZURE_OPENAI_DEPLOYMENT=gpt-4o
OPENAI_API_VERSION=2025-01-01-preview
```

## Validación
- El grafo ejecuta el nodo `call_llm` en la entrada.
- Cuando el LLM decide usar una tool, el nodo `run_tools` se ejecuta correctamente.
- El ciclo termina en el estado `END` con una respuesta coherente.
- `GET /agent/query` responde con 200 y el texto generado por el agente.
- Las tools usan datos reales del sistema (no datos inventados).

## Seguridad obligatoria
- Input del usuario sanitizado antes de enviarse al LLM.
- Tools con validación de parámetros de entrada.
- Sin claves en código: solo variables de entorno.
- Limitar tools al scope mínimo necesario.

## Rúbrica
- 40% grafo funcional con estados, nodos y arista condicional.
- 30% tool calling con datos reales y loop correcto.
- 30% exposición como endpoint FastAPI, seguridad y evidencia.

## Entregables
- Código en rama `lab-21`.
- EVIDENCIAS.md con:
  - Diagrama Mermaid del grafo (texto o imagen).
  - Log de ejecución mostrando los nodos recorridos.
  - Respuesta HTTP del endpoint `/agent/query`.
