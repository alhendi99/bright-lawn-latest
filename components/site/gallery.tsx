'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const IMAGES = [
  { src: '/images/gallery-1.png', ratio: 'aspect-[4/3]' },
  { src: '/images/gallery-2.png', ratio: 'aspect-[3/4]' },
  { src: '/images/gallery-3.png', ratio: 'aspect-[4/3]' },
  { src: '/images/gallery-4.png', ratio: 'aspect-[3/4]' },
  { src: '/images/gallery-5.png', ratio: 'aspect-[4/3]' },
  { src: '/images/gallery-6.png', ratio: 'aspect-[4/3]' },
]

export function Gallery() {
  const { t } = useLanguage()
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + IMAGES.length) % IMAGES.length)),
    [],
  )
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % IMAGES.length)),
    [],
  )

  useEffect(() => {
    if (active === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close, prev, next])

  return (
    <section id="work" className="scroll-mt-20 bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker={t.gallery.kicker}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        <div className="masonry mt-14 columns-1 sm:columns-2 lg:columns-3">
          {IMAGES.map((img, i) => (
            <Reveal key={img.src} delay={i % 3}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${t.gallery.viewLabel} ${i + 1}`}
                className="group relative block w-full overflow-hidden rounded-2xl border border-border focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                <span className={`relative block w-full ${img.ratio}`}>
                  <Image
                    src={img.src || '/placeholder.svg'}
                    alt={`${t.gallery.viewLabel} ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="absolute inset-0 bg-brand-deep/0 transition-colors duration-300 group-hover:bg-brand-deep/25" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={t.gallery.viewLabel}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25"
            >
              <X className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous"
              className="absolute left-3 grid size-11 place-items-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25 sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next"
              className="absolute right-3 grid size-11 place-items-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25 sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[75vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={IMAGES[active].src || '/placeholder.svg'}
                alt={`${t.gallery.viewLabel} ${active + 1}`}
                fill
                sizes="100vw"
                className="rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
