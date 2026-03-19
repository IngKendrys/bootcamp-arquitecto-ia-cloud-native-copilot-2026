import Link from "next/link"
import { cookies } from "next/headers"
import "./globals.css"

export const metadata = {
  title: "EnrollmentHub - Next 16",
  description: "UI Next 16 + React 19 consumiendo backend",
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("lab05_session")?.value === "ok"

  async function logoutAction() {
    "use server"
    const serverCookies = await cookies()
    serverCookies.delete("lab05_session")
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
            </div>
            <div className="nav-right">
              <span aria-live="polite" className="muted">
                {isAuthenticated ? "Sesión local activa" : "No autenticado"}
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