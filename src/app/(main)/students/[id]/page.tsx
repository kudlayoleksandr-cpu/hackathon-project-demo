'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { OfferCard, OfferCardSkeleton } from '@/components/offers/OfferCard'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { formatDate } from '@/lib/utils'
import { User, OfferWithUser } from '@/lib/database.types'
import { getUserById, getOffersByUserId } from '@/lib/mock-data'
import {
  Star,
  MapPin,
  GraduationCap,
  Calendar,
  Shield,
  MessageSquare,
  Share2,
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function StudentProfilePage() {
  const { id } = useParams()
  const [student, setStudent] = useState<User | null>(null)
  const [offers, setOffers] = useState<OfferWithUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load from mock data
    const userData = getUserById(id as string)
    const offersData = getOffersByUserId(id as string).filter(o => o.is_active)
    
    setStudent(userData || null)
    setOffers(offersData)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Student not found</h1>
        <Link href="/explore">
          <Button>Browse students</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header Banner */}
      <div className="h-48 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500" />

      <div className="container-custom -mt-24 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="relative">
              {/* Avatar */}
              <div className="flex justify-center -mt-16 mb-4">
                <Avatar
                  src={student.avatar_url}
                  name={student.name}
                  size="xl"
                  showBadge={student.is_verified}
                  badgeColor="bg-accent-500"
                  className="ring-4 ring-white dark:ring-slate-800"
                />
              </div>

              {/* Name & Info */}
              <div className="text-center">
                <h1 className="text-2xl font-bold">{student.name}</h1>
                
                <div className="flex flex-wrap justify-center items-center gap-2 mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {student.university && (
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      {student.university}
                    </span>
                  )}
                  {student.country && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {student.country}
                    </span>
                  )}
                </div>

                {student.study_program && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {student.study_program}
                  </p>
                )}

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {student.is_verified && (
                    <Badge variant="accent" className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Verified Student
                    </Badge>
                  )}
                  <Badge variant="default" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Joined {formatDate(student.created_at)}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{offers.length}</p>
                    <p className="text-xs text-slate-500">Offers</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <p className="text-2xl font-bold">4.9</p>
                    </div>
                    <p className="text-xs text-slate-500">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-xs text-slate-500">Reviews</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-6">
                  <Button variant="outline" className="flex-1" onClick={() => toast.success('Demo: Message sent!')}>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => toast.success('Link copied!')}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Bio */}
            {student.bio && (
              <Card className="mt-6">
                <h3 className="font-semibold mb-3">About</h3>
                <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                  {student.bio}
                </p>
              </Card>
            )}
          </div>

          {/* Offers Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6 mt-8 lg:mt-0">
              <h2 className="text-xl font-bold">
                Offers by {student.name.split(' ')[0]}
              </h2>
              <span className="text-slate-500 dark:text-slate-400">
                {offers.length} offer{offers.length !== 1 ? 's' : ''}
              </span>
            </div>

            {offers.length === 0 ? (
              <Card className="text-center py-12">
                <GraduationCap className="h-16 w-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                <h3 className="text-lg font-semibold mb-2">No active offers</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  This student hasn&apos;t created any offers yet
                </p>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {offers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            )}

            {/* Reviews Section */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">4.9</span>
                  <span className="text-slate-400">(24 reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: 'Alex Thompson',
                    rating: 5,
                    date: '2 weeks ago',
                    comment: 'Incredibly helpful! Got detailed insights about the CS program that I couldn\'t find anywhere else.',
                  },
                  {
                    name: 'Maria Garcia',
                    rating: 5,
                    date: '1 month ago',
                    comment: 'The video call was super informative. Answered all my questions about campus life.',
                  },
                  {
                    name: 'James Wilson',
                    rating: 4,
                    date: '2 months ago',
                    comment: 'Great insights about the application process. Would recommend!',
                  },
                ].map((review, index) => (
                  <Card key={index}>
                    <div className="flex items-center gap-3 mb-3">
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
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
