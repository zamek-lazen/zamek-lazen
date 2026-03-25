/**
 * Builds a tel: URL from a display string that may be "Jméno: +420 …" or digits only.
 */
export function toTelHref(value: string): string | null {
  const phone = value.match(/\+?[\d\s]+$/)?.[0]?.replace(/\s+/g, '') ?? ''
  return phone ? `tel:${phone}` : null
}
