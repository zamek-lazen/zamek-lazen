import { toTelHref } from '@/lib/tel-href'
import type { SiteContactPerson } from '@/types'

type Variant = 'dark' | 'light'

export function SiteContactPeopleBlock({
  people,
  variant
}: {
  people: SiteContactPerson[]
  variant: Variant
}) {
  const nameClass =
    variant === 'dark' ?
      'font-sans text-[0.95rem] font-medium text-mist-100'
    : 'font-sans text-[0.95rem] font-medium text-forest-800'

  const linkClass =
    variant === 'dark' ?
      'editorial-body editorial-body-dark block transition hover:text-mist-50'
    : 'editorial-body block text-forest-900 underline-offset-2 transition hover:text-forest-700'

  const plainClass =
    variant === 'dark' ?
      'editorial-body editorial-body-dark'
    : 'editorial-body text-forest-900'

  return (
    <div className='space-y-4'>
      {people.map((person) => {
        const href = toTelHref(person.phone)
        const key = `${person.name}-${person.phone}`

        return (
          <div key={key} className='space-y-1'>
            <p className={nameClass}>{person.name}</p>
            {href ? (
              <a href={href} className={linkClass}>
                {person.phone}
              </a>
            ) : (
              <p className={plainClass}>{person.phone}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
