'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import { useDir } from '@/hooks/useDir'

interface Stat {
  value: string
  label: string
  sub: string
}

export default function Stats() {
  const t     = useTranslations('stats')
  const STATS = t.raw('items') as Stat[]
  const dir   = useDir()
  const sectionRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set([ruleRef.current, ...itemsRef.current], { opacity: 1, scaleX: 1 })
        return
      }

      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          ease: "power3.out",
          transformOrigin: `${dir === 'rtl' ? 'right' : 'left'} center`,
          scrollTrigger: {
            trigger: ruleRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      )

      itemsRef.current.forEach((item, i) => {
        if (!item) return
        gsap.fromTo(
          item,
          { opacity: 0, y: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            delay: i * 0.08,
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
  }, [dir])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(60px, 8vw, 120px) 48px',
        backgroundColor: 'var(--color-canvas)',
        borderTop: 'none',
      }}
    >
      <div
        ref={ruleRef}
        style={{
          height: '1px',
          backgroundColor: 'var(--color-border)',
          transformOrigin: `${dir === 'rtl' ? 'right' : 'left'} center`,
          transform: 'scaleX(0)',
          maxWidth: '1200px',
          margin: '0 auto clamp(48px, 6vw, 80px)',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          backgroundColor: 'var(--color-border)',
          border: '1px solid var(--color-border)',
        }}
        className="stats-grid"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            ref={(el) => {
              if (el) itemsRef.current[i] = el
            }}
            style={{
              opacity: 0,
              padding: '40px 32px',
              backgroundColor: 'var(--color-canvas)',
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: 500,
                lineHeight: '1',
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
                marginBottom: '12px',
              }}
            >
              {stat.value}
            </span>

            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-orange)',
                marginBottom: '8px',
              }}
            >
              {stat.label}
            </span>

            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '1.5',
                color: 'var(--color-ink)',
                opacity: 0.6,
              }}
            >
              {stat.sub}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
