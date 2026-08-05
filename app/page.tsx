import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { Services } from '@/components/site/services'
import { Stats } from '@/components/site/stats'
import { BeforeAfter } from '@/components/site/before-after'
import { Gallery } from '@/components/site/gallery'
import { Testimonials } from '@/components/site/testimonials'
import { Faq } from '@/components/site/faq'
import { Contact } from '@/components/site/contact'
import { Footer } from '@/components/site/footer'
import { PageTransition } from '@/components/site/page-transition'

export default function Page() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main>
          <Hero />
          <Services />
          <Stats />
          <BeforeAfter />
          <Gallery />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
    </>
  )
}
