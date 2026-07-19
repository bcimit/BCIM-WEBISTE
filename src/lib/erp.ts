export interface ERPJob {
  id: string
  job_title: string
  department: string
  designation?: string
  location?: string
  vacancies: number
  experience_min?: number
  experience_max?: number
  job_type?: string
  description?: string
  skills_required?: string
  closing_date?: string
  status: string
}

export async function fetchERPJobs(): Promise<ERPJob[]> {
  const token = process.env.ERP_API_TOKEN
  const base  = process.env.ERP_BASE_URL ?? 'https://erp.bcim.in'

  if (!token) return []

  const res = await fetch(`${base}/api/public/careers/jobs`, {
    headers: { 'X-Api-Key': token },
    next: { revalidate: 300 },
  })

  if (!res.ok) throw new Error(`ERP responded ${res.status}`)

  const json = await res.json()
  const raw: Record<string, unknown>[] = Array.isArray(json?.data) ? json.data : []

  return raw.map(j => ({
    id:              String(j.id ?? ''),
    job_title:       String(j.title ?? j.job_title ?? ''),
    department:      String(j.department ?? ''),
    designation:     j.designation    ? String(j.designation)    : undefined,
    location:        j.work_location  ? String(j.work_location)  : undefined,
    vacancies:       Number(j.vacancies ?? 1),
    experience_min:  j.experience_min != null ? Number(j.experience_min) : undefined,
    experience_max:  j.experience_max != null ? Number(j.experience_max) : undefined,
    job_type:        j.job_type        ? String(j.job_type)        : undefined,
    description:     j.description    ? String(j.description)    : undefined,
    skills_required: j.skills_required ? String(j.skills_required) : undefined,
    closing_date:    j.closing_date    ? String(j.closing_date)    : undefined,
    status:          String(j.status ?? 'open'),
  })).filter(j => j.status !== 'closed')
}
