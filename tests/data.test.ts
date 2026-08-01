import { describe, expect, it } from 'vitest';
import { courses } from '../src/data/courses';
import { species } from '../src/data/species';
import { seededRandom, shuffle } from '../src/ui/components';

const additions=['tannenmeise','gartenbaumlaeufer','heckenbraunelle','grauschnaepper','trauerschnaepper','gelbspoetter','sprosser','teichrohrsaenger','sumpfrohrsaenger','schilfrohrsaenger','rohrammer','baumpieper','wiesenpieper','bachstelze','gebirgsstelze','neuntoeter','eichelhaeher','elster','rabenkraehe','dohle','kolkrabe','buntspecht','gruenpecht','waldkauz'];

describe('Katalog und Kurse', () => {
  it('enthält genau 60 eindeutige Arten und alle 24 Ergänzungen', () => {
    const ids=species.map((bird)=>bird.id);
    expect(ids).toHaveLength(60); expect(new Set(ids).size).toBe(60);
    expect(additions.every((id)=>ids.includes(id))).toBe(true);
    expect(species.every((bird)=>bird.confusions.every((id)=>ids.includes(id)))).toBe(true);
  });

  it('enthält acht vollständige Hybridkurse mit gültigen Referenzen', () => {
    const ids=new Set(species.map((bird)=>bird.id));
    expect(courses).toHaveLength(8);
    for(const course of courses){expect(course.lessonPhases).toEqual(['learn','duel','choice','recall','exam']);expect(course.speciesIds.length).toBeGreaterThanOrEqual(8);expect(course.speciesIds.every((id)=>ids.has(id))).toBe(true);}
    expect(new Set(courses.flatMap((course)=>course.speciesIds))).toEqual(ids);
  });

  it('erzeugt eine deterministische Tagesauswahl', () => {
    const first=shuffle(species,seededRandom('2026-07-19')).slice(0,5).map((bird)=>bird.id);
    const second=shuffle(species,seededRandom('2026-07-19')).slice(0,5).map((bird)=>bird.id);
    expect(first).toEqual(second);
  });
});
