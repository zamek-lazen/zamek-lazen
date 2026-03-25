import { parseYouTubeEmbedUrl } from '@/sanity/lib/events'

type YouTubeEmbedProps = {
  title: string
  youtubeUrl?: string
}

export function YouTubeEmbed({ title, youtubeUrl }: YouTubeEmbedProps) {
  const embed = parseYouTubeEmbedUrl(youtubeUrl, title)

  if (!embed) {
    return null
  }

  return (
    <div className='overflow-hidden rounded-[1.15rem] border border-[rgba(13,49,41,0.12)] bg-[rgba(255,251,240,0.7)] shadow-[0_18px_48px_rgba(15,33,28,0.08)]'>
      <div className='relative aspect-video w-full'>
        <iframe
          src={embed.src}
          title={embed.title}
          className='absolute inset-0 h-full w-full border-0'
          loading='lazy'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          referrerPolicy='strict-origin-when-cross-origin'
        />
      </div>
    </div>
  )
}
