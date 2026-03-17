# Lab 20 - Agentes con Microsoft Semantic Kernel y Azure AI Foundry

## Objetivo
Construir un agente funcional usando Semantic Kernel (.NET) que ejecute herramientas
reales del sistema del bootcamp, e integrarlo como endpoint HTTP en la API .NET existente.

## Prerrequisitos
- Lab 03 (.NET 10 API) completado.
- .NET 10 SDK instalado.
- Acceso a Azure OpenAI (recurso activo en Azure) o clave de OpenAI compatible.
- Variables de entorno configuradas (no claves en código).

## Arquitectura del agente

```
HTTP Request
    │
    ▼
AgentController (.NET)
    │
    ▼
Semantic Kernel (Kernel + Planner)
    │
    ├──► Tool: GetActiveUsers  → llama UsersService
    ├──► Tool: SummarizeData   → procesa resultado
    └──► Tool: FormatReport    → formatea respuesta final
    │
    ▼
HTTP Response (reporte generado por el agente)
```

## Paso a paso

### 1. Crear proyecto de agente
```bash
cd templates/dotnet10-api/src
dotnet new console -n AiAgent
cd AiAgent
```

### 2. Instalar paquetes Semantic Kernel
```bash
dotnet add package Microsoft.SemanticKernel
dotnet add package Microsoft.SemanticKernel.Connectors.OpenAI
dotnet add package Microsoft.Extensions.Configuration.EnvironmentVariables
```

### 3. Configurar el Kernel con Azure OpenAI
```csharp
var kernel = Kernel.CreateBuilder()
    .AddAzureOpenAIChatCompletion(
        deploymentName: Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT")!,
        endpoint: Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")!,
        apiKey: Environment.GetEnvironmentVariable("AZURE_OPENAI_KEY")!)
    .Build();
```

### 4. Definir herramientas (Plugins)
```csharp
public class UsersPlugin
{
    [KernelFunction("get_active_users")]
    [Description("Returns a list of currently active users in the system")]
    public async Task<string> GetActiveUsers()
    {
        // Llama al servicio real o al endpoint HTTP interno
        return JsonSerializer.Serialize(await _usersService.GetActiveAsync());
    }

    [KernelFunction("summarize_users")]
    [Description("Summarizes user statistics: total, active, inactive")]
    public string SummarizeUsers([Description("JSON list of users")] string usersJson)
    {
        var users = JsonSerializer.Deserialize<List<User>>(usersJson)!;
        return $"Total: {users.Count}, Active: {users.Count(u => u.IsActive)}";
    }
}
```

### 5. Registrar plugin y ejecutar agente
```csharp
kernel.Plugins.AddFromType<UsersPlugin>();

var settings = new OpenAIPromptExecutionSettings
{
    ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions
};

var result = await kernel.InvokePromptAsync(
    "Give me a summary report of active users in the system.",
    new KernelArguments(settings));

Console.WriteLine(result);
```

### 6. Integrar como endpoint HTTP en la API .NET existente
Agregar al controlador existente:
```csharp
[HttpPost("agent/report")]
public async Task<IActionResult> GenerateReport([FromBody] AgentRequest request)
{
    var result = await _agentService.RunAsync(request.Prompt);
    return Ok(new { report = result.ToString() });
}
```

### 7. Probar el agente
```bash
dotnet run
# Llamar al endpoint:
curl -X POST http://localhost:5000/agent/report \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Summarize the active users in the system"}'
```

## Variables de entorno requeridas
```env
AZURE_OPENAI_ENDPOINT=https://tu-recurso.openai.azure.com/
AZURE_OPENAI_KEY=tu-clave-aqui
AZURE_OPENAI_DEPLOYMENT=gpt-4o
```
**Nunca hardcodear claves. Usar variables de entorno o Azure Key Vault.**

## Validación
- El agente responde con un reporte basado en datos reales del sistema.
- `get_active_users` se llama automáticamente cuando el prompt lo requiere.
- El log muestra qué tools fueron invocadas y con qué parámetros.
- El endpoint HTTP responde con 200 y el reporte generado.
- Sin claves en el código fuente (validar con `git grep -i "sk-\|apikey\|password"`).

## Seguridad obligatoria
- Validar y sanitizar el `prompt` recibido por HTTP antes de enviarlo al agente.
- Limitar las tools disponibles al mínimo necesario (principio de mínimo privilegio).
- Registrar en logs cada invocación de tool: qué se llamó, con qué input, qué devolvió.

## Rúbrica
- 40% flujo de agente funcional con tool calling real.
- 30% integración como endpoint HTTP en la API existente.
- 30% seguridad (sin claves hardcodeadas) y evidencia de logs.

## Entregables
- Código en rama `lab-20`.
- EVIDENCIAS.md con:
  - Log de ejecución mostrando qué tools invocó el agente.
  - Respuesta HTTP del endpoint `/agent/report`.
  - Captura de variables de entorno configuradas (sin mostrar valores).
