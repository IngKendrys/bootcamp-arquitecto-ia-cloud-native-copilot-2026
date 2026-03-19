import { cookies } from "next/headers"

const API_BASE_URL = process.env.API_BASE_URL

function assertApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("Falta configurar API_BASE_URL en variables de entorno")
  }
}

export async function fetchUsers() {
  assertApiBaseUrl()

  // Obtener JWT token desde la cookie
  const cookieStore = await cookies()
  const token = cookieStore.get("lab05_jwt")?.value

  if (!token) {
    return {
      ok: false,
      users: [],
      error: "No hay sesión de JWT valida. Por favor inicia sesión primero.",
    }
  }

  const response = await fetch(`${API_BASE_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const text = await response.text()
    return {
      ok: false,
      users: [],
      error: `Error al listar usuarios: ${response.status} ${text}`,
    }
  }

  const users = await response.json()
  return { ok: true, users, error: null }
}

export async function registerUser({ username, password }) {
  assertApiBaseUrl()

  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    cache: "no-store",
  })

  if (!response.ok) {
    const text = await response.text()
    return {
      ok: false,
      error: `No se pudo crear usuario: ${response.status} ${text}`,
    }
  }

  const data = await response.json()
  return { ok: true, data, error: null }
}