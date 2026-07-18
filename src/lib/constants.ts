import type { Project, Service, Stat, NavLink } from '@/types'

export const COMPANY = {
  name: 'BCIM Engineering Private Limited',
  shortName: 'BCIM Engineering',
  tagline: "Building Tomorrow's Commercial & Residential Spaces",
  phone: '+91 80 4432 4693',
  phoneHref: 'tel:+918044324693',
  email: 'bcim@bcim.in',
  hrEmail: 'hr@bcim.in',
  address: '# 11, B Wing, Divyasree Chambers, "O" Shaughnessy Road, Langford Gardens, Bengaluru – 560 025',
  addressShort: 'Bengaluru, India',
  founded: 2018,
  iso: 'ISO 9001, 14001 & 45001 Certified',
  mapUrl: 'https://maps.google.com/?q=Divyasree+Chambers+O+Shaughnessy+Road+Langford+Gardens+Bangalore',
  linkedin: 'https://www.linkedin.com/company/14704327',
  twitter: 'https://www.x.com/BcimPvtLtd',
  offices: [
    {
      label: 'Head Office — Bengaluru',
      address: '# 11, B Wing, Divyasree Chambers, "O" Shaughnessy Road, Langford Gardens, Bengaluru, Karnataka 560025',
      phone: '+91 80 4432 4693',
      phoneHref: 'tel:+918044324693',
      email: 'bcim@bcim.in',
      hours: 'Mon–Sat, 8:30 AM – 6:00 PM',
      mapUrl: 'https://maps.google.com/?q=Divyasree+Chambers+O+Shaughnessy+Road+Langford+Gardens+Bangalore',
    },
    {
      label: 'Regional Office — Hyderabad',
      address: 'Tower View Apartment, No 403, 4th Floor, Plot No 26 & 27, Sri Lakshmi Nagar Colony, Hyderabad, Ranga Reddy Dist., Telangana 500089',
      phone: '+91 80 4432 4693',
      phoneHref: 'tel:+918044324693',
      email: 'bcim@bcim.in',
      hours: 'Mon–Sat, 8:00 AM – 8:00 PM',
      mapUrl: 'https://maps.google.com/?q=Tower+View+Apartment+Sri+Lakshmi+Nagar+Colony+Hyderabad+Telangana',
    },
    {
      label: 'Regional Office — Thane',
      address: 'Godrej Ascend, Kolshet Road, Dhokali, Thane West, Mumbai, Maharashtra',
      phone: '+91 80 4432 4693',
      phoneHref: 'tel:+918044324693',
      email: 'bcim@bcim.in',
      hours: 'Mon–Sat, 9:00 AM – 6:00 PM',
      mapUrl: 'https://maps.google.com/?q=Godrej+Ascend+Kolshet+Road+Dhokali+Thane+West',
    },
  ],
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Commercial Construction',
        href: '/services/commercial',
        description: 'Offices, campuses, retail & hospitality',
      },
      {
        label: 'Residential Construction',
        href: '/services/residential',
        description: 'Villas, apartments & gated communities',
      },
      {
        label: 'Interior Fit-Out',
        href: '/services/interior',
        description: 'Turnkey interiors for commercial spaces',
      },
      {
        label: 'Pre-Construction Services',
        href: '/services/pre-construction',
        description: 'Planning, estimation & value engineering',
      },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const SERVICES: Service[] = [
  {
    id: 'commercial',
    title: 'Commercial Construction',
    description:
      'We design and build premium commercial spaces — from corporate headquarters to retail complexes — with speed, precision, and an uncompromising commitment to quality.',
    items: [
      'Corporate Office Buildings',
      'IT Parks & Tech Campuses',
      'Shopping Complexes & Malls',
      'Hotels & Hospitality',
      'Hospitals & Healthcare Facilities',
      'Educational Institutions',
      'Warehouses & Logistics Hubs',
    ],
    icon: 'Building2',
    image: '/images/projects/techridge-p3.jpg',
    href: '/services/commercial',
  },
  {
    id: 'residential',
    title: 'Residential Construction',
    description:
      'From luxury villas to premium apartment complexes, we create living spaces that stand the test of time — built with care, craftsmanship, and the finest materials.',
    items: [
      'Luxury Villas & Bungalows',
      'Premium Apartment Complexes',
      'Gated Communities',
      'Row Houses & Townhouses',
      'Independent Houses',
      'Duplex & Penthouse Units',
    ],
    icon: 'Home',
    image: '/images/projects/godrej-ascend.jpg',
    href: '/services/residential',
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'techridge-p3',
    name: 'Techridge P3 – Hyderabad',
    client: 'Divyasree Developers',
    location: 'Manikonda, Hyderabad, TG',
    status: 'Ongoing',
    category: 'Commercial',
    scope: '5 Cellar + Ground Floor + 21 + Terrace floors, commercial IT campus',
    area: '2 million sq ft',
    value: '₹184 Cr',
    duration: '24 months',
    pmc: 'Jones Lang LaSalle (JLL)',
    image: '/images/projects/techridge-p3.jpg',
    year: '2022–ongoing',
    featured: true,
  },
  {
    id: 'godrej-ascend',
    name: 'Godrej Ascend – Thane',
    client: 'Godrej Properties',
    location: 'Thane, MH',
    status: 'Ongoing',
    category: 'Residential',
    scope: 'Structural works — Tower 3 (41 floors), Tower 4 (44 floors), Tower 5 (42 floors), MLCP (18 floors) and clubhouse',
    area: '23,36,742 sq ft',
    value: '₹122 Cr',
    duration: '30 months',
    image: '/images/projects/godrej-ascend.jpg',
    year: 'Ongoing',
    featured: true,
  },
  {
    id: 'clspl-vizag',
    name: 'CLSPL Hostel (Ivy League House) – Visakhapatnam',
    client: 'Curated Living Solutions Pvt. Ltd.',
    location: 'AMTZ Campus, Visakhapatnam, AP',
    status: 'Ongoing',
    category: 'Residential',
    scope: 'Hostel building, Ground + 5 + Terrace floors',
    area: '4 lakh sq ft',
    value: '₹12.1 Cr',
    duration: '12 months',
    image: '/images/projects/clspl-vizag.jpg',
    year: 'Ongoing',
    featured: true,
  },
  {
    id: 'tqs-yelahanka',
    name: 'TQS Project – Yelahanka New Town',
    client: 'Confidential',
    location: 'Yelahanka New Town, Bengaluru, KA',
    status: 'Ongoing',
    category: 'Commercial',
    scope: 'Ongoing construction works',
    image: '/images/projects/tqs-yelahanka.jpg',
    year: 'Ongoing',
    featured: false,
  },
  {
    id: 'techridge-p2',
    name: 'Techridge P2 – Hyderabad',
    client: 'Divyasree Developers',
    location: 'Manikonda, Hyderabad, TG',
    status: 'Completed',
    category: 'Commercial',
    scope: '5 Cellar + Ground Floor + 11 + Terrace floors, premium IT office building',
    area: '1.357 million sq ft',
    value: '₹109.15 Cr',
    image: '/images/projects/techridge-p2.jpg',
    year: '2023',
    featured: true,
  },
  {
    id: 'techridge-peb03',
    name: 'Techridge PEB 03 – Hyderabad',
    client: 'Divyasree Developers',
    location: 'Manikonda, Hyderabad, TG',
    status: 'Completed',
    category: 'Commercial',
    scope: 'Ground Floor + 1 floor, pre-engineered building',
    area: '54,876 sq ft',
    value: '₹1.95 Cr',
    image: '/images/projects/techridge-peb03.jpg',
    year: '2022',
    featured: false,
  },
  {
    id: 'orion-b8',
    name: 'Orion B8 Campus – Hyderabad',
    client: 'Divyasree Developers',
    location: 'Hyderabad, TG',
    status: 'Completed',
    category: 'Commercial',
    scope: 'External development and road works for Orion B8 IT Campus',
    area: '2,286 sq m',
    value: '₹2.37 Cr',
    image: '/images/projects/orion-b8.jpg',
    year: '2022',
    featured: false,
  },
  {
    id: 'techridge-campus-roads',
    name: 'Techridge Campus – External Development',
    client: 'Divyasree Developers',
    location: 'Manikonda, Hyderabad, TG',
    status: 'Completed',
    category: 'Commercial',
    scope: 'External development and road works',
    area: '4,160 sq m',
    value: '₹13 Cr',
    duration: '5 months',
    image: '/images/projects/techridge-campus-roads.jpg',
    year: '2022',
    featured: false,
  },
  {
    id: 'omega-sportszone',
    name: 'Omega Campus – Sports Zone',
    client: 'Divyasree Developers',
    location: 'Hyderabad, TG',
    status: 'Completed',
    category: 'Commercial',
    scope: 'Road works',
    value: '₹2.13 Cr',
    image: '/images/projects/omega-campus-sportszone.jpg',
    year: '2022',
    featured: false,
  },
  {
    id: 'locl-mission-road',
    name: 'LOCL Mission Road – Bangalore',
    client: 'LOCL',
    location: 'Mission Road, Bengaluru, KA',
    status: 'Completed',
    category: 'Commercial',
    scope: 'Principal contracting works, Ground + 4 + Terrace floors',
    value: '₹7.37 Cr',
    image: '/images/projects/locl-mission-road.jpg',
    year: '2022',
    featured: false,
  },
  {
    id: 'trinity-food-court',
    name: 'Trinity Food Court – Hyderabad',
    client: 'Divyasree Developers',
    location: 'Hyderabad, TG',
    status: 'Completed',
    category: 'Commercial',
    scope: 'Food court construction',
    value: '₹2.17 lakhs',
    image: '/images/projects/trinity-food-court.jpg',
    year: '2022',
    featured: false,
  },
]

export const STATS: Stat[] = [
  { label: 'Years Active', value: new Date().getFullYear() - 2018, suffix: '+', icon: 'CalendarDays' },
  { label: 'Completed Projects', value: 7, suffix: '', icon: 'CheckCircle2' },
  { label: 'Ongoing Projects', value: 4, suffix: '', icon: 'HardHat' },
  { label: 'Workforce', value: 750, suffix: '+', icon: 'Users' },
  { label: 'Avg. Staff Experience', value: 23, suffix: '+ yrs', icon: 'LayoutGrid' },
]

export const WORKFORCE = {
  workmen: 647,
  staff: 103,
  total: 750,
  breakdown: [
    { role: 'Carpenter', count: 154 },
    { role: 'Steel Fitter', count: 107 },
    { role: 'Helper', count: 179 },
    { role: 'Mason', count: 87 },
    { role: 'Technicians / Operators', count: 96 },
    { role: 'Scaffolder', count: 24 },
  ],
}

export const SAFETY_RECORD = {
  safeManHoursTechridgeP2: '4.5 million+',
  techridgeP3: {
    startDate: '14-10-2022',
    safeManHoursSinceInception: 4322235,
    toolboxTalksSinceInception: 1236,
    workPermitsSinceInception: 9525,
    lostTimeAccidents: 0,
    firstAidCases: 17,
    nearMissCases: 18,
  },
  certifyingBody: 'Bureau Veritas',
}

export const AWARDS = [
  { title: 'International Safety Award — Merit', year: '2024', project: 'Techridge P3' },
]

export const WHY_CHOOSE = [
  {
    icon: 'ShieldCheck',
    title: 'Bureau Veritas-Certified',
    description:
      'ISO 9001:2015 quality management certification, audited by Bureau Veritas, applied consistently across every project phase.',
  },
  {
    icon: 'Timer',
    title: 'Strict Adherence to Schedules',
    description:
      'Planning and monitoring that keeps delivery dates honest, backed by rigorous project management.',
  },
  {
    icon: 'BadgeDollarSign',
    title: 'Transparent Pricing',
    description:
      'Detailed BOQs, no hidden charges. We deliver honest estimates and stand behind every line item.',
  },
  {
    icon: 'Leaf',
    title: 'Environmental Management',
    description:
      'ISO 14001:2015-certified environmental management practices across all construction activities.',
  },
  {
    icon: 'Headphones',
    title: 'Dedicated Project Teams',
    description:
      'Every project gets a dedicated site manager, project engineer, and client liaison from day one to handover.',
  },
  {
    icon: 'Award',
    title: 'Award-Winning Safety Culture',
    description:
      'International Safety Award (Merit, 2024) for Techridge P3, backed by ISO 45001:2018 and National Safety Council membership.',
  },
]

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'We understand your vision, requirements, timeline, and budget through a structured discovery session.',
  },
  {
    step: '02',
    title: 'Design & Engineering',
    description: 'Our in-house team prepares detailed architectural plans, structural designs, and MEP drawings.',
  },
  {
    step: '03',
    title: 'Pre-Construction Planning',
    description: 'Comprehensive BOQ preparation, vendor finalization, and project schedule development.',
  },
  {
    step: '04',
    title: 'Construction & Execution',
    description: 'On-site construction with daily progress tracking, quality audits, and transparent client reporting.',
  },
  {
    step: '05',
    title: 'Quality Assurance',
    description: 'Multi-stage quality checks at structure, finishing, and MEP stages before handover.',
  },
  {
    step: '06',
    title: 'Handover',
    description: 'Snag-free handover with complete documentation and defect liability terms agreed per contract.',
  },
]
