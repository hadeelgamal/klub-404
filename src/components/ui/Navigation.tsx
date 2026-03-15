'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Work',    href: '#work' },
  { label: 'Studio',  href: '#studio' },
  { label: 'Hubs',    href: '#hubs' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Mount fade-in
  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll listener — add blur background past 80vh.
  // innerHeight is read inside the handler so it stays accurate after
  // viewport resize without needing a separate resize listener.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        aria-label="Primary navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 48px',
          transition: 'background-color 300ms ease, backdrop-filter 300ms ease',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        {/* Wordmark */}
        <a
          href="/"
          aria-label="klub-404 home"
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '18px',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            textDecoration: 'none',
            zIndex: 101,
          }}
          data-cursor-state="hover-link"
        >
          klub-404
        </a>

        {/* Desktop nav links */}
        <div
          role="list"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="listitem"
              data-cursor-state="hover-link"
              style={{
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0.04em',
                color: 'var(--color-ink)',
                textDecoration: 'none',
                opacity: 0.7,
                transition: 'opacity 200ms ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            data-cursor-state="hover-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '10px 22px',
              backgroundColor: 'var(--color-ink)',
              color: 'var(--color-canvas)',
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              borderRadius: '2px',
              transition: 'background-color 200ms ease, transform 200ms var(--ease-arrive)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-orange)'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-ink)'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'
            }}
          >
            Start a project
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="nav-hamburger"
          style={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '5px',
            width: '32px',
            height: '32px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            zIndex: 101,
          }}
        >
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '1.5px',
              backgroundColor: 'var(--color-ink)',
              transformOrigin: 'center',
              transition: 'transform 300ms var(--ease-arrive), opacity 200ms ease',
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '1.5px',
              backgroundColor: 'var(--color-ink)',
              transition: 'opacity 200ms ease',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '1.5px',
              backgroundColor: 'var(--color-ink)',
              transformOrigin: 'center',
              transition: 'transform 300ms var(--ease-arrive), opacity 200ms ease',
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '280px',
              height: '100dvh',
              backgroundColor: 'var(--color-canvas)',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              padding: '96px 40px 48px',
              gap: '32px',
              borderLeft: '1px solid var(--color-border)',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.05 * i,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: 'var(--color-ink)',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 24px',
                backgroundColor: 'var(--color-ink)',
                color: 'var(--color-canvas)',
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '0.02em',
                textDecoration: 'none',
                borderRadius: '2px',
              }}
            >
              Start a project
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(13, 13, 13, 0.4)',
              zIndex: 150,
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 767px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
        }
        @media (min-width: 768px) {
          .nav-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
