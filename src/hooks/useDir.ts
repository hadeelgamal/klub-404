'use client'

import { useLocale } from 'next-intl'

export function useDir(): 'ltr' | 'rtl' {
  return useLocale() === 'ar' ? 'rtl' : 'ltr'
}
