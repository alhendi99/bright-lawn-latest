'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

export function BeforeAfter() {
  const { t } = useLanguage()
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, next)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    updateFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    updateFromClientX(e.clientX)
  }
  const onPointerUp = () => {
    dragging.current = false
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4))
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4))
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker={t.beforeAfter.kicker}
          title={t.beforeAfter.title}
          subtitle={t.beforeAfter.subtitle}
        />

        <Reveal className="mt-12">
          <div
            ref={containerRef}
            className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-3xl border border-border shadow-xl"
            onPointerMove={onPointerMove}
          >
            {/* After (base layer) */}
            <Image
              src="/images/after.png"
              alt={`${t.beforeAfter.after}: a pristine manicured lawn`}
              fill
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover"
            />
            <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
              {t.beforeAfter.after}
            </span>

            {/* Before (clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Image
                src="/images/before.png"
                alt={`${t.beforeAfter.before}: an overgrown neglected yard`}
                fill
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-foreground shadow">
                {t.beforeAfter.before}
              </span>
            </div>

            {/* Divider + handle */}
            <div
              className="absolute inset-y-0 z-10 w-0.5 bg-background"
              style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
            >
              <button
                type="button"
                role="slider"
                aria-label={t.beforeAfter.instruction}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onKeyDown={onKeyDown}
                className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-primary bg-background text-primary shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                <MoveHorizontal className="size-5" />
              </button>
            </div>
          </div>
          <p className="mt-4 text-center text-sm font-medium text-muted-foreground">
            {t.beforeAfter.instruction}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
