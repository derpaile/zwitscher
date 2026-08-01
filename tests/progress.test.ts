import { describe, expect, it } from 'vitest';
import { isCourseCompleted, rankedConfusionIds, recommendedContrast } from '../src/core/progress';

describe('Kursabschluss und Kontrastempfehlung', () => {
  it('schließt erst ab 80 Prozent und mit allen Arten auf Erkannt ab', () => {
    expect(isCourseCompleted(.8,[2,2,3])).toBe(true);
    expect(isCourseCompleted(.79,[4,4,4])).toBe(false);
    expect(isCourseCompleted(.95,[2,1,4])).toBe(false);
  });

  it('wählt häufigste Verwechslungen deterministisch für A/B-Lektionen', () => {
    expect(recommendedContrast({'fitis>zilpzalp':3,'amsel>singdrossel':5})).toEqual(['amsel','singdrossel']);
    expect(recommendedContrast({'fitis>zilpzalp':1})).toBeNull();
    expect(rankedConfusionIds('amsel',{'amsel>star':2,'amsel>misteldrossel':4,'amsel>singdrossel':4})).toEqual(['misteldrossel','singdrossel','star']);
  });
});
