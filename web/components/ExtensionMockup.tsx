export function ExtensionMockup() {
  return (
    <div className="relative w-full overflow-x-auto">
      <svg
        viewBox="0 0 860 520"
        width="860"
        height="520"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }}
        aria-label="Mockup: Lyrvio Browser-Extension Popup über ImmoScout24"
      >
        {/* ─── Browser Frame ─── */}
        <rect x="0" y="0" width="860" height="520" fill="#e8e4db" rx="10" />

        {/* Browser chrome top bar */}
        <rect x="0" y="0" width="860" height="44" fill="#d5d0c7" rx="10" />
        <rect x="0" y="24" width="860" height="20" fill="#d5d0c7" />

        {/* Traffic lights */}
        <circle cx="24" cy="22" r="6" fill="#ff5f57" />
        <circle cx="44" cy="22" r="6" fill="#febc2e" />
        <circle cx="64" cy="22" r="6" fill="#28c840" />

        {/* Address bar */}
        <rect x="130" y="11" width="480" height="22" fill="#c8c3ba" rx="4" />
        <text x="370" y="25" fontFamily="ui-monospace, monospace" fontSize="10" fill="#5a5550" textAnchor="middle">
          immoscout24.de/wohnung-mieten/berlin
        </text>

        {/* Extensions icon area (right of address bar) */}
        <rect x="740" y="11" width="22" height="22" fill="#bab5ab" rx="3" />
        {/* Puzzle piece icon */}
        <text x="751" y="25" fontFamily="ui-monospace, monospace" fontSize="11" fill="#5a5550" textAnchor="middle">⚙</text>

        {/* ─── ImmoScout24 Background (mocked, dimmed) ─── */}
        <rect x="0" y="44" width="860" height="476" fill="#f0ede6" />

        {/* ImmoScout24 header bar */}
        <rect x="0" y="44" width="860" height="52" fill="#e8e2d7" />
        <rect x="0" y="94" width="860" height="2" fill="#ccc8be" />

        {/* IS24 logo mock */}
        <rect x="24" y="58" width="80" height="24" fill="#0a7c3e" rx="3" />
        <text x="64" y="74" fontFamily="ui-monospace, monospace" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">ImmoScout24</text>

        {/* IS24 nav items */}
        <text x="140" y="74" fontFamily="ui-monospace, monospace" fontSize="10" fill="#6f6a5e">Kaufen</text>
        <text x="190" y="74" fontFamily="ui-monospace, monospace" fontSize="10" fill="#6f6a5e">Mieten</text>
        <text x="240" y="74" fontFamily="ui-monospace, monospace" fontSize="10" fill="#6f6a5e">Gewerbe</text>

        {/* IS24 listing cards (3 faint cards) */}
        {/* Card 1 */}
        <rect x="24" y="108" width="240" height="120" fill="#ebe7de" rx="4" stroke="#d5d0c7" strokeWidth="1" />
        <rect x="24" y="108" width="240" height="60" fill="#d5d0c7" rx="4" />
        <text x="34" y="184" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#6f6a5e">2-Zi · Friedrichshain · 72m²</text>
        <text x="34" y="198" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#0c0a08" fontWeight="bold">1.150 €/Monat</text>

        {/* Card 2 */}
        <rect x="278" y="108" width="240" height="120" fill="#ebe7de" rx="4" stroke="#d5d0c7" strokeWidth="1" />
        <rect x="278" y="108" width="240" height="60" fill="#d0ccc3" rx="4" />
        <text x="288" y="184" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#6f6a5e">3-Zi · Prenzlauer Berg · 89m²</text>
        <text x="288" y="198" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#0c0a08" fontWeight="bold">1.780 €/Monat</text>

        {/* Card 3 (partial) */}
        <rect x="532" y="108" width="200" height="120" fill="#ebe7de" rx="4" stroke="#d5d0c7" strokeWidth="1" />
        <rect x="532" y="108" width="200" height="60" fill="#c8c4bb" rx="4" />
        <text x="542" y="184" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#6f6a5e">1-Zi · Mitte · 38m²</text>
        <text x="542" y="198" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#0c0a08" fontWeight="bold">890 €/Monat</text>

        {/* More faint cards row 2 */}
        <rect x="24" y="240" width="240" height="80" fill="#ebe7de" rx="4" stroke="#d5d0c7" strokeWidth="1" opacity="0.6" />
        <rect x="278" y="240" width="240" height="80" fill="#ebe7de" rx="4" stroke="#d5d0c7" strokeWidth="1" opacity="0.6" />
        <rect x="532" y="240" width="200" height="80" fill="#ebe7de" rx="4" stroke="#d5d0c7" strokeWidth="1" opacity="0.4" />

        {/* Overlay dim */}
        <rect x="0" y="44" width="860" height="476" fill="rgba(0,0,0,0.18)" />

        {/* ─── Extension Popup ─── */}
        {/* Shadow */}
        <rect x="546" y="52" width="300" height="462" rx="8" fill="rgba(0,0,0,0.28)" />
        {/* Main popup body */}
        <rect x="542" y="48" width="300" height="462" rx="8" fill="#f3efe6" stroke="#0c0a08" strokeWidth="2" />

        {/* ── Popup Header ── */}
        <rect x="542" y="48" width="300" height="56" rx="8" fill="#0c0a08" />
        <rect x="542" y="84" width="300" height="20" fill="#0c0a08" />

        {/* Logo mark — "L" in stamp box */}
        <rect x="558" y="60" width="28" height="28" fill="#c8201c" rx="2" />
        <text x="572" y="79" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="16" fill="white" textAnchor="middle" fontWeight="bold">L</text>

        {/* Wordmark */}
        <text x="595" y="73" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="14" fill="white" fontWeight="bold" letterSpacing="1">LYRVIO</text>
        <text x="595" y="84" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="7" fill="#9a9486" letterSpacing="1.5">WOHNUNGS-BOT</text>

        {/* Settings gear icon (top right) */}
        <text x="820" y="78" fontFamily="ui-monospace, monospace" fontSize="13" fill="#6f6a5e" textAnchor="middle">⚙</text>

        {/* ── Status Badge ── */}
        <rect x="554" y="114" width="276" height="32" rx="4" fill="#f8f4ea" stroke="#0c0a08" strokeWidth="1.5" />
        {/* Green dot */}
        <circle cx="568" cy="130" r="4.5" fill="#1a8a1a" />
        <circle cx="568" cy="130" r="2.5" fill="#2dbd2d" />
        <text x="580" y="134" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="10" fill="#0c0a08" fontWeight="bold">AKTIV — Suche läuft</text>
        {/* Uptime */}
        <text x="790" y="134" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8" fill="#6f6a5e" textAnchor="end">07:24:13</text>

        {/* ── Live Log Section ── */}
        <text x="554" y="168" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8" fill="#6f6a5e" letterSpacing="1.5">AKTIVITÄT · LIVE</text>
        <line x1="554" y1="173" x2="830" y2="173" stroke="#0c0a08" strokeWidth="1" />

        {/* Log lines */}
        <rect x="554" y="178" width="276" height="108" rx="3" fill="#f8f4ea" />

        {/* Log line 1 */}
        <text x="562" y="194" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8.5" fill="#6f6a5e">[14:23:45]</text>
        <text x="618" y="194" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8.5" fill="#0c0a08">Inserat erkannt:</text>
        <text x="562" y="204" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8.5" fill="#0c0a08">2-Zi · Friedrichshain · 1.150€</text>

        {/* Log line 2 */}
        <text x="562" y="220" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8.5" fill="#6f6a5e">[14:23:48]</text>
        <text x="618" y="220" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8.5" fill="#0c0a08">Anschreiben erstellt (3,2s)</text>

        {/* Log line 3 — success */}
        <rect x="554" y="228" width="276" height="18" fill="rgba(200,32,28,0.07)" />
        <text x="562" y="241" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8.5" fill="#6f6a5e">[14:24:13]</text>
        <text x="618" y="241" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8.5" fill="#c8201c" fontWeight="bold">✓ Gesendet — Pos. 02</text>

        {/* Log line 4 */}
        <text x="562" y="258" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8.5" fill="#9a9486">[14:24:31]  Nächstes Inserat wird geprüft…</text>

        {/* Blinking cursor */}
        <rect x="562" y="265" width="5" height="8" fill="#c8201c" opacity="0.7" />

        {/* ── Divider ── */}
        <line x1="554" y1="298" x2="830" y2="298" stroke="#0c0a08" strokeWidth="1" />

        {/* ── Stats Section ── */}
        <text x="554" y="316" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8" fill="#6f6a5e" letterSpacing="1.5">HEUTE</text>

        <rect x="554" y="322" width="130" height="52" rx="3" fill="#f8f4ea" stroke="#0c0a08" strokeWidth="1.5" />
        <text x="619" y="344" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="22" fill="#0c0a08" fontWeight="bold" textAnchor="middle">12</text>
        <text x="619" y="357" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8" fill="#6f6a5e" textAnchor="middle">Bewerbungen</text>
        <text x="619" y="367" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="7" fill="#9a9486" textAnchor="middle">gesendet</text>

        <rect x="700" y="322" width="130" height="52" rx="3" fill="#f8f4ea" stroke="#0c0a08" strokeWidth="1.5" />
        <text x="765" y="344" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="22" fill="#c8201c" fontWeight="bold" textAnchor="middle">4</text>
        <text x="765" y="357" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="8" fill="#6f6a5e" textAnchor="middle">Antworten</text>
        <text x="765" y="367" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="7" fill="#9a9486" textAnchor="middle">von Vermietern</text>

        {/* ── Divider ── */}
        <line x1="554" y1="388" x2="830" y2="388" stroke="#d5d0c7" strokeWidth="1" />

        {/* ── Stamp watermark ── */}
        <rect x="608" y="400" width="116" height="40" rx="3" fill="none" stroke="#c8201c" strokeWidth="2" strokeDasharray="3,2" opacity="0.4" transform="rotate(-2, 666, 420)" />
        <text x="666" y="418" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="9" fill="#c8201c" textAnchor="middle" opacity="0.45" transform="rotate(-2, 666, 420)" letterSpacing="2" fontWeight="bold">BETA · MAI 2026</text>
        <text x="666" y="430" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="7" fill="#c8201c" textAnchor="middle" opacity="0.4" transform="rotate(-2, 666, 420)" letterSpacing="1">MOCKUP · VORSCHAU</text>

        {/* ── Toggle Button ── */}
        <rect x="554" y="456" width="276" height="40" rx="4" fill="#0c0a08" />
        {/* Toggle track */}
        <rect x="566" y="470" width="30" height="14" rx="7" fill="#2dbd2d" />
        <circle cx="589" cy="477" r="5.5" fill="white" />
        <text x="604" y="482" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="10" fill="white">Bot aktiv</text>
        <text x="816" y="482" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="9" fill="#6f6a5e" textAnchor="end">Pause →</text>

        {/* ─── Bonus mockup 1: Status-Bar Badge (bottom left of browser) ─── */}
        <rect x="12" y="468" width="220" height="28" rx="5" fill="#0c0a08" opacity="0.92" />
        <circle cx="26" cy="482" r="4" fill="#2dbd2d" />
        <circle cx="26" cy="482" r="2" fill="#5fff5f" />
        <text x="36" y="486" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="9" fill="white">● 247 Inserate gescannt heute</text>

        {/* ─── Bonus mockup 2: System Notification (bottom right, above popup) ─── */}
        <rect x="542" y="488" width="300" height="20" rx="4" fill="rgba(0,0,0,0)" />
        {/* (notification is inside popup area, shown as in-browser toast above status bar) */}

        {/* Notification toast — lower right corner, below browser, small */}
        <rect x="588" y="488" width="258" height="28" rx="5" fill="#f8f4ea" stroke="#0c0a08" strokeWidth="1.5" opacity="0.97" />
        <rect x="588" y="488" width="4" height="28" fill="#c8201c" rx="2" />
        <text x="600" y="499" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="7.5" fill="#0c0a08" fontWeight="bold">Vermieter hat geantwortet</text>
        <text x="600" y="511" fontFamily="ui-monospace, 'SF Mono', monospace" fontSize="7.5" fill="#6f6a5e">Berlin-Mitte · 1.150€ · Besichtigung?</text>

      </svg>

      {/* Caption */}
      <p
        style={{
          fontFamily: "ui-monospace, 'SF Mono', monospace",
          fontSize: "11px",
          color: "#6f6a5e",
          textAlign: "center",
          marginTop: "10px",
          letterSpacing: "0.05em",
        }}
      >
        Mockup · So sieht die Extension nach Beta-Start aus
      </p>
    </div>
  );
}
