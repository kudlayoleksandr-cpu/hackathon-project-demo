'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import {
  GraduationCap,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  MessageSquare,
  Video,
  FileText,
  Globe,
  Zap,
  Heart,
} from 'lucide-react'

// Featured universities for the landing page
const featuredUniversities = [
  { name: 'MIT', logo: '🏛️' },
  { name: 'Stanford', logo: '🎓' },
  { name: 'Oxford', logo: '📚' },
  { name: 'Harvard', logo: '🔬' },
  { name: 'ETH Zurich', logo: '⚙️' },
  { name: 'Cambridge', logo: '🏰' },
]

// Sample testimonials
const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Admitted to Stanford',
    avatar: null,
    quote:
      'The insights I got from current students were invaluable. They helped me understand what life at Stanford is really like beyond the brochures.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'CS Student at MIT',
    avatar: null,
    quote:
      'As a student seller, I love helping prospective students make informed decisions. Plus, earning extra income while studying is a huge bonus!',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Admitted to Oxford',
    avatar: null,
    quote:
      'I was nervous about applying internationally. Speaking with current students gave me the confidence I needed to pursue my dream school.',
    rating: 5,
  },
]

// How it works steps
const howItWorks = [
  {
    step: 1,
    title: 'Browse & Discover',
    description:
      'Explore offers from verified students at your dream universities. Filter by program, country, or type of consultation.',
    icon: Globe,
  },
  {
    step: 2,
    title: 'Connect & Pay',
    description:
      'Choose the student whose experience matches what you want to learn. Secure payment through Stripe.',
    icon: Zap,
  },
  {
    step: 3,
    title: 'Get Real Insights',
    description:
      'Receive personalized advice through written reviews, video calls, or chat sessions. Make informed decisions.',
    icon: Heart,
  },
]

// Stats
const stats = [
  { value: '10K+', label: 'Students' },
  { value: '500+', label: 'Universities' },
  { value: '50K+', label: 'Consultations' },
  { value: '98%', label: 'Satisfaction' },
]

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-500/20 to-transparent blur-3xl" />
        
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span>Connecting students worldwide</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Get{' '}
              <span className="gradient-text">Real Insights</span>
              <br />
              From Real Students
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-100">
              Connect with current university students and get authentic advice
              about campus life, courses, and career prospects before you apply.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-200">
              <Link href="/explore">
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Explore Students
                </Button>
              </Link>
              <Link href="/auth/register?role=student">
                <Button variant="outline" size="lg">
                  Become a Student Advisor
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 animate-fade-in animation-delay-300">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Shield className="h-5 w-5 text-accent-500" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="h-5 w-5 text-accent-500" />
                <span>Verified Students</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Users className="h-5 w-5 text-accent-500" />
                <span>10K+ Community</span>
              </div>
            </div>
          </div>

          {/* Featured Universities */}
          <div className="mt-16 animate-fade-in animation-delay-500">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">
              Students from top universities worldwide
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {featuredUniversities.map((uni) => (
                <div
                  key={uni.name}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <span className="text-2xl">{uni.logo}</span>
                  <span className="font-medium">{uni.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-600 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              Simple Process
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Getting insights from real students is easy. Follow these simple
              steps to connect with your future peers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <Card
                key={item.step}
                className="relative text-center animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary-500 text-white font-bold flex items-center justify-center">
                  {item.step}
                </div>
                
                {/* Icon */}
                <div className="mt-4 mb-6 mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="accent" className="mb-4">
              Flexible Options
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Choose Your Way to Connect
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Whether you prefer reading, watching, or chatting, we have the
              perfect option for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Written Review */}
            <Card hover className="text-center">
              <div className="mb-6 mx-auto h-20 w-20 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Written Reviews</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Get detailed, personalized written answers about campus life,
                courses, and career opportunities.
              </p>
              <p className="text-2xl font-bold text-primary-600">From $15</p>
            </Card>

            {/* Video Call */}
            <Card hover className="text-center relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="success">Popular</Badge>
              </div>
              <div className="mb-6 mx-auto h-20 w-20 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Video className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Video Calls</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Schedule a 1-on-1 video call to ask questions in real-time and
                get immediate answers.
              </p>
              <p className="text-2xl font-bold text-primary-600">From $30</p>
            </Card>

            {/* Chat Session */}
            <Card hover className="text-center">
              <div className="mb-6 mx-auto h-20 w-20 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <MessageSquare className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Chat Sessions</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Have an ongoing conversation over a few days to ask follow-up
                questions as they come up.
              </p>
              <p className="text-2xl font-bold text-primary-600">From $20</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Join thousands of students who have made better decisions with
              real insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-600 dark:text-slate-400 mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar
                    src={testimonial.avatar}
                    name={testimonial.name}
                    size="md"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Real Insights?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join our community of students and applicants. Whether you want to
              share your experience or learn from others, StudentInsights is the
              place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-white/90 shadow-xl"
                >
                  Get Started Free
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

      {/* For Students Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="accent" className="mb-4">
                For Students
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Share Your Experience,
                <br />
                <span className="gradient-text">Earn While You Learn</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Turn your university experience into income. Help prospective
                students make informed decisions while earning extra money on
                your own schedule.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Set your own prices and availability',
                  'Share your authentic experience',
                  'Help students make better decisions',
                  'Earn up to $500+/month on the side',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/register?role=student">
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Start Earning Today
                </Button>
              </Link>
            </div>

            {/* Illustration / Image placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-accent-100 to-primary-100 dark:from-accent-900/30 dark:to-primary-900/30 flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap className="h-24 w-24 mx-auto text-primary-500 mb-4" />
                  <p className="text-2xl font-bold">$25-100</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    per consultation
                  </p>
                </div>
              </div>
              {/* Floating stats cards */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 animate-float">
                <p className="text-2xl font-bold text-accent-500">85%</p>
                <p className="text-sm text-slate-500">Payout to you</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 animate-float animation-delay-500">
                <p className="text-2xl font-bold text-primary-500">24h</p>
                <p className="text-sm text-slate-500">Fast payouts</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

