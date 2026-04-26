import { z } from "zod";

// Step 1 — Account (Magic-Link)
export const step1Schema = z.object({
  email: z
    .string()
    .min(1, "E-Mail ist Pflicht")
    .email("Bitte gültige E-Mail eingeben"),
});
export type Step1Data = z.infer<typeof step1Schema>;

// Step 2 — Vollmacht
export const step2Schema = z.object({
  vollmachtAccepted: z
    .boolean()
    .refine((v) => v === true, "Du musst die Vollmacht bestätigen"),
  dsgvoAccepted: z
    .boolean()
    .refine((v) => v === true, "Bitte Datenschutzerklärung akzeptieren"),
});
export type Step2Data = z.infer<typeof step2Schema>;

// Step 3 — Persönliche Daten
export const step3Schema = z.object({
  vorname: z.string().min(2, "Vorname mindestens 2 Zeichen"),
  nachname: z.string().min(2, "Nachname mindestens 2 Zeichen"),
  telefon: z
    .string()
    .min(6, "Telefonnummer eingeben")
    .regex(/^[\d\s\+\-\(\)]+$/, "Nur Ziffern, +, -, Leerzeichen erlaubt"),
  geburtsdatum: z
    .string()
    .min(1, "Geburtsdatum ist Pflicht")
    .refine((v) => {
      const d = new Date(v);
      const now = new Date();
      const age = now.getFullYear() - d.getFullYear();
      return age >= 18 && age <= 100;
    }, "Mindestalter 18 Jahre"),
  beruf: z.string().min(2, "Beruf angeben"),
});
export type Step3Data = z.infer<typeof step3Schema>;

// Step 4 — Mietsicherheits-Daten
export const step4Schema = z.object({
  nettogehalt: z
    .string()
    .min(1, "Nettogehalt eingeben")
    .regex(/^\d+$/, "Nur Zahlen"),
  schufa: z.enum(["sehr_gut", "gut", "befriedigend", "ausreichend", "keine"], {
    errorMap: () => ({ message: "Schufa-Score auswählen" }),
  }),
  beschaeftigungsart: z.enum(
    ["angestellt", "beamtet", "selbststaendig", "student", "rentner", "sonstiges"],
    { errorMap: () => ({ message: "Beschäftigungsart auswählen" }) }
  ),
  mappeUrl: z.string().optional(),
});
export type Step4Data = z.infer<typeof step4Schema>;

// Step 5 — Such-Kriterien
export const step5Schema = z.object({
  stadt: z.string().min(1, "Stadt auswählen"),
  bezirke: z.array(z.string()).min(1, "Mindestens einen Bezirk auswählen"),
  groesseMin: z.number().min(10).max(300),
  groesseMax: z.number().min(10).max(300),
  preisMax: z.number().min(100).max(10000),
  zimmerMin: z.number().min(1).max(10),
  kinderfrei: z.boolean(),
  haustier: z.boolean(),
  wgGeeignet: z.boolean(),
});
export type Step5Data = z.infer<typeof step5Schema>;

// Step 6 — Extension Install
export const step6Schema = z.object({
  extensionInstalled: z
    .boolean()
    .refine((v) => v === true, "Bitte Extension installieren"),
});
export type Step6Data = z.infer<typeof step6Schema>;

// Gesamt-Profil (merged)
export const onboardingProfileSchema = z.object({
  step1: step1Schema,
  step2: step2Schema,
  step3: step3Schema,
  step4: step4Schema,
  step5: step5Schema,
});
export type OnboardingProfile = z.infer<typeof onboardingProfileSchema>;
