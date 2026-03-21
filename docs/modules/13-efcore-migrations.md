# EF Core Migrations y Seed Idempotente - Teoría

## ¿Qué es EF Core Migrations?

EF Core Migrations es el mecanismo de evolución versionada del esquema de base de datos en aplicaciones .NET. Permite:
- definir cambios de modelo en código,
- generar scripts/migraciones incrementales,
- aplicar cambios de forma controlada por entorno,
- y mantener trazabilidad histórica en `__EFMigrationsHistory`.

### ¿Para qué sirve en el bootcamp?

- Evolucionar el esquema sin romper datos existentes.
- Sincronizar modelo C# y base de datos de manera repetible.
- Implementar seeds iniciales sin duplicados entre ejecuciones.
- Practicar cambios controlados para escenarios reales de CI/CD.

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **Migration** | Cambio versionado de esquema generado por EF Core |
| **InitialCreate** | Primera migración base del proyecto |
| **__EFMigrationsHistory** | Tabla de control con migraciones aplicadas |
| **DbContext** | Unidad de trabajo/configuración de entidades EF |
| **Idempotencia** | Ejecutar varias veces sin duplicar ni corromper estado |
| **Seed** | Datos iniciales requeridos por el sistema |
| **Model Snapshot** | Estado del modelo usado por EF para calcular diffs |
| **Up/Down** | Métodos de aplicar/revertir migración |
| **dotnet-ef** | CLI de EF Core para migraciones y update de DB |

---

## Comandos clave

### Herramienta EF CLI

```bash
dotnet tool install --global dotnet-ef --version 10.0.5
export PATH="$PATH:$HOME/.dotnet/tools"
```

### Generar y aplicar migraciones

```bash
cd templates/dotnet10-api/src

# Base
dotnet-ef migrations add InitialCreate --context Dotnet10Api.Data.AppDbContext
dotnet-ef database update --context Dotnet10Api.Data.AppDbContext

# Evolutiva
dotnet-ef migrations add AddUserLifecycleFields --context Dotnet10Api.Data.AppDbContext
dotnet-ef database update --context Dotnet10Api.Data.AppDbContext
```

### Validar historial y seed

```bash
python3 - <<'PY'
import sqlite3
conn=sqlite3.connect('templates/dotnet10-api/src/data.db')
cur=conn.cursor()
print([r[0] for r in cur.execute('SELECT MigrationId FROM __EFMigrationsHistory ORDER BY MigrationId')])
print(list(cur.execute("SELECT Username, COUNT(*) FROM Users WHERE Username IN ('admin','reader') GROUP BY Username ORDER BY Username")))
conn.close()
PY
```

---

## Buenas prácticas

### 1. Una migración por cambio lógico
- Evita mezclar múltiples refactors no relacionados en una sola migración.

### 2. Seed idempotente por clave natural
- Verificar existencia por `Username` (u otra clave única) antes de insertar.

### 3. Contexto explícito en soluciones con más de un DbContext
- Usar siempre `--context` para evitar errores de ambigüedad.

### 4. Validar migración en base limpia y base existente
- Asegura compatibilidad para instalaciones nuevas y upgrades.

### 5. Revisar SQL generado en motores con limitaciones
- Ejemplo SQLite: restricciones al `ALTER TABLE` con defaults no constantes.

### 6. Versionar migraciones, no binarios
- Commit solo código fuente y migraciones; no incluir `bin/`, `obj/`, `data.db`.

---

## Links útiles

- EF Core Migrations: https://learn.microsoft.com/ef/core/managing-schemas/migrations/
- Applying Migrations: https://learn.microsoft.com/ef/core/managing-schemas/migrations/applying
- Data Seeding: https://learn.microsoft.com/ef/core/modeling/data-seeding
- SQLite Limitations: https://learn.microsoft.com/ef/core/providers/sqlite/limitations

---

## Casos de uso

### Evolución incremental de una API
Agregar columnas sin rehacer base ni perder datos existentes.

### Inicialización controlada por ambiente
Seed mínimo (`admin`, `reader`) para desarrollo/QA sin duplicar usuarios.

### Pipeline CI/CD con migraciones
Aplicar `database update` en despliegue con trazabilidad por versión.

### Auditoría técnica
Consultar historial de migraciones para validar estado de base en soporte.

---

## Laboratorio relacionado

- `docs/labs/13-efcore-migrations.md`

