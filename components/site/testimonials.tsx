'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

type Review = {
  name: string
  location: string
  rating: number
  quote: { en: string; es: string }
}

const REVIEWS: Review[] = [
  {
    name: 'Michael Torres',
    location: 'Oakwood Heights',
    rating: 5,
    quote: {
      en: 'Bright Lawn transformed our tired backyard into the nicest on the block. The crew is punctual, tidy, and genuinely cares about the details.',
      es: 'Bright Lawn transformó nuestro patio cansado en el más bonito de la cuadra. El equipo es puntual, ordenado y realmente cuida cada detalle.',
    },
  },
  {
    name: 'Sarah Whitman',
    location: 'Maple Grove',
    rating: 5,
    quote: {
      en: 'Their seasonal plan is worth every penny. Mowing all summer, leaf cleanup in fall, and snow cleared before I even wake up. Set it and forget it.',
      es: 'Su plan de temporada vale cada centavo. Corte todo el verano, limpieza de hojas en otoño y nieve retirada antes de que despierte. Sin preocupaciones.',
    },
  },
  {
    name: 'David Chen',
    location: 'Riverside',
    rating: 5,
    quote: {
      en: 'I hired them for a full landscaping redesign and the result exceeded expectations. Professional from the first quote to the final walkthrough.',
      es: 'Los contraté para un rediseño completo del paisaje y el resultado superó las expectativas. Profesionales desde la cotización hasta el recorrido final.',
    },
  },
  {
    name: 'Emily Rodriguez',
    location: 'Cedar Park',
    rating: 5,
    quote: {
      en: 'Responsive, reliable, and reasonably priced. My lawn has never looked healthier and greener. Highly recommend to any neighbor.',
      es: 'Atentos, confiables y a buen precio. Mi césped nunca se vio tan verde y saludable. Los recomiendo mucho a cualquier vecino.',
    },
  },
]

export function Testimonials() {
  const { t, lang } = useLanguage()
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback((next: number, direction: number) => {
    setDir(direction)
    setIndex((next + REVIEWS.length) % REVIEWS.length)
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    const id = setInterval(() => {
      setDir(1)
      setIndex((i) => (i + 1) % REVIEWS.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const review = REVIEWS[index]

  return (
    <section id="reviews" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker={t.testimonials.kicker}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
        />

        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12">
            <Quote className="absolute right-8 top-8 size-16 text-primary/10" aria-hidden="true" />
            <div className="min-h-[13rem] sm:min-h-[11rem]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.blockquote
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex gap-0.5 text-primary" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="size-5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-pretty text-xl font-medium leading-relaxed sm:text-2xl">
                    “{review.quote[lang]}”
                  </p>
                  <footer className="mt-6">
                    <p className="font-bold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i, i > index ? 1 : -1)}
                    aria-label={`Go to review ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1, -1)}
                  aria-label={t.testimonials.prev}
                  className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1, 1)}
                  aria-label={t.testimonials.next}
                  className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
