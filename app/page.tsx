import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { Services } from '@/components/site/services'
import { Stats } from '@/components/site/stats'
import { BeforeAfter } from '@/components/site/before-after'
import { Gallery } from '@/components/site/gallery'
import { Testimonials } from '@/components/site/testimonials'
import { Faq } from '@/components/site/faq'
import { Contact } from '@/components/site/contact'
import { Footer } from '@/components/site/footer'
import { PageTransition } from '@/components/site/page-transition'
import { BUSINESS_DESCRIPTION, OG_IMAGE, SEO_KEYWORDS, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Lawn Care Service in Des Moines, Iowa',
  description: BUSINESS_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: 'Bright Lawn' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bright Lawn Lawn Care Service in Des Moines, Iowa',
    description: BUSINESS_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Bright Lawn',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1024,
        height: 1024,
        alt: 'Bright Lawn lawn care service in Des Moines, Iowa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bright Lawn Lawn Care Service in Des Moines, Iowa',
    description: BUSINESS_DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function Page() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main>
          <Hero />
          <Services />
          <BeforeAfter />
          <Gallery />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
    </>
  )
}
