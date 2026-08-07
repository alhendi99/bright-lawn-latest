import type { ElementType, ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'span'
}

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Tag = as as ElementType

  return (
    <Tag
      className={className ? `reveal ${className}` : 'reveal'}
      style={{ animationDelay: `${delay * 80}ms` }}
    >
      {children}
    </Tag>
  )
}
