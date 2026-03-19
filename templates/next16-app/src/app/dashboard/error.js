"use client"

export default function DashboardError({ error, reset }) {
  return (
    <section className="stack">
      <div className="card">
      <h1>Error en Dashboard</h1>
      <p role="alert" className="status-error">{error?.message ?? "Error inesperado"}</p>
      <button className="btn" type="button" onClick={() => reset()}>
        Reintentar
      </button>
      </div>
    </section>
  )
}