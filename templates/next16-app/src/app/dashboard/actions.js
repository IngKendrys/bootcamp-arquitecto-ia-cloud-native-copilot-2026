"use server"

import { revalidatePath } from "next/cache"
import { registerUser } from "../../lib/backend"
import { auth } from "../../auth"

export async function createUserAction(prevState, formData) {
  const session = await auth()
  const roles = (session?.user?.roles ?? []).map((role) => String(role).toLowerCase())
  if (!roles.includes("admin")) {
    return {
      ok: false,
      message: "No autorizado: se requiere rol admin para crear usuarios",
    }
  }

  const username = (formData.get("username") || "").toString().trim()
  const password = (formData.get("password") || "").toString()

  if (!username || !password) {
    return {
      ok: false,
      message: "Username y password son obligatorios",
    }
  }

  if (password.length < 6) {
    return {
      ok: false,
      message: "La contraseña debe tener al menos 6 caracteres",
    }
  }

  const result = await registerUser({ username, password })
  if (!result.ok) {
    return {
      ok: false,
      message: result.error,
    }
  }

  revalidatePath("/dashboard")
  return {
    ok: true,
    message: `Usuario creado: ${result.data.username}`,
  }
}