# .NET 10 Web API - Teoría

## ¿Qué es una Web API en .NET?

Una Web API en ASP.NET Core expone endpoints HTTP para ejecutar reglas de negocio, autenticación y operaciones CRUD con un diseño escalable y mantenible.

### ¿Para qué sirve en el bootcamp?

- Construir backend robusto para frontend web y móvil.
- Implementar autenticación basada en JWT.
- Persistir datos con EF Core y base relacional.
- Aplicar arquitectura por capas.

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **ASP.NET Core** | Framework para APIs y apps web en .NET |
| **Controller** | Componente que define endpoints HTTP |
| **DTO** | Objeto de transferencia para request/response |
| **Dependency Injection** | Inyección de dependencias nativa del framework |
| **EF Core** | ORM para mapear objetos a base de datos |
| **JWT** | Token firmado para autenticación/autorización |

---

## Comandos clave

### Ciclo de desarrollo

```bash
# Restaurar dependencias
dotnet restore

# Ejecutar API en local
dotnet run

# Compilar
dotnet build

# Ejecutar pruebas
dotnet test
```

### Migraciones (si aplica)

```bash
# Crear migración
dotnet ef migrations add InitialCreate

# Aplicar migraciones
dotnet ef database update
```

---

## Buenas prácticas

### 1. **Separar responsabilidades por capas**
- API (controllers), aplicación (casos de uso), infraestructura (persistencia).
- Evitar lógica de negocio dentro de controladores.

### 2. **Usar DTOs y validaciones**
- Nunca exponer entidades directamente.
- Validar entradas y devolver errores consistentes.

### 3. **Gestionar autenticación de forma segura**
- Firmar JWT con secretos seguros por entorno.
- Establecer expiración y políticas de autorización.

### 4. **Manejar errores de forma uniforme**
- Centralizar excepciones con middleware.
- Registrar logs útiles sin filtrar datos sensibles.

---

## Links útiles

- https://learn.microsoft.com/aspnet/core/web-api/
- https://learn.microsoft.com/ef/core/
- https://learn.microsoft.com/aspnet/core/security/authentication/

---

## Casos de uso

### Backend para SPA
Proveer endpoints para Angular/Next con auth, usuarios y datos.

### Microservicios
Desplegar servicios independientes con contratos HTTP claros.

### Integraciones empresariales
Exponer APIs para sistemas externos con seguridad y versionado.

---

**Teoría completada:** Lab 03 - .NET 10 API  
**Nivel:** Fundamentos backend y arquitectura limpia
