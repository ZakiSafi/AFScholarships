import { useState } from 'react'
import { useCreateReminderMutation } from '../../features/reminders/api'
import {
  defaultReminderAt,
  localDatetimeToIso,
  toLocalDatetimeInputValue,
} from '../../lib/reminder-default'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

type ReminderFormProps = {
  scholarshipId: string
  deadlineAt: string
  onSuccess?: () => void
}

export function ReminderForm({
  scholarshipId,
  deadlineAt,
  onSuccess,
}: ReminderFormProps) {
  const [open, setOpen] = useState(false)
  const [reminderAt, setReminderAt] = useState(() => defaultReminderAt(deadlineAt))
  const [error, setError] = useState<string | null>(null)
  const [createReminder, { isLoading }] = useCreateReminderMutation()

  const handleSubmit = async () => {
    setError(null)
    try {
      await createReminder({
        scholarshipId,
        reminderAt: localDatetimeToIso(reminderAt),
      }).unwrap()
      setOpen(false)
      onSuccess?.()
    } catch {
      setError('Could not create reminder. Try a different date.')
    }
  }

  if (!open) {
    return (
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => {
          setReminderAt(defaultReminderAt(deadlineAt))
          setOpen(true)
        }}
      >
        Set deadline reminder
      </Button>
    )
  }

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <label htmlFor="reminder-at" className="text-label block">
        Remind me at
      </label>
      <Input
        id="reminder-at"
        type="datetime-local"
        value={reminderAt}
        min={toLocalDatetimeInputValue(new Date())}
        onChange={(e) => setReminderAt(e.target.value)}
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      <div className="flex gap-2">
        <Button
          type="button"
          className="flex-1"
          disabled={isLoading}
          onClick={() => void handleSubmit()}
        >
          {isLoading ? 'Saving…' : 'Save reminder'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
