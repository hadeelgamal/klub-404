'use client'

const PAD = 'clamp(12px, 1.04vw, 15px)'

const label: React.CSSProperties = {
  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#747474',
}

const INDUSTRIES = [
  {
    number: '01',
    name: 'Health & Medical',
    desc: 'Building tools that make healthcare more accessible, legible, and humane.',
  },
  {
    number: '02',
    name: 'Beauty & Wellness',
    desc: 'Specialized booking management systems and digital marketplaces.',
  },
  {
    number: '03',
    name: 'Core Tech',
    desc: 'Products and infrastructure that support business across the board.',
  },
]

export default function Industries() {
  return (
    <section
      id="industries"
      style={{ backgroundColor: '#000000', borderTop: '1px solid #2D2D2D' }}
    >
      {/* Section label row */}
      <div
        style={{
          borderBottom: '1px solid #2D2D2D',
          padding: `20px ${PAD}`,
        }}
      >
        <span style={label}>Focus Industries</span>
      </div>

      {/* Industry rows */}
      {INDUSTRIES.map((industry) => (
        <div
          key={industry.number}
          style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 1fr',
            borderBottom: '1px solid #2D2D2D',
            padding: `32px ${PAD}`,
            gap: '20px',
            alignItems: 'center',
          }}
          className="industry-row"
        >
          <span style={label}>{industry.number}</span>
          <p
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#ffffff',
            }}
          >
            {industry.name}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: '14px',
              lineHeight: 1.6,
              color: '#747474',
            }}
          >
            {industry.desc}
          </p>
        </div>
      ))}

      <style>{`
        @media (max-width: 767px) {
          .industry-row {
            grid-template-columns: 40px 1fr !important;
          }
          .industry-row > :last-child { grid-column: 2; }
        }
      `}</style>
    </section>
  )
}
