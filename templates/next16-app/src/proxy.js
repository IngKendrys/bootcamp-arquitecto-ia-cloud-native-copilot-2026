import { NextResponse } from "next/server"

export function proxy(request) {
  const session = request.cookies.get("lab05_session")?.value
  if (session === "ok") {
    return NextResponse.next()
  }

  const loginUrl = new URL("/login", request.url)
  loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
