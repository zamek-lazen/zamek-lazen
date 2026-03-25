import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import cs from '../messages/cs.json'
import de from '../messages/de.json'
import { routing } from './routing'

const messages = { cs, de }

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale =
    hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  return {
    locale,
    messages: messages[locale]
  }
})
