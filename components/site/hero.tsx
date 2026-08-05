'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Star, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* soft brand backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_0%,var(--brand-soft),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold text-secondary-foreground"
          >
            <ShieldCheck className="size-4 text-primary" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground"
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
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-3.5 text-base font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {t.hero.secondary}
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease }}
            className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6"
          >
            {[
              { v: '1,200+', l: t.hero.stat1 },
              { v: '12', l: t.hero.stat2 },
              { v: '4.9★', l: t.hero.stat3 },
            ].map((s) => (
              <div key={s.l}>
                <dt className="text-2xl font-extrabold text-primary">{s.v}</dt>
                <dd className="mt-1 text-xs font-medium leading-snug text-muted-foreground">
                  {s.l}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Image reveal */}
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.4 }}
          animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className="relative"
        >
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl shadow-2xl sm:aspect-3/4 lg:aspect-4/5">
            <Image
              src="/images/hero.png"
              alt="A beautifully manicured green lawn in front of a modern home"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease }}
            className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur sm:-left-6"
          >
            <div className="flex -space-x-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="text-sm font-semibold">
              4.9/5 <span className="font-normal text-muted-foreground">· 300+ reviews</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
