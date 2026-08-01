import type { HabitatId, RegionId, Species, VoiceType } from '../types';

type RawSpecies = [
  id: string,
  name: string,
  scientificName: string,
  habitats: HabitatId[],
  difficulty: 1 | 2 | 3,
  songTip: string,
  callTip: string,
  confusions?: string[],
  fact?: string,
];

const RAW: RawSpecies[] = [
  ['amsel','Amsel','Turdus merula',['garden','park','forest'],1,'Warme, ruhige Flötenstrophen mit kleinen improvisierten Pausen.','Hartes, schnell wiederholtes „tix-tix“ oder aufgeregtes Zetern.',['misteldrossel'],'Singt häufig von Dachfirsten und hohen Baumspitzen.'],
  ['rotkehlchen','Rotkehlchen','Erithacus rubecula',['garden','park','forest'],1,'Sehr feine, perlende Töne ohne festen Rhythmus.','Dünnes, scharfes „tick“, oft in schneller Folge.',['nachtigall'],'Singt auch im Herbst und Winter und verteidigt ganzjährig sein Revier.'],
  ['kohlmeise','Kohlmeise','Parus major',['garden','park','forest'],1,'Klare Zwei- oder Dreisilber im strengen „zi-zi-bäh“-Takt.','Breites Repertoire; typisch ist ein kräftiges „pink“.',['blaumeise','tannenmeise'],'Kann zahlreiche Varianten und sogar andere Arten nachahmen.'],
  ['blaumeise','Blaumeise','Cyanistes caeruleus',['garden','park','forest'],1,'Hohe Auftakttöne enden in einer feinen klingelnden Kaskade.','Hell und zeternd, feiner als die Kohlmeise.',['kohlmeise','tannenmeise'],'Ist klein, wendig und bevorzugt dünne Zweige.'],
  ['zaunkoenig','Zaunkönig','Troglodytes troglodytes',['garden','forest','water'],1,'Überraschend laute, hektische Strophe mit markanter Schnarrrolle.','Kurzes hartes „tek-tek“ aus dichtem Gebüsch.',['heckenbraunelle'],'Einer der kleinsten heimischen Vögel singt außerordentlich laut.'],
  ['nachtigall','Nachtigall','Luscinia megarhynchos',['park','forest','water'],2,'Lange ansteigende Pfiffe wechseln mit explosiven Tonkaskaden.','Raues, tiefes Warnen aus dichtem Unterholz.',['sprosser','rotkehlchen'],'Berühmt für ihren variablen Nachtgesang.'],
  ['buchfink','Buchfink','Fringilla coelebs',['garden','park','forest'],1,'Abwärts rollende Tonkaskade mit kräftigem Schluss-Haken.','Metallisches „pink“ und im Flug ein weiches „jüp“.',['gruenfink'],'Der sogenannte Finkenschlag ist regional leicht verschieden.'],
  ['gruenfink','Grünfink','Chloris chloris',['garden','park','field'],1,'Klingelnde Reihen wechseln mit gedehntem, nasalem „dschwää“.','Kräftiges „dschüp“, oft aus einem Trupp.',['stieglitz','buchfink'],'Sein quietschender Ton ist auch im Singflug gut hörbar.'],
  ['stieglitz','Stieglitz','Carduelis carduelis',['garden','park','field'],2,'Hektisches helles Zwitschern mit namensgebendem „stiglit“.','Flüssiges „didelit“ im wellenförmigen Flug.',['gruenfink'],'Sucht gern Samenstände von Disteln und Karden ab.'],
  ['gimpel','Gimpel','Pyrrhula pyrrhula',['garden','forest'],2,'Leise, etwas knarrende Folge aus weichen Pfeiftönen.','Sanftes, melancholisches „djüh“.',[],'Paare bleiben oft eng zusammen und rufen sich leise.'],
  ['haussperling','Haussperling','Passer domesticus',['garden','park'],1,'Folge kräftiger, etwas heiserer „tschilp“-Silben.','Kurze „tschilp“- und „terrett“-Rufe aus der Gruppe.',['feldsperling'],'Lebt eng mit Menschen zusammen und brütet an Gebäuden.'],
  ['feldsperling','Feldsperling','Passer montanus',['garden','field'],2,'Heller, härter und einsilbiger als der Haussperling.','Kurzes „tek“ oder helles „tschilp“.',['haussperling'],'Sein schwarzer Wangenfleck unterscheidet ihn vom Haussperling.'],
  ['star','Star','Sturnus vulgaris',['garden','park','field'],1,'Pfeifen, Knarzen, Klicken und imitierte Fremdlaute.','Raues „schärr“ und kurze metallische Rufe.',['amsel'],'Ein virtuoser Stimmenimitator mit schillerndem Gefieder.'],
  ['singdrossel','Singdrossel','Turdus philomelos',['park','forest'],2,'Jedes Motiv wird zwei- bis viermal wiederholt, dann folgt ein neues.','Sehr dünnes „zip“ im Flug, bei Alarm scharfes Zetern.',['misteldrossel','amsel'],'Die regelmäßige Motivwiederholung ist ihr bester Hörschlüssel.'],
  ['misteldrossel','Misteldrossel','Turdus viscivorus',['park','forest','field'],3,'Kurze, laute Flötenstrophen, kräftiger und gleichförmiger als die Amsel.','Trocken schnarrendes „trrr“ im Flug.',['amsel','singdrossel'],'Singt selbst bei windigem und regnerischem Wetter.'],
  ['wacholderdrossel','Wacholderdrossel','Turdus pilaris',['park','field'],2,'Schwatzende, raue Strophe ohne klare Flötenmelodie.','Trockenes „schack-schack-schack“.',['misteldrossel'],'Brütet oft in lockeren Kolonien und verteidigt diese gemeinsam.'],
  ['moenchsgrasmuecke','Mönchsgrasmücke','Sylvia atricapilla',['garden','park','forest'],2,'Leises Murmeln steigert sich zu einem klaren Flötenjubel.','Hartes, tiefes „täck“ aus dichtem Gebüsch.',['gartengrasmuecke'],'Der laute flötende Überschlag beendet meist die Strophe.'],
  ['gartengrasmuecke','Gartengrasmücke','Sylvia borin',['garden','forest','water'],3,'Gleichmäßig plätschernder Wortschwall ohne lauten Flötenschluss.','Raues „tschäck“, ähnlich anderen Grasmücken.',['moenchsgrasmuecke'],'Unauffällig gefärbt und fast immer im dichten Laub verborgen.'],
  ['dorngrasmuecke','Dorngrasmücke','Curruca communis',['field','garden'],2,'Kurze, kratzig-fröhliche Strophe wie ein hastig gesprochener Satz.','Raues, nasales „wäd-wäd“.',['gartengrasmuecke'],'Singt gern von der Spitze einer Hecke oder im kurzen Singflug.'],
  ['zilpzalp','Zilpzalp','Phylloscopus collybita',['garden','forest','water'],1,'Abwechselnde trockene „zilp-zalp“-Töne wie ein Metronom.','Weiches, ansteigendes „hüit“.',['fitis'],'Sein deutscher Name gibt den Gesang direkt wieder.'],
  ['fitis','Fitis','Phylloscopus trochilus',['forest','water','field'],2,'Weiche Tonleiter, die am Ende müde nach unten rieselt.','Zweisilbig ansteigendes „hü-id“.',['zilpzalp'],'Sieht dem Zilpzalp sehr ähnlich, klingt aber völlig anders.'],
  ['sommergoldhaehnchen','Sommergoldhähnchen','Regulus ignicapilla',['forest','park'],3,'Sehr hohe Reihe, die zum Ende schneller und betonter wird.','Extrem hohes, dünnes „si-si-si“.',['wintergoldhaehnchen'],'Trägt einen auffälligen weißen Überaugenstreif.'],
  ['wintergoldhaehnchen','Wintergoldhähnchen','Regulus regulus',['forest'],3,'Mehrere höchste „si“-Töne mit kurzem verschnörkeltem Abschluss.','Sehr feines, gleichmäßiges „sri-sri“.',['sommergoldhaehnchen'],'Der kleinste Vogel Europas lebt bevorzugt in Nadelwäldern.'],
  ['goldammer','Goldammer','Emberiza citrinella',['field','garden'],1,'Mehrere kurze Töne und ein langer Schluss: „wie hab ich dich lieb“.','Kurzes, scharfes „zitt“.',['rohrammer'],'Singt häufig exponiert von Hecken und Leitungen.'],
  ['feldlerche','Feldlerche','Alauda arvensis',['field'],1,'Endloser heller Strom aus Trillern und Rollen hoch aus der Luft.','Trockenes „trrli“ im Flug.',['baumpieper'],'Der ausdauernde Singflug kann mehrere Minuten dauern.'],
  ['hausrotschwanz','Hausrotschwanz','Phoenicurus ochruros',['garden','park','mountain'],2,'Heller Auftakt, knirschende Papierknäuel-Passage, knapper Schluss.','Kurzes „hüit-täck“.',['gartenrotschwanz'],'Singt schon vor Sonnenaufgang von Dächern und Antennen.'],
  ['gartenrotschwanz','Gartenrotschwanz','Phoenicurus phoenicurus',['garden','park','forest'],3,'Gedehnter gleicher Beginn, danach variable kurze Zwitscherfolge.','Weiches „hüit“ mit trockenem „tick“.',['hausrotschwanz'],'Benötigt alte Bäume mit Höhlen und offene Bodenflächen.'],
  ['kleiber','Kleiber','Sitta europaea',['park','forest'],1,'Weit tragende „wiit“-Pfiffe oder schnell perlende Pfeifreihe.','Kräftiges „twett“ und aufgeregtes Trillern.',['waldbaumlaeufer','gartenbaumlaeufer'],'Kann als einziger heimischer Vogel kopfüber am Stamm abwärts laufen.'],
  ['waldbaumlaeufer','Waldbaumläufer','Certhia familiaris',['forest'],3,'Sehr hohe fallende Tonreihe mit dünnem Triller am Ende.','Hohes, feines „srii“.',['gartenbaumlaeufer','kleiber'],'Klettert spiralförmig an Stämmen empor und fliegt zum nächsten Stammfuß.'],
  ['sumpfmeise','Sumpfmeise','Poecile palustris',['forest','water'],3,'Schnelle Reihe gleich hoher, harter „tjip“-Töne.','Explosives „pitjäh“.',['weidenmeise','tannenmeise'],'Klang und glänzende schwarze Kappe helfen bei der Bestimmung.'],
  ['weidenmeise','Weidenmeise','Poecile montanus',['forest','water'],3,'Mehrere lang gezogene, traurige „düüh“-Töne.','Nasales, gedehntes „dääh-dääh“.',['sumpfmeise'],'Bevorzugt feuchte Wälder und meißelt oft selbst eine Bruthöhle.'],
  ['haubenmeise','Haubenmeise','Lophophanes cristatus',['forest'],2,'Hohe Meisenlaute mit trockenem rollendem „gürrr“.','Raues, schnurrendes „brrr“.',['tannenmeise'],'Ihre spitze Federhaube ist unverkennbar.'],
  ['schwanzmeise','Schwanzmeise','Aegithalos caudatus',['garden','forest','water'],2,'Kein ausgeprägter Gesang, sondern feine Rufe im Trupp.','Sehr hohes „sriih“ und kurzes trockenes „trr“.',[],'Außerhalb der Brutzeit zieht sie fast immer in Familiengruppen umher.'],
  ['pirol','Pirol','Oriolus oriolus',['forest','water'],1,'Voller exotischer Flötenruf „düdlioh“.','Heiserer, häherähnlicher Alarmruf.',['amsel'],'Der leuchtend gelbe Vogel bleibt meist hoch im Blätterdach verborgen.'],
  ['kuckuck','Kuckuck','Cuculus canorus',['forest','field','water'],1,'Der zweisilbige Name ist der Ruf: „ku-kuck“.','Das Weibchen ruft schnell perlend und ganz anders.',['ringeltaube'],'Legt seine Eier in die Nester anderer Vogelarten.'],
  ['ringeltaube','Ringeltaube','Columba palumbus',['garden','park','forest','field'],1,'Hohle fünfteilige Strophe mit scheinbar fehlendem Schlussschlag.','Explosives Flügelklatschen beim Balzflug.',['kuckuck'],'Die größte heimische Taube trägt einen weißen Halsfleck.'],
  ['tannenmeise','Tannenmeise','Periparus ater',['forest','park'],2,'Hohes, schnelles „wize-wize-wize“, gleichmäßiger als die Kohlmeise.','Feines „si-si“ und dünnes Trillern.',['kohlmeise','sumpfmeise'],'Typisch für Nadelwälder und an weißem Nackenfleck erkennbar.'],
  ['gartenbaumlaeufer','Gartenbaumläufer','Certhia brachydactyla',['garden','park','forest'],3,'Kurze helle Strophe, die rhythmisch mit „ti-ti-tiroiti“ endet.','Lautes, durchdringendes „tüüt“.',['waldbaumlaeufer'],'Bevorzugt Laubwälder, Parks und alte Obstgärten.'],
  ['heckenbraunelle','Heckenbraunelle','Prunella modularis',['garden','park','forest'],2,'Kurzes helles, etwas hastiges Rieseln ohne feste Pointe.','Sehr hohes dünnes „tih“.',['zaunkoenig'],'Singt oft frei auf einer Spitze, sucht Nahrung aber verborgen am Boden.'],
  ['grauschnaepper','Grauschnäpper','Muscicapa striata',['garden','park','forest'],3,'Sehr leise Folge aus rauen „zri“- und „sip“-Lauten.','Scharfes, dünnes „zrii“.',['trauerschnaepper'],'Jagt Insekten von einer festen Warte und kehrt dorthin zurück.'],
  ['trauerschnaepper','Trauerschnäpper','Ficedula hypoleuca',['forest','park'],3,'Kurze klare Strophen mit wechselnden hellen und rauen Elementen.','Helles „wit“ oder klickendes „tek“.',['grauschnaepper'],'Ein Höhlenbrüter, der erst im April aus Afrika zurückkehrt.'],
  ['gelbspoetter','Gelbspötter','Hippolais icterina',['garden','park','water'],3,'Rasantes Spotten mit Imitationen, Quietschen und nasalen Lauten.','Kräftiges, rollendes „tä-tä-hüit“.',['sumpfrohrsaenger'],'Versteckt sich trotz seines lauten Gesangs meist im Laub.'],
  ['sprosser','Sprosser','Luscinia luscinia',['water','forest'],3,'Kräftige, dunklere Strophen mit hartem Schnarren und Trommeln.','Raues, tiefes Warnen.',['nachtigall'],'Ersetzt die Nachtigall vor allem im Nordosten Deutschlands.'],
  ['teichrohrsaenger','Teichrohrsänger','Acrocephalus scirpaceus',['reed','water'],2,'Rhythmisches „tiri-tiri-karre-karre“ aus dem Schilf.','Raues „tscharr“.',['sumpfrohrsaenger','schilfrohrsaenger'],'Klettert geschickt zwischen senkrechten Schilfhalmen.'],
  ['sumpfrohrsaenger','Sumpfrohrsänger','Acrocephalus palustris',['water','reed','field'],3,'Sehr variabel, schnell und voller täuschend echter Imitationen.','Raues kurzes „tschäck“.',['teichrohrsaenger','gelbspoetter'],'Imitiert auf dem Zug auch afrikanische Vogelarten.'],
  ['schilfrohrsaenger','Schilfrohrsänger','Acrocephalus schoenobaenus',['reed','water'],3,'Raues Schwatzen mit pfeifenden Einschüben und beschleunigten Passagen.','Hartes „tek“ und raues „tscharr“.',['teichrohrsaenger'],'Steigt bei der Balz oft kurz singend über das Schilf.'],
  ['rohrammer','Rohrammer','Emberiza schoeniclus',['reed','water','field'],2,'Schlichte langsame Folge „zi-zi-zrüü“.','Dünnes, langgezogenes „zieh“.',['goldammer'],'Das Männchen trägt im Frühjahr einen schwarzen Kopf.'],
  ['baumpieper','Baumpieper','Anthus trivialis',['field','forest'],2,'Beschleunigt im Singflug und endet beim Herabgleiten mit gedehnten Tönen.','Hohes, raues „zist“.',['wiesenpieper','feldlerche'],'Startet seinen Singflug typischerweise von einem Baum.'],
  ['wiesenpieper','Wiesenpieper','Anthus pratensis',['field','water'],3,'Feine wiederholte Töne, im Sinkflug schneller werdend.','Dünnes „ist-ist-ist“ im Flug.',['baumpieper'],'Bewohnt offene feuchte Wiesen und Moore.'],
  ['bachstelze','Bachstelze','Motacilla alba',['garden','field','water'],1,'Kurze zwitschernde Folge, meist weniger auffällig als ihre Rufe.','Zweisilbiges „zi-litt“ im wellenförmigen Flug.',['gebirgsstelze'],'Wippt fast ununterbrochen mit ihrem langen Schwanz.'],
  ['gebirgsstelze','Gebirgsstelze','Motacilla cinerea',['water','mountain'],2,'Kurze, scharfe Strophen mit metallischen Elementen.','Hohes, hartes „ziss-ziss“.',['bachstelze'],'Lebt an schnell fließenden Bächen, auch mitten in Städten.'],
  ['neuntoeter','Neuntöter','Lanius collurio',['field','garden'],3,'Leises schwätzendes Singen mit vielen Imitationen.','Raues „tschäck“ und schnarrende Warnrufe.',['dorngrasmuecke'],'Spießt Beute gelegentlich als Vorrat auf Dornen.'],
  ['eichelhaeher','Eichelhäher','Garrulus glandarius',['forest','park'],1,'Leises abwechslungsreiches Schwätzen mit zahlreichen Imitationen.','Lautes, raues „rätsch“.',['rabenkraehe'],'Warnt mit seinem durchdringenden Ruf den ganzen Wald.'],
  ['elster','Elster','Pica pica',['garden','park','field'],1,'Leises plauderndes Subsong-Repertoire.','Schnelles hartes Schackern.',['rabenkraehe'],'Lebt zunehmend in Städten und baut große überdachte Nester.'],
  ['rabenkraehe','Rabenkrähe','Corvus corone',['garden','park','field'],1,'Raues, schlichtes Rufen statt melodischem Gesang.','Kräftiges, heiseres „krah“.',['dohle','kolkrabe'],'Sehr intelligent und vielseitig bei Nahrungssuche und Werkzeuggebrauch.'],
  ['dohle','Dohle','Coloeus monedula',['park','field','mountain'],2,'Gesellige Folge kurzer Kontaktlaute.','Helles, metallisches „kja“.',['rabenkraehe'],'Brütet in Kolonien an Türmen, Felsen und alten Bäumen.'],
  ['kolkrabe','Kolkrabe','Corvus corax',['forest','field','mountain'],2,'Tiefe, variable Rufe und erstaunlich leise plaudernde Passagen.','Sehr tiefes, rollendes „krronk“.',['rabenkraehe'],'Der größte Singvogel der Welt bildet oft lebenslange Paare.'],
  ['buntspecht','Buntspecht','Dendrocopos major',['garden','park','forest'],1,'Kurze Trommelwirbel mit abruptem Ende.','Lautes, hartes „kix“.',['gruenpecht'],'Der häufigste heimische Specht besucht auch Futterstellen.'],
  ['gruenpecht','Grünspecht','Picus viridis',['garden','park','forest','field'],1,'Lachende, leicht abfallende „klü-klü-klü“-Reihe.','Einzelnes kräftiges „klü“.',['buntspecht'],'Sucht am Boden vor allem nach Ameisen.'],
  ['waldkauz','Waldkauz','Strix aluco',['park','forest'],1,'Langgezogenes „huu-hu-huhuhuu“ des Männchens.','Scharfes „kuwitt“ als Kontakt- und Warnruf.',['ringeltaube'],'Die klassische nächtliche Eulenstimme ist auch in Stadtparks zu hören.'],
];

const ALL_MONTHS = [1,2,3,4,5,6,7,8,9,10,11,12];
const SUMMER_MONTHS = [4,5,6,7,8,9];
const MIGRANTS = new Set(['nachtigall','fitis','dorngrasmuecke','gartengrasmuecke','pirol','kuckuck','gartenrotschwanz','grauschnaepper','trauerschnaepper','gelbspoetter','sprosser','teichrohrsaenger','sumpfrohrsaenger','schilfrohrsaenger','baumpieper','neuntoeter']);
const NORTH = new Set(['sprosser','weidenmeise','wacholderdrossel']);
const SOUTH = new Set(['sommergoldhaehnchen','pirol','gartenrotschwanz','gebirgsstelze']);
const SPECIAL_VOICES: Record<string, VoiceType[]> = {
  buntspecht: ['drumming','call'],
  gruenpecht: ['call','flight'],
  waldkauz: ['call','alarm'],
  schwanzmeise: ['call','flight'],
  rabenkraehe: ['call','alarm'],
  eichelhaeher: ['call','alarm'],
  elster: ['call','alarm'],
  dohle: ['call','flight'],
  kolkrabe: ['call','alarm'],
};
const PALETTES: Array<[string,string,string,string]> = [
  ['#75563f','#433a32','#e68a49','#eee3d0'], ['#526c55','#263c32','#d2df72','#eee8d8'],
  ['#6d7684','#313b48','#d7a453','#eee7dc'], ['#9a704e','#694c39','#c89c72','#efe1cb'],
  ['#465d6d','#263743','#8fc1d6','#f0eadb'], ['#626248','#333b2d','#d5c85b','#ece6cf'],
];

function markFor(id: string): Species['illustration']['mark'] {
  if (['haubenmeise','sommergoldhaehnchen','wintergoldhaehnchen'].includes(id)) return 'crest';
  if (id === 'schwanzmeise') return 'long-tail';
  if (['rotkehlchen','gimpel'].includes(id)) return 'red-chest';
  if (['waldbaumlaeufer','gartenbaumlaeufer','pirol'].includes(id)) return 'long-beak';
  return undefined;
}

export const species: Species[] = RAW.map((row, index) => {
  const [id,name,scientificName,habitats,difficulty,songTip,callTip,confusions = [],fact = 'Eine charakteristische heimische Vogelart.'] = row;
  let regions: RegionId[] = ['north','central','south'];
  if (NORTH.has(id)) regions = ['north','central'];
  if (SOUTH.has(id)) regions = ['central','south'];
  return {
    id,name,scientificName,habitats,difficulty,songTip,callTip,confusions,fact,regions,
    activeMonths: MIGRANTS.has(id) ? SUMMER_MONTHS : ALL_MONTHS,
    voiceTypes: SPECIAL_VOICES[id] ?? ['song','call'],
    illustration: { palette: PALETTES[index % PALETTES.length]!, mark: markFor(id) },
    photo: `/media/photos/${id}.webp`,
  };
});

export const speciesById = new Map(species.map((bird) => [bird.id, bird]));
