"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Briefcase, Shield, FileText, Home, MapPin, Upload, Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

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

export default function ProfilePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [saved, setSaved] = useState(false);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      schufaScore: "keine-eintraege",
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  const onSubmit = (data: ProfileForm) => {
    console.log("Profile data:", data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 0));

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      <Nav />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Dein Bewerbungs-Profil</h1>
            <p className="text-slate-400 mt-2">
              Füll dein Profil aus. Der Bot nutzt diese Daten für personalisierte Bewerbungen.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(i)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${
                    i === currentStep
                      ? "bg-indigo-600 text-white"
                      : i < currentStep
                      ? "bg-slate-800 text-emerald-400"
                      : "bg-slate-900 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {i < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 0: Persönliches */}
            {currentStep === 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-indigo-400" />
                  Persönliche Daten
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Vorname *</Label>
                    <Input
                      id="firstName"
                      placeholder="Max"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-xs">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nachname *</Label>
                    <Input
                      id="lastName"
                      placeholder="Mustermann"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-xs">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="max@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+49 170 1234567"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 1: Beruf & Finanzen */}
            {currentStep === 1 && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-indigo-400" />
                  Beruf & Finanzen
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Beruf / Titel *</Label>
                    <Input
                      id="occupation"
                      placeholder="Software Engineer"
                      {...register("occupation")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employer">Arbeitgeber *</Label>
                    <Input
                      id="employer"
                      placeholder="Firma GmbH"
                      {...register("employer")}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employedSince">Beschäftigt seit *</Label>
                    <Input
                      id="employedSince"
                      placeholder="2022-03"
                      type="month"
                      {...register("employedSince")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="netIncome">Nettoeinkommen (€/Monat) *</Label>
                    <Input
                      id="netIncome"
                      type="number"
                      placeholder="3500"
                      {...register("netIncome")}
                    />
                  </div>
                </div>
                <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 text-xs text-slate-500">
                  <strong className="text-slate-400">Datenschutz:</strong> Diese Daten werden nur in deiner Browser-Extension gespeichert und direkt an Vermieter gesendet. Lyrvio speichert keine Finanzdaten auf unseren Servern.
                </div>
              </div>
            )}

            {/* Step 2: Schufa & Mappe */}
            {currentStep === 2 && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-400" />
                  Schufa & Bewerbungs-Mappe
                </h2>

                <div className="space-y-2">
                  <Label>Schufa-Status *</Label>
                  <Select
                    defaultValue="keine-eintraege"
                    onValueChange={(val) => setValue("schufaScore", val as ProfileForm["schufaScore"])}
                  >
                    <SelectTrigger>
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
                <div className="space-y-2">
                  <Label>Bewerbungs-Mappe (PDF)</Label>
                  <div className="rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/30 p-8 text-center hover:border-indigo-500/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-slate-600 mx-auto mb-3" />
                    <p className="text-sm text-slate-400 mb-1">PDF hier ablegen oder klicken</p>
                    <p className="text-xs text-slate-600">Empfohlen: Gehaltsnachweis + Personalausweis-Kopie (max. 10 MB)</p>
                    <input type="file" accept=".pdf" className="hidden" />
                  </div>
                </div>

                {/* Schufa Upload */}
                <div className="space-y-2">
                  <Label>Schufa-Auskunft hochladen (optional)</Label>
                  <div className="rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/30 p-6 text-center hover:border-indigo-500/50 transition-colors cursor-pointer">
                    <Upload className="h-6 w-6 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">Schufa-PDF hochladen (optional, stärkt Bewerbung)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Suchkriterien */}
            {currentStep === 3 && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Home className="h-5 w-5 text-indigo-400" />
                  Suchkriterien
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="searchCity">Stadt *</Label>
                  <Input
                    id="searchCity"
                    placeholder="Berlin"
                    {...register("searchCity")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="searchDistricts">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      Bezirke / Stadtteile (kommagetrennt)
                    </span>
                  </Label>
                  <Input
                    id="searchDistricts"
                    placeholder="Mitte, Prenzlauer Berg, Friedrichshain, Neukölln"
                    {...register("searchDistricts")}
                  />
                  <p className="text-xs text-slate-600">Leer lassen = gesamte Stadt</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sizeMin">Größe min (m²) *</Label>
                    <Input
                      id="sizeMin"
                      type="number"
                      placeholder="40"
                      {...register("sizeMin")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sizeMax">Größe max (m²) *</Label>
                    <Input
                      id="sizeMax"
                      type="number"
                      placeholder="80"
                      {...register("sizeMax")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rentMax">Max. Kaltmiete (€) *</Label>
                    <Input
                      id="rentMax"
                      type="number"
                      placeholder="1200"
                      {...register("rentMax")}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Zimmer-Anzahl</Label>
                  <Select defaultValue="2" onValueChange={(val) => setValue("rooms", val)}>
                    <SelectTrigger>
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
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-400" />
                  Persönliches Anschreiben
                </h2>
                <p className="text-sm text-slate-400">
                  Schreib ein persönliches Anschreiben. Der Bot passt es automatisch an den jeweiligen Inserat-Text an. Schreib in der Ich-Form, max. 300 Wörter.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Anschreiben *</Label>
                  <textarea
                    id="coverLetter"
                    rows={10}
                    placeholder="Sehr geehrte Damen und Herren,&#10;&#10;ich bewerbe mich auf Ihre Wohnung. Ich bin [Beruf] bei [Firma] und suche seit [Zeitraum] nach einer Wohnung in [Stadt]. Ich bin ordentlich, zahle pünktlich und bin langfristiger Mieter..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent resize-none"
                    {...register("coverLetter")}
                  />
                  {errors.coverLetter && (
                    <p className="text-red-400 text-xs">{errors.coverLetter.message}</p>
                  )}
                  <p className="text-xs text-slate-600">
                    Min. 100 Zeichen. Der Bot ergänzt automatisch wohnungsspezifische Details.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="border-slate-700 text-slate-300"
              >
                <Minus className="h-4 w-4" />
                Zurück
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Weiter
                  <Plus className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className={saved ? "bg-emerald-600 hover:bg-emerald-700" : "bg-indigo-600 hover:bg-indigo-700"}
                >
                  {saved ? (
                    <>
                      <Check className="h-4 w-4" />
                      Gespeichert!
                    </>
                  ) : (
                    "Profil speichern"
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
