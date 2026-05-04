'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DottedSurface } from '@/components/ui/dotted-surface'
import { useTranslations } from 'next-intl'

const PAD = 'clamp(12px, 1.04vw, 15px)'

const INDUSTRY_ACCENTS = ['#0ea5e9', '#ec4899', '#7c3aed']

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function FocusIndustriesIntro() {
  const t          = useTranslations('industries')
  const INDUSTRIES = (t.raw('items') as { name: string; desc: string }[]).map((item, i) => ({ ...item, accent: INDUSTRY_ACCENTS[i] }))
  const headingRef = useRef<HTMLDivElement>(null)
  const colRefs    = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef     = useRef<HTMLDivElement>(null)

  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState<Status>('idle')
  const [focused, setFocused] = useState<string | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40, opacity: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      })

      colRefs.current.forEach((col, i) => {
        if (!col) return
        gsap.from(col, {
          y: 36, opacity: 0, duration: 0.9, ease: 'power2.out', delay: i * 0.12,
          scrollTrigger: { trigger: col, start: 'top 82%', toggleActions: 'play none none reverse' },
        })
      })

      gsap.from(ctaRef.current, {
        y: 40, opacity: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      })
    })

    return () => ctx.revert()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setName(''); setEmail(''); setMessage('')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    background: focused === field ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused === field ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '8px',
    outline: 'none',
    padding: '14px 16px',
    fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
    fontSize: 'clamp(14px, 1.2vw, 16px)',
    fontWeight: 400,
    color: '#ffffff',
    letterSpacing: '-0.005em',
    transition: 'border-color 0.2s ease, background 0.2s ease',
    boxSizing: 'border-box',
  })

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000000',
        borderTop: '1px solid #2D2D2D',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `clamp(80px, 12vw, 140px) ${PAD}`,
        gap: 'clamp(48px, 7vw, 80px)',
      }}
    >
      <DottedSurface />

      {/* Vignette */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, #000000 85%)',
          pointerEvents: 'none',
        }}
      />

      {/* Heading */}
      <div ref={headingRef} style={{ position: 'relative', textAlign: 'center' }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#747474',
            marginBottom: 'clamp(16px, 2vw, 24px)',
          }}
        >
          {t('label')}
        </span>
        <p
          style={{
            fontFamily: 'var(--font-display), system-ui, sans-serif',
            fontSize: 'clamp(36px, 6vw, 88px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          {t('heading')}
        </p>
      </div>

      {/* Three columns */}
      <div
        className="focus-cols"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(16px, 2.5vw, 32px)',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        {INDUSTRIES.map((industry, i) => (
          <div
            key={industry.name}
            ref={el => { colRefs.current[i] = el }}
            style={{
              borderInlineStart: `2px solid ${industry.accent}60`,
              paddingInlineStart: 'clamp(16px, 2vw, 24px)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
                marginBottom: '10px',
              }}
            >
              {industry.name}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: 'clamp(12px, 1.05vw, 14px)',
                fontWeight: 400,
                color: '#747474',
                lineHeight: 1.65,
                letterSpacing: '-0.005em',
              }}
            >
              {industry.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA + Contact form */}
      <div
        ref={ctaRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: 'clamp(32px, 5vw, 60px)',
        }}
      >
        {/* Label + headline */}
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#747474',
            marginBottom: 'clamp(12px, 1.5vw, 20px)',
          }}
        >
          {t('form.label')}
        </span>
        <p
          style={{
            fontFamily: 'var(--font-display), system-ui, sans-serif',
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: '0 0 clamp(32px, 5vw, 56px)',
          }}
        >
          {t('form.heading')}
        </p>

        {/* Form */}
        {status === 'sent' ? (
          <p
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: 'clamp(14px, 1.3vw, 17px)',
              color: '#ffffff',
              letterSpacing: '-0.01em',
              lineHeight: 1.5,
            }}
          >
            {t('form.success')}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="contact-row">
              <div className="contact-field">
                <label style={labelStyle}>{t('form.nameLabel')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  required
                  placeholder={t('form.namePlaceholder')}
                  style={inputStyle('name')}
                />
              </div>
              <div className="contact-field">
                <label style={labelStyle}>{t('form.emailLabel')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  required
                  placeholder="your@email.com"
                  style={inputStyle('email')}
                />
              </div>
            </div>
            <div className="contact-field" style={{ marginTop: 'clamp(24px, 3vw, 36px)' }}>
              <label style={labelStyle}>{t('form.messageLabel')}</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                required
                placeholder={t('form.messagePlaceholder')}
                rows={4}
                style={{ ...inputStyle('message'), resize: 'none', lineHeight: 1.65 }}
              />
            </div>

            <div style={{ marginTop: 'clamp(28px, 3.5vw, 44px)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="contact-btn"
                style={{
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  padding: '14px 32px',
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  cursor: status === 'sending' ? 'default' : 'pointer',
                  opacity: status === 'sending' ? 0.5 : 1,
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                }}
              >
                {status === 'sending' ? t('form.sendingBtn') : t('form.sendBtn')}
              </button>
              {status === 'error' && (
                <span style={{ fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif', fontSize: '13px', color: '#747474' }}>
                  {t('form.errorMsg')}
                </span>
              )}
            </div>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .focus-cols { grid-template-columns: 1fr !important; }
        }
        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: #555;
        }
        .contact-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 3vw, 40px);
        }
        @media (max-width: 540px) {
          .contact-row { grid-template-columns: 1fr !important; }
        }
        .contact-btn:hover:not(:disabled) {
          opacity: 0.88 !important;
          transform: translateY(-1px);
        }
        .contact-btn:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#747474',
  marginBottom: '8px',
}
