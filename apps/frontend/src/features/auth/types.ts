export type UserRole = 'USER' | 'ADMIN'

export type AuthUser = {
  id: string
  email: string
  name: string | null
  role: UserRole
}

export type AuthTokensResponse = {
  accessToken: string
  refreshToken: string
  user: AuthUser
}

export type ProfileResponse = {
  id: string
  email: string
  name: string | null
  role: UserRole
  emailVerifiedAt?: string | null
  createdAt?: string
  profile?: unknown
  preference?: unknown
}
