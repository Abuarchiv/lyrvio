#!/usr/bin/env bash
# health-check.sh — Lyrvio Endpoint Health Check
# Pingt alle Services und gibt Status aus.
# Verwendung: ./scripts/health-check.sh [--production]
# Pre-Deploy: ./scripts/health-check.sh && wrangler deploy

set -euo pipefail

# ─── Konfiguration ────────────────────────────────────────────────────────────

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# API-URL: lokal oder production
API_BASE="${API_BASE:-http://localhost:8787}"
WEB_BASE="${WEB_BASE:-http://localhost:3000}"

if [[ "${1:-}" == "--production" ]]; then
  API_BASE="https://lyrvio-api.workers.dev"
  WEB_BASE="https://lyrvio.com"
fi

TIMEOUT=10
PASS=0
FAIL=0
WARN=0

# ─── Helper-Funktionen ────────────────────────────────────────────────────────

check() {
  local name="$1"
  local url="$2"
  local expected_status="${3:-200}"
  local keyword="${4:-}"

  local start
  start=$(date +%s%N 2>/dev/null || echo "0")

  local http_code
  local body
  body=$(curl -s -o /tmp/health_body -w "%{http_code}" \
    --max-time "$TIMEOUT" \
    --silent \
    --location \
    "$url" 2>/dev/null) || body="000"
  http_code="$body"

  local end
  end=$(date +%s%N 2>/dev/null || echo "0")
  local latency_ms=0
  if [[ "$start" != "0" && "$end" != "0" ]]; then
    latency_ms=$(( (end - start) / 1000000 ))
  fi

  local response_body
  response_body=$(cat /tmp/health_body 2>/dev/null || echo "")

  local status_ok=false
  if [[ "$http_code" == "$expected_status" ]]; then
    status_ok=true
  fi

  local keyword_ok=true
  if [[ -n "$keyword" && "$status_ok" == "true" ]]; then
    if ! echo "$response_body" | grep -q "$keyword"; then
      keyword_ok=false
    fi
  fi

  local latency_color="$GREEN"
  if [[ $latency_ms -gt 1000 ]]; then
    latency_color="$YELLOW"
  fi
  if [[ $latency_ms -gt 3000 ]]; then
    latency_color="$RED"
  fi

  if [[ "$status_ok" == "true" && "$keyword_ok" == "true" ]]; then
    echo -e "  ${GREEN}✓${NC} ${BOLD}${name}${NC} ${GREEN}HTTP ${http_code}${NC} ${latency_color}${latency_ms}ms${NC}"
    PASS=$((PASS + 1))
  elif [[ "$status_ok" == "false" && "$http_code" == "000" ]]; then
    echo -e "  ${RED}✗${NC} ${BOLD}${name}${NC} ${RED}TIMEOUT / UNREACHABLE${NC}"
    FAIL=$((FAIL + 1))
  elif [[ "$keyword_ok" == "false" ]]; then
    echo -e "  ${YELLOW}⚠${NC} ${BOLD}${name}${NC} ${YELLOW}HTTP ${http_code} (Keyword '${keyword}' nicht gefunden)${NC}"
    WARN=$((WARN + 1))
  else
    echo -e "  ${RED}✗${NC} ${BOLD}${name}${NC} ${RED}HTTP ${http_code} (erwartet: ${expected_status})${NC}"
    FAIL=$((FAIL + 1))
  fi
}

section() {
  echo ""
  echo -e "${BLUE}${BOLD}$1${NC}"
  echo -e "${BLUE}$(echo "$1" | tr '[:print:]' '─')${NC}"
}

# ─── Checks ───────────────────────────────────────────────────────────────────

echo ""
echo -e "${BOLD}Lyrvio Health Check${NC} — $(date '+%Y-%m-%d %H:%M:%S')"
echo -e "API: ${BLUE}${API_BASE}${NC}  |  Web: ${BLUE}${WEB_BASE}${NC}"

section "API"
check "Health"              "${API_BASE}/health"            200 '"status":"ok"'
check "Stats"               "${API_BASE}/stats"             200 '"total_users"'
check "DB Health"           "${API_BASE}/health/db"         200 '"status"'
check "Auth endpoint"       "${API_BASE}/auth/session"      200
check "404 Handler"         "${API_BASE}/nonexistent-route" 404

section "Web"
check "Homepage"            "${WEB_BASE}/"                  200 "Lyrvio"
check "Status Page"         "${WEB_BASE}/status"            200
check "Pricing"             "${WEB_BASE}/#pricing"          200
check "Robots.txt"          "${WEB_BASE}/robots.txt"        200

section "Stripe Webhook (Method Check)"
check "Webhook endpoint"    "${API_BASE}/stripe/webhook"    405

section "Externe Abhängigkeiten"
check "Turso via API"       "${API_BASE}/health/db"         200
if [[ "${1:-}" == "--production" ]]; then
  check "OpenRouter"        "https://openrouter.ai/api/v1/models" 200
  check "Resend SMTP"       "https://api.resend.com/domains" 401  # 401 = erreichbar, kein Key
fi

# ─── Zusammenfassung ──────────────────────────────────────────────────────────

echo ""
echo -e "─────────────────────────────────────"
TOTAL=$((PASS + FAIL + WARN))
echo -e "${BOLD}Ergebnis: ${TOTAL} Checks${NC}"
echo -e "  ${GREEN}✓ Bestanden:${NC}      $PASS"
if [[ $WARN -gt 0 ]]; then
  echo -e "  ${YELLOW}⚠ Warnungen:${NC}      $WARN"
fi
if [[ $FAIL -gt 0 ]]; then
  echo -e "  ${RED}✗ Fehlgeschlagen:${NC} $FAIL"
fi
echo ""

if [[ $FAIL -gt 0 ]]; then
  echo -e "${RED}${BOLD}HEALTH CHECK FEHLGESCHLAGEN — Deploy abbrechen!${NC}"
  exit 1
elif [[ $WARN -gt 0 ]]; then
  echo -e "${YELLOW}${BOLD}Health Check mit Warnungen — bitte prüfen.${NC}"
  exit 0
else
  echo -e "${GREEN}${BOLD}Alle Checks bestanden.${NC}"
  exit 0
fi
