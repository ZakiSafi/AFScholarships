export type ApplicationStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'ACCEPTED'
  | 'REJECTED'

export type ApplicationScholarshipEmbed = {
  id: string
  slug: string
  title: string
  provider: string
  deadlineAt: string
  isPartnerApplication: boolean
}

export type ApplicationStatusLog = {
  id: string
  applicationId: string
  fromStatus: ApplicationStatus | null
  toStatus: ApplicationStatus
  note: string | null
  createdAt: string
}

export type PartnerApplication = {
  id: string
  scholarshipId: string
  userId: string
  fullName: string
  email: string
  phone: string | null
  country: string | null
  educationLevel: string | null
  statement: string
  docsUrls: string[]
  status: ApplicationStatus
  createdAt: string
  updatedAt: string
  scholarship: ApplicationScholarshipEmbed
  statusLogs: ApplicationStatusLog[]
}

export type CreatePartnerApplicationPayload = {
  fullName: string
  email: string
  phone?: string
  country?: string
  educationLevel?: string
  statement: string
  docsUrls?: string[]
}
