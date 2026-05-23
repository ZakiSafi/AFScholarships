import { useParams } from 'react-router-dom'
import { DetailAside } from '../../../components/catalog/detail/DetailAside'
import { DetailContent } from '../../../components/catalog/detail/DetailContent'
import { DetailOverview } from '../../../components/catalog/detail/DetailOverview'
import { DetailRelated } from '../../../components/catalog/detail/DetailRelated'
import {
  DetailLoadingState,
  DetailNotFoundState,
} from '../../../components/catalog/detail/DetailStates'
import {
  useRelatedScholarshipsQuery,
  useScholarshipDetailsQuery,
} from '../../../features/scholarships/api'
export function ScholarshipDetailPage() {
  const { slug = '' } = useParams()
  const { data, isLoading, isError } = useScholarshipDetailsQuery(slug, {
    skip: !slug,
  })
  const { data: related } = useRelatedScholarshipsQuery(
    { slug, limit: 3 },
    { skip: !slug || !data },
  )

  if (isLoading) {
    return <DetailLoadingState />
  }

  if (isError || !data) {
    return <DetailNotFoundState />
  }

  return (
    <>
      <DetailOverview scholarship={data} />

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
            <DetailContent scholarship={data} />
            <DetailAside scholarship={data} />
          </div>
        </div>
      </section>

      {related?.items?.length ? <DetailRelated items={related.items} /> : null}
    </>
  )
}
