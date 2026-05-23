import { Card } from '../../components/ui/Card'

type DashboardPlaceholderPageProps = {
  title: string
  description: string
}

export function DashboardPlaceholderPage({
  title,
  description,
}: DashboardPlaceholderPageProps) {
  return (
    <Card className="mx-auto max-w-2xl p-8">
      <h1 className="text-xl font-bold text-[var(--color-text)]">{title}</h1>
      <p className="mt-3 text-sm text-[var(--color-muted)]">{description}</p>
    </Card>
  )
}
