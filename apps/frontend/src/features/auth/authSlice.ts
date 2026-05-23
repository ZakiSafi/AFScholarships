import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  clearStoredTokens,
  getStoredAccessToken,
  getStoredRefreshToken,
  setStoredTokens,
} from '../../lib/auth-storage'
import type { AuthTokensResponse, AuthUser } from './types'

type AuthState = {
  accessToken: string | null
  refreshToken: string | null
  user: AuthUser | null
  hydrated: boolean
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  hydrated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateFromStorage(state) {
      state.accessToken = getStoredAccessToken()
      state.refreshToken = getStoredRefreshToken()
      state.hydrated = true
    },
    setCredentials(state, action: PayloadAction<AuthTokensResponse>) {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
      setStoredTokens(action.payload.accessToken, action.payload.refreshToken)
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
    },
    clearCredentials(state) {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
      clearStoredTokens()
    },
    markHydrated(state) {
      state.hydrated = true
    },
  },
})

export const {
  hydrateFromStorage,
  setCredentials,
  setUser,
  clearCredentials,
  markHydrated,
} = authSlice.actions

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  Boolean(state.auth.accessToken)

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user

export const selectIsAdmin = (state: { auth: AuthState }) =>
  state.auth.user?.role === 'ADMIN'

export const selectAuthHydrated = (state: { auth: AuthState }) => state.auth.hydrated

export default authSlice.reducer
