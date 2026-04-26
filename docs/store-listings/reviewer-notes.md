# Reviewer Notes — Chrome Web Store + Firefox AMO

Dieses Dokument richtet sich an Store-Reviewer und erklärt die Kernfunktion sowie den Datenschutz-Ansatz von Lyrvio.

---

## 1. Was tut die Extension — Kurzbeschreibung für Reviewer

Lyrvio ist ein Browser-Automatisierungs-Tool für die Wohnungssuche in deutschen Großstädten. Die Extension:

1. **Überwacht** Wohnungsinserate auf ImmoScout24 (und perspektivisch weitere Plattformen) in periodischen Intervallen (1 Minute via chrome.alarms / browser.alarms)
2. **Matcht** neue Inserate gegen vom Nutzer definierte Suchkriterien (Stadt, Bezirk, Größe, Miete)
3. **Generiert** personalisierte Bewerbungstexte via Claude Haiku LLM (OpenRouter API, direkt vom Browser aus — kein Server-Proxy)
4. **Sendet** Bewerbungen über das Kontaktformular von ImmoScout24 im Namen des eingeloggten Nutzers — wie ein manueller Klick des Nutzers

Die Extension agiert **ausschließlich im Browser des Nutzers**, nicht serverseitig. Alle Aktionen sind funktional äquivalent zu manuellen Nutzer-Aktionen.

---

## 2. Warum greift die Extension auf ImmoScout24 zu?

### Kernfunktion — kein optionales Feature

`https://www.immobilienscout24.de/*` ist die primäre Host-Permission und der alleinige Zweck der Extension:

- **Content-Script auf Suchergebnis-Seiten:** Liest Inserat-IDs, Titel, Ort, Preis, Größe aus dem DOM um neue Listings zu erkennen
- **Content-Script auf Detail-Seiten:** Liest vollständige Inserat-Details (Vermieter-Text, Anforderungen) für die LLM-Bewerbungs-Generierung
- **Content-Script auf Kontakt-Seiten:** Füllt das Kontaktformular mit dem generierten Bewerbungstext und sendet es ab

**Kein Server-seitiges Scraping.** Alle Aktionen laufen im Browser-Tab des eingeloggten Nutzers. ImmoScout24 sieht die Requests als normale Nutzer-Interaktion — weil es eine ist.

### Warum kein offizieller API-Zugang?

ImmoScout24 bietet keine öffentliche API für Bewerbungen. Die einzige Möglichkeit Bewerbungen im Namen des Nutzers abzuschicken ist über den Browser des eingeloggten Nutzers — was Lyrvio tut.

---

## 3. Warum greift die Extension auf Immowelt/weitere Plattformen zu? (Geplant)

Zukünftige Versionen werden Immowelt, Immonet, eBay Kleinanzeigen und Wunderflats unterstützen. Host-Permissions werden bei Bedarf mit begründetem Update-Antrag ergänzt. Aktuelle Version v0.1.0 greift **ausschließlich auf immobilienscout24.de zu**.

---

## 4. Test-Account-Zugang für Reviewer

Für eine vollständige Extension-Review stellen wir einen Test-Account bereit:

**Plattform:** ImmoScout24
**Test-E-Mail:** lyrvio-reviewer@proton.me
**Hinweis:** Account ist mit Dummy-Profil eingerichtet (kein echter Wohnungssuchender). Bewerbungen die während der Review gesendet werden gehen an Dummy-Inserate (wir halten eine Liste inaktiver Inserate für Test-Zwecke bereit).

**Lyrvio Test-Account:**
- **URL:** lyrvio.com
- **Login:** lyrvio-reviewer@proton.me (Magic Link an review@lyrvio.com weitergeleitet)
- Bei Bedarf direkt kontaktieren: support@lyrvio.com

**Test-Profil-Daten (bereits in Options-Seite vorausgefüllt):**
```
Name: Max Reviewer
Beruf: Qualitätsprüfer
Einkommen: 3.000€/netto
Haushaltsgröße: 1 Person
Haustiere: Nein
Raucher: Nein
Freitext: Test-Account für Store-Review
```

**Test-Suchkriterien (minimal konfiguriert um kein Spam zu erzeugen):**
```
Stadt: Berlin
Bezirk: Mitte (sehr eng gefasst)
Größe: 200–300m² (unrealistisch groß — kein Match mit echten Inseraten)
Warmmiete: max 100€ (unter Marktniveau — kein Match mit echten Inseraten)
```
Die Suchkriterien sind bewusst so gesetzt dass keine echten Bewerbungen abgeschickt werden können.

---

## 5. Datenschutz-Compliance-Statement

### Datenflüsse

| Daten | Speicherort | Übertragung |
|-------|-------------|-------------|
| Nutzerprofil (Name, Beruf, Einkommen, Kontakt) | Lokal: browser.storage.local | Nie — bleibt im Browser |
| Suchkriterien | Lokal: browser.storage.local | Nie — bleibt im Browser |
| Bewerbungs-Verlauf | Lokal: IndexedDB | Nie — bleibt im Browser |
| Scan-Logs | Lokal: IndexedDB (50 Einträge, FIFO) | Nie |
| Auth-Token (nach Magic-Link-Login) | Lokal: chrome.storage.local | Nur bei API-Requests an api.lyrvio.de |
| E-Mail-Adresse | Übertragung an api.lyrvio.de | Nur für Auth — nicht weiterverkauft |
| Erfolgs-Event (Wohnung gefunden) | Übertragung an api.lyrvio.de | Anonymisiert — kein Profil-Bezug |

### DSGVO-Konformität

- **Zweckbindung:** Daten werden ausschließlich für den erklärten Zweck (Wohnungsbewerbung) genutzt
- **Datensparsamkeit:** Nur technisch notwendige Daten werden übertragen
- **Lokale Verarbeitung:** Kernfunktion (Profil, Matching, LLM-Call) läuft vollständig lokal
- **Recht auf Löschung:** Nutzer kann alle Daten durch Extension-Deinstallation oder „Alle Daten löschen"-Button in Options löschen
- **Transparenz:** Datenschutzerklärung unter lyrvio.com/datenschutz, Open-Source-Code auf GitHub

### Keine Remote-Code-Execution

Die Extension lädt keinen Code dynamisch nach. Alle Scripts sind im Extension-Bundle enthalten. Content-Security-Policy: `script-src 'self'; object-src 'self'`.

---

## 6. Bot-Architektur — Klarstellung für Reviewer

**Häufiges Reviewer-Missverständnis:** „Bot auf einer Plattform = Scraping = AGB-Verstoß"

**Lyrvios Ansatz ist anders:**

1. Der Nutzer ist auf ImmoScout24 eingeloggt mit seinem eigenen Account
2. Lyrvio agiert als "verlängerter Arm" des Nutzers — wie ein persönlicher Assistent der auf dem Laptop des Nutzers sitzt
3. Alle HTTP-Requests gehen vom Browser des Nutzers aus — mit seinen Cookies, seiner Session, seiner IP
4. ImmoScout24 sieht normale, authentifizierte Nutzer-Aktionen
5. Der Nutzer erteilt beim Lyrvio-Onboarding eine explizite Vollmacht zur Bewerbung in seinem Namen

Vergleichbar mit: Passwort-Manager (füllt Formulare aus), Browser-Übersetzer (liest Seiten-Inhalte), Produktivitäts-Extensions wie Grammarly (liest + bearbeitet Text-Felder).

---

## 7. Warum `tabs`-Permission?

Die `tabs`-Permission wird ausschließlich genutzt um zu erkennen ob der aktive Tab eine ImmoScout24-URL hat — um das Content-Script korrekt zu triggern. Tab-URLs werden nicht gespeichert, nicht protokolliert, nicht übertragen.

---

## 8. Kontakt für Rückfragen

**Developer:** Abu (Lyrvio)
**E-Mail:** support@lyrvio.com
**Response-Zeit:** 24h
