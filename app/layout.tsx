import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const SITE_URL = 'https://brightlawn.example.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bright Lawn — Premium Lawn Care & Landscaping',
    template: '%s | Bright Lawn',
  },
  description:
    'Bright Lawn delivers premium lawn care, landscaping, snow removal, leaf cleanup, and yard cleanup services. Reliable, insured, and locally trusted.',
  keywords: [
    'lawn care',
    'landscaping',
    'snow removal',
    'leaf cleanup',
    'yard cleanup',
    'Bright Lawn',
  ],
  authors: [{ name: 'Bright Lawn' }],
  openGraph: {
    type: 'website',
    title: 'Bright Lawn — Premium Lawn Care & Landscaping',
    description:
      'Premium lawn care, landscaping, snow removal, leaf cleanup, and yard cleanup. Reliable, insured, and locally trusted.',
    url: SITE_URL,
    siteName: 'Bright Lawn',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bright Lawn — Premium Lawn Care & Landscaping',
    description:
      'Premium lawn care, landscaping, snow removal, leaf cleanup, and yard cleanup services.',
  },
  robots: { index: true, follow: true },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2f7d4f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} bg-background`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
