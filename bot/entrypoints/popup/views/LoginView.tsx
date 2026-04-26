import React, { useState } from 'react';
import { usePopupStore } from '../store.ts';
import { requestMagicLink, verifyMagicLink, saveSession } from '../../../lib/auth.ts';

export function LoginView(): React.ReactElement {
  const { loginEmail, loginStep, setLoginEmail, setLoginStep, setSession, setIsLoggingIn } =
    usePopupStore();

  const [magicToken, setMagicToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRequestLink() {
    if (!loginEmail || !loginEmail.includes('@')) {
      setError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await requestMagicLink(loginEmail);
      setLoginStep('magic-link');
    } catch (e) {
      setError(`Fehler: ${String(e)}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyToken() {
    if (!magicToken.trim()) {
      setError('Bitte gib den Token aus der E-Mail ein.');
      return;
    }

    setLoading(true);
    setError('');
    setIsLoggingIn(true);

    try {
      const session = await verifyMagicLink(magicToken.trim());
      await saveSession(session);
      setSession(session);
      setLoginStep('done');
    } catch (e) {
      setError(`Verifizierung fehlgeschlagen: ${String(e)}`);
    } finally {
      setLoading(false);
      setIsLoggingIn(false);
    }
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="text-center py-4">
        <div className="text-2xl font-bold text-lyrvio-500 mb-1">Lyrvio</div>
        <div className="text-sm text-slate-400">Automatische Wohnungsbewerbungen</div>
      </div>

      {loginStep === 'email' && (
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">E-Mail-Adresse</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRequestLink()}
              placeholder="deine@email.de"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-lyrvio-500"
            />
          </div>

          {error && (
            <div className="text-xs text-red-400 bg-red-900/20 border border-red-800 rounded px-3 py-2">
              {error}
            </div>
          )}

          <button
            onClick={handleRequestLink}
            disabled={loading}
            className="w-full py-2 px-4 bg-lyrvio-600 hover:bg-lyrvio-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm font-medium transition-colors"
          >
            {loading ? 'Sende Link...' : 'Magic Link senden'}
          </button>

          <div className="text-xs text-slate-500 text-center">
            Du erhältst einen Login-Link per E-Mail.
            <br />
            Kein Passwort nötig.
          </div>
        </div>
      )}

      {loginStep === 'magic-link' && (
        <div className="flex flex-col gap-3">
          <div className="text-xs text-slate-400 bg-slate-800 rounded px-3 py-2">
            E-Mail gesendet an <strong className="text-slate-200">{loginEmail}</strong>.
            Kopiere den Token aus der E-Mail.
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Token aus der E-Mail</label>
            <input
              type="text"
              value={magicToken}
              onChange={(e) => setMagicToken(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerifyToken()}
              placeholder="abc123..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-lyrvio-500"
            />
          </div>

          {error && (
            <div className="text-xs text-red-400 bg-red-900/20 border border-red-800 rounded px-3 py-2">
              {error}
            </div>
          )}

          <button
            onClick={handleVerifyToken}
            disabled={loading}
            className="w-full py-2 px-4 bg-lyrvio-600 hover:bg-lyrvio-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm font-medium transition-colors"
          >
            {loading ? 'Verifiziere...' : 'Einloggen'}
          </button>

          <button
            onClick={() => setLoginStep('email')}
            className="w-full py-1.5 text-xs text-slate-500 hover:text-slate-400"
          >
            Andere E-Mail verwenden
          </button>
        </div>
      )}
    </div>
  );
}
