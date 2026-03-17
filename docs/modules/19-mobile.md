# Mobile: React Native + Nativo (Kotlin / Swift)

## Estrategia mobile del bootcamp
Dos enfoques complementarios que cubren los escenarios reales del mercado:

1. **React Native + Expo**: cross-platform con reutilización del perfil frontend React/TypeScript.
2. **Nativo**: Kotlin + Jetpack Compose para Android y Swift + SwiftUI para iOS.

## Track A: React Native con Expo

### Versiones de referencia
- React Native: 0.78+
- Expo SDK: 52+
- TypeScript: 5.7+

### ¿Por qué React Native?
- Un único código base para Android e iOS con ~85–90% de reuso.
- Reutiliza conocimiento React y TypeScript ya adquirido en el bootcamp.
- Expo simplifica el toolchain: sin necesidad de Xcode/Android Studio para iniciar.
- Comunidad masiva y ecosistema maduro de librerías.
- GitHub Actions puede generar builds con EAS (Expo Application Services).

### Casos de uso ideales
- Aplicaciones de contenido, gestión, e-commerce, dashboards móviles.
- Equipos con perfil web que necesitan presencia mobile rápida.
- Prototipos y MVPs con presupuesto de tiempo acotado.

### Integración con el stack del bootcamp
- Consumo de APIs .NET, FastAPI y NestJS via REST.
- Autenticación OIDC con `expo-auth-session` + PKCE.
- Token JWT almacenado con `expo-secure-store`.
- Build y distribución automatizada con GitHub Actions + EAS.

### Arquitectura recomendada
```
app/
  (auth)/
    login.tsx
  (tabs)/
    index.tsx        — lista principal
    detail/[id].tsx  — detalle
  _layout.tsx
components/
  UserCard.tsx
services/
  api.ts
  auth.ts
hooks/
  useUsers.ts
```

## Track B: Nativo

### Versiones de referencia
- Kotlin: 2.x + Jetpack Compose 1.7 (Android)
- Swift: 6 + SwiftUI (iOS, requiere macOS)
- Android Studio: Meerkat o superior
- Xcode: 16+ (solo macOS)

### ¿Por qué nativo?
- Rendimiento máximo y acceso completo a hardware y APIs del sistema.
- UX idiomática: el estilo visual nativo de cada plataforma sin compromisos.
- Necesario para: apps de cámara/AR, procesamiento intensivo, juegos, integraciones de bajo nivel.
- Base sólida para arquitecturas mobile enterprise de largo plazo.

### Android: Kotlin + Jetpack Compose
- Compose: UI declarativa moderna, equivalente de concepto a SwiftUI y React.
- ViewModel + StateFlow: gestión de estado reactiva y testeable.
- Retrofit: cliente HTTP type-safe para consumo de APIs REST.
- Arquitectura: MVVM + Repository + Clean Architecture ligera.

```kotlin
// Ejemplo ViewModel con StateFlow
class UsersViewModel(private val repo: UsersRepository) : ViewModel() {
    val users: StateFlow<List<User>> = repo.getUsers()
        .stateIn(viewModelScope, SharingStarted.Lazily, emptyList())
}
```

### iOS: Swift + SwiftUI (opcional en bootcamp, requiere macOS)
- SwiftUI: UI declarativa integrada con el ecosistema Apple.
- Combine o async/await para flujos reactivos.
- URLSession o Alamofire para consumo de APIs REST.
- Arquitectura: MVVM con ObservableObject.

## Comparativa React Native vs Nativo

| Criterio | React Native + Expo | Nativo (Kotlin/Swift) |
|---|---|---|
| Código compartido | ~85-90% Android+iOS | 0% (código separado) |
| Rendimiento | Muy bueno (JSI/Hermes) | Máximo |
| Curva de inicio | Baja (perfil React) | Media-alta (nueva plataforma) |
| UX idiomática | Buena (con libs UI) | Perfecta |
| Acceso a hardware | Bueno mediante módulos | Total y directo |
| Tiempo al mercado | Rápido | Más lento |
| Casos de uso | Contenido, gestión, dashboards | Apps intensivas, enterprise, hardware |

## Integración con CI/CD del bootcamp

### React Native
```yaml
# Fragmento de workflow GitHub Actions para EAS Build
- name: Build Android
  run: npx eas-cli build --platform android --non-interactive
```

### Android nativo
```yaml
- name: Build APK
  run: ./gradlew assembleRelease
```

## Seguridad mobile
- Nunca almacenar tokens JWT en AsyncStorage sin cifrado.
- Usar `expo-secure-store` (RN) o Keystore/Keychain (nativo) para credenciales.
- Certificate pinning para APIs críticas.
- OIDC con PKCE obligatorio en flujos de autenticación mobile.

## Paso a paso general
1. Elegir el track (o hacer ambos en el proyecto integrador).
2. Crear proyecto base con CLI de cada plataforma.
3. Configurar navegación y estructura de carpetas.
4. Conectar a las APIs del bootcamp.
5. Integrar autenticación OIDC.
6. Probar en emulador/simulador.
7. Automatizar build con GitHub Actions.

**Ver lab22-mobile-reactnative.md y lab23-mobile-native-kotlin-swift.md**.
