import { getLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/shared/page-hero'
import { SmsTicketEmbed } from '@/components/shared/smsticket-embed'
import { Link } from '@/i18n/navigation'
import {
  formatEventDate,
  getEventBySlug,
  parseSmsTicketEmbedCode
} from '@/sanity/lib/events'
import { ArrowLeftIcon } from '@sanity/icons'

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

  const eventDate = formatEventDate(event.date, locale)
  const hasEmbed = Boolean(parseSmsTicketEmbedCode(event.smsticketEmbedCode))

  return (
    <div className='-mt-28 md:-mt-32'>
      <PageHero
        title={event.title}
        lead={eventDate}
        topContent={
          <Link
            href='/akce'
            className='inline-flex min-h-10 items-center justify-center font-sans text-[0.68rem] tracking-[0.18em] text-[rgba(231,238,232,0.9)] uppercase transition duration-200 hover:translate-x-[0.5%]'
          >
            <ArrowLeftIcon className='size-7 pr-2' />
            {t('backCta')}
          </Link>
        }
      />

      <section className='bg-[linear-gradient(180deg,rgba(10,37,31,0.98),rgba(15,54,46,0.98))] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-(--color-mist-100) md:px-8'>
        <div className='mx-auto flex w-full max-w-376 flex-col gap-6'>
          {hasEmbed ?
            <div className='flex flex-col gap-4'>
              <SmsTicketEmbed
                embedCode={event.smsticketEmbedCode}
                title={event.title}
              />
            </div>
          : null}
        </div>
      </section>
    </div>
  )
}
