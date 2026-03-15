'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeroCursorTrail } from '@/components/cursor/Cursor'

/*
 * gsap.registerPlugin is intentionally NOT called at module scope.
 * Hero is statically imported by page.tsx (a Server Component), so module-level
 * code runs during SSR/static prerendering where window is undefined.
 * GSAP's ScrollTrigger reads window at registration and would throw.
 * Registering inside useEffect ensures it only runs in the browser.
 */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const locationRef = useRef<HTMLSpanElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const highlightRef = useRef<HTMLSpanElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      // Skip to final state immediately
      gsap.set(
        [
          locationRef.current,
          ruleRef.current,
          headlineRef.current,
          subheadRef.current,
          scrollCueRef.current,
        ],
        { opacity: 1, y: 0, scaleX: 1 }
      )
      if (highlightRef.current) {
        highlightRef.current.classList.add('revealed')
      }
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Step 1: Location tag — opacity 0→1, 400ms, +200ms delay
      tl.fromTo(
        locationRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        0.2
      )

      // Step 2: Baseline rule — scaleX 0→1, 800ms, +280ms
      tl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, transformOrigin: 'left center' },
        0.28
      )

      // Step 3: Headline — translateY(-48) opacity 0 → 0, 1, 700ms arrive ease, +680ms
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: -48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        0.68
      )

      // Step 4: Orange highlighter strip — scaleX 0→1, 500ms editorial, after step 3 + 80ms
      tl.add(() => {
        if (highlightRef.current) {
          highlightRef.current.classList.add('revealed')
        }
      }, 0.68 + 0.7 + 0.08)

      // Step 5: Subheadline — opacity 0 translateY(12) → 1, 0, 600ms editorial
      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.68 + 0.7 + 0.08 + 0.1
      )

      // Step 6: Scroll cue — appears at 3s post-load, then bounces
      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power3.out" },
        3.0
      )

      tl.add(() => {
        if (!scrollCueRef.current) return
        gsap.to(scrollCueRef.current, {
          y: 8,
          duration: 0.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }, 3.5)

      // Scroll-exit: scrub opacity 1→0 over first 30vh of scroll
      gsap.to(sectionRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '30vh top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 48px 80px',
        overflow: 'hidden',
        backgroundColor: 'var(--color-canvas)',
      }}
    >
      {/* Cursor trail canvas */}
      <HeroCursorTrail heroRef={sectionRef} />

      {/* Location tag */}
      <span
        ref={locationRef}
        style={{
          opacity: 0,
          position: 'absolute',
          top: '120px',
          left: '48px',
          fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
          fontSize: '13px',
          fontWeight: 400,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-ink)',
        }}
      >
        Cairo · Amsterdam
      </span>

      {/* Content block */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        {/* Baseline rule */}
        <div
          ref={ruleRef}
          style={{
            height: '1px',
            backgroundColor: 'var(--color-border)',
            marginBottom: '32px',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />

        {/* Main headline */}
        <h1
          ref={headlineRef}
          style={{
            opacity: 0,
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: 'clamp(56px, 8vw, 96px)',
            fontWeight: 500,
            lineHeight: '0.95',
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            marginBottom: '32px',
            maxWidth: '14ch',
          }}
        >
          This is where{' '}
          <span
            ref={highlightRef}
            className="orange-highlight"
          >
            we start.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          style={{
            opacity: 0,
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 400,
            lineHeight: '1.6',
            color: 'var(--color-ink)',
            maxWidth: '52ch',
            marginBottom: '0',
          }}
        >
          Neither agency nor incubator. A venture studio operating from Cairo and Amsterdam,
          building products, companies, and experiences that solve problems worth solving.
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        aria-hidden="true"
        style={{
          opacity: 0,
          position: 'absolute',
          bottom: '40px',
          right: '48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            opacity: 0.5,
          }}
        >
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          aria-hidden="true"
          style={{ color: 'var(--color-ink)', opacity: 0.5 }}
        >
          <path
            d="M8 4L8 20M8 20L3 15M8 20L13 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
