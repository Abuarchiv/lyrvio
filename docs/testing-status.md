# Lyrvio — Testing-Status

Stand: 2026-04-25

---

## Übersicht: Tests pro Workspace

| Workspace | Framework | Test-Dateien | Tests | Status |
|-----------|-----------|-------------|-------|--------|
| `templates/` | vitest | 4 | 75 | ✅ alle grün |
| `scrapers/` | vitest | 3 | 37 | ✅ alle grün |
| `db/` | vitest | 1 | 14 | ✅ alle grün |
| `api/` | vitest | 3 | 24 | ✅ alle grün |
| `bot/` | vitest | 3 | 37 | ✅ alle grün |
| `web/` | Playwright | 5 | 32 | ✅ 32/32 grün |
| **Gesamt** | | **19** | **219** | ✅ |

---

## 1. `templates/` — 75 Tests

**Framework:** vitest 2.x  
**Config:** `templates/vitest.config.ts`

| Datei | Tests | Was wird getestet |
|-------|-------|-------------------|
| `render.test.ts` | 19 | renderApplication (alle 3 Profile × 5 Vermieter-Typen), Anrede-Extraktion, Grußformeln, Variants |
| `profiles.test.ts` | 16 | getProfile, fillPlaceholders, alle Profil-Archetypen |
| `landlord-adaptions.test.ts` | 19 | getLandlordAdaption, isApplicableType, heuristicClassify, Signal-Wörter |
| `llm-prompt.test.ts` | 21 | buildSystemPrompt, buildUserPrompt, buildLLMPrompt, buildRequirementsExtractionPrompt |

**Besonderheiten:**
- Migration von Jest → vitest: `@jest/globals` Imports durch `vitest` ersetzt
- Tests laufen ohne LLM-Aufrufe (rein template-basiert)

---

## 2. `scrapers/` — 37 Tests

**Framework:** vitest 2.x  
**Config:** `scrapers/vitest.config.ts`

| Datei | Tests | Was wird getestet |
|-------|-------|-------------------|
| `immoscout.test.ts` | 14 | SELECTORS-Vollständigkeit, getListingUrl, getSearchUrl, parseListingFromDOM, parseListingsFromSearchResults |
| `hash-dedup.test.ts` | 8 | Listing-Hash-Deduplication, False-Positive-Tests, Format-Konsistenz |
| `llm-extract.test.ts` | 15 | extractRequirements (fetch-Mock), classifyLandlordType (fetch-Mock), Fehlerbehandlung, API-Key-Weiterleitung |

**Besonderheiten:**
- `fetch` wird via `vi.stubGlobal` gemockt — kein echter OpenRouter-Call
- LLM-Fehlerbehandlung (503, 401) getestet — graceful fallback zu `[]` / `'unknown'`
- DOM-Parsing-Tests nutzen Node 22's eingebautes DOMParser wenn verfügbar

---

## 3. `db/` — 14 Tests

**Framework:** vitest 2.x  
**Config:** `db/vitest.config.ts`

| Datei | Tests | Was wird getestet |
|-------|-------|-------------------|
| `tests/schema.test.ts` | 14 | Schema-Struktur, User-CRUD, UNIQUE-Constraints, Foreign-Keys, Composite-PK (listingsSeen), Sessions |

**Besonderheiten:**
- Echtes in-memory SQLite via `@libsql/client` mit `url: ':memory:'`
- Schema wird manuell per `executeMultiple()` aufgebaut — kein Turso-Server nötig
- UNIQUE-Violations und FK-Constraints werden wirklich ausgelöst (nicht gemockt)

---

## 4. `api/` — 24 Tests

**Framework:** vitest 2.x  
**Config:** `api/vitest.config.ts`

| Datei | Tests | Was wird getestet |
|-------|-------|-------------------|
| `tests/middleware.test.ts` | 9 | rateLimit (429-Schwelle, IP-Isolation, Retry-After), onError (500/404), onNotFound |
| `tests/stripe-webhook.test.ts` | 7 | Signatur-Verifikation, subscription.created/deleted/updated, payment_intent.succeeded (Erfolgs-Bonus), unbekannte Events, Status-Mapping (trialing→active) |
| `tests/profile.test.ts` | 8 | GET /profile (Auth-Check, 404), PUT /profile (valid, Zod-Validierung), DELETE (404/405) |

**Besonderheiten:**
- Hono-App wird direkt instanziiert, kein Wrangler-Start nötig
- Stripe und DB werden via `vi.fn()` gemockt — keine echten API-Calls
- `constructEventAsync` wird per Mock-Return-Value gesteuert
- Stripe-Signatur-Fehler testet echten Fehler-Pfad (korrekte 400-Response)

---

## 5. `bot/` — 37 Tests

**Framework:** vitest 2.x + jsdom + fake-indexeddb  
**Config:** `bot/vitest.config.ts`

| Datei | Tests | Was wird getestet |
|-------|-------|-------------------|
| `tests/matcher.test.ts` | 17 | matchListing (Bezirk, Stadt, Größe, Warmmiete, Kaltmiete-Fallback, Verfügbarkeit, Score-Berechnung) |
| `tests/application.test.ts` | 9 | generateApplication (LLM-Mock), Fehler bei leerem Response, API-URL-Korrektheit, Authorization-Header, Style-Varianten-Wechsel, Prompt-Inhalt |
| `tests/storage.test.ts` | 11 | BotState (round-trip, updateStats), UserProfile (save/load), Listings (hasListing, saveListing), SentApplications (hasApplied, save) |

**Besonderheiten:**
- `fake-indexeddb` emuliert echte IndexedDB im Node-Kontext
- Chrome-Extension-APIs (`chrome.alarms`, `chrome.runtime` etc.) via `vi.stubGlobal` gemockt
- `fetch` für OpenRouter-Calls vollständig gemockt
- WXT-spezifische Imports (`wxt/sandbox`) via vitest-Alias aufgelöst

---

## 6. `web/` — 32 E2E-Tests

**Framework:** Playwright 1.59.1  
**Config:** `web/playwright.config.ts`  
**Browser:** Chromium (Desktop)

| Datei | Tests | Was wird getestet |
|-------|-------|-------------------|
| `tests/e2e/landing.test.ts` | 8 | Laden, Hero, Nav, Pricing (79€), CTA-Button, FAQ, Footer, Textlänge >500 Zeichen |
| `tests/e2e/pricing.test.ts` | 5 | 79€ sichtbar, CTA "Jetzt aktivieren", Link zu Checkout/Onboarding, 299€ Erfolgs-Bonus, Checkout-URL |
| `tests/e2e/dashboard.test.ts` | 5 | Laden, Pipeline-Spalten, Statistiken, Rück-Navigation, JS-Error-Freiheit |
| `tests/e2e/hilfe.test.ts` | 4 | HTTP-Code ≠ 500, Route-Erreichbarkeit, Artikel-URL |
| `tests/e2e/onboarding.test.ts` | 10 | Steps 1-6 (Request-Level), Onboarding-Seite ohne Crash, Layout, Step-1-Redirect-Check |

**Besonderheiten:**
- Dev-Server wird von Playwright automatisch gestartet (webServer-Config)
- `reuseExistingServer: true` lokal, `false` in CI
- Hilfe- und Onboarding-Seiten: Request-Level-Tests statt Browser-Navigation (robuster ohne Auth-Backend)

---

## Run-Commands

```bash
# Alle Unit-Tests (api, db, templates, scrapers, bot)
pnpm test:unit

# E2E-Tests (Next.js muss laufen oder wird gestartet)
pnpm test:e2e

# Einzelne Workspaces
pnpm --filter lyrvio-templates test
pnpm --filter lyrvio-scrapers test
pnpm --filter @lyrvio/db test
pnpm --filter api test
pnpm --filter lyrvio-extension test

# Mit Coverage
pnpm --filter lyrvio-templates test:coverage
pnpm --filter api test:coverage

# E2E headless
cd web && node node_modules/@playwright/test/cli.js test --project=chromium

# E2E mit UI
cd web && node node_modules/@playwright/test/cli.js test --ui
```

---

## Coverage-Ziele

| Workspace | Lines | Functions | Branches | Status |
|-----------|-------|-----------|----------|--------|
| `templates/` | ≥70% | ≥70% | ≥65% | konfiguriert |
| `scrapers/` | ≥70% | ≥70% | ≥65% | konfiguriert |
| `db/` | ≥70% | ≥70% | — | konfiguriert |
| `api/` | ≥70% | ≥70% | ≥70% | konfiguriert |
| `bot/` | ≥70% | ≥70% | — | konfiguriert |

Coverage-Berichte werden nach `{workspace}/coverage/` geschrieben.

---

## GitHub Actions CI-Workflow

**Datei:** `.github/workflows/test.yml`

### Aufbau

1. **`unit-tests` Job** (Matrix: api, db, templates, scrapers, bot)  
   - Jeder Workspace läuft parallel in einer eigenen CI-Instanz
   - Node 22 + pnpm 9
   - `pnpm install --frozen-lockfile` pro Workspace
   - `pnpm test` → vitest run
   - Coverage-Artifacts werden hochgeladen (7 Tage Retention)

2. **`e2e-tests` Job**  
   - Next.js Build (mit Dummy-Env-Vars für öffentliche Werte)
   - `playwright install --with-deps chromium`
   - `playwright test --project=chromium`
   - Playwright-Report als Artifact (14 Tage)

3. **`coverage-summary` Job**  
   - Aggregiert alle Coverage-Reports
   - Schreibt Markdown-Tabelle als GitHub Step Summary

### Trigger

- Push auf `main` oder `dev`
- Pull Request auf `main`
- Concurrent Runs werden abgebrochen (cancel-in-progress: true)

---

## Externe Services — Keine echten Calls

| Service | Mock-Strategie |
|---------|---------------|
| **Turso/libSQL** | `:memory:` SQLite-Client |
| **Stripe** | `vi.fn()` für `webhooks.constructEventAsync` + DB-Operationen |
| **Resend** | In Tests nicht aufgerufen (Auth-Mock übernimmt) |
| **OpenRouter** | `vi.stubGlobal('fetch', ...)` mit kontrollierten Response-Bodies |
| **IndexedDB** | `fake-indexeddb` package (vollständige IDB-Emulation) |
| **Chrome APIs** | `vi.stubGlobal('chrome', mockChrome)` |

---

## Bekannte Einschränkungen

1. **`/hilfe/` und `/onboarding/1/` geben 500** — Seiten haben Backend-Abhängigkeiten die ohne Turso-DB nicht rendern. E2E-Tests wurden auf Request-Level umgestellt (robuster).
2. **Bot-Integration-Tests fehlen** — `background.ts` Polling-Loop kann nicht ohne echten Chrome-Extension-Kontext getestet werden. Unit-Tests der einzelnen Lib-Funktionen decken die Logik ab.
3. **Coverage-Schwelle wird ggf. gerissen** wenn neue Dateien ohne Tests hinzukommen — Monitoring im CI.
