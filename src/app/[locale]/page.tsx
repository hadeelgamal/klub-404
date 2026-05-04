import Navigation from '@/components/ui/Navigation'
import Hero from '@/components/sections/Hero'
import ClientSections from './ClientSections'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <ClientSections />
    </main>
  )
}
