import type { Metadata } from 'next'
import { FileText, Mail, CheckCircle2, Clock, XCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'Quote Requests' }

const QUOTES = [
  { id: 'Q-001', name: 'Apex Developers', contact: 'Kiran Reddy', email: 'kiran@apex.com', type: 'Commercial', location: 'Hyderabad', area: '80,000 sq ft', budget: '₹50–100 Cr', timeline: '3–6 months', date: '2025-07-15', status: 'Pending' },
  { id: 'Q-002', name: 'Prashant Malhotra', contact: 'Prashant Malhotra', email: 'pm@gmail.com', type: 'Residential', location: 'Bengaluru', area: '12,000 sq ft', budget: '₹5–20 Cr', timeline: '1–3 months', date: '2025-07-13', status: 'Sent' },
  { id: 'Q-003', name: 'SkyBuild Infra', contact: 'Deepa Sharma', email: 'deepa@skybuild.com', type: 'Commercial', location: 'Pune', area: '2,50,000 sq ft', budget: '₹100 Cr+', timeline: '6–12 months', date: '2025-07-10', status: 'Won' },
  { id: 'Q-004', name: 'NestHome Projects', contact: 'Arjun Nair', email: 'arjun@nesthome.in', type: 'Residential', location: 'Hyderabad', area: '48 villas', budget: '₹20–50 Cr', timeline: '1–3 months', date: '2025-07-08', status: 'Lost' },
  { id: 'Q-005', name: 'TechSpace Corp', contact: 'Meera Pillai', email: 'meera@techspace.com', type: 'Interior Fit-Out', location: 'Bengaluru', area: '18,000 sq ft', budget: '₹5–20 Cr', timeline: 'Within 1 month', date: '2025-07-06', status: 'Pending' },
]

const STATUS_CONFIG: Record<string, { color: string; icon: React.ElementType }> = {
  Pending: { color: 'bg-amber-100 text-amber-700', icon: Clock },
  Sent: { color: 'bg-primary/10 text-primary', icon: FileText },
  Won: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  Lost: { color: 'bg-red-100 text-red-600', icon: XCircle },
}

export default function QuotesPage() {
  const won = QUOTES.filter(q => q.status === 'Won').length
  const pending = QUOTES.filter(q => q.status === 'Pending').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark">Quote Requests</h1>
        <p className="text-navy-500 text-sm mt-1">{QUOTES.length} total · {pending} pending · {won} won</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: QUOTES.length, color: 'text-dark' },
          { label: 'Pending', value: pending, color: 'text-amber-600' },
          { label: 'Won', value: won, color: 'text-emerald-600' },
          { label: 'Win Rate', value: `${Math.round(won / QUOTES.length * 100)}%`, color: 'text-primary' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-navy-100 p-5 text-center shadow-[var(--shadow-card)]">
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-navy-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 shadow-[var(--shadow-card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 bg-bg">
                {['Ref', 'Client / Contact', 'Type', 'Location', 'Area', 'Budget', 'Date', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-bold text-navy-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {QUOTES.map(q => {
                const { color, icon: Icon } = STATUS_CONFIG[q.status]
                return (
                  <tr key={q.id} className="border-b border-navy-100 last:border-0 hover:bg-bg transition-colors">
                    <td className="px-5 py-4 font-mono text-xs font-bold text-navy-500">{q.id}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-dark">{q.name}</p>
                      <p className="text-navy-400 text-xs">{q.contact}</p>
                    </td>
                    <td className="px-5 py-4 text-navy-600">{q.type}</td>
                    <td className="px-5 py-4 text-navy-500">{q.location}</td>
                    <td className="px-5 py-4 text-navy-500 text-xs">{q.area}</td>
                    <td className="px-5 py-4 text-navy-500 text-xs">{q.budget}</td>
                    <td className="px-5 py-4 text-navy-400 text-xs whitespace-nowrap">{new Date(q.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                    <td className="px-5 py-4">
                      <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold w-fit ${color}`}>
                        <Icon size={11} />{q.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <a href={`mailto:${q.email}`} className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                        <Mail size={11} /> Email
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
