import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { CustomCursor } from '@/components/providers/CustomCursor'
import { WhatsAppButton } from '@/components/providers/WhatsAppButton'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'BCIM Engineering — Premium Commercial & Residential Construction',
    template: '%s | BCIM Engineering',
  },
  description:
    'ISO 9001:2015 certified construction company delivering premium commercial offices, residential complexes, and fit-out projects across South India since 2018.',
  keywords: [
    'commercial construction company India',
    'residential construction company Hyderabad',
    'construction contractor Bengaluru',
    'BCIM Engineering',
    'office building construction',
    'luxury villa construction',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://site.bcim.in',
    siteName: 'BCIM Engineering Private Limited',
    title: 'BCIM Engineering — Premium Commercial & Residential Construction',
    description:
      "Building tomorrow's commercial spaces and residential communities across South India.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCIM Engineering — Premium Construction Company',
    description: 'ISO-certified construction company delivering premium projects since 2018.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://site.bcim.in'),
}

const LD_JSON = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'GeneralContractor'],
      '@id': 'https://bcim.in/#organization',
      name: 'BCIM Engineering Private Limited',
      legalName: 'BCIM Engineering Private Limited',
      url: 'https://bcim.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bcim.in/bcim-logo.png',
        width: 260,
        height: 88,
      },
      foundingDate: '2018',
      description:
        'ISO 9001, 14001 & 45001 certified construction company delivering premium commercial and residential projects across South India since 2018.',
      telephone: '+918044324693',
      email: 'bcim@bcim.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '# 11, B Wing, Divyasree Chambers, "O" Shaughnessy Road, Langford Gardens',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560025',
        addressCountry: 'IN',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '18:00',
      },
      sameAs: [
        'https://www.linkedin.com/company/14704327',
        'https://www.x.com/BcimPvtLtd',
      ],
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 750 },
      areaServed: ['Bengaluru', 'Hyderabad', 'Thane', 'South India'],
      award: 'International Safety Award — Merit 2024 (British Safety Council)',
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', name: 'ISO 9001:2015 — Quality Management' },
        { '@type': 'EducationalOccupationalCredential', name: 'ISO 14001:2015 — Environmental Management' },
        { '@type': 'EducationalOccupationalCredential', name: 'ISO 45001:2018 — Occupational Health & Safety' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Construction Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Commercial Construction',
              description: 'Corporate offices, IT parks, retail complexes, hospitals, and educational institutions across South India.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Residential Construction',
              description: 'Luxury villas, premium apartment complexes, and gated communities.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Interior Fit-Out',
              description: 'Turnkey interior fit-out for commercial and office spaces.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Pre-Construction Services',
              description: 'Project planning, cost estimation, and value engineering.',
            },
          },
        ],
      },
      location: [
        {
          '@type': 'Place',
          name: 'Head Office — Bengaluru',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '# 11, B Wing, Divyasree Chambers, "O" Shaughnessy Road, Langford Gardens',
            addressLocality: 'Bengaluru',
            addressRegion: 'Karnataka',
            postalCode: '560025',
            addressCountry: 'IN',
          },
        },
        {
          '@type': 'Place',
          name: 'Regional Office — Hyderabad',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Tower View Apartment, No 403, 4th Floor, Plot No 26 & 27, Sri Lakshmi Nagar Colony',
            addressLocality: 'Hyderabad',
            addressRegion: 'Telangana',
            postalCode: '500089',
            addressCountry: 'IN',
          },
        },
        {
          '@type': 'Place',
          name: 'Regional Office — Thane',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Godrej Ascend, Kolshet Road, Dhokali, Thane West',
            addressLocality: 'Thane',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
          },
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://bcim.in/#website',
      url: 'https://bcim.in',
      name: 'BCIM Engineering',
      publisher: { '@id': 'https://bcim.in/#organization' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LD_JSON) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-navy-900 cursor-none">
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  )
}
