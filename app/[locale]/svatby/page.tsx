import { getTranslations } from 'next-intl/server'
import { PageHero } from '@/components/shared/page-hero'

function toTelHref(value: string) {
  const phone = value.match(/\+?[\d\s]+$/)?.[0]?.replace(/\s+/g, '') ?? ''
  return phone ? `tel:${phone}` : null
}

export default async function WeddingsPage() {
  const [t, tContact] = await Promise.all([
    getTranslations('WeddingsPage'),
    getTranslations('ContactPage')
  ])

  const phone = tContact('phonePouza')
  const phoneHref = toTelHref(phone)
  const email = tContact('email')

  const contacts = [
    {
      label: tContact('phoneLabel'),
      value: phone,
      href: phoneHref ?? '#',
      action: t('callCta')
    },
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
    <div className='-mt-28 md:-mt-32'>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        lead={t('lead')}
      />

      <section className='editorial-surface-light px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'>
        <div className='mx-auto w-full max-w-376'>
          <div className=''>
            <p className='editorial-eyebrow editorial-eyebrow-light'>
              {t('whyEyebrow')}
            </p>
            <h2 className='editorial-title editorial-title-light mt-4'>
              {t('whyTitle')}
            </h2>
            <p className='editorial-body editorial-body-light mt-5 max-w-[60ch]'>
              {t('whyLead')}
            </p>
          </div>

          <div className='mt-10 grid gap-4 md:grid-cols-3'>
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className='editorial-card rounded-2xl p-6'
              >
                <h3 className='editorial-card-title editorial-card-title-light max-w-[14ch]'>
                  {reason.title}
                </h3>
                <p className='editorial-body editorial-body-light mt-4 text-[0.98rem]'>
                  {reason.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='editorial-surface-dark px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'>
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

          <div className='grid gap-4'>
            {steps.map((step, index) => (
              <article
                key={step.title}
                className='editorial-card-dark grid gap-4 rounded-2xl p-5 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-5 md:p-6'
              >
                <span className='editorial-eyebrow editorial-eyebrow-dark text-[0.75rem]'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className='editorial-card-title editorial-card-title-dark text-[2rem]'>
                    {step.title}
                  </h3>
                  <p className='editorial-body editorial-body-dark mt-3 max-w-[56ch] text-[0.98rem]'>
                    {step.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='editorial-surface-light px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'>
        <div className='mx-auto w-full max-w-376'>
          <div className=''>
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

          <div className='mt-10 grid gap-4 md:grid-cols-2'>
            {venues.map((venue) => (
              <article
                key={venue.title}
                className='editorial-card rounded-2xl p-6 md:p-7'
              >
                <h3 className='editorial-card-title editorial-card-title-light text-[clamp(2rem,3vw,2.8rem)]'>
                  {venue.title}
                </h3>
                <p className='editorial-body editorial-body-light mt-4 text-[0.98rem]'>
                  {venue.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='editorial-surface-dark border-t border-[rgba(185,212,197,0.12)] px-[1.2rem] py-[clamp(4rem,8vw,6rem)] md:px-8'>
        <div className='mx-auto grid w-full max-w-376 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end'>
          <div className='max-w-xl'>
            <p className='editorial-eyebrow editorial-eyebrow-dark'>
              {t('finalEyebrow')}
            </p>
            <h2 className='editorial-title editorial-title-dark mt-4 max-w-[10ch]'>
              {t('finalTitle')}
            </h2>
            <p className='editorial-body editorial-body-dark mt-5 max-w-[56ch]'>
              {t('finalBody')}
            </p>
          </div>

          <div className='grid gap-4'>
            {contacts.map((contact) => (
              <a
                key={contact.value}
                href={contact.href}
                className='editorial-card-dark block rounded-2xl p-6 transition-colors duration-200 hover:border-[rgba(255,253,242,0.28)] hover:bg-[rgba(254,252,232,0.08)]'
              >
                <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.75rem]'>
                  {contact.label}
                </p>
                <p className='editorial-card-title editorial-card-title-dark mt-3 text-[clamp(1.9rem,2.8vw,2.6rem)] wrap-break-word'>
                  {contact.value}
                </p>
                <span className='editorial-eyebrow editorial-eyebrow-dark mt-6 inline-flex border-b border-[rgba(255,253,242,0.32)] pb-1 text-[0.76rem]'>
                  {contact.action}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
