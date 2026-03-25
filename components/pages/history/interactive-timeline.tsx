'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { REVEAL_EASE } from '@/components/motion/constants'
import { RevealStagger } from '@/components/motion'

type HistoryImage = {
  alt: string
  caption: string
  objectPosition?: string
  src: string
}

type HistoryChapter = {
  body: string
  detail: string
  id: string
  images: readonly [HistoryImage, HistoryImage]
  navLabel: string
  note: string
  title: string
  year: string
}

type HistoryInteractiveTimelineProps = {
  chapters: readonly HistoryChapter[]
  introLabel: string
  paragraphs: string[]
  timelineLabel: string
}

export function HistoryInteractiveTimeline({
  chapters,
  introLabel,
  paragraphs,
  timelineLabel
}: HistoryInteractiveTimelineProps) {
  const reduceMotion = useReducedMotion() ?? false
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? '')
  const layoutRef = useRef<HTMLDivElement | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  useEffect(() => {
    if (chapters.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const nextEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (entryA, entryB) =>
              entryB.intersectionRatio - entryA.intersectionRatio
          )[0]

        if (nextEntry?.target.id) {
          setActiveId(nextEntry.target.id)
        }
      },
      {
        rootMargin: '-18% 0px -50% 0px',
        threshold: [0.2, 0.35, 0.5, 0.75]
      }
    )

    for (const item of chapters) {
      const node = sectionRefs.current[item.id]

      if (node) {
        observer.observe(node)
      }
    }

    return () => observer.disconnect()
  }, [chapters])

  useEffect(() => {
    let frameId = 0

    const updateRailOffset = () => {
      frameId = 0

      const layout = layoutRef.current
      const rail = railRef.current

      if (!layout || !rail) {
        return
      }

      if (window.innerWidth < 1024) {
        rail.style.transform = ''
        return
      }

      const layoutTop = layout.getBoundingClientRect().top + window.scrollY
      const layoutHeight = layout.offsetHeight
      const railHeight = rail.offsetHeight
      const topOffset = 112
      const maxOffset = Math.max(0, layoutHeight - railHeight)
      const nextOffset = Math.max(
        0,
        Math.min(window.scrollY + topOffset - layoutTop, maxOffset)
      )

      rail.style.transform = nextOffset > 0 ? `translateY(${nextOffset}px)` : ''
    }

    const onScroll = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(updateRailOffset)
    }

    updateRailOffset()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const scrollToChapter = (chapterId: string) => {
    document.getElementById(chapterId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    setActiveId(chapterId)
  }

  return (
    <div className='editorial-surface-light'>
      <section className='px-[1.2rem] py-[clamp(4rem,7vw,7rem)] md:px-8'>
        <div
          ref={layoutRef}
          className='mx-auto w-full max-w-376 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-14'
        >
          <aside className='hidden lg:block lg:self-start'>
            <div
              ref={railRef}
              className='lg:will-change-transform'
            >
              <p className='editorial-eyebrow editorial-eyebrow-light'>
                {timelineLabel}
              </p>

              <div className='mt-8 border-l border-[rgba(19,52,45,0.14)] pl-3'>
                <div className='flex gap-3 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible'>
                  {chapters.map((item) => {
                    const isActive = item.id === activeId

                    return (
                      <button
                        key={item.id}
                        type='button'
                        onClick={() => scrollToChapter(item.id)}
                        className={`relative min-w-fit pl-4 text-left lg:block lg:w-full ${
                          isActive ?
                            'text-[var(--color-forest-900)]'
                          : 'text-[rgba(19,52,45,0.58)] hover:text-[rgba(13,49,41,0.88)]'
                        }`}
                      >
                        <span
                          className={`absolute top-[0.55rem] left-[-1.1rem] h-2.5 w-2.5 rounded-full border ${
                            isActive ?
                              'border-[var(--color-forest-900)] bg-[var(--color-forest-900)]'
                            : 'border-[rgba(19,52,45,0.24)] bg-[#ece4d8]'
                          }`}
                        />
                        {item.year ?
                          <span className='font-sans text-[0.8125rem] font-bold tracking-[0.14em] text-[rgba(13,49,41,0.78)] uppercase'>
                            {item.year}
                          </span>
                        : null}
                        <span className='mt-1 block font-sans text-[0.9375rem] font-semibold leading-snug'>
                          {item.navLabel}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>

          <div className='space-y-10 md:space-y-14'>
            <section className='border-b border-[rgba(19,52,45,0.12)] pb-10 md:pb-12'>
              <p className='editorial-eyebrow editorial-eyebrow-light'>
                {introLabel}
              </p>
              <RevealStagger className='mt-5 flex flex-col gap-5'>
                {paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className='editorial-body editorial-body-light max-w-[64ch]'
                  >
                    {paragraph}
                  </p>
                ))}
              </RevealStagger>
            </section>

            {chapters.map((chapter) => (
              <motion.article
                key={chapter.id}
                className='scroll-mt-28 border-b border-[rgba(19,52,45,0.12)] pb-10 md:pb-14'
                id={chapter.id}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                ref={(node) => {
                  sectionRefs.current[chapter.id] = node
                }}
                transition={{ duration: reduceMotion ? 0.01 : 0.72, ease: REVEAL_EASE }}
                viewport={{ once: true, margin: '-72px 0px -14% 0px', amount: 0.1 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              >
                <p className='editorial-eyebrow editorial-eyebrow-light'>
                  {chapter.year}
                </p>
                <h2 className='editorial-title editorial-title-light mt-3'>
                  {chapter.title}
                </h2>
                <p className='editorial-body editorial-body-light mt-5 max-w-[64ch]'>
                  {chapter.body}
                </p>
                <p className='editorial-note editorial-note-light mt-4 max-w-[58ch]'>
                  {chapter.note}
                </p>
                <p className='editorial-body editorial-body-light mt-3 max-w-[58ch]'>
                  {chapter.detail}
                </p>

                <div className='mt-8 grid gap-4 md:grid-cols-2'>
                  {chapter.images.map((image, imageIndex) => (
                    <figure
                      key={image.src}
                      className='space-y-3'
                    >
                      <div
                        className={`relative overflow-hidden rounded-[1.2rem] bg-[rgba(19,52,45,0.08)] ${
                          imageIndex === 0 ? 'aspect-[1.18]' : 'aspect-[0.9]'
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes='(max-width: 767px) 100vw, 50vw'
                          className='object-cover'
                          style={{
                            objectPosition: image.objectPosition ?? '50% 50%'
                          }}
                        />
                      </div>
                      <figcaption className='editorial-body editorial-body-light text-[0.9375rem] leading-[1.55]'>
                        {image.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
