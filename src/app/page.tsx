/*
 * page.tsx is a Server Component. dynamic() with ssr:false cannot be called
 * here — it is only legal in Client Components. The heavy below-fold sections
 * are dynamically imported from ClientSections (a Client Component), which
 * is itself statically imported here so the shell renders server-side while
 * the JS bundles for each section load in parallel on the client.
 */
import Navigation from '@/components/ui/Navigation'
import Hero from '@/components/sections/Hero'
import ClientSections from './ClientSections'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ClientSections />
      </main>
    </>
  )
}
