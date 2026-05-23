import type { DegreeLevel, FundingType, ListScholarshipsParams } from './types'

const degreeLevels = new Set<DegreeLevel>([
  'BACHELOR',
  'MASTER',
  'PHD',
  'SHORT_COURSE',
])

const fundingTypes = new Set<FundingType>([
  'FULL',
  'PARTIAL',
  'TUITION_ONLY',
  'STIPEND_ONLY',
])

export function parseScholarshipSearchParams(
  searchParams: URLSearchParams,
): ListScholarshipsParams {
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '12')
  const degreeLevel = searchParams.get('degreeLevel')
  const fundingType = searchParams.get('fundingType')
  const sortBy = searchParams.get('sortBy')
  const sortOrder = searchParams.get('sortOrder')

  const params: ListScholarshipsParams = {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit: Number.isFinite(limit) && limit > 0 ? Math.min(limit, 50) : 12,
    includeFacets: true,
  }

  const search = searchParams.get('search')?.trim()
  if (search) {
    params.search = search
  }

  const country = searchParams.get('country')?.trim()
  if (country) {
    params.country = country
  }

  if (degreeLevel && degreeLevels.has(degreeLevel as DegreeLevel)) {
    params.degreeLevel = degreeLevel as DegreeLevel
  }

  if (fundingType && fundingTypes.has(fundingType as FundingType)) {
    params.fundingType = fundingType as FundingType
  }

  const tag = searchParams.get('tag')?.trim()
  if (tag) {
    params.tag = tag
  }

  if (searchParams.get('partnerOnly') === 'true') {
    params.partnerOnly = true
  }

  if (
    sortBy === 'deadline' ||
    sortBy === 'title' ||
    sortBy === 'created' ||
    sortBy === 'featured'
  ) {
    params.sortBy = sortBy
  }

  if (sortOrder === 'asc' || sortOrder === 'desc') {
    params.sortOrder = sortOrder
  }

  return params
}

export function buildScholarshipSearchParams(
  params: ListScholarshipsParams,
): URLSearchParams {
  const next = new URLSearchParams()

  if (params.search) {
    next.set('search', params.search)
  }
  if (params.country) {
    next.set('country', params.country)
  }
  if (params.degreeLevel) {
    next.set('degreeLevel', params.degreeLevel)
  }
  if (params.fundingType) {
    next.set('fundingType', params.fundingType)
  }
  if (params.tag) {
    next.set('tag', params.tag)
  }
  if (params.partnerOnly) {
    next.set('partnerOnly', 'true')
  }
  if (params.sortBy && params.sortBy !== 'deadline') {
    next.set('sortBy', params.sortBy)
  }
  if (params.sortOrder && params.sortOrder !== 'asc') {
    next.set('sortOrder', params.sortOrder)
  }
  if (params.page && params.page > 1) {
    next.set('page', String(params.page))
  }
  if (params.limit && params.limit !== 12) {
    next.set('limit', String(params.limit))
  }

  return next
}
