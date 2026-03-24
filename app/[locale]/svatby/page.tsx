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

      <section className='bg-[linear-gradient(180deg,#f4efe4,#ece4d8)] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-[var(--color-forest-900)] md:px-8'>
        <div className='mx-auto w-full max-w-[94rem]'>
          <div className=''>
            <p className='font-sans text-[0.72rem] tracking-[0.22em] text-[rgba(19,52,45,0.48)] uppercase'>
              {t('whyEyebrow')}
            </p>
            <h2 className='mt-4 font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.96] tracking-[-0.025em] text-balance'>
              {t('whyTitle')}
            </h2>
            <p className='mt-5 font-sans text-[1rem] leading-[1.85] text-[rgba(19,52,45,0.74)]'>
              {t('whyLead')}
            </p>
          </div>

          <div className='mt-10 grid gap-4 md:grid-cols-3'>
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className='rounded-[1rem] border border-[rgba(19,52,45,0.08)] bg-[rgba(255,252,247,0.72)] p-6'
              >
                <h3 className='max-w-[14ch] font-serif text-[1.65rem] leading-[1.08] text-[rgba(19,52,45,0.94)]'>
                  {reason.title}
                </h3>
                <p className='mt-4 font-sans text-[0.98rem] leading-[1.8] text-[rgba(19,52,45,0.72)]'>
                  {reason.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-[linear-gradient(180deg,rgba(8,27,22,1),rgba(6,22,17,1))] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-[var(--color-mist-100)] md:px-8'>
        <div className='mx-auto grid w-full max-w-[94rem] gap-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-start'>
          <div className='max-w-[35rem]'>
            <p className='font-sans text-[0.72rem] tracking-[0.22em] text-[rgba(184,201,191,0.58)] uppercase'>
              {t('processEyebrow')}
            </p>
            <h2 className='mt-4 max-w-[10ch] font-serif text-[clamp(2.4rem,5vw,4.7rem)] leading-[0.95] tracking-[-0.025em] text-balance text-[rgba(241,245,239,0.97)]'>
              {t('processTitle')}
            </h2>
            <p className='mt-5 max-w-[58ch] font-sans text-[1rem] leading-[1.85] text-[rgba(203,218,209,0.78)]'>
              {t('processLead')}
            </p>
          </div>

          <div className='grid gap-4'>
            {steps.map((step, index) => (
              <article
                key={step.title}
                className='grid gap-4 rounded-[1rem] border border-[rgba(185,212,197,0.12)] bg-[rgba(242,246,241,0.04)] p-5 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-5 md:p-6'
              >
                <span className='font-sans text-[0.72rem] tracking-[0.22em] text-[rgba(184,201,191,0.56)] uppercase'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className='font-serif text-[1.55rem] leading-[1.1] text-[rgba(241,245,239,0.96)]'>
                    {step.title}
                  </h3>
                  <p className='mt-3 max-w-[56ch] font-sans text-[0.98rem] leading-[1.8] text-[rgba(203,218,209,0.76)]'>
                    {step.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-[linear-gradient(180deg,#f5f1e8,#ede4d7)] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-[var(--color-forest-900)] md:px-8'>
        <div className='mx-auto w-full max-w-[94rem]'>
          <div className=''>
            <p className='font-sans text-[0.72rem] tracking-[0.22em] text-[rgba(19,52,45,0.48)] uppercase'>
              {t('venueEyebrow')}
            </p>
            <h2 className='mt-4 font-serif text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.96] tracking-[-0.025em] text-balance'>
              {t('venueTitle')}
            </h2>
            <p className='mt-5 max-w-[60ch] font-sans text-[1rem] leading-[1.85] text-[rgba(19,52,45,0.74)]'>
              {t('venueLead')}
            </p>
          </div>

          <div className='mt-10 grid gap-4 md:grid-cols-2'>
            {venues.map((venue) => (
              <article
                key={venue.title}
                className='rounded-[1rem] border border-[rgba(19,52,45,0.08)] bg-[rgba(255,252,247,0.78)] p-6 md:p-7'
              >
                <h3 className='font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.04] text-[rgba(19,52,45,0.94)]'>
                  {venue.title}
                </h3>
                <p className='mt-4 font-sans text-[0.98rem] leading-[1.8] text-[rgba(19,52,45,0.72)]'>
                  {venue.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='border-t border-[rgba(185,212,197,0.12)] bg-[linear-gradient(180deg,rgba(13,49,41,0.98),rgba(6,22,17,1))] px-[1.2rem] py-[clamp(4rem,8vw,6rem)] text-[var(--color-mist-100)] md:px-8'>
        <div className='mx-auto grid w-full max-w-[94rem] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end'>
          <div className='max-w-[36rem]'>
            <p className='font-sans text-[0.72rem] tracking-[0.22em] text-[rgba(184,201,191,0.58)] uppercase'>
              {t('finalEyebrow')}
            </p>
            <h2 className='mt-4 max-w-[10ch] font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.025em] text-balance text-[rgba(241,245,239,0.97)]'>
              {t('finalTitle')}
            </h2>
            <p className='mt-5 max-w-[56ch] font-sans text-[1rem] leading-[1.85] text-[rgba(203,218,209,0.78)]'>
              {t('finalBody')}
            </p>
          </div>

          <div className='grid gap-4'>
            {contacts.map((contact) => (
              <a
                key={contact.value}
                href={contact.href}
                className='block rounded-[1rem] border border-[rgba(185,212,197,0.16)] bg-[rgba(242,246,241,0.05)] p-6 transition-colors duration-200 hover:border-[rgba(221,231,223,0.34)] hover:bg-[rgba(242,246,241,0.08)]'
              >
                <p className='font-sans text-[0.68rem] tracking-[0.2em] text-[rgba(184,201,191,0.62)] uppercase'>
                  {contact.label}
                </p>
                <p className='mt-3 font-serif text-[clamp(1.55rem,2.8vw,2.25rem)] leading-[1.08] break-words text-[rgba(241,245,239,0.97)]'>
                  {contact.value}
                </p>
                <span className='mt-6 inline-flex border-b border-[rgba(221,231,223,0.32)] pb-1 font-sans text-[0.75rem] tracking-[0.16em] text-[rgba(229,236,230,0.82)] uppercase'>
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
