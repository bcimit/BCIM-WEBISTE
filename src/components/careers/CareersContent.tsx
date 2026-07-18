'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase, ArrowRight, CheckCircle2, Users, Building2, Trophy, Star,
  Send, Phone, Mail, User, Filter, MapPin, Layers, Clock, Calendar,
  Paperclip, Loader2, AlertCircle,
} from 'lucide-react'
import { HIRING_DEPARTMENTS } from '@/lib/team'
import type { ERPJob } from '@/lib/erp'

const PERKS = [
  { icon: Trophy, title: 'Career Growth', desc: 'Clear paths from junior engineer to project manager as you take on larger sites and responsibility.' },
  { icon: Star, title: 'Learning & Development', desc: 'Hands-on exposure to live commercial and residential sites across three states.' },
  { icon: Users, title: 'Health & Family', desc: 'Health insurance coverage for confirmed employees.' },
  { icon: Building2, title: 'Landmark Projects', desc: 'Work on multi-lakh sq ft commercial campuses and residential developments across South India.' },
  { icon: CheckCircle2, title: 'Inclusive Culture', desc: 'A diverse, respectful workplace where merit drives recognition.' },
]

const HIRING_STEPS = [
  { step: '01', title: 'Apply', desc: 'Submit your details and resume using the form below. We review every application personally.' },
  { step: '02', title: 'HR Screening', desc: 'A short call with our HR team to understand your background and answer your questions.' },
  { step: '03', title: 'Technical Interview', desc: 'A focused discussion with the department head about the role.' },
  { step: '04', title: 'Offer & Onboarding', desc: 'If it is a match, we move quickly to an offer and onboarding.' },
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  }
}

interface ApplyForm { name: string; email: string; phone: string; department: string; experience: string; note: string }
const EMPTY_FORM: ApplyForm = { name: '', email: '', phone: '', department: '', experience: '', note: '' }

function ApplicationForm({ prefilledDept = '', prefilledJobId = '' }: { prefilledDept?: string; prefilledJobId?: string }) {
  const [form, setForm] = useState<ApplyForm>({ ...EMPTY_FORM, department: prefilledDept })
  const [resume, setResume] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const fd = new FormData()
    fd.append('name', form.name.trim())
    fd.append('email', form.email.trim())
    fd.append('phone', form.phone.trim())
    fd.append('experience_years', form.experience || '0')
    fd.append('current_company', form.department)
    fd.append('note', form.note)
    if (prefilledJobId) fd.append('job_id', prefilledJobId)
    if (resume) fd.append('resume', resume)

    try {
      const res = await fetch('/api/careers/apply', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error ?? 'Submission failed. Please try again.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const field = 'w-full px-4 py-2.5 rounded-xl border border-navy-200 bg-white text-sm text-dark placeholder:text-navy-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors'

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={28} className="text-emerald-600" />
        </div>
        <h4 className="font-bold text-dark text-lg mb-2">Application Received!</h4>
        <p className="text-navy-500 text-sm max-w-xs mx-auto">
          Thank you, {form.name.split(' ')[0]}. Our HR team will review your application and get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-navy-600 mb-1.5"><User size={11} className="inline mr-1" />Full Name *</label>
          <input required className={field} placeholder="Full name" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy-600 mb-1.5"><Mail size={11} className="inline mr-1" />Email *</label>
          <input required type="email" className={field} placeholder="you@example.com" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy-600 mb-1.5"><Phone size={11} className="inline mr-1" />Phone *</label>
          <input required type="tel" className={field} placeholder="+91 98765 43210" value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy-600 mb-1.5"><Briefcase size={11} className="inline mr-1" />Role / Department</label>
          <input className={field} placeholder="e.g. Site Engineer, QS" value={form.department}
            onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-navy-600 mb-1.5">Years of Experience</label>
        <input className={field} placeholder="e.g. 5" type="number" min="0" max="50" value={form.experience}
          onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-navy-600 mb-1.5">Brief Cover Note</label>
        <textarea rows={3} className={field + ' resize-none'} placeholder="Tell us briefly why you'd be a strong fit..."
          value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-navy-600 mb-1.5">
          <Paperclip size={11} className="inline mr-1" />Resume (PDF or Word, max 5 MB)
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-navy-200 bg-white cursor-pointer hover:border-primary/40 transition-colors"
        >
          <Paperclip size={14} className={resume ? 'text-primary' : 'text-navy-300'} />
          <span className={`text-sm flex-1 truncate ${resume ? 'text-dark' : 'text-navy-300'}`}>
            {resume ? resume.name : 'Click to upload your resume…'}
          </span>
          {resume && (
            <button type="button" onClick={e => { e.stopPropagation(); setResume(null); if (fileRef.current) fileRef.current.value = '' }}
              className="text-xs text-navy-400 hover:text-red-500">Remove</button>
          )}
        </div>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
          onChange={e => setResume(e.target.files?.[0] ?? null)} />
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'loading'
          ? <><Loader2 size={14} className="animate-spin" /> Submitting…</>
          : <><Send size={14} /> Send Application</>}
      </button>
    </form>
  )
}

const JOB_TYPE_LABEL: Record<string, string> = {
  full_time: 'Full-time', part_time: 'Part-time', contract: 'Contract',
  intern: 'Internship', apprentice: 'Apprentice',
}

function expLabel(min?: number, max?: number) {
  if (min == null && max == null) return null
  if (min != null && max != null) return `${min}–${max} yrs`
  if (min != null) return `${min}+ yrs`
  return `Up to ${max} yrs`
}

function JobCard({ job, onApply }: { job: ERPJob; onApply: (title: string, id: string) => void }) {
  const exp = expLabel(job.experience_min, job.experience_max)
  const closingDate = job.closing_date
    ? new Date(job.closing_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : null

  return (
    <motion.div {...fadeUp(0.05)}
      className="p-6 rounded-2xl border border-navy-100 bg-white hover:border-primary/30 hover:shadow-[var(--shadow-float)] transition-all group flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-dark text-base leading-snug">{job.job_title}</h3>
          {job.designation && (
            <p className="text-xs text-navy-400 mt-0.5">{job.designation}</p>
          )}
        </div>
        <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          {job.vacancies} {job.vacancies === 1 ? 'Opening' : 'Openings'}
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5 text-xs text-navy-500 mb-4">
        {job.department && (
          <span className="flex items-center gap-1"><Layers size={11} className="text-primary" />{job.department}</span>
        )}
        {job.location && (
          <span className="flex items-center gap-1"><MapPin size={11} className="text-primary" />{job.location}</span>
        )}
        {job.job_type && (
          <span className="flex items-center gap-1"><Briefcase size={11} className="text-primary" />{JOB_TYPE_LABEL[job.job_type] ?? job.job_type}</span>
        )}
        {exp && (
          <span className="flex items-center gap-1"><Clock size={11} className="text-primary" />{exp} exp</span>
        )}
        {closingDate && (
          <span className="flex items-center gap-1"><Calendar size={11} className="text-navy-400" />Closes {closingDate}</span>
        )}
      </div>

      {job.skills_required && (
        <p className="text-xs text-navy-400 mb-4 line-clamp-2 leading-relaxed">{job.skills_required}</p>
      )}

      <div className="mt-auto">
        <button
          onClick={() => onApply(job.job_title, job.id)}
          className="flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all"
        >
          Apply for this role <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  )
}

export function CareersContent({ jobs }: { jobs: ERPJob[] }) {
  const [applyDept, setApplyDept] = useState('')
  const [applyJobId, setApplyJobId] = useState('')
  const [showForm, setShowForm] = useState(false)

  function handleApply(title: string, id = '') {
    setApplyDept(title)
    setApplyJobId(id)
    setShowForm(true)
    setTimeout(() => {
      document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  return (
    <>
      {/* Why BCIM */}
      <section className="section-py bg-white">
        <div className="container-xl">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="eyebrow mb-3">Why BCIM</p>
            <h2 className="text-4xl font-bold text-dark">Where Careers Are Built, Not Just Jobs Filled</h2>
            <p className="text-navy-500 mt-4 max-w-2xl mx-auto">We invest in people the same way we invest in projects — with a plan and a long view.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.07)}
                className="p-6 rounded-2xl border border-navy-100 bg-bg hover:border-primary/30 hover:shadow-[var(--shadow-card)] transition-all group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="font-bold text-dark mb-2">{title}</h3>
                <p className="text-navy-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Open Positions from ERP */}
      <section className="section-py bg-bg">
        <div className="container-xl">
          <motion.div {...fadeUp()} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow mb-3">Open Positions</p>
              <h2 className="text-4xl font-bold text-dark">Current Openings</h2>
              <p className="text-navy-500 mt-2 text-sm">Live from our HR system — updated in real time.</p>
            </div>
            {jobs.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {jobs.length} {jobs.length === 1 ? 'Opening' : 'Openings'}
              </span>
            )}
          </motion.div>

          {jobs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} onApply={handleApply} />
              ))}
            </div>
          ) : (
            <motion.div {...fadeUp(0.1)} className="text-center py-16 rounded-2xl border border-dashed border-navy-200 bg-white">
              <div className="w-12 h-12 rounded-2xl bg-navy-100 flex items-center justify-center mx-auto mb-4">
                <Briefcase size={20} className="text-navy-400" />
              </div>
              <h3 className="font-bold text-dark mb-2">No open positions right now</h3>
              <p className="text-navy-500 text-sm max-w-md mx-auto mb-6">
                We are always interested in talented construction professionals. Send us a speculative application — we keep strong profiles on file.
              </p>
              <button
                onClick={() => handleApply('General Application')}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors"
              >
                Send Speculative Application <ArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Hiring Process */}
      <section className="section-py bg-white">
        <div className="container-xl">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="eyebrow mb-3">How We Hire</p>
            <h2 className="text-4xl font-bold text-dark">A Simple, Transparent Process</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIRING_STEPS.map(({ step, title, desc }, i) => (
              <motion.div key={step} {...fadeUp(i * 0.08)} className="relative">
                {i < HIRING_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-1rem)] w-full h-px bg-navy-200 z-0" />
                )}
                <div className="relative z-10 p-6 rounded-2xl bg-bg border border-navy-100 shadow-[var(--shadow-card)] h-full">
                  <span className="inline-block px-3 py-1 rounded-lg bg-primary text-white text-xs font-bold mb-4">{step}</span>
                  <h3 className="font-bold text-dark mb-2">{title}</h3>
                  <p className="text-navy-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments + Application */}
      <section id="apply-form" className="section-py bg-bg">
        <div className="container-xl grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <motion.div {...fadeUp()}>
              <p className="eyebrow mb-3">Departments We Hire For</p>
              <h2 className="text-3xl font-bold text-dark mb-6">Find Your Fit</h2>
            </motion.div>
            <div className="space-y-3">
              {HIRING_DEPARTMENTS.map(({ name, description }, i) => (
                <motion.div key={name} {...fadeUp(i * 0.06)} className="p-5 rounded-xl border border-navy-100 bg-white flex items-start gap-3">
                  <Filter size={15} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-dark text-sm">{name}</p>
                    <p className="text-navy-500 text-xs mt-1 leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div {...fadeUp(0.1)} className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase size={16} className="text-primary" />
                <h3 className="font-bold text-dark">Apply Now</h3>
              </div>
              {(showForm || applyDept) && (
                <p className="text-sm text-primary font-medium mb-4">Applying for: {applyDept || 'General Application'}</p>
              )}
              <ApplicationForm prefilledDept={applyDept} prefilledJobId={applyJobId} key={applyDept} />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
