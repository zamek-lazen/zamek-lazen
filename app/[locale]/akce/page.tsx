import Image from 'next/image'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/shared/json-ld'
import { RevealOnScroll, RevealStagger } from '@/components/motion'
import { PageHero } from '@/components/shared/page-hero'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/lib/seo/constants'
import { buildPageMetadata, getStaticPageUrl } from '@/lib/seo/metadata'
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  createJsonLdId
} from '@/lib/seo/schema'
import { formatEventDateTime, getEventsByStatus } from '@/sanity/lib/events'
import { urlFor } from '@/sanity/lib/image'

type EventsPageProps = {
  params: Promise<{
    locale: AppLocale
  }>
}

export async function generateMetadata({
  params
}: EventsPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'EventsPage' })

  return buildPageMetadata({
    locale,
    page: 'events',
    title: t('title'),
    description: t('lead')
  })
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'EventsPage' })
  const { pastEvents, upcomingEvents } = await getEventsByStatus(locale)
  const [featuredEvent, ...otherEvents] = upcomingEvents
  const pageUrl = getStaticPageUrl(locale, 'events')
  const pageSchema = [
    buildWebPageSchema({
      locale,
      name: t('title'),
      description: t('lead'),
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

  return (
    <>
      <JsonLd
        id={createJsonLdId(`events-${locale}`)}
        data={pageSchema}
      />
      <div className='-mt-28 md:-mt-32'>
        <PageHero
          eyebrow={t('eyebrow')}
          title={t('title')}
          lead={t('lead')}
        />

        <RevealOnScroll
          as='section'
          className='editorial-surface-light px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'
        >
          <div className='mx-auto flex w-full max-w-376 flex-col gap-8'>
            <div>
              <p className='editorial-eyebrow editorial-eyebrow-light text-[0.76rem]'>
                {t('upcomingLabel')}
              </p>
              <h2 className='editorial-title editorial-title-light mt-4'>
                {t('upcomingTitle')}
              </h2>
              <p className='editorial-body editorial-body-light mt-5 max-w-[100ch]'>
                {t('upcomingBody')}
              </p>
              <p className='editorial-body editorial-body-light mt-4 max-w-[100ch] whitespace-pre-line'>
                {t('upcomingNotice')}
              </p>
            </div>

            {featuredEvent ?
              <>
                <Link
                  href={{
                    pathname: '/akce/[slug]',
                    params: { slug: featuredEvent.slug }
                  }}
                  className='editorial-card group block h-full w-full overflow-hidden rounded-[1.35rem] transition-transform duration-200'
                >
                  <div
                    className={
                      featuredEvent.image ?
                        'grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]'
                      : 'block'
                    }
                  >
                    <div className='p-7 md:p-10'>
                      <p className='editorial-eyebrow editorial-eyebrow-light text-[0.96rem]'>
                        {formatEventDateTime(
                          featuredEvent.date,
                          locale,
                          featuredEvent.startTime
                        )}
                      </p>
                      <h2 className='editorial-subheading editorial-subheading-light mt-4'>
                        {featuredEvent.title}
                      </h2>
                      <p className='editorial-body editorial-body-light mt-6 text-justify whitespace-pre-line'>
                        {featuredEvent.description}
                      </p>
                      <span className='editorial-button editorial-button-outline mt-8 group-hover:border-[rgba(13,49,41,0.2)] group-hover:bg-mist-200'>
                        {t('detailCta')}
                      </span>
                    </div>

                    {featuredEvent.image ?
                      <div className='relative min-h-72 lg:min-h-full'>
                        <Image
                          src={urlFor(featuredEvent.image)
                            .width(1400)
                            .height(1200)
                            .url()}
                          alt={featuredEvent.title}
                          fill
                          sizes='(max-width: 1024px) 100vw, 40vw'
                          className='object-cover'
                        />
                      </div>
                    : null}
                  </div>
                </Link>

                {otherEvents.length > 0 ?
                  <RevealStagger className='grid gap-5 lg:grid-cols-2'>
                    {otherEvents.map((event) => (
                      <Link
                        key={event.id}
                        href={{
                          pathname: '/akce/[slug]',
                          params: { slug: event.slug }
                        }}
                        className='editorial-card group block h-full w-full overflow-hidden rounded-[1.2rem] transition-transform duration-200'
                      >
                        {event.image ?
                          <div className='relative h-120'>
                            <Image
                              src={urlFor(event.image)
                                .width(1200)
                                .height(800)
                                .url()}
                              alt={event.title}
                              fill
                              sizes='(max-width: 1024px) 100vw, 50vw'
                              className='object-cover'
                            />
                          </div>
                        : null}

                        <div className='p-7'>
                          <div>
                            <p className='editorial-eyebrow editorial-eyebrow-light text-[0.96rem]'>
                              {formatEventDateTime(
                                event.date,
                                locale,
                                event.startTime
                              )}
                            </p>
                            <h3 className='editorial-card-title editorial-card-title-light mt-4'>
                              {event.title}
                            </h3>
                            <p className='editorial-body editorial-body-light mt-5 text-justify whitespace-pre-line'>
                              {event.description}
                            </p>
                          </div>
                          <span className='editorial-button editorial-button-outline mt-7 group-hover:border-[rgba(13,49,41,0.2)] group-hover:bg-mist-200'>
                            {t('detailCta')}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </RevealStagger>
                : null}
              </>
            : <div className='editorial-card rounded-[1.25rem] p-8'>
                <p className='editorial-eyebrow editorial-eyebrow-light'>
                  {t('emptyLabel')}
                </p>
                <p className='editorial-subheading editorial-subheading-light mt-5 max-w-[28ch]'>
                  {t('emptyTitle')}
                </p>
                <p className='editorial-body editorial-body-light mt-5 max-w-[58ch]'>
                  {t('emptyBody')}
                </p>
              </div>
            }
          </div>
        </RevealOnScroll>

        <RevealOnScroll
          as='section'
          className='editorial-surface-dark px-[1.2rem] py-10 md:px-8'
        >
          <div className='mx-auto flex w-full max-w-376 flex-col gap-6'>
            <div>
              <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.76rem]'>
                {t('archiveLabel')}
              </p>
              <h2 className='editorial-title editorial-title-dark mt-4'>
                {t('archiveTitle')}
              </h2>
              <p className='editorial-body editorial-body-dark mt-5 max-w-152'>
                {t('archiveBody')}
              </p>
            </div>

            {pastEvents.length > 0 ?
              <RevealStagger className='grid gap-5 lg:grid-cols-2'>
                {pastEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={{
                      pathname: '/akce/[slug]',
                      params: { slug: event.slug }
                    }}
                    className='editorial-card-dark group block h-full w-full overflow-hidden rounded-[1.2rem] transition-transform duration-200 hover:border-[rgba(254,252,232,0.28)]'
                  >
                    {event.image ?
                      <div className='relative h-120'>
                        <Image
                          src={urlFor(event.image)
                            .width(1200)
                            .height(800)
                            .url()}
                          alt={event.title}
                          fill
                          sizes='(max-width: 1024px) 100vw, 50vw'
                          className='object-cover saturate-[0.88]'
                        />
                      </div>
                    : null}

                    <div className='p-7'>
                      <div className='flex flex-wrap items-center gap-3'>
                        <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.96rem]'>
                          {formatEventDateTime(
                            event.date,
                            locale,
                            event.startTime
                          )}
                        </p>
                      </div>
                      <h3 className='editorial-card-title editorial-card-title-dark mt-4'>
                        {event.title}
                      </h3>
                      <p className='editorial-body editorial-body-dark mt-5 whitespace-pre-line'>
                        {event.description}
                      </p>
                      <span className='editorial-button editorial-button-secondary mt-6 group-hover:border-[rgba(254,252,232,0.48)]'>
                        {t('pastDetailCta')}
                      </span>
                    </div>
                  </Link>
                ))}
              </RevealStagger>
            : <div className='editorial-card-dark rounded-[1.25rem] p-8 md:p-10'>
                <p className='editorial-eyebrow editorial-eyebrow-dark'>
                  {t('archiveEmptyLabel')}
                </p>
                <p className='editorial-subheading editorial-subheading-dark mt-5 max-w-[30ch]'>
                  {t('archiveEmptyTitle')}
                </p>
                <p className='editorial-body editorial-body-dark mt-5 max-w-[62ch]'>
                  {t('archiveEmptyBody')}
                </p>
              </div>
            }
          </div>
        </RevealOnScroll>
      </div>
    </>
  )
}
