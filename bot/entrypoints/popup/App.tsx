import React, { useEffect } from 'react';
import { usePopupStore } from './store.ts';
import { LoginView } from './views/LoginView.tsx';
import { DashboardView } from './views/DashboardView.tsx';
import { getSession } from '../../lib/auth.ts';
import { getBotState, getRecentApplications, getRecentLogs } from '../../lib/storage.ts';

export function App(): React.ReactElement {
  const { session, setSession, setBotState, setRecentApplications, setRecentLogs } =
    usePopupStore();

  useEffect(() => {
    void (async () => {
      // Load session
      const s = await getSession();
      setSession(s);

      // Load state from IndexedDB
      const state = await getBotState();
      setBotState(state);

      const apps = await getRecentApplications(20);
      setRecentApplications(apps);

      const logs = await getRecentLogs(50);
      setRecentLogs(logs);
    })();
  }, [setSession, setBotState, setRecentApplications, setRecentLogs]);

  return (
    <div className="w-[360px] min-h-[480px] bg-slate-900 text-slate-100 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-lyrvio-600 flex items-center justify-center text-xs font-bold text-white">
          L
        </div>
        <span className="font-semibold text-sm text-slate-100">Lyrvio</span>
        <span className="text-xs text-slate-400 ml-auto">v0.1</span>
      </div>

      {/* Content */}
      <div className="flex-1">
        {session ? <DashboardView /> : <LoginView />}
      </div>
    </div>
  );
}
