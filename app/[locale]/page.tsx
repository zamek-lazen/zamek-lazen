import { getTranslations } from 'next-intl/server'
import {
  type HomepageContactDetails,
  Homepage,
  type HomepageCopy,
  type HomepageEditorialSection,
  type HomepageProfileCard,
  type HomepageSpotlightLink,
  type HomepageWeddingStep,
} from '@/components/pages/home'

const spotlightConfig = [
  {
    href: '/historie' as const,
    navKey: 'history',
    descKey: 'historyDescription',
  },
  { href: '/rod' as const, navKey: 'family', descKey: 'familyDescription' },
  {
    href: '/svatby' as const,
    navKey: 'weddings',
    descKey: 'weddingsDescription',
  },
  { href: '/akce' as const, navKey: 'events', descKey: 'eventsDescription' },
  {
    href: '/galerie' as const,
    navKey: 'gallery',
    descKey: 'galleryDescription',
  },
] as const

export default async function HomePage() {
  const home = await getTranslations('HomePage')
  const nav = await getTranslations('Nav')
  const history = await getTranslations('HistoryPage')
  const family = await getTranslations('FamilyPage')
  const weddings = await getTranslations('WeddingsPage')
  const events = await getTranslations('EventsPage')
  const gallery = await getTranslations('GalleryPage')
  const contactT = await getTranslations('ContactPage')

  const historySection: HomepageEditorialSection = {
    eyebrow: nav('history'),
    title: history('title'),
    lead: history('lead'),
    paragraphs: [history('p1'), history('p2'), history('p3')],
  }

  const familySection: HomepageEditorialSection = {
    eyebrow: nav('family'),
    title: family('title'),
    lead: family('lead'),
    paragraphs: [family('p1'), family('p2'), family('p3')],
  }

  const familyProfile: HomepageProfileCard = {
    eyebrow: family('currentHeadLabel'),
    title: family('currentHeadTitle'),
    body: family('currentHeadBody'),
  }

  const weddingsSection: HomepageEditorialSection = {
    eyebrow: nav('weddings'),
    title: weddings('title'),
    lead: weddings('lead'),
    paragraphs: [weddings('p1'), weddings('p2'), weddings('p3'), weddings('p4')],
  }

  const weddingSteps: HomepageWeddingStep[] = [
    { title: weddings('step1Title'), body: weddings('p1') },
    { title: weddings('step2Title'), body: weddings('p2') },
    { title: weddings('step3Title'), body: weddings('p3') },
    { title: weddings('step4Title'), body: weddings('p4') },
  ]

  const contact: HomepageContactDetails = {
    company: contactT('company'),
    addressLabel: contactT('addressLabel'),
    address: contactT('address'),
    icoLabel: contactT('icoLabel'),
    ico: contactT('ico'),
    phoneLabel: contactT('phoneLabel'),
    phonePouza: contactT('phonePouza'),
    phoneTrdlicova: contactT('phoneTrdlicova'),
    emailLabel: contactT('emailLabel'),
    email: contactT('email'),
  }

  const copy: HomepageCopy = {
    eyebrow: home('eyebrow'),
    loaderLabel: home('loaderLabel'),
    loaderHint: home('loaderHint'),
    sideLeft: home('sideLeft'),
    sideRight: home('sideRight'),
    scrollPrompt: home('scrollPrompt'),
    title: home('title'),
    lead: home('lead'),
    description: home('description'),
    highlightsTitle: home('highlightsTitle'),
    historySection,
    familySection,
    familyProfile,
    weddingsSection,
    weddingProcessTitle: weddings('processTitle'),
    weddingSteps,
    weddingVenuesTitle: weddings('venueTitle'),
    weddingVenues: [weddings('venueOne'), weddings('venueTwo')],
    eventsTitle: events('title'),
    eventsLead: events('lead'),
    eventsNotice: events('notice'),
    galleryTitle: gallery('title'),
    galleryLead: gallery('lead'),
    galleryNotice: gallery('notice'),
    contactTitle: contactT('title'),
    contactLead: contactT('lead'),
    contact,
    factOne: home('factOne'),
    factTwo: home('factTwo'),
    factThree: home('factThree'),
    factFour: home('factFour'),
    ctaHistory: home('ctaHistory'),
    ctaContact: home('ctaContact'),
    ctaGallery: home('ctaGallery'),
  }

  const spotlightLinks: HomepageSpotlightLink[] = spotlightConfig.map(item => ({
    href: item.href,
    title: nav(item.navKey),
    description: home(item.descKey),
  }))

  return <Homepage copy={copy} spotlightLinks={spotlightLinks} />
}
