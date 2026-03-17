# Lab 03 - .NET 10 API con EF Core y JWT

## Objetivo
Construir una API mínima con persistencia y autenticación.

## Prerrequisitos
- Labs 01 y 02 completados.
- PostgreSQL disponible.

## Paso a paso
1. Crea entidad User y endpoints CRUD.
2. Configura DbContext y cadena de conexión.
3. Crea migración inicial y aplica base de datos.
4. Configura JwtBearer y un endpoint protegido.
5. Agrega pruebas unitarias mínimas.

## Comandos sugeridos
```bash
cd templates/dotnet10-api/src
dotnet restore
dotnet build
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet test
```

## Validación
- CRUD operativo.
- Migración aplicada.
- Endpoint protegido responde 401/200 correctamente.

## Rúbrica
- 35% API funcional.
- 35% seguridad y persistencia.
- 30% pruebas y evidencia.

## Entregables
- EVIDENCIAS.md con pruebas y llamadas a endpoints.


