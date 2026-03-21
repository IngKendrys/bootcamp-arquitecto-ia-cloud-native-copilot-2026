import Link from "next/link"

export default function HomePage() {
  return (
    <section className="stack">
      <div className="card">
      <h1>Lab 05 - Next 16 + React 19 (RSC)</h1>
      <p>
        UI funcional para listar y crear usuarios contra backend usando Server
        Components y Server Actions.
      </p>

      <h2>Checklist rápido</h2>
      <ol>
        <li>Configura variables en <code>.env.local</code>.</li>
        <li>Inicia sesión OIDC con Keycloak en <code>/login</code>.</li>
        <li>Abre el dashboard protegido.</li>
        <li>Valida claims/roles y control de acceso en UI.</li>
      </ol>
      </div>
      <div className="card">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn btn-secondary" href="/login">Ir a Login</Link>
        <Link className="btn" href="/dashboard">Ir al Dashboard protegido</Link>
        </div>
      </div>
    </section>
  )
}