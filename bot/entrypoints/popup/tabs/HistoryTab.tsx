import React from 'react';
import { usePopupStore } from '../store.ts';
import type { SentApplication } from '../../../lib/storage.ts';

function statusLabel(status: SentApplication['status']): { text: string; color: string } {
  switch (status) {
    case 'sent':
      return { text: 'Gesendet', color: 'text-blue-400' };
    case 'viewed':
      return { text: 'Angeschaut', color: 'text-yellow-400' };
    case 'invited':
      return { text: 'Eingeladen!', color: 'text-green-400' };
    case 'error':
      return { text: 'Fehler', color: 'text-red-400' };
    default:
      return { text: 'Unbekannt', color: 'text-slate-400' };
  }
}

export function HistoryTab(): React.ReactElement {
  const { recentApplications } = usePopupStore();

  if (recentApplications.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="text-sm text-slate-500 mt-8">Noch keine Bewerbungen gesendet.</div>
        <div className="text-xs text-slate-600 mt-1">
          Aktiviere den Bot und er bewirbt sich automatisch.
        </div>
      </div>
    );
  }

  return (
    <div className="p-2">
      {recentApplications.map((app) => {
        const { text, color } = statusLabel(app.status);
        return (
          <div
            key={app.id}
            className="bg-slate-800 rounded-lg p-3 mb-2 hover:bg-slate-750 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-300 truncate font-medium">
                  {app.listingId}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {new Date(app.sentAt).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${color}`}>{text}</span>
            </div>
            {app.errorMessage && (
              <div className="text-xs text-red-400 mt-1 bg-red-900/20 rounded px-2 py-1">
                {app.errorMessage}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
