'use client'

import { useState } from 'react'
import { COMPANY } from '@/lib/constants'

const field = 'w-full px-4 py-2.5 rounded-xl border border-navy-200 bg-white text-sm text-dark placeholder:text-navy-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors'

export function VendorForm() {
  const [f, setF] = useState({ company: '', name: '', phone: '', email: '', supply: '' })
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF(v => ({ ...v, [k]: e.target.value }))

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const body = `Company: ${f.company}\nContact person: ${f.name}\nPhone: ${f.phone}\nEmail: ${f.email}\nMaterials / services offered: ${f.supply}\n\n(Please attach your company profile, GST and PAN documents to this email.)`
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent('Vendor Registration: ' + f.company)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-semibold text-navy-600">Company Name *
          <input required className={field + ' mt-1.5'} value={f.company} onChange={set('company')} />
        </label>
        <label className="block text-xs font-semibold text-navy-600">Contact Person *
          <input required className={field + ' mt-1.5'} value={f.name} onChange={set('name')} />
        </label>
        <label className="block text-xs font-semibold text-navy-600">Phone *
          <input required type="tel" className={field + ' mt-1.5'} value={f.phone} onChange={set('phone')} />
        </label>
        <label className="block text-xs font-semibold text-navy-600">Email *
          <input required type="email" className={field + ' mt-1.5'} value={f.email} onChange={set('email')} />
        </label>
      </div>
      <label className="block text-xs font-semibold text-navy-600">Materials / Services Offered *
        <textarea required rows={4} className={field + ' mt-1.5 resize-none'} value={f.supply} onChange={set('supply')} />
      </label>
      <p className="text-xs text-navy-500">
        Submitting opens your email app with these details addressed to {COMPANY.email}. Please attach your company profile and registration documents there.
      </p>
      <button type="submit" className="btn-primary text-sm">Send Registration</button>
    </form>
  )
}
