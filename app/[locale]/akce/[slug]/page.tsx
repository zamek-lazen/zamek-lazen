import { ArrowLeftIcon } from '@sanity/icons'
import { getLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { RevealOnScroll } from '@/components/motion'
import { PortableTextContent } from '@/components/shared/portable-text'
import { PageHero } from '@/components/shared/page-hero'
import { SmsTicketEmbed } from '@/components/shared/smsticket-embed'
import { YouTubeEmbed } from '@/components/shared/youtube-embed'
import { Link } from '@/i18n/navigation'
import {
  formatEventDateTime,
  getEventBySlug,
  parseSmsTicketEmbedCode,
  parseYouTubeEmbedUrl
} from '@/sanity/lib/events'

type EventDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function EventDetailPage({
  params
}: EventDetailPageProps) {
  const { slug } = await params
  const locale = (await getLocale()) as 'cs' | 'de'
  const t = await getTranslations('EventDetailPage')
  const event = await getEventBySlug(locale, slug)

  if (!event) {
    notFound()
  }

  const eventDate = formatEventDateTime(event.date, locale, event.startTime)
  const hasTicketEmbed = Boolean(
    parseSmsTicketEmbedCode(event.smsticketEmbedCode)
  )
  const hasYouTubeEmbed = Boolean(parseYouTubeEmbedUrl(event.youtubeUrl))
  const hasRecap = Boolean(event.recap && event.recap.length > 0)

  return (
    <div className='-mt-28 md:-mt-32'>
      <PageHero
        eyebrow={event.isPast ? t('pastEyebrow') : t('eyebrow')}
        title={event.title}
        lead={eventDate}
        topContent={
          <Link
            href='/akce'
            className='editorial-eyebrow editorial-eyebrow-dark inline-flex min-h-10 items-center justify-center transition duration-200 hover:translate-x-[0.5%]'
          >
            <ArrowLeftIcon className='size-7 pr-2' />
            {t('backCta')}
          </Link>
        }
      />

      <RevealOnScroll
        as='section'
        className='editorial-surface-dark px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'
      >
        <div className='mx-auto grid w-full max-w-376 gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]'>
          <div className='editorial-card-dark rounded-[1.25rem] p-7 md:p-8'>
            <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.75rem]'>
              {event.isPast ? t('detailPastLabel') : t('detailLabel')}
            </p>
            <h2 className='editorial-subheading editorial-subheading-dark mt-5'>
              {event.isPast ? t('detailPastTitle') : t('detailTitle')}
            </h2>
            <p className='editorial-body editorial-body-dark mt-5 whitespace-pre-line'>
              {event.description}
            </p>
            {event.isPast && (
              <p className='editorial-body-subtle-dark mt-5'>
                {t('pastNotice')}
              </p>
            )}
          </div>

          {hasTicketEmbed && !event.isPast ?
            <div className='editorial-card-dark rounded-[1.25rem] p-7 md:p-8'>
              <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.75rem]'>
                {t('ticketsLabel')}
              </p>
              <h2 className='editorial-subheading editorial-subheading-dark mt-5'>
                {t('ticketsTitle')}
              </h2>
              <div className='mt-6'>
                <SmsTicketEmbed
                  embedCode={event.smsticketEmbedCode}
                  title={event.title}
                />
              </div>
            </div>
          : <div className='editorial-card-dark rounded-[1.25rem] p-7 md:p-8'>
              <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.75rem]'>
                {event.isPast ? t('pastLabel') : t('visitLabel')}
              </p>
              <h2 className='editorial-subheading editorial-subheading-dark mt-5'>
                {event.isPast ? t('pastTitle') : t('visitTitle')}
              </h2>
              <p className='editorial-body editorial-body-dark mt-5 max-w-[52ch]'>
                {event.isPast ? t('pastBody') : t('visitBody')}
              </p>
            </div>
          }
        </div>
      </RevealOnScroll>

      {(hasRecap || hasYouTubeEmbed) && event.isPast ?
        <RevealOnScroll
          as='section'
          className='editorial-surface-light px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'
        >
          <div className='mx-auto flex w-full max-w-376 flex-col gap-6'>
            <div className='grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end'>
              <div>
                <p className='editorial-eyebrow editorial-eyebrow-light text-[0.76rem]'>
                  {t('recapLabel')}
                </p>
                <h2 className='editorial-subheading editorial-subheading-light mt-4'>
                  {t('recapTitle')}
                </h2>
              </div>
              <p className='editorial-body editorial-body-light max-w-[38rem]'>
                {t('recapBody')}
              </p>
            </div>

            {hasRecap ?
              <div className='editorial-card rounded-[1.25rem] p-7 md:p-10'>
                <PortableTextContent value={event.recap ?? []} />
              </div>
            : null}

            {hasYouTubeEmbed ?
              <div className='flex flex-col gap-4'>
                <div>
                  <p className='editorial-eyebrow editorial-eyebrow-light text-[0.76rem]'>
                    {t('videoLabel')}
                  </p>
                  <h3 className='editorial-card-title editorial-card-title-light mt-4'>
                    {t('videoTitle')}
                  </h3>
                  <p className='editorial-body editorial-body-light mt-4 max-w-[44rem]'>
                    {t('videoBody')}
                  </p>
                </div>
                <YouTubeEmbed
                  youtubeUrl={event.youtubeUrl}
                  title={event.title}
                />
              </div>
            : null}
          </div>
        </RevealOnScroll>
      : null}
    </div>
  )
}
