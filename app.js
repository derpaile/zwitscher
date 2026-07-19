const commonsFile = (file) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
const commonsPage = (file) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file).replaceAll('%20', '_')}`;

const birds = [
  {
    id: 'amsel',
    name: 'Amsel',
    latin: 'Turdus merula',
    file: 'Turdus merula male song at dawn(20s).ogg',
    credit: 'FoeNyx · CC BY-SA',
    fact: 'Die Amsel singt oft von Dachfirsten und Baumspitzen. Jede Strophe klingt ein wenig anders.',
    tip: 'Achte auf ruhige, warme Flötentöne mit kurzen Pausen – wie ein Musiker, der improvisiert.',
    hint: 'Der Gesang klingt voll, flötend und gemütlich. Die Art sitzt gern gut sichtbar ganz oben.',
    habitat: 'Gärten · Parks · Wälder',
    colors: ['#252b2a', '#161b1a', '#f2a33b', '#f3ddbd'],
    bg: '#e8d9bd',
  },
  {
    id: 'rotkehlchen',
    name: 'Rotkehlchen',
    latin: 'Erithacus rubecula',
    file: 'Erithacus rubecula.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Rotkehlchen singen auch im Herbst und Winter. Ihr Gesang wirkt fein, perlend und etwas melancholisch.',
    tip: 'Stell dir winzige Glasperlen vor, die über eine Treppe rollen: hell, zart und unregelmäßig.',
    hint: 'Viele sehr feine, hohe Töne perlen frei durcheinander – ohne festen Rhythmus.',
    habitat: 'Hecken · Gärten · Unterholz',
    colors: ['#99765c', '#725641', '#e8783f', '#f3e8d5'],
    bg: '#eadcc9',
  },
  {
    id: 'kohlmeise',
    name: 'Kohlmeise',
    latin: 'Parus major',
    file: 'Parus major song.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Kohlmeisen besitzen ein erstaunlich großes Repertoire. Ihr typischer Ruf besteht aus klaren Wiederholungen.',
    tip: '„Zizibäh, zizibäh“ – zwei bis drei saubere Silben, immer wieder im gleichen Takt.',
    hint: 'Ein kurzer, metallisch klarer Zwei- oder Dreisilber wird streng rhythmisch wiederholt.',
    habitat: 'Wälder · Parks · Siedlungen',
    colors: ['#292f2c', '#151a18', '#d5d94d', '#f5f2dc'],
    bg: '#e6e6b7',
  },
  {
    id: 'blaumeise',
    name: 'Blaumeise',
    latin: 'Cyanistes caeruleus',
    file: 'Cyanistes caeruleus.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Die Blaumeise klingt feiner als die Kohlmeise. Häufig beginnt sie mit hohen Tönen und endet in einem Triller.',
    tip: 'Höre auf „zi-zi-zirrrr“: erst zwei helle Pfiffe, dann eine kleine klingelnde Kaskade.',
    hint: 'Sehr hoch und hell: Nach einzelnen Auftakttönen folgt meist ein schneller Triller.',
    habitat: 'Laubwald · Gärten · Parks',
    colors: ['#4b79a7', '#2e5c8c', '#d7d95a', '#f1edcf'],
    bg: '#d7e8e8',
  },
  {
    id: 'zaunkoenig',
    name: 'Zaunkönig',
    latin: 'Troglodytes troglodytes',
    file: 'Troglodytes troglodytes song.ogg',
    credit: 'Grantus4504 · CC BY-SA 3.0',
    fact: 'Einer der kleinsten heimischen Vögel singt verblüffend laut. Sein aufgestellter Schwanz ist unverkennbar.',
    tip: 'Klein, aber kraftvoll: eine rasante Folge mit einem deutlich schnarrenden Triller in der Mitte.',
    hint: 'Der Vortrag ist überraschend laut, hektisch und enthält fast immer eine kleine Schnarrrolle.',
    habitat: 'Gebüsch · Bachufer · Totholz',
    colors: ['#9a704e', '#765039', '#c69b70', '#efe1cb'],
    bg: '#e9d8c7',
  },
  {
    id: 'nachtigall',
    name: 'Nachtigall',
    latin: 'Luscinia megarhynchos',
    file: 'Nightingale (Luscinia megarhynchos).ogg',
    credit: 'Helical gear · CC BY-SA 3.0',
    fact: 'Die Nachtigall trägt hunderte Strophentypen vor – nicht nur nachts, sondern auch am Tag.',
    tip: 'Achte auf lange, ansteigende Pfeiftöne und plötzlich losbrechende, virtuose Tonkaskaden.',
    hint: 'Auf einzelne gedehnte Pfeiftöne folgen explosionsartig schnelle und sehr abwechslungsreiche Strophen.',
    habitat: 'Dichtes Gebüsch · Auen · Waldränder',
    colors: ['#8c6a4e', '#664a37', '#b89671', '#efe3d3'],
    bg: '#ded8c9',
  },
  {
    id: 'buchfink',
    name: 'Buchfink',
    latin: 'Fringilla coelebs',
    file: 'Fringilla coelebs - Common Chaffinch XC108344.mp3',
    credit: 'Wikimedia Commons · Lizenzdetails',
    fact: 'Der Buchfink gehört zu den häufigsten Brutvögeln Mitteleuropas. Sein kurzer Gesang endet meist mit einem kräftigen Schnörkel.',
    tip: 'Eine abwärts rollende Tonkaskade mit Schluss-Haken – oft als „bin ich nicht ein schöner Bräutigam?“ gemerkt.',
    hint: 'Die Strophe beginnt hoch, wird schneller und endet immer mit einem markanten Überschlag.',
    habitat: 'Wälder · Parks · Gärten',
    colors: ['#b66f54', '#536a76', '#6f9b62', '#e9c5a8'],
    bg: '#dbe4d5',
  },
  {
    id: 'gruenfink',
    name: 'Grünfink',
    latin: 'Chloris chloris',
    file: 'Carduelis chloris.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Grünfinken singen gern von Baumspitzen. Neben Trillern gehört ein lang gezogenes, etwas heiseres Geräusch zu ihrem Repertoire.',
    tip: 'Erst munteres Klingeln, dann ein gedehntes „dschwäää“ – als würde eine kleine Tür quietschen.',
    hint: 'Zwischen perlenden Trillern erscheint ein unverwechselbar langes, nasales Quietschen.',
    habitat: 'Gärten · Alleen · Feldgehölze',
    colors: ['#7f943d', '#536a2c', '#e1ce3d', '#c9d26a'],
    bg: '#e2e7bd',
  },
  {
    id: 'stieglitz',
    name: 'Stieglitz',
    latin: 'Carduelis carduelis',
    file: 'Carduelis carduelis - European Goldfinch XC473287.mp3',
    credit: 'Wikimedia Commons · Lizenzdetails',
    fact: 'Stieglitze ziehen oft in kleinen Trupps umher und suchen Disteln nach Samen ab. Ihre Rufe verraten häufig einen vorbeifliegenden Schwarm.',
    tip: 'Ein hektisches, helles „stiglit-stiglit“ zwischen feinem Zwitschern – der Name steckt schon im Ruf.',
    hint: 'Sehr helles, lebhaftes Geplauder mit einem oft wiederholten dreisilbigen Ruf.',
    habitat: 'Brachen · Gärten · Obstwiesen',
    colors: ['#d9c8a5', '#202725', '#d65346', '#f1ead7'],
    bg: '#eee1c7',
  },
  {
    id: 'gimpel',
    name: 'Gimpel',
    latin: 'Pyrrhula pyrrhula',
    file: 'Bullfinch (Pyrrhula pyrrhula) (W1CDR0001509 BD14).ogg',
    credit: 'British Library · CC BY-SA 4.0',
    fact: 'Gimpel werden auch Dompfaffen genannt. Ihr leiser Gesang ist unauffällig, der weiche Kontaktruf dagegen sehr typisch.',
    tip: 'Ein sanftes, etwas trauriges „djüh“ – wie ein kurzer Pfiff durch gespitzte Lippen.',
    hint: 'Wenige leise, weiche Pfeiftöne mit melancholischem Klang statt einer langen Strophe.',
    habitat: 'Nadelwald · Gärten · Hecken',
    colors: ['#d86f68', '#353b3b', '#202726', '#e8a09a'],
    bg: '#ead4d1',
  },
  {
    id: 'haussperling',
    name: 'Haussperling',
    latin: 'Passer domesticus',
    file: 'Passer domesticus - House Sparrow XC108385.mp3',
    credit: 'Wikimedia Commons · Lizenzdetails',
    fact: 'Haussperlinge leben seit Jahrtausenden in der Nähe von Menschen. Ihr Gesang besteht weniger aus Melodien als aus geselligen Rufen.',
    tip: 'Ein kräftiges, etwas heiseres „tschilp“ – einzeln oder in einem lärmenden Chor vom Dach.',
    hint: 'Kurze, raue Silben werden mit kleinen Pausen immer wieder aneinandergereiht.',
    habitat: 'Dörfer · Städte · Höfe',
    colors: ['#a88b69', '#594b40', '#8b6d50', '#e4d4bd'],
    bg: '#e7ddce',
  },
  {
    id: 'feldsperling',
    name: 'Feldsperling',
    latin: 'Passer montanus',
    file: 'Passer montanus.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Feldsperlinge erkennt man am kastanienbraunen Scheitel und schwarzen Wangenfleck. Sie brüten gern in Baumhöhlen und Nistkästen.',
    tip: 'Ähnlich wie der Haussperling, aber etwas heller, härter und einsilbiger: „tek“ oder „tschilp“.',
    hint: 'Gesellige, trockene Rufe – etwas höher und sauberer als beim nahen Verwandten in der Stadt.',
    habitat: 'Feldränder · Dörfer · Obstwiesen',
    colors: ['#936844', '#3c3732', '#bd8b57', '#e5d7c4'],
    bg: '#e6d7c3',
  },
  {
    id: 'star',
    name: 'Star',
    latin: 'Sturnus vulgaris',
    file: 'Sturnus vulgaris - Common Starling XC527723.mp3',
    credit: 'Wikimedia Commons · Lizenzdetails',
    fact: 'Stare sind begabte Stimmenimitatoren. In ihren Gesang bauen sie andere Vögel, Klingeltöne und technische Geräusche ein.',
    tip: 'Pfeifen, Knarzen, Klicken und plötzlich fremde Vogelrufe – eine kleine Geräusch-Collage.',
    hint: 'Die Stimme wechselt ständig zwischen klaren Pfiffen, Knacken, Quietschen und Imitationen.',
    habitat: 'Wiesen · Städte · lichte Wälder',
    colors: ['#293e3a', '#172826', '#79a87c', '#547a6b'],
    bg: '#d1ded7',
  },
  {
    id: 'singdrossel',
    name: 'Singdrossel',
    latin: 'Turdus philomelos',
    file: 'Turdus philomelos - Song Thrush XC321571.mp3',
    credit: 'Wikimedia Commons · Lizenzdetails',
    fact: 'Singdrosseln tragen viele unterschiedliche Motive vor, wiederholen jedes davon aber charakteristisch zwei- bis viermal.',
    tip: 'Ein Motiv, noch einmal, noch einmal – dann ein neues. Die Wiederholung ist der Schlüssel.',
    hint: 'Kurze klare Motive werden jeweils mehrfach identisch wiederholt, bevor das nächste beginnt.',
    habitat: 'Wälder · Parks · große Gärten',
    colors: ['#9b7d5c', '#6a543e', '#b79b72', '#e9dfc6'],
    bg: '#e7dcc8',
  },
  {
    id: 'misteldrossel',
    name: 'Misteldrossel',
    latin: 'Turdus viscivorus',
    file: 'Turdus viscivorus - Mistle Thrush XC108362.mp3',
    credit: 'Wikimedia Commons · Lizenzdetails',
    fact: 'Die Misteldrossel ist unsere größte Drossel. Selbst bei windigem Wetter trägt sie ihre weit hörbaren Strophen von Baumspitzen vor.',
    tip: 'Wie eine Amsel mit Megafon: kurze, kräftige Flötenstrophen ohne die vielen verspielten Schnörkel.',
    hint: 'Laute, getragene Flötentöne in kurzen Strophen; kräftiger und gleichförmiger als die Amsel.',
    habitat: 'Waldränder · Parks · Weiden',
    colors: ['#99876e', '#6b6255', '#b4a183', '#eee5d5'],
    bg: '#e4ded1',
  },
  {
    id: 'wacholderdrossel',
    name: 'Wacholderdrossel',
    latin: 'Turdus pilaris',
    file: 'Turdus pilaris - Fieldfare XC531160.mp3',
    credit: 'Wikimedia Commons · Lizenzdetails',
    fact: 'Wacholderdrosseln brüten oft in lockeren Kolonien. Eindringlinge werden gemeinsam lautstark vertrieben.',
    tip: 'Ein trockenes, schnarrendes „schack-schack-schack“ – wie eine kräftige Gartenschere.',
    hint: 'Raue, harte Schnarrlaute in schnellen Reihen; kaum flötende Töne.',
    habitat: 'Wiesen · Feldgehölze · Parks',
    colors: ['#8c7061', '#606a72', '#b47855', '#d8c5ab'],
    bg: '#d9dce0',
  },
  {
    id: 'moenchsgrasmuecke',
    name: 'Mönchsgrasmücke',
    latin: 'Sylvia atricapilla',
    file: 'Sylvia atricapilla.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Die Mönchsgrasmücke ist in vielen Gärten zu hören. Ihr Gesang beginnt leise plaudernd und endet laut flötend.',
    tip: 'Erst murmelndes Warmlaufen, dann plötzlich ein kurzer, klarer Flöten-Jubel.',
    hint: 'Nach einem leisen, rauen Vorgesang folgen wenige sehr klare und kräftige Flötentöne.',
    habitat: 'Gebüsch · Parks · Laubwald',
    colors: ['#858d85', '#353b39', '#9ca79a', '#d9ddd2'],
    bg: '#dde1d8',
  },
  {
    id: 'gartengrasmuecke',
    name: 'Gartengrasmücke',
    latin: 'Sylvia borin',
    file: 'Sylvia borin.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Trotz ihres Namens lebt die Gartengrasmücke vor allem in dichtem Gebüsch. Optisch ist sie auffallend unauffällig.',
    tip: 'Ein gleichmäßig dahinplätschernder Wortschwall – ohne den lauten Flöten-Schluss der Mönchsgrasmücke.',
    hint: 'Langes, weiches Plaudern auf gleichbleibender Lautstärke, fast ohne Pausen oder Höhepunkte.',
    habitat: 'Hecken · Auen · Waldränder',
    colors: ['#9b9180', '#756e61', '#ac9f88', '#e4ded1'],
    bg: '#e5e0d5',
  },
  {
    id: 'dorngrasmuecke',
    name: 'Dorngrasmücke',
    latin: 'Curruca communis',
    file: 'Sylvia communis.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Dorngrasmücken sitzen beim Singen gern auf der Spitze einer Hecke und zeigen kurze flatternde Singflüge.',
    tip: 'Eine sehr kurze, kratzig-fröhliche Strophe – als würde jemand hastig einen Satz hinwerfen.',
    hint: 'Nur wenige schnelle, raue Silben pro Strophe; lebhaft, aber nach ein bis zwei Sekunden vorbei.',
    habitat: 'Hecken · Brachen · Feldraine',
    colors: ['#9a8068', '#6a6b65', '#bc8b70', '#e5d7c8'],
    bg: '#e4d9cd',
  },
  {
    id: 'zilpzalp',
    name: 'Zilpzalp',
    latin: 'Phylloscopus collybita',
    file: 'Phylloscopus collybita.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Der Zilpzalp verrät seinen Namen selbst. Der kleine Laubsänger sucht rastlos Blätter und Zweige nach Insekten ab.',
    tip: '„Zilp – zalp – zilp – zalp“: zwei abwechselnd hohe, trockene Töne wie ein Metronom.',
    hint: 'Zwei einfache Töne wechseln langsam und unermüdlich hin und her.',
    habitat: 'Wälder · Parks · Gärten',
    colors: ['#8f9862', '#6c7446', '#b2b86f', '#dde0bd'],
    bg: '#e1e5c6',
  },
  {
    id: 'fitis',
    name: 'Fitis',
    latin: 'Phylloscopus trochilus',
    file: 'Phylloscopus trochilus acredula.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Fitis und Zilpzalp sehen sich zum Verwechseln ähnlich. Ihre Gesänge machen die Bestimmung dagegen leicht.',
    tip: 'Eine weiche Tonleiter, die am Ende müde nach unten rieselt – ganz anders als das Zweiton-Metronom.',
    hint: 'Eine fließende, sanfte Strophe fällt in mehreren Stufen von hoch nach tief ab.',
    habitat: 'lichte Wälder · Moore · Gebüsch',
    colors: ['#8b9764', '#667444', '#a8b576', '#e1e5bf'],
    bg: '#dde3c8',
  },
  {
    id: 'sommergoldhaehnchen',
    name: 'Sommergoldhähnchen',
    latin: 'Regulus ignicapilla',
    file: 'Regulus ignicapilla - Common Firecrest XC531032.mp3',
    credit: 'Wikimedia Commons · Lizenzdetails',
    fact: 'Sommergoldhähnchen wiegen nur wenige Gramm. Ihr auffälliger Überaugenstreif unterscheidet sie vom Wintergoldhähnchen.',
    tip: 'Eine sehr hohe, gleichbleibende Reihe, die zum Ende etwas schneller und betonter wird.',
    hint: 'Extrem hohe feine Töne laufen fast auf einer Tonhöhe und beschleunigen leicht.',
    habitat: 'Mischwald · Parks · hohe Bäume',
    colors: ['#86904b', '#53603d', '#e5a93f', '#d6d6a3'],
    bg: '#dfe1bd',
  },
  {
    id: 'wintergoldhaehnchen',
    name: 'Wintergoldhähnchen',
    latin: 'Regulus regulus',
    file: 'Regulus regulus - Goldcrest XC513342.mp3',
    credit: 'Wikimedia Commons · Lizenzdetails',
    fact: 'Das Wintergoldhähnchen ist der kleinste Vogel Europas. Es sucht vor allem in Fichtenzweigen nach winzigen Insekten.',
    tip: 'Mehrfach sehr hoch „si-si-si“, dann ein kurzer verschnörkelter Abschluss.',
    hint: 'Eine ansteigende Folge hauchdünner Töne endet in einem kleinen, schwungvollen Schnörkel.',
    habitat: 'Fichtenwald · Nadelparks',
    colors: ['#888b4c', '#5f603a', '#e5c33d', '#d4d2a4'],
    bg: '#e1dfba',
  },
  {
    id: 'goldammer',
    name: 'Goldammer',
    latin: 'Emberiza citrinella',
    file: 'Emberiza citrinella.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Goldammern prägen mit ihrem Gesang offene Kulturlandschaften. Männchen singen gern von Zaunpfählen und Buschspitzen.',
    tip: '„Wie, wie, wie hab ich dich liiieb“ – mehrere kurze Töne, dann ein deutlich längerer.',
    hint: 'Eine Reihe gleicher kurzer Töne endet mit einem lang gezogenen, etwas tieferen Ton.',
    habitat: 'Feldhecken · Wiesen · Waldränder',
    colors: ['#d7c83e', '#8b7d31', '#e8d755', '#efe7a6'],
    bg: '#ece6b6',
  },
  {
    id: 'feldlerche',
    name: 'Feldlerche',
    latin: 'Alauda arvensis',
    file: 'XN Alauda arvensis.ogg',
    credit: 'Guido Gerding · CC BY-SA',
    fact: 'Feldlerchen singen oft minutenlang im Rüttelflug hoch über Äckern und Wiesen.',
    tip: 'Ein endloser, heller Strom aus Trillern und Rollen – ohne erkennbare Pause hoch aus der Luft.',
    hint: 'Sehr lange, schnelle und abwechslungsreiche Folge heller Töne, scheinbar direkt vom Himmel.',
    habitat: 'Äcker · Wiesen · offene Flächen',
    colors: ['#a88b63', '#796448', '#c2a878', '#e8dcc5'],
    bg: '#eadfc8',
  },
  {
    id: 'hausrotschwanz',
    name: 'Hausrotschwanz',
    latin: 'Phoenicurus ochruros',
    file: 'Black Redstart (Phoenicurus ochruros) (W1CDR0000253 BD17).ogg',
    credit: 'Julian Burcher / British Library · CC BY 4.0',
    fact: 'Hausrotschwänze sind typische Gebäudebrüter. Sie beginnen oft schon vor Sonnenaufgang auf Dachantennen zu singen.',
    tip: 'Kurzer heller Auftakt, eine knirschende „Papierknäuel“-Pause, dann ein knapper Schluss.',
    hint: 'In der Mitte der kurzen Strophe sitzt ein unverwechselbares knirschendes, raschelndes Geräusch.',
    habitat: 'Gebäude · Steinbrüche · Industrie',
    colors: ['#626a6b', '#363e40', '#dc7048', '#909899'],
    bg: '#d8dddc',
  },
  {
    id: 'gartenrotschwanz',
    name: 'Gartenrotschwanz',
    latin: 'Phoenicurus phoenicurus',
    file: 'Phoenicurus phoenicurus.ogg',
    credit: 'Oona Räisänen · gemeinfrei',
    fact: 'Der Gartenrotschwanz braucht alte Bäume mit Höhlen. Sein Bestand profitiert von naturnahen Obstgärten und passenden Nistkästen.',
    tip: 'Immer derselbe gedehnte Beginn, danach eine kurze, jedes Mal etwas andere Zwitscherfolge.',
    hint: 'Eine klare, leicht wehmütige Eingangssilbe leitet eine kurze variable Strophe ein.',
    habitat: 'Obstwiesen · Parks · lichte Wälder',
    colors: ['#6f7b7c', '#3d4849', '#df7142', '#e6a77d'],
    bg: '#dce1df',
  },
  {
    id: 'kleiber',
    name: 'Kleiber',
    latin: 'Sitta europaea',
    file: 'Sitta europaea.ogg',
    credit: 'Wikimedia Commons · Lizenzdetails',
    fact: 'Kleiber können als einzige heimische Vögel kopfüber am Stamm hinablaufen. Bruthöhlen mauern sie mit Lehm auf die passende Größe zu.',
    tip: 'Kräftiges, weit tragendes „wiit-wiit-wiit“ oder eine schnell perlende Pfeifreihe.',
    hint: 'Laute, klare Pfeiftöne werden in gleichmäßigem Abstand wiederholt und klingen etwas nasal.',
    habitat: 'alte Laubwälder · Parks · Gärten',
    colors: ['#6f91a0', '#4b6269', '#bb774c', '#e2b591'],
    bg: '#d7e2e3',
  },
  {
    id: 'waldbaumlaeufer',
    name: 'Waldbaumläufer',
    latin: 'Certhia familiaris',
    file: 'Certhia familiaris song.ogg',
    credit: 'Alexander Kürthy · CC BY-SA 4.0',
    fact: 'Waldbaumläufer klettern spiralförmig an Stämmen empor und stützen sich mit ihrem festen Schwanz ab.',
    tip: 'Sehr hoch und fein: ein kurzer Auftakt, eine kleine fallende Tonreihe, dann ein dünner Triller.',
    hint: 'Eine zarte, hohe Strophe beschreibt einen kleinen Bogen und endet in einem feinen Schnörkel.',
    habitat: 'Nadel- und Mischwald',
    colors: ['#92745a', '#6d513e', '#b49979', '#e6d9c6'],
    bg: '#e3d7c7',
  },
  {
    id: 'sumpfmeise',
    name: 'Sumpfmeise',
    latin: 'Poecile palustris',
    file: 'Poecile palustris.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Sumpfmeisen leben trotz ihres Namens nicht nur im Sumpf, sondern vor allem in alten Laub- und Mischwäldern.',
    tip: 'Explosives „pitjäh“ als Ruf; der Gesang ist eine schnelle Reihe gleich hoher „tjip“-Töne.',
    hint: 'Kurze, helle Silben werden schnell und streng auf derselben Tonhöhe wiederholt.',
    habitat: 'Laubwald · Auen · alte Parks',
    colors: ['#9a8b77', '#343938', '#b7a68e', '#e7dfd0'],
    bg: '#e3ded2',
  },
  {
    id: 'weidenmeise',
    name: 'Weidenmeise',
    latin: 'Poecile montanus',
    file: 'Poecile montanus (Germany).ogg',
    credit: 'Rabe19 · CC BY-SA 3.0',
    fact: 'Weidenmeisen zimmern ihre Bruthöhle oft selbst in morsches Holz. In Deutschland sind sie regional deutlich zurückgegangen.',
    tip: 'Mehrere lang gezogene, etwas traurige „düüh-düüh-düüh“-Töne auf fast gleicher Höhe.',
    hint: 'Langsame Folge weicher, gedehnter Pfeiftöne – klagender als die schnelle Sumpfmeise.',
    habitat: 'Bruchwald · Moore · feuchte Wälder',
    colors: ['#8a8174', '#393c3b', '#aaa092', '#e2ddd3'],
    bg: '#dedbd4',
  },
  {
    id: 'haubenmeise',
    name: 'Haubenmeise',
    latin: 'Lophophanes cristatus',
    file: 'Lophophanes cristatus.ogg',
    credit: 'Wikimedia Commons · Lizenzdetails',
    fact: 'Die unverwechselbare Federhaube verrät diese Meise sofort. Sie bleibt das ganze Jahr eng an Nadelwälder gebunden.',
    tip: 'Ein rollendes, trockenes „gürrr“ zwischen hohen Meisenrufen – rauer als andere Meisen.',
    hint: 'Hohe kurze Rufe wechseln mit einer auffälligen schnurrenden oder rollenden Silbe.',
    habitat: 'Nadelwald · Mischwald',
    colors: ['#9d9281', '#3e4442', '#766c61', '#e6dfd3'],
    bg: '#dfddd6',
  },
  {
    id: 'schwanzmeise',
    name: 'Schwanzmeise',
    latin: 'Aegithalos caudatus',
    file: 'Aegithalos caudatus - Long-tailed Tit - XC114614.ogg',
    credit: 'Jonathon Jongsma · Xeno-canto / CC',
    fact: 'Der Schwanz der Schwanzmeise ist länger als ihr Körper. Außerhalb der Brutzeit ziehen Familienverbände gemeinsam umher.',
    tip: 'Sehr hohe „sriih“-Rufe und kurze, trockene „trr-trr“-Laute aus einem umherziehenden Trupp.',
    hint: 'Dünne, sehr hohe Kontaktrufe werden von kurzen trockenen Rassellauten unterbrochen.',
    habitat: 'Hecken · Ufergebüsch · Parks',
    colors: ['#f0e9de', '#5d6060', '#d6a7a6', '#f7f3ea'],
    bg: '#eadfe0',
  },
  {
    id: 'pirol',
    name: 'Pirol',
    latin: 'Oriolus oriolus',
    file: 'Oriolus oriolus voice.ogg',
    credit: 'Wikimedia Commons · Lizenzdetails',
    fact: 'Der leuchtend gelbe Pirol bleibt meist unsichtbar im Blätterdach. Er verbringt nur wenige Monate des Jahres bei uns.',
    tip: 'Ein voller, exotisch klingender Flötenruf: „düdlioh“ – langsam, weich und weit tragend.',
    hint: 'Wenige tiefe, sehr runde Flötentöne bilden einen kurzen melodischen Ruf.',
    habitat: 'Auenwald · hohe Laubbäume · Parks',
    colors: ['#e0cf35', '#202927', '#e7d746', '#f1e889'],
    bg: '#ece8b2',
  },
  {
    id: 'kuckuck',
    name: 'Kuckuck',
    latin: 'Cuculus canorus',
    file: 'Cuculus canorus.ogg',
    credit: 'Vladimir Yu. Arkhipov · CC BY-SA 3.0',
    fact: 'Kuckucksweibchen legen ihre Eier in fremde Nester. Der bekannte zweisilbige Ruf stammt ausschließlich vom Männchen.',
    tip: 'Der Name ist der Ruf: ein tieferer Ton folgt direkt auf einen höheren – „ku-kuck“.',
    hint: 'Zwei tiefe, hohle Töne werden in ruhigem Abstand immer wiederholt.',
    habitat: 'Moore · Wälder · offene Landschaft',
    colors: ['#7f8d91', '#57676c', '#aab3b2', '#d8dddd'],
    bg: '#dce3e2',
  },
  {
    id: 'ringeltaube',
    name: 'Ringeltaube',
    latin: 'Columba palumbus',
    file: 'Columba palumbus birdsong.ogg',
    credit: 'Oona Räisänen · gemeinfrei',
    fact: 'Ringeltauben sind unsere größten Tauben. Der weiße Halsfleck ausgewachsener Vögel gab ihnen ihren Namen.',
    tip: 'Fünf hohle Silben: „ruh-ruu, ru-ruu“ – die Strophe endet scheinbar einen Schlag zu früh.',
    hint: 'Eine tiefe, hohle Fünf-Ton-Folge wird mit langen Pausen wiederholt.',
    habitat: 'Parks · Wälder · Städte',
    colors: ['#78898e', '#5f6d71', '#d39a86', '#aeb9ba'],
    bg: '#dce2e2',
  },
];

// Die frühere Ein-Modus-Logik bleibt nur als Migrationsreferenz erhalten.
// Die vollständige Anwendung läuft in game.js.
if (false) {
const ROUNDS = 6;
const state = {
  view: 'home',
  muted: false,
  round: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  correct: 0,
  hintUsed: false,
  answered: false,
  current: null,
  options: [],
  deck: [],
  audio: null,
  history: [],
};

const progress = JSON.parse(localStorage.getItem('zwitscher-progress') || '{"learned":[],"best":0,"games":0}');
const view = document.querySelector('#view');
const soundButton = document.querySelector('#sound-button');
const toast = document.querySelector('#toast');
let toastTimer;

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function saveProgress() {
  localStorage.setItem('zwitscher-progress', JSON.stringify(progress));
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

function stopAudio() {
  if (!state.audio) return;
  state.audio.pause();
  state.audio.currentTime = 0;
  state.audio = null;
  document.querySelectorAll('.playing').forEach((node) => node.classList.remove('playing'));
}

function birdSvg(bird, extraClass = '') {
  const [body, wing, accent, chest] = bird.colors;
  return `
    <svg class="${extraClass}" viewBox="0 0 240 210" role="img" aria-label="Illustration: ${bird.name}">
      <g transform="translate(3 2)">
        <path d="M61 170 34 193l48-10 23-22Z" fill="${wing}"/>
        <path d="M81 170 69 204l34-27Z" fill="${body}"/>
        <ellipse cx="121" cy="122" rx="69" ry="61" fill="${body}" transform="rotate(-10 121 122)"/>
        <ellipse cx="137" cy="138" rx="44" ry="43" fill="${chest}" transform="rotate(-17 137 138)"/>
        <ellipse cx="91" cy="129" rx="37" ry="47" fill="${wing}" transform="rotate(24 91 129)"/>
        <path d="M65 119c21 4 34 17 44 38-24-5-37-15-44-38Z" fill="${accent}" opacity=".3"/>
        <circle cx="150" cy="66" r="43" fill="${body}"/>
        ${bird.id === 'rotkehlchen' ? `<path d="M120 76c18-20 51-17 65 5-8 25-26 36-49 31-2-14-7-26-16-36Z" fill="${accent}"/>` : ''}
        ${bird.id === 'kohlmeise' ? `<path d="M118 49c18-25 52-28 72-5l-9 38-54 4Z" fill="${wing}"/><path d="M142 82h18l2 79-11 7Z" fill="${wing}"/>` : ''}
        ${bird.id === 'blaumeise' ? `<path d="M118 49c19-26 50-29 69-9l-7 19-58 6Z" fill="${wing}"/><path d="M127 78c15 8 38 8 55-2" fill="none" stroke="${wing}" stroke-width="6"/>` : ''}
        ${bird.id === 'amsel' ? `<circle cx="150" cy="66" r="43" fill="${body}"/>` : ''}
        <circle cx="166" cy="57" r="5" fill="#152e29"/>
        <circle cx="168" cy="55" r="1.4" fill="white"/>
        <path d="m188 67 38 9-40 10Z" fill="${accent}"/>
        <path d="M112 177v18m24-17 4 17m-37 0h18m9 0h19" fill="none" stroke="#684c35" stroke-width="4" stroke-linecap="round"/>
        ${bird.id === 'zaunkoenig' ? `<path d="M67 103 30 53l19 63Z" fill="${body}"/>` : ''}
      </g>
    </svg>`;
}

function waveform() {
  const bars = Array.from({ length: 14 }, (_, i) => {
    const h = 10 + ((i * 17) % 35);
    return `<i style="--h:${h}px;--d:-${(i * .07).toFixed(2)}s"></i>`;
  }).join('');
  return `<div class="waveform left">${bars}</div><div class="waveform right">${bars}</div>`;
}

function homeTemplate() {
  const learned = progress.learned.length;
  return `
    <div class="home-grid">
      <div class="hero-copy-block">
        <p class="eyebrow">Dein Ohr wird zum Fernglas</p>
        <h1 class="hero-title">Wer singt<br><em>denn da?</em></h1>
        <p class="hero-copy">Höre genau hin, erkenne heimische Vogelstimmen und sammle Artenwissen, das beim nächsten Spaziergang wirklich hängen bleibt.</p>
        <div class="hero-actions">
          <button class="primary-button" id="start-button"><span class="button-icon">▶</span> Runde starten</button>
          <button class="secondary-button" id="discover-button">Erst entdecken →</button>
        </div>
        <div class="home-stats">
          <div class="home-stat"><strong>${learned}/${birds.length}</strong><span>Arten entdeckt</span></div>
          <div class="home-stat"><strong>${progress.best}</strong><span>Beste Punktzahl</span></div>
          <div class="home-stat"><strong>${progress.games}</strong><span>Runden gespielt</span></div>
        </div>
      </div>

      <aside class="sound-card" aria-label="Vorschau auf das Spiel">
        <div class="card-kicker"><span>Stimme des Tages</span><span>♪</span></div>
        <div class="branch"></div>
        <div class="home-bird">${birdSvg(birds[1])}</div>
        <div class="card-question">
          <div class="mini-wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <h2>Klein, rund, unverkennbar.</h2>
          <p>Erkennst du diesen Gartenbesucher allein an seiner Stimme?</p>
        </div>
      </aside>
    </div>`;
}

function renderHome() {
  stopAudio();
  state.view = 'home';
  view.innerHTML = homeTemplate();
  document.querySelector('#start-button').addEventListener('click', startGame);
  document.querySelector('#discover-button').addEventListener('click', renderCollection);
}

function startGame() {
  stopAudio();
  Object.assign(state, {
    view: 'quiz', round: 0, score: 0, streak: 0, bestStreak: 0,
    correct: 0, history: [], deck: shuffle(birds).slice(0, ROUNDS),
  });
  loadRound();
}

function loadRound() {
  stopAudio();
  state.current = state.deck[state.round];
  const others = shuffle(birds.filter((bird) => bird.id !== state.current.id)).slice(0, 3);
  state.options = shuffle([state.current, ...others]);
  state.hintUsed = false;
  state.answered = false;
  renderQuiz();
  setTimeout(playCurrentAudio, 320);
}

function progressDots() {
  return Array.from({ length: ROUNDS }, (_, i) => {
    const cls = i < state.round ? 'done' : i === state.round ? 'current' : '';
    return `<i class="${cls}"></i>`;
  }).join('');
}

function renderQuiz() {
  view.innerHTML = `
    <div class="quiz-wrap">
      <div class="quiz-head">
        <span class="round-label">${state.round + 1} / ${ROUNDS}</span>
        <div class="progress-dots" aria-label="Fortschritt">${progressDots()}</div>
        <span class="score-label">${state.score} P</span>
      </div>
      <div class="quiz-card">
        <div class="quiz-prompt">
          <p class="eyebrow">Ohren auf</p>
          <h1>Wer singt hier?</h1>
        </div>
        <div class="audio-stage" id="audio-stage">
          ${waveform()}
          <div class="audio-inner">
            <button class="play-button" id="play-button" aria-label="Vogelstimme abspielen">
              <svg class="play-icon" viewBox="0 0 24 24"><path d="m8 5 11 7-11 7Z"/></svg>
              <svg class="pause-icon" viewBox="0 0 24 24"><path d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg>
            </button>
            <span class="listen-label">Tippen zum Hören</span>
            <span class="audio-error">Die Aufnahme konnte nicht geladen werden. Bitte erneut versuchen.</span>
          </div>
        </div>
        <div class="hint-panel" id="hint-panel">${state.current.hint}</div>
        <div class="answers">
          ${state.options.map((bird, i) => `<button class="answer" data-id="${bird.id}"><span class="answer-key">${i + 1}</span><span>${bird.name}</span></button>`).join('')}
        </div>
        <div class="quiz-foot">
          <button class="hint-button" id="hint-button"><span>✦</span> Kleiner Hinweis <small>−30 P</small></button>
          <span class="streak">Serie <strong>×${state.streak}</strong></span>
        </div>
      </div>
    </div>`;

  document.querySelector('#play-button').addEventListener('click', toggleAudio);
  document.querySelector('#hint-button').addEventListener('click', showHint);
  document.querySelectorAll('.answer').forEach((button) => {
    button.addEventListener('click', () => answer(button.dataset.id));
  });
}

function playCurrentAudio() {
  if (state.muted || state.view !== 'quiz') return;
  if (state.audio && !state.audio.paused) return;
  stopAudio();
  const audio = new Audio(commonsFile(state.current.file));
  state.audio = audio;
  const stage = document.querySelector('#audio-stage');
  audio.addEventListener('play', () => stage?.classList.add('playing'));
  audio.addEventListener('pause', () => stage?.classList.remove('playing'));
  audio.addEventListener('ended', () => stage?.classList.remove('playing'));
  audio.addEventListener('error', () => stage?.classList.add('has-error'));
  audio.play().catch(() => {
    // Autoplay is commonly blocked; the visible play button remains available.
  });
}

function toggleAudio() {
  if (state.muted) {
    state.muted = false;
    updateSoundButton();
  }
  if (!state.audio) {
    playCurrentAudio();
  } else if (state.audio.paused) {
    state.audio.play().catch(() => document.querySelector('#audio-stage')?.classList.add('has-error'));
  } else {
    state.audio.pause();
  }
}

function showHint() {
  if (state.hintUsed) return;
  state.hintUsed = true;
  document.querySelector('#hint-panel').classList.add('visible');
  document.querySelector('#hint-button').disabled = true;
}

function answer(id) {
  if (state.answered) return;
  state.answered = true;
  stopAudio();
  const isCorrect = id === state.current.id;
  document.querySelectorAll('.answer').forEach((button) => {
    button.disabled = true;
    if (button.dataset.id === state.current.id) button.classList.add('correct');
    if (button.dataset.id === id && !isCorrect) button.classList.add('wrong');
  });

  if (isCorrect) {
    const points = Math.max(40, 100 + state.streak * 15 - (state.hintUsed ? 30 : 0));
    state.score += points;
    state.correct += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
  } else {
    state.streak = 0;
  }
  state.history.push({ bird: state.current.id, correct: isCorrect });
  if (!progress.learned.includes(state.current.id)) progress.learned.push(state.current.id);
  saveProgress();
  setTimeout(() => renderFeedback(isCorrect), 520);
}

function renderFeedback(isCorrect) {
  const bird = state.current;
  view.innerHTML = `
    <div class="quiz-wrap">
      <div class="quiz-head">
        <span class="round-label">${state.round + 1} / ${ROUNDS}</span>
        <div class="progress-dots">${progressDots()}</div>
        <span class="score-label">${state.score} P</span>
      </div>
      <div class="quiz-card feedback">
        <div class="bird-portrait" style="--portrait-bg:${bird.bg}">${birdSvg(bird)}</div>
        <div class="feedback-copy">
          <span class="feedback-result ${isCorrect ? '' : 'wrong'}">${isCorrect ? '✓ Richtig erkannt' : '→ Das war gesucht'}</span>
          <h2>${bird.name}</h2>
          <p class="latin">${bird.latin}</p>
          <p class="fact">${bird.fact}</p>
          <div class="memory-tip"><span>♪</span><p><strong>Merkhilfe:</strong> ${bird.tip}</p></div>
          <div class="feedback-meta">
            <span class="habitat">⌖ ${bird.habitat}</span>
            <button class="primary-button next-button" id="next-button">${state.round === ROUNDS - 1 ? 'Auswertung' : 'Nächste Stimme'} <span>→</span></button>
          </div>
        </div>
      </div>
    </div>`;
  document.querySelector('#next-button').addEventListener('click', nextRound);
}

function nextRound() {
  state.round += 1;
  if (state.round >= ROUNDS) finishGame();
  else loadRound();
}

function finishGame() {
  state.view = 'result';
  progress.games += 1;
  progress.best = Math.max(progress.best, state.score);
  saveProgress();
  const ratio = state.correct / ROUNDS;
  const title = ratio === 1 ? 'Waldohren!' : ratio >= .67 ? 'Stark hingehört!' : ratio >= .34 ? 'Guter Anfang!' : 'Weiter lauschen!';
  const copy = ratio === 1
    ? 'Keine Stimme ist dir entgangen. Beim nächsten Spaziergang bist du dem Konzert im Gebüsch einen großen Schritt näher.'
    : 'Jede Runde schärft dein Gehör. Die Merkhilfen im Vogelbuch warten schon auf die nächste Wiederholung.';
  view.innerHTML = `
    <div class="result-card">
      <div class="result-emblem">${birdSvg(birds[4])}</div>
      <p class="eyebrow" style="justify-content:center">Runde geschafft</p>
      <h1>${title}</h1>
      <p>${copy}</p>
      <div class="result-stats">
        <div class="result-stat"><strong>${state.correct}/${ROUNDS}</strong><span>richtig</span></div>
        <div class="result-stat"><strong>${state.score}</strong><span>Punkte</span></div>
        <div class="result-stat"><strong>×${state.bestStreak}</strong><span>beste Serie</span></div>
      </div>
      <div class="result-actions">
        <button class="primary-button" id="again-button"><span class="button-icon">↻</span> Noch eine Runde</button>
        <button class="secondary-button" id="result-book-button">Zum Vogelbuch →</button>
      </div>
    </div>`;
  document.querySelector('#again-button').addEventListener('click', startGame);
  document.querySelector('#result-book-button').addEventListener('click', renderCollection);
}

function renderCollection() {
  stopAudio();
  state.view = 'collection';
  view.innerHTML = `
    <div class="collection">
      <div class="collection-head">
        <div><p class="eyebrow">Deine Sammlung</p><h1>Das Vogelbuch</h1><p>Höre Stimmen noch einmal an und präge dir ihre Klangsignatur ein.</p></div>
        <span class="collection-count">${progress.learned.length} von ${birds.length} entdeckt</span>
      </div>
      <div class="bird-grid">
        ${birds.map((bird) => {
          const learned = progress.learned.includes(bird.id);
          return `<article class="species-card" style="--portrait-bg:${bird.bg}">
            <div class="species-visual">${birdSvg(bird)}</div>
            <h2>${bird.name}</h2>
            <p class="latin">${bird.latin}</p>
            <p>${bird.tip}</p>
            <div class="species-footer">
              <span class="learned ${learned ? '' : 'new'}">${learned ? '✓ ENTDECKT' : 'NOCH UNBEKANNT'}</span>
              <button class="mini-play" data-bird="${bird.id}" aria-label="${bird.name} anhören">
                <svg class="mini-play-icon" viewBox="0 0 24 24"><path d="m8 5 11 7-11 7Z"/></svg>
              </button>
            </div>
          </article>`;
        }).join('')}
      </div>
      <details class="credits">
        <summary>Quellen und Lizenzen der ${birds.length} Aufnahmen</summary>
        <div>${birds.map((bird) => `<a href="${commonsPage(bird.file)}" target="_blank" rel="noreferrer">${bird.name} – ${bird.credit}</a>`).join(' · ')}</div>
        <p>Bereitgestellt über Wikimedia Commons. Urheber:innen und vollständige Lizenzbedingungen stehen auf der jeweils verlinkten Dateiseite. Die Aufnahmen wurden nicht verändert.</p>
      </details>
    </div>`;
  document.querySelectorAll('.mini-play').forEach((button) => {
    button.addEventListener('click', () => playPreview(button));
  });
}

function playPreview(button) {
  const bird = birds.find((item) => item.id === button.dataset.bird);
  if (state.audio && button.classList.contains('playing')) {
    stopAudio();
    return;
  }
  stopAudio();
  if (state.muted) {
    state.muted = false;
    updateSoundButton();
  }
  const audio = new Audio(commonsFile(bird.file));
  state.audio = audio;
  button.classList.add('playing');
  button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg>';
  const reset = () => {
    button.classList.remove('playing');
    button.innerHTML = '<svg viewBox="0 0 24 24"><path d="m8 5 11 7-11 7Z"/></svg>';
  };
  audio.addEventListener('ended', reset);
  audio.addEventListener('pause', reset);
  audio.addEventListener('error', () => {
    reset();
    showToast('Aufnahme konnte nicht geladen werden.');
  });
  audio.play().catch(() => showToast('Tippe erneut, um die Aufnahme zu starten.'));
}

function updateSoundButton() {
  soundButton.classList.toggle('muted', state.muted);
  soundButton.setAttribute('aria-pressed', String(state.muted));
  soundButton.setAttribute('aria-label', state.muted ? 'Ton einschalten' : 'Ton ausschalten');
}

soundButton.addEventListener('click', () => {
  state.muted = !state.muted;
  if (state.muted) stopAudio();
  else if (state.view === 'quiz') playCurrentAudio();
  updateSoundButton();
});
document.querySelector('#home-button').addEventListener('click', renderHome);
document.querySelector('#collection-button').addEventListener('click', renderCollection);
document.addEventListener('keydown', (event) => {
  if (state.view !== 'quiz' || state.answered) return;
  const number = Number(event.key);
  if (number >= 1 && number <= state.options.length) answer(state.options[number - 1].id);
  if (event.code === 'Space') {
    event.preventDefault();
    toggleAudio();
  }
});

renderHome();
}
