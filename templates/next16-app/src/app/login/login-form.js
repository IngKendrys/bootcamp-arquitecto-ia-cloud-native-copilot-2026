"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"

const initialState = { ok: false, message: "" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button className="btn" type="submit" disabled={pending} aria-busy={pending}>
      {pending ? "Ingresando..." : "Ingresar"}
    </button>
  )
}

export default function LoginForm({ action }) {
  const [state, formAction] = useActionState(action, initialState)

  return (
    <section className="card" style={{ maxWidth: 460 }}>
      <h1>Acceso al dashboard</h1>
      <p className="muted">Autenticación local para el laboratorio (sin OIDC).</p>

      <form action={formAction} className="form-grid">
        <label htmlFor="username">Usuario</label>
        <input id="username" name="username" type="text" required placeholder="admin" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required placeholder="Password123" />

        <SubmitButton />
      </form>

      <p role="alert" className={state?.ok ? "status-ok" : "status-error"}>
        {state?.message || "Ingresa con credenciales configuradas en .env.local"}
      </p>
    </section>
  )
}
