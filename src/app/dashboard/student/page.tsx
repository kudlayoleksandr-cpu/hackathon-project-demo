'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { formatPrice, formatRelativeTime, getStatusColor } from '@/lib/utils'
import { getOffersByUserId, getOrdersByUserId, mockOffers, mockOrders } from '@/lib/mock-data'
import { Offer, Order } from '@/lib/database.types'
import {
  Plus,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Star,
  ArrowUpRight,
  FileText,
} from 'lucide-react'

export default function StudentDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalEarnings: 0,
    pendingEarnings: 0,
    totalOrders: 0,
    activeOffers: 0,
    avgRating: 4.9,
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
      return
    }

    if (!authLoading && user && user.role !== 'student') {
      router.push('/dashboard')
      return
    }

    if (user) {
      // Load mock data
      const userOffers = mockOffers.filter(o => o.user_id === user.id || user.role === 'student')
      const userOrders = mockOrders.filter(o => o.seller_id === user.id || user.role === 'student')
      
      setOffers(userOffers.length > 0 ? userOffers : mockOffers.slice(0, 3))
      setRecentOrders(userOrders.length > 0 ? userOrders : mockOrders)
      
      const completedOrders = mockOrders.filter(o => o.status === 'completed')
      const pendingOrders = mockOrders.filter(o => o.status === 'paid' || o.status === 'delivered')
      
      setStats({
        totalEarnings: completedOrders.reduce((sum, o) => sum + o.seller_amount, 0),
        pendingEarnings: pendingOrders.reduce((sum, o) => sum + o.seller_amount, 0),
        totalOrders: mockOrders.length,
        activeOffers: mockOffers.filter(o => o.is_active).length,
        avgRating: 4.9,
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
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'Student'}!`}
        subtitle="Here's what's happening with your offers"
        action={
          <Link href="/dashboard/student/offers/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Create Offer
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Earnings
                </p>
                <p className="text-2xl font-bold">
                  {formatPrice(stats.totalEarnings)}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Pending Earnings
                </p>
                <p className="text-2xl font-bold">
                  {formatPrice(stats.pendingEarnings)}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
              <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Average Rating
                </p>
                <p className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card padding="none">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Link
                  href="/dashboard/student/orders"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  View all
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No orders yet</p>
                  <p className="text-sm">Orders will appear here once applicants purchase your offers</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentOrders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-slate-500">
                          {formatRelativeTime(order.created_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(order.seller_amount)}</p>
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

          {/* Active Offers */}
          <Card padding="none">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Your Offers</CardTitle>
                <Link
                  href="/dashboard/student/offers"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  Manage all
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {offers.length === 0 ? (
                <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No offers yet</p>
                  <p className="text-sm mb-4">Create your first offer to start earning</p>
                  <Link href="/dashboard/student/offers/new">
                    <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                      Create Offer
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {offers.slice(0, 5).map((offer) => (
                    <div
                      key={offer.id}
                      className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{offer.title}</p>
                        <p className="text-sm text-slate-500">
                          {offer.delivery_days} day delivery
                        </p>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <Badge variant={offer.is_active ? 'success' : 'default'}>
                          {offer.is_active ? 'Active' : 'Paused'}
                        </Badge>
                        <p className="font-medium">{formatPrice(offer.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Tips */}
        <Card className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-0">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Tips to increase your earnings</h3>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Complete your profile with a photo and detailed bio</li>
                <li>• Respond to orders quickly for better ratings</li>
                <li>• Offer multiple service types (written, video, chat)</li>
                <li>• Ask satisfied customers to leave reviews</li>
              </ul>
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
