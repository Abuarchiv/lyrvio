import Link from "next/link";
import { cityList } from "@/lib/cities";

export function Footer() {
  const sortedCities = [...cityList].sort(
    (a, b) => b.population - a.population,
  );

  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
        {/* Schluss — sehr groß */}
        <h2 className="font-display text-[44px] sm:text-[68px] lg:text-[96px] leading-[0.92] tracking-[-0.045em] text-ink max-w-[16ch]">
          Sei nicht der Achte.
          <br />
          <span className="text-stamp">Sei der Erste.</span>
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/checkout/erfolg" prefetch={false} className="btn-primary">
            Jetzt starten · 9 €/Monat
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
            Monatlich kündbar
          </span>
        </div>

        {/* Akten-Strich */}
        <div className="mt-16 pt-8 border-t border-ink grid grid-cols-12 gap-8 font-mono text-[12px]">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-3">
              Über
            </div>
            <Link href="/" prefetch={false} className="font-mono text-[14px] font-bold tracking-[0.18em] uppercase text-ink hover:text-stamp transition-colors">
              LYRVIO
            </Link>
            <p className="mt-3 max-w-[36ch] text-ash leading-[1.6]">
              Lyrvio ist eine Browser-Erweiterung, die für dich Wohnungsbewerbungen
              schreibt. 24/7 aktiv in Berlin, München, Hamburg, Köln, Frankfurt.
              Keine Server, keine Konto-Übergabe — läuft in deinem eigenen Browser.
            </p>
            <a
              href="mailto:hallo@lyrvio.com"
              className="mt-4 inline-block link-underline text-ink"
            >
              hallo@lyrvio.com
            </a>
          </div>

          <FooterCol
            title="Lyrvio"
            items={[
              { href: "/protokoll", label: "So funktioniert's" },
              { href: "/gebuehren", label: "Preis" },
              { href: "/belege", label: "Erfolge" },
              { href: "/akte", label: "Häufige Fragen" },
            ]}
          />
          <FooterCol
            title="Mein Konto"
            items={[
              { href: "/dashboard", label: "Übersicht" },
              { href: "/profile", label: "Profil bearbeiten" },
              { href: "/checkout/erfolg", label: "Bestellen" },
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

        {/* Städte als Akten-Index */}
        <div className="mt-16 pt-8 border-t border-rule-soft">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-4">
            Aktiv in
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-display text-[18px] tracking-[-0.01em] text-ink">
            {sortedCities.map((city, i) => (
              <span key={city.slug} className="contents">
                <Link
                  href={`/wohnung-finden/${city.slug}`}
                  prefetch={false}
                  className="hover:text-stamp transition-colors"
                >
                  {city.name}
                </Link>
                {i < sortedCities.length - 1 && (
                  <span className="text-ash select-none">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Schlussstrich */}
        <div className="mt-12 pt-6 border-t-2 border-ink flex flex-col sm:flex-row items-baseline justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash">
          <span>
            © {new Date().getFullYear()} Lyrvio · Berlin
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-stamp rounded-full" />
            24/7 aktiv · {new Date().toLocaleDateString("de-DE")}
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
    <div className="col-span-6 md:col-span-2 lg:col-span-2">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-4">
        {title}
      </p>
      <ul className="space-y-2.5 text-[13px]">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              prefetch={false}
              className="text-ink hover:text-stamp transition-colors"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
