# Next.js 16 - Teoría

## ¿Qué es Next.js?

Next.js es un framework de React para construir aplicaciones full-stack con renderizado híbrido, routing avanzado y capacidades de servidor integradas.

### ¿Para qué sirve en el bootcamp?

- Crear frontend moderno con buena performance.
- Combinar renderizado en servidor y cliente.
- Integrar autenticación, APIs y UI en un mismo proyecto.
- Escalar de MVP a producción con convenciones claras.

---

## Palabras clave

| Término | Descripción |
|---------|------------|
| **App Router** | Sistema de rutas basado en carpetas (`app/`) |
| **Server Components** | Componentes renderizados en servidor por defecto |
| **Client Components** | Componentes interactivos ejecutados en navegador |
| **Server Actions** | Acciones de servidor invocables desde UI |
| **SSR** | Renderizado en servidor para mejorar SEO/performance inicial |

---

## Comandos clave

### Ciclo de desarrollo

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar build
npm run start
```

### Calidad de código (si aplica)

```bash
npm run lint
npm test
```

---

## Buenas prácticas

### 1. **Separar claramente server/client**
- Mantener lógica sensible en Server Components o API routes.
- Usar Client Components solo cuando haya interacción.

### 2. **Gestionar estados de carga y error**
- Diseñar UX para `loading`, `empty`, `error` y `success`.
- Evitar UI bloqueada ante fallos de red.

### 3. **Proteger rutas y sesiones**
- Implementar auth robusta para vistas privadas.
- Validar permisos antes de exponer datos sensibles.

### 4. **Optimizar rendimiento**
- Reusar fetch en servidor cuando sea posible.
- Evitar sobrecargar el cliente con lógica innecesaria.

---

## Links útiles

- https://nextjs.org/docs
- https://react.dev/
- https://nextjs.org/docs/app

---

## Casos de uso

### Frontend empresarial
Aplicaciones con SSR/CSR híbrido y experiencia rápida.

### Portales con autenticación
Dashboards y sistemas internos con rutas protegidas.

### Productos full-stack
Frontend + APIs dentro de un mismo stack React.

---

**Teoría completada:** Lab 05 - Next.js 16  
**Nivel:** Fundamentos modernos de React full-stack
