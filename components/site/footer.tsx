'use client'

import type { SVGProps } from 'react'
import { useLanguage } from '@/lib/i18n'
import { BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY } from '@/lib/seo'
import { Logo } from './logo'

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2h3.3l-7.2 8.24L23.5 22h-6.6l-5.18-6.77L5.8 22H2.5l7.7-8.8L2 2h6.77l4.68 6.19L18.9 2Zm-1.16 18h1.83L7.34 3.9H5.38L17.74 20Z" />
    </svg>
  )
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.5 6.5a3 3 0 0 0-2.1-2.12C19.55 3.9 12 3.9 12 3.9s-7.55 0-9.4.48A3 3 0 0 0 .5 6.5C0 8.35 0 12 0 12s0 3.65.5 5.5a3 3 0 0 0 2.1 2.12C4.45 20.1 12 20.1 12 20.1s7.55 0 9.4-.48a3 3 0 0 0 2.1-2.12C24 15.65 24 12 24 12s0-3.65-.5-5.5ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  )
}

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const quickLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#work', label: t.nav.work },
    { href: '#reviews', label: t.nav.reviews },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ]

  const services = [
    t.services.items.lawn.name,
    t.services.items.snow.name,
    t.services.items.leaf.name,
    t.services.items.yard.name,
    t.services.items.landscaping.name,
  ]

  const socials = [
    { icon: FacebookIcon, label: 'Facebook' },
    { icon: InstagramIcon, label: 'Instagram' },
    { icon: XIcon, label: 'X' },
    { icon: YoutubeIcon, label: 'YouTube' },
  ]

  return (
    <footer className="border-t border-border bg-brand-deep text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-6">
            <Logo className="[&_span:last-child]:text-primary-foreground [&_.text-primary]:text-primary-foreground/70" />
            <p className="mt-4 max-w-xs text-pretty leading-relaxed text-primary-foreground/70">
              {t.footer.tagline}
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-foreground/60">
              {t.footer.quickLinks}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-foreground/60">
              {t.footer.ourServices}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-foreground/60">
              {t.footer.contact}
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-primary-foreground/80">
              <li>
                <a href={`tel:${BUSINESS_PHONE}`} className="hover:text-primary-foreground">
                  {BUSINESS_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-primary-foreground">
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li>Des Moines, Iowa</li>
              <li>{t.contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/60 sm:flex-row">
          <p>
            &copy; {year} Bright Lawn. {t.footer.rights}
          </p>
          <p>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  )
}
