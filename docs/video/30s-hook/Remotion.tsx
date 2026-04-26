import {
  AbsoluteFill,
  Audio,
  Composition,
  Easing,
  Img,
  interpolate,
  registerRoot,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import React from "react";

// ─── Brand Colors ────────────────────────────────────────────────────────────
const INDIGO = "#4F46E5";
const INDIGO_LIGHT = "#818CF8";
const WHITE = "#F8FAFC";
const DARK = "#0F172A";
const RED = "#EF4444";
const GREEN = "#22C55E";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Fade-in opacity: 0 → 1 over `durationFrames` frames starting at frame 0 */
function useFadeIn(durationFrames = 10): number {
  const frame = useCurrentFrame();
  return interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** Spring-based scale: snaps to 1 from `initial` */
function useSpringScale(initial = 0.8, damping = 12): number {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame, fps, config: { damping, stiffness: 120 }, from: initial, to: 1 });
}

// ─── Scene 1: Pain Hook (0:00 – 0:03 = frames 0–90) ─────────────────────────

function ScenePain() {
  const frame = useCurrentFrame();
  const opacity = useFadeIn(8);

  // Timestamp blinks on/off (2fps)
  const pingOpacity = Math.sin(frame * 0.3) > 0 ? 1 : 0.3;

  return (
    <AbsoluteFill style={{ backgroundColor: DARK, justifyContent: "center", alignItems: "center" }}>
      {/* Inserat Card */}
      <div
        style={{
          opacity,
          width: 700,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          padding: 32,
          border: `1px solid #334155`,
        }}
      >
        {/* Fake listing image placeholder */}
        <div
          style={{
            width: "100%",
            height: 200,
            backgroundColor: "#334155",
            borderRadius: 8,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748B",
            fontSize: 14,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Wohnungsfoto
        </div>

        <div style={{ fontFamily: "Inter, sans-serif", color: WHITE }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
            2-Zi-Whg · 58m² · Mitte · 1.150 €/Mo
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#94A3B8",
              opacity: pingOpacity,
              marginBottom: 16,
            }}
          >
            ● Vor 4 Minuten online gegangen
          </div>
          <div style={{ fontSize: 14, color: "#94A3B8" }}>ImmobilienScout24</div>
        </div>
      </div>

      {/* Voiceover subtitle */}
      <Subtitle
        frame={frame}
        startFrame={15}
        text="Du bewirbst dich auf eine Wohnung in Berlin."
      />
    </AbsoluteFill>
  );
}

// ─── Scene 2: 600 Stack (frames 90–240) ──────────────────────────────────────

function SceneStack() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Counter: 0 → 600 over first 120 frames of this scene
  const count = Math.round(
    interpolate(frame, [0, 120], [0, 600], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    })
  );

  // Stack grows
  const numEnvelopes = Math.floor(interpolate(frame, [0, 100], [0, 18], { extrapolateRight: "clamp" }));
  const redOpacity = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: DARK, justifyContent: "center", alignItems: "center" }}>
      {/* Envelope stack */}
      <div style={{ position: "relative", width: 200, height: 300, marginBottom: 40 }}>
        {Array.from({ length: numEnvelopes }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: i * 14,
              left: i * 0.5,
              width: 180,
              height: 120,
              backgroundColor: i === numEnvelopes - 1 ? INDIGO : "#334155",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              transition: "all 0.1s",
            }}
          >
            {/* Envelope flap */}
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
              <rect width="60" height="40" rx="4" fill="none" />
              <path d="M0 0 L30 20 L60 0" stroke={i === numEnvelopes - 1 ? WHITE : "#64748B"} strokeWidth="2" fill="none" />
            </svg>
          </div>
        ))}
      </div>

      {/* Counter */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 96,
          fontWeight: 900,
          color: WHITE,
          lineHeight: 1,
          letterSpacing: -4,
        }}
      >
        {count.toLocaleString("de-DE")}
      </div>

      {/* „600 andere auch" label */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 32,
          fontWeight: 700,
          color: RED,
          opacity: redOpacity,
          marginTop: 16,
        }}
      >
        andere auch.
      </div>

      <Subtitle
        frame={frame}
        startFrame={20}
        text="600 andere bewerben sich gerade auf dasselbe Inserat."
      />
    </AbsoluteFill>
  );
}

// ─── Scene 3: Problem Split (frames 240–420) ─────────────────────────────────

function SceneProblem() {
  const frame = useCurrentFrame();
  const opacity = useFadeIn(15);

  // Typing animation: 0 → full text length over 100 frames
  const demoText = "Sehr geehrte Damen und Herren, ich bewerbe mich hiermit auf Ihre Wohnung...";
  const visibleChars = Math.floor(
    interpolate(frame, [0, 100], [0, demoText.length], { extrapolateRight: "clamp" })
  );

  // Red X appears at frame 140
  const xOpacity = interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: DARK, opacity, flexDirection: "row" }}>
      {/* Left: typing */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
          borderRight: `1px solid #1E293B`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: "#94A3B8",
            marginBottom: 12,
          }}
        >
          Manuelle Bewerbung
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "#1E293B",
            borderRadius: 8,
            padding: 20,
            fontFamily: "monospace",
            fontSize: 13,
            color: WHITE,
            lineHeight: 1.7,
            minHeight: 200,
          }}
        >
          {demoText.slice(0, visibleChars)}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "1em",
              backgroundColor: INDIGO,
              marginLeft: 2,
              animation: "blink 1s step-start infinite",
            }}
          />
        </div>
      </div>

      {/* Right: Wohnung vergeben */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 24,
            fontWeight: 700,
            color: RED,
            opacity: xOpacity,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Objekt nicht<br />mehr verfügbar
        </div>
        <div
          style={{
            fontSize: 80,
            opacity: xOpacity,
            marginTop: 20,
          }}
        >
          ✗
        </div>
      </div>

      <Subtitle
        frame={frame}
        startFrame={30}
        text="Bis du fertig bist — ist sie weg."
        color={RED}
      />
    </AbsoluteFill>
  );
}

// ─── Scene 4: Lyrvio Intro (frames 420–600) ──────────────────────────────────

function SceneLyrvioIntro() {
  const frame = useCurrentFrame();
  const scale = useSpringScale(0.5, 14);
  const textOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${DARK} 0%, #1E1B4B 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Lyra constellation (simplified as star cluster) */}
      <div style={{ transform: `scale(${scale})`, marginBottom: 24 }}>
        <LyraIcon size={120} />
      </div>

      {/* Wordmark */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 64,
          fontWeight: 900,
          color: WHITE,
          letterSpacing: -2,
          opacity: textOpacity,
        }}
      >
        lyrvio
      </div>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 18,
          color: INDIGO_LIGHT,
          opacity: textOpacity,
          marginTop: 8,
        }}
      >
        Dein 24/7 Wohnungs-Bot für DACH
      </div>

      <Subtitle
        frame={frame}
        startFrame={25}
        text="Lyrvio bewirbt sich automatisch — schneller als jeder Mensch."
      />
    </AbsoluteFill>
  );
}

// ─── Scene 5: Demo (frames 600–780) ──────────────────────────────────────────

function SceneDemo() {
  const frame = useCurrentFrame();
  const opacity = useFadeIn(10);

  // Progress bar
  const progress = interpolate(frame, [10, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Checkmarks appear one by one
  const check1 = interpolate(frame, [90, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const check2 = interpolate(frame, [110, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const check3 = interpolate(frame, [130, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const portals = [
    { name: "ImmobilienScout24", opacity: check1 },
    { name: "ImmoWelt", opacity: check2 },
    { name: "eBay Kleinanzeigen", opacity: check3 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: DARK,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      {/* Phone mockup */}
      <div
        style={{
          width: 340,
          backgroundColor: "#1E293B",
          borderRadius: 24,
          padding: 28,
          border: `1px solid #334155`,
          boxShadow: `0 0 60px rgba(79,70,229,0.3)`,
        }}
      >
        {/* Extension header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
            gap: 12,
          }}
        >
          <LyraIcon size={28} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: WHITE,
            }}
          >
            Lyrvio
          </span>
          <div
            style={{
              marginLeft: "auto",
              width: 8,
              height: 8,
              backgroundColor: GREEN,
              borderRadius: "50%",
              boxShadow: `0 0 6px ${GREEN}`,
            }}
          />
        </div>

        {/* Progress bar */}
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            color: "#64748B",
            marginBottom: 8,
          }}
        >
          Bewerbung wird gesendet...
        </div>
        <div
          style={{
            width: "100%",
            height: 6,
            backgroundColor: "#334155",
            borderRadius: 3,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              backgroundColor: INDIGO,
              borderRadius: 3,
            }}
          />
        </div>

        {/* Timestamp */}
        {progress >= 1 && (
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: GREEN,
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            Gesendet — 14 Sekunden nach Veröffentlichung
          </div>
        )}

        {/* Portal checklist */}
        {portals.map((p) => (
          <div
            key={p.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
              opacity: p.opacity,
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: WHITE,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: GREEN,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            {p.name}
          </div>
        ))}
      </div>

      <Subtitle
        frame={frame}
        startFrame={15}
        text="Erste Bewerbung in 14 Sek."
      />
    </AbsoluteFill>
  );
}

// ─── Scene 6: CTA (frames 780–900) ───────────────────────────────────────────

function SceneCTA() {
  const frame = useCurrentFrame();
  const opacity = useFadeIn(15);
  const scale = useSpringScale(0.9, 16);

  const priceOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #1E1B4B 0%, ${DARK} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <LyraIcon size={80} />

        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 72,
            fontWeight: 900,
            color: WHITE,
            letterSpacing: -3,
          }}
        >
          lyrvio.com
        </div>

        <div
          style={{
            opacity: priceOpacity,
            textAlign: "center",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <div style={{ fontSize: 20, color: INDIGO_LIGHT, fontWeight: 600 }}>
            79€ / Monat
          </div>
          <div style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>
            + 299€ Erfolgsbonus · nur wenn du einziehst
          </div>
        </div>

        <div
          style={{
            backgroundColor: INDIGO,
            borderRadius: 50,
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 14,
            paddingBottom: 14,
            fontFamily: "Inter, sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: WHITE,
            opacity: priceOpacity,
          }}
        >
          Kostenlos testen →
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Subtitle Component ───────────────────────────────────────────────────────

interface SubtitleProps {
  frame: number;
  startFrame: number;
  text: string;
  color?: string;
}

function Subtitle({ frame, startFrame, text, color = WHITE }: SubtitleProps) {
  const opacity = interpolate(frame, [startFrame, startFrame + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 60,
        right: 60,
        textAlign: "center",
        fontFamily: "Inter, sans-serif",
        fontSize: 32,
        fontWeight: 700,
        color,
        opacity,
        textShadow: "0 2px 8px rgba(0,0,0,0.8)",
        lineHeight: 1.3,
      }}
    >
      {text}
    </div>
  );
}

// ─── Lyra Icon (simplified constellation) ────────────────────────────────────

function LyraIcon({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lyra constellation — simplified star pattern */}
      {/* Vega (brightest star) */}
      <circle cx="40" cy="16" r="5" fill={INDIGO} />
      {/* Secondary stars */}
      <circle cx="24" cy="40" r="3.5" fill={INDIGO_LIGHT} />
      <circle cx="56" cy="40" r="3.5" fill={INDIGO_LIGHT} />
      <circle cx="30" cy="62" r="3" fill={INDIGO_LIGHT} />
      <circle cx="50" cy="62" r="3" fill={INDIGO_LIGHT} />
      {/* Connecting lines */}
      <line x1="40" y1="16" x2="24" y2="40" stroke={INDIGO} strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="40" y1="16" x2="56" y2="40" stroke={INDIGO} strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="24" y1="40" x2="30" y2="62" stroke={INDIGO} strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="56" y1="40" x2="50" y2="62" stroke={INDIGO} strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="24" y1="40" x2="56" y2="40" stroke={INDIGO} strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="30" y1="62" x2="50" y2="62" stroke={INDIGO} strokeWidth="1.2" strokeOpacity="0.4" />
    </svg>
  );
}

// ─── Main Composition ─────────────────────────────────────────────────────────

/**
 * Lyrvio 30s Hook Video
 *
 * Total: 900 frames @ 30fps = 30 seconds
 *
 * Frame layout:
 *   0  –  90: Scene 1 — Pain Hook (3s)
 *  90  – 240: Scene 2 — 600 Stack (5s)
 * 240  – 420: Scene 3 — Problem (6s)
 * 420  – 600: Scene 4 — Lyrvio Intro (6s)
 * 600  – 780: Scene 5 — Demo (6s)
 * 780  – 900: Scene 6 — CTA (4s)
 */
export function HookVideo() {
  return (
    <AbsoluteFill style={{ backgroundColor: DARK }}>
      <Sequence from={0} durationInFrames={90}>
        <ScenePain />
      </Sequence>

      <Sequence from={90} durationInFrames={150}>
        <SceneStack />
      </Sequence>

      <Sequence from={240} durationInFrames={180}>
        <SceneProblem />
      </Sequence>

      <Sequence from={420} durationInFrames={180}>
        <SceneLyrvioIntro />
      </Sequence>

      <Sequence from={600} durationInFrames={180}>
        <SceneDemo />
      </Sequence>

      <Sequence from={780} durationInFrames={120}>
        <SceneCTA />
      </Sequence>

      {/* Voiceover audio — replace staticFile path with actual ElevenLabs output */}
      {/* <Audio src={staticFile("voiceover-hook-30s.mp3")} /> */}

      {/* Background music — replace with actual track */}
      {/* <Audio src={staticFile("music-hook.mp3")} volume={0.12} /> */}
    </AbsoluteFill>
  );
}

// ─── Root Registration ────────────────────────────────────────────────────────

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HookVideo"
        component={HookVideo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};

registerRoot(RemotionRoot);

// ─── Render Command (run in terminal) ────────────────────────────────────────
// npx remotion render docs/video/30s-hook/Remotion.tsx HookVideo out/hook-30s.mp4
