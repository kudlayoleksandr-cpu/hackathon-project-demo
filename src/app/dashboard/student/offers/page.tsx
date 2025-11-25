'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, formatDate } from '@/lib/utils'
import { Offer } from '@/lib/database.types'
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  FileText,
  Video,
  MessageSquare,
  MoreVertical,
} from 'lucide-react'
import toast from 'react-hot-toast'

const offerTypeIcons = {
  written_review: FileText,
  video_call: Video,
  chat_session: MessageSquare,
}

const offerTypeLabels = {
  written_review: 'Written Review',
  video_call: 'Video Call',
  chat_session: 'Chat Session',
}

export default function OffersPage() {
  const { user } = useAuth()
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOffers = useCallback(async () => {
    if (!user) return

    const supabase = createClient()
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (data) {
      setOffers(data)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchOffers()
  }, [fetchOffers])

  async function toggleOfferStatus(offer: Offer) {
    const supabase = createClient()
    const { error } = await supabase
      .from('offers')
      .update({ is_active: !offer.is_active })
      .eq('id', offer.id)

    if (error) {
      toast.error('Failed to update offer')
      return
    }

    toast.success(offer.is_active ? 'Offer paused' : 'Offer activated')
    fetchOffers()
  }

  async function deleteOffer(offer: Offer) {
    if (!confirm('Are you sure you want to delete this offer?')) return

    const supabase = createClient()
    const { error } = await supabase
      .from('offers')
      .delete()
      .eq('id', offer.id)

    if (error) {
      toast.error('Failed to delete offer')
      return
    }

    toast.success('Offer deleted')
    fetchOffers()
  }

  return (
    <div>
      <DashboardHeader
        title="My Offers"
        subtitle={`${offers.length} offer${offers.length !== 1 ? 's' : ''} created`}
        action={
          <Link href="/dashboard/student/offers/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Create Offer
            </Button>
          </Link>
        }
      />

      <div className="p-6">
        {loading ? (
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <div className="flex gap-4">
                  <div className="skeleton h-12 w-12 rounded-xl" />
                  <div className="flex-1">
                    <div className="skeleton h-5 w-48 mb-2" />
                    <div className="skeleton h-4 w-32" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : offers.length === 0 ? (
          <Card className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
            <h3 className="text-lg font-semibold mb-2">No offers yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Create your first offer to start earning from your university experience
            </p>
            <Link href="/dashboard/student/offers/new">
              <Button leftIcon={<Plus className="h-4 w-4" />}>
                Create Your First Offer
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => {
              const Icon = offerTypeIcons[offer.offer_type]
              return (
                <Card key={offer.id} className="hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">{offer.title}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                            {offer.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={offer.is_active ? 'success' : 'default'}>
                            {offer.is_active ? 'Active' : 'Paused'}
                          </Badge>
                          <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                            {formatPrice(offer.price)}
                          </p>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 mt-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>{offerTypeLabels[offer.offer_type]}</span>
                        <span>•</span>
                        <span>{offer.delivery_days} day delivery</span>
                        <span>•</span>
                        <span>Created {formatDate(offer.created_at)}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-4">
                        <Link href={`/dashboard/student/offers/${offer.id}/edit`}>
                          <Button variant="outline" size="sm" leftIcon={<Edit className="h-4 w-4" />}>
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleOfferStatus(offer)}
                          leftIcon={
                            offer.is_active ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )
                          }
                        >
                          {offer.is_active ? 'Pause' : 'Activate'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteOffer(offer)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          leftIcon={<Trash2 className="h-4 w-4" />}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

