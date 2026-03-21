
# .NET 10 - Minimal APIs + EF + JWT

## ¿Qué aporta .NET 10? (visión pro-futuro)
- Mejoras de rendimiento, AOT y tooling (cuando estén disponibles).  
- Mantén `TargetFramework` = `net10.0` y ajusta si tu SDK aún no lo soporta.

## Novedades clave
- Mejoras evolutivas en rendimiento, AOT y APIs modernas.
- Beneficio esperado: menor latencia, menor consumo de memoria y pipelines más rápidos.

## Paso a paso
1. Estructura por capas (Api/Domain/Application/Infrastructure).  
2. Crea Minimal API; agrega `DbContext` y migraciones (PostgreSQL 18/SQL 2025).  
3. Añade JWT y políticas de autorización.  
4. Genera pruebas con **xUnit**; integra en CI.

**Ver lab03-dotnet10-api.md** (detallado con comandos y validaciones).


