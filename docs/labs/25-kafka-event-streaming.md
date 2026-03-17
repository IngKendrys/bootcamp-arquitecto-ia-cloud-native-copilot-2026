# Lab 25 - Event Streaming con Apache Kafka

## Objetivo
Implementar un flujo de eventos con Apache Kafka usando topic, productor y consumidor
en consumer group para simular un escenario real de integraci贸n entre servicios.

## Resultado esperado
- Publicaci贸n de eventos de dominio en Kafka.
- Consumo escalable por grupos.
- Trazabilidad por `eventId` y `correlationId`.

## Prerrequisitos
- Docker y Docker Compose.
- Lab 24 completado.
- API .NET, FastAPI o NestJS disponible para integrar productor.

## Paso a paso

### 1. Levantar Kafka local
Crear `infra/docker-compose.kafka.yml` (opcional en repo local):
```yaml
services:
  kafka:
    image: bitnami/kafka:3.8
    ports:
      - "9092:9092"
    environment:
      - KAFKA_CFG_NODE_ID=0
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@kafka:9093
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
```

```bash
docker compose -f infra/docker-compose.kafka.yml up -d
```

### 2. Crear topic
```bash
docker exec -it <container_kafka> kafka-topics.sh --create \
  --topic orders.created --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
```

### 3. Implementar productor (ejemplo .NET)
```bash
dotnet add package Confluent.Kafka
```
```csharp
var config = new ProducerConfig { BootstrapServers = "localhost:9092" };
using var producer = new ProducerBuilder<Null, string>(config).Build();
await producer.ProduceAsync("orders.created", new Message<Null, string> { Value = eventJson });
```

### 4. Implementar consumidor con group
```csharp
var config = new ConsumerConfig
{
    BootstrapServers = "localhost:9092",
    GroupId = "orders-workers",
    AutoOffsetReset = AutoOffsetReset.Earliest
};
using var consumer = new ConsumerBuilder<Ignore, string>(config).Build();
consumer.Subscribe("orders.created");
```

### 5. Probar escalado de consumo
- Ejecutar dos instancias del consumidor con mismo `GroupId`.
- Verificar reparto de particiones.

### 6. Validar orden por clave
Publicar mensajes con la misma key y verificar orden dentro de una partici贸n.

## Validaci贸n
- Topic creado con 3 particiones.
- Productor publica eventos sin errores.
- Consumidores en grupo procesan eventos repartidos.
- Se evidencia al menos un caso de relectura desde offset.

## R鷅rica
- 40% productor/consumidor funcional con topic real.
- 30% uso correcto de particiones, keys y consumer groups.
- 30% evidencia de pruebas y trazabilidad.

## Entregables
- Rama `lab-25`.
- EVIDENCIAS.md con:
  - comandos de topic,
  - logs de productor/consumidor,
  - captura de reparto de particiones.
