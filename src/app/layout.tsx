import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'StudentInsights - Connect with Real Students',
  description:
    'Get authentic insights about university life from current students. Make informed decisions about your education with real experiences and honest reviews.',
  keywords: [
    'university',
    'college',
    'student insights',
    'university reviews',
    'student consultation',
    'higher education',
  ],
  authors: [{ name: 'StudentInsights' }],
  openGraph: {
    title: 'StudentInsights - Connect with Real Students',
    description:
      'Get authentic insights about university life from current students.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudentInsights - Connect with Real Students',
    description:
      'Get authentic insights about university life from current students.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-slate-950 antialiased">
        <ThemeProvider>
          <ToastProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

