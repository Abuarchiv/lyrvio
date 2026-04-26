import React, { useEffect, useState } from 'react';
import { getUserProfile, saveUserProfile, type UserProfile } from '../../lib/storage.ts';
import { getOpenRouterKey, saveOpenRouterKey } from '../../lib/auth.ts';

const DEFAULT_PROFILE: UserProfile = {
  id: 'local',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  incomeNet: 0,
  occupation: '',
  numberOfPersons: 1,
  hasAnimals: false,
  smokingStatus: 'non-smoker',
  personalStatement: '',
  searchCriteria: {
    platforms: ['immoscout24'],
    cities: ['Berlin'],
    districts: [],
    minSizeSqm: 30,
    maxSizeSqm: 100,
    maxRentWarm: 1200,
    maxRentCold: 1000,
  },
  applicationStyleCounter: 0,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export function OptionsApp(): React.ReactElement {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [openRouterKey, setOpenRouterKeyState] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const p = await getUserProfile();
      if (p) setProfile(p);
      const key = await getOpenRouterKey();
      if (key) setOpenRouterKeyState(key);
      setLoading(false);
    })();
  }, []);

  async function handleSave() {
    await saveUserProfile({ ...profile, updatedAt: Date.now() });
    if (openRouterKey) await saveOpenRouterKey(openRouterKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function updateProfile(partial: Partial<UserProfile>) {
    setProfile((p) => ({ ...p, ...partial }));
  }

  function updateCriteria(partial: Partial<UserProfile['searchCriteria']>) {
    setProfile((p) => ({
      ...p,
      searchCriteria: { ...p.searchCriteria, ...partial },
    }));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Lade...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded bg-lyrvio-600 flex items-center justify-center font-bold text-white">
          L
        </div>
        <h1 className="text-xl font-semibold">Lyrvio — Einstellungen</h1>
      </div>

      <div className="space-y-6">
        {/* Personal data */}
        <Section title="Persönliche Daten">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Vorname"
              value={profile.firstName}
              onChange={(v) => updateProfile({ firstName: v })}
            />
            <Field
              label="Nachname"
              value={profile.lastName}
              onChange={(v) => updateProfile({ lastName: v })}
            />
            <Field
              label="E-Mail"
              value={profile.email}
              type="email"
              onChange={(v) => updateProfile({ email: v })}
            />
            <Field
              label="Telefon"
              value={profile.phone}
              onChange={(v) => updateProfile({ phone: v })}
            />
            <Field
              label="Beruf"
              value={profile.occupation}
              onChange={(v) => updateProfile({ occupation: v })}
            />
            <Field
              label="Netto-Einkommen (€)"
              value={String(profile.incomeNet)}
              type="number"
              onChange={(v) => updateProfile({ incomeNet: Number(v) })}
            />
            <Field
              label="Anzahl Personen"
              value={String(profile.numberOfPersons)}
              type="number"
              onChange={(v) => updateProfile({ numberOfPersons: Number(v) })}
            />
            <div>
              <label className="block text-xs text-slate-400 mb-1">Raucher-Status</label>
              <select
                value={profile.smokingStatus}
                onChange={(e) =>
                  updateProfile({
                    smokingStatus: e.target.value as UserProfile['smokingStatus'],
                  })
                }
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-sm text-slate-100 focus:outline-none focus:border-lyrvio-500"
              >
                <option value="non-smoker">Nichtraucher</option>
                <option value="smoker">Raucher</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs text-slate-400 mb-1">
              Persönlicher Vorstellungstext (für die KI)
            </label>
            <textarea
              value={profile.personalStatement}
              onChange={(e) => updateProfile({ personalStatement: e.target.value })}
              rows={3}
              placeholder="Ich bin ... und suche eine Wohnung in ... weil ..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-lyrvio-500 resize-none"
            />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="animals"
              checked={profile.hasAnimals}
              onChange={(e) => updateProfile({ hasAnimals: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="animals" className="text-sm text-slate-300">
              Haustiere vorhanden
            </label>
          </div>
        </Section>

        {/* Search criteria */}
        <Section title="Suchkriterien">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Städte (kommagetrennt)"
              value={profile.searchCriteria.cities.join(', ')}
              onChange={(v) => updateCriteria({ cities: v.split(',').map((s) => s.trim()) })}
            />
            <Field
              label="Bezirke (kommagetrennt, optional)"
              value={profile.searchCriteria.districts.join(', ')}
              onChange={(v) =>
                updateCriteria({
                  districts: v
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
            <Field
              label="Min. Größe (m²)"
              value={String(profile.searchCriteria.minSizeSqm)}
              type="number"
              onChange={(v) => updateCriteria({ minSizeSqm: Number(v) })}
            />
            <Field
              label="Max. Größe (m²)"
              value={String(profile.searchCriteria.maxSizeSqm)}
              type="number"
              onChange={(v) => updateCriteria({ maxSizeSqm: Number(v) })}
            />
            <Field
              label="Max. Warmmiete (€)"
              value={String(profile.searchCriteria.maxRentWarm)}
              type="number"
              onChange={(v) => updateCriteria({ maxRentWarm: Number(v) })}
            />
            <Field
              label="Max. Kaltmiete (€)"
              value={String(profile.searchCriteria.maxRentCold)}
              type="number"
              onChange={(v) => updateCriteria({ maxRentCold: Number(v) })}
            />
          </div>
        </Section>

        {/* API Keys — BYOK optional */}
        <Section title="API-Zugänge (optional)">
          <Field
            label="OpenRouter API Key (BYOK — optional)"
            value={openRouterKey}
            type="password"
            placeholder="sk-or-v1-..."
            onChange={(v) => setOpenRouterKeyState(v)}
          />
          <div className="text-xs text-slate-500 mt-1">
            <strong>Nicht erforderlich.</strong> Lyrvio nutzt standardmäßig Cloudflare Workers AI (kostenlos).
            Eigenen Key eintragen wenn tägliches Limit überschritten wird.{' '}
            <a
              href="https://openrouter.ai"
              target="_blank"
              rel="noreferrer"
              className="text-lyrvio-400 hover:underline"
            >
              openrouter.ai
            </a>
          </div>
        </Section>

        {/* Save button */}
        <button
          onClick={handleSave}
          className={`w-full py-3 rounded font-medium transition-colors ${
            saved
              ? 'bg-green-700 text-green-100'
              : 'bg-lyrvio-600 hover:bg-lyrvio-700 text-white'
          }`}
        >
          {saved ? 'Gespeichert!' : 'Einstellungen speichern'}
        </button>

        <div className="text-xs text-slate-500 text-center">
          Alle Daten werden lokal in deinem Browser gespeichert (IndexedDB).
          <br />
          Es werden niemals persönliche Daten an Lyrvio übertragen.
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="bg-slate-800 rounded-lg p-5">
      <h2 className="text-sm font-semibold text-slate-300 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}): React.ReactElement {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-lyrvio-500"
      />
    </div>
  );
}
