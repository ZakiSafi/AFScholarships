import { useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthFormCard } from '../../components/auth/AuthFormCard'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { loginSchema, type LoginFormValues } from '../../features/auth/validation'
import { useAuth } from '../../features/auth/hooks'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const successMessage =
    (location.state as { message?: string } | null)?.message ?? null
  const [searchParams] = useSearchParams()
  const returnUrl = decodeURIComponent(
    searchParams.get('returnUrl') ?? '/dashboard',
  )
  const { login, loginState } = useAuth()

  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormError(null)

    const parsed = loginSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof LoginFormValues, string>> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof LoginFormValues
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    try {
      await login(parsed.data.email, parsed.data.password)
      navigate(returnUrl, { replace: true })
    } catch {
      setFormError('Invalid email or password. Please try again.')
    }
  }

  return (
    <AuthFormCard
      title="Welcome back"
      subtitle="Sign in to save scholarships, set reminders, and track applications."
      footer={
        <p className="text-center text-sm text-[var(--color-muted)]">
          Don&apos;t have an account?{' '}
          <Link to="/auth/signup" className="font-semibold text-[var(--color-primary)]">
            Create one
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {successMessage ? (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {successMessage}
          </p>
        ) : null}

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            placeholder="you@example.com"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-[var(--color-text)]">
              Password
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-xs font-medium text-[var(--color-primary)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
            placeholder="••••••••"
          />
          {errors.password ? (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          ) : null}
        </div>

        {formError ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</p>
        ) : null}

        <Button type="submit" className="w-full" disabled={loginState.isLoading}>
          {loginState.isLoading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthFormCard>
  )
}
