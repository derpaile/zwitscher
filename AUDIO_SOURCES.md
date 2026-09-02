# Audit freier Vogelstimmenquellen

Stand: 4. August 2026. Für diese App reicht „kostenlos“ nicht: Die Aufnahme muss kommerziell verbreitet und wegen Zuschnitt, Hochpass, Normalisierung und Neukodierung bearbeitet werden dürfen. Automatisch zugelassen sind daher nur CC0/Public Domain, CC BY und CC BY-SA. Jede Datei behält Urheber, Lizenzlink, Quellseite und Bearbeitungshinweis.

## Geeignete Quellen

| Quelle | Tags und Zugriff | Nutzungsregel | Einsatz |
|---|---|---|---|
| [Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Audio) | wissenschaftliche Namen, Kategorien, offene MediaWiki-API | Commons verlangt kommerzielle Nutzung und Bearbeitbarkeit; Einzellizenz bleibt maßgeblich | Hauptquelle |
| [Openverse Audio API](https://api.openverse.org/) | Volltext, Titel, Tags, Quelle und Lizenzfilter; anonym nutzbar | Abfrage nur mit `by,by-sa,cc0,pdm`; Ursprungsseite wird zusätzlich gespeichert | Fallback über Wikimedia und Freesound |
| [GBIF Occurrence API](https://techdocs.gbif.org/en/openapi/v1/occurrence) | taxonomisch normalisierte Art, `mediaType=Sound`, Fund- und Medienmetadaten | Die Medienlizenz wird einzeln geprüft; eine offene Datensatzlizenz allein genügt nicht | Besonders ergiebiger Fallback für iNaturalist-Aufnahmen |
| [NPS Sound Gallery](https://www.nps.gov/subjects/sound/gallery.htm) | Artenliste und NPS-Multimedia-API | Nur ausdrücklich NPS-eigene Dateien ohne Copyrightzeichen sind Public Domain | Rechtssicher, aber überwiegend nordamerikanische Arten |
| [Smithsonian Open Access](https://www.si.edu/openaccess/faq) | Sammlungsmetadaten und API | Nur ausdrücklich mit CC0 markierte Assets | Wenige passende Tonaufnahmen |
| [Europeana](https://pro.europeana.eu/page/apis) | `TYPE:SOUND`, Volltext, Qualitäts- und Rechtefilter | Nur `reusability=open` und danach Einzellizenz CC0/PDM/BY/BY-SA | Zusätzliche historische Bestände, geringe Artabdeckung |

## Nur bedingt verwendbar

- **iNaturalist direkt:** Artgetaggt und sehr umfangreich, aber Standardlizenz für Töne ist CC BY-NC. Verwendbar sind nur individuell auf CC0, CC BY oder CC BY-SA umgestellte Töne. GBIF liefert diese Medienlizenz maschinenlesbar.
- **Xeno-canto:** Fachlich sehr gut getaggt, jedoch gemischte Einzellizenzen und seit 2025 API-Schlüsselpflicht. Nur CC0/BY/BY-SA verwenden; viele geeignete Aufnahmen liegen bereits lizenzgeprüft auf Commons.
- **Freesound direkt:** Einzelne Töne unter CC0 oder CC BY sind geeignet. Die kostenlose API darf jedoch nur nichtkommerziell genutzt werden; deshalb erfolgt die Suche über Openverse und niemals per Freesound-API.
- **Tierstimmenarchiv Berlin:** Hervorragende Taxonomie und Qualität, aber keine pauschale kommerzielle Lizenz ausgewiesen. Erst nach schriftlicher Freigabe verwenden.

## Ausgeschlossen

| Quelle | Grund |
|---|---|
| Cornell/Macaulay Library und eBird | Downloads grundsätzlich persönlich/nichtkommerziell; kommerzielle Nutzung nur nach Einzelgenehmigung |
| BBC Sound Effects | kostenlos nur persönlich, schulisch oder nichtkommerziell; kommerzielle Lizenz kostenpflichtig |
| Acoustic Atlas / Western Soundscape Archive | überwiegend CC BY-NC-ND |
| Aves Vox | keine eigene Tonlizenz; lediglich Oberfläche für Xeno-canto |

## Aktueller Bestand

240 von 240 Aufnahmen sind kommerziell nutzbar und bearbeitbar: 216 × CC BY-SA 4.0, 16 × CC BY-SA 3.x, 6 × Public Domain, 1 × CC0 und 1 × CC BY 3.0. Es musste keine bestehende Datei gelöscht werden. `npm run audit:licenses` löscht künftig automatisch Aufnahmen mit expliziter NC-, ND-, Sampling- oder „all rights reserved“-Lizenz. Unklare Lizenzen werden aus Sicherheitsgründen nicht gelöscht, blockieren aber die Medienvalidierung.

Am 4. August 2026 wurde für jede der 60 Arten eine weitere, zuvor unbenutzte Wikimedia-Commons-Quelle ergänzt. `npm run add:audio:wikimedia` wiederholt die lizenzgeprüfte Suche und ergänzt fehlende Aufnahmen bis zum Zielbestand von vier je Art. Treffer sollten weiterhin angehört werden, da auch korrekt taxonomisierte Feldaufnahmen Nebenarten und Störgeräusche enthalten können.
