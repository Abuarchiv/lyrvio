/**
 * ImmoScout24 Content Script
 * - Scrapes listing data from search results and detail pages
 * - Sends applications via the ImmoScout messaging system
 */
import { defineContentScript } from 'wxt/sandbox';
import type { ListingRecord } from '../../lib/storage.ts';
import type { SendApplicationPayload, SendApplicationResult } from '../../lib/plattform-api.ts';

export default defineContentScript({
  matches: ['https://www.immobilienscout24.de/*'],
  main() {
    // Listen for messages from background service worker
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message.type === 'SCRAPE_LISTINGS') {
        scrapeListings()
          .then((listings) => sendResponse({ type: 'LISTINGS', listings }))
          .catch((err) =>
            sendResponse({ type: 'LISTINGS', listings: [], error: String(err) }),
          );
        return true; // async response
      }

      if (message.type === 'SEND_APPLICATION') {
        const payload = message.payload as SendApplicationPayload;
        sendApplication(payload.listing, payload.applicationText)
          .then((result) => sendResponse({ type: 'APPLICATION_RESULT', result }))
          .catch((err) =>
            sendResponse({
              type: 'APPLICATION_RESULT',
              result: { success: false, errorMessage: String(err) },
            }),
          );
        return true; // async response
      }
    });
  },
});

// ─── DOM Selectors ──────────────────────────────────────────────────────────
// NOTE: Selectors are based on ImmoScout24 DOM structure as of 2025.
// They will need updates when IS24 changes their markup.

const SELECTORS = {
  // Search results page
  listingCard: '[data-testid="result-list-entry"]',
  listingCardAlt: '.result-list__listing',
  listingLink: 'a[href*="/expose/"]',

  // Detail page
  title: 'h1[data-testid="expose-title"]',
  titleAlt: '.expose-title',
  address: '[data-testid="expose-address"]',
  addressAlt: '.address-block',
  warmRent: '[data-testid="price-value"]',
  coldRent: '[data-testid="coldrent-value"]',
  deposit: '[data-testid="deposit-value"]',
  livingSpace: '[data-testid="living-space-value"]',
  availableFrom: '[data-testid="free-from-value"]',
  description: '[data-testid="expose-description-text"]',
  descriptionAlt: '.is24-text.expose-block-content',
  requirements: '[data-testid="criteria-value"]',
  contactName: '[data-testid="contact-broker-name"]',
  contactNameAlt: '.contact-data-name',
  images: '.gallery-block img',

  // Messaging
  contactButton: '[data-testid="sendBtn"]',
  contactButtonAlt: 'a.button-primary[href*="contact"]',
  messageInput: '[data-testid="message"]',
  messageInputAlt: 'textarea[name="message"]',
  sendButton: '[data-testid="sendContactForm"]',
  sendButtonAlt: 'button[type="submit"].form-input-button',
};

// ─── Scraping ────────────────────────────────────────────────────────────────

export async function scrapeListings(): Promise<ListingRecord[]> {
  const listings: ListingRecord[] = [];
  const url = window.location.href;

  // Check if we're on a search results page
  if (
    url.includes('/Suche/') ||
    url.includes('wohnung-mieten') ||
    url.includes('result-list')
  ) {
    return scrapeSearchResults();
  }

  // Check if we're on a detail/expose page
  if (url.includes('/expose/')) {
    const listing = await scrapeDetailPage();
    if (listing) listings.push(listing);
  }

  return listings;
}

function scrapeSearchResults(): ListingRecord[] {
  const listings: ListingRecord[] = [];

  // Try both selector variants
  const cards = [
    ...Array.from(document.querySelectorAll(SELECTORS.listingCard)),
    ...Array.from(document.querySelectorAll(SELECTORS.listingCardAlt)),
  ];

  const uniqueCards = [...new Set(cards)];

  for (const card of uniqueCards) {
    const link = card.querySelector(SELECTORS.listingLink) as HTMLAnchorElement | null;
    if (!link) continue;

    const href = link.getAttribute('href') ?? '';
    const exposeId = extractExposeId(href);
    if (!exposeId) continue;

    const titleEl = card.querySelector('h2, h3, .result-list-entry__address');
    const priceEl = card.querySelector('[data-testid="price"],.result-list-entry__primary-criterion');
    const sizeEl = card.querySelector('[data-testid="living-space"]');

    const listing = createPartialListing(exposeId, {
      title: titleEl?.textContent?.trim() ?? '',
      location: card.querySelector('.result-list-entry__address')?.textContent?.trim() ?? '',
      priceText: priceEl?.textContent?.trim() ?? '',
      sizeText: sizeEl?.textContent?.trim() ?? '',
      url: href.startsWith('http') ? href : `https://www.immobilienscout24.de${href}`,
    });

    listings.push(listing);
  }

  return listings;
}

async function scrapeDetailPage(): Promise<ListingRecord | null> {
  const url = window.location.href;
  const exposeId = extractExposeId(url);
  if (!exposeId) return null;

  const titleEl =
    document.querySelector(SELECTORS.title) ??
    document.querySelector(SELECTORS.titleAlt);

  const addressEl =
    document.querySelector(SELECTORS.address) ??
    document.querySelector(SELECTORS.addressAlt);

  const warmRentEl = document.querySelector(SELECTORS.warmRent);
  const coldRentEl = document.querySelector(SELECTORS.coldRent);
  const depositEl = document.querySelector(SELECTORS.deposit);
  const livingSpaceEl = document.querySelector(SELECTORS.livingSpace);
  const availableFromEl = document.querySelector(SELECTORS.availableFrom);

  const descriptionEl =
    document.querySelector(SELECTORS.description) ??
    document.querySelector(SELECTORS.descriptionAlt);

  const contactNameEl =
    document.querySelector(SELECTORS.contactName) ??
    document.querySelector(SELECTORS.contactNameAlt);

  // Collect criteria/requirements
  const requirementEls = document.querySelectorAll(SELECTORS.requirements);
  const requirements = Array.from(requirementEls)
    .map((el) => el.textContent?.trim())
    .filter(Boolean)
    .join(', ');

  // Collect image URLs
  const imageEls = document.querySelectorAll(SELECTORS.images);
  const imageUrls = Array.from(imageEls)
    .map((img) => (img as HTMLImageElement).src)
    .filter((src) => src && !src.includes('placeholder'));

  const addressText = addressEl?.textContent?.trim() ?? '';
  const { location, district } = parseAddress(addressText);

  return {
    id: `immoscout24-${exposeId}`,
    platform: 'immoscout24',
    listingId: exposeId,
    title: titleEl?.textContent?.trim() ?? `Expose ${exposeId}`,
    location,
    district,
    sizeSqm: parseNumber(livingSpaceEl?.textContent ?? ''),
    rentWarm: parseNumber(warmRentEl?.textContent ?? ''),
    rentCold: parseNumber(coldRentEl?.textContent ?? ''),
    deposit: parseNumber(depositEl?.textContent ?? ''),
    availableFrom: availableFromEl?.textContent?.trim() ?? '',
    vermieterText: contactNameEl?.textContent?.trim() ?? '',
    vermieterAnforderungen: requirements,
    imageUrls: imageUrls.slice(0, 5),
    url,
    scrapedAt: Date.now(),
  };
}

// ─── Application Sending ─────────────────────────────────────────────────────

export async function sendApplication(
  listing: ListingRecord,
  applicationText: string,
): Promise<SendApplicationResult> {
  // Navigate to the listing detail page if not already there
  if (!window.location.href.includes(`/expose/${listing.listingId}`)) {
    window.location.href = listing.url;
    await waitForPageLoad();
  }

  // Try XHR/fetch approach first (preferred — no UI interaction needed)
  try {
    const result = await sendViaAPI(listing.listingId, applicationText);
    if (result.success) return result;
  } catch (e) {
    console.warn('Lyrvio: XHR send failed, falling back to DOM click', e);
  }

  // Fallback: DOM click approach
  return sendViaDOMClick(applicationText);
}

async function sendViaAPI(
  exposeId: string,
  messageText: string,
): Promise<SendApplicationResult> {
  // ImmoScout24 internal contact API endpoint
  // Reverse-engineered from network requests — may change
  const contactUrl = `https://www.immobilienscout24.de/scoutmanager/messages/`;

  const response = await fetch(contactUrl, {
    method: 'POST',
    credentials: 'include', // Use user's session cookies
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      exposeId,
      message: messageText,
      messageType: 'CONTACT_REQUEST',
    }),
  });

  if (response.ok) {
    return { success: true, responseStatus: response.status };
  }

  return {
    success: false,
    responseStatus: response.status,
    errorMessage: `API returned ${response.status}`,
  };
}

async function sendViaDOMClick(
  applicationText: string,
): Promise<SendApplicationResult> {
  // Find and click the contact/send button
  const contactBtn = (
    document.querySelector(SELECTORS.contactButton) ??
    document.querySelector(SELECTORS.contactButtonAlt)
  ) as HTMLElement | null;

  if (!contactBtn) {
    return {
      success: false,
      errorMessage: 'Kontakt-Button nicht gefunden',
    };
  }

  contactBtn.click();
  await delay(1500);

  // Find message textarea
  const messageInput = (
    document.querySelector(SELECTORS.messageInput) ??
    document.querySelector(SELECTORS.messageInputAlt)
  ) as HTMLTextAreaElement | null;

  if (!messageInput) {
    return {
      success: false,
      errorMessage: 'Nachrichtenfeld nicht gefunden',
    };
  }

  // Clear and fill the message
  messageInput.focus();
  messageInput.value = '';
  messageInput.value = applicationText;
  messageInput.dispatchEvent(new Event('input', { bubbles: true }));
  messageInput.dispatchEvent(new Event('change', { bubbles: true }));

  await delay(500);

  // Find and click send button
  const sendBtn = (
    document.querySelector(SELECTORS.sendButton) ??
    document.querySelector(SELECTORS.sendButtonAlt)
  ) as HTMLElement | null;

  if (!sendBtn) {
    return {
      success: false,
      errorMessage: 'Senden-Button nicht gefunden',
    };
  }

  sendBtn.click();
  await delay(2000);

  // Check for success indicator
  const successIndicator = document.querySelector(
    '[data-testid="contact-success"], .contact-form-success, .success-message',
  );

  return {
    success: successIndicator !== null,
    errorMessage: successIndicator === null ? 'Kein Erfolgs-Feedback gefunden' : undefined,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractExposeId(url: string): string | null {
  const match = url.match(/\/expose\/(\d+)/);
  return match?.[1] ?? null;
}

function parseNumber(text: string): number {
  // "1.234,56 €" → 1234.56
  const cleaned = text.replace(/[^\d,]/g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

function parseAddress(addressText: string): { location: string; district: string } {
  // "Musterstraße 5, 10115 Berlin-Mitte" → location: "Berlin", district: "Mitte"
  const parts = addressText.split(',').map((p) => p.trim());
  const cityPart = parts[parts.length - 1] ?? addressText;

  // Extract PLZ + city
  const cityMatch = cityPart.match(/\d{5}\s+(.+)/);
  const fullCity = cityMatch?.[1]?.trim() ?? cityPart;

  // Check for district (Berlin-Mitte, München-Maxvorstadt etc.)
  const districtMatch = fullCity.match(/^([^-]+)-(.+)$/);
  if (districtMatch) {
    return {
      location: districtMatch[1]?.trim() ?? fullCity,
      district: districtMatch[2]?.trim() ?? '',
    };
  }

  return { location: fullCity, district: '' };
}

function createPartialListing(
  exposeId: string,
  data: {
    title: string;
    location: string;
    priceText: string;
    sizeText: string;
    url: string;
  },
): ListingRecord {
  const { location, district } = parseAddress(data.location);
  return {
    id: `immoscout24-${exposeId}`,
    platform: 'immoscout24',
    listingId: exposeId,
    title: data.title,
    location,
    district,
    sizeSqm: parseNumber(data.sizeText),
    rentWarm: parseNumber(data.priceText),
    rentCold: 0,
    deposit: 0,
    availableFrom: '',
    vermieterText: '',
    vermieterAnforderungen: '',
    imageUrls: [],
    url: data.url,
    scrapedAt: Date.now(),
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPageLoad(): Promise<void> {
  if (document.readyState === 'complete') return;
  await new Promise<void>((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true });
  });
}
