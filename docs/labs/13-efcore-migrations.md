# Lab 13 - EF Core migrations y seed

## Objetivo
Gestionar evolutivo de esquema y datos semilla en .NET.

## Prerrequisitos
- Lab 03 completado.

## Paso a paso
1. Define modelos iniciales.
2. Genera migraci�n base.
3. Aplica base de datos.
4. Implementa seed idempotente.
5. Crea segunda migraci�n con cambio controlado.
6. Valida historial y no duplicados.
 
## Comandos sugeridos
```bash
cd templates/dotnet10-api/src
dotnet tool install --global dotnet-ef --version 10.0.5
export PATH="$PATH:$HOME/.dotnet/tools"

# Migración base (ya existente en el template)
dotnet-ef migrations add InitialCreate --context Dotnet10Api.Data.AppDbContext
dotnet-ef database update --context Dotnet10Api.Data.AppDbContext

# Segunda migración controlada (campos IsActive y CreatedAt)
dotnet-ef migrations add AddUserLifecycleFields --context Dotnet10Api.Data.AppDbContext
dotnet-ef database update --context Dotnet10Api.Data.AppDbContext

# Validación de historial
python3 - <<'PY'
import sqlite3
conn=sqlite3.connect('data.db')
cur=conn.cursor()
for row in cur.execute('SELECT MigrationId FROM __EFMigrationsHistory ORDER BY MigrationId;'):
	print(row[0])
conn.close()
PY

# Validación seed idempotente
python3 - <<'PY'
import sqlite3
conn=sqlite3.connect('data.db')
cur=conn.cursor()
for row in cur.execute("SELECT Username, COUNT(*) FROM Users WHERE Username IN ('admin','reader') GROUP BY Username ORDER BY Username;"):
	print(row[0], row[1])
conn.close()
PY
```

## Validaci�n
- Historial de migraciones consistente.
- Seed aplicado sin duplicados.

## R�brica
- 50% migraciones.
- 30% calidad de seed.
- 20% evidencia.

## Entregables
- EVIDENCIAS.md con migraciones aplicadas.


