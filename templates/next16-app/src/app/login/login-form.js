"use client"

import { signIn } from "next-auth/react"

export default function LoginForm({ callbackUrl }) {
  const targetCallbackUrl = callbackUrl || "/dashboard"

  return (
    <section className="card" style={{ maxWidth: 460 }}>
      <h1>Acceso al dashboard con OIDC</h1>
      <p className="muted">Usa Keycloak (NextAuth) para iniciar sesión y obtener claims/roles.</p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          className="btn"
          onClick={() => signIn("keycloak", { callbackUrl: targetCallbackUrl }, { prompt: "login" })}
        >
          Iniciar con Keycloak
        </button>
      </div>

      <p role="status" className="muted" style={{ marginTop: 10 }}>
        Serás redirigido al proveedor OIDC y luego volverás a la aplicación.
      </p>
    </section>
  )
}
