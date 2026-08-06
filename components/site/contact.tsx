'use client'

import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY } from '@/lib/seo'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

export function Contact() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t.contact.errors.name),
        email: z.string().trim().email(t.contact.errors.email),
        phone: z.string().trim().min(7, t.contact.errors.phone),
        service: z.string().min(1, t.contact.errors.service),
        message: z.string().trim().min(10, t.contact.errors.message),
      }),
    [t],
  )

  type FormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = async (_data: FormValues) => {
    // Simulate a network request; wire to a real endpoint / server action later.
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
    reset()
  }

  const services = [
    t.services.items.lawn.name,
    t.services.items.snow.name,
    t.services.items.leaf.name,
    t.services.items.yard.name,
    t.services.items.landscaping.name,
  ]

  const fieldClass =
    'w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15'

  return (
    <section id="contact" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* Left: info + map */}
          <div>
            <SectionHeading
              kicker={t.contact.kicker}
              title={t.contact.title}
              subtitle={t.contact.subtitle}
              align="left"
            />

            <Reveal className="mt-8">
              <ul className="flex flex-col gap-4">
                {[
                  { icon: Phone, label: BUSINESS_PHONE_DISPLAY, href: `tel:${BUSINESS_PHONE}` },
                  { icon: Mail, label: BUSINESS_EMAIL, href: `mailto:${BUSINESS_EMAIL}` },
                  { icon: MapPin, label: 'Des Moines, Iowa', href: null },
                  { icon: Clock, label: t.contact.hours, href: null },
                ].map(({ icon: Icon, label, href }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                      <Icon className="size-5" />
                    </span>
                    {href ? (
                      <a href={href} className="font-semibold hover:text-primary">
                        {label}
                      </a>
                    ) : (
                      <span className="font-semibold">{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-8">
              <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
                <iframe
                  title={t.contact.mapTitle}
                  src="https://www.google.com/maps?q=Des%20Moines%2C%20Iowa&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0 grayscale-[0.2]"
                />
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={1}>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              {submitted ? (
                <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                  <span className="grid size-16 place-items-center rounded-full bg-accent text-primary">
                    <CheckCircle2 className="size-9" />
                  </span>
                  <p className="mt-6 max-w-sm text-pretty text-lg font-semibold">
                    {t.contact.success}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-full border border-border px-6 py-3 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
                  >
                    {t.contact.another}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.contact.name} error={errors.name?.message} htmlFor="name">
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder={t.contact.namePlaceholder}
                        aria-invalid={!!errors.name}
                        className={fieldClass}
                        {...register('name')}
                      />
                    </Field>
                    <Field label={t.contact.phone} error={errors.phone?.message} htmlFor="phone">
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder={t.contact.phonePlaceholder}
                        aria-invalid={!!errors.phone}
                        className={fieldClass}
                        {...register('phone')}
                      />
                    </Field>
                  </div>

                  <Field label={t.contact.email} error={errors.email?.message} htmlFor="email">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t.contact.emailPlaceholder}
                      aria-invalid={!!errors.email}
                      className={fieldClass}
                      {...register('email')}
                    />
                  </Field>

                  <Field label={t.contact.service} error={errors.service?.message} htmlFor="service">
                    <select
                      id="service"
                      aria-invalid={!!errors.service}
                      defaultValue=""
                      className={fieldClass}
                      {...register('service')}
                    >
                      <option value="" disabled>
                        {t.contact.servicePlaceholder}
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label={t.contact.message} error={errors.message?.message} htmlFor="message">
                    <textarea
                      id="message"
                      rows={4}
                      placeholder={t.contact.messagePlaceholder}
                      aria-invalid={!!errors.message}
                      className={`${fieldClass} resize-none`}
                      {...register('message')}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? t.contact.submitting : t.contact.submit}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
