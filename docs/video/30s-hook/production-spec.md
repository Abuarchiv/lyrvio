# Production Spec: 30s Hook-Video

## Technische Specs

| Parameter | Wert |
|-----------|------|
| Format | MP4 (H.264) |
| Auflösung | 1080 × 1920px (9:16) |
| Framerate | 30fps |
| Bitrate | 8–12 Mbps (Ziel: <50MB Dateigröße) |
| Audio | AAC 192kbps, Stereo |
| Farbprofil | sRGB |
| Dauer | 30 Sekunden exakt |

## Platform-Varianten

| Plattform | Max-Dateigröße | Max-Länge | Hinweis |
|-----------|---------------|-----------|---------|
| TikTok | 287MB | 10min | 30s ideal für Algorithmus |
| Instagram Reels | 1GB | 90s | Cover-Frame manuell setzen |
| YouTube Shorts | Keine | 60s | Thumbnail separat exportieren |

## Export-Versionen

1. **Master:** 1080×1920, H.264, 12Mbps, mit Audio
2. **No-Audio-Version:** Für Tests ohne Ton
3. **Thumbnail:** Frame bei 0:15 exportieren (1080×1920 JPEG)
4. **Square-Crop:** 1080×1080 Version für Instagram-Feed (optional)

## Subtitles

- **Stil:** Weiße Schrift, schwarzer Drop-Shadow (2px), Inter Bold 48px
- **Position:** Unteres Drittel (Y: 80% von oben)
- **Format:** Burned-in-Captions (kein separates SRT für Social)
- **Sprache:** Deutsch
- **Tool:** ElevenLabs Scribe → SRT → Remotion `<Subtitle>` Komponente

## Voiceover

- **Service:** ElevenLabs API (`eleven_multilingual_v2`)
- **Stimme:** Eigene Clone-Stimme oder „Adam"
- **Ausgabe:** MP3 192kbps, dann in Premiere/Remotion einbinden
- **Lautstärke-Normalisierung:** -14 LUFS (YouTube-Standard)
- **Musik-Ducking:** Musik auf -20dB wenn Voiceover spricht, -12dB sonst

## Rendering

- **Tool:** Remotion (bevorzugt) oder DaVinci Resolve (kostenlos)
- **Remotion-Render-Befehl:**
  ```bash
  npx remotion render src/index.ts HookVideo out/hook-30s.mp4 \
    --width=1080 --height=1920 --fps=30 --codec=h264
  ```

## Farben

| Name | Hex | Verwendung |
|------|-----|------------|
| Indigo Primary | #4F46E5 | Logo, Akzente, CTA |
| Indigo Light | #818CF8 | Sekundär |
| Weiß | #FFFFFF | Text auf dunklem Hintergrund |
| Rot | #EF4444 | „600 andere" — Danger-Signal |
| Dunkelgrau | #111827 | Hintergründe |
