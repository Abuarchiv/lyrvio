# Lyrvio — Empty-State & Error-State Designs

## 1. Kein Inserat gefunden / Bot noch nicht aktiv

**Trigger:** User hat Onboarding abgeschlossen, Extension aktiv, aber noch keine passende Wohnung gescannt.

**Visuell:**
- Leere Pipeline-Karte mit Ghost-Illustration (Bot schaut aus Fernglas)
- Headline: „Bot läuft — noch keine Treffer"
- Subtext: „Lyrvio scant alle 30 Sekunden. Bei einem Treffer bekommst du sofort eine E-Mail."
- CTA: „Such-Kriterien anpassen" → `/profile/search`

**Animationen:**
- Pulsierende Dot-Indikatoren (3 Punkte) im Pipeline-Header zeigen aktiven Scan
- Letzter Scan-Zeitstempel: „Letzter Scan: vor 12 Sek."

---

## 2. Noch keine Bewerbung gesendet

**Trigger:** Bot läuft, aber Kriterien zu eng — kein Inserat hat gematcht.

**Visuell:**
- Dashboard-Header zeigt `0 gesendet` in neutralem Gray statt Indigo
- Inline-Hint unter dem Zähler: „Noch kein Match. Kriterien erweitern?"
- Kleine Chip-Links: „+ 200€ Preis", „+ Neukölln", „Zimmer ≥1"
- Diese Chips führen direkt zum entsprechenden Feld im Profil

---

## 3. ImmoScout-Account gesperrt / Bot-Detection

**Trigger:** Extension meldet 403/429/Captcha vom ImmoScout-Endpoint.

**Visuell:**
- Rote Warning-Banner im Dashboard: „Bot kurz pausiert"
- Icon: `AlertTriangle` in Amber
- Text: „ImmoScout hat erhöhten Traffic erkannt. Bot wartet 4h und versucht es neu."
- Subtext: „Dein Account ist sicher — kein Login-Versuch während Pause."
- CTA: „Details ansehen" → expandierbarer Accordion mit letztem Error-Log (User-freundlich formuliert)

**Zweiter Eskalations-State (> 24h geblockt):**
- E-Mail-Notification an User
- Dashboard: Rote Card mit Handlungsempfehlung: „Öffne ImmoScout manuell und schließe ggf. ein Captcha ab."
- CTA: „ImmoScout öffnen" (öffnet Tab, Extension erkennt manuelles Login)

---

## 4. Stripe-Charge fehlgeschlagen

**Trigger:** Stripe Webhook `invoice.payment_failed` empfangen.

**Visuell:**
- Soft Red Banner oben im Dashboard (nicht modal-blockierend): „Zahlung fehlgeschlagen"
- Text: „Karte konnte nicht belastet werden. Bot läuft noch 3 Tage."
- Countdown (24–72h grace period)
- CTA: „Zahlungsmethode aktualisieren" → Stripe Customer Portal
- Secondary: „Andere Karte verwenden"

**Grace Period abgelaufen:**
- Bot deaktiviert sich automatisch
- Dashboard: Disabled-Overlay auf Pipeline-Karte
- Overlay-Text: „Bot pausiert — Abo erneuern um fortzufahren"
- Kein Datenverlust: Profil + Such-Kriterien bleiben erhalten

---

## 5. User hat Bot pausiert (manuell)

**Trigger:** User klickt „Bot pausieren" im Dashboard oder Extension-Popup.

**Visuell:**
- Pipeline-Header zeigt Orange Dot + „Pausiert"
- Extension-Icon: Graues Lyrvio-Symbol (statt Indigo)
- Dashboard-Card: Semi-transparent / niedrigere Opacity
- Inline-Anzeige: „Pausiert seit DD.MM.YYYY, HH:MM"
- CTA: `[Bot fortsetzen]` — Primär-Button — sofortige Reaktivierung

**E-Mail-Erinnerung:**
- Nach 7 Tagen Pause: freundliche E-Mail „Läuft deine Suche noch?"
- Nach 14 Tagen: erneute E-Mail mit Opt-out Link (DSGVO)

---

## 6. Kein Profil-Foto / unvollständiges Profil

**Trigger:** Nicht alle empfohlenen Felder ausgefüllt (Foto, Motivationstext optional aber conversion-relevant).

**Visuell:**
- Kleine Completion-Bar im Profil-Tab: „73% vollständig"
- Einzelne fehlende Felder als Chips: „+ Foto", „+ Kurz-Vorstellung"
- Tooltip bei Hover: „Wohnungen mit Foto bekommen 2× mehr Rückmeldungen"

---

## Design-Tokens für States

| State | Farbe | Tailwind-Klassen |
|---|---|---|
| Leer / Idle | Slate | `text-slate-500 bg-slate-800/40` |
| Aktiv | Indigo | `text-indigo-400 bg-indigo-500/10` |
| Warnung | Amber | `text-amber-400 bg-amber-500/10 border-amber-600/30` |
| Fehler | Red | `text-red-400 bg-red-900/20 border-red-600/30` |
| Erfolg | Emerald | `text-emerald-400 bg-emerald-900/20 border-emerald-600/30` |
| Pausiert | Orange | `text-orange-400 bg-orange-500/10` |
