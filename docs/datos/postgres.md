
# PostgreSQL 18 - Recetas

## Docker Compose
```
services:
  postgres:
    image: postgres:18
    environment: { POSTGRES_PASSWORD: example }
    ports: ["5432:5432"]
```

## Índices y rendimiento
- Usa `EXPLAIN ANALYZE` para medir.  
- Crea índices compuestos para filtros frecuentes.  
- Particiona tablas grandes.

