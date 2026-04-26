import React from 'react';
import { usePopupStore } from '../store.ts';
import type { LogEntry } from '../../../lib/storage.ts';

function levelColor(level: LogEntry['level']): string {
  switch (level) {
    case 'info':
      return 'text-blue-400';
    case 'warn':
      return 'text-yellow-400';
    case 'error':
      return 'text-red-400';
    case 'debug':
      return 'text-slate-500';
    default:
      return 'text-slate-400';
  }
}

export function LogsTab(): React.ReactElement {
  const { recentLogs } = usePopupStore();

  if (recentLogs.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-slate-500 mt-8">Keine Logs vorhanden.</div>
    );
  }

  return (
    <div className="p-2 font-mono">
      {recentLogs.map((entry) => (
        <div key={entry.id} className="text-xs mb-1 flex gap-2">
          <span className="text-slate-600 shrink-0">
            {new Date(entry.timestamp).toLocaleTimeString('de-DE', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </span>
          <span className={`shrink-0 uppercase font-bold ${levelColor(entry.level)}`}>
            {entry.level.slice(0, 4)}
          </span>
          <span className="text-slate-400 break-all">{entry.message}</span>
        </div>
      ))}
    </div>
  );
}
