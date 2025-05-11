import type { Metadata } from 'next'
import { Amiri } from 'next/font/google'
import './globals.css'

const amiri = Amiri({ 
  weight: ['400', '700'],
  subsets: ['arabic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gislaved Moské',
  description: 'Gislaved Moské - Prayer Times and Religious Content',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" className={amiri.className}>
      <body>
        <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-500">
          {children}
        </div>
      </body>
    </html>
  )
}
