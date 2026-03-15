'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Step {
  number: string
  headline: string
  body: string
}

const STEPS: Step[] = [
  {
    number: '01',
    headline: 'Find the real problem.',
    body: 'The stated problem is rarely the actual problem. We spend more time in diagnosis than most studios spend on the entire project. If we cannot articulate exactly why this problem is worth solving, and for whom, we do not move.',
  },
  {
    number: '02',
    headline: 'Build the smallest true thing.',
    body: 'Not an MVP in the watered-down sense. The smallest thing that is genuinely true to the vision — not a feature, not a prototype, but a real thing that can be tested against real behaviour. Scope is the enemy of learning.',
  },
  {
    number: '03',
    headline: 'Build with AI from the first line.',
    body: 'AI is not a tool we layer on top — it is part of the architecture from day one. Whether it is intelligent agents, generative features, or AI-assisted development workflows, it changes the build surface and the economics.',
  },
  {
    number: '04',
    headline: 'Ship. Then stay.',
    body: 'Shipping is not the end — it is the beginning of the interesting part. We stay inside the problem after launch, which means we have skin in the game and we do not hand over a finished artefact and disappear.',
  },
]

export default function Approach() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<HTMLDivElement[]>([])
  const numberRefs = useRef<HTMLSpanElement[]>([])
  const headlineRefs = useRef<HTMLHeadingElement[]>([])
  const bodyRefs = useRef<HTMLParagraphElement[]>([])
  const lineRefs = useRef<SVGLineElement[]>([])
  const svgRefs = useRef<SVGSVGElement[]>([])
  const closingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set([...numberRefs.current, ...headlineRefs.current, ...svgRefs.current, closingRef.current], {
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          y: 0,
        })
        gsap.set(bodyRefs.current, { opacity: 0.7, clipPath: 'inset(0 0% 0 0)', y: 0 })
        svgRefs.current.forEach((svg) => {
          if (!svg) return
          const line = svg.querySelector('line')
          if (line) gsap.set(line, { attr: { 'stroke-dashoffset': 0 } })
        })
        return
      }

      STEPS.forEach((_, i) => {
        const numEl = numberRefs.current[i]
        const headEl = headlineRefs.current[i]
        const bodyEl = bodyRefs.current[i]

        if (!numEl || !headEl || !bodyEl) return

        if (isMobile) {
          // Mobile: viewport entry auto-play
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stepRefs.current[i],
              start: 'top 80%',
              once: true,
            },
          })

          tl.fromTo(
            numEl,
            { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
            { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.5, ease: "power3.out" }
          )
          tl.fromTo(
            headEl,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
            '-=0.3'
          )
          tl.fromTo(
            bodyEl,
            { opacity: 0 },
            { opacity: 0.7, duration: 0.4, ease: "power3.out" },
            '-=0.25'
          )
        } else {
          // Desktop: scrub-based reveal
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stepRefs.current[i],
              start: 'top 75%',
              end: 'center 50%',
              scrub: 1.5,
            },
          })

          tl.fromTo(
            numEl,
            { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
            { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1 }
          )
          tl.fromTo(
            headEl,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.6'
          )
          tl.fromTo(
            bodyEl,
            { opacity: 0 },
            { opacity: 0.7, duration: 0.8 },
            '-=0.5'
          )
        }

        // Connecting line between steps: stroke-dashoffset
        if (i < STEPS.length - 1) {
          const svg = svgRefs.current[i]
          if (!svg) return
          const line = svg.querySelector('line')
          if (!line) return
          const lineLength = 80

          gsap.set(line, {
            attr: {
              'stroke-dasharray': lineLength,
              'stroke-dashoffset': lineLength,
            },
          })

          gsap.to(line, {
            attr: { 'stroke-dashoffset': 0 },
            ease: 'none',
            scrollTrigger: {
              trigger: stepRefs.current[i],
              start: 'center 60%',
              end: 'bottom 40%',
              scrub: isMobile ? false : 1,
              once: isMobile,
            },
          })
        }
      })

      // Closing statement
      if (closingRef.current) {
        gsap.fromTo(
          closingRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: closingRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 10vw, 160px) 48px',
        backgroundColor: 'var(--color-surface)',
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
            marginBottom: '80px',
          }}
        >
          How we build
        </span>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {STEPS.map((step, i) => (
            <div key={step.number}>
              <div
                ref={(el) => {
                  if (el) stepRefs.current[i] = el
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '48px',
                  padding: '48px 0',
                  borderTop: '1px solid var(--color-border)',
                  alignItems: 'start',
                }}
                className="approach-step"
              >
                {/* Step number */}
                <span
                  ref={(el) => {
                    if (el) numberRefs.current[i] = el
                  }}
                  style={{
                    opacity: 0,
                    fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                    fontSize: '13px',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    color: 'var(--color-orange)',
                    paddingTop: '6px',
                    clipPath: 'inset(0 100% 0 0)',
                  }}
                >
                  Step {step.number}
                </span>

                {/* Step content */}
                <div>
                  <h3
                    ref={(el) => {
                      if (el) headlineRefs.current[i] = el
                    }}
                    style={{
                      opacity: 0,
                      fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                      fontSize: 'clamp(24px, 2.5vw, 36px)',
                      fontWeight: 500,
                      lineHeight: '1.1',
                      letterSpacing: '-0.01em',
                      color: 'var(--color-ink)',
                      marginBottom: '20px',
                    }}
                  >
                    {step.headline}
                  </h3>

                  <p
                    ref={(el) => {
                      if (el) bodyRefs.current[i] = el
                    }}
                    style={{
                      opacity: 0,
                      fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                      fontSize: 'clamp(16px, 1.4vw, 18px)',
                      lineHeight: '1.7',
                      color: 'var(--color-ink)',
                      maxWidth: '60ch',
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>

              {/* Connecting vertical line between steps */}
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    paddingLeft: '38px',
                    height: '0',
                    overflow: 'visible',
                    position: 'relative',
                  }}
                >
                  <svg
                    ref={(el) => {
                      if (el) svgRefs.current[i] = el
                    }}
                    width="2"
                    height="80"
                    viewBox="0 0 2 80"
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '38px',
                      top: '-40px',
                      overflow: 'visible',
                    }}
                  >
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="80"
                      stroke="var(--color-orange)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}

          {/* Bottom rule */}
          <div
            style={{
              borderTop: '1px solid var(--color-border)',
              paddingTop: '48px',
            }}
          >
            <p
              ref={closingRef}
              style={{
                opacity: 0,
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: 'clamp(18px, 1.8vw, 24px)',
                fontWeight: 500,
                lineHeight: '1.3',
                letterSpacing: '-0.01em',
                color: 'var(--color-ink)',
                maxWidth: '40ch',
              }}
            >
              Four steps. Most of the work is in step one.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .approach-step {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
