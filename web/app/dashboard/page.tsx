import Link from "next/link";
import {
  Bell,
  Search,
  Send,
  Eye,
  CalendarCheck,
  Home,
  FileText,
  Settings,
  TrendingUp,
  Zap,
  Clock,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const pipeline = [
  { label: "Gesendet", icon: Send, count: 47, color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { label: "Angeschaut", icon: Eye, count: 12, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Eingeladen", icon: Bell, count: 5, color: "text-amber-400", bg: "bg-amber-500/10" },
  { label: "Besichtigt", icon: Home, count: 3, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Vertrag", icon: FileText, count: 0, color: "text-violet-400", bg: "bg-violet-500/10" },
];

const recentActivity = [
  {
    type: "sent",
    title: "Bewerbung gesendet",
    subtitle: "Prenzlauer Berg • 58m² • 1.100€",
    time: "vor 12 Min",
    status: "gesendet",
    statusColor: "text-indigo-400",
  },
  {
    type: "viewed",
    title: "Bewerbung angesehen",
    subtitle: "Neukölln • 55m² • 950€",
    time: "vor 2h",
    status: "angeschaut",
    statusColor: "text-blue-400",
  },
  {
    type: "invited",
    title: "Besichtigungs-Einladung!",
    subtitle: "Mitte • 62m² • 1.350€ — Di, 29. Apr, 14:00",
    time: "gestern",
    status: "eingeladen",
    statusColor: "text-amber-400",
  },
  {
    type: "sent",
    title: "Bewerbung gesendet",
    subtitle: "Friedrichshain • 48m² • 870€",
    time: "gestern",
    status: "gesendet",
    statusColor: "text-indigo-400",
  },
  {
    type: "sent",
    title: "Bewerbung gesendet",
    subtitle: "Charlottenburg • 71m² • 1.650€",
    time: "vor 2 Tagen",
    status: "gesendet",
    statusColor: "text-indigo-400",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      <Nav />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-slate-500 mt-1">Deine aktive Wohnungssuche</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-400">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Bot aktiv
              </div>
              <Link href="/profile">
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                  <Settings className="h-4 w-4" />
                  Profil
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Aktive Suche", value: "Berlin", sub: "seit 8 Tagen", icon: Search, color: "text-indigo-400" },
              { label: "Heute gesendet", value: "8", sub: "Bewerbungen", icon: Send, color: "text-blue-400" },
              { label: "Einladungen", value: "5", sub: "total", icon: Bell, color: "text-amber-400" },
              { label: "Reaktionszeit", value: "< 30s", sub: "Durchschnitt", icon: Clock, color: "text-emerald-400" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{stat.sub}</div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pipeline */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white">Bewerbungs-Pipeline</h2>
                  <TrendingUp className="h-4 w-4 text-slate-500" />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {pipeline.map((stage, i) => {
                    const Icon = stage.icon;
                    return (
                      <div
                        key={i}
                        className={`flex-1 min-w-[100px] rounded-xl ${stage.bg} border border-slate-800/50 p-4 text-center`}
                      >
                        <Icon className={`h-5 w-5 ${stage.color} mx-auto mb-2`} />
                        <div className={`text-2xl font-bold ${stage.color}`}>{stage.count}</div>
                        <div className="text-xs text-slate-500 mt-1">{stage.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                <h2 className="text-lg font-bold text-white mb-5">Letzte Aktivitäten</h2>
                <div className="space-y-4">
                  {recentActivity.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {item.type === "invited" ? (
                          <Bell className="h-4 w-4 text-amber-400" />
                        ) : item.type === "viewed" ? (
                          <Eye className="h-4 w-4 text-blue-400" />
                        ) : (
                          <Send className="h-4 w-4 text-indigo-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-200">{item.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5 truncate">{item.subtitle}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <Badge variant="outline" className={`text-[10px] border-slate-700 ${item.statusColor}`}>
                          {item.status}
                        </Badge>
                        <span className="text-[10px] text-slate-600">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Status */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                <h3 className="text-base font-bold text-white mb-4">Profil-Status</h3>
                <div className="space-y-3">
                  {[
                    { label: "Persönliche Daten", done: true },
                    { label: "Gehalt & Beruf", done: true },
                    { label: "Schufa-Score", done: true },
                    { label: "Bewerbungs-Mappe", done: false },
                    { label: "Anschreiben", done: true },
                    { label: "Suchkriterien", done: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">{item.label}</span>
                      {item.done ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-slate-600" />
                      )}
                    </div>
                  ))}
                </div>
                <Link href="/profile" className="block mt-4">
                  <Button variant="outline" size="sm" className="w-full border-slate-700 text-slate-300 text-xs">
                    Profil vervollständigen
                  </Button>
                </Link>
              </div>

              {/* Erfolgs-Bonus */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Erfolgs-Bonus</h3>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Du hast 3 Besichtigungen. Wenn du einen Mietvertrag unterschreibst, meld dich bei uns!
                </p>
                <Button
                  size="sm"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs"
                >
                  <Trophy className="h-3.5 w-3.5" />
                  Mietvertrag melden
                </Button>
              </div>

              {/* Bot Status */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white">Bot-Status</h3>
                  <Zap className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="space-y-2 text-xs text-slate-500">
                  <div className="flex justify-between">
                    <span>ImmoScout24</span>
                    <span className="text-emerald-400">aktiv</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Immowelt</span>
                    <span className="text-emerald-400">aktiv</span>
                  </div>
                  <div className="flex justify-between">
                    <span>eBay Kleinanzeigen</span>
                    <span className="text-emerald-400">aktiv</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Immonet</span>
                    <span className="text-emerald-400">aktiv</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wunderflats</span>
                    <span className="text-amber-400">Upgrade nötig</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
