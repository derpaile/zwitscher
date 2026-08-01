# Zwitscher 2

Eine geführte, vollständig offline nutzbare Lern-App für 60 heimische Vogelarten. Alle persönlichen Daten bleiben lokal im Browser.

## Entwicklung

```bash
npm install
npm run dev
```

Tests und Produktionsprüfung:

```bash
npm test
npm run test:e2e
npm run build
```

`npm run build` prüft zugleich Artenzahl, Medien, Lizenzfelder und die harte Paketgrenze von 150 MB.

Neue Aufnahmen werden beim Import normalisiert, mit einem einpoligen Hochpass bei 180 Hz gegen Wind-Rumpeln gefiltert und mit 20/30 ms Fade-in/out gegen Klicks versehen. Einen ungefilterten Altbestand bearbeitet einmalig:

```bash
npm run filter:audio
```

Primärquelle ist [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Audio_files_of_birds). Als artgetaggte Ergänzungen durchsucht die Importlogik [Openverse](https://openverse.org/) und [GBIF](https://www.gbif.org/); zugelassen werden ausschließlich CC0, Public Domain, CC BY und CC BY-SA. NC-, ND- und unklare Lizenzen werden verworfen. Rechercheergebnis und ausgeschlossene Archive stehen in [AUDIO_SOURCES.md](AUDIO_SOURCES.md).

```bash
npm run audit:licenses
npm run audit:licenses:online
npm run discover:audio -- amsel
```

## macOS-App

```bash
npm run mac:dev
npm run mac:build
```

Der Build erzeugt `Zwitscher.app` und einen DMG-Installer unter `src-tauri/target/release/bundle/`. Die lokale Fassung wird ad-hoc signiert. Für eine öffentliche Weitergabe ohne Gatekeeper-Warnung sind ein Apple-Entwicklerkonto und eine Notarisierung erforderlich.

## Inhalt

- acht Kurse mit Kennenlernen, A/B-Unterscheidung, Vierer-Auswahl, freier Bestimmung und Prüfung
- Wiederholungen getrennt nach Art und Lauttyp mit Intervallen bis 120 Tage
- 60 Arten, je drei lokale Stimmen, 52 Feldfotos, acht lokale Illustrations-Fallbacks und maschinenlesbare Lizenzdaten
- Einstufungstest, sechs freie Modi, Tagesaufgabe und Lebensraum-Expeditionen
- Vogelbuch, Artenporträts, A/B-Vergleich, Tempo, Ausschnittschleife und Frequenzbild
- Statistiken, Verwechslungslektionen, Feldtagebuch und lokale Sicherungsdateien
- pausierbare und fortsetzbare Komplettinstallation der Medien
- PWA, hoher Kontrast, große Schrift, reduzierte Bewegung und Tastaturbedienung

Die optimierten Medien basieren auf frei lizenzierten Dateien von Wikimedia Commons. Vollständige Quellen- und Lizenzangaben stehen in `public/media/manifest.json` und in der App.
