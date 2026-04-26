# Firefox Add-on — Listing (addons.mozilla.org)

**Name:** Lyrvio — Wohnungs-Bewerbungs-Bot
**Extension ID:** lyrvio@extension
**Manifest Version:** 2 (Firefox MV2, kompatibel ab Firefox 109)
**Categories:** Productivity, Web Development
**Tags:** wohnung, immobilien, bewerbung, automation, deutschland, berlin, münchen, wohnungssuche
**Privacy-Policy-URL:** https://lyrvio.com/datenschutz
**Homepage-URL:** https://lyrvio.com
**Support-URL:** https://lyrvio.com/support
**Source-Code-Link:** https://github.com/Abuarchiv/lyrvio

---

## Summary (250 Zeichen)

```
Lyrvio bewirbt sich 24/7 automatisch auf Wohnungen in deutschen Großstädten. Neues Inserat auf ImmoScout24? Bot liest, generiert Bewerbung, schickt ab. Du bekommst die Einladung zur Besichtigung.
```

*(196 Zeichen — im Limit)*

---

## About (Detaillierte Beschreibung)

```
Bewirbst du dich auf Wohnungen in Berlin, München oder Hamburg?
In deutschen Großstädten sind Besichtigungstermine in unter 30 Minuten ausgebucht. Lyrvio schläft nicht.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WAS LYRVIO MACHT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lyrvio läuft in deinem Firefox-Browser und überwacht rund um die Uhr Wohnungsinserate auf ImmoScout24. Sobald ein neues Inserat deinen Suchkriterien entspricht:

① Bot liest das Inserat automatisch
② Generiert in Sekunden eine personalisierte Bewerbung mit deinem Profil
③ Schickt sie über dein eigenes Account ab — wie ein echter Browser-Click

Du bekommst eine Firefox-Benachrichtigung. Der Vermieter antwortet dir direkt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3 SCHRITTE — EINRICHTUNG IN 5 MINUTEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Profil anlegen: Name, Beruf, Einkommen, Haushalt. Alles bleibt lokal in deiner Extension.
2. Suchkriterien definieren: Stadt, Bezirk, Größe (m²), Maximalmiete.
3. Bot starten: Ein Klick — Lyrvio läuft im Hintergrund.

Pause jederzeit: 30 Min / 1h / 2h oder dauerhaft.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PREISE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Beta-Phase: 30 Tage kostenlos testen.

Nach der Beta:
• 79€/Monat — Bot läuft, bewirbt, alarmiert bei Antworten
• 299€ Erfolgs-Bonus — einmalig, nur wenn du eine Wohnung findest

Monatlich kündbar. Kein Jahresvertrag. Kein Abo-Trap.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATENSCHUTZ — LOKAL BY DESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dein Profil wird ausschließlich lokal in deinem Firefox gespeichert. Es verlässt deinen Browser nicht.

Was auf unsere Server geht:
• Magic-Link-Authentifizierung (E-Mail-Adresse)
• Anonymisiertes Erfolgs-Tracking (Wohnung gefunden ja/nein)

Was NICHT passiert:
• Kein Verkauf von Nutzerdaten
• Kein Speichern von Bewerbungen auf unseren Servern
• Kein Tracking außerhalb von Wohnungsplattformen
• Keine Weitergabe an Dritte

DSGVO-konform. Datenschutzerklärung: lyrvio.com/datenschutz
Quellcode öffentlich: github.com/Abuarchiv/lyrvio

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HÄUFIGE FRAGEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ist das legal?
Ja. Lyrvio agiert im Rahmen deines eigenen Browser-Accounts. Du erteilst beim Onboarding eine digitale Vollmacht. Alle Bewerbungen gehen über dein eigenes Konto — nicht von einem Bot-Account.

Muss Firefox immer offen sein?
Firefox muss als Prozess laufen (minimiert okay). Der Add-on Background-Script läuft auch wenn du in anderen Tabs surfst oder Firefox minimiert hast.

Schickt Lyrvio auf jedes Inserat eine Bewerbung?
Nein. Nur auf Inserate die zu mindestens 60% deinen Kriterien entsprechen. Du siehst jeden Match im Verlauf-Tab.

Sieht der Vermieter dass ein Bot geschrieben hat?
Nein. Lyrvio rotiert 5 verschiedene Schreibstile und integriert echte Details aus deinem Profil und dem Inserat. Die Bewerbungen klingen menschlich.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUPPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Web: lyrvio.com
Hilfe: lyrvio.com/support
E-Mail: support@lyrvio.com
```

---

## Permissions Justification

Für den AMO-Reviewer — jede Permission in `manifest.json` (MV2) erklärt:

### `activeTab`
Lyrvio liest die aktive ImmoScout24-Tab-Seite um Inserat-Details zu extrahieren. Nur aktiv wenn User mit dem Browser-Action-Popup interagiert. Kein Hintergrund-Tracking anderer Seiten.

### `storage`
Speichert User-Profil, Suchkriterien, Bot-Zustand und Bewerbungs-Verlauf in browser.storage.local (lokal, nicht synchronisiert). Keine Cloud-Übertragung von Profil-Daten.

### `alarms`
Setzt einen periodischen 1-Minuten-Wecker für den Scan-Loop. Standard-Mechanismus für Hintergrund-Tasks in Browser-Extensions, besonders wichtig für nicht-persistente Background-Scripts.

### `notifications`
Sendet Desktop-Notifications bei Match-Found und Bewerbungs-Bestätigung. Ausschließlich funktionale Alerts — keine Werbung, kein Push-Marketing.

### `tabs`
Erkennt ImmoScout24-Tabs zur Laufzeit um das Content-Script korrekt zuzuordnen. Tab-Daten werden nicht gespeichert oder protokolliert.

### Host Permission: `https://www.immobilienscout24.de/*`
Kernfunktion. Lyrvio injiziert ein Content-Script um Inserat-Daten zu lesen und Kontaktformulare auszufüllen. Ohne diese Permission ist die Extension nicht funktionsfähig.

### Host Permission: `https://api.lyrvio.de/*`
Authentifizierungs-Endpunkt (Magic-Link-Verify) und Erfolgs-Tracking. Kein Profil-Upload.

### Host Permission: `https://openrouter.ai/*`
LLM-API für Bewerbungstexte (Claude Haiku via OpenRouter). API-Call geht direkt vom Browser des Users mit seinem eigenen API-Key — kein Proxy über Lyrvio-Server.

---

## Lizenz

MIT License — Quellcode: https://github.com/Abuarchiv/lyrvio
