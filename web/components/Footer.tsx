import Link from "next/link";
import { cityList } from "@/lib/cities";

export function Footer() {
  const sortedCities = [...cityList].sort(
    (a, b) => b.population - a.population,
  );

  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1280px] px-6 py-20">
        {/* Big serif sign-off */}
        <div className="mb-16">
          <p className="font-display text-[44px] sm:text-[60px] lg:text-[80px] leading-[0.95] tracking-[-0.025em] text-bone max-w-[14ch]">
            Sei der&nbsp;
            <span className="text-bone-2">Erste,</span>
            <br />
            nicht der&nbsp;
            <span className="lime-underline">Achte.</span>
          </p>
          <Link href="/#preise" className="btn-lime mt-10 inline-flex">
            Bot aktivieren · 79&nbsp;€/Monat
          </Link>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pt-12 border-t border-line">
          <div className="col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="font-display text-[28px] tracking-[-0.02em] text-bone hover:text-lime transition-colors"
            >
              Lyrvio<span className="text-lime">.</span>
            </Link>
            <p className="mt-4 max-w-[36ch] text-[14px] leading-[1.6] text-bone-2">
              Der 24/7-Browser-Bot für Wohnungsbewerbungen in deutschen
              Großstädten.
            </p>
            <a
              href="mailto:support@lyrvio.com"
              className="mt-4 inline-block text-[13px] text-ash hover:text-bone transition-colors"
            >
              support@lyrvio.com
            </a>
          </div>

          <FooterCol
            title="Produkt"
            items={[
              { href: "/#wie", label: "Wie es läuft" },
              { href: "/#preise", label: "Preis" },
              { href: "/extension", label: "Extension" },
              { href: "/#faq", label: "FAQ" },
            ]}
          />
          <FooterCol
            title="Konto"
            items={[
              { href: "/dashboard", label: "Dashboard" },
              { href: "/profile", label: "Profil" },
              { href: "/checkout", label: "Abo" },
              { href: "/hilfe", label: "Hilfe-Center" },
            ]}
          />
          <FooterCol
            title="Rechtliches"
            items={[
              { href: "/agb", label: "AGB" },
              { href: "/datenschutz", label: "Datenschutz" },
              { href: "/impressum", label: "Impressum" },
              { href: "/presse", label: "Presse" },
            ]}
          />
        </div>

        {/* Cities */}
        <div className="mt-16 pt-8 border-t border-line">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust mb-4">
            Aktiv in
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-display text-[18px] tracking-[-0.005em] text-bone-2">
            {sortedCities.map((city, i) => (
              <span key={city.slug} className="contents">
                <Link
                  href={`/wohnung-finden/${city.slug}`}
                  className="hover:text-lime transition-colors"
                >
                  {city.name}
                </Link>
                {i < sortedCities.length - 1 && (
                  <span className="text-dust select-none">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
          <span>© {new Date().getFullYear()} Lyrvio · Berlin</span>
          <span className="flex items-center gap-2">
            <span className="ticker-dot" />
            Bot aktiv
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div className="lg:col-span-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash mb-4">
        {title}
      </p>
      <ul className="space-y-2.5 text-[14px]">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="text-bone-2 hover:text-bone transition-colors"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
