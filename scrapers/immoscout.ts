/**
 * Lyrvio — ImmoScout24 Scraper-Library
 * Läuft als Browser-Extension Content-Script im User-Browser.
 * KEIN Server-Scraping — alles via DOM des eingeloggten Users.
 *
 * Stand der DOM-Selektoren: 2026-04
 */

import type { LandlordType } from '../templates/landlord-adaptions.js'

// ---------------------------------------------------------------------------
// ListingData-Schema (re-export kompatibel mit templates/render.ts)
// ---------------------------------------------------------------------------
export interface ListingData {
  id: string
  url: string
  title: string
  city: string
  district: string
  zip?: string
  size_sqm: number
  rooms: number
  rent_cold: number
  rent_warm: number
  deposit?: number
  available_from?: string
  /** Vermieter-Beschreibungstext als Klartext */
  description: string
  vermieter_name?: string
  /** Aus Beschreibung extrahierte Anforderungen */
  vermieter_anforderungen: string[]
  landlord_type: LandlordType | 'unknown'
  image_urls: string[]
  scraped_at: string
}

// ---------------------------------------------------------------------------
// ImmoScout24-Selektoren (DOM-Stand 2026-04)
// ---------------------------------------------------------------------------
export const SELECTORS = {
  // Detail-Page
  title: [
    '[data-qa="expose-title"]',
    'h1.is24qa-objekttitel',
    'h1[data-qa="expose-title"]',
    '.expose-title h1',
  ],
  address: [
    '.address-block',
    '[data-qa="address"]',
    '.is24qa-adresse',
    '[data-qa="expose-address"]',
  ],
  livingSpace: [
    '[data-qa="livingSpace"]',
    '.is24qa-wohnflaeche-main',
    '[data-qa="area"]',
  ],
  rooms: [
    '[data-qa="rooms"]',
    '.is24qa-zi-main',
    '[data-qa="numberOfRooms"]',
  ],
  kaltmiete: [
    '[data-qa="kaltmiete"]',
    '.is24qa-kaltmiete-main',
    '[data-qa="baseRent"]',
  ],
  warmmiete: [
    '[data-qa="totalRent"]',
    '.is24qa-gesamtmiete-main',
    '[data-qa="totalRent"]',
    '[data-qa="warmmiete"]',
  ],
  deposit: [
    '[data-qa="deposit"]',
    '.is24qa-kaution',
    '[data-qa="securityDeposit"]',
  ],
  availableFrom: [
    '[data-qa="availableFrom"]',
    '.is24qa-bezugsfrei-ab',
    '[data-qa="freeFrom"]',
  ],
  description: [
    '.is24qa-objektbeschreibung',
    '[data-qa="object-description"]',
    '[data-qa="freetextField"]',
    '.expose-text-block',
  ],
  vermieterName: [
    '[data-qa="contact-name"]',
    '.contact-name',
    '.is24qa-anbieter-name',
    '[data-qa="provider-name"]',
  ],
  images: [
    '[data-qa="gallery-image"] img',
    '.gallery-slide img',
    '.is24-carousel img',
    '[data-qa="slide-image"]',
  ],
  // Bewerbungs-Elemente
  contactButton: [
    'button[data-qa="contact-button"]',
    'button[data-qa="contactButton"]',
    'a[data-qa="contact-button"]',
    '.contact-form-button',
    '[data-qa="contact-main-cta"]',
  ],
  applicationForm: [
    'form[data-qa="contact-form"]',
    'form.contact-form',
    '[data-qa="contactForm"]',
    '#contactForm',
  ],
  applicationTextarea: [
    'textarea[name="message"]',
    'textarea[data-qa="message-input"]',
    'textarea[id="message"]',
    '.contact-form textarea',
  ],
  // Suchergebnisse
  searchResultItem: [
    '[data-qa="result-list-entry"]',
    '.result-list-entry',
    '[data-testid="result-list-item"]',
    'article.result-list__listing',
  ],
  searchResultTitle: [
    '[data-qa="expose-title"]',
    'h2.result-list-entry__brand-title',
    '.listing-title',
  ],
  searchResultPrice: [
    '[data-qa="price"]',
    '.result-list-entry__criteria .criteriagroup dd:first-child',
    '.price-tag',
  ],
  searchResultId: [
    '[data-expose-id]',
    '[data-id]',
    '[data-listing-id]',
  ],
} as const

// ---------------------------------------------------------------------------
// DOM-Helfer
// ---------------------------------------------------------------------------
function queryText(doc: Document, selectors: readonly string[]): string {
  for (const sel of selectors) {
    const el = doc.querySelector(sel)
    if (el?.textContent?.trim()) {
      return el.textContent.trim()
    }
  }
  return ''
}

function queryAttr(doc: Document, selectors: readonly string[], attr: string): string {
  for (const sel of selectors) {
    const el = doc.querySelector(sel)
    const val = el?.getAttribute(attr)
    if (val?.trim()) return val.trim()
  }
  return ''
}

function queryAllText(doc: Document, selectors: readonly string[]): string[] {
  for (const sel of selectors) {
    const els = doc.querySelectorAll(sel)
    if (els.length > 0) {
      return Array.from(els).map(el => el.textContent?.trim() ?? '').filter(Boolean)
    }
  }
  return []
}

function queryAllAttr(doc: Document, selectors: readonly string[], attr: string): string[] {
  for (const sel of selectors) {
    const els = doc.querySelectorAll(sel)
    if (els.length > 0) {
      return Array.from(els)
        .map(el => el.getAttribute(attr) ?? '')
        .filter(Boolean)
    }
  }
  return []
}

/**
 * Parst Zahl aus einem lokalisierten deutschen String.
 * "1.234,56 €" → 1234.56
 * "85 m²" → 85
 */
function parseGermanNumber(text: string): number {
  if (!text) return 0
  // Entferne alles außer Ziffern, Punkt, Komma
  const cleaned = text.replace(/[^\d.,]/g, '')
  // Deutsches Format: Punkt als Tausender, Komma als Dezimal
  const normalized = cleaned.replace(/\./g, '').replace(',', '.')
  const num = parseFloat(normalized)
  return isNaN(num) ? 0 : num
}

/**
 * Extrahiert Listing-ID aus URL.
 * https://www.immobilienscout24.de/expose/123456789 → "123456789"
 */
function extractListingId(url: string): string {
  const match = url.match(/\/expose\/(\d+)/)
  if (match?.[1]) return match[1]
  // Fallback: letztes Pfad-Segment
  const parts = url.split('/').filter(Boolean)
  return parts[parts.length - 1] ?? crypto.randomUUID()
}

/**
 * Extrahiert Bezirk und PLZ aus Adress-String.
 * "10115 Berlin Mitte" → { district: "Mitte", city: "Berlin", zip: "10115" }
 */
function parseAddress(addressText: string): { city: string; district: string; zip?: string } {
  if (!addressText) return { city: '', district: '' }

  // PLZ extrahieren
  const zipMatch = addressText.match(/\b(\d{5})\b/)
  const zip = zipMatch?.[1]

  // Bekannte Städte
  const knownCities = ['Berlin', 'München', 'Munich', 'Hamburg', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Nürnberg', 'Hannover', 'Karlsruhe']
  let city = ''
  let district = ''

  for (const c of knownCities) {
    if (addressText.includes(c)) {
      city = c === 'Munich' ? 'München' : c
      // Bezirk ist oft nach der Stadt
      const afterCity = addressText.split(c)[1]?.trim()
      if (afterCity) {
        district = afterCity.replace(/^[,\s-]+/, '').split(',')[0]?.trim() ?? ''
      }
      break
    }
  }

  // Falls keine bekannte Stadt: erstes Wort nach PLZ
  if (!city && zip) {
    const afterZip = addressText.split(zip)[1]?.trim()
    if (afterZip) {
      const parts = afterZip.split(/[\s,]+/)
      city = parts[0] ?? ''
      district = parts[1] ?? ''
    }
  }

  return { city, district, zip }
}

// ---------------------------------------------------------------------------
// parseListingFromDOM — Detail-Page
// ---------------------------------------------------------------------------
export function parseListingFromDOM(doc: Document): ListingData | null {
  const url = doc.location?.href ?? doc.URL ?? ''

  // Titel prüfen (Pflichtfeld — wenn leer, kein Inserat)
  const title = queryText(doc, SELECTORS.title)
  if (!title) return null

  const id = extractListingId(url)
  const addressRaw = queryText(doc, SELECTORS.address)
  const { city, district, zip } = parseAddress(addressRaw)

  const sizeRaw = queryText(doc, SELECTORS.livingSpace)
  const roomsRaw = queryText(doc, SELECTORS.rooms)
  const kaltRaw = queryText(doc, SELECTORS.kaltmiete)
  const warmRaw = queryText(doc, SELECTORS.warmmiete)
  const depositRaw = queryText(doc, SELECTORS.deposit)
  const availableRaw = queryText(doc, SELECTORS.availableFrom)
  const description = queryText(doc, SELECTORS.description)
  const vermieterName = queryText(doc, SELECTORS.vermieterName) || undefined

  // Bilder
  const imgSrcs = queryAllAttr(doc, SELECTORS.images, 'src')
  const imgDataSrcs = queryAllAttr(doc, SELECTORS.images, 'data-src')
  const image_urls = [...new Set([...imgSrcs, ...imgDataSrcs])].filter(u => u.startsWith('http'))

  return {
    id,
    url,
    title,
    city,
    district,
    zip,
    size_sqm: parseGermanNumber(sizeRaw),
    rooms: parseGermanNumber(roomsRaw),
    rent_cold: parseGermanNumber(kaltRaw),
    rent_warm: parseGermanNumber(warmRaw),
    deposit: depositRaw ? parseGermanNumber(depositRaw) : undefined,
    available_from: availableRaw || undefined,
    description,
    vermieter_name: vermieterName,
    vermieter_anforderungen: [],  // wird per LLM befüllt via extractRequirements()
    landlord_type: 'unknown',     // wird per LLM befüllt via classifyLandlordType()
    image_urls,
    scraped_at: new Date().toISOString(),
  }
}

// ---------------------------------------------------------------------------
// parseListingsFromSearchResults — Suche-Ergebnisliste
// ---------------------------------------------------------------------------
export function parseListingsFromSearchResults(doc: Document): ListingData[] {
  const results: ListingData[] = []

  // Suche nach allen Listing-Karten
  let items: Element[] = []
  for (const sel of SELECTORS.searchResultItem) {
    const found = Array.from(doc.querySelectorAll(sel))
    if (found.length > 0) {
      items = found
      break
    }
  }

  for (const item of items) {
    try {
      const partial = parseSearchResultItem(item)
      if (partial) results.push(partial)
    } catch {
      // Einzelne Fehler ignorieren, Rest weiterverarbeiten
    }
  }

  return results
}

function parseSearchResultItem(el: Element): ListingData | null {
  // Expose-ID aus data-Attribut
  let id = el.getAttribute('data-expose-id') ?? el.getAttribute('data-id') ?? ''

  // Falls kein data-Attribut: Link extrahieren
  const link = el.querySelector('a[href*="/expose/"]')
  const href = link?.getAttribute('href') ?? ''
  const url = href.startsWith('http') ? href : `https://www.immobilienscout24.de${href}`

  if (!id && href) {
    id = extractListingId(href)
  }
  if (!id) return null

  // Titel
  let title = ''
  for (const sel of SELECTORS.searchResultTitle) {
    const t = el.querySelector(sel)?.textContent?.trim()
    if (t) { title = t; break }
  }
  if (!title) return null

  // Adresse
  const addressEl = el.querySelector('.result-list-entry__address, [data-qa="address"], .listing-address')
  const addressRaw = addressEl?.textContent?.trim() ?? ''
  const { city, district, zip } = parseAddress(addressRaw)

  // Preis/Größe aus Criteria-Block
  const criterias = el.querySelectorAll('dd, .criteriagroup dd, [data-qa="criteria-value"]')
  let rent_cold = 0
  let size_sqm = 0
  let rooms = 0

  for (const c of criterias) {
    const text = c.textContent?.trim() ?? ''
    if (text.includes('€') && rent_cold === 0) {
      rent_cold = parseGermanNumber(text)
    } else if (text.includes('m²') && size_sqm === 0) {
      size_sqm = parseGermanNumber(text)
    } else if (text.includes('Zi') && rooms === 0) {
      rooms = parseGermanNumber(text)
    }
  }

  return {
    id,
    url,
    title,
    city,
    district,
    zip,
    size_sqm,
    rooms,
    rent_cold,
    rent_warm: 0,  // In Suchergebnissen meist nicht verfügbar
    deposit: undefined,
    available_from: undefined,
    description: '',  // Nur auf Detail-Page verfügbar
    vermieter_name: undefined,
    vermieter_anforderungen: [],
    landlord_type: 'unknown',
    image_urls: [],
    scraped_at: new Date().toISOString(),
  }
}

// ---------------------------------------------------------------------------
// URL-Helfer
// ---------------------------------------------------------------------------
export function getListingUrl(listingId: string): string {
  return `https://www.immobilienscout24.de/expose/${listingId}`
}

export function getSearchUrl(params: {
  city: string
  min_rooms?: number
  max_rent?: number
  min_size?: number
  sort?: 'creationDate' | 'distance' | 'price'
}): string {
  const base = `https://www.immobilienscout24.de/Suche/de/${params.city.toLowerCase()}/wohnung-mieten`
  const p = new URLSearchParams()
  if (params.min_rooms) p.set('numberofrooms', `${params.min_rooms}.0-`)
  if (params.max_rent) p.set('price', `-${params.max_rent}.0`)
  if (params.min_size) p.set('livingspace', `${params.min_size}.0-`)
  if (params.sort) p.set('sorting', params.sort === 'creationDate' ? '2' : params.sort === 'price' ? '1' : '3')

  const qs = p.toString()
  return qs ? `${base}?${qs}` : base
}

// ---------------------------------------------------------------------------
// sendApplicationViaUI — Bewerbung über ImmoScout-UI absenden
// ---------------------------------------------------------------------------
export interface ApplicationAttachment {
  name: string
  data: Blob | File
  mime_type: string
}

export interface SendApplicationResult {
  success: boolean
  error?: string
  confirmation_text?: string
}

export async function sendApplicationViaUI(
  doc: Document,
  application_text: string,
  file_attachments: ApplicationAttachment[] = [],
): Promise<SendApplicationResult> {
  try {
    // 1. „Kontakt aufnehmen" / „Bewerben"-Button finden
    const contactBtn = findElement(doc, SELECTORS.contactButton)
    if (!contactBtn) {
      return { success: false, error: 'Bewerben-Button nicht gefunden. Seite möglicherweise nicht geladen.' }
    }

    // 2. Button klicken um Formular zu öffnen
    ;(contactBtn as HTMLElement).click()
    await waitFor(() => findElement(doc, SELECTORS.applicationForm) !== null, 3000)

    // 3. Formular finden
    const form = findElement(doc, SELECTORS.applicationForm)
    if (!form) {
      return { success: false, error: 'Bewerbungs-Formular nicht gefunden nach Button-Klick.' }
    }

    // 4. Textarea befüllen
    const textarea = findElement(form, SELECTORS.applicationTextarea) as HTMLTextAreaElement | null
    if (!textarea) {
      return { success: false, error: 'Nachrichten-Textarea nicht gefunden.' }
    }

    // Native React-Event simulieren (ImmoScout nutzt React)
    setNativeValue(textarea, application_text)
    textarea.dispatchEvent(new Event('input', { bubbles: true }))
    textarea.dispatchEvent(new Event('change', { bubbles: true }))

    // 5. Datei-Anhänge hochladen (falls vorhanden)
    if (file_attachments.length > 0) {
      const uploadResult = await uploadAttachments(form, file_attachments)
      if (!uploadResult.success) {
        return { success: false, error: `Datei-Upload fehlgeschlagen: ${uploadResult.error}` }
      }
    }

    // 6. Submit-Button finden und klicken
    const submitBtn = findSubmitButton(form)
    if (!submitBtn) {
      return { success: false, error: 'Submit-Button nicht gefunden.' }
    }

    ;(submitBtn as HTMLElement).click()

    // 7. Auf Confirmation warten
    const confirmed = await waitFor(() => {
      const confirmEl = doc.querySelector(
        '[data-qa="contact-success"], .success-message, [data-qa="message-sent"], .contact-success'
      )
      return confirmEl !== null
    }, 8000)

    if (!confirmed) {
      // Prüfe auf Fehler-Meldung
      const errorEl = doc.querySelector('[data-qa="contact-error"], .error-message, .form-error')
      if (errorEl?.textContent) {
        return { success: false, error: `Formular-Fehler: ${errorEl.textContent.trim()}` }
      }
      return { success: false, error: 'Keine Confirmation nach Absenden (Timeout). Möglicherweise trotzdem gesendet — Postfach prüfen.' }
    }

    const confirmationEl = doc.querySelector('[data-qa="contact-success"], .success-message')
    return {
      success: true,
      confirmation_text: confirmationEl?.textContent?.trim(),
    }

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { success: false, error: `Unerwarteter Fehler: ${msg}` }
  }
}

// Lyrvio AI-Endpoint (Cloudflare Worker mit Workers AI binding)
const LYRVIO_AI_BASE = typeof globalThis.location !== 'undefined'
  ? (typeof import.meta !== 'undefined' && (import.meta as Record<string, unknown>).env
    ? ((import.meta as { env: Record<string, string> }).env['VITE_BACKEND_API_URL'] ?? 'https://api.lyrvio.de')
    : 'https://api.lyrvio.de')
  : 'https://api.lyrvio.de'

// ---------------------------------------------------------------------------
// LLM-Extraktion: Anforderungen aus Beschreibung via Lyrvio Worker (CF AI)
// ---------------------------------------------------------------------------
export async function extractRequirements(
  beschreibung_text: string,
  // BYOK optional — wenn nicht gesetzt → Lyrvio Worker mit CF-AI kostenlos
  _openrouter_api_key?: string,
): Promise<string[]> {
  if (!beschreibung_text.trim()) return []

  const response = await fetch(`${LYRVIO_AI_BASE}/ai/extract-requirements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: beschreibung_text.slice(0, 1200) }),
  })

  if (!response.ok) {
    console.warn(`extractRequirements: API-Fehler ${response.status}`)
    return []
  }

  const data = await response.json() as { requirements: string[] }
  return data.requirements ?? []
}

// ---------------------------------------------------------------------------
// LLM-Klassifizierung: Vermieter-Typ aus Text via Lyrvio Worker (CF AI)
// ---------------------------------------------------------------------------
export async function classifyLandlordType(
  beschreibung_text: string,
  // BYOK optional — wird ignoriert (CF AI wird intern verwendet)
  _openrouter_api_key?: string,
): Promise<LandlordType | 'unknown'> {
  if (!beschreibung_text.trim()) return 'unknown'

  const response = await fetch(`${LYRVIO_AI_BASE}/ai/classify-landlord`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: beschreibung_text.slice(0, 800) }),
  })

  if (!response.ok) {
    console.warn(`classifyLandlordType: API-Fehler ${response.status}`)
    return 'unknown'
  }

  const data = await response.json() as { landlord_type: string }
  const content = (data.landlord_type ?? '').toLowerCase()

  const valid: Array<LandlordType | 'unknown'> = ['private_senior', 'verwaltung', 'private_young', 'makler', 'wg', 'unknown']
  for (const t of valid) {
    if (content.includes(t)) return t
  }

  return 'unknown'
}

// ---------------------------------------------------------------------------
// Interne Hilfsfunktionen
// ---------------------------------------------------------------------------
function findElement(root: Document | Element, selectors: readonly string[]): Element | null {
  for (const sel of selectors) {
    const el = root.querySelector(sel)
    if (el) return el
  }
  return null
}

function waitFor(condition: () => boolean, timeoutMs: number): Promise<boolean> {
  return new Promise(resolve => {
    if (condition()) { resolve(true); return }

    const start = Date.now()
    const interval = setInterval(() => {
      if (condition()) {
        clearInterval(interval)
        resolve(true)
      } else if (Date.now() - start >= timeoutMs) {
        clearInterval(interval)
        resolve(false)
      }
    }, 100)
  })
}

/**
 * Setzt Textarea-Wert auf React-kompatible Weise.
 * Standard .value = x triggert React's onChange nicht.
 */
function setNativeValue(element: HTMLTextAreaElement | HTMLInputElement, value: string): void {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype, 'value'
  )?.set ?? Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype, 'value'
  )?.set

  if (nativeInputValueSetter) {
    nativeInputValueSetter.call(element, value)
  } else {
    element.value = value
  }
}

async function uploadAttachments(
  form: Element,
  attachments: ApplicationAttachment[],
): Promise<{ success: boolean; error?: string }> {
  // File-Upload-Input suchen
  const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement | null
  if (!fileInput) {
    // Kein Upload-Feld — ignorieren (nicht alle Formulare haben das)
    return { success: true }
  }

  try {
    const dt = new DataTransfer()
    for (const att of attachments) {
      const file = att.data instanceof File
        ? att.data
        : new File([att.data], att.name, { type: att.mime_type })
      dt.items.add(file)
    }
    fileInput.files = dt.files
    fileInput.dispatchEvent(new Event('change', { bubbles: true }))

    // Kurz warten auf Upload-UI
    await new Promise(r => setTimeout(r, 500))
    return { success: true }
  } catch (err) {
    return { success: false, error: String(err) }
  }
}

function findSubmitButton(form: Element): Element | null {
  // Spezifische Submit-Selektoren
  const submitSelectors = [
    'button[type="submit"]',
    'button[data-qa="send-button"]',
    'button[data-qa="submit-button"]',
    'input[type="submit"]',
    'button.submit',
    '.contact-form button:last-of-type',
  ]

  for (const sel of submitSelectors) {
    const btn = form.querySelector(sel)
    if (btn) return btn
  }

  // Fallback: Button mit Senden-Text
  const buttons = form.querySelectorAll('button')
  for (const btn of buttons) {
    const text = btn.textContent?.toLowerCase() ?? ''
    if (text.includes('senden') || text.includes('abschicken') || text.includes('anfragen')) {
      return btn
    }
  }

  return null
}
