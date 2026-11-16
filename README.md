# G&P KI-Use-Case-Galerie

Statische Landingpage mit realen KI- und Automatisierungs-Use-Cases aus dem Mittelstand.
Live unter **https://www.usecases.g-u-p.de** (GitHub Pages).

Kein Build, keine Abhängigkeiten: `index.html` + `assets/`. Schriften (Space Grotesk, Inter) sind selbst gehostet, es werden keine externen Dienste geladen (DSGVO-freundlich, keine Cookies).

## Use Case hinzufügen oder ändern

Alle Inhalte stehen in **`assets/usecases.js`**. Einen neuen Eintrag in `USECASES` ergänzen – die Felder sind oben in der Datei erklärt. Committen, pushen, fertig: GitHub Pages aktualisiert die Seite nach ca. 1 Minute.

- `type`: `"alltag"` (Alltags-KI) oder `"leuchtturm"` (Leuchtturmprojekt)
- `complexity`: 1–10 (bestimmt die Position in der Landkarte)
- `area`: einer der Schlüssel aus `AREAS` (Vertrieb, Einkauf, …)

## Direktlinks

| Zweck | URL |
|---|---|
| Einzelner Use Case | `https://www.usecases.g-u-p.de/#zeichnungen-schwaerzen` |
| Nur Bausteine der G&P Suite | `https://www.usecases.g-u-p.de/?suite=1#galerie` |
| Nur ein Bereich | `https://www.usecases.g-u-p.de/?bereich=vertrieb#galerie` |
| Nur Leuchttürme | `https://www.usecases.g-u-p.de/?typ=leuchtturm#galerie` |

Bereiche: `erp`, `vertrieb`, `einkauf`, `engineering`, `produktion`, `service`, `finanzen`, `marketing`, `personal`, `organisation`.

## Auf der Website einbinden

Mit `?embed=1` zeigt die Seite nur Filter und Karten (ohne Header, Hero, Footer):

```html
<iframe id="gup-usecases" src="https://www.usecases.g-u-p.de/?embed=1"
        title="KI-Use-Cases" style="width:100%;border:0;min-height:900px" loading="lazy"></iframe>
<script>
  // optional: iframe-Höhe automatisch anpassen
  window.addEventListener("message", function (e) {
    if (e.origin === "https://www.usecases.g-u-p.de" && e.data && e.data.type === "gup-usecases-height") {
      document.getElementById("gup-usecases").style.height = e.data.height + "px";
    }
  });
</script>
```

Kombinierbar, z. B. `?embed=1&bereich=vertrieb` für eine Vertriebs-Unterseite.

## Domain / Hosting

- Repository: GitHub Pages, Branch `main`, Ordner `/` (root)
- `CNAME`-Datei: `www.usecases.g-u-p.de`
- DNS beim Domain-Anbieter: `CNAME  www.usecases  →  floriangloebl.github.io.`
  (gleiches Muster wie `www.ki-sprechstunde.g-u-p.de`)

## Lokal ansehen

```bash
python3 -m http.server 8000   # dann http://localhost:8000 öffnen
```

## Hinweis

Alle Use Cases sind G&P-Projekte; Kundennamen sind anonymisiert.
