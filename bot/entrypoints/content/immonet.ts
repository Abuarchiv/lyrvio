/**
 * Immonet Content Script — Phase 2 Stub
 */
import { defineContentScript } from 'wxt/sandbox';

export default defineContentScript({
  matches: ['https://www.immonet.de/*'],
  main() {
    chrome.runtime.onMessage.addListener((_message, _sender, sendResponse) => {
      // Phase 2: Implement scraping and sending for Immonet
      sendResponse({ type: 'LISTINGS', listings: [], stub: true });
    });
  },
});
