# Evidencias Lab 12 - Data at Scale y Optimización

## Objetivo
Evaluar y mejorar rendimiento con volumen de datos realista, comparando métricas antes y después en consultas clave, aplicando índices y validando cache de lectura frecuente con Redis.

## Comandos ejecutados

## Prompt inicial del lab

```text
Generame una evaluación para mejorar rendimiento con volumen de datos realista, empieza con la carga dataset de volumen medio o alto, mide latencia de consultas clave, agrega índices y compara resultados, evalúa cache de lectura frecuente recomendado con redis, documenta mejoras y trade offs, además explícame paso a paso.
```

### Paso 1: Levantar infraestructura de datos
```bash
cd infra
docker compose -f docker-compose.data.yml up -d postgres redis
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}' | grep -E 'postgres|redis'
```

Validación:
- `infra-postgres-1` activo en `5432`
- `infra-redis-1` activo en `6379`

### Paso 2: Crear tabla y cargar dataset (500k filas)
```bash
docker exec -i infra-postgres-1 psql -U postgres <<'SQL'
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL,
  status VARCHAR(20) NOT NULL,
  total NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  notes TEXT
);

INSERT INTO orders (customer_id, status, total, created_at, notes)
SELECT
  (random()*100000)::BIGINT + 1,
  (ARRAY['pending','paid','shipped','cancelled'])[floor(random()*4)+1],
  round((random()*1000)::numeric, 2),
  NOW() - (random() * INTERVAL '365 days'),
  md5(random()::text)
FROM generate_series(1, 500000);

ANALYZE orders;
SQL

docker exec -i infra-postgres-1 psql -U postgres -c "SELECT count(*) AS total_rows FROM orders;"
```

Resultado:
- `total_rows = 500000`

### Paso 3: Medición baseline (antes de índices)

Consulta Q1:
```bash
docker exec -i infra-postgres-1 psql -U postgres -c "EXPLAIN ANALYZE SELECT id, customer_id, total, created_at FROM orders WHERE status = 'paid' ORDER BY created_at DESC LIMIT 50;"
```

Consulta Q2:
```bash
docker exec -i infra-postgres-1 psql -U postgres -c "EXPLAIN ANALYZE SELECT id, status, total, created_at FROM orders WHERE customer_id = 42000 AND created_at >= NOW() - INTERVAL '90 days' ORDER BY created_at DESC;"
```

Consulta Q3:
```bash
docker exec -i infra-postgres-1 psql -U postgres -c "EXPLAIN ANALYZE SELECT status, count(*), round(avg(total),2) FROM orders GROUP BY status;"
```

### Paso 4: Aplicar índices y re-medición
```bash
docker exec -i infra-postgres-1 psql -U postgres -c "
CREATE INDEX IF NOT EXISTS idx_orders_status_created_at ON orders (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_created_at ON orders (customer_id, created_at DESC);
ANALYZE orders;
"
```

Repetir Q1, Q2, Q3 con los mismos `EXPLAIN ANALYZE`.

### Paso 5: Evaluación cache de lectura con Redis
```bash
docker exec -i infra-redis-1 redis-benchmark -t get -n 10000 -q
```

Resultado observado:
- `GET: 40485.83 requests per second, p50=0.535 msec`

## Resultado esperado
- Dataset de volumen medio/alto cargado correctamente.
- Consultas clave con latencia base registrada.
- Mejora medible en consultas optimizadas por índices.
- Evidencia de latencia baja para lectura frecuente con Redis.
- Análisis de trade-offs documentado.

## Resultado obtenido

### Métricas SQL antes vs después

| Consulta | Antes (ms) | Después (ms) | Mejora |
|---|---:|---:|---:|
| Q1: `status='paid'` + `ORDER BY created_at DESC LIMIT 50` | 120.507 | 18.896 | 84.32% |
| Q2: `customer_id` + rango de fecha + ordenamiento | 46.728 | 1.867 | 96.00% |
| Q3: `GROUP BY status` | 100.525 | 123.825 | -23.18% |

### Interpretación
- Q1 y Q2 mejoraron significativamente por uso directo de índices (`Index Scan`).
- Q3 no mejoró porque es una agregación global que sigue usando `Parallel Seq Scan`.
- Redis confirmó latencia muy baja para lecturas repetidas (`p50` sub-milisegundo).

## Problemas y solución

1. Problema: PostgreSQL/Redis no estaban arriba al iniciar evaluación.
	- Solución: `docker compose -f infra/docker-compose.data.yml up -d postgres redis`.

2. Problema: herramienta `redis-cli` no disponible en host.
	- Solución: ejecutar `redis-cli` dentro del contenedor (`docker exec -i infra-redis-1 redis-cli ...`).

3. Problema: benchmark largo interrumpido por tiempo de ejecución.
	- Solución: usar medición liviana y estable con `redis-benchmark -t get -n 10000 -q`.

## Trade-offs
- Índices mejoran lectura filtrada/ordenada, pero agregan costo en escrituras (`INSERT/UPDATE/DELETE`).
- Más índices implican más uso de almacenamiento y mayor tiempo de mantenimiento.
- Redis reduce latencia para lecturas calientes, pero introduce complejidad de expiración/invalidez de cache.
- No todas las consultas mejoran con índices; agregaciones globales pueden requerir otras estrategias (materialized views, particionamiento, pre-aggregación).


