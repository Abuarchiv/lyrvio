import { defineConfig } from 'wxt';

export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Lyrvio – Automatische Wohnungsbewerbung',
    description: 'Scannt ImmoScout24 und sendet personalisierte Bewerbungen automatisch.',
    version: '0.1.0',
    permissions: [
      'activeTab',
      'storage',
      'alarms',
      'notifications',
      'tabs',
    ],
    host_permissions: [
      'https://www.immobilienscout24.de/*',
      'https://api.lyrvio.de/*',
      'https://openrouter.ai/*',
    ],
    action: {
      default_popup: 'popup/index.html',
      default_icon: {
        16: 'icon/16.png',
        32: 'icon/32.png',
        48: 'icon/48.png',
        128: 'icon/128.png',
      },
    },
    icons: {
      16: 'icon/16.png',
      32: 'icon/32.png',
      48: 'icon/48.png',
      128: 'icon/128.png',
    },
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'",
    },
    browser_specific_settings: {
      gecko: {
        id: 'lyrvio@extension',
        strict_min_version: '109.0',
      },
    },
  },
});
