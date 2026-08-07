'use client'

import Image from 'next/image'
import { Scissors, Snowflake, Leaf, Sprout, Trees, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const ICONS = {
  lawn: Scissors,
  snow: Snowflake,
  leaf: Leaf,
  yard: Sprout,
  landscaping: Trees,
} as const

const IMAGES: Record<string, string> = {
  lawn: '/images/lawn care/lawn care 11.jpeg',
  snow: '/images/service-snow.webp',
  leaf: '/images/service-leaf.webp',
  yard: '/images/yard cleaning/service-yard.jpeg',
  landscaping: '/images/service-landscaping.webp',
}

export function Services() {
  const { t } = useLanguage()
  const keys = ['lawn', 'snow', 'leaf', 'yard', 'landscaping'] as const

  return (
    <section id="services" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker={t.services.kicker}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {keys.map((key, i) => {
            const Icon = ICONS[key]
            const item = t.services.items[key]
            // Feature the first card across two columns on large screens.
            const featured = i === 0
            return (
              <Reveal
                key={key}
                delay={i}
                className={featured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-1' : ''}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                  <div
                    className={`relative overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}
                  >
                    <Image
                      src={IMAGES[key]}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-xl bg-background/90 text-primary shadow-sm backdrop-blur">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold tracking-tight">{item.name}</h3>
                    <p className="mt-2 flex-1 text-pretty leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                    <a
                      href="#contact"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary"
                    >
                      {t.services.cta}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
