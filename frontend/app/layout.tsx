import type { Metadata } from 'next'
import { Cormorant_Garamond, Spectral } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const spectral = Spectral({
  weight: ['200', '300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Event Requirements Platform',
  description: 'Post and manage event requirements with elegance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${spectral.variable}`}>
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  )
}