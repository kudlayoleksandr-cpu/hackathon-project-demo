'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { formatPrice, formatDate } from '@/lib/utils'
import { OfferWithUser } from '@/lib/database.types'
import { getOffersWithUsers, mockUsers } from '@/lib/mock-data'
import {
  ArrowLeft,
  Star,
  Clock,
  Shield,
  CheckCircle2,
  MessageSquare,
  Video,
  FileText,
  MapPin,
  GraduationCap,
  Calendar,
  Share2,
  Heart,
} from 'lucide-react'
import toast from 'react-hot-toast'

const offerTypeDetails = {
  written_review: {
    icon: FileText,
    label: 'Written Review',
    description: 'Detailed written answers to your questions',
  },
  video_call: {
    icon: Video,
    label: 'Video Call',
    description: '1-on-1 video consultation session',
  },
  chat_session: {
    icon: MessageSquare,
    label: 'Chat Session',
    description: 'Ongoing chat conversation',
  },
}

export default function OfferDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [offer, setOffer] = useState<OfferWithUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)

  useEffect(() => {
    // Find offer from mock data
    const offers = getOffersWithUsers()
    const found = offers.find(o => o.id === id)
    setOffer(found || null)
    setLoading(false)
  }, [id])

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/offers/${id}`)
      return
    }

    setPurchasing(true)
    
    // Simulate purchase process
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success('Demo: Purchase successful! In production, this would use Stripe.')
    router.push('/checkout/success?demo=true')
    
    setPurchasing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!offer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Offer not found</h1>
        <Link href="/explore">
          <Button>Browse offers</Button>
        </Link>
      </div>
    )
  }

  const TypeIcon = offerTypeDetails[offer.offer_type].icon
  const isOwnOffer = user?.id === offer.user_id

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container-custom py-8">
        {/* Back Button */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to explore
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Offer Header */}
            <Card>
              <div className="flex items-start gap-4 mb-6">
                <Link href={`/students/${offer.users.id}`}>
                  <Avatar
                    src={offer.users.avatar_url}
                    name={offer.users.name}
                    size="xl"
                    showBadge={offer.users.is_verified}
                    badgeColor="bg-accent-500"
                  />
                </Link>
                <div className="flex-1">
                  <Link 
                    href={`/students/${offer.users.id}`}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <h2 className="text-xl font-bold">{offer.users.name}</h2>
                  </Link>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {offer.users.university && (
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        {offer.users.university}
                      </span>
                    )}
                    {offer.users.country && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {offer.users.country}
                      </span>
                    )}
                  </div>
                  {offer.users.study_program && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {offer.users.study_program}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="font-medium">4.9</span>
                      <span className="text-slate-400">(24 reviews)</span>
                    </div>
                    {offer.users.is_verified && (
                      <Badge variant="accent" className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Verified Student
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-4">{offer.title}</h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="primary" className="flex items-center gap-1">
                  <TypeIcon className="h-3 w-3" />
                  {offerTypeDetails[offer.offer_type].label}
                </Badge>
                <Badge variant="default" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {offer.delivery_days} day delivery
                </Badge>
                <Badge variant="default" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Listed {formatDate(offer.created_at)}
                </Badge>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{offer.description}</p>
              </div>
            </Card>

            {/* What You'll Get */}
            <Card>
              <h3 className="text-lg font-semibold mb-4">What You&apos;ll Get</h3>
              <ul className="space-y-3">
                {[
                  `${offerTypeDetails[offer.offer_type].description}`,
                  'Personalized insights based on your questions',
                  'Authentic first-hand experience and advice',
                  'Tips for application and admission process',
                  'Honest perspective on university life',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-400">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* About the Student */}
            {offer.users.bio && (
              <Card>
                <h3 className="text-lg font-semibold mb-4">About {offer.users.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                  {offer.users.bio}
                </p>
              </Card>
            )}

            {/* Reviews Section */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Reviews</h3>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">4.9</span>
                  <span className="text-slate-400">(24 reviews)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    name: 'Alex Thompson',
                    rating: 5,
                    date: '2 weeks ago',
                    comment: 'Incredibly helpful! Got detailed insights about the CS program that I couldn\'t find anywhere else. Highly recommend!',
                  },
                  {
                    name: 'Maria Garcia',
                    rating: 5,
                    date: '1 month ago',
                    comment: 'The video call was super informative. They answered all my questions about campus life and the admission process.',
                  },
                ].map((review, index) => (
                  <div key={index} className="border-b border-slate-100 dark:border-slate-800 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar name={review.name} size="sm" />
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-slate-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar - Purchase Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {formatPrice(offer.price)}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    one-time payment
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Delivery Time</span>
                    <span className="font-medium">{offer.delivery_days} day{offer.delivery_days > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Service Type</span>
                    <span className="font-medium">{offerTypeDetails[offer.offer_type].label}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Response Rate</span>
                    <span className="font-medium text-accent-600">98%</span>
                  </div>
                </div>

                {isOwnOffer ? (
                  <Link href={`/dashboard/student/offers/${offer.id}/edit`}>
                    <Button className="w-full" size="lg">
                      Edit Offer
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePurchase}
                    loading={purchasing}
                  >
                    Purchase Now
                  </Button>
                )}

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1" size="sm" onClick={() => toast.success('Added to favorites!')}>
                    <Heart className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm" onClick={() => toast.success('Link copied!')}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Shield className="h-4 w-4 text-accent-500" />
                    <span>Secure payment via Stripe</span>
                  </div>
                </div>

                {/* Demo Notice */}
                <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    <strong>Demo Mode:</strong> Payments are simulated. No real charges.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
