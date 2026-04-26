import Link from "next/link";
import { cityList } from "@/lib/cities";

export function Footer() {
  const sortedCities = [...cityList].sort(
    (a, b) => b.population - a.population,
  );

  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
        {/* Schluss-Manifest — sehr groß */}
        <h2 className="font-display text-[44px] sm:text-[68px] lg:text-[96px] leading-[0.92] tracking-[-0.045em] text-ink max-w-[16ch]">
          Sei nicht der Achte.
          <br />
          <span className="text-stamp">Sei der Erste.</span>
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/checkout?plan=aktiv" className="btn-primary">
            Bot beauftragen · 79 €/Mo
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
            Monatlich kündbar
          </span>
        </div>

        {/* Akten-Strich */}
        <div className="mt-16 pt-8 border-t border-ink grid grid-cols-12 gap-8 font-mono text-[12px]">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-3">
              § Akte
            </div>
            <Link href="/" className="font-mono text-[14px] font-bold tracking-[0.18em] uppercase text-ink hover:text-stamp transition-colors">
              LYRVIO<span className="text-stamp">·</span>001
            </Link>
            <p className="mt-3 max-w-[36ch] text-ash leading-[1.6]">
              Browser-Bot für Wohnungsbewerbungen. Aktiv in 24/7 in fünf
              deutschen Städten. Kein Server, kein Konto-Hijack — alles im
              eigenen Browser.
            </p>
            <a
              href="mailto:akte@lyrvio.com"
              className="mt-4 inline-block link-underline text-ink"
            >
              akte@lyrvio.com
            </a>
          </div>

          <FooterCol
            title="§ Verfahren"
            items={[
              { href: "/protokoll", label: "Protokoll" },
              { href: "/gebuehren", label: "Gebühren" },
              { href: "/belege", label: "Belege" },
              { href: "/akte", label: "FAQ-Akte" },
            ]}
          />
          <FooterCol
            title="§ Dossier"
            items={[
              { href: "/dashboard", label: "Mein Dossier" },
              { href: "/profile", label: "Profil pflegen" },
              { href: "/checkout", label: "Beauftragung" },
              { href: "/hilfe", label: "Hilfe" },
            ]}
          />
          <FooterCol
            title="§ Recht"
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
            § Wirkungsbereich
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-display text-[18px] tracking-[-0.01em] text-ink">
            {sortedCities.map((city, i) => (
              <span key={city.slug} className="contents">
                <Link
                  href={`/wohnung-finden/${city.slug}`}
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
            © {new Date().getFullYear()} LYRVIO · BERLIN · BOT-NR. 001
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
