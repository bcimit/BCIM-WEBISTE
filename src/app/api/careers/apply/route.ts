import { NextRequest, NextResponse } from 'next/server'

const ERP_BASE = process.env.ERP_BASE_URL ?? 'https://erp.bcim.in'
const ERP_KEY  = process.env.ERP_API_TOKEN ?? ''

const ALLOWED_ORIGINS = new Set([
  'https://bcim.in',
  'https://site.bcim.in',
  'http://localhost:3000',
  'http://localhost:3007',
])

const ALLOWED_RESUME_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

const MAX_RESUME_BYTES = 5 * 1024 * 1024  // 5 MB
const MAX_BODY_BYTES   = 6 * 1024 * 1024  // 6 MB total

export async function POST(req: NextRequest) {
  if (!ERP_KEY) return NextResponse.json({ error: 'Server not configured' }, { status: 503 })

  // CSRF: reject requests from unlisted origins
  const origin = req.headers.get('origin') ?? ''
  if (!ALLOWED_ORIGINS.has(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Body size guard (Content-Length is advisory but catches obvious abuse)
  const contentLength = req.headers.get('content-length')
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request too large. Maximum 6 MB.' }, { status: 413 })
  }

  try {
    const formData = await req.formData()

    // Validate resume if present
    const resume = formData.get('resume')
    if (resume instanceof File && resume.size > 0) {
      if (!ALLOWED_RESUME_MIME.has(resume.type)) {
        return NextResponse.json(
          { error: 'Only PDF or Word documents are accepted as resume.' },
          { status: 400 },
        )
      }
      if (resume.size > MAX_RESUME_BYTES) {
        return NextResponse.json(
          { error: 'Resume exceeds the 5 MB limit. Please compress and re-upload.' },
          { status: 413 },
        )
      }
    }

    const upstream = await fetch(`${ERP_BASE}/api/public/careers/apply`, {
      method: 'POST',
      headers: { 'X-Api-Key': ERP_KEY },
      body: formData,
    })

    // Guard against non-JSON error pages from upstream proxies
    const ct = upstream.headers.get('content-type') ?? ''
    if (!ct.includes('application/json')) {
      const text = await upstream.text().catch(() => '')
      console.error('[careers/apply] ERP non-JSON response', upstream.status, text.slice(0, 500))
      return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 502 })
    }

    const json = await upstream.json()
    return NextResponse.json(json, { status: upstream.status })
  } catch (err) {
    console.error('[careers/apply]', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
