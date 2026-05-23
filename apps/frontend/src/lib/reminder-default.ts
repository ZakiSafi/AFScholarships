/** Suggest a reminder datetime before scholarship deadline (or ~1 week from now). */
export function defaultReminderAt(deadlineIso: string): string {
  const deadline = new Date(deadlineIso)
  const now = new Date()
  const weekBefore = new Date(deadline)
  weekBefore.setDate(weekBefore.getDate() - 7)

  let target = weekBefore > now ? weekBefore : new Date(now)
  if (target >= deadline) {
    target = new Date(now)
    target.setDate(target.getDate() + 1)
  }
  if (target <= now) {
    target = new Date(now.getTime() + 60 * 60 * 1000)
  }

  return toLocalDatetimeInputValue(target)
}

export function toLocalDatetimeInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function localDatetimeToIso(value: string): string {
  return new Date(value).toISOString()
}
