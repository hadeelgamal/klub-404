'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PAD = 'clamp(12px, 1.04vw, 15px)'

const STEPS = [
  {
    title: 'Find the real problem.',
    desc: 'We spend our energy on diagnosis. If we cannot articulate exactly why a problem is worth solving—and for whom—we do not move. We build only what matters.',
  },
  {
    title: 'AI-powered workflows.',
    desc: 'AI is not a tool we layer on top; it is part of the architecture from day one. Whether it is intelligent agents, generative features, AI-assisted development, or automated workflows it fundamentally changes the build surface and the economics of your product. We use AI to speed up the building process and sharpen the final result.',
  },
  {
    title: 'Ship. Then stay.',
    desc: 'Shipping is not the end—it is the beginning of the interesting part. We stay inside the problem after launch. We grow with you.',
  },
]

export default function Process() {
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
          style={{
            display: 'grid',
            gridTemplateColumns: '160px 1fr 1fr',
            borderBottom: '1px solid #2D2D2D',
            padding: `clamp(32px, 4vw, 52px) ${PAD}`,
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display), system-ui, sans-serif',
              fontSize: 'clamp(48px, 6vw, 80px)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#ffffff',
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <p
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
        @media (max-width: 767px) {
          .process-step {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  )
}
