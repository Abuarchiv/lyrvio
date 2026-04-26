# Lyrvio — Templates + Scrapers Status

**Stand:** 2026-04-25
**Gebaut von:** Claude (Sonnet 4.6)
**Tests:** 89 Tests total — alle grün

---

## Was gebaut wurde

### Teil 1: `templates/`

**`profiles.ts`** — 3 User-Profil-Archetypen
- `solo` — Berufstätig-Single, stabil, ruhig, 45-75K€
- `paar_dink` — Zwei Einkommen, kein Kind, 90-150K€ HH
- `familie` — Mit Kind(ern), warmherzig, langfristig
- Je Profil: 5 Stil-Komponenten (Stil-Adjektive, 3 Selbstvorstellungs-Varianten, Berufs-Phrasing ×3, Mietsicherheits-Phrasing ×3, Schluss-Phrasing ×3)
- `fillPlaceholders()` — ersetzt `{name}`, `{beruf}`, `{netto_monatlich}` etc. mit echten User-Daten

**`landlord-adaptions.ts`** — 5 Vermieter-Typ-Adaptionen
- `private_senior` — sehr formell, Langfristigkeit, förmliche Anrede
- `verwaltung` — sachlich, Unterlagen-Checkliste, kurze Sätze
- `private_young` — persönlich, Kiez-Bezug, lockerer Ton
- `makler` — standardisiert, schnell, vollständige Unterlagen
- `wg` — **SKIP** (anderer Prozess, WG-Casting)
- `heuristicClassify()` — Keyword-basierte Vermieter-Typ-Erkennung (ohne LLM, als Fallback)

**`render.ts`** — Template-basierter Text-Generator (LLM-freier Fallback)
- `renderApplication(profile, landlord_type, listing, user_data, options)` → `RenderResult`
- Baut: Anrede → Selbstvorstellung → Listing-Bezug → Anforderungs-Bestätigung → Unterlagen → Abschluss
- Anrede-Parsing: erkennt "Herr"/"Frau"-Prefix, Fallback "Sehr geehrte Damen und Herren"
- `renderAllVariants()` — erzeugt N Varianten für A/B-Test
- WG + SKIP-Typen werden mit `is_skip: true` abgefangen

**`llm-prompt.ts`** — Prompt-Builder für Claude Haiku via OpenRouter
- `buildSystemPrompt(profile, adaption, variant)` — vollständiger System-Prompt mit Regeln, Stil-Adjektiven, Ton-Hinweisen
- `buildUserPrompt(user_data, listing, adaption)` — strukturierter User-Prompt mit allen Bewerberdaten
- `buildLLMPrompt(input)` — kombiniert alles zu einem OpenRouter-API-Objekt
- `generateApplicationViaLLM(input, api_key)` — kompletter API-Call inkl. Error-Handling
- Temperatur variiert pro Variante (0.70 bis 0.90) für echte Text-Variation
- `buildRequirementsExtractionPrompt()` + `buildLandlordClassificationPrompt()` — Helper-Prompts für Scraper

**`index.ts`** — Re-exportiert alle öffentlichen APIs

---

### Teil 2: `scrapers/`

**`immoscout.ts`** — ImmoScout24 DOM-Reader + Bewerbungs-Absender

DOM-Parsing:
- `parseListingFromDOM(document)` → `ListingData | null` — Detail-Page Parser
- `parseListingsFromSearchResults(document)` → `ListingData[]` — Suche-Ergebnisliste
- `SELECTORS` — vollständige Selektor-Liste für aktuellen IS24-DOM (Stand 2026-04), mit Fallback-Kaskaden
- Parst: Titel, Adresse (inkl. Bezirk/PLZ-Extraktion), Größe, Zimmer, Kalt-/Warmmiete, Kaution, Verfügbar-ab, Vermieter-Beschreibung, Vermieter-Name, Bilder

URL-Helfer:
- `getListingUrl(id)` — IS24 Expose-URL
- `getSearchUrl({ city, min_rooms, max_rent, min_size, sort })` — Suche-URL mit Query-Params

Bewerbung:
- `sendApplicationViaUI(doc, text, attachments[])` → `SendApplicationResult`
  - Findet "Kontakt aufnehmen"-Button
  - React-kompatibler Native-Value-Setter für Textareas
  - Datei-Upload via DataTransfer API
  - Wartet auf Confirmation-Element (8s Timeout)
  - Error-Fallback mit Fehlertext aus Formular

LLM-Extraktion:
- `extractRequirements(text, api_key)` → `string[]` — SCHUFA, Gehaltsabrechnungen, Bürgschaft etc.
- `classifyLandlordType(text, api_key)` → LandlordType — Vermieter-Typ aus Annoncen-Text

**`index.ts`** — Re-exportiert alle APIs

---

## Tests

| Workspace | Test-Datei | Tests | Status |
|---|---|---|---|
| templates | `profiles.test.ts` | 14 | PASS |
| templates | `landlord-adaptions.test.ts` | 16 | PASS |
| templates | `render.test.ts` | 28 | PASS |
| templates | `llm-prompt.test.ts` | 17 | PASS |
| scrapers | `immoscout.test.ts` | 14 | PASS |
| **Total** | | **89** | **alle grün** |

---

## Verwendung in der Extension

### 1. Template-basiert (schnell, kein API-Call)

```typescript
import { renderApplication } from 'lyrvio-templates'

const result = renderApplication(
  'solo',                          // Profil-Typ
  'private_senior',                // Vermieter-Typ (von classifyLandlordType)
  listing,                         // ListingData aus Scraper
  { name: 'Max M.', beruf: 'Entwickler', netto_monatlich: 3800, ... },
  { variant: 2 }                   // Variante 1-5
)

if (!result.is_skip) {
  await sendApplicationViaUI(document, result.text)
}
```

### 2. LLM-basiert (besser, ~0.001€/Bewerbung)

```typescript
import { generateApplicationViaLLM } from 'lyrvio-templates'

const response = await generateApplicationViaLLM({
  profile_type: 'solo',
  user_data: userProfile,
  listing: listing,
  variant: 1,
}, OPENROUTER_API_KEY)

await sendApplicationViaUI(document, response.text)
```

### 3. Scraper-Integration

```typescript
import {
  parseListingFromDOM,
  extractRequirements,
  classifyLandlordType,
  sendApplicationViaUI,
} from 'lyrvio-scrapers'

// Bei Inserat-Besuch:
const listing = parseListingFromDOM(document)
if (listing) {
  listing.vermieter_anforderungen = await extractRequirements(listing.description, API_KEY)
  listing.landlord_type = await classifyLandlordType(listing.description, API_KEY)
  // → dann renderApplication oder generateApplicationViaLLM
}
```

---

## Offene TODOs (nächste Session)

- [ ] eBay-Kleinanzeigen-Scraper (`scrapers/kleinanzeigen.ts`)
- [ ] Immowelt-Scraper (`scrapers/immowelt.ts`)
- [ ] Extension-Integration: Import von `lyrvio-templates` + `lyrvio-scrapers` im Bot-Workspace
- [ ] Deduplication-Check vor Bewerbungsversand (Listings-Seen DB)
- [ ] Profil-Onboarding im Web-Dashboard (Formular → `UserProfileData`)
- [ ] Erfolgs-Tracking: Antwort-Detection im IS24-Postfach
