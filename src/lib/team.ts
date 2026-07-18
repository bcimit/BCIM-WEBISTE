export interface BoardMember {
  name: string
  role: string
  experience?: string
  bio?: string
}

export const BOARD_OF_DIRECTORS: BoardMember[] = [
  { name: 'Mr. A. Stephen', role: 'Managing Director' },
  { name: 'Mr. Srinivas Raju', role: 'Director' },
]

export const SENIOR_MANAGEMENT: BoardMember[] = [
  {
    name: 'Mr. Bhabagahi Biswal',
    role: 'Project Head',
    experience: '31+ years',
    bio: 'Handled residential and commercial projects at NCCC (Hyderabad), L&T (ECC Division, Mumbai), Divyasree NSL Raidurgam, and Phoenix Gold Edge before joining BCIM.',
  },
  {
    name: 'Mr. S. Krishna Murthy',
    role: 'General Manager – Accounts & Finance',
    experience: '25+ years',
    bio: 'Worked across BMRC Metro Rail, Kochi Metro Rail, Mumbai Metro Rail, NHAI and Konkan Railway Tunnel projects. MBA in Finance, Osmania University.',
  },
  {
    name: 'Mr. Praveen Parameshwar S',
    role: 'Deputy General Manager – Procurement',
    experience: '20+ years',
    bio: 'Previously handled procurement for commercial, residential and institutional projects at Shyamaraju & Company (Divyasree Group).',
  },
  {
    name: 'Mr. Surendra Hegde',
    role: 'Senior HR & Admin Manager',
    experience: '29+ years',
    bio: '16 years in Dubai and 8+ years in Mumbai prior to BCIM, managing workforces of 1,000+ on civil and structural steel projects. MBA in HR, JNU Jaipur.',
  },
  {
    name: 'Mr. Gunasekaran',
    role: 'Senior Project Manager',
    experience: '26+ years',
    bio: 'Construction and rebar detailing specialist; led rebar detailing and estimation teams across UAE, US and India on projects including The Royal Atlantis and Expo 2020 Dubai.',
  },
  {
    name: 'Mr. Vijay Ganesan',
    role: 'Project Manager',
    experience: '20+ years',
    bio: 'Large-scale civil and structural project management with 10 years of international exposure, including roles at Eversendai, JMC Infra and IVRCL Infra.',
  },
  {
    name: 'Mr. Ananthan Nagesh',
    role: 'Project Manager',
    experience: '15+ years',
    bio: 'Residential, commercial and industrial construction experience at Eversendai, JMC Projects and Gammon India.',
  },
  {
    name: 'Mr. Bharathidasan',
    role: 'QA/QC Manager',
    experience: '22+ years',
    bio: 'Civil QA/QC specialist with prior roles at IVRCL, SVS Projects and AGA Infra Projects.',
  },
  {
    name: 'Vignesh R',
    role: 'Design Manager',
    experience: '15+ years',
    bio: 'Structural engineering postgraduate with experience across ACE Consulting Engineering, Tata Consulting Engineering and Larsen & Toubro.',
  },
  {
    name: 'Mr. Nandlal Kumar',
    role: 'Environment, Health & Safety Manager',
    experience: '12+ years',
    bio: 'EHS management across high-rise buildings, thermal power, hydro, oil & gas and railway tunnel projects.',
  },
  {
    name: 'Mr. Gopi C',
    role: 'Plant & Machinery Manager',
    experience: '12+ years',
    bio: 'Construction plant and machinery management, including roles at Eversendai and the AbuHani Group (Oman).',
  },
  {
    name: 'Mr. Vijayan R',
    role: 'Manager – Asset cum Store',
    experience: '19+ years',
    bio: 'Stores, purchase and contract management across Sobha Developers, Damden Properties, Shyamaraju & Company and L&W Construction.',
  },
  {
    name: 'Mr. Dheena Dayalan K',
    role: 'Asst. Manager – IT & Document Control',
    experience: '12+ years',
    bio: 'IT support and document control, ensuring project documentation is collated, maintained and accessible across the organisation.',
  },
]

export interface Department {
  name: string
  description: string
}

export const HIRING_DEPARTMENTS: Department[] = [
  { name: 'Engineering', description: 'Site engineers, structural and MEP coordination roles across active project sites.' },
  { name: 'Project Management', description: 'Planning, scheduling and end-to-end delivery ownership for commercial and residential projects.' },
  { name: 'Commercial', description: 'Quantity surveying, procurement and cost control across our project portfolio.' },
  { name: 'HSE', description: 'Health, safety and environment roles maintaining our ISO 45001 safety culture on every site.' },
  { name: 'Finance & Admin', description: 'Site accounts, HR and administrative support across our offices.' },
]
