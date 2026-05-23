import type { ApplicationStatus } from '../applications/types'
import type {
  ListScholarshipsParams,
  ScholarshipListItem,
  VerificationStatus,
} from '../scholarships/types'

export type ScholarshipStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export type ReportStatus = 'OPEN' | 'RESOLVED' | 'DISMISSED'

export type AdminScholarshipListItem = ScholarshipListItem & {
  status: ScholarshipStatus
  createdAt: string
  updatedAt: string
}

export type AdminListScholarshipsParams = ListScholarshipsParams & {
  status?: ScholarshipStatus
}

export type AdminScholarshipsListResponse = {
  items: AdminScholarshipListItem[]
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type ListingReport = {
  id: string
  reason: string
  details: string | null
  status: ReportStatus
  createdAt: string
  scholarship: {
    id: string
    slug: string
    title: string
    provider: string
    verificationStatus: VerificationStatus
  }
  user: { id: string; email: string; name: string | null } | null
}

export type AdminApplicationQueueItem = {
  id: string
  status: ApplicationStatus
  fullName: string
  email: string
  createdAt: string
  scholarship: {
    id: string
    slug: string
    title: string
    provider: string
  }
  user: { id: string; email: string; name: string | null }
  statusLogs: Array<{
    id: string
    toStatus: ApplicationStatus
    note: string | null
    createdAt: string
  }>
}

export type AuditLogActor = {
  id: string
  email: string
  name: string | null
}

export type AuditLogEntry = {
  id: string
  entityType: string
  entityId: string
  action: string
  metadata: Record<string, unknown> | null
  createdAt: string
  actor: AuditLogActor
}

export type AuditLogsResponse = {
  items: AuditLogEntry[]
  page: number
  limit: number
  total: number
  totalPages: number
}

export type ListAuditLogsParams = {
  page?: number
  limit?: number
  entityType?: string
  entityId?: string
}

export type BulkVerifyPayload = {
  scholarshipIds: string[]
  status?: VerificationStatus
  note?: string
}

export type BulkVerifyResult = {
  total: number
  succeeded: number
  failed: number
  results: Array<{ id: string; success: boolean; error?: string }>
}

export type BulkArchiveResult = {
  dryRun?: boolean
  count?: number
  archivedCount?: number
  scholarships: Array<{ id: string; slug: string; title: string }>
}

export type AdminJobName =
  | 'stale-scholarships'
  | 'reminder-sender'
  | 'digest-sender'
  | 'notification-retry'

export type RunJobResult = Record<string, unknown>
