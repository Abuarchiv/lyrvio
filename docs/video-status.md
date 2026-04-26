# Lyrvio Video-Production-Status

**Stand:** 2026-04-25
**Lieferumfang:** 4 Videos komplett dokumentiert — Storyboards, Skripte, Asset-Listen, Specs

---

## Was geliefert wurde

### 30s Hook-Video (`docs/video/30s-hook/`)
- `storyboard.md` — 6 Szenen, Frame-genaue Beschreibung, Musik-Cues, Cut-Points
- `skript.md` — TTS-fertiges Voiceover mit Zeitmarken und ElevenLabs-Hinweisen
- `assets-needed.md` — vollständige Asset-Checkliste
- `production-spec.md` — techn. Specs inkl. Platform-Varianten (TikTok/Reels/Shorts)
- `Remotion.tsx` — funktionale React-Komponente, rendert 30s @ 1080×1920, 6 Szenen voll implementiert

### 90s Erklär-Video (`docs/video/90s-erklaer/`)
- `storyboard.md` — 3-Akt-Struktur (Problem/Lösung/Resultat), 11 Szenen, Screen-Recording-Marker
- `skript.md` — Wort-genaues Voiceover mit Zeitmarken, TTS-Produktionshinweisen
- `assets-needed.md` — Stock-Footage, Screen-Recordings, Animationen, Musik
- `production-spec.md` — 1080p16:9, Mux/Cloudflare-Einbettungsempfehlung

### 8min Tutorial-Video (`docs/video/8min-tutorial/`)
- `storyboard.md` — 4 Teile (Markt/Technik/Demo/Ergebnisse), YouTube-Chapter-Marker, SEO-Tags
- `skript.md` — Talking-Points-Format (kein Teleprompter), YouTube-Beschreibung + Tags fertig
- `assets-needed.md` — Kamera-Setup, Screen-Recording-Tools, Descript-Workflow
- `production-spec.md` — Talking-Head-Specs, Descript-Editing-Empfehlung

### 3min Onboarding-Video (`docs/video/3min-onboarding/`)
- `storyboard.md` — 4 Schritte (Install/Profil/Filter/Start), E-Mail-Einbettungshinweise
- `skript.md` — vollständiges TTS-Skript oder Founder-Aufnahme, warm/persönlich
- `assets-needed.md` — Screenium 3 als Screen-Recording-Tool, Loom-Hosting
- `production-spec.md` — E-Mail-Distribution, Loom/YouTube-ungelistet, Barrierefreiheit

---

## Wie produzieren — Reihenfolge

### Phase 1: Sofort (Beta läuft)
**→ 3min Onboarding-Video zuerst** — höchster Nutzen, schnellste Produktion

1. Screen-Recordings aufnehmen (Screenium 3 oder OBS): 1–2h
2. Voiceover: ElevenLabs (15 min) oder selbst aufnehmen (30 min)
3. Zusammenschnitt: Descript (1–2h)
4. Auf Loom hochladen, Link in Welcome-E-Mail eintragen
**Zeitaufwand gesamt: ~4–5h**

### Phase 2: Diese Woche
**→ 30s Hook-Video** — Remotion-Komponente ist fertig, nur Assets sammeln

1. Voiceover via ElevenLabs generieren: 10 min
2. Musik von Pixabay herunterladen: 15 min
3. Remotion rendern: `npx remotion render docs/video/30s-hook/Remotion.tsx HookVideo out/hook-30s.mp4`
4. Auf TikTok/Reels/Shorts posten
**Zeitaufwand gesamt: ~3h**

### Phase 3: Nächste Woche
**→ 90s Erklär-Video** — für Landing-Page

1. Screen-Recordings aufnehmen: 1h
2. Animationen in Remotion oder Keynote erstellen: 2–3h
3. Voiceover ElevenLabs: 15 min
4. Zusammenschnitt DaVinci Resolve oder Remotion: 2–3h
**Zeitaufwand gesamt: ~6–8h**

### Phase 4: Wenn erste User-Ergebnisse da
**→ 8min Tutorial-Video** — braucht echte Zahlen für Glaubwürdigkeit

1. Talking-Head aufnehmen (iPhone, kein Setup): 1–2h
2. Screen-Recordings: 1h
3. Descript-Schnitt: 2–3h
4. YouTube-Upload mit SEO-optimierter Beschreibung
**Zeitaufwand gesamt: ~6–8h**

---

## Geschätzte Kosten

### ElevenLabs (Voiceover)

| Video | Zeichen (ca.) | Kosten bei Creator-Plan (22€/Mo) |
|-------|--------------|----------------------------------|
| 30s Hook | ~280 Zeichen | < 0,01€ |
| 90s Erklär | ~750 Zeichen | < 0,05€ |
| 3min Onboarding | ~650 Zeichen | < 0,05€ |
| **Gesamt** | **~1.680 Zeichen** | **Kostenfrei im Free-Tier (10.000 Zeichen/Mo)** |

ElevenLabs Scribe (Untertitel-Generierung): 0,006€/Minute → alle 4 Videos ~0,10€ gesamt

**Empfehlung: Free-Tier reicht für alle 4 Videos.**

### Remotion

| Option | Kosten |
|--------|--------|
| Lokal rendern (kostenlos) | 0€ — läuft auf MacBook |
| Remotion Lambda (AWS) | ~0,05–0,10€ pro Render |

**Empfehlung: Lokal rendern via CLI — kein Hosting nötig.**

### Musik

| Quelle | Kosten |
|--------|--------|
| Pixabay (CC0) | 0€ |
| Suno Pro (für custom generierte Tracks) | 8€/Mo |
| Freemusicarchive.org | 0€ |

**Empfehlung: Pixabay für ersten Draft. Suno wenn eigener Sound-Identity gewünscht.**

### Screen-Recording-Tool

| Option | Kosten |
|--------|--------|
| macOS Screenshot App (eingebaut) | 0€ |
| Screenium 3 (App Store) | 14,99€ einmalig — empfohlen für Cursor-Highlights |
| OBS Studio | 0€ |

### Video-Editing

| Option | Kosten |
|--------|--------|
| Descript (Starter) | 0€/Mo (1h Transkription) |
| DaVinci Resolve (Free) | 0€ |
| iMovie (macOS eingebaut) | 0€ |

### Hosting & Distribution

| Kanal | Kosten |
|-------|--------|
| YouTube | 0€ |
| Loom (Starter) | 0€ (25 Videos, 5min/Video) |
| Loom Business (3min Onboarding braucht 5min) | 12,50€/Mo |
| TikTok / Instagram / Shorts | 0€ |

---

## Gesamtkosten (realistische Einschätzung)

| Posten | Einmalig | Monatlich |
|--------|---------|-----------|
| ElevenLabs (Free) | 0€ | 0€ |
| Remotion (lokal) | 0€ | 0€ |
| Screenium 3 | 14,99€ | — |
| Musik (Pixabay) | 0€ | 0€ |
| Loom Business (optional) | — | 12,50€ |
| **Gesamt minimal** | **14,99€** | **0€** |
| **Gesamt komfortabel** | **14,99€** | **12,50€** |

---

## Remotion-Komponente: Verwendung

Die fertige Remotion-Komponente liegt unter `docs/video/30s-hook/Remotion.tsx`.

### Setup

```bash
# Im Lyrvio-Root oder separatem Video-Verzeichnis
npm init -y
npm install remotion @remotion/player react react-dom
```

### Rendern

```bash
# 30s Hook Video rendern (1080×1920, 9:16)
npx remotion render docs/video/30s-hook/Remotion.tsx HookVideo out/hook-30s.mp4 \
  --width=1080 --height=1920 --fps=30 --codec=h264
```

### Anpassen

Die Komponente ist modular aufgebaut:
- `ScenePain` — Szene 1 (0–3s): Hook
- `SceneStack` — Szene 2 (3–8s): 600-Counter
- `SceneProblem` — Szene 3 (8–14s): Split-Screen
- `SceneLyrvioIntro` — Szene 4 (14–20s): Logo-Reveal
- `SceneDemo` — Szene 5 (20–26s): Extension-Demo
- `SceneCTA` — Szene 6 (26–30s): Call-to-Action

Voiceover und Musik: Kommentierte `<Audio>`-Tags in `HookVideo()` einkommentieren und Pfade zu ElevenLabs-Output setzen.

---

## Nächster Schritt (empfohlen)

1. ElevenLabs-Account öffnen, `skript.md` von 30s-Hook reinkopieren, Audio generieren
2. `npx remotion render` ausführen
3. Ergebnis prüfen — erste Version sollte in unter 2 Stunden fertig sein
