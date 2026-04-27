'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PAD = 'clamp(12px, 1.04vw, 15px)'

const INDUSTRIES = [
  {
    id: '01',
    name: 'Health & Medical',
    desc: 'Building tools that make healthcare more accessible, legible, and humane.',
    bg: 'linear-gradient(145deg, #010c18 0%, #001a2e 100%)',
    accent: '#0ea5e9',
  },
  {
    id: '02',
    name: 'Beauty & Wellness',
    desc: 'Specialized booking management systems and digital marketplaces.',
    bg: 'linear-gradient(145deg, #180010 0%, #2d001f 100%)',
    accent: '#ec4899',
  },
  {
    id: '03',
    name: 'Core Tech',
    desc: 'Products and infrastructure that support business across the board.',
    bg: 'linear-gradient(145deg, #0d0d1a 0%, #1a1035 100%)',
    accent: '#7c3aed',
  },
]

function PulseRings({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden
    >
      <line x1="60" y1="150" x2="340" y2="150" stroke={accent} strokeWidth="0.5" opacity="0.2" />
      <circle className="pulse-ring pulse-ring-1" cx="200" cy="150" r="50" fill="none" stroke={accent} strokeWidth="1" />
      <circle className="pulse-ring pulse-ring-2" cx="200" cy="150" r="50" fill="none" stroke={accent} strokeWidth="1" />
      <circle className="pulse-ring pulse-ring-3" cx="200" cy="150" r="50" fill="none" stroke={accent} strokeWidth="1" />
      <circle cx="200" cy="150" r="4" fill={accent} opacity="0.5" />
    </svg>
  )
}

function DriftingLens({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden
    >
      <circle className="lens-a" cx="170" cy="150" r="85" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
      <circle className="lens-b" cx="230" cy="150" r="85" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
      {/* intersection highlight via a slightly brighter overlapping arc feel */}
      <circle className="lens-a" cx="170" cy="150" r="85" fill={accent} fillOpacity="0.03" stroke="none" />
      <circle className="lens-b" cx="230" cy="150" r="85" fill={accent} fillOpacity="0.03" stroke="none" />
    </svg>
  )
}

function RotatingGrid({ accent }: { accent: string }) {
  const cols = [100, 160, 200, 240, 300]
  const rows = [75, 115, 150, 185, 225]
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden
    >
      <g className="grid-rotate">
        {cols.map(x => (
          <line key={`v${x}`} x1={x} y1="40" x2={x} y2="260" stroke={accent} strokeWidth="0.6" opacity="0.25" />
        ))}
        {rows.map(y => (
          <line key={`h${y}`} x1="60" y1={y} x2="340" y2={y} stroke={accent} strokeWidth="0.6" opacity="0.25" />
        ))}
        {cols.map(x => rows.map(y => (
          <circle key={`d${x}${y}`} cx={x} cy={y} r="1.5" fill={accent} opacity="0.4" />
        )))}
      </g>
    </svg>
  )
}

const VISUALS = [PulseRings, DriftingLens, RotatingGrid]

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowRefs  = useRef<(HTMLDivElement | null)[]>([])
  const infoRefs = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return

        gsap.from(infoRefs.current[i], {
          y: 36,
          opacity: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.fromTo(
          imgRefs.current[i],
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 74%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="industries"
      style={{ backgroundColor: '#000000', borderTop: '1px solid #2D2D2D' }}
    >
      {INDUSTRIES.map((industry, i) => {
        const Visual = VISUALS[i]
        return (
          <div
            key={industry.id}
            ref={el => { rowRefs.current[i] = el }}
            className="industry-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'clamp(200px, 28vw, 340px) 1fr',
              borderBottom: '1px solid #2D2D2D',
              minHeight: 'clamp(280px, 42vw, 560px)',
            }}
          >
            {/* Left — info */}
            <div
              ref={el => { infoRefs.current[i] = el }}
              style={{
                padding: `clamp(32px, 4vw, 56px) ${PAD}`,
                borderRight: '1px solid #2D2D2D',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '12px',
                  color: '#747474',
                  letterSpacing: '0.08em',
                }}
              >
                {industry.id}
              </span>

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display), system-ui, sans-serif',
                    fontSize: 'clamp(32px, 4vw, 56px)',
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: '-0.025em',
                    color: '#ffffff',
                    marginBottom: '12px',
                  }}
                >
                  {industry.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                    fontSize: 'clamp(13px, 1.1vw, 15px)',
                    lineHeight: 1.6,
                    color: '#747474',
                    maxWidth: '28ch',
                  }}
                >
                  {industry.desc}
                </p>
              </div>

              <div style={{ height: '13px' }} />
            </div>

            {/* Right — animated visual */}
            <div
              ref={el => { imgRefs.current[i] = el }}
              className="industry-visual"
              style={{ background: industry.bg, position: 'relative', overflow: 'hidden' }}
            >
              <Visual accent={industry.accent} />
            </div>
          </div>
        )
      })}

      <style>{`
        /* Pulse rings — Health & Medical */
        .pulse-ring {
          transform-origin: 200px 150px;
          animation: pulse-ring 3s ease-out infinite;
          opacity: 0;
        }
        .pulse-ring-1 { animation-delay: 0s; }
        .pulse-ring-2 { animation-delay: -1s; }
        .pulse-ring-3 { animation-delay: -2s; }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(3.2); opacity: 0; }
        }

        /* Drifting lens — Beauty & Wellness */
        .lens-a { animation: drift-a 6s ease-in-out infinite; }
        .lens-b { animation: drift-b 6s ease-in-out infinite; }
        @keyframes drift-a {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(-18px); }
        }
        @keyframes drift-b {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(18px); }
        }

        /* Rotating grid — Core Tech */
        .grid-rotate {
          transform-origin: 200px 150px;
          animation: rotate-grid 24s linear infinite;
        }
        @keyframes rotate-grid {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          .industry-row {
            grid-template-columns: clamp(160px, 22vw, 260px) 1fr !important;
            min-height: clamp(200px, 32vw, 420px) !important;
          }
        }
        @media (max-width: 600px) {
          .industry-row {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .industry-visual { min-height: 180px; }
        }
        @media (pointer: coarse) {
          .pulse-ring, .lens-a, .lens-b, .grid-rotate {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  )
}
