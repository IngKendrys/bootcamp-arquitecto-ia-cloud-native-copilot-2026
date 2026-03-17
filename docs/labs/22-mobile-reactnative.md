# Lab 22 - Mobile con React Native y Expo

## Objetivo
Construir una aplicación mobile cross-platform (Android e iOS) con React Native y Expo
que consuma las APIs del bootcamp e integre autenticación OIDC.

## Prerrequisitos
- Labs 05 o 06 completados (contexto de frontend React/TypeScript).
- Lab 11 (OIDC) completado o proveedor OIDC disponible.
- Node.js 24 LTS instalado.
- Expo CLI instalado (`npm install -g expo-cli` o usar `npx`).
- Emulador Android (Android Studio) o dispositivo físico. iOS requiere macOS con Xcode.

## Paso a paso

### 1. Crear proyecto Expo con TypeScript
```bash
npx create-expo-app mobile-app --template tabs
cd mobile-app
```

### 2. Instalar dependencias de navegación y HTTP
```bash
npx expo install react-native-safe-area-context react-native-screens
npm install @react-navigation/native @react-navigation/native-stack
npm install axios
```

### 3. Instalar dependencias de autenticación OIDC
```bash
npx expo install expo-auth-session expo-crypto expo-web-browser
npx expo install expo-secure-store
```

### 4. Definir el servicio de API
Crear `services/api.ts`:
```typescript
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getUsers = () => api.get('/users');
export const getUserById = (id: number) => api.get(`/users/${id}`);
```

### 5. Configurar autenticación OIDC con PKCE
Crear `services/auth.ts`:
```typescript
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

const discovery = {
  authorizationEndpoint: process.env.EXPO_PUBLIC_OIDC_AUTH_URL!,
  tokenEndpoint: process.env.EXPO_PUBLIC_OIDC_TOKEN_URL!,
};

export async function login() {
  const redirectUri = AuthSession.makeRedirectUri({ scheme: 'mobileapp' });
  const request = new AuthSession.AuthRequest({
    clientId: process.env.EXPO_PUBLIC_OIDC_CLIENT_ID!,
    redirectUri,
    scopes: ['openid', 'profile', 'email'],
    usePKCE: true,
  });
  const result = await request.promptAsync(discovery);
  if (result.type === 'success') {
    const tokenResponse = await AuthSession.exchangeCodeAsync(
      { code: result.params.code, redirectUri, extraParams: { code_verifier: request.codeVerifier! } },
      discovery
    );
    await SecureStore.setItemAsync('access_token', tokenResponse.accessToken);
    return tokenResponse;
  }
  throw new Error('Login cancelled or failed');
}

export async function logout() {
  await SecureStore.deleteItemAsync('access_token');
}
```

### 6. Crear pantalla de login
Crear `app/(auth)/login.tsx`:
```typescript
import { View, Button, Text, StyleSheet } from 'react-native';
import { login } from '../../services/auth';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const handleLogin = async () => {
    await login();
    router.replace('/(tabs)');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bootcamp App</Text>
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}
```

### 7. Crear pantalla de lista de usuarios
Crear `app/(tabs)/index.tsx`:
```typescript
import { useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { getUsers } from '../../services/api';

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then(r => setUsers(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  return (
    <FlatList
      data={users}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }: any) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
}
```

### 8. Ejecutar en emulador
```bash
# Android
npx expo start --android

# iOS (requiere macOS)
npx expo start --ios

# Expo Go en dispositivo físico
npx expo start
```

### 9. Variables de entorno de Expo
Crear `.env.local`:
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000
EXPO_PUBLIC_OIDC_AUTH_URL=http://localhost:8080/realms/bootcamp/protocol/openid-connect/auth
EXPO_PUBLIC_OIDC_TOKEN_URL=http://localhost:8080/realms/bootcamp/protocol/openid-connect/token
EXPO_PUBLIC_OIDC_CLIENT_ID=mobile-app
```
> `10.0.2.2` es el localhost del host desde el emulador Android.

## Validación
- App inicia sin errores de compilación.
- Pantalla de lista muestra datos reales desde la API.
- Login OIDC completa el flujo y almacena el token en SecureStore.
- Rutas protegidas redirigen al login si no hay token.
- La app funciona en emulador Android (mínimo requerido).

## Rúbrica
- 40% pantallas de lista y detalle funcionales con datos reales.
- 30% integración con API y autenticación OIDC.
- 30% evidencia en emulador o dispositivo físico.

## Entregables
- Código en rama `lab-22`.
- EVIDENCIAS.md con:
  - Capturas de pantalla del emulador (login, lista, detalle).
  - Log de la petición HTTP a la API.
