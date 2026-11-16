/*
 * G&P Use Case Galerie – Datenbasis
 * ---------------------------------
 * Neuen Use Case hinzufügen: einfach einen weiteren Eintrag in USECASES ergänzen.
 *
 * Felder:
 *   id          eindeutiger Kurzname (wird für Direktlinks genutzt: usecases.g-u-p.de/#id)
 *   title       Titel des Use Cases
 *   area        Bereich – muss einem Schlüssel aus AREAS entsprechen
 *   type        "alltag" (Alltags-KI / Low Hanging Fruit) oder "leuchtturm" (Leuchtturmprojekt)
 *   complexity  Komplexitätsgrad 1–10
 *   industry    Branche bzw. Kontext (anonymisiert)
 *   impact      die eine Kernaussage zur Wirkung (kurz!)
 *   teaser      ein Satz für die Karte
 *   problem     Ausgangslage
 *   solution    Lösung in Klartext
 *   results     Liste aus {t: Titel, d: Beschreibung}
 *   setup       Technisches Setup
 *   tools       Liste von Technologien / Werkzeugen
 */

window.AREAS = {
  vertrieb:     { label: "Vertrieb & Angebot" },
  einkauf:      { label: "Einkauf" },
  engineering:  { label: "Engineering & Konstruktion" },
  produktion:   { label: "Produktion" },
  service:      { label: "Service & Support" },
  finanzen:     { label: "Finanzen & Compliance" },
  marketing:    { label: "Marketing" },
  personal:     { label: "Personal" },
  organisation: { label: "Wissen & Organisation" }
};

window.USECASES = [
  /* ------------------------------------------------------------------ */
  /* Alltags-KI / Low Hanging Fruits                                      */
  /* ------------------------------------------------------------------ */
  {
    id: "angebote-ablegen",
    title: "Versendete Angebote legen sich selbst ab",
    area: "vertrieb",
    type: "alltag",
    complexity: 1,
    industry: "Mittelstand, Vertriebsinnendienst",
    impact: "Keine Angebots-PDF geht mehr verloren",
    teaser: "Jedes verschickte Angebot landet automatisch im richtigen Teams-Ordner.",
    problem: "Alle versendeten Angebote mussten manuell im geteilten Firmenordner abgelegt werden. Bei hohem Angebotsvolumen fehlten regelmäßig Dateien, und das Nachsortieren kostete Zeit.",
    solution: "Ein Flow startet, sobald eine E-Mail mit Angebotsanhang rausgeht. Er prüft auf PDF-Anhänge und legt sie strukturiert im definierten Teams-/SharePoint-Ordner ab. Eine klassische Prozessautomatisierung ganz ohne KI – in wenigen Stunden umgesetzt.",
    results: [
      { t: "Verlässliche Ablage", d: "Jedes versendete Angebot liegt im richtigen gemeinsamen Ordner." },
      { t: "Null Handgriffe", d: "Der manuelle Ablageschritt entfällt komplett." },
      { t: "Stunden statt Wochen", d: "Umsetzung an einem Nachmittag, ohne IT-Projekt." }
    ],
    setup: "Power-Automate-Flow mit Trigger auf gesendete E-Mails, Anhangsfilter (PDF) und Ablage in SharePoint/Teams.",
    tools: ["Power Automate", "SharePoint", "Outlook"]
  },
  {
    id: "kontakte-speichern",
    title: "Neue Kontakte landen automatisch im CRM",
    area: "vertrieb",
    type: "alltag",
    complexity: 2,
    industry: "Mittelstand, Vertrieb",
    impact: "Immer aktuelle Kontakte ohne einen Handgriff",
    teaser: "KI liest Signaturen und Visitenkarten und pflegt Outlook bzw. CRM.",
    problem: "Kontakte aus E-Mails oder Visitenkarten wurden manuell übertragen – oder vergessen. Wichtige Daten fehlten, Follow-ups gingen verloren.",
    solution: "Jede neue E-Mail wird auf Kontaktinformationen geprüft. Ein Sprachmodell extrahiert Name, Rolle, Firma, Telefon und Website aus Signatur oder Text. Visitenkarten lassen sich per Smartphone-Foto einlesen. Ein Workflow gleicht mit vorhandenen Kontakten ab und legt nur Neues an.",
    results: [
      { t: "Vollständige Kontaktbasis", d: "Neue Kontakte werden erkannt, verstanden und gespeichert." },
      { t: "Keine Dubletten", d: "Abgleich mit dem Bestand vor dem Anlegen." },
      { t: "Bessere Follow-ups", d: "Der Vertrieb arbeitet mit vollständigen Daten." }
    ],
    setup: "Outlook-Trigger, Azure-gehostetes Sprachmodell zur Extraktion, n8n für Abgleich und Anlage in Outlook/CRM. Visitenkarten-Fotos laufen über dieselbe Logik.",
    tools: ["n8n", "Azure OpenAI", "Outlook", "CRM"]
  },
  {
    id: "praesentationen",
    title: "Präsentationen auf Knopfdruck",
    area: "marketing",
    type: "alltag",
    complexity: 2,
    industry: "Mittelstand, Vertrieb & Marketing",
    impact: "CI-konforme Präsentation in Sekunden",
    teaser: "Aus einem Formular wird eine fertige, gestaltete Präsentation.",
    problem: "Teams verbrachten viel Zeit damit, Inhalte zu strukturieren und Folien zu bauen. Die Qualität schwankte, die Zeit fehlte im Tagesgeschäft.",
    solution: "Ein Workflow nimmt Formulareingaben entgegen, lässt die Inhalte von einem Sprachmodell strukturieren und übergibt sie per API an einen Präsentationsdienst. Der Workflow prüft den Status und liefert die Präsentation als Link oder Download zurück.",
    results: [
      { t: "Sekunden statt Stunden", d: "Komplette Präsentation aus wenigen Stichpunkten." },
      { t: "Einheitliche Qualität", d: "Jede Präsentation folgt dem Corporate Design." },
      { t: "End-to-End", d: "Vom Formular bis zum fertigen Link ohne Zwischenschritt." }
    ],
    setup: "n8n-Workflow mit LLM-Chain zur Strukturierung und Anbindung der Gamma-API inklusive Statusabfrage.",
    tools: ["n8n", "LLM", "Gamma"]
  },
  {
    id: "linkedin-agenten",
    title: "LinkedIn-Beiträge mit KI-Agenten",
    area: "marketing",
    type: "alltag",
    complexity: 3,
    industry: "Beratung & Mittelstand",
    impact: "Regelmäßige Sichtbarkeit – Sie geben nur noch das Go",
    teaser: "Agenten recherchieren, schreiben und planen Posts, der Mensch gibt frei.",
    problem: "Themen finden, recherchieren, schreiben, redigieren, posten: Regelmäßige Beiträge kosteten viel Zeit. Die Folge war unregelmäßige Sichtbarkeit.",
    solution: "Ein geplanter Workflow aktiviert mehrere KI-Agenten mit unterschiedlichen Stilen, Wochentagen und Schwerpunkten. Sie recherchieren über Web-Suche und Newsfeeds, schreiben Entwürfe und schicken sie zur Freigabe. Nach dem Go wird automatisch veröffentlicht.",
    results: [
      { t: "Konstante Präsenz", d: "Beiträge erscheinen planbar, auch in vollen Wochen." },
      { t: "Human-in-the-loop", d: "Nichts geht ohne Freigabe raus." },
      { t: "Weniger Aufwand", d: "Aus Stunden pro Post werden Minuten." }
    ],
    setup: "Zeitgesteuerter n8n-Workflow, mehrere Agenten mit Azure-Sprachmodell, Web-Suche und Newsfeeds, Freigabeschritt, Veröffentlichung über die LinkedIn-API.",
    tools: ["n8n", "Azure OpenAI", "LinkedIn API"]
  },
  {
    id: "event-einladungen",
    title: "Events bewerben sich selbst",
    area: "marketing",
    type: "alltag",
    complexity: 3,
    industry: "Veranstaltungen & Webinare",
    impact: "Einladungen und Reminder im perfekten Timing",
    teaser: "Ein neues Event löst personalisierte Einladungen und Erinnerungen aus.",
    problem: "Neue Webinare wurden in Eventbrite angelegt, aber Einladungen an Kunden, Verteiler und Multiplikatoren sowie mehrere Reminder liefen manuell – zeitaufwendig und uneinheitlich.",
    solution: "Das Anlegen eines Events startet einen Workflow: Er prüft die Eventdaten, erstellt personalisierte Einladungen, befüllt Verteiler und versendet nach Freigabe. Ein zweiter Workflow verschickt Erinnerungen zu festen Zeitpunkten.",
    results: [
      { t: "Vollautomatisch", d: "Von der Event-Anlage bis zum letzten Reminder." },
      { t: "Fehlerfrei", d: "Keine vergessenen Verteiler oder falschen Termine." },
      { t: "Persönlich", d: "KI-generierte Texte je Zielgruppe." }
    ],
    setup: "n8n-Workflows mit Eventbrite-Trigger, KI-Textgenerierung, Freigabeschritt und zeitgesteuertem Reminder-Versand.",
    tools: ["n8n", "Eventbrite", "LLM", "E-Mail"]
  },
  {
    id: "mails-analysieren",
    title: "Eingehende E-Mails sortieren sich selbst",
    area: "service",
    type: "alltag",
    complexity: 3,
    industry: "Kundenservice & Innendienst",
    impact: "Anliegen, Dringlichkeit und Zuständigkeit sofort erkannt",
    teaser: "KI erkennt Anliegen und Stimmung, die Automatisierung erstellt Tickets.",
    problem: "Sammelpostfächer füllen sich schneller, als sie gelesen werden. Dringende Anliegen gehen unter, Zuständigkeiten werden per Weiterleitung geklärt.",
    solution: "Eine Automatisierung holt neue E-Mails ab. KI erkennt Anliegen, Stimmung, Produkt und Dringlichkeit. Daraus entstehen automatisch Tickets und Aufgaben – kritische Fälle werden an die richtige Person eskaliert.",
    results: [
      { t: "Schnellere Reaktion", d: "Dringendes wird sofort sichtbar." },
      { t: "Klare Zuständigkeit", d: "Weniger Weiterleiten, weniger Liegenlassen." },
      { t: "Entlastetes Team", d: "Sortierarbeit übernimmt die Maschine." }
    ],
    setup: "Postfach-Trigger, Klassifikation per Sprachmodell, Ticket- und Aufgabenanlage mit Eskalationsregeln.",
    tools: ["n8n / Power Automate", "LLM", "Ticketsystem"]
  },
  {
    id: "sales-call-feedback",
    title: "Feedback zu Verkaufsgesprächen",
    area: "vertrieb",
    type: "alltag",
    complexity: 3,
    industry: "Vertrieb",
    impact: "Nach jedem Call: Feedback und nächste Schritte im CRM",
    teaser: "Die Aufzeichnung wird analysiert, Aufgaben landen direkt im CRM.",
    problem: "Nach Kundengesprächen fehlt die Zeit für Nachbereitung. Vereinbarungen gehen verloren, Lernchancen bleiben ungenutzt.",
    solution: "Die Gesprächsaufzeichnung wird automatisch hochgeladen. KI analysiert das Gespräch, erstellt Feedback und nächste Schritte. Die Automatisierung legt die Aufgaben im CRM an.",
    results: [
      { t: "Nichts geht verloren", d: "Zusagen und To-dos sind sofort dokumentiert." },
      { t: "Bessere Gespräche", d: "Konkretes Feedback nach jedem Call." },
      { t: "Saubere Pipeline", d: "Das CRM ist aktuell, ohne Nachtragen." }
    ],
    setup: "Upload-Automatisierung, Transkription und Analyse per Sprachmodell, Aufgabenanlage im CRM.",
    tools: ["Transkription", "LLM", "CRM"]
  },
  {
    id: "monatsbericht",
    title: "Der Monatsbericht schreibt sich selbst",
    area: "finanzen",
    type: "alltag",
    complexity: 4,
    industry: "Controlling",
    impact: "Management Summary am ersten Tag statt nach zwei Wochen",
    teaser: "KPIs werden gesammelt, kommentiert und automatisch verteilt.",
    problem: "Jeden Monat dasselbe Ritual: Zahlen ziehen, in Excel aufbereiten, Grafiken aktualisieren, kommentieren, verschicken. Das kostet Controller Tage – und die Daten sind beim Lesen schon alt.",
    solution: "Eine Automatisierung sammelt KPIs aus den Systemen. KI schreibt Management Summary und Analysen. Der fertige Bericht wird im SharePoint abgelegt und verschickt.",
    results: [
      { t: "Tage gespart", d: "Das Controlling gewinnt Zeit für Analyse statt Aufbereitung." },
      { t: "Schnellere Entscheidungen", d: "Zahlen sind aktuell, wenn sie gebraucht werden." },
      { t: "Einheitliche Form", d: "Jeder Bericht folgt demselben Aufbau." }
    ],
    setup: "Datensammlung aus ERP und Tools, Textgenerierung per Sprachmodell, Ablage in SharePoint und Versand.",
    tools: ["ERP", "LLM", "SharePoint"]
  },
  {
    id: "teams-agenten",
    title: "KI-Agenten für alle in Microsoft Teams",
    area: "organisation",
    type: "alltag",
    complexity: 3,
    industry: "Automatisierungstechnik, ca. 100 Mitarbeitende",
    impact: "Firmeneigene Agenten dort, wo ohnehin gearbeitet wird",
    teaser: "Zentral bereitgestellte KI-Agenten, aufrufbar mit drei Klicks in Teams.",
    problem: "KI-Werkzeuge waren nur bei wenigen Interessierten im Einsatz. Für die Breite der Belegschaft fehlten ein einfacher Zugang und klare Spielregeln.",
    solution: "Die Agenten wurden zentral bereitgestellt und für die Mitarbeitenden freigegeben. Aufruf: Teams öffnen, Apps, Agent suchen, Anfrage stellen. Eine Kurzanleitung regelt gute Prompts und den Umgang mit vertraulichen Daten.",
    results: [
      { t: "Niedrige Hürde", d: "Kein neues Tool – die Agenten leben in Teams." },
      { t: "Sicherer Rahmen", d: "Freigegebene Agenten statt Schatten-KI." },
      { t: "Breite Nutzung", d: "KI wird zum Alltagswerkzeug, nicht zum Spezialthema." }
    ],
    setup: "Zentral bereitgestellte Agenten in Microsoft Teams (Copilot Studio), Freigabe über die Unternehmens-Apps, Kurzanleitung für Mitarbeitende.",
    tools: ["Microsoft Teams", "Copilot Studio"]
  },

  /* ------------------------------------------------------------------ */
  /* Basis-Software, Apps und Assistenzsysteme                            */
  /* ------------------------------------------------------------------ */
  {
    id: "zeichnungen-schwaerzen",
    title: "Technische Zeichnungen automatisch schwärzen",
    area: "einkauf",
    type: "leuchtturm",
    complexity: 5,
    industry: "Blechverarbeitung, Lohnfertigung",
    impact: "Zeichnungen in Stapeln anfragefertig – komplett lokal",
    teaser: "Lokale KI erkennt Endkunden, Logos und Vermerke und schwärzt sie dauerhaft.",
    problem: "Für Lieferantenanfragen müssen Kundenzeichnungen vor der Weitergabe geschwärzt werden: Endkundennamen, Logos, Zeichner und Prüfer, Zeichnungsnummern, vertrauliche Vermerke. Von Hand ist das mühsam und fehleranfällig – und die Daten dürfen das Haus nicht verlassen.",
    solution: "Eine lokal laufende KI erkennt die vertraulichen Angaben und ersetzt die Bildpunkte dauerhaft. Maße, Konturen und Toleranzen bleiben lesbar. Zeichnungen werden per Drag & Drop im Stapel verarbeitet, eine Vorher-Nachher-Ansicht dient der Kontrolle, freigegebene Dateien gehen als ZIP raus.",
    results: [
      { t: "Kein Upload", d: "Verarbeitung ausschließlich lokal, keine externen KI-Dienste." },
      { t: "Stapelverarbeitung", d: "Viele Zeichnungen in einem Durchgang statt Blatt für Blatt." },
      { t: "Mensch gibt frei", d: "Vorher-Nachher-Kontrolle vor jeder Weitergabe." }
    ],
    setup: "Lokales Vision-Modell zur Erkennung, dauerhafte Schwärzung auf Pixelebene, PNG-Ausgabe, ZIP-Export. Übergabe als Basis-Software zum Festpreis inkl. Code, Testergebnissen und Mini-Workshop – die Weiterentwicklung übernimmt die eigene IT.",
    tools: ["Lokales Vision-Modell", "Python", "On-Premises"]
  },
  {
    id: "anfrage-zu-angebot",
    title: "KI-Agent von der Anfrage zum Angebot",
    area: "vertrieb",
    type: "leuchtturm",
    complexity: 7,
    industry: "Hersteller von Kühlmöbeln, Sonderanfertigung",
    impact: "Schnellere Angebote, mehr Angebote – am Engpass gemessen",
    teaser: "Ein Assistent entlastet Kalkulation und Konstruktion im Engpass Angebotsprozess.",
    problem: "Der Engpass lag im Ablauf Anfrage – Kalkulation/Konstruktion – Angebot – Rückgabe an den Vertrieb. Zu wenige Angebote gingen raus, zu langsam – und damit blieb Umsatz liegen.",
    solution: "Eine maßgeschneiderte Web-App für Auftragsbearbeitung und Vertrieb führt durch die Angebotskalkulation. KI füllt Angaben aus der Anfrage vor, die Fachleute prüfen und ergänzen. Der erste Prototyp stand nach wenigen Projekttagen; die Wirkung wird an Durchlaufzeit und Angebotsanzahl gemessen.",
    results: [
      { t: "Engpass im Fokus", d: "Die Arbeit setzt genau dort an, wo Umsatz entsteht." },
      { t: "Messbare Wirkung", d: "Erfolg gemessen an Angebotsdurchlaufzeit und Anzahl guter Angebote." },
      { t: "Kalkulation entlastet", d: "Routineangaben sind vorbelegt, Fachleute konzentrieren sich auf die Prüfung." }
    ],
    setup: "Web-App (FastAPI, PostgreSQL, HTMX), KI-Vorbelegung über die Claude-API, Betrieb in der Cloud.",
    tools: ["Claude", "FastAPI", "PostgreSQL", "HTMX"]
  },
  {
    id: "intrastat-cockpit",
    title: "Intrastat-Cockpit: Warennummern und Stammdaten im Griff",
    area: "finanzen",
    type: "leuchtturm",
    complexity: 5,
    industry: "Mittelstand mit EU-Warenverkehr",
    impact: "Monatliche Klärfallliste statt Suche in Excel",
    teaser: "Neue Artikel erkennen, Warennummern vorschlagen, Freigaben dokumentieren.",
    problem: "Monatlich kommen neue Artikel hinzu, die für den EU-Warenverkehr eingereiht werden müssen. Gewicht, Ursprung oder Material fehlen, Warennummern ändern sich zum Jahreswechsel, Entscheidungen sind nicht dokumentiert.",
    solution: "Das Tool verarbeitet den monatlichen Excel-Export, erkennt neue Artikel, prüft Warennummern gegen das amtliche Verzeichnis und schlägt für neue Artikel Nummern vor – auf Basis ähnlicher, bereits freigegebener Artikel. Eine Ampel zeigt, was fehlt. KI formuliert Begründungen und Rückfragen; die Freigabe bleibt beim Menschen.",
    results: [
      { t: "Weniger Sucharbeit", d: "Neue Artikel werden automatisch erkannt und vorsortiert." },
      { t: "Höhere Datenqualität", d: "Fehlende Gewichte und ungültige Nummern fallen früh auf." },
      { t: "Nachvollziehbar", d: "Wer hat wann was warum freigegeben – dokumentiert." }
    ],
    setup: "Excel/Power Query oder Python, Abgleich gegen die SOVA-Leitdatei von Destatis, Ähnlichkeitssuche über die Artikelhistorie, Sprachmodell für Begründungen und Rückfragen, Ampelbericht.",
    tools: ["Excel / Power Query", "Python", "LLM", "Destatis SOVA"]
  },
  {
    id: "webshop-erp",
    title: "Webshop als digitales Frontend des ERP",
    area: "vertrieb",
    type: "leuchtturm",
    complexity: 6,
    industry: "Mittelstand mit Webshop oder Kundenportal",
    impact: "Bestellungen fließen ohne Abtippen ins ERP",
    teaser: "Artikel, Preise, Bestände und Aufträge synchron – KI prüft die Datenqualität.",
    problem: "Webshop und ERP laufen nebeneinander her. Artikel werden doppelt gepflegt, Bestände stimmen nicht, kundenindividuelle Preise fehlen, Bestellungen werden abgetippt. Sieht digital aus, ist im Hintergrund Handarbeit.",
    solution: "Das ERP bleibt führend für Stammdaten, Preise, Bestände und Aufträge; der Shop wird als Frontend angebunden. KI prüft Pflichtfelder, schlägt verständliche Produkttexte und Kategorien vor, markiert auffällige Aufträge und formuliert Rückfragen. Start als schlankes MVP mit begrenztem Artikelumfang.",
    results: [
      { t: "Weniger Erfassung", d: "Innendienst tippt keine Webshop-Bestellungen mehr ab." },
      { t: "Verlässliche Daten", d: "Ampellogik für Artikel- und Auftragsqualität." },
      { t: "Mehr Self-Service", d: "Kunden sehen Preise, Status und Dokumente selbst." }
    ],
    setup: "Schnittstelle oder Middleware zwischen ERP/PIM und Shop, Klärfallliste mit Monitoring, KI-Assistenz für Datenchecks und Produkttexte.",
    tools: ["ERP", "Middleware", "LLM", "Webshop"]
  },
  {
    id: "gantt-sap",
    title: "Projektpläne, die man wieder lesen kann",
    area: "organisation",
    type: "alltag",
    complexity: 4,
    industry: "Anlagen- und Sondermaschinenbau",
    impact: "Aus dem Monster-GANTT werden lesbare A4- und A3-Ansichten",
    teaser: "Ein Assistent verdichtet Projektpläne zu passenden Sichten für jede Zielgruppe.",
    problem: "GANTT-Diagramme sind als Ausdruck oft unbrauchbar: zu viele Vorgänge, zu breite Zeitachsen, zu kleine Schrift. Geschäftsführung, Projektleitung und Team brauchen jeweils eine andere Sicht.",
    solution: "Der Assistent übernimmt Projektdaten aus Excel, MS Project oder SAP, prüft sie auf Lücken und verdichtet Aufgaben zu Arbeitspaketen. Heraus kommen eine A4-Management-Übersicht, ein A3-Phasenplan und eine Arbeitspaketliste.",
    results: [
      { t: "Klarheit für alle", d: "Jede Zielgruppe bekommt ihre passende Sicht." },
      { t: "Bessere Steuerung", d: "Risiken, Abhängigkeiten und Entscheidungen werden sichtbar." },
      { t: "Sicherer Start", d: "SAP zunächst nur lesend angebunden." }
    ],
    setup: "Import aus Excel/CSV, später SAP Business One Service Layer (read-only), Claude für Validierung und Verdichtung, PDF-Ausgabe für A4 und A3.",
    tools: ["Claude", "SAP Business One", "Excel", "PDF"]
  },
  {
    id: "mitarbeiter-app",
    title: "Mitarbeiter-App: Zeitkonto und Urlaub auf dem Handy",
    area: "personal",
    type: "alltag",
    complexity: 4,
    industry: "Produzierender Mittelstand",
    impact: "Weniger Rückfragen bei der Personalabteilung",
    teaser: "Eine Web-App zeigt Stundensaldo, Buchungen und Resturlaub – nur lesend.",
    problem: "Mitarbeitende in der Produktion haben keinen einfachen Zugriff auf Zeitkonto und Urlaubsstand. Jede Frage landet bei HR oder der Führungskraft.",
    solution: "Eine personalisierte Web-App zeigt jedem die eigenen Buchungen, das Stundensaldo, Urlaubsanspruch und Resturlaub. Die bestehende Zeiterfassung bleibt führend; die App greift ausschließlich lesend darauf zu.",
    results: [
      { t: "Selbstauskunft", d: "Jeder sieht seine Daten auf Smartphone, Tablet oder PC." },
      { t: "Kein Risiko", d: "Read-only: keine Buchungen aus der App zurück." },
      { t: "Austauschbar", d: "Ein eigener Connector kapselt die Zeiterfassung." }
    ],
    setup: "Web-App mit Backend, Rollen- und Rechtekonzept, austauschbarer Connector zur Zeiterfassung (Webservice, Read-only-Datenbank oder Export).",
    tools: ["Web-App", "ISGUS ZEUS", "REST"]
  },
  {
    id: "dateiassistent",
    title: "Lokaler Dateiassistent räumt die Ablage auf",
    area: "organisation",
    type: "alltag",
    complexity: 4,
    industry: "Beratung & Büro",
    impact: "Ablagevorschläge per Klick – ohne Cloud-KI",
    teaser: "Ordnet Dokumente inhaltlich ein und schlägt Ablageorte vor. Geändert wird nur nach Freigabe.",
    problem: "Gewachsene OneDrive-Ablagen mit tausenden Dateien: nichts ist zu finden, Aufräumen schiebt man ewig vor sich her. Vertrauliche Inhalte sollen dabei nicht in Cloud-Dienste wandern.",
    solution: "Eine lokal laufende Anwendung analysiert den Ordner, ordnet Dokumente inhaltlich ein und erzeugt Ablagevorschläge in einem Dashboard. Verschoben wird nur nach ausdrücklicher Freigabe; statt zu löschen, landen Dateien in einer wiederherstellbaren Quarantäne.",
    results: [
      { t: "Ordnung ohne Risiko", d: "Löschen ist technisch ausgeschlossen, alles bleibt umkehrbar." },
      { t: "Datenschutz", d: "Keine Cloud-API, Oberfläche nur lokal erreichbar." },
      { t: "Ausbaufähig", d: "Grundlage für eine lokale Dokumentensuche." }
    ],
    setup: "Lokale Web-Oberfläche, SQLite, optionaler KI-Baustein über Ollama im Local-only-Modus, Freigabe-Dashboard und Quarantäne.",
    tools: ["Python", "Ollama", "SQLite"]
  },
  {
    id: "research-agent",
    title: "Research-Agent für relevante Vertriebsgespräche",
    area: "vertrieb",
    type: "alltag",
    complexity: 4,
    industry: "Beratung, B2B-Vertrieb",
    impact: "Wenige, gut begründete Gesprächsanlässe statt Kontaktmasse",
    teaser: "Ein Agent erstellt Dossiers zu Zielkunden – ein Mensch entscheidet über die Ansprache.",
    problem: "Akquise nach dem Gießkannenprinzip kostet Zeit und Ruf. Was fehlt, ist ein belegter Anlass: Nachfolge, Wachstum, ERP-Druck, Führungswechsel.",
    solution: "Ein Research-Agent prüft Unternehmen gegen das Zielkundenprofil, sammelt öffentlich belegbare Signale und erstellt ein Dossier mit Quellen und Unsicherheiten. Ob, wie und über wen angesprochen wird, entscheidet ein Berater persönlich.",
    results: [
      { t: "Bessere Gesprächsanlässe", d: "Ansprache nur bei starkem, belegbarem Anlass." },
      { t: "Transparente Quellen", d: "Jede Aussage im Dossier ist belegt." },
      { t: "Keine Serienmails", d: "Bewusst ohne automatisierte Massenansprache." }
    ],
    setup: "KI-Agent mit Web-Recherche, strukturiertes Dossier-Template, Abgleich mit CRM-Masterliste.",
    tools: ["Claude", "Web-Recherche", "CRM"]
  },
  {
    id: "event-radar",
    title: "Event-Radar: Die richtigen Veranstaltungen finden",
    area: "marketing",
    type: "alltag",
    complexity: 5,
    industry: "Beratung & Netzwerk",
    impact: "Relevante Messen, Vorträge und Netzwerktreffen auf einen Blick",
    teaser: "Scraper sammeln Termine, die App bewertet die Relevanz für den Vertrieb.",
    problem: "Kammern, Verbände und Netzwerke veröffentlichen hunderte Termine auf eigenen Seiten. Welche davon sich lohnen, entscheidet bisher der Zufall.",
    solution: "Eine interne Web-App sammelt Veranstaltungen automatisch aus definierten Quellen, erkennt Dubletten und bewertet die Relevanz nach Themen und Vertriebspotenzial. Das Team kann Events empfehlen, als Kalendereintrag exportieren und nachbereiten.",
    results: [
      { t: "Überblick", d: "Alle relevanten Termine an einem Ort." },
      { t: "Vertriebsfokus", d: "Relevanzbewertung statt Bauchgefühl." },
      { t: "Nachbereitung", d: "Kontakte und Erkenntnisse werden festgehalten." }
    ],
    setup: "Web-App mit Datenbank und Zeilen-Sicherheit, Scraper je Quelle, Relevanzbewertung, ICS-Export.",
    tools: ["Web-App", "Scraper", "Datenbank", "ICS"]
  },
  {
    id: "auftragssteuerung-app",
    title: "Digitale Auftragssteuerung statt Excel und Papier",
    area: "produktion",
    type: "alltag",
    complexity: 4,
    industry: "Metallbaubetrieb, 18 Mitarbeitende",
    impact: "Bis zu 50 % gefördert über den Digitalbonus Bayern",
    teaser: "Eine Web-App für Aufträge, Zuständigkeiten, Termine und Fertigungsstatus.",
    problem: "Aufträge, Termine und Fertigungsstand stecken in Excel-Listen, E-Mails und auf Papier. Wer wissen will, wo ein Auftrag steht, muss fragen gehen.",
    solution: "Eine individuelle Webanwendung bildet Aufträge, Zuständigkeiten, Termine und Fertigungsstatus ab. Vorgehen: Prozessaufnahme, schlanke Konzeption, Entwicklung, Datenübernahme, Einweisung. Gefördert über den Digitalbonus Bayern.",
    results: [
      { t: "Transparenz", d: "Jeder sieht den aktuellen Auftragsstand." },
      { t: "Gefördert", d: "Digitalbonus Bayern: bis zu 50 % Zuschuss, max. 7.500 € (Standard)." },
      { t: "Passgenau", d: "Software, die zum Betrieb passt – nicht umgekehrt." }
    ],
    setup: "Individuelle Webanwendung, Datenübernahme aus Excel, Einführung und Schulung. G&P unterstützt bei der Prüfung und Vorbereitung des Förderantrags.",
    tools: ["Web-App", "Datenbank", "Digitalbonus Bayern"]
  },

  /* ------------------------------------------------------------------ */
  /* Weitere Leuchtturmprojekte                                           */
  /* ------------------------------------------------------------------ */
  {
    id: "innendienst-wissen",
    title: "Wissensdatenbank mit Chatbot für den Innendienst",
    area: "vertrieb",
    type: "leuchtturm",
    complexity: 4,
    industry: "Industrieller Mittelstand",
    impact: "Antworten in Sekunden statt Suchen in fünf Systemen",
    teaser: "SAP-Doku, OneNote und Prozesswissen in einer datenschutzkonformen KI-Suche.",
    problem: "Im Innendienst ging viel Zeit für die Suche nach Informationen verloren: SAP-Dokumentation, interne Daten, OneNote, Prozessinfos. Medienbrüche und Wiederholfragen bremsten den Alltag.",
    solution: "Das gesamte Wissen wurde in einer RAG-Wissensbasis gebündelt. Ein datenschutzkonformes Sprachmodell beantwortet Fragen in natürlicher Sprache; die Quellen werden automatisch aktualisiert.",
    results: [
      { t: "Schnellere Antworten", d: "Informationen in Sekunden gefunden." },
      { t: "Weniger Rückfragen", d: "Wissen ist zentral und konsistent verfügbar." },
      { t: "Bessere Servicequalität", d: "Kundenanfragen werden schneller und einheitlicher bearbeitet." }
    ],
    setup: "RAG-Wissensbasis in Azure aus SAP-Dokumentation, OneNote, Abläufen und Handbüchern; lokales, datenschutzkonformes LLM; Chatbot für alle Mitarbeitenden.",
    tools: ["RAG", "Azure", "Lokales LLM"]
  },
  {
    id: "lastenhefte",
    title: "Lastenhefte mit 2.500 Seiten in Stunden prüfen",
    area: "engineering",
    type: "leuchtturm",
    complexity: 4,
    industry: "Anlagenbau",
    impact: "Von 6 Tagen auf wenige Stunden",
    teaser: "KI findet die kritischen 5 % in Spezifikationen – mit Seiten- und Absatzangabe.",
    problem: "Lastenhefte mit 2.500 Seiten: 95 % Standard, aber die kritischen 5 % entscheiden über den Projekterfolg. Die Prüfung band bis zu sechs Tage wertvollste Ingenieurskapazität.",
    solution: "Statt zu lesen, erhält der Ingenieur eine strukturierte Liste: „Thema X gefunden auf Seite 184, Absatz 3.“ Der größte Wert liegt hier nicht in komplexen Agenten, sondern in der skalierbaren Bewältigung der Informationsflut.",
    results: [
      { t: "Extreme Beschleunigung", d: "Wenige Stunden statt sechs Tage." },
      { t: "Strukturierte Extraktion", d: "Fundstellen mit Seite und Absatz." },
      { t: "Engpass gelöst", d: "Freie Ingenieurskapazität ermöglicht zusätzliche Projekte." }
    ],
    setup: "Intelligentes Chunking großer Dokumente, strukturierte Extraktion nach Prüfkatalog per Sprachmodell.",
    tools: ["LLM", "Chunking", "Extraktion"]
  },
  {
    id: "ab-pruefung",
    title: "Auftragsbestätigungen automatisch prüfen",
    area: "einkauf",
    type: "leuchtturm",
    complexity: 5,
    industry: "Mittelständischer Hersteller",
    impact: "95 % automatisiert: von 200 täglichen Fällen bleiben 10",
    teaser: "KI gleicht Preise, Termine und Artikelnummern gegen das ERP ab.",
    problem: "Die tägliche Prüfung von rund 200 Auftragsbestätigungen band eine komplette Vollzeitkraft – monotone Abgleiche von Preisen, Lieferterminen und Artikelnummern, fehleranfällig und frustrierend.",
    solution: "KI liest die PDFs aus, extrahiert die Daten und gleicht sie gegen das ERP ab. Nur Abweichungen landen beim Menschen. Ein ideales erstes Leuchtturmprojekt.",
    results: [
      { t: "95 % Automatisierung", d: "Nur noch ca. 10 von 200 Fällen manuell." },
      { t: "Ressourcen-Shift", d: "Die Vollzeitkraft arbeitet jetzt an strategischen Aufgaben." },
      { t: "Weniger Risiko", d: "Abweichungen bei Preisen und Terminen werden zuverlässig erkannt." }
    ],
    setup: "Azure-LLM-Backend (GPT-4) mit Power Automate: PDF-Extraktion und Abgleich gegen das ERP-System.",
    tools: ["Azure OpenAI", "Power Automate", "ERP"]
  },
  {
    id: "varianten-anfragen",
    title: "Anfragen mit 4.000 Varianten beherrschbar machen",
    area: "vertrieb",
    type: "leuchtturm",
    complexity: 7,
    industry: "Industrieunternehmen mit hoher Variantenvielfalt",
    impact: "50–70 % der Anfrageklärung automatisiert",
    teaser: "Standard oder Sonder? KI klärt Positionen vor, bevor der Experte übernimmt.",
    problem: "Eine Anfrage mit 150 Positionen: Was ist Standard, was Sonder, was braucht Konstruktion, welche Teile sind lieferbar? Bei 4.000 Varianten war die Abwicklung an der Grenze des Möglichen – und das Wissen steckte in wenigen Köpfen.",
    solution: "KI übernimmt die Kompliziertheit, die kein Mensch im Kopf behält: Regeln je Land, Kunde und Produkt. Positionen werden vorklassifiziert, technische Fragen aus dem Firmenwissen beantwortet, bevor der Fachmann übernimmt.",
    results: [
      { t: "50–70 % automatisiert", d: "Vertrieb, Einkauf und AV bewältigen die volle Variantenvielfalt." },
      { t: "Schnellere Angebote", d: "Weniger Schleifen zwischen den Abteilungen." },
      { t: "Wissen gesichert", d: "Erfahrungswissen der „Eiweißcomputer“ wird nutzbar gemacht." }
    ],
    setup: "Regelwerk und Firmenwissen als Wissensbasis, Sprachmodell zur Klassifikation und Vorbeantwortung, Anbindung an ERP-Stammdaten. Umgesetzt 2025.",
    tools: ["LLM", "Wissensbasis", "ERP"]
  },
  {
    id: "qualitaets-auditor",
    title: "KI als digitaler Qualitäts-Auditor in der Konstruktion",
    area: "engineering",
    type: "leuchtturm",
    complexity: 7,
    industry: "Anlagenbau",
    impact: "Vermeidet Nachbesserungen im sechsstelligen Bereich",
    teaser: "Multidokument-Check findet teure Fehler, bevor sie gebaut werden.",
    problem: "Fehler in Konstruktionsunterlagen sind selten, aber extrem teuer. Ein übersehenes Detail – etwa die falsche Materialvorgabe bei Außenaufstellung – kostet schnell mehrere 100.000 € pro Jahr und Reputation.",
    solution: "Ein Modell prüft Arbeitsunterlagen über Dokumentgrenzen hinweg. Zur Validierung wurden bewusst Fehler in fehlerfreie Unterlagen eingebaut („Red Teaming“), um die Erkennungsrate zu messen.",
    results: [
      { t: "Sechsstellige Einsparung", d: "Nachbesserungen und Materialschäden werden verhindert." },
      { t: "Engpass Ingenieur entlastet", d: "Mehr Zeit für kreative, wertschöpfende Arbeit." },
      { t: "Schnellere Freigaben", d: "Validierte Unterlagen schaffen Vertrauen." }
    ],
    setup: "Multidokument-Check mit Azure OpenAI über Kontextgrenzen hinweg, Validierung per Red Teaming.",
    tools: ["Azure OpenAI", "Red Teaming"]
  },
  {
    id: "support-tessa",
    title: "Support-Assistentin „Tessa“",
    area: "service",
    type: "leuchtturm",
    complexity: 7,
    industry: "Softwarehersteller für die Gastronomie",
    impact: "30 % der Level-1-Tickets automatisiert",
    teaser: "KI schlägt Antworten vor, Experten prüfen – und das System lernt mit.",
    problem: "Hohe Fluktuation, lange Einarbeitung und tausende repetitive Level-1-Tickets: das klassische Support-Dilemma.",
    solution: "Eine RAG-Architektur auf Basis des historischen Support-Wissens erzeugt Antwortvorschläge. Experten prüfen; bestätigte Antworten fließen zurück und erhöhen die Qualität.",
    results: [
      { t: "30 % Automatisierung", d: "Support wird vom Kostenblock zum skalierbaren Qualitätsfaktor." },
      { t: "Skalierbarkeit", d: "Perspektivisch steuern 4 Reviewer die Arbeit eines früher 30-köpfigen Teams." },
      { t: "Human-in-the-loop", d: "Experten behalten die Kontrolle über jede Antwort." }
    ],
    setup: "RAG (Retrieval Augmented Generation) auf historischem Ticket- und Lösungswissen, Feedbackschleife für bestätigte Antworten.",
    tools: ["RAG", "LLM", "Ticketsystem"]
  },
  {
    id: "sales-forecasting",
    title: "KI-basierte Absatzprognose",
    area: "vertrieb",
    type: "leuchtturm",
    complexity: 8,
    industry: "Produzierendes Unternehmen",
    impact: "Weniger Fehlbestände und Überproduktion",
    teaser: "Machine Learning erkennt saisonale Muster in den Verkaufsdaten.",
    problem: "Absatzprognosen wurden manuell erstellt und waren fehleranfällig. Saisonale Muster wurden übersehen – mit Fehlbeständen oder Überproduktion als Folge.",
    solution: "Ein ML-Modell analysiert historische Verkaufsdaten, erkennt Muster und Saisonalität und erzeugt stabile Prognosen für Vertrieb, Einkauf und Produktion.",
    results: [
      { t: "Genaue Planung", d: "Forecasts werden stabiler und nachvollziehbar." },
      { t: "Weniger Fehlprognosen", d: "Bestände, Produktion und Einkauf zuverlässiger gesteuert." },
      { t: "Bessere Entscheidungen", d: "Management erhält datenbasierte Zukunftsbilder." }
    ],
    setup: "ML-Modell auf historischen Verkaufsdaten aus SAP und Excel.",
    tools: ["Machine Learning", "SAP", "Excel"]
  },
  {
    id: "angebotserstellung",
    title: "Vollautomatische Angebotserstellung",
    area: "vertrieb",
    type: "leuchtturm",
    complexity: 9,
    industry: "Hersteller komplexer Produkte",
    impact: "Angebote in Sekunden statt bis zu einer Woche",
    teaser: "KI versteht Ausschreibungen und erstellt rechtssichere Angebote.",
    problem: "Durch komplexe Produkte dauerte die manuelle Angebotserstellung bis zu einer Woche. Zu späte Angebote bedeuteten verlorene Aufträge.",
    solution: "Ein spezialisiertes Framework versteht eingehende Ausschreibungen inhaltlich und juristisch und erzeugt auf Basis interner Produktdaten automatisch ein rechtssicheres Angebot.",
    results: [
      { t: "60 % vollautomatisch", d: "Bis zu 60 % der Anfragen laufen ohne manuellen Eingriff." },
      { t: "50 % weniger Aufwand", d: "Die Arbeitslast im Innendienst halbiert sich." },
      { t: "Reaktion in Sekunden", d: "Ein massiver Wettbewerbsvorteil." }
    ],
    setup: "Spezialisiertes Framework mit Azure-LLMs und internen Produktdaten.",
    tools: ["Azure OpenAI", "Produktdaten", "Framework"]
  },
  {
    id: "reparatur-kv",
    title: "Geführte Reparatur mit automatischem Kostenvoranschlag",
    area: "service",
    type: "leuchtturm",
    complexity: 9,
    industry: "Technischer Service",
    impact: "Gleiche Reparaturqualität – unabhängig vom Techniker",
    teaser: "Schritt-für-Schritt-Anleitungen aus echten Fällen, KV direkt aus der Diagnose.",
    problem: "Servicetechniker brauchen tiefes Produktwissen. Unterschiedliche Personen führen zu schwankender Qualität, langer Einarbeitung und späten, unzuverlässigen Kostenvoranschlägen.",
    solution: "Eine Wissensbasis aus Reparaturfällen, Fehlercodes, Ersatzteillisten und Erfahrungswissen führt Techniker durch die Reparatur. Kosten werden aus Diagnose und Historie berechnet.",
    results: [
      { t: "Geführte Reparaturflows", d: "Anleitungen auf Basis realer Fälle." },
      { t: "Automatischer KV", d: "Konsistent und schnell aus Diagnose und Historie." },
      { t: "Standardisierte Qualität", d: "Jede Reparatur auf demselben Wissensstand." }
    ],
    setup: "RAG-Wissensbasis, generatives LLM für Reparaturlogik und KV-Prognose, ML für Datenaufbereitung und Prognose.",
    tools: ["RAG", "LLM", "Machine Learning"]
  },
  {
    id: "produktionssteuerung",
    title: "KI-Assistenz für die Produktionssteuerung",
    area: "produktion",
    type: "leuchtturm",
    complexity: 9,
    industry: "Stärkeproduktion, Prozessindustrie",
    impact: "Weniger Ausschuss, höherer Durchsatz",
    teaser: "ML sagt die optimale Kochzeit je Charge voraus – Sicherheitspuffer schrumpfen.",
    problem: "Optimale Kochzeiten hängen von Wetter, Feuchte, Rohstoffschwankungen und Chargenzusammensetzung ab. Um Ausschuss zu vermeiden, planten Anlagentechniker großzügige Puffer ein – mit deutlicher Ineffizienz.",
    solution: "Ein ML-Modell berücksichtigt alle Einflussfaktoren und berechnet die optimale Kochzeit für jede Charge. Es wird laufend mit neuen Produktionsdaten kalibriert.",
    results: [
      { t: "Präzise Prognosen", d: "Optimale Kochzeit je Charge." },
      { t: "Weniger Ausschuss", d: "Die Anlage trifft zuverlässig den Qualitätsbereich." },
      { t: "Mehr Durchsatz", d: "Puffer sinken ohne Qualitätsrisiko." }
    ],
    setup: "ML-Modell mit Feature-Engineering für Wetter, Feuchtigkeit, Rohstoffparameter und historische Kochzyklen; kontinuierliche Kalibrierung.",
    tools: ["Machine Learning", "Produktionsdaten"]
  },
  {
    id: "kreissaege",
    title: "KI-Zusatzmodul für Arbeitssicherheit an Kreissägen",
    area: "produktion",
    type: "leuchtturm",
    complexity: 9,
    industry: "Maschinenbau",
    impact: "Warnung, bevor es gefährlich wird – plus neues Geschäftsmodell",
    teaser: "Vision-KI erkennt riskante Bedienmuster in Echtzeit, auch offline.",
    problem: "Ein Großteil der Unfälle an Kreissägen entsteht durch falsche Bedienung oder Unachtsamkeit. Der Hersteller suchte ein Zusatzmodul, das schützt und zugleich neues Geschäft ermöglicht.",
    solution: "Vision-Modelle erkennen riskante Bedienmuster in Echtzeit und warnen, bevor Gefahr entsteht. Kombiniert mit Sensordaten, ausgewertet direkt an der Maschine – auch ohne Internet.",
    results: [
      { t: "Präventiver Arbeitsschutz", d: "Echtzeit-Warnung bei riskanter Bedienung." },
      { t: "Neues Umsatzmodell", d: "Upgrade-Modul für die bestehende Maschine." },
      { t: "Objektiver Standard", d: "Reproduzierbare statt subjektiver Einschätzungen." }
    ],
    setup: "Vision-Modelle zur Mustererkennung, Sensor-Telemetrie, Edge-AI mit Offline-Betrieb.",
    tools: ["Computer Vision", "Edge AI", "Sensorik"]
  }
];
