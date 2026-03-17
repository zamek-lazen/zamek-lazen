import { Link } from '@/i18n/navigation'
import type { HomepageCopy } from './types'

const toTelHref = (value: string) => `tel:${value.replace(/[^\d+]/g, '')}`

type ContactSectionProps = Pick<HomepageCopy, 'contact' | 'contactLead' | 'contactTitle' | 'ctaContact'>

export function ContactSection({
  contact,
  contactLead,
  contactTitle,
  ctaContact,
}: ContactSectionProps) {
  const contactLinkClassName =
    'block break-words font-serif text-[clamp(1.18rem,2.5vw,1.72rem)] leading-[1.12] text-[rgba(20,52,45,0.92)] transition-[color,transform] duration-200 hover:translate-x-0.5 hover:text-[#0f3029]'

  return (
    <section className='relative z-[3] bg-[linear-gradient(180deg,rgba(244,241,232,0.98),rgba(232,227,214,0.98))] px-[1.2rem] pb-[clamp(4rem,8vw,6.8rem)]'>
      <div className='mx-auto grid w-full max-w-[72rem] gap-[1.4rem] border-t border-[rgba(20,52,45,0.14)] pt-8 md:grid-cols-[minmax(0,1.1fr)_repeat(3,minmax(0,0.7fr))] md:items-start'>
        <div className='grid content-start'>
          <p className='mb-[0.85rem] font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(20,52,45,0.52)]'>
            {contactTitle}
          </p>
          <h2 className='font-serif text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.92] text-[#14342d]'>
            {contactLead}
          </h2>
          <p className='mt-4 font-sans text-[clamp(0.95rem,1.9vw,1.05rem)] leading-[1.78] text-[rgba(20,52,45,0.76)]'>
            {contact.company}
          </p>
        </div>

        <div className='grid content-start gap-[0.6rem] border-t border-[rgba(20,52,45,0.12)] pt-[0.9rem] md:border-t-0 md:pt-0'>
          <p className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(20,52,45,0.52)]'>
            {contact.addressLabel}
          </p>
          <p className='m-0 font-sans text-[clamp(0.95rem,1.9vw,1.05rem)] leading-[1.78] text-[rgba(20,52,45,0.76)]'>
            {contact.address}
          </p>
          <p className='m-0 font-sans text-[clamp(0.95rem,1.9vw,1.05rem)] leading-[1.78] text-[rgba(20,52,45,0.76)]'>
            {contact.icoLabel}: {contact.ico}
          </p>
        </div>

        <div className='grid content-start gap-[0.6rem] border-t border-[rgba(20,52,45,0.12)] pt-[0.9rem] md:border-t-0 md:pt-0'>
          <p className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(20,52,45,0.52)]'>
            {contact.phoneLabel}
          </p>
          <a className={contactLinkClassName} href={toTelHref(contact.phonePouza)}>
            {contact.phonePouza}
          </a>
          <a className={contactLinkClassName} href={toTelHref(contact.phoneTrdlicova)}>
            {contact.phoneTrdlicova}
          </a>
        </div>

        <div className='grid content-start gap-[0.6rem] border-t border-[rgba(20,52,45,0.12)] pt-[0.9rem] md:border-t-0 md:pt-0'>
          <p className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(20,52,45,0.52)]'>
            {contact.emailLabel}
          </p>
          <a className={contactLinkClassName} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <Link
            href='/kontakt'
            className='mt-2 inline-flex w-fit items-center gap-[0.8rem] font-sans text-[0.76rem] uppercase tracking-[0.18em] text-[rgba(20,52,45,0.84)] transition-[opacity,transform] duration-200 hover:translate-x-1 hover:opacity-100'
          >
            <span>{ctaContact}</span>
            <span className='h-px w-[2.1rem] bg-current opacity-40' />
          </Link>
        </div>
      </div>
    </section>
  )
}
