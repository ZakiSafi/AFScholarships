import type { DegreeLevel, FundingType, ScholarshipListItem } from './types'

const degreeLabels: Record<DegreeLevel, string> = {
  BACHELOR: 'Bachelor',
  MASTER: 'Master',
  PHD: 'PhD',
  SHORT_COURSE: 'Short course',
}

const fundingLabels: Record<FundingType, string> = {
  FULL: 'Fully funded',
  PARTIAL: 'Partial funding',
  TUITION_ONLY: 'Tuition only',
  STIPEND_ONLY: 'Stipend',
}

export function formatDegreeLevel(level: DegreeLevel): string {
  return degreeLabels[level] ?? level
}

export function formatFundingType(type: FundingType): string {
  return fundingLabels[type] ?? type
}

export function formatDeadline(isoDate: string): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) {
    return isoDate
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function isVerified(status: ScholarshipListItem['verificationStatus']): boolean {
  return status === 'VERIFIED'
}

export function scholarshipTagNames(item: ScholarshipListItem): string[] {
  return (item.tags ?? []).map((link) => link.tag.name)
}
