'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Spinner } from '@/components/ui/Spinner'
import { formatPrice, formatRelativeTime, getStatusColor } from '@/lib/utils'
import { mockOrders, getOffersWithUsers } from '@/lib/mock-data'
import { Order, OfferWithUser } from '@/lib/database.types'
import {
  Search,
  ShoppingBag,
  BookOpen,
  Star,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from 'lucide-react'

export default function ApplicantDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [recentPurchases, setRecentPurchases] = useState<Order[]>([])
  const [recommendedOffers, setRecommendedOffers] = useState<OfferWithUser[]>([])
  const [stats, setStats] = useState({
    totalPurchases: 0,
    pendingDeliveries: 0,
    completedInsights: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
      return
    }

    if (!authLoading && user && user.role !== 'applicant') {
      router.push('/dashboard')
      return
    }

    if (user) {
      // Load mock data
      setRecentPurchases(mockOrders)
      setRecommendedOffers(getOffersWithUsers().slice(0, 4))
      
      setStats({
        totalPurchases: mockOrders.length,
        pendingDeliveries: mockOrders.filter(o => o.status === 'paid' || o.status === 'pending').length,
        completedInsights: mockOrders.filter(o => o.status === 'completed').length,
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
        title={`Welcome, ${user?.name?.split(' ')[0] || 'there'}!`}
        subtitle="Discover insights from real students"
        action={
          <Link href="/explore">
            <Button leftIcon={<Search className="h-4 w-4" />}>
              Explore Students
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Purchases
                </p>
                <p className="text-2xl font-bold">{stats.totalPurchases}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Pending Deliveries
                </p>
                <p className="text-2xl font-bold">{stats.pendingDeliveries}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Completed Insights
                </p>
                <p className="text-2xl font-bold">{stats.completedInsights}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Purchases */}
          <Card padding="none">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Purchases</CardTitle>
                <Link
                  href="/dashboard/applicant/purchases"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  View all
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentPurchases.length === 0 ? (
                <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No purchases yet</p>
                  <p className="text-sm mb-4">Start exploring student insights</p>
                  <Link href="/explore">
                    <Button size="sm">Browse Offers</Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentPurchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium">Order #{purchase.id.slice(0, 8)}</p>
                        <p className="text-sm text-slate-500">
                          {formatRelativeTime(purchase.created_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(purchase.amount)}</p>
                        <Badge className={getStatusColor(purchase.status)}>
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommended Students */}
          <Card padding="none">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Recommended for You</CardTitle>
                <Link
                  href="/explore"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  See more
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recommendedOffers.length === 0 ? (
                <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No recommendations yet</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recommendedOffers.map((offer) => (
                    <Link
                      key={offer.id}
                      href={`/offers/${offer.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <Avatar
                        src={offer.users.avatar_url}
                        name={offer.users.name}
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{offer.title}</p>
                        <p className="text-sm text-slate-500 truncate">
                          {offer.users.name} • {offer.users.university}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-600 dark:text-primary-400">
                          {formatPrice(offer.price)}
                        </p>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                          <span>4.9</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Ready to learn from real students?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Browse through hundreds of students from top universities worldwide
                and get authentic insights about university life.
              </p>
            </div>
            <Link href="/explore" className="flex-shrink-0">
              <Button size="lg" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                Explore Now
              </Button>
            </Link>
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
