import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { CustomCursor } from '@/components/providers/CustomCursor'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-navy-900 cursor-none">
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
