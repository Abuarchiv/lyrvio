# Production Spec: 90s Erklär-Video

## Technische Specs

| Parameter | Wert |
|-----------|------|
| Format | MP4 (H.264) |
| Auflösung | 1920 × 1080px (16:9) |
| Framerate | 30fps |
| Bitrate | 12–16 Mbps |
| Audio | AAC 192kbps, Stereo |
| Farbprofil | sRGB / Rec.709 |
| Dauer | 90 Sekunden ±2s |
| Max. Dateigröße | ~180MB |

## Export-Versionen

1. **Master (1080p):** Primäre Landing-Page-Version
2. **720p Web-Optimiert:** Schnell ladend, für mobile Landing Page
3. **Thumbnail:** Frame bei 0:35 (Logo-Reveal) — 1920×1080 JPEG

## Einbindung auf Landing Page

```html
<!-- Empfehlung: Mux oder Cloudflare Stream -->
<video
  autoplay muted loop playsinline
  poster="/video/erklaer-thumbnail.jpg"
  src="https://stream.mux.com/[PLAYBACK_ID]/high.mp4"
/>
```

Alternativ: Loom für einfaches Hosting (kostenlos, guter Player)

## Subtitles

- Burned-in: Nein (Landing-Page-Video — User hat Kontrolle über Audio)
- SRT-Datei: Ja, separat generieren via ElevenLabs Scribe
- Format: `.srt` neben Video ablegen, Player lädt automatisch

## Voiceover

- **Service:** ElevenLabs API
- **Modell:** `eleven_multilingual_v2`
- **Lautstärke:** -14 LUFS
- **Format:** WAV 44.1kHz für Editing, MP3 192kbps für Export

## Rendering-Tool

**Option A — Remotion (empfohlen):**
```bash
npx remotion render src/index.ts ExplainerVideo out/erklaer-90s.mp4 \
  --width=1920 --height=1080 --fps=30 --codec=h264 \
  --audio-bitrate=192k
```

**Option B — DaVinci Resolve (kostenlos):**
- Projekt: 1920×1080, 30fps, Timeline-Color-Space: Rec.709
- Export: Master → H.264, Restrict to 16Mbps

## Screen-Recording-Specs

- Tool: macOS Screenshot App (`Cmd+Shift+5`) oder OBS
- Auflösung: 1920×1080 (Retina = 2× skalieren auf 3840×2160, dann runterskalieren)
- Framerate: 30fps (60fps nur wenn nötig — höhere Dateigröße)
- Cursor: Cursor ausblenden oder Cursor-Highlight nutzen (Mouseposé o.ä.)

## Farben

| Name | Hex |
|------|-----|
| Indigo Primary | #4F46E5 |
| Indigo Light | #818CF8 |
| Background Dark | #0F172A |
| Text White | #F8FAFC |
| Success Green | #22C55E |
| Danger Red | #EF4444 |
