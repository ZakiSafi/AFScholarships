import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import {
  selectAuthHydrated,
  selectIsAuthenticated,
} from '../../features/auth/authSlice'

/** Redirect authenticated users away from login/signup pages */
export function GuestRoute() {
  const hydrated = useAppSelector(selectAuthHydrated)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
