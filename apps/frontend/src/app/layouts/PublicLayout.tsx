import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { PublicNavbar } from '../../components/layout/PublicNavbar'

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--color-bg)]">
      <PublicNavbar />
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
