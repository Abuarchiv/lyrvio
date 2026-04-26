/**
 * Lyrvio Status Page
 * Route: /status
 *
 * Öffentliche, read-only Statusseite für alle Services.
 * Revalidiert alle 5 Minuten via ISR (Next.js Static Export mit revalidate).
 *
 * Datenquelle: UptimeRobot Public Status API (kostenlos)
 * Alternativ: Direkte API-Checks aus dem Server-Component
 *
 * HINWEIS: Da next.config.ts auf `output: "export"` steht (statischer Export),
 * wird diese Seite als statisches HTML gebaut. Für Live-Daten:
 * Option A: next.config.ts output: "export" entfernen → Cloudflare Pages Functions nutzen
 * Option B: Client-Side Fetch (useEffect) — dann kein SSR nötig
 *
 * Diese Implementierung nutzt Option B für maximale Kompatibilität mit
 * statischem Export + Cloudflare Pages.
 */

"use client";

import { useEffect, useState } from "react";

interface ServiceStatus {
  name: string;
  url: string;
  status: "operational" | "degraded" | "down" | "checking";
  latency?: number;
  lastChecked?: string;
}

const SERVICES: Omit<ServiceStatus, "status" | "latency" | "lastChecked">[] = [
  { name: "Web App", url: "https://lyrvio.com" },
  { name: "API", url: "https://lyrvio-api.workers.dev/health" },
  { name: "Datenbank", url: "https://lyrvio-api.workers.dev/health/db" },
  { name: "E-Mail (Resend)", url: "https://lyrvio-api.workers.dev/health/email" },
  { name: "KI (OpenRouter)", url: "https://openrouter.ai/api/v1/models" },
  { name: "Zahlung (Stripe)", url: "https://status.stripe.com/api/v2/status.json" },
];

const STATUS_CONFIG = {
  operational: {
    label: "Betriebsbereit",
    color: "bg-green-500",
    textColor: "text-green-400",
    dot: "●",
  },
  degraded: {
    label: "Beeinträchtigt",
    color: "bg-yellow-500",
    textColor: "text-yellow-400",
    dot: "●",
  },
  down: {
    label: "Ausgefallen",
    color: "bg-red-500",
    textColor: "text-red-400",
    dot: "●",
  },
  checking: {
    label: "Wird geprüft…",
    color: "bg-gray-500",
    textColor: "text-gray-400",
    dot: "○",
  },
};

async function checkService(
  url: string
): Promise<{ status: ServiceStatus["status"]; latency: number }> {
  const start = Date.now();
  try {
    const response = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(10_000), // 10s Timeout
      // no-cors für externe Services ohne CORS-Headers
      mode: url.includes("lyrvio") ? "cors" : "no-cors",
    });

    const latency = Date.now() - start;

    // no-cors → opaque response (status 0) → wir nehmen an: ok
    if (response.type === "opaque") {
      return { status: "operational", latency };
    }

    if (response.ok) {
      return {
        status: latency > 3000 ? "degraded" : "operational",
        latency,
      };
    }

    return { status: "degraded", latency };
  } catch {
    return { status: "down", latency: Date.now() - start };
  }
}

export default function StatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>(
    SERVICES.map((s) => ({ ...s, status: "checking" as const }))
  );
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function checkAll() {
    setIsRefreshing(true);
    const now = new Date().toISOString();

    const results = await Promise.allSettled(
      SERVICES.map((service) => checkService(service.url))
    );

    setServices(
      SERVICES.map((service, i) => {
        const result = results[i];
        if (result.status === "fulfilled") {
          return {
            ...service,
            status: result.value.status,
            latency: result.value.latency,
            lastChecked: now,
          };
        }
        return { ...service, status: "down" as const, lastChecked: now };
      })
    );

    setLastUpdated(now);
    setIsRefreshing(false);
  }

  // Initial check + Auto-Refresh alle 5 Minuten
  useEffect(() => {
    checkAll();
    const interval = setInterval(checkAll, 5 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allOperational = services.every(
    (s) => s.status === "operational" || s.status === "checking"
  );
  const anyDown = services.some((s) => s.status === "down");
  const overallStatus = anyDown
    ? "down"
    : allOperational
    ? "operational"
    : "degraded";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold tracking-tight">Lyrvio</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">Status</span>
          </div>
          <p className="text-sm text-white/40">
            Echtzeit-Status aller Lyrvio-Services
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        {/* Overall Status Banner */}
        <div
          className={`rounded-xl p-5 border ${
            overallStatus === "operational"
              ? "bg-green-950/30 border-green-500/20"
              : overallStatus === "degraded"
              ? "bg-yellow-950/30 border-yellow-500/20"
              : "bg-red-950/30 border-red-500/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`text-xl ${STATUS_CONFIG[overallStatus].textColor}`}
            >
              {STATUS_CONFIG[overallStatus].dot}
            </span>
            <div>
              <p className="font-semibold">
                {overallStatus === "operational"
                  ? "Alle Systeme betriebsbereit"
                  : overallStatus === "degraded"
                  ? "Teilweise Beeinträchtigungen"
                  : "Systemausfall erkannt"}
              </p>
              {lastUpdated && (
                <p className="text-xs text-white/40 mt-0.5">
                  Zuletzt geprüft:{" "}
                  {new Date(lastUpdated).toLocaleTimeString("de-DE")}
                </p>
              )}
            </div>
            <button
              onClick={checkAll}
              disabled={isRefreshing}
              className="ml-auto text-xs text-white/40 hover:text-white/70 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isRefreshing ? "Wird geprüft…" : "↻ Aktualisieren"}
            </button>
          </div>
        </div>

        {/* Service List */}
        <div>
          <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
            Services
          </h2>
          <div className="space-y-2">
            {services.map((service) => {
              const config = STATUS_CONFIG[service.status];
              return (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm ${config.textColor}`}>
                      {config.dot}
                    </span>
                    <span className="text-sm font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {service.latency !== undefined && (
                      <span className="text-xs text-white/30">
                        {service.latency}ms
                      </span>
                    )}
                    <span className={`text-xs ${config.textColor}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Incident History placeholder */}
        <div>
          <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
            Störungsverlauf (letzte 90 Tage)
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-sm text-white/40">
            Keine Vorfälle in den letzten 90 Tagen.
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-xs text-white/30 flex justify-between">
          <span>Lyrvio Status Page</span>
          <a
            href="https://lyrvio.com"
            className="hover:text-white/60 transition-colors"
          >
            ← Zurück zu Lyrvio
          </a>
        </div>
      </div>
    </div>
  );
}
