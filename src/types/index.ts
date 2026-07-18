export interface Project {
  id: string
  name: string
  client: string
  location: string
  status: 'Ongoing' | 'Completed'
  category: 'Commercial' | 'Residential'
  scope: string
  area?: string
  value?: string
  duration?: string
  pmc?: string
  image: string
  year?: string
  featured?: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  items: string[]
  icon: string
  image: string
  href: string
}

export interface Stat {
  label: string
  value: number
  suffix: string
  prefix?: string
  icon: string
}

export interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}
