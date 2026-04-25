'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PAD = 'clamp(12px, 1.04vw, 15px)'

const label: React.CSSProperties = {
  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#747474',
  display: 'block',
  marginBottom: '10px',
}

const meta: React.CSSProperties = {
  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
  fontSize: '13px',
  fontWeight: 400,
  color: '#747474',
  lineHeight: 1.6,
}

export default function Footer() {
  const sectionRef     = useRef<HTMLElement>(null)
  const wordmarkRef    = useRef<HTMLDivElement>(null)
  const svgRef         = useRef<SVGSVGElement>(null)
  const strikeRef      = useRef<SVGRectElement>(null)
  const infoRef        = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Sequence: strikethrough draws → wordmark collapses to logo
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      })

      tl
        .set(strikeRef.current, { attr: { width: 0 } })
        .to(strikeRef.current, {
          attr: { width: 960 },
          duration: 1.2,
          ease: 'power3.inOut',
        })
        .to(svgRef.current, {
          width: 200,
          duration: 0.85,
          ease: 'power3.inOut',
        }, '>')
        .to(wordmarkRef.current, {
          paddingTop: 24,
          paddingBottom: 24,
          duration: 0.85,
          ease: 'power3.inOut',
        }, '<')

      gsap.from(infoRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 88%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={sectionRef}
      id="footer"
      style={{ backgroundColor: '#000000', borderTop: '1px solid #2D2D2D' }}
    >
      {/* Wordmark */}
      <div
        ref={wordmarkRef}
        style={{
          padding: `clamp(48px, 7vw, 80px) ${PAD} clamp(32px, 4vw, 48px)`,
        }}
      >
        <span className="sr-only">KLUB404</span>
        <svg
          ref={svgRef}
          viewBox="0 0 960 195"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
          aria-hidden="true"
        >
          <text
            x="0" y="175"
            fontFamily="var(--font-display), system-ui, sans-serif"
            fontWeight="800"
            fontSize="195"
            fill="#ffffff"
            textLength="549"
            lengthAdjust="spacingAndGlyphs"
          >
            KLUB
          </text>
          <rect ref={strikeRef} x="0" y="100" width="0" height="14" fill="#ffffff" />
          <text
            x="549" y="175"
            fontFamily="var(--font-display), system-ui, sans-serif"
            fontWeight="800"
            fontSize="195"
            fill="#ffffff"
            textLength="411"
            lengthAdjust="spacingAndGlyphs"
          >
            404
          </text>
        </svg>
      </div>

      {/* Info grid */}
      <div
        ref={infoRef}
        style={{
          borderTop: '1px solid #2D2D2D',
          padding: `clamp(32px, 4vw, 52px) ${PAD}`,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(32px, 5vw, 64px)',
        }}
        className="footer-grid"
      >
        {/* CTA */}
        <div>
          <span style={label}>Contact</span>
          <p
            style={{
              fontFamily: 'var(--font-display), system-ui, sans-serif',
              fontSize: 'clamp(22px, 3vw, 40px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: 'clamp(12px, 1.5vw, 18px)',
            }}
          >
            Build with us
          </p>
          <p style={{ ...meta, marginBottom: '6px' }}>Let&apos;s chat</p>
          <a
            href="mailto:hello@klub404.com"
            style={{ ...meta, color: '#ffffff', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            hello@klub404.com
          </a>
        </div>

        {/* Amsterdam */}
        <div>
          <span style={label}>Amsterdam</span>
          <p style={meta}>Business registration ID</p>
          <p style={{ ...meta, color: '#ffffff', marginTop: '4px' }}>82074348</p>
        </div>

        {/* Cairo */}
        <div>
          <span style={label}>Cairo</span>
          <p style={meta}>Business registration ID</p>
          <p style={{ ...meta, color: '#ffffff', marginTop: '4px' }}>285117</p>
        </div>
      </div>

      {/* Copyright strip */}
      <div
        style={{
          borderTop: '1px solid #2D2D2D',
          padding: `22px ${PAD}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={meta}>KLUB404 © 2025</span>
        <span style={meta}>Cairo &amp; Amsterdam</span>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
