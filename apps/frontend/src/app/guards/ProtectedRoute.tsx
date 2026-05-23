import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import {
  selectAuthHydrated,
  selectIsAuthenticated,
} from '../../features/auth/authSlice'

export function ProtectedRoute() {
  const location = useLocation()
  const hydrated = useAppSelector(selectAuthHydrated)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    const returnUrl = encodeURIComponent(
      `${location.pathname}${location.search}`,
    )
    return <Navigate to={`/auth/login?returnUrl=${returnUrl}`} replace />
  }

  return <Outlet />
}
