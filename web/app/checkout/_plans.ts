export const plans = {
  standard: {
    name: "Lyrvio Standard",
    price: "9,00 €",
    suffix: "pro Monat",
    description: "24/7-Suche auf 5 Plattformen, vollautomatisches Bewerben, monatlich kündbar.",
    paymentLink:
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_AKTIV ||
      "https://buy.stripe.com/placeholder",
    features: [
      "24/7 Suche auf 5 Plattformen",
      "Persönliche Anschreiben automatisch",
      "Push + E-Mail bei Antwort",
      "Übersicht aller Bewerbungen",
      "Monatlich kündbar",
    ],
    orderNr: "2026-001",
  },
  premium: {
    name: "Lyrvio Premium",
    price: "19,00 €",
    suffix: "pro Monat",
    description: "Alles aus Standard plus vorrangiger Hilfe und doppeltem Aktualisierungs-Takt.",
    paymentLink:
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PREMIUM ||
      "https://buy.stripe.com/placeholder",
    features: [
      "Alles aus Standard",
      "Suche alle 12 Sekunden (statt 30)",
      "Vermieter, die zu deinem Profil passen",
      "Persönliches Onboarding",
      "Vorrangige Hilfe · Antwort < 2 h",
    ],
    orderNr: "2026-002",
  },
  erfolg: {
    name: "Lyrvio Standard + Erfolgsprämie",
    price: "9,00 €",
    suffix: "pro Monat · 49 € einmal bei Mietvertrag",
    description: "9 € im Monat wie beim Standard. Wenn du dank Lyrvio einen Mietvertrag bekommst: einmalig 49 € extra. Sonst nur die 9 €.",
    paymentLink:
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_AKTIV ||
      "https://buy.stripe.com/placeholder",
    features: [
      "Alles aus Standard",
      "+ 49 € einmalig nur bei Mietvertrag",
      "Wenn keine Wohnung: keine Prämie",
    ],
    orderNr: "2026-003",
  },
} as const;

export type PlanKey = keyof typeof plans;

export const validPlanKeys: PlanKey[] = ["standard", "premium", "erfolg"];
