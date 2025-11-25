'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Spinner } from '@/components/ui/Spinner'
import { formatPrice, formatRelativeTime, getStatusColor } from '@/lib/utils'
import { mockUsers, mockOrders, mockOffers } from '@/lib/mock-data'
import {
  Users,
  DollarSign,
  ShoppingBag,
  FileText,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalApplicants: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalOffers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
      return
    }

    if (!authLoading && user && user.role !== 'admin') {
      router.push('/dashboard')
      return
    }

    if (user) {
      // Calculate stats from mock data
      setStats({
        totalUsers: mockUsers.length,
        totalStudents: mockUsers.filter(u => u.role === 'student').length,
        totalApplicants: mockUsers.filter(u => u.role === 'applicant').length,
        totalOrders: mockOrders.length,
        totalRevenue: mockOrders.reduce((sum, o) => sum + (o.platform_fee || 0), 0),
        totalOffers: mockOffers.length,
      })
      setLoading(false)
    }
  }, [user, authLoading, router])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Platform overview and management"
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Users
                </p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Platform Revenue
                </p>
                <p className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Orders
                </p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Active Offers
                </p>
                <p className="text-2xl font-bold">{stats.totalOffers}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card padding="none">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Users</CardTitle>
                <a
                  href="/admin/users"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  View all
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockUsers.slice(0, 5).map((mockUser) => (
                  <div
                    key={mockUser.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar src={mockUser.avatar_url} name={mockUser.name} size="sm" />
                      <div>
                        <p className="font-medium">{mockUser.name}</p>
                        <p className="text-sm text-slate-500">{mockUser.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={mockUser.role === 'student' ? 'primary' : mockUser.role === 'admin' ? 'danger' : 'default'}
                      >
                        {mockUser.role}
                      </Badge>
                      <p className="text-xs text-slate-400 mt-1">
                        {formatRelativeTime(mockUser.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card padding="none">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <a
                  href="/admin/orders"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  View all
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </CardHeader>
            <CardContent>
              {mockOrders.length === 0 ? (
                <div className="p-6 text-center text-slate-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No orders yet</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4"
                    >
                      <div>
                        <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-slate-500">
                          {formatRelativeTime(order.created_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(order.amount)}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Platform Stats */}
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-0">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-red-500 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Platform Overview</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {stats.totalStudents} students • {stats.totalApplicants} applicants •{' '}
                {stats.totalOffers} active offers
              </p>
            </div>
          </div>
        </Card>

        {/* Demo Notice */}
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            <strong>Demo Mode:</strong> This is a demonstration with sample data. All features are simulated.
          </p>
        </Card>
      </div>
    </div>
  )
}
