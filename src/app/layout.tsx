// Root layout — locale-specific layout in [locale]/layout.tsx provides html/body/fonts.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
