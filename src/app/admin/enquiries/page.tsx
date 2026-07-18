import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Eye } from 'lucide-react'

export const metadata: Metadata = { title: 'Enquiries' }

const ENQUIRIES = [
  { id: 1, name: 'Vikram Rao', email: 'vikram@rao.com', phone: '+91 98765 11111', type: 'Commercial Office', location: 'Hyderabad', area: '30,000 sq ft', budget: '₹20–50 Cr', date: '2025-07-15', status: 'New', message: 'Looking to build a 6-storey IT office in Gachibowli. Need turnkey contractor.' },
  { id: 2, name: 'Anjali Mehta', email: 'anjali@mehta.in', phone: '+91 87654 22222', type: 'Luxury Villa', location: 'Bengaluru', area: '8,000 sq ft', budget: '₹5–20 Cr', date: '2025-07-14', status: 'In Review', message: 'Custom luxury villa on 40x60 plot in Sarjapur Road. Looking for experienced contractor.' },
  { id: 3, name: 'Suresh Kumar', email: 'suresh@developer.com', phone: '+91 76543 33333', type: 'Apartment Complex', location: 'Pune', area: '1,20,000 sq ft', budget: '₹50–100 Cr', date: '2025-07-13', status: 'Quoted', message: 'G+14 apartment tower with 120 units. Need pre-construction advisory and then full EPC.' },
  { id: 4, name: 'Priya Nair', email: 'priya@techco.com', phone: '+91 65432 44444', type: 'Interior Fit-Out', location: 'Hyderabad', area: '22,000 sq ft', budget: '₹5–20 Cr', date: '2025-07-12', status: 'New', message: 'Category B fit-out for new office. 22,000 sq ft, need design and build.' },
  { id: 5, name: 'Rahul Dev', email: 'rahul@dev.co', phone: '+91 54321 55555', type: 'IT Park', location: 'Bengaluru', area: '4,00,000 sq ft', budget: '₹100 Cr+', date: '2025-07-11', status: 'Closed', message: 'Large IT campus. Already selected contractor but looking for future reference.' },
]

const STATUS_COLOR: Record<string, string> = {
  New: 'bg-primary/10 text-primary',
  'In Review': 'bg-amber-100 text-amber-700',
  Quoted: 'bg-violet-100 text-violet-700',
  Closed: 'bg-emerald-100 text-emerald-700',
}

export default function EnquiriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Enquiries</h1>
          <p className="text-navy-500 text-sm mt-1">{ENQUIRIES.length} total · {ENQUIRIES.filter(e => e.status === 'New').length} new</p>
        </div>
        <div className="flex gap-2">
          {['All', 'New', 'In Review', 'Quoted', 'Closed'].map(s => (
            <button key={s} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${s === 'All' ? 'bg-dark text-white' : 'bg-white text-navy-700 border border-navy-200 hover:bg-bg'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {ENQUIRIES.map(e => (
          <div key={e.id} className="bg-white rounded-2xl border border-navy-100 shadow-[var(--shadow-card)] p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-dark">{e.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_COLOR[e.status]}`}>{e.status}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-navy-500 mb-3">
                  <span className="flex items-center gap-1"><Mail size={11} />{e.email}</span>
                  <span className="flex items-center gap-1"><Phone size={11} />{e.phone}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} />{e.location}</span>
                </div>
                <p className="text-sm text-navy-600 leading-relaxed">{e.message}</p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="px-2.5 py-1 rounded-lg bg-bg border border-navy-100 text-xs text-navy-600"><strong>Type:</strong> {e.type}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-bg border border-navy-100 text-xs text-navy-600"><strong>Area:</strong> {e.area}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-bg border border-navy-100 text-xs text-navy-600"><strong>Budget:</strong> {e.budget}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                <p className="text-xs text-navy-400">{new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <div className="flex gap-2">
                  <a href={`mailto:${e.email}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors">
                    <Mail size={12} /> Reply
                  </a>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg border border-navy-200 text-navy-700 text-xs font-semibold hover:bg-navy-100 transition-colors">
                    <Eye size={12} /> Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
