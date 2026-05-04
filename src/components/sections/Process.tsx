'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import { useDir } from '@/hooks/useDir'

const PAD = 'clamp(12px, 1.04vw, 15px)'

export default function Process() {
  const t     = useTranslations('process')
  const dir   = useDir()
  const STEPS = t.raw('steps') as { title: string; desc: string }[]
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      stepRefs.current.forEach((row) => {
        if (!row) return
        gsap.from(row, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const handleMouseEnter = useCallback((i: number) => {
    const row = stepRefs.current[i]
    if (!row) return
    const m = dir === 'rtl' ? -1 : 1
    gsap.to(row.querySelector('.ps-line'), { scaleY: 1, duration: 0.5, ease: 'power3.out' })
    gsap.to(row.querySelector('.ps-num'),  { x: 14 * m, duration: 0.55, ease: 'power2.out' })
    gsap.to(row.querySelector('.ps-title'),{ x: 10 * m, duration: 0.55, ease: 'power2.out', delay: 0.04 })
    gsap.to(row.querySelector('.ps-desc'), { x:  6 * m, duration: 0.55, ease: 'power2.out', delay: 0.08 })
  }, [dir])

  const handleMouseLeave = useCallback((i: number) => {
    const row = stepRefs.current[i]
    if (!row) return
    gsap.to(row.querySelector('.ps-line'), { scaleY: 0, duration: 0.4, ease: 'power2.inOut' })
    gsap.to([
      row.querySelector('.ps-num'),
      row.querySelector('.ps-title'),
      row.querySelector('.ps-desc'),
    ], { x: 0, duration: 0.45, ease: 'power2.inOut' })
  }, [])

  return (
    <section
      id="process"
      style={{ backgroundColor: '#000000', borderTop: '1px solid #2D2D2D' }}
    >
      {STEPS.map((step, i) => (
        <div
          key={i}
          ref={el => { stepRefs.current[i] = el }}
          className="process-step"
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={() => handleMouseLeave(i)}
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '160px 1fr 1fr',
            borderBottom: '1px solid #2D2D2D',
            padding: `clamp(32px, 4vw, 52px) ${PAD}`,
            gap: '20px',
            alignItems: 'center',
          }}
        >
          {/* Accent line */}
          <div
            className="ps-line"
            style={{
              position: 'absolute',
              insetInlineStart: 0,
              top: '15%',
              height: '70%',
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)',
              transformOrigin: 'top center',
              transform: 'scaleY(0)',
              pointerEvents: 'none',
            }}
          />

          <span
            className="ps-num"
            style={{
              fontFamily: 'var(--font-display), system-ui, sans-serif',
              fontSize: 'clamp(48px, 6vw, 80px)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              display: 'block',
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <p
            className="ps-title"
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            {step.title}
          </p>
          <p
            className="ps-desc"
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              fontWeight: 400,
              lineHeight: 1.65,
              letterSpacing: '-0.005em',
              color: '#747474',
              margin: 0,
            }}
          >
            {step.desc}
          </p>
        </div>
      ))}

      <style>{`
        .process-step {
          transition: background 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }
        .process-step:hover {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.04);
        }
        @media (max-width: 900px) {
          .process-step {
            grid-template-columns: auto 1fr !important;
            align-items: start !important;
            gap: 4px 24px !important;
          }
          .process-step .ps-num {
            grid-row: span 2;
            align-self: center;
          }
        }
        @media (max-width: 767px) {
          .process-step {
            grid-template-columns: 1fr !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .process-step .ps-num {
            grid-row: auto;
          }
        }
      `}</style>
    </section>
  )
}
