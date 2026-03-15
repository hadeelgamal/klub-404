'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ============================================================
   CURSOR STATE TYPES
   ============================================================ */
type CursorState = 'default' | 'hover-link' | 'hover-cta' | 'hover-card' | 'drag'

/* ============================================================
   CURSOR RING
   ============================================================ */
function CursorRing() {
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const x = useSpring(rawX, { stiffness: 400, damping: 40, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 400, damping: 40, mass: 0.5 })

  const ringRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<CursorState>('default')

  useEffect(() => {
    function onMove(e: MouseEvent) {
      rawX.set(e.clientX - 8)
      rawY.set(e.clientY - 8)
    }

    function onStateChange() {
      const state = (document.body.dataset.cursor as CursorState) || 'default'
      stateRef.current = state
      applyState(state)
    }

    function applyState(state: CursorState) {
      const ring = ringRef.current
      if (!ring) return

      ring.dataset.state = state

      switch (state) {
        case 'hover-link':
          ring.style.setProperty('--ring-scale', '2')
          ring.style.setProperty('--ring-bg', 'var(--color-orange)')
          ring.style.setProperty('--ring-border', 'transparent')
          ring.style.setProperty('--ring-label', 'none')
          break
        case 'hover-cta':
          ring.style.setProperty('--ring-scale', '3')
          ring.style.setProperty('--ring-bg', 'var(--color-orange)')
          ring.style.setProperty('--ring-border', 'transparent')
          ring.style.setProperty('--ring-label', '"START"')
          break
        case 'hover-card':
          ring.style.setProperty('--ring-scale', '3')
          ring.style.setProperty('--ring-bg', 'var(--color-ink)')
          ring.style.setProperty('--ring-border', 'transparent')
          ring.style.setProperty('--ring-label', '"VIEW"')
          break
        case 'drag':
          ring.style.setProperty('--ring-scale', '1.5')
          ring.style.setProperty('--ring-bg', 'transparent')
          ring.style.setProperty('--ring-border', 'var(--color-ink)')
          ring.style.setProperty('--ring-label', 'none')
          break
        default:
          ring.style.setProperty('--ring-scale', '1')
          ring.style.setProperty('--ring-bg', 'transparent')
          ring.style.setProperty('--ring-border', 'var(--color-ink)')
          ring.style.setProperty('--ring-label', 'none')
          break
      }
    }

    // Watch body dataset changes via MutationObserver
    const observer = new MutationObserver(onStateChange)
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-cursor'] })

    window.addEventListener('mousemove', onMove)

    /*
     * Wire cursor-state hover listeners onto elements with [data-cursor-state].
     * Uses a WeakSet to track already-wired elements so that each DOM
     * mutation (e.g. dynamic section mounting) only wires NEW elements,
     * not every element in the document. Without this guard the original
     * code would attach duplicate mouseenter/mouseleave listeners to every
     * element on every DOM change, firing the handler multiple times per event.
     */
    const wired = new WeakSet<Element>()

    function wireElement(el: HTMLElement) {
      if (wired.has(el)) return
      wired.add(el)
      el.addEventListener('mouseenter', () => {
        document.body.dataset.cursor = el.dataset.cursorState || 'default'
      })
      el.addEventListener('mouseleave', () => {
        document.body.dataset.cursor = 'default'
      })
    }

    function wireNewElements() {
      document.querySelectorAll<HTMLElement>('[data-cursor-state]').forEach(wireElement)
    }

    wireNewElements()

    // Re-wire only when DOM structure changes (new sections mount)
    const domObserver = new MutationObserver(wireNewElements)
    domObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
      domObserver.disconnect()
    }
  }, [rawX, rawY])

  return (
    <motion.div
      ref={ringRef}
      style={{ x, y }}
      aria-hidden="true"
      className="cursor-ring"
    />
  )
}

/* ============================================================
   HERO CURSOR TRAIL
   ============================================================ */
interface HeroCursorTrailProps {
  heroRef: React.RefObject<HTMLElement | null>
}

export function HeroCursorTrail({ heroRef }: HeroCursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<Array<{ x: number; y: number }>>([])
  const rafRef = useRef<number>(0)
  const isInsideRef = useRef(false)
  /*
   * Cache the hero's bounding rect so onMouseMove never calls
   * getBoundingClientRect() — a forced layout read — on every pointer event.
   * A ResizeObserver updates the cache when the hero element resizes,
   * keeping it accurate without layout thrashing.
   */
  const heroBoundsRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null)

  const TRAIL_LENGTH = 24
  const POINT_RADIUS = 3
  const ORANGE = '#FF4D00'
  const OPACITY_DECAY = 0.85

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // No trail on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = canvasRef.current
    const hero = heroRef.current
    if (!canvas || !hero) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize trail array
    trailRef.current = Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }))

    function updateBoundsAndCanvas() {
      if (!canvas || !hero) return
      const rect = hero.getBoundingClientRect()
      heroBoundsRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }
      canvas.width = rect.width
      canvas.height = rect.height
    }

    updateBoundsAndCanvas()

    // ResizeObserver recalculates bounds when the hero element changes size
    // (e.g. font load reflow, viewport resize). One layout read on resize,
    // zero layout reads during pointermove.
    const resizeObserver = new ResizeObserver(() => {
      updateBoundsAndCanvas()
    })
    resizeObserver.observe(hero)

    // Also recalculate on scroll since getBoundingClientRect is viewport-relative
    function onScroll() {
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      heroBoundsRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    function onMouseMove(e: MouseEvent) {
      const bounds = heroBoundsRef.current
      if (!bounds) return
      const x = e.clientX - bounds.left
      const y = e.clientY - bounds.top
      isInsideRef.current =
        x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height

      if (isInsideRef.current) {
        trailRef.current.unshift({ x, y })
        if (trailRef.current.length > TRAIL_LENGTH) {
          trailRef.current.pop()
        }
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    function drawFrame() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isInsideRef.current && trailRef.current.length > 0) {
        trailRef.current.forEach((point, i) => {
          const opacity = Math.pow(OPACITY_DECAY, i) * 0.8
          const radius = POINT_RADIUS * (1 - i / TRAIL_LENGTH)
          ctx.beginPath()
          ctx.arc(point.x, point.y, Math.max(0.5, radius), 0, Math.PI * 2)
          ctx.fillStyle = ORANGE
          ctx.globalAlpha = opacity
          ctx.fill()
        })
        ctx.globalAlpha = 1
      }

      rafRef.current = requestAnimationFrame(drawFrame)
    }

    rafRef.current = requestAnimationFrame(drawFrame)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      resizeObserver.disconnect()
      cancelAnimationFrame(rafRef.current)
      if (canvas) {
        const ctx2 = canvas.getContext('2d')
        if (ctx2) ctx2.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [heroRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  )
}

/* ============================================================
   MAIN CURSOR EXPORT
   ============================================================ */
export default function Cursor() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show the cursor ring on pointer:fine devices.
    // Checked inside useEffect to avoid SSR/hydration mismatch — the server
    // has no window so we cannot know the pointer type at render time.
    if (!window.matchMedia('(pointer: coarse)').matches) {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <CursorRing />
      <style>{`
        .cursor-ring {
          --ring-scale: 1;
          --ring-bg: transparent;
          --ring-border: var(--color-ink);
          --ring-label: none;

          position: fixed;
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1.5px solid var(--ring-border);
          background-color: var(--ring-bg);
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: normal;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-origin: center center;
          transition:
            transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
            background-color 200ms ease,
            border-color 200ms ease;
          transform: scale(var(--ring-scale));
        }

        .cursor-ring::after {
          content: var(--ring-label);
          color: #FFFFFF;
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: var(--font-neue-montreal), system-ui, sans-serif;
          pointer-events: none;
          white-space: nowrap;
        }

        @media (pointer: coarse) {
          .cursor-ring {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
