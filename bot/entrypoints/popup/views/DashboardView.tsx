import React from 'react';
import { usePopupStore } from '../store.ts';
import { StatusTab } from '../tabs/StatusTab.tsx';
import { HistoryTab } from '../tabs/HistoryTab.tsx';
import { LogsTab } from '../tabs/LogsTab.tsx';
import { clearSession } from '../../../lib/auth.ts';

export function DashboardView(): React.ReactElement {
  const { activeTab, setActiveTab, session, setSession, botState } = usePopupStore();

  async function handleLogout() {
    await clearSession();
    setSession(null);
  }

  const tabs = [
    { id: 'status' as const, label: 'Status' },
    { id: 'history' as const, label: 'Verlauf' },
    { id: 'logs' as const, label: 'Logs' },
  ];

  const isActive = botState?.active ?? false;

  return (
    <div className="flex flex-col h-full">
      {/* User info bar */}
      <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`}
          />
          <span className="text-xs text-slate-400">{session?.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-lyrvio-400 border-b-2 border-lyrvio-500'
                : 'text-slate-500 hover:text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'status' && <StatusTab />}
        {activeTab === 'history' && <HistoryTab />}
        {activeTab === 'logs' && <LogsTab />}
      </div>
    </div>
  );
}
