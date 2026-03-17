type ImageBreakProps = {
  variant: 'castle' | 'garden'
}

const imageConfig = {
  garden: {
    position: 'center 46%',
    src: '/images/estate/castle-front-park.webp',
  },
  castle: {
    position: 'center center',
    src: '/images/estate/castle-front-winter-garden.webp',
  },
} as const

export function ImageBreak({ variant }: ImageBreakProps) {
  const asset = imageConfig[variant]

  return (
    <section
      aria-hidden='true'
      className='relative min-h-[clamp(18rem,46vw,36rem)] overflow-hidden bg-[#0a2d27]'
    >
      <div
        className='absolute inset-0 bg-cover bg-no-repeat'
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(4, 17, 14, 0.14), rgba(4, 17, 14, 0.45)), url("${asset.src}")`,
          backgroundPosition: asset.position,
        }}
      />
      <div
        className='absolute inset-0 mix-blend-screen'
        style={{
          background:
            'radial-gradient(circle at 15% 18%, rgba(186, 210, 162, 0.22), transparent 24%), radial-gradient(circle at 80% 20%, rgba(208, 228, 191, 0.18), transparent 22%), radial-gradient(circle at 70% 70%, rgba(112, 144, 96, 0.16), transparent 24%)',
        }}
      />
      <div
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(180deg, rgba(4, 17, 14, 0.16), rgba(4, 17, 14, 0.5)), radial-gradient(circle at center, rgba(4, 17, 14, 0), rgba(4, 17, 14, 0.38) 82%)',
        }}
      />
    </section>
  )
}
