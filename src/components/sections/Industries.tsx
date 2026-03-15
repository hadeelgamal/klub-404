'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Industry {
  name: string
  descriptor: string
  icon: React.ReactNode
}

function HealthIcon() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" aria-hidden="true">
      <rect x="20" y="6" width="8" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6" y="20" width="36" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function BeautyIcon() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
      <line x1="24" y1="4" x2="24" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="36" x2="24" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function TechIcon() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="40" height="26" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="40" x2="34" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="36" x2="24" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="10,28 16,20 22,24 28,16 38,22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const INDUSTRIES: Industry[] = [
  {
    name: 'Health / Medical',
    descriptor: 'Building tools that make healthcare more accessible, legible, and humane.',
    icon: <HealthIcon />,
  },
  {
    name: 'Beauty & Wellness',
    descriptor: 'Creating brands and platforms at the intersection of self-care and science.',
    icon: <BeautyIcon />,
  },
  {
    name: 'Technology',
    descriptor: 'Products and infrastructure that make other things possible.',
    icon: <TechIcon />,
  },
]

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return

        if (prefersReduced) {
          gsap.set(card, { clipPath: 'inset(0 0% 0 0)', opacity: 1 })
          return
        }

        gsap.fromTo(
          card,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
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
      style={{
        padding: 'clamp(80px, 10vw, 160px) 48px',
        backgroundColor: 'var(--color-canvas)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section label */}
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            opacity: 0.5,
            marginBottom: '48px',
          }}
        >
          What we build in
        </span>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            backgroundColor: 'var(--color-border)',
            border: '1px solid var(--color-border)',
          }}
          className="industries-grid"
        >
          {INDUSTRIES.map((industry, i) => (
            <div
              key={industry.name}
              ref={(el) => {
                if (el) cardsRef.current[i] = el
              }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '48px 40px',
                backgroundColor: 'var(--color-canvas)',
                cursor: 'default',
                clipPath: 'inset(0 100% 0 0)',
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Orange fill slides in on hover */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--color-orange)',
                  transformOrigin: 'left center',
                  transform:
                    hoveredIndex === i ? 'scaleX(1)' : 'scaleX(0)',
                  transition:
                    hoveredIndex === i
                      ? 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1)'
                      : 'transform 200ms cubic-bezier(0.55, 0, 1, 0.45)',
                  zIndex: 0,
                }}
              />

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    color:
                      hoveredIndex === i ? '#FFFFFF' : 'var(--color-ink)',
                    transition: 'color 200ms ease',
                    marginBottom: '32px',
                  }}
                >
                  {industry.icon}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                    fontSize: 'clamp(20px, 1.8vw, 24px)',
                    fontWeight: 500,
                    lineHeight: '1.1',
                    letterSpacing: '-0.01em',
                    color:
                      hoveredIndex === i ? '#FFFFFF' : 'var(--color-ink)',
                    marginBottom: '16px',
                    transition: 'color 200ms ease',
                  }}
                >
                  {industry.name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color:
                      hoveredIndex === i
                        ? 'rgba(255,255,255,0.85)'
                        : 'var(--color-ink)',
                    opacity: hoveredIndex === i ? 1 : 0.65,
                    transition: 'color 200ms ease, opacity 200ms ease',
                  }}
                >
                  {industry.descriptor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .industries-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
