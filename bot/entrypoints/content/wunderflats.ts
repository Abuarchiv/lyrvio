/**
 * Wunderflats Content Script — Phase 2 Stub
 */
import { defineContentScript } from 'wxt/sandbox';

export default defineContentScript({
  matches: ['https://wunderflats.com/*'],
  main() {
    chrome.runtime.onMessage.addListener((_message, _sender, sendResponse) => {
      // Phase 2: Implement scraping and sending for Wunderflats
      sendResponse({ type: 'LISTINGS', listings: [], stub: true });
    });
  },
});
