import type { ReportStatus, ScholarshipStatus } from './types'
import type { VerificationStatus } from '../scholarships/types'

const scholarshipStatusLabels: Record<ScholarshipStatus, string> = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  ARCHIVED: 'Archived',
}

const scholarshipStatusStyles: Record<ScholarshipStatus, string> = {
  DRAFT: 'bg-slate-100 text-slate-700',
  PUBLISHED: 'bg-emerald-100 text-emerald-800',
  ARCHIVED: 'bg-amber-100 text-amber-900',
}

const reportStatusLabels: Record<ReportStatus, string> = {
  OPEN: 'Open',
  RESOLVED: 'Resolved',
  DISMISSED: 'Dismissed',
}

const reportStatusStyles: Record<ReportStatus, string> = {
  OPEN: 'bg-amber-100 text-amber-900',
  RESOLVED: 'bg-emerald-100 text-emerald-800',
  DISMISSED: 'bg-slate-100 text-slate-600',
}

const verificationLabels: Record<VerificationStatus, string> = {
  VERIFIED: 'Verified',
  UNVERIFIED: 'Unverified',
  FLAGGED_STALE: 'Stale',
}

const verificationStyles: Record<VerificationStatus, string> = {
  VERIFIED: 'bg-emerald-100 text-emerald-800',
  UNVERIFIED: 'bg-slate-100 text-slate-700',
  FLAGGED_STALE: 'bg-red-100 text-red-800',
}

export function formatScholarshipStatus(status: ScholarshipStatus): string {
  return scholarshipStatusLabels[status] ?? status
}

export function scholarshipStatusClass(status: ScholarshipStatus): string {
  return scholarshipStatusStyles[status] ?? 'bg-slate-100 text-slate-700'
}

export function formatReportStatus(status: ReportStatus): string {
  return reportStatusLabels[status] ?? status
}

export function reportStatusClass(status: ReportStatus): string {
  return reportStatusStyles[status] ?? 'bg-slate-100 text-slate-700'
}

export function formatVerificationStatus(status: VerificationStatus): string {
  return verificationLabels[status] ?? status
}

export function verificationStatusClass(status: VerificationStatus): string {
  return verificationStyles[status] ?? 'bg-slate-100 text-slate-700'
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}
