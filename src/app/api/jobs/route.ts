import { NextResponse } from 'next/server'
import { fetchERPJobs } from '@/lib/erp'

export const revalidate = 300

export async function GET() {
  try {
    const jobs = await fetchERPJobs()
    return NextResponse.json({ data: jobs })
  } catch (err) {
    console.error('[api/jobs]', err)
    return NextResponse.json({ error: 'Job listings temporarily unavailable.' }, { status: 503 })
  }
}
