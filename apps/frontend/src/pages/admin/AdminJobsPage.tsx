import { useState } from 'react'
import { useRunAdminJobMutation } from '../../features/admin/api'
import type { AdminJobName } from '../../features/admin/types'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

const jobs: Array<{
  id: AdminJobName
  title: string
  description: string
}> = [
  {
    id: 'stale-scholarships',
    title: 'Stale scholarship check',
    description:
      'Flags published scholarships that have not been reviewed recently.',
  },
  {
    id: 'reminder-sender',
    title: 'Reminder sender',
    description: 'Sends pending deadline reminder emails to students.',
  },
  {
    id: 'digest-sender',
    title: 'Digest sender',
    description: 'Sends weekly scholarship digest emails to opted-in users.',
  },
  {
    id: 'notification-retry',
    title: 'Notification retry',
    description: 'Retries failed notification deliveries.',
  },
]

export function AdminJobsPage() {
  const [runJob, { isLoading }] = useRunAdminJobMutation()
  const [lastResult, setLastResult] = useState<{
    job: AdminJobName
    result: Record<string, unknown>
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRun = async (job: AdminJobName) => {
    setError(null)
    setLastResult(null)
    try {
      const result = await runJob(job).unwrap()
      setLastResult({ job, result })
    } catch {
      setError(`Could not run job "${job}".`)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Background jobs</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Manually trigger scheduled tasks. In production these run on a cron schedule.
        </p>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id}>
            <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <h2 className="font-bold text-slate-900">{job.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{job.description}</p>
                <p className="mt-2 font-mono text-xs text-slate-400">{job.id}</p>
              </div>
              <Button
                size="sm"
                disabled={isLoading}
                onClick={() => void handleRun(job.id)}
              >
                Run now
              </Button>
            </Card>
          </li>
        ))}
      </ul>

      {lastResult ? (
        <Card className="p-5">
          <h2 className="font-bold text-slate-900">Last run: {lastResult.job}</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
            {JSON.stringify(lastResult.result, null, 2)}
          </pre>
        </Card>
      ) : null}
    </div>
  )
}
