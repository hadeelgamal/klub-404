'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PAD = 'clamp(12px, 1.04vw, 15px)'

const SERVICES = [
  'Digital strategy',
  'Product design & UX',
  'App development',
  'Web engineering',
  'Brand identity',
]

const CLIENTS_A = ['Careem', 'Noon', 'Swvl', 'Breadfast', 'Trella']
const CLIENTS_B = ['Vezeeta', 'MaxAB', 'Halan', 'Rabbit', 'Instabug']

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
}

const itemStyle: React.CSSProperties = {
  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
  fontSize: 'clamp(16px, 1.8vw, 22px)',
  fontWeight: 400,
  lineHeight: 1.3,
  color: '#ffffff',
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Stagger each column
      const cols = gridRef.current?.children
      if (cols) {
        gsap.from(Array.from(cols), {
          y: 36,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      gsap.from(ctaRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.35,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(footerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power1.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        backgroundColor: '#000000',
        borderTop: '1px solid #2D2D2D',
        padding: `clamp(80px, 12vw, 160px) ${PAD} 0`,
      }}
    >
      {/* Three-column grid */}
      <div
        ref={gridRef}
        className="services-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(32px, 5vw, 64px)',
          marginBottom: 'clamp(80px, 12vw, 160px)',
        }}
      >
        <ul style={listStyle}>
          {SERVICES.map(s => (
            <li key={s} style={itemStyle}>{s}</li>
          ))}
        </ul>

        <ul style={listStyle}>
          {CLIENTS_A.map(c => (
            <li key={c} style={itemStyle}>{c}</li>
          ))}
        </ul>

        <ul style={listStyle}>
          {CLIENTS_B.map(c => (
            <li key={c} style={itemStyle}>{c}</li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(80px, 12vw, 160px)' }}>
        <a
          ref={ctaRef}
          href="mailto:hello@klub404.com"
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: 'clamp(20px, 2.4vw, 30px)',
            fontWeight: 400,
            color: '#ffffff',
            textDecoration: 'none',
            display: 'inline-block',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.45')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          data-cursor-state="hover-link"
        >
          Contact ↓
        </a>
      </div>

      {/* Footer strip */}
      <div
        ref={footerRef}
        style={{
          borderTop: '1px solid #2D2D2D',
          padding: `22px 0`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '12px',
            color: '#747474',
          }}
        >
          KLUB404 © 2025
        </span>
        <span
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '12px',
            color: '#747474',
          }}
        >
          Cairo &amp; Amsterdam
        </span>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
