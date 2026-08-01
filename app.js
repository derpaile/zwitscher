//#region src/core/pwa.ts
function e(e = {}) {
	!("serviceWorker" in navigator) || location.protocol === "file:" || window.addEventListener("load", () => {
		navigator.serviceWorker.register("/sw.js").catch(() => void 0);
	}, { once: !0 });
}
//#endregion
//#region src/data/courses.ts
var t = [
	"learn",
	"duel",
	"choice",
	"recall",
	"exam"
], n = [
	{
		id: "garten",
		order: 1,
		title: "Garten und Balkon",
		subtitle: "Acht vertraute Stimmen direkt vor der Haustür.",
		icon: "⌂",
		habitat: "garden",
		voiceType: "song",
		lessonPhases: t,
		speciesIds: [
			"amsel",
			"rotkehlchen",
			"kohlmeise",
			"blaumeise",
			"zaunkoenig",
			"haussperling",
			"heckenbraunelle",
			"buchfink"
		]
	},
	{
		id: "stadtpark",
		order: 2,
		title: "Park und Stadt",
		subtitle: "Finken, Schwärme und kluge Nachbarn.",
		icon: "◉",
		habitat: "park",
		voiceType: "mixed",
		lessonPhases: t,
		speciesIds: [
			"gruenfink",
			"stieglitz",
			"star",
			"ringeltaube",
			"elster",
			"rabenkraehe",
			"dohle",
			"moenchsgrasmuecke"
		]
	},
	{
		id: "waldzeichen",
		order: 3,
		title: "Markante Waldstimmen",
		subtitle: "Rufe, Flöten und Trommeln mit großer Wiedererkennbarkeit.",
		icon: "♟",
		habitat: "forest",
		voiceType: "mixed",
		lessonPhases: t,
		speciesIds: [
			"singdrossel",
			"misteldrossel",
			"kleiber",
			"buntspecht",
			"gruenpecht",
			"eichelhaeher",
			"waldkauz",
			"kuckuck"
		]
	},
	{
		id: "waldvergleich",
		order: 4,
		title: "Ähnliche Waldarten",
		subtitle: "Meisen, Baumläufer und Goldhähnchen auseinanderhalten.",
		icon: "≈",
		habitat: "forest",
		voiceType: "mixed",
		lessonPhases: t,
		speciesIds: [
			"tannenmeise",
			"sumpfmeise",
			"weidenmeise",
			"haubenmeise",
			"schwanzmeise",
			"waldbaumlaeufer",
			"gartenbaumlaeufer",
			"sommergoldhaehnchen",
			"wintergoldhaehnchen"
		]
	},
	{
		id: "feldhecke",
		order: 5,
		title: "Feld, Wiese und Hecke",
		subtitle: "Singflüge, kurze Heckenstrophen und ziehende Trupps.",
		icon: "⌁",
		habitat: "field",
		voiceType: "song",
		lessonPhases: t,
		speciesIds: [
			"feldlerche",
			"goldammer",
			"feldsperling",
			"dorngrasmuecke",
			"neuntoeter",
			"baumpieper",
			"wiesenpieper",
			"bachstelze"
		]
	},
	{
		id: "aue",
		order: 6,
		title: "Aue, Schilf und Gewässer",
		subtitle: "Rhythmus und Imitationen aus Röhricht und Ufergehölz.",
		icon: "≋",
		habitat: "reed",
		voiceType: "mixed",
		lessonPhases: t,
		speciesIds: [
			"nachtigall",
			"teichrohrsaenger",
			"sumpfrohrsaenger",
			"schilfrohrsaenger",
			"rohrammer",
			"gebirgsstelze",
			"pirol",
			"fitis"
		]
	},
	{
		id: "zugvoegel",
		order: 7,
		title: "Zugvögel und Saisonstimmen",
		subtitle: "Stimmen, die den Frühling ankündigen und wieder verstummen.",
		icon: "↗",
		habitat: "mixed",
		voiceType: "song",
		lessonPhases: t,
		speciesIds: [
			"gartenrotschwanz",
			"hausrotschwanz",
			"grauschnaepper",
			"trauerschnaepper",
			"gelbspoetter",
			"gartengrasmuecke",
			"zilpzalp",
			"sprosser",
			"wacholderdrossel"
		]
	},
	{
		id: "rufmeister",
		order: 8,
		title: "Rufe und Meistervergleiche",
		subtitle: "Kontakt, Alarm und die schwierigsten Verwechslungspaare.",
		icon: "◆",
		habitat: "mixed",
		voiceType: "call",
		lessonPhases: t,
		speciesIds: [
			"gimpel",
			"kolkrabe",
			"nachtigall",
			"sprosser",
			"haussperling",
			"feldsperling",
			"sumpfmeise",
			"weidenmeise",
			"amsel",
			"misteldrossel",
			"gelbspoetter",
			"sumpfrohrsaenger"
		]
	}
], r = new Map(n.map((e) => [e.id, e])), i = [
	[
		"amsel",
		"Amsel",
		"Turdus merula",
		[
			"garden",
			"park",
			"forest"
		],
		1,
		"Warme, ruhige Flötenstrophen mit kleinen improvisierten Pausen.",
		"Hartes, schnell wiederholtes „tix-tix“ oder aufgeregtes Zetern.",
		["misteldrossel"],
		"Singt häufig von Dachfirsten und hohen Baumspitzen."
	],
	[
		"rotkehlchen",
		"Rotkehlchen",
		"Erithacus rubecula",
		[
			"garden",
			"park",
			"forest"
		],
		1,
		"Sehr feine, perlende Töne ohne festen Rhythmus.",
		"Dünnes, scharfes „tick“, oft in schneller Folge.",
		["nachtigall"],
		"Singt auch im Herbst und Winter und verteidigt ganzjährig sein Revier."
	],
	[
		"kohlmeise",
		"Kohlmeise",
		"Parus major",
		[
			"garden",
			"park",
			"forest"
		],
		1,
		"Klare Zwei- oder Dreisilber im strengen „zi-zi-bäh“-Takt.",
		"Breites Repertoire; typisch ist ein kräftiges „pink“.",
		["blaumeise", "tannenmeise"],
		"Kann zahlreiche Varianten und sogar andere Arten nachahmen."
	],
	[
		"blaumeise",
		"Blaumeise",
		"Cyanistes caeruleus",
		[
			"garden",
			"park",
			"forest"
		],
		1,
		"Hohe Auftakttöne enden in einer feinen klingelnden Kaskade.",
		"Hell und zeternd, feiner als die Kohlmeise.",
		["kohlmeise", "tannenmeise"],
		"Ist klein, wendig und bevorzugt dünne Zweige."
	],
	[
		"zaunkoenig",
		"Zaunkönig",
		"Troglodytes troglodytes",
		[
			"garden",
			"forest",
			"water"
		],
		1,
		"Überraschend laute, hektische Strophe mit markanter Schnarrrolle.",
		"Kurzes hartes „tek-tek“ aus dichtem Gebüsch.",
		["heckenbraunelle"],
		"Einer der kleinsten heimischen Vögel singt außerordentlich laut."
	],
	[
		"nachtigall",
		"Nachtigall",
		"Luscinia megarhynchos",
		[
			"park",
			"forest",
			"water"
		],
		2,
		"Lange ansteigende Pfiffe wechseln mit explosiven Tonkaskaden.",
		"Raues, tiefes Warnen aus dichtem Unterholz.",
		["sprosser", "rotkehlchen"],
		"Berühmt für ihren variablen Nachtgesang."
	],
	[
		"buchfink",
		"Buchfink",
		"Fringilla coelebs",
		[
			"garden",
			"park",
			"forest"
		],
		1,
		"Abwärts rollende Tonkaskade mit kräftigem Schluss-Haken.",
		"Metallisches „pink“ und im Flug ein weiches „jüp“.",
		["gruenfink"],
		"Der sogenannte Finkenschlag ist regional leicht verschieden."
	],
	[
		"gruenfink",
		"Grünfink",
		"Chloris chloris",
		[
			"garden",
			"park",
			"field"
		],
		1,
		"Klingelnde Reihen wechseln mit gedehntem, nasalem „dschwää“.",
		"Kräftiges „dschüp“, oft aus einem Trupp.",
		["stieglitz", "buchfink"],
		"Sein quietschender Ton ist auch im Singflug gut hörbar."
	],
	[
		"stieglitz",
		"Stieglitz",
		"Carduelis carduelis",
		[
			"garden",
			"park",
			"field"
		],
		2,
		"Hektisches helles Zwitschern mit namensgebendem „stiglit“.",
		"Flüssiges „didelit“ im wellenförmigen Flug.",
		["gruenfink"],
		"Sucht gern Samenstände von Disteln und Karden ab."
	],
	[
		"gimpel",
		"Gimpel",
		"Pyrrhula pyrrhula",
		["garden", "forest"],
		2,
		"Leise, etwas knarrende Folge aus weichen Pfeiftönen.",
		"Sanftes, melancholisches „djüh“.",
		[],
		"Paare bleiben oft eng zusammen und rufen sich leise."
	],
	[
		"haussperling",
		"Haussperling",
		"Passer domesticus",
		["garden", "park"],
		1,
		"Folge kräftiger, etwas heiserer „tschilp“-Silben.",
		"Kurze „tschilp“- und „terrett“-Rufe aus der Gruppe.",
		["feldsperling"],
		"Lebt eng mit Menschen zusammen und brütet an Gebäuden."
	],
	[
		"feldsperling",
		"Feldsperling",
		"Passer montanus",
		["garden", "field"],
		2,
		"Heller, härter und einsilbiger als der Haussperling.",
		"Kurzes „tek“ oder helles „tschilp“.",
		["haussperling"],
		"Sein schwarzer Wangenfleck unterscheidet ihn vom Haussperling."
	],
	[
		"star",
		"Star",
		"Sturnus vulgaris",
		[
			"garden",
			"park",
			"field"
		],
		1,
		"Pfeifen, Knarzen, Klicken und imitierte Fremdlaute.",
		"Raues „schärr“ und kurze metallische Rufe.",
		["amsel"],
		"Ein virtuoser Stimmenimitator mit schillerndem Gefieder."
	],
	[
		"singdrossel",
		"Singdrossel",
		"Turdus philomelos",
		["park", "forest"],
		2,
		"Jedes Motiv wird zwei- bis viermal wiederholt, dann folgt ein neues.",
		"Sehr dünnes „zip“ im Flug, bei Alarm scharfes Zetern.",
		["misteldrossel", "amsel"],
		"Die regelmäßige Motivwiederholung ist ihr bester Hörschlüssel."
	],
	[
		"misteldrossel",
		"Misteldrossel",
		"Turdus viscivorus",
		[
			"park",
			"forest",
			"field"
		],
		3,
		"Kurze, laute Flötenstrophen, kräftiger und gleichförmiger als die Amsel.",
		"Trocken schnarrendes „trrr“ im Flug.",
		["amsel", "singdrossel"],
		"Singt selbst bei windigem und regnerischem Wetter."
	],
	[
		"wacholderdrossel",
		"Wacholderdrossel",
		"Turdus pilaris",
		["park", "field"],
		2,
		"Schwatzende, raue Strophe ohne klare Flötenmelodie.",
		"Trockenes „schack-schack-schack“.",
		["misteldrossel"],
		"Brütet oft in lockeren Kolonien und verteidigt diese gemeinsam."
	],
	[
		"moenchsgrasmuecke",
		"Mönchsgrasmücke",
		"Sylvia atricapilla",
		[
			"garden",
			"park",
			"forest"
		],
		2,
		"Leises Murmeln steigert sich zu einem klaren Flötenjubel.",
		"Hartes, tiefes „täck“ aus dichtem Gebüsch.",
		["gartengrasmuecke"],
		"Der laute flötende Überschlag beendet meist die Strophe."
	],
	[
		"gartengrasmuecke",
		"Gartengrasmücke",
		"Sylvia borin",
		[
			"garden",
			"forest",
			"water"
		],
		3,
		"Gleichmäßig plätschernder Wortschwall ohne lauten Flötenschluss.",
		"Raues „tschäck“, ähnlich anderen Grasmücken.",
		["moenchsgrasmuecke"],
		"Unauffällig gefärbt und fast immer im dichten Laub verborgen."
	],
	[
		"dorngrasmuecke",
		"Dorngrasmücke",
		"Curruca communis",
		["field", "garden"],
		2,
		"Kurze, kratzig-fröhliche Strophe wie ein hastig gesprochener Satz.",
		"Raues, nasales „wäd-wäd“.",
		["gartengrasmuecke"],
		"Singt gern von der Spitze einer Hecke oder im kurzen Singflug."
	],
	[
		"zilpzalp",
		"Zilpzalp",
		"Phylloscopus collybita",
		[
			"garden",
			"forest",
			"water"
		],
		1,
		"Abwechselnde trockene „zilp-zalp“-Töne wie ein Metronom.",
		"Weiches, ansteigendes „hüit“.",
		["fitis"],
		"Sein deutscher Name gibt den Gesang direkt wieder."
	],
	[
		"fitis",
		"Fitis",
		"Phylloscopus trochilus",
		[
			"forest",
			"water",
			"field"
		],
		2,
		"Weiche Tonleiter, die am Ende müde nach unten rieselt.",
		"Zweisilbig ansteigendes „hü-id“.",
		["zilpzalp"],
		"Sieht dem Zilpzalp sehr ähnlich, klingt aber völlig anders."
	],
	[
		"sommergoldhaehnchen",
		"Sommergoldhähnchen",
		"Regulus ignicapilla",
		["forest", "park"],
		3,
		"Sehr hohe Reihe, die zum Ende schneller und betonter wird.",
		"Extrem hohes, dünnes „si-si-si“.",
		["wintergoldhaehnchen"],
		"Trägt einen auffälligen weißen Überaugenstreif."
	],
	[
		"wintergoldhaehnchen",
		"Wintergoldhähnchen",
		"Regulus regulus",
		["forest"],
		3,
		"Mehrere höchste „si“-Töne mit kurzem verschnörkeltem Abschluss.",
		"Sehr feines, gleichmäßiges „sri-sri“.",
		["sommergoldhaehnchen"],
		"Der kleinste Vogel Europas lebt bevorzugt in Nadelwäldern."
	],
	[
		"goldammer",
		"Goldammer",
		"Emberiza citrinella",
		["field", "garden"],
		1,
		"Mehrere kurze Töne und ein langer Schluss: „wie hab ich dich lieb“.",
		"Kurzes, scharfes „zitt“.",
		["rohrammer"],
		"Singt häufig exponiert von Hecken und Leitungen."
	],
	[
		"feldlerche",
		"Feldlerche",
		"Alauda arvensis",
		["field"],
		1,
		"Endloser heller Strom aus Trillern und Rollen hoch aus der Luft.",
		"Trockenes „trrli“ im Flug.",
		["baumpieper"],
		"Der ausdauernde Singflug kann mehrere Minuten dauern."
	],
	[
		"hausrotschwanz",
		"Hausrotschwanz",
		"Phoenicurus ochruros",
		[
			"garden",
			"park",
			"mountain"
		],
		2,
		"Heller Auftakt, knirschende Papierknäuel-Passage, knapper Schluss.",
		"Kurzes „hüit-täck“.",
		["gartenrotschwanz"],
		"Singt schon vor Sonnenaufgang von Dächern und Antennen."
	],
	[
		"gartenrotschwanz",
		"Gartenrotschwanz",
		"Phoenicurus phoenicurus",
		[
			"garden",
			"park",
			"forest"
		],
		3,
		"Gedehnter gleicher Beginn, danach variable kurze Zwitscherfolge.",
		"Weiches „hüit“ mit trockenem „tick“.",
		["hausrotschwanz"],
		"Benötigt alte Bäume mit Höhlen und offene Bodenflächen."
	],
	[
		"kleiber",
		"Kleiber",
		"Sitta europaea",
		["park", "forest"],
		1,
		"Weit tragende „wiit“-Pfiffe oder schnell perlende Pfeifreihe.",
		"Kräftiges „twett“ und aufgeregtes Trillern.",
		["waldbaumlaeufer", "gartenbaumlaeufer"],
		"Kann als einziger heimischer Vogel kopfüber am Stamm abwärts laufen."
	],
	[
		"waldbaumlaeufer",
		"Waldbaumläufer",
		"Certhia familiaris",
		["forest"],
		3,
		"Sehr hohe fallende Tonreihe mit dünnem Triller am Ende.",
		"Hohes, feines „srii“.",
		["gartenbaumlaeufer", "kleiber"],
		"Klettert spiralförmig an Stämmen empor und fliegt zum nächsten Stammfuß."
	],
	[
		"sumpfmeise",
		"Sumpfmeise",
		"Poecile palustris",
		["forest", "water"],
		3,
		"Schnelle Reihe gleich hoher, harter „tjip“-Töne.",
		"Explosives „pitjäh“.",
		["weidenmeise", "tannenmeise"],
		"Klang und glänzende schwarze Kappe helfen bei der Bestimmung."
	],
	[
		"weidenmeise",
		"Weidenmeise",
		"Poecile montanus",
		["forest", "water"],
		3,
		"Mehrere lang gezogene, traurige „düüh“-Töne.",
		"Nasales, gedehntes „dääh-dääh“.",
		["sumpfmeise"],
		"Bevorzugt feuchte Wälder und meißelt oft selbst eine Bruthöhle."
	],
	[
		"haubenmeise",
		"Haubenmeise",
		"Lophophanes cristatus",
		["forest"],
		2,
		"Hohe Meisenlaute mit trockenem rollendem „gürrr“.",
		"Raues, schnurrendes „brrr“.",
		["tannenmeise"],
		"Ihre spitze Federhaube ist unverkennbar."
	],
	[
		"schwanzmeise",
		"Schwanzmeise",
		"Aegithalos caudatus",
		[
			"garden",
			"forest",
			"water"
		],
		2,
		"Kein ausgeprägter Gesang, sondern feine Rufe im Trupp.",
		"Sehr hohes „sriih“ und kurzes trockenes „trr“.",
		[],
		"Außerhalb der Brutzeit zieht sie fast immer in Familiengruppen umher."
	],
	[
		"pirol",
		"Pirol",
		"Oriolus oriolus",
		["forest", "water"],
		1,
		"Voller exotischer Flötenruf „düdlioh“.",
		"Heiserer, häherähnlicher Alarmruf.",
		["amsel"],
		"Der leuchtend gelbe Vogel bleibt meist hoch im Blätterdach verborgen."
	],
	[
		"kuckuck",
		"Kuckuck",
		"Cuculus canorus",
		[
			"forest",
			"field",
			"water"
		],
		1,
		"Der zweisilbige Name ist der Ruf: „ku-kuck“.",
		"Das Weibchen ruft schnell perlend und ganz anders.",
		["ringeltaube"],
		"Legt seine Eier in die Nester anderer Vogelarten."
	],
	[
		"ringeltaube",
		"Ringeltaube",
		"Columba palumbus",
		[
			"garden",
			"park",
			"forest",
			"field"
		],
		1,
		"Hohle fünfteilige Strophe mit scheinbar fehlendem Schlussschlag.",
		"Explosives Flügelklatschen beim Balzflug.",
		["kuckuck"],
		"Die größte heimische Taube trägt einen weißen Halsfleck."
	],
	[
		"tannenmeise",
		"Tannenmeise",
		"Periparus ater",
		["forest", "park"],
		2,
		"Hohes, schnelles „wize-wize-wize“, gleichmäßiger als die Kohlmeise.",
		"Feines „si-si“ und dünnes Trillern.",
		["kohlmeise", "sumpfmeise"],
		"Typisch für Nadelwälder und an weißem Nackenfleck erkennbar."
	],
	[
		"gartenbaumlaeufer",
		"Gartenbaumläufer",
		"Certhia brachydactyla",
		[
			"garden",
			"park",
			"forest"
		],
		3,
		"Kurze helle Strophe, die rhythmisch mit „ti-ti-tiroiti“ endet.",
		"Lautes, durchdringendes „tüüt“.",
		["waldbaumlaeufer"],
		"Bevorzugt Laubwälder, Parks und alte Obstgärten."
	],
	[
		"heckenbraunelle",
		"Heckenbraunelle",
		"Prunella modularis",
		[
			"garden",
			"park",
			"forest"
		],
		2,
		"Kurzes helles, etwas hastiges Rieseln ohne feste Pointe.",
		"Sehr hohes dünnes „tih“.",
		["zaunkoenig"],
		"Singt oft frei auf einer Spitze, sucht Nahrung aber verborgen am Boden."
	],
	[
		"grauschnaepper",
		"Grauschnäpper",
		"Muscicapa striata",
		[
			"garden",
			"park",
			"forest"
		],
		3,
		"Sehr leise Folge aus rauen „zri“- und „sip“-Lauten.",
		"Scharfes, dünnes „zrii“.",
		["trauerschnaepper"],
		"Jagt Insekten von einer festen Warte und kehrt dorthin zurück."
	],
	[
		"trauerschnaepper",
		"Trauerschnäpper",
		"Ficedula hypoleuca",
		["forest", "park"],
		3,
		"Kurze klare Strophen mit wechselnden hellen und rauen Elementen.",
		"Helles „wit“ oder klickendes „tek“.",
		["grauschnaepper"],
		"Ein Höhlenbrüter, der erst im April aus Afrika zurückkehrt."
	],
	[
		"gelbspoetter",
		"Gelbspötter",
		"Hippolais icterina",
		[
			"garden",
			"park",
			"water"
		],
		3,
		"Rasantes Spotten mit Imitationen, Quietschen und nasalen Lauten.",
		"Kräftiges, rollendes „tä-tä-hüit“.",
		["sumpfrohrsaenger"],
		"Versteckt sich trotz seines lauten Gesangs meist im Laub."
	],
	[
		"sprosser",
		"Sprosser",
		"Luscinia luscinia",
		["water", "forest"],
		3,
		"Kräftige, dunklere Strophen mit hartem Schnarren und Trommeln.",
		"Raues, tiefes Warnen.",
		["nachtigall"],
		"Ersetzt die Nachtigall vor allem im Nordosten Deutschlands."
	],
	[
		"teichrohrsaenger",
		"Teichrohrsänger",
		"Acrocephalus scirpaceus",
		["reed", "water"],
		2,
		"Rhythmisches „tiri-tiri-karre-karre“ aus dem Schilf.",
		"Raues „tscharr“.",
		["sumpfrohrsaenger", "schilfrohrsaenger"],
		"Klettert geschickt zwischen senkrechten Schilfhalmen."
	],
	[
		"sumpfrohrsaenger",
		"Sumpfrohrsänger",
		"Acrocephalus palustris",
		[
			"water",
			"reed",
			"field"
		],
		3,
		"Sehr variabel, schnell und voller täuschend echter Imitationen.",
		"Raues kurzes „tschäck“.",
		["teichrohrsaenger", "gelbspoetter"],
		"Imitiert auf dem Zug auch afrikanische Vogelarten."
	],
	[
		"schilfrohrsaenger",
		"Schilfrohrsänger",
		"Acrocephalus schoenobaenus",
		["reed", "water"],
		3,
		"Raues Schwatzen mit pfeifenden Einschüben und beschleunigten Passagen.",
		"Hartes „tek“ und raues „tscharr“.",
		["teichrohrsaenger"],
		"Steigt bei der Balz oft kurz singend über das Schilf."
	],
	[
		"rohrammer",
		"Rohrammer",
		"Emberiza schoeniclus",
		[
			"reed",
			"water",
			"field"
		],
		2,
		"Schlichte langsame Folge „zi-zi-zrüü“.",
		"Dünnes, langgezogenes „zieh“.",
		["goldammer"],
		"Das Männchen trägt im Frühjahr einen schwarzen Kopf."
	],
	[
		"baumpieper",
		"Baumpieper",
		"Anthus trivialis",
		["field", "forest"],
		2,
		"Beschleunigt im Singflug und endet beim Herabgleiten mit gedehnten Tönen.",
		"Hohes, raues „zist“.",
		["wiesenpieper", "feldlerche"],
		"Startet seinen Singflug typischerweise von einem Baum."
	],
	[
		"wiesenpieper",
		"Wiesenpieper",
		"Anthus pratensis",
		["field", "water"],
		3,
		"Feine wiederholte Töne, im Sinkflug schneller werdend.",
		"Dünnes „ist-ist-ist“ im Flug.",
		["baumpieper"],
		"Bewohnt offene feuchte Wiesen und Moore."
	],
	[
		"bachstelze",
		"Bachstelze",
		"Motacilla alba",
		[
			"garden",
			"field",
			"water"
		],
		1,
		"Kurze zwitschernde Folge, meist weniger auffällig als ihre Rufe.",
		"Zweisilbiges „zi-litt“ im wellenförmigen Flug.",
		["gebirgsstelze"],
		"Wippt fast ununterbrochen mit ihrem langen Schwanz."
	],
	[
		"gebirgsstelze",
		"Gebirgsstelze",
		"Motacilla cinerea",
		["water", "mountain"],
		2,
		"Kurze, scharfe Strophen mit metallischen Elementen.",
		"Hohes, hartes „ziss-ziss“.",
		["bachstelze"],
		"Lebt an schnell fließenden Bächen, auch mitten in Städten."
	],
	[
		"neuntoeter",
		"Neuntöter",
		"Lanius collurio",
		["field", "garden"],
		3,
		"Leises schwätzendes Singen mit vielen Imitationen.",
		"Raues „tschäck“ und schnarrende Warnrufe.",
		["dorngrasmuecke"],
		"Spießt Beute gelegentlich als Vorrat auf Dornen."
	],
	[
		"eichelhaeher",
		"Eichelhäher",
		"Garrulus glandarius",
		["forest", "park"],
		1,
		"Leises abwechslungsreiches Schwätzen mit zahlreichen Imitationen.",
		"Lautes, raues „rätsch“.",
		["rabenkraehe"],
		"Warnt mit seinem durchdringenden Ruf den ganzen Wald."
	],
	[
		"elster",
		"Elster",
		"Pica pica",
		[
			"garden",
			"park",
			"field"
		],
		1,
		"Leises plauderndes Subsong-Repertoire.",
		"Schnelles hartes Schackern.",
		["rabenkraehe"],
		"Lebt zunehmend in Städten und baut große überdachte Nester."
	],
	[
		"rabenkraehe",
		"Rabenkrähe",
		"Corvus corone",
		[
			"garden",
			"park",
			"field"
		],
		1,
		"Raues, schlichtes Rufen statt melodischem Gesang.",
		"Kräftiges, heiseres „krah“.",
		["dohle", "kolkrabe"],
		"Sehr intelligent und vielseitig bei Nahrungssuche und Werkzeuggebrauch."
	],
	[
		"dohle",
		"Dohle",
		"Coloeus monedula",
		[
			"park",
			"field",
			"mountain"
		],
		2,
		"Gesellige Folge kurzer Kontaktlaute.",
		"Helles, metallisches „kja“.",
		["rabenkraehe"],
		"Brütet in Kolonien an Türmen, Felsen und alten Bäumen."
	],
	[
		"kolkrabe",
		"Kolkrabe",
		"Corvus corax",
		[
			"forest",
			"field",
			"mountain"
		],
		2,
		"Tiefe, variable Rufe und erstaunlich leise plaudernde Passagen.",
		"Sehr tiefes, rollendes „krronk“.",
		["rabenkraehe"],
		"Der größte Singvogel der Welt bildet oft lebenslange Paare."
	],
	[
		"buntspecht",
		"Buntspecht",
		"Dendrocopos major",
		[
			"garden",
			"park",
			"forest"
		],
		1,
		"Kurze Trommelwirbel mit abruptem Ende.",
		"Lautes, hartes „kix“.",
		["gruenpecht"],
		"Der häufigste heimische Specht besucht auch Futterstellen."
	],
	[
		"gruenpecht",
		"Grünspecht",
		"Picus viridis",
		[
			"garden",
			"park",
			"forest",
			"field"
		],
		1,
		"Lachende, leicht abfallende „klü-klü-klü“-Reihe.",
		"Einzelnes kräftiges „klü“.",
		["buntspecht"],
		"Sucht am Boden vor allem nach Ameisen."
	],
	[
		"waldkauz",
		"Waldkauz",
		"Strix aluco",
		["park", "forest"],
		1,
		"Langgezogenes „huu-hu-huhuhuu“ des Männchens.",
		"Scharfes „kuwitt“ als Kontakt- und Warnruf.",
		["ringeltaube"],
		"Die klassische nächtliche Eulenstimme ist auch in Stadtparks zu hören."
	]
], a = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12
], o = [
	4,
	5,
	6,
	7,
	8,
	9
], s = /* @__PURE__ */ new Set([
	"nachtigall",
	"fitis",
	"dorngrasmuecke",
	"gartengrasmuecke",
	"pirol",
	"kuckuck",
	"gartenrotschwanz",
	"grauschnaepper",
	"trauerschnaepper",
	"gelbspoetter",
	"sprosser",
	"teichrohrsaenger",
	"sumpfrohrsaenger",
	"schilfrohrsaenger",
	"baumpieper",
	"neuntoeter"
]), c = /* @__PURE__ */ new Set([
	"sprosser",
	"weidenmeise",
	"wacholderdrossel"
]), l = /* @__PURE__ */ new Set([
	"sommergoldhaehnchen",
	"pirol",
	"gartenrotschwanz",
	"gebirgsstelze"
]), u = {
	buntspecht: ["drumming", "call"],
	gruenpecht: ["call", "flight"],
	waldkauz: ["call", "alarm"],
	schwanzmeise: ["call", "flight"],
	rabenkraehe: ["call", "alarm"],
	eichelhaeher: ["call", "alarm"],
	elster: ["call", "alarm"],
	dohle: ["call", "flight"],
	kolkrabe: ["call", "alarm"]
}, d = [
	[
		"#75563f",
		"#433a32",
		"#e68a49",
		"#eee3d0"
	],
	[
		"#526c55",
		"#263c32",
		"#d2df72",
		"#eee8d8"
	],
	[
		"#6d7684",
		"#313b48",
		"#d7a453",
		"#eee7dc"
	],
	[
		"#9a704e",
		"#694c39",
		"#c89c72",
		"#efe1cb"
	],
	[
		"#465d6d",
		"#263743",
		"#8fc1d6",
		"#f0eadb"
	],
	[
		"#626248",
		"#333b2d",
		"#d5c85b",
		"#ece6cf"
	]
];
function f(e) {
	if ([
		"haubenmeise",
		"sommergoldhaehnchen",
		"wintergoldhaehnchen"
	].includes(e)) return "crest";
	if (e === "schwanzmeise") return "long-tail";
	if (["rotkehlchen", "gimpel"].includes(e)) return "red-chest";
	if ([
		"waldbaumlaeufer",
		"gartenbaumlaeufer",
		"pirol"
	].includes(e)) return "long-beak";
}
var p = i.map((e, t) => {
	let [n, r, i, p, m, h, g, ee = [], _ = "Eine charakteristische heimische Vogelart."] = e, v = [
		"north",
		"central",
		"south"
	];
	return c.has(n) && (v = ["north", "central"]), l.has(n) && (v = ["central", "south"]), {
		id: n,
		name: r,
		scientificName: i,
		habitats: p,
		difficulty: m,
		songTip: h,
		callTip: g,
		confusions: ee,
		fact: _,
		regions: v,
		activeMonths: s.has(n) ? o : a,
		voiceTypes: u[n] ?? ["song", "call"],
		illustration: {
			palette: d[t % d.length],
			mark: f(n)
		},
		photo: `/media/photos/${n}.webp`
	};
}), m = new Map(p.map((e) => [e.id, e])), h = 20, g = 30, ee = class {
	audios = [];
	volumes = /* @__PURE__ */ new WeakMap();
	context = null;
	analyser = null;
	frame = 0;
	rate = 1;
	looping = !1;
	currentId = null;
	listener = null;
	get isPlaying() {
		return this.audios.some((e) => !e.paused);
	}
	get currentRecordingId() {
		return this.currentId;
	}
	get playbackRate() {
		return this.rate;
	}
	get loop() {
		return this.looping;
	}
	onStateChange(e) {
		this.listener = e, this.emit();
	}
	async play(e, t = {}) {
		this.stop();
		let n = this.createAudio(e.src, 1, !1);
		this.audios.push(n);
		for (let e of t.backgrounds ?? []) this.audios.push(this.createAudio(e.src, .12, !0));
		let r = this.audios;
		this.currentId = e.id, n.addEventListener("ended", () => this.finish(n), { once: !0 }), t.canvas && this.connect(n, t.canvas, t.pan ?? 0), await this.context?.resume().catch(() => void 0), await Promise.all(r.map((e) => e.play().catch(() => void 0))), r === this.audios && (this.emit(), await this.fade(r, 1, h));
	}
	async playOrToggle(e, t = {}) {
		this.currentId === e.id && this.audios.length ? await this.toggle() : await this.play(e, t);
	}
	async toggle() {
		if (!this.audios.length) return;
		let e = this.audios;
		if (this.isPlaying) {
			if (await this.fade(e, 0, g), e !== this.audios) return;
			e.forEach((e) => e.pause()), this.emit();
			return;
		}
		e.forEach((e) => {
			e.volume = 0;
		}), await this.context?.resume().catch(() => void 0), await Promise.all(e.map((e) => e.play().catch(() => void 0))), e === this.audios && (this.emit(), await this.fade(e, 1, h));
	}
	setRate(e) {
		this.rate = e, this.audios.forEach((t) => {
			t.playbackRate = e, t.preservesPitch = !0;
		});
	}
	setLoop(e) {
		this.looping = e, this.audios[0] && (this.audios[0].loop = e);
	}
	stop() {
		cancelAnimationFrame(this.frame);
		let e = this.audios;
		this.audios = [], this.currentId = null, this.analyser = null, this.emit(), this.fade(e, 0, g).then(() => {
			for (let t of e) t.pause(), t.currentTime = 0;
		});
	}
	createAudio(e, t, n) {
		let r = new Audio(e);
		return r.preload = "auto", r.volume = 0, r.loop = n || this.looping, this.volumes.set(r, t), r.playbackRate = this.rate, r.preservesPitch = !0, r;
	}
	finish(e) {
		if (this.audios[0] !== e || e.loop) return;
		cancelAnimationFrame(this.frame);
		let t = this.audios.slice(1);
		this.audios = [], this.currentId = null, this.analyser = null, this.emit(), this.fade(t, 0, g).then(() => t.forEach((e) => e.pause()));
	}
	async fade(e, t, n) {
		if (!e.length) return;
		let r = e.map((e) => e.volume);
		for (let i = 1; i <= 5; i += 1) {
			await new Promise((e) => setTimeout(e, n / 5));
			let a = i / 5;
			e.forEach((e, n) => {
				let i = (this.volumes.get(e) ?? 1) * t;
				e.volume = Math.max(0, Math.min(1, (r[n] ?? 0) + (i - (r[n] ?? 0)) * a));
			});
		}
	}
	emit() {
		this.listener?.({
			recordingId: this.currentId,
			playing: this.isPlaying,
			paused: !!(this.audios.length && !this.isPlaying)
		});
	}
	connect(e, t, n) {
		if (window.AudioContext) try {
			this.context ??= new AudioContext();
			let r = this.context.createMediaElementSource(e), i = this.context.createAnalyser();
			if (i.fftSize = 256, this.context.createStereoPanner) {
				let e = this.context.createStereoPanner();
				e.pan.value = n, r.connect(e), e.connect(i);
			} else r.connect(i);
			i.connect(this.context.destination), this.analyser = i, this.draw(t);
		} catch {
			this.analyser = null;
		}
	}
	draw(e) {
		if (!this.analyser || !e.isConnected) return;
		let t = e.getContext("2d");
		if (!t) return;
		let n = window.devicePixelRatio || 1, r = Math.max(240, e.clientWidth) * n, i = Math.max(70, e.clientHeight) * n;
		(e.width !== r || e.height !== i) && (e.width = r, e.height = i);
		let a = new Uint8Array(this.analyser.frequencyBinCount);
		this.analyser.getByteFrequencyData(a), t.clearRect(0, 0, r, i);
		let o = r / 48;
		for (let e = 0; e < 48; e += 1) {
			let n = (a[e] ?? 0) / 255, r = 4 + n * i * .88;
			t.fillStyle = `rgba(199,240,111,${.24 + n * .76})`, t.fillRect(e * o, i - r, Math.max(2, o - 3), r);
		}
		this.frame = requestAnimationFrame(() => this.draw(e));
	}
}, _ = null;
function v() {
	return _ ??= (async () => {
		let e = await fetch("/media/manifest.json"), t = !1;
		if (e.ok || (e = await fetch("/public/media/manifest.json"), t = e.ok), !e.ok) throw Error("Medienverzeichnis nicht verfügbar");
		let n = await e.json();
		return t && (n.recordings.forEach((e) => {
			e.src = `/public${e.src}`;
		}), n.photos.forEach((e) => {
			e.src = `/public${e.src}`;
		})), n;
	})(), _;
}
async function y(e, t = "mixed") {
	let n = (await v()).recordings.filter((t) => t.speciesId === e), r = t === "mixed" ? n : n.filter((e) => e.voiceType === t);
	return r.length ? r : n;
}
async function b(e, t, n = Math.random()) {
	let r = await y(e, t), i = r[Math.floor(n * r.length)] ?? r[0];
	if (!i) throw Error(`Keine Aufnahme für ${e}`);
	return i;
}
//#endregion
//#region node_modules/idb/build/index.js
var x = (e, t) => t.some((t) => e instanceof t), S, C;
function w() {
	return S ||= [
		IDBDatabase,
		IDBObjectStore,
		IDBIndex,
		IDBCursor,
		IDBTransaction
	];
}
function T() {
	return C ||= [
		IDBCursor.prototype.advance,
		IDBCursor.prototype.continue,
		IDBCursor.prototype.continuePrimaryKey
	];
}
var E = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap();
function k(e) {
	let t = new Promise((t, n) => {
		let r = () => {
			e.removeEventListener("success", i), e.removeEventListener("error", a);
		}, i = () => {
			t(F(e.result)), r();
		}, a = () => {
			n(e.error), r();
		};
		e.addEventListener("success", i), e.addEventListener("error", a);
	});
	return O.set(t, e), t;
}
function A(e) {
	if (E.has(e)) return;
	let t = new Promise((t, n) => {
		let r = () => {
			e.removeEventListener("complete", i), e.removeEventListener("error", a), e.removeEventListener("abort", a);
		}, i = () => {
			t(), r();
		}, a = () => {
			n(e.error || new DOMException("AbortError", "AbortError")), r();
		};
		e.addEventListener("complete", i), e.addEventListener("error", a), e.addEventListener("abort", a);
	});
	E.set(e, t);
}
var j = {
	get(e, t, n) {
		if (e instanceof IDBTransaction) {
			if (t === "done") return E.get(e);
			if (t === "store") return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
		}
		return F(e[t]);
	},
	set(e, t, n) {
		return e[t] = n, !0;
	},
	has(e, t) {
		return e instanceof IDBTransaction && (t === "done" || t === "store") || t in e;
	}
};
function M(e) {
	j = e(j);
}
function N(e) {
	return T().includes(e) ? function(...t) {
		return e.apply(I(this), t), F(this.request);
	} : function(...t) {
		return F(e.apply(I(this), t));
	};
}
function P(e) {
	return typeof e == "function" ? N(e) : (e instanceof IDBTransaction && A(e), x(e, w()) ? new Proxy(e, j) : e);
}
function F(e) {
	if (e instanceof IDBRequest) return k(e);
	if (D.has(e)) return D.get(e);
	let t = P(e);
	return t !== e && (D.set(e, t), O.set(t, e)), t;
}
var I = (e) => O.get(e);
function te(e, t, { blocked: n, upgrade: r, blocking: i, terminated: a } = {}) {
	let o = indexedDB.open(e, t), s = F(o);
	return r && o.addEventListener("upgradeneeded", (e) => {
		r(F(o.result), e.oldVersion, e.newVersion, F(o.transaction), e);
	}), n && o.addEventListener("blocked", (e) => n(e.oldVersion, e.newVersion, e)), s.then((e) => {
		a && e.addEventListener("close", () => a()), i && e.addEventListener("versionchange", (e) => i(e.oldVersion, e.newVersion, e));
	}).catch(() => {}), s;
}
function L(e, { blocked: t } = {}) {
	let n = indexedDB.deleteDatabase(e);
	return t && n.addEventListener("blocked", (e) => t(e.oldVersion, e)), F(n).then(() => void 0);
}
var R = [
	"get",
	"getKey",
	"getAll",
	"getAllKeys",
	"count"
], z = [
	"put",
	"add",
	"delete",
	"clear"
], B = /* @__PURE__ */ new Map();
function ne(e, t) {
	if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
	if (B.get(t)) return B.get(t);
	let n = t.replace(/FromIndex$/, ""), r = t !== n, i = z.includes(n);
	if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || R.includes(n))) return;
	let a = async function(e, ...t) {
		let a = this.transaction(e, i ? "readwrite" : "readonly"), o = a.store;
		return r && (o = o.index(t.shift())), (await Promise.all([o[n](...t), i && a.done]))[0];
	};
	return B.set(t, a), a;
}
M((e) => ({
	...e,
	get: (t, n, r) => ne(t, n) || e.get(t, n, r),
	has: (t, n) => !!ne(t, n) || e.has(t, n)
}));
var re = [
	"continue",
	"continuePrimaryKey",
	"advance"
], ie = {}, ae = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), se = { get(e, t) {
	if (!re.includes(t)) return e[t];
	let n = ie[t];
	return n ||= ie[t] = function(...e) {
		ae.set(this, oe.get(this)[t](...e));
	}, n;
} };
async function* ce(...e) {
	let t = this;
	if (t instanceof IDBCursor || (t = await t.openCursor(...e)), !t) return;
	t = t;
	let n = new Proxy(t, se);
	for (oe.set(n, t), O.set(n, I(t)); t;) yield n, t = await (ae.get(n) || t.continue()), ae.delete(n);
}
function le(e, t) {
	return t === Symbol.asyncIterator && x(e, [
		IDBIndex,
		IDBObjectStore,
		IDBCursor
	]) || t === "iterate" && x(e, [IDBIndex, IDBObjectStore]);
}
M((e) => ({
	...e,
	get(t, n, r) {
		return le(t, n) ? ce : e.get(t, n, r);
	},
	has(t, n) {
		return le(t, n) || e.has(t, n);
	}
}));
//#endregion
//#region node_modules/fflate/esm/browser.js
var V = Uint8Array, H = Uint16Array, ue = Int32Array, de = new V([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]), fe = new V([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]), pe = new V([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]), me = function(e, t) {
	for (var n = new H(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new ue(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, he = me(de, 2), ge = he.b, _e = he.r;
ge[28] = 258, _e[258] = 28;
for (var ve = me(fe, 0), ye = ve.b, be = ve.r, xe = new H(32768), U = 0; U < 32768; ++U) {
	var Se = (U & 43690) >> 1 | (U & 21845) << 1;
	Se = (Se & 52428) >> 2 | (Se & 13107) << 2, Se = (Se & 61680) >> 4 | (Se & 3855) << 4, xe[U] = ((Se & 65280) >> 8 | (Se & 255) << 8) >> 1;
}
for (var W = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new H(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new H(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new H(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[xe[d] >> c] = l;
	} else for (s = new H(r), i = 0; i < r; ++i) e[i] && (s[i] = xe[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), Ce = new V(288), U = 0; U < 144; ++U) Ce[U] = 8;
for (var U = 144; U < 256; ++U) Ce[U] = 9;
for (var U = 256; U < 280; ++U) Ce[U] = 7;
for (var U = 280; U < 288; ++U) Ce[U] = 8;
for (var we = new V(32), U = 0; U < 32; ++U) we[U] = 5;
var Te = /*#__PURE__*/ W(Ce, 9, 0), Ee = /*#__PURE__*/ W(Ce, 9, 1), De = /*#__PURE__*/ W(we, 5, 0), Oe = /*#__PURE__*/ W(we, 5, 1), ke = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, G = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, Ae = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, je = function(e) {
	return (e + 7) / 8 | 0;
}, Me = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new V(e.subarray(t, n));
}, Ne = [
	"unexpected EOF",
	"invalid block type",
	"invalid length/literal",
	"invalid distance",
	"stream finished",
	"no stream handler",
	,
	"no callback",
	"invalid UTF-8 data",
	"extra field too long",
	"date not in range 1980-2099",
	"filename too long",
	"stream finishing",
	"invalid zip data"
], K = function(e, t, n) {
	var r = Error(t || Ne[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, K), !n) throw r;
	return r;
}, Pe = function(e, t, n, r) {
	var i = e.length, a = r ? r.length : 0;
	if (!i || t.f && !t.l) return n || new V(0);
	var o = !n, s = o || t.i != 2, c = t.i;
	o && (n = new V(i * 3));
	var l = function(e) {
		var t = n.length;
		if (e > t) {
			var r = new V(Math.max(t * 2, e));
			r.set(n), n = r;
		}
	}, u = t.f || 0, d = t.p || 0, f = t.b || 0, p = t.l, m = t.d, h = t.m, g = t.n, ee = i * 8;
	do {
		if (!p) {
			u = G(e, d, 1);
			var _ = G(e, d + 1, 3);
			if (d += 3, !_) {
				var v = je(d) + 4, y = e[v - 4] | e[v - 3] << 8, b = v + y;
				if (b > i) {
					c && K(0);
					break;
				}
				s && l(f + y), n.set(e.subarray(v, b), f), t.b = f += y, t.p = d = b * 8, t.f = u;
				continue;
			} else if (_ == 1) p = Ee, m = Oe, h = 9, g = 5;
			else if (_ == 2) {
				var x = G(e, d, 31) + 257, S = G(e, d + 10, 15) + 4, C = x + G(e, d + 5, 31) + 1;
				d += 14;
				for (var w = new V(C), T = new V(19), E = 0; E < S; ++E) T[pe[E]] = G(e, d + E * 3, 7);
				d += S * 3;
				for (var D = ke(T), O = (1 << D) - 1, k = W(T, D, 1), E = 0; E < C;) {
					var A = k[G(e, d, O)];
					d += A & 15;
					var v = A >> 4;
					if (v < 16) w[E++] = v;
					else {
						var j = 0, M = 0;
						for (v == 16 ? (M = 3 + G(e, d, 3), d += 2, j = w[E - 1]) : v == 17 ? (M = 3 + G(e, d, 7), d += 3) : v == 18 && (M = 11 + G(e, d, 127), d += 7); M--;) w[E++] = j;
					}
				}
				var N = w.subarray(0, x), P = w.subarray(x);
				h = ke(N), g = ke(P), p = W(N, h, 1), m = W(P, g, 1);
			} else K(1);
			if (d > ee) {
				c && K(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var F = (1 << h) - 1, I = (1 << g) - 1, te = d;; te = d) {
			var j = p[Ae(e, d) & F], L = j >> 4;
			if (d += j & 15, d > ee) {
				c && K(0);
				break;
			}
			if (j || K(2), L < 256) n[f++] = L;
			else if (L == 256) {
				te = d, p = null;
				break;
			} else {
				var R = L - 254;
				if (L > 264) {
					var E = L - 257, z = de[E];
					R = G(e, d, (1 << z) - 1) + ge[E], d += z;
				}
				var B = m[Ae(e, d) & I], ne = B >> 4;
				B || K(3), d += B & 15;
				var P = ye[ne];
				if (ne > 3) {
					var z = fe[ne];
					P += Ae(e, d) & (1 << z) - 1, d += z;
				}
				if (d > ee) {
					c && K(0);
					break;
				}
				s && l(f + 131072);
				var re = f + R;
				if (f < P) {
					var ie = a - P, ae = Math.min(P, re);
					for (ie + f < 0 && K(3); f < ae; ++f) n[f] = r[ie + f];
				}
				for (; f < re; ++f) n[f] = n[f - P];
			}
		}
		t.l = p, t.p = te, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? Me(n, 0, f) : n.subarray(0, f);
}, Fe = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, Ie = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, Le = function(e, t) {
	for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
		s: r,
		f: e[r]
	});
	var i = n.length, a = n.slice();
	if (!i) return {
		t: We,
		l: 0
	};
	if (i == 1) {
		var o = new V(n[0].s + 1);
		return o[n[0].s] = 1, {
			t: o,
			l: 1
		};
	}
	n.sort(function(e, t) {
		return e.f - t.f;
	}), n.push({
		s: -1,
		f: 25001
	});
	var s = n[0], c = n[1], l = 0, u = 1, d = 2;
	for (n[0] = {
		s: -1,
		f: s.f + c.f,
		l: s,
		r: c
	}; u != i - 1;) s = n[n[l].f < n[d].f ? l++ : d++], c = n[l != u && n[l].f < n[d].f ? l++ : d++], n[u++] = {
		s: -1,
		f: s.f + c.f,
		l: s,
		r: c
	};
	for (var f = a[0].s, r = 1; r < i; ++r) a[r].s > f && (f = a[r].s);
	var p = new H(f + 1), m = Re(n[u - 1], p, 0);
	if (m > t) {
		var r = 0, h = 0, g = m - t, ee = 1 << g;
		for (a.sort(function(e, t) {
			return p[t.s] - p[e.s] || e.f - t.f;
		}); r < i; ++r) {
			var _ = a[r].s;
			if (p[_] > t) h += ee - (1 << m - p[_]), p[_] = t;
			else break;
		}
		for (h >>= g; h > 0;) {
			var v = a[r].s;
			p[v] < t ? h -= 1 << t - p[v]++ - 1 : ++r;
		}
		for (; r >= 0 && h; --r) {
			var y = a[r].s;
			p[y] == t && (--p[y], ++h);
		}
		m = t;
	}
	return {
		t: new V(p),
		l: m
	};
}, Re = function(e, t, n) {
	return e.s == -1 ? Math.max(Re(e.l, t, n + 1), Re(e.r, t, n + 1)) : t[e.s] = n;
}, ze = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new H(++t), r = 0, i = e[0], a = 1, o = function(e) {
		n[r++] = e;
	}, s = 1; s <= t; ++s) if (e[s] == i && s != t) ++a;
	else {
		if (!i && a > 2) {
			for (; a > 138; a -= 138) o(32754);
			a > 2 && (o(a > 10 ? a - 11 << 5 | 28690 : a - 3 << 5 | 12305), a = 0);
		} else if (a > 3) {
			for (o(i), --a; a > 6; a -= 6) o(8304);
			a > 2 && (o(a - 3 << 5 | 8208), a = 0);
		}
		for (; a--;) o(i);
		a = 1, i = e[s];
	}
	return {
		c: n.subarray(0, r),
		n: t
	};
}, Be = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, Ve = function(e, t, n) {
	var r = n.length, i = je(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, He = function(e, t, n, r, i, a, o, s, c, l, u) {
	Fe(t, u++, n), ++i[256];
	for (var d = Le(i, 15), f = d.t, p = d.l, m = Le(a, 15), h = m.t, g = m.l, ee = ze(f), _ = ee.c, v = ee.n, y = ze(h), b = y.c, x = y.n, S = new H(19), C = 0; C < _.length; ++C) ++S[_[C] & 31];
	for (var C = 0; C < b.length; ++C) ++S[b[C] & 31];
	for (var w = Le(S, 7), T = w.t, E = w.l, D = 19; D > 4 && !T[pe[D - 1]]; --D);
	var O = l + 5 << 3, k = Be(i, Ce) + Be(a, we) + o, A = Be(i, f) + Be(a, h) + o + 14 + 3 * D + Be(S, T) + 2 * S[16] + 3 * S[17] + 7 * S[18];
	if (c >= 0 && O <= k && O <= A) return Ve(t, u, e.subarray(c, c + l));
	var j, M, N, P;
	if (Fe(t, u, 1 + (A < k)), u += 2, A < k) {
		j = W(f, p, 0), M = f, N = W(h, g, 0), P = h;
		var F = W(T, E, 0);
		Fe(t, u, v - 257), Fe(t, u + 5, x - 1), Fe(t, u + 10, D - 4), u += 14;
		for (var C = 0; C < D; ++C) Fe(t, u + 3 * C, T[pe[C]]);
		u += 3 * D;
		for (var I = [_, b], te = 0; te < 2; ++te) for (var L = I[te], C = 0; C < L.length; ++C) {
			var R = L[C] & 31;
			Fe(t, u, F[R]), u += T[R], R > 15 && (Fe(t, u, L[C] >> 5 & 127), u += L[C] >> 12);
		}
	} else j = Te, M = Ce, N = De, P = we;
	for (var C = 0; C < s; ++C) {
		var z = r[C];
		if (z > 255) {
			var R = z >> 18 & 31;
			Ie(t, u, j[R + 257]), u += M[R + 257], R > 7 && (Fe(t, u, z >> 23 & 31), u += de[R]);
			var B = z & 31;
			Ie(t, u, N[B]), u += P[B], B > 3 && (Ie(t, u, z >> 5 & 8191), u += fe[B]);
		} else Ie(t, u, j[z]), u += M[z];
	}
	return Ie(t, u, j[256]), u + M[256];
}, Ue = /*#__PURE__*/ new ue([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), We = /*#__PURE__*/ new V(0), Ge = function(e, t, n, r, i, a) {
	var o = a.z || e.length, s = new V(r + o + 5 * (1 + Math.ceil(o / 7e3)) + i), c = s.subarray(r, s.length - i), l = a.l, u = (a.r || 0) & 7;
	if (t) {
		u && (c[0] = a.r >> 3);
		for (var d = Ue[t - 1], f = d >> 13, p = d & 8191, m = (1 << n) - 1, h = a.p || new H(32768), g = a.h || new H(m + 1), ee = Math.ceil(n / 3), _ = 2 * ee, v = function(t) {
			return (e[t] ^ e[t + 1] << ee ^ e[t + 2] << _) & m;
		}, y = new ue(25e3), b = new H(288), x = new H(32), S = 0, C = 0, w = a.i || 0, T = 0, E = a.w || 0, D = 0; w + 2 < o; ++w) {
			var O = v(w), k = w & 32767, A = g[O];
			if (h[k] = A, g[O] = k, E <= w) {
				var j = o - w;
				if ((S > 7e3 || T > 24576) && (j > 423 || !l)) {
					u = He(e, c, 0, y, b, x, C, T, D, w - D, u), T = S = C = 0, D = w;
					for (var M = 0; M < 286; ++M) b[M] = 0;
					for (var M = 0; M < 30; ++M) x[M] = 0;
				}
				var N = 2, P = 0, F = p, I = k - A & 32767;
				if (j > 2 && O == v(w - I)) for (var te = Math.min(f, j) - 1, L = Math.min(32767, w), R = Math.min(258, j); I <= L && --F && k != A;) {
					if (e[w + N] == e[w + N - I]) {
						for (var z = 0; z < R && e[w + z] == e[w + z - I]; ++z);
						if (z > N) {
							if (N = z, P = I, z > te) break;
							for (var B = Math.min(I, z - 2), ne = 0, M = 0; M < B; ++M) {
								var re = w - I + M & 32767, ie = re - h[re] & 32767;
								ie > ne && (ne = ie, A = re);
							}
						}
					}
					k = A, A = h[k], I += k - A & 32767;
				}
				if (P) {
					y[T++] = 268435456 | _e[N] << 18 | be[P];
					var ae = _e[N] & 31, oe = be[P] & 31;
					C += de[ae] + fe[oe], ++b[257 + ae], ++x[oe], E = w + N, ++S;
				} else y[T++] = e[w], ++b[e[w]];
			}
		}
		for (w = Math.max(w, E); w < o; ++w) y[T++] = e[w], ++b[e[w]];
		u = He(e, c, l, y, b, x, C, T, D, w - D, u), l || (a.r = u & 7 | c[u / 8 | 0] << 3, u -= 7, a.h = g, a.p = h, a.i = w, a.w = E);
	} else {
		for (var w = a.w || 0; w < o + l; w += 65535) {
			var se = w + 65535;
			se >= o && (c[u / 8 | 0] = l, se = o), u = Ve(c, u + 1, e.subarray(w, se));
		}
		a.i = o;
	}
	return Me(s, 0, r + je(u) + i);
}, Ke = /*#__PURE__*/ (function() {
	for (var e = /* @__PURE__ */ new Int32Array(256), t = 0; t < 256; ++t) {
		for (var n = t, r = 9; --r;) n = (n & 1 && -306674912) ^ n >>> 1;
		e[t] = n;
	}
	return e;
})(), qe = function() {
	var e = -1;
	return {
		p: function(t) {
			for (var n = e, r = 0; r < t.length; ++r) n = Ke[n & 255 ^ t[r]] ^ n >>> 8;
			e = n;
		},
		d: function() {
			return ~e;
		}
	};
}, Je = function(e, t, n, r, i) {
	if (!i && (i = { l: 1 }, t.dictionary)) {
		var a = t.dictionary.subarray(-32768), o = new V(a.length + e.length);
		o.set(a), o.set(e, a.length), e = o, i.w = a.length;
	}
	return Ge(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
}, Ye = function(e, t, n) {
	for (; n; ++t) e[t] = n, n >>>= 8;
}, Xe = function(e, t) {
	var n = t.filename;
	if (e[0] = 31, e[1] = 139, e[2] = 8, e[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0, e[9] = 3, t.mtime != 0 && Ye(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), n) {
		e[3] = 8;
		for (var r = 0; r <= n.length; ++r) e[r + 10] = n.charCodeAt(r);
	}
}, Ze = function(e) {
	(e[0] != 31 || e[1] != 139 || e[2] != 8) && K(6, "invalid gzip data");
	var t = e[3], n = 10;
	t & 4 && (n += (e[10] | e[11] << 8) + 2);
	for (var r = (t >> 3 & 1) + (t >> 4 & 1); r > 0; r -= !e[n++]);
	return n + (t & 2);
}, Qe = function(e) {
	var t = e.length;
	return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}, $e = function(e) {
	return 10 + (e.filename ? e.filename.length + 1 : 0);
};
function et(e, t) {
	t ||= {};
	var n = qe(), r = e.length;
	n.p(e);
	var i = Je(e, t, $e(t), 8), a = i.length;
	return Xe(i, t), Ye(i, a - 8, n.d()), Ye(i, a - 4, r), i;
}
function tt(e, t) {
	var n = Ze(e);
	return n + 8 > e.length && K(6, "invalid gzip data"), Pe(e.subarray(n, -8), { i: 2 }, t && t.out || new V(Qe(e)), t && t.dictionary);
}
var nt = typeof TextEncoder < "u" && /*#__PURE__*/ new TextEncoder(), rt = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	rt.decode(We, { stream: !0 });
} catch {}
var it = function(e) {
	for (var t = "", n = 0;;) {
		var r = e[n++], i = (r > 127) + (r > 223) + (r > 239);
		if (n + i > e.length) return {
			s: t,
			r: Me(e, n - 1)
		};
		i ? i == 3 ? (r = ((r & 15) << 18 | (e[n++] & 63) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) - 65536, t += String.fromCharCode(55296 | r >> 10, 56320 | r & 1023)) : i & 1 ? t += String.fromCharCode((r & 31) << 6 | e[n++] & 63) : t += String.fromCharCode((r & 15) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) : t += String.fromCharCode(r);
	}
};
function at(e, t) {
	if (t) {
		for (var n = new V(e.length), r = 0; r < e.length; ++r) n[r] = e.charCodeAt(r);
		return n;
	}
	if (nt) return nt.encode(e);
	for (var i = e.length, a = new V(e.length + (e.length >> 1)), o = 0, s = function(e) {
		a[o++] = e;
	}, r = 0; r < i; ++r) {
		if (o + 5 > a.length) {
			var c = new V(o + 8 + (i - r << 1));
			c.set(a), a = c;
		}
		var l = e.charCodeAt(r);
		l < 128 || t ? s(l) : l < 2048 ? (s(192 | l >> 6), s(128 | l & 63)) : l > 55295 && l < 57344 ? (l = 65536 + (l & 1047552) | e.charCodeAt(++r) & 1023, s(240 | l >> 18), s(128 | l >> 12 & 63), s(128 | l >> 6 & 63), s(128 | l & 63)) : (s(224 | l >> 12), s(128 | l >> 6 & 63), s(128 | l & 63));
	}
	return Me(a, 0, o);
}
function ot(e, t) {
	if (t) {
		for (var n = "", r = 0; r < e.length; r += 16384) n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
		return n;
	} else if (rt) return rt.decode(e);
	else {
		var i = it(e), a = i.s, n = i.r;
		return n.length && K(8), a;
	}
}
//#endregion
//#region src/core/storage.ts
var st = null;
function ct(e = Date.now()) {
	return {
		version: 2,
		createdAt: e,
		dailyGoal: 10,
		dailyStreak: 0,
		lastDailyDate: "",
		recommendedCourseId: n[0].id,
		placementCourseId: null,
		totalCorrect: 0,
		totalAnswers: 0,
		bestStreak: 0,
		achievements: [],
		confusions: {},
		courseProgress: Object.fromEntries(n.map((e) => [e.id, {
			examBest: 0,
			completed: !1,
			completedPhases: []
		}])),
		settings: {
			region: "all",
			seasonal: !1,
			spatialAudio: !0,
			relaxed: !1,
			contrast: !1,
			largeText: !1,
			reducedMotion: !1,
			weather: "breeze"
		}
	};
}
function lt() {
	return st ??= te("zwitscher-v2", 2, { upgrade(e, t) {
		if (t < 1) {
			e.createObjectStore("profile");
			let t = e.createObjectStore("reviews", { keyPath: "key" });
			t.createIndex("by-due", "dueAt"), t.createIndex("by-species", "speciesId"), e.createObjectStore("sessions", { keyPath: "id" }).createIndex("by-finished", "finishedAt"), e.createObjectStore("content");
		}
		let n = e;
		n.objectStoreNames.contains("journal") && n.deleteObjectStore("journal"), n.objectStoreNames.contains("journalMedia") && n.deleteObjectStore("journalMedia");
	} }), st;
}
async function ut() {
	if (Object.keys(localStorage).some((e) => e === "zwitscher-progress" || e.startsWith("zwitscher-offline-"))) return !0;
	try {
		if ((await indexedDB.databases()).some((e) => e.name === "zwitscher-media")) return !0;
	} catch {}
	try {
		return (await caches.keys()).some((e) => e === "zwitscher-audio-v1" || e.startsWith("zwitscher-core-"));
	} catch {
		return !1;
	}
}
async function dt() {
	if (Object.keys(localStorage).filter((e) => e.startsWith("zwitscher-")).forEach((e) => localStorage.removeItem(e)), await L("zwitscher-media").catch(() => void 0), "caches" in window) {
		let e = await caches.keys();
		await Promise.all(e.filter((e) => e.includes("zwitscher")).map((e) => caches.delete(e)));
	}
	let e = await lt();
	await Promise.all([
		"profile",
		"reviews",
		"sessions",
		"content"
	].map((t) => e.clear(t)));
	let t = ct();
	return await e.put("profile", t, "main"), localStorage.setItem("zwitscher-v2-reset-complete", "1"), t;
}
async function ft() {
	let e = await lt(), t = await e.get("profile", "main");
	if (t) return t;
	let n = ct();
	return await e.put("profile", n, "main"), n;
}
async function pt(e) {
	await (await lt()).put("profile", e, "main");
}
async function mt() {
	return (await lt()).getAll("reviews");
}
async function ht(e) {
	await (await lt()).put("reviews", e);
}
async function gt(e) {
	await (await lt()).put("sessions", e);
}
async function _t() {
	return (await lt()).getAll("sessions");
}
async function vt() {
	return (await lt()).get("content", "offline");
}
async function yt(e) {
	await (await lt()).put("content", e, "offline");
}
async function bt() {
	let [e, t, n] = await Promise.all([
		ft(),
		mt(),
		_t()
	]), r = {
		format: "zwitscher-backup",
		version: 2,
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		profile: e,
		reviews: t,
		sessions: n
	};
	return new Blob([et(at(JSON.stringify(r)))], { type: "application/gzip" });
}
async function xt(e) {
	let t = new Uint8Array(await e.arrayBuffer()), n = JSON.parse(ot(tt(t)));
	if (n.format !== "zwitscher-backup" || n.version !== 2 || n.profile?.version !== 2 || !Array.isArray(n.reviews) || !Array.isArray(n.sessions)) throw Error("Ungültige Zwitscher-Sicherung");
	let r = (await lt()).transaction([
		"profile",
		"reviews",
		"sessions"
	], "readwrite");
	await Promise.all([
		"profile",
		"reviews",
		"sessions"
	].map((e) => r.objectStore(e).clear())), await r.objectStore("profile").put(n.profile, "main");
	for (let e of n.reviews) await r.objectStore("reviews").put(e);
	for (let e of n.sessions) await r.objectStore("sessions").put(e);
	await r.done;
}
//#endregion
//#region src/core/offline.ts
var St = "zwitscher-media-v2", Ct = class {
	paused = !1;
	pause() {
		this.paused = !0;
	}
	async install(e) {
		this.paused = !1;
		let t = await v(), n = [...t.photos, ...t.recordings], r = n.map((e) => e.src), i = new Map(n.map((e) => [e.src, e.bytes])), a = await vt();
		(!a || a.version !== t.version) && (await caches.delete(St), a = {
			version: t.version,
			cached: [],
			failed: [],
			total: r.length,
			totalBytes: t.totalBytes,
			downloadedBytes: 0,
			ready: !1,
			paused: !1
		});
		let o = await caches.open(St);
		await o.put("/media/manifest.json", new Response(JSON.stringify(t), { headers: { "content-type": "application/json" } }));
		let s = await Promise.all(a.cached.map(async (e) => [e, !!await o.match(e)])), c = new Set(s.filter(([, e]) => e).map(([e]) => e)), l = /* @__PURE__ */ new Set(), u = () => {
			let e = [...c].reduce((e, t) => e + (i.get(t) ?? 0), 0);
			return {
				version: t.version,
				cached: [...c],
				failed: [...l],
				total: r.length,
				totalBytes: t.totalBytes,
				downloadedBytes: e,
				paused: this.paused,
				ready: c.size === r.length
			};
		};
		for (let t of r) {
			if (this.paused) break;
			if (!c.has(t)) try {
				let e = await fetch(t);
				if (!e.ok) throw Error(String(e.status));
				await o.put(t, e.clone()), c.add(t), l.delete(t);
			} catch {
				l.add(t);
			}
			a = u(), await yt(a), e(a);
		}
		return a = u(), await yt(a), e(a), a;
	}
};
async function wt() {
	let e = await v(), t = await vt(), n = {
		version: e.version,
		cached: [],
		failed: [],
		total: e.photos.length + e.recordings.length,
		totalBytes: e.totalBytes,
		downloadedBytes: 0,
		ready: !1,
		paused: !1
	};
	if (!t || t.version !== e.version || !("caches" in window)) return n;
	let r = await caches.open(St), i = (await Promise.all(t.cached.map(async (e) => await r.match(e) ? e : null))).filter((e) => !!e), a = new Map([...e.photos, ...e.recordings].map((e) => [e.src, e.bytes])), o = i.reduce((e, t) => e + (a.get(t) ?? 0), 0);
	return {
		...n,
		...t,
		cached: i,
		failed: t.failed ?? [],
		downloadedBytes: o,
		ready: i.length === n.total
	};
}
//#endregion
//#region src/core/progress.ts
function Tt(e, t) {
	return e >= .8 && t.length > 0 && t.every((e) => e >= 2);
}
function Et(e, t = 2) {
	let n = Object.entries(e).filter(([e, n]) => e.includes(">") && n >= t).sort((e, t) => t[1] - e[1] || e[0].localeCompare(t[0], "de"))[0];
	if (!n) return null;
	let [r, i] = n[0].split(">");
	return r && i ? [r, i] : null;
}
function Dt(e, t) {
	return Object.entries(t).filter(([t]) => t.startsWith(`${e}>`)).sort((e, t) => t[1] - e[1] || e[0].localeCompare(t[0], "de")).map(([t]) => t.slice(e.length + 1)).filter(Boolean);
}
//#endregion
//#region src/core/router.ts
function Ot(e = location.hash) {
	let [t = "", n = "", r = ""] = e.replace(/^#\/?/, "").split("/");
	return t === "course" && n && r ? {
		name: "lesson",
		courseId: n,
		phase: r
	} : t === "course" && n ? {
		name: "course",
		id: n
	} : t === "species" && n ? {
		name: "species",
		id: n
	} : t === "compare" ? {
		name: "compare",
		first: n || void 0,
		second: r || void 0
	} : [
		"book",
		"stats",
		"settings",
		"placement"
	].includes(t) ? { name: t } : t === "mode" ? {
		name: "mode",
		id: n || void 0
	} : { name: "home" };
}
function kt(e) {
	let t = `#/${e.replace(/^\//, "")}`;
	location.hash === t ? window.dispatchEvent(new HashChangeEvent("hashchange")) : location.hash = t;
}
//#endregion
//#region src/core/scheduler.ts
var At = [
	0,
	1,
	3,
	7,
	14,
	30,
	60,
	120
], jt = 864e5, Mt = 6e5;
function Nt(e, t) {
	return `${e}:${t}`;
}
function Pt(e, t, n = Date.now()) {
	return {
		key: Nt(e, t),
		speciesId: e,
		voiceType: t,
		step: 0,
		dueAt: n,
		correct: 0,
		wrong: 0,
		lapses: 0,
		lastSeenAt: 0,
		lastGrade: 0
	};
}
function Ft(e, t) {
	return e ? t ? 3 : 5 : 0;
}
function It(e, t, n, r = Date.now()) {
	let i = Ft(t, n);
	if (!t) return {
		...e,
		step: 0,
		dueAt: r + Mt,
		wrong: e.wrong + 1,
		lapses: e.lapses + 1,
		lastSeenAt: r,
		lastGrade: i
	};
	if (n) return {
		...e,
		dueAt: r + jt,
		correct: e.correct + 1,
		lastSeenAt: r,
		lastGrade: i
	};
	let a = Math.min(At.length - 1, e.step + 1);
	return {
		...e,
		step: a,
		dueAt: r + At[a] * jt,
		correct: e.correct + 1,
		lastSeenAt: r,
		lastGrade: i
	};
}
function Lt(e, t = Date.now()) {
	return e.step > 0 ? e : {
		...e,
		step: 1,
		dueAt: t + jt,
		lastSeenAt: t,
		lastGrade: 3
	};
}
function Rt(e) {
	return e >= 7 ? {
		level: 4,
		label: "Feldbereit"
	} : e >= 5 ? {
		level: 3,
		label: "Sicher"
	} : e >= 3 ? {
		level: 2,
		label: "Erkannt"
	} : e >= 1 ? {
		level: 1,
		label: "Gehört"
	} : {
		level: 0,
		label: "Unbekannt"
	};
}
function zt(e, t = Date.now()) {
	return e.step > 0 && e.dueAt <= t;
}
function Bt(e, t = Date.now()) {
	return 1 + (zt(e, t) ? 5 : 0) + e.wrong * 1.5 + e.lapses * 2 + Math.max(0, 4 - e.step);
}
//#endregion
//#region src/ui/components.ts
function q(e) {
	return String(e ?? "").replace(/[&<>'"]/g, (e) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"'": "&#39;",
		"\"": "&quot;"
	})[e]);
}
function Vt(e, t = "") {
	let [n, r, i, a] = e.illustration.palette, o = e.illustration.mark === "crest" ? `<path d="m125 33 14-28 8 27 15-24 2 34Z" fill="${i}"/>` : "", s = e.illustration.mark === "long-tail" ? `<path d="M80 158 18 207l75-27Z" fill="${r}"/>` : `<path d="M61 170 34 193l48-10 23-22Z" fill="${r}"/>`, c = e.illustration.mark === "red-chest" ? `<path d="M120 76c18-20 51-17 65 5-8 25-26 36-49 31-2-14-7-26-16-36Z" fill="${i}"/>` : "", l = e.illustration.mark === "long-beak" ? "<path d=\"m188 67 51 9-53 10Z\" fill=\"" + i + "\"/>" : "<path d=\"m188 67 38 9-40 10Z\" fill=\"" + i + "\"/>";
	return `<svg class="bird-art ${t}" viewBox="0 0 240 210" role="img" aria-label="Illustration: ${q(e.name)}"><g transform="translate(3 2)">${s}<path d="M81 170 69 204l34-27Z" fill="${n}"/><ellipse cx="121" cy="122" rx="69" ry="61" fill="${n}" transform="rotate(-10 121 122)"/><ellipse cx="137" cy="138" rx="44" ry="43" fill="${a}" transform="rotate(-17 137 138)"/><ellipse cx="91" cy="129" rx="37" ry="47" fill="${r}" transform="rotate(24 91 129)"/><path d="M65 119c21 4 34 17 44 38-24-5-37-15-44-38Z" fill="${i}" opacity=".34"/><circle cx="150" cy="66" r="43" fill="${n}"/>${o}${c}<circle cx="166" cy="57" r="5" fill="#152e29"/><circle cx="168" cy="55" r="1.4" fill="white"/>${l}<path d="M112 177v18m24-17 4 17m-37 0h18m9 0h19" fill="none" stroke="#684c35" stroke-width="4" stroke-linecap="round"/></g></svg>`;
}
function Ht(e, t) {
	return `<span class="mastery-badge level-${t}"><i></i>${e}</span>`;
}
function Ut(e) {
	return e >= 1024 * 1024 ? `${(e / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(e / 1024)} KB`;
}
function Wt(e = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(e);
}
function Gt(e) {
	let t = [...e].reduce((e, t) => (e << 5) - e + t.charCodeAt(0) | 0, 2166136261);
	return () => {
		t |= 0, t = t + 1831565813 | 0;
		let e = Math.imul(t ^ t >>> 15, 1 | t);
		return e = e + Math.imul(e ^ e >>> 7, 61 | e) ^ e, ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function Kt(e, t = Math.random) {
	let n = [...e];
	for (let e = n.length - 1; e > 0; --e) {
		let r = Math.floor(t() * (e + 1));
		[n[e], n[r]] = [n[r], n[e]];
	}
	return n;
}
//#endregion
//#region src/app.ts
var qt = {
	classic: {
		label: "Freie Runde",
		icon: "♪",
		description: "Acht Stimmen mit frei wählbarem Lauttyp."
	},
	adaptive: {
		label: "Lerntrainer",
		icon: "↻",
		description: "Fällige und unsichere Stimmen gezielt wiederholen."
	},
	dawn: {
		label: "Morgendämmerung",
		icon: "◒",
		description: "In 90 Sekunden möglichst viele Stimmen erkennen."
	},
	survival: {
		label: "Überleben",
		icon: "♥",
		description: "Drei Fehler sind erlaubt."
	},
	soundscape: {
		label: "Klanglandschaft",
		icon: "≋",
		description: "Die führende Stimme aus einem kleinen Chor hören."
	},
	clue: {
		label: "Spurenleser",
		icon: "?",
		description: "Nur aus Lebensraum und Hinweisen bestimmen."
	}
}, Jt = {
	learn: {
		label: "Kennenlernen",
		icon: "01",
		description: "Arten, Stimmen und Merksätze entdecken."
	},
	duel: {
		label: "Zwei Arten",
		icon: "02",
		description: "Ähnliche Stimmen direkt unterscheiden."
	},
	choice: {
		label: "Vierer-Auswahl",
		icon: "03",
		description: "Eine Stimme aus vier Möglichkeiten erkennen."
	},
	recall: {
		label: "Freie Bestimmung",
		icon: "04",
		description: "Den Namen ohne Auswahl eingeben."
	},
	exam: {
		label: "Kursprüfung",
		icon: "✓",
		description: "Zehn Aufgaben ohne Hinweise lösen."
	}
}, J = new ee(), Yt = new Ct(), Xt, Y, Zt = /* @__PURE__ */ new Map(), Qt = [], $t, X, Z = null, en = null;
J.onStateChange(tn);
function tn(e) {
	document.querySelectorAll("button[data-audio-id]").forEach((t) => {
		let n = t.dataset.audioId === e.recordingId && e.playing;
		t.classList.toggle("playing", n), t.setAttribute("aria-pressed", String(n));
		let r = t.querySelector("[data-play-icon]");
		r && (r.textContent = n ? "‖" : "▶");
	});
	let t = document.querySelector("#audio-stage"), n = t?.dataset.audioId === e.recordingId;
	t?.classList.toggle("playing", !!(n && e.playing)), t?.classList.toggle("paused", !!(n && e.paused));
	let r = t?.querySelector("[data-play-status]");
	r && (r.textContent = n ? e.playing ? "Wird abgespielt" : e.paused ? "Pausiert" : "Tippen zum Hören" : "Tippen zum Hören"), document.querySelector("#sound-button")?.classList.toggle("muted", !e.playing);
}
async function nn() {
	if (Xt = document.querySelector("#view"), an(), un(), e({ immediate: !0 }), await ut() && localStorage.getItem("zwitscher-v2-reset-complete") !== "1") {
		on();
		return;
	}
	await rn();
}
async function rn() {
	try {
		[Y, $t, X, Qt] = await Promise.all([
			ft(),
			v(),
			wt(),
			_t()
		]), Zt = new Map((await mt()).map((e) => [e.key, e])), ln(), window.addEventListener("hashchange", () => void sn(Ot())), await sn(Ot());
	} catch (e) {
		Xt.innerHTML = `<section class="fatal"><p class="eyebrow">Start fehlgeschlagen</p><h1>Zwitscher konnte nicht geladen werden.</h1><p>${q(e instanceof Error ? e.message : String(e))}</p><button class="primary" onclick="location.reload()">Neu laden</button></section>`;
	}
}
function an() {
	document.addEventListener("click", (e) => {
		let t = e.target.closest("[data-route]");
		t?.dataset.route && kt(t.dataset.route);
	}), document.querySelector("#home-button")?.addEventListener("click", () => kt("")), document.querySelector("#stats-button")?.addEventListener("click", () => kt("stats")), document.querySelector("#collection-button")?.addEventListener("click", () => kt("book")), document.querySelector("#settings-button")?.addEventListener("click", () => kt("settings")), document.querySelector("#sound-button")?.addEventListener("click", () => {
		J.toggle();
	});
}
function on() {
	Xt.innerHTML = `<section class="migration-screen"><div class="migration-art">${Vt(m.get("rotkehlchen"))}</div><div><p class="eyebrow">Willkommen bei Zwitscher 2</p><h1>Ein neuer Lernweg beginnt.</h1><p>Das neue Kurssystem verwendet ein grundlegend anderes Lernmodell. Wie festgelegt werden der bisherige Lernstand und alte Offline-Pakete vollständig gelöscht.</p><div class="warning-box"><strong>Dieser Schritt ist endgültig.</strong><span>Nach dem Neustart beginnt Zwitscher mit einem leeren Profil.</span></div><button class="primary" id="confirm-reset">Version 2 neu starten</button></div></section>`, document.querySelector("#confirm-reset")?.addEventListener("click", async (e) => {
		let t = e.currentTarget;
		t.disabled = !0, t.textContent = "Lokale Daten werden gelöscht …", await dt(), await rn();
	});
}
async function sn(e) {
	if (J.stop(), qn(), cn(e.name), e.name === "home") return gn();
	if (e.name === "course") return yn(e.id);
	if (e.name === "lesson") return En(e.courseId, e.phase);
	if (e.name === "placement") return Dn();
	if (e.name === "mode") return e.id ? On(e.id) : bn();
	if (e.name === "book") return Zn();
	if (e.name === "species") return Qn(e.id);
	if (e.name === "compare") return $n(e.first, e.second);
	if (e.name === "stats") return er();
	if (e.name === "settings") return nr();
}
function cn(e) {
	let t = {
		stats: "stats-button",
		book: "collection-button",
		species: "collection-button",
		settings: "settings-button"
	};
	document.querySelectorAll(".top-actions button").forEach((e) => e.classList.remove("active")), t[e] && document.querySelector(`#${t[e]}`)?.classList.add("active");
}
function ln() {
	document.documentElement.dataset.text = Y.settings.largeText ? "large" : "normal", document.body.dataset.weather = Y.settings.weather, document.body.classList.toggle("high-contrast", Y.settings.contrast), document.body.classList.toggle("reduce-motion", Y.settings.reducedMotion);
}
function un(e = "garden") {
	let t = (/* @__PURE__ */ new Date()).getHours();
	document.body.dataset.time = t < 7 ? "dawn" : t < 18 ? "day" : t < 22 ? "dusk" : "night", document.body.dataset.habitat = e;
}
function Q(e) {
	Xt.innerHTML = e, Xt.querySelectorAll("img").forEach((e) => e.addEventListener("error", () => {
		e.hidden = !0;
		let t = e.nextElementSibling;
		t && (t.style.display = "grid");
	}, { once: !0 })), window.scrollTo({
		top: 0,
		behavior: Y?.settings.reducedMotion ? "auto" : "smooth"
	});
}
function dn(e) {
	let t = document.querySelector("#toast");
	t.textContent = e, t.classList.add("visible"), window.setTimeout(() => t.classList.remove("visible"), 2800);
}
function $(e, t = "mixed") {
	let n = [...Zt.values()].filter((n) => n.speciesId === e && (t === "mixed" || n.voiceType === t));
	return Rt(n.length ? Math.max(...n.map((e) => e.step)) : 0);
}
function fn() {
	return [...Zt.values()].filter((e) => zt(e)).sort((e, t) => e.dueAt - t.dueAt);
}
function pn() {
	return Y.totalAnswers ? Math.round(Y.totalCorrect / Y.totalAnswers * 100) : 0;
}
function mn(e) {
	return Tt(Y.courseProgress[e.id]?.examBest ?? 0, e.speciesIds.map((t) => $(t, e.voiceType).level));
}
function hn() {
	if (X.ready) return `<aside class="offline-ready"><span>✓</span><div><strong>Vollständig offline</strong><small>${$t.recordings.length} Stimmen und ${$t.photos.length} Fotos installiert</small></div></aside>`;
	let e = X.total ? Math.round(X.cached.length / X.total * 100) : 0, t = Math.max(0, X.totalBytes - (X.downloadedBytes ?? 0));
	return `<aside class="setup-card" id="setup-card"><div><p class="eyebrow">Einmalige Einrichtung</p><h2>Die ganze Vogelwelt offline</h2><p>${Ut(X.totalBytes)} hochwertige Stimmen und Fotos. Der Download kann jederzeit fortgesetzt werden.</p><div class="download-progress"><i id="download-bar" style="width:${e}%"></i></div><small id="download-status">${X.cached.length}/${X.total} Dateien · noch ${Ut(t)}${X.failed.length ? ` · ${X.failed.length} fehlgeschlagen` : ""}</small>${X.failed.length ? `<details class="failed-files"><summary>Fehlerhafte Dateien anzeigen</summary>${X.failed.map((e) => `<code>${q(e)}</code>`).join("")}</details>` : ""}</div><div class="setup-actions"><button class="primary" id="install-media">${X.cached.length ? "Fortsetzen" : "Alles installieren"}</button><button class="ghost hidden" id="pause-media">Pausieren</button></div></aside>`;
}
function gn() {
	Z = null, un();
	let e = fn().length, t = p.filter((e) => $(e.id).level >= 2).length, i = r.get(Y.recommendedCourseId) ?? n[0], a = n.findIndex((e) => e.id === i.id), o = Qt.filter((e) => Wt(new Date(e.finishedAt)) === Wt()).reduce((e, t) => e + t.answers.length, 0), s = [...Qt].sort((e, t) => t.finishedAt - e.finishedAt)[0], c = Et(Y.confusions);
	Q(`<div class="home-v2"><section class="home-hero"><div><p class="eyebrow">Dein Ohr wird zum Fernglas</p><h1>Höre, was<br><em>draußen lebt.</em></h1><p>Ein geführter Lernpfad für 60 heimische Arten – mit echten Stimmen, Feldfotos und Wiederholungen zur richtigen Zeit.</p><div class="hero-actions"><button class="primary" data-route="course/${i.id}">Weiter bei Kurs ${a + 1}</button><button class="ghost" data-route="mode/adaptive">${e ? `${e} fällige Stimmen` : "Lerntrainer starten"} →</button></div><div class="metric-row"><div><strong>${t}/60</strong><span>Arten erkannt</span></div><div><strong>${pn()}%</strong><span>Trefferquote</span></div><div><strong>${Y.dailyStreak}</strong><span>Tagesserie</span></div></div></div><aside class="hero-bird"><div class="sun"></div>${Vt(m.get("rotkehlchen"))}<span>Heute draußen</span><strong>${Wt()}</strong></aside></section>
    ${hn()}
    <section class="path-section"><div class="section-head"><div><p class="eyebrow">Geführter Lernpfad</p><h2>Von vertraut bis feldbereit</h2></div><button class="text-button" data-route="placement">Einstufungstest starten →</button></div><div class="course-path">${n.map((e, t) => _n(e, t)).join("")}</div></section>
    <section class="home-panels"><article><span class="panel-icon">↻</span><div><p class="eyebrow">Heute wiederholen</p><h2>${e ? `${e} Stimmen sind fällig` : "Alles im grünen Bereich"}</h2><p>${e ? "Kurze Wiederholungen festigen, was sonst verblasst." : "Neue Lektionen werden später automatisch wieder fällig."}</p></div><button class="ghost" data-route="mode/adaptive">Trainieren</button></article><article><span class="panel-icon">☀</span><div><p class="eyebrow">Tagesziel · ${Math.min(o, Y.dailyGoal)}/${Y.dailyGoal}</p><h2>Stimme des Tages</h2><p>${s ? `Zuletzt: ${tr(s)}.` : "Fünf deterministische Aufgaben für deinen Lernrhythmus."}</p></div><button class="ghost" id="home-daily">Starten</button></article><article><span class="panel-icon">♪</span><div><p class="eyebrow">Freies Spiel</p><h2>Sechs Spielmodi</h2><p>Zeitrunde, Überleben, Klanglandschaft und mehr.</p></div><button class="ghost" data-route="mode">Modi öffnen</button></article>${c ? `<article><span class="panel-icon">A/B</span><div><p class="eyebrow">Automatischer Kontrast</p><h2>${m.get(c[0])?.name} oder ${m.get(c[1])?.name}?</h2><p>Diese Stimmen wurden mehrfach verwechselt.</p></div><button class="ghost" data-route="compare/${c[0]}/${c[1]}">Vergleichen</button></article>` : ""}</section>
  </div>`), vn(), document.querySelector("#home-daily")?.addEventListener("click", () => void kn());
}
function _n(e, t) {
	let n = Y.courseProgress[e.id], r = mn(e), i = e.id === Y.recommendedCourseId, a = e.speciesIds.map((t) => $(t, e.voiceType).level).filter((e) => e >= 2).length;
	return `<button class="course-card ${r ? "complete" : ""} ${i ? "current" : ""}" data-route="course/${e.id}"><span class="course-number">${r ? "✓" : String(t + 1).padStart(2, "0")}</span><span class="course-icon">${e.icon}</span><span class="course-copy"><small>${i ? "Empfohlen" : r ? "Abgeschlossen" : `${e.speciesIds.length} Arten`}</small><strong>${e.title}</strong><em>${e.subtitle}</em><span class="micro-progress"><i style="width:${a / e.speciesIds.length * 100}%"></i></span></span><span class="course-score">${Math.round(n.examBest * 100)}%</span></button>`;
}
function vn() {
	let e = document.querySelector("#install-media"), t = document.querySelector("#pause-media");
	!e || !t || (e.addEventListener("click", async () => {
		e.disabled = !0, e.textContent = "Wird installiert …", t.classList.remove("hidden");
		try {
			X = await Yt.install((e) => {
				X = e;
				let t = Math.round(e.cached.length / e.total * 100), n = document.querySelector("#download-bar"), r = document.querySelector("#download-status");
				n && (n.style.width = `${t}%`), r && (r.textContent = `${e.cached.length}/${e.total} Dateien · noch ${Ut(Math.max(0, e.totalBytes - e.downloadedBytes))}${e.failed.length ? ` · ${e.failed.length} fehlgeschlagen` : ""}`);
			}), X.ready ? (dn("Zwitscher ist vollständig offline verfügbar."), gn()) : (e.disabled = !1, e.textContent = X.failed.length ? "Fehlerhafte Dateien erneut versuchen" : "Fortsetzen", t.classList.add("hidden"));
		} catch (n) {
			e.disabled = !1, e.textContent = "Erneut versuchen", t.classList.add("hidden"), dn(n instanceof Error ? n.message : "Download fehlgeschlagen");
		}
	}), t.addEventListener("click", () => {
		Yt.pause(), t.disabled = !0, t.textContent = "Wird pausiert …";
	}));
}
function yn(e) {
	Z = null;
	let t = r.get(e);
	if (!t) {
		kt("");
		return;
	}
	un(t.habitat === "mixed" ? "garden" : t.habitat);
	let n = Y.courseProgress[e], i = t.speciesIds.filter((e) => $(e, t.voiceType).level >= 2).length;
	Q(`<div class="page"><button class="back" data-route="">← Lernpfad</button><header class="course-hero"><span>${t.icon}</span><div><p class="eyebrow">Kurs ${t.order} · ${t.speciesIds.length} Arten</p><h1>${t.title}</h1><p>${t.subtitle}</p><div class="course-overview"><strong>${i}/${t.speciesIds.length} erkannt</strong><strong>${Math.round(n.examBest * 100)}% Prüfungsbestwert</strong></div></div></header>
    <section class="lesson-list"><div class="section-head"><div><p class="eyebrow">Fünf Lernphasen</p><h2>Schritt für Schritt hören</h2></div><span>Alle Phasen sind frei zugänglich</span></div>${t.lessonPhases.map((e, r) => {
		let i = Jt[e], a = n.completedPhases.includes(e);
		return `<button class="lesson-row ${a ? "done" : ""}" data-route="course/${t.id}/${e}"><b>${a ? "✓" : i.icon}</b><span><strong>${i.label}</strong><small>${i.description}</small></span><em>${e === "exam" && n.examBest ? `${Math.round(n.examBest * 100)}%` : "Starten →"}</em></button>`;
	}).join("")}</section>
    <section class="course-species"><div class="section-head"><div><p class="eyebrow">In diesem Kurs</p><h2>Die Arten</h2></div></div><div class="species-strip">${t.speciesIds.map((e) => {
		let n = m.get(e), r = $(n.id, t.voiceType);
		return `<button data-route="species/${n.id}"><img src="${n.photo}" alt="${q(n.name)}" onerror="this.hidden=true"><span>${Vt(n)}</span><strong>${n.name}</strong><small>${r.label}</small></button>`;
	}).join("")}</div></section></div>`);
}
function bn() {
	Z = null, Q(`<div class="page"><header class="page-head"><div><p class="eyebrow">Freies Spiel</p><h1>Wie möchtest du hören?</h1><p>Die freien Modi verwenden dieselben Stimmen und stärken denselben Lernstand wie die Kurse.</p></div><button class="back" data-route="">← Startseite</button></header><div class="mode-grid">${Object.entries(qt).map(([e, t]) => `<button class="mode-card" data-route="mode/${e}"><span>${t.icon}</span><strong>${t.label}</strong><p>${t.description}</p><em>Starten →</em></button>`).join("")}</div><section class="special-games"><article><span>☀</span><div><p class="eyebrow">Jeden Tag neu</p><h2>Stimme des Tages</h2><p>Fünf für alle identische Aufgaben mit wachsender Tagesserie.</p></div><button class="primary" id="daily-game">Starten</button></article><div class="section-head"><div><p class="eyebrow">Lebensräume</p><h2>Expeditionen</h2></div></div><div class="expedition-grid">${[
		[
			"garden",
			"⌂",
			"Garten"
		],
		[
			"forest",
			"♟",
			"Wald"
		],
		[
			"field",
			"⌁",
			"Feld"
		],
		[
			"reed",
			"≋",
			"Schilf"
		]
	].map(([e, t, n]) => `<button data-expedition="${e}"><span>${t}</span><strong>${n}</strong><small>10 Stimmen</small></button>`).join("")}</div></section></div>`), document.querySelector("#daily-game")?.addEventListener("click", () => void kn()), document.querySelectorAll("[data-expedition]").forEach((e) => e.addEventListener("click", () => void An(e.dataset.expedition)));
}
function xn(e) {
	let t = (/* @__PURE__ */ new Date()).getMonth() + 1, n = p.filter((t) => !e || e === "mixed" || t.habitats.includes(e));
	return Y.settings.region !== "all" && (n = n.filter((e) => e.regions.includes(Y.settings.region))), Y.settings.seasonal && (n = n.filter((e) => e.activeMonths.includes(t))), n.length >= 4 ? n : p;
}
function Sn(e, t) {
	return Zt.get(Nt(e, t)) ?? Pt(e, t);
}
function Cn(e, t, n) {
	return t !== "mixed" && e.voiceTypes.includes(t) ? t : e.voiceTypes[n % e.voiceTypes.length] ?? e.voiceTypes[0] ?? "song";
}
function wn(e, t, n, r = Math.random) {
	let i = Dt(e.id, Y.confusions), a = [.../* @__PURE__ */ new Set([...i, ...e.confusions])].map((e) => m.get(e)).filter((e) => !!e), o = Kt(n.filter((t) => t.id !== e.id && !a.some((e) => e.id === t.id)), r);
	return Kt([
		e,
		...a,
		...o
	].slice(0, t), r);
}
async function Tn(e, t, n, r, i = Math.random) {
	let a = Kt(e, i), o = [];
	for (; o.length < t;) o.push(...Kt(a, i));
	return Promise.all(o.slice(0, t).map(async (t, a) => {
		let o = Cn(t, n, a);
		return {
			species: t,
			recording: await b(t.id, o, i()),
			voiceType: o,
			options: wn(t, r === "duel" ? 2 : 4, e, i)
		};
	}));
}
async function En(e, t) {
	let n = r.get(e);
	if (!n || !Jt[t]) {
		kt(`course/${e}`);
		return;
	}
	let i = n.speciesIds.map((e) => m.get(e)).filter((e) => !!e);
	jn({
		kind: "course",
		course: n,
		phase: t,
		items: await Tn(i, t === "learn" ? i.length : t === "exam" ? 10 : Math.max(8, i.length), n.voiceType, t),
		typed: t === "recall"
	});
}
async function Dn() {
	jn({
		kind: "placement",
		items: await Tn(p, 20, "mixed", "game", Gt("zwitscher-placement-v2")),
		typed: !1
	});
}
async function On(e) {
	if (!qt[e]) {
		bn();
		return;
	}
	let t = xn(), n = 8, r = "mode";
	if (e === "adaptive") {
		r = "review";
		let e = fn();
		t = e.length ? [...new Set(e.map((e) => e.speciesId))].map((e) => m.get(e)).filter(Boolean) : [...p].sort((e, t) => Bt(Sn(t.id, t.voiceTypes[0] ?? "song")) - Bt(Sn(e.id, e.voiceTypes[0] ?? "song"))).slice(0, 12);
	}
	(e === "dawn" || e === "survival") && (n = 30);
	let i = await Tn(t, n, "mixed", "game");
	jn({
		kind: r,
		mode: e,
		items: i,
		typed: !1
	});
}
async function kn() {
	let e = Gt(`daily-${Wt()}-v2`);
	jn({
		kind: "daily",
		items: await Tn(xn(), 5, "mixed", "game", e),
		typed: !1
	});
}
async function An(e) {
	jn({
		kind: "expedition",
		habitat: e,
		items: await Tn(xn(e), 10, "mixed", "game"),
		typed: !1
	});
}
function jn(e) {
	Z = {
		...e,
		index: 0,
		answers: [],
		startedAt: Date.now(),
		questionStartedAt: Date.now(),
		score: 0,
		streak: 0,
		bestStreak: 0,
		lives: 3,
		timeLeft: e.mode === "dawn" ? 90 : 0,
		hintStep: 1,
		answered: !1,
		hintUsed: !1,
		requeued: /* @__PURE__ */ new Set()
	}, e.mode === "dawn" && Kn(), Pn();
}
function Mn() {
	return Z.items[Z.index];
}
function Nn() {
	return Z?.kind === "placement" ? "Einstufungstest" : Z?.kind === "daily" ? "Stimme des Tages" : Z?.kind === "expedition" ? "Lebensraum-Expedition" : Z?.course ? `${Z.course.title} · ${Jt[Z.phase].label}` : Z?.mode ? qt[Z.mode].label : "Training";
}
function Pn() {
	if (!Z || !Mn()) {
		Un();
		return;
	}
	if (Z.questionStartedAt = Date.now(), Z.answered = !1, Z.hintUsed = !1, Z.hintStep = 1, Z.phase === "learn") {
		Hn();
		return;
	}
	let e = Mn(), t = Math.round(Z.index / Z.items.length * 100), n = Z.mode === "clue", r = Z.phase === "exam";
	Q(`<div class="game-page"><header class="game-header"><button class="back" data-route="${Z.course ? `course/${Z.course.id}` : "mode"}">× Beenden</button><div><span>${Z.index + 1}/${Z.items.length}</span><div class="game-progress"><i style="width:${t}%"></i></div></div><strong>${Z.score} P</strong></header><div class="game-meta"><span>${Nn()}</span>${Z.mode === "dawn" ? `<b id="timer">${Z.timeLeft}s</b>` : ""}${Z.mode === "survival" ? `<b aria-label="Leben">${"♥".repeat(Z.lives)}${"♡".repeat(3 - Z.lives)}</b>` : ""}</div>
    <main class="question-card"><div class="question-title"><p class="eyebrow">${n ? "Spuren lesen" : "Ohren auf"}</p><h1>${n ? "Wer bin ich?" : Z.mode === "soundscape" ? "Wer führt den Chor?" : "Wer singt hier?"}</h1></div>
      ${n ? In(e.species) : Fn()}
      <div class="hint-copy ${Z.hintUsed ? "visible" : ""}" id="hint-copy">${q(e.species.songTip)}</div>
      ${Z.typed || Z.phase === "recall" ? "<form class=\"recall-form\" id=\"recall-form\"><label for=\"recall-input\">Art selbst eingeben</label><div><input id=\"recall-input\" autocomplete=\"off\" placeholder=\"Deutscher oder wissenschaftlicher Name\"><button class=\"primary\" type=\"submit\">Prüfen</button></div></form>" : `<div class="answers">${e.options.map((e, t) => `<button data-answer="${e.id}"><span>${t + 1}</span>${e.name}</button>`).join("")}</div>`}
      <footer class="question-tools">${r ? "" : `<button class="tool" id="hint-button" ${n && Z.hintStep >= 3 ? "disabled" : ""}>✦ ${n ? "Nächster Hinweis" : "Hinweis"}</button>`}${n ? "" : `<button class="tool" id="speed-button">${J.playbackRate === 1 ? "1×" : "0,75×"}</button><button class="tool" id="loop-button" aria-pressed="${J.loop}">↻ Ausschnitt</button>`}<span>Serie <strong>×${Z.streak}</strong></span></footer>
    </main></div>`), Ln(), n || Rn();
}
function Fn() {
	return `<div class="audio-stage" id="audio-stage" data-audio-id="${Mn().recording.id}"><canvas id="spectrum" aria-label="Live-Frequenzbild"></canvas><button class="play-orbit" id="play-button" data-audio-id="${Mn().recording.id}" aria-label="Vogelstimme abspielen" aria-pressed="false"><span data-play-icon>▶</span></button><p data-play-status>Tippen zum Hören</p></div>`;
}
function In(e) {
	let t = [
		["Lebensraum", e.habitats.map(Jn).join(" · ")],
		["Beobachtung", e.fact],
		["Klang-Merkhilfe", e.songTip]
	];
	return `<div class="clue-stack"><strong>${Z.hintStep}</strong>${t.slice(0, Z.hintStep).map(([e, t]) => `<div><span>${e}</span><p>${q(t)}</p></div>`).join("")}</div>`;
}
function Ln() {
	document.querySelector("#play-button")?.addEventListener("click", () => void Rn(!0)), document.querySelector("#speed-button")?.addEventListener("click", (e) => {
		J.setRate(J.playbackRate === 1 ? .75 : 1), e.currentTarget.textContent = J.playbackRate === 1 ? "1×" : "0,75×";
	}), document.querySelector("#loop-button")?.addEventListener("click", (e) => {
		J.setLoop(!J.loop), e.currentTarget.classList.toggle("active", J.loop);
	}), document.querySelector("#hint-button")?.addEventListener("click", () => {
		Z.mode === "clue" ? (Z.hintUsed = !0, Z.hintStep = Math.min(3, Z.hintStep + 1), Pn()) : (Z.hintUsed = !0, document.querySelector("#hint-copy")?.classList.add("visible"), document.querySelector("#hint-button").disabled = !0);
	}), document.querySelectorAll("[data-answer]").forEach((e) => e.addEventListener("click", () => void Bn(e.dataset.answer))), document.querySelector("#recall-form")?.addEventListener("submit", (e) => {
		e.preventDefault(), Bn(document.querySelector("#recall-input").value, !0);
	});
}
async function Rn(e = !1) {
	if (!Z) return;
	let t = Mn(), n = [];
	Z.mode === "soundscape" && (n = Kt(Z.items.filter((e) => e.species.id !== t.species.id)).slice(0, 2).map((e) => e.recording));
	let r = {
		canvas: document.querySelector("#spectrum"),
		pan: Y.settings.spatialAudio ? (Math.random() - .5) * 1.2 : 0,
		backgrounds: n
	};
	e ? await J.playOrToggle(t.recording, r) : await J.play(t.recording, r);
}
function zn(e) {
	return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}
async function Bn(e, t = !1) {
	if (!Z || Z.answered) return;
	let n = Mn(), r = t ? p.find((t) => [
		t.name,
		t.scientificName,
		t.id
	].some((t) => zn(t) === zn(e))) : m.get(e), i = r?.id === n.species.id;
	Z.answered = !0, J.stop();
	let a = {
		speciesId: n.species.id,
		voiceType: n.voiceType,
		recordingId: n.recording.id,
		chosenId: r?.id ?? null,
		correct: i,
		hintUsed: Z.hintUsed,
		responseMs: Date.now() - Z.questionStartedAt
	};
	if (Z.answers.push(a), i) {
		let e = Y.settings.relaxed ? 100 : Math.max(40, 100 + Z.streak * 15 - (Z.hintUsed ? 30 : 0));
		Z.score += e, Z.streak += 1, Z.bestStreak = Math.max(Z.bestStreak, Z.streak);
	} else if (Z.streak = 0, Z.mode === "survival" && --Z.lives, r) {
		let e = `${n.species.id}>${r.id}`;
		Y.confusions[e] = (Y.confusions[e] ?? 0) + 1;
	}
	if (Z.kind !== "placement") {
		let e = It(Sn(n.species.id, n.voiceType), i, Z.hintUsed);
		Zt.set(e.key, e), await ht(e), Y.totalAnswers += 1, i && (Y.totalCorrect += 1), Y.bestStreak = Math.max(Y.bestStreak, Z.bestStreak), await pt(Y);
	}
	!i && Z.kind !== "placement" && !Z.requeued.has(n.recording.id) && (Z.requeued.add(n.recording.id), Z.items.splice(Math.min(Z.index + 4, Z.items.length), 0, n)), Vn(i, r);
}
function Vn(e, t) {
	if (!Z) return;
	let n = Mn(), r = $(n.species.id, n.voiceType), i = Sn(n.species.id, n.voiceType), a = i.step ? new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(i.dueAt) : "heute";
	Q(`<div class="feedback-page"><header class="game-header"><span>${Z.index + 1}/${Z.items.length}</span><div class="game-progress"><i style="width:${Math.round((Z.index + 1) / Z.items.length * 100)}%"></i></div><strong>${Z.score} P</strong></header><article class="feedback-card ${e ? "correct" : "wrong"}"><div class="feedback-photo"><img src="${n.species.photo}" alt="${q(n.species.name)}"><span>${e ? "✓" : "→"}</span></div><div class="feedback-main"><p class="eyebrow">${e ? "Richtig erkannt" : t ? `Nicht ${q(t.name)}, sondern` : "Gesucht war"}</p><h1>${n.species.name}</h1><p class="latin">${n.species.scientificName}</p><p>${n.species.fact}</p><div class="memory-note"><span>♪</span><p><strong>Hörschlüssel</strong>${n.voiceType === "song" ? n.species.songTip : n.species.callTip}</p></div><div class="feedback-mastery">${Ht(r.label, r.level)}<span>Nächste Wiederholung: <strong>${a}</strong></span></div><div class="feedback-actions"><button class="ghost" id="feedback-play" data-audio-id="${n.recording.id}" aria-pressed="false"><span data-play-icon>▶</span> Noch einmal hören</button>${n.species.confusions[0] ? `<button class="ghost" data-route="compare/${n.species.id}/${n.species.confusions[0]}">Direkt vergleichen</button>` : ""}</div><p class="credit">${q(n.recording.creator)} · ${q(n.recording.license)} · <a href="${n.recording.sourceUrl}" target="_blank" rel="noreferrer">Quelle</a></p></div></article><button class="primary next-button" id="next-question">${Z.index + 1 >= Z.items.length || Z.mode === "survival" && Z.lives <= 0 ? "Ergebnis ansehen" : "Nächste Stimme →"}</button></div>`), document.querySelector("#feedback-play")?.addEventListener("click", () => void J.playOrToggle(n.recording)), document.querySelector("#next-question")?.addEventListener("click", () => {
		Z && (Z.index + 1 >= Z.items.length || Z.mode === "survival" && Z.lives <= 0 ? Un() : (Z.index += 1, Pn()));
	});
}
function Hn() {
	if (!Z) return;
	let e = Mn();
	Q(`<div class="learn-page"><header class="game-header"><button class="back" data-route="course/${Z.course.id}">× Beenden</button><div><span>${Z.index + 1}/${Z.items.length}</span><div class="game-progress"><i style="width:${Math.round(Z.index / Z.items.length * 100)}%"></i></div></div><strong>Kennenlernen</strong></header><article class="learn-card"><div class="learn-visual"><img src="${e.species.photo}" alt="${q(e.species.name)}"><span>${Vt(e.species)}</span></div><div><p class="eyebrow">${Yn(e.voiceType)}</p><h1>${e.species.name}</h1><p class="latin">${e.species.scientificName}</p><p>${e.species.fact}</p><div class="memory-note"><span>♪</span><p><strong>So klingt die Stimme</strong>${e.voiceType === "song" ? e.species.songTip : e.species.callTip}</p></div><div class="learn-controls"><button class="primary" id="learn-play" data-audio-id="${e.recording.id}" aria-pressed="false"><span data-play-icon>▶</span> Stimme hören</button><button class="ghost" id="learn-next">${Z.index + 1 >= Z.items.length ? "Phase abschließen" : "Nächste Art →"}</button></div></div></article></div>`), document.querySelector("#learn-play")?.addEventListener("click", () => void J.playOrToggle(e.recording)), document.querySelector("#learn-next")?.addEventListener("click", async () => {
		let t = Lt(Sn(e.species.id, e.voiceType));
		Zt.set(t.key, t), await ht(t), Z.index + 1 >= Z.items.length ? Un() : (Z.index += 1, Hn());
	});
}
async function Un() {
	if (!Z) return;
	qn(), J.stop();
	let e = Z, t = e.answers.filter((e) => e.correct).length, i = e.answers.length ? t / e.answers.length : 1, a = [...new Set(e.answers.filter((e) => e.correct && $(e.speciesId, e.voiceType).level >= 2).map((e) => m.get(e.speciesId)?.name).filter(Boolean))].slice(0, 4), o = [...new Set(e.answers.filter((e) => !e.correct && e.chosenId).map((e) => `${m.get(e.speciesId)?.name} ↔ ${m.get(e.chosenId)?.name}`))].slice(0, 3), s = [...Zt.values()].filter((e) => e.step > 0).sort((e, t) => e.dueAt - t.dueAt)[0], c = {
		id: crypto.randomUUID(),
		kind: e.kind,
		mode: e.mode,
		courseId: e.course?.id,
		phase: e.phase,
		startedAt: e.startedAt,
		finishedAt: Date.now(),
		score: e.score,
		answers: e.answers
	};
	if (await gt(c), Qt.push(c), e.kind === "placement") {
		let e = Math.min(n.length - 1, Math.floor(i * n.length));
		Y.placementCourseId = n[e].id, Y.recommendedCourseId = n[e].id;
	}
	if (e.course && e.phase) {
		let t = Y.courseProgress[e.course.id];
		if (t.completedPhases.includes(e.phase) || t.completedPhases.push(e.phase), e.phase === "exam" && (t.examBest = Math.max(t.examBest, i)), t.completed = mn(e.course), t.completed) {
			let t = n[e.course.order];
			t && (Y.recommendedCourseId = t.id);
		}
	}
	e.kind === "daily" && Wn(), Gn(), await pt(Y), Z = null;
	let l = e.kind === "placement" ? "Dein Einstieg steht fest" : i >= .8 ? "Stark hingehört!" : i >= .5 ? "Guter Fortschritt" : "Weiter lauschen", u = e.kind === "placement" ? `course/${Y.recommendedCourseId}` : e.course ? `course/${e.course.id}` : "mode";
	Q(`<section class="result-page"><div class="result-bird">${Vt(p[(t + 7) % p.length])}</div><p class="eyebrow">${e.kind === "placement" ? "Einstufung abgeschlossen" : "Sitzung abgeschlossen"}</p><h1>${l}</h1><p>${e.kind === "placement" ? `Wir empfehlen dir den Einstieg bei „${r.get(Y.recommendedCourseId)?.title}“. Der Test verändert deinen Lernstand nicht.` : "Fehler sind als gezielte Wiederholungen vorgemerkt. Jede sichere Antwort verlängert das Erinnerungsintervall."}</p><div class="result-metrics"><div><strong>${t}/${e.answers.length}</strong><span>richtig</span></div><div><strong>${Math.round(i * 100)}%</strong><span>Trefferquote</span></div><div><strong>×${e.bestStreak}</strong><span>beste Serie</span></div><div><strong>${fn().length}</strong><span>fällig</span></div></div>${e.kind === "placement" ? "" : `<div class="result-insights"><article><span>Stabiler geworden</span><strong>${a.length ? a.join(", ") : "Noch im Aufbau"}</strong></article><article><span>Gezielt wiederholen</span><strong>${o.length ? o.join(" · ") : "Keine neue Verwechslung"}</strong></article><article><span>Nächste Wiederholung</span><strong>${s ? new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(s.dueAt) : "Nach der nächsten Lektion"}</strong></article></div>`}<div class="result-actions"><button class="primary" data-route="${u}">${e.kind === "placement" ? "Empfohlenen Kurs öffnen" : "Weiterlernen"}</button><button class="ghost" data-route="stats">Fortschritt ansehen</button><button class="ghost" data-route="">Zur Startseite</button></div></section>`);
}
function Wn() {
	let e = Wt();
	if (Y.lastDailyDate === e) return;
	let t = /* @__PURE__ */ new Date();
	t.setDate(t.getDate() - 1), Y.dailyStreak = Y.lastDailyDate === Wt(t) ? Y.dailyStreak + 1 : 1, Y.lastDailyDate = e;
}
function Gn() {
	let e = [
		["erster-ruf", Y.totalCorrect >= 1],
		["zehner-serie", Y.bestStreak >= 10],
		["hundert", Y.totalCorrect >= 100],
		["kurs", n.some(mn)],
		["feldbereit", p.filter((e) => $(e.id).level >= 4).length >= 5],
		["woche", Y.dailyStreak >= 7]
	];
	for (let [t, n] of e) n && !Y.achievements.includes(t) && (Y.achievements.push(t), dn("Neues Abzeichen erhalten"));
}
function Kn() {
	qn(), en = window.setInterval(() => {
		if (!Z) return;
		--Z.timeLeft;
		let e = document.querySelector("#timer");
		e && (e.textContent = `${Z.timeLeft}s`), Z.timeLeft <= 0 && Un();
	}, 1e3);
}
function qn() {
	en !== null && (clearInterval(en), en = null);
}
function Jn(e) {
	return {
		garden: "Garten",
		park: "Park & Stadt",
		forest: "Wald",
		field: "Feld & Wiese",
		water: "Aue & Gewässer",
		reed: "Schilf",
		mountain: "Fels & Berg"
	}[e] ?? e;
}
function Yn(e) {
	return {
		song: "Gesang",
		call: "Ruf",
		alarm: "Warnruf",
		flight: "Flugruf",
		drumming: "Trommeln"
	}[e];
}
function Xn(e) {
	let t = $(e.id, "song"), n = $(e.id, "call"), r = $t.recordings.filter((t) => t.speciesId === e.id).length;
	return `<article class="bird-card" data-bird-card="${e.id}"><button class="bird-card-open" data-route="species/${e.id}" aria-label="${q(e.name)} öffnen"><div class="bird-photo"><img src="${e.photo}" alt="${q(e.name)}"><span>${Vt(e)}</span></div><div class="bird-card-title"><div><h2>${e.name}</h2><p>${e.scientificName}</p></div><b>${r} ♫</b></div><p>${e.songTip}</p><div class="voice-levels"><span>Gesang <i class="level-fill l${t.level}"></i>${t.label}</span><span>Ruf <i class="level-fill l${n.level}"></i>${n.label}</span></div></button></article>`;
}
function Zn() {
	Z = null, Q(`<div class="book-page"><header class="page-head"><div><p class="eyebrow">Dein Feldführer</p><h1>Das Vogelbuch</h1><p>60 Arten, mehrere Lauttypen und echte Feldfotos.</p></div><span class="count-pill">${p.filter((e) => $(e.id).level >= 1).length}/60 gehört</span></header><div class="book-tools"><input type="search" id="bird-search" aria-label="Vogelart suchen" placeholder="Art oder wissenschaftlichen Namen suchen …"><div class="chips"><button data-book-filter="all" class="active">Alle</button><button data-book-filter="garden">Garten</button><button data-book-filter="forest">Wald</button><button data-book-filter="field">Feld</button><button data-book-filter="water">Gewässer</button><button data-book-filter="due">Fällig</button></div></div><div class="bird-grid" id="bird-grid">${p.map(Xn).join("")}</div></div>`);
	let e = "all", t = () => {
		let t = zn(document.querySelector("#bird-search").value), n = new Set(fn().map((e) => e.speciesId)), r = p.filter((r) => (!t || zn(`${r.name}${r.scientificName}`).includes(t)) && (e === "all" || e === "due" && n.has(r.id) || r.habitats.includes(e)));
		document.querySelector("#bird-grid").innerHTML = r.length ? r.map(Xn).join("") : "<p class=\"empty\">Keine Art passt zu dieser Auswahl.</p>";
	};
	document.querySelector("#bird-search")?.addEventListener("input", t), document.querySelectorAll("[data-book-filter]").forEach((n) => n.addEventListener("click", () => {
		e = n.dataset.bookFilter, document.querySelectorAll("[data-book-filter]").forEach((e) => e.classList.toggle("active", e === n)), t();
	}));
}
async function Qn(e, t) {
	Z = null;
	let n = m.get(e);
	if (!n) {
		kt("book");
		return;
	}
	let r = await y(e), i = [...new Set(r.map((e) => e.voiceType))], a = t && i.includes(t) ? t : i[0] ?? "song", o = r.filter((e) => e.voiceType === a), s = $t.photos.find((t) => t.speciesId === e), c = n.confusions.map((e) => m.get(e)).filter((e) => !!e), l = $(e, a);
	Q(`<div class="page species-page"><button class="back" data-route="book">← Vogelbuch</button><section class="species-hero-v2"><div class="species-photo"><img src="${n.photo}" alt="${q(n.name)}"><div>${Vt(n)}</div></div><div><p class="eyebrow">${n.habitats.map(Jn).join(" · ")} · ${n.activeMonths.length === 12 ? "ganzjährig" : "April bis September"}</p><h1>${n.name}</h1><p class="latin">${n.scientificName}</p><p>${n.fact}</p>${Ht(l.label, l.level)}<div class="species-actions"><button class="primary" id="species-main-play" data-audio-id="${(o[0] ?? r[0])?.id}" aria-pressed="false"><span data-play-icon>▶</span> ${Yn(a)} hören</button></div></div></section><section class="voice-section"><div class="voice-tabs">${i.map((e) => `<button data-voice-tab="${e}" class="${e === a ? "active" : ""}">${Yn(e)}</button>`).join("")}</div><div class="voice-detail"><article><span>♪ Hörschlüssel</span><h2>${a === "song" ? n.songTip : n.callTip}</h2><p>${i.length} Lauttypen und ${r.length} lokale Aufnahmen sind verfügbar.</p></article><div class="recording-list">${o.map((e, t) => `<button data-recording="${e.id}" data-audio-id="${e.id}" aria-pressed="false"><span data-play-icon>▶</span><div><strong>Aufnahme ${t + 1}</strong><small>${Math.round(e.durationSeconds)} s · ${q(e.creator)}</small></div></button>`).join("")}</div></div></section>${c.length ? `<section class="similar-section"><div class="section-head"><div><p class="eyebrow">Verwechslungsgefahr</p><h2>Direkt vergleichen</h2></div></div><div class="similar-grid">${c.map((e) => `<button data-route="compare/${n.id}/${e.id}"><img src="${e.photo}" alt=""><span>${n.name} ↔ ${e.name}</span></button>`).join("")}</div></section>` : ""}<footer class="photo-credit">Foto: ${q(s?.creator ?? "Wikimedia Commons")} · ${q(s?.license ?? "Lizenz siehe Quelle")} ${s ? `· <a href="${s.sourceUrl}" target="_blank" rel="noreferrer">Quelle</a>` : ""}</footer></div>`);
	let u = (e) => J.playOrToggle(e);
	document.querySelector("#species-main-play")?.addEventListener("click", () => void u(o[0] ?? r[0])), document.querySelectorAll("[data-recording]").forEach((e) => e.addEventListener("click", () => {
		let t = r.find((t) => t.id === e.dataset.recording);
		t && u(t);
	})), document.querySelectorAll("[data-voice-tab]").forEach((t) => t.addEventListener("click", () => void Qn(e, t.dataset.voiceTab)));
}
async function $n(e, t) {
	Z = null;
	let n = m.get(e ?? "zilpzalp") ?? p[0], r = m.get(t ?? n.confusions[0] ?? "fitis") ?? p[1], i = await b(n.id, "mixed", 0), a = await b(r.id, "mixed", .4), o = (e) => p.map((t) => `<option value="${t.id}" ${t.id === e ? "selected" : ""}>${t.name}</option>`).join("");
	Q(`<div class="page compare-page"><header class="page-head"><div><p class="eyebrow">A/B-Hörtraining</p><h1>Stimmen direkt vergleichen</h1><p>Wechsle ohne Pause zwischen zwei Arten und achte auf Rhythmus, Tonhöhe und Form.</p></div><button class="back" data-route="book">← Vogelbuch</button></header><div class="compare-selects"><label>A<select id="compare-a">${o(n.id)}</select></label><span>↔</span><label>B<select id="compare-b">${o(r.id)}</select></label></div><div class="compare-grid">${[[
		n,
		i,
		"A"
	], [
		r,
		a,
		"B"
	]].map(([e, t, n]) => {
		let r = e, i = t;
		return `<article><div class="compare-photo"><img src="${r.photo}" alt="${r.name}"><b>${n}</b></div><h2>${r.name}</h2><p class="latin">${r.scientificName}</p><button class="primary" data-compare-play="${i.id}" data-audio-id="${i.id}" aria-pressed="false"><span data-play-icon>▶</span> ${n} hören</button><p><strong>Gesang:</strong> ${r.songTip}</p><p><strong>Ruf:</strong> ${r.callTip}</p></article>`;
	}).join("")}</div><div class="compare-key"><p class="eyebrow">Hörschlüssel</p><h2>Der wichtigste Unterschied</h2><p><strong>${n.name}:</strong> ${n.songTip}</p><p><strong>${r.name}:</strong> ${r.songTip}</p><button class="primary" id="compare-train">Dieses Paar trainieren</button></div></div>`);
	let s = /* @__PURE__ */ new Map([[i.id, i], [a.id, a]]);
	document.querySelectorAll("[data-compare-play]").forEach((e) => e.addEventListener("click", () => void J.playOrToggle(s.get(e.dataset.comparePlay)))), document.querySelector("#compare-a")?.addEventListener("change", (e) => void $n(e.target.value, r.id)), document.querySelector("#compare-b")?.addEventListener("change", (e) => void $n(n.id, e.target.value)), document.querySelector("#compare-train")?.addEventListener("click", async () => {
		jn({
			kind: "review",
			items: await Tn([n, r], 8, "mixed", "duel"),
			typed: !1
		});
	});
}
function er() {
	Z = null;
	let e = [
		0,
		1,
		2,
		3,
		4
	].map((e) => p.filter((t) => $(t.id).level === e).length), t = Object.entries(Y.confusions).sort((e, t) => t[1] - e[1]).slice(0, 6), n = [...Qt].sort((e, t) => t.finishedAt - e.finishedAt).slice(0, 7), r = [
		"Unbekannt",
		"Gehört",
		"Erkannt",
		"Sicher",
		"Feldbereit"
	];
	Q(`<div class="page stats-page"><header class="page-head"><div><p class="eyebrow">Dein Lernstand</p><h1>Fortschritt</h1><p>Was sicher sitzt, was fällig ist und welche Stimmen du verwechselst.</p></div><button class="primary" data-route="mode/adaptive">${fn().length} fällige Stimmen</button></header><div class="stats-metrics"><article><strong>${pn()}%</strong><span>Trefferquote</span></article><article><strong>${Y.totalCorrect}</strong><span>richtige Antworten</span></article><article><strong>${Y.bestStreak}</strong><span>beste Serie</span></article><article><strong>${Y.dailyStreak}</strong><span>Tagesserie</span></article></div><div class="stats-grid"><section><h2>Arten-Meisterschaft</h2><div class="mastery-bars">${e.map((e, t) => `<div><span>${r[t]}</span><i><b style="width:${e / p.length * 100}%"></b></i><strong>${e}</strong></div>`).join("")}</div></section><section><h2>Häufig verwechselt</h2>${t.length ? `<div class="confusion-list">${t.map(([e, t]) => {
		let [n, r] = e.split(">");
		return `<button data-route="compare/${n}/${r}"><span>${m.get(n)?.name} ↔ ${m.get(r)?.name}</span><strong>${t}×</strong></button>`;
	}).join("")}</div>` : "<p class=\"empty\">Noch keine Verwechslungen gespeichert.</p>"}</section></div><section class="session-history"><div class="section-head"><div><p class="eyebrow">Letzte Sitzungen</p><h2>Dein Hörverlauf</h2></div></div>${n.length ? `<div class="history-list">${n.map((e) => {
		let t = e.answers.filter((e) => e.correct).length;
		return `<article><span>${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(e.finishedAt)}</span><strong>${tr(e)}</strong><b>${t}/${e.answers.length}</b></article>`;
	}).join("")}</div>` : "<p class=\"empty\">Noch keine Sitzung in Version 2.</p>"}</section><section class="badges"><div class="section-head"><div><p class="eyebrow">Abzeichen</p><h2>Meilensteine</h2></div></div><div>${[
		[
			"erster-ruf",
			"♪",
			"Erster Ruf"
		],
		[
			"zehner-serie",
			"≈",
			"Zehner-Serie"
		],
		[
			"hundert",
			"100",
			"Hundert Treffer"
		],
		[
			"kurs",
			"✓",
			"Erster Kurs"
		],
		[
			"feldbereit",
			"◆",
			"Feldbereit"
		],
		[
			"woche",
			"◒",
			"Sieben Tage"
		]
	].map(([e, t, n]) => `<article class="${Y.achievements.includes(e) ? "won" : ""}"><span>${Y.achievements.includes(e) ? t : "·"}</span><strong>${n}</strong></article>`).join("")}</div></section></div>`);
}
function tr(e) {
	return e.courseId ? r.get(e.courseId)?.title ?? "Kurs" : e.kind === "placement" ? "Einstufung" : e.kind === "daily" ? "Tagesaufgabe" : e.mode ? qt[e.mode].label : e.kind === "expedition" ? "Expedition" : "Lerntrainer";
}
function nr() {
	Z = null;
	let e = X.total ? Math.round(X.cached.length / X.total * 100) : 0;
	Q(`<div class="page settings-page"><header class="page-head"><div><p class="eyebrow">Dein Erlebnis</p><h1>Einstellungen</h1><p>Lernregion, Darstellung, Offline-Inhalte und lokale Sicherungen.</p></div></header><form id="settings-form" class="settings-grid"><label><span>Lernregion<small>Filtert regionalere Arten im freien Training.</small></span><select name="region"><option value="all">Deutschland gesamt</option><option value="north">Norddeutschland</option><option value="central">Mitteldeutschland</option><option value="south">Süddeutschland</option></select></label><label><span>Aktuelle Jahreszeit<small>Nur derzeit typische Stimmen auswählen.</small></span><input type="checkbox" name="seasonal"></label><label><span>Räumliches Hören<small>Stimmen leicht links oder rechts platzieren.</small></span><input type="checkbox" name="spatialAudio"></label><label><span>Entspannter Lernmodus<small>Kein Punktabzug durch Hinweise.</small></span><input type="checkbox" name="relaxed"></label><label><span>Hoher Kontrast<small>Flächen und Konturen verstärken.</small></span><input type="checkbox" name="contrast"></label><label><span>Große Schrift<small>Lesetexte und Bedienelemente vergrößern.</small></span><input type="checkbox" name="largeText"></label><label><span>Bewegung reduzieren<small>Animationen und weiche Übergänge abschalten.</small></span><input type="checkbox" name="reducedMotion"></label><label><span>Wetteratmosphäre<small>Nur visuell, ohne Einfluss auf Aufgaben.</small></span><select name="weather"><option value="still">Still</option><option value="breeze">Blätterwind</option><option value="rain">Sommerregen</option></select></label></form><section class="offline-settings"><div><p class="eyebrow">Offline-Medien</p><h2>${X.ready ? "Vollständig installiert" : `${e}% installiert`}</h2><p>${$t.recordings.length} Stimmen und ${$t.photos.length} Fotos · ${Ut(X.totalBytes)}</p><div class="download-progress"><i id="download-bar" style="width:${e}%"></i></div><small id="download-status">${X.cached.length}/${X.total} Dateien · noch ${Ut(Math.max(0, X.totalBytes - (X.downloadedBytes ?? 0)))}${X.failed.length ? ` · ${X.failed.length} fehlgeschlagen` : ""}</small></div>${X.ready ? "<span class=\"offline-check\">✓</span>" : "<div class=\"setup-actions\"><button class=\"primary\" id=\"install-media\">Fortsetzen</button><button class=\"ghost hidden\" id=\"pause-media\">Pausieren</button></div>"}</section><section class="backup-section"><div><p class="eyebrow">Privat und lokal</p><h2>Sicherung</h2><p>Exportiere deinen Lernstand oder ersetze ihn durch eine vorhandene Sicherung.</p></div><div><button class="ghost" id="export-backup">Sicherung exportieren</button><label class="ghost file-button">Sicherung importieren<input id="import-backup" type="file" accept=".zwitscher,application/gzip"></label></div></section><details class="credits"><summary>Medienquellen und Lizenzen</summary><p>Alle Aufnahmen und Fotos wurden lokal für die Offline-Nutzung optimiert. Urheber und Lizenz jeder Datei bleiben im Medienverzeichnis erhalten.</p><div>${$t.photos.map((e) => `<a href="${e.sourceUrl}" target="_blank" rel="noreferrer">${m.get(e.speciesId)?.name}: ${q(e.creator)} · ${q(e.license)}</a>`).join("")}</div></details></div>`);
	let t = document.querySelector("#settings-form");
	for (let [e, n] of Object.entries(Y.settings)) {
		let r = t.elements.namedItem(e);
		r && (r instanceof HTMLInputElement && r.type === "checkbox" ? r.checked = !!n : r.value = String(n));
	}
	t.addEventListener("change", async () => {
		let e = new FormData(t);
		Y.settings = {
			region: String(e.get("region")),
			seasonal: e.has("seasonal"),
			spatialAudio: e.has("spatialAudio"),
			relaxed: e.has("relaxed"),
			contrast: e.has("contrast"),
			largeText: e.has("largeText"),
			reducedMotion: e.has("reducedMotion"),
			weather: String(e.get("weather"))
		}, await pt(Y), ln(), dn("Einstellungen gespeichert");
	}), vn(), document.querySelector("#export-backup")?.addEventListener("click", async () => {
		let e = await bt(), t = URL.createObjectURL(e), n = document.createElement("a");
		n.href = t, n.download = `zwitscher-${Wt()}.zwitscher`, n.click(), URL.revokeObjectURL(t), dn("Sicherung erstellt");
	}), document.querySelector("#import-backup")?.addEventListener("change", async (e) => {
		let t = e.target.files?.[0];
		if (t && confirm("Die Sicherung ersetzt den aktuellen Version-2-Stand vollständig. Fortfahren?")) try {
			await xt(t), location.reload();
		} catch (e) {
			dn(e instanceof Error ? e.message : "Import fehlgeschlagen");
		}
	});
}
//#endregion
//#region src/main.ts
nn();
//#endregion
