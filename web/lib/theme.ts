/**
 * Lyrvio Design System — Theme
 * Compatible with Tailwind v4 CSS custom properties + shadcn/ui
 */

export const colors = {
  primary: {
    DEFAULT: "#4F46E5",
    foreground: "#FFFFFF",
    hover: "#4338CA",
    subtle: "#EEF2FF",
  },
  secondary: {
    DEFAULT: "#F59E0B",
    foreground: "#0F172A",
    hover: "#D97706",
    subtle: "#FFFBEB",
  },
  background: {
    dark: "#0F0F23",
    light: "#FAFAFA",
  },
  foreground: {
    dark: "#FFFFFF",
    light: "#0F172A",
  },
  muted: {
    DEFAULT: "#64748B",
    foreground: "#94A3B8",
    background: "#F1F5F9",
  },
  border: {
    DEFAULT: "#E2E8F0",
    dark: "#1E1E3A",
  },
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#6366F1",
  // Constellation accents
  star: {
    vega: "#F59E0B",    // Alpha Lyrae — Vega: warm amber
    minor: "#A5B4FC",   // Minor stars: cool periwinkle
    base: "#6366F1",    // Base star: indigo
  },
} as const;

export const typography = {
  fontFamily: {
    ui: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    heading: "'Space Grotesk', 'Inter', 'Helvetica Neue', Arial, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  fontSize: {
    xs:   ["0.75rem",  { lineHeight: "1rem" }],
    sm:   ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem",     { lineHeight: "1.5rem" }],
    lg:   ["1.125rem", { lineHeight: "1.75rem" }],
    xl:   ["1.25rem",  { lineHeight: "1.75rem" }],
    "2xl":["1.5rem",   { lineHeight: "2rem" }],
    "3xl":["1.875rem", { lineHeight: "2.25rem" }],
    "4xl":["2.25rem",  { lineHeight: "2.5rem" }],
    "5xl":["3rem",     { lineHeight: "1" }],
  },
} as const;

export const radii = {
  sm:   "0.25rem",   // 4px
  md:   "0.5rem",    // 8px
  lg:   "0.75rem",   // 12px
  xl:   "1rem",      // 16px
  "2xl":"1.5rem",    // 24px
  full: "9999px",
} as const;

export const shadows = {
  sm:  "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md:  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg:  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl:  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  // Brand glow
  indigo: "0 0 20px rgb(79 70 229 / 0.3)",
  amber:  "0 0 20px rgb(245 158 11 / 0.3)",
  none: "none",
} as const;

export const spacing = {
  px:  "1px",
  0:   "0",
  0.5: "0.125rem",
  1:   "0.25rem",
  2:   "0.5rem",
  3:   "0.75rem",
  4:   "1rem",
  5:   "1.25rem",
  6:   "1.5rem",
  8:   "2rem",
  10:  "2.5rem",
  12:  "3rem",
  16:  "4rem",
  20:  "5rem",
  24:  "6rem",
  32:  "8rem",
} as const;

export const animation = {
  duration: {
    fast:   "100ms",
    normal: "200ms",
    slow:   "300ms",
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in:      "cubic-bezier(0.4, 0, 1, 1)",
    out:     "cubic-bezier(0, 0, 0.2, 1)",
    inOut:   "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

/**
 * CSS custom properties — inject into :root for Tailwind v4 + shadcn
 * Usage: paste into globals.css or call injectCssVars()
 */
export const cssVars = {
  light: {
    "--background":        colors.background.light,
    "--foreground":        colors.foreground.light,
    "--primary":           colors.primary.DEFAULT,
    "--primary-foreground":colors.primary.foreground,
    "--secondary":         colors.secondary.DEFAULT,
    "--secondary-foreground": colors.secondary.foreground,
    "--muted":             colors.muted.background,
    "--muted-foreground":  colors.muted.DEFAULT,
    "--border":            colors.border.DEFAULT,
    "--input":             colors.border.DEFAULT,
    "--ring":              colors.primary.DEFAULT,
    "--radius":            radii.md,
    "--success":           colors.success,
    "--error":             colors.error,
  },
  dark: {
    "--background":        colors.background.dark,
    "--foreground":        colors.foreground.dark,
    "--primary":           colors.primary.DEFAULT,
    "--primary-foreground":colors.primary.foreground,
    "--secondary":         colors.secondary.DEFAULT,
    "--secondary-foreground": colors.secondary.foreground,
    "--muted":             colors.border.dark,
    "--muted-foreground":  colors.muted.DEFAULT,
    "--border":            colors.border.dark,
    "--input":             colors.border.dark,
    "--ring":              colors.primary.DEFAULT,
    "--radius":            radii.md,
    "--success":           colors.success,
    "--error":             colors.error,
  },
} as const;

/** Tailwind v4 theme extension config (paste into tailwind.config.ts) */
export const tailwindExtension = {
  colors: {
    primary:   colors.primary,
    secondary: colors.secondary,
    muted:     colors.muted,
    success:   colors.success,
    error:     colors.error,
  },
  fontFamily: {
    sans:    typography.fontFamily.ui.split(","),
    heading: typography.fontFamily.heading.split(","),
    mono:    typography.fontFamily.mono.split(","),
  },
  borderRadius: radii,
  boxShadow:    shadows,
} as const;

export default {
  colors,
  typography,
  radii,
  shadows,
  spacing,
  animation,
  cssVars,
  tailwindExtension,
};
