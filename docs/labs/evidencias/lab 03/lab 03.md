# Evidencias Lab 03 - .NET 10 API con EF Core y JWT

## Objetivo

Construir una API mínima con persistencia y autenticación usando:
- **Entidad User** con propiedades id, username, passwordHash, role
- **CRUD endpoints** para gestionar usuarios
- **DbContext y EF Core** con migración inicial a base de datos SQLite
- **JWT BearerToken** para endpoints protegidos
- **Pruebas unitarias mínimas** con xUnit

## Prompts principales utilizados

1. **¿Cómo creo un codespace?**
   - Necesidad: Configurar entorno cloud reproducible

2. **Generame una API minimal con persistencia y autenticación con EF Core y JWT, creando una entidad User, y los endpoints para un CRUD...**
   - Necesidad: Implementación completa desde cero

3. **¿Dónde se usa curl?**
   - Necesidad: Validar/probar endpoints en terminal

## Comandos ejecutados

```bash
# 1. Navegación al proyecto
cd /workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/templates/dotnet10-api/src

# 2. Restaurar dependencias
dotnet restore

# 3. Compilar proyecto
dotnet build

# 4. Instalar EF Core Design (necesario para migraciones)
dotnet add package Microsoft.EntityFrameworkCore.Design --version 10.0.5

# 5. Crear migración inicial (especificar contexto para evitar ambigüedad)
dotnet ef migrations add InitialCreate --context Dotnet10Api.Data.AppDbContext

# 6. Aplicar migraciones a base de datos
dotnet ef database update --context Dotnet10Api.Data.AppDbContext

# 7. Ejecutar API
dotnet run

# 8. Pruebas con curl (endpoints)
curl -i -X POST http://127.0.0.1:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"P@ssword1"}'

curl -i -X POST http://127.0.0.1:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"P@ssword1"}'

curl -i -H "Authorization: Bearer <TOKEN>" http://127.0.0.1:5000/api/users
```

## Resultado esperado

- ✅ **CRUD operativo**: endpoints POST (register, login), GET (users), PUT, DELETE funcionando
- ✅ **Migración aplicada**: tabla `Users` creada en SQLite con índice único en `Username`
- ✅ **Endpoint protegido**: `/api/users` requiere `Authorization: Bearer <token>` y retorna 200 si válido, 401 si no
- ✅ **Persistencia**: datos guarda en `data.db` (SQLite local)
- ✅ **Seguridad JWT**: login genera token válido por 2 horas con claims

## Resultado obtenido

### ✅ Estructura de proyecto creada

**Directorio de archivos implementados:**
```
templates/dotnet10-api/src/
├── Models/
│   └── User.cs                    (Entidad con Id, Username, PasswordHash, Role)
├── API/
│   ├── Data/
│   │   └── AppDbContext.cs        (DbContext con DbSet<User>, índice único)
│   ├── Controllers/
│   │   ├── AuthController.cs      (Register, Login - POST endpoints)
│   │   └── UsersController.cs     (GetAll, Get, Update, Delete - CRUD)
│   ├── Services/
│   │   └── JwtService.cs          (Generación de JWT tokens)
│   └── DTOs/
│       ├── RegisterDto.cs
│       ├── LoginDto.cs
│       └── UpdateUserDto.cs
├── appsettings.json               (Configuración JWT, DB connection)
├── appsettings.Development.json
├── Program.cs                     (Configuración de servicios y middleware)
├── Api.csproj                     (Dependencias NuGet)
├── Migrations/
│   └── 20260318002201_InitialCreate.cs
└── data.db                        (SQLite database)
```

### ✅ Endpoints probados

**1. Registro de usuario (POST /api/auth/register)**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "username": "testuser"
}
```

**2. Login (POST /api/auth/login)**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**3. Get usuarios (GET /api/users con Bearer)**
```
HTTP/1.1 200 OK
Authorization: Bearer <token>

[
  {
    "id": 1,
    "username": "testuser",
    "role": "User"
  }
]
```

### ✅ Migraciones aplicadas

```sql
CREATE TABLE "Users" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Users" PRIMARY KEY AUTOINCREMENT,
    "Username" TEXT NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "Role" TEXT NOT NULL
);

CREATE UNIQUE INDEX "IX_Users_Username" ON "Users" ("Username");
```

### ✅ Dependencias instaladas

- `Microsoft.AspNetCore.Authentication.JwtBearer` v10.0.5
- `Microsoft.EntityFrameworkCore` v10.0.5
- `Microsoft.EntityFrameworkCore.Sqlite` v10.0.5
- `Microsoft.EntityFrameworkCore.Design` v10.0.5
- `BCrypt.Net-Next` v4.0.2 (para hash de contraseñas)
- `System.IdentityModel.Tokens.Jwt` v8.16.0

---

## Problemas y solución

### ❌ Problema 1: Namespace incorrecto para `JwtService`
**Error:** 
```
CS0246: The type or namespace name 'JwtService' could not be found
```
**Causa:** AuthController intentaba usar `JwtService` de namespace `Dotnet10Api.API.Services` pero estaba en `Dotnet10Api.Services`

**Solución:** 
- Corregir `using Dotnet10Api.Services;` en AuthController
- Ajustar namespace en Program.cs

---

### ❌ Problema 2: Falta de paquetes NuGet críticos
**Error:**
```
CS1061: 'DbContextOptionsBuilder' does not contain a definition for 'UseSqlite'
CS0103: The name 'BCrypt' does not exist in the current context
```
**Causa:** API.csproj no tenía `Microsoft.EntityFrameworkCore.Sqlite` ni `BCrypt.Net-Next`

**Solución:**
- Añadir `<PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="10.0.5" />`
- Añadir `<PackageReference Include="BCrypt.Net-Next" Version="4.0.2" />`
- Ejecutar `dotnet restore`

---

### ❌ Problema 3: Múltiples DbContext ambiguos
**Error:**
```
More than one DbContext was found. Specify which one to use. Use the '-Context' parameter...
More than one DbContext named 'AppDbContext' was found.
```
**Causa:** Existía `Infrastructure/AppDb.cs` y `API/Data/AppDbContext.cs` con mismo nombre de clase

**Solución:**
- Usar fully qualified context name en EF commands:
  ```bash
  dotnet ef migrations add InitialCreate --context Dotnet10Api.Data.AppDbContext
  dotnet ef database update --context Dotnet10Api.Data.AppDbContext
  ```

---

### ❌ Problema 4: Microsoft.EntityFrameworkCore.Design faltante
**Error:**
```
Your startup project 'Api' doesn't reference Microsoft.EntityFrameworkCore.Design. 
This package is required for the Entity Framework Core Tools to work.
```
**Causa:** Las herramientas de EF requieren este paquete en desarrollo

**Solución:**
```bash
dotnet add package Microsoft.EntityFrameworkCore.Design --version 10.0.5
```

---

### ❌ Problema 5: HTTP 500 en endpoint /api/auth/register
**Error:**
```
HTTP/1.1 500 Internal Server Error
Content-Length: 0
```
**Causa:** En Program.cs, `builder.Configuration["Jwt:Key"]` era nulo porque no existía `appsettings.json`

**Solución:**
- Crear archivo `appsettings.json` en raíz del proyecto con:
  ```json
  {
    "ConnectionStrings": {
      "DefaultConnection": "Data Source=data.db"
    },
    "Jwt": {
      "Key": "super-secreto-12345678901234567890",
      "Issuer": "dotnet10-api"
    },
    "Logging": { "LogLevel": { "Default": "Information" } },
    "AllowedHosts": "*"
  }
  ```

---

### ❌ Problema 6: Response vacía en register (201 a 200)
**Error:** Endpoint `/api/auth/register` retornaba 500 por `CreatedAtAction`

**Causa:** `CreatedAtAction(nameof(Register), ...)` intentaba generar una ruta que no existe

**Solución:**
- Cambiar de:
  ```csharp
  return CreatedAtAction(nameof(Register), new { id = user.Id }, new { user.Id });
  ```
- A:
  ```csharp
  return Ok(new { user.Id, user.Username });
  ```

---

## Capturas o logs

### 📸 Estructura de archivos clave (ubicación)

**User.cs** - Modelo de dominio
```
Archivo: /workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/templates/dotnet10-api/src/Models/User.cs
- Contiene propiedades: Id (int), Username (string), PasswordHash (string), Role (string = "User")
```

**AppDbContext.cs** - Configuración de Entity Framework
```
Archivo: /workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/templates/dotnet10-api/src/API/Data/AppDbContext.cs
- Hereda de DbContext
- DbSet<User> Users para mapeo de tabla
- Índice único en Username en OnModelCreating
```

**AuthController.cs** - Endpoints de autenticación
```
Archivo: /workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/templates/dotnet10-api/src/API/Controllers/AuthController.cs
- POST /api/auth/register: Crea nuevo usuario con bcrypt hash
- POST /api/auth/login: Valida credenciales y genera JWT
```

**UsersController.cs** - CRUD de usuarios
```
Archivo: /workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/templates/dotnet10-api/src/API/Controllers/UsersController.cs
- GET /api/users [Authorize]: Lista todos los usuarios
- GET /api/users/{id} [Authorize]: Obtiene usuario por ID
- PUT /api/users/{id} [Authorize]: Actualiza role y/o password
- DELETE /api/users/{id} [Authorize]: Elimina usuario
```

**JwtService.cs** - Generación de tokens
```
Archivo: /workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/templates/dotnet10-api/src/API/Services/JwtService.cs
- GenerateToken(User user): Crea JWT con claims
- Claims incluyen: username, id, role
- Expire en 2 horas (DateTime.UtcNow.AddHours(2))
```

**appsettings.json** - Configuración
```
Archivo: /workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/templates/dotnet10-api/src/appsettings.json
- Jwt:Key: clave secreta para firmar tokens
- Jwt:Issuer: identificador del emisor
- ConnectionStrings:DefaultConnection: ruta a SQLite data.db
```

### 📋 Logs de prueba de endpoint

**Test 1: curl register**
```bash
$ curl -i -X POST http://127.0.0.1:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"P@ssword1"}'

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 32

{"id":1,"username":"testuser"}
```

**Test 2: curl login (obtener token)**
```bash
$ curl -i -X POST http://127.0.0.1:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"P@ssword1"}'

HTTP/1.1 200 OK
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

**Test 3: curl get users con authorization**
```bash
$ curl -i -H "Authorization: Bearer eyJhbG..." \
  http://127.0.0.1:5000/api/users

HTTP/1.1 200 OK
[{"id":1,"username":"testuser","role":"User"}]
```

---

## Pruebas Unitarias con xUnit

### ✅ Configuración de tests

**Proyecto:** `/workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/templates/dotnet10-api/tests/Template.Tests/`

**Dependencias instaladas:**
- `xunit` v2.7.1
- `xunit.runner.visualstudio` v2.8.0  
- `Microsoft.NET.Test.Sdk` v17.14.0
- `Microsoft.EntityFrameworkCore.InMemory` v10.0.5
- `BCrypt.Net-Next` v4.0.2

**Archivo de pruebas:** `UsersTests.cs`

### ✅ Clases de test implementadas

**1. AuthControllerTests** - 5 test cases
- `Register_WithValidInput_ReturnsOkWithUserId`: Verifica registro con credenciales válidas
- `Register_WithDuplicateUsername_ReturnsBadRequest`: Verifica rechazo de usuario duplicado
- `Login_WithValidCredentials_ReturnsOkWithToken`: Verifica generación de token JWT valido
- `Login_WithInvalidPassword_ReturnsUnauthorized`: Verifica rechazo de contraseña incorrecta
- `Login_WithNonexistentUser_ReturnsUnauthorized`: Verifica rechazo de usuario inexistente

**2. UsersControllerTests** - 3 test cases
- `GetAll_ReturnsListOfUsers`: Verifica GET /users retorna lista de usuarios
- `Get_WithValidId_ReturnsUser`: Verifica GET /users/{id} retorna usuario específico
- `Get_WithInvalidId_ReturnsNotFound`: Verifica GET /users/{id} retorna 404 para ID inexistente
- `Delete_WithValidId_ReturnsNoContent`: Verifica DELETE elimina usuario exitosamente

### ✅ Ejecución de tests

**Comando:**
```bash
cd /workspaces/bootcamp-arquitecto-ia-cloud-native-copilot-2026/templates/dotnet10-api
dotnet test tests/Template.Tests/Template.Tests.csproj --verbosity minimal
```

**Resultado:**
```
Restore succeeded with 1 warning(s) in 2.6s
Api net10.0 succeeded (2.1s) → src/bin/Debug/net10.0/Api.dll
Template.Tests net10.0 succeeded with 3 warning(s) (3.9s) → tests/bin/Debug/net10.0/Template.Tests.dll

[xUnit.net 00:00:00.49]   Starting:    Template.Tests
[xUnit.net 00:00:02.98]   Finished:    Template.Tests

✅ Test summary: total: 8, failed: 0, succeeded: 8, skipped: 0, duration: 4.6s
Build succeeded with 4 warning(s) in 16.6s
```

### 📊 Detalles de pruebas unitarias

**Estrategia de testing:**
- ✅ **Isolation**: usamos `DbContextOptionsBuilder` con `UseInMemoryDatabase(Guid.NewGuid().ToString())` para cada test
- ✅ **Mock Configuration**: `ConfigurationBuilder().AddInMemoryCollection()` para JWT:Key y JWT:Issuer
- ✅ **BCrypt**: Uso de `BCrypt.Net.BCrypt.HashPassword()` para crear contraseñas hasheadas realistas
- ✅ **Assertions**: xUnit assertions para validar tipos de respuesta (OkObjectResult, BadRequestObjectResult, etc.)

**Estructura de test (ejemplo):**
```csharp
[Fact]
public async Task Register_WithValidInput_ReturnsOkWithUserId() {
    // Arrange
    var db = CreateDbContext();  // InMemory isolated database
    var jwtService = GetJwtService();  // Mock JWT with test credentials
    var controller = new AuthController(db, jwtService);
    
    // Act
    var result = await controller.Register(new RegisterDto("newuser", "Password123"));
    
    // Assert
    Assert.IsType<OkObjectResult>(result);
    var okResult = result as OkObjectResult;
    Assert.Equal(200, okResult.StatusCode);
}
```

### ⚠️ Problemas encontrados en tests

### ❌ Problema 1: Referencia a interfaz `IJwtService` inexistente
**Error:**
```
error CS0246: The type or namespace name 'IJwtService' could not be found
Location: UsersTests.cs(18,13)
```
**Causa:** El código de test intentaba referenciar `IJwtService` como interfaz, pero solo existe la clase concreta `JwtService`

**Solución:**
- Cambiar firma del método de `private IJwtService GetJwtService()` a `private JwtService GetJwtService()`
- Usar la clase concreta en lugar de interfaz

---

## Conclusiones

✅ **Lab 03 Completado Exitosamente**

**Requisitos alcanzados:**
1. ✅ Entidad User con propiedades id, username, passwordHash, role
2. ✅ CRUD endpoints (POST register/login, GET, PUT, DELETE)
3. ✅ DbContext con EF Core y Migrations
4. ✅ JWT Bearer authentication en endpoints protegidos
5. ✅ Persistencia con SQLite (data.db)
6. ✅ Pruebas unitarias mínimas con xUnit (8 tests, 100% pass rate)
7. ✅ Documentación completa de problemas y soluciones

**Entregables:**
- Código API funcional en `/templates/dotnet10-api/src/`
- Proyecto de tests en `/templates/dotnet10-api/tests/Template.Tests/`
- Base de datos SQLite con migraciones aplicadas
- Pruebas unitarias pasando exitosamente (8/8)


