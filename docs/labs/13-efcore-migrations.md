# Lab 13 - EF Core migrations y seed

## Objetivo
Gestionar evolutivo de esquema y datos semilla en .NET.

## Prerrequisitos
- Lab 03 completado.

## Paso a paso
1. Define modelos iniciales.
2. Genera migración base.
3. Aplica base de datos.
4. Implementa seed idempotente.
5. Crea segunda migración con cambio controlado.

## Comandos sugeridos
```bash
cd templates/dotnet10-api/src
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet ef migrations add AddEnrollmentStatus
dotnet ef database update
```

## Validación
- Historial de migraciones consistente.
- Seed aplicado sin duplicados.

## Rúbrica
- 50% migraciones.
- 30% calidad de seed.
- 20% evidencia.

## Entregables
- EVIDENCIAS.md con migraciones aplicadas.


