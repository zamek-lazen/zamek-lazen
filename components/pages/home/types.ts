export type RouteHref =
  | '/'
  | '/historie'
  | '/rod'
  | '/svatby'
  | '/akce'
  | '/galerie'
  | '/kontakt'

export type HomepageSpotlightLink = {
  href: RouteHref
  title: string
  description: string
}

export type HomepageEditorialSection = {
  eyebrow: string
  title: string
  lead: string
  paragraphs: string[]
}

export type HomepageProfileCard = {
  eyebrow: string
  title: string
  body: string
}

export type HomepageWeddingStep = {
  title: string
  body: string
}

export type HomepageContactDetails = {
  company: string
  addressLabel: string
  address: string
  icoLabel: string
  ico: string
  phoneLabel: string
  phonePouza: string
  phoneTrdlicova: string
  emailLabel: string
  email: string
}

export type HomepageCopy = {
  eyebrow: string
  loaderLabel: string
  loaderHint: string
  sideLeft: string
  sideRight: string
  scrollPrompt: string
  title: string
  lead: string
  description: string
  highlightsTitle: string
  historySection: HomepageEditorialSection
  familySection: HomepageEditorialSection
  familyProfile: HomepageProfileCard
  weddingsSection: HomepageEditorialSection
  weddingProcessTitle: string
  weddingSteps: HomepageWeddingStep[]
  weddingVenuesTitle: string
  weddingVenues: string[]
  eventsTitle: string
  eventsLead: string
  eventsNotice: string
  galleryTitle: string
  galleryLead: string
  galleryNotice: string
  contactTitle: string
  contactLead: string
  contact: HomepageContactDetails
  factOne: string
  factTwo: string
  factThree: string
  factFour: string
  ctaHistory: string
  ctaContact: string
  ctaGallery: string
}
