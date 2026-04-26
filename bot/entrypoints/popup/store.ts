/**
 * Popup Zustand store — bridges IndexedDB + chrome.runtime messages
 */
import { create } from 'zustand';
import type { BotState, SentApplication, LogEntry } from '../../lib/storage.ts';
import type { AuthSession } from '../../lib/auth.ts';

interface PopupStore {
  // Auth
  session: AuthSession | null;
  isLoggingIn: boolean;
  loginEmail: string;
  loginStep: 'email' | 'magic-link' | 'done';

  // Bot state
  botState: BotState | null;
  isLoadingState: boolean;

  // History
  recentApplications: SentApplication[];
  recentLogs: LogEntry[];
  activeTab: 'status' | 'history' | 'logs';

  // Actions
  setSession: (session: AuthSession | null) => void;
  setIsLoggingIn: (v: boolean) => void;
  setLoginEmail: (v: string) => void;
  setLoginStep: (v: 'email' | 'magic-link' | 'done') => void;
  setBotState: (state: BotState | null) => void;
  setIsLoadingState: (v: boolean) => void;
  setRecentApplications: (apps: SentApplication[]) => void;
  setRecentLogs: (logs: LogEntry[]) => void;
  setActiveTab: (tab: 'status' | 'history' | 'logs') => void;
}

export const usePopupStore = create<PopupStore>((set) => ({
  session: null,
  isLoggingIn: false,
  loginEmail: '',
  loginStep: 'email',

  botState: null,
  isLoadingState: false,

  recentApplications: [],
  recentLogs: [],
  activeTab: 'status',

  setSession: (session) => set({ session }),
  setIsLoggingIn: (isLoggingIn) => set({ isLoggingIn }),
  setLoginEmail: (loginEmail) => set({ loginEmail }),
  setLoginStep: (loginStep) => set({ loginStep }),
  setBotState: (botState) => set({ botState }),
  setIsLoadingState: (isLoadingState) => set({ isLoadingState }),
  setRecentApplications: (recentApplications) => set({ recentApplications }),
  setRecentLogs: (recentLogs) => set({ recentLogs }),
  setActiveTab: (activeTab) => set({ activeTab }),
}));
