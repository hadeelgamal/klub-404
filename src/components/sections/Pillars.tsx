'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Pillar {
  number: string
  headline: string
  body: string
  rotation: string
}

const PILLARS: Pillar[] = [
  {
    number: '01',
    headline: 'A hybrid. Not a compromise.',
    body: 'We operate at the intersection of agency and incubator. When clients need delivery, we deliver. When the problem demands equity, we build for ownership. The model follows the problem.',
    rotation: 'rotate(1.5deg)',
  },
  {
    number: '02',
    headline: 'Cairo and Amsterdam. The region between.',
    body: 'Two offices that together cover more of the real EMEA than a single London studio ever could. One foot in emerging markets, one in mature ones. We know both.',
    rotation: 'rotate(-1.5deg)',
  },
  {
    number: '03',
    headline: 'Experiences that solve something.',
    body: 'We do not make things pretty for the sake of pretty. Every interaction we design is in service of a real outcome — for the user and for the business. Craft in service of purpose.',
    rotation: 'rotate(1.5deg)',
  },
]

export default function Pillars() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return

        if (prefersReduced) {
          gsap.set(card, { opacity: 1, y: 0 })
          return
        }

        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
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
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="pillars-grid"
        >
          {PILLARS.map((pillar, i) => (
            <article
              key={pillar.number}
              ref={(el) => {
                if (el) cardsRef.current[i] = el
              }}
              style={{
                opacity: 0,
                padding: '40px 32px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                transform: pillar.rotation,
                /*
                 * box-shadow triggers Paint on every frame — replaced with a
                 * pseudo-element shadow technique via CSS class, or we simply
                 * transition only transform here. The visual lift (translateY)
                 * is compositor-safe; the shadow is a CSS-only static value
                 * switched via a class toggle so Paint happens only once on
                 * state change, not every animation frame.
                 */
                transition: 'transform 250ms cubic-bezier(0.34,1.56,0.64,1)',
                cursor: 'default',
              }}
              className="pillar-card"
              onMouseEnter={(e) => {
                const card = e.currentTarget
                // Preserve rotation, add compositor-safe translateY lift
                card.style.transform = `${pillar.rotation} translateY(-6px)`
                // Add shadow via class — Paint fires once on class add, not per frame
                card.classList.add('pillar-card--hovered')
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget
                card.style.transform = pillar.rotation
                card.classList.remove('pillar-card--hovered')
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  color: 'var(--color-orange)',
                  marginBottom: '24px',
                }}
              >
                {pillar.number}
              </span>

              <h2
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: 'clamp(20px, 1.8vw, 24px)',
                  fontWeight: 500,
                  lineHeight: '1.2',
                  letterSpacing: '-0.01em',
                  color: 'var(--color-ink)',
                  marginBottom: '20px',
                }}
              >
                {pillar.headline}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.65',
                  color: 'var(--color-ink)',
                  opacity: 0.7,
                }}
              >
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .pillars-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        /*
         * Shadow applied as a static class toggle — Paint fires once when the
         * class is added/removed, not on every animation frame. This avoids
         * box-shadow being part of the transform transition chain.
         */
        .pillar-card--hovered {
          box-shadow: 0 20px 60px rgba(13, 13, 13, 0.10);
        }
      `}</style>
    </section>
  )
}
