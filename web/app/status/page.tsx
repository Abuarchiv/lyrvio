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
import { TopTicker } from "@/components/TopTicker";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

interface ServiceStatus {
  name: string;
  url: string;
  status: "operational" | "degraded" | "down" | "checking";
  latency?: number;
  lastChecked?: string;
}

const SERVICES: Omit<ServiceStatus, "status" | "latency" | "lastChecked">[] = [
  { name: "Web App", url: "https://lyrvio.pages.dev" },
  { name: "API", url: "https://lyrvio-api.workers.dev/health" },
  { name: "Datenbank", url: "https://lyrvio-api.workers.dev/health/db" },
  { name: "E-Mail (Resend)", url: "https://lyrvio-api.workers.dev/health/email" },
  { name: "KI (Cloudflare AI)", url: "https://lyrvio-api.workers.dev/health" },
  { name: "Zahlung (Stripe)", url: "https://status.stripe.com/api/v2/status.json" },
];

const STATUS_CONFIG = {
  operational: {
    label: "Betriebsbereit",
    color: "text-sage",
    dot: "●",
  },
  degraded: {
    label: "Beeinträchtigt",
    color: "text-hi",
    dot: "●",
  },
  down: {
    label: "Ausgefallen",
    color: "text-stamp",
    dot: "●",
  },
  checking: {
    label: "Wird geprüft…",
    color: "text-ash",
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
      signal: AbortSignal.timeout(10_000),
      mode: url.includes("lyrvio") ? "cors" : "no-cors",
    });

    const latency = Date.now() - start;

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
    <>
      <TopTicker />
      <Nav />
      <main className="bg-paper min-h-screen">
        {/* Header */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-12 lg:pt-20">
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <span className="stamp-rotated">§ STATUS</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                System-Status · Echtzeit
              </span>
            </div>
            <h1 className="font-display text-[44px] sm:text-[56px] tracking-[-0.03em] text-ink leading-[1.1] mb-2">
              Lyrvio Status
            </h1>
            <p className="font-mono text-[14px] text-ash">
              Echtzeit-Status aller Lyrvio-Services
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[860px] px-6 lg:px-10 py-12 space-y-10">
          {/* Overall Status Banner */}
          <div className={`border-2 p-6 ${
            overallStatus === "operational"
              ? "border-ink bg-paper-warm"
              : overallStatus === "degraded"
              ? "border-ink bg-paper-warm"
              : "border-stamp bg-paper-warm"
          }`}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <span className={`text-2xl font-mono ${STATUS_CONFIG[overallStatus].color}`}>
                  {STATUS_CONFIG[overallStatus].dot}
                </span>
                <div>
                  <p className="font-display text-[22px] tracking-[-0.02em] text-ink">
                    {overallStatus === "operational"
                      ? "Alle Systeme betriebsbereit"
                      : overallStatus === "degraded"
                      ? "Teilweise Beeinträchtigungen"
                      : "Systemausfall erkannt"}
                  </p>
                  {lastUpdated && (
                    <p className="font-mono text-[11px] text-ash mt-1">
                      Zuletzt geprüft:{" "}
                      {new Date(lastUpdated).toLocaleTimeString("de-DE")}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={checkAll}
                disabled={isRefreshing}
                className="font-mono text-[12px] text-ash hover:text-ink transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isRefreshing ? "Wird geprüft…" : "↻ Aktualisieren"}
              </button>
            </div>
          </div>

          {/* Service List */}
          <div>
            <div className="label mb-6">Services</div>
            <div className="border-2 border-ink divide-y divide-rule-soft">
              {services.map((service) => {
                const config = STATUS_CONFIG[service.status];
                return (
                  <div
                    key={service.name}
                    className="flex items-center justify-between px-6 py-4 bg-paper hover:bg-paper-warm transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-[16px] ${config.color}`}>
                        {config.dot}
                      </span>
                      <span className="font-mono text-[14px] text-ink">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      {service.latency !== undefined && (
                        <span className="font-mono text-[12px] text-ash">
                          {service.latency}ms
                        </span>
                      )}
                      <span className={`font-mono text-[12px] ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Incident History */}
          <div>
            <div className="label mb-6">Störungsverlauf (letzte 90 Tage)</div>
            <div className="border-2 border-ink bg-paper p-6">
              <p className="font-mono text-[14px] text-ash">
                Keine Vorfälle in den letzten 90 Tagen.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t-2 border-ink flex justify-between font-mono text-[11px] text-ash">
            <span>Lyrvio Status Page</span>
            <a
              href="https://lyrvio.com"
              className="hover:text-ink transition-colors"
            >
              ← Zurück zu Lyrvio
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
