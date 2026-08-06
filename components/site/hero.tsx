'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Star, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

const ease = [0.16, 1, 0.3, 1] as const

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

export function Hero() {
  const { t } = useLanguage()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-brand-deep pt-16 text-primary-foreground"
    >
      {prefersReducedMotion ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        />
      ) : (
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero.png"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        >
          <source src="/images/videos/Hero.mp4" type="video/mp4" />
        </video>
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/55 via-black/45 to-black/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.5),rgba(0,0,0,0.18)_58%,rgba(0,0,0,0.36))]"
      />

      <div className="relative z-20 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-center px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur"
          >
            <ShieldCheck className="size-4 text-primary" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/82"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.03] active:scale-95"
            >
              {t.hero.primary}
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-3.5 text-base font-bold text-white backdrop-blur transition-colors hover:border-white/70 hover:bg-white/20"
            >
              {t.hero.secondary}
            </a>
          </motion.div>




        </div>
      </div>
    </section>
  )
}
