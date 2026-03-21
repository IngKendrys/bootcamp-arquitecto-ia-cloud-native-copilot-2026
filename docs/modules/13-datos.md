
# Datos a gran escala - PostgreSQL 18, SQL Server 2025, MongoDB 8.2.3, Redis 8.6.1

- Comparativa relacional vs documental, índices, planes de consulta.  
- Migraciones (EF Core / Alembic), *connection pooling* y *retry*.  
- Redis para cache/colas.

Nota de continuidad:
- El uso de Redis como mecanismo de mensajería asíncrona se profundiza en `docs/modules/21-mensajeria-asincrona.md`.
- La práctica operativa está en `docs/labs/24-mensajeria-redis-azure-queue.md`.

## Novedades clave por motor
- PostgreSQL 18: mejoras en índices avanzados y particionamiento; JSONB/PostGIS.
- SQL Server 2025: optimizaciones analíticas y de compatibilidad.
- MongoDB 8.2: mejoras en timeseries, TTL y almacenamiento.
- Redis 8.6: mejoras de rendimiento y latencia.

**Ver labs de data (lab12-data-at-scale.md) y carpeta `docs/datos/` con recetas específicas.**

