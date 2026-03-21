# Node.js 24 LTS + NestJS

## ¿Por qué NestJS sobre otras opciones Node?
- Framework enterprise TypeScript-first: estructura arquitectónica clara desde el día 1.
- Módulos, inyección de dependencias y decoradores reducen deuda técnica temprana.
- Internamente puede usar Fastify como transporte cuando necesitas más rendimiento.
- Curva de adopción favorable para equipos con experiencia en .NET o Angular.

## Versiones de referencia del bootcamp
- Node.js: 24 LTS
- NestJS: 11.x
- TypeScript: 5.7+
- TypeORM: 0.3.x o Prisma 5.x (ambas opciones válidas)

## Arquitectura recomendada por módulo de dominio

```
src/
  users/
    users.module.ts
    users.controller.ts
    users.service.ts
    users.entity.ts
    dto/
  auth/
    auth.module.ts
    auth.service.ts
    jwt.strategy.ts
  app.module.ts
  main.ts
```

## Capacidades clave

### Controladores y rutas
- Decoradores: `@Get`, `@Post`, `@Put`, `@Delete`, `@Param`, `@Body`, `@Query`.
- Validación automática con `class-validator` y `class-transformer`.
- Pipes globales para sanitización de entrada.

### Servicios e inyección de dependencias
- `@Injectable()`: servicio disponible en todo el módulo.
- Facilita testing unitario por sustitución de dependencias reales por mocks.

### Persistencia
- TypeORM: ORM cercano a Entity Framework, ideal para perfiles .NET.
- Prisma: cliente type-safe generado desde schema, menor boilerplate.
- Soporte nativo para PostgreSQL, MySQL, MongoDB y SQLite.

### Autenticación
- `@nestjs/passport` con estrategias: JWT, OIDC, Local.
- Guards para proteger rutas por rol o claim.

### Testing integrado
- Jest preconfigurado desde el scaffolding oficial.
- `@nestjs/testing` para instanciar módulos en tests unitarios.
- Tests e2e con `supertest`.

### Extensiones para arquitecturas avanzadas
- WebSockets con `@nestjs/websockets`.
- Microservicios con transporte TCP, Redis o RabbitMQ.
- gRPC con `@nestjs/microservices`.
- Colas con Bull/BullMQ.

## Integración con el stack del bootcamp
- Comparte PostgreSQL con el stack .NET/FastAPI.
- Misma imagen base Node 24 que el frontend Next.
- Contenerizable con Dockerfile igual al de otros servicios.
- Compatible con los pipelines de CI/CD de GitHub Actions y Azure Pipelines.
- Desplegable en Kubernetes con los Helm charts del bootcamp.

## Paso a paso de referencia
1. `npm i -g @nestjs/cli` — instalar CLI global.
2. `nest new nestjs-api --package-manager npm` — crear proyecto.
3. `nest generate resource users` — generar CRUD completo.
4. Configurar `TypeOrmModule` con conexión a PostgreSQL.
5. Agregar `ValidationPipe` global en `main.ts`.
6. Implementar `AuthModule` con JWT y guard de roles.
7. Ejecutar `npm run test` y `npm run test:e2e`.
8. Contenerizar y publicar imagen en GHCR.

**Ver lab19-nestjs-api.md** para comandos detallados y validación.
