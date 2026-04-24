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

const OFFERINGS = [
  {
    category: 'Product & Design',
    items: [
      { name: 'Interface Design', desc: 'Minimalist visuals with expansive space and bold text.' },
      { name: 'User Experience (UX)', desc: 'Mapping the simplest path for your customers.' },
      { name: 'Creative Concepts', desc: 'Developing the "big idea" behind your brand.' },
    ],
  },
  {
    category: 'Strategy & Content',
    items: [
      { name: 'Digital Strategy', desc: 'Data-driven insights to find your place in the market.' },
      { name: 'AI-Powered Campaigns', desc: 'Rapid, high-quality marketing content and visuals.' },
      { name: 'Smart Automation', desc: 'AI workflows to keep your operations lean and fast.' },
    ],
  },
  {
    category: 'Experience & Launch',
    items: [
      { name: 'Web & App Development', desc: 'Clean, scalable code using modern tech.' },
      { name: 'Digital Touchpoints', desc: 'Polished interactions from sign-up to checkout.' },
      { name: 'Virtual Events', desc: 'Online launches and workshops to build momentum.' },
    ],
  },
]

export default function Pillars() {
  return (
    <section
      id="offerings"
      style={{ backgroundColor: '#000000', borderTop: '1px solid #2D2D2D' }}
    >
      {/* Section label row */}
      <div
        style={{
          borderBottom: '1px solid #2D2D2D',
          padding: `20px ${PAD}`,
        }}
      >
        <span style={label}>Our Core Offerings</span>
      </div>

      {/* 3-column offerings grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
        className="offerings-grid"
      >
        {OFFERINGS.map((offering, colIdx) => (
          <div
            key={offering.category}
            style={{
              borderRight: colIdx < 2 ? '1px solid #2D2D2D' : 'none',
            }}
            className="offering-col"
          >
            {/* Category header */}
            <div
              style={{
                borderBottom: '1px solid #2D2D2D',
                padding: `20px ${PAD}`,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#ffffff',
                  lineHeight: 1.3,
                }}
              >
                {offering.category}
              </p>
            </div>

            {/* Service items */}
            {offering.items.map((item, itemIdx) => (
              <div
                key={item.name}
                style={{
                  padding: `24px ${PAD}`,
                  borderBottom: itemIdx < offering.items.length - 1 ? '1px solid #2D2D2D' : 'none',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#ffffff',
                    marginBottom: '6px',
                    lineHeight: 1.3,
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#747474',
                    lineHeight: 1.55,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .offerings-grid {
            grid-template-columns: 1fr !important;
          }
          .offering-col {
            border-right: none !important;
            border-bottom: 1px solid #2D2D2D;
          }
          .offering-col:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  )
}
