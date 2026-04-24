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

const body: React.CSSProperties = {
  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: 1.6,
  color: '#747474',
}

const BULLETS = [
  {
    title: 'From Ideation to MVP with Speed',
    desc: 'We move from a concept to a functional, market-ready product in weeks, not months.',
  },
  {
    title: 'AI-Integrated Architecture',
    desc: 'We use AI-assisted development and intelligent agents from day one to speed up the building process and refine the final output.',
  },
  {
    title: 'Lean Economics',
    desc: 'Our workflows are built to keep your team small and your impact large, using smart automation to handle the repetitive while you focus on the vision.',
  },
]

export default function Manifesto() {
  return (
    <section
      id="studio"
      style={{ backgroundColor: '#000000', borderTop: '1px solid #2D2D2D' }}
    >
      {/* Section label row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid #2D2D2D',
          padding: `20px ${PAD}`,
        }}
        className="manifesto-header"
      >
        <span style={label}>Studio</span>
        <h2
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: 'clamp(18px, 2.2vw, 30px)',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#ffffff',
          }}
        >
          Workflows Tailored to Early-Stage Startups
        </h2>
      </div>

      {/* Intro paragraph */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid #2D2D2D',
          padding: `40px ${PAD}`,
          gap: '20px',
        }}
        className="manifesto-intro"
      >
        <div />
        <p style={{ ...body, fontSize: '16px', maxWidth: '52ch' }}>
          We understand the constraints of the early market. Our process is designed to maximize
          your runway while sharpening your product&apos;s competitive edge.
        </p>
      </div>

      {/* Bullet rows */}
      {BULLETS.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: `${PAD === 'clamp(12px, 1.04vw, 15px)' ? '80px' : '80px'} 1fr 1fr`,
            borderBottom: '1px solid #2D2D2D',
            padding: `32px ${PAD}`,
            gap: '20px',
            alignItems: 'start',
          }}
          className="manifesto-bullet"
        >
          <span style={label}>{String(i + 1).padStart(2, '0')}</span>
          <p
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: '15px',
              fontWeight: 500,
              lineHeight: 1.3,
              color: '#ffffff',
            }}
          >
            {item.title}
          </p>
          <p style={body}>{item.desc}</p>
        </div>
      ))}

      <style>{`
        @media (max-width: 767px) {
          .manifesto-header,
          .manifesto-intro { grid-template-columns: 1fr !important; }
          .manifesto-bullet { grid-template-columns: 40px 1fr !important; }
          .manifesto-bullet > :last-child { grid-column: 2; }
        }
      `}</style>
    </section>
  )
}
