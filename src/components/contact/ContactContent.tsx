'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Phone number required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(20, 'Please provide more detail (min 20 characters)'),
})
type FormData = z.infer<typeof schema>

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay, ease: 'easeOut' as const},
  }
}

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {
    const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}`
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
    reset()
  }

  const inputClass = (err?: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-navy-900 text-sm placeholder:text-navy-400 bg-white outline-none transition-colors focus:border-primary ${err ? 'border-red-400' : 'border-navy-200 hover:border-navy-300'}`

  return (
    <section className="section-py bg-bg">
      <div className="container-xl grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
        {/* Form */}
        <motion.div {...fadeUp()}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl border border-navy-100 shadow-[var(--shadow-card)]">
              <CheckCircle2 size={48} className="text-emerald-500 mb-5" />
              <h2 className="text-2xl font-bold text-dark mb-3">Message Sent!</h2>
              <p className="text-navy-500 max-w-sm">Your email client should have opened. We typically respond promptly.</p>
              <button onClick={() => setSubmitted(false)} className="mt-8 btn-outline-dark text-sm">Send Another Message</button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-navy-100 shadow-[var(--shadow-card)] p-5 sm:p-8">
              <h2 className="text-2xl font-bold text-dark mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-navy-700 mb-1.5">Full Name *</label>
                    <input {...register('name')} placeholder="Ravi Shankar" className={inputClass(!!errors.name)} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-700 mb-1.5">Phone Number *</label>
                    <input {...register('phone')} type="tel" placeholder="+91 98765 43210" className={inputClass(!!errors.phone)} />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">Email Address *</label>
                  <input {...register('email')} type="email" placeholder="ravi@company.com" className={inputClass(!!errors.email)} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">Subject *</label>
                  <input {...register('subject')} placeholder="Enquiry for commercial office project" className={inputClass(!!errors.subject)} />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">Message *</label>
                  <textarea {...register('message')} rows={5} placeholder="Tell us about your project — location, type, approximate size, and timeline..." className={inputClass(!!errors.message)} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                  Send Message <ArrowRight size={15} />
                </button>
              </form>
            </div>
          )}
        </motion.div>

        {/* Info panel */}
        <div className="flex flex-col gap-5">

          {/* Quick contact */}
          <motion.div {...fadeUp(0.05)} className="p-5 rounded-2xl bg-white border border-navy-100 shadow-[var(--shadow-card)] flex flex-col gap-3">
            <p className="text-xs font-bold text-navy-400 uppercase tracking-widest">Quick Contact</p>
            <a href={COMPANY.phoneHref} className="flex items-center gap-3 text-sm text-dark font-medium hover:text-primary transition-colors">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Phone size={14} className="text-primary" /></span>
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-sm text-dark font-medium hover:text-primary transition-colors">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Mail size={14} className="text-primary" /></span>
              {COMPANY.email}
            </a>
          </motion.div>

          {/* All 3 offices */}
          {COMPANY.offices.map((office, i) => (
            <motion.div key={office.label} {...fadeUp(0.1 + i * 0.08)}
              className="p-5 rounded-2xl bg-white border border-navy-100 shadow-[var(--shadow-card)]">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={13} className="text-primary" />
                  </span>
                  <p className="text-xs font-bold text-dark uppercase tracking-wider">{office.label}</p>
                </div>
                <a href={office.mapUrl} target="_blank" rel="noreferrer"
                  className="text-[0.625rem] font-bold text-primary hover:underline whitespace-nowrap shrink-0">
                  Get Directions →
                </a>
              </div>
              <p className="text-sm text-navy-600 leading-relaxed mb-3">{office.address}</p>
              <div className="flex items-center gap-1.5 text-xs text-navy-400">
                <Clock size={11} />
                {office.hours}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
