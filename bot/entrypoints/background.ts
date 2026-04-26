/**
 * Lyrvio Background Service Worker
 *
 * Polling-Loop architecture:
 * 1. Chrome Alarm fires every ~30s
 * 2. Worker opens/reuses ImmoScout tab
 * 3. Messages content-script to scrape listings
 * 4. Match-engine filters by user criteria
 * 5. For each match: LLM generates personalized application
 * 6. Content-script sends the application via ImmoScout
 * 7. IndexedDB deduplication prevents double sends
 */
import { defineBackground } from 'wxt/sandbox';
import {
  getBotState,
  saveBotState,
  getUserProfile,
  hasListing,
  saveListing,
  hasApplied,
  saveSentApplication,
  updateBotStats,
  log,
  type ListingRecord,
  type BotState,
} from '../lib/storage.ts';
import { matchListing } from '../lib/matcher.ts';
import { generateApplication } from '../lib/application.ts';
import { getSession, getOpenRouterKey } from '../lib/auth.ts';
import { getPollingDelayMs, buildSearchUrl } from '../lib/plattform-api.ts';
import { reportMetrics } from '../lib/api-client.ts';

const ALARM_NAME = 'lyrvio-poll';
const ALARM_PERIOD_MINUTES = 0.5; // ~30s minimum (Chrome enforces >= 1min in MV3, use 1)
// Note: Chrome MV3 alarms minimum period is 1 minute.
// For sub-minute polling we chain alarms or use setInterval in the SW lifecycle.

export default defineBackground({
  type: 'module',
  persistent: false, // MV3 service worker
  main() {
    // ── Alarm Setup ────────────────────────────────────────────────────────
    chrome.alarms.create(ALARM_NAME, {
      delayInMinutes: 1,
      periodInMinutes: 1, // Chrome MV3 minimum is 1 minute
    });

    chrome.alarms.onAlarm.addListener(async (alarm) => {
      if (alarm.name !== ALARM_NAME) return;
      await runPollingCycle();
    });

    // ── Message Handler (from popup) ────────────────────────────────────────
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      handleMessage(message)
        .then(sendResponse)
        .catch((err) => sendResponse({ error: String(err) }));
      return true;
    });

    // ── Startup: resume if was active ──────────────────────────────────────
    void (async () => {
      const state = await getBotState();
      if (state.active) {
        await log('info', 'Service Worker gestartet — Bot ist aktiv, starte ersten Scan');
        // Run first cycle immediately on startup
        setTimeout(() => runPollingCycle(), 5000);
      }
    })();
  },
});

// ─── Main Polling Cycle ───────────────────────────────────────────────────────

async function runPollingCycle(): Promise<void> {
  try {
    const state = await getBotState();

    if (!state.active) return;

    // Check pause
    if (state.pausedUntil && state.pausedUntil > Date.now()) {
      await log('debug', `Bot pausiert bis ${new Date(state.pausedUntil).toISOString()}`);
      return;
    }

    const profile = await getUserProfile();
    if (!profile) {
      await log('warn', 'Kein Benutzerprofil gefunden — bitte einloggen');
      return;
    }

    const session = await getSession();
    if (!session) {
      await log('warn', 'Keine Session — bitte einloggen');
      return;
    }

    const apiKey = await getOpenRouterKey();
    if (!apiKey) {
      await log('warn', 'Kein OpenRouter API Key gesetzt');
      return;
    }

    await log('debug', 'Polling-Zyklus gestartet');

    // Update last scan timestamp
    await saveBotState({ ...state, lastScanAt: Date.now() });

    // Cycle through enabled platforms
    const platforms = profile.searchCriteria.platforms;
    const city = profile.searchCriteria.cities[0] ?? 'berlin';

    for (const platform of platforms) {
      if (platform !== 'immoscout24') continue; // Phase 1: only ImmoScout

      try {
        await scanPlatform(platform, city, profile, apiKey, session);
      } catch (err) {
        await log('error', `Plattform ${platform} Scan fehlgeschlagen`, err);
      }

      // Random delay between platform requests (bot detection avoidance)
      await sleep(getPollingDelayMs(true));
    }

    await log('debug', 'Polling-Zyklus abgeschlossen');
  } catch (err) {
    await log('error', 'Polling-Zyklus fehlgeschlagen', err);
  }
}

async function scanPlatform(
  platform: 'immoscout24',
  city: string,
  profile: Awaited<ReturnType<typeof getUserProfile>> & {},
  apiKey: string,
  session: NonNullable<Awaited<ReturnType<typeof getSession>>>,
): Promise<void> {
  const searchUrl = buildSearchUrl(platform, {
    city,
    maxRentWarm: profile.searchCriteria.maxRentWarm,
    minSizeSqm: profile.searchCriteria.minSizeSqm,
    maxSizeSqm: profile.searchCriteria.maxSizeSqm,
  });

  if (!searchUrl) return;

  // Find or create ImmoScout tab
  let tab = await findExistingTab(platform);
  if (!tab) {
    tab = await chrome.tabs.create({ url: searchUrl, active: false });
  } else {
    await chrome.tabs.update(tab.id!, { url: searchUrl });
  }

  if (!tab.id) return;

  // Wait for page load
  await waitForTabLoad(tab.id);
  await sleep(2000 + Math.random() * 1000);

  // Scrape listings from content script
  let listings: ListingRecord[] = [];
  try {
    const response = await chrome.tabs.sendMessage(tab.id, {
      type: 'SCRAPE_LISTINGS',
      payload: { url: searchUrl },
    });
    listings = response?.listings ?? [];
  } catch (err) {
    await log('error', `Scraping fehlgeschlagen für ${platform}`, err);
    return;
  }

  await updateBotStats({ totalScanned: listings.length });
  await log('info', `${listings.length} Listings gefunden auf ${platform}`);

  // Process each listing
  let sentInBatch = 0;

  for (const listing of listings) {
    // Deduplication check
    const alreadySeen = await hasListing(listing.id);
    const alreadyApplied = await hasApplied(listing.id);

    if (alreadySeen && alreadyApplied) continue;

    // Save listing
    if (!alreadySeen) {
      await saveListing(listing);
    }

    // Match engine
    const match = matchListing(listing, profile.searchCriteria);
    if (!match.matched) {
      await log('debug', `Listing ${listing.id} nicht gematcht: ${match.reasons.join(', ')}`);
      continue;
    }

    await updateBotStats({ totalMatched: 1 });

    // Already applied? Skip
    if (alreadyApplied) continue;

    // Generate application via LLM
    let applicationText: string;
    try {
      applicationText = await generateApplication(profile, listing, apiKey);
    } catch (err) {
      await log('error', `LLM-Bewerbungs-Generierung fehlgeschlagen für ${listing.id}`, err);
      continue;
    }

    // Random delay before sending (bot detection avoidance: 30-180s)
    const delayMs = getPollingDelayMs(true);
    await log('debug', `Sende in ${Math.round(delayMs / 1000)}s für ${listing.id}`);
    await sleep(delayMs);

    // Navigate to listing and send application
    await chrome.tabs.update(tab.id, { url: listing.url });
    await waitForTabLoad(tab.id);
    await sleep(2000 + Math.random() * 1000);

    let sendResult: { success: boolean; errorMessage?: string; responseStatus?: number };
    try {
      const response = await chrome.tabs.sendMessage(tab.id, {
        type: 'SEND_APPLICATION',
        payload: { listing, applicationText },
      });
      sendResult = response?.result ?? { success: false, errorMessage: 'No response' };
    } catch (err) {
      sendResult = { success: false, errorMessage: String(err) };
    }

    // Save result
    const sentApp = {
      id: `${listing.id}-${Date.now()}`,
      listingId: listing.id,
      platform: listing.platform,
      applicationText,
      sentAt: Date.now(),
      status: (sendResult.success ? 'sent' : 'error') as 'sent' | 'error',
      errorMessage: sendResult.errorMessage,
    };

    await saveSentApplication(sentApp);

    if (sendResult.success) {
      await updateBotStats({ totalSent: 1 });
      sentInBatch++;

      // Update profile's style counter for next application
      const updatedProfile = await getUserProfile();
      if (updatedProfile) {
        const { saveUserProfile } = await import('../lib/storage.ts');
        await saveUserProfile({
          ...updatedProfile,
          applicationStyleCounter: updatedProfile.applicationStyleCounter + 1,
        });
      }

      // Update last sent timestamp
      const currentState = await getBotState();
      await saveBotState({ ...currentState, lastSentAt: Date.now() });

      // Show notification
      await chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon/48.png',
        title: 'Lyrvio — Bewerbung gesendet',
        message: `Bewerbung für "${listing.title}" erfolgreich gesendet.`,
      });

      await log('info', `Bewerbung gesendet für ${listing.id}: "${listing.title}"`);
    } else {
      await log('warn', `Bewerbung fehlgeschlagen für ${listing.id}: ${sendResult.errorMessage}`);
    }
  }

  // Report metrics to backend (non-sensitive counts only)
  if (sentInBatch > 0) {
    try {
      await reportMetrics(session, {
        sentCount: sentInBatch,
        platform,
        timestamp: Date.now(),
      });
    } catch {
      // Non-critical
    }
  }
}

// ─── Message Handler ──────────────────────────────────────────────────────────

async function handleMessage(message: { type: string; payload?: unknown }): Promise<unknown> {
  switch (message.type) {
    case 'GET_STATE': {
      return getBotState();
    }

    case 'SET_ACTIVE': {
      const payload = message.payload as { active: boolean };
      const state = await getBotState();
      await saveBotState({ ...state, active: payload.active });
      if (payload.active) {
        await log('info', 'Bot aktiviert');
        void runPollingCycle();
      } else {
        await log('info', 'Bot pausiert');
      }
      return { success: true };
    }

    case 'PAUSE_UNTIL': {
      const payload = message.payload as { until: number };
      const state = await getBotState();
      await saveBotState({ ...state, pausedUntil: payload.until, active: true });
      return { success: true };
    }

    case 'RUN_NOW': {
      void runPollingCycle();
      return { success: true };
    }

    default:
      return { error: `Unknown message type: ${message.type}` };
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function findExistingTab(platform: string): Promise<chrome.tabs.Tab | null> {
  const patterns: Record<string, string> = {
    immoscout24: 'https://www.immobilienscout24.de/*',
    immowelt: 'https://www.immowelt.de/*',
    immonet: 'https://www.immonet.de/*',
    kleinanzeigen: 'https://www.kleinanzeigen.de/*',
    wunderflats: 'https://wunderflats.com/*',
  };

  const pattern = patterns[platform];
  if (!pattern) return null;

  const tabs = await chrome.tabs.query({ url: pattern });
  return tabs[0] ?? null;
}

async function waitForTabLoad(tabId: number, timeoutMs = 30000): Promise<void> {
  return new Promise((resolve) => {
    const start = Date.now();

    const checkStatus = async () => {
      try {
        const tab = await chrome.tabs.get(tabId);
        if (tab.status === 'complete') {
          resolve();
          return;
        }
      } catch {
        resolve();
        return;
      }

      if (Date.now() - start > timeoutMs) {
        resolve();
        return;
      }

      setTimeout(checkStatus, 500);
    };

    void checkStatus();
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
