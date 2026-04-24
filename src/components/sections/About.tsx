'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PAD = 'clamp(12px, 1.04vw, 15px)'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        y: 40, opacity: 0,
        duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(rightRef.current, {
        y: 40, opacity: 0,
        duration: 1, ease: 'power2.out', delay: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        backgroundColor: '#000000',
        borderTop: '1px solid #2D2D2D',
        padding: `clamp(80px, 12vw, 160px) ${PAD}`,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(24px, 4vw, 60px)',
        alignItems: 'center',
      }}
    >
      <div ref={leftRef}>
        <span
          style={{
            fontFamily: 'var(--font-display), system-ui, sans-serif',
            fontSize: 'clamp(100px, 16vw, 220px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            display: 'block',
          }}
        >
          K4
        </span>
      </div>

      <div ref={rightRef}>
        <p
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: 'clamp(18px, 2vw, 26px)',
            fontWeight: 400,
            lineHeight: 1.4,
            color: '#ffffff',
            letterSpacing: '-0.01em',
          }}
        >
          Digital partner for brands, startups and early-stage ventures. Building products, companies and experiences that combine strategy, design and technology. Operating from Cairo and Amsterdam.
        </p>
      </div>

      <style>{`
        @media (max-width: 600px) {
          #about { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
