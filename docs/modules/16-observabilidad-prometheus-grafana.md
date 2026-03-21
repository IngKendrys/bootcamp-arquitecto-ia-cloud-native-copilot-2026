# Observabilidad con Prometheus y Grafana

## ¿Qué es Observabilidad?

La observabilidad es la capacidad de entender el comportamiento interno de un sistema a través de sus salidas: **métricas**, **logs** y **trazas**. En este módulo nos enfocamos en **métricas**.

### Prometheus

Prometheus es una base de datos de series de tiempo (TSDB) especializada en métricas de aplicaciones. Funciona mediante:
- **Scraping**: Prometheus solicita periódicamente métricas a un endpoint (e.g., `/metrics`)
- **Almacenamiento**: Guarda pares (timestamp, valor) en disco
- **PromQL**: Lenguaje de consulta para analizar series

### Grafana

Grafana es una plataforma de visualización que consume métricas desde Prometheus y otras fuentes:
- Lee datos de Prometheus vía PromQL
- Crea **dashboards** con paneles (gráficos, tablas, stats)
- Provee **alertas** configurables
- Permite **provisioning** automático de datasources y dashboards

### prometheus-net

Librería .NET que exporta métricas HTTP al estándar Prometheus:
- Counters: contadores incrementales
- Gauges: valores puntuales
- Histograms: distribuciones de latencia
- Summaries: percentiles y cuantiles

### ¿Para qué sirve en el bootcamp?

- Observar el comportamiento de APIs en tiempo real.
- Detectar anomalías: picos de latencia, aumento de errores 5xx.
- Validar performance bajo carga.
- Exportar métricas desde backend .NET sin modificar lógica de negocio.
- Provisionar stack de observabilidad reproducible en equipos.
- Preparar para monitoreo en producción (AWS CloudWatch, Azure Monitor, Datadog, etc.).

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **Scrape** | Solicitud periódica de Prometheus a un target para obtener métricas |
| **Target** | Endpoint que expone métricas (e.g., `/metrics`), monitoreado por Prometheus |
| **Job** | Grupo de targets con la misma configuración en Prometheus |
| **Instance** | Una instancia específica de un target (hostname:puerto) |
| **Metric** | Nombre base con sufijo opcional (`_total`, `_seconds`, `_bucket`, `_count`) |
| **Label** | Dimensión clave-valor de una métrica (e.g., `method="GET"`, `status="200"`) |
| **TSDB** | Time Series Database, almacena (timestamp, valor) indexados por labels |
| **PromQL** | Lenguaje de consultas para Prometheus |
| **Dashboard** | Conjunto de paneles visualizados en Grafana |
| **Panel** | Gráfico individual (Timeseries, Gauge, Stat, Table, etc.) |
| **Datasource** | Conexión de Grafana a Prometheus (o InfluxDB, Datadog, etc.) |
| **Provisioning** | Configuración declarativa de datasources y dashboards en Grafana |
| **Alert Rule** | Condición en Prometheus que dispara notificaciones |
| **Retention** | Período de retención de datos en Prometheus (default 15 días) |

---

## Componentes del stack

### docker-compose.yml
```yaml
services:
  prometheus:
    image: prom/prometheus:v2.54.1
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'

  grafana:
    image: grafana/grafana:11.2.2
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_PATHS_PROVISIONING=/var/lib/grafana/provisioning
    volumes:
      - ./grafana/provisioning:/var/lib/grafana/provisioning
      - ./grafana/dashboards:/var/lib/grafana/dashboards
      - grafana_data:/var/lib/grafana
    depends_on:
      - prometheus

volumes:
  prometheus_data:
  grafana_data:
```

### prometheus.yml
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'dotnet-api'
    scrape_interval: 5s
    static_configs:
      - targets: ['host.docker.internal:5000']
    metrics_path: '/metrics'
```

### En .NET (Program.cs)
```csharp
using Prometheus;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseHttpMetrics(); // Debe estar ANTES de UseHttpsRedirection
app.MapMetrics("/metrics"); // Expone endpoint /metrics

app.MapControllers();
app.Run();
```

---

## Comandos clave

### Levantar el stack

```bash
cd observabilidad/prometheus-grafana
docker compose up -d
```

### Verificar salud

```bash
# Prometheus targets
curl -s http://localhost:9090/api/v1/targets | jq '.data.activeTargets[] | {job: .labels.job, health: .health}'

# Grafana health
curl -s http://localhost:3001/api/health | jq '.'

# Métricas directamente desde API
curl -s http://127.0.0.1:5000/metrics | head -20
```

### Consultas PromQL útiles

```promql
# Tasa de requestos por segundo
sum(rate(http_requests_received_total[1m]))

# Latencia p95 en segundos
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))

# Errores 5xx por segundo
sum(rate(http_requests_received_total{code=~"5.."}[1m]))

# Requests en progreso
sum(http_requests_in_progress)
```

### Cargar test

```bash
# Script Python para simular carga
python3 <<'PY'
import requests
import time

url = "http://127.0.0.1:5000/api/health"
for i in range(120):
    try:
        requests.get(url, timeout=5)
    except:
        pass
    if i % 30 == 0:
        print(f"Requests: {i}")

time.sleep(2)
print("Carga completada")
PY
```

### Detener el stack

```bash
cd observabilidad/prometheus-grafana
docker compose down
```

---

## Buenas prácticas

### 1. Scrape interval apropiado
- Prometheus default 15s, pero aplicaciones de alta carga pueden requerir 5-10s.
- Evitar scrapes muy frecuentes (1s) que saturan BD.

### 2. Retención y almacenamiento
- Default 15 días. Evaluar según espacio y caso de uso.
- Usar `--storage.tsdb.retention.time=30d` para aumentar.

### 3. Nombres de métricas claros
- Usar sufijos: `_total` para counters, `_seconds` para duraciones, `_bytes` para tamaños.
- Evitar conflictos: `http_requests_total` no `http_total_requests`.

### 4. Labels dimensionales
- Agregar labels relevantes: `method`, `path`, `status`, `error`.
- No incluir valores únicos (IDs, UUIDs) que exploten cardinalidad.

### 5. Alertas basadas en SLO
- Definir umbrales: latencia p95 < 100ms, error rate < 1%.
- Usar percentiles, no promedio.

### 6. Provisioning reproducible
- Versionear todos los YAMLs, JSONs de dashboards.
- Usar volúmenes Docker para datasources y dashboards.

### 7. Seguridad
- Restringir acceso a Prometheus (no exponer a internet).
- Usar reverse proxy con autenticación para Grafana en prod.

### 8. Dashboard ágil
- 6-8 paneles clave por dashboard.
- Evitar dashboards sobrecargados.

---

## Links útiles

- Prometheus: https://prometheus.io/docs/
- Grafana: https://grafana.com/docs/grafana/latest/
- prometheus-net: https://github.com/prometheus-net/prometheus-client_dotnet
- PromQL Tutorial: https://prometheus.io/docs/prometheus/latest/querying/basics/
- HTTP Instrumentation Best Practices: https://prometheus.io/docs/practices/instrumentation/

---

## Casos de uso

### 1. Monitoreo de SLI/SLO
Medir qué porcentaje del tiempo latencia p95 es < 100ms.

### 2. Troubleshooting ágil
Identificar rápidamente si pico de latencia correlaciona con aumento de CPU/memoria.

### 3. Capacity planning
Gráficos de tendencia (memory, requests) para proyectar crecimiento.

### 4. Detección de anomalías
Alertas si tasa de error > umbral o latencia p95 aumenta 2x.

### 5. Comparativa pre/post deployment
Validar impact de cambio de código en métricas clave.

---

## Integración con Kubernetes

En producción, usar **Prometheus Operator** o **kube-prometheus** para descubrir automáticamente targets en K8s:

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "8080"
    prometheus.io/path: "/metrics"
spec:
  ...
```

---

## Laboratorio relacionado

- `docs/labs/16-observabilidad.md`

