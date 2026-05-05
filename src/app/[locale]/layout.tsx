import type { Metadata } from 'next'
import { Noto_Sans, Noto_Sans_Display, Cormorant_Garamond, Cairo } from 'next/font/google'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { SmoothScrollProvider } from '@/lib/lenis'
import LocaleToggle from '@/components/ui/LocaleToggle'
import '../globals.css'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-neue-montreal',
  display: 'swap',
})

const notoDisplay = Noto_Sans_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-arabic',
  display: 'swap',
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'site' })

  const isAr = locale === 'ar'
  const baseUrl = isAr ? 'https://rabat404.com' : 'https://klub-404.com'

  return {
    title: `${t('name')} — ${t('tagline')}`,
    description: t('description'),
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: `${t('name')} — ${t('tagline')}`,
      description: t('description'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('name')} — ${t('tagline')}`,
      description: t('description'),
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return <div>Not found</div>
  }

  const isAr = locale === 'ar'
  const dir = isAr ? 'rtl' : 'ltr'
  const messages = await getMessages()

  const fontVars = [
    notoSans.variable,
    notoDisplay.variable,
    cormorant.variable,
    cairo.variable,
  ].join(' ')

  return (
    <html lang={locale} dir={dir} className={fontVars}>
      <body style={isAr ? { fontFamily: 'var(--font-arabic), system-ui, sans-serif' } : undefined}>
        <NextIntlClientProvider messages={messages}>
          <LocaleToggle />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
