import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

const requiredEnv = ["KEYCLOAK_ISSUER", "KEYCLOAK_CLIENT_ID", "AUTH_SECRET"]
for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Falta variable de entorno requerida: ${key}`)
  }
}

async function refreshAccessToken(token) {
  try {
    const issuer = process.env.KEYCLOAK_ISSUER
    const tokenEndpoint = `${issuer}/protocol/openid-connect/token`

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      refresh_token: token.refreshToken,
    })

    if (process.env.KEYCLOAK_CLIENT_SECRET) {
      body.set("client_secret", process.env.KEYCLOAK_CLIENT_SECRET)
    }

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    })

    const refreshed = await response.json()
    if (!response.ok) {
      throw refreshed
    }

    return {
      ...token,
      accessToken: refreshed.access_token,
      idToken: refreshed.id_token ?? token.idToken,
      accessTokenExpiresAt: Date.now() + (refreshed.expires_in ?? 300) * 1000,
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
      error: undefined,
    }
  } catch {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

function decodeJwtPayload(jwt) {
  try {
    if (!jwt || typeof jwt !== "string") return null
    const parts = jwt.split(".")
    if (parts.length < 2) return null
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/")
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4)
    return JSON.parse(Buffer.from(padded, "base64").toString("utf8"))
  } catch {
    return null
  }
}

function extractRoles({ profile, accessToken, idToken, clientId }) {
  const fromProfileRealm = Array.isArray(profile?.realm_access?.roles) ? profile.realm_access.roles : []
  const fromProfileRoot = Array.isArray(profile?.roles) ? profile.roles : []

  const accessPayload = decodeJwtPayload(accessToken)
  const idPayload = decodeJwtPayload(idToken)

  const fromAccessRealm = Array.isArray(accessPayload?.realm_access?.roles)
    ? accessPayload.realm_access.roles
    : []
  const fromIdRealm = Array.isArray(idPayload?.realm_access?.roles)
    ? idPayload.realm_access.roles
    : []

  const fromAccessClient = Array.isArray(accessPayload?.resource_access?.[clientId]?.roles)
    ? accessPayload.resource_access[clientId].roles
    : []
  const fromIdClient = Array.isArray(idPayload?.resource_access?.[clientId]?.roles)
    ? idPayload.resource_access[clientId].roles
    : []

  return [
    ...new Set([
      ...fromProfileRealm,
      ...fromProfileRoot,
      ...fromAccessRealm,
      ...fromIdRealm,
      ...fromAccessClient,
      ...fromIdClient,
    ]),
  ]
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Keycloak({
      issuer: process.env.KEYCLOAK_ISSUER,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      authorization: { params: { scope: "openid profile email roles" } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        const roles = extractRoles({
          profile,
          accessToken: account.access_token,
          idToken: account.id_token,
          clientId: process.env.KEYCLOAK_CLIENT_ID,
        })

        return {
          ...token,
          accessToken: account.access_token,
          idToken: account.id_token,
          refreshToken: account.refresh_token,
          accessTokenExpiresAt: Date.now() + (account.expires_in ?? 300) * 1000,
          roles,
          preferredUsername: profile?.preferred_username ?? token.name,
        }
      }

      if (token.accessTokenExpiresAt && Date.now() < token.accessTokenExpiresAt - 60_000) {
        return token
      }

      if (!token.refreshToken) {
        return { ...token, error: "NoRefreshToken" }
      }

      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        username: token.preferredUsername,
        roles: token.roles ?? [],
      }
      session.accessToken = token.accessToken
      session.idToken = token.idToken
      session.error = token.error
      return session
    },
  },
})
