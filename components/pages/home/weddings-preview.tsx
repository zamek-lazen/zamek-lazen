import { Link } from '@/i18n/navigation'

type WeddingsPreviewProps = {
  eyebrow: string
  title: string
  lead: string
  body: string
  steps: [string, string, string, string]
  cta: string
}

export function WeddingsPreview({
  body,
  cta,
  eyebrow,
  lead,
  steps,
  title
}: WeddingsPreviewProps) {
  return (
    <section className='bg-[linear-gradient(180deg,#f7f2e8,#efe7da)] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-(--color-forest-900) md:px-8'>
      <div className='mx-auto grid w-full max-w-376 gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start'>
        <div className='max-w-136'>
          <p className='font-sans text-[0.72rem] tracking-[0.2em] text-[rgba(19,52,45,0.56)] uppercase'>
            {eyebrow}
          </p>
          <h2 className='mt-4 max-w-[10ch] font-serif text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.96] tracking-[-0.025em] text-balance'>
            {title}
          </h2>
          <p className='mt-5 max-w-[30ch] font-serif text-[clamp(1.08rem,2vw,1.42rem)] leading-[1.32] text-[rgba(19,52,45,0.84)]'>
            {lead}
          </p>
          <p className='mt-5 max-w-[56ch] font-sans text-[1rem] leading-[1.85] text-[rgba(19,52,45,0.74)]'>
            {body}
          </p>

          <Link
            href='/svatby'
            className='mt-8 inline-flex min-h-11 items-center justify-center border border-[rgba(19,52,45,0.16)] bg-[rgba(255,255,255,0.48)] px-6 py-3 font-sans text-[0.75rem] tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-white'
          >
            {cta}
          </Link>
        </div>

        <div className='grid gap-5'>
          <ol className='mt-8 grid gap-x-8 gap-y-4 border-t border-[rgba(19,52,45,0.12)] pt-5'>
            {steps.map((step, index) => (
              <li
                key={step}
                className='grid gap-2 border-b border-[rgba(19,52,45,0.08)] pb-4'
              >
                <span className='font-sans text-[0.68rem] tracking-[0.22em] text-[rgba(19,52,45,0.46)] uppercase'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className='font-serif text-[1.2rem] leading-[1.2] text-[rgba(19,52,45,0.92)]'>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
