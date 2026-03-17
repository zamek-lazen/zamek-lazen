'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { ContactSection } from './contact-section'
import { EventsSection } from './events-section'
import { FamilySection } from './family-section'
import { GallerySection } from './gallery-section'
import { Hero } from './hero'
import { HistorySection } from './history-section'
import { ImageBreak } from './image-break'
import { ParallaxScene } from './parallax-scene'
import { Story } from './story'
import { WeddingsSection } from './weddings-section'
import type { HomepageCopy, HomepageSpotlightLink, IntroPhase } from './types'

type HomepageProps = {
  copy: HomepageCopy
  spotlightLinks: HomepageSpotlightLink[]
}

type SceneStyle = CSSProperties & {
  '--intro-progress': string
  '--intro-reverse': string
  '--loader-progress': string
  '--mx': string
  '--my': string
  '--scroll': string
}

export function Homepage({ copy, spotlightLinks }: HomepageProps) {
  const [phase, setPhase] = useState<IntroPhase>('loading')
  const [progress, setProgress] = useState(0)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (phase === 'ready') {
      document.body.classList.remove('intro-lock')
      return
    }

    document.body.classList.add('intro-lock')

    return () => {
      document.body.classList.remove('intro-lock')
    }
  }, [phase])

  const sceneStyle = useMemo<SceneStyle>(
    () => ({
      '--intro-progress': '0',
      '--intro-reverse': '1',
      '--loader-progress': (progress / 100).toFixed(4),
      '--mx': '0',
      '--my': '0',
      '--scroll': '0',
    }),
    [progress],
  )

  return (
    <div
      ref={rootRef}
      className='relative left-1/2 right-1/2 -mt-28 min-w-screen max-w-screen w-screen -translate-x-1/2 overflow-x-hidden overflow-clip bg-[#082019] text-[#dfe8e0] md:-mt-32'
      style={sceneStyle}
    >
      <Hero
        heroRef={heroRef}
        loaderHint={copy.loaderHint}
        loaderLabel={copy.loaderLabel}
        phase={phase}
        progress={progress}
        scrollPrompt={copy.scrollPrompt}
        sideLeft={copy.sideLeft}
        sideRight={copy.sideRight}
      >
        <ParallaxScene
          heroRef={heroRef}
          phase={phase}
          rootRef={rootRef}
          setPhase={setPhase}
          setProgress={setProgress}
        />
      </Hero>

      <Story
        ctaContact={copy.ctaContact}
        ctaHistory={copy.ctaHistory}
        description={copy.description}
        eyebrow={copy.eyebrow}
        highlightsTitle={copy.highlightsTitle}
        lead={copy.lead}
        spotlightLinks={spotlightLinks}
        title={copy.title}
      />

      <HistorySection
        ctaHistory={copy.ctaHistory}
        factFour={copy.factFour}
        factOne={copy.factOne}
        factThree={copy.factThree}
        factTwo={copy.factTwo}
        historySection={copy.historySection}
      />

      <ImageBreak variant='garden' />

      <FamilySection familyProfile={copy.familyProfile} familySection={copy.familySection} />

      <WeddingsSection
        weddingProcessTitle={copy.weddingProcessTitle}
        weddingSteps={copy.weddingSteps}
        weddingVenues={copy.weddingVenues}
        weddingVenuesTitle={copy.weddingVenuesTitle}
        weddingsSection={copy.weddingsSection}
      />

      <ImageBreak variant='castle' />

      <section className='relative z-[3] bg-[linear-gradient(180deg,rgba(246,243,234,0.98),rgba(238,233,221,0.98))] px-[1.2rem] py-[clamp(3.2rem,8vw,6rem)] pb-[clamp(4rem,8vw,6.6rem)]'>
        <div className='mx-auto grid w-full max-w-[72rem] gap-[clamp(1.35rem,3.5vw,2.6rem)]'>
          <EventsSection
            eventsLead={copy.eventsLead}
            eventsNotice={copy.eventsNotice}
            eventsTitle={copy.eventsTitle}
          />
          <GallerySection
            ctaGallery={copy.ctaGallery}
            galleryLead={copy.galleryLead}
            galleryNotice={copy.galleryNotice}
            galleryTitle={copy.galleryTitle}
          />
        </div>
      </section>

      <ContactSection
        contact={copy.contact}
        contactLead={copy.contactLead}
        contactTitle={copy.contactTitle}
        ctaContact={copy.ctaContact}
      />
    </div>
  )
}
