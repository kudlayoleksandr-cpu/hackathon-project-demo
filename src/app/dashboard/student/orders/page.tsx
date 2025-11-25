'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatDate, formatRelativeTime, getStatusColor } from '@/lib/utils'
import { Order } from '@/lib/database.types'
import { ShoppingBag, Clock, CheckCircle, Send } from 'lucide-react'

export default function StudentOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return

      const supabase = createClient()
      let query = supabase
        .from('orders')
        .select('*, offers(*), applicant:users!orders_applicant_id_fkey(*)')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data } = await query

      if (data) {
        setOrders(data)
      }
      setLoading(false)
    }

    fetchOrders()
  }, [user, filter])

  const filterButtons = [
    { value: 'all', label: 'All' },
    { value: 'paid', label: 'To Deliver' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'completed', label: 'Completed' },
  ]

  return (
    <div>
      <DashboardHeader
        title="Orders"
        subtitle="Manage orders from applicants"
      />

      <div className="p-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {filterButtons.map((btn) => (
            <Button
              key={btn.value}
              variant={filter === btn.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(btn.value)}
            >
              {btn.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <div className="flex gap-4">
                  <div className="skeleton h-16 w-16 rounded-xl" />
                  <div className="flex-1">
                    <div className="skeleton h-5 w-48 mb-2" />
                    <div className="skeleton h-4 w-32" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <Card className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Orders will appear here when applicants purchase your offers
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{order.offers?.title || 'Order'}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      From {order.applicant?.name} • {formatRelativeTime(order.created_at)}
                    </p>
                    {order.offers && (
                      <p className="text-sm text-slate-500 mt-1">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {order.offers.delivery_days} day delivery
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Your earnings</p>
                      <p className="text-lg font-bold text-accent-600 dark:text-accent-400">
                        {formatPrice(order.seller_amount)}
                      </p>
                    </div>
                    {order.status === 'paid' && (
                      <Link href={`/dashboard/student/orders/${order.id}/deliver`}>
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          Deliver
                        </Button>
                      </Link>
                    )}
                    {order.status === 'delivered' && (
                      <Button size="sm" variant="outline" disabled>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Delivered
                      </Button>
                    )}
                    {order.status === 'completed' && (
                      <Button size="sm" variant="ghost" disabled>
                        <CheckCircle className="h-4 w-4 mr-1 text-accent-500" />
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

