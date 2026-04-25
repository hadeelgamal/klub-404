'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DottedSurface } from '@/components/ui/dotted-surface'

const PAD = 'clamp(12px, 1.04vw, 15px)'

const INDUSTRIES = [
  {
    name: 'Health & Medical',
    desc: 'Building tools that make healthcare more accessible, legible, and humane.',
    accent: '#0ea5e9',
  },
  {
    name: 'Beauty & Wellness',
    desc: 'Specialized booking management systems and digital marketplaces.',
    accent: '#ec4899',
  },
  {
    name: 'Core Tech',
    desc: 'Products and infrastructure that support business across the board.',
    accent: '#7c3aed',
  },
]

export default function FocusIndustriesIntro() {
  const headingRef = useRef<HTMLDivElement>(null)
  const colRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      colRefs.current.forEach((col, i) => {
        if (!col) return
        gsap.from(col, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: col,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000000',
        borderTop: '1px solid #2D2D2D',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `clamp(80px, 12vw, 140px) ${PAD}`,
        gap: 'clamp(48px, 7vw, 80px)',
      }}
    >
      <DottedSurface />

      {/* Vignette */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, #000000 85%)',
          pointerEvents: 'none',
        }}
      />

      {/* Heading */}
      <div ref={headingRef} style={{ position: 'relative', textAlign: 'center' }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#747474',
            marginBottom: 'clamp(16px, 2vw, 24px)',
          }}
        >
          Focus Industries
        </span>
        <p
          style={{
            fontFamily: 'var(--font-display), system-ui, sans-serif',
            fontSize: 'clamp(36px, 6vw, 88px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Who We Build For
        </p>
      </div>

      {/* Three columns */}
      <div
        className="focus-cols"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(16px, 2.5vw, 32px)',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        {INDUSTRIES.map((industry, i) => (
          <div
            key={industry.name}
            ref={el => { colRefs.current[i] = el }}
            style={{
              borderLeft: `2px solid ${industry.accent}60`,
              paddingLeft: 'clamp(16px, 2vw, 24px)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
                marginBottom: '10px',
              }}
            >
              {industry.name}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: 'clamp(12px, 1.05vw, 14px)',
                fontWeight: 400,
                color: '#747474',
                lineHeight: 1.65,
                letterSpacing: '-0.005em',
              }}
            >
              {industry.desc}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .focus-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
