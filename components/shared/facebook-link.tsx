const FACEBOOK_URL =
  'https://www.facebook.com/profile.php?id=100076194634170'

type FacebookLinkProps = {
  className: string
  iconClassName?: string
  label?: string
}

type FacebookIconProps = {
  className?: string
}

function FacebookIcon({ className }: FacebookIconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      fill='currentColor'
      className={className}
    >
      <path d='M13.615 21v-7.787h2.617l.392-3.036h-3.009V8.239c0-.88.243-1.48 1.507-1.48h1.609V4.042c-.278-.038-1.234-.12-2.344-.12-2.32 0-3.908 1.416-3.908 4.016v2.239H8.353v3.036h2.626V21h2.636Z' />
    </svg>
  )
}

export function FacebookLink({
  className,
  iconClassName = 'h-5 w-5',
  label = 'Facebook Zámek Lázeň'
}: FacebookLinkProps) {
  return (
    <a
      href={FACEBOOK_URL}
      target='_blank'
      rel='noreferrer'
      aria-label={label}
      className={className}
    >
      <FacebookIcon className={iconClassName} />
      <span className='sr-only'>{label}</span>
    </a>
  )
}
