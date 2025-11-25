import { DashboardSidebar } from '@/components/layout/DashboardSidebar'

/**
 * Dashboard layout with sidebar
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardSidebar />
      <div className="pl-64">
        {children}
      </div>
    </div>
  )
}

