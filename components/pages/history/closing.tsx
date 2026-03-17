import { Link } from '@/i18n/navigation'
import type { HistoryJump, HistoryPageCopy } from './types'

type ClosingProps = {
  jumps: HistoryJump[]
} & Pick<
  HistoryPageCopy,
  'closingBody' | 'closingDetail' | 'closingLabel' | 'closingTitle'
>

export function Closing({
  closingBody,
  closingDetail,
  closingLabel,
  closingTitle,
  jumps,
}: ClosingProps) {
  return (
    <div className='max-w-[34rem]'>
      <p className='mb-4 text-[0.78rem] uppercase tracking-[0.24em] text-[rgba(221,231,223,0.82)]'>
        {closingLabel}
      </p>
      <h2 className='font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.98] font-medium'>
        {closingTitle}
      </h2>
      <p className='mt-6 text-[1.05rem] leading-[1.95] text-[rgba(221,231,223,0.82)]'>
        {closingBody}
      </p>
      <p className='mt-6 max-w-[28rem] border-t border-[rgba(221,231,223,0.14)] pt-5 font-serif text-[1.4rem] leading-[1.45] text-[rgba(244,234,215,0.9)]'>
        {closingDetail}
      </p>

      <div className='mt-8 flex flex-wrap gap-3'>
        {jumps.map(jump => (
          <Link
            key={jump.href}
            href={jump.href}
            className='border-b border-[rgba(221,231,223,0.36)] pb-[0.18rem] text-[0.98rem] leading-[1.4] text-[rgba(244,247,244,0.88)] transition-[border-color,color] hover:border-[rgba(244,234,215,0.86)] hover:text-[#f4ead7]'
          >
            {jump.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
