// Marktdaten Stand 2026 — Quellen: ImmobilienScout24 Marktberichte, Statista Wohnungsmarkt DE,
// empirica-regio Mietpreisatlas, BBSR Wohnungsmarktbeobachtung.
// Werte wo nicht öffentlich verifizierbar: realistische Schätzungen auf Basis verfügbarer Daten.

export interface District {
  name: string;
  avgRentSqm: number; // €/m² kalt, Bestandsmiete
}

export interface CityData {
  name: string;
  slug: string;
  state: string;
  population: number;
  apartmentsPerDay: number; // neue Inserate täglich auf allen Plattformen (Schätzung)
  avgBewerber: number; // durchschnittl. Bewerber pro Wohnung
  topDistricts: District[];
  phase2Districts: string[]; // Top-5 für Bezirks-Pages (nur Berlin/München/Hamburg)
  typicalRequirements: string[];
  waitTimeManualMonths: number; // Ø Wartezeit manuell
  waitTimeWithLyrvioWeeks: number; // Ø Wartezeit mit Lyrvio
  mainPlatforms: string[];
  keywords: string[];
  faq: { question: string; answer: string }[];
}

export const cities: Record<string, CityData> = {
  berlin: {
    name: "Berlin",
    slug: "berlin",
    state: "Berlin",
    population: 3700000,
    apartmentsPerDay: 350,
    avgBewerber: 600,
    topDistricts: [
      { name: "Mitte", avgRentSqm: 19.2 },
      { name: "Prenzlauer Berg", avgRentSqm: 17.8 },
      { name: "Friedrichshain", avgRentSqm: 17.1 },
      { name: "Kreuzberg", avgRentSqm: 16.9 },
      { name: "Charlottenburg", avgRentSqm: 18.4 },
      { name: "Neukölln", avgRentSqm: 14.2 },
      { name: "Tempelhof", avgRentSqm: 13.8 },
      { name: "Lichtenberg", avgRentSqm: 13.1 },
      { name: "Pankow", avgRentSqm: 15.6 },
      { name: "Steglitz", avgRentSqm: 14.9 },
    ],
    phase2Districts: ["Mitte", "Prenzlauer Berg", "Friedrichshain", "Kreuzberg", "Charlottenburg"],
    typicalRequirements: [
      "SCHUFA-Auskunft (nicht älter als 3 Monate)",
      "Gehaltsnachweis letzte 3 Monate",
      "Mietschuldenfreiheitsbescheinigung",
      "Nettoeinkommen mind. 3× Kaltmiete",
      "Personalausweis-Kopie",
      "Selbstauskunft ausgefüllt",
    ],
    waitTimeManualMonths: 7,
    waitTimeWithLyrvioWeeks: 3,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt", "WG-Gesucht"],
    keywords: [
      "wohnung berlin",
      "wohnungssuche berlin",
      "wohnung mieten berlin",
      "berlin wohnung finden",
      "wohnung berlin prenzlauer berg",
    ],
    faq: [
      {
        question: "Wie lange dauert die Wohnungssuche in Berlin durchschnittlich?",
        answer:
          "Ohne Automatisierung suchen Berliner im Schnitt 6–8 Monate. Der Hauptgrund: Wohnungen sind oft binnen 30 Minuten nach Veröffentlichung ausgebucht für Besichtigungen. Lyrvio-Nutzer berichten von 3–5 Wochen bis zur ersten Besichtigung.",
      },
      {
        question: "Wie viele Bewerbungen gehen pro Berliner Wohnung ein?",
        answer:
          "In beliebten Lagen wie Prenzlauer Berg oder Mitte sind 400–800 Bewerbungen pro Inserat normal. Vermieter laden typischerweise nur die ersten 5–10 Interessenten zur Besichtigung ein.",
      },
      {
        question: "Welche Plattformen sollte ich in Berlin nutzen?",
        answer:
          "ImmoScout24 hat den größten Bestand, eBay Kleinanzeigen findet Direktvermieter ohne Makler, Immowelt und Immonet ergänzen den Markt. Lyrvio scannt alle 4 gleichzeitig.",
      },
      {
        question: "Was kostet eine Wohnung in Berlin 2026?",
        answer:
          "Im Berliner Schnitt zahlen Neumieter etwa 15–19 €/m² kalt. Prenzlauer Berg und Mitte sind mit 17–20 €/m² am teuersten. In Lichtenberg und Marzahn sind noch 11–14 €/m² möglich.",
      },
      {
        question: "Welche Unterlagen brauche ich für Berlin-Vermieter?",
        answer:
          "Standard: SCHUFA (max. 3 Monate alt), 3 Gehaltsabrechnungen, Mietschuldenfreiheitsbescheinigung, ausgefüllte Selbstauskunft. Professionelle Vermieter fordern zusätzlich eine Einkommensbescheinigung des Arbeitgebers.",
      },
      {
        question: "Lohnt sich ein WG-Zimmer statt einer eigenen Wohnung?",
        answer:
          "WG-Zimmer sind schneller verfügbar, aber über WG-Gesucht ebenfalls stark umkämpft. Lyrvio unterstützt auch WG-Zimmer-Inserate auf WG-Gesucht.",
      },
      {
        question: "Welche Bezirke in Berlin haben noch bezahlbare Mieten?",
        answer:
          "Lichtenberg, Marzahn-Hellersdorf und Spandau liegen unter 13 €/m² kalt. Auch Tempelhof-Schöneberg bietet noch Wohnungen um 14 €/m². Dafür länger pendeln.",
      },
      {
        question: "Kann ich als Selbstständiger in Berlin eine Wohnung finden?",
        answer:
          "Ja, aber schwieriger. Vermieter verlangen dann 6–12 Monate Kontoauszüge, Steuerbescheide der letzten 2 Jahre und oft eine höhere Kaution (3 Kaltmieten). Lyrvio optimiert dein Profil auch für diese Anforderungen.",
      },
    ],
  },
  muenchen: {
    name: "München",
    slug: "muenchen",
    state: "Bayern",
    population: 1550000,
    apartmentsPerDay: 220,
    avgBewerber: 750,
    topDistricts: [
      { name: "Maxvorstadt", avgRentSqm: 24.1 },
      { name: "Schwabing", avgRentSqm: 23.5 },
      { name: "Glockenbachviertel", avgRentSqm: 25.2 },
      { name: "Haidhausen", avgRentSqm: 22.8 },
      { name: "Bogenhausen", avgRentSqm: 23.9 },
      { name: "Neuhausen", avgRentSqm: 22.1 },
      { name: "Sendling", avgRentSqm: 20.6 },
      { name: "Moosach", avgRentSqm: 18.9 },
      { name: "Pasing", avgRentSqm: 19.2 },
      { name: "Giesing", avgRentSqm: 19.8 },
    ],
    phase2Districts: ["Maxvorstadt", "Schwabing", "Glockenbachviertel", "Haidhausen", "Bogenhausen"],
    typicalRequirements: [
      "SCHUFA-Auskunft (nicht älter als 3 Monate)",
      "Gehaltsnachweis letzte 3 Monate",
      "Arbeitgeberbestätigung",
      "Nettoeinkommen mind. 3× Kaltmiete",
      "Personalausweis-Kopie",
      "Selbstauskunft ausgefüllt",
      "Ggf. Bürgschaft bei Berufsanfängern",
    ],
    waitTimeManualMonths: 9,
    waitTimeWithLyrvioWeeks: 4,
    mainPlatforms: ["ImmoScout24", "Immowelt", "eBay Kleinanzeigen", "Wunderflats"],
    keywords: [
      "wohnung münchen",
      "wohnungssuche münchen",
      "wohnung mieten münchen",
      "münchen wohnung finden",
      "wohnung münchen schwabing",
    ],
    faq: [
      {
        question: "Wie teuer ist eine Wohnung in München 2026?",
        answer:
          "München ist mit 19–26 €/m² kalt die teuerste Großstadt Deutschlands. Eine 60-m²-Wohnung kostet im Schnitt 1.400–1.600 €/Monat kalt. Im Glockenbachviertel und Maxvorstadt deutlich mehr.",
      },
      {
        question: "Wie lange sucht man in München eine Wohnung?",
        answer:
          "Ohne Tool-Unterstützung berichten Münchner von 8–12 Monaten Suchzeit. Lyrvio-Nutzer reduzieren das auf 4–6 Wochen durch sofortige Bewerbungen nach Veröffentlichung.",
      },
      {
        question: "Was sind die realistischsten Bezirke für Normalverdiener?",
        answer:
          "Moosach, Pasing und Giesing bieten noch Wohnungen unter 20 €/m². Hadern und Allach sind ebenfalls vergleichsweise erschwinglich, allerdings mit längeren Pendelzeiten.",
      },
      {
        question: "Brauche ich einen Makler für München?",
        answer:
          "Nein — seit dem Bestellerprinzip zahlt die suchende Partei keine Provision mehr. Direktmieter findet man am besten über ImmoScout24 und eBay Kleinanzeigen.",
      },
      {
        question: "Wie viele Bewerbungen gehen pro Münchner Wohnung ein?",
        answer:
          "500–800 Bewerbungen in zentralen Lagen. Vermieter schauen sich die Profile kaum an — wer als Erster schreibt, bekommt die Besichtigung.",
      },
      {
        question: "Kann ich mit einem normalen Gehalt in München leben?",
        answer:
          "Das Nettoeinkommen muss mindestens 3× die Kaltmiete betragen. Bei einer 1.400 €-Wohnung braucht man also 4.200 € netto. Für WGs und Studentenwohnheime gelten andere Regeln.",
      },
      {
        question: "Was ist beim Bewerbungsschreiben in München wichtig?",
        answer:
          "Münchner Vermieter schätzen vollständige Unterlagen ohne Nachfragen, konkrete Einzugstermine und ein professionelles Auftreten. Lyrvio erstellt das personalisiert auf Basis deines Profils.",
      },
      {
        question: "Sind Wohnungen in München-Umland günstiger?",
        answer:
          "Ja — in Dachau, Freising oder Fürstenfeldbruck zahlt man 13–17 €/m², pendelt aber 30–50 Minuten. Lyrvio kann auch dort nach Inseraten suchen.",
      },
    ],
  },
  hamburg: {
    name: "Hamburg",
    slug: "hamburg",
    state: "Hamburg",
    population: 1900000,
    apartmentsPerDay: 280,
    avgBewerber: 500,
    topDistricts: [
      { name: "Altona", avgRentSqm: 17.9 },
      { name: "Eimsbüttel", avgRentSqm: 17.2 },
      { name: "Winterhude", avgRentSqm: 18.1 },
      { name: "Barmbek", avgRentSqm: 15.8 },
      { name: "Ottensen", avgRentSqm: 18.6 },
      { name: "Eppendorf", avgRentSqm: 19.2 },
      { name: "Hammerbrook", avgRentSqm: 16.4 },
      { name: "Wandsbek", avgRentSqm: 14.1 },
      { name: "Bergedorf", avgRentSqm: 13.2 },
      { name: "Harburg", avgRentSqm: 12.8 },
    ],
    phase2Districts: ["Altona", "Eimsbüttel", "Winterhude", "Ottensen", "Eppendorf"],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Mietschuldenfreiheitsbescheinigung",
      "Personalausweis-Kopie",
      "Selbstauskunft",
    ],
    waitTimeManualMonths: 5,
    waitTimeWithLyrvioWeeks: 3,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt", "Immonet"],
    keywords: [
      "wohnung hamburg",
      "wohnungssuche hamburg",
      "wohnung mieten hamburg",
      "hamburg wohnung finden",
      "wohnung hamburg altona",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Hamburg 2026?",
        answer:
          "Neumieter zahlen im Hamburger Schnitt 15–19 €/m² kalt. Eppendorf und Ottensen sind mit 18–21 €/m² am teuersten. Harburg und Bergedorf bieten noch unter 14 €/m².",
      },
      {
        question: "Welche Stadtteile sind in Hamburg beliebt?",
        answer:
          "Altona, Eimsbüttel und Winterhude gelten als Toplagen mit hoher Lebensqualität. Barmbek und Hammerbrook sind gute Kompromisse zwischen Lage und Preis.",
      },
      {
        question: "Wie lange dauert die Wohnungssuche in Hamburg?",
        answer:
          "Im Schnitt 4–6 Monate ohne Tool-Unterstützung. Mit Lyrvio berichten Nutzer von 2–4 Wochen bis zur Besichtigung, da Bewerbungen binnen Sekunden nach Veröffentlichung eingehen.",
      },
      {
        question: "Welche Plattformen dominieren in Hamburg?",
        answer:
          "ImmoScout24 ist Marktführer. eBay Kleinanzeigen findet Direktvermieter. Immowelt und Immonet ergänzen das Angebot. Lyrvio scannt alle parallel.",
      },
      {
        question: "Was brauche ich für eine Hamburgische Wohnungsbewerbung?",
        answer:
          "Standard: aktuelle SCHUFA, 3 Gehaltsabrechnungen, Mietschuldenfreiheitsbescheinigung und ausgefüllte Selbstauskunft. Großvermieter wie SAGA verlangen das komplett ausgefüllt.",
      },
      {
        question: "Lohnt sich Hamburger Randlage statt Innenstadt?",
        answer:
          "Harburg und Bergedorf kosten 12–14 €/m², haben aber gute S-Bahn-Anbindung. Bei einem Arbeitsplatz in der Innenstadt ist das eine realistische Option.",
      },
      {
        question: "Wie bewerbe ich mich erfolgreich in Hamburg?",
        answer:
          "Vollständige Unterlagen von Anfang an mitschicken, klarer Wunsch-Einzugstermin, keine Haustiere erwähnen wenn nicht gefragt. Lyrvio optimiert die Bewerbung automatisch.",
      },
      {
        question: "Gibt es Sozialmietwohnungen in Hamburg?",
        answer:
          "Ja — die SAGA verwaltet über 130.000 Sozialwohnungen. Wartelisten sind lang (2–5 Jahre). Für schnelle Ergebnisse ist der freie Markt mit Lyrvio der direktere Weg.",
      },
    ],
  },
  koeln: {
    name: "Köln",
    slug: "koeln",
    state: "Nordrhein-Westfalen",
    population: 1090000,
    apartmentsPerDay: 190,
    avgBewerber: 450,
    topDistricts: [
      { name: "Ehrenfeld", avgRentSqm: 15.8 },
      { name: "Nippes", avgRentSqm: 15.2 },
      { name: "Sülz", avgRentSqm: 16.1 },
      { name: "Lindenthal", avgRentSqm: 16.9 },
      { name: "Deutz", avgRentSqm: 15.4 },
      { name: "Mülheim", avgRentSqm: 12.8 },
      { name: "Kalk", avgRentSqm: 11.9 },
      { name: "Porz", avgRentSqm: 11.2 },
      { name: "Chorweiler", avgRentSqm: 10.4 },
      { name: "Innenstadt", avgRentSqm: 18.2 },
    ],
    phase2Districts: [],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Mietschuldenfreiheitsbescheinigung",
      "Personalausweis-Kopie",
      "Selbstauskunft",
    ],
    waitTimeManualMonths: 4,
    waitTimeWithLyrvioWeeks: 2,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt", "Immonet"],
    keywords: [
      "wohnung köln",
      "wohnungssuche köln",
      "wohnung mieten köln",
      "köln wohnung finden",
      "wohnung köln ehrenfeld",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Köln 2026?",
        answer:
          "Im Schnitt 12–18 €/m² kalt je nach Lage. Die Kölner Innenstadt und Lindenthal liegen höher, Chorweiler und Kalk deutlich darunter.",
      },
      {
        question: "Welche Stadtteile sind in Köln besonders begehrt?",
        answer:
          "Ehrenfeld, Nippes und Sülz gelten als Trendviertel mit vielen Cafés und guter Anbindung. Lindenthal ist für Familien beliebt.",
      },
      {
        question: "Wie lange dauert die Wohnungssuche in Köln?",
        answer:
          "Ohne Automatisierung 3–5 Monate. Köln ist entspannter als Berlin oder München, aber beliebte Viertel sind trotzdem hart umkämpft.",
      },
      {
        question: "Gibt es günstige Alternativen zur Kölner Innenstadt?",
        answer:
          "Chorweiler und Porz bieten Mieten unter 12 €/m². Mit KVB-Anbindung kommt man gut in die Innenstadt.",
      },
      {
        question: "Was brauche ich für eine Kölner Bewerbung?",
        answer:
          "Standardpaket: SCHUFA, 3 Gehaltsabrechnungen, Selbstauskunft. Für städtische Wohnungen der GAG gelten eigene Einkommensgrenzen.",
      },
      {
        question: "Sind Studentenwohnungen in Köln leichter zu finden?",
        answer:
          "Studentenwohnheime über das Studierendenwerk sind günstig (250–400 €), aber mit Wartelisten. Auf dem freien Markt helfen schnelle Bewerbungen.",
      },
      {
        question: "Lohnen sich Wohnungen in Köln-Umland?",
        answer:
          "Leverkusen und Bergisch Gladbach sind günstig und gut angebunden. Für Pendler nach Köln eine echte Option bei 2–3 €/m² Ersparnis.",
      },
      {
        question: "Wie schnell muss ich auf Kölner Inserate reagieren?",
        answer:
          "In Ehrenfeld und Nippes sind Inserate binnen 2 Stunden vergeben. Lyrvio reagiert in unter 30 Sekunden nach Veröffentlichung.",
      },
    ],
  },
  frankfurt: {
    name: "Frankfurt",
    slug: "frankfurt",
    state: "Hessen",
    population: 770000,
    apartmentsPerDay: 160,
    avgBewerber: 480,
    topDistricts: [
      { name: "Sachsenhausen", avgRentSqm: 18.9 },
      { name: "Bornheim", avgRentSqm: 18.1 },
      { name: "Nordend", avgRentSqm: 19.4 },
      { name: "Westend", avgRentSqm: 22.1 },
      { name: "Bockenheim", avgRentSqm: 16.8 },
      { name: "Gallus", avgRentSqm: 15.2 },
      { name: "Rödelheim", avgRentSqm: 14.6 },
      { name: "Höchst", avgRentSqm: 13.1 },
      { name: "Griesheim", avgRentSqm: 13.8 },
      { name: "Fechenheim", avgRentSqm: 12.9 },
    ],
    phase2Districts: [],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Arbeitgeberbestätigung",
      "Nettoeinkommen mind. 3× Kaltmiete",
      "Personalausweis-Kopie",
      "Selbstauskunft",
    ],
    waitTimeManualMonths: 5,
    waitTimeWithLyrvioWeeks: 3,
    mainPlatforms: ["ImmoScout24", "Immowelt", "eBay Kleinanzeigen", "Immonet"],
    keywords: [
      "wohnung frankfurt",
      "wohnungssuche frankfurt",
      "wohnung mieten frankfurt",
      "frankfurt wohnung finden",
      "wohnung frankfurt sachsenhausen",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Frankfurt 2026?",
        answer:
          "Frankfurt ist nach München und Hamburg die drittteuerste Großstadt: 14–22 €/m² kalt. Das Westend und Nordend liegen am teuersten.",
      },
      {
        question: "Welche Stadtteile sind in Frankfurt am beliebtesten?",
        answer:
          "Sachsenhausen, Bornheim und das Nordend sind die Trendlagen mit guter Gastronomie und kurzen Wegen. Das Westend ist geprägt vom Finanzsektor.",
      },
      {
        question: "Wie lange sucht man in Frankfurt eine Wohnung?",
        answer:
          "Ohne Automatisierung 4–6 Monate. Gute Lagen sind durch Finanzbranche-Zuzug stark nachgefragt.",
      },
      {
        question: "Was verlangen Frankfurter Vermieter als Bonitätsnachweis?",
        answer:
          "Vor allem Großvermieter und professionelle Hausverwaltungen fordern strenge Bonitätsnachweise: SCHUFA, Gehaltsabrechnungen, Arbeitgeberbestätigung.",
      },
      {
        question: "Lohnen sich Stadtteile außerhalb der Innenstadt?",
        answer:
          "Höchst und Fechenheim bieten 12–14 €/m² mit U-Bahn-Anschluss. Für Arbeitnehmer im Frankfurter Büroviertel ist das realistisch.",
      },
      {
        question: "Gibt es günstige Wohnungen in Frankfurt für Berufseinsteiger?",
        answer:
          "Griesheim und Rödelheim sind vergleichsweise erschwinglich. WG-Zimmer sind oft der Einstieg — Lyrvio unterstützt auch diese Suche.",
      },
      {
        question: "Wie wichtig ist der Einzugstermin im Bewerbungsschreiben?",
        answer:
          "Sehr wichtig in Frankfurt. Vermieter bevorzugen klare, kurzfristige Einzugstermine. Lyrvio fragt beim Profil-Setup danach.",
      },
      {
        question: "Kann ich als EU-Ausländer problemlos in Frankfurt eine Wohnung mieten?",
        answer:
          "Grundsätzlich ja. Gültige Aufenthaltserlaubnis, deutsches Konto und vollständige Unterlagen sind Pflicht. Lyrvio optimiert das Bewerbungsschreiben sprachlich auf Deutsch.",
      },
    ],
  },
  stuttgart: {
    name: "Stuttgart",
    slug: "stuttgart",
    state: "Baden-Württemberg",
    population: 640000,
    apartmentsPerDay: 130,
    avgBewerber: 420,
    topDistricts: [
      { name: "Mitte", avgRentSqm: 17.8 },
      { name: "West", avgRentSqm: 16.9 },
      { name: "Nord", avgRentSqm: 17.2 },
      { name: "Ost", avgRentSqm: 16.1 },
      { name: "Süd", avgRentSqm: 16.4 },
      { name: "Bad Cannstatt", avgRentSqm: 14.2 },
      { name: "Vaihingen", avgRentSqm: 15.8 },
      { name: "Möhringen", avgRentSqm: 15.1 },
      { name: "Feuerbach", avgRentSqm: 13.9 },
      { name: "Zuffenhausen", avgRentSqm: 13.4 },
    ],
    phase2Districts: [],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Personalausweis-Kopie",
      "Selbstauskunft",
      "Ggf. Arbeitgeberbestätigung",
    ],
    waitTimeManualMonths: 4,
    waitTimeWithLyrvioWeeks: 2,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt", "Immonet"],
    keywords: [
      "wohnung stuttgart",
      "wohnungssuche stuttgart",
      "wohnung mieten stuttgart",
      "stuttgart wohnung finden",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Stuttgart 2026?",
        answer:
          "Stuttgart liegt bei 14–18 €/m² kalt. Die Kessellagen (Mitte, West) sind teurer als Stadtrandlagen wie Zuffenhausen.",
      },
      {
        question: "Warum ist Stuttgart so teuer trotz geringerer Größe?",
        answer:
          "Starker Automobilindustrie-Zuzug (Mercedes, Porsche, Bosch) und knappes Bauland durch Kessellage treiben die Mieten. Der Markt ist kleiner als Berlin, aber ähnlich umkämpft.",
      },
      {
        question: "Welche Stadtteile sind für Stuttgart-Einsteiger empfehlenswert?",
        answer:
          "Feuerbach und Zuffenhausen bieten Wohnungen um 13–14 €/m² mit guter S-Bahn-Anbindung. Bad Cannstatt ist günstig und zentral.",
      },
      {
        question: "Wie lang dauert die Suche in Stuttgart?",
        answer:
          "Typisch 3–5 Monate ohne Automatisierung. Beliebte Stadtteile sind extrem schnell vergeben.",
      },
      {
        question: "Gibt es Besonderheiten beim Stuttgarter Mietmarkt?",
        answer:
          "Viele Werkswohnungen (Mercedes, Porsche) sind intern vergeben. Der freie Markt ist daher kleiner als in anderen Städten.",
      },
      {
        question: "Was sind typische Ablehnungsgründe bei Stuttgarter Vermietern?",
        answer:
          "Unvollständige Unterlagen, zu niedrige Bonität, fehlende Mietschuldenfreiheitsbescheinigung. Lyrvio sorgt für vollständige und schnelle Einreichung.",
      },
      {
        question: "Sind Mietwohnungen in Esslingen oder Ludwigsburg günstiger?",
        answer:
          "Ja — Esslingen und Ludwigsburg liegen bei 12–15 €/m² und haben direkte S-Bahn nach Stuttgart. Für Pendler eine gute Alternative.",
      },
      {
        question: "Wie bewerbe ich mich auf eine Wohnung in Stuttgart-West?",
        answer:
          "Stuttgart-West ist sehr begehrt. Schnelligkeit ist entscheidend — Lyrvio reagiert innerhalb von 30 Sekunden auf neue Inserate.",
      },
    ],
  },
  duesseldorf: {
    name: "Düsseldorf",
    slug: "duesseldorf",
    state: "Nordrhein-Westfalen",
    population: 640000,
    apartmentsPerDay: 140,
    avgBewerber: 380,
    topDistricts: [
      { name: "Altstadt", avgRentSqm: 18.4 },
      { name: "Pempelfort", avgRentSqm: 16.9 },
      { name: "Flingern", avgRentSqm: 15.2 },
      { name: "Oberbilk", avgRentSqm: 13.8 },
      { name: "Bilk", avgRentSqm: 15.6 },
      { name: "Unterbilk", avgRentSqm: 16.1 },
      { name: "Derendorf", avgRentSqm: 16.4 },
      { name: "Gerresheim", avgRentSqm: 12.9 },
      { name: "Benrath", avgRentSqm: 12.1 },
      { name: "Garath", avgRentSqm: 10.8 },
    ],
    phase2Districts: [],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Mietschuldenfreiheitsbescheinigung",
      "Personalausweis-Kopie",
      "Selbstauskunft",
    ],
    waitTimeManualMonths: 3,
    waitTimeWithLyrvioWeeks: 2,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt", "Immonet"],
    keywords: [
      "wohnung düsseldorf",
      "wohnungssuche düsseldorf",
      "wohnung mieten düsseldorf",
      "düsseldorf wohnung finden",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Düsseldorf 2026?",
        answer:
          "Düsseldorf liegt bei 11–19 €/m² kalt. Die Altstadt und Pempelfort sind teurer, Garath und Benrath günstiger.",
      },
      {
        question: "Welche Stadtteile sind in Düsseldorf am begehrtesten?",
        answer:
          "Flingern und Pempelfort sind hipster-geprägte Szeneviertel. Die Altstadt ist touristisch aber zentral.",
      },
      {
        question: "Wie lang dauert die Wohnungssuche in Düsseldorf?",
        answer:
          "Düsseldorf ist entspannter als Berlin oder München — typisch 2–4 Monate. Trotzdem werden beliebte Wohnungen in Stunden vergeben.",
      },
      {
        question: "Hat Düsseldorf besondere Mietmarkt-Eigenheiten?",
        answer:
          "Japanische und koreanische Expats-Community in bestimmten Stadtteilen (Immermannstraße). Für diese Zielgruppe gibt es spezialisierte Vermieter.",
      },
      {
        question: "Sind Wohnungen in Düsseldorf günstiger als in Köln?",
        answer:
          "Vergleichbar — Düsseldorf liegt minimal günstiger, hat aber ähnliche Nachfragestruktur. Köln hat mehr Angebot durch größeres Stadtgebiet.",
      },
      {
        question: "Was sollte im Bewerbungsschreiben für Düsseldorf stehen?",
        answer:
          "Düsseldorfer Vermieter schätzen Sauberkeit im Stil, klaren Einzugstermin und vollständige Unterlagen. Lyrvio erstellt das automatisch.",
      },
      {
        question: "Gibt es günstige Wohnlagen mit guter Anbindung?",
        answer:
          "Garath und Benrath im Süden bieten unter 12 €/m² mit U-Bahn in die Innenstadt.",
      },
      {
        question: "Lohnt sich Duisburg als Alternative zu Düsseldorf?",
        answer:
          "Duisburg liegt bei 8–11 €/m² — deutlich günstiger. Mit S-Bahn 20 Minuten nach Düsseldorf. Für Budgetbewusste eine reale Option.",
      },
    ],
  },
  leipzig: {
    name: "Leipzig",
    slug: "leipzig",
    state: "Sachsen",
    population: 620000,
    apartmentsPerDay: 120,
    avgBewerber: 300,
    topDistricts: [
      { name: "Plagwitz", avgRentSqm: 11.8 },
      { name: "Connewitz", avgRentSqm: 12.2 },
      { name: "Gohlis", avgRentSqm: 11.4 },
      { name: "Schleußig", avgRentSqm: 12.9 },
      { name: "Südvorstadt", avgRentSqm: 12.6 },
      { name: "Zentrum", avgRentSqm: 13.4 },
      { name: "Reudnitz", avgRentSqm: 10.8 },
      { name: "Grünau", avgRentSqm: 8.9 },
      { name: "Möckern", avgRentSqm: 9.6 },
      { name: "Leutzsch", avgRentSqm: 9.8 },
    ],
    phase2Districts: [],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Personalausweis-Kopie",
      "Selbstauskunft",
    ],
    waitTimeManualMonths: 3,
    waitTimeWithLyrvioWeeks: 2,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt", "Immonet"],
    keywords: [
      "wohnung leipzig",
      "wohnungssuche leipzig",
      "wohnung mieten leipzig",
      "leipzig wohnung finden",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Leipzig 2026?",
        answer:
          "Leipzig ist noch vergleichsweise günstig: 9–13 €/m² kalt. Schleußig und Connewitz sind teurer, Grünau und Leutzsch deutlich günstiger.",
      },
      {
        question: "Warum wächst Leipzig so schnell?",
        answer:
          "Zuzug durch günstige Lebenshaltungskosten, Kreativwirtschaft und gute Hochschulen. Das Wachstum treibt die Mieten, aber Leipzig bleibt erschwinglich.",
      },
      {
        question: "Welche Stadtteile sind in Leipzig besonders begehrt?",
        answer:
          "Plagwitz und Connewitz für Kreative und Studenten. Schleußig für Familien. Gohlis als ruhige Alternative mit Altbaucharme.",
      },
      {
        question: "Wie schnell muss man in Leipzig reagieren?",
        answer:
          "Schneller als man denkt — Connewitz und Plagwitz-Inserate sind binnen weniger Stunden weg. Trotzdem entspannter als Berlin.",
      },
      {
        question: "Sind Wohnungsanforderungen in Leipzig anders als im Westen?",
        answer:
          "Ähnlich, aber etwas weniger streng. SCHUFA und Gehaltsnachweis genügen meist. Selbstauskunft ist Standard.",
      },
      {
        question: "Gibt es günstige Großwohnungen in Leipzig?",
        answer:
          "In Grünau und Leutzsch sind 3-Zimmer-Wohnungen unter 700 €/Monat kalt möglich. Altbau-Sanierungen in Reudnitz bieten Potential.",
      },
      {
        question: "Lohnt sich Leipzig für Fernpendler nach Berlin?",
        answer:
          "Mit ICE 68 Minuten nach Berlin — für Teilzeit-Pendler interessant. Leipzig bietet bei 2–3× günstigeren Mieten erhebliche Ersparnis.",
      },
      {
        question: "Wie funktioniert Lyrvio in einer kleineren Stadt wie Leipzig?",
        answer:
          "Genauso — Leipzig hat täglich über 100 neue Inserate auf allen Plattformen. Lyrvio reagiert auf jedes passende innerhalb von 30 Sekunden.",
      },
    ],
  },
  dortmund: {
    name: "Dortmund",
    slug: "dortmund",
    state: "Nordrhein-Westfalen",
    population: 595000,
    apartmentsPerDay: 110,
    avgBewerber: 280,
    topDistricts: [
      { name: "Innenstadt-West", avgRentSqm: 12.4 },
      { name: "Innenstadt-Nord", avgRentSqm: 11.8 },
      { name: "Kreuzviertel", avgRentSqm: 13.2 },
      { name: "Kaiserviertel", avgRentSqm: 13.6 },
      { name: "Westfalenhalle", avgRentSqm: 11.4 },
      { name: "Hörde", avgRentSqm: 10.9 },
      { name: "Aplerbeck", avgRentSqm: 10.2 },
      { name: "Brackel", avgRentSqm: 9.8 },
      { name: "Scharnhorst", avgRentSqm: 8.9 },
      { name: "Mengede", avgRentSqm: 8.4 },
    ],
    phase2Districts: [],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Personalausweis-Kopie",
      "Selbstauskunft",
    ],
    waitTimeManualMonths: 2,
    waitTimeWithLyrvioWeeks: 1,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt"],
    keywords: [
      "wohnung dortmund",
      "wohnungssuche dortmund",
      "wohnung mieten dortmund",
      "dortmund wohnung finden",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Dortmund 2026?",
        answer:
          "Dortmund ist günstig: 8–14 €/m² kalt. Kreuzviertel und Kaiserviertel sind teurer, Mengede und Scharnhorst sehr preiswert.",
      },
      {
        question: "Welche Stadtteile sind in Dortmund empfehlenswert?",
        answer:
          "Kreuzviertel und Kaiserviertel für urbanes Flair. Hörde am Phoenixsee ist beliebt und modern. Aplerbeck für Familien.",
      },
      {
        question: "Ist der Dortmunder Wohnungsmarkt weniger angespannt?",
        answer:
          "Ja — Dortmund hat mehr Leerstand als Westdeutschlands Boom-Städte. Trotzdem sind gute Wohnungen schnell weg.",
      },
      {
        question: "Wie lange dauert die Wohnungssuche in Dortmund?",
        answer:
          "Oft nur 4–8 Wochen ohne Hilfe. Mit Lyrvio häufig 1–2 Wochen bis zur ersten Besichtigung.",
      },
      {
        question: "Was brauche ich für eine Dortmunder Bewerbung?",
        answer:
          "SCHUFA, Gehaltsnachweis, Selbstauskunft. Dortmunder Vermieter sind weniger formal als Großstadtvermieter in München oder Frankfurt.",
      },
      {
        question: "Lohnt sich Dortmund für Fernpendler ins Ruhrgebiet?",
        answer:
          "Dortmund liegt im Herz des Ruhrgebiets — ideale Basis für Arbeit in Essen, Bochum, Duisburg mit S-Bahn oder A40.",
      },
      {
        question: "Gibt es günstige Wohnungen für Studenten in Dortmund?",
        answer:
          "Ja — rund um die TU Dortmund sind WG-Zimmer und kleine Wohnungen ab 350–500 €/Monat möglich. Lyrvio unterstützt auch die WG-Suche.",
      },
      {
        question: "Wie ist der Dortmunder Wohnungsmarkt im Vergleich zu Essen?",
        answer:
          "Ähnlich günstig — Dortmund hat leicht höheres Mietpreisniveau in zentralen Lagen, dafür mehr Angebot insgesamt.",
      },
    ],
  },
  essen: {
    name: "Essen",
    slug: "essen",
    state: "Nordrhein-Westfalen",
    population: 580000,
    apartmentsPerDay: 105,
    avgBewerber: 260,
    topDistricts: [
      { name: "Rüttenscheid", avgRentSqm: 13.8 },
      { name: "Kettwig", avgRentSqm: 13.2 },
      { name: "Bredeney", avgRentSqm: 14.1 },
      { name: "Stadtmitte", avgRentSqm: 12.6 },
      { name: "Holsterhausen", avgRentSqm: 12.1 },
      { name: "Frohnhausen", avgRentSqm: 10.8 },
      { name: "Steele", avgRentSqm: 10.2 },
      { name: "Borbeck", avgRentSqm: 9.6 },
      { name: "Altenessen", avgRentSqm: 8.9 },
      { name: "Katernberg", avgRentSqm: 8.4 },
    ],
    phase2Districts: [],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Personalausweis-Kopie",
      "Selbstauskunft",
    ],
    waitTimeManualMonths: 2,
    waitTimeWithLyrvioWeeks: 1,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt"],
    keywords: [
      "wohnung essen",
      "wohnungssuche essen",
      "wohnung mieten essen",
      "essen wohnung finden",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Essen 2026?",
        answer:
          "Essen liegt bei 8–14 €/m² kalt — eine der günstigeren Großstädte Deutschlands. Rüttenscheid und Bredeney sind teurer.",
      },
      {
        question: "Welcher Essener Stadtteil ist besonders empfehlenswert?",
        answer:
          "Rüttenscheid gilt als Toplage mit bester Infrastruktur. Kettwig ist pittoresk und ruhig. Stadtmitte für kurze Wege.",
      },
      {
        question: "Ist Essen ein guter Wohnort trotz Ruhrgebiet-Image?",
        answer:
          "Ja — Essen hat sich stark gewandelt. Krupp-Gelände als Kulturpark, Ruhr-Universität, gute Infrastruktur. Günstige Mieten als Bonus.",
      },
      {
        question: "Wie lange dauert die Wohnungssuche in Essen?",
        answer:
          "Oft 4–8 Wochen ohne Tool. Mit Lyrvio häufig 1–2 Wochen, da der Markt weniger überhitzt ist.",
      },
      {
        question: "Welche Unterlagen brauche ich in Essen?",
        answer:
          "Standard-Paket: SCHUFA, Gehaltsnachweis, Selbstauskunft. Essen ist entspannter als die großen Boom-Städte.",
      },
      {
        question: "Gibt es günstige Wohnungen in Essen für Familien?",
        answer:
          "Borbeck und Altenessen bieten große Wohnungen unter 10 €/m². Für Familien mit Bedarf an Platz eine gute Option.",
      },
      {
        question: "Lohnt sich Essen für Pendler nach Düsseldorf?",
        answer:
          "Mit S-Bahn 30 Minuten nach Düsseldorf — und oft 3–5 €/m² günstiger. Klarer finanzieller Vorteil.",
      },
      {
        question: "Wie funktioniert Lyrvio in Essen?",
        answer:
          "Genauso wie in Berlin — Lyrvio scannt ImmoScout24, eBay Kleinanzeigen und Immowelt alle 30 Sekunden und bewirbt sich sofort.",
      },
    ],
  },
  bremen: {
    name: "Bremen",
    slug: "bremen",
    state: "Bremen",
    population: 570000,
    apartmentsPerDay: 100,
    avgBewerber: 290,
    topDistricts: [
      { name: "Schwachhausen", avgRentSqm: 14.2 },
      { name: "Östliche Vorstadt", avgRentSqm: 13.8 },
      { name: "Neustadt", avgRentSqm: 12.9 },
      { name: "Findorff", avgRentSqm: 12.4 },
      { name: "Horn-Lehe", avgRentSqm: 12.1 },
      { name: "Gröpelingen", avgRentSqm: 9.8 },
      { name: "Huchting", avgRentSqm: 9.4 },
      { name: "Osterholz", avgRentSqm: 10.1 },
      { name: "Walle", avgRentSqm: 11.2 },
      { name: "Häfen", avgRentSqm: 10.8 },
    ],
    phase2Districts: [],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Personalausweis-Kopie",
      "Selbstauskunft",
    ],
    waitTimeManualMonths: 3,
    waitTimeWithLyrvioWeeks: 2,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt"],
    keywords: [
      "wohnung bremen",
      "wohnungssuche bremen",
      "wohnung mieten bremen",
      "bremen wohnung finden",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Bremen 2026?",
        answer:
          "Bremen liegt bei 9–15 €/m² kalt. Schwachhausen und Östliche Vorstadt sind teurer, Gröpelingen und Huchting günstiger.",
      },
      {
        question: "Welcher Bremer Stadtteil ist besonders beliebt?",
        answer:
          "Östliche Vorstadt (Steintor, Viertel) ist bei Studenten und Kreativen sehr beliebt. Schwachhausen für Familien mit höherem Einkommen.",
      },
      {
        question: "Wie lange sucht man in Bremen eine Wohnung?",
        answer:
          "Typisch 2–4 Monate — entspannter als die großen Boom-Städte, aber das Viertel ist heiß umkämpft.",
      },
      {
        question: "Hat Bremen eine besondere Wohnungsmarkt-Eigenheit?",
        answer:
          "Das 'Viertel' (Steintor-Viertel, Östliche Vorstadt) ist kulturell besonders wertvoll und dadurch stark nachgefragt und teurer als der Rest der Stadt.",
      },
      {
        question: "Welche Unterlagen brauche ich für Bremen?",
        answer:
          "Standard: SCHUFA, Gehaltsnachweis, Selbstauskunft. Bremer Vermieter sind weniger formal als in Frankfurt oder München.",
      },
      {
        question: "Sind Studentenwohnungen in Bremen günstig zu finden?",
        answer:
          "Rund um Uni und Hochschule gibt es WG-Zimmer ab 350 €. Studentenwerk bietet Wohnheimplätze ab 220 €, aber mit langen Wartelisten.",
      },
      {
        question: "Lohnt sich Bremen für Pendler nach Hamburg?",
        answer:
          "Mit IC eine Stunde nach Hamburg — für Pendler mit hoher Mietpreissensitivität ist das eine reale Option.",
      },
      {
        question: "Was macht Lyrvio in Bremen anders als manuelle Suche?",
        answer:
          "In Bremen sind begehrte Wohnungen im Viertel ebenfalls in Stunden weg. Lyrvio reagiert in unter 30 Sekunden — das macht den Unterschied.",
      },
    ],
  },
  hannover: {
    name: "Hannover",
    slug: "hannover",
    state: "Niedersachsen",
    population: 540000,
    apartmentsPerDay: 110,
    avgBewerber: 310,
    topDistricts: [
      { name: "Nordstadt", avgRentSqm: 13.4 },
      { name: "Südstadt", avgRentSqm: 13.9 },
      { name: "Linden-Nord", avgRentSqm: 12.8 },
      { name: "Linden-Mitte", avgRentSqm: 12.4 },
      { name: "Mitte", avgRentSqm: 14.6 },
      { name: "List", avgRentSqm: 13.1 },
      { name: "Kleefeld", avgRentSqm: 11.8 },
      { name: "Döhren", avgRentSqm: 11.4 },
      { name: "Vahrenwald", avgRentSqm: 10.9 },
      { name: "Stöcken", avgRentSqm: 9.8 },
    ],
    phase2Districts: [],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Personalausweis-Kopie",
      "Selbstauskunft",
    ],
    waitTimeManualMonths: 3,
    waitTimeWithLyrvioWeeks: 2,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt", "Immonet"],
    keywords: [
      "wohnung hannover",
      "wohnungssuche hannover",
      "wohnung mieten hannover",
      "hannover wohnung finden",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Hannover 2026?",
        answer:
          "Hannover liegt bei 10–15 €/m² kalt. Günstiger als Hamburg oder Berlin, aber Nordstadt und Südstadt steigen.",
      },
      {
        question: "Welche Stadtteile sind in Hannover am beliebtesten?",
        answer:
          "Linden-Nord und Linden-Mitte für Szene-Flair. Südstadt für Familien. Nordstadt für Studenten und junge Berufseinsteiger.",
      },
      {
        question: "Wie lange dauert die Wohnungssuche in Hannover?",
        answer:
          "Typisch 2–4 Monate. Hannover ist entspannter als die Metropolen, aber beliebte Stadtteile sind umkämpft.",
      },
      {
        question: "Hat Hannover besondere Mietmarkt-Eigenheiten?",
        answer:
          "Messe-Saison (CeBIT-Nachfolger, IAA) treibt Kurzzeit-Mieten hoch — für Langzeit-Suche kein Faktor, aber interessant.",
      },
      {
        question: "Welche Unterlagen brauche ich in Hannover?",
        answer:
          "Standard-Paket reicht meist. SCHUFA, Gehaltsnachweise, Selbstauskunft. Hannover ist weniger formal als Frankfurt.",
      },
      {
        question: "Sind Wohnungen in Hannover für Studenten erschwinglich?",
        answer:
          "Ja — Linden und Nordstadt bieten WG-Zimmer ab 350–450 €. Günstige Großwohnungen in Vahrenwald.",
      },
      {
        question: "Lohnt sich Hannover für Pendler?",
        answer:
          "Hannover liegt zentral im IC-Netz — Hamburg (90 Min), Berlin (90 Min), Frankfurt (2h). Als Pendelbase attraktiv.",
      },
      {
        question: "Wie reagieren Hannoveraner Vermieter auf Bewerbungen?",
        answer:
          "Schnell und pragmatisch. Vollständige Unterlagen erhöhen die Chance erheblich. Lyrvio stellt sicher, dass alles sofort beiliegt.",
      },
    ],
  },
  dresden: {
    name: "Dresden",
    slug: "dresden",
    state: "Sachsen",
    population: 565000,
    apartmentsPerDay: 105,
    avgBewerber: 270,
    topDistricts: [
      { name: "Neustadt", avgRentSqm: 12.8 },
      { name: "Striesen", avgRentSqm: 11.9 },
      { name: "Blasewitz", avgRentSqm: 12.4 },
      { name: "Loschwitz", avgRentSqm: 13.1 },
      { name: "Innere Altstadt", avgRentSqm: 14.2 },
      { name: "Pieschen", avgRentSqm: 10.8 },
      { name: "Gorbitz", avgRentSqm: 8.6 },
      { name: "Prohlis", avgRentSqm: 8.2 },
      { name: "Cotta", avgRentSqm: 9.4 },
      { name: "Klotzsche", avgRentSqm: 10.2 },
    ],
    phase2Districts: [],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Personalausweis-Kopie",
      "Selbstauskunft",
    ],
    waitTimeManualMonths: 2,
    waitTimeWithLyrvioWeeks: 1,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt"],
    keywords: [
      "wohnung dresden",
      "wohnungssuche dresden",
      "wohnung mieten dresden",
      "dresden wohnung finden",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Dresden 2026?",
        answer:
          "Dresden ist günstig: 8–14 €/m² kalt. Die Neustadt und Blasewitz sind teurer, Gorbitz und Prohlis sehr preiswert.",
      },
      {
        question: "Welcher Dresdner Stadtteil ist besonders beliebt?",
        answer:
          "Die Neustadt ist Dresdns kulturelles Zentrum mit Bars und Galerien. Striesen und Blasewitz für ruhige Altbaulagen.",
      },
      {
        question: "Wie lange dauert die Wohnungssuche in Dresden?",
        answer:
          "Oft nur 4–8 Wochen — einer der entspannteren Märkte unter deutschen Großstädten. Neustadt-Wohnungen gehen aber schnell.",
      },
      {
        question: "Wächst der Dresdner Mietmarkt?",
        answer:
          "Ja — Halbleiterfabriken (TSMC, Infineon) treiben starken Zuzug. Die Mieten steigen, aber Dresden bleibt günstig.",
      },
      {
        question: "Was brauche ich für eine Dresdner Bewerbung?",
        answer:
          "Standard-Paket: SCHUFA, Gehaltsnachweis, Selbstauskunft. Weniger formell als in Frankfurt oder München.",
      },
      {
        question: "Gibt es günstige Familienwohnungen in Dresden?",
        answer:
          "Gorbitz und Prohlis bieten große Wohnungen unter 9 €/m². Klotzsche ist ruhiger und für Familien attraktiver.",
      },
      {
        question: "Lohnt sich die Neustadt für Studenten?",
        answer:
          "Absolut — nah an TU Dresden und Hochschule, lebhaft, WG-Zimmer ab 350 €. Lyrvio findet auch Neustadt-Angebote sofort.",
      },
      {
        question: "Ist Dresden durch die Halbleiter-Industrie bald so teuer wie München?",
        answer:
          "Unwahrscheinlich in den nächsten Jahren. Aber die Mieten steigen messbar. Frühzeitig einziehen ist ein Vorteil.",
      },
    ],
  },
  nuernberg: {
    name: "Nürnberg",
    slug: "nuernberg",
    state: "Bayern",
    population: 520000,
    apartmentsPerDay: 100,
    avgBewerber: 340,
    topDistricts: [
      { name: "Altstadt", avgRentSqm: 16.2 },
      { name: "St. Johannis", avgRentSqm: 14.8 },
      { name: "Gostenhof", avgRentSqm: 13.6 },
      { name: "Maxfeld", avgRentSqm: 14.2 },
      { name: "Gleißhammer", avgRentSqm: 13.1 },
      { name: "Langwasser", avgRentSqm: 11.4 },
      { name: "Gibitzenhof", avgRentSqm: 11.9 },
      { name: "Nordostbahnhof", avgRentSqm: 12.4 },
      { name: "Wöhrd", avgRentSqm: 13.8 },
      { name: "Schoppershof", avgRentSqm: 12.8 },
    ],
    phase2Districts: [],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Personalausweis-Kopie",
      "Selbstauskunft",
      "Ggf. Arbeitgeberbestätigung",
    ],
    waitTimeManualMonths: 3,
    waitTimeWithLyrvioWeeks: 2,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt", "Immonet"],
    keywords: [
      "wohnung nürnberg",
      "wohnungssuche nürnberg",
      "wohnung mieten nürnberg",
      "nürnberg wohnung finden",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Nürnberg 2026?",
        answer:
          "Nürnberg liegt bei 11–16 €/m² kalt — günstiger als München, aber mit steigender Tendenz. Altstadt und Maxfeld sind teurer.",
      },
      {
        question: "Welche Nürnberger Stadtteile sind beliebt?",
        answer:
          "Gostenhof ist das Kreativviertel. St. Johannis für ruhige Altbaulagen. Wöhrd am Pegnitzufer für naturnahes Wohnen.",
      },
      {
        question: "Wie entwickelt sich Nürnbergs Mietmarkt?",
        answer:
          "Stabiles Wachstum durch gute Wirtschaftslage (Siemens, Bosch, Adidas). Kein Boom wie München, aber kontinuierliche Steigerung.",
      },
      {
        question: "Wie lange dauert die Wohnungssuche in Nürnberg?",
        answer:
          "Typisch 2–4 Monate. Gostenhof und Maxfeld sind umkämpfter.",
      },
      {
        question: "Welche Unterlagen brauche ich in Nürnberg?",
        answer:
          "Standard-Paket. Bayerische Vermieter sind etwas formeller — Arbeitgeberbestätigung wird oft zusätzlich verlangt.",
      },
      {
        question: "Sind Wohnungen in Nürnberg für Studenten günstig?",
        answer:
          "Langwasser und Gibitzenhof bieten erschwingliche Wohnungen. Studentenwerk-Wohnheime haben lange Wartelisten.",
      },
      {
        question: "Lohnt sich Nürnberg als Alternative zu München?",
        answer:
          "Definitiv — vergleichbare Infrastruktur, weniger als halb so teuer wie München, ICE in 65 Minuten nach München.",
      },
      {
        question: "Wie schnell werden Nürnberger Inserate vergeben?",
        answer:
          "In Gostenhof und Maxfeld binnen weniger Stunden. Lyrvio reagiert in unter 30 Sekunden nach Veröffentlichung.",
      },
    ],
  },
  karlsruhe: {
    name: "Karlsruhe",
    slug: "karlsruhe",
    state: "Baden-Württemberg",
    population: 315000,
    apartmentsPerDay: 75,
    avgBewerber: 310,
    topDistricts: [
      { name: "Innenstadt-West", avgRentSqm: 15.8 },
      { name: "Innenstadt-Ost", avgRentSqm: 15.2 },
      { name: "Südstadt", avgRentSqm: 14.6 },
      { name: "Weststadt", avgRentSqm: 14.9 },
      { name: "Oststadt", avgRentSqm: 14.1 },
      { name: "Mühlburg", avgRentSqm: 13.2 },
      { name: "Durlach", avgRentSqm: 12.8 },
      { name: "Weiherfeld-Dammerstock", avgRentSqm: 12.4 },
      { name: "Rüppurr", avgRentSqm: 12.1 },
      { name: "Waldstadt", avgRentSqm: 11.8 },
    ],
    phase2Districts: [],
    typicalRequirements: [
      "SCHUFA-Auskunft",
      "Gehaltsnachweis letzte 3 Monate",
      "Personalausweis-Kopie",
      "Selbstauskunft",
    ],
    waitTimeManualMonths: 3,
    waitTimeWithLyrvioWeeks: 2,
    mainPlatforms: ["ImmoScout24", "eBay Kleinanzeigen", "Immowelt"],
    keywords: [
      "wohnung karlsruhe",
      "wohnungssuche karlsruhe",
      "wohnung mieten karlsruhe",
      "karlsruhe wohnung finden",
    ],
    faq: [
      {
        question: "Was kostet eine Wohnung in Karlsruhe 2026?",
        answer:
          "Karlsruhe liegt bei 11–16 €/m² kalt. Innenstadtlagen sind teurer als Durlach oder Waldstadt.",
      },
      {
        question: "Was treibt den Karlsruher Wohnungsmarkt?",
        answer:
          "KIT (Karlsruher Institut für Technologie), Technologiezentrum, viele Tech-Startups und -Firmen. Starker Studenten- und Fachkräftezuzug.",
      },
      {
        question: "Welche Stadtteile sind in Karlsruhe empfehlenswert?",
        answer:
          "Südstadt und Weststadt für urbanes Wohnen nahe Innenstadt. Durlach für Altbau-Flair mit Kleinstadtcharakter. Mühlburg als günstigere Alternative.",
      },
      {
        question: "Wie lange dauert die Wohnungssuche in Karlsruhe?",
        answer:
          "2–4 Monate ohne Tool. KIT-Nähe macht bestimmte Gebiete extrem begehrt zu Semesterbeginn.",
      },
      {
        question: "Welche Unterlagen werden in Karlsruhe verlangt?",
        answer:
          "Standard: SCHUFA, Gehaltsnachweis, Selbstauskunft. Wenig Besonderheiten gegenüber anderen Städten.",
      },
      {
        question: "Sind Wohnungen für KIT-Studenten knapp?",
        answer:
          "Ja — zu Semesterbeginn sind bezahlbare Wohnungen rund um das KIT extrem schnell weg. Lyrvio reagiert sofort auf neue Angebote.",
      },
      {
        question: "Gibt es günstige Wohnlagen in Karlsruhe?",
        answer:
          "Waldstadt und Rüppurr bieten Wohnungen unter 13 €/m² mit guter Tram-Anbindung.",
      },
      {
        question: "Lohnt sich Karlsruhe als Wohnort für Baden-Württemberg-Pendler?",
        answer:
          "Absolut — Stuttgart (90 Min ICE), Mannheim (20 Min ICE), Freiburg (90 Min). Zentrallage bei noch moderaten Mieten.",
      },
    ],
  },
};

export const cityList = Object.values(cities);

export const cityBySlug = (slug: string): CityData | undefined => cities[slug];
