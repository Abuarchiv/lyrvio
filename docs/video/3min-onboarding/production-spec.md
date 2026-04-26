# Production Spec: 3min Onboarding-Video

## Technische Specs

| Parameter | Wert |
|-----------|------|
| Format | MP4 (H.264) |
| Auflösung | 1920 × 1080px (16:9) |
| Framerate | 30fps |
| Bitrate | 6–8 Mbps (kleiner = schneller laden in E-Mail) |
| Audio | AAC 128kbps, Stereo |
| Farbprofil | sRGB |
| Dauer | 180 Sekunden ±5s |
| Ziel-Dateigröße | ~150MB (für schnelles Streaming) |

## Distribution

**Primär: Loom**
- Kostenlos bis 25 Videos (Starter-Plan)
- Direkter Player ohne YouTube-Ablenkungen
- Analytics: Wie weit schauen Beta-Tester?
- E-Mail-Einbettung: PNG-Thumbnail + Hyperlink

**Fallback: YouTube (ungelistet)**
- Falls Loom-Limit erreicht
- Ungelistet: Kein SEO, nur für Link-Zugang

**E-Mail-Template:**
```html
<a href="https://loom.com/share/[LOOM_ID]">
  <img src="https://lyrvio.com/assets/onboarding-thumbnail.png" 
       alt="3-Min Setup-Guide" width="600" />
</a>
```

## Screen-Recording-Tool

**Empfehlung: Screenium 3** (macOS App Store, ~15€)
- Cursor-Highlights eingebaut
- Zoom-in auf wichtige Bereiche
- Export direkt als MP4

**Alternative: OBS Studio** (kostenlos)
- Mehr Einrichtungsaufwand
- Timer-Plugin für Stoppuhr-Demo

## Editing-Tool

**Empfehlung: Descript** (kostenlos bis 1h/Monat)
- Screen-Recording + Voiceover + Annotations zusammenführen
- Text-basiertes Editing für Jump-Cuts
- Step-Counter-Overlays als Templates

**Alternative: iMovie** (kostenlos, macOS)
- Einfacher für reine Screen-Recording-Videos
- Weniger Annotation-Features

## Untertitel

- **Burned-in:** Ja (E-Mail-Player hat keine CC-Kontrolle)
- **Stil:** Weiß, schwarzer Drop-Shadow, Inter Bold 40px
- **Position:** Unteres Viertel
- **Tool:** ElevenLabs Scribe → SRT → Descript burn-in

## Audio-Mixing

| Track | Lautstärke | Notiz |
|-------|-----------|-------|
| Voiceover | -14 LUFS | Referenz |
| Background-Musik | -25dB unter VO | Kaum hörbar |
| Klick-SFX | Optional, -15dB | Kann auch wegelassen werden |

## Barrierefreiheit

- Untertitel immer eingeblendet (Beta-Tester in verschiedenen Umgebungen)
- Cursor-Highlights bei jedem Klick
- Text-Callouts für alle UI-Elemente
