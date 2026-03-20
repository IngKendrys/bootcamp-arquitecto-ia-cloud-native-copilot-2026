# GitHub Copilot - Teoría

## ¿Qué es GitHub Copilot?

GitHub Copilot es un asistente de IA para desarrollo que ayuda a escribir código, pruebas, documentación y refactors directamente en el editor. Funciona con el contexto del proyecto para proponer soluciones más relevantes.

### ¿Para qué sirve en el bootcamp?

- Acelerar tareas repetitivas de codificación.
- Generar primeros borradores de funciones y componentes.
- Explicar código existente para aprender más rápido.
- Mejorar productividad con iteraciones cortas.

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **Prompt** | Instrucción que le das al asistente para orientar la respuesta |
| **Contexto** | Archivos, símbolos y fragmentos que Copilot usa para responder |
| **Autocompletado** | Sugerencias en línea mientras escribes código |
| **Copilot Chat** | Conversación para pedir cambios, explicación o generación |
| **Refactor** | Reorganización de código para mejor legibilidad/mantenibilidad |
| **Test Generation** | Generación asistida de pruebas unitarias o de integración |

---

## Comandos/acciones clave

### Uso diario

```text
1) Abrir Copilot Chat en VS Code.
2) Pedir una tarea concreta (ej: “genera servicio para auth”).
3) Revisar, ajustar y aplicar cambios en pequeños bloques.
4) Validar con build/test.
```

### Prompts útiles

```text
- “Explícame este archivo y su flujo principal.”
- “Genera pruebas para este servicio y cubre casos de error.”
- “Refactoriza este método para mejorar legibilidad sin cambiar comportamiento.”
- “Crea un resumen de cambios para documentación técnica.”
```

---

## Buenas prácticas

### 1. **Dar contexto claro**
- Indicar archivo, lenguaje y objetivo.
- Definir restricciones (por ejemplo: “no cambies API pública”).

### 2. **Trabajar en iteraciones cortas**
- Pedir cambios pequeños.
- Validar cada paso antes de continuar.

### 3. **Verificar siempre resultados**
- Ejecutar build/tests después de aplicar sugerencias.
- Revisar seguridad y manejo de errores.

### 4. **Usar Copilot como copiloto, no piloto automático**
- Mantener criterio técnico propio.
- Corregir o adaptar sugerencias al estándar del proyecto.

---

## Links útiles

- https://docs.github.com/en/copilot
- https://code.visualstudio.com/docs/copilot/overview
- https://code.visualstudio.com/docs/copilot/chat/copilot-chat

---

## Casos de uso

### Onboarding rápido
Entender código legado y arquitectura con prompts de explicación.

### Productividad en CRUD/APIs
Generar capas base (DTOs, servicios, controladores, validaciones).

### Calidad de código
Solicitar refactors y pruebas para mejorar mantenibilidad.

---


---

## Laboratorio

# Módulo 1 - GitHub Copilot Pro (Education)

**Dónde funciona**: VS Code (Chat/Edits/Inline), GitHub.com (PRs), Codespaces.  
**Beneficios**: acelera diseño, código, pruebas, documentación y revisiones.  
**Buenas prácticas**: no pegar secretos; revisar sugerencias; prompts con Rol/Contexto/Objetivo/Restricciones/Ejemplos.

## Primeros pasos
1. Verifica plan en https://github.com/settings/copilot  
2. VS Code -> instala extensiones **Copilot** y **Copilot Chat**.  
3. Abre el panel de **Copilot Chat** (`Ctrl+I`).

## Ejemplos de prompts
- Ver `docs/prompts/copilot-general.md`.
