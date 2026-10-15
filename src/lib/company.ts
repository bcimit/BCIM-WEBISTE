export const MD_MESSAGE = {
  name: 'Mr. A. Stephen',
  role: 'Managing Director',
  paragraphs: [
    'Welcome to the world of BCIM Engineering Private Limited. To begin with, I would like to express my heartfelt gratitude to our esteemed clientele and to record my sincere appreciation for the employees who work diligently and deliver the projects to everyone’s delight.',
    'Further, I would like to thank you all for visiting our profile and learning about our victorious voyage in the construction business. It reflects how we stand out in today’s competitive atmosphere by offering our clients the most cost-effective construction solutions, which they cherish forever.',
    'Our ever-expanding success stories are available in leaps and bounds across the following sectors:',
  ],
  sectors: [
    'Design & Engineering',
    'Project Management & Monitoring',
    'Finishing of General Amenities',
    'Residential, Commercial & Institutional Projects',
  ],
  closing: [
    'Our vision is to be a world-class construction company and to establish a much stronger foothold among our respected competitors.',
    'With a wonderful army of clients and workforce, we aim to expand at a healthy pace in the years ahead by adhering to our habit of timely deliveries within budget.',
    'In a nutshell, we will continue our legacy by achieving “rich rewards of repeated orders by our reputed clients”.',
  ],
}

export const EHS_POLICY = {
  intro:
    'BCIM Engineering Private Limited is one of the young and energetic general contractors in India, committed to maintaining a high standard of environment, health and safety practices at all our project sites, to minimise the risk to all our stakeholders and the impact on the environment. Our commitment is supported by continual improvement in EHS performance and a workspace culture built on effectively managing the following:',
  points: [
    'Ensuring that the EHS Management System is established, implemented, maintained and continually improved, in compliance with international standards.',
    'Ensuring full compliance with all applicable legal and other compliance obligations.',
    'Providing and maintaining work conditions that protect the environment, prevent pollution, and prevent injury and ill health by eliminating hazards and reducing risks.',
    'Ensuring consultation and participation of workers or their representatives on matters related to health and safety.',
    'Committing to continual improvement in all activities related to Environment, Health & Safety.',
    'Ensuring waste minimisation and optimised use of resources, to reduce, reuse and recycle waste and conserve natural resources.',
  ],
  philosophies: [
    { title: 'High Standard of Quality' },
    { title: 'Strict Adherence to Schedules' },
    { title: 'Safety & Security First' },
    { title: 'Total Customer Satisfaction' },
  ],
}

export const FACILITIES = [
  { name: 'Labour Camp', image: '/images/facilities/labour-camp.jpg' },
  { name: 'R.O. Water Plant', image: '/images/facilities/ro-plant.jpg' },
  { name: 'Staff Mess & Canteen', image: '/images/facilities/staff-canteen.jpg' },
  { name: 'Batching Plant', image: '/images/facilities/batching-plant.png' },
]

export const CLIENTS = [
  { name: 'Divyasree', image: '/images/clients/divyasree.jpg' },
  { name: 'Curated Living Solutions (CLSPL)', image: '/images/clients/clspl.jpg' },
  { name: 'Denali', image: '/images/clients/denali.jpg' },
  { name: 'Phoenix', image: '/images/clients/phoenix.jpg' },
]

export const PMCS = [
  { name: 'Jones Lang LaSalle (JLL)', image: '/images/clients/jll.png' },
  { name: 'Hill International', image: '/images/clients/hill-international.png' },
]

export const CONSULTANTS = [
  { name: 'RSP', image: '/images/clients/rsp.jpg' },
  { name: 'Chapman Taylor', image: '/images/clients/chapman-taylor.jpg' },
  { name: 'IMdZIN Center', image: '/images/clients/imdzin.jpg' },
  { name: 'Ennovative Design', image: '/images/clients/ennovative-design.jpg' },
  { name: 'Dr. Kelkar Designs', image: '/images/clients/dr-kelkar.jpg' },
  { name: 'Designtree', image: '/images/clients/designtree.jpg' },
  { name: 'Strudcom', image: '/images/clients/strudcom.jpg' },
  { name: 'Harchan Consultant', image: '/images/clients/harchan.jpg' },
]

export const EVENTS = {
  title: '53rd National Safety Week — Techridge Project',
  summary:
    'First-aid and CPR training, health check-ups at the workmen camp, appreciation of workers, a plantation programme, a drawing and slogan competition, and on-the-job and fire-fighting training.',
  images: Array.from({ length: 15 }, (_, i) => `/images/events/safety-week-${String(i + 1).padStart(2, '0')}.jpg`),
}
