'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

export default function LocaleToggle() {
  const locale   = useLocale()
  const router   = useRouter()
  const pathname = usePathname()
  const isAr     = locale === 'ar'

  const label    = isAr ? 'EN · Amsterdam' : 'AR · القاهرة'
  const nextLoc  = isAr ? 'en' : 'ar'

  return (
    <button
      onClick={() => router.replace(pathname, { locale: nextLoc })}
      style={{
        position: 'fixed',
        top: '13px',
        right: '13px',
        zIndex: 9999,
        background: 'transparent',
        border: '1px solid #2D2D2D',
        color: '#747474',
        fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '7px 12px',
        cursor: 'pointer',
        lineHeight: 1,
        transition: 'color 0.2s, border-color 0.2s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#ffffff'
        e.currentTarget.style.borderColor = '#ffffff'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#747474'
        e.currentTarget.style.borderColor = '#2D2D2D'
      }}
      aria-label={`Switch to ${nextLoc === 'ar' ? 'Arabic' : 'English'}`}
    >
      {label}
    </button>
  )
}
