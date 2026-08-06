import {
  BUSINESS_CITY,
  BUSINESS_DESCRIPTION,
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_STATE,
  BUSINESS_STATE_CODE,
  SERVICES,
  SITE_URL,
} from '@/lib/seo'

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: BUSINESS_NAME,
  description: BUSINESS_DESCRIPTION,
  url: SITE_URL,
  telephone: BUSINESS_PHONE,
  email: BUSINESS_EMAIL,
  image: `${SITE_URL}/images/hero.png`,
  priceRange: '$$',
  serviceType: SERVICES,
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS_CITY,
    addressRegion: BUSINESS_STATE_CODE,
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'City',
    name: `${BUSINESS_CITY}, ${BUSINESS_STATE}`,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '18:00',
    },
  ],
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: BUSINESS_NAME,
  url: SITE_URL,
  publisher: {
    '@id': `${SITE_URL}/#localbusiness`,
  },
  inLanguage: ['en-US', 'es-US'],
}

