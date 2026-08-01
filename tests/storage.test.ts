import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { defaultProfile, getDatabase, loadProfile, loadReviews, saveReview } from '../src/core/storage';
import { emptyReview } from '../src/core/scheduler';

describe('Lokaler Version-2-Speicher', () => {
  it('erstellt ein leeres Profil mit acht Kursständen', () => {
    const profile=defaultProfile(123);
    expect(profile.version).toBe(2); expect(profile.createdAt).toBe(123); expect(Object.keys(profile.courseProgress)).toHaveLength(8);
  });

  it('speichert Profil und getrennte Wiederholungskarten in IndexedDB', async () => {
    const profile=await loadProfile(); expect(profile.totalAnswers).toBe(0);
    const song=emptyReview('amsel','song'); const call=emptyReview('amsel','call');
    await saveReview(song); await saveReview(call);
    const reviews=await loadReviews();
    expect(reviews.map((item)=>item.key).sort()).toEqual(['amsel:call','amsel:song']);
  });

  it('enthält keine Sichtungs- oder Aufnahmebereiche', async () => {
    const stores=[...(await getDatabase()).objectStoreNames];
    expect(stores).not.toContain('journal'); expect(stores).not.toContain('journalMedia');
  });
});
