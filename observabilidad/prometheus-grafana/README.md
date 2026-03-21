# Observabilidad (Prometheus + Grafana)

## Componentes
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3001` (usuario `admin`, password `admin`)
- Dashboard provisionado: `Bootcamp API - Observabilidad Base`

## Arranque del stack
```bash
cd observabilidad/prometheus-grafana
docker compose up -d
```

## Backend instrumentado
El template .NET expone métricas en:
- `http://127.0.0.1:5000/metrics`

Para que Prometheus lo alcance desde contenedor, ejecutar backend en:
```bash
cd templates/dotnet10-api/src
ASPNETCORE_URLS=http://0.0.0.0:5000 dotnet run
```

## Scrape target configurado
Archivo: `prometheus/prometheus.yml`
- job `dotnet-api`
- target `host.docker.internal:5000`
- `metrics_path: /metrics`

## Verificaciones rápidas
```bash
curl -s http://localhost:9090/api/v1/targets
curl -s http://127.0.0.1:5000/metrics | head
curl -s -u admin:admin "http://localhost:3001/api/search?query=Bootcamp%20API"
```
