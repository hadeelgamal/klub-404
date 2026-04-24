'use client'

const PAD = 'clamp(12px, 1.04vw, 15px)'

export default function CTABand() {
  return (
    <section
      id="cta"
      style={{ backgroundColor: '#000000', borderTop: '1px solid #2D2D2D' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid #2D2D2D',
          padding: `clamp(60px, 8vw, 120px) ${PAD}`,
          gap: '20px',
          alignItems: 'end',
        }}
        className="cta-grid"
      >
        {/* Left — headline */}
        <h2
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: 'clamp(28px, 4vw, 64px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#ffffff',
          }}
        >
          Build with us
        </h2>

        {/* Right — CTA link */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: 'clamp(28px, 4vw, 64px)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#747474',
              textDecoration: 'none',
              transition: 'color 300ms ease',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#747474')}
          >
            Let&apos;s chat ↓
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
          }
          .cta-grid > div {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </section>
  )
}
