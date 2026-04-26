# Store-Submission Checkliste

---

## Phase 1 — Pre-Submission Build-Check

### Extension-Build verifizieren

- [ ] `pnpm build` im `bot/`-Verzeichnis läuft ohne Fehler
- [ ] `bot/.output/chrome-mv3/` enthält vollständiges Bundle
- [ ] `pnpm build --browser firefox` läuft ohne Fehler
- [ ] `bot/.output/firefox-mv2/` enthält vollständiges Bundle
- [ ] Manifest-Versionen korrekt: Chrome = MV3, Firefox = MV2

### Manifest-Validation

**Chrome MV3:**
```bash
# Prüfe Manifest
cat bot/.output/chrome-mv3/manifest.json | python3 -m json.tool

# Pflichtfelder prüfen
# ✓ name
# ✓ version
# ✓ description (unter 132 Zeichen)
# ✓ icons (128x128 Pflicht)
# ✓ permissions (nur was genutzt wird)
# ✓ host_permissions (separat von permissions in MV3)
```

**Firefox MV2:**
```bash
# Prüfe Manifest
cat bot/.output/firefox-mv2/manifest.json | python3 -m json.tool

# Zusatz-Pflicht für AMO:
# ✓ browser_specific_settings.gecko.id (lyrvio@extension)
# ✓ browser_specific_settings.gecko.strict_min_version
```

### Funktionstest (manuell, vor Submission)

- [ ] Extension in Chrome laden (chrome://extensions → Developer Mode → Load Unpacked → `bot/.output/chrome-mv3/`)
- [ ] Extension in Firefox laden (about:debugging → Load Temporary Add-on → `bot/.output/firefox-mv2/manifest.json`)
- [ ] Login-Flow funktioniert (Magic Link)
- [ ] Options-Seite speichert und lädt Profil korrekt
- [ ] Bot-Start/Stop-Toggle funktioniert
- [ ] Popup zeigt korrekten Status
- [ ] Notifications erscheinen (Test mit RUN_NOW-Message)

### ZIP erstellen

**Chrome:**
```bash
cd bot/.output/chrome-mv3 && zip -r ../../lyrvio-chrome-v0.1.0.zip . && cd ../..
```

**Firefox:**
```bash
cd bot/.output/firefox-mv2 && zip -r ../../lyrvio-firefox-v0.1.0.zip . && cd ../..
```

- [ ] Chrome ZIP erstellt: `bot/lyrvio-chrome-v0.1.0.zip`
- [ ] Firefox ZIP erstellt: `bot/lyrvio-firefox-v0.1.0.zip`

---

## Phase 2 — Developer-Account Setup

### Chrome Developer Account

**URL:** https://chrome.google.com/webstore/devconsole
**Einmalige Gebühr:** 5 USD (Google Pay / Kreditkarte)
**Google-Account:** Lyrvio-Geschäftsemail empfohlen (support@lyrvio.com oder dev@lyrvio.com)

Schritte:
1. [ ] Google-Account für Lyrvio erstellen (dev@lyrvio.com oder nutze bestehenden)
2. [ ] Developer Registration abschließen ($5 zahlen)
3. [ ] Publisher-Name setzen: „Lyrvio"
4. [ ] Support-E-Mail eintragen: support@lyrvio.com
5. [ ] Website verlinken: https://lyrvio.com
6. [ ] Privacy Policy URL: https://lyrvio.com/datenschutz

### Firefox Developer Account (AMO)

**URL:** https://addons.mozilla.org/developers/
**Kosten:** Kostenlos
**Option A:** Selbst-Signiert (Self-Hosted, sofort verfügbar — kein Review-Wait)
**Option B:** AMO-Listed (Review durch Mozilla, erscheint in AMO-Store)

Empfehlung: Erst Option A (Self-Hosted) für Beta-Nutzer, dann Option B für öffentliche Sichtbarkeit.

Schritte:
1. [ ] Mozilla-Account erstellen (oder einloggen)
2. [ ] Add-on einreichen unter „Submit New Add-on"
3. [ ] Distribution: „On this site" (AMO-Listed) wählen
4. [ ] Source-Code-Link angeben: https://github.com/Abuarchiv/lyrvio

---

## Phase 3 — Assets-Checklist

### Chrome

- [ ] Icon 128×128 PNG vorhanden (`docs/store-listings/assets/chrome-icon-128x128.png`)
- [ ] Promo-Tile 440×280 PNG vorhanden (`docs/store-listings/assets/chrome-promo-440x280.png`)
- [ ] Mindestens 1 Screenshot 1280×800 vorhanden
- [ ] Alle 5 Screenshots für maximale Wirkung vorhanden

### Firefox

- [ ] Icon 64×64 PNG vorhanden (`docs/store-listings/assets/firefox-icon-64x64.png`)
- [ ] Header-Image 1080×180 PNG (optional aber empfohlen)
- [ ] Mindestens 1 Screenshot vorhanden

---

## Phase 4 — Submission-Formulare ausfüllen

### Chrome — Listing-Felder

- [ ] **Name:** „Lyrvio — Wohnungs-Bot DE" (exakt)
- [ ] **Short Description:** Aus `chrome.md` kopieren (max 132 Zeichen)
- [ ] **Detailed Description:** Aus `chrome.md` kopieren
- [ ] **Category:** Productivity
- [ ] **Language:** Deutsch (primary), English (secondary optional)
- [ ] **Privacy Policy URL:** https://lyrvio.com/datenschutz
- [ ] **Homepage:** https://lyrvio.com
- [ ] **Support Email:** support@lyrvio.com
- [ ] **Permissions Justification:** Aus `chrome.md` Abschnitt Permissions kopieren (pro Permission eine Zeile)

### Firefox — Listing-Felder

- [ ] **Name:** „Lyrvio — Wohnungs-Bewerbungs-Bot"
- [ ] **Summary:** Aus `firefox.md` kopieren (max 250 Zeichen)
- [ ] **Description:** Aus `firefox.md` kopieren
- [ ] **Categories:** Productivity + Web Development
- [ ] **Tags:** wohnung, immobilien, bewerbung, automation, deutschland
- [ ] **Privacy Policy:** https://lyrvio.com/datenschutz
- [ ] **Homepage:** https://lyrvio.com
- [ ] **Support URL:** https://lyrvio.com/support
- [ ] **Source Code:** https://github.com/Abuarchiv/lyrvio

---

## Phase 5 — Review-Wait & nächste Schritte

### Chrome

**Erwartete Review-Zeit:**
- Standard: 1–3 Werktage (neue Extension)
- Mit Reviewer-Notes + Test-Account: tendenziell schneller
- Bei Reject: i.d.R. 3–5 Tage bis zweite Review nach Fix

**Häufige Reject-Gründe + Mitigation:**

| Grund | Mitigation |
|-------|------------|
| Permissions zu breit | Nur permissions nutzen die aktiv verwendet werden (aktuelle Manifest stimmt) |
| Fehlende Datenschutzerklärung | lyrvio.com/datenschutz muss live und erreichbar sein vor Submission |
| Remote-Code-Execution verdächtig | CSP in Manifest klar gesetzt: `script-src 'self'` |
| Automation auf Drittseite ohne Begründung | Reviewer Notes (reviewer-notes.md) bei Submission hochladen / im Notizen-Feld einfügen |
| Unklarer Zweck / Keyword-Stuffing in Description | Description klar und direkt (kein Keyword-Spam) |
| Icon nicht transparent | PNG mit transparentem Hintergrund sicherstellen |
| Screenshot zeigt Fehler oder Test-UI | Screenshots nur aus funktionierendem Build |

**Was tun bei Reject:**
1. Rejection-Mail lesen — Chrome gibt konkrete Reasons an
2. Fix in weniger als 24h umsetzen
3. Neue Version hochladen (Version bumpen: 0.1.1)
4. Reviewer-Notes aktualisieren falls nötig
5. Re-submit — zweite Reviews sind i.d.R. schneller

### Firefox (AMO-Listed)

**Erwartete Review-Zeit:**
- Erste Review: kann 1–8 Wochen dauern (AMO hat Backlog)
- Self-Hosted-Option: Sofort verfügbar nach automatischer Signierung (empfohlen für Beta)
- Nach erstem Listed-Approval: Updates meist innerhalb 1–3 Tagen

**Häufige AMO-Reject-Gründe:**

| Grund | Mitigation |
|-------|------------|
| Fehlender Source-Code | GitHub-Link angeben (github.com/Abuarchiv/lyrvio) |
| `eval()` oder dynamischer Code | Nicht vorhanden in Lyrvio — CSP verhindert es |
| Obfuscierter Code | WXT-Build produziert lesbaren Output — kein Minifier der Variablennamen verschleiert |
| Remote-Code-Execution | CSP `script-src 'self'` in Manifest |
| Irreführende Description | Description korrekt und honest halten |

**Firefox Self-Hosting (für Beta):**
```bash
# AMO-Signierung ohne Listed-Review (schnell):
# 1. web-ext installieren
npm install -g web-ext

# 2. AMO API-Key generieren unter addons.mozilla.org/developers → API-Keys
# 3. Signieren:
web-ext sign --api-key=<AMO_JWT_ISSUER> --api-secret=<AMO_JWT_SECRET> \
  --source-dir=bot/.output/firefox-mv2/
```

---

## Phase 6 — Post-Approval

### Nach Chrome-Approval

- [ ] Extension-ID notieren (chrome.google.com/webstore/detail/<ID>)
- [ ] Store-URL in lyrvio.com/download verlinken
- [ ] Google Analytics in CWS Dashboard aktivieren (kostenlos)
- [ ] Erste Review-Antworten über CWS Developer Dashboard überwachen

### Nach Firefox-Approval

- [ ] AMO-Extension-URL notieren
- [ ] lyrvio.com/download mit Firefox-Link ergänzen
- [ ] AMO-Statistics-Dashboard überwachen

---

## Wichtige URLs

| Ressource | URL |
|-----------|-----|
| Chrome Developer Dashboard | https://chrome.google.com/webstore/devconsole |
| Chrome Review Policies | https://developer.chrome.com/docs/webstore/program-policies |
| Firefox Developer Hub | https://addons.mozilla.org/developers |
| AMO Review Policies | https://extensionworkshop.com/documentation/publish/add-on-policies |
| AMO Source Submission Guide | https://extensionworkshop.com/documentation/publish/source-code-submission |
| web-ext CLI | https://extensionworkshop.com/documentation/develop/web-ext-technical-reference |
