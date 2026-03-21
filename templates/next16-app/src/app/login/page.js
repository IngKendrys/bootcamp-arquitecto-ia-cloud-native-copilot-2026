import LoginForm from "./login-form"

export default async function LoginPage({ searchParams }) {
  const params = await searchParams
  const callbackUrl = params?.callbackUrl || "/dashboard"

  return (
    <section className="stack">
      <LoginForm callbackUrl={callbackUrl} />
    </section>
  )
}
