import Image from 'next/image'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/shared/json-ld'
import { RevealOnScroll, RevealStagger } from '@/components/motion'
import { PageHero } from '@/components/shared/page-hero'
import { toTelHref } from '@/lib/tel-href'
import type { AppLocale } from '@/lib/seo/constants'
import { buildPageMetadata, getStaticPageUrl } from '@/lib/seo/metadata'
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  createJsonLdId
} from '@/lib/seo/schema'
import { getSiteContactPeople } from '@/sanity/lib/site-settings'

const YOUTUBE_VIDEO_ID = 'Auv5dDb28gk'

type WeddingsPageProps = {
  params: Promise<{
    locale: AppLocale
  }>
}

export async function generateMetadata({
  params
}: WeddingsPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'WeddingsPage' })

  return buildPageMetadata({
    locale,
    page: 'weddings',
    title: t('title'),
    description: `${t('lead')} ${t('whyLead')}`
  })
}

export default async function WeddingsPage({
  params
}: WeddingsPageProps) {
  const { locale } = await params

  const [t, tContact] = await Promise.all([
    getTranslations({ locale, namespace: 'WeddingsPage' }),
    getTranslations({ locale, namespace: 'ContactPage' })
  ])

  const contactPeople = await getSiteContactPeople(locale)
  const email = tContact('email')
  const pageUrl = getStaticPageUrl(locale, 'weddings')
  const pageSchema = [
    buildWebPageSchema({
      locale,
      name: t('title'),
      description: `${t('lead')} ${t('whyLead')}`,
      url: pageUrl
    }),
    buildBreadcrumbSchema([
      {
        name: locale === 'de' ? 'Start' : 'Úvod',
        url: getStaticPageUrl(locale, 'home')
      },
      {
        name: t('title'),
        url: pageUrl
      }
    ])
  ]

  const contacts = [
    ...contactPeople.map((person) => ({
      label: person.name,
      value: person.phone,
      href: toTelHref(person.phone) ?? '#',
      action: t('callCta')
    })),
    {
      label: tContact('emailLabel'),
      value: email,
      href: `mailto:${email}`,
      action: t('mailCta')
    }
  ]

  const reasons = [
    {
      title: t('reason1Title'),
      body: t('reason1Body')
    },
    {
      title: t('reason2Title'),
      body: t('reason2Body')
    },
    {
      title: t('reason3Title'),
      body: t('reason3Body')
    }
  ]

  const steps = [
    {
      title: t('step1Title'),
      body: t('step1Body')
    },
    {
      title: t('step2Title'),
      body: t('step2Body')
    },
    {
      title: t('step3Title'),
      body: t('step3Body')
    },
    {
      title: t('step4Title'),
      body: t('step4Body')
    }
  ]

  const venues = [
    {
      title: t('venue1Title'),
      body: t('venue1Body')
    },
    {
      title: t('venue2Title'),
      body: t('venue2Body')
    }
  ]

  return (
    <>
      <JsonLd
        id={createJsonLdId(`weddings-${locale}`)}
        data={pageSchema}
      />
      <div className='-mt-28 md:-mt-32'>
        <PageHero
          eyebrow={t('eyebrow')}
          title={t('title')}
          lead={t('lead')}
        />

      {/* Video atmosphere section */}
      <RevealOnScroll
        as='section'
        className='editorial-surface-dark border-t border-[rgba(185,212,197,0.08)] px-[1.2rem] py-[clamp(3rem,6vw,5rem)] md:px-8'
      >
        <div className='mx-auto w-full max-w-376'>
          <div className='mx-auto max-w-[52rem]'>
            <p className='editorial-eyebrow editorial-eyebrow-dark mb-6 text-center'>
              {t('videoEyebrow')}
            </p>
            <div className='relative aspect-video w-full overflow-hidden rounded-xl shadow-[0_32px_80px_rgba(0,0,0,0.35)]'>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&color=white&autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}`}
                title={t('videoTitle')}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
                className='absolute inset-0 h-full w-full border-0'
              />
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Why here */}
      <RevealOnScroll
        as='section'
        className='editorial-surface-light px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'
      >
        <div className='mx-auto w-full max-w-376'>
          <div className='grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] lg:gap-16'>
            <div>
              <p className='editorial-eyebrow editorial-eyebrow-light'>
                {t('whyEyebrow')}
              </p>
              <h2 className='editorial-title editorial-title-light mt-4'>
                {t('whyTitle')}
              </h2>
              <p className='editorial-body editorial-body-light mt-5 max-w-[60ch]'>
                {t('whyLead')}
              </p>

              <RevealStagger className='mt-10 grid gap-4'>
                {reasons.map((reason) => (
                  <article
                    key={reason.title}
                    className='editorial-card rounded-2xl p-6'
                  >
                    <h3 className='editorial-card-title editorial-card-title-light max-w-[14ch]'>
                      {reason.title}
                    </h3>
                    <p className='editorial-body editorial-body-light mt-4'>
                      {reason.body}
                    </p>
                  </article>
                ))}
              </RevealStagger>
            </div>

            <div className='hidden lg:block'>
              <div className='relative aspect-[3/4] overflow-hidden rounded-xl shadow-[0_24px_64px_rgba(15,33,28,0.14)]'>
                <Image
                  src='/images/wedding/1.webp'
                  alt={t('whyImageAlt')}
                  fill
                  sizes='30vw'
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Process */}
      <RevealOnScroll
        as='section'
        className='editorial-surface-dark px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'
      >
        <div className='mx-auto grid w-full max-w-376 gap-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-start'>
          <div className='max-w-140'>
            <p className='editorial-eyebrow editorial-eyebrow-dark'>
              {t('processEyebrow')}
            </p>
            <h2 className='editorial-title editorial-title-dark mt-4'>
              {t('processTitle')}
            </h2>
            <p className='editorial-body editorial-body-dark mt-5 max-w-[58ch]'>
              {t('processLead')}
            </p>
          </div>

          <RevealStagger className='grid gap-4'>
            {steps.map((step, index) => (
              <article
                key={step.title}
                className='editorial-card-dark grid gap-4 rounded-2xl p-5 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-5 md:p-6'
              >
                <span className='editorial-eyebrow editorial-eyebrow-dark text-[0.75rem]'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className='editorial-card-title editorial-card-title-dark'>
                    {step.title}
                  </h3>
                  <p className='editorial-body editorial-body-dark mt-3 max-w-[56ch]'>
                    {step.body}
                  </p>
                </div>
              </article>
            ))}
          </RevealStagger>
        </div>
      </RevealOnScroll>

      {/* Venues with photos */}
      <RevealOnScroll
        as='section'
        className='editorial-surface-light px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'
      >
        <div className='mx-auto w-full max-w-376'>
          <div>
            <p className='editorial-eyebrow editorial-eyebrow-light'>
              {t('venueEyebrow')}
            </p>
            <h2 className='editorial-title editorial-title-light mt-4'>
              {t('venueTitle')}
            </h2>
            <p className='editorial-body editorial-body-light mt-5 max-w-[60ch]'>
              {t('venueLead')}
            </p>
          </div>

          <RevealStagger className='mt-10 grid gap-4 md:grid-cols-2'>
            {venues.map((venue) => (
              <article
                key={venue.title}
                className='editorial-card rounded-2xl p-6 md:p-7'
              >
                <h3 className='editorial-card-title editorial-card-title-light'>
                  {venue.title}
                </h3>
                <p className='editorial-body editorial-body-light mt-4'>
                  {venue.body}
                </p>
              </article>
            ))}
          </RevealStagger>
        </div>
      </RevealOnScroll>

      {/* Inspiration strip */}
      <RevealOnScroll
        as='section'
        className='editorial-surface-dark border-t border-[rgba(185,212,197,0.08)] px-[1.2rem] py-[clamp(3rem,6vw,5rem)] md:px-8'
      >
        <div className='mx-auto w-full max-w-376'>
          <RevealStagger className='grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4'>
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className='relative aspect-[3/4] overflow-hidden rounded-lg shadow-[0_16px_48px_rgba(0,0,0,0.25)]'
              >
                <Image
                  src={`/images/wedding/${n}.webp`}
                  alt={t('inspirationImageAlt', { number: n })}
                  fill
                  sizes='(max-width: 640px) 50vw, 25vw'
                  className='object-cover'
                />
              </div>
            ))}
          </RevealStagger>
        </div>
      </RevealOnScroll>

      {/* Final CTA + contact */}
      <RevealOnScroll
        as='section'
        className='editorial-surface-dark border-t border-[rgba(185,212,197,0.12)] px-[1.2rem] py-[clamp(4rem,8vw,6.5rem)] md:px-8'
      >
        <div className='mx-auto w-full max-w-376'>
          <div className='mx-auto max-w-[40rem] text-center lg:mx-0 lg:max-w-[44rem] lg:text-left'>
            <p className='editorial-eyebrow editorial-eyebrow-dark'>
              {t('finalEyebrow')}
            </p>
            <h2 className='editorial-title editorial-title-dark mt-5'>
              {t('finalTitle')}
            </h2>
            <p className='editorial-lead editorial-lead-dark mx-auto mt-6 max-w-[42ch] lg:mx-0'>
              {t('finalBody')}
            </p>
          </div>

          <RevealStagger className='mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:gap-6'>
            {contacts.map((contact) => (
              <a
                key={`${contact.label}-${contact.value}`}
                href={contact.href}
                className='editorial-card-dark group flex flex-col rounded-2xl p-7 transition-[transform,box-shadow,border-color,background-color] duration-200 hover:border-[rgba(255,253,242,0.28)] hover:bg-[rgba(254,252,232,0.08)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.2)] md:p-8'
              >
                <span className='editorial-eyebrow editorial-eyebrow-dark text-[0.72rem]'>
                  {contact.label}
                </span>
                <span className='mt-4 font-sans text-[1.0625rem] leading-snug font-medium wrap-break-word text-[rgba(254,252,232,0.95)] sm:text-[1.125rem]'>
                  {contact.value}
                </span>
                <span className='editorial-button editorial-button-secondary mt-6 w-fit px-5 py-2.5 text-[0.72rem] group-hover:border-[rgba(255,253,242,0.52)]'>
                  {contact.action}
                </span>
              </a>
            ))}
          </RevealStagger>
        </div>
      </RevealOnScroll>
      </div>
    </>
  )
}
