//#region src/core/paths.ts
function e(e) {
	return `/${e.replace(/^\/+/, "")}`;
}
//#endregion
//#region src/core/pwa.ts
function t(t = {}) {
	!("serviceWorker" in navigator) || location.protocol === "file:" || window.addEventListener("load", () => {
		navigator.serviceWorker.register(e("sw.js")).catch(() => void 0);
	}, { once: !0 });
}
//#endregion
//#region src/data/courses.ts
var n = [
	"learn",
	"duel",
	"choice",
	"recall",
	"exam"
], r = [
	{
		id: "garten",
		order: 1,
		title: "Garten und Balkon",
		subtitle: "Acht vertraute Stimmen direkt vor der Haustür.",
		icon: "⌂",
		habitat: "garden",
		voiceType: "song",
		lessonPhases: n,
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
		lessonPhases: n,
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
		lessonPhases: n,
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
		lessonPhases: n,
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
		lessonPhases: n,
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
		lessonPhases: n,
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
		lessonPhases: n,
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
		lessonPhases: n,
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
], i = new Map(r.map((e) => [e.id, e])), a = [
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
], o = [
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
], s = [
	4,
	5,
	6,
	7,
	8,
	9
], c = /* @__PURE__ */ new Set([
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
]), l = /* @__PURE__ */ new Set([
	"sprosser",
	"weidenmeise",
	"wacholderdrossel"
]), u = /* @__PURE__ */ new Set([
	"sommergoldhaehnchen",
	"pirol",
	"gartenrotschwanz",
	"gebirgsstelze"
]), d = {
	buntspecht: ["drumming", "call"],
	gruenpecht: ["call", "flight"],
	waldkauz: ["call", "alarm"],
	schwanzmeise: ["call", "flight"],
	rabenkraehe: ["call", "alarm"],
	eichelhaeher: ["call", "alarm"],
	elster: ["call", "alarm"],
	dohle: ["call", "flight"],
	kolkrabe: ["call", "alarm"]
}, f = [
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
function p(e) {
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
var m = a.map((t, n) => {
	let [r, i, a, m, h, g, _, v = [], y = "Eine charakteristische heimische Vogelart."] = t, b = [
		"north",
		"central",
		"south"
	];
	return l.has(r) && (b = ["north", "central"]), u.has(r) && (b = ["central", "south"]), {
		id: r,
		name: i,
		scientificName: a,
		habitats: m,
		difficulty: h,
		songTip: g,
		callTip: _,
		confusions: v,
		fact: y,
		regions: b,
		activeMonths: c.has(r) ? s : o,
		voiceTypes: d[r] ?? ["song", "call"],
		illustration: {
			palette: f[n % f.length],
			mark: p(r)
		},
		photo: e(`media/photos/${r}.webp`)
	};
}), h = new Map(m.map((e) => [e.id, e])), g = 20, _ = 30, v = class {
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
		this.currentId = e.id, n.addEventListener("ended", () => this.finish(n), { once: !0 }), t.canvas && this.connect(n, t.canvas, t.pan ?? 0), await this.context?.resume().catch(() => void 0), await Promise.all(r.map((e) => e.play().catch(() => void 0))), r === this.audios && (this.emit(), await this.fade(r, 1, g));
	}
	async playOrToggle(e, t = {}) {
		this.currentId === e.id && this.audios.length ? await this.toggle() : await this.play(e, t);
	}
	async toggle() {
		if (!this.audios.length) return;
		let e = this.audios;
		if (this.isPlaying) {
			if (await this.fade(e, 0, _), e !== this.audios) return;
			e.forEach((e) => e.pause()), this.emit();
			return;
		}
		e.forEach((e) => {
			e.volume = 0;
		}), await this.context?.resume().catch(() => void 0), await Promise.all(e.map((e) => e.play().catch(() => void 0))), e === this.audios && (this.emit(), await this.fade(e, 1, g));
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
		this.audios = [], this.currentId = null, this.analyser = null, this.emit(), this.fade(e, 0, _).then(() => {
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
		this.audios = [], this.currentId = null, this.analyser = null, this.emit(), this.fade(t, 0, _).then(() => t.forEach((e) => e.pause()));
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
}, y = null;
function b() {
	return y ??= (async () => {
		let t = await fetch(e("media/manifest.json")), n = !1;
		if (t.ok || (t = await fetch(e("public/media/manifest.json")), n = t.ok), !t.ok) throw Error("Medienverzeichnis nicht verfügbar");
		let r = await t.json();
		return r.recordings.forEach((t) => {
			t.src = e(`${n ? "public" : ""}${t.src}`);
		}), r.photos.forEach((t) => {
			t.src = e(`${n ? "public" : ""}${t.src}`);
		}), r;
	})(), y;
}
async function x(e, t = "mixed") {
	let n = (await b()).recordings.filter((t) => t.speciesId === e), r = t === "mixed" ? n : n.filter((e) => e.voiceType === t);
	return r.length ? r : n;
}
async function S(e, t, n = Math.random()) {
	let r = await x(e, t), i = r[Math.floor(n * r.length)] ?? r[0];
	if (!i) throw Error(`Keine Aufnahme für ${e}`);
	return i;
}
//#endregion
//#region node_modules/idb/build/index.js
var C = (e, t) => t.some((t) => e instanceof t), w, T;
function E() {
	return w ||= [
		IDBDatabase,
		IDBObjectStore,
		IDBIndex,
		IDBCursor,
		IDBTransaction
	];
}
function D() {
	return T ||= [
		IDBCursor.prototype.advance,
		IDBCursor.prototype.continue,
		IDBCursor.prototype.continuePrimaryKey
	];
}
var O = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap();
function A(e) {
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
	return k.set(t, e), t;
}
function j(e) {
	if (O.has(e)) return;
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
	O.set(e, t);
}
var M = {
	get(e, t, n) {
		if (e instanceof IDBTransaction) {
			if (t === "done") return O.get(e);
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
function N(e) {
	M = e(M);
}
function P(e) {
	return D().includes(e) ? function(...t) {
		return e.apply(I(this), t), F(this.request);
	} : function(...t) {
		return F(e.apply(I(this), t));
	};
}
function te(e) {
	return typeof e == "function" ? P(e) : (e instanceof IDBTransaction && j(e), C(e, E()) ? new Proxy(e, M) : e);
}
function F(e) {
	if (e instanceof IDBRequest) return A(e);
	if (ee.has(e)) return ee.get(e);
	let t = te(e);
	return t !== e && (ee.set(e, t), k.set(t, e)), t;
}
var I = (e) => k.get(e);
function L(e, t, { blocked: n, upgrade: r, blocking: i, terminated: a } = {}) {
	let o = indexedDB.open(e, t), s = F(o);
	return r && o.addEventListener("upgradeneeded", (e) => {
		r(F(o.result), e.oldVersion, e.newVersion, F(o.transaction), e);
	}), n && o.addEventListener("blocked", (e) => n(e.oldVersion, e.newVersion, e)), s.then((e) => {
		a && e.addEventListener("close", () => a()), i && e.addEventListener("versionchange", (e) => i(e.oldVersion, e.newVersion, e));
	}).catch(() => {}), s;
}
function R(e, { blocked: t } = {}) {
	let n = indexedDB.deleteDatabase(e);
	return t && n.addEventListener("blocked", (e) => t(e.oldVersion, e)), F(n).then(() => void 0);
}
var z = [
	"get",
	"getKey",
	"getAll",
	"getAllKeys",
	"count"
], ne = [
	"put",
	"add",
	"delete",
	"clear"
], re = /* @__PURE__ */ new Map();
function ie(e, t) {
	if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
	if (re.get(t)) return re.get(t);
	let n = t.replace(/FromIndex$/, ""), r = t !== n, i = ne.includes(n);
	if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || z.includes(n))) return;
	let a = async function(e, ...t) {
		let a = this.transaction(e, i ? "readwrite" : "readonly"), o = a.store;
		return r && (o = o.index(t.shift())), (await Promise.all([o[n](...t), i && a.done]))[0];
	};
	return re.set(t, a), a;
}
N((e) => ({
	...e,
	get: (t, n, r) => ie(t, n) || e.get(t, n, r),
	has: (t, n) => !!ie(t, n) || e.has(t, n)
}));
var ae = [
	"continue",
	"continuePrimaryKey",
	"advance"
], oe = {}, se = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), le = { get(e, t) {
	if (!ae.includes(t)) return e[t];
	let n = oe[t];
	return n ||= oe[t] = function(...e) {
		se.set(this, ce.get(this)[t](...e));
	}, n;
} };
async function* ue(...e) {
	let t = this;
	if (t instanceof IDBCursor || (t = await t.openCursor(...e)), !t) return;
	t = t;
	let n = new Proxy(t, le);
	for (ce.set(n, t), k.set(n, I(t)); t;) yield n, t = await (se.get(n) || t.continue()), se.delete(n);
}
function de(e, t) {
	return t === Symbol.asyncIterator && C(e, [
		IDBIndex,
		IDBObjectStore,
		IDBCursor
	]) || t === "iterate" && C(e, [IDBIndex, IDBObjectStore]);
}
N((e) => ({
	...e,
	get(t, n, r) {
		return de(t, n) ? ue : e.get(t, n, r);
	},
	has(t, n) {
		return de(t, n) || e.has(t, n);
	}
}));
//#endregion
//#region node_modules/fflate/esm/browser.js
var B = Uint8Array, V = Uint16Array, fe = Int32Array, pe = new B([
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
]), me = new B([
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
]), he = new B([
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
]), ge = function(e, t) {
	for (var n = new V(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new fe(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, _e = ge(pe, 2), ve = _e.b, ye = _e.r;
ve[28] = 258, ye[258] = 28;
for (var be = ge(me, 0), xe = be.b, Se = be.r, Ce = new V(32768), H = 0; H < 32768; ++H) {
	var we = (H & 43690) >> 1 | (H & 21845) << 1;
	we = (we & 52428) >> 2 | (we & 13107) << 2, we = (we & 61680) >> 4 | (we & 3855) << 4, Ce[H] = ((we & 65280) >> 8 | (we & 255) << 8) >> 1;
}
for (var U = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new V(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new V(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new V(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[Ce[d] >> c] = l;
	} else for (s = new V(r), i = 0; i < r; ++i) e[i] && (s[i] = Ce[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), Te = new B(288), H = 0; H < 144; ++H) Te[H] = 8;
for (var H = 144; H < 256; ++H) Te[H] = 9;
for (var H = 256; H < 280; ++H) Te[H] = 7;
for (var H = 280; H < 288; ++H) Te[H] = 8;
for (var Ee = new B(32), H = 0; H < 32; ++H) Ee[H] = 5;
var De = /*#__PURE__*/ U(Te, 9, 0), Oe = /*#__PURE__*/ U(Te, 9, 1), ke = /*#__PURE__*/ U(Ee, 5, 0), Ae = /*#__PURE__*/ U(Ee, 5, 1), je = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, W = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, Me = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, Ne = function(e) {
	return (e + 7) / 8 | 0;
}, Pe = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new B(e.subarray(t, n));
}, Fe = [
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
], G = function(e, t, n) {
	var r = Error(t || Fe[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, G), !n) throw r;
	return r;
}, Ie = function(e, t, n, r) {
	var i = e.length, a = r ? r.length : 0;
	if (!i || t.f && !t.l) return n || new B(0);
	var o = !n, s = o || t.i != 2, c = t.i;
	o && (n = new B(i * 3));
	var l = function(e) {
		var t = n.length;
		if (e > t) {
			var r = new B(Math.max(t * 2, e));
			r.set(n), n = r;
		}
	}, u = t.f || 0, d = t.p || 0, f = t.b || 0, p = t.l, m = t.d, h = t.m, g = t.n, _ = i * 8;
	do {
		if (!p) {
			u = W(e, d, 1);
			var v = W(e, d + 1, 3);
			if (d += 3, !v) {
				var y = Ne(d) + 4, b = e[y - 4] | e[y - 3] << 8, x = y + b;
				if (x > i) {
					c && G(0);
					break;
				}
				s && l(f + b), n.set(e.subarray(y, x), f), t.b = f += b, t.p = d = x * 8, t.f = u;
				continue;
			} else if (v == 1) p = Oe, m = Ae, h = 9, g = 5;
			else if (v == 2) {
				var S = W(e, d, 31) + 257, C = W(e, d + 10, 15) + 4, w = S + W(e, d + 5, 31) + 1;
				d += 14;
				for (var T = new B(w), E = new B(19), D = 0; D < C; ++D) E[he[D]] = W(e, d + D * 3, 7);
				d += C * 3;
				for (var O = je(E), ee = (1 << O) - 1, k = U(E, O, 1), D = 0; D < w;) {
					var A = k[W(e, d, ee)];
					d += A & 15;
					var y = A >> 4;
					if (y < 16) T[D++] = y;
					else {
						var j = 0, M = 0;
						for (y == 16 ? (M = 3 + W(e, d, 3), d += 2, j = T[D - 1]) : y == 17 ? (M = 3 + W(e, d, 7), d += 3) : y == 18 && (M = 11 + W(e, d, 127), d += 7); M--;) T[D++] = j;
					}
				}
				var N = T.subarray(0, S), P = T.subarray(S);
				h = je(N), g = je(P), p = U(N, h, 1), m = U(P, g, 1);
			} else G(1);
			if (d > _) {
				c && G(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var te = (1 << h) - 1, F = (1 << g) - 1, I = d;; I = d) {
			var j = p[Me(e, d) & te], L = j >> 4;
			if (d += j & 15, d > _) {
				c && G(0);
				break;
			}
			if (j || G(2), L < 256) n[f++] = L;
			else if (L == 256) {
				I = d, p = null;
				break;
			} else {
				var R = L - 254;
				if (L > 264) {
					var D = L - 257, z = pe[D];
					R = W(e, d, (1 << z) - 1) + ve[D], d += z;
				}
				var ne = m[Me(e, d) & F], re = ne >> 4;
				ne || G(3), d += ne & 15;
				var P = xe[re];
				if (re > 3) {
					var z = me[re];
					P += Me(e, d) & (1 << z) - 1, d += z;
				}
				if (d > _) {
					c && G(0);
					break;
				}
				s && l(f + 131072);
				var ie = f + R;
				if (f < P) {
					var ae = a - P, oe = Math.min(P, ie);
					for (ae + f < 0 && G(3); f < oe; ++f) n[f] = r[ae + f];
				}
				for (; f < ie; ++f) n[f] = n[f - P];
			}
		}
		t.l = p, t.p = I, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? Pe(n, 0, f) : n.subarray(0, f);
}, Le = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, Re = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, ze = function(e, t) {
	for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
		s: r,
		f: e[r]
	});
	var i = n.length, a = n.slice();
	if (!i) return {
		t: Ke,
		l: 0
	};
	if (i == 1) {
		var o = new B(n[0].s + 1);
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
	var p = new V(f + 1), m = Be(n[u - 1], p, 0);
	if (m > t) {
		var r = 0, h = 0, g = m - t, _ = 1 << g;
		for (a.sort(function(e, t) {
			return p[t.s] - p[e.s] || e.f - t.f;
		}); r < i; ++r) {
			var v = a[r].s;
			if (p[v] > t) h += _ - (1 << m - p[v]), p[v] = t;
			else break;
		}
		for (h >>= g; h > 0;) {
			var y = a[r].s;
			p[y] < t ? h -= 1 << t - p[y]++ - 1 : ++r;
		}
		for (; r >= 0 && h; --r) {
			var b = a[r].s;
			p[b] == t && (--p[b], ++h);
		}
		m = t;
	}
	return {
		t: new B(p),
		l: m
	};
}, Be = function(e, t, n) {
	return e.s == -1 ? Math.max(Be(e.l, t, n + 1), Be(e.r, t, n + 1)) : t[e.s] = n;
}, Ve = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new V(++t), r = 0, i = e[0], a = 1, o = function(e) {
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
}, He = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, Ue = function(e, t, n) {
	var r = n.length, i = Ne(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, We = function(e, t, n, r, i, a, o, s, c, l, u) {
	Le(t, u++, n), ++i[256];
	for (var d = ze(i, 15), f = d.t, p = d.l, m = ze(a, 15), h = m.t, g = m.l, _ = Ve(f), v = _.c, y = _.n, b = Ve(h), x = b.c, S = b.n, C = new V(19), w = 0; w < v.length; ++w) ++C[v[w] & 31];
	for (var w = 0; w < x.length; ++w) ++C[x[w] & 31];
	for (var T = ze(C, 7), E = T.t, D = T.l, O = 19; O > 4 && !E[he[O - 1]]; --O);
	var ee = l + 5 << 3, k = He(i, Te) + He(a, Ee) + o, A = He(i, f) + He(a, h) + o + 14 + 3 * O + He(C, E) + 2 * C[16] + 3 * C[17] + 7 * C[18];
	if (c >= 0 && ee <= k && ee <= A) return Ue(t, u, e.subarray(c, c + l));
	var j, M, N, P;
	if (Le(t, u, 1 + (A < k)), u += 2, A < k) {
		j = U(f, p, 0), M = f, N = U(h, g, 0), P = h;
		var te = U(E, D, 0);
		Le(t, u, y - 257), Le(t, u + 5, S - 1), Le(t, u + 10, O - 4), u += 14;
		for (var w = 0; w < O; ++w) Le(t, u + 3 * w, E[he[w]]);
		u += 3 * O;
		for (var F = [v, x], I = 0; I < 2; ++I) for (var L = F[I], w = 0; w < L.length; ++w) {
			var R = L[w] & 31;
			Le(t, u, te[R]), u += E[R], R > 15 && (Le(t, u, L[w] >> 5 & 127), u += L[w] >> 12);
		}
	} else j = De, M = Te, N = ke, P = Ee;
	for (var w = 0; w < s; ++w) {
		var z = r[w];
		if (z > 255) {
			var R = z >> 18 & 31;
			Re(t, u, j[R + 257]), u += M[R + 257], R > 7 && (Le(t, u, z >> 23 & 31), u += pe[R]);
			var ne = z & 31;
			Re(t, u, N[ne]), u += P[ne], ne > 3 && (Re(t, u, z >> 5 & 8191), u += me[ne]);
		} else Re(t, u, j[z]), u += M[z];
	}
	return Re(t, u, j[256]), u + M[256];
}, Ge = /*#__PURE__*/ new fe([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), Ke = /*#__PURE__*/ new B(0), qe = function(e, t, n, r, i, a) {
	var o = a.z || e.length, s = new B(r + o + 5 * (1 + Math.ceil(o / 7e3)) + i), c = s.subarray(r, s.length - i), l = a.l, u = (a.r || 0) & 7;
	if (t) {
		u && (c[0] = a.r >> 3);
		for (var d = Ge[t - 1], f = d >> 13, p = d & 8191, m = (1 << n) - 1, h = a.p || new V(32768), g = a.h || new V(m + 1), _ = Math.ceil(n / 3), v = 2 * _, y = function(t) {
			return (e[t] ^ e[t + 1] << _ ^ e[t + 2] << v) & m;
		}, b = new fe(25e3), x = new V(288), S = new V(32), C = 0, w = 0, T = a.i || 0, E = 0, D = a.w || 0, O = 0; T + 2 < o; ++T) {
			var ee = y(T), k = T & 32767, A = g[ee];
			if (h[k] = A, g[ee] = k, D <= T) {
				var j = o - T;
				if ((C > 7e3 || E > 24576) && (j > 423 || !l)) {
					u = We(e, c, 0, b, x, S, w, E, O, T - O, u), E = C = w = 0, O = T;
					for (var M = 0; M < 286; ++M) x[M] = 0;
					for (var M = 0; M < 30; ++M) S[M] = 0;
				}
				var N = 2, P = 0, te = p, F = k - A & 32767;
				if (j > 2 && ee == y(T - F)) for (var I = Math.min(f, j) - 1, L = Math.min(32767, T), R = Math.min(258, j); F <= L && --te && k != A;) {
					if (e[T + N] == e[T + N - F]) {
						for (var z = 0; z < R && e[T + z] == e[T + z - F]; ++z);
						if (z > N) {
							if (N = z, P = F, z > I) break;
							for (var ne = Math.min(F, z - 2), re = 0, M = 0; M < ne; ++M) {
								var ie = T - F + M & 32767, ae = ie - h[ie] & 32767;
								ae > re && (re = ae, A = ie);
							}
						}
					}
					k = A, A = h[k], F += k - A & 32767;
				}
				if (P) {
					b[E++] = 268435456 | ye[N] << 18 | Se[P];
					var oe = ye[N] & 31, se = Se[P] & 31;
					w += pe[oe] + me[se], ++x[257 + oe], ++S[se], D = T + N, ++C;
				} else b[E++] = e[T], ++x[e[T]];
			}
		}
		for (T = Math.max(T, D); T < o; ++T) b[E++] = e[T], ++x[e[T]];
		u = We(e, c, l, b, x, S, w, E, O, T - O, u), l || (a.r = u & 7 | c[u / 8 | 0] << 3, u -= 7, a.h = g, a.p = h, a.i = T, a.w = D);
	} else {
		for (var T = a.w || 0; T < o + l; T += 65535) {
			var ce = T + 65535;
			ce >= o && (c[u / 8 | 0] = l, ce = o), u = Ue(c, u + 1, e.subarray(T, ce));
		}
		a.i = o;
	}
	return Pe(s, 0, r + Ne(u) + i);
}, Je = /*#__PURE__*/ (function() {
	for (var e = /* @__PURE__ */ new Int32Array(256), t = 0; t < 256; ++t) {
		for (var n = t, r = 9; --r;) n = (n & 1 && -306674912) ^ n >>> 1;
		e[t] = n;
	}
	return e;
})(), Ye = function() {
	var e = -1;
	return {
		p: function(t) {
			for (var n = e, r = 0; r < t.length; ++r) n = Je[n & 255 ^ t[r]] ^ n >>> 8;
			e = n;
		},
		d: function() {
			return ~e;
		}
	};
}, Xe = function(e, t, n, r, i) {
	if (!i && (i = { l: 1 }, t.dictionary)) {
		var a = t.dictionary.subarray(-32768), o = new B(a.length + e.length);
		o.set(a), o.set(e, a.length), e = o, i.w = a.length;
	}
	return qe(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
}, Ze = function(e, t, n) {
	for (; n; ++t) e[t] = n, n >>>= 8;
}, Qe = function(e, t) {
	var n = t.filename;
	if (e[0] = 31, e[1] = 139, e[2] = 8, e[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0, e[9] = 3, t.mtime != 0 && Ze(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), n) {
		e[3] = 8;
		for (var r = 0; r <= n.length; ++r) e[r + 10] = n.charCodeAt(r);
	}
}, $e = function(e) {
	(e[0] != 31 || e[1] != 139 || e[2] != 8) && G(6, "invalid gzip data");
	var t = e[3], n = 10;
	t & 4 && (n += (e[10] | e[11] << 8) + 2);
	for (var r = (t >> 3 & 1) + (t >> 4 & 1); r > 0; r -= !e[n++]);
	return n + (t & 2);
}, et = function(e) {
	var t = e.length;
	return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}, tt = function(e) {
	return 10 + (e.filename ? e.filename.length + 1 : 0);
};
function nt(e, t) {
	t ||= {};
	var n = Ye(), r = e.length;
	n.p(e);
	var i = Xe(e, t, tt(t), 8), a = i.length;
	return Qe(i, t), Ze(i, a - 8, n.d()), Ze(i, a - 4, r), i;
}
function rt(e, t) {
	var n = $e(e);
	return n + 8 > e.length && G(6, "invalid gzip data"), Ie(e.subarray(n, -8), { i: 2 }, t && t.out || new B(et(e)), t && t.dictionary);
}
var it = typeof TextEncoder < "u" && /*#__PURE__*/ new TextEncoder(), at = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	at.decode(Ke, { stream: !0 });
} catch {}
var ot = function(e) {
	for (var t = "", n = 0;;) {
		var r = e[n++], i = (r > 127) + (r > 223) + (r > 239);
		if (n + i > e.length) return {
			s: t,
			r: Pe(e, n - 1)
		};
		i ? i == 3 ? (r = ((r & 15) << 18 | (e[n++] & 63) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) - 65536, t += String.fromCharCode(55296 | r >> 10, 56320 | r & 1023)) : i & 1 ? t += String.fromCharCode((r & 31) << 6 | e[n++] & 63) : t += String.fromCharCode((r & 15) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) : t += String.fromCharCode(r);
	}
};
function st(e, t) {
	if (t) {
		for (var n = new B(e.length), r = 0; r < e.length; ++r) n[r] = e.charCodeAt(r);
		return n;
	}
	if (it) return it.encode(e);
	for (var i = e.length, a = new B(e.length + (e.length >> 1)), o = 0, s = function(e) {
		a[o++] = e;
	}, r = 0; r < i; ++r) {
		if (o + 5 > a.length) {
			var c = new B(o + 8 + (i - r << 1));
			c.set(a), a = c;
		}
		var l = e.charCodeAt(r);
		l < 128 || t ? s(l) : l < 2048 ? (s(192 | l >> 6), s(128 | l & 63)) : l > 55295 && l < 57344 ? (l = 65536 + (l & 1047552) | e.charCodeAt(++r) & 1023, s(240 | l >> 18), s(128 | l >> 12 & 63), s(128 | l >> 6 & 63), s(128 | l & 63)) : (s(224 | l >> 12), s(128 | l >> 6 & 63), s(128 | l & 63));
	}
	return Pe(a, 0, o);
}
function ct(e, t) {
	if (t) {
		for (var n = "", r = 0; r < e.length; r += 16384) n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
		return n;
	} else if (at) return at.decode(e);
	else {
		var i = ot(e), a = i.s, n = i.r;
		return n.length && G(8), a;
	}
}
//#endregion
//#region src/core/storage.ts
var lt = null;
function ut(e = Date.now()) {
	return {
		version: 2,
		createdAt: e,
		dailyGoal: 10,
		dailyStreak: 0,
		lastDailyDate: "",
		recommendedCourseId: r[0].id,
		placementCourseId: null,
		totalCorrect: 0,
		totalAnswers: 0,
		bestStreak: 0,
		achievements: [],
		confusions: {},
		courseProgress: Object.fromEntries(r.map((e) => [e.id, {
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
function K() {
	return lt ??= L("zwitscher-v2", 2, { upgrade(e, t) {
		if (t < 1) {
			e.createObjectStore("profile");
			let t = e.createObjectStore("reviews", { keyPath: "key" });
			t.createIndex("by-due", "dueAt"), t.createIndex("by-species", "speciesId"), e.createObjectStore("sessions", { keyPath: "id" }).createIndex("by-finished", "finishedAt"), e.createObjectStore("content");
		}
		let n = e;
		n.objectStoreNames.contains("journal") && n.deleteObjectStore("journal"), n.objectStoreNames.contains("journalMedia") && n.deleteObjectStore("journalMedia");
	} }), lt;
}
async function dt() {
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
async function ft() {
	if (Object.keys(localStorage).filter((e) => e.startsWith("zwitscher-")).forEach((e) => localStorage.removeItem(e)), await R("zwitscher-media").catch(() => void 0), "caches" in window) {
		let e = await caches.keys();
		await Promise.all(e.filter((e) => e.includes("zwitscher")).map((e) => caches.delete(e)));
	}
	let e = await K();
	await Promise.all([
		"profile",
		"reviews",
		"sessions",
		"content"
	].map((t) => e.clear(t)));
	let t = ut();
	return await e.put("profile", t, "main"), localStorage.setItem("zwitscher-v2-reset-complete", "1"), t;
}
async function pt() {
	let e = await K(), t = await e.get("profile", "main");
	if (t) return t;
	let n = ut();
	return await e.put("profile", n, "main"), n;
}
async function mt(e) {
	await (await K()).put("profile", e, "main");
}
async function ht() {
	return (await K()).getAll("reviews");
}
async function gt(e) {
	await (await K()).put("reviews", e);
}
async function _t(e) {
	await (await K()).put("sessions", e);
}
async function vt() {
	return (await K()).getAll("sessions");
}
async function yt() {
	return (await K()).get("content", "offline");
}
async function bt(e) {
	await (await K()).put("content", e, "offline");
}
async function xt() {
	let [e, t, n] = await Promise.all([
		pt(),
		ht(),
		vt()
	]), r = {
		format: "zwitscher-backup",
		version: 2,
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		profile: e,
		reviews: t,
		sessions: n
	};
	return new Blob([nt(st(JSON.stringify(r)))], { type: "application/gzip" });
}
async function St(e) {
	let t = new Uint8Array(await e.arrayBuffer()), n = JSON.parse(ct(rt(t)));
	if (n.format !== "zwitscher-backup" || n.version !== 2 || n.profile?.version !== 2 || !Array.isArray(n.reviews) || !Array.isArray(n.sessions)) throw Error("Ungültige Zwitscher-Sicherung");
	let r = (await K()).transaction([
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
var Ct = "zwitscher-media-v2", wt = class {
	paused = !1;
	pause() {
		this.paused = !0;
	}
	async install(t) {
		this.paused = !1;
		let n = await b(), r = [...n.photos, ...n.recordings], i = r.map((e) => e.src), a = new Map(r.map((e) => [e.src, e.bytes])), o = await yt();
		(!o || o.version !== n.version) && (await caches.delete(Ct), o = {
			version: n.version,
			cached: [],
			failed: [],
			total: i.length,
			totalBytes: n.totalBytes,
			downloadedBytes: 0,
			ready: !1,
			paused: !1
		});
		let s = await caches.open(Ct);
		await s.put(e("media/manifest.json"), new Response(JSON.stringify(n), { headers: { "content-type": "application/json" } }));
		let c = await Promise.all(o.cached.map(async (e) => [e, !!await s.match(e)])), l = new Set(c.filter(([, e]) => e).map(([e]) => e)), u = /* @__PURE__ */ new Set(), d = () => {
			let e = [...l].reduce((e, t) => e + (a.get(t) ?? 0), 0);
			return {
				version: n.version,
				cached: [...l],
				failed: [...u],
				total: i.length,
				totalBytes: n.totalBytes,
				downloadedBytes: e,
				paused: this.paused,
				ready: l.size === i.length
			};
		};
		for (let e of i) {
			if (this.paused) break;
			if (!l.has(e)) try {
				let t = await fetch(e);
				if (!t.ok) throw Error(String(t.status));
				await s.put(e, t.clone()), l.add(e), u.delete(e);
			} catch {
				u.add(e);
			}
			o = d(), await bt(o), t(o);
		}
		return o = d(), await bt(o), t(o), o;
	}
};
async function Tt() {
	let e = await b(), t = await yt(), n = {
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
	let r = await caches.open(Ct), i = (await Promise.all(t.cached.map(async (e) => await r.match(e) ? e : null))).filter((e) => !!e), a = new Map([...e.photos, ...e.recordings].map((e) => [e.src, e.bytes])), o = i.reduce((e, t) => e + (a.get(t) ?? 0), 0);
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
function Et(e, t) {
	return e >= .8 && t.length > 0 && t.every((e) => e >= 2);
}
function Dt(e, t = 2) {
	let n = Object.entries(e).filter(([e, n]) => e.includes(">") && n >= t).sort((e, t) => t[1] - e[1] || e[0].localeCompare(t[0], "de"))[0];
	if (!n) return null;
	let [r, i] = n[0].split(">");
	return r && i ? [r, i] : null;
}
function Ot(e, t) {
	return Object.entries(t).filter(([t]) => t.startsWith(`${e}>`)).sort((e, t) => t[1] - e[1] || e[0].localeCompare(t[0], "de")).map(([t]) => t.slice(e.length + 1)).filter(Boolean);
}
//#endregion
//#region src/core/router.ts
function kt(e = location.hash) {
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
function At(e) {
	let t = `#/${e.replace(/^\//, "")}`;
	location.hash === t ? window.dispatchEvent(new HashChangeEvent("hashchange")) : location.hash = t;
}
//#endregion
//#region src/core/scheduler.ts
var jt = [
	0,
	1,
	3,
	7,
	14,
	30,
	60,
	120
], Mt = 864e5, Nt = 6e5;
function Pt(e, t) {
	return `${e}:${t}`;
}
function Ft(e, t, n = Date.now()) {
	return {
		key: Pt(e, t),
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
function It(e, t) {
	return e ? t ? 3 : 5 : 0;
}
function Lt(e, t, n, r = Date.now()) {
	let i = It(t, n);
	if (!t) return {
		...e,
		step: 0,
		dueAt: r + Nt,
		wrong: e.wrong + 1,
		lapses: e.lapses + 1,
		lastSeenAt: r,
		lastGrade: i
	};
	if (n) return {
		...e,
		dueAt: r + Mt,
		correct: e.correct + 1,
		lastSeenAt: r,
		lastGrade: i
	};
	let a = Math.min(jt.length - 1, e.step + 1);
	return {
		...e,
		step: a,
		dueAt: r + jt[a] * Mt,
		correct: e.correct + 1,
		lastSeenAt: r,
		lastGrade: i
	};
}
function Rt(e, t = Date.now()) {
	return e.step > 0 ? e : {
		...e,
		step: 1,
		dueAt: t + Mt,
		lastSeenAt: t,
		lastGrade: 3
	};
}
function zt(e) {
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
function Bt(e, t = Date.now()) {
	return e.step > 0 && e.dueAt <= t;
}
function Vt(e, t = Date.now()) {
	return 1 + (Bt(e, t) ? 5 : 0) + e.wrong * 1.5 + e.lapses * 2 + Math.max(0, 4 - e.step);
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
function Ht(e, t = "") {
	let [n, r, i, a] = e.illustration.palette, o = e.illustration.mark === "crest" ? `<path d="m125 33 14-28 8 27 15-24 2 34Z" fill="${i}"/>` : "", s = e.illustration.mark === "long-tail" ? `<path d="M80 158 18 207l75-27Z" fill="${r}"/>` : `<path d="M61 170 34 193l48-10 23-22Z" fill="${r}"/>`, c = e.illustration.mark === "red-chest" ? `<path d="M120 76c18-20 51-17 65 5-8 25-26 36-49 31-2-14-7-26-16-36Z" fill="${i}"/>` : "", l = e.illustration.mark === "long-beak" ? "<path d=\"m188 67 51 9-53 10Z\" fill=\"" + i + "\"/>" : "<path d=\"m188 67 38 9-40 10Z\" fill=\"" + i + "\"/>";
	return `<svg class="bird-art ${t}" viewBox="0 0 240 210" role="img" aria-label="Illustration: ${q(e.name)}"><g transform="translate(3 2)">${s}<path d="M81 170 69 204l34-27Z" fill="${n}"/><ellipse cx="121" cy="122" rx="69" ry="61" fill="${n}" transform="rotate(-10 121 122)"/><ellipse cx="137" cy="138" rx="44" ry="43" fill="${a}" transform="rotate(-17 137 138)"/><ellipse cx="91" cy="129" rx="37" ry="47" fill="${r}" transform="rotate(24 91 129)"/><path d="M65 119c21 4 34 17 44 38-24-5-37-15-44-38Z" fill="${i}" opacity=".34"/><circle cx="150" cy="66" r="43" fill="${n}"/>${o}${c}<circle cx="166" cy="57" r="5" fill="#152e29"/><circle cx="168" cy="55" r="1.4" fill="white"/>${l}<path d="M112 177v18m24-17 4 17m-37 0h18m9 0h19" fill="none" stroke="#684c35" stroke-width="4" stroke-linecap="round"/></g></svg>`;
}
function Ut(e, t) {
	return `<span class="mastery-badge level-${t}"><i></i>${e}</span>`;
}
function Wt(e) {
	return e >= 1024 * 1024 ? `${(e / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(e / 1024)} KB`;
}
function Gt(e = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(e);
}
function Kt(e) {
	let t = [...e].reduce((e, t) => (e << 5) - e + t.charCodeAt(0) | 0, 2166136261);
	return () => {
		t |= 0, t = t + 1831565813 | 0;
		let e = Math.imul(t ^ t >>> 15, 1 | t);
		return e = e + Math.imul(e ^ e >>> 7, 61 | e) ^ e, ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function qt(e, t = Math.random) {
	let n = [...e];
	for (let e = n.length - 1; e > 0; --e) {
		let r = Math.floor(t() * (e + 1));
		[n[e], n[r]] = [n[r], n[e]];
	}
	return n;
}
//#endregion
//#region src/app.ts
var Jt = {
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
}, Yt = {
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
}, J = new v(), Xt = new wt(), Zt, Y, Qt = /* @__PURE__ */ new Map(), $t = [], en, X, Z = null, tn = null;
J.onStateChange(nn);
function nn(e) {
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
async function rn() {
	if (Zt = document.querySelector("#view"), on(), dn(), t({ immediate: !0 }), await dt() && localStorage.getItem("zwitscher-v2-reset-complete") !== "1") {
		sn();
		return;
	}
	await an();
}
async function an() {
	try {
		[Y, en, X, $t] = await Promise.all([
			pt(),
			b(),
			Tt(),
			vt()
		]), Qt = new Map((await ht()).map((e) => [e.key, e])), un(), window.addEventListener("hashchange", () => void cn(kt())), await cn(kt());
	} catch (e) {
		Zt.innerHTML = `<section class="fatal"><p class="eyebrow">Start fehlgeschlagen</p><h1>Zwitscher konnte nicht geladen werden.</h1><p>${q(e instanceof Error ? e.message : String(e))}</p><button class="primary" onclick="location.reload()">Neu laden</button></section>`;
	}
}
function on() {
	document.addEventListener("click", (e) => {
		let t = e.target.closest("[data-route]");
		t?.dataset.route && At(t.dataset.route);
	}), document.querySelector("#home-button")?.addEventListener("click", () => At("")), document.querySelector("#stats-button")?.addEventListener("click", () => At("stats")), document.querySelector("#collection-button")?.addEventListener("click", () => At("book")), document.querySelector("#settings-button")?.addEventListener("click", () => At("settings")), document.querySelector("#sound-button")?.addEventListener("click", () => {
		J.toggle();
	});
}
function sn() {
	Zt.innerHTML = `<section class="migration-screen"><div class="migration-art">${Ht(h.get("rotkehlchen"))}</div><div><p class="eyebrow">Willkommen bei Zwitscher 2</p><h1>Ein neuer Lernweg beginnt.</h1><p>Das neue Kurssystem verwendet ein grundlegend anderes Lernmodell. Wie festgelegt werden der bisherige Lernstand und alte Offline-Pakete vollständig gelöscht.</p><div class="warning-box"><strong>Dieser Schritt ist endgültig.</strong><span>Nach dem Neustart beginnt Zwitscher mit einem leeren Profil.</span></div><button class="primary" id="confirm-reset">Version 2 neu starten</button></div></section>`, document.querySelector("#confirm-reset")?.addEventListener("click", async (e) => {
		let t = e.currentTarget;
		t.disabled = !0, t.textContent = "Lokale Daten werden gelöscht …", await ft(), await an();
	});
}
async function cn(e) {
	if (J.stop(), Jn(), ln(e.name), e.name === "home") return _n();
	if (e.name === "course") return bn(e.id);
	if (e.name === "lesson") return Dn(e.courseId, e.phase);
	if (e.name === "placement") return On();
	if (e.name === "mode") return e.id ? kn(e.id) : xn();
	if (e.name === "book") return Qn();
	if (e.name === "species") return $n(e.id);
	if (e.name === "compare") return er(e.first, e.second);
	if (e.name === "stats") return tr();
	if (e.name === "settings") return rr();
}
function ln(e) {
	let t = {
		stats: "stats-button",
		book: "collection-button",
		species: "collection-button",
		settings: "settings-button"
	};
	document.querySelectorAll(".top-actions button").forEach((e) => e.classList.remove("active")), t[e] && document.querySelector(`#${t[e]}`)?.classList.add("active");
}
function un() {
	document.documentElement.dataset.text = Y.settings.largeText ? "large" : "normal", document.body.dataset.weather = Y.settings.weather, document.body.classList.toggle("high-contrast", Y.settings.contrast), document.body.classList.toggle("reduce-motion", Y.settings.reducedMotion);
}
function dn(e = "garden") {
	let t = (/* @__PURE__ */ new Date()).getHours();
	document.body.dataset.time = t < 7 ? "dawn" : t < 18 ? "day" : t < 22 ? "dusk" : "night", document.body.dataset.habitat = e;
}
function Q(e) {
	Zt.innerHTML = e, Zt.querySelectorAll("img").forEach((e) => e.addEventListener("error", () => {
		e.hidden = !0;
		let t = e.nextElementSibling;
		t && (t.style.display = "grid");
	}, { once: !0 })), window.scrollTo({
		top: 0,
		behavior: Y?.settings.reducedMotion ? "auto" : "smooth"
	});
}
function fn(e) {
	let t = document.querySelector("#toast");
	t.textContent = e, t.classList.add("visible"), window.setTimeout(() => t.classList.remove("visible"), 2800);
}
function $(e, t = "mixed") {
	let n = [...Qt.values()].filter((n) => n.speciesId === e && (t === "mixed" || n.voiceType === t));
	return zt(n.length ? Math.max(...n.map((e) => e.step)) : 0);
}
function pn() {
	return [...Qt.values()].filter((e) => Bt(e)).sort((e, t) => e.dueAt - t.dueAt);
}
function mn() {
	return Y.totalAnswers ? Math.round(Y.totalCorrect / Y.totalAnswers * 100) : 0;
}
function hn(e) {
	return Et(Y.courseProgress[e.id]?.examBest ?? 0, e.speciesIds.map((t) => $(t, e.voiceType).level));
}
function gn() {
	if (X.ready) return `<aside class="offline-ready"><span>✓</span><div><strong>Vollständig offline</strong><small>${en.recordings.length} Stimmen und ${en.photos.length} Fotos installiert</small></div></aside>`;
	let e = X.total ? Math.round(X.cached.length / X.total * 100) : 0, t = Math.max(0, X.totalBytes - (X.downloadedBytes ?? 0));
	return `<aside class="setup-card" id="setup-card"><div><p class="eyebrow">Einmalige Einrichtung</p><h2>Die ganze Vogelwelt offline</h2><p>${Wt(X.totalBytes)} hochwertige Stimmen und Fotos. Der Download kann jederzeit fortgesetzt werden.</p><div class="download-progress"><i id="download-bar" style="width:${e}%"></i></div><small id="download-status">${X.cached.length}/${X.total} Dateien · noch ${Wt(t)}${X.failed.length ? ` · ${X.failed.length} fehlgeschlagen` : ""}</small>${X.failed.length ? `<details class="failed-files"><summary>Fehlerhafte Dateien anzeigen</summary>${X.failed.map((e) => `<code>${q(e)}</code>`).join("")}</details>` : ""}</div><div class="setup-actions"><button class="primary" id="install-media">${X.cached.length ? "Fortsetzen" : "Alles installieren"}</button><button class="ghost hidden" id="pause-media">Pausieren</button></div></aside>`;
}
function _n() {
	Z = null, dn();
	let e = pn().length, t = m.filter((e) => $(e.id).level >= 2).length, n = i.get(Y.recommendedCourseId) ?? r[0], a = r.findIndex((e) => e.id === n.id), o = $t.filter((e) => Gt(new Date(e.finishedAt)) === Gt()).reduce((e, t) => e + t.answers.length, 0), s = [...$t].sort((e, t) => t.finishedAt - e.finishedAt)[0], c = Dt(Y.confusions);
	Q(`<div class="home-v2"><section class="home-hero"><div><p class="eyebrow">Dein Ohr wird zum Fernglas</p><h1>Höre, was<br><em>draußen lebt.</em></h1><p>Ein geführter Lernpfad für 60 heimische Arten – mit echten Stimmen, Feldfotos und Wiederholungen zur richtigen Zeit.</p><div class="hero-actions"><button class="primary" data-route="course/${n.id}">Weiter bei Kurs ${a + 1}</button><button class="ghost" data-route="mode/adaptive">${e ? `${e} fällige Stimmen` : "Lerntrainer starten"} →</button></div><div class="metric-row"><div><strong>${t}/60</strong><span>Arten erkannt</span></div><div><strong>${mn()}%</strong><span>Trefferquote</span></div><div><strong>${Y.dailyStreak}</strong><span>Tagesserie</span></div></div></div><aside class="hero-bird"><div class="sun"></div>${Ht(h.get("rotkehlchen"))}<span>Heute draußen</span><strong>${Gt()}</strong></aside></section>
    ${gn()}
    <section class="path-section"><div class="section-head"><div><p class="eyebrow">Geführter Lernpfad</p><h2>Von vertraut bis feldbereit</h2></div><button class="text-button" data-route="placement">Einstufungstest starten →</button></div><div class="course-path">${r.map((e, t) => vn(e, t)).join("")}</div></section>
    <section class="home-panels"><article><span class="panel-icon">↻</span><div><p class="eyebrow">Heute wiederholen</p><h2>${e ? `${e} Stimmen sind fällig` : "Alles im grünen Bereich"}</h2><p>${e ? "Kurze Wiederholungen festigen, was sonst verblasst." : "Neue Lektionen werden später automatisch wieder fällig."}</p></div><button class="ghost" data-route="mode/adaptive">Trainieren</button></article><article><span class="panel-icon">☀</span><div><p class="eyebrow">Tagesziel · ${Math.min(o, Y.dailyGoal)}/${Y.dailyGoal}</p><h2>Stimme des Tages</h2><p>${s ? `Zuletzt: ${nr(s)}.` : "Fünf deterministische Aufgaben für deinen Lernrhythmus."}</p></div><button class="ghost" id="home-daily">Starten</button></article><article><span class="panel-icon">♪</span><div><p class="eyebrow">Freies Spiel</p><h2>Sechs Spielmodi</h2><p>Zeitrunde, Überleben, Klanglandschaft und mehr.</p></div><button class="ghost" data-route="mode">Modi öffnen</button></article>${c ? `<article><span class="panel-icon">A/B</span><div><p class="eyebrow">Automatischer Kontrast</p><h2>${h.get(c[0])?.name} oder ${h.get(c[1])?.name}?</h2><p>Diese Stimmen wurden mehrfach verwechselt.</p></div><button class="ghost" data-route="compare/${c[0]}/${c[1]}">Vergleichen</button></article>` : ""}</section>
  </div>`), yn(), document.querySelector("#home-daily")?.addEventListener("click", () => void An());
}
function vn(e, t) {
	let n = Y.courseProgress[e.id], r = hn(e), i = e.id === Y.recommendedCourseId, a = e.speciesIds.map((t) => $(t, e.voiceType).level).filter((e) => e >= 2).length;
	return `<button class="course-card ${r ? "complete" : ""} ${i ? "current" : ""}" data-route="course/${e.id}"><span class="course-number">${r ? "✓" : String(t + 1).padStart(2, "0")}</span><span class="course-icon">${e.icon}</span><span class="course-copy"><small>${i ? "Empfohlen" : r ? "Abgeschlossen" : `${e.speciesIds.length} Arten`}</small><strong>${e.title}</strong><em>${e.subtitle}</em><span class="micro-progress"><i style="width:${a / e.speciesIds.length * 100}%"></i></span></span><span class="course-score">${Math.round(n.examBest * 100)}%</span></button>`;
}
function yn() {
	let e = document.querySelector("#install-media"), t = document.querySelector("#pause-media");
	!e || !t || (e.addEventListener("click", async () => {
		e.disabled = !0, e.textContent = "Wird installiert …", t.classList.remove("hidden");
		try {
			X = await Xt.install((e) => {
				X = e;
				let t = Math.round(e.cached.length / e.total * 100), n = document.querySelector("#download-bar"), r = document.querySelector("#download-status");
				n && (n.style.width = `${t}%`), r && (r.textContent = `${e.cached.length}/${e.total} Dateien · noch ${Wt(Math.max(0, e.totalBytes - e.downloadedBytes))}${e.failed.length ? ` · ${e.failed.length} fehlgeschlagen` : ""}`);
			}), X.ready ? (fn("Zwitscher ist vollständig offline verfügbar."), _n()) : (e.disabled = !1, e.textContent = X.failed.length ? "Fehlerhafte Dateien erneut versuchen" : "Fortsetzen", t.classList.add("hidden"));
		} catch (n) {
			e.disabled = !1, e.textContent = "Erneut versuchen", t.classList.add("hidden"), fn(n instanceof Error ? n.message : "Download fehlgeschlagen");
		}
	}), t.addEventListener("click", () => {
		Xt.pause(), t.disabled = !0, t.textContent = "Wird pausiert …";
	}));
}
function bn(e) {
	Z = null;
	let t = i.get(e);
	if (!t) {
		At("");
		return;
	}
	dn(t.habitat === "mixed" ? "garden" : t.habitat);
	let n = Y.courseProgress[e], r = t.speciesIds.filter((e) => $(e, t.voiceType).level >= 2).length;
	Q(`<div class="page"><button class="back" data-route="">← Lernpfad</button><header class="course-hero"><span>${t.icon}</span><div><p class="eyebrow">Kurs ${t.order} · ${t.speciesIds.length} Arten</p><h1>${t.title}</h1><p>${t.subtitle}</p><div class="course-overview"><strong>${r}/${t.speciesIds.length} erkannt</strong><strong>${Math.round(n.examBest * 100)}% Prüfungsbestwert</strong></div></div></header>
    <section class="lesson-list"><div class="section-head"><div><p class="eyebrow">Fünf Lernphasen</p><h2>Schritt für Schritt hören</h2></div><span>Alle Phasen sind frei zugänglich</span></div>${t.lessonPhases.map((e, r) => {
		let i = Yt[e], a = n.completedPhases.includes(e);
		return `<button class="lesson-row ${a ? "done" : ""}" data-route="course/${t.id}/${e}"><b>${a ? "✓" : i.icon}</b><span><strong>${i.label}</strong><small>${i.description}</small></span><em>${e === "exam" && n.examBest ? `${Math.round(n.examBest * 100)}%` : "Starten →"}</em></button>`;
	}).join("")}</section>
    <section class="course-species"><div class="section-head"><div><p class="eyebrow">In diesem Kurs</p><h2>Die Arten</h2></div></div><div class="species-strip">${t.speciesIds.map((e) => {
		let n = h.get(e), r = $(n.id, t.voiceType);
		return `<button data-route="species/${n.id}"><img src="${n.photo}" alt="${q(n.name)}" onerror="this.hidden=true"><span>${Ht(n)}</span><strong>${n.name}</strong><small>${r.label}</small></button>`;
	}).join("")}</div></section></div>`);
}
function xn() {
	Z = null, Q(`<div class="page"><header class="page-head"><div><p class="eyebrow">Freies Spiel</p><h1>Wie möchtest du hören?</h1><p>Die freien Modi verwenden dieselben Stimmen und stärken denselben Lernstand wie die Kurse.</p></div><button class="back" data-route="">← Startseite</button></header><div class="mode-grid">${Object.entries(Jt).map(([e, t]) => `<button class="mode-card" data-route="mode/${e}"><span>${t.icon}</span><strong>${t.label}</strong><p>${t.description}</p><em>Starten →</em></button>`).join("")}</div><section class="special-games"><article><span>☀</span><div><p class="eyebrow">Jeden Tag neu</p><h2>Stimme des Tages</h2><p>Fünf für alle identische Aufgaben mit wachsender Tagesserie.</p></div><button class="primary" id="daily-game">Starten</button></article><div class="section-head"><div><p class="eyebrow">Lebensräume</p><h2>Expeditionen</h2></div></div><div class="expedition-grid">${[
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
	].map(([e, t, n]) => `<button data-expedition="${e}"><span>${t}</span><strong>${n}</strong><small>10 Stimmen</small></button>`).join("")}</div></section></div>`), document.querySelector("#daily-game")?.addEventListener("click", () => void An()), document.querySelectorAll("[data-expedition]").forEach((e) => e.addEventListener("click", () => void jn(e.dataset.expedition)));
}
function Sn(e) {
	let t = (/* @__PURE__ */ new Date()).getMonth() + 1, n = m.filter((t) => !e || e === "mixed" || t.habitats.includes(e));
	return Y.settings.region !== "all" && (n = n.filter((e) => e.regions.includes(Y.settings.region))), Y.settings.seasonal && (n = n.filter((e) => e.activeMonths.includes(t))), n.length >= 4 ? n : m;
}
function Cn(e, t) {
	return Qt.get(Pt(e, t)) ?? Ft(e, t);
}
function wn(e, t, n) {
	return t !== "mixed" && e.voiceTypes.includes(t) ? t : e.voiceTypes[n % e.voiceTypes.length] ?? e.voiceTypes[0] ?? "song";
}
function Tn(e, t, n, r = Math.random) {
	let i = Ot(e.id, Y.confusions), a = [.../* @__PURE__ */ new Set([...i, ...e.confusions])].map((e) => h.get(e)).filter((e) => !!e), o = qt(n.filter((t) => t.id !== e.id && !a.some((e) => e.id === t.id)), r);
	return qt([
		e,
		...a,
		...o
	].slice(0, t), r);
}
async function En(e, t, n, r, i = Math.random) {
	let a = qt(e, i), o = [];
	for (; o.length < t;) o.push(...qt(a, i));
	return Promise.all(o.slice(0, t).map(async (t, a) => {
		let o = wn(t, n, a);
		return {
			species: t,
			recording: await S(t.id, o, i()),
			voiceType: o,
			options: Tn(t, r === "duel" ? 2 : 4, e, i)
		};
	}));
}
async function Dn(e, t) {
	let n = i.get(e);
	if (!n || !Yt[t]) {
		At(`course/${e}`);
		return;
	}
	let r = n.speciesIds.map((e) => h.get(e)).filter((e) => !!e);
	Mn({
		kind: "course",
		course: n,
		phase: t,
		items: await En(r, t === "learn" ? r.length : t === "exam" ? 10 : Math.max(8, r.length), n.voiceType, t),
		typed: t === "recall"
	});
}
async function On() {
	Mn({
		kind: "placement",
		items: await En(m, 20, "mixed", "game", Kt("zwitscher-placement-v2")),
		typed: !1
	});
}
async function kn(e) {
	if (!Jt[e]) {
		xn();
		return;
	}
	let t = Sn(), n = 8, r = "mode";
	if (e === "adaptive") {
		r = "review";
		let e = pn();
		t = e.length ? [...new Set(e.map((e) => e.speciesId))].map((e) => h.get(e)).filter(Boolean) : [...m].sort((e, t) => Vt(Cn(t.id, t.voiceTypes[0] ?? "song")) - Vt(Cn(e.id, e.voiceTypes[0] ?? "song"))).slice(0, 12);
	}
	(e === "dawn" || e === "survival") && (n = 30);
	let i = await En(t, n, "mixed", "game");
	Mn({
		kind: r,
		mode: e,
		items: i,
		typed: !1
	});
}
async function An() {
	let e = Kt(`daily-${Gt()}-v2`);
	Mn({
		kind: "daily",
		items: await En(Sn(), 5, "mixed", "game", e),
		typed: !1
	});
}
async function jn(e) {
	Mn({
		kind: "expedition",
		habitat: e,
		items: await En(Sn(e), 10, "mixed", "game"),
		typed: !1
	});
}
function Mn(e) {
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
	}, e.mode === "dawn" && qn(), Fn();
}
function Nn() {
	return Z.items[Z.index];
}
function Pn() {
	return Z?.kind === "placement" ? "Einstufungstest" : Z?.kind === "daily" ? "Stimme des Tages" : Z?.kind === "expedition" ? "Lebensraum-Expedition" : Z?.course ? `${Z.course.title} · ${Yt[Z.phase].label}` : Z?.mode ? Jt[Z.mode].label : "Training";
}
function Fn() {
	if (!Z || !Nn()) {
		Wn();
		return;
	}
	if (Z.questionStartedAt = Date.now(), Z.answered = !1, Z.hintUsed = !1, Z.hintStep = 1, Z.phase === "learn") {
		Un();
		return;
	}
	let e = Nn(), t = Math.round(Z.index / Z.items.length * 100), n = Z.mode === "clue", r = Z.phase === "exam";
	Q(`<div class="game-page"><header class="game-header"><button class="back" data-route="${Z.course ? `course/${Z.course.id}` : "mode"}">× Beenden</button><div><span>${Z.index + 1}/${Z.items.length}</span><div class="game-progress"><i style="width:${t}%"></i></div></div><strong>${Z.score} P</strong></header><div class="game-meta"><span>${Pn()}</span>${Z.mode === "dawn" ? `<b id="timer">${Z.timeLeft}s</b>` : ""}${Z.mode === "survival" ? `<b aria-label="Leben">${"♥".repeat(Z.lives)}${"♡".repeat(3 - Z.lives)}</b>` : ""}</div>
    <main class="question-card"><div class="question-title"><p class="eyebrow">${n ? "Spuren lesen" : "Ohren auf"}</p><h1>${n ? "Wer bin ich?" : Z.mode === "soundscape" ? "Wer führt den Chor?" : "Wer singt hier?"}</h1></div>
      ${n ? Ln(e.species) : In()}
      <div class="hint-copy ${Z.hintUsed ? "visible" : ""}" id="hint-copy">${q(e.species.songTip)}</div>
      ${Z.typed || Z.phase === "recall" ? "<form class=\"recall-form\" id=\"recall-form\"><label for=\"recall-input\">Art selbst eingeben</label><div><input id=\"recall-input\" autocomplete=\"off\" placeholder=\"Deutscher oder wissenschaftlicher Name\"><button class=\"primary\" type=\"submit\">Prüfen</button></div></form>" : `<div class="answers">${e.options.map((e, t) => `<button data-answer="${e.id}"><span>${t + 1}</span>${e.name}</button>`).join("")}</div>`}
      <footer class="question-tools">${r ? "" : `<button class="tool" id="hint-button" ${n && Z.hintStep >= 3 ? "disabled" : ""}>✦ ${n ? "Nächster Hinweis" : "Hinweis"}</button>`}${n ? "" : `<button class="tool" id="speed-button">${J.playbackRate === 1 ? "1×" : "0,75×"}</button><button class="tool" id="loop-button" aria-pressed="${J.loop}">↻ Ausschnitt</button>`}<span>Serie <strong>×${Z.streak}</strong></span></footer>
    </main></div>`), Rn(), n || zn();
}
function In() {
	return `<div class="audio-stage" id="audio-stage" data-audio-id="${Nn().recording.id}"><canvas id="spectrum" aria-label="Live-Frequenzbild"></canvas><button class="play-orbit" id="play-button" data-audio-id="${Nn().recording.id}" aria-label="Vogelstimme abspielen" aria-pressed="false"><span data-play-icon>▶</span></button><p data-play-status>Tippen zum Hören</p></div>`;
}
function Ln(e) {
	let t = [
		["Lebensraum", e.habitats.map(Yn).join(" · ")],
		["Beobachtung", e.fact],
		["Klang-Merkhilfe", e.songTip]
	];
	return `<div class="clue-stack"><strong>${Z.hintStep}</strong>${t.slice(0, Z.hintStep).map(([e, t]) => `<div><span>${e}</span><p>${q(t)}</p></div>`).join("")}</div>`;
}
function Rn() {
	document.querySelector("#play-button")?.addEventListener("click", () => void zn(!0)), document.querySelector("#speed-button")?.addEventListener("click", (e) => {
		J.setRate(J.playbackRate === 1 ? .75 : 1), e.currentTarget.textContent = J.playbackRate === 1 ? "1×" : "0,75×";
	}), document.querySelector("#loop-button")?.addEventListener("click", (e) => {
		J.setLoop(!J.loop), e.currentTarget.classList.toggle("active", J.loop);
	}), document.querySelector("#hint-button")?.addEventListener("click", () => {
		Z.mode === "clue" ? (Z.hintUsed = !0, Z.hintStep = Math.min(3, Z.hintStep + 1), Fn()) : (Z.hintUsed = !0, document.querySelector("#hint-copy")?.classList.add("visible"), document.querySelector("#hint-button").disabled = !0);
	}), document.querySelectorAll("[data-answer]").forEach((e) => e.addEventListener("click", () => void Vn(e.dataset.answer))), document.querySelector("#recall-form")?.addEventListener("submit", (e) => {
		e.preventDefault(), Vn(document.querySelector("#recall-input").value, !0);
	});
}
async function zn(e = !1) {
	if (!Z) return;
	let t = Nn(), n = [];
	Z.mode === "soundscape" && (n = qt(Z.items.filter((e) => e.species.id !== t.species.id)).slice(0, 2).map((e) => e.recording));
	let r = {
		canvas: document.querySelector("#spectrum"),
		pan: Y.settings.spatialAudio ? (Math.random() - .5) * 1.2 : 0,
		backgrounds: n
	};
	e ? await J.playOrToggle(t.recording, r) : await J.play(t.recording, r);
}
function Bn(e) {
	return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}
async function Vn(e, t = !1) {
	if (!Z || Z.answered) return;
	let n = Nn(), r = t ? m.find((t) => [
		t.name,
		t.scientificName,
		t.id
	].some((t) => Bn(t) === Bn(e))) : h.get(e), i = r?.id === n.species.id;
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
		let e = Lt(Cn(n.species.id, n.voiceType), i, Z.hintUsed);
		Qt.set(e.key, e), await gt(e), Y.totalAnswers += 1, i && (Y.totalCorrect += 1), Y.bestStreak = Math.max(Y.bestStreak, Z.bestStreak), await mt(Y);
	}
	!i && Z.kind !== "placement" && !Z.requeued.has(n.recording.id) && (Z.requeued.add(n.recording.id), Z.items.splice(Math.min(Z.index + 4, Z.items.length), 0, n)), Hn(i, r);
}
function Hn(e, t) {
	if (!Z) return;
	let n = Nn(), r = $(n.species.id, n.voiceType), i = Cn(n.species.id, n.voiceType), a = i.step ? new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(i.dueAt) : "heute";
	Q(`<div class="feedback-page"><header class="game-header"><span>${Z.index + 1}/${Z.items.length}</span><div class="game-progress"><i style="width:${Math.round((Z.index + 1) / Z.items.length * 100)}%"></i></div><strong>${Z.score} P</strong></header><article class="feedback-card ${e ? "correct" : "wrong"}"><div class="feedback-photo"><img src="${n.species.photo}" alt="${q(n.species.name)}"><span>${e ? "✓" : "→"}</span></div><div class="feedback-main"><p class="eyebrow">${e ? "Richtig erkannt" : t ? `Nicht ${q(t.name)}, sondern` : "Gesucht war"}</p><h1>${n.species.name}</h1><p class="latin">${n.species.scientificName}</p><p>${n.species.fact}</p><div class="memory-note"><span>♪</span><p><strong>Hörschlüssel</strong>${n.voiceType === "song" ? n.species.songTip : n.species.callTip}</p></div><div class="feedback-mastery">${Ut(r.label, r.level)}<span>Nächste Wiederholung: <strong>${a}</strong></span></div><div class="feedback-actions"><button class="ghost" id="feedback-play" data-audio-id="${n.recording.id}" aria-pressed="false"><span data-play-icon>▶</span> Noch einmal hören</button>${n.species.confusions[0] ? `<button class="ghost" data-route="compare/${n.species.id}/${n.species.confusions[0]}">Direkt vergleichen</button>` : ""}</div><p class="credit">${q(n.recording.creator)} · ${q(n.recording.license)} · <a href="${n.recording.sourceUrl}" target="_blank" rel="noreferrer">Quelle</a></p></div></article><button class="primary next-button" id="next-question">${Z.index + 1 >= Z.items.length || Z.mode === "survival" && Z.lives <= 0 ? "Ergebnis ansehen" : "Nächste Stimme →"}</button></div>`), document.querySelector("#feedback-play")?.addEventListener("click", () => void J.playOrToggle(n.recording)), document.querySelector("#next-question")?.addEventListener("click", () => {
		Z && (Z.index + 1 >= Z.items.length || Z.mode === "survival" && Z.lives <= 0 ? Wn() : (Z.index += 1, Fn()));
	});
}
function Un() {
	if (!Z) return;
	let e = Nn();
	Q(`<div class="learn-page"><header class="game-header"><button class="back" data-route="course/${Z.course.id}">× Beenden</button><div><span>${Z.index + 1}/${Z.items.length}</span><div class="game-progress"><i style="width:${Math.round(Z.index / Z.items.length * 100)}%"></i></div></div><strong>Kennenlernen</strong></header><article class="learn-card"><div class="learn-visual"><img src="${e.species.photo}" alt="${q(e.species.name)}"><span>${Ht(e.species)}</span></div><div><p class="eyebrow">${Xn(e.voiceType)}</p><h1>${e.species.name}</h1><p class="latin">${e.species.scientificName}</p><p>${e.species.fact}</p><div class="memory-note"><span>♪</span><p><strong>So klingt die Stimme</strong>${e.voiceType === "song" ? e.species.songTip : e.species.callTip}</p></div><div class="learn-controls"><button class="primary" id="learn-play" data-audio-id="${e.recording.id}" aria-pressed="false"><span data-play-icon>▶</span> Stimme hören</button><button class="ghost" id="learn-next">${Z.index + 1 >= Z.items.length ? "Phase abschließen" : "Nächste Art →"}</button></div></div></article></div>`), document.querySelector("#learn-play")?.addEventListener("click", () => void J.playOrToggle(e.recording)), document.querySelector("#learn-next")?.addEventListener("click", async () => {
		let t = Rt(Cn(e.species.id, e.voiceType));
		Qt.set(t.key, t), await gt(t), Z.index + 1 >= Z.items.length ? Wn() : (Z.index += 1, Un());
	});
}
async function Wn() {
	if (!Z) return;
	Jn(), J.stop();
	let e = Z, t = e.answers.filter((e) => e.correct).length, n = e.answers.length ? t / e.answers.length : 1, a = [...new Set(e.answers.filter((e) => e.correct && $(e.speciesId, e.voiceType).level >= 2).map((e) => h.get(e.speciesId)?.name).filter(Boolean))].slice(0, 4), o = [...new Set(e.answers.filter((e) => !e.correct && e.chosenId).map((e) => `${h.get(e.speciesId)?.name} ↔ ${h.get(e.chosenId)?.name}`))].slice(0, 3), s = [...Qt.values()].filter((e) => e.step > 0).sort((e, t) => e.dueAt - t.dueAt)[0], c = {
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
	if (await _t(c), $t.push(c), e.kind === "placement") {
		let e = Math.min(r.length - 1, Math.floor(n * r.length));
		Y.placementCourseId = r[e].id, Y.recommendedCourseId = r[e].id;
	}
	if (e.course && e.phase) {
		let t = Y.courseProgress[e.course.id];
		if (t.completedPhases.includes(e.phase) || t.completedPhases.push(e.phase), e.phase === "exam" && (t.examBest = Math.max(t.examBest, n)), t.completed = hn(e.course), t.completed) {
			let t = r[e.course.order];
			t && (Y.recommendedCourseId = t.id);
		}
	}
	e.kind === "daily" && Gn(), Kn(), await mt(Y), Z = null;
	let l = e.kind === "placement" ? "Dein Einstieg steht fest" : n >= .8 ? "Stark hingehört!" : n >= .5 ? "Guter Fortschritt" : "Weiter lauschen", u = e.kind === "placement" ? `course/${Y.recommendedCourseId}` : e.course ? `course/${e.course.id}` : "mode";
	Q(`<section class="result-page"><div class="result-bird">${Ht(m[(t + 7) % m.length])}</div><p class="eyebrow">${e.kind === "placement" ? "Einstufung abgeschlossen" : "Sitzung abgeschlossen"}</p><h1>${l}</h1><p>${e.kind === "placement" ? `Wir empfehlen dir den Einstieg bei „${i.get(Y.recommendedCourseId)?.title}“. Der Test verändert deinen Lernstand nicht.` : "Fehler sind als gezielte Wiederholungen vorgemerkt. Jede sichere Antwort verlängert das Erinnerungsintervall."}</p><div class="result-metrics"><div><strong>${t}/${e.answers.length}</strong><span>richtig</span></div><div><strong>${Math.round(n * 100)}%</strong><span>Trefferquote</span></div><div><strong>×${e.bestStreak}</strong><span>beste Serie</span></div><div><strong>${pn().length}</strong><span>fällig</span></div></div>${e.kind === "placement" ? "" : `<div class="result-insights"><article><span>Stabiler geworden</span><strong>${a.length ? a.join(", ") : "Noch im Aufbau"}</strong></article><article><span>Gezielt wiederholen</span><strong>${o.length ? o.join(" · ") : "Keine neue Verwechslung"}</strong></article><article><span>Nächste Wiederholung</span><strong>${s ? new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(s.dueAt) : "Nach der nächsten Lektion"}</strong></article></div>`}<div class="result-actions"><button class="primary" data-route="${u}">${e.kind === "placement" ? "Empfohlenen Kurs öffnen" : "Weiterlernen"}</button><button class="ghost" data-route="stats">Fortschritt ansehen</button><button class="ghost" data-route="">Zur Startseite</button></div></section>`);
}
function Gn() {
	let e = Gt();
	if (Y.lastDailyDate === e) return;
	let t = /* @__PURE__ */ new Date();
	t.setDate(t.getDate() - 1), Y.dailyStreak = Y.lastDailyDate === Gt(t) ? Y.dailyStreak + 1 : 1, Y.lastDailyDate = e;
}
function Kn() {
	let e = [
		["erster-ruf", Y.totalCorrect >= 1],
		["zehner-serie", Y.bestStreak >= 10],
		["hundert", Y.totalCorrect >= 100],
		["kurs", r.some(hn)],
		["feldbereit", m.filter((e) => $(e.id).level >= 4).length >= 5],
		["woche", Y.dailyStreak >= 7]
	];
	for (let [t, n] of e) n && !Y.achievements.includes(t) && (Y.achievements.push(t), fn("Neues Abzeichen erhalten"));
}
function qn() {
	Jn(), tn = window.setInterval(() => {
		if (!Z) return;
		--Z.timeLeft;
		let e = document.querySelector("#timer");
		e && (e.textContent = `${Z.timeLeft}s`), Z.timeLeft <= 0 && Wn();
	}, 1e3);
}
function Jn() {
	tn !== null && (clearInterval(tn), tn = null);
}
function Yn(e) {
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
function Xn(e) {
	return {
		song: "Gesang",
		call: "Ruf",
		alarm: "Warnruf",
		flight: "Flugruf",
		drumming: "Trommeln"
	}[e];
}
function Zn(e) {
	let t = $(e.id, "song"), n = $(e.id, "call"), r = en.recordings.filter((t) => t.speciesId === e.id).length;
	return `<article class="bird-card" data-bird-card="${e.id}"><button class="bird-card-open" data-route="species/${e.id}" aria-label="${q(e.name)} öffnen"><div class="bird-photo"><img src="${e.photo}" alt="${q(e.name)}"><span>${Ht(e)}</span></div><div class="bird-card-title"><div><h2>${e.name}</h2><p>${e.scientificName}</p></div><b>${r} ♫</b></div><p>${e.songTip}</p><div class="voice-levels"><span>Gesang <i class="level-fill l${t.level}"></i>${t.label}</span><span>Ruf <i class="level-fill l${n.level}"></i>${n.label}</span></div></button></article>`;
}
function Qn() {
	Z = null, Q(`<div class="book-page"><header class="page-head"><div><p class="eyebrow">Dein Feldführer</p><h1>Das Vogelbuch</h1><p>60 Arten, mehrere Lauttypen und echte Feldfotos.</p></div><span class="count-pill">${m.filter((e) => $(e.id).level >= 1).length}/60 gehört</span></header><div class="book-tools"><input type="search" id="bird-search" aria-label="Vogelart suchen" placeholder="Art oder wissenschaftlichen Namen suchen …"><div class="chips"><button data-book-filter="all" class="active">Alle</button><button data-book-filter="garden">Garten</button><button data-book-filter="forest">Wald</button><button data-book-filter="field">Feld</button><button data-book-filter="water">Gewässer</button><button data-book-filter="due">Fällig</button></div></div><div class="bird-grid" id="bird-grid">${m.map(Zn).join("")}</div></div>`);
	let e = "all", t = () => {
		let t = Bn(document.querySelector("#bird-search").value), n = new Set(pn().map((e) => e.speciesId)), r = m.filter((r) => (!t || Bn(`${r.name}${r.scientificName}`).includes(t)) && (e === "all" || e === "due" && n.has(r.id) || r.habitats.includes(e)));
		document.querySelector("#bird-grid").innerHTML = r.length ? r.map(Zn).join("") : "<p class=\"empty\">Keine Art passt zu dieser Auswahl.</p>";
	};
	document.querySelector("#bird-search")?.addEventListener("input", t), document.querySelectorAll("[data-book-filter]").forEach((n) => n.addEventListener("click", () => {
		e = n.dataset.bookFilter, document.querySelectorAll("[data-book-filter]").forEach((e) => e.classList.toggle("active", e === n)), t();
	}));
}
async function $n(e, t) {
	Z = null;
	let n = h.get(e);
	if (!n) {
		At("book");
		return;
	}
	let r = await x(e), i = [...new Set(r.map((e) => e.voiceType))], a = t && i.includes(t) ? t : i[0] ?? "song", o = r.filter((e) => e.voiceType === a), s = en.photos.find((t) => t.speciesId === e), c = n.confusions.map((e) => h.get(e)).filter((e) => !!e), l = $(e, a);
	Q(`<div class="page species-page"><button class="back" data-route="book">← Vogelbuch</button><section class="species-hero-v2"><div class="species-photo"><img src="${n.photo}" alt="${q(n.name)}"><div>${Ht(n)}</div></div><div><p class="eyebrow">${n.habitats.map(Yn).join(" · ")} · ${n.activeMonths.length === 12 ? "ganzjährig" : "April bis September"}</p><h1>${n.name}</h1><p class="latin">${n.scientificName}</p><p>${n.fact}</p>${Ut(l.label, l.level)}<div class="species-actions"><button class="primary" id="species-main-play" data-audio-id="${(o[0] ?? r[0])?.id}" aria-pressed="false"><span data-play-icon>▶</span> ${Xn(a)} hören</button></div></div></section><section class="voice-section"><div class="voice-tabs">${i.map((e) => `<button data-voice-tab="${e}" class="${e === a ? "active" : ""}">${Xn(e)}</button>`).join("")}</div><div class="voice-detail"><article><span>♪ Hörschlüssel</span><h2>${a === "song" ? n.songTip : n.callTip}</h2><p>${i.length} Lauttypen und ${r.length} lokale Aufnahmen sind verfügbar.</p></article><div class="recording-list">${o.map((e, t) => `<button data-recording="${e.id}" data-audio-id="${e.id}" aria-pressed="false"><span data-play-icon>▶</span><div><strong>Aufnahme ${t + 1}</strong><small>${Math.round(e.durationSeconds)} s · ${q(e.creator)}</small></div></button>`).join("")}</div></div></section>${c.length ? `<section class="similar-section"><div class="section-head"><div><p class="eyebrow">Verwechslungsgefahr</p><h2>Direkt vergleichen</h2></div></div><div class="similar-grid">${c.map((e) => `<button data-route="compare/${n.id}/${e.id}"><img src="${e.photo}" alt=""><span>${n.name} ↔ ${e.name}</span></button>`).join("")}</div></section>` : ""}<footer class="photo-credit">Foto: ${q(s?.creator ?? "Wikimedia Commons")} · ${q(s?.license ?? "Lizenz siehe Quelle")} ${s ? `· <a href="${s.sourceUrl}" target="_blank" rel="noreferrer">Quelle</a>` : ""}</footer></div>`);
	let u = (e) => J.playOrToggle(e);
	document.querySelector("#species-main-play")?.addEventListener("click", () => void u(o[0] ?? r[0])), document.querySelectorAll("[data-recording]").forEach((e) => e.addEventListener("click", () => {
		let t = r.find((t) => t.id === e.dataset.recording);
		t && u(t);
	})), document.querySelectorAll("[data-voice-tab]").forEach((t) => t.addEventListener("click", () => void $n(e, t.dataset.voiceTab)));
}
async function er(e, t) {
	Z = null;
	let n = h.get(e ?? "zilpzalp") ?? m[0], r = h.get(t ?? n.confusions[0] ?? "fitis") ?? m[1], i = await S(n.id, "mixed", 0), a = await S(r.id, "mixed", .4), o = (e) => m.map((t) => `<option value="${t.id}" ${t.id === e ? "selected" : ""}>${t.name}</option>`).join("");
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
	document.querySelectorAll("[data-compare-play]").forEach((e) => e.addEventListener("click", () => void J.playOrToggle(s.get(e.dataset.comparePlay)))), document.querySelector("#compare-a")?.addEventListener("change", (e) => void er(e.target.value, r.id)), document.querySelector("#compare-b")?.addEventListener("change", (e) => void er(n.id, e.target.value)), document.querySelector("#compare-train")?.addEventListener("click", async () => {
		Mn({
			kind: "review",
			items: await En([n, r], 8, "mixed", "duel"),
			typed: !1
		});
	});
}
function tr() {
	Z = null;
	let e = [
		0,
		1,
		2,
		3,
		4
	].map((e) => m.filter((t) => $(t.id).level === e).length), t = Object.entries(Y.confusions).sort((e, t) => t[1] - e[1]).slice(0, 6), n = [...$t].sort((e, t) => t.finishedAt - e.finishedAt).slice(0, 7), r = [
		"Unbekannt",
		"Gehört",
		"Erkannt",
		"Sicher",
		"Feldbereit"
	];
	Q(`<div class="page stats-page"><header class="page-head"><div><p class="eyebrow">Dein Lernstand</p><h1>Fortschritt</h1><p>Was sicher sitzt, was fällig ist und welche Stimmen du verwechselst.</p></div><button class="primary" data-route="mode/adaptive">${pn().length} fällige Stimmen</button></header><div class="stats-metrics"><article><strong>${mn()}%</strong><span>Trefferquote</span></article><article><strong>${Y.totalCorrect}</strong><span>richtige Antworten</span></article><article><strong>${Y.bestStreak}</strong><span>beste Serie</span></article><article><strong>${Y.dailyStreak}</strong><span>Tagesserie</span></article></div><div class="stats-grid"><section><h2>Arten-Meisterschaft</h2><div class="mastery-bars">${e.map((e, t) => `<div><span>${r[t]}</span><i><b style="width:${e / m.length * 100}%"></b></i><strong>${e}</strong></div>`).join("")}</div></section><section><h2>Häufig verwechselt</h2>${t.length ? `<div class="confusion-list">${t.map(([e, t]) => {
		let [n, r] = e.split(">");
		return `<button data-route="compare/${n}/${r}"><span>${h.get(n)?.name} ↔ ${h.get(r)?.name}</span><strong>${t}×</strong></button>`;
	}).join("")}</div>` : "<p class=\"empty\">Noch keine Verwechslungen gespeichert.</p>"}</section></div><section class="session-history"><div class="section-head"><div><p class="eyebrow">Letzte Sitzungen</p><h2>Dein Hörverlauf</h2></div></div>${n.length ? `<div class="history-list">${n.map((e) => {
		let t = e.answers.filter((e) => e.correct).length;
		return `<article><span>${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(e.finishedAt)}</span><strong>${nr(e)}</strong><b>${t}/${e.answers.length}</b></article>`;
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
function nr(e) {
	return e.courseId ? i.get(e.courseId)?.title ?? "Kurs" : e.kind === "placement" ? "Einstufung" : e.kind === "daily" ? "Tagesaufgabe" : e.mode ? Jt[e.mode].label : e.kind === "expedition" ? "Expedition" : "Lerntrainer";
}
function rr() {
	Z = null;
	let e = X.total ? Math.round(X.cached.length / X.total * 100) : 0;
	Q(`<div class="page settings-page"><header class="page-head"><div><p class="eyebrow">Dein Erlebnis</p><h1>Einstellungen</h1><p>Lernregion, Darstellung, Offline-Inhalte und lokale Sicherungen.</p></div></header><form id="settings-form" class="settings-grid"><label><span>Lernregion<small>Filtert regionalere Arten im freien Training.</small></span><select name="region"><option value="all">Deutschland gesamt</option><option value="north">Norddeutschland</option><option value="central">Mitteldeutschland</option><option value="south">Süddeutschland</option></select></label><label><span>Aktuelle Jahreszeit<small>Nur derzeit typische Stimmen auswählen.</small></span><input type="checkbox" name="seasonal"></label><label><span>Räumliches Hören<small>Stimmen leicht links oder rechts platzieren.</small></span><input type="checkbox" name="spatialAudio"></label><label><span>Entspannter Lernmodus<small>Kein Punktabzug durch Hinweise.</small></span><input type="checkbox" name="relaxed"></label><label><span>Hoher Kontrast<small>Flächen und Konturen verstärken.</small></span><input type="checkbox" name="contrast"></label><label><span>Große Schrift<small>Lesetexte und Bedienelemente vergrößern.</small></span><input type="checkbox" name="largeText"></label><label><span>Bewegung reduzieren<small>Animationen und weiche Übergänge abschalten.</small></span><input type="checkbox" name="reducedMotion"></label><label><span>Wetteratmosphäre<small>Nur visuell, ohne Einfluss auf Aufgaben.</small></span><select name="weather"><option value="still">Still</option><option value="breeze">Blätterwind</option><option value="rain">Sommerregen</option></select></label></form><section class="offline-settings"><div><p class="eyebrow">Offline-Medien</p><h2>${X.ready ? "Vollständig installiert" : `${e}% installiert`}</h2><p>${en.recordings.length} Stimmen und ${en.photos.length} Fotos · ${Wt(X.totalBytes)}</p><div class="download-progress"><i id="download-bar" style="width:${e}%"></i></div><small id="download-status">${X.cached.length}/${X.total} Dateien · noch ${Wt(Math.max(0, X.totalBytes - (X.downloadedBytes ?? 0)))}${X.failed.length ? ` · ${X.failed.length} fehlgeschlagen` : ""}</small></div>${X.ready ? "<span class=\"offline-check\">✓</span>" : "<div class=\"setup-actions\"><button class=\"primary\" id=\"install-media\">Fortsetzen</button><button class=\"ghost hidden\" id=\"pause-media\">Pausieren</button></div>"}</section><section class="backup-section"><div><p class="eyebrow">Privat und lokal</p><h2>Sicherung</h2><p>Exportiere deinen Lernstand oder ersetze ihn durch eine vorhandene Sicherung.</p></div><div><button class="ghost" id="export-backup">Sicherung exportieren</button><label class="ghost file-button">Sicherung importieren<input id="import-backup" type="file" accept=".zwitscher,application/gzip"></label></div></section><details class="credits"><summary>Medienquellen und Lizenzen</summary><p>Alle Aufnahmen und Fotos wurden lokal für die Offline-Nutzung optimiert. Urheber und Lizenz jeder Datei bleiben im Medienverzeichnis erhalten.</p><div>${en.photos.map((e) => `<a href="${e.sourceUrl}" target="_blank" rel="noreferrer">${h.get(e.speciesId)?.name}: ${q(e.creator)} · ${q(e.license)}</a>`).join("")}</div></details></div>`);
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
		}, await mt(Y), un(), fn("Einstellungen gespeichert");
	}), yn(), document.querySelector("#export-backup")?.addEventListener("click", async () => {
		let e = await xt(), t = URL.createObjectURL(e), n = document.createElement("a");
		n.href = t, n.download = `zwitscher-${Gt()}.zwitscher`, n.click(), URL.revokeObjectURL(t), fn("Sicherung erstellt");
	}), document.querySelector("#import-backup")?.addEventListener("change", async (e) => {
		let t = e.target.files?.[0];
		if (t && confirm("Die Sicherung ersetzt den aktuellen Version-2-Stand vollständig. Fortfahren?")) try {
			await St(t), location.reload();
		} catch (e) {
			fn(e instanceof Error ? e.message : "Import fehlgeschlagen");
		}
	});
}
//#endregion
//#region src/main.ts
rn();
//#endregion
