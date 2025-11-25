'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatDate, getStatusColor } from '@/lib/utils'
import { Order } from '@/lib/database.types'
import { ShoppingBag, ExternalLink, MessageSquare } from 'lucide-react'

type OrderWithRelations = Order & {
  offers?: any
  seller?: any
}

export default function PurchasesPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<OrderWithRelations[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return

      const supabase = createClient()
      const { data } = await supabase
        .from('orders')
        .select('*, offers(*), seller:users!orders_seller_id_fkey(*)')
        .eq('applicant_id', user.id)
        .order('created_at', { ascending: false })

      if (data) {
        setOrders(data)
      }
      setLoading(false)
    }

    fetchOrders()
  }, [user])

  return (
    <div>
      <DashboardHeader
        title="My Purchases"
        subtitle={`${orders.length} purchase${orders.length !== 1 ? 's' : ''}`}
      />

      <div className="p-6">
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
            <h3 className="text-lg font-semibold mb-2">No purchases yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Start exploring student insights to make informed decisions
            </p>
            <Link href="/explore">
              <Button>Browse Students</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{order.offers?.title || 'Order'}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      From {order.seller?.name} • {formatDate(order.created_at)}
                    </p>
                    {order.content && order.status === 'delivered' && (
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {order.content}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold">{formatPrice(order.amount)}</p>
                    {order.status === 'delivered' || order.status === 'completed' ? (
                      <Link href={`/dashboard/applicant/purchases/${order.id}`}>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    ) : (
                      <Button size="sm" variant="ghost" disabled>
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Pending
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

