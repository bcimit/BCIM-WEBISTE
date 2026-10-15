'use client'

import { useRef, useState } from 'react'
import { CheckCircle2, AlertCircle, Loader2, Paperclip, Send } from 'lucide-react'

const field = 'w-full px-4 py-2.5 rounded-xl border border-navy-200 bg-white text-base sm:text-sm text-dark placeholder:text-navy-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors'

const EMPTY = { company: '', name: '', phone: '', email: '', supply: '' }

export function VendorForm() {
  const [f, setF] = useState(EMPTY)
  const [doc, setDoc] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF(v => ({ ...v, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const fd = new FormData()
    fd.append('company_name', f.company.trim())
    fd.append('contact_person', f.name.trim())
    fd.append('phone', f.phone.trim())
    fd.append('email', f.email.trim())
    fd.append('supplies', f.supply.trim())
    if (doc) fd.append('document', doc)

    try {
      const res = await fetch('/api/vendors/register', { method: 'POST', body: fd })
      const json = await res.json().catch(() => ({}))
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

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={28} className="text-emerald-600" />
        </div>
        <h2 className="font-bold text-dark text-lg mb-2">Registration Received</h2>
        <p className="text-navy-500 text-sm max-w-xs mx-auto">
          Thank you. Our procurement team will review your details and get in touch.
        </p>
      </div>
    )
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

      <div>
        <span className="block text-xs font-semibold text-navy-600 mb-1.5">
          Company Profile / Registration Document (PDF, Word, JPG or PNG, max 5 MB)
        </span>
        <div
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-navy-200 bg-white cursor-pointer hover:border-primary/40 transition-colors"
        >
          <Paperclip size={14} className={doc ? 'text-primary' : 'text-navy-300'} />
          <span className={`text-sm flex-1 truncate ${doc ? 'text-dark' : 'text-navy-300'}`}>
            {doc ? doc.name : 'Click to attach a document…'}
          </span>
          {doc && (
            <button type="button"
              onClick={ev => { ev.stopPropagation(); setDoc(null); if (fileRef.current) fileRef.current.value = '' }}
              className="text-xs text-navy-400 hover:text-red-500">Remove</button>
          )}
        </div>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="hidden"
          onChange={ev => {
            const file = ev.target.files?.[0] ?? null
            if (file && file.size > 5 * 1024 * 1024) {
              setErrorMsg('Document exceeds 5 MB. Please compress it and try again.')
              setStatus('error')
              if (fileRef.current) fileRef.current.value = ''
              return
            }
            setDoc(file)
            if (status === 'error') { setStatus('idle'); setErrorMsg('') }
          }} />
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="btn-primary text-sm disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'loading'
          ? <><Loader2 size={14} className="animate-spin" /> Submitting…</>
          : <><Send size={14} /> Send Registration</>}
      </button>
    </form>
  )
}
