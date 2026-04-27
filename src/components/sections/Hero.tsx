'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* ─── Live clock (Cairo time) ─────────────────────────────────────────────── */
function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true, timeZone: 'Africa/Cairo',
      })
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const body: React.CSSProperties = {
  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '1.35',
  color: '#ffffff',
}

const PAD = 'clamp(12px, 1.04vw, 15px)'

/* ─── Ticker copy ─────────────────────────────────────────────────────────── */
const TICKER = [
  'Build', '·', 'Ship', '·', 'Stay', '·',
  'Early-Stage Startups', '·',
  'AI-Integrated Architecture', '·',
  'Cairo & Amsterdam', '·',
  'Product & Design', '·',
  'Web & App Development', '·',
  'Digital Strategy', '·',
]

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const klubRef     = useRef<SVGGElement>(null)
  const for404Ref   = useRef<SVGGElement>(null)
  const strikeRef   = useRef<SVGRectElement>(null)
  const navRowRef   = useRef<HTMLDivElement>(null)
  const taglineRef  = useRef<HTMLParagraphElement>(null)
  const marqueeRef  = useRef<HTMLDivElement>(null)
  const time        = useClock()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      gsap.set([klubRef.current, for404Ref.current], { yPercent: 0 })
      gsap.set([navRowRef.current, taglineRef.current, marqueeRef.current], { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(klubRef.current,    { yPercent: -110 })
      gsap.set(for404Ref.current,  { yPercent:  110 })
      gsap.set(taglineRef.current, { yPercent:  200 })
      gsap.set(strikeRef.current,  { attr: { width: 0 } })

      // Single sweep: KLUB top→bottom, 404 bottom→top — repeat: -1 resets off-screen invisibly
      const loopTl = gsap.timeline({ repeat: -1 })
      loopTl
        .fromTo(klubRef.current,   { yPercent: -110 }, { yPercent:  110, duration: 0.375, ease: 'none' }, 0)
        .fromTo(for404Ref.current, { yPercent:  110 }, { yPercent: -110, duration: 0.375, ease: 'none' }, 0)

      // After 3 s: stop loop, settle, then reveal nav / tagline / ticker
      gsap.delayedCall(1, () => {
        loopTl.kill()
        const tl = gsap.timeline()
        tl
          .to(klubRef.current,   { yPercent: 0, duration: 0.9, ease: 'power3.out' }, 0)
          .to(for404Ref.current, { yPercent: 0, duration: 0.9, ease: 'power3.out' }, 0)
          .to(strikeRef.current, { attr: { width: 960 }, duration: 0.9, ease: 'power3.in' }, 0)
          .fromTo(taglineRef.current,
            { yPercent: 200 },
            { yPercent: 0, duration: 1.5, ease: 'cubic-bezier(0, 1, 0.2, 1)' },
            0
          )
          .to(navRowRef.current, { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 0)
          .to(marqueeRef.current, { opacity: 1, duration: 0.6, ease: 'none' }, '-=0.9')
      })

      // ── Scroll: fade lower elements as hero scrolls away
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50vh top',
          scrub: 1.2,
        },
      })

      scrollTl.to(
        [navRowRef.current, taglineRef.current, marqueeRef.current],
        { opacity: 0, ease: 'none' },
        0
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000000',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Screen-reader label for the wordmark */}
      <span className="sr-only">KLUB404</span>

      {/* ── Wordmark: KLUB404 ─────────────────────────────────────────────── */}
      <div
        style={{
          overflow: 'hidden',
          flexShrink: 0,
          paddingTop: 'clamp(12px, 1.5vw, 20px)',
          paddingLeft: PAD,
          paddingRight: PAD,
          boxSizing: 'border-box',
        }}
      >
        <svg
          viewBox="0 0 960 195"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
          aria-hidden="true"
        >
          <g ref={klubRef} style={{ willChange: 'transform' }}>
            <text
              x="0"
              y="175"
              fontFamily="var(--font-display), var(--font-neue-montreal), system-ui, sans-serif"
              fontWeight="800"
              fontSize="195"
              fill="#ffffff"
              textLength="549"
              lengthAdjust="spacingAndGlyphs"
            >
              KLUB
            </text>
          </g>
          <rect ref={strikeRef} x="0" y="100" width="0" height="14" fill="#ffffff" />
          <g ref={for404Ref} style={{ willChange: 'transform' }}>
            <text
              x="549"
              y="175"
              fontFamily="var(--font-display), var(--font-neue-montreal), system-ui, sans-serif"
              fontWeight="800"
              fontSize="195"
              fill="#ffffff"
              textLength="411"
              lengthAdjust="spacingAndGlyphs"
            >
              404
            </text>
          </g>
        </svg>
      </div>

      {/* ── Nav row ─────────────────────────────────────────────────────────── */}
      <div
        ref={navRowRef}
        className="hero-nav-row"
        style={{
          opacity: 0,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          borderTop: '1px solid #2D2D2D',
          borderBottom: '1px solid #2D2D2D',
          padding: `13px ${PAD}`,
          flexShrink: 0,
        }}
      >
        <span style={{ ...body, color: '#747474', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          KLUB404 · Cairo &amp; Amsterdam
        </span>
        <a
          href="#contact"
          style={{ ...body, fontSize: '13px', textDecoration: 'none', justifySelf: 'center' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Contact ↓
        </a>
        <span
          style={{
            ...body, fontSize: '13px', color: '#747474',
            textAlign: 'right', fontVariantNumeric: 'tabular-nums',
          }}
          className="hero-clock"
        >
          Local time → {time}
        </span>
      </div>

      {/* ── Spacer ────────────────────────────────────────────────────────── */}
      <div className="hero-spacer" style={{ flex: 1 }} />

      {/* ── Tagline ───────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: 'clamp(10px, 1.04vw, 15px)',
          padding: `0 ${PAD} clamp(32px, 4vw, 56px)`,
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
        className="hero-tagline-grid"
      >
        <div />
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: 'clamp(18px, 2.2vw, 32px)',
            fontWeight: 400,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            color: '#ffffff',
          }}
        >
          Bringing together strategy, creativity and technology to build high-end digital products for early-stage startups.
        </p>
      </div>

      {/* ── Ticker ────────────────────────────────────────────────────────── */}
      <div
        ref={marqueeRef}
        aria-hidden="true"
        style={{
          opacity: 0,
          borderTop: '1px solid #2D2D2D',
          padding: '12px 0',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div className="marquee-track">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: item === '·' ? '#2D2D2D' : '#747474',
                whiteSpace: 'nowrap',
                padding: '0 18px',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-tagline-grid { grid-template-columns: 1fr !important; }
          .hero-tagline-grid > div:first-child { display: none !important; }
          #hero { min-height: auto !important; }
          .hero-spacer { flex: none !important; height: clamp(32px, 5vh, 56px); }
        }
        @media (max-width: 600px) {
          .hero-nav-row  { grid-template-columns: 1fr auto !important; }
          .hero-clock    { display: none !important; }
        }
      `}</style>
    </section>
  )
}
