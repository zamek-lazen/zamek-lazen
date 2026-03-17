'use client'

import { useEffect, useState } from 'react'
import { Chapter } from './chapter'
import { Closing } from './closing'
import { Gallery } from './gallery'
import { Hero } from './hero'
import { TimelineNav } from './timeline-nav'
import type { HistoryPageCopy } from './types'

type HistoryPageContentProps = {
  copy: HistoryPageCopy
}

export function HistoryPageContent({ copy }: HistoryPageContentProps) {
  const [activeChapter, setActiveChapter] = useState(copy.chapters[0]?.id ?? '')

  useEffect(() => {
    const chapterNodes = copy.chapters
      .map(chapter => document.getElementById(chapter.id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement)

    if (chapterNodes.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]?.target instanceof HTMLElement) {
          setActiveChapter(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -30% 0px',
        threshold: [0.25, 0.45, 0.7],
      },
    )

    chapterNodes.forEach(node => observer.observe(node))

    return () => {
      observer.disconnect()
    }
  }, [copy.chapters])

  return (
    <div className='relative left-1/2 w-screen -translate-x-1/2 overflow-clip text-[var(--color-mist-100)]'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(188,163,122,0.12),transparent_28%),radial-gradient(circle_at_82%_10%,rgba(85,122,97,0.22),transparent_30%),linear-gradient(180deg,rgba(7,22,18,0.16),rgba(7,22,18,0.84))]' />

      <Hero
        facts={copy.facts}
        introLabel={copy.introLabel}
        introQuote={copy.introQuote}
        lead={copy.lead}
        scrollLabel={copy.scrollLabel}
        title={copy.title}
      />

      <section className='relative z-10 mx-auto grid w-full max-w-[88rem] gap-7 px-5 py-12 md:px-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16'>
        <TimelineNav
          activeChapter={activeChapter}
          chapters={copy.chapters}
          timelineHint={copy.timelineHint}
          timelineLabel={copy.timelineLabel}
        />

        <div className='grid gap-5'>
          {copy.chapters.map(chapter => (
            <Chapter key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </section>

      <section className='relative z-10 mx-auto grid w-full max-w-[88rem] gap-7 px-5 pb-24 pt-12 md:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16'>
        <Closing
          closingBody={copy.closingBody}
          closingDetail={copy.closingDetail}
          closingLabel={copy.closingLabel}
          closingTitle={copy.closingTitle}
          jumps={copy.jumps}
        />
        <Gallery
          galleryCaption1={copy.galleryCaption1}
          galleryCaption2={copy.galleryCaption2}
          galleryCaption3={copy.galleryCaption3}
          galleryLabel={copy.galleryLabel}
        />
      </section>
    </div>
  )
}
