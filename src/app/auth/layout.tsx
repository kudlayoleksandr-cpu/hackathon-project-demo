import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

/**
 * Auth layout - simplified layout for authentication pages
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-bold mb-8"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="gradient-text">StudentInsights</span>
          </Link>
          
          {children}
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-lg text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Connect with Real Students
              </h2>
              <p className="text-lg text-white/80">
                Get authentic insights about university life, courses, and career
                prospects from students who have been there.
              </p>
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-4xl font-bold">10K+</p>
                  <p className="text-sm text-white/70">Students</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">500+</p>
                  <p className="text-sm text-white/70">Universities</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">98%</p>
                  <p className="text-sm text-white/70">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

