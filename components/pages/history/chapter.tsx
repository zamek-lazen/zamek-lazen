import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { HistoryChapter } from './types'

const chapterFrameStyles: Record<HistoryChapter['tone'], CSSProperties> = {
  sepia: { boxShadow: 'inset 0 0 0 100vmax rgba(195, 171, 130, 0.05)' },
  stone: { boxShadow: 'inset 0 0 0 100vmax rgba(166, 176, 165, 0.05)' },
  forest: { boxShadow: 'inset 0 0 0 100vmax rgba(87, 132, 97, 0.05)' },
  ember: { boxShadow: 'inset 0 0 0 100vmax rgba(210, 161, 115, 0.06)' },
}

type ChapterProps = {
  chapter: HistoryChapter
}

export function Chapter({ chapter }: ChapterProps) {
  return (
    <section
      id={chapter.id}
      className='grid min-h-0 items-center gap-6 lg:min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] lg:gap-10'
    >
      <div className='lg:sticky lg:top-[6.7rem]'>
        <div
          className='relative min-h-[26rem] overflow-hidden border border-[rgba(240,229,209,0.18)] bg-[rgba(10,19,16,0.65)] after:pointer-events-none after:absolute after:inset-0 after:border after:border-[rgba(255,255,255,0.06)] after:content-[""] lg:min-h-[min(74svh,44rem)]'
          style={chapterFrameStyles[chapter.tone]}
        >
          <Image
            src={chapter.image}
            alt={chapter.imageAlt}
            fill
            sizes='(max-width: 900px) 100vw, 44vw'
            className={[
              'object-cover',
              chapter.tone === 'sepia' || chapter.tone === 'stone'
                ? 'grayscale-[0.22] sepia-[0.28]'
                : '',
            ].join(' ')}
          />
        </div>
        <p className='pt-4 text-[0.96rem] leading-[1.65] text-[rgba(221,231,223,0.62)]'>
          {chapter.detail}
        </p>
      </div>

      <div className='py-4 lg:py-12'>
        <span className='mb-5 inline-block text-[0.82rem] uppercase tracking-[0.22em] text-[rgba(221,231,223,0.64)]'>
          {chapter.year}
        </span>
        <h2 className='font-serif text-[clamp(2.1rem,4vw,4.2rem)] leading-[0.98] font-medium'>
          {chapter.title}
        </h2>
        <p className='mt-5 text-[1rem] leading-[1.9] text-[rgba(221,231,223,0.84)]'>
          {chapter.body}
        </p>
        <aside className='mt-6 border-t border-[rgba(221,231,223,0.14)] pt-5 text-[0.97rem] leading-[1.7] text-[rgba(244,234,215,0.84)]'>
          {chapter.note}
        </aside>
      </div>
    </section>
  )
}
