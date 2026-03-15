'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ============================================================
   MANIFESTO — REVISION TYPE INTERACTION
   ============================================================ */

type ManifestoState =
  | 'idle'
  | 'typing-a'
  | 'pausing'
  | 'striking'
  | 'removing'
  | 'typing-b'
  | 'done'

const SEGMENT_A = 'SOLUTIONS'
const SEGMENT_B = 'EXPERIENCES'

// Full paragraph, with the swappable word as a placeholder token
const PARAGRAPH_BEFORE = `We did not set out to build an agency. We set out to build things — products, companies, and `
const PARAGRAPH_AFTER = ` that solve a problem that was worth solving. The distinction matters. An agency delivers. An incubator bets. We do both, depending on what the problem requires. We operate from Cairo and Amsterdam because those two cities, between them, cover more of the real EMEA than most studios ever see from a single office in London or Berlin. We are not finished. We are in the middle of building something. This page is where we keep track of it.`

const CHAR_INTERVAL_MS = 28
const PAUSE_AFTER_A_MS = 800
const STRIKETHROUGH_DURATION_MS = 300
const REMOVE_DURATION_MS = 350
const TYPE_B_DELAY_MS = 200
const PULL_QUOTE_DELAY_MS = 300

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<ManifestoState>('idle')
  const [displayedA, setDisplayedA] = useState('')
  const [displayedB, setDisplayedB] = useState('')
  const [showStrike, setShowStrike] = useState(false)
  const [aVisible, setAVisible] = useState(false)
  const [bVisible, setBVisible] = useState(false)
  const [aFadeOut, setAFadeOut] = useState(false)
  const [pullQuoteVisible, setPullQuoteVisible] = useState(false)
  const firedRef = useRef(false)
  // Track all pending timeout IDs so we can cancel them on unmount,
  // preventing setState calls on an unmounted component.
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay)
    timeoutsRef.current.push(id)
    return id
  }, [])

  const runSequence = useCallback(() => {
    if (firedRef.current) return
    firedRef.current = true

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      // Skip directly to done state — no timeouts needed
      setDisplayedA(SEGMENT_A)
      setDisplayedB(SEGMENT_B)
      setAVisible(false)
      setBVisible(true)
      setPullQuoteVisible(true)
      setState('done')
      return
    }

    // Step 1: type segment A char by char
    setState('typing-a')
    setAVisible(true)
    let i = 0

    function typeA() {
      i++
      setDisplayedA(SEGMENT_A.slice(0, i))
      if (i < SEGMENT_A.length) {
        schedule(typeA, CHAR_INTERVAL_MS)
      } else {
        // Pause after A is fully typed
        setState('pausing')
        schedule(() => {
          // Draw strikethrough
          setState('striking')
          setShowStrike(true)
          schedule(() => {
            // Fade out A
            setState('removing')
            setAFadeOut(true)
            schedule(() => {
              setAVisible(false)
              setShowStrike(false)
              setAFadeOut(false)

              // Brief gap before typing B
              schedule(() => {
                setState('typing-b')
                setBVisible(true)
                let j = 0

                function typeB() {
                  j++
                  setDisplayedB(SEGMENT_B.slice(0, j))
                  if (j < SEGMENT_B.length) {
                    schedule(typeB, CHAR_INTERVAL_MS)
                  } else {
                    // Reveal pull quote after B finishes
                    schedule(() => {
                      setPullQuoteVisible(true)
                      setState('done')
                    }, PULL_QUOTE_DELAY_MS)
                  }
                }
                typeB()
              }, TYPE_B_DELAY_MS)
            }, REMOVE_DURATION_MS)
          }, STRIKETHROUGH_DURATION_MS)
        }, PAUSE_AFTER_A_MS)
      }
    }

    schedule(typeA, CHAR_INTERVAL_MS)
  }, [schedule])

  // IntersectionObserver fires sequence once at 30% threshold
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runSequence()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      // Cancel all pending timeouts so no setState fires after unmount
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [runSequence])

  const isDone = state === 'done'

  return (
    <section
      ref={sectionRef}
      id="studio"
      style={{
        padding: 'clamp(80px, 10vw, 160px) 48px',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
          gap: '80px',
          alignItems: 'start',
        }}
        className="manifesto-grid"
      >
        {/* Left: paragraph */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: 'clamp(18px, 1.6vw, 22px)',
              lineHeight: '1.7',
              color: 'var(--color-ink)',
              letterSpacing: '0',
            }}
          >
            {PARAGRAPH_BEFORE}

            {/* Segment A — types in, then strikes out and removes */}
            {aVisible && (
              <span
                style={{
                  position: 'relative',
                  display: 'inline',
                  opacity: aFadeOut ? 0 : 1,
                  transform: aFadeOut ? 'translateY(-12px)' : 'translateY(0)',
                  transition: aFadeOut
                    ? `opacity ${REMOVE_DURATION_MS}ms cubic-bezier(0.55,0,1,0.45), transform ${REMOVE_DURATION_MS}ms cubic-bezier(0.55,0,1,0.45)`
                    : 'none',
                }}
              >
                {displayedA}
                {/* Strikethrough line — CSS animation only touches transform, compositor-safe */}
                {showStrike && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      height: '2px',
                      width: '100%',
                      backgroundColor: 'var(--color-orange)',
                      transformOrigin: 'left center',
                      animation: `strikeGrow ${STRIKETHROUGH_DURATION_MS}ms cubic-bezier(0.16,1,0.3,1) forwards`,
                    }}
                  />
                )}
              </span>
            )}

            {/* Segment B — types in orange */}
            {bVisible && (
              <span
                style={{
                  color: 'var(--color-orange)',
                  opacity: bVisible ? 1 : 0,
                  transform: bVisible ? 'translateY(0)' : 'translateY(16px)',
                  display: 'inline',
                  transition: `opacity 500ms cubic-bezier(0.34,1.56,0.64,1), transform 500ms cubic-bezier(0.34,1.56,0.64,1)`,
                }}
              >
                {displayedB}
              </span>
            )}

            {/* Show final committed B if done (no aVisible, no typewriter) */}
            {isDone && !aVisible && !bVisible && (
              <span style={{ color: 'var(--color-orange)' }}>{SEGMENT_B}</span>
            )}

            {PARAGRAPH_AFTER}
          </p>
        </div>

        {/* Right: pull quote */}
        <div
          style={{
            opacity: pullQuoteVisible ? 1 : 0,
            transition: pullQuoteVisible
              ? `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${PULL_QUOTE_DELAY_MS}ms`
              : 'none',
            position: 'sticky',
            top: '120px',
          }}
        >
          <blockquote
            style={{
              margin: 0,
              padding: 0,
              borderLeft: '2px solid var(--color-orange)',
              paddingLeft: '24px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: 'clamp(24px, 2.4vw, 32px)',
                fontWeight: 500,
                lineHeight: '1.2',
                letterSpacing: '-0.01em',
                color: 'var(--color-ink)',
                fontStyle: 'normal',
              }}
            >
              Neither. Both. Still building.
            </p>
          </blockquote>
        </div>
      </div>

      <style>{`
        @keyframes strikeGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        @media (max-width: 767px) {
          .manifesto-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
