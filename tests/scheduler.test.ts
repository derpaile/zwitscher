import { describe, expect, it } from 'vitest';
import { applyReviewAnswer, emptyReview, gradeAnswer, masteryFromStep, reviewKey, REVIEW_INTERVAL_DAYS } from '../src/core/scheduler';

describe('Wiederholungsalgorithmus', () => {
  const now = Date.UTC(2026,6,19,8);

  it('führt saubere Antworten durch die festgelegten Intervalle', () => {
    let item = emptyReview('amsel','song',now);
    for (let step=1; step<REVIEW_INTERVAL_DAYS.length; step += 1) {
      item=applyReviewAnswer(item,true,false,now);
      expect(item.step).toBe(step);
      expect(item.dueAt).toBe(now+REVIEW_INTERVAL_DAYS[step]! * 86_400_000);
    }
  });

  it('behält bei einem Hinweis die Stufe und setzt einen Tag', () => {
    const learned={...emptyReview('amsel','song',now),step:4};
    const result=applyReviewAnswer(learned,true,true,now);
    expect(result.step).toBe(4); expect(result.dueAt).toBe(now+86_400_000); expect(gradeAnswer(true,true)).toBe(3);
  });

  it('setzt Fehler zurück und terminiert die Karte nach zehn Minuten', () => {
    const learned={...emptyReview('amsel','song',now),step:6};
    const result=applyReviewAnswer(learned,false,false,now);
    expect(result.step).toBe(0); expect(result.dueAt).toBe(now+600_000); expect(result.lapses).toBe(1);
  });

  it('führt Meisterschaft getrennt über Art und Lauttyp', () => {
    expect(reviewKey('amsel','song')).toBe('amsel:song');
    expect(reviewKey('amsel','call')).toBe('amsel:call');
    expect([0,1,3,5,7].map((step)=>masteryFromStep(step).label)).toEqual(['Unbekannt','Gehört','Erkannt','Sicher','Feldbereit']);
  });
});

