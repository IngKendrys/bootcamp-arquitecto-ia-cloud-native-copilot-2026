# Lab 19 - NestJS API con TypeScript y PostgreSQL

## Objetivo
Construir una API RESTful con NestJS, TypeORM, autenticación JWT y pruebas automatizadas, siguiendo la arquitectura modular del framework.

## Prerrequisitos
- Labs 03 y 04 completados (contexto de APIs backend).
- Node.js 24 LTS instalado (`node -v` debe mostrar v24.x).
- PostgreSQL disponible (Docker Compose del stack o instancia existente).
- Docker instalado para contenerización final.

## Paso a paso

### 1. Instalar CLI y crear proyecto
```bash
npm i -g @nestjs/cli
nest new nestjs-api --package-manager npm
cd nestjs-api
```

### 2. Generar recurso users con CRUD completo
```bash
nest generate resource users
# Seleccionar: REST API, Yes (generar CRUD entry points)
```

### 3. Instalar dependencias de persistencia
```bash
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/config
```

### 4. Configurar `AppModule` con TypeORM
Editar `src/app.module.ts`:
```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'bootcamp',
  autoLoadEntities: true,
  synchronize: true, // solo desarrollo
})
```

### 5. Definir la entidad User
```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
```

### 6. Instalar validación y pipes globales
```bash
npm install class-validator class-transformer
```
En `main.ts`: `app.useGlobalPipes(new ValidationPipe({ whitelist: true }));`

### 7. Agregar autenticación JWT
```bash
npm install @nestjs/passport @nestjs/jwt passport passport-jwt
npm install -D @types/passport-jwt
```
```bash
nest generate module auth
nest generate service auth
nest generate guard auth/jwt-auth
```

### 8. Ejecutar pruebas unitarias
```bash
npm run test
npm run test:cov
```

### 9. Ejecutar pruebas e2e
```bash
npm run test:e2e
```

### 10. Contenerizar
Crear `Dockerfile`:
```dockerfile
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main"]
```

```bash
docker build -t nestjs-api:local .
docker run -p 3000:3000 --env-file .env nestjs-api:local
```

## Variables de entorno requeridas
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=bootcamp
JWT_SECRET=cambia-este-secreto
JWT_EXPIRES_IN=3600s
```

## Validación
- `GET /users` retorna lista paginada con 200.
- `POST /users` crea usuario y valida campos requeridos (400 si falta email).
- `POST /auth/login` retorna JWT válido.
- Ruta protegida con `JwtAuthGuard` retorna 401 sin token.
- `npm run test` — sin fallos.
- `npm run test:e2e` — sin fallos.
- Imagen Docker construye y arranca correctamente.

## Rúbrica
- 40% API funcional con validación y JWT.
- 30% pruebas unitarias y e2e en verde.
- 30% contenerización y evidencia.

## Entregables
- Código en rama `lab-19`.
- EVIDENCIAS.md con:
  - Captura de Swagger en `/api`.
  - Salida de `npm run test:cov`.
  - Log de contenedor ejecutándose.
