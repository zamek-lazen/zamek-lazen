import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { LocalizedEvent } from '@/types'

type PortableTextContentProps = {
  value: NonNullable<LocalizedEvent['recap']>
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className='editorial-body editorial-body-light text-[1rem] leading-[1.9]'>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className='editorial-card-title editorial-card-title-light mt-10 text-[clamp(1.95rem,3vw,2.8rem)] first:mt-0'>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className='mt-8 font-sans text-[1.05rem] font-semibold tracking-[0.08em] text-[rgba(13,49,41,0.82)] uppercase first:mt-0'>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className='border-l border-[rgba(13,49,41,0.18)] pl-5 font-serif text-[1.2rem] leading-[1.6] text-[rgba(13,49,41,0.82)] italic'>
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className='editorial-body editorial-body-light list-disc space-y-2 pl-6 text-[1rem] leading-[1.8]'>
        {children}
      </ul>
    )
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : undefined

      if (!href) {
        return <>{children}</>
      }

      return (
        <a
          href={href}
          target='_blank'
          rel='noreferrer'
          className='underline decoration-[rgba(13,49,41,0.35)] underline-offset-4 transition hover:decoration-[rgba(13,49,41,0.7)]'
        >
          {children}
        </a>
      )
    }
  }
}

export function PortableTextContent({ value }: PortableTextContentProps) {
  return (
    <div className='flex flex-col gap-5'>
      <PortableText
        value={value}
        components={components}
      />
    </div>
  )
}
