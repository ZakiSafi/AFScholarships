import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthFormCard } from '../../components/auth/AuthFormCard'
import { Button } from '../../components/ui/Button'
import { setCredentials } from '../../features/auth/authSlice'
import { useLazyGetProfileQuery } from '../../features/auth/api'
import { useAppDispatch } from '../../hooks'
import type { AuthTokensResponse } from '../../features/auth/types'

export function AuthCallbackPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [fetchProfile] = useLazyGetProfileQuery()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')

    if (!accessToken || !refreshToken) {
      setError('Google sign-in did not complete. Try again or use email sign-in.')
      return
    }

    const bootstrap: AuthTokensResponse = {
      accessToken,
      refreshToken,
      user: {
        id: 'pending',
        email: '',
        name: null,
        role: 'USER',
      },
    }

    dispatch(setCredentials(bootstrap))

    void fetchProfile()
      .unwrap()
      .then((profile) => {
        dispatch(
          setCredentials({
            accessToken,
            refreshToken,
            user: {
              id: profile.id,
              email: profile.email,
              name: profile.name ?? null,
              role: profile.role,
            },
          }),
        )
        navigate('/dashboard', { replace: true })
      })
      .catch(() => {
        navigate('/dashboard', { replace: true })
      })
  }, [dispatch, fetchProfile, navigate, searchParams])

  if (error) {
    return (
      <AuthFormCard title="Sign-in failed" subtitle={error}>
        <Button to="/auth/login" className="w-full">
          Back to sign in
        </Button>
        <p className="mt-4 text-center text-sm text-[var(--color-muted)]">
          <Link to="/">Return home</Link>
        </p>
      </AuthFormCard>
    )
  }

  return (
    <AuthFormCard
      title="Completing sign-in"
      subtitle="Please wait while we finish connecting your account…"
    >
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      </div>
    </AuthFormCard>
  )
}
