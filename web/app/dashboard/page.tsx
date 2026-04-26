import Link from "next/link";
import { Nav } from "@/components/Nav";
import { TopTicker } from "@/components/TopTicker";
import { Footer } from "@/components/Footer";

const pipeline = [
  { label: "Gesendet",   count: 47, sub: "ca. 3,2 s",  tone: "" },
  { label: "Angeschaut", count: 12, sub: "26 % CTR", tone: "" },
  { label: "Eingeladen", count: 5,  sub: "+2 heute", tone: "-yellow" },
  { label: "Besichtigt", count: 3,  sub: "Termine",  tone: "-sage" },
  { label: "Vertrag",    count: 0,  sub: "in Ziel",  tone: "-stamp" },
];

const recentActivity = [
  { type: "VERSANDT",  title: "2-Zi · Prenzlauer Berg · 58 m² · 1.100 €", time: "vor 12 Min", tone: "ev-sent" },
  { type: "ANGESEHEN", title: "3-Zi · Mitte · 78 m² · 1.420 €",            time: "vor 38 Min", tone: "ev-wait" },
  { type: "EINLADUNG", title: "1-Zi · Friedrichshain · 42 m² · 720 €",     time: "vor 2 Std",  tone: "ev-new" },
  { type: "VERSANDT",  title: "WG · Kreuzberg · 18 m² · 540 €",            time: "vor 4 Std",  tone: "ev-sent" },
  { type: "ANGESEHEN", title: "2-Zi · Schöneberg · 60 m² · 1.180 €",       time: "vor 6 Std",  tone: "ev-wait" },
];

const profilStatus = [
  { label: "Persönliche Daten", done: true },
  { label: "Gehalt & Beruf",    done: true },
  { label: "Schufa-Score",      done: true },
  { label: "Bewerbungs-Mappe",  done: false },
  { label: "Anschreiben-Stil",  done: true },
  { label: "Suchkriterien",     done: true },
];

export default function DashboardPage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main className="bg-paper min-h-screen">
        {/* Akten-Header */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="stamp-rotated">ÜBERSICHT</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Aktiv · Berlin · seit 8 Tagen
              </span>
            </div>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <h1 className="font-display text-[44px] sm:text-[60px] lg:text-[72px] leading-[0.95] tracking-[-0.035em] text-ink">
                Mein <em>Konto.</em>
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="tag -sage">● Aktiv · 24/7</span>
                <Link href="/profile" className="btn-secondary">
                  Profil →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-rule-soft">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: "Aktive Suche", value: "Berlin", sub: "seit 8 Tagen" },
                { label: "Heute gesendet", value: "8",     sub: "Bewerbungen" },
                { label: "Einladungen",    value: "5",     sub: "total · +2 heute" },
                { label: "Reaktionszeit",  value: "28 s",  sub: "Median letzte 24 h" },
              ].map((s, i) => (
                <div key={i} className="border-2 border-ink bg-paper-warm p-6">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-3">
                    {String(i + 1).padStart(2, "0")} · {s.label}
                  </div>
                  <div className="font-display text-[44px] sm:text-[56px] leading-none tracking-[-0.04em] text-ink">
                    {s.value}
                  </div>
                  <div className="mt-2 font-mono text-[11px] text-ash">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pipeline + Profile */}
        <section>
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12">
            <div className="grid grid-cols-12 gap-8">
              {/* Bewerbungs-Übersicht */}
              <div className="col-span-12 lg:col-span-8">
                <div className="label mb-4">Bewerbungs-Übersicht</div>
                <h2 className="font-display text-[28px] sm:text-[36px] tracking-[-0.025em] text-ink mb-6">
                  Bewerbungs-Verlauf
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
                  {pipeline.map((p, i) => (
                    <div key={i} className="border-2 border-ink bg-paper-warm p-4 text-center relative overflow-visible">
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2">
                        {p.tone === "-yellow" && (
                          <span className="bg-hi text-ink px-2 py-0.5 font-bold">{p.label}</span>
                        )}
                        {p.tone === "-sage" && (
                          <span className="bg-sage text-paper px-2 py-0.5 font-bold">{p.label}</span>
                        )}
                        {p.tone === "-stamp" && (
                          <span className="bg-stamp text-paper px-2 py-0.5 font-bold">{p.label}</span>
                        )}
                        {!p.tone && <span className="text-ash">{p.label}</span>}
                      </div>
                      <div className="font-display text-[36px] sm:text-[44px] leading-none tracking-[-0.04em] text-ink">
                        {p.count}
                      </div>
                      <div className="mt-2 font-mono text-[10px] text-ash">{p.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="label mb-4">Verlauf</div>
                <h2 className="font-display text-[28px] sm:text-[36px] tracking-[-0.025em] text-ink mb-6">
                  Letzte Aktivitäten
                </h2>
                <div className="feed">
                  <div className="feed-header">
                    <span>UHR · TYP · INHALT</span>
                    <span className="hidden sm:inline">ZEIT</span>
                  </div>
                  {recentActivity.map((a, i) => (
                    <div key={i} className="feed-row">
                      <span className="ts">[#{1000 + i}]</span>
                      <span>
                        <span className={a.tone}>{a.type}</span>
                        <span className="meta"> · {a.title}</span>
                      </span>
                      <span className="right">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile-Status */}
              <aside className="col-span-12 lg:col-span-4">
                <div className="label mb-4">Profil-Status</div>
                <h2 className="font-display text-[28px] sm:text-[32px] tracking-[-0.025em] text-ink mb-6">
                  Vollständigkeit
                </h2>

                <div className="border-2 border-ink bg-paper-warm">
                  <div className="akte-head">
                    <span>Profil-Check</span>
                    <span>5/6 ✓</span>
                  </div>
                  <ul className="divide-y divide-rule-soft">
                    {profilStatus.map((p, i) => (
                      <li key={i} className="px-4 py-3 flex items-center justify-between font-mono text-[13px]">
                        <span className={p.done ? "text-ink" : "text-ash"}>
                          {p.label}
                        </span>
                        <span className={p.done ? "text-sage font-bold" : "text-stamp font-bold"}>
                          {p.done ? "● erledigt" : "○ offen"}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-4 border-t-2 border-ink">
                    <Link href="/profile" className="btn-primary w-full justify-center">
                      Profil vervollständigen
                    </Link>
                  </div>
                </div>

                {/* Erfolgsbonus */}
                <div className="mt-6 invert p-6 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1.5 diagonal-yellow opacity-80" />
                  <div className="label !text-paper-2 mb-3">
                    <span style={{ color: "var(--hi)" }}>■</span>
                    Erfolgsprämie
                  </div>
                  <p className="font-display text-[22px] leading-[1.2] tracking-[-0.02em] text-paper">
                    3 Besichtigungen.
                    <br />
                    <span className="accent">Bald in Ziel.</span>
                  </p>
                  <p className="mt-3 font-mono text-[11.5px] leading-[1.5] text-paper-2">
                    Wenn du einen Mietvertrag unterschreibst, melde dich bei
                    hallo@lyrvio.com — wir schicken die Erfolgsprämien-Rechnung.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
