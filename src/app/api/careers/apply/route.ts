import { NextRequest, NextResponse } from 'next/server'

const ERP_BASE = process.env.ERP_BASE_URL ?? 'https://erp.bcim.in'
const ERP_KEY  = process.env.ERP_API_TOKEN ?? ''

export async function POST(req: NextRequest) {
  if (!ERP_KEY) return NextResponse.json({ error: 'Server not configured' }, { status: 503 })

  try {
    const formData = await req.formData()

    const upstream = await fetch(`${ERP_BASE}/api/public/careers/apply`, {
      method: 'POST',
      headers: { 'X-Api-Key': ERP_KEY },
      body: formData,
    })

    const json = await upstream.json()
    return NextResponse.json(json, { status: upstream.status })
  } catch {
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
