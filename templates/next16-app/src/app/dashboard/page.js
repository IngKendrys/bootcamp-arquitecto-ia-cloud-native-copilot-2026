import { createUserAction } from "./actions"
import UserForm from "./user-form"
import { fetchUsers } from "../../lib/backend"
import { auth } from "../../auth"

function hasRole(roles, role) {
  return (roles ?? []).map((item) => String(item).toLowerCase()).includes(role.toLowerCase())
}

export default async function DashboardPage() {
  const session = await auth()
  const roles = session?.user?.roles ?? []
  const isAdmin = hasRole(roles, "admin")

  const usersResult = await fetchUsers()

  return (
    <section className="stack">
      <div className="card">
      <h1>Dashboard protegido</h1>
      <p className="muted">
        Esta ruta está protegida por sesión OIDC vía NextAuth.
      </p>

      <p className="muted">
        Usuario: <strong>{session?.user?.username || session?.user?.name || "-"}</strong>
      </p>
      <p className="muted">Roles: {roles.length ? roles.join(", ") : "sin roles"}</p>
      {session?.error && (
        <p role="alert" className="status-error">
          Sesión con error de renovación: {session.error}
        </p>
      )}
      </div>

      {isAdmin ? (
        <UserForm action={createUserAction} />
      ) : (
        <section className="card">
          <h2>Alta de usuario</h2>
          <p role="alert" className="status-error">
            Solo el rol <strong>admin</strong> puede crear usuarios.
          </p>
        </section>
      )}

      <section className="card">
        <h2>Listado de usuarios (RSC)</h2>
        {!usersResult.ok ? (
          <p role="alert" className="status-error">{usersResult.error}</p>
        ) : usersResult.users.length === 0 ? (
          <p className="muted">No hay usuarios para mostrar.</p>
        ) : (
          <ul className="users-list">
            {usersResult.users.map((user) => (
              <li key={user.id} className="user-item">
                <div>
                  <strong>{user.username}</strong>
                  <p className="muted">ID: {user.id}</p>
                </div>
                <span className="pill">{user.role}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}