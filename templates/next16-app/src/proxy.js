import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(request) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })
  if (token) {
    const path = request.nextUrl.pathname
    const roles = (token.roles ?? []).map((role) => String(role).toLowerCase())
    if (path.startsWith("/dashboard/admin") && !roles.includes("admin")) {
      return NextResponse.redirect(new URL("/dashboard?error=forbidden", request.url))
    }
    return NextResponse.next()
  }

  const loginUrl = new URL("/api/auth/signin", request.url)
  loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
