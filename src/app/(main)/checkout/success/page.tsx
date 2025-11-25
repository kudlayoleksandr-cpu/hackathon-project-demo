'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'
import { CheckCircle2, ArrowRight, Home } from 'lucide-react'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate verification delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Confirming your payment...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-accent-50 to-white dark:from-accent-900/20 dark:to-slate-950">
      <Card className="max-w-md w-full text-center py-12">
        {/* Success Icon */}
        <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center animate-scale-in">
          <CheckCircle2 className="h-10 w-10 text-accent-600 dark:text-accent-400" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Payment Successful!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Thank you for your purchase. The student has been notified and will
          deliver your insights within the specified time.
        </p>

        {/* What's Next */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-8 text-left">
          <h3 className="font-semibold mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                1
              </span>
              <span>The student receives your order notification</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                2
              </span>
              <span>They prepare personalized insights based on your needs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                3
              </span>
              <span>You'll receive delivery notification via email</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/dashboard/applicant/purchases" className="flex-1">
            <Button className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View Order
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full" leftIcon={<Home className="h-4 w-4" />}>
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Support Note */}
        <p className="mt-8 text-xs text-slate-400">
          Questions about your order?{' '}
          <Link href="/help" className="text-primary-600 hover:underline">
            Contact support
          </Link>
        </p>
      </Card>
    </div>
  )
}

