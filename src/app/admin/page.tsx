import type { Metadata } from 'next'
import { TrendingUp, FolderKanban, MessageSquare, Briefcase, Eye, Users } from 'lucide-react'
import { PROJECTS } from '@/lib/constants'
import { BLOG_POSTS } from '@/lib/blog'

export const metadata: Metadata = { title: 'Dashboard' }

const STATS = [
  { label: 'Total Projects', value: PROJECTS.length.toString(), change: '+2 this month', icon: FolderKanban, color: 'bg-primary-light text-primary' },
  { label: 'Ongoing Projects', value: PROJECTS.filter(p => p.status === 'Ongoing').length.toString(), change: 'Active sites', icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
  { label: 'New Enquiries', value: '14', change: 'Last 30 days', icon: MessageSquare, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Quote Requests', value: '7', change: 'Pending review', icon: Briefcase, color: 'bg-violet-50 text-violet-600' },
  { label: 'Site Visitors', value: '2,840', change: '+18% vs last month', icon: Eye, color: 'bg-sky-50 text-sky-600' },
  { label: 'Blog Posts', value: BLOG_POSTS.length.toString(), change: `${BLOG_POSTS.length} published`, icon: Users, color: 'bg-orange-50 text-orange-600' },
]

const RECENT_ENQUIRIES = [
  { name: 'Vikram Rao', type: 'Commercial Office', location: 'Hyderabad', date: '2025-07-15', status: 'New' },
  { name: 'Anjali Mehta', type: 'Luxury Villa', location: 'Bengaluru', date: '2025-07-14', status: 'In Review' },
  { name: 'Suresh Kumar', type: 'Apartment Complex', location: 'Pune', date: '2025-07-13', status: 'Quoted' },
  { name: 'Priya Nair', type: 'Interior Fit-Out', location: 'Hyderabad', date: '2025-07-12', status: 'New' },
  { name: 'Rahul Dev', type: 'IT Park', location: 'Bengaluru', date: '2025-07-11', status: 'Closed' },
]

const STATUS_COLORS: Record<string, string> = {
  New: 'bg-primary/10 text-primary',
  'In Review': 'bg-amber-100 text-amber-700',
  Quoted: 'bg-violet-100 text-violet-700',
  Closed: 'bg-emerald-100 text-emerald-700',
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pt-2">
      <div>
        <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
        <p className="text-navy-500 text-sm mt-1">Welcome back — here&apos;s what&apos;s happening with BCIM Engineering.</p>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {STATS.map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-navy-100 shadow-[var(--shadow-card)] flex items-center gap-4">
            <span className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon size={20} />
            </span>
            <div>
              <p className="text-2xl font-bold text-dark">{value}</p>
              <p className="text-xs text-navy-500 mt-0.5">{label}</p>
              <p className="text-xs text-emerald-600 font-medium mt-0.5">{change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent enquiries */}
      <div className="bg-white rounded-2xl border border-navy-100 shadow-[var(--shadow-card)] overflow-hidden">
        <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
          <h2 className="font-bold text-dark">Recent Enquiries</h2>
          <a href="/admin/enquiries" className="text-xs font-semibold text-primary hover:underline">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 bg-bg">
                <th className="text-left px-6 py-3 text-xs font-bold text-navy-400 uppercase tracking-widest">Name</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-navy-400 uppercase tracking-widest">Project Type</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-navy-400 uppercase tracking-widest">Location</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-navy-400 uppercase tracking-widest">Date</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-navy-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ENQUIRIES.map((e, i) => (
                <tr key={i} className="border-b border-navy-100 last:border-0 hover:bg-bg transition-colors">
                  <td className="px-6 py-3 font-semibold text-dark">{e.name}</td>
                  <td className="px-6 py-3 text-navy-600">{e.type}</td>
                  <td className="px-6 py-3 text-navy-500">{e.location}</td>
                  <td className="px-6 py-3 text-navy-400">{new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[e.status]}`}>{e.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Projects overview */}
      <div className="bg-white rounded-2xl border border-navy-100 shadow-[var(--shadow-card)] overflow-hidden">
        <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
          <h2 className="font-bold text-dark">Projects Overview</h2>
          <a href="/admin/projects" className="text-xs font-semibold text-primary hover:underline">Manage Projects</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 bg-bg">
                <th className="text-left px-6 py-3 text-xs font-bold text-navy-400 uppercase tracking-widest">Project</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-navy-400 uppercase tracking-widest">Client</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-navy-400 uppercase tracking-widest">Category</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-navy-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map(p => (
                <tr key={p.id} className="border-b border-navy-100 last:border-0 hover:bg-bg transition-colors">
                  <td className="px-6 py-3 font-semibold text-dark">{p.name}</td>
                  <td className="px-6 py-3 text-navy-600">{p.client}</td>
                  <td className="px-6 py-3 text-navy-500">{p.category}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${p.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span>
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
