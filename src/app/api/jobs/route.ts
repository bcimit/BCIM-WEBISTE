import { NextResponse } from 'next/server'
import { fetchERPJobs } from '@/lib/erp'

export const revalidate = 300

export async function GET() {
  const jobs = await fetchERPJobs()
  return NextResponse.json({ data: jobs })
}
