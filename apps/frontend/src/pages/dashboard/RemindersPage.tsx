import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  useDeleteReminderMutation,
  useListRemindersQuery,
  useUpdateReminderMutation,
} from '../../features/reminders/api'
import { formatDeadline } from '../../features/scholarships/format'
import {
  localDatetimeToIso,
  toLocalDatetimeInputValue,
} from '../../lib/reminder-default'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'

export function RemindersPage() {
  const { data: reminders = [], isLoading, isError } = useListRemindersQuery()
  const [updateReminder] = useUpdateReminderMutation()
  const [deleteReminder] = useDeleteReminderMutation()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const startEdit = (id: string, reminderAt: string) => {
    setEditingId(id)
    setEditValue(toLocalDatetimeInputValue(new Date(reminderAt)))
  }

  const saveEdit = async (id: string) => {
    await updateReminder({ id, reminderAt: localDatetimeToIso(editValue) })
    setEditingId(null)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Reminders</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Email reminders before scholarship deadlines. Create them from any program
          detail page.
        </p>
      </div>

      {isLoading ? (
        <p className="text-sm text-[var(--color-muted)]">Loading reminders…</p>
      ) : null}

      {isError ? (
        <p className="text-sm text-red-600">Could not load reminders.</p>
      ) : null}

      {!isLoading && !isError && reminders.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="font-semibold text-slate-900">No reminders scheduled</p>
          <p className="mt-2 text-sm text-slate-600">
            Open a scholarship and choose &quot;Set deadline reminder&quot;.
          </p>
          <Button to="/scholarships" className="mt-6">
            Browse scholarships
          </Button>
        </Card>
      ) : null}

      <ul className="space-y-4">
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            <Card className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link
                    to={`/scholarships/${reminder.scholarship.slug}`}
                    className="font-bold text-[var(--color-primary)] hover:underline"
                  >
                    {reminder.scholarship.title}
                  </Link>
                  <p className="mt-1 text-sm text-slate-600">
                    Program deadline:{' '}
                    {formatDeadline(reminder.scholarship.deadlineAt)}
                  </p>
                  <p className="mt-2 text-sm">
                    <span
                      className={
                        reminder.status === 'PENDING'
                          ? 'font-semibold text-amber-800'
                          : 'text-slate-500'
                      }
                    >
                      {reminder.status === 'PENDING'
                        ? 'Scheduled'
                        : reminder.status === 'SENT'
                          ? 'Sent'
                          : 'Failed'}
                    </span>
                  </p>
                </div>
              </div>

              {editingId === reminder.id ? (
                <div className="mt-4 flex flex-wrap items-end gap-2">
                  <div className="min-w-[200px] flex-1">
                    <label className="text-label mb-1 block">Remind at</label>
                    <Input
                      type="datetime-local"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  </div>
                  <Button size="sm" onClick={() => void saveEdit(reminder.id)}>
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="mt-4 flex flex-wrap gap-2">
                  <p className="text-sm text-slate-700">
                    Remind at:{' '}
                    <strong>{formatDeadline(reminder.reminderAt)}</strong>
                  </p>
                  {reminder.status === 'PENDING' ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(reminder.id, reminder.reminderAt)}
                      >
                        Reschedule
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => void deleteReminder(reminder.id)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : null}
                </div>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
