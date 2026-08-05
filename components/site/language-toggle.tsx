'use client'

import { useLanguage } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-background/70 p-0.5 text-xs font-semibold',
        className,
      )}
      role="group"
      aria-label={t.common.languageLabel}
    >
      {(['en', 'es'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            'rounded-full px-3 py-1 uppercase tracking-wide transition-colors',
            lang === code
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
