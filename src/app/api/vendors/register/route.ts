import { NextRequest, NextResponse } from 'next/server'

const ERP_BASE = process.env.ERP_BASE_URL ?? 'https://erp.bcim.in'
const ERP_KEY  = process.env.ERP_API_TOKEN ?? ''

const ALLOWED_ORIGINS = new Set([
  'https://bcim.in',
  'https://www.bcim.in',
  'https://site.bcim.in',
  'http://localhost:3000',
  'http://localhost:3001',
])

const ALLOWED_DOC_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
])

const MAX_DOC_BYTES = 5 * 1024 * 1024
const MAX_BODY_BYTES = 6 * 1024 * 1024

export async function POST(req: NextRequest) {
  if (!ERP_KEY) return NextResponse.json({ error: 'Server not configured' }, { status: 503 })

  const origin = req.headers.get('origin') ?? ''
  if (!ALLOWED_ORIGINS.has(origin)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const len = req.headers.get('content-length')
  if (len && parseInt(len, 10) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request too large. Maximum 6 MB.' }, { status: 413 })
  }

  try {
    const formData = await req.formData()

    const doc = formData.get('document')
    if (doc instanceof File && doc.size > 0) {
      if (!ALLOWED_DOC_MIME.has(doc.type)) {
        return NextResponse.json({ error: 'Attach a PDF, Word document, JPG or PNG.' }, { status: 400 })
      }
      if (doc.size > MAX_DOC_BYTES) {
        return NextResponse.json({ error: 'Document exceeds the 5 MB limit.' }, { status: 413 })
      }
    }

    const upstream = await fetch(`${ERP_BASE}/api/public/vendors/register`, {
      method: 'POST',
      headers: { 'X-Api-Key': ERP_KEY },
      body: formData,
    })

    const ct = upstream.headers.get('content-type') ?? ''
    if (!ct.includes('application/json')) {
      console.error('[vendors/register] ERP non-JSON response', upstream.status)
      return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 502 })
    }

    const json = await upstream.json()
    if (!upstream.ok) {
      return NextResponse.json({ error: json?.error ?? 'Submission failed. Please try again.' }, { status: upstream.status })
    }
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error('[vendors/register]', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
