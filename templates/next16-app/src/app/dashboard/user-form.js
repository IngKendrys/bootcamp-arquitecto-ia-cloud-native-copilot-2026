"use client"

import { useActionState, useOptimistic } from "react"
import { useFormStatus } from "react-dom"

const initialState = { ok: false, message: "" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button className="btn" type="submit" disabled={pending} aria-busy={pending}>
      {pending ? "Creando..." : "Crear usuario"}
    </button>
  )
}

export default function UserForm({ action }) {
  const [state, formAction] = useActionState(action, initialState)
  const [optimisticItems, addOptimisticItem] = useOptimistic([], (current, next) => [
    ...current,
    next,
  ])

  return (
    <section className="card">
      <h2>Alta de usuario</h2>
      <form
        action={async (formData) => {
          const optimisticName = (formData.get("username") || "").toString().trim()
          if (optimisticName) {
            addOptimisticItem(optimisticName)
          }
          await formAction(formData)
        }}
        className="form-grid"
      >
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          minLength={3}
          required
          placeholder="nuevo.usuario"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={6}
          required
          placeholder="******"
        />

        <SubmitButton />
      </form>

      <p
        role="status"
        aria-live="polite"
        className={state?.ok ? "status-ok" : "muted"}
        style={{ marginTop: 10 }}
      >
        {state?.message || "Completa el formulario para crear un usuario"}
      </p>

      {optimisticItems.length > 0 && (
        <div className="card-soft" style={{ marginTop: 10 }}>
          <strong>Creación en progreso:</strong>
          <ul>
            {optimisticItems.map((item, idx) => (
              <li key={`${item}-${idx}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}