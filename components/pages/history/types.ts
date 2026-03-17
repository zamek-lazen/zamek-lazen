export type HistoryFact = {
  label: string
  value: string
}

export type HistoryChapter = {
  id: string
  year: string
  navLabel: string
  title: string
  body: string
  note: string
  detail: string
  image: string
  imageAlt: string
  tone: 'ember' | 'forest' | 'sepia' | 'stone'
}

export type HistoryJump = {
  href: '/rod' | '/kontakt'
  label: string
}

export type HistoryPageCopy = {
  title: string
  lead: string
  introLabel: string
  introQuote: string
  scrollLabel: string
  timelineLabel: string
  timelineHint: string
  facts: HistoryFact[]
  chapters: HistoryChapter[]
  closingLabel: string
  closingTitle: string
  closingBody: string
  closingDetail: string
  galleryLabel: string
  galleryCaption1: string
  galleryCaption2: string
  galleryCaption3: string
  jumps: HistoryJump[]
}
