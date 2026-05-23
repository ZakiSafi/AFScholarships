import { useState } from 'react'
import { useListAuditLogsQuery } from '../../features/admin/api'
import { formatDateTime } from '../../features/admin/format'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'

export function AdminAuditLogsPage() {
  const [page, setPage] = useState(1)
  const [entityType, setEntityType] = useState('')
  const [entityId, setEntityId] = useState('')

  const { data, isLoading, isError } = useListAuditLogsQuery({
    page,
    limit: 25,
    entityType: entityType || undefined,
    entityId: entityId || undefined,
  })

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Audit logs</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Moderation actions recorded for scholarships, reports, and applications.
        </p>
      </div>

      <Card className="flex flex-wrap gap-3 p-4">
        <div>
          <label htmlFor="entity-type" className="text-label mb-1 block">
            Entity type
          </label>
          <Input
            id="entity-type"
            placeholder="e.g. scholarship"
            value={entityType}
            onChange={(e) => {
              setEntityType(e.target.value)
              setPage(1)
            }}
            className="max-w-xs"
          />
        </div>
        <div>
          <label htmlFor="entity-id" className="text-label mb-1 block">
            Entity ID
          </label>
          <Input
            id="entity-id"
            placeholder="UUID"
            value={entityId}
            onChange={(e) => {
              setEntityId(e.target.value)
              setPage(1)
            }}
            className="max-w-xs"
          />
        </div>
      </Card>

      {isLoading ? (
        <p className="text-sm text-[var(--color-muted)]">Loading audit logs…</p>
      ) : null}
      {isError ? (
        <p className="text-sm text-red-600">Could not load audit logs.</p>
      ) : null}

      {!isLoading && !isError ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Entity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data?.items ?? []).map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                    {formatDateTime(log.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">
                      {log.actor.name ?? log.actor.email}
                    </p>
                    {log.actor.name ? (
                      <p className="text-xs text-slate-500">{log.actor.email}</p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{log.action}</td>
                  <td className="px-4 py-3">
                    <p className="text-slate-700">{log.entityType}</p>
                    <p className="font-mono text-xs text-slate-400">{log.entityId}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(data?.items.length ?? 0) === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">No audit entries found.</p>
          ) : null}
        </div>
      ) : null}

      {data && data.totalPages > 1 ? (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <p className="text-sm text-slate-600">
            Page {data.page} of {data.totalPages} ({data.total} total)
          </p>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= data.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  )
}
