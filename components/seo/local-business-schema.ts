import {
  BUSINESS_CITY,
  BUSINESS_DESCRIPTION,
  BUSINESS_EMAIL,
  BUSINESS_MAP_URL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_SERVICE_AREA_LABEL,
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
  hasMap: BUSINESS_MAP_URL,
  image: `${SITE_URL}/images/hero.png`,
  priceRange: '$$',
  serviceType: SERVICES,
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS_CITY,
    addressRegion: BUSINESS_STATE_CODE,
    addressCountry: 'US',
  },
  areaServed: [
    {
      '@type': 'City',
      name: `${BUSINESS_CITY}, ${BUSINESS_STATE}`,
    },
    ...BUSINESS_SERVICE_AREA_LABEL.split(', ').map((city) => ({
      '@type': 'City',
      name: `${city}, ${BUSINESS_STATE}`,
    })),
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '21:00',
      closes: '23:00',
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
