import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { PublicNavbar } from '../../components/layout/PublicNavbar'

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <PublicNavbar />
      <Outlet />
      <Footer />
    </div>
  )
}
