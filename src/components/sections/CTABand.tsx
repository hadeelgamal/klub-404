'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ============================================================
   MAGNETIC BUTTON
   Detection zone: 240×120px wrapper
   Button displacement: 30% of cursor offset, max ±36px / ±18px
   Spring return via Framer Motion useSpring
   ============================================================ */
function MagneticButton() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isCoarse, setIsCoarse] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.5 })

  useEffect(() => {
    setIsCoarse(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isCoarse) return
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const rect = wrapper.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const dx = e.clientX - cx
      const dy = e.clientY - cy

      // Clamp to ±36px horizontal, ±18px vertical
      const targetX = Math.max(-36, Math.min(36, dx * 0.3))
      const targetY = Math.max(-18, Math.min(18, dy * 0.3))

      rawX.set(targetX)
      rawY.set(targetY)
    },
    [isCoarse, rawX, rawY]
  )

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    // Detection zone: 240×120px
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '240px',
        height: '120px',
        cursor: 'none',
      }}
    >
      <motion.a
        href="#contact"
        data-cursor-state="hover-cta"
        style={{ x, y }}
        whileHover={isCoarse ? { scale: 1.03 } : undefined}
        transition={isCoarse ? { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] } : undefined}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '18px 40px',
            backgroundColor: 'var(--color-ink)',
            color: 'var(--color-canvas)',
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 500,
            letterSpacing: '0.02em',
            textDecoration: 'none',
            borderRadius: '2px',
            whiteSpace: 'nowrap',
            transition: 'background-color 200ms ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLSpanElement).style.backgroundColor = 'var(--color-orange)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLSpanElement).style.backgroundColor = 'var(--color-ink)'
          }}
        >
          Start a project
        </span>
      </motion.a>
    </div>
  )
}

/* ============================================================
   CTA BAND SECTION
   ============================================================ */
export default function CTABand() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(100px, 14vw, 200px) 48px',
        backgroundColor: 'var(--color-ink)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '48px',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
          fontSize: 'clamp(36px, 5vw, 72px)',
          fontWeight: 500,
          lineHeight: '1.0',
          letterSpacing: '-0.02em',
          color: 'var(--color-canvas)',
          maxWidth: '18ch',
        }}
      >
        Have something worth building?
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <MagneticButton />

        <span
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            letterSpacing: '0.04em',
            color: 'var(--color-canvas)',
            opacity: 0.4,
          }}
        >
          No pitch deck required.
        </span>
      </div>
    </section>
  )
}
