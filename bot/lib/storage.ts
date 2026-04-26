/**
 * IndexedDB storage layer — all user data stays local (Datenschutz-by-Design).
 * Uses idb for typed, promise-based access.
 */
import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

// ─── Schemas ────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;                    // Lyrvio user ID
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  /** Current net income in EUR */
  incomeNet: number;
  occupation: string;            // e.g. "Softwareentwickler", "Student"
  numberOfPersons: number;
  hasAnimals: boolean;
  smokingStatus: 'non-smoker' | 'smoker';
  /** Free-text about the person, used in application generation */
  personalStatement: string;
  /** Search criteria */
  searchCriteria: SearchCriteria;
  /** Style variation counter for bot-detection avoidance */
  applicationStyleCounter: number;
  createdAt: number;
  updatedAt: number;
}

export interface SearchCriteria {
  platforms: Platform[];
  cities: string[];
  districts: string[];
  minSizeSqm: number;
  maxSizeSqm: number;
  maxRentWarm: number;
  maxRentCold: number;
  /** Desired move-in date ISO string */
  availableFrom?: string;
  rooms?: { min: number; max: number };
  mustHaveBalcony?: boolean;
  mustHaveElevator?: boolean;
  allowedFloors?: number[];
  keywords?: string[];
}

export type Platform = 'immoscout24' | 'immowelt' | 'immonet' | 'kleinanzeigen' | 'wunderflats';

export interface ListingRecord {
  /** Hash of (platform + listing ID) for deduplication */
  id: string;
  platform: Platform;
  listingId: string;
  title: string;
  location: string;
  district: string;
  sizeSqm: number;
  rentWarm: number;
  rentCold: number;
  deposit: number;
  availableFrom: string;
  vermieterText: string;
  vermieterAnforderungen: string;
  imageUrls: string[];
  url: string;
  scrapedAt: number;
}

export interface SentApplication {
  id: string;
  listingId: string;
  platform: Platform;
  applicationText: string;
  sentAt: number;
  status: 'sent' | 'error' | 'viewed' | 'invited';
  responseReceivedAt?: number;
  errorMessage?: string;
}

export interface LogEntry {
  id: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  data?: unknown;
  timestamp: number;
}

export interface BotState {
  id: 'singleton';
  active: boolean;
  pausedUntil?: number;
  lastScanAt?: number;
  lastSentAt?: number;
  stats: {
    totalScanned: number;
    totalMatched: number;
    totalSent: number;
    totalViewed: number;
    totalInvited: number;
  };
}

// ─── DB Schema ───────────────────────────────────────────────────────────────

interface LyrvioDBSchema extends DBSchema {
  userProfile: {
    key: string;
    value: UserProfile;
  };
  listings: {
    key: string;
    value: ListingRecord;
    indexes: {
      'by-platform': Platform;
      'by-scraped': number;
    };
  };
  sentApplications: {
    key: string;
    value: SentApplication;
    indexes: {
      'by-listing': string;
      'by-sent': number;
    };
  };
  logs: {
    key: string;
    value: LogEntry;
    indexes: {
      'by-timestamp': number;
    };
  };
  botState: {
    key: string;
    value: BotState;
  };
}

const DB_NAME = 'lyrvio-v1';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<LyrvioDBSchema> | null = null;

async function getDB(): Promise<IDBPDatabase<LyrvioDBSchema>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<LyrvioDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // userProfile store
      if (!db.objectStoreNames.contains('userProfile')) {
        db.createObjectStore('userProfile', { keyPath: 'id' });
      }

      // listings store
      if (!db.objectStoreNames.contains('listings')) {
        const store = db.createObjectStore('listings', { keyPath: 'id' });
        store.createIndex('by-platform', 'platform');
        store.createIndex('by-scraped', 'scrapedAt');
      }

      // sentApplications store
      if (!db.objectStoreNames.contains('sentApplications')) {
        const store = db.createObjectStore('sentApplications', { keyPath: 'id' });
        store.createIndex('by-listing', 'listingId');
        store.createIndex('by-sent', 'sentAt');
      }

      // logs store
      if (!db.objectStoreNames.contains('logs')) {
        const store = db.createObjectStore('logs', { keyPath: 'id' });
        store.createIndex('by-timestamp', 'timestamp');
      }

      // botState store
      if (!db.objectStoreNames.contains('botState')) {
        db.createObjectStore('botState', { keyPath: 'id' });
      }
    },
  });

  return dbInstance;
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  const db = await getDB();
  await db.put('userProfile', { ...profile, updatedAt: Date.now() });
}

export async function getUserProfile(): Promise<UserProfile | undefined> {
  const db = await getDB();
  const all = await db.getAll('userProfile');
  return all[0];
}

export async function deleteUserProfile(): Promise<void> {
  const db = await getDB();
  const profile = await getUserProfile();
  if (profile) {
    await db.delete('userProfile', profile.id);
  }
}

// ─── Listings ─────────────────────────────────────────────────────────────────

export async function hasListing(id: string): Promise<boolean> {
  const db = await getDB();
  const entry = await db.get('listings', id);
  return entry !== undefined;
}

export async function saveListing(listing: ListingRecord): Promise<void> {
  const db = await getDB();
  await db.put('listings', listing);
}

export async function getRecentListings(limit = 50): Promise<ListingRecord[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('listings', 'by-scraped');
  return all.reverse().slice(0, limit);
}

// ─── Sent Applications ────────────────────────────────────────────────────────

export async function hasApplied(listingId: string): Promise<boolean> {
  const db = await getDB();
  const entries = await db.getAllFromIndex('sentApplications', 'by-listing', listingId);
  return entries.length > 0;
}

export async function saveSentApplication(app: SentApplication): Promise<void> {
  const db = await getDB();
  await db.put('sentApplications', app);
}

export async function updateApplicationStatus(
  id: string,
  status: SentApplication['status'],
  responseReceivedAt?: number,
): Promise<void> {
  const db = await getDB();
  const app = await db.get('sentApplications', id);
  if (app) {
    await db.put('sentApplications', { ...app, status, responseReceivedAt });
  }
}

export async function getRecentApplications(limit = 20): Promise<SentApplication[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('sentApplications', 'by-sent');
  return all.reverse().slice(0, limit);
}

// ─── Logs ─────────────────────────────────────────────────────────────────────

export async function log(
  level: LogEntry['level'],
  message: string,
  data?: unknown,
): Promise<void> {
  const db = await getDB();
  const entry: LogEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    level,
    message,
    data,
    timestamp: Date.now(),
  };
  await db.put('logs', entry);

  // Trim logs to max 500 entries
  const all = await db.getAllFromIndex('logs', 'by-timestamp');
  if (all.length > 500) {
    const toDelete = all.slice(0, all.length - 500);
    const tx = db.transaction('logs', 'readwrite');
    await Promise.all(toDelete.map((e) => tx.store.delete(e.id)));
    await tx.done;
  }
}

export async function getRecentLogs(limit = 100): Promise<LogEntry[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('logs', 'by-timestamp');
  return all.reverse().slice(0, limit);
}

// ─── Bot State ────────────────────────────────────────────────────────────────

export const DEFAULT_BOT_STATE: BotState = {
  id: 'singleton',
  active: false,
  stats: {
    totalScanned: 0,
    totalMatched: 0,
    totalSent: 0,
    totalViewed: 0,
    totalInvited: 0,
  },
};

export async function getBotState(): Promise<BotState> {
  const db = await getDB();
  return (await db.get('botState', 'singleton')) ?? DEFAULT_BOT_STATE;
}

export async function saveBotState(state: BotState): Promise<void> {
  const db = await getDB();
  await db.put('botState', state);
}

export async function updateBotStats(
  delta: Partial<BotState['stats']>,
): Promise<void> {
  const state = await getBotState();
  await saveBotState({
    ...state,
    stats: {
      totalScanned: state.stats.totalScanned + (delta.totalScanned ?? 0),
      totalMatched: state.stats.totalMatched + (delta.totalMatched ?? 0),
      totalSent: state.stats.totalSent + (delta.totalSent ?? 0),
      totalViewed: state.stats.totalViewed + (delta.totalViewed ?? 0),
      totalInvited: state.stats.totalInvited + (delta.totalInvited ?? 0),
    },
  });
}
