import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ScholarshipFilterValues } from '../../../components/catalog/list/CatalogFilters'
import {
  buildScholarshipSearchParams,
  parseScholarshipSearchParams,
} from '../search-params'
import type { ListScholarshipsParams } from '../types'
import { trackEvent } from '../../../analytics/track'
import { useListScholarshipsQuery } from '../api'

function filtersFromParams(
  searchParams: URLSearchParams,
): ScholarshipFilterValues {
  const parsed = parseScholarshipSearchParams(searchParams)
  return {
    search: parsed.search ?? '',
    country: parsed.country ?? '',
    degreeLevel: parsed.degreeLevel ?? '',
    fundingType: parsed.fundingType ?? '',
    partnerOnly: parsed.partnerOnly ?? false,
    sortBy: parsed.sortBy ?? 'deadline',
    sortOrder: parsed.sortOrder ?? 'asc',
  }
}

function paramsFromFilters(
  filters: ScholarshipFilterValues,
  page: number,
): ListScholarshipsParams {
  return {
    page,
    limit: 12,
    includeFacets: true,
    search: filters.search || undefined,
    country: filters.country || undefined,
    degreeLevel: filters.degreeLevel || undefined,
    fundingType: filters.fundingType || undefined,
    partnerOnly: filters.partnerOnly || undefined,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  }
}

export function useCatalogSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParams = useMemo(
    () => parseScholarshipSearchParams(searchParams),
    [searchParams],
  )
  const [filters, setFilters] = useState(() => filtersFromParams(searchParams))

  useEffect(() => {
    setFilters(filtersFromParams(searchParams))
  }, [searchParams])

  const query = useListScholarshipsQuery(queryParams)

  const applyFilters = useCallback(
    (nextFilters: ScholarshipFilterValues, page = 1) => {
      const params = buildScholarshipSearchParams(
        paramsFromFilters(nextFilters, page),
      )
      setSearchParams(params, { replace: true })
      trackEvent('scholarship_filter_applied', {
        search: nextFilters.search || undefined,
        country: nextFilters.country || undefined,
        degreeLevel: nextFilters.degreeLevel || undefined,
        fundingType: nextFilters.fundingType || undefined,
        partnerOnly: nextFilters.partnerOnly || undefined,
        page,
      })
    },
    [setSearchParams],
  )

  const setPage = useCallback(
    (page: number) => {
      const params = buildScholarshipSearchParams({ ...queryParams, page })
      setSearchParams(params, { replace: true })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [queryParams, setSearchParams],
  )

  const clearFilters = useCallback(() => {
    const empty: ScholarshipFilterValues = {
      search: '',
      country: '',
      degreeLevel: '',
      fundingType: '',
      partnerOnly: false,
      sortBy: 'deadline',
      sortOrder: 'asc',
    }
    setFilters(empty)
    applyFilters(empty, 1)
  }, [applyFilters])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.search) count += 1
    if (filters.country) count += 1
    if (filters.degreeLevel) count += 1
    if (filters.fundingType) count += 1
    if (filters.partnerOnly) count += 1
    if (filters.sortBy !== 'deadline' || filters.sortOrder !== 'asc') count += 1
    return count
  }, [filters])

  return {
    filters,
    setFilters,
    queryParams,
    activeFilterCount,
    applyFilters,
    setPage,
    clearFilters,
    ...query,
  }
}
