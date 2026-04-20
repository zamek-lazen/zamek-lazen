const INSTAGRAM_URL = 'https://www.instagram.com/zameklazenchudenice'

type InstagramLinkProps = {
  className: string
  iconClassName?: string
  label?: string
}

type InstagramIconProps = {
  className?: string
}

function InstagramIcon({ className }: InstagramIconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      fill='currentColor'
      className={className}
    >
      <path d='M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.45 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z' />
    </svg>
  )
}

export function InstagramLink({
  className,
  iconClassName = 'h-5 w-5',
  label = 'Instagram Zámek Lázeň'
}: InstagramLinkProps) {
  return (
    <a
      href={INSTAGRAM_URL}
      target='_blank'
      rel='noreferrer'
      aria-label={label}
      className={className}
    >
      <InstagramIcon className={iconClassName} />
      <span className='sr-only'>{label}</span>
    </a>
  )
}
