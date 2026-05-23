import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  clearCredentials,
  selectAuthHydrated,
  selectAuthUser,
  selectIsAdmin,
  selectIsAuthenticated,
  setCredentials,
  setUser,
} from './authSlice'
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
} from './api'
import { identifyAnalyticsUser, resetAnalyticsUser } from '../../analytics/provider'
import { trackEvent } from '../../analytics/track'
import type { AuthTokensResponse } from './types'

export function useAuth() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isAdmin = useAppSelector(selectIsAdmin)
  const user = useAppSelector(selectAuthUser)
  const hydrated = useAppSelector(selectAuthHydrated)
  const refreshToken = useAppSelector((state) => state.auth.refreshToken)

  const [loginMutation, loginState] = useLoginMutation()
  const [signupMutation, signupState] = useSignupMutation()
  const [logoutMutation, logoutState] = useLogoutMutation()

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery(
    undefined,
    {
      skip: !isAuthenticated,
    },
  )

  useEffect(() => {
    if (profile && (!user || user.id === 'pending')) {
      dispatch(
        setUser({
          id: profile.id,
          email: profile.email,
          name: profile.name ?? null,
          role: profile.role,
        }),
      )
    }
  }, [dispatch, profile, user])

  const applyAuthResponse = useCallback(
    (response: AuthTokensResponse) => {
      dispatch(setCredentials(response))
    },
    [dispatch],
  )

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await loginMutation({ email, password }).unwrap()
      applyAuthResponse(result)
      identifyAnalyticsUser(result.user.id, {
        email: result.user.email,
        role: result.user.role,
      })
      trackEvent('login_success', { role: result.user.role })
      return result
    },
    [applyAuthResponse, loginMutation],
  )

  const signup = useCallback(
    async (email: string, password: string, name?: string) => {
      const result = await signupMutation({ email, password, name }).unwrap()
      applyAuthResponse(result)
      return result
    },
    [applyAuthResponse, signupMutation],
  )

  const logout = useCallback(async () => {
    if (refreshToken) {
      try {
        await logoutMutation({ refreshToken }).unwrap()
      } catch {
        // Clear local session even if server revoke fails
      }
    }
    dispatch(clearCredentials())
    resetAnalyticsUser()
    navigate('/auth/login')
  }, [dispatch, logoutMutation, navigate, refreshToken])

  return {
    isAuthenticated,
    isAdmin,
    user,
    hydrated,
    profileLoading,
    login,
    signup,
    logout,
    loginState,
    signupState,
    logoutState,
    applyAuthResponse,
    setUser: (profile: AuthTokensResponse['user']) => dispatch(setUser(profile)),
  }
}
