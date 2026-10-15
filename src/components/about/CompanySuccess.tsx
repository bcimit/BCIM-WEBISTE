import { ShieldCheck } from 'lucide-react'

const PARTS = [
  { label: ['Plan-Action', 'Check'], fill: '#4d8c2f' },
  { label: ['System', 'Procedures'], fill: '#d2691e' },
  { label: ['Engineering', 'Technology'], fill: '#7d7a6e' },
  { label: ['Skilled', 'People'], fill: '#d9a000' },
  { label: ['Machinery', 'Equipments'], fill: '#2f5f9e' },
]

const ISO = ['ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018']

const CX = 200, CY = 200, R_OUT = 180, R_IN = 62, GAP = 2.5

function pt(r: number, deg: number) {
  const a = (deg * Math.PI) / 180
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}

function wedge(start: number, end: number) {
  const [x1, y1] = pt(R_OUT, start)
  const [x2, y2] = pt(R_OUT, end)
  const [x3, y3] = pt(R_IN, end)
  const [x4, y4] = pt(R_IN, start)
  return `M${x1},${y1} A${R_OUT},${R_OUT} 0 0 1 ${x2},${y2} L${x3},${y3} A${R_IN},${R_IN} 0 0 0 ${x4},${y4} Z`
}

export function CompanySuccess() {
  return (
    <section id="company-success" className="section-py bg-bg scroll-mt-20">
      <div className="container-xl grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="eyebrow mb-3">Company Success</p>
          <h2 className="text-4xl font-bold text-dark mb-5">Five Parts of One Wheel</h2>
          <p className="text-navy-600 leading-relaxed mb-8">
            Our key to success is managing every facet of the construction wheel — procedures, people,
            machinery, technology and quality — successfully and optimally.
          </p>

          <div id="process-control" className="flex items-center gap-2 mb-3 scroll-mt-28">
            <ShieldCheck size={18} className="text-primary" />
            <h3 className="font-bold text-dark">Process Control</h3>
          </div>
          <p className="text-navy-600 text-[0.9375rem] leading-relaxed mb-4">
            We operate and control our projects by implementing integrated management system requirements:
          </p>
          <ul className="flex flex-wrap gap-2">
            {ISO.map(i => (
              <li key={i} className="px-3 py-1.5 rounded-lg bg-white border border-navy-100 text-xs font-bold text-navy-700">{i}</li>
            ))}
          </ul>
        </div>

        <svg viewBox="0 0 400 400" role="img" aria-label="Company success wheel: Plan-Action-Check, System Procedures, Engineering Technology, Skilled People and Machinery Equipments"
          className="w-full max-w-md mx-auto">
          {PARTS.map(({ label, fill }, i) => {
            const start = -90 + i * 72 + GAP
            const end = -90 + (i + 1) * 72 - GAP
            const [tx, ty] = pt((R_OUT + R_IN) / 2 + 6, (start + end) / 2)
            return (
              <g key={label.join('')}>
                <path d={wedge(start, end)} fill={fill} />
                <text x={tx} y={ty} textAnchor="middle" fill="#fff" fontSize="17" fontWeight="700">
                  <tspan x={tx} dy="-0.3em">{label[0]}</tspan>
                  <tspan x={tx} dy="1.2em">{label[1]}</tspan>
                </text>
              </g>
            )
          })}
          <circle cx={CX} cy={CY} r={R_IN - 10} fill="#fff" />
          <text x={CX} y={CY - 2} textAnchor="middle" fill="#0f2542" fontSize="16" fontWeight="800">BCIM</text>
          <text x={CX} y={CY + 17} textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="600">SUCCESS</text>
        </svg>
      </div>
    </section>
  )
}
