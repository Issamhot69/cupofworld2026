import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Cup of World 2026 USA',
  description: 'Ecran Mondial Sportif Nouvelle Generation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Navbar />
        <main style={{ paddingTop: 56 }}>{children}</main>
      </body>
    </html>
  )
}