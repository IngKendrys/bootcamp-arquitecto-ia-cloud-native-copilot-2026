"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(prevState, formData) {
  const username = (formData.get("username") || "").toString().trim()
  const password = (formData.get("password") || "").toString()

  const appUser = process.env.APP_AUTH_USER || "admin"
  const appPassword = process.env.APP_AUTH_PASSWORD || "Password123"

  if (username !== appUser || password !== appPassword) {
    return {
      ok: false,
      message: "Credenciales inválidas",
    }
  }

  // Autenticar contra el backend para obtener JWT token
  const apiBaseUrl = process.env.API_BASE_URL || "http://127.0.0.1:5000"
  
  let jwtToken = null
  try {
    const loginResponse = await fetch(`${apiBaseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (loginResponse.ok) {
      const loginData = await loginResponse.json()
      jwtToken = loginData.token || loginData.access_token
    } else {
      return {
        ok: false,
        message: `Error al autenticar en backend: ${loginResponse.status}`,
      }
    }
  } catch (error) {
    return {
      ok: false,
      message: `Error de conexión con backend: ${error.message}`,
    }
  }

  const cookieStore = await cookies()
  
  // Guardar sesión local
  cookieStore.set("lab05_session", "ok", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  })

  // Guardar JWT token si se obtuvo
  if (jwtToken) {
    cookieStore.set("lab05_jwt", jwtToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 3600, // 1 hora
    })
  }

  redirect("/dashboard")
}
