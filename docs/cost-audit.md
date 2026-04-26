# Lyrvio — Total-Cost-Audit Year-1

Stand: 2026-04-25

---

## Service-Matrix: Free-Tier-Limits & Skalierungs-Schwellen

### Cloudflare Pages (Web-Hosting)
- **Free Tier:** Unlimited Builds, Unlimited Requests, Unlimited Bandwidth
- **Kostet bei:** Nie (genuinely kostenlos forever)
- **Migrations-Pfad bei Skalierung:** Kein Upgrade nötig

### Cloudflare Workers (API)
- **Free Tier:** 100.000 Requests/Tag, 10ms CPU/Request
- **Kostet bei:** >100K Requests/Tag → Workers Paid $5/Mo (unbegrenzte Requests)
- **Migrations-Pfad:** 100K Requests/Tag = ~3M/Mo. Bei 3.000 Usern je 1.000 API-Calls/Mo = 3M = exakt an der Grenze. Upgrade früh einplanen.

### Cloudflare Workers AI (LLM)
- **Free Tier:** 10.000 Neurons/Tag
  - Llama 3.3 70B: ~330 Anfragen/Tag (30 Neurons/Anfrage bei 500 Tokens Output)
  - Llama 3.1 8B: ~2.000 Anfragen/Tag (5 Neurons/Anfrage bei 200 Tokens Output)
- **Kostet bei:** >10K Neurons/Tag → Workers AI Paid (per Neuron-Rate, noch nicht öffentlich)
- **Strategien im Free Tier bleiben:**
  1. **Caching:** Gleiche Anforderungs-Extraktionen für identische Inserate cachen (Redis/KV) → 40-60% Savings
  2. **Batching:** Mehrere Inserate in einem Prompt verarbeiten
  3. **BYOK-Fallback:** User bringen eigenen OpenRouter-Key für Heavy-Usage → 0€ für Lyrvio
- **Praktische Kapazität:** Bei 330 Bewerbungen/Tag via 70B-Modell → ~10K Bewerbungen/Monat kostenlos

### Cloudflare Analytics Engine (Custom Metrics)
- **Free Tier:** 100.000 Events/Tag, 1M Events/Mo
- **Kostet bei:** Nie nennenswert in Year-1
- **Migrations-Pfad:** Analytics Engine kostet $0.25 per Million Events (marginal)

### Cloudflare Web Analytics
- **Free Tier:** Unlimited Pageviews
- **Kostet bei:** Nie
- **Migrations-Pfad:** Kein Upgrade nötig

### Turso (Datenbank)
- **Free Tier:** 9 GB Speicher, 1 Milliarde Row Reads/Mo, 25 Million Row Writes/Mo
- **Kostet bei:** >9 GB oder >1B Reads → Scaler $29/Mo
- **User-Kapazität:** 3.000 User, je 500 Rows = 1,5 Mio Rows. Weit unter 9 GB.

### Resend (Email)
- **Free Tier:** 3.000 Emails/Mo, 100/Tag
- **Kostet bei:** >3K/Mo → Resend Pro $20/Mo (50K Emails/Mo)
- **User-Kapazität im Free Tier:**
  - Welcome (1/User): 100 Neue User/Mo
  - Magic Link (2/User/Mo): 50 aktive User
- **Skalierungs-Strategie:** Bei 200+ aktiven Usern → Pro Plan ($20/Mo) nötig
- **Fallback:** SendGrid Free (100 Emails/Tag) als Parallel-Sender für transaktionale Mails

### Sentry (Error-Tracking)
- **Free Tier:** 5.000 Errors/Mo, 10.000 Performance-Units/Mo, 50 Session Replays
- **Kostet bei:** >5K Errors/Mo → Team Plan $26/Mo
- **User-Kapazität:** Bei <0,5% Error-Rate und 1K MAU = 5K API-Calls × 0,005 = 25 Errors/Tag = 750/Mo → komfortabel
- **Migrations-Pfad:** Ab ~1.000+ MAU → Team Plan $26/Mo ODER GlitchTip self-hosted Hetzner CX11 ~4€/Mo

### Stripe (Payments)
- **Free Tier:** Keine Monatsfee — nur transaktional
- **Kosten:** 1,5% + 0,25€ pro Transaktion (EU-Karten)
- **Kostet immer wenn Umsatz da ist** → Teil des Geschäftsmodells

### GitHub Actions (CI)
- **Free Tier:** 2.000 Min/Mo auf Public Repos, Unlimited auf Private
- **Kostet bei:** >2K Min/Mo auf Private Repos → kann durch Optimierung vermieden werden

---

## Year-1 Cost-Projection bei echten Nutzerzahlen

### Annahmen
- 79€/Mo Subscription-Preis
- ~20 Bewerbungen/User/Tag (konservativ)
- ~3 API-Calls/Bewerbung (1x Generate, 1x Extract, 1x Log)
- ~2 Emails/User/Mo (Magic Link + Welcome)
- Error-Rate 0,2%

---

### Szenario: 100 User

| Service | Volumen | Kosten |
|---------|---------|--------|
| CF Pages | - | **0€** |
| CF Workers | 100 × 3 Calls × 30 Tage = 9K/Tag | **0€** (unter 100K/Tag) |
| CF Workers AI | 100 × 20 Bew × 30 = 60K/Mo = 2K/Tag | **0€** (unter 10K/Tag) |
| Turso | 100 User × 600 Rows | **0€** |
| Resend | 100 × 2 = 200 Emails/Mo | **0€** (unter 3K) |
| Sentry | ~200 Errors/Mo | **0€** |
| Stripe | 100 × 79€ × 2% = 158€ Fees | **158€** (Umsatz: 7.900€) |
| **Total Infra-Kosten** | | **0€/Mo** |
| **Total inkl. Stripe-Fees** | | **158€/Mo** |
| **MRR** | | **7.900€** |
| **Netto MRR** | | **7.742€** |

---

### Szenario: 500 User

| Service | Volumen | Kosten |
|---------|---------|--------|
| CF Pages | - | **0€** |
| CF Workers | 500 × 3 × 30 = 45K/Tag | **0€** (unter 100K) |
| CF Workers AI | 500 × 20 × 30 = 300K/Mo = 10K/Tag | **0€** (exakt an Grenze — BYOK-Fallback empfohlen) |
| Turso | 500 User | **0€** |
| Resend | 500 × 2 = 1K/Mo | **0€** (unter 3K) |
| Sentry | ~1K Errors/Mo | **0€** |
| Stripe | 500 × 79€ × 2% = 790€ | **790€** (Umsatz: 39.500€) |
| **Total Infra-Kosten** | | **0€/Mo** |
| **Total inkl. Stripe-Fees** | | **790€/Mo** |
| **MRR** | | **39.500€** |

**Achtung:** CF Workers AI genau an Free-Tier-Grenze. Ab 501 User → BYOK aktivieren für Heavy-User oder Workers AI Paid aktivieren.

---

### Szenario: 1.000 User

| Service | Volumen | Kosten |
|---------|---------|--------|
| CF Pages | - | **0€** |
| CF Workers | 1K × 3 × 30 = 90K/Tag | **0€** (unter 100K — knapp!) |
| CF Workers AI | 1K × 20 × 30 = 600K/Mo = 20K/Tag | **CF AI Paid oder BYOK** |
| Turso | 1K User × 600 Rows = 600K Rows | **0€** |
| Resend | 1K × 2 = 2K/Mo | **0€** (unter 3K) |
| Sentry | ~2K Errors/Mo | **0€** (unter 5K) |
| Stripe | 1K × 79€ × 2% = 1.580€ | **1.580€** (Umsatz: 79.000€) |
| CF Workers Paid | >100K Req/Tag möglich | **5$/Mo** |
| CF Workers AI Paid | 20K Neurons/Tag übrig | **~2-5$/Mo** (est.) |
| **Total Infra-Kosten** | | **~7-10€/Mo** |
| **Total inkl. Stripe-Fees** | | **~1.590€/Mo** |
| **MRR** | | **79.000€** |

---

### Szenario: 3.000 User

| Service | Volumen | Kosten |
|---------|---------|--------|
| CF Workers | 3K × 3 × 30 = 270K/Tag | **CF Workers Paid 5$/Mo** |
| CF Workers AI | 3K × 20 × 30 = 1,8M/Mo = 60K/Tag | **CF AI Paid ~$30/Mo** ODER BYOK-Pflicht für alle |
| Resend | 3K × 2 = 6K/Mo | **Pro $20/Mo** |
| Sentry | ~6K Errors/Mo | **Team $26/Mo** |
| Stripe | 3K × 79€ × 2% = 4.740€ | **4.740€** (Umsatz: 237.000€) |
| **Total Infra-Kosten** | | **~81€/Mo** |
| **Total inkl. Stripe-Fees** | | **4.821€/Mo** |
| **MRR** | | **237.000€** |
| **Cost-Ratio** | | **2,0%** |

---

## Zusammenfassung: Ab wann kostet es?

| Schwelle | Auslöser | Zusatzkosten |
|----------|----------|--------------|
| ~500 User | CF Workers AI Free-Tier ausgeschöpft | 0€ (BYOK-Fallback) |
| ~600 User | CF Workers nahe 100K/Tag | 5$/Mo |
| ~1.000 User | CF Workers AI definitiv über Free | 2-5$/Mo |
| ~1.500 User | Resend > 3K/Mo | 20$/Mo |
| ~2.500 User | Sentry > 5K Errors/Mo | 26$/Mo |

**Kritische Erkenntnis:** Das System ist 0€-fix bis ~500 User. Ab dann kostet es <80€/Mo bei 3.000 Usern und 237K€ MRR — ein Cost-Ratio von <0,1%.

---

## Strategien um länger im Free Tier zu bleiben

### 1. Caching für CF Workers AI
```typescript
// KV-Cache für Anforderungs-Extraktion (identische Inserate)
const cacheKey = `req-extract:${hash(beschreibungsText.slice(0, 200))}`
const cached = await env.KV.get(cacheKey)
if (cached) return JSON.parse(cached)

const result = await extractRequirementsCF(ai, beschreibungsText)
await env.KV.put(cacheKey, JSON.stringify(result), { expirationTtl: 86400 })
```

### 2. BYOK für Heavy-User (Premium-Feature)
- User mit >5 Bewerbungen/Tag bekommen Option: "Eigenen OpenRouter-Key eintragen"
- Für Lyrvio: 0€. Für User: ~0,01€/Bewerbung (marginal)
- Positionierung: "Unbegrenzter Modus" als Premium-Feature

### 3. Batching von Klassifizierungen
- Statt 1 API-Call pro Inserat → 5 Inserate in einem Call
- 80% Savings auf CF AI Neurons
- Implementierung: `classifyBatch(ai, inserate[])` statt Einzel-Calls

### 4. Resend-Optimierung
- Magic Links: Rate-Limit auf 1/Stunde/User → verhindert Spam-Abuse
- Transaktionale Mails bündeln (Weekly Digest statt Daily)

### 5. CF Workers Request-Sparring
- Browser-Extension cached Responses lokal (Chrome Storage)
- Deduplication-Check lokal statt per API-Call
- Nur bei echter neuer Bewerbung → API-Call
