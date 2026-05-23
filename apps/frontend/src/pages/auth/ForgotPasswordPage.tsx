import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthFormCard } from '../../components/auth/AuthFormCard'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useForgotPasswordMutation } from '../../features/auth/api'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../../features/auth/validation'

export function ForgotPasswordPage() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const [values, setValues] = useState<ForgotPasswordFormValues>({ email: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof ForgotPasswordFormValues, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const parsed = forgotPasswordSchema.safeParse(values)
    if (!parsed.success) {
      setErrors({ email: parsed.error.issues[0]?.message })
      return
    }
    setErrors({})
    try {
      await forgotPassword(parsed.data).unwrap()
    } catch {
      // Always show success to avoid email enumeration
    }
    setSubmitted(true)
  }

  return (
    <AuthFormCard
      title="Reset your password"
      subtitle="We will email you a link to choose a new password."
      footer={
        <p className="text-center text-sm text-[var(--color-muted)]">
          <Link to="/auth/login" className="font-semibold text-[var(--color-primary)]">
            Back to sign in
          </Link>
        </p>
      }
    >
      {submitted ? (
        <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          If an account exists for that email, we sent reset instructions. Check MailHog
          in development or your inbox in production.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => setValues({ email: e.target.value })}
              placeholder="you@example.com"
            />
            {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>
      )}
    </AuthFormCard>
  )
}
