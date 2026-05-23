import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthFormCard } from '../../components/auth/AuthFormCard'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useResetPasswordMutation } from '../../features/auth/api'
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '../../features/auth/validation'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const [values, setValues] = useState<ResetPasswordFormValues>({
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ResetPasswordFormValues, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormError(null)

    if (!token) {
      setFormError('Reset link is invalid or expired.')
      return
    }

    const parsed = resetPasswordSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ResetPasswordFormValues, string>> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ResetPasswordFormValues
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    try {
      await resetPassword({
        token,
        password: parsed.data.password,
      }).unwrap()
      navigate('/auth/login', {
        replace: true,
        state: { message: 'Password updated. You can sign in now.' },
      })
    } catch {
      setFormError('Could not reset password. The link may have expired.')
    }
  }

  return (
    <AuthFormCard
      title="Choose a new password"
      subtitle="Enter a strong password for your account."
      footer={
        <p className="text-center text-sm text-[var(--color-muted)]">
          <Link to="/auth/login" className="font-semibold text-[var(--color-primary)]">
            Back to sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
            New password
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          />
          {errors.password ? (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-sm font-medium text-[var(--color-text)]"
          >
            Confirm password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={(e) => setValues((v) => ({ ...v, confirmPassword: e.target.value }))}
          />
          {errors.confirmPassword ? (
            <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
          ) : null}
        </div>

        {formError ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Updating…' : 'Update password'}
        </Button>
      </form>
    </AuthFormCard>
  )
}
