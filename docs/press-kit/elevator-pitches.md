# Lyrvio — Elevator Pitches

---

## 30 Sekunden

In Berlin, München und Hamburg kommt auf jedes Wohnungsinserat 50–200 Bewerbungen in der ersten Stunde. Vermieter schauen sich die ersten 30 an und hören dann auf. Das ist kein Qualitätsproblem — das ist ein Timing-Problem.

Lyrvio ist ein KI-Bot der sich automatisch auf Wohnungsinserate bewirbt. Sobald ein passendes Inserat erscheint, hat Lyrvio in unter 5 Sekunden ein personalisiertes Anschreiben generiert und die Bewerbung gesendet. Während du schläfst.

79 Euro im Monat. 299 Euro Bonus wenn du eine Wohnung findest.

---

## 60 Sekunden

Stell dir vor: du suchst seit 6 Monaten eine Wohnung in Berlin. Du kriegst Push-Nachrichten von drei verschiedenen Apps. Jeden Morgen öffnest du das Inserat zu spät — der Vermieter hat schon 80 Bewerbungen. Die meisten davon sind die ersten 5 Minuten nach Veröffentlichung eingegangen.

Das ist der Wohnungsmarkt 2026. Und alle bestehenden Lösungen helfen dir nur beim Entdecken. Aber das Problem liegt woanders: beim Bewerben.

Lyrvio läuft als Browser-Extension im Hintergrund. Der Bot scannt ImmoScout, Immowelt, Kleinanzeigen, WG-Gesucht alle 30 Sekunden. Erscheint ein passendes Inserat, analysiert Claude Haiku die Vermieter-Anforderungen, generiert ein personalisiertes Anschreiben und sendet die Bewerbung — in unter 5 Sekunden, als würdest du selbst klicken.

Du bekommst eine Push-Notification: "Bewerbung gesendet."

Kein Konkurrent in Deutschland macht das als Consumer-Produkt. Wir sind first. 79 Euro im Monat, 299 Euro Erfolgs-Bonus. Inbound-only, kein Team, kein Funding. Das Modell trägt sich.

---

## 3-Minuten Demo-Version

**[Slide 1: Das Problem]**

Der Wohnungsmarkt in deutschen Großstädten ist strukturell dysfunktional — aber nicht wegen Mangel an Wohnungen allein. Das eigentliche Problem ist Asymmetrie. Ein einziges Inserat zieht 50–200 Bewerbungen an. Die meisten Vermieter schauen sich 20–30 davon an und wählen dann aus. Wer nach Stunde 1 bewirbt, ist fast unsichtbar.

Das führt zu dieser absurden Situation: Ein Wohnungssucher mit perfekter Bonität, gutem Job und ausgezeichnetem Anschreiben bekommt keine Antwort — weil er zur Arbeit gegangen ist als das Inserat erschien.

*Das ist kein Qualitätsproblem. Es ist ein Timing-Problem.*

**[Slide 2: Was der Markt bisher bietet]**

Schauen wir uns den Markt an: Homeboy, Flatly Berlin, Immobilien Bot, ImmoScout SuchenPlus. Alle machen dasselbe — sie benachrichtigen dich wenn ein neues Inserat erscheint.

Dann bist du dran: App öffnen, Portal aufrufen, einloggen, Formular ausfüllen, Anschreiben schreiben — oder kopieren, was noch schlimmer ist —, absenden. Das dauert 3–8 Minuten. In einem Markt wo die entscheidenden Bewerbungen in der ersten halben Stunde eingehen.

*Benachrichtigung ist nicht Lösung. Benachrichtigung ist Vorbereitung für die Lösung.*

**[Slide 3: Lyrvio]**

Lyrvio schließt diesen zweiten Schritt. Die Browser-Extension läuft im Hintergrund deines Browsers. Kein Server, kein Cloud-Bot — dein Browser. Das ist eine bewusste Architekturentscheidung: der Bot handelt als du, nicht statt dir, was rechtlich und technisch sauber ist.

Sobald ein Inserat erscheint das zu deinen Kriterien passt:

- Claude Haiku liest den Inseratstext und extrahiert was der Vermieter sucht
- Dein Nutzerprofil wird mit diesen Anforderungen gematcht
- Ein personalisiertes Anschreiben wird generiert — nicht copy-paste, sondern context-aware
- Bewerbung gesendet über das Plattform-Formular

Das alles dauert unter 5 Sekunden.

Du bekommst eine Push-Notification: "Bewerbung gesendet bei Wohnung XY in Prenzlauer Berg."

**[Slide 4: Zahlen]**

Was das im Alltag bedeutet: Beta-Nutzer berichten von 5–10× mehr Besichtigungseinladungen.

Pricing: 79€/Monat. 299€ Erfolgs-Bonus bei Wohnungsfund.

Stack: 100% Open-Source, Cloudflare Workers, Turso, Next.js. Fixkosten unter 100€/Monat. LLM-Kosten under einem Cent pro Bewerbung.

**[Slide 5: Warum jetzt]**

Drei Dinge sind 2025/26 zusammengekommen:
1. LLMs sind billig genug für personalisierte Texte (Haiku: 0,001€/Bewerbung)
2. Browser-Extensions sind stabil genug für 24/7-Automation
3. Solo-AI-Operations sind real — ein Mensch plus KI-Infrastruktur kann ein SaaS betreiben

Das war 2023 nicht möglich. Heute ist es möglich. Deswegen baue ich jetzt.

**[Demo — Live-Extension zeigen]**

*[Browser öffnen, Extension aktivieren, Suchparameter einstellen, warten oder gespeichertes Video abspielen das den Bewerbungsflow zeigt]*

Seht ihr was passiert? Kein Klick von mir. Bot hat das übernommen.

**[Abschluss]**

Lyrvio. Solo-betrieben. Berlin. Kein Funding. Kein Team. Erste kommerzielle Auto-Bewerbungs-Lösung im DACH-Markt.

Fragen?

---

*Stand April 2026 | press@lyrvio.com*
