import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

type Props = {
  kicker: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'center',
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl',
        className,
      )}
    >
      <Reveal>
        <span
          className={cn(
            'inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground',
            align === 'center' ? 'self-center' : 'self-start',
          )}
        >
          <span className="size-1.5 rounded-full bg-primary" />
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={2}>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
