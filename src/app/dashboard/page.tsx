'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Spinner } from '@/components/ui/Spinner'

/**
 * Dashboard redirect page
 * Redirects users to their role-specific dashboard
 */
export default function DashboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'student') {
        router.replace('/dashboard/student')
      } else if (user.role === 'applicant') {
        router.replace('/dashboard/applicant')
      } else if (user.role === 'admin') {
        router.replace('/admin')
      }
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}

