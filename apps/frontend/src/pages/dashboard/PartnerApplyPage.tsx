import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useScholarshipDetailsQuery } from '../../features/scholarships/api'
import { useSubmitPartnerApplicationMutation } from '../../features/applications/api'
import {
  partnerApplicationSchema,
  type PartnerApplicationFormValues,
} from '../../features/applications/validation'
import { useGetAccountQuery } from '../../features/profile/api'
import { trackEvent } from '../../analytics/track'
import { useAuth } from '../../features/auth/hooks'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Card } from '../../components/ui/Card'

export function PartnerApplyPage() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: scholarship, isLoading, isError } = useScholarshipDetailsQuery(slug, {
    skip: !slug,
  })
  const { data: account } = useGetAccountQuery()
  const [submit, { isLoading: submitting }] = useSubmitPartnerApplicationMutation()

  const [values, setValues] = useState<PartnerApplicationFormValues>({
    fullName: user?.name ?? '',
    email: user?.email ?? '',
    phone: '',
    country: account?.profile?.country ?? '',
    educationLevel: account?.profile?.educationLevel ?? '',
    statement: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof PartnerApplicationFormValues, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      fullName: prev.fullName || user?.name || '',
      email: prev.email || user?.email || '',
      country: prev.country || account?.profile?.country || '',
      educationLevel: prev.educationLevel || account?.profile?.educationLevel || '',
    }))
  }, [user?.name, user?.email, account?.profile?.country, account?.profile?.educationLevel])

  if (isLoading) {
    return <p className="text-sm text-[var(--color-muted)]">Loading program…</p>
  }

  if (isError || !scholarship) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">Scholarship not found.</p>
        <Button to="/scholarships" variant="outline">
          Back to catalog
        </Button>
      </div>
    )
  }

  if (!scholarship.isPartnerApplication) {
    return (
      <div className="space-y-4">
        <p className="text-slate-700">
          This program uses an external application only.
        </p>
        {scholarship.applicationUrl ? (
          <a
            href={scholarship.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-primary)] font-semibold hover:underline"
          >
            Open official application
          </a>
        ) : null}
        <Button to={`/scholarships/${slug}`} variant="outline">
          Back to program
        </Button>
      </div>
    )
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormError(null)

    const parsed = partnerApplicationSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof PartnerApplicationFormValues, string>> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof PartnerApplicationFormValues
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    try {
      const result = await submit({
        scholarshipId: scholarship.id,
        body: parsed.data,
      }).unwrap()
      trackEvent('partner_application_submitted', {
        scholarshipId: scholarship.id,
      })
      navigate(`/dashboard/applications/${result.id}`, { replace: true })
    } catch {
      setFormError(
        'Could not submit application. You may have already applied to this program.',
      )
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        to={`/scholarships/${slug}`}
        className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
      >
        ← Back to program
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Apply in-platform</h1>
        <p className="mt-2 text-slate-600">{scholarship.title}</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="text-label mb-1 block">
              Full name
            </label>
            <Input
              id="fullName"
              value={values.fullName}
              onChange={(e) => setValues((v) => ({ ...v, fullName: e.target.value }))}
            />
            {errors.fullName ? (
              <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="text-label mb-1 block">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            />
            {errors.email ? (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="text-label mb-1 block">
                Phone (optional)
              </label>
              <Input
                id="phone"
                value={values.phone ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="country" className="text-label mb-1 block">
                Country (optional)
              </label>
              <Input
                id="country"
                value={values.country ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, country: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label htmlFor="educationLevel" className="text-label mb-1 block">
              Education level (optional)
            </label>
            <Input
              id="educationLevel"
              value={values.educationLevel ?? ''}
              onChange={(e) =>
                setValues((v) => ({ ...v, educationLevel: e.target.value }))
              }
            />
          </div>

          <div>
            <label htmlFor="statement" className="text-label mb-1 block">
              Motivation statement
            </label>
            <Textarea
              id="statement"
              rows={8}
              value={values.statement}
              onChange={(e) => setValues((v) => ({ ...v, statement: e.target.value }))}
              placeholder="Explain why you are a strong candidate for this program…"
            />
            {errors.statement ? (
              <p className="mt-1 text-xs text-red-600">{errors.statement}</p>
            ) : null}
          </div>

          {formError ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {formError}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit application'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
