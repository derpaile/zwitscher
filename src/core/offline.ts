import { loadMediaManifest } from './media';
import { loadOfflineState, saveOfflineState } from './storage';
import type { OfflineState } from '../types';

export const MEDIA_CACHE = 'zwitscher-media-v2';

export class OfflineInstaller {
  private paused = false;
  pause(): void { this.paused = true; }

  async install(onProgress: (state: OfflineState) => void): Promise<OfflineState> {
    this.paused = false;
    const manifest = await loadMediaManifest();
    const media = [...manifest.photos, ...manifest.recordings];
    const urls = media.map((item) => item.src);
    const bytesByUrl = new Map(media.map((item) => [item.src,item.bytes]));
    let state = await loadOfflineState();
    if (!state || state.version !== manifest.version) {
      await caches.delete(MEDIA_CACHE);
      state = { version:manifest.version,cached:[],failed:[],total:urls.length,totalBytes:manifest.totalBytes,downloadedBytes:0,ready:false,paused:false };
    }
    const cache = await caches.open(MEDIA_CACHE);
    await cache.put('/media/manifest.json',new Response(JSON.stringify(manifest),{headers:{'content-type':'application/json'}}));
    const verified = await Promise.all(state.cached.map(async (url) => [url,Boolean(await cache.match(url))] as const));
    const done = new Set(verified.filter(([,exists]) => exists).map(([url]) => url));
    const failed = new Set<string>();
    const snapshot = (): OfflineState => {
      const downloadedBytes = [...done].reduce((sum,url) => sum + (bytesByUrl.get(url) ?? 0),0);
      return { version:manifest.version,cached:[...done],failed:[...failed],total:urls.length,totalBytes:manifest.totalBytes,downloadedBytes,paused:this.paused,ready:done.size===urls.length };
    };
    for (const url of urls) {
      if (this.paused) break;
      if (!done.has(url)) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(String(response.status));
          await cache.put(url,response.clone()); done.add(url); failed.delete(url);
        } catch { failed.add(url); }
      }
      state = snapshot();
      await saveOfflineState(state); onProgress(state);
    }
    state = snapshot();
    await saveOfflineState(state); onProgress(state);
    return state;
  }
}

export async function offlineSummary(): Promise<OfflineState> {
  const manifest = await loadMediaManifest();
  const stored = await loadOfflineState();
  const empty:OfflineState = { version:manifest.version,cached:[],failed:[],total:manifest.photos.length + manifest.recordings.length,totalBytes:manifest.totalBytes,downloadedBytes:0,ready:false,paused:false };
  if (!stored || stored.version !== manifest.version || !('caches' in window)) return empty;
  const cache = await caches.open(MEDIA_CACHE);
  const cached = (await Promise.all(stored.cached.map(async (url) => await cache.match(url) ? url : null))).filter((url):url is string=>Boolean(url));
  const bytesByUrl = new Map([...manifest.photos,...manifest.recordings].map((item)=>[item.src,item.bytes]));
  const downloadedBytes = cached.reduce((sum,url)=>sum+(bytesByUrl.get(url)??0),0);
  return { ...empty,...stored,cached,failed:stored.failed??[],downloadedBytes,ready:cached.length===empty.total };
}
