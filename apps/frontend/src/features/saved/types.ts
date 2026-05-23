import type { DegreeLevel, FundingType, VerificationStatus } from '../scholarships/types'

export type SavedScholarshipEmbed = {
  id: string
  slug: string
  title: string
  summary: string
  provider: string
  hostCountry: string
  degreeLevel: DegreeLevel
  fundingType: FundingType
  deadlineAt: string
  verificationStatus: VerificationStatus
  isPartnerApplication: boolean
  status: string
}

export type SavedItem = {
  id: string
  userId: string
  scholarshipId: string
  createdAt: string
  scholarship: SavedScholarshipEmbed
}

export type SavedCheckResponse = {
  saved: boolean
  savedAt: string | null
}
