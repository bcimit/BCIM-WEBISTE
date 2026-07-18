'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, ArrowRight, Building2, Home } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  company: z.string().optional(),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Phone required'),
  projectType: z.enum(['Commercial', 'Residential', 'Interior Fit-Out', 'Pre-Construction', 'Other'], { message: 'Select project type' }),
  location: z.string().min(2, 'Location required'),
  area: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(20, 'Please describe your project (min 20 chars)'),
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

const inputClass = (err?: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-navy-900 text-sm placeholder:text-navy-400 bg-white outline-none transition-colors focus:border-primary ${err ? 'border-red-400' : 'border-navy-200 hover:border-navy-300'}`

const selectClass = (err?: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-navy-900 text-sm bg-white outline-none transition-colors focus:border-primary appearance-none ${err ? 'border-red-400' : 'border-navy-200 hover:border-navy-300'}`

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  function onSubmit(data: FormData) {
    const body = [
      `Name: ${data.name}`,
      data.company ? `Company: ${data.company}` : '',
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Project Type: ${data.projectType}`,
      `Location: ${data.location}`,
      data.area ? `Approximate Area: ${data.area}` : '',
      data.budget ? `Budget Range: ${data.budget}` : '',
      data.timeline ? `Timeline: ${data.timeline}` : '',
      `\nProject Description:\n${data.description}`,
    ].filter(Boolean).join('\n')

    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`Quote Request: ${data.projectType} – ${data.location}`)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="section-py bg-bg flex items-center justify-center">
        <div className="text-center py-16 max-w-md mx-auto">
          <CheckCircle2 size={52} className="text-emerald-500 mx-auto mb-5" />
          <h2 className="text-2xl font-bold text-dark mb-3">Quote Request Sent!</h2>
          <p className="text-navy-500">Your email client should have opened with your request. Our team will respond with a detailed proposal.</p>
          <button onClick={() => setSubmitted(false)} className="mt-8 btn-outline-dark text-sm">Submit Another Request</button>
        </div>
      </section>
    )
  }

  return (
    <section className="section-py bg-bg">
      <div className="container-xl grid lg:grid-cols-[1fr_320px] gap-12">
        {/* Main form */}
        <motion.div {...fadeUp()} className="bg-white rounded-2xl border border-navy-100 shadow-[var(--shadow-card)] p-8">
          <h2 className="text-xl font-bold text-dark mb-7">Project Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Contact info */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-navy-400 mb-4">Your Contact Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">Full Name *</label>
                  <input {...register('name')} placeholder="Ravi Shankar" className={inputClass(!!errors.name)} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">Company / Organisation</label>
                  <input {...register('company')} placeholder="ABC Developers Pvt. Ltd." className={inputClass()} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">Email Address *</label>
                  <input {...register('email')} type="email" placeholder="ravi@company.com" className={inputClass(!!errors.email)} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">Phone Number *</label>
                  <input {...register('phone')} type="tel" placeholder="+91 98765 43210" className={inputClass(!!errors.phone)} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Project info */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-navy-400 mb-4">Project Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">Project Type *</label>
                  <select {...register('projectType')} className={selectClass(!!errors.projectType)}>
                    <option value="">Select type…</option>
                    <option>Commercial</option>
                    <option>Residential</option>
                    <option>Interior Fit-Out</option>
                    <option>Pre-Construction</option>
                    <option>Other</option>
                  </select>
                  {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">Project Location *</label>
                  <input {...register('location')} placeholder="Bengaluru, Karnataka" className={inputClass(!!errors.location)} />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">Approximate Built-up Area</label>
                  <input {...register('area')} placeholder="e.g. 50,000 sq ft or 40 villas" className={inputClass()} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">Budget Range</label>
                  <select {...register('budget')} className={selectClass()}>
                    <option value="">Select range…</option>
                    <option>Under ₹5 Cr</option>
                    <option>₹5 – ₹20 Cr</option>
                    <option>₹20 – ₹50 Cr</option>
                    <option>₹50 – ₹100 Cr</option>
                    <option>₹100 Cr+</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">Expected Start</label>
                  <select {...register('timeline')} className={selectClass()}>
                    <option value="">Select timeline…</option>
                    <option>Within 1 month</option>
                    <option>1 – 3 months</option>
                    <option>3 – 6 months</option>
                    <option>6 – 12 months</option>
                    <option>Planning stage</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1.5">Project Description *</label>
              <textarea {...register('description')} rows={5}
                placeholder="Describe your project — building type, number of floors, key requirements, any special considerations..."
                className={inputClass(!!errors.description)} />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            <button type="submit" className="btn-primary w-full justify-center">
              Submit Quote Request <ArrowRight size={15} />
            </button>
            <p className="text-xs text-navy-400 text-center">We typically respond promptly. No commitment required.</p>
          </form>
        </motion.div>

        {/* Side info */}
        <div className="flex flex-col gap-5">
          {[
            { icon: Building2, title: 'Commercial Projects', desc: 'Offices, IT parks, retail complexes, hotels, hospitals' },
            { icon: Home, title: 'Residential Projects', desc: 'Luxury villas, apartments, gated communities' },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} {...fadeUp(i * 0.08)}
              className="p-5 rounded-2xl border border-navy-100 bg-white shadow-[var(--shadow-card)] flex gap-4">
              <span className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                <Icon size={16} className="text-primary" />
              </span>
              <div>
                <p className="font-semibold text-dark text-sm">{title}</p>
                <p className="text-navy-500 text-xs mt-1 leading-snug">{desc}</p>
              </div>
            </motion.div>
          ))}
          <motion.div {...fadeUp(0.2)} className="p-6 rounded-2xl bg-primary-light border border-primary/20">
            <h3 className="font-bold text-dark mb-3">What Happens Next?</h3>
            <ol className="space-y-3">
              {['We review your requirements', 'Our team prepares a detailed scope and cost estimate', 'We schedule a call or site visit to discuss', 'You receive a formal proposal'].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                  <span className="text-navy-700 text-sm leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
