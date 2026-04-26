import React, { useState } from 'react';
import { usePopupStore } from '../store.ts';
import { getBotState, saveBotState } from '../../../lib/storage.ts';

function formatTime(ts: number | undefined): string {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function StatusTab(): React.ReactElement {
  const { botState, setBotState } = usePopupStore();
  const [toggling, setToggling] = useState(false);

  async function toggleBot() {
    if (!botState) return;
    setToggling(true);

    try {
      const newActive = !botState.active;

      // Message background worker
      await chrome.runtime.sendMessage({
        type: 'SET_ACTIVE',
        payload: { active: newActive },
      });

      // Reload state
      const state = await getBotState();
      setBotState(state);
    } finally {
      setToggling(false);
    }
  }

  async function runNow() {
    await chrome.runtime.sendMessage({ type: 'RUN_NOW' });
  }

  if (!botState) {
    return (
      <div className="p-4 text-center text-sm text-slate-500">Lade...</div>
    );
  }

  const stats = botState.stats;
  const isActive = botState.active;

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Main toggle */}
      <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
        <div>
          <div className={`font-semibold text-sm ${isActive ? 'text-green-400' : 'text-slate-400'}`}>
            {isActive ? 'Bot aktiv' : 'Bot inaktiv'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {isActive ? 'Scannt alle ~30s' : 'Starte den Bot um automatisch zu bewerben'}
          </div>
        </div>
        <button
          onClick={toggleBot}
          disabled={toggling}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${
            isActive ? 'bg-lyrvio-600' : 'bg-slate-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isActive ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Timestamps */}
      <div className="bg-slate-800 rounded-lg p-3 grid grid-cols-2 gap-2">
        <div>
          <div className="text-xs text-slate-500">Letzter Scan</div>
          <div className="text-xs font-mono text-slate-300 mt-0.5">
            {formatTime(botState.lastScanAt)}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Letzte Bewerbung</div>
          <div className="text-xs font-mono text-slate-300 mt-0.5">
            {formatTime(botState.lastSentAt)}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-slate-800 rounded-lg p-3">
        <div className="text-xs text-slate-400 font-medium mb-2">Pipeline-Statistik</div>
        <div className="grid grid-cols-3 gap-2">
          <StatCard label="Gescannt" value={stats.totalScanned} color="slate" />
          <StatCard label="Gematcht" value={stats.totalMatched} color="yellow" />
          <StatCard label="Gesendet" value={stats.totalSent} color="green" />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <StatCard label="Angeschaut" value={stats.totalViewed} color="blue" />
          <StatCard label="Eingeladen" value={stats.totalInvited} color="purple" />
        </div>
      </div>

      {/* Manual trigger */}
      {isActive && (
        <button
          onClick={runNow}
          className="w-full py-2 text-xs bg-slate-700 hover:bg-slate-600 rounded transition-colors text-slate-300"
        >
          Jetzt scannen
        </button>
      )}

      {/* Pause options */}
      {isActive && <PauseOptions />}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}): React.ReactElement {
  const colors: Record<string, string> = {
    slate: 'text-slate-300',
    yellow: 'text-yellow-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
  };
  return (
    <div className="text-center">
      <div className={`text-lg font-bold ${colors[color] ?? 'text-slate-300'}`}>{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function PauseOptions(): React.ReactElement {
  const { setBotState } = usePopupStore();

  async function pauseFor(minutes: number) {
    const until = Date.now() + minutes * 60 * 1000;
    await chrome.runtime.sendMessage({
      type: 'PAUSE_UNTIL',
      payload: { until },
    });
    const state = await getBotState();
    setBotState(state);
  }

  return (
    <div>
      <div className="text-xs text-slate-500 mb-1">Pausieren für:</div>
      <div className="flex gap-2">
        {[30, 60, 120].map((m) => (
          <button
            key={m}
            onClick={() => pauseFor(m)}
            className="flex-1 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded transition-colors text-slate-400"
          >
            {m >= 60 ? `${m / 60}h` : `${m}m`}
          </button>
        ))}
      </div>
    </div>
  );
}
