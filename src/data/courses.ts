import type { Course, LessonPhase } from '../types';

export const LESSON_PHASES: LessonPhase[] = ['learn','duel','choice','recall','exam'];

export const courses: Course[] = [
  { id:'garten', order:1, title:'Garten und Balkon', subtitle:'Acht vertraute Stimmen direkt vor der Haustür.', icon:'⌂', habitat:'garden', voiceType:'song', lessonPhases:LESSON_PHASES, speciesIds:['amsel','rotkehlchen','kohlmeise','blaumeise','zaunkoenig','haussperling','heckenbraunelle','buchfink'] },
  { id:'stadtpark', order:2, title:'Park und Stadt', subtitle:'Finken, Schwärme und kluge Nachbarn.', icon:'◉', habitat:'park', voiceType:'mixed', lessonPhases:LESSON_PHASES, speciesIds:['gruenfink','stieglitz','star','ringeltaube','elster','rabenkraehe','dohle','moenchsgrasmuecke'] },
  { id:'waldzeichen', order:3, title:'Markante Waldstimmen', subtitle:'Rufe, Flöten und Trommeln mit großer Wiedererkennbarkeit.', icon:'♟', habitat:'forest', voiceType:'mixed', lessonPhases:LESSON_PHASES, speciesIds:['singdrossel','misteldrossel','kleiber','buntspecht','gruenpecht','eichelhaeher','waldkauz','kuckuck'] },
  { id:'waldvergleich', order:4, title:'Ähnliche Waldarten', subtitle:'Meisen, Baumläufer und Goldhähnchen auseinanderhalten.', icon:'≈', habitat:'forest', voiceType:'mixed', lessonPhases:LESSON_PHASES, speciesIds:['tannenmeise','sumpfmeise','weidenmeise','haubenmeise','schwanzmeise','waldbaumlaeufer','gartenbaumlaeufer','sommergoldhaehnchen','wintergoldhaehnchen'] },
  { id:'feldhecke', order:5, title:'Feld, Wiese und Hecke', subtitle:'Singflüge, kurze Heckenstrophen und ziehende Trupps.', icon:'⌁', habitat:'field', voiceType:'song', lessonPhases:LESSON_PHASES, speciesIds:['feldlerche','goldammer','feldsperling','dorngrasmuecke','neuntoeter','baumpieper','wiesenpieper','bachstelze'] },
  { id:'aue', order:6, title:'Aue, Schilf und Gewässer', subtitle:'Rhythmus und Imitationen aus Röhricht und Ufergehölz.', icon:'≋', habitat:'reed', voiceType:'mixed', lessonPhases:LESSON_PHASES, speciesIds:['nachtigall','teichrohrsaenger','sumpfrohrsaenger','schilfrohrsaenger','rohrammer','gebirgsstelze','pirol','fitis'] },
  { id:'zugvoegel', order:7, title:'Zugvögel und Saisonstimmen', subtitle:'Stimmen, die den Frühling ankündigen und wieder verstummen.', icon:'↗', habitat:'mixed', voiceType:'song', lessonPhases:LESSON_PHASES, speciesIds:['gartenrotschwanz','hausrotschwanz','grauschnaepper','trauerschnaepper','gelbspoetter','gartengrasmuecke','zilpzalp','sprosser','wacholderdrossel'] },
  { id:'rufmeister', order:8, title:'Rufe und Meistervergleiche', subtitle:'Kontakt, Alarm und die schwierigsten Verwechslungspaare.', icon:'◆', habitat:'mixed', voiceType:'call', lessonPhases:LESSON_PHASES, speciesIds:['gimpel','kolkrabe','nachtigall','sprosser','haussperling','feldsperling','sumpfmeise','weidenmeise','amsel','misteldrossel','gelbspoetter','sumpfrohrsaenger'] },
];

export const courseById = new Map(courses.map((course) => [course.id, course]));

