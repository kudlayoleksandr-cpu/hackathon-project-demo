import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

/**
 * Main layout with header and footer
 * Used for public pages like landing, explore, etc.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

