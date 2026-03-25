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
    <section className='editorial-surface-dark px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'>
      <div className='mx-auto grid w-full max-w-376 gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start'>
        <div className='max-w-136'>
          <p className='editorial-eyebrow editorial-eyebrow-dark'>
            {eyebrow}
          </p>
          <h2 className='editorial-title editorial-title-dark mt-4 max-w-[10ch]'>
            {title}
          </h2>
          <p className='editorial-lead editorial-lead-dark mt-5 max-w-[30ch]'>
            {lead}
          </p>
          <p className='editorial-body editorial-body-dark mt-5 max-w-[56ch]'>
            {body}
          </p>

          <Link
            href='/svatby'
            className='editorial-button editorial-button-primary mt-8'
          >
            {cta}
          </Link>
        </div>

        <div className='grid gap-5'>
          <ol className='mt-8 grid gap-x-8 gap-y-4 border-t border-[rgba(178,201,190,0.22)] pt-5'>
            {steps.map((step, index) => (
              <li
                key={step}
                className='grid gap-2 border-b border-[rgba(178,201,190,0.16)] pb-4'
              >
                <span className='editorial-eyebrow editorial-eyebrow-dark text-[0.75rem]'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className='editorial-card-title editorial-card-title-dark text-[1.85rem]'>
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
