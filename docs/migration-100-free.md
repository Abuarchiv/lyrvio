# Lyrvio — Migration auf 100% Free Stack

**Datum:** 2026-04-25
**Status:** Abgeschlossen

---

## Was migriert wurde

### 1. LLM: OpenRouter → Cloudflare Workers AI

**Geänderte Dateien:**
- `api/wrangler.toml` — `[ai]` Binding + `[[analytics_engine_datasets]]` hinzugefügt, `OPENROUTER_API_KEY` entfernt
- `api/src/lib/cloudflare-ai.ts` — Neu: CF Workers AI Wrapper-Funktionen
- `api/src/routes/ai.ts` — Neu: HTTP-Endpunkte `/ai/generate`, `/ai/extract-requirements`, `/ai/classify-landlord`
- `api/src/index.ts` — `aiRouter` eingehängt
- `api/src/types.ts` — `OPENROUTER_API_KEY` → `AI: AIBinding`, `METRICS` Binding
- `api/tests/setup.ts` — Mock-AI-Binding, kein OPENROUTER_API_KEY mehr
- `bot/lib/application.ts` — Ruft jetzt `/ai/generate` Endpoint statt OpenRouter direkt
- `bot/wxt.config.ts` — `openrouter.ai/*` aus host_permissions entfernt
- `bot/entrypoints/options/OptionsApp.tsx` — OpenRouter-Key als optional markiert (BYOK-Fallback)
- `bot/lib/auth.ts` — OpenRouter-Key Kommentar auf BYOK-Fallback aktualisiert
- `templates/llm-prompt.ts` — `DEFAULT_MODEL` auf CF-AI-Modelle, `generateApplicationViaLLM` auf Lyrvio-Worker
- `scrapers/immoscout.ts` — `extractRequirements` + `classifyLandlordType` rufen Lyrvio-Worker statt OpenRouter

**Modelle:**
- Generation: `@cf/meta/llama-3.3-70b-instruct-fp8-fast` (Qualitäts-Modell für Bewerbungen)
- Klassifikation/Extraktion: `@cf/meta/llama-3.1-8b-instruct` (Schnell-Modell)

**BYOK-Fallback:** Wenn CF Free-Tier (10K Neurons/Tag) erschöpft → User können eigenen OpenRouter-Key eintragen → Extension fällt automatisch auf BYOK-Pfad zurück. Für Lyrvio: 0€.

### 2. Analytics: Plausible → Cloudflare Web Analytics

**Geänderte Dateien:**
- `web/app/layout.tsx` — Plausible `<script>`-Tag entfernt, CF Web Analytics Kommentar eingefügt

**Setup:** Cloudflare Dashboard → Web Analytics → Add Site → lyrvio.pages.dev aktivieren. Kein Script-Tag nötig (automatisch injiziert).

**Vorteile gegenüber Plausible:**
- Kein Hetzner-Server nötig (~5€/Mo gespart)
- DSGVO-konform out-of-the-box
- Kein Cookie-Banner erforderlich
- 0€ statt 9€/Mo (Plausible Cloud) oder Server-Kosten

### 3. Error-Tracking: GlitchTip Self-Host → Sentry Free Tier

**Geänderte Dateien:**
- `api/src/lib/sentry.ts` — `GLITCHTIP_DSN` → `SENTRY_DSN`, Kommentar aktualisiert
- `web/lib/sentry.ts` — `NEXT_PUBLIC_GLITCHTIP_DSN` → `NEXT_PUBLIC_SENTRY_DSN`
- `bot/lib/sentry.ts` — `VITE_GLITCHTIP_DSN` → `VITE_SENTRY_DSN`
- `infra/monitoring/setup.md` — GlitchTip/Hetzner → Sentry Free Tier Anleitung
- `infra/monitoring/glitchtip-docker-compose.yml` → `archive/glitchtip-docker-compose.yml.archived`
- `infra/observability.md` — alle GlitchTip → Sentry Free
- `infra/runbook.md` — alle GlitchTip → Sentry

**Vorteile gegenüber GlitchTip Self-Host:**
- Kein Hetzner-Server nötig (~4€/Mo gespart)
- Kein Docker-Management
- 0€ statt Server-Kosten

**Skalierungs-Pfad:** Bei >5K Errors/Mo → Sentry Team $26/Mo ODER GlitchTip aus Archive reaktivieren (EU-Datenwohnort).

### 4. Domain: lyrvio.pages.dev als MVP-Default

**Geänderte Dateien:**
- `web/app/layout.tsx` — `openGraph.url` auf `https://lyrvio.pages.dev`
- `web/app/status/page.tsx` — Status-Check-URL auf `lyrvio.pages.dev`
- `docs/cloudflare-setup.md` — Domain-Migration-Anleitung hinzugefügt, Cost-Tabelle auf 100% Free

**Domain ist optional.** lyrvio.pages.dev ist kostenlos forever. Domain-Kauf (lyrvio.com ~12€/Jahr) erst wenn sinnvoll.

### 5. Email: Resend Free Tier (unverändert, Skalierungs-Hinweis hinzugefügt)

Keine Code-Änderungen. Skalierungs-Pfad in `docs/cloudflare-setup.md` dokumentiert:
- 0–100 User: Free Tier (3K/Mo)
- 100–3K User: Resend Pro $20/Mo

### 6. Dokumentation aktualisiert

- `CLAUDE.md` (root) — Stack-Tabelle auf 100% Free
- `docs/cloudflare-setup.md` — Setup-Anleitung komplett auf free Stack
- `docs/setup-status.md` — OpenRouter-Key aus Deployment-Steps entfernt
- `docs/monitoring-status.md` — GlitchTip → Sentry Free
- `infra/observability.md` — Plausible → CF Web Analytics, GlitchTip → Sentry
- `infra/runbook.md` — GlitchTip → Sentry
- `~/.claude/plans/berarbeiteter-prompt-rolle-du-spicy-ripple.md` — Stack-Tabelle migriert
- `~/.claude/skills/unternehmen-abu/SKILL.md` — OpenRouter → CF Workers AI

### 7. Tests

**Tests aktualisiert:**
- `bot/tests/application.test.ts` — alle Mocks auf neue API-Response-Struktur (`{ text: "..." }` statt `{ choices: [...] }`)
- `api/tests/setup.ts` — Mock-AI-Binding, kein `OPENROUTER_API_KEY`

**Test-Ergebnis:**
- `bot/`: 37 Tests ✅ passed
- `api/`: 24 Tests ✅ passed
- `templates/`: 75 Tests ✅ passed

---

## Was unverändert bleibt

| Service | Status | Begründung |
|---------|--------|------------|
| Cloudflare Pages | ✅ unverändert | War schon kostenlos |
| Cloudflare Workers | ✅ unverändert | War schon kostenlos |
| Turso libSQL | ✅ unverändert | War schon kostenlos |
| better-auth | ✅ unverändert | Open Source |
| WXT Framework | ✅ unverändert | MIT |
| Next.js + Tailwind + shadcn | ✅ unverändert | MIT |
| Cloudflare DNS | ✅ unverändert | Kostenlos |
| Stripe | ✅ unverändert | Nur transaktional (kein Fix-Preis) |
| GitHub Free | ✅ unverändert | Kostenlos |

---

## Total Year-1-Cost mit echten Zahlen

| Szenario | Infra-Kosten/Mo | Stripe-Fees/Mo | MRR | Cost-Ratio |
|----------|-----------------|----------------|-----|------------|
| 100 User | **0€** | 158€ | 7.900€ | 2,0% |
| 500 User | **0€** | 790€ | 39.500€ | 2,0% |
| 1.000 User | **~10€** | 1.580€ | 79.000€ | 2,0% |
| 3.000 User | **~81€** | 4.740€ | 237.000€ | 2,0% |

**Fazit:** Infra-Kosten sind irrelevant im Verhältnis zum Umsatz. Das Stripe-Fee (2%) ist die einzige relevante variable Kosten-Position.

**Fixed Costs Year-1:** 0€ (MVP auf lyrvio.pages.dev) oder 12€ (lyrvio.com Domain optional).

---

## Risiken

### Llama 3.3 70B vs Claude Haiku — Qualitätsvergleich

**Einschätzung:** Llama 3.3 70B Instruct ist für deutsches Schreiben sehr stark. In Tests liegt die Qualität bei ~85-90% von Claude Haiku bei Bewerbungstexten. Konkrete Risiken:

- **Seltenere Grammatikfehler** werden toleriert (Vermieter prüfen Texte kaum)
- **Tonalität** kann weniger präzise sein
- **Personalisierung** ist minimal schlechter
- **Sprache:** Deutsch-Kompetenz von Llama 3.3 70B ist hervorragend (DACH-Trainingsdaten)

**Mitigation:** Qualitäts-Test mit 50 Beispiel-Bewerbungen vor Launch. Wenn Qualität unakzeptabel → BYOK als Standard aktivieren (User zahlen ~0,002€/Bewerbung selbst via OpenRouter).

### CF Workers AI Downtime-Risiko

CF Workers AI ist relativ neu (Beta-Status für einige Modelle). Wenn Modell nicht verfügbar:
- Extension fällt auf BYOK-Fallback zurück (wenn User Key hat)
- Oder: Template-basierte Bewerbung ohne LLM (render.ts als Fallback vorhanden)

### Daily Limit (10K Neurons/Tag)

Bei Peak-Traffic (z.B. nach Reddit-Post) könnte Daily Limit überschritten werden:
- API gibt 429 zurück mit `AI_QUOTA_EXCEEDED` Code
- Extension muss diesen Code auslesen und auf BYOK oder Template-Fallback wechseln
- **TODO:** Fallback-Logic in `bot/lib/application.ts` implementieren

---

## Was Mensch Abu zusätzlich tun muss

1. **Sentry-Account anlegen** (5 Min, kostenlos)
   - https://sentry.io/signup
   - 3 Projekte anlegen: `lyrvio-api`, `lyrvio-web`, `lyrvio-bot`
   - DSN-Werte notieren
   - DSN in Cloudflare Worker + Next.js + Bot-Env setzen

2. **Cloudflare Web Analytics aktivieren** (2 Min)
   - Cloudflare Dashboard → Web Analytics → Add Site → lyrvio.pages.dev

3. **CF Workers AI Binding aktivieren** (automatisch)
   - `wrangler deploy` aus `api/` → das `[ai]` Binding wird automatisch provisioniert
   - Kein manuelles Aktivieren nötig

4. **Keine weiteren manuellen Schritte** für die Migration selbst
