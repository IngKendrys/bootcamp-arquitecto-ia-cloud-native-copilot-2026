# Datos a Gran Escala (PostgreSQL, SQL Server, MongoDB, Redis) - Teoría

## ¿Qué es Data at Scale?

Data at Scale es la práctica de diseñar sistemas de datos capaces de mantener buen rendimiento cuando el volumen, concurrencia y complejidad de consultas crecen.

Incluye:
- modelado de datos para lecturas/escrituras reales,
- medición objetiva de latencias,
- optimización por índices y planes de ejecución,
- uso de cache para lecturas frecuentes,
- y decisiones de trade-off costo vs rendimiento.

### ¿Para qué sirve en el bootcamp?

- Preparar APIs para cargas más cercanas a producción.
- Evitar cuellos de botella por consultas sin optimizar.
- Aplicar decisiones con evidencia (antes vs después).
- Integrar Redis como capa de aceleración de lectura.
- Entender cuándo usar motores relacionales vs documentales.

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **EXPLAIN ANALYZE** | Muestra plan real de ejecución y tiempo de consulta |
| **Seq Scan** | Escaneo secuencial completo de tabla |
| **Index Scan** | Lectura optimizada usando índice |
| **Composite Index** | Índice con más de una columna, útil para filtros+orden |
| **Cardinality** | Cantidad de valores distintos en una columna |
| **Selectivity** | Qué tanto filtra una condición |
| **ANALYZE** | Actualiza estadísticas para el optimizador |
| **P95** | Percentil 95 de latencia (cola de distribución) |
| **Cache Aside** | Patrón: app consulta cache, si miss consulta DB y llena cache |
| **TTL** | Tiempo de expiración de un valor en cache |
| **Hit Ratio** | Porcentaje de lecturas resueltas desde cache |
| **Materialized View** | Vista precomputada para acelerar agregaciones |
| **Partitioning** | Dividir datos grandes en partes lógicas/físicas |

---

## Comandos clave

### Levantar motores de datos

```bash
docker compose -f infra/docker-compose.data.yml up -d postgres redis
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### PostgreSQL: medición y optimización

```sql
EXPLAIN ANALYZE
SELECT id, customer_id, total, created_at
FROM orders
WHERE status = 'paid'
ORDER BY created_at DESC
LIMIT 50;

CREATE INDEX IF NOT EXISTS idx_orders_status_created_at
ON orders (status, created_at DESC);

ANALYZE orders;
```

### Redis: evaluación de cache

```bash
docker exec -i infra-redis-1 redis-benchmark -t get -n 10000 -q
docker exec -i infra-redis-1 redis-cli SETEX orders:paid:latest:50 60 "..."
docker exec -i infra-redis-1 redis-cli GET orders:paid:latest:50
```

---

## Buenas prácticas

### 1. Medir antes de optimizar
- Captura baseline (p50/p95, plan de ejecución).
- Cambia una variable por vez para atribuir mejoras correctamente.

### 2. Diseñar índices por patrón de consulta
- Índices compuestos para `WHERE + ORDER BY` frecuentes.
- Evitar sobre-indexar tablas de alta escritura.

### 3. Validar planes, no solo tiempos
- Confirmar cambio de `Seq Scan` a `Index Scan` cuando aplica.
- Revisar filas estimadas vs reales.

### 4. Usar cache para lecturas calientes
- Aplicar `cache-aside` en endpoints repetidos.
- Definir TTL según frescura requerida.

### 5. Gestionar trade-offs explícitamente
- Mejor lectura puede degradar escritura.
- Más cache reduce latencia pero aumenta complejidad de coherencia.

### 6. Pensar en evolución
- Para agregaciones pesadas: materialized views o pre-aggregación.
- Para volúmenes mayores: particionamiento y archivado.

---

## Links útiles

- PostgreSQL EXPLAIN: https://www.postgresql.org/docs/current/using-explain.html
- PostgreSQL Indexes: https://www.postgresql.org/docs/current/indexes.html
- Redis docs: https://redis.io/docs/
- SQL Server docs: https://learn.microsoft.com/sql/
- MongoDB performance: https://www.mongodb.com/docs/manual/administration/analyzing-mongodb-performance/

---

## Casos de uso

### API transaccional con consultas por estado y fecha
Índices compuestos mejoran búsquedas recientes y paginadas.

### Dashboard con lecturas repetidas
Cache Redis reduce latencia percibida y descarga la base.

### Analítica operacional
Para agregaciones frecuentes, considerar tablas resumidas o vistas materializadas.

### Arquitectura poliglota
Relacional para consistencia transaccional, documental para flexibilidad, cache para velocidad.

---

## Laboratorio relacionado

- `docs/labs/12-data-at-scale.md`

