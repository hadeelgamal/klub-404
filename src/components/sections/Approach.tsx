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

const STEPS = [
  {
    number: '01',
    headline: 'Find the real problem.',
    body: 'We spend our energy on diagnosis. If we cannot articulate exactly why a problem is worth solving—and for whom—we do not move. We build only what matters.',
  },
  {
    number: '02',
    headline: 'AI-powered workflows.',
    body: 'AI is not a tool we layer on top; it is part of the architecture from day one. Whether it is intelligent agents, generative features, AI-assisted development, or automated workflows—it fundamentally changes the build surface and the economics of your product.',
  },
  {
    number: '03',
    headline: 'Ship. Then stay.',
    body: 'Shipping is not the end—it is the beginning of the interesting part. We stay inside the problem after launch. We grow with you.',
  },
]

export default function Approach() {
  return (
    <section
      id="process"
      style={{ backgroundColor: '#000000', borderTop: '1px solid #2D2D2D' }}
    >
      {/* Section label row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid #2D2D2D',
          padding: `20px ${PAD}`,
          gap: '20px',
        }}
        className="approach-header"
      >
        <span style={label}>How We Build</span>
        <p
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '14px',
            color: '#747474',
            lineHeight: 1.5,
          }}
        >
          Our process is designed for clarity and speed. We don&apos;t just build features; we solve problems.
        </p>
      </div>

      {/* Step rows */}
      {STEPS.map((step) => (
        <div
          key={step.number}
          style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 1fr',
            borderBottom: '1px solid #2D2D2D',
            padding: `40px ${PAD}`,
            gap: '20px',
            alignItems: 'start',
          }}
          className="approach-step"
        >
          <span style={label}>{step.number}</span>
          <h3
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: 'clamp(18px, 2vw, 26px)',
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#ffffff',
            }}
          >
            {step.headline}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: '14px',
              lineHeight: 1.65,
              color: '#747474',
            }}
          >
            {step.body}
          </p>
        </div>
      ))}

      <style>{`
        @media (max-width: 767px) {
          .approach-header { grid-template-columns: 1fr !important; }
          .approach-step {
            grid-template-columns: 40px 1fr !important;
          }
          .approach-step > :last-child { grid-column: 2; }
        }
      `}</style>
    </section>
  )
}
