import { auth } from "../../../auth"

function hasAdminRole(roles) {
  return (roles ?? []).map((role) => String(role).toLowerCase()).includes("admin")
}

export default async function DashboardAdminPage() {
  const session = await auth()
  const roles = session?.user?.roles ?? []
  const isAdmin = hasAdminRole(roles)

  if (!isAdmin) {
    return (
      <section className="card">
        <h1>Acceso denegado</h1>
        <p role="alert" className="status-error">
          Esta vista requiere rol <strong>admin</strong>.
        </p>
      </section>
    )
  }

  return (
    <section className="card">
      <h1>Panel admin</h1>
      <p className="muted">Ruta protegida por rol administrada con claims OIDC de NextAuth.</p>
      <p>Usuario actual: <strong>{session?.user?.username || session?.user?.name}</strong></p>
    </section>
  )
}
