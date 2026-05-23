import type { ApplicationStatus } from './types'

const labels: Record<ApplicationStatus, string> = {
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under review',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
}

const styles: Record<ApplicationStatus, string> = {
  SUBMITTED: 'bg-blue-100 text-blue-800',
  UNDER_REVIEW: 'bg-amber-100 text-amber-900',
  ACCEPTED: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-red-100 text-red-800',
}

export function formatApplicationStatus(status: ApplicationStatus): string {
  return labels[status] ?? status
}

export function applicationStatusClass(status: ApplicationStatus): string {
  return styles[status] ?? 'bg-slate-100 text-slate-700'
}
