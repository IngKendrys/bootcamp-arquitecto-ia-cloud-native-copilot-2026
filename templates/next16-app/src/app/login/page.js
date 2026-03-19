import LoginForm from "./login-form"
import { loginAction } from "./actions"

export default function LoginPage() {
  return (
    <section className="stack">
      <LoginForm action={loginAction} />
    </section>
  )
}
