import Link from "next/link"
import { auth, signOut } from "../auth"
import "./globals.css"

export const metadata = {
  title: "EnrollmentHub - Next 16",
  description: "UI Next 16 + React 19 consumiendo backend",
}

export default async function RootLayout({ children }) {
  const session = await auth()
  const isAuthenticated = Boolean(session)
  const roles = session?.user?.roles || []

  async function logoutAction() {
    "use server"
    await signOut({ redirectTo: "/" })
  }

  return (
    <html lang="es">
      <body>
        <main className="shell">
          <header className="nav">
            <div className="nav-left">
              <strong className="brand">EnrollmentHub</strong>
              <Link href="/">Inicio</Link>
              <Link href="/dashboard">Dashboard</Link>
              {roles.map((role) => String(role).toLowerCase()).includes("admin") && (
                <Link href="/dashboard/admin">Admin</Link>
              )}
            </div>
            <div className="nav-right">
              <span aria-live="polite" className="muted">
                {isAuthenticated
                  ? `Sesión OIDC activa (${session?.user?.username || session?.user?.name || "usuario"})`
                  : "No autenticado"}
              </span>
              {isAuthenticated ? (
                <form action={logoutAction}>
                  <button className="btn btn-secondary" type="submit">Salir</button>
                </form>
              ) : (
                <Link className="btn" href="/login">Entrar</Link>
              )}
            </div>
          </header>
          {children}
        </main>
      </body>
    </html>
  )
}