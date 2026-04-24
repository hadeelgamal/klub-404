'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  message: string
  budget: string
}

interface FieldProps {
  id: string
  label: string
  value: string
  type?: string
  multiline?: boolean
  error?: string
  onChange: (val: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

/* ============================================================
   FLOATING LABEL FIELD
   ============================================================ */
function FloatingField({
  id,
  label,
  value,
  type = 'text',
  multiline = false,
  error,
  onChange,
}: FieldProps) {
  const [focused, setFocused] = useState(false)
  const [shaking, setShaking] = useState(false)
  const isFloated = focused || value.length > 0

  // Trigger shake when error appears
  useEffect(() => {
    if (error) {
      setShaking(true)
      const t = setTimeout(() => setShaking(false), 420)
      return () => clearTimeout(t)
    }
  }, [error])

  const sharedInputStyle: React.CSSProperties = {
    width: '100%',
    background: 'none',
    border: 'none',
    borderBottom: `1.5px solid ${error ? '#ef4444' : focused ? '#ffffff' : '#2D2D2D'}`,
    outline: 'none',
    fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    color: '#ffffff',
    padding: '24px 0 8px',
    lineHeight: '1.5',
    resize: 'none',
    transition: 'border-color 200ms ease',
    animation: shaking
      ? 'fieldShake 400ms cubic-bezier(0.36, 0.07, 0.19, 0.97)'
      : 'none',
  }

  return (
    <div
      style={{
        position: 'relative',
        /*
         * Reserve space for the error message at all times so that when
         * it appears the surrounding form layout does not shift (CLS fix).
         * paddingBottom gives the error text room without triggering a
         * margin change that would reflow all sibling elements.
         */
        paddingBottom: '20px',
      }}
    >
      <label
        htmlFor={id}
        style={{
          position: 'absolute',
          /*
           * GPU-safe label float: replace top/font-size (layout-triggering) with
           * transform + scale. The label sits at its natural "resting" position
           * (top:20px baseline), then we shift it via translate + scale so only
           * the Composite stage is hit on every frame.
           *
           * Resting:  translateY(0)   scale(1)       — visually at padding-top:20px
           * Floated:  translateY(-16px) scale(0.6875) — 11/16 = 0.6875
           * transform-origin: left top so it shrinks from the left edge.
           */
          top: '20px',
          left: 0,
          fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
          fontSize: '16px',
          fontWeight: 400,
          letterSpacing: isFloated ? '0.08em' : '0',
          textTransform: isFloated ? 'uppercase' : 'none',
          color: error ? '#ef4444' : focused ? '#ffffff' : '#ffffff',
          opacity: isFloated ? 0.7 : 0.45,
          pointerEvents: 'none',
          transformOrigin: 'left top',
          transform: isFloated ? 'translateY(-16px) scale(0.6875)' : 'translateY(0) scale(1)',
          transition: 'transform 200ms ease, letter-spacing 200ms ease, color 200ms ease, opacity 200ms ease',
          userSelect: 'none',
        }}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          value={value}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedInputStyle}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedInputStyle}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}

      {/* Orange underline on focus: scaleX 0→1 via width transition */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '1.5px',
          width: '100%',
          backgroundColor: error ? '#ef4444' : '#ffffff',
          transformOrigin: 'left center',
          transform: focused ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '12px',
            color: '#ef4444',
            marginTop: '4px',
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}

/* ============================================================
   CONTACT SECTION
   ============================================================ */
export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const fieldsRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    budget: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  // Entrance animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!fieldsRef.current) return
      const fields = fieldsRef.current.querySelectorAll<HTMLElement>('.contact-field')

      if (prefersReduced) {
        gsap.set(fields, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        fields,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const validate = useCallback((): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required.'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.'
    }
    if (!formData.message.trim()) newErrors.message = 'Tell us what you are working on.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!validate()) return
      setStatus('submitting')

      // Simulated submit — replace with real endpoint
      await new Promise<void>((resolve) => setTimeout(resolve, 1200))
      setStatus('success')
    },
    [validate]
  )

  const updateField = useCallback((field: keyof FormData) => (val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }, [errors])

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        padding: `clamp(60px, 8vw, 120px) clamp(12px, 1.04vw, 15px)`,
        backgroundColor: '#000000',
        borderTop: '1px solid #2D2D2D',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }}
        className="contact-grid"
      >
        {/* Left: section info */}
        <div>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#747474',
              marginBottom: '24px',
            }}
          >
            Contact
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 400,
              lineHeight: '1.1',
              letterSpacing: '-0.01em',
              color: '#ffffff',
              marginBottom: '24px',
            }}
          >
            Tell us what you are working on.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: '14px',
              lineHeight: '1.65',
              color: '#747474',
              maxWidth: '44ch',
            }}
          >
            We come back within 2 business days. No pressure, no pitch deck required.
          </p>
        </div>

        {/* Right: form */}
        <div ref={fieldsRef}>
          {status === 'success' ? (
            // Success state
            <div
              style={{
                animation: 'fadeInUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: '#ffffff',
                  marginBottom: '16px',
                }}
              >
                Got it.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '16px',
                  lineHeight: '1.65',
                  color: '#ffffff',
                  opacity: 0.6,
                }}
              >
                Your message is in. We will be back within 2 business days. Keep building.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                  marginBottom: '48px',
                }}
              >
                <div className="contact-field" style={{ opacity: 0 }}>
                  <FloatingField
                    id="contact-name"
                    label="Your name"
                    value={formData.name}
                    onChange={updateField('name')}
                    error={errors.name}
                  />
                </div>

                <div className="contact-field" style={{ opacity: 0 }}>
                  <FloatingField
                    id="contact-email"
                    label="Email address"
                    type="email"
                    value={formData.email}
                    onChange={updateField('email')}
                    error={errors.email}
                  />
                </div>

                <div className="contact-field" style={{ opacity: 0 }}>
                  <FloatingField
                    id="contact-message"
                    label="Tell us about it"
                    value={formData.message}
                    multiline
                    onChange={updateField('message')}
                    error={errors.message}
                  />
                </div>

                <div className="contact-field" style={{ opacity: 0 }}>
                  <FloatingField
                    id="contact-budget"
                    label="Rough budget (optional)"
                    value={formData.budget}
                    onChange={updateField('budget')}
                  />
                </div>
              </div>

              <div className="contact-field" style={{ opacity: 0 }}>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 36px',
                    backgroundColor: status === 'submitting' ? '#2D2D2D' : '#ffffff',
                    color: '#000000',
                    fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    border: 'none',
                    borderRadius: '2px',
                    cursor: status === 'submitting' ? 'wait' : 'pointer',
                    transition: 'background-color 200ms ease, transform 200ms var(--ease-arrive)',
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'submitting') {
                      ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff'
                      ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff'
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
                  }}
                >
                  {status === 'submitting' ? (
                    <>
                      <span
                        aria-hidden="true"
                        style={{
                          width: '14px',
                          height: '14px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          animation: 'spin 600ms linear infinite',
                          display: 'inline-block',
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    'Send it'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fieldShake {
          10%, 90%  { transform: translateX(-2px); }
          20%, 80%  { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-6px); }
          40%, 60%  { transform: translateX(6px); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 767px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
