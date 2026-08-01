import type { MasteryLabel, ReviewItem, VoiceType } from '../types';

export const REVIEW_INTERVAL_DAYS = [0, 1, 3, 7, 14, 30, 60, 120] as const;
const DAY = 86_400_000;
const TEN_MINUTES = 600_000;

export function reviewKey(speciesId: string, voiceType: VoiceType): string {
  return `${speciesId}:${voiceType}`;
}

export function emptyReview(speciesId: string, voiceType: VoiceType, now = Date.now()): ReviewItem {
  return { key:reviewKey(speciesId,voiceType), speciesId, voiceType, step:0, dueAt:now, correct:0, wrong:0, lapses:0, lastSeenAt:0, lastGrade:0 };
}

export function gradeAnswer(correct: boolean, hintUsed: boolean): 0 | 3 | 5 {
  if (!correct) return 0;
  return hintUsed ? 3 : 5;
}

export function applyReviewAnswer(item: ReviewItem, correct: boolean, hintUsed: boolean, now = Date.now()): ReviewItem {
  const grade = gradeAnswer(correct, hintUsed);
  if (!correct) {
    return { ...item, step:0, dueAt:now + TEN_MINUTES, wrong:item.wrong + 1, lapses:item.lapses + 1, lastSeenAt:now, lastGrade:grade };
  }
  if (hintUsed) {
    return { ...item, dueAt:now + DAY, correct:item.correct + 1, lastSeenAt:now, lastGrade:grade };
  }
  const step = Math.min(REVIEW_INTERVAL_DAYS.length - 1, item.step + 1);
  return { ...item, step, dueAt:now + REVIEW_INTERVAL_DAYS[step]! * DAY, correct:item.correct + 1, lastSeenAt:now, lastGrade:grade };
}

export function markExposure(item: ReviewItem, now = Date.now()): ReviewItem {
  if (item.step > 0) return item;
  return { ...item, step:1, dueAt:now + DAY, lastSeenAt:now, lastGrade:3 };
}

export function masteryFromStep(step: number): { level: 0 | 1 | 2 | 3 | 4; label: MasteryLabel } {
  if (step >= 7) return { level:4, label:'Feldbereit' };
  if (step >= 5) return { level:3, label:'Sicher' };
  if (step >= 3) return { level:2, label:'Erkannt' };
  if (step >= 1) return { level:1, label:'Gehört' };
  return { level:0, label:'Unbekannt' };
}

export function isDue(item: ReviewItem, now = Date.now()): boolean {
  return item.step > 0 && item.dueAt <= now;
}

export function reviewWeight(item: ReviewItem, now = Date.now()): number {
  const dueBoost = isDue(item, now) ? 5 : 0;
  return 1 + dueBoost + item.wrong * 1.5 + item.lapses * 2 + Math.max(0, 4 - item.step);
}

