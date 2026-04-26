"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Briefcase, Shield, FileText, Home, MapPin, Upload, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";

const profileSchema = z.object({
  firstName: z.string().min(2, "Vorname muss mindestens 2 Zeichen lang sein"),
  lastName: z.string().min(2, "Nachname muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().min(10, "Telefonnummer ungültig"),
  occupation: z.string().min(2, "Bitte Beruf angeben"),
  employer: z.string().min(2, "Bitte Arbeitgeber angeben"),
  employedSince: z.string().min(4, "Bitte Beschäftigungsbeginn angeben"),
  netIncome: z.string().min(1, "Bitte Nettoeinkommen angeben"),
  schufaScore: z.enum(["keine-eintraege", "leichte-eintraege", "schwere-eintraege"]),
  searchCity: z.string().min(2, "Bitte Stadt angeben"),
  searchDistricts: z.string().optional(),
  sizeMin: z.string().min(1, "Mindestgröße angeben"),
  sizeMax: z.string().min(1, "Maximalgröße angeben"),
  rentMax: z.string().min(1, "Maximalmiete angeben"),
  rooms: z.string().min(1, "Zimmerzahl angeben"),
  coverLetter: z.string().min(100, "Anschreiben muss mindestens 100 Zeichen lang sein"),
});

type ProfileForm = z.infer<typeof profileSchema>;

const steps = [
  { id: "personal", label: "Persönliches", icon: User },
  { id: "job", label: "Beruf & Finanzen", icon: Briefcase },
  { id: "schufa", label: "Schufa & Mappe", icon: Shield },
  { id: "search", label: "Suchkriterien", icon: Home },
  { id: "letter", label: "Anschreiben", icon: FileText },
];

const fieldClass = "w-full border-2 border-ink bg-paper font-mono text-[14px] text-ink px-4 py-3 focus:outline-none focus:bg-paper-warm placeholder:text-ash transition-colors";
const labelClass = "font-mono text-[11px] uppercase tracking-[0.15em] text-ash mb-2 block";
const errorClass = "font-mono text-[12px] text-stamp mt-1";

export default function ProfilePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [saved, setSaved] = useState(false);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      schufaScore: "keine-eintraege",
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue } = form;

  const onSubmit = (data: ProfileForm) => {
    console.log("Profile data:", data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 0));

  return (
    <>
      <TopTicker />
      <Nav />
      <main className="bg-paper">
        {/* Header */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-12 lg:pt-20">
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <span className="stamp-rotated">§ PROFIL</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Bewerbungs-Profil
              </span>
            </div>
            <h1 className="font-display text-[36px] sm:text-[48px] tracking-[-0.03em] text-ink leading-[1.1] mb-2">
              Dein Bewerbungs-Profil
            </h1>
            <p className="font-mono text-[14px] text-ash">
              Füll dein Profil aus. Der Bot nutzt diese Daten für personalisierte Bewerbungen.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[860px] px-6 lg:px-10 py-12">
          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 border-b-2 border-ink">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(i)}
                  className={`flex items-center gap-2 px-4 py-3 font-mono text-[12px] uppercase tracking-[0.1em] transition-all flex-shrink-0 border-r border-rule-soft last:border-r-0 ${
                    i === currentStep
                      ? "bg-ink text-paper"
                      : i < currentStep
                      ? "bg-paper-warm text-sage"
                      : "bg-paper text-ash hover:text-ink"
                  }`}
                >
                  {i < currentStep ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 0: Persönliches */}
            {currentStep === 0 && (
              <div className="border-2 border-ink bg-paper-warm p-8 space-y-6">
                <div className="label">Persönliche Daten</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="firstName">Vorname *</label>
                    <input id="firstName" placeholder="Max" className={fieldClass} {...register("firstName")} />
                    {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="lastName">Nachname *</label>
                    <input id="lastName" placeholder="Mustermann" className={fieldClass} {...register("lastName")} />
                    {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">E-Mail *</label>
                  <input id="email" type="email" placeholder="max@example.com" className={fieldClass} {...register("email")} />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="phone">Telefon *</label>
                  <input id="phone" type="tel" placeholder="+49 170 1234567" className={fieldClass} {...register("phone")} />
                  {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                </div>
              </div>
            )}

            {/* Step 1: Beruf & Finanzen */}
            {currentStep === 1 && (
              <div className="border-2 border-ink bg-paper-warm p-8 space-y-6">
                <div className="label">Beruf &amp; Finanzen</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="occupation">Beruf / Titel *</label>
                    <input id="occupation" placeholder="Software Engineer" className={fieldClass} {...register("occupation")} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="employer">Arbeitgeber *</label>
                    <input id="employer" placeholder="Firma GmbH" className={fieldClass} {...register("employer")} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="employedSince">Beschäftigt seit *</label>
                    <input id="employedSince" placeholder="2022-03" type="month" className={fieldClass} {...register("employedSince")} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="netIncome">Nettoeinkommen (€/Monat) *</label>
                    <input id="netIncome" type="number" placeholder="3500" className={fieldClass} {...register("netIncome")} />
                  </div>
                </div>
                <div className="border border-rule-soft bg-paper p-4">
                  <p className="font-mono text-[12px] text-ash leading-[1.6]">
                    <strong className="text-ink">Datenschutz:</strong> Diese Daten werden nur in deiner Browser-Extension gespeichert und direkt an Vermieter gesendet. Lyrvio speichert keine Finanzdaten auf unseren Servern.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Schufa & Mappe */}
            {currentStep === 2 && (
              <div className="border-2 border-ink bg-paper-warm p-8 space-y-6">
                <div className="label">Schufa &amp; Bewerbungs-Mappe</div>

                <div>
                  <label className={labelClass}>Schufa-Status *</label>
                  <Select
                    defaultValue="keine-eintraege"
                    onValueChange={(val) => setValue("schufaScore", val as ProfileForm["schufaScore"])}
                  >
                    <SelectTrigger className="border-2 border-ink rounded-none bg-paper font-mono text-[14px] text-ink h-auto py-3">
                      <SelectValue placeholder="Schufa auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keine-eintraege">Keine Einträge (Score: sehr gut)</SelectItem>
                      <SelectItem value="leichte-eintraege">Leichte Einträge</SelectItem>
                      <SelectItem value="schwere-eintraege">Schwere Einträge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* PDF Upload */}
                <div>
                  <label className={labelClass}>Bewerbungs-Mappe (PDF)</label>
                  <div className="border-2 border-dashed border-ink bg-paper p-8 text-center hover:bg-paper-warm transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-ash mx-auto mb-3" />
                    <p className="font-mono text-[14px] text-ink mb-1">PDF hier ablegen oder klicken</p>
                    <p className="font-mono text-[11px] text-ash">Empfohlen: Gehaltsnachweis + Personalausweis-Kopie (max. 10 MB)</p>
                    <input type="file" accept=".pdf" className="hidden" />
                  </div>
                </div>

                {/* Schufa Upload */}
                <div>
                  <label className={labelClass}>Schufa-Auskunft hochladen (optional)</label>
                  <div className="border-2 border-dashed border-ink bg-paper p-6 text-center hover:bg-paper-warm transition-colors cursor-pointer">
                    <Upload className="h-6 w-6 text-ash mx-auto mb-2" />
                    <p className="font-mono text-[12px] text-ash">Schufa-PDF hochladen (optional, stärkt Bewerbung)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Suchkriterien */}
            {currentStep === 3 && (
              <div className="border-2 border-ink bg-paper-warm p-8 space-y-6">
                <div className="label">Suchkriterien</div>
                <div>
                  <label className={labelClass} htmlFor="searchCity">Stadt *</label>
                  <input id="searchCity" placeholder="Berlin" className={fieldClass} {...register("searchCity")} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="searchDistricts">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Bezirke / Stadtteile (kommagetrennt)
                    </span>
                  </label>
                  <input
                    id="searchDistricts"
                    placeholder="Mitte, Prenzlauer Berg, Friedrichshain, Neukölln"
                    className={fieldClass}
                    {...register("searchDistricts")}
                  />
                  <p className="font-mono text-[11px] text-ash mt-1">Leer lassen = gesamte Stadt</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="sizeMin">Größe min (m²) *</label>
                    <input id="sizeMin" type="number" placeholder="40" className={fieldClass} {...register("sizeMin")} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="sizeMax">Größe max (m²) *</label>
                    <input id="sizeMax" type="number" placeholder="80" className={fieldClass} {...register("sizeMax")} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="rentMax">Max. Kaltmiete (€) *</label>
                    <input id="rentMax" type="number" placeholder="1200" className={fieldClass} {...register("rentMax")} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Zimmer-Anzahl</label>
                  <Select defaultValue="2" onValueChange={(val) => setValue("rooms", val)}>
                    <SelectTrigger className="border-2 border-ink rounded-none bg-paper font-mono text-[14px] text-ink h-auto py-3">
                      <SelectValue placeholder="Zimmer wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Zimmer</SelectItem>
                      <SelectItem value="1.5">1,5 Zimmer</SelectItem>
                      <SelectItem value="2">2 Zimmer</SelectItem>
                      <SelectItem value="2.5">2,5 Zimmer</SelectItem>
                      <SelectItem value="3">3 Zimmer</SelectItem>
                      <SelectItem value="3+">3+ Zimmer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 4: Anschreiben */}
            {currentStep === 4 && (
              <div className="border-2 border-ink bg-paper-warm p-8 space-y-6">
                <div className="label">Persönliches Anschreiben</div>
                <p className="font-mono text-[14px] text-ash leading-[1.75]">
                  Schreib ein persönliches Anschreiben. Der Bot passt es automatisch an den jeweiligen Inserat-Text an. Schreib in der Ich-Form, max. 300 Wörter.
                </p>
                <div>
                  <label className={labelClass} htmlFor="coverLetter">Anschreiben *</label>
                  <textarea
                    id="coverLetter"
                    rows={10}
                    placeholder="Sehr geehrte Damen und Herren,&#10;&#10;ich bewerbe mich auf Ihre Wohnung. Ich bin [Beruf] bei [Firma] und suche seit [Zeitraum] nach einer Wohnung in [Stadt]. Ich bin ordentlich, zahle pünktlich und bin langfristiger Mieter..."
                    className="w-full border-2 border-ink bg-paper font-mono text-[14px] text-ink px-4 py-3 focus:outline-none focus:bg-paper-warm placeholder:text-ash transition-colors resize-none"
                    {...register("coverLetter")}
                  />
                  {errors.coverLetter && (
                    <p className={errorClass}>{errors.coverLetter.message}</p>
                  )}
                  <p className="font-mono text-[11px] text-ash mt-1">
                    Min. 100 Zeichen. Der Bot ergänzt automatisch wohnungsspezifische Details.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Zurück
              </button>

              {currentStep < steps.length - 1 ? (
                <button type="button" onClick={nextStep} className="btn-primary">
                  Weiter →
                </button>
              ) : (
                <button
                  type="submit"
                  className={saved ? "btn-primary bg-sage border-sage" : "btn-primary cursor-stamp"}
                >
                  {saved ? (
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Gespeichert!
                    </span>
                  ) : (
                    "Profil speichern"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
