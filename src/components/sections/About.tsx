'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CyberneticGridShader from '@/components/ui/cybernetic-grid-shader'

const PAD = 'clamp(12px, 1.04vw, 15px)'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Parallax: content rises from below as section scrolls into view
      gsap.fromTo(
        contentRef.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1.5,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000000',
        borderTop: '1px solid #2D2D2D',
        padding: `clamp(120px, 18vw, 240px) ${PAD}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <CyberneticGridShader />
      <div ref={contentRef} style={{ position: 'relative' }}>
        <p
          style={{
            fontFamily: 'var(--font-display), system-ui, sans-serif',
            fontSize: 'clamp(36px, 6vw, 96px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Build. Ship. Stay.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: 'clamp(16px, 1.8vw, 26px)',
            fontWeight: 400,
            color: '#ffffff',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
            marginTop: 'clamp(12px, 1.5vw, 20px)',
            opacity: 0.7,
          }}
        >
          High-end digital products for early-stage startups.
        </p>
      </div>
    </section>
  )
}
