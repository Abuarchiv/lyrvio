/**
 * Platform-agnostic send-application interface.
 * Each platform content-script implements this interface.
 */
import type { ListingRecord, Platform } from './storage.ts';

export interface SendApplicationPayload {
  listing: ListingRecord;
  applicationText: string;
}

export interface SendApplicationResult {
  success: boolean;
  errorMessage?: string;
  responseStatus?: number;
}

/**
 * Message types for background <-> content-script communication.
 */
export type ExtensionMessage =
  | {
      type: 'SEND_APPLICATION';
      payload: SendApplicationPayload;
    }
  | {
      type: 'SCRAPE_LISTINGS';
      payload: { url: string };
    }
  | {
      type: 'BOT_STATUS';
    };

export type ExtensionResponse =
  | {
      type: 'APPLICATION_RESULT';
      result: SendApplicationResult;
    }
  | {
      type: 'LISTINGS';
      listings: ListingRecord[];
    }
  | {
      type: 'BOT_STATUS_RESULT';
      active: boolean;
    };

/**
 * Random jitter delay in milliseconds.
 * Base: 30s with ±5s jitter (as required).
 * Extended: up to 180s for platform requests.
 */
export function getPollingDelayMs(extended = false): number {
  if (extended) {
    // 30s to 180s
    return (30 + Math.random() * 150) * 1000;
  }
  // 25s to 35s
  return (25 + Math.random() * 10) * 1000;
}

/**
 * Platform-specific search URL builders.
 */
export function buildSearchUrl(
  platform: Platform,
  criteria: {
    city: string;
    maxRentWarm: number;
    minSizeSqm: number;
    maxSizeSqm: number;
  },
): string {
  switch (platform) {
    case 'immoscout24':
      return buildImmoScout24Url(criteria);
    case 'immowelt':
      return `https://www.immowelt.de/liste/${criteria.city.toLowerCase()}/wohnungen/mieten?ami=${criteria.minSizeSqm}&ama=${criteria.maxSizeSqm}&rwp=${criteria.maxRentWarm}`;
    case 'immonet':
      return `https://www.immonet.de/immobiliensuche/sel.do?topapplocationid=8&marketingtype=0&objecttype=1`;
    case 'kleinanzeigen':
      return `https://www.kleinanzeigen.de/s-wohnung-mieten/${criteria.city.toLowerCase()}/c203`;
    case 'wunderflats':
      return `https://wunderflats.com/de/moeblierte-wohnungen/${criteria.city.toLowerCase()}`;
    default:
      return '';
  }
}

function buildImmoScout24Url(criteria: {
  city: string;
  maxRentWarm: number;
  minSizeSqm: number;
  maxSizeSqm: number;
}): string {
  const city = criteria.city.toLowerCase().replace(/\s+/g, '-');
  return (
    `https://www.immobilienscout24.de/Suche/de/${city}/wohnung-mieten` +
    `?geocodes=110` +
    `&livingspace=${criteria.minSizeSqm}.0-${criteria.maxSizeSqm}.0` +
    `&price=-${criteria.maxRentWarm}.0` +
    `&sorting=2` + // newest first
    `&pageSize=20`
  );
}
