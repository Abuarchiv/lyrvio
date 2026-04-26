#!/usr/bin/env bash
# Lyrvio Dev-Setup — 1-Click lokale Entwicklung
set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ pnpm install (root + alle workspaces)"
pnpm install

echo "→ Turso lokale DB starten (file://lyrvio.db)"
if [ ! -f .dev.vars ]; then
  cat > .dev.vars <<'EOF'
TURSO_DATABASE_URL=file:./lyrvio.db
TURSO_AUTH_TOKEN=local-dev
STRIPE_SECRET_KEY=sk_test_PLACEHOLDER
STRIPE_WEBHOOK_SECRET=whsec_PLACEHOLDER
RESEND_API_KEY=re_PLACEHOLDER
BETTER_AUTH_SECRET=$(openssl rand -base64 32)
BETTER_AUTH_URL=http://localhost:8787
ALLOWED_ORIGINS=http://localhost:3000,chrome-extension://*
OPENROUTER_API_KEY=sk-or-PLACEHOLDER
EOF
  echo "  .dev.vars erstellt — fülle Stripe + Resend + OpenRouter Keys ein."
fi

cp .dev.vars api/.dev.vars 2>/dev/null || true

echo "→ Schema in lokale Turso pushen"
cd db && pnpm db:push && cd ..

echo "→ Setup fertig."
echo ""
echo "Starte Entwicklung:"
echo "  pnpm --filter web dev      # http://localhost:3000"
echo "  pnpm --filter api dev      # http://localhost:8787 (wrangler dev)"
echo "  pnpm --filter bot dev      # WXT Hot-Reload"
