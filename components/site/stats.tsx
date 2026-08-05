'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import { SectionHeading } from './section-heading'

function Counter({
  value,
  suffix = '',
  decimals = 0,
}: {
  value: number
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(value)
      return
    }
    let raf = 0
    const duration = 1600
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}

export function Stats() {
  const { t } = useLanguage()

  const items = [
    { value: 1200, suffix: '+', decimals: 0, label: t.stats.items.homes },
    { value: 98, suffix: '%', decimals: 0, label: t.stats.items.satisfaction },
    { value: 12, suffix: '', decimals: 0, label: t.stats.items.years },
    { value: 24, suffix: 'h', decimals: 0, label: t.stats.items.response },
  ]

  return (
    <section id="why" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-brand-deep px-6 py-14 text-primary-foreground sm:px-12 lg:py-20">
          <SectionHeading
            kicker={t.stats.kicker}
            title={t.stats.title}
            className="[&_h2]:text-primary-foreground [&_span]:bg-primary-foreground/15 [&_span]:text-primary-foreground"
          />
          <dl className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {items.map((item, i) => (
              <div
                key={item.label}
                className="text-center"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <dt className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <Counter value={item.value} suffix={item.suffix} decimals={item.decimals} />
                </dt>
                <dd className="mt-2 text-sm font-medium text-primary-foreground/80">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
