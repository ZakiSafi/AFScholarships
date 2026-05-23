import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthFormCard } from '../../components/auth/AuthFormCard'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { signupSchema, type SignupFormValues } from '../../features/auth/validation'
import { useAuth } from '../../features/auth/hooks'

export function SignupPage() {
  const navigate = useNavigate()
  const { signup, signupState } = useAuth()

  const [values, setValues] = useState<SignupFormValues>({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormValues, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormError(null)

    const parsed = signupSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof SignupFormValues, string>> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof SignupFormValues
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    try {
      await signup(
        parsed.data.email,
        parsed.data.password,
        parsed.data.name || undefined,
      )
      navigate('/dashboard', { replace: true })
    } catch {
      setFormError('Could not create account. This email may already be registered.')
    }
  }

  return (
    <AuthFormCard
      title="Create your account"
      subtitle="Free for students — save scholarships and get deadline reminders."
      footer={
        <p className="text-center text-sm text-[var(--color-muted)]">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-semibold text-[var(--color-primary)]">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
            Full name (optional)
          </label>
          <Input
            id="name"
            value={values.name ?? ''}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            placeholder="Your name"
          />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
        </div>

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
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
            Password
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
            placeholder="At least 8 characters"
          />
          {errors.password ? (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          ) : null}
        </div>

        {formError ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</p>
        ) : null}

        <Button type="submit" className="w-full" disabled={signupState.isLoading}>
          {signupState.isLoading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </AuthFormCard>
  )
}
