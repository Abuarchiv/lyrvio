# Store-Listings Status

**Erstellt:** 2026-04-25
**Stand:** Listing-Texte vollständig. Assets müssen noch produziert werden.

---

## Was geliefert wurde

Alle Listing-Texte und Spezifikationen sind in `docs/store-listings/` fertig:

| Datei | Inhalt | Status |
|-------|--------|--------|
| `chrome.md` | Chrome-Name, Short Description, Detailed Description (DE), Permissions Justification | Fertig |
| `chrome-assets.md` | Icon-Spec, Promo-Tile-Spec, 5 Screenshot-Storyboard | Fertig |
| `firefox.md` | Firefox-Name, Summary, About-Text (DE), Permissions Justification | Fertig |
| `firefox-assets.md` | Icon-Spec, Header-Image-Spec, 3 Screenshot-Storyboard | Fertig |
| `reviewer-notes.md` | Erklärung für Reviewer, Test-Account-Setup, Datenschutz-Statement | Fertig |
| `submission-checklist.md` | Build-Check, Account-Setup, Asset-Checkliste, Reject-Mitigation | Fertig |

---

## Was Mensch Abu noch tun muss

### Muss vor Submission erledigt sein (Blocker)

1. **lyrvio.com/datenschutz live schalten** — Privacy Policy URL wird von beiden Stores bei Submission geprüft. Ohne live URL: Reject garantiert. Template in `web/`-Verzeichnis oder als statische Seite.

2. **Store-Assets produzieren** — Alle Texte sind fertig, aber die PNG-Dateien fehlen noch:
   - Chrome Icon 128×128 (aus `web/public/brand/logo-a.svg` exportieren)
   - Chrome Promo-Tile 440×280 (neues Grafik-Asset)
   - 5 Chrome-Screenshots 1280×800 (aus laufendem Build machen)
   - Firefox Icon 64×64 (gleich wie Chrome Icon, nur 64px)
   - Firefox Header 1080×180 (neues Grafik-Asset)
   - 3 Firefox-Screenshots

3. **Chrome Developer Account** ($5 einmalig) — dev@lyrvio.com empfohlen. Dauert 10 Minuten, Zahlung via Google Pay.

4. **Firefox/AMO Account** (kostenlos) — addons.mozilla.org/developers

5. **GitHub-Repo public oder Source-Code-Link** — AMO verlangt Source-Code-Link (`github.com/Abuarchiv/lyrvio`). Repo muss public sein oder Mozilla privaten Zugang bekommen. Lyrvio ist Open Source (MIT), also einfach public machen.

### Optional (erhöht Conversion + Review-Speed)

- Test-Account auf ImmoScout24 anlegen (lyrvio-reviewer@proton.me) und in reviewer-notes.md eintragen
- `lyrvio.com/support` Seite live schalten
- Store-Listing auf Englisch übersetzen (erhöht internationale Reichweite)

---

## Estimated Review-Time

| Store | Typ | Erwartete Wartezeit |
|-------|-----|---------------------|
| Chrome Web Store | Neue Extension | 1–3 Werktage |
| Chrome Web Store | Update nach Reject + Resubmit | 3–5 Werktage zusätzlich |
| Firefox AMO (Listed) | Erste Extension | 2–8 Wochen (AMO hat Backlog) |
| Firefox AMO (Self-Hosted) | Automatisch signiert | Sofort (kein manuelles Review) |

**Empfehlung:** Firefox erst als Self-Hosted (Beta-Nutzer bekommen XPI-Datei direkt) releasen, dann AMO-Listed Review starten wenn der Chrome-Review-Prozess läuft. Spart Zeit und gibt echtes Nutzer-Feedback während AMO noch reviewed.

---

## Submission-Reihenfolge (empfohlen)

1. lyrvio.com/datenschutz live (Blocker)
2. Assets produzieren (2–3h Grafik-Arbeit)
3. Chrome zuerst (größere Nutzerbasis, schnelleres Review)
4. Firefox Self-Hosted parallel (für Beta-Nutzer sofort)
5. Firefox AMO-Listed im Anschluss (Langfrist-Präsenz)
