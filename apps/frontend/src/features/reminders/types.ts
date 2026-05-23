export type ReminderStatus = 'PENDING' | 'SENT' | 'FAILED'

export type ReminderScholarshipEmbed = {
  id: string
  slug: string
  title: string
  provider?: string
  deadlineAt: string
  hostCountry?: string
}

export type UserReminder = {
  id: string
  userId: string
  scholarshipId: string
  reminderAt: string
  status: ReminderStatus
  sentAt?: string | null
  createdAt: string
  scholarship: ReminderScholarshipEmbed
}
