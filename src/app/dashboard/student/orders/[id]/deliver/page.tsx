'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { formatPrice, formatDate } from '@/lib/utils'
import { getOrderById, mockOrders } from '@/lib/mock-data'
import { ArrowLeft, Send, FileText, Video, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

// Import the type from mock-data for consistency
type OrderWithRelations = {
  id: string
  created_at: string
  content?: string | null
  meeting_link?: string | null
  status: string
  seller_amount: number
  seller_id: string
  offers?: {
    title?: string
    offer_type?: string
  } | null
  applicant?: {
    name?: string
  } | null
}

export default function DeliverOrderPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [order, setOrder] = useState<OrderWithRelations | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [content, setContent] = useState('')
  const [meetingLink, setMeetingLink] = useState('')

  useEffect(() => {
    function fetchOrder() {
      if (!user || !id) {
        setLoading(false)
        return
      }

      // Use mock data (demo mode)
      const orderData = getOrderById(id as string)
      if (orderData && orderData.seller_id === user.id) {
        setOrder(orderData)
        setContent(orderData.content || '')
        setMeetingLink(orderData.meeting_link || '')
      }
      setLoading(false)
    }

    fetchOrder()
  }, [id, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim() && !meetingLink.trim()) {
      toast.error('Please provide content or a meeting link')
      return
    }

    setSubmitting(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (order) {
      const updatedOrder = {
        ...order,
        content,
        meeting_link: meetingLink,
        status: 'delivered' as const,
      }
      setOrder(updatedOrder)
      
      // Update mock data
      const index = mockOrders.findIndex(o => o.id === id)
      if (index !== -1) {
        mockOrders[index] = { 
          ...mockOrders[index], 
          content,
          meeting_link: meetingLink,
          status: 'delivered',
          delivered_at: new Date().toISOString()
        }
      }
    }
    
    toast.success('Order delivered successfully!')
    router.push('/dashboard/student/orders')
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <Link href="/dashboard/student/orders">
          <Button>Back to orders</Button>
        </Link>
      </div>
    )
  }

  const offerType = order.offers?.offer_type

  return (
    <div>
      <DashboardHeader
        title="Deliver Order"
        subtitle={`Order #${order.id.slice(0, 8)}`}
      />

      <div className="p-6 max-w-3xl">
        <Link
          href="/dashboard/student/orders"
          className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </Link>

        {/* Order Summary */}
        <Card className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">{order.offers?.title}</h3>
              <p className="text-sm text-slate-500 mt-1">
                Ordered by {order.applicant?.name} on {formatDate(order.created_at)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Your earnings</p>
              <p className="text-xl font-bold text-accent-600">
                {formatPrice(order.seller_amount)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Badge variant="primary">
              {offerType === 'written_review' && <FileText className="h-3 w-3 mr-1" />}
              {offerType === 'video_call' && <Video className="h-3 w-3 mr-1" />}
              {offerType === 'chat_session' && <MessageSquare className="h-3 w-3 mr-1" />}
              {offerType?.replace(/_/g, ' ')}
            </Badge>
            <Badge variant="warning">{order.status}</Badge>
          </div>
        </Card>

        {/* Delivery Form */}
        <Card>
          <h3 className="font-semibold text-lg mb-4">Deliver Your Insights</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {(offerType === 'written_review' || offerType === 'chat_session') && (
              <Textarea
                label="Your Insights"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your detailed insights, experiences, and advice here..."
                className="min-h-[300px]"
                hint="Be thorough and helpful - this is what the applicant is paying for!"
              />
            )}

            {offerType === 'video_call' && (
              <>
                <Input
                  label="Meeting Link"
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                  hint="Provide a Zoom, Google Meet, or other video call link"
                />
                <Textarea
                  label="Additional Notes (Optional)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Any preparation notes or follow-up information..."
                  className="min-h-[150px]"
                />
              </>
            )}

            <div className="flex items-center gap-4">
              <Button type="submit" loading={submitting} leftIcon={<Send className="h-4 w-4" />}>
                Deliver Order
              </Button>
              <Link href="/dashboard/student/orders">
                <Button variant="ghost">Cancel</Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

