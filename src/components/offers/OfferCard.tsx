'use client'

import Link from 'next/link'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { formatPrice } from '@/lib/utils'
import { OfferWithUser } from '@/lib/database.types'
import { Clock, Star, MessageSquare, Video, FileText } from 'lucide-react'

interface OfferCardProps {
  offer: OfferWithUser
}

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

/**
 * Card component for displaying offer preview
 */
export function OfferCard({ offer }: OfferCardProps) {
  const Icon = offerTypeIcons[offer.offer_type]
  
  return (
    <Link href={`/offers/${offer.id}`}>
      <Card hover className="group h-full flex flex-col">
        {/* Header with user info */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar
            src={offer.users.avatar_url}
            name={offer.users.name}
            size="lg"
            showBadge={offer.users.is_verified}
            badgeColor="bg-accent-500"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {offer.users.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
              {offer.users.university}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
              {offer.users.study_program}
            </p>
          </div>
        </div>

        {/* Offer Title & Description */}
        <div className="flex-1">
          <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2 line-clamp-2">
            {offer.title}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
            {offer.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="primary" className="flex items-center gap-1">
            <Icon className="h-3 w-3" />
            {offerTypeLabels[offer.offer_type]}
          </Badge>
          {offer.users.country && (
            <Badge variant="default">{offer.users.country}</Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <Clock className="h-4 w-4" />
            <span>{offer.delivery_days} day{offer.delivery_days > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium">4.9</span>
          </div>
          <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
            {formatPrice(offer.price)}
          </p>
        </div>
      </Card>
    </Link>
  )
}

/**
 * Skeleton loader for offer card
 */
export function OfferCardSkeleton() {
  return (
    <Card className="h-full">
      <div className="flex items-start gap-3 mb-4">
        <div className="skeleton h-14 w-14 rounded-full" />
        <div className="flex-1">
          <div className="skeleton h-5 w-32 mb-2" />
          <div className="skeleton h-4 w-24 mb-1" />
          <div className="skeleton h-3 w-20" />
        </div>
      </div>
      <div className="skeleton h-5 w-full mb-2" />
      <div className="skeleton h-4 w-3/4 mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="skeleton h-6 w-24 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
      <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
        <div className="skeleton h-5 w-16" />
        <div className="skeleton h-5 w-12" />
        <div className="skeleton h-6 w-16" />
      </div>
    </Card>
  )
}

