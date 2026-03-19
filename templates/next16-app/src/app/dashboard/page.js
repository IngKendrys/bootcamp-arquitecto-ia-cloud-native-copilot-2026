import { createUserAction } from "./actions"
import UserForm from "./user-form"
import { fetchUsers } from "../../lib/backend"

export default async function DashboardPage() {
  const usersResult = await fetchUsers()

  return (
    <section className="stack">
      <div className="card">
      <h1>Dashboard protegido</h1>
      <p className="muted">
        Esta ruta está protegida por sesión local mediante cookie (`lab05_session`).
      </p>
      </div>

      <UserForm action={createUserAction} />

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