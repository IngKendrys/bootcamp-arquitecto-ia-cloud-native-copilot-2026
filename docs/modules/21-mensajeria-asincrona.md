# Módulo 21 - Mensajería asíncrona (Redis, Azure Queue Storage y Apache Kafka)

## Objetivo
Diseñar flujos asíncronos para desacoplar servicios, absorber picos de carga y aumentar resiliencia,
eligiendo la tecnología correcta según volumen, orden, latencia y costo.

## Resultado esperado
- Comprender cuándo usar Redis, Azure Queue Storage o Kafka.
- Implementar patrón productor/consumidor con reintentos y manejo de errores.
- Integrar mensajería asíncrona en APIs del stack del bootcamp.

## ¿Por qué mensajería asíncrona?
Cuando un flujo no necesita respuesta inmediata, enviar eventos o tareas a una cola reduce acoplamiento
entre servicios y evita que el usuario final pague la latencia de procesos largos.

Casos típicos:
- Envío de email/notificaciones.
- Procesamiento de reportes o exportaciones.
- Integraciones con sistemas externos.
- Pipeline de eventos para analítica.

## Comparativa práctica

| Criterio | Redis (List/Streams/PubSub) | Azure Queue Storage | Apache Kafka |
|---|---|---|---|
| Complejidad operativa | Baja a media | Baja | Alta |
| Throughput | Alto | Medio | Muy alto |
| Orden estricto | Parcial (depende del patrón) | No garantizado global | Sí por partición |
| Persistencia larga | Limitada (depende configuración) | Sí | Sí (retención configurable) |
| Escenarios ideales | Cache + colas rápidas + jobs cortos | Tareas simples cloud-native en Azure | Event streaming enterprise |
| Costo inicial | Bajo | Bajo | Medio/alto |

## Guía de decisión rápida
1. Si necesitas simplicidad y estás en Azure: **Azure Queue Storage**.
2. Si ya usas Redis y necesitas tareas rápidas: **Redis Streams** o **Redis Lists**.
3. Si necesitas alto volumen, replay, particiones y ecosistema de eventos: **Kafka**.

## Patrones fundamentales

### Patrón productor/consumidor
- Productor publica mensaje/evento.
- Cola/broker almacena y distribuye.
- Consumidor procesa y confirma.

### Outbox pattern
Cuando guardas datos en base y publicas evento, usa Outbox para evitar inconsistencia entre DB y broker.

### Dead-letter queue (DLQ)
Mensajes que fallan repetidamente se mueven a una cola de errores para análisis y reproceso.

## Buenas prácticas obligatorias
- Definir contrato de mensaje versionado (`eventType`, `schemaVersion`, `timestamp`).
- Idempotencia del consumidor (procesar dos veces no debe romper estado).
- Retries con backoff y límite máximo.
- Trazabilidad por `correlationId`.
- Métricas: mensajes procesados, fallidos, tiempo promedio, tamaño de backlog.

## Seguridad
- No incluir secretos en payload.
- Cifrar datos sensibles cuando aplique.
- En Azure: usar Managed Identity cuando sea posible.
- En Kafka: habilitar SASL/SSL en ambientes productivos.

## Relación con el bootcamp
- .NET 10 y NestJS pueden actuar como productores.
- FastAPI puede consumir eventos para pipelines de datos/IA.
- Observabilidad (Lab 16) medirá backlog, latencia y errores.

## Labs asociados
- `docs/labs/24-mensajeria-redis-azure-queue.md`
- `docs/labs/25-kafka-event-streaming.md`
