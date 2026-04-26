/**
 * Immowelt Content Script — Phase 2 Stub
 */
import { defineContentScript } from 'wxt/sandbox';

export default defineContentScript({
  matches: ['https://www.immowelt.de/*'],
  main() {
    chrome.runtime.onMessage.addListener((_message, _sender, sendResponse) => {
      // Phase 2: Implement scraping and sending for Immowelt
      sendResponse({ type: 'LISTINGS', listings: [], stub: true });
    });
  },
});
