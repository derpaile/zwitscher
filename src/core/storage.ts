import { deleteDB, openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { gzipSync, gunzipSync, strFromU8, strToU8 } from 'fflate';
import { courses } from '../data/courses';
import type { BackupPayload, OfflineState, Profile, ReviewItem, SessionResult } from '../types';

interface ZwitscherDB extends DBSchema {
  profile: { key: 'main'; value: Profile };
  reviews: { key: string; value: ReviewItem; indexes: { 'by-due': number; 'by-species': string } };
  sessions: { key: string; value: SessionResult; indexes: { 'by-finished': number } };
  content: { key: string; value: OfflineState };
}

let databasePromise: Promise<IDBPDatabase<ZwitscherDB>> | null = null;

export function defaultProfile(now = Date.now()): Profile {
  return {
    version:2, createdAt:now, dailyGoal:10, dailyStreak:0, lastDailyDate:'', recommendedCourseId:courses[0]!.id,
    placementCourseId:null, totalCorrect:0, totalAnswers:0, bestStreak:0, achievements:[], confusions:{},
    courseProgress:Object.fromEntries(courses.map((course) => [course.id,{ examBest:0, completed:false, completedPhases:[] }])),
    settings:{ region:'all', seasonal:false, spatialAudio:true, relaxed:false, contrast:false, largeText:false, reducedMotion:false, weather:'breeze' },
  };
}

export function getDatabase(): Promise<IDBPDatabase<ZwitscherDB>> {
  databasePromise ??= openDB<ZwitscherDB>('zwitscher-v2', 2, {
    upgrade(database,oldVersion) {
      if (oldVersion < 1) {
        database.createObjectStore('profile');
        const reviews = database.createObjectStore('reviews', { keyPath:'key' });
        reviews.createIndex('by-due','dueAt'); reviews.createIndex('by-species','speciesId');
        const sessions = database.createObjectStore('sessions', { keyPath:'id' });
        sessions.createIndex('by-finished','finishedAt');
        database.createObjectStore('content');
      }
      const legacyDatabase = database as unknown as IDBDatabase;
      if (legacyDatabase.objectStoreNames.contains('journal')) legacyDatabase.deleteObjectStore('journal');
      if (legacyDatabase.objectStoreNames.contains('journalMedia')) legacyDatabase.deleteObjectStore('journalMedia');
    },
  });
  return databasePromise;
}

export async function hasLegacyData(): Promise<boolean> {
  if (Object.keys(localStorage).some((key) => key === 'zwitscher-progress' || key.startsWith('zwitscher-offline-'))) return true;
  try {
    if ((await indexedDB.databases()).some((database) => database.name === 'zwitscher-media')) return true;
  } catch { /* Safari erkennt den Altbestand über localStorage. */ }
  try { return (await caches.keys()).some((name) => name === 'zwitscher-audio-v1' || name.startsWith('zwitscher-core-')); }
  catch { return false; }
}

export async function resetLegacyData(): Promise<Profile> {
  Object.keys(localStorage).filter((key) => key.startsWith('zwitscher-')).forEach((key) => localStorage.removeItem(key));
  await deleteDB('zwitscher-media').catch(() => undefined);
  if ('caches' in window) {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.includes('zwitscher')).map((name) => caches.delete(name)));
  }
  const db = await getDatabase();
  const stores = ['profile','reviews','sessions','content'] as const;
  await Promise.all(stores.map((store) => db.clear(store)));
  const profile = defaultProfile();
  await db.put('profile', profile, 'main');
  localStorage.setItem('zwitscher-v2-reset-complete','1');
  return profile;
}

export async function loadProfile(): Promise<Profile> {
  const db = await getDatabase();
  const existing = await db.get('profile','main');
  if (existing) return existing;
  const profile = defaultProfile();
  await db.put('profile',profile,'main');
  return profile;
}

export async function saveProfile(profile: Profile): Promise<void> { await (await getDatabase()).put('profile',profile,'main'); }
export async function loadReviews(): Promise<ReviewItem[]> { return (await getDatabase()).getAll('reviews'); }
export async function saveReview(review: ReviewItem): Promise<void> { await (await getDatabase()).put('reviews',review); }
export async function saveReviews(reviews: ReviewItem[]): Promise<void> {
  const db = await getDatabase(); const transaction = db.transaction('reviews','readwrite');
  await Promise.all([...reviews.map((review) => transaction.store.put(review)), transaction.done]);
}
export async function saveSession(session: SessionResult): Promise<void> { await (await getDatabase()).put('sessions',session); }
export async function loadSessions(): Promise<SessionResult[]> { return (await getDatabase()).getAll('sessions'); }
export async function loadOfflineState(): Promise<OfflineState | undefined> { return (await getDatabase()).get('content','offline'); }
export async function saveOfflineState(state: OfflineState): Promise<void> { await (await getDatabase()).put('content',state,'offline'); }

export async function createBackup(): Promise<Blob> {
  const [profile,reviews,sessions] = await Promise.all([loadProfile(),loadReviews(),loadSessions()]);
  const payload: BackupPayload = { format:'zwitscher-backup',version:2,exportedAt:new Date().toISOString(),profile,reviews,sessions };
  return new Blob([gzipSync(strToU8(JSON.stringify(payload)))],{type:'application/gzip'});
}

export async function restoreBackup(file: File): Promise<void> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const payload = JSON.parse(strFromU8(gunzipSync(bytes))) as BackupPayload;
  if (payload.format !== 'zwitscher-backup' || payload.version !== 2 || payload.profile?.version !== 2 || !Array.isArray(payload.reviews) || !Array.isArray(payload.sessions)) throw new Error('Ungültige Zwitscher-Sicherung');
  const db = await getDatabase();
  const transaction = db.transaction(['profile','reviews','sessions'],'readwrite');
  await Promise.all(['profile','reviews','sessions'].map((store) => transaction.objectStore(store as 'profile').clear()));
  await transaction.objectStore('profile').put(payload.profile,'main');
  for (const review of payload.reviews) await transaction.objectStore('reviews').put(review);
  for (const session of payload.sessions) await transaction.objectStore('sessions').put(session);
  await transaction.done;
}
