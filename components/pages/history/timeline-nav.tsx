import type { HistoryChapter, HistoryPageCopy } from './types'

type TimelineNavProps = {
  activeChapter: string
  chapters: HistoryChapter[]
} & Pick<HistoryPageCopy, 'timelineHint' | 'timelineLabel'>

export function TimelineNav({
  activeChapter,
  chapters,
  timelineHint,
  timelineLabel,
}: TimelineNavProps) {
  return (
    <aside className='sticky top-[4.7rem] z-20 -mx-1 bg-[linear-gradient(180deg,rgba(6,18,14,0.96),rgba(6,18,14,0.76))] px-1 backdrop-blur-[12px] lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none'>
      <div className='py-4 lg:sticky lg:top-[7.5rem] lg:pt-4'>
        <p className='text-[0.84rem] uppercase tracking-[0.2em] text-[rgba(221,231,223,0.78)]'>
          {timelineLabel}
        </p>
        <p className='mb-4 mt-3 max-w-[16rem] text-[0.94rem] leading-[1.55] text-[rgba(221,231,223,0.58)]'>
          {timelineHint}
        </p>

        <nav
          className='relative grid auto-cols-[minmax(11rem,1fr)] grid-flow-col gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid-flow-row lg:gap-[0.7rem] lg:overflow-visible lg:pb-0 lg:pl-[1.1rem] lg:before:absolute lg:before:bottom-[0.15rem] lg:before:left-0 lg:before:top-[0.15rem] lg:before:w-px lg:before:bg-[rgba(221,231,223,0.16)] lg:before:content-[""]'
          aria-label={timelineLabel}
        >
          {chapters.map(chapter => {
            const isActive = chapter.id === activeChapter

            return (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className={[
                  'relative grid gap-1 border border-[rgba(221,231,223,0.16)] bg-[rgba(11,23,19,0.72)] px-4 py-4 text-[rgba(221,231,223,0.52)] transition-colors lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:pl-[1.1rem] lg:before:absolute lg:before:left-[-0.28rem] lg:before:top-[0.42rem] lg:before:h-[0.58rem] lg:before:w-[0.58rem] lg:before:rounded-full lg:before:border lg:before:border-[rgba(221,231,223,0.24)] lg:before:bg-[#081712] lg:before:content-[""]',
                  isActive
                    ? 'text-[rgba(244,247,244,0.96)] lg:before:border-[rgba(244,234,215,0.6)] lg:before:bg-[#f4ead7]'
                    : 'hover:text-[rgba(244,247,244,0.96)]',
                ].join(' ')}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className='text-[0.78rem] uppercase tracking-[0.16em]'>{chapter.year}</span>
                <strong className='text-[0.98rem] font-medium'>{chapter.navLabel}</strong>
              </a>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
