import Link from "next/link";
import { cityList } from "@/lib/cities";

export function Footer() {
  const sortedCities = [...cityList].sort((a, b) => b.population - a.population);

  return (
    <footer className="border-t border-slate-800 bg-[#0a0a0f] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Cities grid */}
        <div className="mb-12 pb-12 border-b border-slate-800">
          <p className="text-xs text-slate-600 uppercase tracking-wider mb-4">Lyrvio aktiv in</p>
          <div className="flex flex-wrap gap-2">
            {sortedCities.map((city) => (
              <Link
                key={city.slug}
                href={`/wohnung-finden/${city.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-slate-500 border border-slate-800 hover:border-slate-600 hover:text-slate-300 transition-colors"
              >
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
              >
                <path d="M16 2 L16 30" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 6 L8 26" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                <path d="M24 6 L24 26" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                <path d="M8 6 Q16 2 24 6" stroke="#818cf8" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M8 26 Q16 30 24 26" stroke="#818cf8" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="16" cy="14" r="2" fill="#818cf8" />
              </svg>
              <span className="text-white font-bold">Lyrvio</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Der 24/7-Bot für Wohnungsbewerbungen in deutschen Großstädten.
            </p>
            <div className="mt-4">
              <a
                href="mailto:support@lyrvio.com"
                className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
              >
                support@lyrvio.com
              </a>
            </div>
          </div>

          {/* Produkt */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Produkt</h4>
            <ul className="space-y-3">
              {[
                { href: "/#wie-es-funktioniert", label: "Wie es funktioniert" },
                { href: "/#preise", label: "Preise" },
                { href: "/extension", label: "Extension installieren" },
                { href: "/#faq", label: "FAQ" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Konto */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Konto</h4>
            <ul className="space-y-3">
              {[
                { href: "/dashboard", label: "Dashboard" },
                { href: "/profile", label: "Profil anlegen" },
                { href: "/checkout", label: "Abonnement" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Rechtliches</h4>
            <ul className="space-y-3">
              {[
                { href: "/agb", label: "AGB" },
                { href: "/datenschutz", label: "Datenschutz" },
                { href: "/impressum", label: "Impressum" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Lyrvio. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Bot-Status: Aktiv
          </div>
        </div>
      </div>
    </footer>
  );
}
