'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Hub {
  city: string
  tagline: string
  description: string
  bgColor: string
  rotation: string
  enterFrom: { x: number; y: number }
  enterDelay: number
}

const HUBS: Hub[] = [
  {
    city: 'Cairo',
    tagline: 'Where the ideas start.',
    description:
      'A city of 22 million people and a startup ecosystem that punches above its weight. Cairo is where we test ideas against real constraints and real markets.',
    bgColor: '#C4522A20',
    rotation: 'rotate(1.5deg)',
    enterFrom: { x: 40, y: 24 },
    enterDelay: 0,
  },
  {
    city: 'Amsterdam',
    tagline: 'Where the ideas scale.',
    description:
      'A gateway to Europe and a city that has been trading globally for 400 years. Amsterdam is where we connect ideas to capital, partners, and the wider EMEA market.',
    bgColor: '#1A2B4A20',
    rotation: 'rotate(-1.5deg)',
    enterFrom: { x: -40, y: -24 },
    enterDelay: 150,
  },
]

export default function Hubs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cairoCardRef = useRef<HTMLDivElement>(null)
  const amsterdamCardRef = useRef<HTMLDivElement>(null)
  const cairoImageRef = useRef<HTMLDivElement>(null)
  const amsterdamImageRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [threadHovered, setThreadHovered] = useState(false)
  const [threadVisible, setThreadVisible] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const cards = [
        { ref: cairoCardRef.current, hub: HUBS[0] },
        { ref: amsterdamCardRef.current, hub: HUBS[1] },
      ]

      cards.forEach(({ ref, hub }) => {
        if (!ref) return

        if (prefersReduced) {
          gsap.set(ref, { opacity: 1, x: 0, y: 0 })
          return
        }

        gsap.fromTo(
          ref,
          { opacity: 0, x: hub.enterFrom.x, y: hub.enterFrom.y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            delay: hub.enterDelay / 1000,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
              onEnter: () => {
                // Fire catenary thread animation 1s after cards enter
                if (hub.enterDelay === 0) {
                  setTimeout(() => setThreadVisible(true), 1000)
                }
              },
            },
          }
        )
      })

      // Parallax on card images at 0.6x scroll rate
      const imageEls = [cairoImageRef.current, amsterdamImageRef.current]
      imageEls.forEach((img) => {
        if (!img || prefersReduced) return
        gsap.to(img, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Animate catenary thread via stroke-dashoffset.
  // Wrapped in gsap.context so the tween is killed on unmount,
  // preventing orphaned tweens if the component is removed mid-animation.
  useEffect(() => {
    if (!threadVisible || !pathRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const path = pathRef.current
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    if (prefersReduced) {
      path.style.strokeDashoffset = '0'
      return
    }

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
    })

    return () => ctx.revert()
  }, [threadVisible])

  return (
    <section
      ref={sectionRef}
      id="hubs"
      style={{
        padding: 'clamp(80px, 10vw, 160px) 48px',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      {/* Section label */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          Where we work
        </span>

        {/* Cards container with SVG thread overlay */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '32px',
              alignItems: 'start',
            }}
            className="hubs-grid"
          >
            {/* Cairo */}
            <div
              ref={cairoCardRef}
              style={{
                opacity: 0,
                transform: HUBS[0].rotation,
                cursor: 'none',
              }}
              data-cursor-state="hover-card"
              onMouseEnter={() => setThreadHovered(true)}
              onMouseLeave={() => setThreadHovered(false)}
            >
              {/* Image placeholder — explicit aspect-ratio prevents CLS */}
              <div
                style={{
                  aspectRatio: '4 / 3',
                  width: '100%',
                  backgroundColor: HUBS[0].bgColor,
                  overflow: 'hidden',
                  marginBottom: '28px',
                  position: 'relative',
                }}
              >
                <div
                  ref={cairoImageRef}
                  style={{
                    position: 'absolute',
                    inset: '-20%',
                    backgroundColor: '#C4522A',
                    opacity: 0.12,
                    transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="hub-image-inner"
                />
                {/* Hover zoom handled via CSS class */}
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  fontWeight: 500,
                  lineHeight: '1.0',
                  letterSpacing: '-0.01em',
                  color: 'var(--color-ink)',
                  marginBottom: '12px',
                }}
              >
                {HUBS[0].city}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-orange)',
                  marginBottom: '16px',
                }}
              >
                {HUBS[0].tagline}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '16px',
                  lineHeight: '1.65',
                  color: 'var(--color-ink)',
                  opacity: 0.7,
                  maxWidth: '44ch',
                }}
              >
                {HUBS[0].description}
              </p>
            </div>

            {/* Amsterdam */}
            <div
              ref={amsterdamCardRef}
              style={{
                opacity: 0,
                transform: HUBS[1].rotation,
                cursor: 'none',
                marginTop: '48px',
              }}
              data-cursor-state="hover-card"
              onMouseEnter={() => setThreadHovered(true)}
              onMouseLeave={() => setThreadHovered(false)}
            >
              {/* Image placeholder — explicit aspect-ratio prevents CLS */}
              <div
                style={{
                  aspectRatio: '4 / 3',
                  width: '100%',
                  backgroundColor: HUBS[1].bgColor,
                  overflow: 'hidden',
                  marginBottom: '28px',
                  position: 'relative',
                }}
              >
                <div
                  ref={amsterdamImageRef}
                  style={{
                    position: 'absolute',
                    inset: '-20%',
                    backgroundColor: '#1A2B4A',
                    opacity: 0.12,
                  }}
                />
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  fontWeight: 500,
                  lineHeight: '1.0',
                  letterSpacing: '-0.01em',
                  color: 'var(--color-ink)',
                  marginBottom: '12px',
                }}
              >
                {HUBS[1].city}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-orange)',
                  marginBottom: '16px',
                }}
              >
                {HUBS[1].tagline}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '16px',
                  lineHeight: '1.65',
                  color: 'var(--color-ink)',
                  opacity: 0.7,
                  maxWidth: '44ch',
                }}
              >
                {HUBS[1].description}
              </p>
            </div>
          </div>

          {/* Catenary SVG thread between cards */}
          <svg
            ref={svgRef}
            aria-hidden="true"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: '160px',
              left: 0,
              right: 0,
              width: '100%',
              height: '120px',
              pointerEvents: 'none',
              overflow: 'visible',
            }}
          >
            <path
              ref={pathRef}
              d="M 0 0 C 300 0, 500 90, 600 90 C 700 90, 900 0, 1200 0"
              fill="none"
              stroke={threadHovered ? '#FF4D00' : '#0D0D0D'}
              strokeWidth="1"
              style={{
                transition: 'stroke 300ms ease',
                opacity: threadVisible ? 0.3 : 0,
              }}
            />
          </svg>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hubs-grid {
            grid-template-columns: 1fr !important;
          }
        }

        [data-cursor-state="hover-card"]:hover .hub-image-inner {
          transform: scale(1.05);
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  )
}
