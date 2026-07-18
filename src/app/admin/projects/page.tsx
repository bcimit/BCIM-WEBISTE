import type { Metadata } from 'next'
import { Plus, MapPin, Edit2, Trash2 } from 'lucide-react'
import { PROJECTS } from '@/lib/constants'
import { resolveImage } from '@/lib/utils'

export const metadata: Metadata = { title: 'Projects' }

const CAT_COLOR: Record<string, string> = { Commercial: 'bg-primary/10 text-primary', Residential: 'bg-emerald-100 text-emerald-700' }
const STATUS_COLOR: Record<string, string> = { Completed: 'bg-emerald-100 text-emerald-700', Ongoing: 'bg-amber-100 text-amber-700' }

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Projects</h1>
          <p className="text-navy-500 text-sm mt-1">{PROJECTS.length} projects in portfolio</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors">
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 shadow-[var(--shadow-card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 bg-bg">
                {['Project', 'Client', 'Location', 'Category', 'Status', 'Area', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-bold text-navy-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map(p => (
                <tr key={p.id} className="border-b border-navy-100 last:border-0 hover:bg-bg transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={resolveImage(p.image, 80)} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-semibold text-dark leading-snug">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-navy-600">{p.client}</td>
                  <td className="px-5 py-4 text-navy-500">
                    <span className="flex items-center gap-1"><MapPin size={11} />{p.location}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${CAT_COLOR[p.category] ?? 'bg-navy-100 text-navy-700'}`}>{p.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_COLOR[p.status] ?? 'bg-navy-100'}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-4 text-navy-500 text-xs">{p.area ?? '—'}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-lg bg-bg hover:bg-primary/10 flex items-center justify-center text-navy-500 hover:text-primary transition-colors"><Edit2 size={14} /></button>
                      <button className="w-8 h-8 rounded-lg bg-bg hover:bg-red-50 flex items-center justify-center text-navy-500 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
