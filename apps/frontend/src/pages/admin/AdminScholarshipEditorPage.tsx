import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useCreateScholarshipMutation,
  useListAdminScholarshipsQuery,
  usePublishScholarshipMutation,
  useUpdateScholarshipMutation,
} from '../../features/admin/api'
import { useScholarshipDetailsQuery } from '../../features/scholarships/api'
import type { DegreeLevel, FundingType } from '../../features/scholarships/types'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'

type FormState = {
  slug: string
  title: string
  summary: string
  description: string
  provider: string
  hostCountry: string
  degreeLevel: DegreeLevel
  fundingType: FundingType
  languageRequirement: string
  fieldOfStudy: string
  eligibleCountries: string
  applicationUrl: string
  isPartnerApplication: boolean
  isFeatured: boolean
  deadlineDate: string
}

const emptyForm = (): FormState => ({
  slug: '',
  title: '',
  summary: '',
  description: '',
  provider: '',
  hostCountry: '',
  degreeLevel: 'MASTER',
  fundingType: 'FULL',
  languageRequirement: '',
  fieldOfStudy: '',
  eligibleCountries: 'Afghanistan',
  applicationUrl: '',
  isPartnerApplication: false,
  isFeatured: false,
  deadlineDate: '',
})

function toDateInput(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

export function AdminScholarshipEditorPage() {
  const { id } = useParams()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()

  const { data: adminList } = useListAdminScholarshipsQuery(
    { limit: 100 },
    { skip: isNew },
  )
  const listItem = adminList?.items.find((s) => s.id === id)
  const { data: detail } = useScholarshipDetailsQuery(listItem?.slug ?? '', {
    skip: isNew || !listItem?.slug,
  })

  const [createScholarship, { isLoading: creating }] = useCreateScholarshipMutation()
  const [updateScholarship, { isLoading: updating }] = useUpdateScholarshipMutation()
  const [publishScholarship, { isLoading: publishing }] = usePublishScholarshipMutation()

  const [form, setForm] = useState<FormState>(emptyForm)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!detail) return
    setForm({
      slug: detail.slug,
      title: detail.title,
      summary: detail.summary,
      description: detail.description,
      provider: detail.provider,
      hostCountry: detail.hostCountry,
      degreeLevel: detail.degreeLevel,
      fundingType: detail.fundingType,
      languageRequirement: detail.languageRequirement ?? '',
      fieldOfStudy: detail.fieldOfStudy.join(', '),
      eligibleCountries: detail.eligibleCountries.join(', '),
      applicationUrl: detail.applicationUrl ?? '',
      isPartnerApplication: detail.isPartnerApplication,
      isFeatured: detail.isFeatured,
      deadlineDate: toDateInput(detail.deadlineAt),
    })
  }, [detail])

  const buildPayload = () => {
    const deadlineAt = form.deadlineDate
      ? new Date(`${form.deadlineDate}T23:59:59.000Z`).toISOString()
      : new Date().toISOString()

    return {
      slug: form.slug.trim(),
      title: form.title.trim(),
      summary: form.summary.trim(),
      description: form.description.trim(),
      provider: form.provider.trim(),
      hostCountry: form.hostCountry.trim(),
      degreeLevel: form.degreeLevel,
      fundingType: form.fundingType,
      languageRequirement: form.languageRequirement.trim() || undefined,
      fieldOfStudy: form.fieldOfStudy
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      eligibleCountries: form.eligibleCountries
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      applicationUrl: form.isPartnerApplication
        ? undefined
        : form.applicationUrl.trim() || undefined,
      isPartnerApplication: form.isPartnerApplication,
      isFeatured: form.isFeatured,
      deadlineAt,
      deadlineTimezone: 'UTC',
      requirements: [
        {
          orderIndex: 1,
          label: 'Eligibility',
          description: 'See full description for nationality and academic requirements.',
          isMandatory: true,
        },
      ],
      benefits: [
        {
          orderIndex: 1,
          title: 'Program benefits',
          description: 'See official source for funding details.',
        },
      ],
      sources: form.applicationUrl
        ? [
            {
              url: form.applicationUrl.trim(),
              label: 'Official application',
            },
          ]
        : [],
      faqs: [],
      tags: [{ slug: 'fully-funded', name: 'Fully funded' }],
    }
  }

  const handleSave = async (publishAfter = false) => {
    setError(null)
    try {
      if (isNew) {
        const created = await createScholarship(buildPayload()).unwrap()
        if (publishAfter) {
          await publishScholarship(created.id).unwrap()
        }
        navigate('/admin/scholarships', { replace: true })
        return
      }
      if (!id) return
      await updateScholarship({ id, body: buildPayload() }).unwrap()
      if (publishAfter) {
        await publishScholarship(id).unwrap()
      }
      navigate('/admin/scholarships', { replace: true })
    } catch {
      setError('Could not save scholarship. Check required fields and slug uniqueness.')
    }
  }

  const busy = creating || updating || publishing

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/admin/scholarships"
        className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
      >
        ← Scholarships
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {isNew ? 'Create scholarship' : 'Edit scholarship'}
        </h1>
        <p className="mt-2 text-slate-600">
          {isNew
            ? 'New listings are saved as drafts until you publish.'
            : `Editing ${listItem?.title ?? 'program'}`}
        </p>
      </div>

      <Card className="space-y-5 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-label mb-1 block">Title</label>
            <Input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-label mb-1 block">URL slug</label>
            <Input
              value={form.slug}
              disabled={!isNew}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-label mb-1 block">Provider</label>
            <Input
              value={form.provider}
              onChange={(e) => setForm((f) => ({ ...f, provider: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-label mb-1 block">Host country</label>
            <Input
              value={form.hostCountry}
              onChange={(e) => setForm((f) => ({ ...f, hostCountry: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-label mb-1 block">Deadline</label>
            <Input
              type="date"
              value={form.deadlineDate}
              onChange={(e) => setForm((f) => ({ ...f, deadlineDate: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-label mb-1 block">Degree level</label>
            <select
              value={form.degreeLevel}
              onChange={(e) =>
                setForm((f) => ({ ...f, degreeLevel: e.target.value as DegreeLevel }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="BACHELOR">Bachelor</option>
              <option value="MASTER">Master</option>
              <option value="PHD">PhD</option>
              <option value="SHORT_COURSE">Short course</option>
            </select>
          </div>
          <div>
            <label className="text-label mb-1 block">Funding type</label>
            <select
              value={form.fundingType}
              onChange={(e) =>
                setForm((f) => ({ ...f, fundingType: e.target.value as FundingType }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="FULL">Full</option>
              <option value="PARTIAL">Partial</option>
              <option value="TUITION_ONLY">Tuition only</option>
              <option value="STIPEND_ONLY">Stipend only</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-label mb-1 block">Summary</label>
          <Textarea
            rows={2}
            value={form.summary}
            onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-label mb-1 block">Description</label>
          <Textarea
            rows={6}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-label mb-1 block">Fields of study (comma-separated)</label>
          <Input
            value={form.fieldOfStudy}
            onChange={(e) => setForm((f) => ({ ...f, fieldOfStudy: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-label mb-1 block">Eligible countries (comma-separated)</label>
          <Input
            value={form.eligibleCountries}
            onChange={(e) => setForm((f) => ({ ...f, eligibleCountries: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-label mb-1 block">Official application URL</label>
          <Input
            value={form.applicationUrl}
            disabled={form.isPartnerApplication}
            onChange={(e) => setForm((f) => ({ ...f, applicationUrl: e.target.value }))}
          />
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isPartnerApplication}
              onChange={(e) =>
                setForm((f) => ({ ...f, isPartnerApplication: e.target.checked }))
              }
            />
            Partner (in-platform apply)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
            />
            Featured on homepage
          </label>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          <Button type="button" disabled={busy} onClick={() => void handleSave(false)}>
            {busy ? 'Saving…' : 'Save draft'}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={busy}
            onClick={() => void handleSave(true)}
          >
            Save & publish
          </Button>
        </div>
      </Card>
    </div>
  )
}
