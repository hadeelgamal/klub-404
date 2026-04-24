'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PAD = 'clamp(12px, 1.04vw, 15px)'

const PROJECTS = [
  {
    id: '01',
    name: 'Spora',
    type: 'Digital Identity',
    bg: 'linear-gradient(145deg, #0d0d1a 0%, #1a1035 100%)',
    accent: '#7c3aed',
  },
  {
    id: '02',
    name: 'Helio',
    type: 'Web Platform',
    bg: 'linear-gradient(145deg, #180d00 0%, #2d1600 100%)',
    accent: '#f59e0b',
  },
  {
    id: '03',
    name: 'Vault',
    type: 'Mobile Application',
    bg: 'linear-gradient(145deg, #010712 0%, #071428 100%)',
    accent: '#3b82f6',
  },
  {
    id: '04',
    name: 'Meridian',
    type: 'Brand & Product',
    bg: 'linear-gradient(145deg, #150000 0%, #280505 100%)',
    accent: '#ef4444',
  },
  {
    id: '05',
    name: 'Stratum',
    type: 'Web Experience',
    bg: 'linear-gradient(145deg, #001408 0%, #002010 100%)',
    accent: '#22c55e',
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const infoRefs = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs = useRef<(HTMLDivElement | null)[]>([])

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
      id="work"
      style={{ backgroundColor: '#000000', borderTop: '1px solid #2D2D2D' }}
    >
      {PROJECTS.map((project, i) => (
        <div
          key={project.id}
          ref={el => { rowRefs.current[i] = el }}
          className="work-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(200px, 28vw, 340px) 1fr',
            borderBottom: '1px solid #2D2D2D',
            minHeight: 'clamp(280px, 42vw, 560px)',
          }}
        >
          {/* Left — project metadata */}
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
              {project.id}
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
                  marginBottom: '10px',
                }}
              >
                {project.name}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '13px',
                  color: '#747474',
                  letterSpacing: '0',
                }}
              >
                {project.type}
              </p>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: '13px',
                color: '#ffffff',
              }}
            >
              {project.id} →
            </span>
          </div>

          {/* Right — project visual */}
          <div
            ref={el => { imgRefs.current[i] = el }}
            style={{ background: project.bg, position: 'relative', overflow: 'hidden' }}
          >
            {/* Inner mock-up frame */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '55%',
                  maxWidth: '340px',
                  aspectRatio: '16/10',
                  border: `1px solid ${project.accent}30`,
                  borderRadius: '6px',
                  backgroundColor: `${project.accent}10`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display), system-ui, sans-serif',
                    fontSize: 'clamp(20px, 2.8vw, 36px)',
                    fontWeight: 800,
                    color: project.accent,
                    letterSpacing: '-0.025em',
                    opacity: 0.9,
                  }}
                >
                  {project.name}
                </span>
                <div
                  style={{
                    width: '40%',
                    height: '1px',
                    backgroundColor: `${project.accent}40`,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                    fontSize: '11px',
                    color: `${project.accent}80`,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @media (max-width: 600px) {
          .work-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
