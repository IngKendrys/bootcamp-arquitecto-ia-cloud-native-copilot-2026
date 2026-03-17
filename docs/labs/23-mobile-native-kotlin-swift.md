# Lab 23 - Mobile Nativo con Kotlin (Android) y Swift (iOS)

## Objetivo
Construir una aplicación mobile nativa en Android usando Kotlin y Jetpack Compose
que consuma las APIs del bootcamp. El track iOS con Swift/SwiftUI es opcional (requiere macOS).

## Prerrequisitos
- Lab 22 (React Native) completado, o context de APIs del bootcamp disponible.
- Android Studio Meerkat o superior instalado.
- JDK 17 o superior.
- Emulador Android configurado (API 34 o superior).
- (iOS) Xcode 16+ instalado en macOS con simulador iPhone.

---

## Track A: Android con Kotlin y Jetpack Compose

### 1. Crear proyecto en Android Studio
1. `File > New > New Project`.
2. Seleccionar: **Empty Activity** (Jetpack Compose).
3. Nombre: `BootcampAndroid`, Package: `com.bootcamp.app`, Min SDK: 26.

### 2. Agregar dependencias en `app/build.gradle.kts`
```kotlin
dependencies {
    // Retrofit para HTTP
    implementation("com.squareup.retrofit2:retrofit:2.11.0")
    implementation("com.squareup.retrofit2:converter-gson:2.11.0")
    // ViewModel y StateFlow
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.9.0")
    // Navegación Compose
    implementation("androidx.navigation:navigation-compose:2.8.0")
    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0")
    // Tests
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
}
```

### 3. Definir modelo de datos
```kotlin
// data/model/User.kt
data class User(
    val id: Int,
    val name: String,
    val email: String,
    val isActive: Boolean
)
```

### 4. Configurar Retrofit
```kotlin
// data/network/ApiService.kt
interface ApiService {
    @GET("users")
    suspend fun getUsers(): List<User>

    @GET("users/{id}")
    suspend fun getUserById(@Path("id") id: Int): User
}

object RetrofitClient {
    private const val BASE_URL = "http://10.0.2.2:5000/" // localhost desde emulador Android

    val api: ApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
}
```

### 5. Implementar ViewModel con StateFlow
```kotlin
// ui/users/UsersViewModel.kt
class UsersViewModel : ViewModel() {
    sealed class UiState {
        object Loading : UiState()
        data class Success(val users: List<User>) : UiState()
        data class Error(val message: String) : UiState()
    }

    private val _state = MutableStateFlow<UiState>(UiState.Loading)
    val state: StateFlow<UiState> = _state.asStateFlow()

    init { loadUsers() }

    fun loadUsers() {
        viewModelScope.launch {
            _state.value = UiState.Loading
            runCatching { RetrofitClient.api.getUsers() }
                .onSuccess { _state.value = UiState.Success(it) }
                .onFailure { _state.value = UiState.Error(it.message ?: "Error") }
        }
    }
}
```

### 6. Crear pantalla de lista con Jetpack Compose
```kotlin
// ui/users/UsersScreen.kt
@Composable
fun UsersScreen(viewModel: UsersViewModel = viewModel(), onUserClick: (Int) -> Unit) {
    val state by viewModel.state.collectAsState()
    when (state) {
        is UiState.Loading -> CircularProgressIndicator(modifier = Modifier.fillMaxSize().wrapContentSize())
        is UiState.Error -> Text("Error: ${(state as UiState.Error).message}")
        is UiState.Success -> LazyColumn {
            items((state as UiState.Success).users) { user ->
                UserCard(user = user, onClick = { onUserClick(user.id) })
            }
        }
    }
}

@Composable
fun UserCard(user: User, onClick: () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().padding(8.dp).clickable(onClick = onClick)) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(user.name, style = MaterialTheme.typography.titleMedium)
            Text(user.email, style = MaterialTheme.typography.bodyMedium)
        }
    }
}
```

### 7. Configurar navegación Compose
```kotlin
// navigation/AppNavigation.kt
@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    NavHost(navController, startDestination = "users") {
        composable("users") {
            UsersScreen(onUserClick = { id -> navController.navigate("users/$id") })
        }
        composable("users/{id}") { backStack ->
            val id = backStack.arguments?.getString("id")?.toInt() ?: return@composable
            UserDetailScreen(userId = id)
        }
    }
}
```

### 8. Agregar permiso de red en `AndroidManifest.xml`
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### 9. Ejecutar y probar
```bash
# Desde terminal del proyecto o Android Studio
./gradlew assembleDebug
./gradlew test

# Lanzar en emulador desde Android Studio: Run > Run 'app'
```

---

## Track B: iOS con Swift y SwiftUI (requiere macOS)

### 1. Crear proyecto en Xcode
1. `File > New > Project > App`.
2. Nombre: `BootcampApp`, Interface: **SwiftUI**, Language: **Swift**.

### 2. Definir modelo
```swift
// Models/User.swift
struct User: Codable, Identifiable {
    let id: Int
    let name: String
    let email: String
    let isActive: Bool
}
```

### 3. Crear servicio HTTP
```swift
// Services/ApiService.swift
class ApiService {
    private let baseURL = "http://localhost:5000"

    func getUsers() async throws -> [User] {
        let url = URL(string: "\(baseURL)/users")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode([User].self, from: data)
    }
}
```

### 4. Implementar ViewModel
```swift
// ViewModels/UsersViewModel.swift
@MainActor
class UsersViewModel: ObservableObject {
    @Published var users: [User] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    private let service = ApiService()

    func loadUsers() async {
        isLoading = true
        do {
            users = try await service.getUsers()
        } catch {
            errorMessage = error.localizedDescription
        }
        isLoading = false
    }
}
```

### 5. Crear vista SwiftUI
```swift
// Views/UsersView.swift
struct UsersView: View {
    @StateObject private var viewModel = UsersViewModel()

    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isLoading { ProgressView() }
                else if let error = viewModel.errorMessage { Text("Error: \(error)") }
                else {
                    List(viewModel.users) { user in
                        NavigationLink(destination: UserDetailView(user: user)) {
                            VStack(alignment: .leading) {
                                Text(user.name).font(.headline)
                                Text(user.email).font(.subheadline)
                            }
                        }
                    }
                }
            }
            .navigationTitle("Usuarios")
            .task { await viewModel.loadUsers() }
        }
    }
}
```

### 6. Ejecutar en simulador
En Xcode: seleccionar iPhone 16 simulator y presionar `Cmd+R`.

---

## Validación
- Lista de usuarios carga correctamente desde la API real.
- Navegación entre lista y detalle funciona sin errores.
- Estado de carga (spinner) visible mientras se obtienen datos.
- Estado de error visible y descriptivo si la API no responde.
- `./gradlew test` (Android) pasa sin fallos.

## Rúbrica
- 40% pantalla de lista funcional con datos reales desde API.
- 30% navegación a detalle y manejo de estados loading/error.
- 30% pruebas básicas y evidencia en emulador.

## Entregables
- Código en rama `lab-23`.
- EVIDENCIAS.md con:
  - Capturas del emulador Android con la lista de usuarios.
  - Salida de `./gradlew test`.
  - (Opcional iOS) Captura del simulador iPhone.
