import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n'
import {
  BUSINESS_DESCRIPTION,
  BUSINESS_NAME,
  OG_IMAGE,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo'
import { JsonLd } from '@/components/seo/json-ld'
import { localBusinessJsonLd, websiteJsonLd } from '@/components/seo/local-business-schema'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: 'Bright Lawn | Lawn Care Service in Des Moines, Iowa',
    template: '%s | Bright Lawn',
  },
  description: BUSINESS_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: BUSINESS_NAME }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'Bright Lawn | Lawn Care Service in Des Moines, Iowa',
    description: BUSINESS_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1024,
        height: 1024,
        alt: 'Bright Lawn manicured residential lawn in Des Moines, Iowa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bright Lawn | Lawn Care Service in Des Moines, Iowa',
    description: BUSINESS_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  category: 'Lawn Care Service',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
        <JsonLd data={localBusinessJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
