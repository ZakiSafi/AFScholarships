import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  useArchiveScholarshipMutation,
  useBulkArchiveExpiredMutation,
  useBulkVerifyScholarshipsMutation,
  useFlagStaleScholarshipsMutation,
  useListAdminScholarshipsQuery,
  usePublishScholarshipMutation,
  useVerifyScholarshipMutation,
} from '../../features/admin/api'
import {
  formatScholarshipStatus,
  formatVerificationStatus,
  scholarshipStatusClass,
  verificationStatusClass,
} from '../../features/admin/format'
import { formatDeadline } from '../../features/scholarships/format'
import type { ScholarshipStatus } from '../../features/admin/types'
import type { VerificationStatus } from '../../features/scholarships/types'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'

export function AdminScholarshipsPage() {
  const [statusFilter, setStatusFilter] = useState<ScholarshipStatus | ''>('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [message, setMessage] = useState<string | null>(null)

  const { data, isLoading, isError } = useListAdminScholarshipsQuery({
    page,
    limit: 15,
    search: search || undefined,
    status: statusFilter || undefined,
    sortBy: 'created',
    sortOrder: 'desc',
  })

  const [publish] = usePublishScholarshipMutation()
  const [archive] = useArchiveScholarshipMutation()
  const [verify] = useVerifyScholarshipMutation()
  const [bulkVerify, { isLoading: bulkVerifying }] = useBulkVerifyScholarshipsMutation()
  const [bulkArchive, { isLoading: bulkArchiving }] = useBulkArchiveExpiredMutation()
  const [flagStale, { isLoading: flaggingStale }] = useFlagStaleScholarshipsMutation()

  const items = data?.items ?? []
  const allSelected = items.length > 0 && items.every((s) => selected.has(s.id))

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set())
    } else {
      setSelected(new Set(items.map((s) => s.id)))
    }
  }

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const selectedIds = useMemo(() => [...selected], [selected])

  const runBulkVerify = async () => {
    if (!selectedIds.length) {
      return
    }
    const result = await bulkVerify({ scholarshipIds: selectedIds }).unwrap()
    setMessage(`Verified ${result.succeeded} of ${result.total} scholarships.`)
    setSelected(new Set())
  }

  const runBulkArchive = async (dryRun: boolean) => {
    const result = await bulkArchive({ dryRun }).unwrap()
    if (dryRun) {
      setMessage(
        `Dry run: ${result.count ?? 0} expired published scholarship(s) would be archived.`,
      )
    } else {
      setMessage(`Archived ${result.archivedCount ?? 0} expired scholarship(s).`)
    }
  }

  const setVerification = async (id: string, status: VerificationStatus) => {
    await verify({ id, status })
    setMessage(`Verification updated to ${formatVerificationStatus(status)}.`)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Scholarships</h1>
          <p className="mt-2 text-[var(--color-muted)]">
            Publish drafts, verify listings, and run bulk maintenance.
          </p>
        </div>
        <Button to="/admin/scholarships/new">Create scholarship</Button>
      </div>

      <Card className="space-y-4 p-4">
        <div className="flex flex-wrap gap-3">
          <Input
            placeholder="Search title or provider…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="max-w-xs"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as ScholarshipStatus | '')
              setPage(1)
            }}
            className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-2 text-sm"
          >
            <option value="">All statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            disabled={!selectedIds.length || bulkVerifying}
            onClick={() => void runBulkVerify()}
          >
            Bulk verify selected ({selectedIds.length})
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={bulkArchiving}
            onClick={() => void runBulkArchive(true)}
          >
            Preview expired archive
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={bulkArchiving}
            onClick={() => void runBulkArchive(false)}
          >
            Archive expired
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={flaggingStale}
            onClick={async () => {
              await flagStale().unwrap()
              setMessage('Stale scholarship check completed.')
            }}
          >
            Flag stale
          </Button>
        </div>

        {message ? (
          <p className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-900">{message}</p>
        ) : null}
      </Card>

      {isLoading ? (
        <p className="text-sm text-[var(--color-muted)]">Loading scholarships…</p>
      ) : null}
      {isError ? (
        <p className="text-sm text-red-600">Could not load scholarships.</p>
      ) : null}

      {!isLoading && !isError ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="px-4 py-3">Program</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Verification</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((scholarship) => (
                <tr key={scholarship.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(scholarship.id)}
                      onChange={() => toggleOne(scholarship.id)}
                      aria-label={`Select ${scholarship.title}`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{scholarship.title}</p>
                    <p className="text-xs text-slate-500">{scholarship.provider}</p>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                      <Link
                        to={`/scholarships/${scholarship.slug}`}
                        className="text-[var(--color-primary)] hover:underline"
                      >
                        View public
                      </Link>
                      <Link
                        to={`/admin/scholarships/${scholarship.id}/edit`}
                        className="text-[var(--color-primary)] hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${scholarshipStatusClass(scholarship.status)}`}
                    >
                      {formatScholarshipStatus(scholarship.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${verificationStatusClass(scholarship.verificationStatus)}`}
                    >
                      {formatVerificationStatus(scholarship.verificationStatus)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatDeadline(scholarship.deadlineAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {scholarship.status === 'DRAFT' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => void publish(scholarship.id)}
                        >
                          Publish
                        </Button>
                      ) : null}
                      {scholarship.status === 'PUBLISHED' ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => void archive(scholarship.id)}
                        >
                          Archive
                        </Button>
                      ) : null}
                      {scholarship.verificationStatus !== 'VERIFIED' ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => void setVerification(scholarship.id, 'VERIFIED')}
                        >
                          Verify
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            void setVerification(scholarship.id, 'FLAGGED_STALE')
                          }
                        >
                          Flag stale
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">No scholarships match.</p>
          ) : null}
        </div>
      ) : null}

      {data && data.totalPages > 1 ? (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={!data.hasPreviousPage}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <p className="text-sm text-slate-600">
            Page {data.page} of {data.totalPages}
          </p>
          <Button
            variant="outline"
            size="sm"
            disabled={!data.hasNextPage}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  )
}
