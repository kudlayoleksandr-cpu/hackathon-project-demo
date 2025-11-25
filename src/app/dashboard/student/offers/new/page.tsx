'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { OfferType } from '@/lib/database.types'
import { ArrowLeft, FileText, Video, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

const offerTypes = [
  {
    value: 'written_review',
    label: 'Written Review',
    description: 'Provide detailed written answers to questions',
    icon: FileText,
  },
  {
    value: 'video_call',
    label: 'Video Call',
    description: '1-on-1 video consultation',
    icon: Video,
  },
  {
    value: 'chat_session',
    label: 'Chat Session',
    description: 'Ongoing chat conversation over a few days',
    icon: MessageSquare,
  },
]

export default function NewOfferPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    offer_type: 'written_review' as OfferType,
    price: '',
    delivery_days: '3',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters'
    }

    const price = parseFloat(formData.price)
    if (!formData.price || isNaN(price)) {
      newErrors.price = 'Price is required'
    } else if (price < 5) {
      newErrors.price = 'Minimum price is $5'
    } else if (price > 500) {
      newErrors.price = 'Maximum price is $500'
    }

    const days = parseInt(formData.delivery_days)
    if (!formData.delivery_days || isNaN(days)) {
      newErrors.delivery_days = 'Delivery time is required'
    } else if (days < 1 || days > 30) {
      newErrors.delivery_days = 'Delivery time must be between 1 and 30 days'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    if (!user) return

    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.from('offers').insert({
      user_id: user.id,
      title: formData.title,
      description: formData.description,
      offer_type: formData.offer_type,
      price: Math.round(parseFloat(formData.price) * 100), // Convert to cents
      delivery_days: parseInt(formData.delivery_days),
    })

    setLoading(false)

    if (error) {
      toast.error('Failed to create offer')
      return
    }

    toast.success('Offer created successfully!')
    router.push('/dashboard/student/offers')
  }

  return (
    <div>
      <DashboardHeader
        title="Create New Offer"
        subtitle="Share your university experience and earn"
      />

      <div className="p-6 max-w-3xl">
        <Link
          href="/dashboard/student/offers"
          className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to offers
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Offer Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              What type of service are you offering?
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {offerTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      offer_type: type.value as OfferType,
                    }))
                  }
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.offer_type === type.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <type.icon
                    className={`h-6 w-6 mb-2 ${
                      formData.offer_type === type.value
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-slate-400'
                    }`}
                  />
                  <p className="font-medium">{type.label}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {type.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <Card>
            <div className="space-y-6">
              {/* Title */}
              <Input
                label="Offer Title"
                placeholder="e.g., Everything you need to know about Computer Science at MIT"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                error={errors.title}
                hint="Make it descriptive and specific to attract the right buyers"
              />

              {/* Description */}
              <Textarea
                label="Description"
                placeholder="Describe what you'll provide in detail. Include topics you can cover, your experience, and what makes your perspective unique..."
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                error={errors.description}
                hint={`${formData.description.length}/500 characters (minimum 50)`}
                className="min-h-[150px]"
              />

              <div className="grid md:grid-cols-2 gap-6">
                {/* Price */}
                <Input
                  label="Price (USD)"
                  type="number"
                  min="5"
                  max="500"
                  step="0.01"
                  placeholder="25.00"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  error={errors.price}
                  hint="You'll receive 85% after platform fee"
                  leftIcon={<span className="text-slate-400">$</span>}
                />

                {/* Delivery Time */}
                <Select
                  label="Delivery Time"
                  value={formData.delivery_days}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      delivery_days: e.target.value,
                    }))
                  }
                  options={[
                    { value: '1', label: '1 day' },
                    { value: '2', label: '2 days' },
                    { value: '3', label: '3 days' },
                    { value: '5', label: '5 days' },
                    { value: '7', label: '7 days' },
                    { value: '14', label: '14 days' },
                  ]}
                  error={errors.delivery_days}
                />
              </div>
            </div>
          </Card>

          {/* Earnings Preview */}
          {formData.price && !isNaN(parseFloat(formData.price)) && (
            <Card className="bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    You will earn (after 15% platform fee)
                  </p>
                  <p className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                    ${(parseFloat(formData.price) * 0.85).toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Platform fee
                  </p>
                  <p className="text-lg font-medium text-slate-500">
                    ${(parseFloat(formData.price) * 0.15).toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Submit */}
          <div className="flex items-center gap-4">
            <Button type="submit" size="lg" loading={loading}>
              Create Offer
            </Button>
            <Link href="/dashboard/student/offers">
              <Button variant="ghost" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

