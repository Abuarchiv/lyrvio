# Production Spec: 8min Tutorial-Video

## Technische Specs

| Parameter | Wert |
|-----------|------|
| Format | MP4 (H.264) |
| Auflösung | 1920 × 1080px (16:9) |
| Framerate | 30fps |
| Bitrate | 8–12 Mbps |
| Audio | AAC 192kbps, Stereo |
| Farbprofil | sRGB / Rec.709 |
| Dauer | ~8 Minuten (480–510s) |
| Max. Dateigröße | ~1,2GB (YouTube-Limit: 256GB) |

## Talking-Head-Specs

| Parameter | Wert |
|-----------|------|
| Kamera | iPhone 15 Pro oder Logitech Brio 4K |
| Auflösung | 1080p30 oder 4K30 (dann downskalieren) |
| Mikrofon | Rode Wireless GO II / DJI Mic 2 |
| Beleuchtung | Fenster seitlich oder Ring-Licht |
| Hintergrund | Neutral, leicht unscharf |

## Editing-Software

**Empfehlung: Descript**
- Automatische Transkription auf Deutsch
- Text-basiertes Editing: Buchstabe löschen = Wort rausschneiden
- Filler-Word-Entfernung automatisch
- Export: MP4 1080p

**Alternative: DaVinci Resolve (kostenlos)**
- Klassisches Video-Editing
- Mehr Kontrolle, höhere Lernkurve

## Farbkorrektur

- Color-Grading: Leicht wärmer (+10 Wärme), minimal Kontrast (+5)
- Kein Hollywood-Look — authentisch, dokumentarisch
- LUT: Rec.709-Standard oder keine LUT

## Audio-Mixing

| Track | Lautstärke |
|-------|-----------|
| Talking Head Mikrofon | 0dB (Referenz), normalisiert auf -14 LUFS |
| Screen-Recording-Audio | -∞ (ausschalten) oder -30dB |
| Hintergrundmusik | -25dB (sehr leise) |
| Screen-SFX (Klicks etc.) | -15dB (optional) |

## Untertitel (für YouTube)

- Auto-generiert von YouTube (deutsch) — Qualität prüfen und ggf. manuell korrigieren
- Zusätzlich: Hardcoded-Subtitles für kritische Segmente (Zahlen, URLs)
- Tool: Descript generiert SRT automatisch beim Export

## YouTube-Upload-Specs

| Parameter | Wert |
|-----------|------|
| Dateiname | `lyrvio-wohnung-berlin-bot-tutorial.mp4` |
| Thumbnail | 1280×720 JPEG, <2MB |
| Titel | max. 70 Zeichen |
| Tags | 10–15 Tags (in skript.md) |
| Kategorie | Bildung oder Wissenschaft & Technik |
| Sprache | Deutsch |
| Chapters | Ja — in Beschreibung (in skript.md) |

## Render-Befehl (wenn Remotion-Segmente enthalten)

```bash
# Nur für animierte Segmente (Slides, Grafiken)
npx remotion render src/index.ts TutorialSlides out/slides.mp4 \
  --width=1920 --height=1080 --fps=30

# Dann in DaVinci Resolve oder Descript mit Talking-Head zusammenschneiden
```
