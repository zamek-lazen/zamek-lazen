import { parseSmsTicketEmbedCode } from '@/sanity/lib/events'

type SmsTicketEmbedProps = {
  embedCode?: string
  title: string
}

export function SmsTicketEmbed({ embedCode, title }: SmsTicketEmbedProps) {
  const embed = parseSmsTicketEmbedCode(embedCode, title)

  if (!embed) {
    return null
  }

  return (
    <div className='overflow-hidden rounded-[1.15rem] border border-[rgba(185,212,197,0.18)] bg-[rgba(255,255,255,0.04)]'>
      <iframe
        src={embed.src}
        title={embed.title}
        className='block w-full border-0 bg-transparent'
        height={embed.height}
        loading='lazy'
        referrerPolicy='strict-origin-when-cross-origin'
      />
    </div>
  )
}
