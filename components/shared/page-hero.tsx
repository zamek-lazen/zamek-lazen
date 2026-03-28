import { RevealOnScroll } from '@/components/motion'

type PageHeroProps = {
  eyebrow?: string
  title: string
  lead: string
  topContent?: React.ReactNode
}

export function PageHero({ lead, title, topContent }: PageHeroProps) {
  return (
    <RevealOnScroll
      as='section'
      className='editorial-surface-dark px-[1.2rem] pt-28 pb-16 md:px-8'
    >
      <div className='mx-auto w-full max-w-376'>
        {topContent && <div className='mb-5'>{topContent}</div>}
        <h1 className='editorial-title editorial-title-dark mt-4'>{title}</h1>
        <p className='editorial-lead editorial-lead-dark mt-5'>{lead}</p>
      </div>
    </RevealOnScroll>
  )
}
