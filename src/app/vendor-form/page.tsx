import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { VendorForm } from '@/components/vendor/VendorForm'

export const metadata: Metadata = {
  title: 'Vendor Registration',
  description: 'Register as a vendor or supplier with BCIM Engineering Private Limited.',
}

export default function VendorFormPage() {
  return (
    <>
      <PageHero eyebrow="Work With Us" title="Vendor Registration"
        description="Suppliers and sub-contractors: share your details and our procurement team will get in touch." />
      <section className="section-py bg-bg">
        <div className="container-xl max-w-2xl">
          <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
            <VendorForm />
          </div>
        </div>
      </section>
    </>
  )
}
