'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Search,
  CreditCard,
  MessageSquare,
  Star,
  Shield,
  CheckCircle2,
  ArrowRight,
  Users,
  GraduationCap,
  DollarSign,
  Clock,
  Heart,
  Zap,
} from 'lucide-react'

const forApplicants = [
  {
    step: 1,
    title: 'Browse & Discover',
    description:
      'Explore our network of verified students from top universities worldwide. Filter by university, country, program, or service type.',
    icon: Search,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    step: 2,
    title: 'Choose Your Service',
    description:
      'Select from written reviews, video calls, or chat sessions. Each student sets their own prices and delivery times.',
    icon: MessageSquare,
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  },
  {
    step: 3,
    title: 'Secure Payment',
    description:
      'Pay securely through Stripe. Your payment is held safely until you receive your consultation.',
    icon: CreditCard,
    color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  },
  {
    step: 4,
    title: 'Get Real Insights',
    description:
      'Receive personalized, authentic insights from real students. Ask follow-up questions and make informed decisions.',
    icon: Star,
    color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  },
]

const forStudents = [
  {
    step: 1,
    title: 'Create Your Profile',
    description:
      'Sign up and tell applicants about yourself, your university, and your experience.',
    icon: Users,
  },
  {
    step: 2,
    title: 'Set Up Offers',
    description:
      'Create offers for written reviews, video calls, or chat sessions. Set your own prices.',
    icon: GraduationCap,
  },
  {
    step: 3,
    title: 'Get Orders',
    description:
      'Applicants browse and purchase your services. You get notified for each new order.',
    icon: Zap,
  },
  {
    step: 4,
    title: 'Deliver & Earn',
    description:
      'Share your insights and get paid. Receive 85% of each payment directly to your account.',
    icon: DollarSign,
  },
]

const faqs = [
  {
    question: 'How much does it cost?',
    answer:
      'Prices are set by individual students, typically ranging from $15 to $100 depending on the type of service. You only pay for the consultations you choose to purchase.',
  },
  {
    question: 'How do I know the students are real?',
    answer:
      'All students on our platform are verified using their university email addresses. We also have a review system so you can see feedback from previous applicants.',
  },
  {
    question: 'What if I\'m not satisfied with the consultation?',
    answer:
      'We have a satisfaction guarantee. If the student doesn\'t deliver as promised, you can request a refund through our support team.',
  },
  {
    question: 'How do students get paid?',
    answer:
      'Students receive 85% of each payment through Stripe. The platform takes a 15% commission to cover payment processing and platform maintenance.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Delivery times are set by each student, typically 1-7 days. You can see the delivery time before purchasing and filter by it when browsing.',
  },
  {
    question: 'Can I ask follow-up questions?',
    answer:
      'Yes! For written reviews and chat sessions, you can usually ask follow-up questions within the delivery period. Video calls allow real-time Q&A.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              How It Works
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Connect with Real Students,
              <br />
              <span className="gradient-text">Get Real Insights</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              StudentInsights makes it easy to get authentic advice from current
              students at your dream universities. Here&apos;s how it works.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Get Started Free
                </Button>
              </Link>
              <Link href="/explore">
                <Button variant="outline" size="lg">
                  Browse Students
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Applicants Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="accent" className="mb-4">
              For Applicants
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How to Get Student Insights
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Follow these simple steps to connect with current students and get
              the information you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forApplicants.map((step, index) => (
              <Card
                key={step.step}
                className="relative animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-primary-500 text-white font-bold flex items-center justify-center">
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`mt-4 mb-4 h-14 w-14 rounded-xl ${step.color} flex items-center justify-center`}>
                  <step.icon className="h-7 w-7" />
                </div>

                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="primary" className="mb-4">
                For Students
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Share Your Experience,
                <br />
                Earn While You Learn
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Turn your university experience into income. Help prospective
                students make informed decisions while earning extra money on
                your own schedule.
              </p>

              <div className="space-y-6">
                {forStudents.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <step.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Step {step.step}: {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/auth/register?role=student" className="inline-block mt-8">
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Start Earning Today
                </Button>
              </Link>
            </div>

            {/* Earnings Illustration */}
            <div className="relative">
              <Card className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-0">
                <div className="text-center py-8">
                  <DollarSign className="h-16 w-16 mx-auto text-primary-500 mb-4" />
                  <p className="text-4xl font-bold mb-2">85%</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    You keep of each sale
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
                      <Clock className="h-6 w-6 text-accent-500 mx-auto mb-2" />
                      <p className="font-bold">24h</p>
                      <p className="text-xs text-slate-500">Fast Payouts</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
                      <Shield className="h-6 w-6 text-accent-500 mx-auto mb-2" />
                      <p className="font-bold">100%</p>
                      <p className="text-xs text-slate-500">Secure</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-4">
              Trust & Safety
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Your Security Matters</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Students',
                description:
                  'All students are verified using their university email addresses to ensure authenticity.',
              },
              {
                icon: CreditCard,
                title: 'Secure Payments',
                description:
                  'All payments are processed securely through Stripe, a trusted payment provider.',
              },
              {
                icon: Heart,
                title: 'Satisfaction Guarantee',
                description:
                  'Not satisfied? Contact our support team for assistance with refunds.',
              },
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <div className="h-14 w-14 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">
              FAQs
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-500 to-accent-500">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of students and applicants already using
              StudentInsights to make better education decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-white/90"
                >
                  Create Free Account
                </Button>
              </Link>
              <Link href="/explore">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/50 text-white hover:bg-white/10"
                >
                  Browse Students
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

